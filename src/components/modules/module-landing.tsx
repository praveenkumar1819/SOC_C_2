'use client';

import Link from 'next/link';
import { ArrowLeft, Play, CheckCircle2, Clock, Target, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { getDifficultyColor } from '@/lib/utils';

interface ModuleLandingProps {
  module: {
    id: string;
    title: string;
    description: string;
    difficulty: string;
    estimatedHours: number;
    learningObjectives?: string[];
    topics?: Array<{
      id: string;
      title: string;
      order: number;
    }>;
  };
  progress?: {
    completionPercentage: number;
    status: string;
  } | null;
}

export function ModuleLanding({ module, progress }: ModuleLandingProps) {
  const isStarted = !!progress;
  const isCompleted = progress?.status === 'COMPLETED';
  const topics = module.topics || [];
  const learningObjectives = module.learningObjectives || [];
  const startHref = module.id === '04'
    ? '/modules/04/topics?topic=1&unit=1'
    : topics.length > 0
    ? `/modules/${module.id}/${topics[0].id}`
    : `/modules/${module.id}/topics`;

  return (
    <div className="container py-8 max-w-4xl">
      {/* Back Button */}
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/modules">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Modules
        </Link>
      </Button>

      {/* Header */}
      <div className="space-y-6 mb-8">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Badge variant="outline">Module {module.id}</Badge>
              <Badge className={getDifficultyColor(module.difficulty)}>
                {module.difficulty}
              </Badge>
            </div>
            <h1 className="text-4xl font-bold">{module.title}</h1>
            <p className="text-xl text-muted-foreground">
              {module.description}
            </p>
          </div>
        </div>

        {/* Progress */}
        {isStarted && (
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Your Progress</span>
                  <span className="text-sm text-muted-foreground">
                    {progress.completionPercentage}% Complete
                  </span>
                </div>
                <Progress value={progress.completionPercentage} className="h-2" />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="text-lg font-semibold">{module.estimatedHours} hours</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Topics</p>
                  <p className="text-lg font-semibold">{topics.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                  {isCompleted ? (
                    <CheckCircle2 className="h-5 w-5 text-success" />
                  ) : (
                    <Target className="h-5 w-5 text-primary" />
                  )}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="text-lg font-semibold">
                    {isCompleted ? 'Completed' : isStarted ? 'In Progress' : 'Not Started'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Learning Objectives */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>What You'll Learn</CardTitle>
        </CardHeader>
        <CardContent>
          {learningObjectives.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Module objectives will be covered in the interactive units.
            </p>
          ) : (
            <ul className="space-y-3">
              {learningObjectives.map((objective, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <span>{objective}</span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {/* Topics List */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Module Topics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {topics.length === 0 ? (
              <p className="text-sm text-muted-foreground py-2">
                Detailed topic units for this module are being finalized.
              </p>
            ) : (
              topics.map((topic, index) => {
                const topicHref = module.id === '04'
                  ? `/modules/04/topics?topic=${index + 1}&unit=1`
                  : `/modules/${module.id}/${topic.id}`;
                return (
                  <Link
                    key={topic.id}
                    href={topicHref}
                    className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                      {topic.order + 1}
                    </div>
                    <span className="flex-1 font-medium">{topic.title}</span>
                  </Link>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button size="lg" asChild>
          <Link href={startHref}>
            <Play className="mr-2 h-5 w-5" />
            {isStarted ? 'Continue Learning' : 'Start Module'}
          </Link>
        </Button>

        {module.id === '04' && (
          <Button size="lg" variant="outline" asChild>
            <Link href={`/modules/${module.id}/assessment`}>
              <Target className="mr-2 h-5 w-5" />
              Take Assessment (100 Pts)
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
