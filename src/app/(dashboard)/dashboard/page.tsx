import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import { WelcomeSection } from '@/components/dashboard/welcome-section';
import { CurrentModuleCard } from '@/components/dashboard/current-module-card';
import { BeginnerCourseBanner } from '@/components/dashboard/beginner-course-banner';
import { ProgressOverview } from '@/components/dashboard/progress-overview';
import { LearningPath } from '@/components/dashboard/learning-path';
import { QuickActions } from '@/components/dashboard/quick-actions';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/login');
  }

  // Fetch user data
  let user = null;
  let modules: any[] = [];
  try {
    user = await db.user.findUnique({
      where: { email: session.user.email! },
      include: {
        progress: {
          include: {
            module: true,
          },
        },
        badges: {
          include: {
            badge: true,
          },
        },
      },
    });

    modules = await db.module.findMany({
      orderBy: { order: 'asc' },
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
  }

  if (!user) {
    // If DB is offline or user not found, fallback to session user
    user = {
      name: session.user.name || 'Analyst',
      email: session.user.email,
      level: 1,
      totalXP: 0,
      progress: [],
      badges: [],
    } as any;
  }

  // Calculate stats
  const completedModules = user.progress?.filter((p: any) => p.status === 'COMPLETED').length || 0;
  const inProgressModules = user.progress?.filter((p: any) => p.status === 'IN_PROGRESS').length || 0;

  return (
    <div className="container py-8 space-y-8">
      <WelcomeSection
        name={user.name || 'Analyst'}
        level={user.level || 1}
        xp={user.totalXP || 0}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <BeginnerCourseBanner />

          <CurrentModuleCard
            moduleId="04"
            title="SOC Operations"
            description="Master the core workflows and responsibilities of a SOC Analyst L1"
            progress={45}
          />

          <LearningPath modules={modules} userProgress={user.progress || []} />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <ProgressOverview
            totalModules={18}
            completedModules={completedModules}
            inProgressModules={inProgressModules}
            totalXP={user.totalXP || 0}
            badges={user.badges?.length || 0}
          />

          <QuickActions />
        </div>
      </div>
    </div>
  );
}
