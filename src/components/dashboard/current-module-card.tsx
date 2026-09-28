'use client';

import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface CurrentModuleCardProps {
  moduleId: string;
  title: string;
  description: string;
  progress: number;
}

export function CurrentModuleCard({
  moduleId,
  title,
  description,
  progress,
}: CurrentModuleCardProps) {
  return (
    <Card className="border-2 border-primary/20">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm text-primary font-medium">CONTINUE LEARNING</p>
            <CardTitle className="text-2xl">Module {moduleId}</CardTitle>
            <CardTitle className="text-lg font-semibold text-muted-foreground">{title}</CardTitle>
          </div>
          <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
            {progress}% Complete
          </div>
        </div>
        <CardDescription className="text-base mt-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Progress value={progress} className="h-2" />

        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild className="flex-1">
            <Link href={`/modules/${moduleId}`}>
              <Play className="mr-2 h-4 w-4" />
              Continue Learning
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/modules">
              View All Modules
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
