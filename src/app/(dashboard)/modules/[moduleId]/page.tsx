import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { redirect, notFound } from 'next/navigation';
import { ModuleDetailsView } from '@/components/modules/module-details-view';
import { getCurriculumModule } from '@/lib/curriculum-store';

interface ModulePageProps {
  params: {
    moduleId: string;
  };
  searchParams?: {
    topic?: string;
    unit?: string;
    assessment?: string;
  };
}

export const dynamic = 'force-dynamic';

export default async function ModulePage({ params, searchParams }: ModulePageProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/login');
  }

  let moduleData = null;

  try {
    const cleanId = params.moduleId.replace(/^M0?/, '').padStart(2, '0');
    moduleData = await db.module.findUnique({
      where: { id: params.moduleId },
      include: {
        topics: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!moduleData) {
      moduleData = await db.module.findUnique({
        where: { id: cleanId },
        include: {
          topics: {
            orderBy: { order: 'asc' },
          },
        },
      });
    }

    if (!moduleData) {
      notFound();
    }
  } catch (error) {
    console.error('Error fetching module page data:', error);
  }

  if (!moduleData) {
    notFound();
  }

  const v2Module = getCurriculumModule(params.moduleId);
  const isAdmin = (session.user as any)?.role === 'ADMIN';

  return (
    <ModuleDetailsView
      module={moduleData}
      v2Module={v2Module}
      isAdmin={isAdmin}
      initialTopicId={searchParams?.topic || null}
      initialUnitId={searchParams?.unit || null}
      initialAssessmentId={searchParams?.assessment || null}
    />
  );
}
