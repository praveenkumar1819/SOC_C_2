"use client";

import React from "react";
import { CheckCircle2, AlertOctagon, Trophy, ArrowRight, RotateCcw, X, ShieldCheck } from "lucide-react";
import { LabCompletionResult } from "../types/lab.types";
import { formatDuration } from "../utils/formatting";

interface LabCompletionModalProps {
  isOpen: boolean;
  result: LabCompletionResult | null;
  onClose: () => void;
  onRetry?: () => void;
  onNextLab?: () => void;
}

export const LabCompletionModal: React.FC<LabCompletionModalProps> = ({
  isOpen,
  result,
  onClose,
  onRetry,
  onNextLab,
}) => {
  if (!isOpen || !result) return null;

  const isPassed = result.passed;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 select-none animate-in fade-in">
      <div className="max-w-xl w-full bg-[#111823] border border-[#243042] rounded-xl shadow-2xl p-6 space-y-5">
        {/* Header Ribbon */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div
              className={`p-2.5 rounded-lg border ${
                isPassed
                  ? "bg-emerald-950/80 border-emerald-500/60 text-emerald-400"
                  : "bg-red-950/80 border-red-500/60 text-red-400"
              }`}
            >
              {isPassed ? <ShieldCheck className="w-6 h-6" /> : <AlertOctagon className="w-6 h-6" />}
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                EVALUATION RESULT • {result.labId.toUpperCase()}
              </span>
              <h3 className="text-base font-bold text-slate-100 font-mono">
                {isPassed ? "Triage Mission Completed Successfully" : "Mission Requires Revision"}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-300 p-1 rounded hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Score & Metrics Cards */}
        <div className="grid grid-cols-3 gap-3 font-mono">
          <div className="bg-[#0a0e14] p-3 rounded-lg border border-slate-800 text-center">
            <span className="text-[10px] text-slate-500 block">TOTAL SCORE</span>
            <span
              className={`text-xl font-black ${
                isPassed ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {result.score}%
            </span>
          </div>

          <div className="bg-[#0a0e14] p-3 rounded-lg border border-slate-800 text-center">
            <span className="text-[10px] text-slate-500 block">TIME INVESTED</span>
            <span className="text-xl font-black text-cyan-400">
              {formatDuration(result.timeSpent)}
            </span>
          </div>

          <div className="bg-[#0a0e14] p-3 rounded-lg border border-slate-800 text-center">
            <span className="text-[10px] text-slate-500 block">STATUS</span>
            <span
              className={`text-xs font-black uppercase inline-block mt-1 px-2 py-0.5 rounded border ${
                isPassed
                  ? "bg-emerald-950 text-emerald-300 border-emerald-700"
                  : "bg-red-950 text-red-300 border-red-700"
              }`}
            >
              {isPassed ? "QUALIFIED" : "REVISE"}
            </span>
          </div>
        </div>

        {/* Mentor Narrative Feedback */}
        <div className="bg-[#0e1724] border border-[#243042] rounded-lg p-4 font-mono">
          <div className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5" />
            <span>FinCorp SOC Team Debrief:</span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-line">
            {result.feedback}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors"
          >
            REVIEW WORKSPACE
          </button>

          <div className="flex items-center gap-2">
            {!isPassed && onRetry && (
              <button
                onClick={onRetry}
                className="flex items-center gap-1.5 px-4 py-2 rounded border border-amber-600/50 bg-amber-950/40 hover:bg-amber-900/50 text-amber-300 text-xs font-mono font-bold transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>TRY AGAIN</span>
              </button>
            )}

            {isPassed && onNextLab && (
              <button
                onClick={onNextLab}
                className="flex items-center gap-1.5 px-5 py-2 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-mono font-bold transition-all shadow-md shadow-cyan-500/20"
              >
                <span>NEXT SCENARIO</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
