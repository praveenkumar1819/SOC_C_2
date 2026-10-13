'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Type,
  Palette,
  Sparkles,
  SunMoon,
  Volume2,
  RotateCcw,
  Check,
  Zap,
} from 'lucide-react';
import {
  useGlobalStyleStore,
  FontFamilyChoice,
  FontSizeScaleChoice,
  AccentColorChoice,
  AnimationChoice,
  DefaultThemeChoice,
} from '@/store/global-style-store';
import { useToast } from '@/components/ui/toast-provider';

interface GlobalAdminV2ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlobalAdminV2Modal({ isOpen, onClose }: GlobalAdminV2ModalProps) {
  const { showToast } = useToast();
  const {
    fontFamily,
    fontSizeScale,
    accentColor,
    animationStyle,
    defaultTheme,
    globalAudioAutoplay,
    setFontFamily,
    setFontSizeScale,
    setAccentColor,
    setAnimationStyle,
    setDefaultTheme,
    setGlobalAudioAutoplay,
    resetToDefaults,
  } = useGlobalStyleStore();

  const fontOptions: { id: FontFamilyChoice; name: string; desc: string; preview: string; fontClass?: string }[] = [
    { id: 'sans', name: 'Modern Sans (Inter / Geist)', desc: 'Clean, highly readable technical typeface', preview: 'SOC Analyst L1 Telemetry Triage', fontClass: 'font-sans' },
    { id: 'mono', name: 'Cyber Mono (JetBrains Mono)', desc: 'Terminal-optimized developer aesthetic', preview: '0x7FFD EVTX Log Parsing --filter', fontClass: 'font-mono' },
    { id: 'cyber', name: 'Cyber Futuristic (Space / Orbitron)', desc: 'High-tech military defense styling', preview: 'DEFCON 3: INCIDENT ACTIVE', fontClass: '' },
    { id: 'serif', name: 'Editorial Serif (Merriweather)', desc: 'Formal academic publication styling', preview: 'Principles of Threat Hunting', fontClass: 'font-serif' },
    { id: 'poppins', name: 'Poppins', desc: 'Modern geometric sans-serif with balanced readability', preview: 'SOC Defense Network Telemetry', fontClass: 'font-poppins' },
    { id: 'samsung', name: 'Samsung Sans (OneUI)', desc: 'Clean, polished corporate sans-serif', preview: 'Security Operations Center Workflow', fontClass: 'font-samsung' },
    { id: 'beebeez', name: 'Beebeez (Bebas Neue)', desc: 'High-impact display all-caps condensed headline typeface', preview: 'THREAT DETECTED: ISOLATE ENDPOINT', fontClass: 'font-beebeez' },
    { id: 'striker', name: 'Victory Striker Sans', desc: 'Bold athletic tactical condensed display typography', preview: 'DEFCON 1 BREACH CONTAINMENT', fontClass: 'font-striker' },
    { id: 'spartan', name: 'League Spartan', desc: 'Strong modern geometric typeface with assertive presence', preview: 'Incident Response & Digital Forensics', fontClass: 'font-spartan' },
  ];

  const scaleOptions: { id: FontSizeScaleChoice; label: string; pct: string }[] = [
    { id: 'sm', label: 'Compact', pct: '94%' },
    { id: 'md', label: 'Standard', pct: '100%' },
    { id: 'lg', label: 'Comfortable', pct: '106%' },
    { id: 'xl', label: 'Large (High Vis)', pct: '112%' },
  ];

  const colorOptions: { id: AccentColorChoice; name: string; hex: string; bgClass: string }[] = [
    { id: 'blue', name: 'Cyber Blue', hex: '#3b82f6', bgClass: 'bg-blue-500' },
    { id: 'cyan', name: 'Neon Cyan', hex: '#06b6d4', bgClass: 'bg-cyan-500' },
    { id: 'emerald', name: 'Defense Emerald', hex: '#10b981', bgClass: 'bg-emerald-500' },
    { id: 'purple', name: 'Deep Purple', hex: '#8b5cf6', bgClass: 'bg-purple-500' },
    { id: 'amber', name: 'Tactical Amber', hex: '#f59e0b', bgClass: 'bg-amber-500' },
    { id: 'rose', name: 'Critical Crimson', hex: '#f43f5e', bgClass: 'bg-rose-500' },
  ];

