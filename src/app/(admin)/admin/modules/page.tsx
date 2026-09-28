import React from 'react';
import { db } from '@/lib/db';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Lock, Unlock, Eye, Edit3 } from 'lucide-react';
import { getDifficultyColor } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function AdminModulesPage() {
  let modules: any[] = [];
  try {
    modules = await db.module.findMany({
      orderBy: { order: 'asc' },
      include: {
        _count: {
          select: {
            topics: true,
            scenarios: true,
          },
        },
      },
    });
  } catch (error) {
    console.error('Error fetching admin modules:', error);
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-semibold text-xs tracking-wider uppercase">
            <BookOpen className="w-4 h-4" />
            <span>Curriculum Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            SOC Modules ({modules.length})
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage course configuration, unlock rules, and lab assignments for Modules 00-17.
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {modules.map((mod) => (
              <div
                key={mod.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-3 hover:bg-secondary/20 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-secondary text-foreground">
                      MOD {mod.id}
                    </span>
                    <h3 className="font-semibold text-sm text-foreground">{mod.title}</h3>
                    <Badge className={getDifficultyColor(mod.difficulty)}>
                      {mod.difficulty}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-1">{mod.description}</p>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <span className="text-muted-foreground">
                    {mod.estimatedHours}h • {mod._count.topics} Topics • {mod.resourceLabs + mod.liveLabs} Labs
                  </span>
                  <div className="flex items-center gap-1.5">
                    {mod.isLocked ? (
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                        <Lock className="w-3 h-3" /> Locked
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs text-success bg-success-light px-2 py-0.5 rounded">
                        <Unlock className="w-3 h-3" /> Unlocked
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
