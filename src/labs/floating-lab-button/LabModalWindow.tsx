"use client";

import React, { useState, useEffect, useRef } from "react";
import { Maximize2, Minimize2, X, Move, Sparkles, Terminal } from "lucide-react";
import { LabId, LabCompletionResult } from "../soc-dashboard/types/lab.types";
import { SocDashboardContainer } from "../soc-dashboard/components/SocDashboardContainer";

interface LabModalWindowProps {
  isOpen: boolean;
  labId: LabId;
  onClose: () => void;
  onComplete?: (result: LabCompletionResult) => void;
  showTourFirst?: boolean;
}

export const LabModalWindow: React.FC<LabModalWindowProps> = ({
  isOpen,
  labId,
  onClose,
  onComplete,
  showTourFirst = false,
}) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; initX: number; initY: number } | null>(null);

  // Reset drag position when window opens or maximizes
  useEffect(() => {
    if (isOpen) {
      setPosition({ x: 0, y: 0 });
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isMaximized) return;
    // Don't drag if clicking buttons or actionable controls
    if ((e.target as HTMLElement).closest("button") || (e.target as HTMLElement).closest("input")) {
      return;
    }
    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initX: position.x,
      initY: position.y,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !dragRef.current || isMaximized) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    setPosition({
      x: dragRef.current.initX + dx,
      y: dragRef.current.initY + dy,
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    dragRef.current = null;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
  };

  const toggleMaximize = () => {
    setIsMaximized((prev) => !prev);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto">
      {/* Translucent backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        title="Click to close"
      />

      {/* Floating / Maximized Window */}
      <div
        style={!isMaximized ? { transform: `translate(${position.x}px, ${position.y}px)` } : undefined}
        className={`relative z-50 bg-[#0a0e14] flex flex-col overflow-hidden transition-[width,height,border-radius] duration-200 ${
          isMaximized
            ? "fixed inset-0 w-screen h-screen max-w-none max-h-none rounded-none border-0 shadow-none"
            : "w-[94vw] max-w-[1240px] h-[84vh] max-h-[720px] min-h-[480px] rounded-xl border-2 border-cyan-500/50 shadow-[0_25px_70px_rgba(0,0,0,0.85),0_0_25px_rgba(6,182,212,0.18)]"
        }`}
      >
        {/* Top Floating Titlebar */}
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onDoubleClick={toggleMaximize}
          className={`h-10 shrink-0 bg-[#090d14] border-b border-[#243042] px-3.5 flex items-center justify-between font-mono text-xs select-none transition-colors ${
            !isMaximized ? "cursor-grab active:cursor-grabbing hover:bg-[#0c121c]" : "cursor-default"
          }`}
          title={!isMaximized ? "Drag to move window • Double click to maximize" : "Double click to restore"}
        >
          {/* Left Title & Status */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/90 shadow-xs shadow-red-500/50" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/90 shadow-xs shadow-yellow-500/50" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/90 shadow-xs shadow-emerald-500/50" />
            </div>

            <div className="h-3.5 w-px bg-slate-700 mx-1" />

            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-[11px] font-bold tracking-wider text-slate-200">
                FINCORP SOC WORKSTATION // {labId.toUpperCase()}
              </span>
            </div>

            {!isMaximized ? (
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-2 py-0.5 rounded font-mono ml-2">
                <Move className="w-2.5 h-2.5" /> FLOATING WINDOW
              </span>
            ) : (
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded font-mono ml-2">
                FULLSCREEN MODE
              </span>
            )}
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-1.5">
            {/* Maximize / Restore Toggle */}
            <button
              onClick={toggleMaximize}
              className="flex items-center gap-1.5 px-2.5 py-1 text-slate-300 hover:text-white rounded bg-slate-800/70 hover:bg-slate-700 border border-slate-700 text-xs font-mono transition-colors"
              title={isMaximized ? "Restore Floating Window" : "Full Screen Window"}
            >
              {isMaximized ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="hidden sm:inline text-[11px]">Restore</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="hidden sm:inline text-[11px]">Full Screen</span>
                </>
              )}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-red-300 rounded hover:bg-red-950/50 transition-colors border border-transparent hover:border-red-800/60"
              title="Close SOC Workstation (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Content - Complete SOC Dashboard */}
        <div className="flex-1 min-h-0 w-full overflow-hidden flex flex-col">
          <SocDashboardContainer
            labId={labId}
            onComplete={onComplete}
            onClose={onClose}
            showTourFirst={showTourFirst}
            isModal={true}
          />
        </div>
      </div>
    </div>
  );
};
