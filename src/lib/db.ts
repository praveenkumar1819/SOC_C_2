import { PrismaClient } from '@prisma/client';
import { localDb } from './local-db';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const rawPrisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = rawPrisma;

let isPostgresAvailable: boolean | null = null;

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
        // If we already know Postgres is offline, use localDb directly for speed
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
