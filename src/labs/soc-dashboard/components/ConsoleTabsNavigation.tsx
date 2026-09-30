"use client";

import React from "react";
import { Mail, Cpu, Network, ShieldAlert, History } from "lucide-react";
import { ConsoleTab } from "../types/lab.types";

interface ConsoleTabsNavigationProps {
  activeTab: ConsoleTab;
  onTabChange: (tab: ConsoleTab) => void;
  counts?: {
    email: number;
    edr: boolean;
    siem: boolean;
    firewall: number;
    timeline: number;
  };
}

export const ConsoleTabsNavigation: React.FC<ConsoleTabsNavigationProps> = ({
  activeTab,
  onTabChange,
  counts,
}) => {
  const tabs = [
    {
      id: "email" as ConsoleTab,
      label: "Email Gateway",
      icon: Mail,
      countBadge: counts?.email ? `${counts.email}` : undefined,
    },
    {
      id: "edr" as ConsoleTab,
      label: "EDR Console",
      icon: Cpu,
      countBadge: counts?.edr ? "PROC" : undefined,
    },
    {
      id: "siem" as ConsoleTab,
      label: "SIEM Correlation",
      icon: ShieldAlert,
      countBadge: counts?.siem ? "RULE" : undefined,
    },
    {
      id: "firewall" as ConsoleTab,
      label: "Firewall & Intel",
      icon: Network,
      countBadge: counts?.firewall ? `${counts.firewall}` : undefined,
    },
    {
      id: "timeline" as ConsoleTab,
      label: "Timeline",
      icon: History,
      countBadge: counts?.timeline ? `${counts.timeline}` : undefined,
    },
  ];

  return (
    <nav className="console-tabs-nav shrink-0 flex items-center bg-[#0d131d] border-b border-[#243042] px-2 gap-1 overflow-x-auto soc-scrollbar">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 px-3 py-2.5 text-xs font-mono transition-all border-b-2 whitespace-nowrap ${
              isActive
                ? "border-cyan-400 text-cyan-300 bg-[#162030]/80 font-bold"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-[#111823]"
            }`}
          >
            <Icon className={`w-3.5 h-3.5 ${isActive ? "text-cyan-400" : "text-slate-500"}`} />
            <span>{tab.label}</span>
            {tab.countBadge && (
              <span
                className={`text-[9px] px-1 py-0.2 rounded font-mono ${
                  isActive
                    ? "bg-cyan-950 text-cyan-300 border border-cyan-700"
                    : "bg-slate-800 text-slate-400"
                }`}
              >
                {tab.countBadge}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
};
