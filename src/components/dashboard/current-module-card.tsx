'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Play, Layers, CheckCircle2, BookOpen, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MODULE_04_UNITS } from '@/data/modules/module-04-units';
import { useProgressStore } from '@/store/progress-store';

interface CurrentModuleCardProps {
  moduleId?: string;
  title?: string;
  description?: string;
  progress?: number;
}

export function CurrentModuleCard({
  moduleId = '04',
  title = 'SOC Operations',
  description = 'Master the core workflows and responsibilities of a SOC Analyst L1',
  progress: initialProgress = 0,
}: CurrentModuleCardProps) {
  const [mounted, setMounted] = useState(false);
  const { completedTopics } = useProgressStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Compute real-time Module 04 topic metrics
  const allTopics = MODULE_04_UNITS.flatMap((u) => u.topics);
  const completedCount = mounted ? allTopics.filter((t) => completedTopics.has(t.id)).length : 0;
  const progressPercent = allTopics.length > 0 ? Math.round((completedCount / allTopics.length) * 100) : initialProgress;

  // Find next uncompleted topic
  const nextPlayableTopic = mounted
    ? allTopics.find((t) => !completedTopics.has(t.id)) || allTopics[0]
    : allTopics[0];

  const parentUnit = MODULE_04_UNITS.find((u) => u.topics.some((t) => t.id === nextPlayableTopic.id)) || MODULE_04_UNITS[0];

  const targetUrl = `/modules/04?topic=${nextPlayableTopic.id}`;

  const isAllComplete = completedCount === allTopics.length && allTopics.length > 0;

  return (
    <Card className="border-2 border-primary/20 shadow-xs overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs text-primary font-bold tracking-wider uppercase">
                CONTINUE LEARNING
              </span>
              <Badge variant="outline" className="text-[10px] font-mono border-primary/30 text-primary">
                Live Progress
              </Badge>
            </div>
            <CardTitle className="text-2xl font-bold">
              Module {moduleId}: {title}
            </CardTitle>
            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground pt-0.5">
              <span>{parentUnit.title.split(':')[0]}</span>
              <span>•</span>
              <span className="text-foreground truncate max-w-[280px]">
                {nextPlayableTopic.title}
              </span>
            </div>
          </div>

          <div className="bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full text-xs font-bold shrink-0">
            {progressPercent}% Complete
          </div>
        </div>

        <CardDescription className="text-xs text-muted-foreground mt-2">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Progress Bar & Topic Counter */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
            <span>Progress: {completedCount} of {allTopics.length} Topics Completed</span>
            <span className="font-bold text-foreground">{progressPercent}%</span>
          </div>
          <Progress value={progressPercent} className="h-2.5" />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-1">
          <Button asChild className="w-full sm:flex-1 font-bold text-xs gap-2 h-10 shadow-xs">
            <Link href={targetUrl}>
              <Play className="h-3.5 w-3.5 fill-current" />
              <span>
                {isAllComplete
                  ? 'Review Module Topics'
                  : completedCount === 0
                  ? 'Start: Topic 1.1 • People'
                  : `Continue: ${nextPlayableTopic.title.split(':')[0]}`}
              </span>
            </Link>
          </Button>

          <Button
            variant="outline"
            onClick={() => window.dispatchEvent(new CustomEvent('soc:open-curriculum-drawer'))}
            className="w-full sm:w-auto text-xs font-semibold gap-1.5 h-10 border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary cursor-pointer shadow-2xs"
            title="Browse all 18 modules & topics tree"
          >
            <Layers className="h-3.5 w-3.5 text-primary" />
            <span>Curriculum Tree</span>
          </Button>

          <Button asChild variant="ghost" size="sm" className="w-full sm:w-auto text-xs text-muted-foreground hover:text-foreground h-10">
            <Link href="/modules">
              All Modules
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
