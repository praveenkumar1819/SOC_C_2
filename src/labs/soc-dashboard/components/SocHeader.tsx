"use client";

import React from "react";
import { Shield, Clock, HelpCircle, X, Terminal, Radio, Maximize2, Minimize2 } from "lucide-react";
import { LabId } from "../types/lab.types";
import { formatDuration } from "../utils/formatting";

export interface SocHeaderProps {
  labId: LabId;
  labTitle: string;
  elapsedSeconds: number;
  onOpenTour?: () => void;
  onClose?: () => void;
  isModal?: boolean;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
}

export const SocHeader: React.FC<SocHeaderProps> = ({
  labId,
  labTitle,
  elapsedSeconds,
  onOpenTour,
  onClose,
  isModal = false,
  isFullscreen = false,
  onToggleFullscreen,
}) => {
  return (
    <header className="h-12 sm:h-14 shrink-0 bg-[#0d131d] border-b border-[#243042] px-3 sm:px-4 flex items-center justify-between select-none">
      {/* Left: Branding & Status */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
          <Shield className="w-4 h-4" />
        </div>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-xs uppercase tracking-wider text-slate-100 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              FinCorp SOC
            </span>
            <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-mono">
              BOSTON HQ
            </span>
            <span className="text-[11px] font-semibold text-cyan-400 border border-cyan-500/30 bg-cyan-950/50 px-2 py-0.5 rounded">
              {labTitle}
            </span>
          </div>
          <p className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
            <Radio className="w-2.5 h-2.5 text-cyan-400" /> LIVE TELEMETRY SIMULATOR
          </p>
        </div>
      </div>

      {/* Center: Live Timer & Telemetry Indicator */}
      <div className="hidden md:flex items-center gap-4 bg-[#111823] px-3 py-1 rounded border border-[#243042]">
        <div className="flex items-center gap-1.5 text-xs font-mono text-slate-300">
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          <span>INVESTIGATION TIME:</span>
          <span className="text-cyan-400 font-bold">{formatDuration(elapsedSeconds)}</span>
        </div>
        <div className="h-3 w-px bg-slate-700" />
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
          <Terminal className="w-3 h-3" />
          <span>SIEM ACTIVE</span>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {onToggleFullscreen && (
          <button
            onClick={onToggleFullscreen}
            className="flex items-center gap-1 text-xs text-slate-300 hover:text-cyan-400 hover:bg-[#1a2333] px-2.5 py-1.5 rounded border border-[#243042] transition-colors cursor-pointer"
            title={isFullscreen ? "Collapse to embedded view" : "Expand to fullscreen workstation"}
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline text-[11px] font-mono">COLLAPSE</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline text-[11px] font-mono">FULLSCREEN</span>
              </>
            )}
          </button>
        )}

        {onOpenTour && (
          <button
            onClick={onOpenTour}
            className="flex items-center gap-1 text-xs text-slate-300 hover:text-cyan-400 hover:bg-[#1a2333] px-2.5 py-1.5 rounded border border-[#243042] transition-colors cursor-pointer"
            title="Start Guided Dashboard Tour"
          >
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline text-[11px] font-mono">TOUR</span>
          </button>
        )}

        {(isModal || isFullscreen) && onClose && (
          <button
            onClick={onClose}
            className="flex items-center gap-1 text-slate-300 hover:text-white bg-red-950/40 hover:bg-red-900/60 border border-red-700/50 px-2.5 py-1.5 rounded transition-colors cursor-pointer text-xs font-mono ml-1"
            title="Exit Fullscreen Workstation (Esc)"
          >
            <X className="w-4 h-4 text-red-400" />
            <span className="hidden sm:inline font-bold text-red-300">EXIT LAB</span>
          </button>
        )}
      </div>
    </header>
  );
};
