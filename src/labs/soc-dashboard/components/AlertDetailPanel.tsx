"use client";

import React, { useState } from "react";
import { AlertSummary, ConsoleTab, EvidenceChecklistItem } from "../types/lab.types";
import { ConsoleTabsNavigation } from "./ConsoleTabsNavigation";
import { EmailGatewayConsole } from "./EmailGatewayConsole";
import { EDRConsole } from "./EDRConsole";
import { SIEMConsole } from "./SIEMConsole";
import { FirewallConsole } from "./FirewallConsole";
import { TimelineConsole } from "./TimelineConsole";
import { EvidenceChecklistPanel } from "./EvidenceChecklistPanel";
import { useConsoleDataFetcher } from "../hooks/useConsoleDataFetcher";
import { getSeverityBadgeClass } from "../utils/formatting";
import { User, Monitor, Globe, Clock, ChevronDown, ChevronUp } from "lucide-react";

interface AlertDetailPanelProps {
  alert: AlertSummary;
  activeConsoleTab: ConsoleTab;
  onTabChange: (tab: ConsoleTab) => void;
  evidenceItems: EvidenceChecklistItem[];
}

export const AlertDetailPanel: React.FC<AlertDetailPanelProps> = ({
  alert,
  activeConsoleTab,
  onTabChange,
  evidenceItems,
}) => {
  const [showEvidence, setShowEvidence] = useState(true);
  const consoleData = useConsoleDataFetcher(alert.id);

  return (
    <div className="alert-detail-panel flex flex-col h-full min-h-0 bg-[#0a0e14] overflow-hidden">
      {/* Top Alert Metadata Ribbon */}
      <div className="bg-[#0e1520] border-b border-[#243042] p-3 shrink-0">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
              {alert.id}
            </span>
            <span className="text-xs font-bold text-slate-100">{alert.rule}</span>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase ${getSeverityBadgeClass(
                alert.priority
              )}`}
            >
              {alert.priority}
            </span>
            <span className="text-[10px] font-mono bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
              EVENTS: {alert.eventCount}
            </span>
          </div>
        </div>

        {/* 4 Critical Metadata Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono">
          <div className="bg-[#111823] p-1.5 rounded border border-slate-800 flex items-center gap-1.5 truncate">
            <User className="w-3 h-3 text-cyan-400 flex-shrink-0" />
            <span className="text-slate-500">USER:</span>
            <span className="text-slate-200 truncate font-semibold">{alert.user}</span>
          </div>

          <div className="bg-[#111823] p-1.5 rounded border border-slate-800 flex items-center gap-1.5 truncate">
            <Monitor className="w-3 h-3 text-cyan-400 flex-shrink-0" />
            <span className="text-slate-500">HOST:</span>
            <span className="text-slate-200 truncate font-semibold">{alert.host}</span>
          </div>

          <div className="bg-[#111823] p-1.5 rounded border border-slate-800 flex items-center gap-1.5 truncate">
            <Globe className="w-3 h-3 text-cyan-400 flex-shrink-0" />
            <span className="text-slate-500">IP:</span>
            <span className="text-slate-200 truncate font-semibold">{alert.sourceIp}</span>
          </div>

          <div className="bg-[#111823] p-1.5 rounded border border-slate-800 flex items-center gap-1.5 truncate">
            <Clock className="w-3 h-3 text-cyan-400 flex-shrink-0" />
            <span className="text-slate-500">TIME:</span>
            <span className="text-slate-200 truncate font-semibold">
              {alert.timestamp.split(" ")[1] || alert.timestamp}
            </span>
          </div>
        </div>

        {alert.description && (
          <p className="text-[11px] text-slate-400 mt-2 font-mono line-clamp-2">
            {alert.description}
          </p>
        )}
      </div>

      {/* 5 Investigation Consoles Navigation */}
      <ConsoleTabsNavigation
        activeTab={activeConsoleTab}
        onTabChange={onTabChange}
        counts={{
          email: consoleData.emailLogs.length,
          edr: !!consoleData.edrTree,
          siem: !!consoleData.siemCorrelation,
          firewall: consoleData.firewallLogs.length,
          timeline: consoleData.timelineEvents.length,
        }}
      />

      {/* Main Console View Area */}
      <div className="flex-1 min-h-0 overflow-hidden relative flex flex-col">
        {activeConsoleTab === "email" && <EmailGatewayConsole emails={consoleData.emailLogs} />}
        {activeConsoleTab === "edr" && <EDRConsole tree={consoleData.edrTree} />}
        {activeConsoleTab === "siem" && <SIEMConsole correlation={consoleData.siemCorrelation} />}
        {activeConsoleTab === "firewall" && <FirewallConsole logs={consoleData.firewallLogs} />}
        {activeConsoleTab === "timeline" && <TimelineConsole events={consoleData.timelineEvents} />}
      </div>

      {/* Bottom Collapsible Evidence Drawer */}
      <div className="border-t border-[#243042] bg-[#0d131d] shrink-0">
        <button
          onClick={() => setShowEvidence((prev) => !prev)}
          className="w-full px-3 py-1.5 flex items-center justify-between text-[11px] font-mono font-bold text-slate-400 hover:text-slate-200 hover:bg-[#111823] transition-colors"
        >
          <span>EVIDENCE CORRELATION CHECKLIST</span>
          <div className="flex items-center gap-1 text-[10px] text-cyan-400">
            <span>
              {evidenceItems.filter((i) => i.discovered).length}/{evidenceItems.length} Complete
            </span>
            {showEvidence ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </div>
        </button>

        {showEvidence && (
          <div className="p-2 max-h-36 overflow-y-auto soc-scrollbar">
            <EvidenceChecklistPanel
              items={evidenceItems}
              onNavigateToConsole={onTabChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};
