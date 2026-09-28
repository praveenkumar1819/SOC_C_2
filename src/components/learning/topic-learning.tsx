'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, CheckCircle, Book, Sparkles, ExternalLink, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TheoryUnit } from './units/theory-unit';
import { DemoUnit } from './units/demo-unit';
import { InteractiveUnit } from './units/interactive-unit';
import { KnowledgeCheckCard } from './knowledge-check/knowledge-check-card';
import { useProgressStore } from '@/store/progress-store';

interface TopicLearningProps {
  moduleId: string;
  topic: any;
  unit: any;
  topicIndex: number;
  unitIndex: number;
  totalTopics: number;
  totalUnits: number;
}

export function TopicLearning({
  moduleId,
  topic,
  unit,
  topicIndex,
  unitIndex,
  totalTopics,
  totalUnits,
}: TopicLearningProps) {
  const router = useRouter();
  const [xpEarned, setXpEarned] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const addXP = useProgressStore((state) => state.addXP);
  const markUnitComplete = useProgressStore((state) => state.markUnitComplete);

  // Overall module progress percentage
  const progress = Math.min(
    100,
    Math.round(((topicIndex * 100) / totalTopics) + (((unitIndex + 1) / totalUnits) * (100 / totalTopics)))
  );

  const isLastUnitInTopic = unitIndex + 1 === totalUnits;
  const isFinalTopicAndUnit = topicIndex === totalTopics - 1 && isLastUnitInTopic;

  const handleNext = async () => {
    if (!xpEarned) {
      const reward = unit.xpReward || 50;
      addXP(reward);
      markUnitComplete(unit.id);
      setXpEarned(true);

      // Async sync to server
      try {
        setIsSyncing(true);
        await fetch('/api/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            moduleId,
            topicProgress: {
              [`topic-${topicIndex + 1}`]: {
                completedUnits: [unit.id],
                lastAccessedUnit: unit.id,
                percentage: Math.round(((unitIndex + 1) / totalUnits) * 100)
              }
            },
            xpEarned: reward,
            completionPercentage: progress
          })
        });
      } catch (err) {
        console.error('Failed to sync progress:', err);
      } finally {
        setIsSyncing(false);
      }
    }

    // Route navigation
    if (unitIndex + 1 < totalUnits) {
      router.push(`/modules/${moduleId}/topics?topic=${topicIndex + 1}&unit=${unitIndex + 2}`);
    } else if (topicIndex + 1 < totalTopics) {
      router.push(`/modules/${moduleId}/topics?topic=${topicIndex + 2}&unit=1`);
    } else {
      // Reached end of all topics -> Go to assessment!
      router.push(`/modules/${moduleId}/assessment`);
    }
  };

  const handlePrevious = () => {
    if (unitIndex > 0) {
      router.push(`/modules/${moduleId}/topics?topic=${topicIndex + 1}&unit=${unitIndex}`);
    } else if (topicIndex > 0) {
      router.push(`/modules/${moduleId}/topics?topic=${topicIndex}&unit=1`);
    } else {
      router.push(`/modules/${moduleId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 pb-16">
      {/* Sticky Header */}
      <div className="border-b bg-background/95 backdrop-blur sticky top-16 z-40">
        <div className="container py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => router.push(`/modules/${moduleId}`)}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Exit Module
              </Button>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                <Book className="h-4 w-4 text-primary" />
                <span className="font-semibold text-foreground">Module {moduleId}</span>
                <span>·</span>
                <span>Topic {topicIndex + 1}</span>
                <span>·</span>
                <span>Unit {unitIndex + 1} of {totalUnits}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="bg-white font-mono text-xs">
                {progress}% Complete
              </Badge>
            </div>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container py-10 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="text-[11px] font-mono font-bold bg-primary-50 text-primary border-primary/20 uppercase tracking-wider">
              Topic {topicIndex + 1}: {topic.title}
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-2">
            {unit.title}
          </h1>
          <div className="flex items-center gap-4 text-xs sm:text-sm text-muted-foreground">
            <span>⏱️ {unit.estimatedMinutes} min read</span>
            <span>·</span>
            <span className="text-primary font-medium flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> +{unit.xpReward} XP Reward
            </span>
            <span>·</span>
            <Badge variant="secondary" className="text-[10px] font-mono uppercase">
              {unit.type}
            </Badge>
          </div>
        </div>

        {/* Dynamic Unit Renderer */}
        {unit.type === 'THEORY' && <TheoryUnit content={unit.content} />}
        {unit.type === 'DEMO' && <DemoUnit content={unit.content} />}
        {unit.type === 'INTERACTIVE' && <InteractiveUnit content={unit.content} />}

        {/* Topic Knowledge Check (Render on final unit of topic) */}
        {isLastUnitInTopic && topic.knowledgeChecks && topic.knowledgeChecks.length > 0 && (
          <div className="mt-12 pt-8 border-t border-border/80">
            <div className="mb-4">
              <Badge className="bg-primary text-primary-foreground text-xs mb-1">
                Topic Mastery Check
              </Badge>
              <h3 className="text-xl font-bold text-foreground">Verify Your Understanding</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Complete this knowledge check to lock in your topic XP before proceeding.
              </p>
            </div>
            {topic.knowledgeChecks.map((kc: any) => (
              <KnowledgeCheckCard key={kc.id} check={kc} />
            ))}
          </div>
        )}

        {/* External Recommended Hands-on Lab Callout */}
        {isFinalTopicAndUnit && (
          <div className="mt-8 p-5 rounded-2xl bg-gradient-to-r from-blue-50/70 to-indigo-50/70 border border-blue-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
                <ExternalLink className="w-4 h-4 text-blue-600" />
                <span>Recommended External Hands-on Labs</span>
              </div>
              <Badge variant="outline" className="bg-white text-blue-800 text-[10px]">
                External SOC Labs
              </Badge>
            </div>
            <p className="text-xs text-blue-950/80 leading-relaxed">
              Cement your Module 04 skills with real SIEM alert triage in realistic cloud virtual ranges:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <a
                href="https://tryhackme.com/path/outline/soclevel1"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-white border border-blue-100 hover:border-blue-300 hover:shadow-xs transition-all flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-semibold text-foreground">TryHackMe SOC Level 1</div>
                  <div className="text-[11px] text-muted-foreground">Junior Security Analyst Path</div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
              </a>

              <a
                href="https://letsdefend.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-white border border-blue-100 hover:border-blue-300 hover:shadow-xs transition-all flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-semibold text-foreground">LetsDefend Blue Team Lab</div>
                  <div className="text-[11px] text-muted-foreground">Real-world SIEM Case Practice</div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
              </a>
            </div>
          </div>
        )}

        {/* Footer Navigation Bar */}
        <Card className="mt-10 border border-border/80 shadow-xs">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={topicIndex === 0 && unitIndex === 0}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Unit
              </Button>

              <Button onClick={handleNext} className="bg-primary text-primary-foreground font-semibold px-6">
                {isFinalTopicAndUnit ? (
                  <>
                    Proceed to Assessment
                    <CheckCircle className="ml-2 h-4 w-4" />
                  </>
                ) : isLastUnitInTopic ? (
                  <>
                    Next Topic
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    Next Unit
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
