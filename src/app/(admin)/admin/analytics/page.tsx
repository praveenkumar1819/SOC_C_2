import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart3, TrendingUp, Users, CheckCircle2, Clock } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminAnalyticsPage() {
  const cohortMetrics = [
    { label: 'Module 00 - Course Orientation', rate: 95 },
    { label: 'Module 01 - Computer Fundamentals', rate: 82 },
    { label: 'Module 02 - Networking Fundamentals', rate: 76 },
    { label: 'Module 03 - Cybersecurity Fundamentals', rate: 71 },
    { label: 'Module 04 - SOC Operations', rate: 64 },
    { label: 'Module 05 - SIEM', rate: 45 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-primary font-semibold text-xs tracking-wider uppercase">
          <BarChart3 className="w-4 h-4" />
          <span>Performance Insights</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Platform Analytics
        </h1>
        <p className="text-sm text-muted-foreground">
          Analyze learner progression, drop-off rates, and scenario investigation scores.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">Average Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">72.4%</div>
            <p className="text-xs text-muted-foreground mt-1">Across unlocked foundational modules</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">Mean Time Per Module</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">6.8 Hours</div>
            <p className="text-xs text-muted-foreground mt-1">Consistent with curriculum estimates</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">Scenario First-Pass Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">84.2%</div>
            <p className="text-xs text-muted-foreground mt-1">Investigation decision tree accuracy</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Module Completion Cohort Funnel</CardTitle>
          <CardDescription className="text-xs">
            Percentage of active learners successfully completing each progressive module
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {cohortMetrics.map((item) => (
            <div key={item.label} className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-foreground">{item.label}</span>
                <span className="font-semibold text-muted-foreground">{item.rate}%</span>
              </div>
              <Progress value={item.rate} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
