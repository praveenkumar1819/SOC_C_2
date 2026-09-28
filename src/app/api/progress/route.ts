import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const userEmail = session.user.email;

    const user = userId
      ? await db.user.findUnique({ where: { id: userId } })
      : await db.user.findUnique({ where: { email: userEmail! } });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    const [progressList, userBadges] = await Promise.all([
      db.progress.findMany({
        where: { userId: user.id },
        include: {
          module: {
            select: {
              id: true,
              title: true,
              order: true,
              difficulty: true,
            },
          },
        },
        orderBy: { module: { order: 'asc' } },
      }),
      db.userBadge.findMany({
        where: { userId: user.id },
        include: { badge: true },
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          totalXP: user.totalXP,
          level: user.level,
          currentStreak: user.currentStreak,
          lastActive: user.lastActive,
        },
        progress: progressList,
        badges: userBadges,
      },
    });
  } catch (error: any) {
    console.error('Error fetching progress:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch progress' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { moduleId, topicId, unitId, xp, topicProgress, xpEarned = 0, completionPercentage = 0 } = body;

    if (!moduleId) {
      return NextResponse.json(
        { success: false, error: 'moduleId is required' },
        { status: 400 }
      );
    }

    const user = session.user.id
      ? await db.user.findUnique({ where: { id: session.user.id } })
      : await db.user.findUnique({ where: { email: session.user.email! } });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    const effectiveXP = xp !== undefined ? xp : xpEarned;
    const effectiveTopicProgress =
      topicProgress ||
      (topicId && unitId
        ? {
            [topicId]: {
              completedUnits: [unitId],
              lastAccessedUnit: unitId,
            },
          }
        : {});

    const isCompleted = completionPercentage >= 100;

    // Upsert progress
    const progress = await db.progress.upsert({
      where: {
        userId_moduleId: {
          userId: user.id,
          moduleId,
        },
      },
      update: {
        topicProgress: effectiveTopicProgress,
        completionPercentage,
        totalXpEarned: { increment: effectiveXP },
        status: isCompleted ? 'COMPLETED' : 'IN_PROGRESS',
        completedAt: isCompleted ? new Date() : null,
        updatedAt: new Date(),
      },
      create: {
        userId: user.id,
        moduleId,
        topicProgress: effectiveTopicProgress,
        completionPercentage,
        totalXpEarned: effectiveXP,
        status: isCompleted ? 'COMPLETED' : 'IN_PROGRESS',
        startedAt: new Date(),
        completedAt: isCompleted ? new Date() : null,
      },
    });

    // Update user XP & Level
    if (effectiveXP > 0) {
      const newXP = user.totalXP + effectiveXP;
      const newLevel = Math.floor(newXP / 1000) + 1;

      await db.user.update({
        where: { id: user.id },
        data: {
          totalXP: { increment: effectiveXP },
          level: newLevel,
          lastActive: new Date(),
        },
      });
    }

    return NextResponse.json({
      success: true,
      progress,
      data: progress,
    });
  } catch (error: any) {
    console.error('Progress update error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update progress' },
      { status: 500 }
    );
  }
}
