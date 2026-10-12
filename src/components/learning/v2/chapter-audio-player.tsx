'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, RotateCcw, FastForward, Sparkles, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChapterAudioPlayerProps {
  title: string;
  mentor: string;
  mentorRole: string;
  theoryText: string;
  audioUrl?: string;
  estimatedMinutes?: number;
}

export function ChapterAudioPlayer({
  title,
  mentor,
  mentorRole,
  theoryText,
  audioUrl,
  estimatedMinutes = 7,
}: ChapterAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [useSpeechSynthesis, setUseSpeechSynthesis] = useState(!audioUrl);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    // Reset on title change
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setProgress(0);
    setUseSpeechSynthesis(!audioUrl);
  }, [title, audioUrl]);

  // Handle custom audio playback
  useEffect(() => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.ontimeupdate = () => {
        if (audio.duration) {
          setProgress((audio.currentTime / audio.duration) * 100);
        }
      };

      audio.onended = () => {
        setIsPlaying(false);
        setProgress(100);
      };

      return () => {
        audio.pause();
      };
    }
  }, [audioUrl]);

  const togglePlay = () => {
    if (isPlaying) {
      // Pause
      if (audioRef.current && !useSpeechSynthesis) {
        audioRef.current.pause();
      } else if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.pause();
      }
      setIsPlaying(false);
    } else {
      // Play
      if (audioUrl && !useSpeechSynthesis && audioRef.current) {
        audioRef.current.playbackRate = playbackRate;
        audioRef.current.play().catch(() => {
          // Fallback to speech synthesis if audio file fails to load
          startSpeechSynthesis();
        });
        setIsPlaying(true);
      } else {
        startSpeechSynthesis();
      }
    }
  };

  const startSpeechSynthesis = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPlaying(true);
      return;
    }

    window.speechSynthesis.cancel();

    // Clean text for natural speech
    const cleanSpeechText = `Hello analyst. I am Mentor ${mentor}. Here is the walkthrough for ${title}. ${theoryText.replace(/•/g, '').replace(/[*_#]/g, '')}`;

    const utterance = new SpeechSynthesisUtterance(cleanSpeechText);
    utterance.rate = playbackRate;

    // Pick English or Indian English voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice =
      voices.find((v) => v.lang.includes('en-IN') || v.name.toLowerCase().includes('india')) ||
      voices.find((v) => v.lang.startsWith('en')) ||
      voices[0];

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onend = () => {
      setIsPlaying(false);
      setProgress(100);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
    };

    synthRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
    setUseSpeechSynthesis(true);
  };

  const handleSpeedToggle = () => {
    const nextRate = playbackRate === 1 ? 1.25 : playbackRate === 1.25 ? 1.5 : 1;
    setPlaybackRate(nextRate);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextRate;
    }
    if (useSpeechSynthesis && isPlaying) {
      startSpeechSynthesis();
    }
  };

  const handleReset = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setProgress(0);
  };

  return (
    <div className="rounded-xl border border-primary/25 bg-gradient-to-r from-primary/5 via-primary/10 to-transparent p-3 sm:p-4 shadow-sm backdrop-blur-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left: Mentor Info & Audio Mode */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary shrink-0 shadow-inner">
            <Volume2 className="w-5 h-5 text-primary animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-xs sm:text-sm text-foreground flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-primary" />
                Mentor {mentor}
              </span>
              <span className="text-[11px] font-mono text-muted-foreground bg-muted/60 px-2 py-0.5 rounded-full border border-border/50">
                {mentorRole}
              </span>
              {audioUrl ? (
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-300 dark:border-emerald-800">
                  Audio Track
                </span>
              ) : (
                <span className="text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded border border-primary/25 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" /> AI Narrator
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Audio Walkthrough: <span className="font-semibold text-foreground">{title}</span> (~{estimatedMinutes} min)
            </p>
          </div>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={handleSpeedToggle}
            className="text-[11px] font-mono font-bold h-8 px-2.5 rounded-lg border-border/70 hover:bg-muted"
            title="Adjust Playback Speed"
          >
            <FastForward className="w-3.5 h-3.5 mr-1 text-primary" />
            {playbackRate}x
          </Button>

          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={handleReset}
            className="h-8 w-8 p-0 rounded-lg border-border/70 text-muted-foreground hover:text-foreground"
            title="Restart Audio"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </Button>

          <Button
            type="button"
            size="sm"
            onClick={togglePlay}
            className="h-8 px-3.5 rounded-lg bg-primary hover:bg-primary/90 text-white font-semibold text-xs gap-1.5 shadow-sm cursor-pointer"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Listen ({mentor})</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Mini Progress Bar when playing */}
      {isPlaying && (
        <div className="w-full bg-primary/15 rounded-full h-1 mt-3 overflow-hidden">
          <div
            className="bg-primary h-full transition-all duration-300"
            style={{ width: `${Math.max(progress, 5)}%` }}
          />
        </div>
      )}
    </div>
  );
}
