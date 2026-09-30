"use client";

import React, { useState } from "react";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAdminConfigStore } from "@/store/admin-config-store";
import { useToast } from "@/components/ui/toast-provider";
import {
  LabModalWindow,
  FloatingLabButton,
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
  showFloatingButton = true,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [completedResult, setCompletedResult] = useState<LabCompletionResult | null>(null);
  const { showToast } = useToast();

  const labsEnabled = useAdminConfigStore((s) => s.labsEnabled);
  const isLabActive = useAdminConfigStore((s) => s.isLabEnabled(labId));

  const meta = LAB_METADATA[labId];

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

  // Case 2: Lab is active and enabled
  return (
    <>
      <div
        className={`p-5 rounded-2xl border-2 border-cyan-500/40 bg-gradient-to-r from-slate-950 via-[#0d1624] to-slate-950 text-slate-100 shadow-lg shadow-cyan-950/20 space-y-4 ${className}`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-cyan-950 text-cyan-300 border border-cyan-600/50 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                INTERACTIVE SOC LAB
              </span>
              <Badge className="bg-slate-800 text-slate-300 border-slate-700 text-[10px] font-mono">
                {meta.difficulty}
              </Badge>
              <Badge className="bg-slate-800 text-slate-300 border-slate-700 text-[10px] font-mono">
                ⏱ {meta.duration}
              </Badge>
              {completedResult?.passed && (
                <Badge className="bg-emerald-950 text-emerald-300 border-emerald-600 text-[10px] font-bold">
                  ✓ PASSED ({completedResult.score}%)
                </Badge>
              )}
            </div>

            <h3 className="text-base font-extrabold text-white font-sans tracking-tight">
              {meta.title}: <span className="text-cyan-400 font-semibold">{meta.subtitle}</span>
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed max-w-2xl font-mono">
              {meta.description}
            </p>

            {/* Consoles involved */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[10px] text-slate-400 font-mono">Telemetry:</span>
              {meta.consoles.map((c, idx) => (
                <span
                  key={idx}
                  className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-300"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Launch Action Button */}
          <div className="flex items-center gap-3 shrink-0">
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-xs px-5 py-5 rounded-xl shadow-lg shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95 gap-2"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>{completedResult?.passed ? "RE-ENTER SOC DASHBOARD" : "LAUNCH SOC DASHBOARD"}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Floating Button in lower right */}
      {showFloatingButton && (
        <FloatingLabButton
          labId={labId}
          onClick={() => setIsModalOpen(true)}
        />
      )}

      {/* Modal Window hosting SOC Dashboard */}
      <LabModalWindow
        isOpen={isModalOpen}
        labId={labId}
        onClose={() => setIsModalOpen(false)}
        onComplete={handleComplete}
        showTourFirst={false}
      />
    </>
  );
};
