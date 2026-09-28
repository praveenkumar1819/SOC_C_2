import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import module04Data from '@/data/modules/module-04.json';
import { ModuleAssessment } from '@/components/learning/module-assessment';

interface AssessmentPageProps {
  params: {
    moduleId: string;
  };
}

export const dynamic = 'force-dynamic';

export default async function AssessmentPage({ params }: AssessmentPageProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/login');
  }

  if (params.moduleId !== '04') {
    return (
      <div className="container py-16 text-center max-w-xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Assessment Coming Soon</h1>
        <p className="text-sm text-muted-foreground">
          Module {params.moduleId} assessment will be unlocked in the next release.
        </p>
      </div>
    );
  }

  if (!module04Data.assessment) {
    notFound();
  }

  return (
    <ModuleAssessment
      moduleId={params.moduleId}
      assessment={module04Data.assessment}
    />
  );
}
