'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Lock, CheckCircle2, Clock, FlaskConical, Monitor, Ban } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { getDifficultyColor } from '@/lib/utils';
import { useAdminConfigStore } from '@/store/admin-config-store';
import { useProgressStore } from '@/store/progress-store';

interface ModuleCardProps {
  module: {
    id: string;
    title: string;
    description: string;
    difficulty: string;
    estimatedHours: number;
    resourceLabs: number;
    liveLabs: number;
    isLocked: boolean;
  };
  progress?: {
    status: string;
    completionPercentage: number;
  };
}

export function ModuleCard({ module, progress }: ModuleCardProps) {
  const [mounted, setMounted] = useState(false);
  const { freeNavigationEnabled, unlockedAssessments, disabledModules } = useAdminConfigStore();
  const { completedModules, completedTopics } = useProgressStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isFreeNav = mounted && (freeNavigationEnabled || unlockedAssessments.includes('unlock-all'));
  const isDisabled = mounted && disabledModules.includes(module.id);

  // Calculate live progress for Module 00 and Module 04
  let effectiveProgress = progress;
  if (mounted && module.id === '00') {
    const m00TopicsCount = 8;
    const completedM00Topics = Array.from(completedTopics || []).filter(
      (t) => t.startsWith('topic-0-')
    ).length;
    if (completedM00Topics > 0 || completedModules.has('00')) {
      const isComplete = completedModules.has('00') || completedM00Topics >= m00TopicsCount;
      const pct = isComplete ? 100 : Math.round((completedM00Topics / m00TopicsCount) * 100);
      effectiveProgress = {
        status: isComplete ? 'COMPLETED' : 'IN_PROGRESS',
        completionPercentage: pct,
      };
    }
  } else if (mounted && module.id === '04') {
    const m04TopicsCount = 23;
    const completedM04Topics = Array.from(completedTopics || []).filter(
      (t) => t.startsWith('m04-') || t.startsWith('t') || t.startsWith('u')
    ).length;
    if (completedM04Topics > 0 || completedModules.has('04')) {
      const isComplete = completedModules.has('04') || completedM04Topics >= m04TopicsCount;
      const pct = isComplete ? 100 : Math.round((completedM04Topics / m04TopicsCount) * 100);
      effectiveProgress = {
        status: isComplete ? 'COMPLETED' : 'IN_PROGRESS',
        completionPercentage: pct,
      };
    }
  }

  const isLocked = !isFreeNav && module.isLocked && !effectiveProgress && module.id !== '04' && module.id !== '00';
  const isCompleted = effectiveProgress?.status === 'COMPLETED';
  const isInProgress = effectiveProgress?.status === 'IN_PROGRESS';

  return (
    <Card className={isLocked || isDisabled ? 'opacity-60' : ''}>
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              Module {module.id}
            </Badge>
            {isDisabled && (
              <Badge variant="outline" className="text-[10px] bg-rose-50 text-rose-700 border-rose-300 py-0 gap-1">
                <Ban className="w-2.5 h-2.5" />
                Disabled
              </Badge>
            )}
          </div>
          <Badge className={getDifficultyColor(module.difficulty)}>
            {module.difficulty}
          </Badge>
        </div>
        <CardTitle className="line-clamp-1">{module.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {module.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Progress */}
        {effectiveProgress && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{effectiveProgress.completionPercentage}%</span>
            </div>
            <Progress value={effectiveProgress.completionPercentage} className="h-2" />
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {module.estimatedHours}h
          </div>
          <div className="flex items-center gap-1">
            <FlaskConical className="h-4 w-4" />
            {module.resourceLabs}
          </div>
          <div className="flex items-center gap-1">
            <Monitor className="h-4 w-4" />
            {module.liveLabs}
          </div>
        </div>

        {/* Status Badge */}
        {isCompleted && (
          <div className="flex items-center gap-2 text-emerald-600">
            <CheckCircle2 className="h-4 w-4" />
            <span className="text-sm font-medium">Completed</span>
          </div>
        )}
      </CardContent>

      <CardFooter>
        {isDisabled ? (
          <Button disabled variant="outline" className="w-full opacity-60">
            Disabled by Admin
          </Button>
        ) : isLocked ? (
          <Button disabled className="w-full">
            <Lock className="mr-2 h-4 w-4" />
            Locked
          </Button>
        ) : (
          <Button asChild className="w-full">
            <Link href={`/modules/${module.id}`}>
              {isCompleted ? 'Review' : isInProgress ? 'Continue' : 'Start Module'}
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
