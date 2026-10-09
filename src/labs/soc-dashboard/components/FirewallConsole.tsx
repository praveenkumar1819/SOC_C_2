"use client";

import React from "react";
import { Network, ShieldAlert, Globe, Radio, AlertOctagon, CheckCircle2, XCircle } from "lucide-react";
import { FirewallLog } from "../types/lab.types";
import { getSeverityBadgeClass } from "../utils/formatting";

interface FirewallConsoleProps {
  logs: FirewallLog[];
}

export const FirewallConsole: React.FC<FirewallConsoleProps> = ({ logs }) => {
  if (!logs || logs.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-[#0a0e14]">
        <Network className="w-10 h-10 text-slate-600 mb-3" />
        <h4 className="text-sm font-bold text-slate-300 font-mono">No Perimeter Traffic Logged</h4>
        <p className="text-xs text-slate-500 max-w-sm mt-1">
          No external network connection attempts or perimeter firewall state transitions correlate with this alert.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 min-h-0 w-full overflow-y-auto soc-scrollbar p-4 pb-12 space-y-4 bg-[#0a0e14] font-mono text-xs overscroll-contain">
      {/* Network Traffic Flow Table */}
      <div className="bg-[#111823] border border-[#243042] rounded-lg p-4">
        <div className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 pb-2 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Network className="w-3.5 h-3.5" />
            <span>Palo Alto / Fortinet Perimeter Flow Logs</span>
          </div>
          <span className="text-[10px] text-slate-500">{logs.length} Sessions Captured</span>
        </div>

        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[10px] text-slate-400">
                <th className="pb-2">TIMESTAMP</th>
                <th className="pb-2">SOURCE IP:PORT</th>
                <th className="pb-2">DESTINATION IP:PORT</th>
                <th className="pb-2">PROTO</th>
                <th className="pb-2">ACTION</th>
                <th className="pb-2">TRANSFERRED</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-[11px]">
              {logs.map((log) => {
                const isBlocked = log.action === "BLOCKED" || log.action === "DROPPED";
                return (
                  <tr key={log.id} className="hover:bg-[#141e2c]">
                    <td className="py-2 text-slate-400">{log.timestamp.split(" ")[1] || log.timestamp}</td>
                    <td className="py-2 text-slate-200">
                      {log.sourceIp}:{log.sourcePort}
                    </td>
                    <td className="py-2 font-bold text-cyan-300">
                      {log.destinationIp}:{log.destinationPort}
                    </td>
                    <td className="py-2 text-slate-400">{log.protocol}</td>
                    <td className="py-2">
                      <span
                        className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                          isBlocked
                            ? "bg-red-950 text-red-400 border border-red-800"
                            : "bg-emerald-950 text-emerald-400 border border-emerald-800"
                        }`}
                      >
                        {isBlocked ? <XCircle className="w-2.5 h-2.5" /> : <CheckCircle2 className="w-2.5 h-2.5" />}
                        {log.action}
                      </span>
                    </td>
                    <td className="py-2 text-slate-400">{log.dataTransferred}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Threat Intelligence Enrichment Cards */}
      {logs
        .filter((l) => l.threatIntel)
        .map((log) => {
          const intel = log.threatIntel!;
          return (
            <div key={`intel-${log.id}`} className="bg-[#111823] border border-[#243042] rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-red-400" />
                  <span className="text-[11px] font-bold text-slate-200 uppercase tracking-wider">
                    Threat Intel Dossier: {intel.destination}
                  </span>
                </div>
                {intel.riskLevel && (
                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase ${getSeverityBadgeClass(
                      intel.riskLevel
                    )}`}
                  >
                    RISK: {intel.riskLevel}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
                <div className="bg-[#0a0e14] p-2.5 rounded border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">REPUTATION CLASSIFICATION</span>
                  <div className="text-red-400 font-bold mt-0.5">{intel.reputation}</div>
                  {intel.knownGroup && (
                    <div className="text-amber-300 text-[10px] mt-1">
                      Attributed Group: <strong>{intel.knownGroup}</strong>
                    </div>
                  )}
                </div>

                <div className="bg-[#0a0e14] p-2.5 rounded border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">GEOLOCATION & INFRASTRUCTURE</span>
                  <div className="text-slate-200 mt-0.5 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{intel.geoLocation || "Unknown Hosting Provider"}</span>
                  </div>
                  {intel.abuseReports !== undefined && (
                    <div className="text-slate-400 text-[10px] mt-1">
                      Abuse Reports: <strong className="text-red-400">{intel.abuseReports}</strong> | Previous Incidents:{" "}
                      <strong className="text-amber-400">{intel.previousIncidents || 0}</strong>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};
