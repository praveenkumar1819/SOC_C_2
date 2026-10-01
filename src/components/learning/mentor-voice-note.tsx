'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, RotateCcw, Sparkles, MessageSquare } from 'lucide-react';
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
  const [voicesLoaded, setVoicesLoaded] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const autoPlayFiredRef = useRef<string>('');

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSupported(false);
      return;
    }

    const updateVoices = () => {
      setVoicesLoaded(true);
    };

    window.speechSynthesis.onvoiceschanged = updateVoices;
    updateVoices();

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Voice playback logic
  const startSpeech = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const synth = window.speechSynthesis;

    synth.cancel();

    const utter = new SpeechSynthesisUtterance(audioText);
    utteranceRef.current = utter;

    const voices = synth.getVoices();
    let chosenVoice: SpeechSynthesisVoice | undefined;

    if (gender === 'female') {
      // Prioritize female voice with Indian English / natural tone
      chosenVoice =
        voices.find((v) => (v.lang === 'en-IN' || v.lang === 'en_IN') && /heera|veena|kalpana|geeta|priya|female|neerja/i.test(v.name)) ||
        voices.find((v) => (v.lang === 'en-IN' || v.lang === 'en_IN') && !/ravi|prabhat|male/i.test(v.name)) ||
        voices.find((v) => /heera|veena|zira|samantha|karen|victoria|female/i.test(v.name) && !/male|ravi|david|mark/i.test(v.name)) ||
        voices.find((v) => v.lang.startsWith('en') && /female|zira|samantha/i.test(v.name));
    } else {
      // Prioritize male voice with Indian English / natural tone
      chosenVoice =
        voices.find((v) => (v.lang === 'en-IN' || v.lang === 'en_IN') && /ravi|prabhat|male/i.test(v.name)) ||
        voices.find((v) => (v.lang === 'en-IN' || v.lang === 'en_IN') && !/heera|veena|kalpana|geeta|priya|female/i.test(v.name)) ||
        voices.find((v) => /ravi|david|mark|george|male/i.test(v.name) && !/female|heera|veena|zira/i.test(v.name)) ||
        voices.find((v) => v.lang.startsWith('en') && /male|david|mark/i.test(v.name));
    }

    if (!chosenVoice) {
      chosenVoice = voices.find((v) => v.lang.startsWith('en')) || voices[0];
    }

    if (chosenVoice) {
      utter.voice = chosenVoice;
    }

    // Calibrated natural pitch and speech rate for each gender
    utter.pitch = gender === 'female' ? 1.16 : 0.92;
    utter.rate = gender === 'female' ? 0.96 : 0.94;

    utter.onstart = () => {
      setIsPlaying(true);
      if (onAudioStateChange) onAudioStateChange(true);
    };

    utter.onend = () => {
      setIsPlaying(false);
      if (onAudioStateChange) onAudioStateChange(false);
    };

    utter.onerror = () => {
      setIsPlaying(false);
      if (onAudioStateChange) onAudioStateChange(false);
    };

    synth.speak(utter);
  };

  const handlePlayToggle = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const synth = window.speechSynthesis;

    if (isPlaying) {
      synth.cancel();
      setIsPlaying(false);
      if (onAudioStateChange) onAudioStateChange(false);
      return;
    }

    startSpeech();
  };

  const handleReplay = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setTimeout(() => {
      startSpeech();
    }, 150);
  };

  // Automatic playback when chapter changes or on autoPlay trigger
  useEffect(() => {
    if (!autoPlay || typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (autoPlayFiredRef.current === audioText) return;
    autoPlayFiredRef.current = audioText;

    const timer = setTimeout(() => {
      startSpeech();
    }, 400);

    return () => {
      clearTimeout(timer);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [audioText, autoPlay]);

  return (
    <div className="p-4 sm:p-5 rounded-2xl border-2 border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-amber-500/10 shadow-xs space-y-3 font-sans transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Mentor Identity */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className={`w-12 h-12 rounded-2xl ${avatarBg} flex items-center justify-center font-black text-sm shrink-0 shadow-xs ring-2 ring-amber-500/30`}>
              {avatarInitials}
            </div>
            {isPlaying && (
              <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-500" />
              </span>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-extrabold text-sm sm:text-base text-foreground">{mentorName}</span>
              <Badge variant="outline" className="text-[10px] bg-amber-500/10 border-amber-400/40 text-amber-900 dark:text-amber-200 font-bold py-0.5">
                {mentorRole}
              </Badge>
              <Badge variant="secondary" className="text-[10px] font-mono font-medium">
                {gender === 'female' ? 'Female Voice' : 'Male Voice'}
              </Badge>
            </div>
            <p className="text-[11px] sm:text-xs text-muted-foreground mt-0.5 flex items-center gap-1.5">
              <span>{accentNote}</span>
              <span className="text-amber-500 font-bold">• Auto-Narrating</span>
            </p>
          </div>
        </div>

        {/* Audio Equalizer & Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {isPlaying && (
            <div className="flex items-center gap-1 h-7 px-3 bg-amber-500/20 border border-amber-500/30 rounded-xl text-amber-700 dark:text-amber-300 text-xs font-mono font-bold">
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
            className={`h-9 px-4 text-xs font-bold gap-2 rounded-xl transition-all cursor-pointer shadow-xs ${
              isPlaying
                ? 'bg-amber-600 hover:bg-amber-700 text-white ring-2 ring-amber-500/30'
                : 'bg-primary hover:bg-primary/90 text-white'
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
            className="h-9 px-2.5 text-xs border-amber-400/40 text-amber-800 dark:text-amber-200 hover:bg-amber-500/10 cursor-pointer rounded-xl"
            title="Replay Voice Note"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowTranscript(!showTranscript)}
            className="h-9 px-2 text-xs text-muted-foreground hover:text-foreground cursor-pointer rounded-xl"
            title="Toggle Transcript Text"
          >
            <MessageSquare className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Summary Prompt Line */}
      {displaySummary && (
        <p className="text-xs sm:text-sm text-foreground/90 font-medium italic border-l-3 border-amber-500 pl-3 py-1 bg-amber-500/5 rounded-r-lg">
          "{displaySummary}"
        </p>
      )}

      {/* Expandable Transcript */}
      {showTranscript && (
        <div className="p-4 rounded-xl border bg-card/95 space-y-2 text-xs sm:text-sm text-muted-foreground leading-relaxed animate-fade-in shadow-2xs font-sans">
          <div className="flex items-center justify-between text-xs font-bold text-foreground">
            <span>Voice Note Transcript:</span>
            <span className="text-[11px] text-muted-foreground font-normal">Spoken by {mentorName}</span>
          </div>
          <p className="text-foreground/90">{audioText}</p>
        </div>
      )}
    </div>
  );
}
