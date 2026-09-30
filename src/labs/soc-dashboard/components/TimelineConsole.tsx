"use client";

import React from "react";
import { History, Clock, ArrowRight } from "lucide-react";
import { TimelineEvent } from "../types/lab.types";

interface TimelineConsoleProps {
  events: TimelineEvent[];
}

export const TimelineConsole: React.FC<TimelineConsoleProps> = ({ events }) => {
  if (!events || events.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-[#0a0e14]">
        <History className="w-10 h-10 text-slate-600 mb-3" />
        <h4 className="text-sm font-bold text-slate-300 font-mono">No Timeline Sequence Correlated</h4>
        <p className="text-xs text-slate-500 max-w-sm mt-1">
          No sequential telemetry events have been indexed for this timeline query.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto soc-scrollbar p-4 space-y-4 bg-[#0a0e14] font-mono text-xs">
      <div className="bg-[#111823] border border-[#243042] rounded-lg p-4">
        <div className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 pb-2 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <History className="w-3.5 h-3.5" />
            <span>Chronological Incident Attack Reconstruction</span>
          </div>
          <span className="text-[10px] text-slate-500">{events.length} Milestones</span>
        </div>

        {/* Timeline List */}
        <div className="relative mt-4 pl-4 border-l-2 border-slate-800 space-y-4">
          {events.map((evt) => {
            const isCritical = evt.severity === "critical";
            const isHigh = evt.severity === "high";

            return (
              <div key={evt.id} className="relative group">
                {/* Node dot on timeline line */}
                <div
                  className={`absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-[#0a0e14] ${
                    isCritical
                      ? "bg-red-400 ring-2 ring-red-500/50"
                      : isHigh
                      ? "bg-amber-400"
                      : "bg-cyan-400"
                  }`}
                />

                <div className="p-3 bg-[#0d131d] border border-slate-800/80 rounded hover:border-slate-700 transition-colors">
                  <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 text-[10px] flex items-center gap-1">
                        <Clock className="w-3 h-3 text-cyan-400" />
                        {evt.timeOnly || evt.timestamp}
                      </span>
                      <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.2 rounded font-semibold">
                        {evt.source}
                      </span>
                    </div>

                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                        isCritical
                          ? "bg-red-950 text-red-400 border border-red-800"
                          : isHigh
                          ? "bg-amber-950 text-amber-300 border border-amber-800"
                          : "bg-cyan-950 text-cyan-400 border border-cyan-800"
                      }`}
                    >
                      {evt.severity}
                    </span>
                  </div>

                  <div className="text-slate-100 font-bold text-xs mb-1">
                    {evt.event}
                  </div>
                  <div className="text-slate-400 text-[11px] leading-relaxed">
                    {evt.details}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