  const animationOptions: { id: AnimationChoice; name: string; desc: string }[] = [
    { id: 'smooth', name: 'Smooth Ease', desc: 'Standard fluid spring transitions between sections' },
    { id: 'cyber', name: 'Cyber Glitch', desc: 'High-speed snappy transitions with contrast pulse' },
    { id: 'slide', name: 'Slide & Fade', desc: 'Elevated vertical slide page transition' },
    { id: 'minimal', name: 'Minimal / Reduced', desc: 'Instantaneous transitions without motion blur' },
  ];

  const themeOptions: { id: DefaultThemeChoice; name: string; desc: string }[] = [
    { id: 'dark', name: 'Dark Cyber Slate', desc: 'Default high-contrast SOC console dark mode' },
    { id: 'midnight', name: 'Midnight OLED', desc: 'Deep true black background with neon highlights' },
    { id: 'light', name: 'Studio Light', desc: 'Crisp light mode for daytime documentation' },
    { id: 'system', name: 'System Auto', desc: 'Matches operating system preference automatically' },
  ];

  const handleApplyTheme = (th: DefaultThemeChoice) => {
    setDefaultTheme(th);
    if (th === 'dark' || th === 'midnight') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else if (th === 'light') {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', prefersDark);
      localStorage.removeItem('theme');
    }
  };

