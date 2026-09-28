import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle, Lightbulb, Terminal, AlertCircle } from 'lucide-react';

interface TopicPageProps {
  params: {
    moduleId: string;
    topicId: string;
  };
}

export const dynamic = 'force-dynamic';

export default async function TopicDetailPage({ params }: TopicPageProps) {
  if (params.moduleId === '04') {
    let topicNum = '1';
    if (params.topicId.startsWith('topic-')) {
      topicNum = params.topicId.replace('topic-', '');
    } else if (!isNaN(Number(params.topicId))) {
      topicNum = params.topicId;
    }
    redirect(`/modules/04/topics?topic=${topicNum}&unit=1`);
  }

  let topic = null;
  try {
    topic = await db.topic.findUnique({
      where: { id: params.topicId },
      include: {
        module: true,
        units: {
          orderBy: { order: 'asc' },
        },
        knowledgeChecks: {
          orderBy: { order: 'asc' },
        },
      },
    });
  } catch (error) {
    console.error('Error fetching topic:', error);
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fade-in">
      {/* Navigation breadcrumb */}
      <div>
        <Link
          href={`/modules/${params.moduleId}`}
          className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Module {params.moduleId}
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-2 border-b border-border pb-6">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            Module {params.moduleId}
          </Badge>
          <span className="text-xs text-muted-foreground font-mono">
            Topic {topic?.order ? topic.order + 1 : 1}
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          {topic?.title || `Topic Overview (${params.topicId})`}
        </h1>
        {topic?.description && (
          <p className="text-sm text-muted-foreground">{topic.description}</p>
        )}
      </div>

      {/* Learning Unit Content View */}
      <div className="space-y-6">
        <Card className="border-border">
          <CardHeader>
            <div className="flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>Core Theory & Concepts</span>
            </div>
            <CardTitle className="text-lg">Foundational Principles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              In security operations, analysts must understand the system telemetry, log artifacts, and communication patterns that distinguish authorized operational traffic from malicious adversary behaviors.
            </p>
            
            {/* Tech Box Callout */}
            <div className="p-4 rounded-xl bg-secondary/80 border border-border space-y-2 text-foreground">
              <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                <Terminal className="w-4 h-4" />
                <span>Analyst Field Note</span>
              </div>
              <p className="text-xs text-muted-foreground font-mono leading-relaxed">
                Always establish baseline normal activity before evaluating anomalies. False positives frequently arise from benign administrative maintenance and system updates.
              </p>
            </div>

            {/* Real World Example */}
            <div className="p-4 rounded-xl bg-primary-50/50 border border-primary-100 space-y-2 text-foreground">
              <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                <Lightbulb className="w-4 h-4 text-primary" />
                <span>Real-World SOC Scenario</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                When an alert triggers for suspicious PowerShell invocation with encoded commands (`-enc`), inspect the parent process (`Explorer.exe` vs `ScheduledTask` or `cmd.exe`) to deduce the execution context.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between pt-4">
          <Link href={`/modules/${params.moduleId}`}>
            <Button variant="outline" size="sm" className="gap-2 text-xs">
              <ArrowLeft className="w-3.5 h-3.5" /> Previous Topic
            </Button>
          </Link>
          <Button size="sm" className="gap-2 text-xs">
            Complete & Next Unit <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
