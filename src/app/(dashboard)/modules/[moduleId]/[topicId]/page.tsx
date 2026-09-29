import { redirect } from 'next/navigation';

interface SingleTopicPageProps {
  params: {
    moduleId: string;
    topicId: string;
  };
}

export default function SingleTopicPage({ params }: SingleTopicPageProps) {
  redirect(`/modules/${params.moduleId}?topic=${params.topicId}`);
}
