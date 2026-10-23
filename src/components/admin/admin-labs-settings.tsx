"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FlaskConical, Power, Play, CheckCircle2, AlertOctagon } from "lucide-react";
import { useAdminConfigStore } from "@/store/admin-config-store";
import { useToast } from "@/components/ui/toast-provider";
import { LabModalWindow, LabId } from "@/labs";

const ADMIN_LABS: {
  id: LabId;
  title: string;
  mappedChapter: string;
  difficulty: string;
  description: string;
}[] = [
  {
    id: "lab-01",
    title: "Lab 01: Basic Alert Triage",
    mappedChapter: "Unit 3 • Chapter 3.2: Evidence Deep-Dive Lab",
    difficulty: "BEGINNER",
    description: "Extract 5 critical W's and submit True Positive verdict on Michael Chen spear-phishing incident.",
  },
  {
    id: "lab-02",
    title: "Lab 02: False Positive Identification",
    mappedChapter: "Unit 4 • Chapter 4.2: False-Positive Identification Lab",
    difficulty: "INTERMEDIATE",
    description: "Discriminate noise vs. attacks across 4 alerts (Defender, 3 AM backup, PowerShell, and developer SSIS ETL).",
  },
  {
    id: "lab-03",
    title: "Lab 03: Severity Classification & Matrix",
    mappedChapter: "Unit 5 • Chapter 5.2: Severity Classification Lab",
    difficulty: "INTERMEDIATE",
    description: "Score 6 incidents with Asset Tier × Threat Status × Impact and allocate 8 shift-hours to critical emergencies.",
  },
  {
    id: "lab-04",
    title: "Lab 04: Incident Escalation & Coordination",
    mappedChapter: "Unit 6 • Chapter 6.2: Incident Escalation & Response Lab",
    difficulty: "ADVANCED",
    description: "Coordinate cross-functional containment across L2, L3, Identity, Firewall, DB, and Leadership teams.",
  },
];

export function AdminLabsSettings() {
  const [testingLabId, setTestingLabId] = useState<LabId | null>(null);
  const { showToast } = useToast();

  const labsEnabled = useAdminConfigStore((s) => s.labsEnabled);
  const toggleLabs = useAdminConfigStore((s) => s.toggleLabs);
  const toggleLab = useAdminConfigStore((s) => s.toggleLab);
  const isLabEnabled = useAdminConfigStore((s) => s.isLabEnabled);

  return (
    <>
      <Card className="border border-border/80 shadow-xs md:col-span-2">
        <CardHeader className="pb-3 border-b border-border/60">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <FlaskConical className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
              <div>
                <CardTitle className="text-base font-bold text-foreground">
                  SOC Dashboard Lab System Control Center
                </CardTitle>
                <CardDescription className="text-xs">
                  Master switch and per-lab operational toggles for embedded course simulation labs
                </CardDescription>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge className={labsEnabled ? "bg-cyan-600 text-white text-[11px]" : "bg-slate-300 text-slate-700 text-[11px]"}>
                {labsEnabled ? "LABS ACTIVE GLOBALLY" : "LABS DISABLED GLOBALLY"}
              </Badge>
              <Button
                variant={labsEnabled ? "destructive" : "default"}
                size="sm"
                onClick={() => {
                  toggleLabs();
                  const next = !labsEnabled;
                  showToast({
                    type: next ? "success" : "warning",
                    title: `SOC Labs ${next ? "Enabled Globally" : "Disabled Globally"}`,
                  });
                }}
                className="text-xs font-bold gap-1"
              >
                <Power className="w-3.5 h-3.5" />
                <span>{labsEnabled ? "Disable All" : "Enable All"}</span>
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-4 space-y-3">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {ADMIN_LABS.map((lab) => {
              const active = isLabEnabled(lab.id);

              return (
                <div
                  key={lab.id}
                  className={`p-3.5 rounded-xl border flex flex-col justify-between gap-3 transition-all ${
                    active ? "bg-slate-50 dark:bg-slate-900 border-border" : "bg-muted/40 opacity-70 border-dashed"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-xs text-foreground">{lab.title}</span>
                      <Badge
                        className={`text-[9px] font-bold uppercase ${
                          active
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300"
                            : "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-300"
                        }`}
                      >
                        {active ? "Active" : "Disabled by Admin"}
                      </Badge>
                    </div>

                    <div className="text-[10px] text-cyan-600 dark:text-cyan-400 font-mono">
                      {lab.mappedChapter}
                    </div>

                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      {lab.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-border/60">
                    <Button
                      variant={active ? "outline" : "default"}
                      size="sm"
                      onClick={() => {
                        toggleLab(lab.id);
                        const next = !active;
                        showToast({
                          type: next ? "success" : "warning",
                          title: `${lab.title} ${next ? "Enabled" : "Disabled"}`,
                        });
                      }}
                      className="h-7 text-xs font-semibold gap-1"
                    >
                      <Power className="w-3 h-3" />
                      <span>{active ? "Disable" : "Enable"}</span>
                    </Button>

                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setTestingLabId(lab.id)}
                      className="h-7 text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 gap-1 shadow-xs"
                    >
                      <Play className="w-3 h-3 fill-slate-950" />
                      <span>Test Launch</span>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Test Launch Modal Window */}
      {testingLabId && (
        <LabModalWindow
          isOpen={testingLabId !== null}
          labId={testingLabId}
          onClose={() => setTestingLabId(null)}
          showTourFirst={false}
        />
      )}
    </>
  );
}
