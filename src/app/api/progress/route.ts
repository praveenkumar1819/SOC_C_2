import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const [user, progressList, userBadges] = await Promise.all([
      db.user.findUnique({
        where: { id: session.user.id },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          totalXP: true,
          level: true,
          currentStreak: true,
          lastActive: true,
        },
      }),
      db.progress.findMany({
        where: { userId: session.user.id },
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
        where: { userId: session.user.id },
        include: { badge: true },
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        user,
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

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { moduleId, topicProgress, xpEarned = 0, completionPercentage = 0 } = body;

    if (!moduleId) {
      return NextResponse.json(
        { success: false, error: 'moduleId is required' },
        { status: 400 }
      );
    }

    // Upsert progress
    const progress = await db.progress.upsert({
      where: {
        userId_moduleId: {
          userId: session.user.id,
          moduleId,
        },
      },
      update: {
        topicProgress: topicProgress ?? {},
        completionPercentage,
        totalXpEarned: { increment: xpEarned },
        status: completionPercentage >= 100 ? 'COMPLETED' : 'IN_PROGRESS',
        completedAt: completionPercentage >= 100 ? new Date() : null,
      },
      create: {
        userId: session.user.id,
        moduleId,
        topicProgress: topicProgress ?? {},
        completionPercentage,
        totalXpEarned: xpEarned,
        status: completionPercentage >= 100 ? 'COMPLETED' : 'IN_PROGRESS',
        startedAt: new Date(),
        completedAt: completionPercentage >= 100 ? new Date() : null,
      },
    });

    // Update user XP
    if (xpEarned > 0) {
      await db.user.update({
        where: { id: session.user.id },
        data: {
          totalXP: { increment: xpEarned },
          lastActive: new Date(),
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: progress,
    });
  } catch (error: any) {
    console.error('Error updating progress:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update progress' },
      { status: 500 }
    );
  }
}
