'use client';

import React, { useState } from 'react';
import {
  X,
  Network,
  Shield,
  Server,
  Monitor,
  Building2,
  Layers,
  Lock,
  Wifi,
  Users,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Globe,
  Radio,
  Eye,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface BranchArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TopologyViewMode = 'floor-plan' | 'network-diagram';

interface BuildingFloor {
  id: string;
  floorNumber: number;
  floorName: string;
  badge: string;
  color: string;
  borderColor: string;
  bgColor: string;
  iconBg: string;
  summary: string;
  departments: {
    name: string;
    room: string;
    devices: string;
    socRole: string;
    ipRange: string;
  }[];
}

const CDAC_CAMPUS_FLOORS: BuildingFloor[] = [
  {
    id: 'floor-2',
    floorNumber: 2,
    floorName: '2nd Floor: Campus Server & Datacenter Room',
    badge: 'SECURE ZONE • BIOMETRIC ACCESS',
    color: 'text-purple-600 dark:text-purple-400',
    borderColor: 'border-purple-500/40',
    bgColor: 'bg-purple-500/10',
    iconBg: 'bg-purple-600',
    summary: 'The digital brain of the CDAC campus. Stores all user logins, network files, and collects event logs from every classroom PC.',
    departments: [
      {
        name: 'Central SIEM & Log Collector',
        room: 'Room 201 (Rack A)',
        devices: 'Wazuh & Splunk Server VM, 4TB SSD Log Vault',
        socRole: 'Where all analyst queries search: collects EVTX, Sysmon, and firewall logs.',
        ipRange: '192.168.1.10 (Static Server IP)',
      },
      {
        name: 'Active Directory & Domain Controller',
        room: 'Room 202 (Rack B)',
        devices: 'Windows Server 2022 DC (cdac.local)',
        socRole: 'Authenticates student and staff logins (Generates Event ID 4624 & 4625).',
        ipRange: '192.168.1.11 (Static DNS / DC)',
      },
      {
        name: 'Network Backup & Power Center',
        room: 'Room 203',
        devices: 'Automated Daily Snapshot Vault & Smart UPS Battery',
        socRole: 'Ensures student lab machines can be reset in 1-click if infected during triage.',
        ipRange: 'Internal Management Bus',
      },
    ],
  },
  {
    id: 'floor-1',
    floorNumber: 1,
    floorName: '1st Floor: SOC Training Lab & Classrooms',
    badge: 'LEARNING LAB ZONE • 30 WORKSTATIONS',
    color: 'text-sky-600 dark:text-sky-400',
    borderColor: 'border-sky-500/40',
    bgColor: 'bg-sky-500/10',
    iconBg: 'bg-sky-600',
    summary: 'The active hands-on training floor where you and fellow SOC learners sit, investigate alerts on dual monitors, and practice triage.',
    departments: [
      {
        name: 'Student Analyst Workstation Lab',
        room: 'Classroom 101 (Main Lab)',
        devices: '30x High-Spec Analyst PCs (Dual Display, Sysmon & EDR agent enabled)',
        socRole: 'Where you practice investigating spear-phishing, malware, and network attacks.',
        ipRange: '192.168.1.50 – 192.168.1.80 (DHCP)',
      },
      {
        name: 'Instructor & Mentor Command Desk',
        room: 'Podium 101',
        devices: 'Instructor Workstation (Mentor Ananya & Rajesh Console)',
        socRole: 'Broadcasts attack simulations, reviews student cases, and unlocks chapters.',
        ipRange: '192.168.1.20',
      },
      {
        name: 'Live SOC Threat Wall Display',
        room: 'Lab Display Wall',
        devices: '3x Large Wall Monitors with Real-time Kibana & Grafana Dashboards',
        socRole: 'Visualizes live campus telemetry, active alerts, and network traffic pulses.',
        ipRange: '192.168.1.25',
      },
    ],
  },
  {
    id: 'floor-0',
    floorNumber: 0,
    floorName: 'Ground Floor: Reception, Admin & Perimeter Gateway',
    badge: 'PERIMETER ENTRY • SECURITY GATEWAY',
    color: 'text-emerald-600 dark:text-emerald-400',
    borderColor: 'border-emerald-500/40',
    bgColor: 'bg-emerald-500/10',
    iconBg: 'bg-emerald-600',
    summary: 'The physical and network entrance of the CDAC Bengaluru building. First line of defense stopping cyber intruders and unauthorized visitors.',
    departments: [
      {
        name: 'Campus Perimeter Security Firewall',
        room: 'Network Entry Closet G02',
        devices: 'Hardware Security Gateway & NAT Router (1 Gbps Fiber Uplink)',
        socRole: 'Blocks malicious external hackers and inspects all traffic entering or leaving campus.',
        ipRange: '192.168.1.1 (Default Gateway)',
      },
      {
        name: 'Building Core Network Switch',
        room: 'Network Entry Closet G02',
        devices: '48-Port Gigabit Switch with Port Mirroring (SPort 24 SPAN)',
        socRole: 'Connects all three floors via high-speed cables and mirrors packets to the sensor.',
        ipRange: '192.168.1.2 (Managed Switch)',
      },
      {
        name: 'Campus Reception & Visitor Check-in',
        room: 'Reception Hall G01',
        devices: 'Visitor Registration Terminal, Badge Printer & Guest WiFi AP',
        socRole: 'Issues learner ID badges (NIST orientation) and isolates guest visitors.',
        ipRange: '192.168.1.90 – 192.168.1.99',
      },
    ],
  },
];

export function BranchArchitectureModal({ isOpen, onClose }: BranchArchitectureModalProps) {
  const [activeTab, setActiveTab] = useState<TopologyViewMode>('floor-plan');
  const [selectedFloorId, setSelectedFloorId] = useState<string>('floor-1');

  if (!isOpen) return null;

  const currentFloor = CDAC_CAMPUS_FLOORS.find((f) => f.id === selectedFloorId) || CDAC_CAMPUS_FLOORS[1];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fade-in">
      <div className="bg-background text-foreground border border-border/80 rounded-3xl shadow-2xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden my-auto">
        {/* Header Bar */}
        <div className="p-4 sm:p-5 border-b border-border/70 flex items-center justify-between gap-3 bg-muted/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-500/15 border border-sky-500/30 text-sky-600 dark:text-sky-400 flex items-center justify-center shadow-xs">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg tracking-tight text-foreground">
                  CDAC Bengaluru Campus • Building Floor Plan &amp; Topology
                </h3>
                <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 text-[10px] font-mono">
                  LIVE CAMPUS
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Explore the physical building layout, classroom workstations, and network security points
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-xl h-9 w-9 text-muted-foreground hover:text-foreground shrink-0 cursor-pointer"
            aria-label="Close campus architecture modal"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* View Switcher Bar */}
        <div className="px-5 py-2.5 border-b border-border/60 bg-background/50 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex rounded-xl p-1 bg-muted/60 border border-border/70">
            <button
              type="button"
              onClick={() => setActiveTab('floor-plan')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'floor-plan'
                  ? 'bg-card text-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-primary" />
              <span>🏢 Building Floor Plan</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('network-diagram')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'network-diagram'
                  ? 'bg-card text-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Network className="w-3.5 h-3.5 text-emerald-500" />
              <span>🌐 Simple Network Flow</span>
            </button>
          </div>

          <span className="text-xs text-muted-foreground font-mono">
            {activeTab === 'floor-plan'
              ? 'Click a floor on the building to inspect rooms and devices'
              : '4-Stage simple flow from Internet to student PCs'}
          </span>
        </div>

        {/* Modal Main Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* TAB 1: VISUAL BUILDING FLOOR PLAN */}
          {activeTab === 'floor-plan' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Visual Architectural Building Cross-Section (5 cols) */}
              <div className="lg:col-span-5 space-y-3">
                <div className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <Layers className="w-4 h-4 text-primary" />
                  <span>Interactive Building Cross-Section</span>
                </div>

                {/* Building Roof Illustration */}
                <div className="rounded-t-2xl p-2.5 bg-slate-200 dark:bg-slate-800/80 border border-border text-center flex items-center justify-center gap-2 text-xs font-mono font-bold text-muted-foreground shadow-xs">
                  <Radio className="w-4 h-4 text-sky-500 animate-pulse" />
                  <span>ROOFTOP: WAN Dish &amp; 1 Gbps Fiber Link</span>
                </div>

                {/* 3 Floors Stack */}
                <div className="space-y-2.5 bg-slate-100 dark:bg-slate-900/60 p-3 rounded-b-2xl border border-t-0 border-border shadow-inner">
                  {CDAC_CAMPUS_FLOORS.map((floor) => {
                    const isSelected = selectedFloorId === floor.id;
                    return (
                      <div
                        key={floor.id}
                        onClick={() => setSelectedFloorId(floor.id)}
                        className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden select-none ${
                          isSelected
                            ? `${floor.borderColor} ${floor.bgColor} shadow-md scale-[1.01]`
                            : 'border-border/80 bg-card hover:border-primary/40 hover:bg-muted/40'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-xl ${floor.iconBg} text-white flex items-center justify-center font-extrabold text-sm shadow-xs shrink-0`}>
                              {floor.floorNumber === 0 ? 'G' : `${floor.floorNumber}F`}
                            </div>
                            <div>
                              <div className="font-bold text-xs text-foreground">
                                {floor.floorName.split(':')[0]}
                              </div>
                              <div className="text-[11px] text-muted-foreground font-semibold">
                                {floor.floorName.split(':')[1]}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5">
                            {isSelected && (
                              <Badge className="bg-primary text-primary-foreground text-[10px] font-mono px-1.5 py-0">
                                ACTIVE
                              </Badge>
                            )}
                            <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${isSelected ? 'rotate-90 text-primary' : ''}`} />
                          </div>
                        </div>

                        {/* Room Pills on Floor Card */}
                        <div className="mt-2.5 pt-2 border-t border-border/60 flex items-center gap-1.5 flex-wrap">
                          {floor.departments.map((dep, dIdx) => (
                            <span
                              key={dIdx}
                              className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-background/80 border border-border/80 text-foreground/80 font-medium"
                            >
                              {dep.room}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="p-3 rounded-xl bg-muted/40 border border-border text-[11px] text-muted-foreground leading-relaxed">
                  💡 <strong>Analyst Context:</strong> When an alert triggers in the SIEM, the IP address immediately maps back to the physical room and desk on this campus floor plan.
                </div>
              </div>

              {/* Right Column: Active Floor Details & Room Breakdown (7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                <div className="p-4 rounded-2xl border bg-card shadow-xs space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3">
                    <div>
                      <h4 className="font-extrabold text-sm sm:text-base text-foreground flex items-center gap-2">
                        <span>{currentFloor.floorName}</span>
                      </h4>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {currentFloor.summary}
                      </p>
                    </div>
                    <Badge variant="outline" className={`font-mono text-[10px] font-bold ${currentFloor.borderColor} ${currentFloor.color}`}>
                      {currentFloor.badge}
                    </Badge>
                  </div>

                  {/* Rooms on this Floor */}
                  <div className="space-y-3 pt-2">
                    {currentFloor.departments.map((dept, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl border border-border/80 bg-background/60 hover:bg-muted/30 transition-all space-y-2"
                      >
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-primary" />
                            <h5 className="font-bold text-xs text-foreground">
                              {dept.name}
                            </h5>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="font-mono text-[10px]">
                              {dept.room}
                            </Badge>
                            <Badge variant="outline" className="font-mono text-[10px] text-muted-foreground">
                              {dept.ipRange}
                            </Badge>
                          </div>
                        </div>

                        <div className="text-xs text-foreground/80 space-y-1 pl-4 border-l-2 border-primary/20">
                          <div>
                            <strong className="text-muted-foreground font-mono text-[11px]">Hardware &amp; Systems: </strong>
                            <span>{dept.devices}</span>
                          </div>
                          <div>
                            <strong className="text-emerald-600 dark:text-emerald-400 font-mono text-[11px]">SOC Analyst Connection: </strong>
                            <span>{dept.socRole}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SIMPLE 4-STAGE NETWORK TOPOLOGY */}
          {activeTab === 'network-diagram' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/30 border border-sky-300 dark:border-sky-800 text-sky-900 dark:text-sky-200 text-xs leading-relaxed flex items-center gap-3">
                <Globe className="w-5 h-5 text-sky-600 dark:text-sky-400 shrink-0" />
                <span>
                  <strong>Simple Campus Network Flow:</strong> External Internet packets pass through the Perimeter Firewall on the Ground Floor, flow through the Main Core Switch, and reach the Classroom Lab PCs and Server Room.
                </span>
              </div>

              {/* 4 Connected Stages */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative">
                {/* Stage 1: Internet */}
                <div className="p-4 rounded-2xl border-2 border-slate-300 dark:border-slate-700 bg-card space-y-2.5 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold text-xs mb-2">
                      <Globe className="w-4 h-4" />
                    </div>
                    <Badge variant="outline" className="text-[10px] font-mono mb-1">
                      STEP 1: OUTSIDE
                    </Badge>
                    <h5 className="font-extrabold text-sm text-foreground">
                      Public Internet
                    </h5>
                    <p className="text-xs text-muted-foreground mt-1">
                      External web servers, threat actors, cloud services, and headquarters VPN.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-border text-[11px] font-mono text-muted-foreground">
                    WAN Uplink: 1 Gbps
                  </div>
                </div>

                {/* Stage 2: Firewall */}
                <div className="p-4 rounded-2xl border-2 border-emerald-500/40 bg-emerald-500/10 space-y-2.5 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs mb-2">
                      <Shield className="w-4 h-4" />
                    </div>
                    <Badge className="bg-emerald-600 text-white text-[10px] font-mono mb-1">
                      STEP 2: GATEWAY
                    </Badge>
                    <h5 className="font-extrabold text-sm text-foreground">
                      Perimeter Firewall
                    </h5>
                    <p className="text-xs text-muted-foreground mt-1">
                      Ground Floor G02: Blocks unauthorized ports and prevents attacks from entering.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-emerald-500/30 text-[11px] font-mono text-emerald-700 dark:text-emerald-300">
                    IP: 192.168.1.1
                  </div>
                </div>

                {/* Stage 3: Core Switch */}
                <div className="p-4 rounded-2xl border-2 border-blue-500/40 bg-blue-500/10 space-y-2.5 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs mb-2">
                      <Network className="w-4 h-4" />
                    </div>
                    <Badge className="bg-blue-600 text-white text-[10px] font-mono mb-1">
                      STEP 3: SWITCH
                    </Badge>
                    <h5 className="font-extrabold text-sm text-foreground">
                      Main Core Switch
                    </h5>
                    <p className="text-xs text-muted-foreground mt-1">
                      Ground Floor G02: High-speed gigabit switch distributing network cables to all floors.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-blue-500/30 text-[11px] font-mono text-blue-700 dark:text-blue-300">
                    Port Mirror: SPAN 24
                  </div>
                </div>

                {/* Stage 4: Endpoints & Servers */}
                <div className="p-4 rounded-2xl border-2 border-purple-500/40 bg-purple-500/10 space-y-2.5 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-xs mb-2">
                      <Server className="w-4 h-4" />
                    </div>
                    <Badge className="bg-purple-600 text-white text-[10px] font-mono mb-1">
                      STEP 4: LABS &amp; DC
                    </Badge>
                    <h5 className="font-extrabold text-sm text-foreground">
                      Classrooms &amp; Servers
                    </h5>
                    <p className="text-xs text-muted-foreground mt-1">
                      1st &amp; 2nd Floors: 30 Student PCs, Log Vault VM, and Active Directory DC.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-purple-500/30 text-[11px] font-mono text-purple-700 dark:text-purple-300">
                    Subnet: 192.168.1.0/24
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Bar */}
        <div className="p-4 border-t border-border/70 flex items-center justify-between gap-3 bg-muted/20">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>CDAC Bengaluru Cyber Defense Training Center (Simplified Topology)</span>
          </div>

          <Button
            type="button"
            onClick={onClose}
            className="h-9 px-5 rounded-xl font-bold text-xs bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer shadow-xs"
          >
            Close &amp; Return to Course
          </Button>
        </div>
      </div>
    </div>
  );
}
