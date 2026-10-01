"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Info } from "lucide-react";

export type MentorId = "rajesh" | "priya" | "elena" | "aditya";

export interface TermScaffolding {
  term: string;
  analogy: string;
  definition: string;
  whyItMatters: string;
}

interface GuidedMentorBoxProps {
  mentor: MentorId;
  time?: string;
  quote: React.ReactNode;
  scaffolding?: TermScaffolding;
  className?: string;
}

const MENTOR_CONFIG: Record<
  MentorId,
  {
    initials: string;
    name: string;
    role: string;
    avatarBg: string;
    borderColor: string;
    badgeStyle: string;
  }
> = {
  rajesh: {
    initials: "RK",
    name: "Rajesh Kumar",
    role: "L1 Shift Mentor",
    avatarBg: "bg-sky-600 text-white",
    borderColor: "border-l-sky-500",
    badgeStyle: "text-sky-700 bg-sky-50 border-sky-200 dark:bg-sky-950 dark:text-sky-300 dark:border-sky-800",
  },
  priya: {
    initials: "PS",
    name: "Priya Sharma",
    role: "L2 Incident Responder",
    avatarBg: "bg-amber-600 text-white",
    borderColor: "border-l-amber-500",
    badgeStyle: "text-amber-700 bg-amber-50 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
  },
  elena: {
    initials: "EG",
    name: "Elena Gomez",
    role: "SOC Operations Manager",
    avatarBg: "bg-rose-600 text-white",
    borderColor: "border-l-rose-500",
    badgeStyle: "text-rose-700 bg-rose-50 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800",
  },
  aditya: {
    initials: "AD",
    name: "Aditya Deshmukh",
    role: "L3 Lead Threat Hunter",
    avatarBg: "bg-purple-600 text-white",
    borderColor: "border-l-purple-500",
    badgeStyle: "text-purple-700 bg-purple-50 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800",
  },
};

export const GuidedMentorBox: React.FC<GuidedMentorBoxProps> = ({
  mentor,
  time = "09:00 AM",
  quote,
  scaffolding,
  className = "",
}) => {
  const config = MENTOR_CONFIG[mentor];

  return (
    <Card className={`glass-card glass-glossy backdrop-blur-2xl border-l-4 ${config.borderColor} border-t border-r border-b border-border/40 bg-card/75 dark:bg-slate-900/45 shadow-xl ${className}`}>
      <CardContent className="p-4 sm:p-5 space-y-3">
        <div className="flex items-start gap-3.5">
          <div
            className={`w-10 h-10 rounded-full ${config.avatarBg} flex items-center justify-center font-bold text-sm shrink-0 shadow-xs mt-0.5`}
          >
            {config.initials}
          </div>
          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-foreground text-sm">{config.name}</span>
              <Badge variant="outline" className={`text-[10px] font-semibold ${config.badgeStyle}`}>
                {config.role}
              </Badge>
              <span className="text-[11px] text-muted-foreground font-mono">{time}</span>
            </div>
            <div className="text-xs sm:text-sm text-foreground/90 leading-relaxed italic">
              {quote}
            </div>
          </div>
        </div>

        {/* Optional 3-Part Terminology Scaffolding Card */}
        {scaffolding && (
          <div className="mt-3 pt-3 border-t border-border/60 bg-muted/30 rounded-xl p-3 sm:p-3.5 space-y-2 text-xs">
            <div className="flex items-center gap-1.5 text-primary font-bold">
              <Lightbulb className="w-3.5 h-3.5" />
              <span>TERMINOLOGY SCAFFOLDING: {scaffolding.term}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-1 text-[11px] leading-relaxed">
              <div className="p-2.5 rounded-lg bg-card border border-border/80 space-y-0.5">
                <span className="font-bold text-sky-600 dark:text-sky-400 block">1. Simple Analogy</span>
                <p className="text-muted-foreground">{scaffolding.analogy}</p>
              </div>
              <div className="p-2.5 rounded-lg bg-card border border-border/80 space-y-0.5">
                <span className="font-bold text-amber-600 dark:text-amber-400 block">2. Plain Definition</span>
                <p className="text-muted-foreground">{scaffolding.definition}</p>
              </div>
              <div className="p-2.5 rounded-lg bg-card border border-border/80 space-y-0.5">
                <span className="font-bold text-emerald-600 dark:text-emerald-400 block">3. Why It Matters in SOC</span>
                <p className="text-muted-foreground">{scaffolding.whyItMatters}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
