import { redirect } from 'next/navigation';

interface TopicsPageProps {
  params: {
    moduleId: string;
  };
  searchParams: {
    topic?: string;
    unit?: string;
    assessment?: string;
  };
}

export default function TopicsPage({ params, searchParams }: TopicsPageProps) {
  const { topic, unit, assessment } = searchParams;

  // Direct assessment link
  if (assessment) {
    let cleanAssessment = assessment.trim();
    if (!cleanAssessment.includes('assessment')) {
      const uNum = cleanAssessment.replace('unit-', '');
      cleanAssessment = `unit-${uNum}-assessment`;
    }
    redirect(`/modules/${params.moduleId}?assessment=${cleanAssessment}`);
  }

  // Unit specified: /modules/04/topics?unit=2 or ?unit=unit-2
  if (unit) {
    const cleanUnit = unit.replace('unit-', '').replace('.', '-');
    if (topic) {
      const cleanTopic = topic.replace('topic-', '').replace('.', '-');
      if (cleanTopic.includes('-')) {
        redirect(`/modules/${params.moduleId}?topic=topic-${cleanTopic}`);
      } else {
        redirect(`/modules/${params.moduleId}?topic=topic-${cleanUnit}-${cleanTopic}`);
      }
    } else {
      // Default to first topic of specified unit
      redirect(`/modules/${params.moduleId}?topic=topic-${cleanUnit}-1`);
    }
  }

  // Topic specified without unit
  if (topic) {
    const raw = topic.trim();
    if (raw.startsWith('unit-')) {
      const uNum = raw.replace(/^unit-/, '');
      if (uNum.includes('-')) {
        redirect(`/modules/${params.moduleId}?topic=topic-${uNum}`);
      } else {
        redirect(`/modules/${params.moduleId}?topic=topic-${uNum}-1`);
      }
    } else {
      const clean = raw.replace(/^topic-/, '').replace('.', '-');
      if (clean.includes('-')) {
        redirect(`/modules/${params.moduleId}?topic=topic-${clean}`);
      } else {
        redirect(`/modules/${params.moduleId}?topic=topic-${clean}-1`);
      }
    }
  }

  // Default fallback
  redirect(`/modules/${params.moduleId}`);
}
