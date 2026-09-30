"use client";

import React, { useState } from "react";
import { AlertTriangle, Search, Filter, BellRing, ChevronRight } from "lucide-react";
import { AlertSummary } from "../types/lab.types";
import { getSeverityBadgeClass } from "../utils/formatting";

interface AlertQueuePanelProps {
  alerts: AlertSummary[];
  selectedAlertId: string;
  onSelectAlert: (alertId: string) => void;
}

export const AlertQueuePanel: React.FC<AlertQueuePanelProps> = ({
  alerts,
  selectedAlertId,
  onSelectAlert,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAlerts = alerts.filter((alert) => {
    const q = searchQuery.toLowerCase();
    return (
      alert.id.toLowerCase().includes(q) ||
      alert.rule.toLowerCase().includes(q) ||
      alert.user.toLowerCase().includes(q) ||
      alert.host.toLowerCase().includes(q)
    );
  });

  return (
    <aside className="alert-queue-panel flex flex-col h-full min-h-0 bg-[#0d131d] border-r border-[#243042] overflow-hidden">
      {/* Panel Header */}
      <div className="p-3 border-b border-[#243042] bg-[#111823] shrink-0">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-200">
            <BellRing className="w-3.5 h-3.5 text-cyan-400" />
            <span>Alert Queue</span>
          </div>
          <span className="text-[10px] font-mono bg-cyan-950 text-cyan-400 px-1.5 py-0.5 rounded border border-cyan-800">
            {alerts.length} PENDING
          </span>
        </div>

        {/* Filter Input */}
        <div className="relative">
          <Search className="w-3 h-3 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter alerts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0a0e14] border border-[#243042] rounded text-xs pl-7 pr-2 py-1 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
          />
        </div>
      </div>

      {/* Alert List */}
      <div className="flex-1 min-h-0 overflow-y-auto soc-scrollbar p-2 space-y-2">
        {filteredAlerts.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-500 font-mono">
            No matching alerts found
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const isSelected = alert.id === selectedAlertId;
            return (
              <button
                key={alert.id}
                onClick={() => onSelectAlert(alert.id)}
                className={`w-full text-left p-2.5 rounded transition-all border ${
                  isSelected
                    ? "bg-[#182335] border-cyan-500/80 shadow-md shadow-cyan-950/40"
                    : "bg-[#111823] border-[#243042] hover:border-slate-600 hover:bg-[#151e2b]"
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-[10px] font-mono font-bold text-cyan-400">
                    {alert.id}
                  </span>
                  <span
                    className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded uppercase ${getSeverityBadgeClass(
                      alert.priority
                    )}`}
                  >
                    {alert.priority}
                  </span>
                </div>

                <div className="text-xs font-semibold text-slate-200 line-clamp-1 mb-1">
                  {alert.rule}
                </div>

                <div className="grid grid-cols-2 gap-1 text-[10px] font-mono text-slate-400">
                  <div className="truncate">
                    <span className="text-slate-500">U:</span> {alert.user}
                  </div>
                  <div className="truncate text-right">
                    <span className="text-slate-500">H:</span> {alert.host.replace("FIN-BOS-", "")}
                  </div>
                </div>

                <div className="flex items-center justify-between text-[9px] font-mono text-slate-500 mt-1.5 pt-1.5 border-t border-slate-800">
                  <span>{alert.timestamp.split(" ")[1] || alert.timestamp}</span>
                  <span className="flex items-center text-cyan-400 gap-0.5">
                    {isSelected && (
                      <>
                        <span>INVESTIGATING</span>
                        <ChevronRight className="w-2.5 h-2.5" />
                      </>
                    )}
                  </span>
                </div>
              </button>
            );
          })
        )}
      </div>
    </aside>
  );
};
