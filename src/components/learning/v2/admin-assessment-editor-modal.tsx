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
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/toast-provider';
import { V2UnitAssessment, QuestionItem } from '@/data/curriculum-v2-data';
import {
  Save,
  Plus,
  Trash2,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  Clock,
  Award,
} from 'lucide-react';

interface AdminAssessmentEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  assessment: V2UnitAssessment;
  unitNumber: number;
  onSaveSuccess: (updated: V2UnitAssessment) => void;
}

export function AdminAssessmentEditorModal({
  isOpen,
  onClose,
  assessment,
  unitNumber,
  onSaveSuccess,
}: AdminAssessmentEditorModalProps) {
  const { showToast } = useToast();
  const [formData, setFormData] = useState<V2UnitAssessment>(() =>
    JSON.parse(JSON.stringify(assessment))
  );
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setFormData(JSON.parse(JSON.stringify(assessment)));
  }, [assessment]);

  const handleFieldChange = (key: keyof V2UnitAssessment, val: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const handleAddQuestion = () => {
    const newQ: QuestionItem = {
      id: `q-${Date.now()}`,
      question: 'New scenario assessment question?',
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: 0,
      explanation: 'Explanation justifying the correct operational response.',
    };
    setFormData((prev) => ({
      ...prev,
      questions: [...prev.questions, newQ],
    }));
  };

  const handleRemoveQuestion = (qIdx: number) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== qIdx),
    }));
  };

  const handleUpdateQuestion = (qIdx: number, field: keyof QuestionItem, val: any) => {
    setFormData((prev) => {
      const qList = [...prev.questions];
      qList[qIdx] = {
        ...qList[qIdx],
        [field]: val,
      };
      return { ...prev, questions: qList };
    });
  };

  const handleAddOption = (qIdx: number) => {
    setFormData((prev) => {
      const qList = [...prev.questions];
      const targetQ = { ...qList[qIdx] };
      targetQ.options = [...targetQ.options, `Option ${String.fromCharCode(65 + targetQ.options.length)}`];
      qList[qIdx] = targetQ;
      return { ...prev, questions: qList };
    });
  };

  const handleRemoveOption = (qIdx: number, optIdx: number) => {
    setFormData((prev) => {
      const qList = [...prev.questions];
      const targetQ = { ...qList[qIdx] };
      if (targetQ.options.length <= 2) return prev; // Keep at least 2 options
      targetQ.options = targetQ.options.filter((_, i) => i !== optIdx);
      if (typeof targetQ.correctAnswer === 'number' && targetQ.correctAnswer >= targetQ.options.length) {
        targetQ.correctAnswer = 0;
      }
      qList[qIdx] = targetQ;
      return { ...prev, questions: qList };
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/curriculum/assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assessmentId: assessment.id,
          assessmentData: formData,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to update assessment');
      }

      showToast({
        type: 'success',
        title: 'Assessment Updated in Real-Time! 🎯',
        description: `Questions and passing rules for "${formData.title}" are now live for all students.`,
      });

      onSaveSuccess(formData);
      onClose();
    } catch (err: any) {
      showToast({
        type: 'error',
        title: 'Save Failed',
        description: err.message || 'Could not update assessment',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl w-[95vw] h-[86vh] max-h-[840px] min-h-[600px] flex flex-col p-0 rounded-2xl bg-card border-2 border-primary/30 shadow-2xl overflow-hidden focus:outline-none">
        {/* Pinned Header */}
        <div className="p-6 pb-3 border-b border-border/70 shrink-0 space-y-2 bg-card/95 backdrop-blur-md">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <Badge className="bg-primary text-white text-[10px] font-mono font-bold">
                ADMIN ASSESSMENT CONSOLE
              </Badge>
              <span className="text-xs text-muted-foreground font-mono">Unit {unitNumber} • {assessment.id}</span>
            </div>
            <DialogTitle className="text-xl font-bold text-foreground">
              Edit Unit Assessment: {formData.title}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Modify scenario questions, options, passing threshold, and explanations in real-time.
            </DialogDescription>
          </DialogHeader>

          {/* Assessment Global Parameters */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 p-3 rounded-xl bg-muted/40 border border-border/60 text-xs">
            <div className="sm:col-span-2">
              <Label className="text-[11px] font-semibold text-muted-foreground">Assessment Title</Label>
              <Input
                value={formData.title}
                onChange={(e) => handleFieldChange('title', e.target.value)}
                className="mt-1 h-8 text-xs font-semibold"
              />
            </div>
            <div>
              <Label className="text-[11px] font-semibold text-muted-foreground">Passing Score (%)</Label>
              <Input
                type="number"
                value={formData.passingScore || 80}
                onChange={(e) => handleFieldChange('passingScore', parseInt(e.target.value, 10) || 80)}
                className="mt-1 h-8 text-xs font-mono"
              />
            </div>
            <div>
              <Label className="text-[11px] font-semibold text-muted-foreground">Duration (Minutes)</Label>
              <Input
                type="number"
                value={formData.duration || 15}
                onChange={(e) => handleFieldChange('duration', parseInt(e.target.value, 10) || 15)}
                className="mt-1 h-8 text-xs font-mono"
              />
            </div>
          </div>
        </div>

        {/* Scrollable Questions Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" />
                Assessment Questions ({formData.questions.length})
              </h3>
              <p className="text-[11px] text-muted-foreground">
                All questions must be answered by students to earn unit mastery credit.
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddQuestion}
              className="text-xs h-8 gap-1.5 rounded-xl border-primary/30 text-primary hover:bg-primary/10"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Question</span>
            </Button>
          </div>

          <div className="space-y-4">
            {formData.questions.map((q, qIdx) => (
              <div
                key={q.id || qIdx}
                className="p-4 sm:p-5 rounded-2xl border border-border/80 bg-background/70 shadow-xs space-y-3 relative"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-primary font-mono uppercase tracking-wider">
                    Question #{qIdx + 1}
                  </span>
                  {formData.questions.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveQuestion(qIdx)}
                      className="h-7 w-7 p-0 text-rose-500 hover:text-rose-700 hover:bg-rose-500/10"
                      title="Delete Question"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                <div>
                  <Label className="text-[11px] text-muted-foreground">Scenario Question Prompt</Label>
                  <textarea
                    value={q.question}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      handleUpdateQuestion(qIdx, 'question', e.target.value)
                    }
                    className="mt-1 w-full rounded-xl border border-input bg-background p-2.5 text-xs font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary min-h-[50px]"
                    rows={2}
                  />
                </div>

                {/* Options List */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                    <span>Select the radio button corresponding to the correct answer:</span>
                    <button
                      type="button"
                      onClick={() => handleAddOption(qIdx)}
                      className="text-primary hover:underline text-[11px] font-semibold cursor-pointer"
                    >
                      + Add Option
                    </button>
                  </div>

                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => {
                      const isCorrect = q.correctAnswer === optIdx;
                      return (
                        <div
                          key={optIdx}
                          className={`flex items-center gap-2 p-2 rounded-xl border transition-all ${
                            isCorrect
                              ? 'border-emerald-500/80 bg-emerald-500/10 dark:bg-emerald-950/20'
                              : 'border-border/60 bg-muted/20'
                          }`}
                        >
                          <input
                            type="radio"
                            name={`correct-assessment-q-${qIdx}`}
                            checked={isCorrect}
                            onChange={() => handleUpdateQuestion(qIdx, 'correctAnswer', optIdx)}
                            className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                          />
                          <Input
                            value={opt}
                            onChange={(e) => {
                              const updatedOptions = [...q.options];
                              updatedOptions[optIdx] = e.target.value;
                              handleUpdateQuestion(qIdx, 'options', updatedOptions);
                            }}
                            className="h-7 text-xs flex-1 bg-transparent border-0 focus-visible:ring-1"
                          />
                          {q.options.length > 2 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveOption(qIdx, optIdx)}
                              className="h-6 w-6 p-0 text-muted-foreground hover:text-rose-500"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <Label className="text-[11px] text-muted-foreground">Explanation / SOP Rationale</Label>
                  <textarea
                    value={q.explanation}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      handleUpdateQuestion(qIdx, 'explanation', e.target.value)
                    }
                    className="mt-1 w-full rounded-xl border border-input bg-background p-2.5 text-xs text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary min-h-[40px]"
                    rows={2}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pinned Footer */}
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
            {isSaving ? 'Saving Changes...' : 'Save & Publish Assessment'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
