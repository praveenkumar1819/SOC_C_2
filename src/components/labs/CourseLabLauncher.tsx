"use client";

import React, { useState, useEffect } from "react";
import {
  FlaskConical,
  Play,
  CheckCircle2,
  Lock,
  Power,
  ExternalLink,
  Shield,
  Layers,
  Sparkles,
  Maximize2,
  Minimize2,
  Terminal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAdminConfigStore } from "@/store/admin-config-store";
import { useToast } from "@/components/ui/toast-provider";
import {
  SocDashboardLab,
  LabId,
  LabCompletionResult,
} from "@/labs";

interface CourseLabLauncherProps {
  labId: LabId;
  onLabCompleted?: (result: LabCompletionResult) => void;
  className?: string;
  showFloatingButton?: boolean;
}

const LAB_METADATA: Record<
  LabId,
  {
    title: string;
    subtitle: string;
    difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
    duration: string;
    consoles: string[];
    description: string;
  }
> = {
  "lab-01": {
    title: "Lab 01: Basic Alert Triage",
    subtitle: "Extract the 5 Critical W's & Determine Attack Verdict",
    difficulty: "BEGINNER",
    duration: "15 min",
    consoles: ["Email Gateway", "EDR Process Tree", "SIEM", "Firewall", "Timeline"],
    description:
      "Investigate live spear-phishing alert SEC-2026-0412 targeting Michael Chen. Correlate across the 5 security consoles to identify target entities and submit your threat verdict.",
  },
  "lab-02": {
    title: "Lab 02: False Positive Identification",
    subtitle: "Filter SOC Noise from Real Danger Across 4 Live Incidents",
    difficulty: "INTERMEDIATE",
    duration: "20 min",
    consoles: ["Email Gateway", "EDR Lineage", "SIEM Correlation", "Firewall Intel", "Timeline"],
    description:
      "Investigate 4 queue alerts (antivirus temp files, 3 AM scheduled backup, encoded PowerShell, and developer SSIS ETL). Discriminate true positives from false alarms.",
  },
  "lab-03": {
    title: "Lab 03: Severity Classification & Matrix",
    subtitle: "Apply the Severity Matrix & Allocate Limited Shift Capacity",
    difficulty: "INTERMEDIATE",
    duration: "18 min",
    consoles: ["Incident Queue", "Asset Tiering", "Threat Confidence", "SLA Matrix"],
    description:
      "Apply Asset Tier × Threat Status × Impact across 6 incidents. Formulate shift triage strategy with 2 analysts and 8 work-hours to stop active ransomware.",
  },
  "lab-04": {
    title: "Lab 04: Incident Escalation & Team Coordination",
    subtitle: "Orchestrate Multi-Host Crisis Response with SOC Specialists",
    difficulty: "ADVANCED",
    duration: "25 min",
    consoles: ["Multi-Host Attack Chain", "L2 Containment", "L3 Hunting", "Identity & DB Teams"],
    description:
      "Multi-system breach in progress. Route containment, threat hunting, Domain Admin credential reset, firewall blocking, database forensics, and executive disclosure to the proper teams.",
  },
};

