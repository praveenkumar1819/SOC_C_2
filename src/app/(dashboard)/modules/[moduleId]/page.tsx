import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { redirect, notFound } from 'next/navigation';
import { ModuleLanding } from '@/components/modules/module-landing';

interface ModulePageProps {
  params: {
    moduleId: string;
  };
}

export const dynamic = 'force-dynamic';

export default async function ModulePage({ params }: ModulePageProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/login');
  }

  let moduleData = null;
  let progress = null;

  try {
    moduleData = await db.module.findUnique({
      where: { id: params.moduleId },
      include: {
        topics: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!moduleData) {
      notFound();
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email! },
      include: {
        progress: {
          where: { moduleId: params.moduleId },
        },
      },
    });

    progress = user?.progress[0] || null;
  } catch (error) {
    console.error('Error fetching module page data:', error);
  }

  if (!moduleData) {
    notFound();
  }

  return (
    <ModuleLanding
      module={moduleData}
      progress={progress}
    />
  );
}
