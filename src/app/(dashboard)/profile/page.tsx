import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, Mail, Shield, Award, Flame, Calendar, LogOut } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
  const mockUser = {
    name: 'John Analyst',
    email: 'student@socplatform.com',
    role: 'STUDENT',
    level: 1,
    totalXP: 0,
    currentStreak: 0,
    joinedDate: 'September 2026',
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-fade-in">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Analyst Profile
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage your account credentials, security training credentials, and achievements.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Card */}
        <Card className="md:col-span-1 text-center p-6 space-y-4">
          <div className="w-20 h-20 rounded-full bg-primary-50 text-primary flex items-center justify-center mx-auto text-2xl font-bold border-2 border-primary/20">
            JA
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">{mockUser.name}</h2>
            <p className="text-xs text-muted-foreground">{mockUser.email}</p>
          </div>
          <div className="flex justify-center">
            <Badge variant="outline" className="text-xs">
              Role: {mockUser.role}
            </Badge>
          </div>

          <div className="pt-4 border-t border-border flex flex-col gap-2">
            <Link href="/login">
              <Button variant="outline" size="sm" className="w-full gap-2 text-xs">
                <LogOut className="w-3.5 h-3.5" /> Sign Out
              </Button>
            </Link>
          </div>
        </Card>

        {/* Stats and Account Info */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Training Metrics</CardTitle>
              <CardDescription className="text-xs">
                Performance indicators tracked across all units and labs
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-1">
              <div className="p-3 rounded-lg bg-secondary/50 border border-border">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Shield className="w-3.5 h-3.5 text-primary" />
                  <span>Level</span>
                </div>
                <div className="text-lg font-bold text-foreground mt-1">{mockUser.level}</div>
              </div>

              <div className="p-3 rounded-lg bg-secondary/50 border border-border">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Award className="w-3.5 h-3.5 text-warning" />
                  <span>Total XP</span>
                </div>
                <div className="text-lg font-bold text-foreground mt-1">{mockUser.totalXP}</div>
              </div>

              <div className="p-3 rounded-lg bg-secondary/50 border border-border">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Flame className="w-3.5 h-3.5 text-orange-500" />
                  <span>Streak</span>
                </div>
                <div className="text-lg font-bold text-foreground mt-1">{mockUser.currentStreak} Days</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Account Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Registered Email</span>
                <span className="font-semibold text-foreground">{mockUser.email}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Security Clearance</span>
                <span className="font-semibold text-foreground">SOC Analyst Tier 1</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Account Created</span>
                <span className="font-semibold text-foreground">{mockUser.joinedDate}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
