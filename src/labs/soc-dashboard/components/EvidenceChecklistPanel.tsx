"use client";

import React from "react";
import { CheckSquare, Square, CheckCircle2, ChevronRight, HelpCircle } from "lucide-react";
import { EvidenceChecklistItem, ConsoleTab } from "../types/lab.types";

interface EvidenceChecklistPanelProps {
  items: EvidenceChecklistItem[];
  onNavigateToConsole: (tab: ConsoleTab) => void;
}

export const EvidenceChecklistPanel: React.FC<EvidenceChecklistPanelProps> = ({
  items,
  onNavigateToConsole,
}) => {
  const discoveredCount = items.filter((i) => i.discovered).length;

  return (
    <div className="evidence-checklist-panel bg-[#111823] border border-[#243042] rounded-lg p-3 select-none">
      <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-200">
          <CheckSquare className="w-3.5 h-3.5 text-cyan-400" />
          <span>Evidence Checklist</span>
        </div>
        <span className="text-[10px] font-mono bg-cyan-950 text-cyan-400 px-1.5 py-0.5 rounded border border-cyan-800">
          {discoveredCount} / {items.length} DISCOVERED
        </span>
      </div>

      <div className="space-y-1.5">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => onNavigateToConsole(item.consoleTab)}
            className={`p-2 rounded border text-xs cursor-pointer transition-all flex items-start gap-2 ${
              item.discovered
                ? "bg-[#0a1826] border-cyan-500/40 text-cyan-100"
                : "bg-[#0a0e14] border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300"
            }`}
          >
            <div className="mt-0.5 flex-shrink-0">
              {item.discovered ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
              ) : (
                <Square className="w-3.5 h-3.5 text-slate-600" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-medium leading-snug">{item.label}</div>
              <div className="flex items-center gap-1 text-[9px] text-slate-500 mt-1 font-mono uppercase">
                <span>CONSOLE: {item.consoleTab}</span>
                <ChevronRight className="w-2.5 h-2.5" />
                <span>Click to inspect</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