export const CourseLabLauncher: React.FC<CourseLabLauncherProps> = ({
  labId,
  onLabCompleted,
  className = "",
  showFloatingButton = false,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [completedResult, setCompletedResult] = useState<LabCompletionResult | null>(null);
  const { showToast } = useToast();

  const labsEnabled = useAdminConfigStore((s) => s.labsEnabled);
  const isLabActive = useAdminConfigStore((s) => s.isLabEnabled(labId));

  const meta = LAB_METADATA[labId];

  // Close fullscreen on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen]);

  const handleComplete = (result: LabCompletionResult) => {
    setCompletedResult(result);
    if (result.passed) {
      showToast({
        type: "success",
        title: `${meta.title} Passed! 🎯`,
        description: `Score: ${result.score}% • Evaluated by FinCorp SOC Mentors.`,
      });
      if (onLabCompleted) {
        onLabCompleted(result);
      }
    }
  };

  // Case 1: Labs disabled by administrator
  if (!labsEnabled || !isLabActive) {
    return (
      <div className={`p-4 rounded-xl border border-dashed border-amber-300 dark:border-amber-800 bg-amber-50/60 dark:bg-amber-950/20 text-xs space-y-2 select-none ${className}`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-200 dark:bg-amber-900/60 flex items-center justify-center text-amber-800 dark:text-amber-300">
              <FlaskConical className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-foreground text-sm flex items-center gap-2">
                {meta.title}
                <Badge variant="outline" className="text-[10px] bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200 border-amber-300">
                  DISABLED IN ADMIN PANEL
                </Badge>
              </span>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                SOC Dashboard Lab is currently toggled OFF in Admin configuration.
              </p>
            </div>
          </div>
          <span className="text-[11px] font-mono text-muted-foreground">
            Standby Mode
          </span>
        </div>
      </div>
    );
  }

  // Case 2: Lab is active and enabled - Render live tactical workstation inline with fullscreen option
  return (
    <div className={`space-y-4 ${className}`}>
      {/* 1. Lab Mission Briefing Header Card (Clean Apple Glassmorphic Light / Dark) */}
      <div className="glass-card glass-glossy p-4 sm:p-5 rounded-2xl border-2 border-primary/25 dark:border-cyan-500/30 bg-card/90 dark:bg-slate-900/80 shadow-xl backdrop-blur-2xl transition-all">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-primary/10 dark:bg-cyan-950 text-primary dark:text-cyan-300 border border-primary/30 dark:border-cyan-600/50 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                TACTICAL SOC LAB WORKSTATION
              </span>
              <Badge variant="outline" className="text-[10px] font-mono font-bold">
                {meta.difficulty}
              </Badge>
              <Badge variant="outline" className="text-[10px] font-mono">
                ⏱ {meta.duration}
              </Badge>
              {completedResult?.passed && (
                <Badge className="bg-emerald-600 text-white border-emerald-500 text-[10px] font-bold">
                  ✓ PASSED ({completedResult.score}%)
                </Badge>
              )}
            </div>

            <h3 className="text-base sm:text-lg font-black text-foreground tracking-tight">
              {meta.title}: <span className="text-primary dark:text-cyan-400 font-semibold">{meta.subtitle}</span>
            </h3>

            <p className="text-xs text-muted-foreground leading-relaxed max-w-3xl">
              {meta.description}
            </p>

            {/* Consoles involved */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[10px] text-muted-foreground font-mono font-semibold">Active Consoles:</span>
              {meta.consoles.map((c, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-muted/60 dark:bg-slate-800 border border-border/80 dark:border-slate-700 text-[10px] font-mono text-foreground"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Fullscreen Expand Action */}
          <div className="flex items-center gap-2 shrink-0">
            <Button
              onClick={() => setIsFullscreen(!isFullscreen)}
              size="sm"
              className="bg-primary hover:bg-primary/90 text-white text-xs font-mono font-bold gap-2 rounded-xl cursor-pointer shadow-md shadow-primary/20 transition-all hover:scale-105 active:scale-95"
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-4 h-4 text-white" />
                  <span>Collapse to Lesson</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-4 h-4 text-white" />
                  <span>Open Fullscreen Workstation</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* 2. Live Interactive SOC Workstation (Embedded Inline or Fullscreen) */}
      <div
        className={
          isFullscreen
            ? "fixed inset-0 z-50 w-screen h-screen bg-[#0a0e14] flex flex-col shadow-none rounded-none border-0 overflow-hidden"
            : "relative w-full h-[600px] sm:h-[640px] max-h-[75vh] rounded-2xl border-2 border-primary/25 dark:border-cyan-500/30 overflow-hidden shadow-2xl glass-card glass-glossy"
        }
      >
        <SocDashboardLab
          labId={labId}
          onComplete={handleComplete}
          onClose={() => setIsFullscreen(false)}
          isInline={!isFullscreen}
          isFullscreen={isFullscreen}
          onToggleFullscreen={() => setIsFullscreen((prev) => !prev)}
        />
      </div>
    </div>
  );
};
