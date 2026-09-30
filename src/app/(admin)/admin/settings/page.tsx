import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Settings, Database, Shield, Lock, Bell, CheckCircle2 } from 'lucide-react';
import { AdminLabsSettings } from '@/components/admin/admin-labs-settings';

export const dynamic = 'force-dynamic';

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Platform Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Configure global system parameters, database persistence, and security controls.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* SOC Dashboard Labs Control Center */}
        <AdminLabsSettings />

        {/* System & Persistence Status */}
        <Card className="border border-border/80 shadow-xs">
          <CardHeader className="pb-3 border-b border-border/60">
            <div className="flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              <CardTitle className="text-base font-bold text-foreground">Persistence & Data Store</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Storage configuration and fallback runtime health
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl border border-border/70 bg-slate-50">
              <div>
                <p className="text-xs font-semibold text-foreground">Persistence Mode</p>
                <p className="text-[11px] text-muted-foreground font-mono">Local JSON Fallback Store Active</p>
              </div>
              <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300 text-[10px]">
                <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-600" /> Operational
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl border border-border/70 bg-slate-50">
              <div>
                <p className="text-xs font-semibold text-foreground">Database Sync Status</p>
                <p className="text-[11px] text-muted-foreground font-mono">18 Modules Ingested & Synchronized</p>
              </div>
              <Badge variant="outline" className="text-[10px] font-mono">100% In-Sync</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Security & Access Policies */}
        <Card className="border border-border/80 shadow-xs">
          <CardHeader className="pb-3 border-b border-border/60">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-red-600" />
              <CardTitle className="text-base font-bold text-foreground">Access & Authentication</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Role-based authorization and session lifetime
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl border border-border/70 bg-slate-50">
              <div>
                <p className="text-xs font-semibold text-foreground">JWT Session Strategy</p>
                <p className="text-[11px] text-muted-foreground font-mono">Max Age: 30 Days (Rolling Refresh)</p>
              </div>
              <Badge variant="outline" className="text-[10px] font-mono">NextAuth.js</Badge>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl border border-border/70 bg-slate-50">
              <div>
                <p className="text-xs font-semibold text-foreground">Admin Guard</p>
                <p className="text-[11px] text-muted-foreground font-mono">Role verification enforced in AdminLayout</p>
              </div>
              <Badge className="bg-blue-100 text-blue-800 border-blue-300 text-[10px]">Active</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
