import { db } from '@/lib/db';
import { StatsCards } from '@/components/admin/stats-cards';
import { RecentActivity } from '@/components/admin/recent-activity';
import { ModuleCompletionChart } from '@/components/admin/module-completion-chart';
import { TopPerformers } from '@/components/admin/top-performers';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  // Fetch stats
  const totalUsers = await db.user.count();
  const totalModules = await db.module.count();
  const totalProgress = await db.progress.count();
  const completedModules = await db.progress.count({
    where: { status: 'COMPLETED' },
  });

  const activeUsers = await db.user.count({
    where: {
      lastActive: {
        gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
      },
    },
  });

  // Fetch top performers
  const topPerformers = await db.user.findMany({
    orderBy: { totalXP: 'desc' },
    take: 5,
    select: {
      id: true,
      name: true,
      email: true,
      totalXP: true,
      level: true,
      progress: {
        where: { status: 'COMPLETED' },
      },
    },
  });

  // Fetch module completion data
  const modules = await db.module.findMany({
    select: {
      id: true,
      title: true,
      progress: {
        where: { status: 'COMPLETED' },
      },
    },
  });

  const moduleStats = modules.map((module: any) => ({
    name: `Module ${module.id}`,
    completions: module.progress ? module.progress.length : 0,
  }));

  const stats = {
    totalUsers,
    activeUsers: Math.max(activeUsers, 1),
    totalModules,
    completedModules,
    completionRate: totalProgress > 0 ? Math.round((completedModules / totalProgress) * 100) : 0,
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Platform overview, real-time engagement, and key learning metrics.
        </p>
      </div>

      <StatsCards stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ModuleCompletionChart data={moduleStats} />
        <TopPerformers performers={topPerformers} />
      </div>

      <RecentActivity />
    </div>
  );
}
