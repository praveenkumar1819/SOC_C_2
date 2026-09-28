import Link from 'next/link';
import { Lock, CheckCircle2, Clock, FlaskConical, Monitor } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { getDifficultyColor } from '@/lib/utils';

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
  const isLocked = module.isLocked && !progress;
  const isCompleted = progress?.status === 'COMPLETED';
  const isInProgress = progress?.status === 'IN_PROGRESS';

  return (
    <Card className={isLocked ? 'opacity-60' : ''}>
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <Badge variant="outline" className="text-xs">
            Module {module.id}
          </Badge>
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
        {progress && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{progress.completionPercentage}%</span>
            </div>
            <Progress value={progress.completionPercentage} className="h-2" />
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
          <div className="flex items-center gap-2 text-success">
            <CheckCircle2 className="h-4 w-4" />
            <span className="text-sm font-medium">Completed</span>
          </div>
        )}
      </CardContent>

      <CardFooter>
        {isLocked ? (
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
