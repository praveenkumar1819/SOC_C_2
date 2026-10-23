'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { BlueGuyCharacter, BlueGuyPose } from './blue-guy-character';
import { getRandomQuote, BlueGuyQuote, BLUE_GUY_QUOTES } from './blue-guy-quotes';
import { sound } from '@/lib/sound-effects';
import {
  Film,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  X,
  Volume2,
  VolumeX,
  Shuffle,
  Coffee,
  Zap,
  Award,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface BlueGuyNavCompanionProps {
  currentChapterTitle?: string;
  onNext?: () => void;
  onPrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
  onSelectPillar?: (pillarIndex: number) => void;
  activePillarIndex?: number;
}

export function BlueGuyNavCompanion({
  currentChapterTitle,
  onNext,
  onPrev,
  hasNext = true,
  hasPrev = true,
  onSelectPillar,
  activePillarIndex = 0,
}: BlueGuyNavCompanionProps) {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentQuote, setCurrentQuote] = useState<BlueGuyQuote>(BLUE_GUY_QUOTES[0]);
  const [currentPose, setCurrentPose] = useState<BlueGuyPose>('hero');
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCurrentQuote(getRandomQuote('navigation'));
    setIsMuted(sound.isMuted());
  }, []);

  // Roll next quote with pose synergy
  const rollNextDialogue = () => {
    sound.playClick();
    const nextQ = getRandomQuote();
    setCurrentQuote(nextQ);

    // Pick matching pose
    if (nextQ.category === 'celebration') setCurrentPose('dancer');
    else if (nextQ.vibe === 'dramatic') setCurrentPose('dramatic');
    else if (nextQ.character.includes('Cobalt') || nextQ.quote.toLowerCase().includes('chai')) setCurrentPose('chai');
    else if (nextQ.category === 'loading' || nextQ.vibe === 'tech') setCurrentPose('runner');
    else setCurrentPose('hero');
  };

  const handleNextClick = () => {
    sound.playClick();
    const nextQ = getRandomQuote('navigation');
    setCurrentQuote(nextQ);
    if (onNext) onNext();
  };

  const handlePrevClick = () => {
    sound.playClick();
    const prevQ = getRandomQuote('navigation');
    setCurrentQuote(prevQ);
    if (onPrev) onPrev();
  };

  const toggleSound = () => {
    const nextMute = sound.toggleMute();
    setIsMuted(nextMute);
  };

  if (!mounted) return null;

  return createPortal(
    <>
      {/* =======================================================================
          MINI FLOATING DOCK LAUNCHER (When widget is closed)
      ======================================================================= */}
      {!isOpen && (
        <div className="fixed bottom-5 right-5 sm:right-6 z-50 flex items-center gap-2 group animate-fade-in pointer-events-auto">
          {/* Teaser Tooltip Bubble */}
          <div
            onClick={() => {
              sound.playClick();
              setIsOpen(true);
            }}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-[#07132e]/95 border border-sky-500/40 text-xs text-sky-200 shadow-xl cursor-pointer hover:border-sky-400 transition-all hover:scale-105"
          >
            <Film className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="font-mono text-[11px] font-bold text-amber-300">
              Blue Squad Cinema:
            </span>
            <span className="text-[11px] text-slate-300 truncate max-w-[200px] italic">
              &ldquo;{currentQuote.quote.slice(0, 45)}...&rdquo;
            </span>
          </div>

          {/* Floating Avatar Trigger */}
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setIsOpen(true);
            }}
            className="w-14 h-14 rounded-full bg-gradient-to-tr from-sky-600 via-sky-500 to-indigo-600 border-2 border-sky-300 p-1 shadow-[0_0_20px_rgba(56,189,248,0.5)] cursor-pointer hover:scale-110 active:scale-95 transition-all flex items-center justify-center relative"
            title="Open Blue Squad Cinema Companion (Hilarious Indian Movie Quotes in English!)"
          >
            <BlueGuyCharacter pose={currentPose} size="sm" animated={true} showGlow={false} />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 text-slate-950 font-bold text-[9px] flex items-center justify-center border border-white">
              🎬
            </span>
          </button>
        </div>
      )}

      {/* =======================================================================
          EXPANDED CINEMA COMPANION DOCK (When widget is open)
      ======================================================================= */}
      {isOpen && (
        <div className="fixed bottom-5 right-5 z-50 w-[92vw] sm:w-[420px] rounded-3xl bg-[#060e24]/98 border border-sky-500/40 p-4 sm:p-5 shadow-[0_10px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(56,189,248,0.3)] backdrop-blur-xl animate-scale-up space-y-4 text-slate-100">
          {/* Top Bar: Title, Controls, Close */}
          <div className="flex items-center justify-between pb-2 border-b border-sky-500/20">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-sky-500/20 border border-sky-500/40 flex items-center justify-center">
                <Film className="w-4 h-4 text-sky-400" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-white flex items-center gap-1.5 font-mono">
                  <span>BLUE SQUAD CINEMA</span>
                  <Badge className="bg-amber-500/20 text-amber-300 border-amber-500/30 text-[9px] px-1 py-0">
                    NO HINDI • 100% ENGLISH
                  </Badge>
                </h4>
                <p className="text-[10px] text-slate-400">
                  {currentQuote.character} ({currentQuote.vibe})
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={toggleSound}
                className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
                title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-sky-400" />}
              </button>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setIsOpen(false);
                }}
                className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
                title="Minimize Companion"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Dialogue Section: Blue Guy + Speech Bubble */}
          <div className="flex items-center gap-3">
            <div
              onClick={rollNextDialogue}
              className="shrink-0 cursor-pointer group flex flex-col items-center"
              title="Click character to cycle pose & quote!"
            >
              <BlueGuyCharacter pose={currentPose} size="md" animated={true} />
              <span className="text-[9px] font-mono text-sky-400 opacity-80 group-hover:opacity-100 mt-1">
                Tap me!
              </span>
            </div>

            {/* Speech Bubble */}
            <div className="bg-slate-900/90 border border-sky-500/30 rounded-2xl p-3 text-xs space-y-1.5 shadow-inner relative flex-1">
              <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-amber-400 uppercase">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span className="truncate">{currentQuote.movieRef}</span>
              </div>
              <p className="text-white text-xs leading-relaxed italic">
                &ldquo;{currentQuote.quote}&rdquo;
              </p>
            </div>
          </div>

          {/* Pose Switcher Toolbar */}
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-800">
            <span className="text-slate-400">HERO POSE:</span>
            <div className="flex items-center gap-1">
              {(['hero', 'runner', 'chai', 'dancer', 'dramatic'] as BlueGuyPose[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setCurrentPose(p);
                  }}
                  className={`px-2 py-0.5 rounded text-[9px] uppercase font-bold transition-all ${
                    currentPose === p
                      ? 'bg-sky-500 text-slate-950 shadow-xs'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Navigation Controls */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handlePrevClick}
              disabled={!hasPrev}
              className="h-8 text-xs font-semibold gap-1.5 rounded-xl border-sky-500/30 text-sky-300 hover:bg-sky-500/10 cursor-pointer disabled:opacity-40"
              title="Flashback to previous chapter"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Rewind Flashback</span>
            </Button>

            <Button
              type="button"
              size="sm"
              onClick={handleNextClick}
              disabled={!hasNext}
              className="h-8 text-xs font-semibold gap-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white cursor-pointer shadow-md disabled:opacity-40"
              title="Advance to next chapter"
            >
              <span>Next Scene</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Button>
          </div>

          {/* Bottom Shuffle Quote Button */}
          <button
            type="button"
            onClick={rollNextDialogue}
            className="w-full py-2 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-300 hover:bg-sky-500/20 text-xs font-mono font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Roll Another Cinema Dialogue 🎬</span>
          </button>
        </div>
      )}
    </>,
    document.body
  );
}
