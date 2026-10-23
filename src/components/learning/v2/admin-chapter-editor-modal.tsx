'use client';

import React, { useState, useEffect } from 'react';
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
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/toast-provider';
import {
  V2ChapterNormalized,
  AnnotatedScreenshot,
  QuestionItem,
  ExtraBox,
  FormalDefinition,
  SectionStyleConfig,
  VisualStep,
  InteractiveItem,
  QuestionType,
} from '@/data/curriculum-v2-data';
import { LocalImageUploader } from '@/components/admin/local-image-uploader';
import {
  Save,
  Plus,
  Trash2,
  ImageIcon,
  BookOpen,
  Eye,
  Sliders,
  CheckCircle2,
  Volume2,
  Type,
  Palette,
  ArrowUpDown,
  ExternalLink,
  Shield,
  Terminal,
  Database,
  Cpu,
  Key,
  Network,
  AlertTriangle,
  Lock,
  Sparkles,
  Layers,
  ChevronDown,
  ChevronUp,
  RotateCcw,
} from 'lucide-react';

interface AdminChapterEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  chapter: V2ChapterNormalized;
  onSaveSuccess: (updated: V2ChapterNormalized) => void;
}

const MENTOR_OPTIONS = [
  { name: 'Ananya', role: 'Experienced L1 Analyst' },
  { name: 'Rajesh', role: 'Senior Threat Hunter' },
  { name: 'Vikram', role: 'Incident Commander' },
  { name: 'Priya', role: 'SIEM Engineering Lead' },
  { name: 'Kavita', role: 'Digital Forensics Lead' },
  { name: 'Siddharth', role: 'SOC Infrastructure Architect' },
];

