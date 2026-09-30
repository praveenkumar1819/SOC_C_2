"use client";

import React, { useState } from "react";
import { Terminal, Shield, Sparkles, ExternalLink } from "lucide-react";
import { LabId } from "../soc-dashboard/types/lab.types";

interface FloatingLabButtonProps {
  labId?: LabId;
  visible?: boolean;
  onClick: () => void;
  pendingAlertCount?: number;
}

export const FloatingLabButton: React.FC<FloatingLabButtonProps> = ({
  labId = "lab-01",
  visible = true,
  onClick,
  pendingAlertCount = 1,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  if (!visible) return null;

  const getLabLabel = (id: LabId) => {
    switch (id) {
      case "lab-01":
        return "Lab 1: Basic Alert Triage";
      case "lab-02":
        return "Lab 2: False Positive Filter";
      case "lab-03":
        return "Lab 3: Severity Classification";
      case "lab-04":
        return "Lab 4: Incident Escalation";
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3 select-none">
      {/* Tooltip on hover */}
      {isHovered && (
        <div className="bg-[#111823] border border-cyan-500/60 rounded-lg px-3 py-2 text-xs font-mono text-cyan-200 shadow-xl shadow-cyan-950/60 animate-in fade-in slide-in-from-right-2 hidden sm:block whitespace-nowrap">
          <div className="flex items-center gap-1.5 font-bold text-slate-100">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Launch SOC Dashboard</span>
          </div>
          <div className="text-[10px] text-cyan-400 mt-0.5">{getLabLabel(labId)}</div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-cyan-600 to-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-400/50 hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-white/20"
        title={`Open SOC Dashboard (${getLabLabel(labId)})`}
      >
        {/* Pulsing ring indicator */}
        <span className="absolute -inset-1 rounded-full bg-cyan-400 opacity-30 group-hover:opacity-60 animate-ping duration-1000" />

        {/* Tactical Shield/Terminal Icon */}
        <Shield className="w-6 h-6 text-slate-950 group-hover:rotate-6 transition-transform" />

        {/* Pending alert badge */}
        {pendingAlertCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-black text-white border-2 border-[#0a0e14] shadow">
            {pendingAlertCount}
          </span>
        )}
      </button>
    </div>
  );
};
