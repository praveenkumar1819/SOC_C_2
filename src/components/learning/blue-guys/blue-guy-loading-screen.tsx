'use client';

import React, { useState, useEffect, useRef } from 'react';
import { BlueGuyCharacter } from './blue-guy-character';
import { getRandomQuote, BlueGuyQuote } from './blue-guy-quotes';
import { Sparkles, Film, ArrowRight, Zap } from 'lucide-react';
import { sound } from '@/lib/sound-effects';

interface BlueGuyLoadingScreenProps {
  isLoading: boolean;
  onFinished?: () => void;
  targetTitle?: string;
  category?: 'loading' | 'navigation' | 'celebration';
  durationMs?: number;
}

const CINEMA_LOADING_STEPS = [
  '1/4 • Establishing secure terminal telemetry...',
  '2/4 • Syncing detection baseline matrix...',
  '3/4 • Calibrating interactive visual engine...',
  '4/4 • Launching analyst command workspace!',
];

export function BlueGuyLoadingScreen({
  isLoading,
  onFinished,
  targetTitle,
  category = 'loading',
  durationMs = 4000,
}: BlueGuyLoadingScreenProps) {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [quote, setQuote] = useState<BlueGuyQuote>(() => getRandomQuote(category));
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(isLoading);

  const onFinishedRef = useRef(onFinished);
  useEffect(() => {
    onFinishedRef.current = onFinished;
  }, [onFinished]);

  useEffect(() => {
    if (!isLoading) {
      setVisible(false);
      setProgress(0);
      return;
    }

    setVisible(true);
    setQuote(getRandomQuote(category));
    setProgress(0);
    setCurrentStepIdx(0);
    sound.playAlert();

    const startTime = Date.now();
    const totalDuration = Math.max(4000, durationMs);

    const progTimer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentPct = Math.min(100, Math.floor((elapsed / totalDuration) * 100));
      setProgress(currentPct);

      const stepIdx = Math.min(
        CINEMA_LOADING_STEPS.length - 1,
        Math.floor((elapsed / totalDuration) * CINEMA_LOADING_STEPS.length)
      );
      setCurrentStepIdx(stepIdx);

      if (elapsed >= totalDuration) {
        clearInterval(progTimer);
        setProgress(100);
        setTimeout(() => {
          setVisible(false);
          onFinishedRef.current?.();
        }, 120);
      }
    }, 40);

    return () => {
      clearInterval(progTimer);
    };
  }, [isLoading, durationMs, category]);

  const handleSkip = () => {
    sound.playClick();
    setProgress(100);
    setVisible(false);
    onFinishedRef.current?.();
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#040817]/90 backdrop-blur-md animate-fade-in">
      {/* Background Cyber Tech Rings */}
      <div className="absolute w-[500px] h-[500px] rounded-full border border-sky-500/10 animate-[spin_20s_linear_infinite] pointer-events-none" />
      <div className="absolute w-[350px] h-[350px] rounded-full border border-dashed border-sky-400/20 animate-[spin_12s_linear_infinite_reverse] pointer-events-none" />

      {/* Main Modal Card */}
      <div className="relative w-full max-w-xl rounded-3xl bg-[#07112c] border border-sky-500/40 p-6 sm:p-8 shadow-[0_0_50px_rgba(56,189,248,0.25)] flex flex-col items-center text-center space-y-6 overflow-hidden">
        {/* Top Glow bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-indigo-500 to-cyan-400 animate-pulse" />

        {/* Header Badge */}
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-sky-500/20 border border-sky-500/40 text-[11px] font-mono font-bold text-sky-300 flex items-center gap-1.5 shadow-sm">
            <Film className="w-3.5 h-3.5 text-sky-400" />
            <span>BLUE TEAM CINEMA ENGINE • {quote.character.toUpperCase()}</span>
          </span>
          <span className="px-2 py-0.5 rounded-md bg-amber-500/15 border border-amber-500/30 text-[10px] font-mono text-amber-300">
            100% ENGLISH
          </span>
        </div>

        {/* Center: Animated Character & Speech Bubble */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full">
          {/* Animated Blue Guy Mascot */}
          <div className="shrink-0 relative">
            <BlueGuyCharacter pose="runner" size="lg" animated={true} />
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-sky-950/80 border border-sky-500/30 text-[9px] font-mono text-sky-400 whitespace-nowrap">
              {quote.character}
            </div>
          </div>

          {/* Speech Bubble with Movie Reference Quote */}
          <div className="relative bg-slate-900/90 border border-sky-500/30 rounded-2xl p-4 sm:p-5 text-left shadow-lg w-full">
            {/* Speech bubble pointer */}
            <div className="hidden sm:block absolute -left-2 top-8 w-4 h-4 bg-slate-900 border-l border-b border-sky-500/30 rotate-45" />

            <div className="flex items-center gap-1.5 text-amber-400 text-[11px] font-mono font-bold uppercase mb-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>{quote.movieRef}</span>
            </div>

            <p className="text-white text-sm sm:text-base font-medium leading-relaxed italic">
              &ldquo;{quote.quote}&rdquo;
            </p>
          </div>
        </div>

        {/* Dynamic Telemetry Status Ticker */}
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-300 px-1">
            <span className="flex items-center gap-1.5 text-sky-400">
              <Zap className="w-3.5 h-3.5 animate-bounce" />
              <span>{CINEMA_LOADING_STEPS[currentStepIdx]}</span>
            </span>
            <span className="font-bold text-sky-300">{progress}%</span>
          </div>

          {/* Glowing Animated Progress Bar */}
          <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-sky-500/20 p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-indigo-500 transition-all duration-75 ease-out shadow-[0_0_12px_rgba(56,189,248,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {targetTitle && (
            <p className="text-[11px] text-slate-400 font-mono pt-1 truncate">
              Loading: <strong className="text-white">{targetTitle}</strong>
            </p>
          )}
        </div>

        {/* Quick Skip button */}
        <button
          type="button"
          onClick={handleSkip}
          className="text-[11px] font-mono text-slate-400 hover:text-sky-300 transition-colors flex items-center gap-1 cursor-pointer pt-1"
        >
          <span>Skip to Scene</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