  const handleReset = () => {
    resetToDefaults();
    document.documentElement.classList.add('dark');
    showToast({
      type: 'info',
      title: 'Console Reset ↺',
      description: 'Global formatting, colors, and animations restored to defaults.',
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl w-[95vw] max-h-[88vh] flex flex-col p-0 rounded-2xl bg-card border-2 border-primary/30 shadow-2xl overflow-hidden focus:outline-none">
        {/* Pinned Header */}
        <div className="p-5 border-b border-border/70 shrink-0 bg-card/95 backdrop-blur-md space-y-1.5">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge className="bg-primary/20 text-primary border-primary/30 text-[10px] font-mono font-bold uppercase tracking-wider">
                  Admin Console
                </Badge>
                <Badge variant="outline" className="text-[10px] font-mono">
                  Global V2 Engine
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="h-7 text-xs text-muted-foreground hover:text-foreground gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Defaults</span>
              </Button>
            </div>
            <DialogTitle className="text-xl font-bold text-foreground flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Global Admin V2 Formatting & Theme Console
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Configure typography, accent palette, page animation styles, and default themes applied across all modules.
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
          {/* 1. Global Font Formatting Console */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-bold text-foreground flex items-center gap-2">
                <Type className="w-4 h-4 text-primary" />
                Global Font Family Console
              </Label>
              <span className="text-xs text-muted-foreground font-mono">Instant Live Preview</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {fontOptions.map((f) => (
                <div
                  key={f.id}
                  onClick={() => setFontFamily(f.id)}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                    fontFamily === f.id
                      ? 'border-primary bg-primary/10 shadow-xs ring-1 ring-primary'
                      : 'border-border/80 bg-muted/20 hover:bg-muted/40 hover:border-primary/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-foreground">{f.name}</span>
                    {fontFamily === f.id && <Check className="w-4 h-4 text-primary" />}
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{f.desc}</p>
                  <div className={`mt-2 p-1.5 rounded-lg bg-background/80 border border-border/60 text-xs font-semibold text-primary truncate ${f.fontClass || ''}`}>
                    {f.preview}
                  </div>
                </div>
              ))}
            </div>

            {/* Font Scale Selector */}
            <div className="pt-2">
              <Label className="text-xs font-semibold text-muted-foreground">Global Base Scale</Label>
              <div className="grid grid-cols-4 gap-2 mt-1.5">
                {scaleOptions.map((s) => (
                  <Button
                    key={s.id}
                    type="button"
                    variant={fontSizeScale === s.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFontSizeScale(s.id)}
                    className="text-xs h-8"
                  >
                    <span>{s.label} ({s.pct})</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* 2. Global Accent Colours */}
          <div className="space-y-3 pt-4 border-t border-border/70">
            <Label className="text-sm font-bold text-foreground flex items-center gap-2">
              <Palette className="w-4 h-4 text-primary" />
              Global Brand & Accent Palette
            </Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {colorOptions.map((c) => (
                <div
                  key={c.id}
                  onClick={() => setAccentColor(c.id)}
                  className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                    accentColor === c.id
                      ? 'border-primary bg-primary/10 shadow-xs ring-1 ring-primary'
                      : 'border-border/80 bg-muted/20 hover:bg-muted/40 hover:border-primary/40'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full ${c.bgClass} shadow-xs shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <span className="font-bold text-xs text-foreground block truncate">{c.name}</span>
                    <span className="text-[10px] text-muted-foreground font-mono">{c.hex}</span>
                  </div>
                  {accentColor === c.id && <Check className="w-3.5 h-3.5 text-primary shrink-0" />}
                </div>
              ))}
            </div>
          </div>

          {/* 3. Page to Page Animations */}
          <div className="space-y-3 pt-4 border-t border-border/70">
            <Label className="text-sm font-bold text-foreground flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              Page-to-Page & Stage Animation Transitions
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {animationOptions.map((a) => (
                <div
                  key={a.id}
                  onClick={() => setAnimationStyle(a.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    animationStyle === a.id
                      ? 'border-primary bg-primary/10 shadow-xs ring-1 ring-primary'
                      : 'border-border/80 bg-muted/20 hover:bg-muted/40 hover:border-primary/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-foreground">{a.name}</span>
                    {animationStyle === a.id && <Check className="w-4 h-4 text-primary" />}
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{a.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Default Theme */}
          <div className="space-y-3 pt-4 border-t border-border/70">
            <Label className="text-sm font-bold text-foreground flex items-center gap-2">
              <SunMoon className="w-4 h-4 text-primary" />
              Default Platform Theme
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {themeOptions.map((t) => (
                <div
                  key={t.id}
                  onClick={() => handleApplyTheme(t.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    defaultTheme === t.id
                      ? 'border-primary bg-primary/10 shadow-xs ring-1 ring-primary'
                      : 'border-border/80 bg-muted/20 hover:bg-muted/40 hover:border-primary/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-foreground">{t.name}</span>
                    {defaultTheme === t.id && <Check className="w-4 h-4 text-primary" />}
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Audio Autoplay Preference */}
          <div className="pt-4 border-t border-border/70 flex items-center justify-between p-3.5 rounded-xl bg-muted/30 border">
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-primary" />
                Global Audio Autoplay
              </span>
              <p className="text-[11px] text-muted-foreground">
                Automatically begin mentor audio narration when entering new chapters.
              </p>
            </div>
            <Button
              type="button"
              variant={globalAudioAutoplay ? 'default' : 'outline'}
              size="sm"
              onClick={() => setGlobalAudioAutoplay(!globalAudioAutoplay)}
              className="text-xs h-8"
            >
              {globalAudioAutoplay ? 'Autoplay ON' : 'Autoplay OFF'}
            </Button>
          </div>
        </div>

        {/* Pinned Footer */}
        <div className="p-4 border-t border-border/70 bg-card/95 backdrop-blur-md flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Changes apply live immediately to all learners.
          </span>
          <Button
            type="button"
            onClick={onClose}
            className="bg-primary hover:bg-primary/90 text-white font-bold text-xs h-8 px-5 rounded-xl cursor-pointer"
          >
            Done & Apply
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
