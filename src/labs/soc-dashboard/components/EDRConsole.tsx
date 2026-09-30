"use client";

import React from "react";
import { Cpu, Terminal, ShieldAlert, AlertOctagon, CheckCircle2, CornerDownRight } from "lucide-react";
import { EDRProcessTree, EDRProcessNode } from "../types/lab.types";
import { getSeverityBadgeClass } from "../utils/formatting";

interface EDRConsoleProps {
  tree: EDRProcessTree | null;
}

const ProcessTreeNode: React.FC<{ node: EDRProcessNode; depth?: number }> = ({
  node,
  depth = 0,
}) => {
  const isTerminated = node.status === "TERMINATED";
  const isCritical = node.severity === "CRITICAL" || node.severity === "HIGH";

  return (
    <div className={`mt-2 ${depth > 0 ? "ml-5 pl-3 border-l-2 border-slate-700/60" : ""}`}>
      <div
        className={`p-3 rounded-lg border transition-all ${
          isTerminated
            ? "bg-red-950/20 border-red-500/50"
            : isCritical
            ? "bg-amber-950/20 border-amber-500/40"
            : "bg-[#111823] border-[#243042]"
        }`}
      >
        {/* Node Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-2">
            {depth > 0 && <CornerDownRight className="w-3.5 h-3.5 text-slate-500" />}
            <span className="font-bold text-slate-100 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              {node.name}
            </span>
            <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded font-mono">
              PID: {node.pid} {node.ppid ? `| PPID: ${node.ppid}` : ""}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[10px]">
            <span className="text-slate-400">{node.timestamp}</span>
            <span
              className={`px-1.5 py-0.5 rounded font-bold uppercase ${
                isTerminated
                  ? "bg-red-900 text-red-200 border border-red-700"
                  : "bg-emerald-950 text-emerald-400 border border-emerald-800"
              }`}
            >
              {node.status}
            </span>
            {node.severity && (
              <span className={`px-1.5 py-0.5 rounded font-bold uppercase ${getSeverityBadgeClass(node.severity)}`}>
                {node.severity}
              </span>
            )}
          </div>
        </div>

        {/* Command line */}
        {node.commandLine && (
          <div className="bg-[#0a0e14] border border-slate-800/80 rounded p-2 my-1.5 text-[11px] text-cyan-300 font-mono break-all select-all">
            <span className="text-slate-500 select-none">$ </span>
            {node.commandLine}
          </div>
        )}

        {/* Security Action / Warning */}
        {node.action && (
          <div className="text-[10px] text-amber-300 flex items-center gap-1.5 mt-1">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <span>{node.action}</span>
          </div>
        )}

        {/* Network Attempt */}
        {node.networkAttempt && (
          <div className="mt-2 p-2 rounded bg-[#0d131d] border border-red-500/30 text-[10px] flex items-center justify-between">
            <span className="text-red-400 font-bold flex items-center gap-1">
              <AlertOctagon className="w-3 h-3" />
              DESTINATION: {node.networkAttempt.destination} ({node.networkAttempt.protocol || "TCP"})
            </span>
            <span className="text-slate-400">
              STATUS: <strong className="text-red-300">{node.networkAttempt.status}</strong>
              {node.networkAttempt.blockReason ? ` (${node.networkAttempt.blockReason})` : ""}
            </span>
          </div>
        )}
      </div>

      {/* Render child processes recursively */}
      {node.children && node.children.length > 0 && (
        <div className="space-y-1">
          {node.children.map((child, index) => (
            <ProcessTreeNode key={`${child.pid}-${index}`} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export const EDRConsole: React.FC<EDRConsoleProps> = ({ tree }) => {
  if (!tree) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-[#0a0e14]">
        <Cpu className="w-10 h-10 text-slate-600 mb-3" />
        <h4 className="text-sm font-bold text-slate-300 font-mono">No EDR Telemetry Available</h4>
        <p className="text-xs text-slate-500 max-w-sm mt-1">
          No endpoint telemetry has been streamed for this alert ID, or the affected asset was not an enrolled Windows endpoint.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto soc-scrollbar p-4 space-y-4 bg-[#0a0e14] font-mono text-xs">
      {/* Endpoint Metadata Header */}
      <div className="bg-[#111823] border border-[#243042] rounded-lg p-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded bg-slate-900 border border-slate-700 text-cyan-400">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400">ENDPOINT HOSTNAME</span>
            <div className="text-sm font-bold text-slate-100">{tree.host}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-right">
          <div>
            <span className="text-[10px] text-slate-400 block">AUTHENTICATED USER</span>
            <span className="text-cyan-300 font-bold">{tree.user}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block">SENSOR SNAPSHOT</span>
            <span className="text-slate-300">{tree.timestamp}</span>
          </div>
        </div>
      </div>

      {/* Process Tree Hierarchical View */}
      <div className="bg-[#111823] border border-[#243042] rounded-lg p-4">
        <div className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 pb-2 border-b border-slate-800 flex items-center justify-between">
          <span>Process Execution Hierarchy (Parent → Child Lineage)</span>
          <span className="text-[10px] text-slate-500">CrowdStrike / Defender EDR Sensor</span>
        </div>

        <div className="mt-2">
          {tree.processes.map((proc, idx) => (
            <ProcessTreeNode key={`${proc.pid}-${idx}`} node={proc} />
          ))}
        </div>
      </div>
    </div>
  );
};
