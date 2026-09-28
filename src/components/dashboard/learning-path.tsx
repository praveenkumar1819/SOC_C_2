import { CheckCircle2, Circle, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Module {
  id: string;
  title: string;
  order: number;
  isLocked: boolean;
}

interface Progress {
  moduleId: string;
  status: string;
}

interface LearningPathProps {
  modules: Module[];
  userProgress: Progress[];
}

export function LearningPath({ modules, userProgress }: LearningPathProps) {
  const progressMap = new Map(userProgress.map(p => [p.moduleId, p.status]));

  // Show first 6 modules
  const visibleModules = modules.slice(0, 6);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Learning Path</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {visibleModules.map((module) => {
            const status = progressMap.get(module.id);
            const isCompleted = status === 'COMPLETED';
            const isInProgress = status === 'IN_PROGRESS';
            const isLocked = module.isLocked && !status;

            return (
              <div
                key={module.id}
                className={cn(
                  'flex items-center gap-4 p-4 rounded-lg border transition-colors',
                  isCompleted && 'bg-success/5 border-success/20',
                  isInProgress && 'bg-primary/5 border-primary/20',
                  isLocked && 'opacity-50'
                )}
              >
                <div className="flex-shrink-0">
                  {isCompleted && (
                    <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center">
                      <CheckCircle2 className="h-5 w-5 text-white" />
                    </div>
                  )}
                  {isInProgress && (
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <Circle className="h-5 w-5 text-white fill-white" />
                    </div>
                  )}
                  {!isCompleted && !isInProgress && (
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      {isLocked ? (
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      Module {module.id}
                    </span>
                    {isInProgress && (
                      <Badge variant="outline" className="text-xs">In Progress</Badge>
                    )}
                    {isCompleted && (
                      <Badge variant="outline" className="text-xs bg-success/10 text-success border-success/20">
                        Completed
                      </Badge>
                    )}
                  </div>
                  <p className="font-medium truncate">{module.title}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
