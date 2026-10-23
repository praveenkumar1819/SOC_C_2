'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, BookOpen, CheckCircle2, Shield, HeartHandshake, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useProgressStore } from '@/store/progress-store';

export function BeginnerCourseBanner() {
  const [mounted, setMounted] = useState(false);
  const { completedTopics, completedModules } = useProgressStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const m00TopicsCount = 11;
  const completedM00Count = mounted
    ? Array.from(completedTopics || []).filter((t) => t.startsWith('topic-0-') || t.startsWith('unit-0-')).length
    : 0;
  const isComplete = mounted && (completedModules.has('00') || completedM00Count >= m00TopicsCount);

  return (
    <div className="glass-panel glass-glossy p-6 sm:p-7 rounded-3xl border-2 border-emerald-500/35 bg-gradient-to-br from-emerald-500/15 via-card/85 to-teal-500/15 dark:from-emerald-950/40 dark:via-slate-900/70 dark:to-teal-950/40 backdrop-blur-2xl shadow-xl relative overflow-hidden transition-all hover:border-emerald-500/50">
      {/* Specular ambient background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
        <div className="space-y-2.5 max-w-xl">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-extrabold uppercase tracking-wider gap-1.5 shadow-sm shadow-emerald-600/30">
              <Sparkles className="w-3.5 h-3.5" />
              Recommended Starting Point
            </Badge>
            <Badge variant="outline" className="border-emerald-400/50 bg-emerald-500/10 text-emerald-900 dark:text-emerald-200 text-[10px] font-bold glass-pill">
              Complete Beginners & Non-IT Friendly
            </Badge>
            {isComplete && (
              <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300 text-[10px] gap-1 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Orientation Completed ✓
              </Badge>
            )}
          </div>

          <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-foreground tracking-tight">
            Module 00: Course Introduction & Orientation Primer
          </h3>

          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-normal">
            Coming from a non-IT background? Start here! Understand what a SOC actually is using everyday analogies (Apartment Watchman, ATM Receipts, Burnt Toast), meet mentors <strong className="text-foreground">Rajesh Kumar</strong> & <strong className="text-foreground">Priya Sharma</strong> with Indian voice notes, and test-drive your first safe flight-simulator mini-lab.
          </p>

          <div className="flex items-center gap-4 pt-1 text-[11px] text-foreground/85 font-semibold flex-wrap">
            <span className="flex items-center gap-1.5 glass-pill px-2.5 py-1 rounded-full border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Zero coding or math required
            </span>
            <span className="flex items-center gap-1.5 glass-pill px-2.5 py-1 rounded-full border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Indian English voice notes
            </span>
            <span className="flex items-center gap-1.5 glass-pill px-2.5 py-1 rounded-full border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-sky-500" />
              Safe flight simulator labs
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3 shrink-0">
          <Button
            asChild
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs gap-2.5 shadow-lg shadow-emerald-600/25 h-12 px-6 rounded-2xl focus-beacon-emerald cursor-pointer"
          >
            <Link href="/modules/00">
              <BookOpen className="w-4 h-4" />
              <span>
                {isComplete
                  ? 'Review Orientation'
                  : completedM00Count > 0
                  ? `Continue Orientation (${completedM00Count}/${m00TopicsCount})`
                  : 'Start Course Introduction'}
              </span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>

          <span className="text-[11px] text-muted-foreground text-center sm:text-right font-mono font-medium">
            3 Units • 11 Interactive Steps • 1.5 Hours (90 mins)
          </span>
        </div>
      </div>
    </div>
  );
}
