import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import module04Data from '@/data/modules/module-04.json';
import { TopicLearning } from '@/components/learning/topic-learning';

interface TopicsPageProps {
  params: {
    moduleId: string;
  };
  searchParams: {
    topic?: string;
    unit?: string;
  };
}

export const dynamic = 'force-dynamic';

export default async function TopicsPage({ params, searchParams }: TopicsPageProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/login');
  }

  if (params.moduleId !== '04') {
    return (
      <div className="container py-16 text-center max-w-xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Module Content Coming Soon</h1>
        <p className="text-sm text-muted-foreground">
          Module {params.moduleId} is currently in curriculum review. Module 04 (SOC Operations) is fully playable.
        </p>
      </div>
    );
  }

  const currentTopicIndex = searchParams.topic ? Math.max(0, parseInt(searchParams.topic, 10) - 1) : 0;
  const currentUnitIndex = searchParams.unit ? Math.max(0, parseInt(searchParams.unit, 10) - 1) : 0;

  const currentTopic = module04Data.topics[currentTopicIndex];
  const currentUnit = currentTopic?.units[currentUnitIndex];

  if (!currentTopic || !currentUnit) {
    notFound();
  }

  return (
    <TopicLearning
      moduleId={params.moduleId}
      topic={currentTopic}
      unit={currentUnit}
      topicIndex={currentTopicIndex}
      unitIndex={currentUnitIndex}
      totalTopics={module04Data.topics.length}
      totalUnits={currentTopic.units.length}
    />
  );
}
