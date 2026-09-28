import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import { ModuleGrid } from '@/components/modules/module-grid';

export const dynamic = 'force-dynamic';

export default async function ModulesPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/login');
  }

  let user = null;
  let modules: any[] = [];
  try {
    user = await db.user.findUnique({
      where: { email: session.user.email! },
      include: {
        progress: true,
      },
    });

    modules = await db.module.findMany({
      orderBy: { order: 'asc' },
    });
  } catch (error) {
    console.error('Error fetching modules page data:', error);
  }

  return (
    <div className="container py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Course Modules</h1>
        <p className="text-muted-foreground">
          Complete all 18 modules to become a certified SOC Analyst L1
        </p>
      </div>

      <ModuleGrid modules={modules} userProgress={user?.progress || []} />
    </div>
  );
}
