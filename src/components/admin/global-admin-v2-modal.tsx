'use client';

import React, { useState } from 'react';
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
  BookOpen,
  FileText,
  Cpu,
  Sliders,
  Eye,
} from 'lucide-react';
import {
  useGlobalStyleStore,
  FontFamilyChoice,
  FontSizeScaleChoice,
  AccentColorChoice,
  AnimationChoice,
  DefaultThemeChoice,
  VisualsFontSizeChoice,
  TechBoxTitleSizeChoice,
  StoryFontSizeChoice,
  HeadingFontSizeChoice,
  LineHeightChoice,
} from '@/store/global-style-store';
import { useToast } from '@/components/ui/toast-provider';

interface GlobalAdminV2ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AdminTab = 'story' | 'techbox' | 'visuals' | 'global' | 'theme';

export function GlobalAdminV2Modal({ isOpen, onClose }: GlobalAdminV2ModalProps) {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<AdminTab>('story');
  const [applyingNotice, setApplyingNotice] = useState<string | null>(null);

  const {
    fontFamily,
    fontSizeScale,
    accentColor,
    animationStyle,
    defaultTheme,
    globalAudioAutoplay,
    visualsFontFamily,
    visualsFontSize,
    techBoxFontFamily,
    techBoxTitleSize,
    techBoxBodySize,
    storyFontFamily,
    storyFontSize,
    storyLineHeight,
    headingFontFamily,
    headingFontSize,
    setFontFamily,
    setFontSizeScale,
    setAccentColor,
    setAnimationStyle,
    setDefaultTheme,
    setGlobalAudioAutoplay,
    setVisualsFontFamily,
    setVisualsFontSize,
    setTechBoxFontFamily,
    setTechBoxTitleSize,
    setTechBoxBodySize,
    setStoryFontFamily,
    setStoryFontSize,
    setStoryLineHeight,
    setHeadingFontFamily,
    setHeadingFontSize,
    resetToDefaults,
  } = useGlobalStyleStore();

  const handleSelectVisualFont = (f: { id: FontFamilyChoice; name: string }) => {
    setApplyingNotice(`Applying ${f.name} to course visuals...`);
    setVisualsFontFamily(f.id);
    setTimeout(() => {
      setApplyingNotice(null);
      showToast({
        type: 'success',
        title: 'Visual Typography Applied ⚡',
        description: `Course visual diagrams successfully updated to ${f.name}.`,
      });
    }, 400);
  };

  const handleSelectVisualSize = (vs: { id: VisualsFontSizeChoice; label: string }) => {
    setApplyingNotice(`Resizing diagram text to ${vs.label}...`);
    setVisualsFontSize(vs.id);
    setTimeout(() => {
      setApplyingNotice(null);
      showToast({
        type: 'info',
        title: 'Diagram Size Applied',
        description: `Diagram nodes resized to ${vs.label}.`,
      });
    }, 350);
  };

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

  const storySizeOptions: { id: StoryFontSizeChoice; label: string; desc: string }[] = [
    { id: 'sm', label: 'Small', desc: '14px (0.875rem)' },
    { id: 'base', label: 'Standard', desc: '16px (1.0rem)' },
    { id: 'lg', label: 'Comfortable', desc: '18px (1.125rem)' },
    { id: 'xl', label: 'Large', desc: '20px (1.25rem)' },
    { id: '2xl', label: 'High Vis', desc: '22.4px (1.4rem)' },
  ];

  const storyLineHeightOptions: { id: LineHeightChoice; label: string; ratio: string }[] = [
    { id: 'normal', label: 'Compact', ratio: '1.5 line height' },
    { id: 'relaxed', label: 'Balanced', ratio: '1.75 line height' },
    { id: 'loose', label: 'Spacious', ratio: '2.0 line height' },
  ];

  const headingSizeOptions: { id: HeadingFontSizeChoice; label: string; desc: string }[] = [
    { id: 'xl', label: 'Compact (XL)', desc: '1.35rem' },
    { id: '2xl', label: 'Standard (2XL)', desc: '1.65rem' },
    { id: '3xl', label: 'Prominent (3XL)', desc: '2.0rem' },
    { id: '4xl', label: 'Massive (4XL)', desc: '2.45rem' },
  ];

  const techBoxTitleSizeOptions: { id: TechBoxTitleSizeChoice; label: string; desc: string }[] = [
    { id: 'xs', label: 'Mini (XS)', desc: '0.72rem' },
    { id: 'sm', label: 'Small (SM)', desc: '0.80rem' },
    { id: 'base', label: 'Standard (MD)', desc: '0.875rem' },
    { id: 'lg', label: 'Large (LG)', desc: '1.0rem' },
    { id: 'xl', label: 'Extra Large (XL)', desc: '1.15rem' },
  ];

  const techBoxBodySizeOptions: { id: 'xs' | 'sm' | 'base'; label: string; desc: string }[] = [
    { id: 'xs', label: 'Compact (XS)', desc: '0.75rem' },
    { id: 'sm', label: 'Standard (SM)', desc: '0.825rem' },
    { id: 'base', label: 'Large (Base)', desc: '0.90rem' },
  ];

  const visualsSizeOptions: { id: VisualsFontSizeChoice; label: string; desc: string }[] = [
    { id: 'xs', label: 'Compact (XS)', desc: '0.72rem' },
    { id: 'sm', label: 'Standard (SM)', desc: '0.80rem' },
    { id: 'base', label: 'Medium (Base)', desc: '0.90rem' },
    { id: 'lg', label: 'Large (LG)', desc: '1.0rem' },
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
      description: 'Global formatting, colors, typography and animations restored to defaults.',
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl w-[96vw] max-h-[90vh] flex flex-col p-0 rounded-2xl bg-card border-2 border-primary/30 shadow-2xl overflow-hidden focus:outline-none z-[70]">
        {/* Pinned Header */}
        <div className="p-5 border-b border-border/70 shrink-0 bg-card/95 backdrop-blur-md space-y-2">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge className="bg-primary/20 text-primary border-primary/30 text-[10px] font-mono font-bold uppercase tracking-wider">
                  Admin Console
                </Badge>
                <Badge variant="outline" className="text-[10px] font-mono">
                  Full Course Typography &amp; Theme Engine
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
              Course Typography &amp; Appearance Console
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Configure dedicated fonts and sizes for Story Everywhere, Tech Boxes, Visual Diagrams, and Platform Theme across all 90 chapters.
            </DialogDescription>
            {applyingNotice && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sky-500/15 border border-sky-500/30 text-sky-700 dark:text-sky-300 text-xs font-semibold animate-pulse">
                <RotateCcw className="w-3.5 h-3.5 animate-spin text-sky-500" />
                <span>{applyingNotice}</span>
              </div>
            )}
          </DialogHeader>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1.5 pt-2 border-t border-border/60 overflow-x-auto no-scrollbar">
            <button
              type="button"
              onClick={() => setActiveTab('story')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'story'
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Story &amp; Headings Everywhere</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('techbox')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'techbox'
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Tech Boxes Typography</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('visuals')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'visuals'
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>Visuals &amp; Diagrams Typography</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('global')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'global'
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Global Base &amp; Scale</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('theme')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'theme'
                  ? 'bg-primary text-primary-foreground shadow-xs'
                  : 'bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Theme &amp; Animations</span>
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
          {/* =========================================================================
              TAB 1: STORY & HEADINGS EVERYWHERE
             ========================================================================= */}
          {activeTab === 'story' && (
            <div className="space-y-6 animate-fade-in">
              {/* Story Body Font Family */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-bold text-foreground flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" />
                    Story Explanation Font Family (Applied Everywhere in Text)
                  </Label>
                  <Badge variant="outline" className="text-[10px] font-mono">
                    Active: {storyFontFamily || 'sans'}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {fontOptions.map((f) => (
                    <div
                      key={f.id}
                      onClick={() => setStoryFontFamily(f.id)}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                        (storyFontFamily || 'sans') === f.id
                          ? 'border-primary bg-primary/10 shadow-xs ring-1 ring-primary'
                          : 'border-border/80 bg-muted/20 hover:bg-muted/40 hover:border-primary/40'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-foreground">{f.name.split(' (')[0]}</span>
                        {(storyFontFamily || 'sans') === f.id && <Check className="w-4 h-4 text-primary" />}
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">{f.desc}</p>
                      <div className={`mt-2 p-1.5 rounded-lg bg-background/80 border border-border/60 text-xs font-semibold text-primary truncate ${f.fontClass || ''}`}>
                        {f.preview}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Story Body Font Size & Line Height */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-border/70">
                <div className="space-y-2">
                  <Label className="text-xs font-semibold text-foreground">
                    Story Body Font Size (Paragraph Text in All Chapters)
                  </Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {storySizeOptions.map((s) => (
                      <Button
                        key={s.id}
                        type="button"
                        variant={(storyFontSize || 'base') === s.id ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setStoryFontSize(s.id)}
                        className="text-xs h-8 flex flex-col items-center justify-center py-1"
                      >
                        <span className="font-bold">{s.label}</span>
                        <span className="text-[9px] opacity-75">{s.desc}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-semibold text-foreground">
                    Story Line Spacing (Paragraph Line Height)
                  </Label>
                  <div className="grid grid-cols-3 gap-2">
                    {storyLineHeightOptions.map((lh) => (
                      <Button
                        key={lh.id}
                        type="button"
                        variant={(storyLineHeight || 'relaxed') === lh.id ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setStoryLineHeight(lh.id)}
                        className="text-xs h-8 flex flex-col items-center justify-center py-1"
                      >
                        <span className="font-bold">{lh.label}</span>
                        <span className="text-[9px] opacity-75">{lh.ratio}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pillar Heading Font Family & Size */}
              <div className="space-y-3 pt-4 border-t border-border/70">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-bold text-foreground flex items-center gap-2">
                    <Type className="w-4 h-4 text-primary" />
                    Pillar Headings &amp; Titles Typography
                  </Label>
                  <Badge variant="outline" className="text-[10px] font-mono">
                    Active: {headingFontFamily || 'sans'}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {fontOptions.map((f) => (
                    <div
                      key={f.id}
                      onClick={() => setHeadingFontFamily(f.id)}
                      className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                        (headingFontFamily || 'sans') === f.id
                          ? 'border-primary bg-primary/10 shadow-xs ring-1 ring-primary'
                          : 'border-border/80 bg-muted/20 hover:bg-muted/40 hover:border-primary/40'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-foreground">{f.name.split(' (')[0]}</span>
                        {(headingFontFamily || 'sans') === f.id && <Check className="w-3.5 h-3.5 text-primary" />}
                      </div>
                      <div className={`mt-1.5 p-1 rounded bg-background/80 border border-border/60 text-xs font-bold text-foreground truncate ${f.fontClass || ''}`}>
                        {f.preview}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <Label className="text-xs font-semibold text-foreground">Pillar Heading Font Size</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-1.5">
                    {headingSizeOptions.map((h) => (
                      <Button
                        key={h.id}
                        type="button"
                        variant={(headingFontSize || '2xl') === h.id ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setHeadingFontSize(h.id)}
                        className="text-xs h-8"
                      >
                        <span>{h.label} ({h.desc})</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Live Story Preview Card */}
              <div className="p-4 rounded-xl border border-primary/30 bg-muted/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-muted-foreground font-bold flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-primary" />
                    Live Story Preview Across All Course Chapters
                  </span>
                  <Badge variant="outline" className="text-[10px] font-mono text-primary">
                    Instant Live CSS Variable Sync
                  </Badge>
                </div>
                <h3 className="pillar-heading font-extrabold text-foreground">
                  The Four Pillars of the Modern SOC Machine
                </h3>
                <div className="story-text text-muted-foreground space-y-2">
                  <p>
                    Every security operations center operates on four foundational pillars: People who analyze events, Processes that define triage playbooks, Technology platforms that capture telemetry, and Security Data containing observable forensic evidence.
                  </p>
                  <p>
                    Disciplined analysts observe facts directly from event logs rather than making speculative assumptions, maintaining evidence integrity across all case investigations.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB 2: TECH BOXES TYPOGRAPHY
             ========================================================================= */}
          {activeTab === 'techbox' && (
            <div className="space-y-6 animate-fade-in">
              {/* Tech Box Font Family */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-bold text-foreground flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-primary" />
                    Tech Box Typeface (Headers &amp; Deep-Dive Technical Content)
                  </Label>
                  <Badge variant="outline" className="text-[10px] font-mono">
                    Active: {techBoxFontFamily || 'mono'}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {fontOptions.map((f) => (
                    <div
                      key={f.id}
                      onClick={() => setTechBoxFontFamily(f.id)}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                        (techBoxFontFamily || 'mono') === f.id
                          ? 'border-primary bg-primary/10 shadow-xs ring-1 ring-primary'
                          : 'border-border/80 bg-muted/20 hover:bg-muted/40 hover:border-primary/40'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-foreground">{f.name.split(' (')[0]}</span>
                        {(techBoxFontFamily || 'mono') === f.id && <Check className="w-4 h-4 text-primary" />}
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">{f.desc}</p>
                      <div className={`mt-2 p-1.5 rounded-lg bg-background/80 border border-border/60 text-xs font-semibold text-primary truncate ${f.fontClass || ''}`}>
                        {f.preview}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Box Title Size & Body Size */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-border/70">
                <div className="space-y-2">
                  <Label className="text-xs font-semibold text-foreground">
                    Tech Box Header Name Text Size
                  </Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {techBoxTitleSizeOptions.map((ts) => (
                      <Button
                        key={ts.id}
                        type="button"
                        variant={(techBoxTitleSize || 'sm') === ts.id ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setTechBoxTitleSize(ts.id)}
                        className="text-xs h-8 flex flex-col items-center justify-center py-1"
                      >
                        <span className="font-bold">{ts.label}</span>
                        <span className="text-[9px] opacity-75">{ts.desc}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-semibold text-foreground">
                    Tech Box Body Content Text Size
                  </Label>
                  <div className="grid grid-cols-3 gap-2">
                    {techBoxBodySizeOptions.map((bs) => (
                      <Button
                        key={bs.id}
                        type="button"
                        variant={(techBoxBodySize || 'xs') === bs.id ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setTechBoxBodySize(bs.id)}
                        className="text-xs h-8 flex flex-col items-center justify-center py-1"
                      >
                        <span className="font-bold">{bs.label}</span>
                        <span className="text-[9px] opacity-75">{bs.desc}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Live Tech Box Preview Card */}
              <div className="rounded-xl border border-sky-300/60 dark:border-sky-500/30 bg-sky-50/70 dark:bg-[#081329] p-4 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-sky-700 dark:text-sky-300 font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                    Live Tech Box Preview (Collapsible Accordion Style)
                  </span>
                  <Badge variant="outline" className="text-[10px] font-mono text-sky-600 dark:text-sky-400">
                    Live Dynamic Styling
                  </Badge>
                </div>

                <div className="flex items-center gap-2">
                  <span className="tech-box-title font-bold text-sky-800 dark:text-sky-300 font-mono">
                    TECH BOX: Working Duplicates &amp; Evidence Integrity [Details] ▲
                  </span>
                </div>

                <div className="tech-box-content pt-2 border-t border-sky-200 dark:border-slate-800 space-y-2 text-slate-700 dark:text-slate-300">
                  <div>
                    <strong className="text-sky-700 dark:text-sky-400 font-mono">Everyday Analogy: </strong>
                    <span>Like examining an ancient manuscript scroll: the original stays in a secure climate vault while researchers work on high-resolution photographs.</span>
                  </div>
                  <div>
                    <strong className="text-amber-700 dark:text-amber-400 font-mono">Technical Definition: </strong>
                    <span>Working Copy (ISO/IEC 27037) is an exact bit-stream duplicate of digital evidence used for analysis to ensure the master source remains permanently pristine.</span>
                  </div>
                  <div>
                    <strong className="text-emerald-700 dark:text-emerald-400 font-mono">Why It Matters in SOC: </strong>
                    <span>Allows analysts to execute aggressive grep filters, regex parsing, and extraction scripts without risking accidental modification of legal evidence.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB 3: VISUALS & DIAGRAMS TYPOGRAPHY
             ========================================================================= */}
          {activeTab === 'visuals' && (
            <div className="space-y-6 animate-fade-in">
              {/* Visuals Font Family */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-bold text-foreground flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-primary" />
                    Visual Stories &amp; Diagram HUD Typography
                  </Label>
                  <Badge variant="outline" className="text-[10px] font-mono">
                    Active: {visualsFontFamily || 'sans'}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {fontOptions.map((f) => (
                    <div
                      key={f.id}
                      onClick={() => handleSelectVisualFont(f)}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                        (visualsFontFamily || 'sans') === f.id
                          ? 'border-primary bg-primary/10 shadow-xs ring-1 ring-primary'
                          : 'border-border/80 bg-muted/20 hover:bg-muted/40 hover:border-primary/40'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-foreground">{f.name.split(' (')[0]}</span>
                        {(visualsFontFamily || 'sans') === f.id && <Check className="w-4 h-4 text-primary" />}
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">{f.desc}</p>
                      <div className={`mt-2 p-1.5 rounded-lg bg-background/80 border border-border/60 text-xs font-semibold text-primary truncate ${f.fontClass || ''}`}>
                        {f.preview}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visuals Font Size */}
              <div className="space-y-2 pt-2 border-t border-border/70">
                <Label className="text-xs font-semibold text-foreground">
                  Visuals &amp; Diagram Node Text Size
                </Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {visualsSizeOptions.map((vs) => (
                    <Button
                      key={vs.id}
                      type="button"
                      variant={(visualsFontSize || 'sm') === vs.id ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleSelectVisualSize(vs)}
                      className="text-xs h-8 flex flex-col items-center justify-center py-1 cursor-pointer"
                    >
                      <span className="font-bold">{vs.label}</span>
                      <span className="text-[9px] opacity-75">{vs.desc}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Live Visuals Telemetry Preview Card */}
              <div className="p-4 rounded-xl border border-sky-400/40 bg-slate-950 text-white space-y-3 font-mono">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-[10px] uppercase text-sky-400 font-bold flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-sky-400" />
                    Interactive Graphic Telemetry Simulation
                  </span>
                  <Badge className="bg-sky-500/20 text-sky-300 border-sky-500/40 text-[9px]">
                    REAL-TIME HUD
                  </Badge>
                </div>

                <div className="visual-engine-text grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-xs text-sky-300 font-bold block">1. INGEST PIPELINE</span>
                    <span className="text-[11px] text-slate-400 block">syslog-ng / Winlogbeat</span>
                    <span className="text-[10px] text-emerald-400">STATUS: STREAMING (2,450 eps)</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-xs text-amber-300 font-bold block">2. CORRELATION ENGINE</span>
                    <span className="text-[11px] text-slate-400 block">Sigma / Splunk SPL Rules</span>
                    <span className="text-[10px] text-amber-400">ALERT: BR-AUTH-BRUTEFORCE</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                    <span className="text-xs text-purple-300 font-bold block">3. CONTAINMENT HOST</span>
                    <span className="text-[11px] text-slate-400 block">BLR-BR-WS-04 (10.10.20.15)</span>
                    <span className="text-[10px] text-sky-400">ACTION: QUARANTINE READY</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              TAB 4: GLOBAL BASE & SCALING
             ========================================================================= */}
          {activeTab === 'global' && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-bold text-foreground flex items-center gap-2">
                    <Type className="w-4 h-4 text-primary" />
                    Global Platform Base Typeface (Fallback Default)
                  </Label>
                  <span className="text-xs text-muted-foreground font-mono">Platform-Wide Base</span>
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
                <div className="pt-3 border-t border-border/70">
                  <Label className="text-xs font-semibold text-foreground">Global Display Scale (Whole App Scaling)</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-1.5">
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
            </div>
          )}

          {/* =========================================================================
              TAB 5: THEME, COLORS & ANIMATIONS
             ========================================================================= */}
          {activeTab === 'theme' && (
            <div className="space-y-6 animate-fade-in">
              {/* Theme Selector */}
              <div className="space-y-3">
                <Label className="text-sm font-bold text-foreground flex items-center gap-2">
                  <SunMoon className="w-4 h-4 text-primary" />
                  Default Platform Theme Mode
                </Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {themeOptions.map((t) => (
                    <div
                      key={t.id}
                      onClick={() => handleApplyTheme(t.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
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

              {/* Accent Color Selector */}
              <div className="space-y-3 pt-4 border-t border-border/70">
                <Label className="text-sm font-bold text-foreground flex items-center gap-2">
                  <Palette className="w-4 h-4 text-primary" />
                  Global Brand &amp; Accent Palette
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

              {/* Page to Page Animations */}
              <div className="space-y-3 pt-4 border-t border-border/70">
                <Label className="text-sm font-bold text-foreground flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" />
                  Page-to-Page &amp; Stage Animation Transitions
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

              {/* Audio Autoplay Preference */}
              <div className="pt-4 border-t border-border/70 flex items-center justify-between p-3.5 rounded-xl bg-muted/30 border">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                    <Volume2 className="w-4 h-4 text-primary" />
                    Global Mentor Audio Autoplay
                  </span>
                  <p className="text-[11px] text-muted-foreground">
                    Automatically play mentor scenario briefings upon chapter entry.
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
          )}
        </div>

        {/* Pinned Footer */}
        <div className="p-4 border-t border-border/70 bg-card/95 backdrop-blur-md flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            All typography &amp; sizing changes persist in local storage and apply immediately.
          </span>
          <Button
            type="button"
            onClick={onClose}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs h-8 px-5 rounded-xl cursor-pointer"
          >
            Done &amp; Apply
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
