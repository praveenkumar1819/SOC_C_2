'use client';

import React from 'react';
import { Terminal, Lightbulb, Info, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { VisualRenderer } from '../visuals';

interface TheoryContent {
  text?: string;
  subtitle?: string;
  visual?: {
    type: string;
    component: string;
  };
  techBox?: {
    title: string;
    content: string;
  };
  knowMore?: {
    title: string;
    content: string;
  };
  realWorldExample?: string;
}

interface TheoryUnitProps {
  content: TheoryContent;
}

export function TheoryUnit({ content }: TheoryUnitProps) {
  return (
    <div className="space-y-6">
      {/* Subtitle & Core Concept Text */}
      <Card className="border border-border/80 shadow-xs bg-card">
        <CardHeader className="pb-3 border-b border-border/60 bg-slate-50/50">
          <div className="flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>Theoretical Foundations</span>
          </div>
          {content.subtitle && (
            <CardTitle className="text-xl font-bold text-foreground pt-1">
              {content.subtitle}
            </CardTitle>
          )}
        </CardHeader>
        <CardContent className="pt-4">
          <p className="text-sm sm:text-base leading-relaxed text-foreground/90 font-normal">
            {content.text}
          </p>
        </CardContent>
      </Card>

      {/* Visual Component Render (if specified) */}
      {content.visual?.component && (
        <div>
          <VisualRenderer componentName={content.visual.component} />
        </div>
      )}

      {/* Analyst Tech Box */}
      {content.techBox && (
        <div className="p-5 rounded-2xl bg-secondary/80 border border-border/90 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wide">
            <Terminal className="w-4 h-4" />
            <span>{content.techBox.title}</span>
          </div>
          <div className="text-xs sm:text-sm text-foreground/90 font-mono whitespace-pre-line leading-relaxed bg-white/60 p-3 rounded-xl border border-border/50">
            {content.techBox.content}
          </div>
        </div>
      )}

      {/* Real-World SOC Scenario / Example */}
      {content.realWorldExample && (
        <div className="p-5 rounded-2xl bg-primary-50/60 border border-primary-200/80 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wide">
            <Lightbulb className="w-4 h-4 text-primary" />
            <span>Real-World SOC Analogy & Context</span>
          </div>
          <p className="text-xs sm:text-sm text-foreground leading-relaxed">
            {content.realWorldExample}
          </p>
        </div>
      )}

      {/* Know More / Deep Dive */}
      {content.knowMore && (
        <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-200/80 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-900 uppercase tracking-wide">
            <Info className="w-4 h-4 text-indigo-600" />
            <span>{content.knowMore.title}</span>
          </div>
          <p className="text-xs sm:text-sm text-indigo-950 leading-relaxed">
            {content.knowMore.content}
          </p>
        </div>
      )}
    </div>
  );
}
