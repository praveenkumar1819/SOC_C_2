"use client";

import React from "react";
import { TourStep } from "../types/lab.types";
import { Shield, ChevronRight, ChevronLeft, X, Sparkles } from "lucide-react";

interface DashboardTourOverlayProps {
  isOpen: boolean;
  currentStep: number;
  totalSteps: number;
  stepData: TourStep;
  onNext: () => void;
  onPrev: () => void;
  onComplete: () => void;
}

export const DashboardTourOverlay: React.FC<DashboardTourOverlayProps> = ({
  isOpen,
  currentStep,
  totalSteps,
  stepData,
  onNext,
  onPrev,
  onComplete,
}) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onComplete();
      }}
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
    >
      <div className="max-w-lg w-full bg-[#111823] border border-cyan-500/80 rounded-xl shadow-2xl shadow-cyan-950/60 p-6 space-y-4">
        {/* Modal Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-700">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block">
                SOC DASHBOARD ORIENTATION
              </span>
              <h3 className="text-sm font-bold text-slate-100 font-mono">
                {stepData.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onComplete}
            className="text-slate-500 hover:text-slate-300 p-1 rounded hover:bg-slate-800"
            title="Skip Tour"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Body */}
        <div className="text-xs text-slate-300 font-mono leading-relaxed space-y-3">
          <p>{stepData.description}</p>
        </div>

        {/* Progress Dots & Buttons */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
          {/* Progress Indicators */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalSteps }).map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentStep
                    ? "w-6 bg-cyan-400"
                    : "w-2 bg-slate-700"
                }`}
              />
            ))}
            <span className="text-[10px] text-slate-500 font-mono ml-2">
              {currentStep + 1} / {totalSteps}
            </span>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2">
            {currentStep > 0 && (
              <button
                onClick={onPrev}
                className="flex items-center gap-1 px-3 py-1.5 rounded border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>BACK</span>
              </button>
            )}

            <button
              onClick={onNext}
              className="flex items-center gap-1 px-4 py-1.5 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono transition-all"
            >
              <span>{currentStep === totalSteps - 1 ? "BEGIN LAB" : "NEXT"}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
