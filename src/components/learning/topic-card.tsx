import React from 'react';
import Link from 'next/link';
import { BookOpen, CheckCircle, HelpCircle, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TopicCardProps {
  moduleId: string;
  topic: {
    id: string;
    title: string;
    description?: string | null;
    order: number;
    unitCount?: number;
    knowledgeCheckCount?: number;
    isCompleted?: boolean;
  };
}

export function TopicCard({ moduleId, topic }: TopicCardProps) {
  return (
    <Link href={`/modules/${moduleId}/${topic.id}`} className="block group">
      <Card className="transition-all duration-200 hover:shadow-md hover:border-primary/40 bg-background">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-secondary text-muted-foreground">
                Topic {topic.order + 1}
              </span>
              {topic.isCompleted && (
                <Badge variant="success" className="gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Completed
                </Badge>
              )}
            </div>
            <CardTitle className="text-base group-hover:text-primary transition-colors pt-1">
              {topic.title}
            </CardTitle>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
        </CardHeader>
        <CardContent className="space-y-3">
          {topic.description && (
            <CardDescription className="text-xs line-clamp-2">
              {topic.description}
            </CardDescription>
          )}
          <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t border-border">
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{topic.unitCount ?? 1} Units</span>
            </div>
            <div className="flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{topic.knowledgeCheckCount ?? 1} Knowledge Checks</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
