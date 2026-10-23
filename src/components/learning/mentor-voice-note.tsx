'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX, Play, Pause, RotateCcw, Sparkles, MessageSquare, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface MentorVoiceNoteProps {
  mentorName: string;
  mentorRole: string;
  avatarInitials: string;
  avatarBg?: string;
  audioText: string;
  displaySummary?: string;
  accentNote?: string;
  title?: string;
  gender?: 'male' | 'female';
  autoPlay?: boolean;
  onAudioStateChange?: (playing: boolean) => void;
}

export function MentorVoiceNote({
  mentorName = 'Rajesh Kumar',
  mentorRole = 'Senior Guide & Mentor',
  avatarInitials = 'RK',
  avatarBg = 'bg-gradient-to-br from-amber-600 to-orange-600 text-white',
  audioText,
  displaySummary,
  accentNote = 'Indian English • Mentor Guidance',
  title = "Mentor Voice Guidance 🎙️",
  gender = 'male',
  autoPlay = true,
  onAudioStateChange,
}: MentorVoiceNoteProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [showTranscript, setShowTranscript] = useState(false);
  const [needsUserGesture, setNeedsUserGesture] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const autoPlayFiredRef = useRef<string>('');
  const keepAliveTimerRef = useRef<any>(null);
  const speechTimeoutRef = useRef<any>(null);

  // Initialize and load voices
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSupported(false);
      return;
    }

    const synth = window.speechSynthesis;

    const populateVoices = () => {
      const availableVoices = synth.getVoices();
      if (availableVoices && availableVoices.length > 0) {
        setVoices(availableVoices);
      }
    };

    populateVoices();
    synth.onvoiceschanged = populateVoices;

    // Global unlock handler for browser autoplay restriction
    const handleUserInteraction = () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        try {
          window.speechSynthesis.resume();
        } catch {
          // ignore
        }
      }
      setNeedsUserGesture(false);
    };

    window.addEventListener('click', handleUserInteraction, { passive: true });
    window.addEventListener('keydown', handleUserInteraction, { passive: true });
    window.addEventListener('touchstart', handleUserInteraction, { passive: true });

    return () => {
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      if (keepAliveTimerRef.current) clearInterval(keepAliveTimerRef.current);
      if (speechTimeoutRef.current) clearTimeout(speechTimeoutRef.current);
    };
  }, []);

  // Chrome long speech bugfix: heartbeat keep-alive
  useEffect(() => {
    if (isPlaying) {
      keepAliveTimerRef.current = setInterval(() => {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
          const synth = window.speechSynthesis;
          if (synth.speaking && !synth.paused) {
            synth.pause();
            synth.resume();
          }
        }
      }, 9000);
    } else {
      if (keepAliveTimerRef.current) {
        clearInterval(keepAliveTimerRef.current);
        keepAliveTimerRef.current = null;
      }
    }

    return () => {
      if (keepAliveTimerRef.current) clearInterval(keepAliveTimerRef.current);
    };
  }, [isPlaying]);

  // Voice playback logic
  const startSpeech = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const synth = window.speechSynthesis;

    try {
      synth.cancel();
    } catch {
      // ignore
    }

    // Small delay ensures previous cancellation clears Chromium's audio queue
    if (speechTimeoutRef.current) clearTimeout(speechTimeoutRef.current);

    speechTimeoutRef.current = setTimeout(() => {
      try {
        synth.resume();

        const utter = new SpeechSynthesisUtterance(audioText);
        utteranceRef.current = utter;

        const currentVoices = voices.length > 0 ? voices : synth.getVoices();
        let chosenVoice: SpeechSynthesisVoice | undefined;

        if (gender === 'female') {
          // Prioritize female voice with Indian English / natural tone
          chosenVoice =
            currentVoices.find((v) => (v.lang === 'en-IN' || v.lang === 'en_IN') && /heera|veena|kalpana|geeta|priya|female|neerja/i.test(v.name)) ||
            currentVoices.find((v) => (v.lang === 'en-IN' || v.lang === 'en_IN') && !/ravi|prabhat|male/i.test(v.name)) ||
            currentVoices.find((v) => /heera|veena|zira|samantha|karen|victoria|female/i.test(v.name) && !/male|ravi|david|mark/i.test(v.name)) ||
            currentVoices.find((v) => v.lang.startsWith('en') && /female|zira|samantha/i.test(v.name));
        } else {
          // Prioritize male voice with Indian English / natural tone
          chosenVoice =
            currentVoices.find((v) => (v.lang === 'en-IN' || v.lang === 'en_IN') && /ravi|prabhat|male/i.test(v.name)) ||
            currentVoices.find((v) => (v.lang === 'en-IN' || v.lang === 'en_IN') && !/heera|veena|kalpana|geeta|priya|female/i.test(v.name)) ||
            currentVoices.find((v) => /ravi|david|mark|george|male/i.test(v.name) && !/female|heera|veena|zira/i.test(v.name)) ||
            currentVoices.find((v) => v.lang.startsWith('en') && /male|david|mark/i.test(v.name));
        }

        if (!chosenVoice && currentVoices.length > 0) {
          chosenVoice = currentVoices.find((v) => v.lang.startsWith('en')) || currentVoices[0];
        }

        if (chosenVoice) {
          utter.voice = chosenVoice;
        }

        // Calibrated natural pitch and speech rate for each gender
        utter.pitch = gender === 'female' ? 1.15 : 0.92;
        utter.rate = gender === 'female' ? 0.95 : 0.93;

        utter.onstart = () => {
          setIsPlaying(true);
          setNeedsUserGesture(false);
          if (onAudioStateChange) onAudioStateChange(true);
        };

        utter.onend = () => {
          setIsPlaying(false);
          if (onAudioStateChange) onAudioStateChange(false);
        };

        utter.onerror = (e) => {
          setIsPlaying(false);
          if (onAudioStateChange) onAudioStateChange(false);
          // If browser blocked speech synthesis due to lack of user gesture
          if (e.error === 'not-allowed' || e.error === 'network') {
            setNeedsUserGesture(true);
          }
        };

        synth.speak(utter);
      } catch (err) {
        console.error('Speech synthesis initiation failed:', err);
        setNeedsUserGesture(true);
      }
    }, 60);
  }, [audioText, gender, onAudioStateChange, voices]);

  // Handle Play/Pause toggle
  const handlePlayToggle = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const synth = window.speechSynthesis;

    if (isPlaying) {
      synth.cancel();
      setIsPlaying(false);
      if (onAudioStateChange) onAudioStateChange(false);
      return;
    }

    setNeedsUserGesture(false);
    startSpeech();
  };

  const handleReplay = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setNeedsUserGesture(false);
    setTimeout(() => {
      startSpeech();
    }, 120);
  };

  // Automatic playback when audioText changes or on autoPlay trigger
  useEffect(() => {
    if (!autoPlay || typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (autoPlayFiredRef.current === audioText) return;
    autoPlayFiredRef.current = audioText;

    const timer = setTimeout(() => {
      startSpeech();
    }, 350);

    return () => {
      clearTimeout(timer);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [audioText, autoPlay, startSpeech]);

  return (
    <div className="glass-card glass-glossy backdrop-blur-2xl p-4 sm:p-5 rounded-2xl border-2 border-amber-500/35 bg-gradient-to-r from-amber-500/10 via-card/75 to-orange-500/10 dark:from-amber-500/15 dark:via-slate-900/60 dark:to-orange-500/15 shadow-xl shadow-amber-500/5 space-y-3 font-sans transition-all relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Browser Autoplay Prompt (if gesture required) */}
      {needsUserGesture && (
        <div
          onClick={handlePlayToggle}
          className="p-2.5 rounded-xl border border-amber-400 bg-amber-500/20 text-amber-900 dark:text-amber-100 text-xs font-bold flex items-center justify-between gap-3 cursor-pointer hover:bg-amber-500/30 transition-all focus-beacon-amber"
        >
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-amber-600 animate-pulse" />
            <span>Click here to enable mentor voice auto-narration 🔊</span>
          </div>
          <Badge className="bg-amber-600 text-white text-[10px]">Tap to Play</Badge>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
        {/* Mentor Identity */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className={`w-12 h-12 rounded-2xl ${avatarBg} flex items-center justify-center font-black text-sm shrink-0 shadow-md ring-2 ring-amber-500/40`}>
              {avatarInitials}
            </div>
            {isPlaying && (
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 ring-2 ring-background" />
              </span>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-extrabold text-sm sm:text-base text-foreground tracking-tight">{mentorName}</span>
              <Badge variant="outline" className="text-[10px] bg-amber-500/15 border-amber-400/50 text-amber-900 dark:text-amber-200 font-bold py-0.5">
                {mentorRole}
              </Badge>
              <Badge variant="secondary" className="text-[10px] font-mono font-medium">
                {gender === 'female' ? 'Female Voice' : 'Male Voice'}
              </Badge>
            </div>
            <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5 flex items-center gap-1.5">
              <span>{accentNote}</span>
              <span className="text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                Auto-Narrating Active
              </span>
            </p>
          </div>
        </div>

        {/* Audio Equalizer & Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {isPlaying && (
            <div className="flex items-center gap-1 h-8 px-3 glass-pill bg-amber-500/20 border border-amber-500/40 rounded-xl text-amber-800 dark:text-amber-200 text-xs font-mono font-bold shadow-xs">
              <span className="w-1 h-3.5 bg-amber-500 rounded-full animate-bounce [animation-delay:0.1s]" />
              <span className="w-1 h-5 bg-amber-600 rounded-full animate-bounce [animation-delay:0.25s]" />
              <span className="w-1 h-2.5 bg-amber-500 rounded-full animate-bounce [animation-delay:0.4s]" />
              <span className="w-1 h-4 bg-amber-600 rounded-full animate-bounce [animation-delay:0.15s]" />
              <span className="ml-1 text-[11px]">Speaking...</span>
            </div>
          )}

          <Button
            size="sm"
            onClick={handlePlayToggle}
            className={`h-9 px-4 text-xs font-bold gap-2 rounded-xl transition-all cursor-pointer shadow-sm ${
              isPlaying
                ? 'bg-amber-600 hover:bg-amber-700 text-white ring-2 ring-amber-500/40'
                : 'bg-primary hover:bg-primary/90 text-white shadow-primary/20'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Play Voice</span>
              </>
            )}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleReplay}
            className="h-9 px-2.5 text-xs border-amber-400/40 text-amber-800 dark:text-amber-200 hover:bg-amber-500/10 cursor-pointer rounded-xl glass-pill"
            title="Replay Voice Note"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowTranscript(!showTranscript)}
            className="h-9 px-2.5 text-xs text-muted-foreground hover:text-foreground cursor-pointer rounded-xl"
            title="Toggle Transcript Text"
          >
            <MessageSquare className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Summary Prompt Line */}
      {displaySummary && (
        <p className="text-xs sm:text-sm text-foreground/90 font-medium italic border-l-3 border-amber-500 pl-3 py-1 bg-amber-500/10 rounded-r-lg">
          "{displaySummary}"
        </p>
      )}

      {/* Expandable Transcript */}
      {showTranscript && (
        <div className="p-4 rounded-xl border bg-card/90 space-y-2 text-xs sm:text-sm text-muted-foreground leading-relaxed animate-fade-in shadow-xs font-sans">
          <div className="flex items-center justify-between text-xs font-bold text-foreground">
            <span>Voice Note Transcript:</span>
            <span className="text-[11px] text-muted-foreground font-normal">Narrated by {mentorName}</span>
          </div>
          <p className="text-foreground/90">{audioText}</p>
        </div>
      )}
    </div>
  );
}
