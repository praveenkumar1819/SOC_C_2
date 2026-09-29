'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, CheckCircle2, Trophy, Zap } from 'lucide-react';
import { useProgressStore } from '@/store/progress-store';

interface ProgressOverviewProps {
  totalModules: number;
  completedModules: number;
  inProgressModules: number;
  totalXP: number;
  badges: number;
}

export function ProgressOverview({
  totalModules,
  completedModules: initialCompletedModules,
  inProgressModules: initialInProgressModules,
  totalXP: initialTotalXP,
  badges: initialBadges,
}: ProgressOverviewProps) {
  const [mounted, setMounted] = useState(false);
  const { completedModules: storeCompletedModules, completedTopics: storeCompletedTopics, totalXP: storeXP } = useProgressStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const completedCount = mounted
    ? Math.max(initialCompletedModules, storeCompletedModules?.size || 0)
    : initialCompletedModules;

  const xpCount = mounted
    ? Math.max(initialTotalXP, storeXP || 0)
    : initialTotalXP;

  const inProgressCount = mounted
    ? (initialInProgressModules > 0
        ? initialInProgressModules
        : ((storeCompletedTopics?.size || 0) > 0 && completedCount === 0 ? 1 : 0))
    : initialInProgressModules;

  const completionPercentage = totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Completion */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Completed</p>
              <p className="text-xs text-muted-foreground">
                {completedCount} of {totalModules} modules
              </p>
            </div>
          </div>
          <span className="text-lg font-bold">{completionPercentage}%</span>
        </div>

        {/* In Progress */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">In Progress</p>
              <p className="text-xs text-muted-foreground">Active modules</p>
            </div>
          </div>
          <span className="text-lg font-bold">{inProgressCount}</span>
        </div>

        {/* XP */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Zap className="h-5 w-5 text-amber-500" />
            </div>
            <div>
              <p className="text-sm font-medium">Experience</p>
              <p className="text-xs text-muted-foreground">Total XP earned</p>
            </div>
          </div>
          <span className="text-lg font-bold">{xpCount.toLocaleString()}</span>
        </div>

        {/* Badges */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <Trophy className="h-5 w-5 text-amber-500" />
            </div>
            <div>
              <p className="text-sm font-medium">Badges</p>
              <p className="text-xs text-muted-foreground">Achievements earned</p>
            </div>
          </div>
          <span className="text-lg font-bold">{initialBadges}</span>
        </div>
      </CardContent>
    </Card>
  );
}
