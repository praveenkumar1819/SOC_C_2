'use client';

import { useState } from 'react';
import {
  MousePointerClick,
  User,
  Globe,
  FileCode2,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export interface InvestigationEvidenceCard {
  id: string;
  category: 'User' | 'Source IP' | 'Event ID' | 'Timeline';
  label: string;
  summary: string;
  detailedFindings: string;
  severityIndicator: 'Normal' | 'Suspicious' | 'Malicious';
}

interface InteractiveInvestigationProps {
  title?: string;
  scenarioDescription?: string;
  cards?: InvestigationEvidenceCard[];
  onComplete?: () => void;
}

const DEFAULT_CARDS: InvestigationEvidenceCard[] = [
  {
    id: 'ev-user',
    category: 'User',
    label: 'Target Account: a.chen (Finance Dept)',
    summary: 'Standard user account with access to billing databases. Last successful logon was 2 hours ago from corporate subnet.',
    detailedFindings: 'User baseline shows regular 9 AM - 5 PM EST activity. This authentication attempt took place at 03:14 AM EST (outside baseline). No travel request on record.',
    severityIndicator: 'Suspicious',
  },
  {
    id: 'ev-ip',
    category: 'Source IP',
    label: 'Source IP: 198.51.100.42 (Public WAN)',
    summary: 'External non-RFC1918 address resolving to an unallocated hosting provider with poor reputation score.',
    detailedFindings: 'AbuseIPDB reputation: 84% malicious confidence. Reported by 37 other organizations in the last 24h for SSH and RDP scanning. Tor exit node flag confirmed.',
    severityIndicator: 'Malicious',
  },
  {
    id: 'ev-event',
    category: 'Event ID',
    label: 'Windows Security Event ID: 4625 (Logon Failure)',
    summary: 'Audit Failure logged with SubStatus 0xC000006A (user name exists, but password was incorrect).',
    detailedFindings: 'LogonType: 3 (Network logon through SSL VPN endpoint). Process: winlogon.exe. Repeated 14 times with rapid username variations within 30 seconds.',
    severityIndicator: 'Malicious',
  },
  {
    id: 'ev-timeline',
    category: 'Timeline',
    label: 'Correlated Event Timeline',
    summary: '03:14:02 to 03:14:32: 14 failed attempts followed by silence. No subsequent Event 4624 (Logon Success).',
    detailedFindings: 'Because no successful logon occurred, the credential spray failed to penetrate the perimeter. Immediate response: Firewall block on source IP and alert targeted user.',
    severityIndicator: 'Suspicious',
  },
];

export function InteractiveInvestigation({
  title = 'Interactive Investigation: Examine Suspicious Login Evidence',
  scenarioDescription = 'Click each evidence card to inspect forensic artifacts. Examine all 4 data sources to reach a verified analyst conclusion.',
  cards = DEFAULT_CARDS,
  onComplete,
}: InteractiveInvestigationProps) {
  const [inspectedCards, setInspectedCards] = useState<string[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(cards[0]?.id || null);
  const [decisionMade, setDecisionMade] = useState<'TP' | 'FP' | null>(null);

  const inspectedCount = inspectedCards.length;
  const totalCount = cards.length;
  const allInspected = inspectedCount === totalCount;
  const progressPercent = Math.round((inspectedCount / totalCount) * 100);

  const handleCardClick = (id: string) => {
    setSelectedCardId(id);
    if (!inspectedCards.includes(id)) {
      const next = [...inspectedCards, id];
      setInspectedCards(next);
      if (next.length === totalCount && onComplete) {
        onComplete();
      }
    }
  };

  const selectedCard = cards.find((c) => c.id === selectedCardId) || cards[0];

  const categoryIcons = {
    User: User,
    'Source IP': Globe,
    'Event ID': FileCode2,
    Timeline: Clock,
  };

  return (
    <Card className="border-2 border-emerald-500/20 bg-card overflow-hidden shadow-xs">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b bg-emerald-500/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-700 border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider">
              <MousePointerClick className="w-3 h-3 mr-1" />
              INTERACTIVE — HANDS-ON INVESTIGATION
            </Badge>
            <span className="text-xs font-semibold text-emerald-700">
              Progress: {inspectedCount} / {totalCount} Artifacts Inspected
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-foreground mt-1">{title}</h3>
          <p className="text-xs text-muted-foreground">{scenarioDescription}</p>
        </div>

        {/* Small completion indicator */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {allInspected ? (
            <Badge className="bg-emerald-600 text-white gap-1 text-xs py-1 px-2.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Artifacts Complete</span>
            </Badge>
          ) : (
            <div className="w-32 space-y-1">
              <div className="flex justify-between text-[11px] text-muted-foreground font-medium">
                <span>Investigating</span>
                <span>{progressPercent}%</span>
              </div>
              <Progress value={progressPercent} className="h-1.5" />
            </div>
          )}
        </div>
      </div>

      <CardContent className="p-4 sm:p-6 space-y-5">
        {/* Interactive Evidence Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {cards.map((card) => {
            const isInspected = inspectedCards.includes(card.id);
            const isSelected = selectedCardId === card.id;
            const Icon = categoryIcons[card.category] || HelpCircle;

            return (
              <button
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                className={`text-left p-4 rounded-xl border-2 transition-all relative flex flex-col justify-between h-36 ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-md ring-2 ring-emerald-500/20'
                    : isInspected
                    ? 'border-emerald-300 bg-card hover:border-emerald-400'
                    : 'border-border/70 bg-muted/20 hover:border-emerald-400/50 hover:bg-muted/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    {isInspected && (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Reviewed
                      </span>
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-foreground mt-2 truncate">{card.category}</h4>
                  <p className="text-[11px] text-muted-foreground line-clamp-2 mt-0.5">{card.label}</p>
                </div>

                <div className="pt-2 border-t border-border/40 flex items-center justify-between text-[10px]">
                  <span className="text-muted-foreground">Click to inspect</span>
                  <span className={`font-bold ${
                    card.severityIndicator === 'Malicious'
                      ? 'text-rose-600'
                      : card.severityIndicator === 'Suspicious'
                      ? 'text-amber-600'
                      : 'text-emerald-600'
                  }`}>
                    {card.severityIndicator}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Evidence Detail Box */}
        {selectedCard && (
          <div className="p-4 sm:p-5 rounded-xl border-2 border-emerald-500/30 bg-muted/20 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-emerald-100 text-emerald-800 border-emerald-300 font-bold text-xs">
                  {selectedCard.category} Artifact
                </Badge>
                <span className="text-xs font-bold text-foreground">{selectedCard.label}</span>
              </div>
              <Badge className={
                selectedCard.severityIndicator === 'Malicious'
                  ? 'bg-rose-100 text-rose-800 border-rose-300'
                  : selectedCard.severityIndicator === 'Suspicious'
                  ? 'bg-amber-100 text-amber-800 border-amber-300'
                  : 'bg-emerald-100 text-emerald-800 border-emerald-300'
              }>
                Indicator: {selectedCard.severityIndicator}
              </Badge>
            </div>

            <div className="space-y-2 text-xs sm:text-sm">
              <p className="text-foreground/90 font-medium">
                {selectedCard.summary}
              </p>
              <div className="p-3 rounded-lg bg-card border text-xs leading-relaxed text-muted-foreground">
                <strong className="text-foreground block mb-0.5">Analyst Inspection Notes:</strong>
                {selectedCard.detailedFindings}
              </div>
            </div>
          </div>
        )}

        {/* Analyst Decision Block (Unlocked when all artifacts inspected) */}
        {allInspected && (
          <div className="p-4 rounded-xl border-2 border-primary/30 bg-primary/5 space-y-3 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-foreground flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-primary" />
                  All Evidence Gathered — Make Your Triage Decision
                </h4>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Based on the 4 artifacts (unusual time, Tor exit node, rapid spray attempts, no success), is this alert a True Positive or False Positive?
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              <Button
                variant={decisionMade === 'TP' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDecisionMade('TP')}
                className="gap-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                True Positive (Malicious Spray Attack)
              </Button>
              <Button
                variant={decisionMade === 'FP' ? 'destructive' : 'outline'}
                size="sm"
                onClick={() => setDecisionMade('FP')}
                className="gap-1.5 text-xs font-bold"
              >
                <AlertCircle className="w-3.5 h-3.5" />
                False Positive (Benign User Mistake)
              </Button>
            </div>

            {decisionMade === 'TP' && (
              <div className="p-3 rounded-lg bg-emerald-100/60 border border-emerald-300 text-xs text-emerald-900 font-medium">
                ✅ <strong>Correct Analyst Verdict:</strong> This is a True Positive! While no breach occurred, the incoming connection originated from a Tor exit node and launched automated multi-user spray attempts. The alert correctly detected hostile adversary activity. Recommended action: Firewall IP drop & password policy review.
              </div>
            )}

            {decisionMade === 'FP' && (
              <div className="p-3 rounded-lg bg-rose-100/60 border border-rose-300 text-xs text-rose-900 font-medium">
                ❌ <strong>Incorrect Verdict:</strong> A user mistyping their password on a corporate laptop does not originate from an external Tor IP across multiple accounts. The evidence confirms active hostile password spraying (True Positive).
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
