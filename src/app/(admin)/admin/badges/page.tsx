import { db } from '@/lib/db';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminBadgesPage() {
  const badges = [
    {
      id: 'badge-1',
      name: 'First Response',
      description: 'Awarded for completing Module 00: Course Orientation & SOC Foundations.',
      category: 'ORIENTATION',
      tier: 'BRONZE',
      xpRequired: 100,
      icon: 'ShieldCheck',
      activeRecipients: 24,
    },
    {
      id: 'badge-2',
      name: 'Network Defender',
      description: 'Mastered packet analysis, OSI layers, and network security controls.',
      category: 'NETWORKING',
      tier: 'BRONZE',
      xpRequired: 250,
      icon: 'Network',
      activeRecipients: 18,
    },
    {
      id: 'badge-3',
      name: 'Security Essentials',
      description: 'Demonstrated proficiency in CIA triad, threat modeling, and defense-in-depth.',
      category: 'CYBER_FUNDAMENTALS',
      tier: 'SILVER',
      xpRequired: 500,
      icon: 'Lock',
      activeRecipients: 15,
    },
    {
      id: 'badge-4',
      name: 'Alert Triage Ready',
      description: 'Completed Module 04: SOC Operations and passed triage simulation with 70%+ score.',
      category: 'SOC_OPERATIONS',
      tier: 'GOLD',
      xpRequired: 800,
      icon: 'Sparkles',
      activeRecipients: 12,
    },
    {
      id: 'badge-5',
      name: 'False Positive Master',
      description: 'Accurately classified 10+ benign events without creating false alarms.',
      category: 'INVESTIGATION',
      tier: 'SILVER',
      xpRequired: 1000,
      icon: 'CheckCircle2',
      activeRecipients: 9,
    },
    {
      id: 'badge-6',
      name: 'SOC Analyst L1 Certified',
      description: 'Cap-stone certification awarded upon completing all 18 curriculum modules.',
      category: 'CERTIFICATION',
      tier: 'PLATINUM',
      xpRequired: 5000,
      icon: 'Award',
      activeRecipients: 4,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>Gamification & Recognition</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            Badge Management ({badges.length})
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Configure platform credentials, XP milestones, and achievement unlock criteria.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {badges.map((b) => (
          <Card key={b.id} className="border border-border/80 shadow-xs hover:border-border transition-all">
            <CardHeader className="pb-3 border-b border-border/60">
              <div className="flex items-center justify-between">
                <Badge
                  variant="outline"
                  className={
                    b.tier === 'PLATINUM'
                      ? 'bg-purple-50 text-purple-700 border-purple-200 text-[10px] font-mono'
                      : b.tier === 'GOLD'
                      ? 'bg-amber-50 text-amber-700 border-amber-200 text-[10px] font-mono'
                      : 'bg-slate-50 text-slate-700 border-slate-200 text-[10px] font-mono'
                  }
                >
                  {b.tier} TIER
                </Badge>
                <span className="text-xs font-mono font-bold text-primary">
                  {b.xpRequired} XP
                </span>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <CardTitle className="text-base font-bold text-foreground">{b.name}</CardTitle>
                  <p className="text-[11px] text-muted-foreground font-mono">{b.category}</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-4 space-y-3">
              <p className="text-xs text-muted-foreground leading-relaxed">
                {b.description}
              </p>
              <div className="flex items-center justify-between text-xs pt-2 border-t border-border/60">
                <span className="text-muted-foreground">Active Holders:</span>
                <span className="font-semibold text-foreground font-mono">{b.activeRecipients} Analysts</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
