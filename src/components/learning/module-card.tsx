import React from 'react';
import Link from 'next/link';
import { Lock, Clock, Terminal, ShieldCheck, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { getDifficultyColor } from '@/lib/utils';
import { Module } from '@/types';

interface ModuleCardProps {
  module: Module;
  progressPercentage?: number;
}

export function ModuleCard({ module, progressPercentage = 0 }: ModuleCardProps) {
  const isLocked = module.isLocked;

  const CardWrapper = ({ children }: { children: React.ReactNode }) => {
    if (isLocked) {
      return (
        <div className="relative group opacity-85 hover:opacity-100 transition-opacity">
          {children}
        </div>
      );
    }
    return (
      <Link href={`/modules/${module.id}`} className="block group">
        {children}
      </Link>
    );
  };

  return (
    <CardWrapper>
      <Card className="h-full flex flex-col transition-all duration-200 hover:shadow-md hover:border-primary/40 bg-background">
        <CardHeader className="space-y-2 pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-secondary text-foreground">
                MOD {module.id}
              </span>
              <Badge className={getDifficultyColor(module.difficulty)}>
                {module.difficulty}
              </Badge>
            </div>
            {isLocked ? (
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground font-medium bg-secondary px-2 py-0.5 rounded-full">
                <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                Locked
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs text-success font-medium bg-success-light px-2 py-0.5 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-success" />
                Available
              </span>
            )}
          </div>
          <CardTitle className="text-lg group-hover:text-primary transition-colors">
            {module.title}
          </CardTitle>
          <CardDescription className="line-clamp-2 text-xs">
            {module.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 flex-1">
          {/* Metrics */}
          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground pt-1 border-t border-border">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-muted-foreground" />
              <span>{module.estimatedHours}h est.</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-muted-foreground" />
              <span>{module.resourceLabs + module.liveLabs} Labs</span>
            </div>
          </div>

          {/* Progress */}
          {!isLocked && (
            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-semibold text-foreground">{progressPercentage}%</span>
              </div>
              <Progress value={progressPercentage} className="h-1.5" />
            </div>
          )}
        </CardContent>

        <CardFooter className="pt-0 border-t border-border/50 flex justify-between items-center text-xs font-medium text-primary">
          <span>{isLocked ? 'Prerequisites required' : 'Enter Module'}</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </CardFooter>
      </Card>
    </CardWrapper>
  );
}
