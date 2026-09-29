import { PrismaClient } from '@prisma/client';
import { localDb } from './local-db';
import net from 'net';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const rawPrisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = rawPrisma;

let isPostgresAvailable: boolean | null = null;

// Rapid 200ms socket probe to prevent 5-10s cold-start timeout freezes when PostgreSQL is offline
function probePostgresQuickly() {
  if (isPostgresAvailable !== null) return;
  try {
    const dbUrl = process.env.DATABASE_URL || '';
    if (dbUrl.includes('localhost') || dbUrl.includes('127.0.0.1')) {
      const socket = net.createConnection({ host: '127.0.0.1', port: 5432, timeout: 200 });
      socket.on('connect', () => {
        isPostgresAvailable = true;
        socket.destroy();
      });
      socket.on('error', () => {
        isPostgresAvailable = false;
        socket.destroy();
      });
      socket.on('timeout', () => {
        isPostgresAvailable = false;
        socket.destroy();
      });
    }
  } catch (e) {
    isPostgresAvailable = false;
  }
}

probePostgresQuickly();

function isConnectionError(err: any): boolean {
  if (!err) return false;
  const message = err.message || String(err);
  return (
    err.name === 'PrismaClientInitializationError' ||
    message.includes("Can't reach database server") ||
    message.includes('P1001') ||
    message.includes('ECONNREFUSED') ||
    message.includes('connect ECONNREFUSED')
  );
}

function createFallbackProxy(modelName: string) {
  const localModel = (localDb as any)[modelName];

  return new Proxy((rawPrisma as any)[modelName] || {}, {
    get(target, operation: string) {
      return async (...args: any[]) => {
        // If Postgres is offline, serve directly from fast local persistent store
        if (isPostgresAvailable === false && localModel?.[operation]) {
          return localModel[operation](...args);
        }

        try {
          if (typeof target[operation] === 'function') {
            const result = await target[operation](...args);
            isPostgresAvailable = true;
            return result;
          }
        } catch (error: any) {
          if (isConnectionError(error)) {
            if (isPostgresAvailable !== false) {
              console.warn(
                `⚠️ PostgreSQL server is not reachable at ${process.env.DATABASE_URL}. Automatically using local persistent store.`
              );
              isPostgresAvailable = false;
            }
            if (localModel && typeof localModel[operation] === 'function') {
              return localModel[operation](...args);
            }
          }
          throw error;
        }

        if (localModel && typeof localModel[operation] === 'function') {
          return localModel[operation](...args);
        }

        throw new Error(`Operation ${String(operation)} not supported on ${modelName}`);
      };
    },
  });
}

export const db: PrismaClient = new Proxy(rawPrisma, {
  get(target, prop: string) {
    if (prop in localDb) {
      return createFallbackProxy(prop);
    }
    return (target as any)[prop];
  },
}) as PrismaClient;
