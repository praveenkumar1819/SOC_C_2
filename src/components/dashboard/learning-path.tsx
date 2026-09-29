'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle2, Circle, Lock, ChevronRight, Ban } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useAdminConfigStore } from '@/store/admin-config-store';

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
  const [mounted, setMounted] = useState(false);
  const { disabledModules } = useAdminConfigStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const progressMap = new Map(userProgress.map((p) => [p.moduleId, p.status]));

  // Show first 6 modules
  const visibleModules = modules.slice(0, 6);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Learning Path</CardTitle>
          <span className="text-xs text-muted-foreground">Select a module to view units and curriculum</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {visibleModules.map((module) => {
            const status = progressMap.get(module.id);
            const isCompleted = status === 'COMPLETED';
            const isInProgress = status === 'IN_PROGRESS';
            const isLocked = module.isLocked && !status && module.id !== '04';
            const isDisabled = mounted && disabledModules.includes(module.id);

            const content = (
              <div
                className={cn(
                  'flex items-center justify-between gap-4 p-4 rounded-xl border transition-all',
                  isCompleted && 'bg-emerald-50/20 border-emerald-300 hover:border-emerald-500',
                  isInProgress && 'bg-primary/5 border-primary/30 hover:border-primary',
                  !isCompleted && !isInProgress && 'bg-card hover:border-primary/40 hover:shadow-xs',
                  isLocked && 'opacity-60 bg-muted/20',
                  isDisabled && 'opacity-40 border-dashed pointer-events-none cursor-not-allowed bg-muted/40'
                )}
              >
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  <div className="flex-shrink-0">
                    {isCompleted && (
                      <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center shadow-xs">
                        <CheckCircle2 className="h-5 w-5 text-white" />
                      </div>
                    )}
                    {isInProgress && (
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-xs">
                        <Circle className="h-4 w-4 text-white fill-white" />
                      </div>
                    )}
                    {!isCompleted && !isInProgress && (
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        {isLocked ? (
                          <Lock className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Circle className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-muted-foreground font-mono">
                        Module {module.id}
                      </span>
                      {isInProgress && (
                        <Badge variant="outline" className="text-[10px] bg-primary/10 text-primary border-primary/20 py-0">
                          In Progress
                        </Badge>
                      )}
                      {isCompleted && (
                        <Badge variant="outline" className="text-[10px] bg-emerald-50 text-emerald-700 border-emerald-300 py-0">
                          Completed
                        </Badge>
                      )}
                      {isDisabled && (
                        <Badge variant="outline" className="text-[10px] bg-rose-50 text-rose-700 border-rose-300 py-0 gap-1">
                          <Ban className="w-2.5 h-2.5" />
                          Disabled by Admin
                        </Badge>
                      )}
                    </div>
                    <p className="font-semibold text-sm text-foreground truncate mt-0.5">
                      {module.title}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground flex-shrink-0">
                  <span className="text-xs font-medium hidden sm:inline">View Details</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            );

            if (isDisabled) {
              return (
                <div key={module.id} className="cursor-not-allowed">
                  {content}
                </div>
              );
            }

            return (
              <Link
                key={module.id}
                href={`/modules/${module.id}`}
                className="block focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-xl"
              >
                {content}
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
