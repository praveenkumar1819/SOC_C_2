'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Play, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useProgressStore } from '@/store/progress-store';

interface CurrentModuleCardProps {
  moduleId: string;
  title: string;
  description: string;
  progress?: number;
}

const MODULE_04_TOPICS = [
  'topic-1-1', 'topic-1-2',
  'topic-2-1', 'topic-2-2',
  'topic-3-1', 'topic-3-2',
  'topic-4-1', 'topic-4-2',
  'topic-5-1', 'topic-5-2',
  'topic-6-1', 'topic-6-2',
  'topic-7-1', 'topic-7-2',
];

export function CurrentModuleCard({
  moduleId,
  title,
  description,
  progress: defaultProgress = 0,
}: CurrentModuleCardProps) {
  const [mounted, setMounted] = useState(false);
  const { completedTopics } = useProgressStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Compute live progress from real-time store
  const completedCount = mounted
    ? MODULE_04_TOPICS.filter((id) => completedTopics.has(id)).length
    : 0;
  const realProgress = mounted
    ? Math.round((completedCount / MODULE_04_TOPICS.length) * 100)
    : defaultProgress;

  return (
    <Card className="border-2 border-primary/20 bg-card shadow-xs">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-xs text-primary font-bold tracking-wider uppercase">
              {completedCount === 0 ? 'START LEARNING' : completedCount === 9 ? 'MODULE COMPLETE' : 'CONTINUE LEARNING'}
            </p>
            <CardTitle className="text-2xl font-extrabold text-foreground">Module {moduleId}</CardTitle>
            <CardTitle className="text-base font-semibold text-muted-foreground">{title}</CardTitle>
          </div>
          <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold font-mono">
            {realProgress}% Complete ({mounted ? `${completedCount}/${MODULE_04_TOPICS.length}` : '...'})
          </div>
        </div>
        <CardDescription className="text-sm mt-2 text-muted-foreground leading-relaxed">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
            <span>Curriculum Progress</span>
            <span className="font-semibold text-foreground">{realProgress}%</span>
          </div>
          <Progress value={realProgress} className="h-2.5 transition-all" />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-1">
          <Button asChild className="flex-1 font-bold text-xs gap-1.5">
            <Link href={`/modules/${moduleId}`}>
              {completedCount === 9 ? (
                <>
                  <CheckCircle2 className="mr-1.5 h-4 w-4 text-emerald-300" />
                  Review Module
                </>
              ) : (
                <>
                  <Play className="mr-1.5 h-4 w-4 fill-white" />
                  {completedCount === 0 ? 'Start Module' : 'Continue Learning'}
                </>
              )}
            </Link>
          </Button>
          <Button asChild variant="outline" className="text-xs font-semibold">
            <Link href="/modules">
              View All Modules
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
