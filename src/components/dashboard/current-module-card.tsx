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
    <div className="glass-panel glass-glossy border-2 border-primary/30 bg-gradient-to-br from-card/90 via-card/75 to-primary/5 dark:from-slate-900/80 dark:via-slate-900/60 dark:to-primary/10 backdrop-blur-2xl shadow-xl rounded-3xl overflow-hidden transition-all hover:border-primary/50 relative">
      {/* Subtle ambient light glow */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="p-6 sm:p-7 space-y-5 relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs text-primary font-black tracking-wider uppercase flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                ACTIVE SOC SIMULATOR
              </span>
              <Badge variant="outline" className="text-[10px] font-mono border-primary/30 text-primary glass-pill">
                Live Progression
              </Badge>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
              Module {moduleId}: {title}
            </h3>
            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground pt-0.5">
              <span className="text-primary font-bold">{parentUnit.title.split(':')[0]}</span>
              <span>•</span>
              <span className="text-foreground truncate max-w-[320px]">
                {nextPlayableTopic.title}
              </span>
            </div>
          </div>

          <div className="glass-pill bg-primary/15 text-primary border border-primary/30 px-3.5 py-1.5 rounded-full text-xs font-black shrink-0 shadow-sm shadow-primary/10">
            {progressPercent}% Complete
          </div>
        </div>

        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>

        {/* Progress Bar & Topic Counter */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-muted-foreground">
            <span>Progress: {completedCount} of {allTopics.length} Topics Completed</span>
            <span className="font-mono text-foreground font-black">{progressPercent}%</span>
          </div>
          <Progress value={progressPercent} className="h-2.5 rounded-full bg-muted/60" />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
          <Button asChild className="w-full sm:flex-1 font-extrabold text-xs gap-2.5 h-11 rounded-2xl bg-primary hover:bg-primary/90 text-white shadow-md shadow-primary/25 focus-beacon-pulse cursor-pointer">
            <Link href={targetUrl}>
              <Play className="h-4 w-4 fill-current" />
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
            className="w-full sm:w-auto text-xs font-bold gap-2 h-11 border-primary/25 bg-primary/5 hover:bg-primary/15 text-primary cursor-pointer rounded-2xl glass-pill"
            title="Browse all 18 modules & topics tree"
          >
            <Layers className="h-4 w-4 text-primary" />
            <span>Curriculum Tree</span>
          </Button>

          <Button asChild variant="ghost" size="sm" className="w-full sm:w-auto text-xs font-semibold text-muted-foreground hover:text-foreground h-11 rounded-2xl">
            <Link href="/modules">
              All Modules
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
