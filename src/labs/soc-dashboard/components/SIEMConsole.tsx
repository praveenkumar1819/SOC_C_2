"use client";

import React from "react";
import { ShieldAlert, Zap, CheckCircle2, AlertTriangle, Layers } from "lucide-react";
import { SIEMCorrelation } from "../types/lab.types";

interface SIEMConsoleProps {
  correlation: SIEMCorrelation | null;
}

export const SIEMConsole: React.FC<SIEMConsoleProps> = ({ correlation }) => {
  if (!correlation) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-[#0a0e14]">
        <ShieldAlert className="w-10 h-10 text-slate-600 mb-3" />
        <h4 className="text-sm font-bold text-slate-300 font-mono">No SIEM Correlation Rule Triggered</h4>
        <p className="text-xs text-slate-500 max-w-sm mt-1">
          Raw event logs exist in storage, but no multi-source SIEM correlation rule has met the heuristic firing threshold for this query.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto soc-scrollbar p-4 space-y-4 bg-[#0a0e14] font-mono text-xs">
      {/* Rule Header & Confidence */}
      <div className="bg-[#111823] border border-[#243042] rounded-lg p-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-cyan-400 bg-cyan-950 px-1.5 py-0.5 rounded border border-cyan-800">
              SIEM RULE MATCH
            </span>
            <span className="text-xs font-bold text-slate-100">{correlation.rule}</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 max-w-xl">
            {correlation.ruleDescription}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block">DETECTION CONFIDENCE</span>
            <span className="text-sm font-extrabold text-cyan-300">
              {correlation.confidence}%
            </span>
          </div>
          <div className="w-16 h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
            <div
              className="h-full bg-cyan-400 rounded-full"
              style={{ width: `${correlation.confidence}%` }}
            />
          </div>
        </div>
      </div>

      {/* Correlated Event Sequence */}
      <div className="bg-[#111823] border border-[#243042] rounded-lg p-4">
        <div className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 pb-2 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            <span>Correlated Multi-Source Event Sequence</span>
          </div>
          <span className="text-[10px] text-slate-500">
            {correlation.correlatedEvents.length} Events Correlated
          </span>
        </div>

        <div className="mt-3 space-y-2">
          {correlation.correlatedEvents.map((evt) => (
            <div
              key={evt.sequence}
              className="p-2.5 bg-[#0a0e14] border border-slate-800/80 rounded flex items-start gap-3 hover:border-slate-700 transition-colors"
            >
              <div className="w-6 h-6 rounded bg-slate-900 border border-slate-700 text-cyan-400 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                {evt.sequence}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-100 font-bold">{evt.eventType}</span>
                    <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.2 rounded">
                      {evt.source}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500">{evt.timestamp}</span>
                </div>

                <p className="text-[11px] text-slate-300">{evt.description}</p>
              </div>

              <div>
                <span
                  className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                    evt.severity === "critical"
                      ? "bg-red-950 text-red-400 border border-red-800"
                      : evt.severity === "warning"
                      ? "bg-amber-950 text-amber-400 border border-amber-800"
                      : evt.severity === "success"
                      ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                      : "bg-cyan-950 text-cyan-400 border border-cyan-800"
                  }`}
                >
                  {evt.severity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SIEM Engine Automated Assessment */}
      <div className="bg-[#111823] border border-[#243042] rounded-lg p-4">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-300 pb-2 border-b border-slate-800 flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          <span>Automated Correlation Assessment</span>
        </div>
        <p className="mt-2 text-[11px] text-slate-300 leading-relaxed bg-[#0a0e14] p-3 rounded border border-slate-800">
          {correlation.verdict}
        </p>
      </div>
    </div>
  );
};
