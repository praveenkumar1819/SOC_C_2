import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    const modules = await db.module.findMany({
      orderBy: { order: 'asc' },
      include: {
        topics: {
          select: {
            id: true,
            title: true,
            order: true,
            _count: {
              select: {
                units: true,
                knowledgeChecks: true,
              },
            },
          },
        },
        progress: userId
          ? {
              where: { userId },
            }
          : false,
      },
    });

    return NextResponse.json({
      success: true,
      data: modules,
    });
  } catch (error: any) {
    console.error('Error fetching modules:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch modules' },
      { status: 500 }
    );
  }
}
