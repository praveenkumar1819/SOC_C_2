import { redirect } from 'next/navigation';

interface TopicsPageProps {
  params: {
    moduleId: string;
  };
  searchParams: {
    topic?: string;
    unit?: string;
  };
}

export default function TopicsPage({ params, searchParams }: TopicsPageProps) {
  const topicQuery = searchParams.topic ? `topic-${searchParams.topic}-1` : 'topic-1-1';
  redirect(`/modules/${params.moduleId}?topic=${topicQuery}`);
}
