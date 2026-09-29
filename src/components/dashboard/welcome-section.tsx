'use client';

import { useState, useEffect } from 'react';
import { Trophy, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { calculateLevel, xpToNextLevel } from '@/lib/utils';
import { useProgressStore } from '@/store/progress-store';

interface WelcomeSectionProps {
  name: string;
  level: number;
  xp: number;
}

export function WelcomeSection({ name, level: initialLevel, xp: initialXP }: WelcomeSectionProps) {
  const [mounted, setMounted] = useState(false);
  const { totalXP } = useProgressStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeXP = mounted ? Math.max(initialXP, totalXP) : initialXP;
  const activeLevel = mounted ? calculateLevel(activeXP) : initialLevel;

  const nextLevelXP = xpToNextLevel(activeXP);
  const currentLevelXP = (activeLevel - 1) * 1000;
  const levelProgress = Math.min(Math.max(((activeXP - currentLevelXP) / 1000) * 100, 0), 100);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold">Welcome back, {name}</h1>
        <p className="text-muted-foreground mt-0.5">
          Continue your journey to becoming a certified SOC Analyst L1
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Level Card */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Current Level</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">{activeLevel}</span>
                <Trophy className="h-6 w-6 text-warning" />
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Next Level</p>
              <p className="text-lg font-semibold">{nextLevelXP} XP</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: `${levelProgress}%` }}
              />
            </div>
          </div>
        </Card>

        {/* XP Card */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total XP</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">{activeXP.toLocaleString()}</span>
                <Zap className="h-6 w-6 text-warning" />
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Complete topics, investigations & quizzes to earn more experience points
          </p>
        </Card>
      </div>
    </div>
  );
}
