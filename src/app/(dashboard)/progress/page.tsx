import React from 'react';
import { db } from '@/lib/db';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Award, Flame, CheckCircle, Clock, Shield } from 'lucide-react';
import { calculateLevel, xpToNextLevel } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function ProgressPage() {
  let modules: any[] = [];
  let badges: any[] = [];
  try {
    [modules, badges] = await Promise.all([
      db.module.findMany({
        orderBy: { order: 'asc' },
      }),
      db.badge.findMany({
        orderBy: { xpBonus: 'desc' },
      }),
    ]);
  } catch (error) {
    console.error('Error fetching progress data:', error);
  }

  const currentXP = 0;
  const currentStreak = 0;
  const level = calculateLevel(currentXP);
  const xpNeeded = xpToNextLevel(currentXP);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-primary font-semibold text-xs tracking-wider uppercase">
          <TrendingUp className="w-4 h-4" />
          <span>Analyst Development</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          My Learning Progress
        </h1>
        <p className="text-sm text-muted-foreground">
          Track your course completion, experience points, badge achievements, and daily study streaks.
        </p>
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Analyst Level</span>
              <Shield className="w-4 h-4 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">Level {level}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{currentXP} XP</span>
              <span>{xpNeeded} XP to Level {level + 1}</span>
            </div>
            <Progress value={(currentXP % 1000) / 10} className="h-1.5" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Active Streak</span>
              <Flame className="w-4 h-4 text-orange-500" />
            </div>
            <CardTitle className="text-2xl font-bold text-orange-600">{currentStreak} Days</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Log in daily and complete units to keep your momentum going.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Badges Earned</span>
              <Award className="w-4 h-4 text-warning" />
            </div>
            <CardTitle className="text-2xl font-bold">0 / {badges.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Milestone badges unlock automatically upon completing key modules.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Module Completion Roadmap */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground">Module Progress Roadmap</h2>
        <Card>
          <CardContent className="p-0 divide-y divide-border">
            {modules.map((m) => (
              <div
                key={m.id}
                className="flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-secondary text-foreground">
                    MOD {m.id}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{m.title}</h3>
                    <p className="text-xs text-muted-foreground">{m.estimatedHours}h • {m.difficulty}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Badge variant={m.isLocked ? 'secondary' : 'outline'} className="text-xs">
                    {m.isLocked ? 'Locked' : 'Available'}
                  </Badge>
                  <div className="w-24 hidden sm:block">
                    <Progress value={0} className="h-1.5" />
                  </div>
                  <span className="text-xs font-semibold text-muted-foreground w-10 text-right">
                    0%
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Badges Gallery */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground">Available Badges</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((b) => (
            <Card key={b.name} className="opacity-80 hover:opacity-100 transition-opacity">
              <CardHeader className="p-4 space-y-2 text-center">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mx-auto text-primary">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-sm font-semibold">{b.name}</CardTitle>
                <CardDescription className="text-xs leading-normal">
                  {b.description}
                </CardDescription>
                <div className="text-[11px] font-semibold text-warning">+{b.xpBonus} XP</div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