export function AdminChapterEditorModal({
  isOpen,
  onClose,
  chapter,
  onSaveSuccess,
}: AdminChapterEditorModalProps) {
  const { showToast } = useToast();
  const [formData, setFormData] = useState<V2ChapterNormalized>(() =>
    JSON.parse(JSON.stringify(chapter))
  );
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('concept_story');
  const [isSwitchingFormat, setIsSwitchingFormat] = useState(false);
  const [visualFormatNotice, setVisualFormatNotice] = useState<string | null>(null);

  const handleFormatChange = (newFormat: string) => {
    setIsSwitchingFormat(true);
    setVisualFormatNotice(`Applying "${newFormat}" layout to course canvas...`);
    updateSection2('visualType', newFormat);
    setTimeout(() => {
      setIsSwitchingFormat(false);
      setVisualFormatNotice(null);
      showToast({
        type: 'info',
        title: 'Visual Format Selected 🎨',
        description: `Visual format switched to "${newFormat}". Click "Save Changes" to publish.`,
      });
    }, 450);
  };

  // Sync state when chapter prop changes
  useEffect(() => {
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

  // Section 2 handlers
  const updateSection2 = (key: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      section2_visual: {
        ...prev.section2_visual,
        [key]: value,
      },
    }));
  };

  // Section 3 handlers
  const updateSection3 = (key: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      section3_interactive: {
        ...prev.section3_interactive,
        [key]: value,
      },
    }));
  };

  // Section 4 handlers
  const updateSection4 = (key: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      section4_knowledgeCheck: {
        ...prev.section4_knowledgeCheck,
        [key]: value,
      },
    }));
  };

  // ---------------------------------------------------------------------------
  // Extra Box Manager (Reusable for sections 1, 2, 3, 4)
  // ---------------------------------------------------------------------------
  const getExtraBoxes = (sectionKey: 'section1_theory' | 'section2_visual' | 'section3_interactive' | 'section4_knowledgeCheck'): ExtraBox[] => {
    return formData[sectionKey]?.extraBoxes || [];
  };

  const setExtraBoxes = (
    sectionKey: 'section1_theory' | 'section2_visual' | 'section3_interactive' | 'section4_knowledgeCheck',
    boxes: ExtraBox[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        extraBoxes: boxes,
      },
    }));
  };

  const addExtraBox = (
    sectionKey: 'section1_theory' | 'section2_visual' | 'section3_interactive' | 'section4_knowledgeCheck',
    type: ExtraBox['type']
  ) => {
    const current = getExtraBoxes(sectionKey);
    const newBox: ExtraBox = {
      id: `box-${Date.now()}`,
      type,
      title: type === 'callout' ? 'Analyst Notice' : type === 'banner' ? 'Defensive Objective' : 'Supplemental Insight',
      content:
        type === 'image'
          ? 'Descriptive caption of observable telemetry artifact.'
          : 'Detailed technical note, operational rule of thumb, or baseline checklist.',
      imageUrl: type === 'image' ? '/brand/cdac-logo.svg' : undefined,
      iconName: 'Shield',
      calloutType: 'info',
      animation: type === 'banner' ? 'pulse' : 'none',
      order: current.length + 1,
    };
    setExtraBoxes(sectionKey, [...current, newBox]);
  };

  const updateExtraBox = (
    sectionKey: 'section1_theory' | 'section2_visual' | 'section3_interactive' | 'section4_knowledgeCheck',
    bIdx: number,
    field: keyof ExtraBox,
    value: any
  ) => {
    const current = [...getExtraBoxes(sectionKey)];
    current[bIdx] = {
      ...current[bIdx],
      [field]: value,
    };
    setExtraBoxes(sectionKey, current);
  };

  const removeExtraBox = (
    sectionKey: 'section1_theory' | 'section2_visual' | 'section3_interactive' | 'section4_knowledgeCheck',
    bIdx: number
  ) => {
    const current = getExtraBoxes(sectionKey).filter((_, i) => i !== bIdx);
    setExtraBoxes(sectionKey, current);
  };

  // ---------------------------------------------------------------------------
  // Style Override Manager
  // ---------------------------------------------------------------------------
  const updateStyleOverride = (
    sectionKey: 'section1_theory' | 'section2_visual' | 'section3_interactive' | 'section4_knowledgeCheck',
    field: keyof SectionStyleConfig,
    value: any
  ) => {
    setFormData((prev) => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        styleOverride: {
          ...prev[sectionKey]?.styleOverride,
          [field]: value,
        },
      },
    }));
  };

  // ---------------------------------------------------------------------------
  // Element Order Swapper
  // ---------------------------------------------------------------------------
  const moveElementOrder = (
    sectionKey: 'section1_theory' | 'section2_visual' | 'section3_interactive' | 'section4_knowledgeCheck',
    index: number,
    direction: 'up' | 'down'
  ) => {
    const defaultOrders: Record<string, string[]> = {
      section1_theory: ['title', 'mentor', 'cdacScenario', 'content', 'keyTakeaway', 'formalDefinitions', 'extraBoxes'],
      section2_visual: ['title', 'description', 'visualDisplay', 'extraBoxes', 'audio'],
      section3_interactive: ['title', 'instructions', 'interactiveEngine', 'extraBoxes'],
      section4_knowledgeCheck: ['title', 'questions', 'extraBoxes'],
    };

    const currentOrder = [...(formData[sectionKey]?.elementOrder || defaultOrders[sectionKey])];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= currentOrder.length) return;

    const temp = currentOrder[index];
    currentOrder[index] = currentOrder[targetIdx];
    currentOrder[targetIdx] = temp;

    setFormData((prev) => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        elementOrder: currentOrder,
      },
    }));
  };

  // ---------------------------------------------------------------------------
  // Section 1 Formal Definitions
  // ---------------------------------------------------------------------------
  const addFormalDefinition = () => {
    const newDef: FormalDefinition = {
      id: `def-${Date.now()}`,
      term: 'Operational Term',
      definition: 'Standard authoritative definition according to published cyber defense frameworks.',
      sourceStandard: 'NIST',
      sourceUrl: 'https://csrc.nist.gov/glossary',
      citationCode: 'NIST SP 800-61r2',
    };
    const current = formData.section1_theory.formalDefinitions || [];
    updateSection1('formalDefinitions', [...current, newDef]);
  };

  const updateFormalDefinition = (index: number, field: keyof FormalDefinition, value: any) => {
    const current = [...(formData.section1_theory.formalDefinitions || [])];
    current[index] = { ...current[index], [field]: value };
    updateSection1('formalDefinitions', current);
  };

  const removeFormalDefinition = (index: number) => {
    const current = (formData.section1_theory.formalDefinitions || []).filter((_, i) => i !== index);
    updateSection1('formalDefinitions', current);
  };

  // ---------------------------------------------------------------------------
  // Section 2 Visual Steps & Screenshots
  // ---------------------------------------------------------------------------
  const addVisualStep = () => {
    const currentSteps = formData.section2_visual.steps || [];
    const newStep: VisualStep = {
      id: currentSteps.length + 1,
      stage: `Stage ${currentSteps.length + 1}`,
      title: 'Observed Telemetry Stage',
      description: 'Explain what happens at this point in the attack or defensive triage timeline.',
      telemetrySnippet: 'SRC: 10.0.4.x | ACTION: PASS | PROTOCOL: TCP:443',
      highlightText: 'Key Indicator',
    };
    updateSection2('steps', [...currentSteps, newStep]);
  };

  const updateVisualStep = (index: number, field: keyof VisualStep, value: any) => {
    const current = [...(formData.section2_visual.steps || [])];
    current[index] = { ...current[index], [field]: value };
    updateSection2('steps', current);
  };

  const removeVisualStep = (index: number) => {
    const current = (formData.section2_visual.steps || []).filter((_, i) => i !== index);
    updateSection2('steps', current);
  };

  // ---------------------------------------------------------------------------
  // Section 3 Interactive Items
  // ---------------------------------------------------------------------------
  const addInteractiveItem = () => {
    const current = formData.section3_interactive.items || [];
    const newItem: InteractiveItem = {
      id: `act-${Date.now()}`,
      label: 'New Observable or Task',
      summary: 'Details of the triage check, evidence observable, or rule matching.',
      category: 'Triage',
    };
    updateSection3('items', [...current, newItem]);
  };

  const updateInteractiveItem = (index: number, field: keyof InteractiveItem, value: any) => {
    const current = [...(formData.section3_interactive.items || [])];
    current[index] = { ...current[index], [field]: value };
    updateSection3('items', current);
  };

  const removeInteractiveItem = (index: number) => {
    const current = (formData.section3_interactive.items || []).filter((_, i) => i !== index);
    updateSection3('items', current);
  };

  // ---------------------------------------------------------------------------
  // Section 4 Multi-Type Questions
  // ---------------------------------------------------------------------------
  const addQuestion = (type: QuestionType = 'mcq') => {
    const newQuestion: QuestionItem = {
      id: `q-${Date.now()}`,
      type,
      question:
        type === 'input-value'
          ? 'Enter the Windows Event ID corresponding to successful account logon:'
          : type === 'matching'
          ? 'Match each detection concept to its definition:'
          : type === 'drag-drop'
          ? 'Classify these alerts into Benign or Malicious:'
          : 'New multiple choice question prompt?',
      options: type === 'mcq' ? ['Option A', 'Option B', 'Option C', 'Option D'] : [],
      correctAnswer: type === 'mcq' ? 0 : '',
      explanation: 'Official explanation justifying the correct triage action.',
      matchingPairs:
        type === 'matching'
          ? [
              { id: '1', left: 'Event 4624', right: 'Successful Logon' },
              { id: '2', left: 'Event 4625', right: 'Failed Logon' },
            ]
          : undefined,
      dragDropItems:
        type === 'drag-drop'
          ? [
              { id: '1', token: 'PowerShell -EncodedCommand', targetSlot: 'Malicious' },
              { id: '2', token: 'gpupdate.exe /force', targetSlot: 'Benign' },
            ]
          : undefined,
      acceptedAnswers: type === 'input-value' ? ['4624', 'Event 4624'] : undefined,
      caseSensitive: false,
    };

    updateSection4('questions', [...(formData.section4_knowledgeCheck.questions || []), newQuestion]);
  };

  const updateQuestion = (qIdx: number, field: keyof QuestionItem, value: any) => {
    const questions = [...(formData.section4_knowledgeCheck.questions || [])];
    questions[qIdx] = {
      ...questions[qIdx],
      [field]: value,
    };
    updateSection4('questions', questions);
  };

  const removeQuestion = (qIdx: number) => {
    const questions = (formData.section4_knowledgeCheck.questions || []).filter((_, i) => i !== qIdx);
    updateSection4('questions', questions);
  };

  // ---------------------------------------------------------------------------
  // Save & Broadcast Handler
  // ---------------------------------------------------------------------------
  const handleSave = async () => {
    setIsSaving(true);
    setVisualFormatNotice('Saving & compiling visual formatting across active course...');
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
        title: 'Chapter & Visual Canvas Updated! 🚀',
        description: `Changes and visual format for "${formData.title}" are now live for all active learners.`,
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
      setVisualFormatNotice(null);
    }
  };

  // Helper render for Common Section Toolbar (Order + Font Override + Audio Autoplay)
  const renderSectionCommonToolbar = (
    sectionKey: 'section1_theory' | 'section2_visual' | 'section3_interactive' | 'section4_knowledgeCheck',
    orderKeys: string[]
  ) => {
    const sectionData = formData[sectionKey];
    const styleOverride = sectionData?.styleOverride || {};
    const audioAutoplay = !!sectionData?.audioAutoplay;
    const currentOrder = sectionData?.elementOrder || orderKeys;

    return (
      <div className="p-3.5 rounded-2xl bg-muted/30 border border-border/70 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-[10px] font-mono border-primary/30 text-primary">
              Section Settings
            </Badge>
            <span className="text-xs text-muted-foreground">Typography Override, Audio & Element Ordering</span>
          </div>

          {/* Audio Autoplay Switch */}
          <label className="flex items-center gap-1.5 cursor-pointer text-xs font-semibold text-foreground">
            <input
              type="checkbox"
              checked={audioAutoplay}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  [sectionKey]: {
                    ...prev[sectionKey],
                    audioAutoplay: e.target.checked,
                  },
                }));
              }}
              className="rounded border-border text-primary focus:ring-primary w-3.5 h-3.5"
            />
            <Volume2 className="w-3.5 h-3.5 text-primary" />
            <span>Audio Autoplay</span>
          </label>
        </div>

        {/* Font Formatting Console */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div>
            <Label className="text-[10px] text-muted-foreground">Font Family</Label>
            <select
              value={styleOverride.fontFamily || ''}
              onChange={(e) => updateStyleOverride(sectionKey, 'fontFamily', e.target.value || undefined)}
              className="mt-1 w-full h-7 rounded-lg border border-input bg-background px-2 text-[11px]"
            >
              <option value="">Inherit Global</option>
              <option value="sans">Modern Sans</option>
              <option value="mono">Cyber Mono</option>
              <option value="serif">Classic Editorial</option>
              <option value="cyber">Cyber Futuristic</option>
              <option value="poppins">Poppins</option>
              <option value="samsung">Samsung Sans</option>
              <option value="beebeez">Beebeez (Bebas Neue)</option>
              <option value="striker">Victory Striker Sans</option>
              <option value="spartan">League Spartan</option>
            </select>
          </div>

          <div>
            <Label className="text-[10px] text-muted-foreground">Font Scale</Label>
            <select
              value={styleOverride.fontScale || ''}
              onChange={(e) => updateStyleOverride(sectionKey, 'fontScale', e.target.value || undefined)}
              className="mt-1 w-full h-7 rounded-lg border border-input bg-background px-2 text-[11px]"
            >
              <option value="">Inherit Global</option>
              <option value="compact">Compact (90%)</option>
              <option value="normal">Normal (100%)</option>
              <option value="relaxed">Relaxed (110%)</option>
              <option value="large">Large (120%)</option>
            </select>
          </div>

          <div>
            <Label className="text-[10px] text-muted-foreground">Heading Weight</Label>
            <select
              value={styleOverride.headingWeight || ''}
              onChange={(e) => updateStyleOverride(sectionKey, 'headingWeight', e.target.value || undefined)}
              className="mt-1 w-full h-7 rounded-lg border border-input bg-background px-2 text-[11px]"
            >
              <option value="">Inherit Global</option>
              <option value="normal">Normal</option>
              <option value="semibold">Semibold</option>
              <option value="bold">Bold</option>
              <option value="extrabold">Extra Bold</option>
            </select>
          </div>

          <div>
            <Label className="text-[10px] text-muted-foreground">Line Height</Label>
            <select
              value={styleOverride.lineHeight || ''}
              onChange={(e) => updateStyleOverride(sectionKey, 'lineHeight', e.target.value || undefined)}
              className="mt-1 w-full h-7 rounded-lg border border-input bg-background px-2 text-[11px]"
            >
              <option value="">Inherit Global</option>
              <option value="tight">Tight</option>
              <option value="normal">Normal</option>
              <option value="relaxed">Relaxed</option>
              <option value="loose">Loose</option>
            </select>
          </div>
        </div>

        {/* Element Ordering Swapper */}
        <div className="pt-1 border-t border-border/50">
          <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-1.5">
            <span className="font-semibold flex items-center gap-1">
              <ArrowUpDown className="w-3 h-3 text-primary" /> Element Display Order:
            </span>
            <span className="text-[10px]">Use arrows to reorder section components</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {currentOrder.map((elemName, idx) => (
              <div
                key={elemName}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg border border-border/70 bg-background text-[11px] font-mono shadow-2xs"
              >
                <span>{elemName}</span>
                <div className="flex items-center">
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => moveElementOrder(sectionKey, idx, 'up')}
                    className="p-0.5 hover:text-primary disabled:opacity-30 cursor-pointer"
                    title="Move earlier"
                  >
                    <ChevronUp className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    disabled={idx === currentOrder.length - 1}
                    onClick={() => moveElementOrder(sectionKey, idx, 'down')}
                    className="p-0.5 hover:text-primary disabled:opacity-30 cursor-pointer"
                    title="Move later"
                  >
                    <ChevronDown className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Helper render for Extra Boxes Manager
  const renderExtraBoxesManager = (
    sectionKey: 'section1_theory' | 'section2_visual' | 'section3_interactive' | 'section4_knowledgeCheck'
  ) => {
    const boxes = getExtraBoxes(sectionKey);

    return (
      <div className="space-y-3 pt-2 border-t border-border/60">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <Label className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-primary" /> [EXTRA BOX] Custom Section Blocks ({boxes.length})
            </Label>
            <p className="text-[11px] text-muted-foreground">
              Add multiple custom text blocks, uploaded images, animated banners, icons, or security alerts.
            </p>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addExtraBox(sectionKey, 'text')}
              className="text-[11px] h-7 gap-1 rounded-lg border-primary/30 text-primary hover:bg-primary/10"
            >
              <Plus className="w-3 h-3" /> + Text Box
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addExtraBox(sectionKey, 'image')}
              className="text-[11px] h-7 gap-1 rounded-lg border-primary/30 text-primary hover:bg-primary/10"
            >
              <ImageIcon className="w-3 h-3" /> + Upload Image
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addExtraBox(sectionKey, 'icon')}
              className="text-[11px] h-7 gap-1 rounded-lg border-primary/30 text-primary hover:bg-primary/10"
            >
              <Shield className="w-3 h-3" /> + Icon Box
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addExtraBox(sectionKey, 'callout')}
              className="text-[11px] h-7 gap-1 rounded-lg border-primary/30 text-primary hover:bg-primary/10"
            >
              <AlertTriangle className="w-3 h-3" /> + Callout
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addExtraBox(sectionKey, 'banner')}
              className="text-[11px] h-7 gap-1 rounded-lg border-primary/30 text-primary hover:bg-primary/10"
            >
              <Sparkles className="w-3 h-3" /> + Banner
            </Button>
          </div>
        </div>

        {boxes.length === 0 ? (
          <div className="p-3.5 rounded-xl border border-dashed border-border/80 text-center text-xs text-muted-foreground bg-muted/15">
            No extra boxes added yet. Click any button above to add custom text, images, icons, callouts, or banners.
          </div>
        ) : (
          <div className="space-y-3">
            {boxes.map((box, bIdx) => (
              <div
                key={box.id || bIdx}
                className="p-3.5 rounded-xl border border-border bg-card shadow-xs space-y-2.5 relative"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-[10px] font-mono uppercase bg-primary/10 text-primary border-primary/20">
                      EXTRA BOX #{bIdx + 1}: {box.type}
                    </Badge>
                    <Input
                      value={box.title || ''}
                      onChange={(e) => updateExtraBox(sectionKey, bIdx, 'title', e.target.value)}
                      placeholder="Box Title / Heading..."
                      className="h-7 text-xs font-semibold max-w-[220px]"
                    />
                  </div>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeExtraBox(sectionKey, bIdx)}
                    className="h-6 w-6 p-0 text-rose-500 hover:text-rose-700 hover:bg-rose-50"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>

                {/* Type-specific inputs */}
                {box.type === 'text' && (
                  <div>
                    <Label className="text-[10px] text-muted-foreground">Text / Markdown Content</Label>
                    <textarea
                      value={box.content}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        updateExtraBox(sectionKey, bIdx, 'content', e.target.value)
                      }
                      className="mt-1 w-full rounded-xl border border-input bg-background p-2.5 text-xs font-normal focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary min-h-[60px]"
                      rows={3}
                    />
                  </div>
                )}

                {box.type === 'image' && (
                  <div className="space-y-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <Label className="text-[10px] text-muted-foreground">Upload Local Image (saved to public/uploads/)</Label>
                        <LocalImageUploader
                          currentUrl={box.imageUrl}
                          onUploadSuccess={(url) => updateExtraBox(sectionKey, bIdx, 'imageUrl', url)}
                          label="Select Image File"
                        />
                      </div>
                      <div>
                        <Label className="text-[10px] text-muted-foreground">Image URL (Local or Remote)</Label>
                        <Input
                          value={box.imageUrl || ''}
                          onChange={(e) => updateExtraBox(sectionKey, bIdx, 'imageUrl', e.target.value)}
                          className="h-7 text-xs font-mono"
                          placeholder="/uploads/... or https://..."
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-[10px] text-muted-foreground">Caption / Explanation</Label>
                      <Input
                        value={box.content}
                        onChange={(e) => updateExtraBox(sectionKey, bIdx, 'content', e.target.value)}
                        className="h-7 text-xs"
                      />
                    </div>
                  </div>
                )}

                {box.type === 'icon' && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div>
                      <Label className="text-[10px] text-muted-foreground">Icon Symbol</Label>
                      <select
                        value={box.iconName || 'Shield'}
                        onChange={(e) => updateExtraBox(sectionKey, bIdx, 'iconName', e.target.value)}
                        className="mt-1 w-full h-7 rounded-lg border border-input bg-background px-2 text-xs"
                      >
                        <option value="Shield">Shield</option>
                        <option value="Terminal">Terminal</option>
                        <option value="Database">Database</option>
                        <option value="Network">Network</option>
                        <option value="Cpu">Cpu</option>
                        <option value="Key">Key</option>
                        <option value="AlertTriangle">Alert Triangle</option>
                        <option value="Lock">Lock</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <Label className="text-[10px] text-muted-foreground">Description Text</Label>
                      <Input
                        value={box.content}
                        onChange={(e) => updateExtraBox(sectionKey, bIdx, 'content', e.target.value)}
                        className="mt-1 h-7 text-xs"
                      />
                    </div>
                  </div>
                )}

                {box.type === 'callout' && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div>
                      <Label className="text-[10px] text-muted-foreground">Callout Style</Label>
                      <select
                        value={box.calloutType || 'info'}
                        onChange={(e) => updateExtraBox(sectionKey, bIdx, 'calloutType', e.target.value)}
                        className="mt-1 w-full h-7 rounded-lg border border-input bg-background px-2 text-xs"
                      >
                        <option value="info">Info (Blue)</option>
                        <option value="warning">Warning (Amber)</option>
                        <option value="success">Success (Emerald)</option>
                        <option value="danger">Critical / Danger (Rose)</option>
                        <option value="tip">Pro Tip (Purple)</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <Label className="text-[10px] text-muted-foreground">Callout Message</Label>
                      <Input
                        value={box.content}
                        onChange={(e) => updateExtraBox(sectionKey, bIdx, 'content', e.target.value)}
                        className="mt-1 h-7 text-xs"
                      />
                    </div>
                  </div>
                )}

                {box.type === 'banner' && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div>
                      <Label className="text-[10px] text-muted-foreground">Animation Effect</Label>
                      <select
                        value={box.animation || 'pulse'}
                        onChange={(e) => updateExtraBox(sectionKey, bIdx, 'animation', e.target.value)}
                        className="mt-1 w-full h-7 rounded-lg border border-input bg-background px-2 text-xs"
                      >
                        <option value="none">None</option>
                        <option value="pulse">Pulse Glow</option>
                        <option value="bounce">Subtle Bounce</option>
                        <option value="glow">Glow Ring</option>
                        <option value="slide">Slide In</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <Label className="text-[10px] text-muted-foreground">Banner Headline Content</Label>
                      <Input
                        value={box.content}
                        onChange={(e) => updateExtraBox(sectionKey, bIdx, 'content', e.target.value)}
                        className="mt-1 h-7 text-xs"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl w-[95vw] h-[88vh] max-h-[860px] min-h-[640px] flex flex-col p-0 rounded-2xl bg-card border-2 border-primary/30 shadow-2xl overflow-hidden focus:outline-none">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0 overflow-hidden">
          {/* PINNED HEADER SECTION - Fixed top bar */}
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
                Configure content, mentor handoffs, official definitions, visual formats, interactive exercises, and questions.
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
                <select
                  value={formData.mentor}
                  onChange={(e) => {
                    const selected = MENTOR_OPTIONS.find((m) => m.name === e.target.value);
                    setFormData({
                      ...formData,
                      mentor: e.target.value,
                      mentorRole: selected?.role || formData.mentorRole,
                    });
                  }}
                  className="mt-1 w-full h-8 rounded-lg border border-input bg-background px-2 text-xs"
                >
                  {MENTOR_OPTIONS.map((m) => (
                    <option key={m.name} value={m.name}>
                      {m.name} ({m.role})
                    </option>
                  ))}
                </select>
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

            {/* Navigation Tabs Bar */}
            <TabsList className="grid grid-cols-3 w-full h-9 bg-muted/50 p-1 rounded-xl">
              <TabsTrigger value="concept_story" className="text-xs font-semibold gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Eye className="w-3.5 h-3.5" />
                <span>1. Concept &amp; Visual Story</span>
              </TabsTrigger>
              <TabsTrigger value="interactive" className="text-xs font-semibold gap-1.5 data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                <Sliders className="w-3.5 h-3.5" />
                <span>2. Interactive Simulator</span>
              </TabsTrigger>
              <TabsTrigger value="check" className="text-xs font-semibold gap-1.5 data-[state=active]:bg-amber-600 data-[state=active]:text-white">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>3. Knowledge Check</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* SCROLLABLE BODY */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {/* ===================================================================
                TAB 1: SECTION 1 CONCEPT & VISUAL STORY
            =================================================================== */}
            <TabsContent value="concept_story" className="mt-0 space-y-6">
              {/* Section Settings & Ordering Toolbar */}
              {renderSectionCommonToolbar('section1_theory', [
                'title',
                'mentor',
                'cdacScenario',
                'content',
                'keyTakeaway',
                'formalDefinitions',
                'extraBoxes',
              ])}

              {/* Title & Mentor Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-semibold">Section 1 Header Title</Label>
                  <Input
                    value={formData.section1_theory.title}
                    onChange={(e) => updateSection1('title', e.target.value)}
                    className="mt-1 text-xs font-semibold"
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold">Mentor Name (Dropdown)</Label>
                  <select
                    value={formData.section1_theory.mentor || formData.mentor}
                    onChange={(e) => {
                      const selected = MENTOR_OPTIONS.find((m) => m.name === e.target.value);
                      updateSection1('mentor', e.target.value);
                      if (selected) updateSection1('mentorRole', selected.role);
                    }}
                    className="mt-1 w-full h-9 rounded-xl border border-input bg-background px-3 text-xs"
                  >
                    {MENTOR_OPTIONS.map((m) => (
                      <option key={m.name} value={m.name}>
                        {m.name} — {m.role}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* CDAC Scenario & Subtitle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-semibold">Operational Subtitle</Label>
                  <Input
                    value={formData.section1_theory.subtitle}
                    onChange={(e) => updateSection1('subtitle', e.target.value)}
                    className="mt-1 text-xs"
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold">CDAC Bengaluru Branch Scenario</Label>
                  <Input
                    value={formData.section1_theory.cdacScenario}
                    onChange={(e) => updateSection1('cdacScenario', e.target.value)}
                    className="mt-1 text-xs"
                  />
                </div>
              </div>

              {/* Theory Content */}
              <div>
                <Label className="text-xs font-semibold">Core Concept & Narrative (Markdown Supported)</Label>
                <textarea
                  value={formData.section1_theory.content}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    updateSection1('content', e.target.value)
                  }
                  className="mt-1 w-full rounded-xl border border-input bg-background p-2.5 min-h-[100px] text-xs font-normal leading-relaxed focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                  rows={4}
                />
              </div>

              <div>
                <Label className="text-xs font-semibold">Golden Rule / Key Takeaway</Label>
                <Input
                  value={formData.section1_theory.keyTakeaway}
                  onChange={(e) => updateSection1('keyTakeaway', e.target.value)}
                  className="mt-1 text-xs font-medium"
                />
              </div>

              {/* Terminology Scaffolding Manager */}
              <div className="space-y-3 pt-3 border-t border-border/60">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                      <span className="text-sm">💡</span> Terminology Scaffolding (Analogy • Definition • SOC Impact)
                    </Label>
                    <p className="text-[11px] text-muted-foreground">
                      Structured 3-pillar breakdown displayed in the collapsible dropdown box.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-border/80 bg-muted/20 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <Label className="text-[10px] text-muted-foreground">Core Concept / Term</Label>
                      <Input
                        value={formData.section1_theory.terminologyScaffolding?.concept || ''}
                        onChange={(e) => {
                          const current = formData.section1_theory.terminologyScaffolding || {
                            concept: formData.title,
                            analogy: '',
                            definition: '',
                            whyItMatters: '',
                          };
                          updateSection1('terminologyScaffolding', { ...current, concept: e.target.value });
                        }}
                        placeholder="e.g. SOC Tiered Hierarchy"
                        className="h-8 text-xs font-semibold"
                      />
                    </div>
                    <div>
                      <Label className="text-[10px] text-sky-500 font-semibold">1. Simple Analogy</Label>
                      <Input
                        value={formData.section1_theory.terminologyScaffolding?.analogy || ''}
                        onChange={(e) => {
                          const current = formData.section1_theory.terminologyScaffolding || {
                            concept: formData.title,
                            analogy: '',
                            definition: '',
                            whyItMatters: '',
                          };
                          updateSection1('terminologyScaffolding', { ...current, analogy: e.target.value });
                        }}
                        placeholder="Like a hospital emergency room..."
                        className="h-8 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <Label className="text-[10px] text-amber-500 font-semibold">2. Plain Definition</Label>
                      <textarea
                        value={formData.section1_theory.terminologyScaffolding?.definition || ''}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                          const current = formData.section1_theory.terminologyScaffolding || {
                            concept: formData.title,
                            analogy: '',
                            definition: '',
                            whyItMatters: '',
                          };
                          updateSection1('terminologyScaffolding', { ...current, definition: e.target.value });
                        }}
                        placeholder="Plain language technical definition..."
                        className="mt-1 w-full rounded-xl border border-input bg-background p-2 text-xs font-normal min-h-[50px]"
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label className="text-[10px] text-emerald-500 font-semibold">3. Why It Matters in SOC</Label>
                      <textarea
                        value={formData.section1_theory.terminologyScaffolding?.whyItMatters || ''}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                          const current = formData.section1_theory.terminologyScaffolding || {
                            concept: formData.title,
                            analogy: '',
                            definition: '',
                            whyItMatters: '',
                          };
                          updateSection1('terminologyScaffolding', { ...current, whyItMatters: e.target.value });
                        }}
                        placeholder="Operational triage impact on L1 shifts..."
                        className="mt-1 w-full rounded-xl border border-input bg-background p-2 text-xs font-normal min-h-[50px]"
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Official Formal Definitions Manager */}
              <div className="space-y-3 pt-2 border-t border-border/60">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                      <ExternalLink className="w-4 h-4 text-primary" /> Official Formal Definitions & Framework Citations
                    </Label>
                    <p className="text-[11px] text-muted-foreground">
                      Referenced from NIST SP 800-61, ISO 27035, MITRE ATT&CK, or CDAC Standards.
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addFormalDefinition}
                    className="text-xs h-7 gap-1 rounded-lg border-primary/30 text-primary hover:bg-primary/10"
                  >
                    <Plus className="w-3.5 h-3.5" /> + Add Definition
                  </Button>
                </div>

                {formData.section1_theory.formalDefinitions?.length === 0 ? (
                  <div className="p-3.5 rounded-xl border border-dashed border-border/80 text-center text-xs text-muted-foreground bg-muted/15">
                    No formal definitions attached yet. Click &quot;+ Add Definition&quot; to cite official standards.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {formData.section1_theory.formalDefinitions?.map((def, dIdx) => (
                      <div
                        key={def.id || dIdx}
                        className="p-3.5 rounded-xl border border-border bg-card shadow-xs space-y-2.5 relative"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-xs text-primary font-mono">Definition #{dIdx + 1}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFormalDefinition(dIdx)}
                            className="h-6 w-6 p-0 text-rose-500 hover:text-rose-700"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <div>
                            <Label className="text-[10px] text-muted-foreground">Defined Term</Label>
                            <Input
                              value={def.term}
                              onChange={(e) => updateFormalDefinition(dIdx, 'term', e.target.value)}
                              className="h-7 text-xs font-bold"
                            />
                          </div>
                          <div>
                            <Label className="text-[10px] text-muted-foreground">Official Standard Source</Label>
                            <select
                              value={def.sourceStandard}
                              onChange={(e) => updateFormalDefinition(dIdx, 'sourceStandard', e.target.value)}
                              className="h-7 w-full rounded-md border border-input bg-background px-2 text-xs"
                            >
                              <option value="NIST">NIST (SP 800-61 / CSF)</option>
                              <option value="ISO">ISO / IEC (27035 / 27001)</option>
                              <option value="MITRE">MITRE ATT&CK</option>
                              <option value="CDAC">CDAC Bengaluru Standards</option>
                              <option value="RFC">IETF RFC</option>
                              <option value="SANS">SANS Institute</option>
                              <option value="CISA">CISA Cyber Alert</option>
                              <option value="OTHER">Other Authoritative Body</option>
                            </select>
                          </div>
                          <div>
                            <Label className="text-[10px] text-muted-foreground">Citation Code / Section</Label>
                            <Input
                              value={def.citationCode || ''}
                              onChange={(e) => updateFormalDefinition(dIdx, 'citationCode', e.target.value)}
                              placeholder="e.g. SP 800-61r2 §2.1"
                              className="h-7 text-xs font-mono"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <div className="sm:col-span-2">
                            <Label className="text-[10px] text-muted-foreground">Formal Definition Text</Label>
                            <Input
                              value={def.definition}
                              onChange={(e) => updateFormalDefinition(dIdx, 'definition', e.target.value)}
                              className="h-7 text-xs"
                            />
                          </div>
                          <div>
                            <Label className="text-[10px] text-muted-foreground">Official Website URL</Label>
                            <Input
                              value={def.sourceUrl || ''}
                              onChange={(e) => updateFormalDefinition(dIdx, 'sourceUrl', e.target.value)}
                              placeholder="https://csrc.nist.gov/..."
                              className="h-7 text-xs font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Extra Boxes Manager for Theory */}
              {renderExtraBoxesManager('section1_theory')}

              {/* Sub-Section: Visual Story & Interactive Simulation Engine */}
              <div className="pt-6 border-t-2 border-primary/20 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-sky-500/15 text-sky-400 flex items-center justify-center font-bold text-xs ring-1 ring-sky-500/30">
                    <Eye className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">Interactive Visual Simulation Engine</h3>
                    <p className="text-[11px] text-muted-foreground font-mono">Telemetry Flow, Engine Format &amp; Scenario Steps</p>
                  </div>
                </div>

                {/* Visual Settings Toolbar */}
                {renderSectionCommonToolbar('section2_visual', [
                  'title',
                  'description',
                  'visualDisplay',
                  'extraBoxes',
                  'audio',
                ])}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-semibold">Visual Stage Title</Label>
                  <Input
                    value={formData.section2_visual.title}
                    onChange={(e) => updateSection2('title', e.target.value)}
                    className="mt-1 text-xs font-semibold"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <Label className="text-xs font-semibold text-purple-600 dark:text-purple-400">
                      Visual Format (Live Switchable)
                    </Label>
                    {isSwitchingFormat && (
                      <span className="text-[10px] text-purple-600 dark:text-purple-400 font-mono animate-pulse flex items-center gap-1">
                        <RotateCcw className="w-3 h-3 animate-spin" />
                        Applying...
                      </span>
                    )}
                  </div>
                  <select
                    value={formData.section2_visual.visualType}
                    onChange={(e) => handleFormatChange(e.target.value)}
                    className="mt-1 w-full h-9 rounded-xl border border-input bg-background px-3 text-xs text-foreground font-semibold"
                  >
                    <option value="animated-story">Animated Story (Stage-by-Stage Timeline)</option>
                    <option value="diagram">Architecture Diagram (Sensor & Network Topology)</option>
                    <option value="interface-tour">Interface Tour (SIEM / EDR Console Walkthrough)</option>
                    <option value="flowchart">Decision Flowchart (Incident Branching Decision Tree)</option>
                    <option value="packet-flow">Packet Flow (Network Header & Payload Timeline)</option>
                  </select>
                </div>
              </div>

              {visualFormatNotice && (
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-700 dark:text-purple-300 text-xs font-semibold animate-pulse">
                  <RotateCcw className="w-3.5 h-3.5 animate-spin text-purple-500 shrink-0" />
                  <span>{visualFormatNotice}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-semibold">Stage Description</Label>
                  <textarea
                    value={formData.section2_visual.description}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      updateSection2('description', e.target.value)
                    }
                    className="mt-1 w-full rounded-xl border border-input bg-background p-2.5 min-h-[60px] text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                    rows={2}
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold flex items-center gap-1.5">
                    <Volume2 className="w-3.5 h-3.5 text-primary" /> Audio Narration URL
                  </Label>
                  <Input
                    value={formData.section2_visual.audioUrl || ''}
                    onChange={(e) => updateSection2('audioUrl', e.target.value)}
                    placeholder="https://...narration.mp3 or /audio/..."
                    className="mt-1 text-xs font-mono"
                  />
                  <p className="text-[10px] text-muted-foreground mt-1">
                    Enables the audio playback button inside Section 2 visual stage.
                  </p>
                </div>
              </div>

              {/* Visual Steps Manager */}
              <div className="space-y-3 pt-2 border-t border-border/60">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-bold text-foreground">
                    Telemetry Steps & Sequence Timeline ({formData.section2_visual.steps?.length || 0})
                  </Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addVisualStep}
                    className="text-xs h-7 gap-1 rounded-lg border-purple-500/30 text-purple-600 dark:text-purple-300 hover:bg-purple-500/10"
                  >
                    <Plus className="w-3.5 h-3.5" /> + Add Step
                  </Button>
                </div>

                <div className="space-y-2.5">
                  {formData.section2_visual.steps?.map((step, idx) => (
                    <div
                      key={step.id || idx}
                      className="p-3 rounded-xl border border-border/80 bg-card shadow-xs space-y-2 relative"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-xs text-purple-600 dark:text-purple-400 font-mono">
                          Step #{idx + 1} • {step.stage}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeVisualStep(idx)}
                          className="h-6 w-6 p-0 text-rose-500 hover:text-rose-700"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <Input
                          value={step.title}
                          onChange={(e) => updateVisualStep(idx, 'title', e.target.value)}
                          placeholder="Step Title"
                          className="h-7 text-xs font-semibold"
                        />
                        <Input
                          value={step.stage}
                          onChange={(e) => updateVisualStep(idx, 'stage', e.target.value)}
                          placeholder="Stage Tag (e.g. Ingestion, Triage)"
                          className="h-7 text-xs font-mono"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <Input
                          value={step.description}
                          onChange={(e) => updateVisualStep(idx, 'description', e.target.value)}
                          placeholder="Step Narrative Description"
                          className="h-7 text-xs"
                        />
                        <Input
                          value={step.telemetrySnippet || ''}
                          onChange={(e) => updateVisualStep(idx, 'telemetrySnippet', e.target.value)}
                          placeholder="Telemetry Snippet (e.g. Host Name: CDAC-BLR-WS-08 | User: b_sharma | Event ID: 4625)"
                          className="h-7 text-xs font-mono"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Extra Boxes Manager for Visual */}
              {renderExtraBoxesManager('section2_visual')}
              </div>
            </TabsContent>

            {/* ===================================================================
                TAB 2: SECTION 2 INTERACTIVE SIMULATOR
            =================================================================== */}
            <TabsContent value="interactive" className="mt-0 space-y-4">
              {/* Section Settings & Ordering Toolbar */}
              {renderSectionCommonToolbar('section3_interactive', [
                'title',
                'instructions',
                'interactiveEngine',
                'extraBoxes',
              ])}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-semibold">Interactive Activity Title</Label>
                  <Input
                    value={formData.section3_interactive.title || ''}
                    onChange={(e) => updateSection3('title', e.target.value)}
                    className="mt-1 text-xs font-semibold"
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    Activity Engine Type (Live Switchable)
                  </Label>
                  <select
                    value={formData.section3_interactive.type}
                    onChange={(e) => updateSection3('type', e.target.value)}
                    className="mt-1 w-full h-9 rounded-xl border border-input bg-background px-3 text-xs text-foreground font-semibold"
                  >
                    <option value="matching">Concept / Term Matching (Connect Pairs)</option>
                    <option value="sorting">Safe / Unsafe Sorter (Category Buckets)</option>
                    <option value="clue-reveal">Clue & Evidence Reveal (Forensic Cards)</option>
                    <option value="drag-drop">Drag-and-Drop Workflow (Sequence Ordering)</option>
                    <option value="packet-trace">Packet / Event Tracer (Observable Timeline)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-semibold">Activity Instructions</Label>
                  <Input
                    value={formData.section3_interactive.instructions || ''}
                    onChange={(e) => updateSection3('instructions', e.target.value)}
                    className="mt-1 text-xs"
                  />
                </div>
                <div>
                  <Label className="text-xs font-semibold">Operational Scenario Context</Label>
                  <Input
                    value={formData.section3_interactive.scenario || ''}
                    onChange={(e) => updateSection3('scenario', e.target.value)}
                    className="mt-1 text-xs"
                  />
                </div>
              </div>

              {/* Interactive Items Manager */}
              <div className="space-y-3 pt-2 border-t border-border/60">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-bold text-foreground">
                    Interactive Items & Observables ({formData.section3_interactive.items?.length || 0})
                  </Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addInteractiveItem}
                    className="text-xs h-7 gap-1 rounded-lg border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10"
                  >
                    <Plus className="w-3.5 h-3.5" /> + Add Item
                  </Button>
                </div>

                <div className="space-y-2.5">
                  {formData.section3_interactive.items?.map((item, idx) => (
                    <div
                      key={item.id || idx}
                      className="p-3 rounded-xl border border-border/80 bg-card shadow-xs space-y-2 relative"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-xs text-emerald-600 dark:text-emerald-400 font-mono">
                          Item #{idx + 1}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeInteractiveItem(idx)}
                          className="h-6 w-6 p-0 text-rose-500 hover:text-rose-700"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div className="sm:col-span-2">
                          <Input
                            value={item.label}
                            onChange={(e) => updateInteractiveItem(idx, 'label', e.target.value)}
                            placeholder="Observable / Entity (e.g. Host Name: CDAC-BLR-WS-08 | IP: 10.0.4.15)"
                            className="h-7 text-xs font-semibold"
                          />
                        </div>
                        <div>
                          <Input
                            value={item.category || ''}
                            onChange={(e) => updateInteractiveItem(idx, 'category', e.target.value)}
                            placeholder="Category / Bucket"
                            className="h-7 text-xs font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <Input
                          value={item.summary}
                          onChange={(e) => updateInteractiveItem(idx, 'summary', e.target.value)}
                          placeholder="Summary / Investigative Action description"
                          className="h-7 text-xs text-muted-foreground"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Extra Boxes Manager */}
              {renderExtraBoxesManager('section3_interactive')}
            </TabsContent>

            {/* ===================================================================
                TAB 3: SECTION 3 KNOWLEDGE CHECK
            =================================================================== */}
            <TabsContent value="check" className="mt-0 space-y-4">
              {/* Section Settings & Ordering Toolbar */}
              {renderSectionCommonToolbar('section4_knowledgeCheck', [
                'title',
                'questions',
                'extraBoxes',
              ])}

              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <Label className="text-xs font-bold text-foreground">
                    Knowledge Check Questions ({formData.section4_knowledgeCheck.questions?.length || 0})
                  </Label>
                  <p className="text-[11px] text-muted-foreground">
                    Supports multiple formats: MCQ, Match the Following, Drag-and-Drop, and Direct Input Value.
                  </p>
                </div>

                <div className="flex items-center gap-1.5 flex-wrap">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addQuestion('mcq')}
                    className="text-xs h-7 gap-1 rounded-lg border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10"
                  >
                    <Plus className="w-3.5 h-3.5" /> + MCQ
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addQuestion('matching')}
                    className="text-xs h-7 gap-1 rounded-lg border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10"
                  >
                    <Plus className="w-3.5 h-3.5" /> + Match Pairs
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addQuestion('drag-drop')}
                    className="text-xs h-7 gap-1 rounded-lg border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10"
                  >
                    <Plus className="w-3.5 h-3.5" /> + Drag & Drop
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addQuestion('input-value')}
                    className="text-xs h-7 gap-1 rounded-lg border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10"
                  >
                    <Plus className="w-3.5 h-3.5" /> + Input Value
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {formData.section4_knowledgeCheck.questions?.map((q, qIdx) => {
                  const qType: QuestionType = q.type || 'mcq';

                  return (
                    <div
                      key={q.id || qIdx}
                      className="p-4 rounded-xl border border-border bg-card shadow-xs space-y-3 relative"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-amber-600 dark:text-amber-400 font-mono">
                            Question #{qIdx + 1}
                          </span>
                          <select
                            value={qType}
                            onChange={(e) => updateQuestion(qIdx, 'type', e.target.value as QuestionType)}
                            className="h-6 rounded-md border border-input bg-background px-2 text-[10px] font-mono font-bold uppercase text-primary"
                          >
                            <option value="mcq">MCQ</option>
                            <option value="matching">Match Following</option>
                            <option value="drag-drop">Drag & Drop</option>
                            <option value="input-value">Input Value</option>
                          </select>
                        </div>

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
                        <Label className="text-[11px] text-muted-foreground">Question Prompt</Label>
                        <Input
                          value={q.question}
                          onChange={(e) => updateQuestion(qIdx, 'question', e.target.value)}
                          className="mt-0.5 h-7 text-xs font-semibold"
                        />
                      </div>

                      {/* Render type-specific options editor */}
                      {qType === 'mcq' && (
                        <div className="space-y-1.5 pt-1">
                          <Label className="text-[10px] text-muted-foreground">
                            Options (Select radio for correct answer):
                          </Label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {q.options.map((opt, optIdx) => (
                              <div key={optIdx} className="flex items-center gap-1.5">
                                <input
                                  type="radio"
                                  name={`correct-ch-${qIdx}`}
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
                        </div>
                      )}

                      {qType === 'matching' && (
                        <div className="space-y-2 pt-1">
                          <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                            <span>Matching Pairs (Left Key & Right Value):</span>
                            <button
                              type="button"
                              onClick={() => {
                                const currentPairs = q.matchingPairs || [];
                                updateQuestion(qIdx, 'matchingPairs', [
                                  ...currentPairs,
                                  { id: String(Date.now()), left: 'Term', right: 'Definition' },
                                ]);
                              }}
                              className="text-primary hover:underline font-semibold cursor-pointer"
                            >
                              + Add Pair
                            </button>
                          </div>

                          {(q.matchingPairs || []).map((pair, pIdx) => (
                            <div key={pair.id || pIdx} className="flex items-center gap-2">
                              <Input
                                value={pair.left}
                                onChange={(e) => {
                                  const currentPairs = [...(q.matchingPairs || [])];
                                  currentPairs[pIdx].left = e.target.value;
                                  updateQuestion(qIdx, 'matchingPairs', currentPairs);
                                }}
                                placeholder="Left Term"
                                className="h-7 text-xs flex-1"
                              />
                              <span className="text-muted-foreground text-xs">↔</span>
                              <Input
                                value={pair.right}
                                onChange={(e) => {
                                  const currentPairs = [...(q.matchingPairs || [])];
                                  currentPairs[pIdx].right = e.target.value;
                                  updateQuestion(qIdx, 'matchingPairs', currentPairs);
                                }}
                                placeholder="Right Match"
                                className="h-7 text-xs flex-1"
                              />
                              {(q.matchingPairs || []).length > 2 && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    const currentPairs = (q.matchingPairs || []).filter((_, i) => i !== pIdx);
                                    updateQuestion(qIdx, 'matchingPairs', currentPairs);
                                  }}
                                  className="text-rose-500 hover:text-rose-700 p-1"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {qType === 'drag-drop' && (
                        <div className="space-y-2 pt-1">
                          <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                            <span>Draggable Tokens and Target Buckets:</span>
                            <button
                              type="button"
                              onClick={() => {
                                const currentItems = q.dragDropItems || [];
                                updateQuestion(qIdx, 'dragDropItems', [
                                  ...currentItems,
                                  { id: String(Date.now()), token: 'New Token', targetSlot: 'Target Bucket' },
                                ]);
                              }}
                              className="text-primary hover:underline font-semibold cursor-pointer"
                            >
                              + Add Token
                            </button>
                          </div>

                          {(q.dragDropItems || []).map((item, dIdx) => (
                            <div key={item.id || dIdx} className="flex items-center gap-2">
                              <Input
                                value={item.token}
                                onChange={(e) => {
                                  const currentItems = [...(q.dragDropItems || [])];
                                  currentItems[dIdx].token = e.target.value;
                                  updateQuestion(qIdx, 'dragDropItems', currentItems);
                                }}
                                placeholder="Draggable Token (e.g. Event ID 4625)"
                                className="h-7 text-xs flex-1"
                              />
                              <span className="text-muted-foreground text-xs">→</span>
                              <Input
                                value={item.targetSlot}
                                onChange={(e) => {
                                  const currentItems = [...(q.dragDropItems || [])];
                                  currentItems[dIdx].targetSlot = e.target.value;
                                  updateQuestion(qIdx, 'dragDropItems', currentItems);
                                }}
                                placeholder="Target Bucket (e.g. Failed Logon)"
                                className="h-7 text-xs flex-1 font-mono"
                              />
                              {(q.dragDropItems || []).length > 2 && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    const currentItems = (q.dragDropItems || []).filter((_, i) => i !== dIdx);
                                    updateQuestion(qIdx, 'dragDropItems', currentItems);
                                  }}
                                  className="text-rose-500 hover:text-rose-700 p-1"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {qType === 'input-value' && (
                        <div className="space-y-2 pt-1">
                          <Label className="text-[10px] text-muted-foreground">
                            Accepted Correct Answers (Comma-separated exact strings):
                          </Label>
                          <Input
                            value={(q.acceptedAnswers || []).join(', ')}
                            onChange={(e) => {
                              const list = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                              updateQuestion(qIdx, 'acceptedAnswers', list);
                            }}
                            placeholder="4624, Event 4624, 0x120e"
                            className="h-7 text-xs font-mono"
                          />
                        </div>
                      )}

                      <div>
                        <Label className="text-[11px] text-muted-foreground">Explanation / Rationale</Label>
                        <Input
                          value={q.explanation}
                          onChange={(e) => updateQuestion(qIdx, 'explanation', e.target.value)}
                          className="mt-0.5 h-7 text-xs text-muted-foreground"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Extra Boxes Manager */}
              {renderExtraBoxesManager('section4_knowledgeCheck')}
            </TabsContent>
          </div>
        </Tabs>

        {/* PINNED FOOTER */}
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
