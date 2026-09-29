import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { checkId, xp, correct } = await req.json();

    const user = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Record knowledge check attempt
    await db.knowledgeCheckAttempt.create({
      data: {
        userId: user.id,
        checkId: checkId || `check_${Date.now()}`,
        answer: {},
        isCorrect: Boolean(correct),
        xpEarned: correct ? (xp || 0) : 0,
      },
    });

    // Update user XP if correct
    if (correct && xp > 0) {
      const newTotalXP = (user.totalXP || 0) + xp;
      const newLevel = Math.floor(newTotalXP / 1000) + 1;

      await db.user.update({
        where: { id: user.id },
        data: {
          totalXP: newTotalXP,
          level: newLevel,
        },
      });

      // Check for badge eligibility
      await checkAndAwardBadges(user.id, newTotalXP, newLevel);

      return NextResponse.json({
        success: true,
        xp,
        totalXP: newTotalXP,
        level: newLevel,
      });
    }

    return NextResponse.json({ success: true, xp: 0 });
  } catch (error) {
    console.error('XP reward error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function checkAndAwardBadges(
  userId: string,
  totalXP: number,
  level: number
) {
  try {
    // Check Foundation Ready badge (complete modules 0-3)
    const foundationModules = await db.progress.count({
      where: {
        userId,
        moduleId: { in: ['00', '01', '02', '03'] },
        status: 'COMPLETED',
      },
    });

    if (foundationModules === 4) {
      const badge = await db.badge.findUnique({
        where: { name: 'Foundation Ready' },
      });

      if (badge) {
        await db.userBadge.upsert({
          where: {
            userId_badgeId: {
              userId,
              badgeId: badge.id,
            },
          },
          update: {},
          create: {
            userId,
            badgeId: badge.id,
          },
        });
      }
    }

    // Check for module-specific badges
    const module04Complete = await db.progress.findFirst({
      where: {
        userId,
        moduleId: '04',
        status: 'COMPLETED',
      },
    });

    if (module04Complete) {
      const badge = await db.badge.findUnique({
        where: { name: 'Alert Triage Ready' },
      });

      if (badge) {
        await db.userBadge.upsert({
          where: {
            userId_badgeId: {
              userId,
              badgeId: badge.id,
            },
          },
          update: {},
          create: {
            userId,
            badgeId: badge.id,
          },
        });
      }
    }
  } catch (err) {
    console.error('Error in checkAndAwardBadges:', err);
  }
}
