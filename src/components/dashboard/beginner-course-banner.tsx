'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, BookOpen, CheckCircle2, Shield, HeartHandshake } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useProgressStore } from '@/store/progress-store';

export function BeginnerCourseBanner() {
  const [mounted, setMounted] = useState(false);
  const { completedTopics, completedModules } = useProgressStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const m00TopicsCount = 8;
  const completedM00Count = mounted
    ? Array.from(completedTopics || []).filter((t) => t.startsWith('topic-0-')).length
    : 0;
  const isComplete = mounted && (completedModules.has('00') || completedM00Count >= m00TopicsCount);

  return (
    <div className="p-5 sm:p-6 rounded-2xl border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-teal-500/10 relative overflow-hidden shadow-xs">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold uppercase tracking-wider gap-1">
              <Sparkles className="w-3 h-3" />
              Recommended Starting Point
            </Badge>
            <Badge variant="outline" className="border-emerald-300 bg-emerald-50/50 text-emerald-800 text-[10px] font-semibold">
              Complete Beginners & Non-IT Friendly
            </Badge>
            {isComplete && (
              <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300 text-[10px] gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Orientation Completed ✓
              </Badge>
            )}
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
            Module 00: Course Introduction & Orientation Primer
          </h3>

          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Coming from a non-IT background? Start here! Understand what a SOC actually is using simple everyday analogies (Airport Security, Smoke Alarms, Postal Envelopes), explore how this platform works, and practice your first safe alert triage.
          </p>

          <div className="flex items-center gap-3 pt-1 text-[11px] text-foreground/80 font-medium flex-wrap">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Zero coding or math required
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Plain-English tech jargon translator
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Hands-on safe triage simulator
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-2.5 shrink-0">
          <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs gap-2 shadow-sm h-11 px-5">
            <Link href="/modules/00">
              <BookOpen className="w-4 h-4" />
              <span>
                {isComplete
                  ? 'Review Orientation'
                  : completedM00Count > 0
                  ? `Continue Orientation (${completedM00Count}/8)`
                  : 'Start Course Introduction'}
              </span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>

          <span className="text-[11px] text-muted-foreground text-center sm:text-right font-mono">
            3 Units • 8 Chapters • 1.5 Hours (90 mins)
          </span>
        </div>
      </div>
    </div>
  );
}
