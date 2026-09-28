import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, CheckCircle2, Trophy, Zap } from 'lucide-react';

interface ProgressOverviewProps {
  totalModules: number;
  completedModules: number;
  inProgressModules: number;
  totalXP: number;
  badges: number;
}

export function ProgressOverview({
  totalModules,
  completedModules,
  inProgressModules,
  totalXP,
  badges,
}: ProgressOverviewProps) {
  const completionPercentage = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Completion */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-sm font-medium">Completed</p>
              <p className="text-xs text-muted-foreground">
                {completedModules} of {totalModules} modules
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
          <span className="text-lg font-bold">{inProgressModules}</span>
        </div>

        {/* XP */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <Zap className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-sm font-medium">Experience</p>
              <p className="text-xs text-muted-foreground">Total XP earned</p>
            </div>
          </div>
          <span className="text-lg font-bold">{totalXP.toLocaleString()}</span>
        </div>

        {/* Badges */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <Trophy className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-sm font-medium">Badges</p>
              <p className="text-xs text-muted-foreground">Achievements earned</p>
            </div>
          </div>
          <span className="text-lg font-bold">{badges}</span>
        </div>
      </CardContent>
    </Card>
  );
}
