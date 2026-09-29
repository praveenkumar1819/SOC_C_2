'use client';

import { useState } from 'react';
import {
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Search,
  FileText,
  User,
  Terminal,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useProgressStore } from '@/store/progress-store';
import { useToast } from '@/components/ui/toast-provider';

export interface TriageScenario {
  id: string;
  alertName: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  scenarioText: string;
  evidenceItems: {
    label: string;
    value: string;
    insight: string;
  }[];
  correctVerdict: 'TRUE_POSITIVE' | 'FALSE_POSITIVE';
  rationale: string;
  analystAction: string;
}

interface TpFpTriageProps {
  scenario: TriageScenario;
  xpReward?: number;
  onComplete?: () => void;
}

export function TpFpTriage({
  scenario,
  xpReward = 50,
  onComplete,
}: TpFpTriageProps) {
  const [selectedVerdict, setSelectedVerdict] = useState<'TRUE_POSITIVE' | 'FALSE_POSITIVE' | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const addXP = useProgressStore((state) => state.addXP);
  const { showToast } = useToast();

  const isCorrect = selectedVerdict === scenario.correctVerdict;

  const handleSubmit = (verdict: 'TRUE_POSITIVE' | 'FALSE_POSITIVE') => {
    if (submitted) return;
    setSelectedVerdict(verdict);
    setSubmitted(true);

    if (verdict === scenario.correctVerdict) {
      addXP(xpReward);
      showToast({
        type: 'success',
        title: 'Triage Verdict Accurate!',
        description: `+${xpReward} XP awarded for evidence analysis.`,
      });
      if (onComplete) onComplete();
    }
  };

  const handleReset = () => {
    setSelectedVerdict(null);
    setSubmitted(false);
  };

  return (
    <Card className="border-2 border-primary/20 bg-card overflow-hidden shadow-xs">
      <CardHeader className="bg-primary/5 pb-3">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 text-[10px] font-bold uppercase tracking-wider">
            SOC Alert Triage: True Positive vs False Positive
          </Badge>
          <span className="text-xs font-semibold text-primary">+{xpReward} XP</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <CardTitle className="text-base font-bold text-foreground">{scenario.alertName}</CardTitle>
          <Badge className={
            scenario.severity === 'HIGH' || scenario.severity === 'CRITICAL'
              ? 'bg-rose-100 text-rose-800'
              : 'bg-amber-100 text-amber-800'
          }>
            {scenario.severity}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-5 space-y-4">
        {/* Scenario Context */}
        <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-medium">
          {scenario.scenarioText}
        </p>

        {/* Evidence Artifacts Table */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5 text-primary" />
            Forensic Evidence Captured
          </span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {scenario.evidenceItems.map((item, idx) => (
              <div key={idx} className="p-2.5 rounded-lg border bg-muted/20 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground">{item.label}</span>
                  <code className="text-[11px] bg-background px-1.5 py-0.5 rounded border font-mono text-primary font-bold">
                    {item.value}
                  </code>
                </div>
                <p className="text-[11px] text-muted-foreground leading-snug">{item.insight}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Triage Question */}
        <div className="pt-2 border-t space-y-3">
          <p className="text-xs font-bold text-foreground">
            Evaluate the evidence: Does this alert represent actual malicious activity or legitimate normal behavior?
          </p>

          {!submitted ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => handleSubmit('TRUE_POSITIVE')}
                className="h-14 border-2 border-rose-200 hover:border-rose-500 hover:bg-rose-50 flex flex-col items-center justify-center p-2"
              >
                <span className="font-bold text-xs text-rose-700 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4" />
                  True Positive (TP)
                </span>
                <span className="text-[10px] text-muted-foreground">Malicious threat / Security incident confirmed</span>
              </Button>

              <Button
                variant="outline"
                onClick={() => handleSubmit('FALSE_POSITIVE')}
                className="h-14 border-2 border-emerald-200 hover:border-emerald-500 hover:bg-emerald-50 flex flex-col items-center justify-center p-2"
              >
                <span className="font-bold text-xs text-emerald-700 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  False Positive (FP)
                </span>
                <span className="text-[10px] text-muted-foreground">Benign activity / User error / Expected behavior</span>
              </Button>
            </div>
          ) : (
            <div className="space-y-3 animate-fade-in">
              <div className={`p-4 rounded-xl border text-xs leading-relaxed space-y-2 ${
                isCorrect ? 'bg-emerald-50 border-emerald-300 text-emerald-950' : 'bg-rose-50 border-rose-300 text-rose-950'
              }`}>
                <div className="flex items-center gap-2 font-bold text-sm">
                  {isCorrect ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <AlertTriangle className="w-5 h-5 text-rose-600" />}
                  <span>{isCorrect ? 'Accurate Triage Decision! 🎯' : 'Incorrect Classification'}</span>
                </div>
                <div>
                  <strong>Analyst Rationale: </strong>
                  {scenario.rationale}
                </div>
                <div className="pt-2 border-t border-border/40 text-[11px]">
                  <strong>Recommended L1 Playbook Action: </strong>
                  {scenario.analystAction}
                </div>
              </div>

              {!isCorrect && (
                <Button variant="outline" onClick={handleReset} className="w-full text-xs" size="sm">
                  <RotateCcw className="w-3.5 h-3.5 mr-1" />
                  Re-evaluate Evidence
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
