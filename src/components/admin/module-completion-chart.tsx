'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

interface ModuleCompletionChartProps {
  data: Array<{
    name: string;
    completions: number;
  }>;
}

export function ModuleCompletionChart({ data }: ModuleCompletionChartProps) {
  const maxCompletions = Math.max(...data.map((d) => d.completions), 1);

  return (
    <Card className="border border-border/80 shadow-xs">
      <CardHeader className="pb-3 border-b border-border/60">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          <CardTitle className="text-base font-bold text-foreground">Module Completion Stats</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          {data.slice(0, 8).map((module, index) => (
            <div key={index} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="font-semibold text-foreground">{module.name}</span>
                <span className="text-muted-foreground font-mono">
                  {module.completions} completions
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.max((module.completions / maxCompletions) * 100, module.completions > 0 ? 8 : 2)}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
