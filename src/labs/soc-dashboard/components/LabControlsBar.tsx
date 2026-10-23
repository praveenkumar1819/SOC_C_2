"use client";

import React, { useState } from "react";
import { Lightbulb, RotateCcw, Send, HelpCircle, X } from "lucide-react";
import { LabId } from "../types/lab.types";

interface LabControlsBarProps {
  labId: LabId;
  hintsUsed: number;
  currentHintText: string | null;
  onGetHint: () => void;
  onReset: () => void;
  onSubmit: () => void;
}

export const LabControlsBar: React.FC<LabControlsBarProps> = ({
  labId,
  hintsUsed,
  currentHintText,
  onGetHint,
  onReset,
  onSubmit,
}) => {
  const [showHintDialog, setShowHintDialog] = useState(false);

  const handleHintClick = () => {
    onGetHint();
    setShowHintDialog(true);
  };

  return (
    <div className="lab-controls-bar shrink-0 bg-[#0d131d] border-t border-[#243042] px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
      {/* Left: Hint & Guidance */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleHintClick}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-amber-950/40 hover:bg-amber-900/50 text-amber-300 border border-amber-600/40 text-xs font-mono transition-all font-semibold"
        >
          <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
          <span>REQUEST MENTOR HINT</span>
          {hintsUsed > 0 && (
            <span className="text-[10px] bg-amber-900/80 px-1.5 py-0.2 rounded text-amber-200">
              {hintsUsed}
            </span>
          )}
        </button>

        {showHintDialog && currentHintText && (
          <div className="fixed sm:absolute bottom-16 left-4 right-4 sm:right-auto sm:max-w-md bg-[#162030] border border-cyan-500/60 rounded-lg p-3 shadow-xl z-50 animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-start justify-between gap-2 mb-1">
              <span className="text-[11px] font-bold text-cyan-400 flex items-center gap-1.5 font-mono">
                <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
                Rajesh Kumar (L1 Mentor Guidance):
              </span>
              <button
                onClick={() => setShowHintDialog(false)}
                className="text-slate-400 hover:text-white p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-xs text-slate-200 font-mono leading-relaxed mt-1">
              {currentHintText}
            </p>
          </div>
        )}
      </div>

      {/* Right: Reset & Submit */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            if (window.confirm("Are you sure you want to reset all lab entries for this scenario?")) {
              onReset();
            }
          }}
          className="flex items-center gap-1 px-3 py-1.5 rounded bg-[#151d2a] hover:bg-[#1c2738] text-slate-400 hover:text-slate-200 border border-[#243042] text-xs font-mono transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>RESET</span>
        </button>

        <button
          onClick={onSubmit}
          className="flex items-center gap-2 px-5 py-1.5 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono shadow-md shadow-cyan-500/20 transition-all active:scale-95"
        >
          <Send className="w-3.5 h-3.5" />
          <span>SUBMIT FINDINGS</span>
        </button>
      </div>
    </div>
  );
};
