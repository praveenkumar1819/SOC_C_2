'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/toast-provider';
import { V2ChapterNormalized, AnnotatedScreenshot, QuestionItem } from '@/data/curriculum-v2-data';
import {
  Sparkles,
  Save,
  Plus,
  Trash2,
  Image,
  BookOpen,
  Eye,
  Sliders,
  CheckCircle2,
  Volume2,
} from 'lucide-react';

interface AdminChapterEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  chapter: V2ChapterNormalized;
  onSaveSuccess: (updated: V2ChapterNormalized) => void;
}

export function AdminChapterEditorModal({
  isOpen,
  onClose,
  chapter,
  onSaveSuccess,
}: AdminChapterEditorModalProps) {
  const { showToast } = useToast();
  const [formData, setFormData] = useState<V2ChapterNormalized>(JSON.parse(JSON.stringify(chapter)));
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('theory');

  // Reset form when chapter changes
  React.useEffect(() => {
    setFormData(JSON.parse(JSON.stringify(chapter)));
  }, [chapter]);

  // Section 1 handlers
  const updateSection1 = (key: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      section1_theory: {
        ...prev.section1_theory,
        [key]: value,
      },
    }));
  };

  // Section 2 handlers (Visual & Screenshots)
  const updateSection2 = (key: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      section2_visual: {
        ...prev.section2_visual,
        [key]: value,
      },
    }));
  };

  const addScreenshot = () => {
    const newScreenshot: AnnotatedScreenshot = {
      id: `screen-${Date.now()}`,
      url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=60',
      title: 'Annotated Security Tool Screen',
      caption: 'Inspecting event telemetry fields in the management console.',
      whatToNotice: 'Notice the source IP address and timestamp fields.',
      whyItMatters: 'Essential for corroborating host events with network perimeter logs.',
    };
    setFormData((prev) => ({
      ...prev,
      section2_visual: {
        ...prev.section2_visual,
        optionalScreenshots: [...(prev.section2_visual.optionalScreenshots || []), newScreenshot],
      },
    }));
  };

  const removeScreenshot = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      section2_visual: {
        ...prev.section2_visual,
        optionalScreenshots: prev.section2_visual.optionalScreenshots.filter((_, i) => i !== index),
      },
    }));
  };

  const updateScreenshot = (index: number, field: keyof AnnotatedScreenshot, value: string) => {
    setFormData((prev) => {
      const updatedScreenshots = [...(prev.section2_visual.optionalScreenshots || [])];
      updatedScreenshots[index] = {
        ...updatedScreenshots[index],
        [field]: value,
      };
      return {
        ...prev,
        section2_visual: {
          ...prev.section2_visual,
          optionalScreenshots: updatedScreenshots,
        },
      };
    });
  };

  // Section 4 handlers (Knowledge Check)
  const addQuestion = () => {
    const newQuestion: QuestionItem = {
      question: 'New question title?',
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: 0,
      explanation: 'Detailed explanation for this answer.',
    };
    setFormData((prev) => ({
      ...prev,
      section4_knowledgeCheck: {
        ...prev.section4_knowledgeCheck,
        questions: [...(prev.section4_knowledgeCheck.questions || []), newQuestion],
      },
    }));
  };

  const removeQuestion = (qIdx: number) => {
    setFormData((prev) => ({
      ...prev,
      section4_knowledgeCheck: {
        ...prev.section4_knowledgeCheck,
        questions: prev.section4_knowledgeCheck.questions.filter((_, i) => i !== qIdx),
      },
    }));
  };

  const updateQuestion = (qIdx: number, field: string, value: any) => {
    setFormData((prev) => {
      const questions = [...prev.section4_knowledgeCheck.questions];
      questions[qIdx] = {
        ...questions[qIdx],
        [field]: value,
      };
      return {
        ...prev,
        section4_knowledgeCheck: {
          ...prev.section4_knowledgeCheck,
          questions,
        },
      };
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/curriculum/chapter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chapterId: chapter.id,
          chapterData: formData,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to save changes');
      }

      showToast({
        type: 'success',
        title: 'Chapter Updated in Real-Time! 🚀',
        description: `Changes for "${formData.title}" are now live for all active learners.`,
      });

      onSaveSuccess(formData);
      onClose();
    } catch (err: any) {
      showToast({
        type: 'error',
        title: 'Save Failed',
        description: err.message || 'Could not update chapter',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl w-[95vw] h-[86vh] max-h-[820px] min-h-[620px] flex flex-col p-0 rounded-2xl bg-card border-2 border-primary/30 shadow-2xl overflow-hidden focus:outline-none">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0 overflow-hidden">
          {/* PINNED HEADER SECTION - Never moves or shifts on tab change */}
          <div className="p-6 pb-3 border-b border-border/70 shrink-0 space-y-3 bg-card/95 backdrop-blur-md">
            <DialogHeader>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/30 uppercase tracking-wider">
                  Admin Live Editor Mode
                </span>
                <span className="text-xs text-muted-foreground font-mono">{chapter.id}</span>
              </div>
              <DialogTitle className="text-xl font-bold text-foreground">
                Edit Chapter: {formData.title}
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Any edits made here are instantly persisted and broadcast to all active student sessions.
              </DialogDescription>
            </DialogHeader>

            {/* Top Metadata Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 p-2.5 rounded-xl bg-muted/40 border border-border/60 text-xs">
              <div>
                <Label className="text-[11px] font-semibold text-muted-foreground">Chapter Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="mt-1 h-8 text-xs font-semibold"
                />
              </div>
              <div>
                <Label className="text-[11px] font-semibold text-muted-foreground">Assigned Mentor</Label>
                <Input
                  value={formData.mentor}
                  onChange={(e) => setFormData({ ...formData, mentor: e.target.value })}
                  className="mt-1 h-8 text-xs"
                />
              </div>
              <div>
                <Label className="text-[11px] font-semibold text-muted-foreground">Duration (Minutes)</Label>
                <Input
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value, 10) || 7 })}
                  className="mt-1 h-8 text-xs font-mono"
                />
              </div>
              <div>
                <Label className="text-[11px] font-semibold text-muted-foreground">XP Reward</Label>
                <Input
                  type="number"
                  value={formData.xpReward}
                  onChange={(e) => setFormData({ ...formData, xpReward: parseInt(e.target.value, 10) || 35 })}
                  className="mt-1 h-8 text-xs font-mono"
                />
              </div>
            </div>

            {/* 4 Section Tabs Bar */}
            <TabsList className="grid grid-cols-4 bg-muted/60 p-1 rounded-xl w-full">
              <TabsTrigger value="theory" className="text-xs gap-1.5 font-semibold py-1.5 cursor-pointer">
                <BookOpen className="w-3.5 h-3.5" /> Section 1: Theory
              </TabsTrigger>
              <TabsTrigger value="visual" className="text-xs gap-1.5 font-semibold py-1.5 cursor-pointer">
                <Eye className="w-3.5 h-3.5" /> Section 2: Visual & Photos
              </TabsTrigger>
              <TabsTrigger value="interactive" className="text-xs gap-1.5 font-semibold py-1.5 cursor-pointer">
                <Sliders className="w-3.5 h-3.5" /> Section 3: Interactive
              </TabsTrigger>
              <TabsTrigger value="check" className="text-xs gap-1.5 font-semibold py-1.5 cursor-pointer">
                <CheckCircle2 className="w-3.5 h-3.5" /> Section 4: Knowledge Check
              </TabsTrigger>
            </TabsList>
          </div>

          {/* SCROLLABLE INTERIOR TAB CONTENT (BODY) */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin">
            {/* TAB 1: SECTION 1 THEORY */}
            <TabsContent value="theory" className="mt-0 space-y-4">
              <div>
              <Label className="text-xs font-semibold">Theory Concept Subtitle</Label>
              <Input
                value={formData.section1_theory.subtitle || ''}
                onChange={(e) => updateSection1('subtitle', e.target.value)}
                placeholder="e.g. Understanding L1 Workstation Basics"
                className="mt-1 text-xs"
              />
            </div>

            <div>
              <Label className="text-xs font-semibold">Theory Explanatory Content (Markdown / Text)</Label>
              <textarea
                value={formData.section1_theory.content || ''}
                onChange={(e) => updateSection1('content', e.target.value)}
                rows={6}
                className="mt-1 w-full rounded-xl border border-input bg-background p-3 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary font-sans leading-relaxed"
                placeholder="Enter rich explanation..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-semibold">Key Takeaway / Mentor Tip</Label>
                <Input
                  value={formData.section1_theory.keyTakeaway || ''}
                  onChange={(e) => updateSection1('keyTakeaway', e.target.value)}
                  placeholder="Essential lesson takeaway"
                  className="mt-1 text-xs"
                />
              </div>
              <div>
                <Label className="text-xs font-semibold flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-primary" /> Custom Audio URL (Optional MP3)
                </Label>
                <Input
                  value={formData.section1_theory.audioUrl || ''}
                  onChange={(e) => updateSection1('audioUrl', e.target.value)}
                  placeholder="https://.../narration.mp3 (Leave blank for AI speech)"
                  className="mt-1 text-xs font-mono"
                />
              </div>
            </div>
          </TabsContent>

          {/* TAB 2: SECTION 2 VISUAL & SCREENSHOTS */}
          <TabsContent value="visual" className="mt-0 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-semibold">Visual Element Title</Label>
                <Input
                  value={formData.section2_visual.title || ''}
                  onChange={(e) => updateSection2('title', e.target.value)}
                  className="mt-1 text-xs"
                />
              </div>
              <div>
                <Label className="text-xs font-semibold">Visual Format</Label>
                <select
                  value={formData.section2_visual.visualType}
                  onChange={(e) => updateSection2('visualType', e.target.value)}
                  className="mt-1 w-full h-9 rounded-xl border border-input bg-background px-3 text-xs text-foreground"
                >
                  <option value="animated-story">Animated Story</option>
                  <option value="diagram">Architecture Diagram</option>
                  <option value="interface-tour">Security Interface Tour</option>
                  <option value="flowchart">Flowchart / Data Funnel</option>
                  <option value="packet-flow">Network Packet Flow</option>
                </select>
              </div>
            </div>

            {/* Annotated Screenshots / Photos */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <Image className="w-4 h-4 text-primary" /> Optional Annotated Screenshots & Tool Photos
                </Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addScreenshot}
                  className="text-xs h-7 gap-1 rounded-lg border-primary/30 text-primary hover:bg-primary/10"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Photo / Screen
                </Button>
              </div>

              {formData.section2_visual.optionalScreenshots?.length === 0 ? (
                <div className="p-4 rounded-xl border border-dashed border-border/80 text-center text-xs text-muted-foreground bg-muted/20">
                  No screenshots attached to this chapter. Click &quot;Add Photo / Screen&quot; to add annotated interface walkthroughs.
                </div>
              ) : (
                formData.section2_visual.optionalScreenshots?.map((screen, sIdx) => (
                  <div
                    key={screen.id || sIdx}
                    className="p-3.5 rounded-xl border border-border bg-card shadow-xs space-y-2.5 relative"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-xs text-primary font-mono">Photo #{sIdx + 1}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeScreenshot(sIdx)}
                        className="h-6 w-6 p-0 text-rose-500 hover:text-rose-700 hover:bg-rose-50"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <Label className="text-[10px] text-muted-foreground">Image URL</Label>
                        <Input
                          value={screen.url}
                          onChange={(e) => updateScreenshot(sIdx, 'url', e.target.value)}
                          className="h-7 text-xs font-mono"
                          placeholder="https://...image.jpg"
                        />
                      </div>
                      <div>
                        <Label className="text-[10px] text-muted-foreground">Screen Title</Label>
                        <Input
                          value={screen.title}
                          onChange={(e) => updateScreenshot(sIdx, 'title', e.target.value)}
                          className="h-7 text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <Label className="text-[10px] text-muted-foreground">What to Notice</Label>
                        <Input
                          value={screen.whatToNotice}
                          onChange={(e) => updateScreenshot(sIdx, 'whatToNotice', e.target.value)}
                          className="h-7 text-xs"
                        />
                      </div>
                      <div>
                        <Label className="text-[10px] text-muted-foreground">Why It Matters</Label>
                        <Input
                          value={screen.whyItMatters}
                          onChange={(e) => updateScreenshot(sIdx, 'whyItMatters', e.target.value)}
                          className="h-7 text-xs"
                        />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>

          {/* TAB 3: SECTION 3 INTERACTIVE */}
          <TabsContent value="interactive" className="mt-0 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-semibold">Interactive Activity Title</Label>
                <Input
                  value={formData.section3_interactive.title || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      section3_interactive: { ...formData.section3_interactive, title: e.target.value },
                    })
                  }
                  className="mt-1 text-xs"
                />
              </div>
              <div>
                <Label className="text-xs font-semibold">Activity Type</Label>
                <select
                  value={formData.section3_interactive.type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      section3_interactive: { ...formData.section3_interactive, type: e.target.value as any },
                    })
                  }
                  className="mt-1 w-full h-9 rounded-xl border border-input bg-background px-3 text-xs text-foreground"
                >
                  <option value="matching">Concept / Term Matching</option>
                  <option value="sorting">Safe / Unsafe Sorter</option>
                  <option value="clue-reveal">Clue & Evidence Reveal</option>
                  <option value="drag-drop">Drag-and-Drop Workflow</option>
                  <option value="packet-trace">Packet / Event Tracer</option>
                </select>
              </div>
            </div>

            <div>
              <Label className="text-xs font-semibold">Activity Instructions</Label>
              <Input
                value={formData.section3_interactive.instructions || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    section3_interactive: { ...formData.section3_interactive, instructions: e.target.value },
                  })
                }
                className="mt-1 text-xs"
              />
            </div>
          </TabsContent>

          {/* TAB 4: SECTION 4 KNOWLEDGE CHECK */}
          <TabsContent value="check" className="mt-0 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-xs font-bold text-foreground">Knowledge Check Questions</Label>
                <p className="text-[11px] text-muted-foreground">Each chapter contains 1–3 quick check questions.</p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addQuestion}
                className="text-xs h-7 gap-1 rounded-lg border-primary/30 text-primary hover:bg-primary/10"
              >
                <Plus className="w-3.5 h-3.5" /> Add Question
              </Button>
            </div>

            <div className="space-y-3">
              {formData.section4_knowledgeCheck.questions?.map((q, qIdx) => (
                <div
                  key={qIdx}
                  className="p-3.5 rounded-xl border border-border bg-card shadow-xs space-y-2.5 relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-primary font-mono">Question #{qIdx + 1}</span>
                    {formData.section4_knowledgeCheck.questions.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeQuestion(qIdx)}
                        className="h-6 w-6 p-0 text-rose-500 hover:text-rose-700"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    )}
                  </div>

                  <div>
                    <Label className="text-[11px] text-muted-foreground">Question Text</Label>
                    <Input
                      value={q.question}
                      onChange={(e) => updateQuestion(qIdx, 'question', e.target.value)}
                      className="mt-0.5 h-7 text-xs font-semibold"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {q.options.map((opt, optIdx) => (
                      <div key={optIdx} className="flex items-center gap-1.5">
                        <input
                          type="radio"
                          name={`correct-${qIdx}`}
                          checked={q.correctAnswer === optIdx}
                          onChange={() => updateQuestion(qIdx, 'correctAnswer', optIdx)}
                          className="h-3.5 w-3.5 text-primary"
                        />
                        <Input
                          value={opt}
                          onChange={(e) => {
                            const newOptions = [...q.options];
                            newOptions[optIdx] = e.target.value;
                            updateQuestion(qIdx, 'options', newOptions);
                          }}
                          className={`h-7 text-xs ${
                            q.correctAnswer === optIdx ? 'border-primary ring-1 ring-primary' : ''
                          }`}
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <Label className="text-[11px] text-muted-foreground">One-Sentence Explanation</Label>
                    <Input
                      value={q.explanation}
                      onChange={(e) => updateQuestion(qIdx, 'explanation', e.target.value)}
                      className="mt-0.5 h-7 text-xs text-muted-foreground"
                    />
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </div>
      </Tabs>

      {/* PINNED FOOTER - Stays fixed at bottom */}
      <DialogFooter className="p-4 px-6 border-t border-border/80 shrink-0 bg-muted/30 flex flex-row items-center justify-between sm:justify-between">
        <Button type="button" variant="ghost" size="sm" onClick={onClose} disabled={isSaving}>
          Cancel
        </Button>
        <Button
          type="button"
          size="sm"
          onClick={handleSave}
          disabled={isSaving}
          className="bg-primary hover:bg-primary/90 text-white font-bold gap-2 rounded-xl shadow-md cursor-pointer"
        >
          <Save className="w-4 h-4" />
          {isSaving ? 'Saving Changes...' : 'Save & Publish Live'}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
}
