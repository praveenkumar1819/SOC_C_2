'use client';

import React, { useState } from 'react';
import {
  X,
  Network,
  Shield,
  Server,
  Monitor,
  Database,
  Lock,
  Radio,
  FileText,
  Activity,
  Layers,
  Info,
  ChevronRight,
  Sparkles,
  Cpu,
  Globe,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface BranchArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type BranchType = 'small' | 'larger';

interface ArchitectureNode {
  id: string;
  name: string;
  role: string;
  subnet: string;
  telemetryType: string;
  sensor: string;
  icon: any;
  color: string;
  description: string;
  sampleEvent: string;
}

export function BranchArchitectureModal({ isOpen, onClose }: BranchArchitectureModalProps) {
  const [selectedBranch, setSelectedBranch] = useState<BranchType>('small');
  const [selectedNode, setSelectedNode] = useState<ArchitectureNode | null>(null);

  if (!isOpen) return null;

  const smallBranchNodes: ArchitectureNode[] = [
    {
      id: 'sm-router',
      name: 'Branch Edge UTM Firewall',
      role: 'Perimeter Gateway & NAT',
      subnet: 'WAN / 192.168.1.1',
      telemetryType: 'Stateful firewall logs, NAT sessions, Denied outbound flows',
      sensor: 'UTM Syslog -> Cloud Forwarder',
      icon: Shield,
      color: 'border-red-500/40 bg-red-500/10 text-red-600 dark:text-red-400',
      description: 'Single all-in-one UTM device handling WAN routing, stateful firewall inspection, and VPN connection back to CDAC Bengaluru headquarters.',
      sampleEvent: 'ALLOW TCP 192.168.1.55:49182 -> 198.51.100.22:443 [NAT: 203.0.113.10:1492] PKTS: 12 BYTES: 1420',
    },
    {
      id: 'sm-sensor',
      name: 'Zeek / Suricata Passive Tap',
      role: 'Network Threat Detection Sensor',
      subnet: '192.168.1.2 (Mirror Port)',
      telemetryType: 'Zeek conn.log, dns.log, http.log, Suricata EVE alerts',
      sensor: 'Passive Port Mirror (SPAN) on Switch',
      icon: Radio,
      color: 'border-purple-500/40 bg-purple-500/10 text-purple-600 dark:text-purple-400',
      description: 'Collects mirrored copies of all packet traffic passing through the core switch to detect suspicious domains, cleartext credentials, and protocol anomalies.',
      sampleEvent: 'ALERT: ET MALWARE Suspicious DGA Domain Query [DNS: qx99a.evil-c2.xyz] IP: 192.168.1.62',
    },
    {
      id: 'sm-switch',
      name: '24-Port Managed Core Switch',
      role: 'Local Layer 2 Switching',
      subnet: '192.168.1.0/24',
      telemetryType: 'MAC flapping alerts, Port link state changes, STP events',
      sensor: 'SNMP Traps / Syslog',
      icon: Network,
      color: 'border-blue-500/40 bg-blue-500/10 text-blue-600 dark:text-blue-400',
      description: 'Connects all workstations (Host: CDAC-SM-WS01 to WS25), managed network endpoints, and the single branch file server. Has port mirroring configured on Port 24 to feed the Zeek sensor.',
      sampleEvent: 'LINK_UP: Port Gi0/14 changed state to up [MAC: 00:1a:2b:3c:4d:5e, SPEED: 1000Mbps]',
    },
    {
      id: 'sm-dc',
      name: 'Branch Active Directory & File Server',
      role: 'Authentication & File Shares',
      subnet: '192.168.1.10 (Static)',
      telemetryType: 'Windows Security Event ID 4624 (Logon), 4625 (Fail), 4688 (Process), 5140 (Share)',
      sensor: 'Winlogbeat + Sysmon Forwarder',
      icon: Server,
      color: 'border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400',
      description: 'Read-only Active Directory replica and branch SMB share. Forwarding Winlogbeat telemetry directly to the central SIEM.',
      sampleEvent: 'EVENT_ID: 4625 | STATUS: 0xC000006D | USER: j_sharma | WORKSTATION: CDAC-SM-WS12 | AUTH_PKG: NTLM',
    },
    {
      id: 'sm-endpoints',
      name: '25 Branch Workstations',
      role: 'End-User Client Systems (Windows & Linux)',
      subnet: '192.168.1.50 – 192.168.1.75 (DHCP)',
      telemetryType: 'EDR telemetry, PowerShell Event 4104, Sysmon Process Execution',
      sensor: 'EDR Agent + Sysmon log shipper',
      icon: Monitor,
      color: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
      description: 'Staff workstations with default standard user accounts. Monitored by lightweight EDR agent and Sysmon forwarder.',
      sampleEvent: 'SYSMON_EID_1: Parent: explorer.exe -> Process: powershell.exe -enc SQBFAFgA... | USER: sm_staff',
    },
  ];

  const largerBranchNodes: ArchitectureNode[] = [
    {
      id: 'lg-router',
      name: 'Dual Redundant Perimeter Routers (BGP/OSPF)',
      role: 'High Availability WAN Routing',
      subnet: 'WAN / Dual ISP Connections',
      telemetryType: 'NetFlow v9, IPFIX, BGP session flaps, ACL drops',
      sensor: 'NetFlow Flow Collector -> SIEM',
      icon: Globe,
      color: 'border-red-500/40 bg-red-500/10 text-red-600 dark:text-red-400',
      description: 'Dual edge routers providing seamless failover and NetFlow telemetry ingestion for anomalous bandwidth surges and scanning behavior.',
      sampleEvent: 'FLOW: 10.0.30.104 -> 185.220.101.5:9001 (TOR Exit) BYTES: 52,440,000 PROTO: TCP DURATION: 380s',
    },
    {
      id: 'lg-firewall',
      name: 'Next-Generation Firewall Cluster (HA Pair)',
      role: 'Perimeter & Inter-VLAN Inspection (UTM/IPS/SSL Decrypt)',
      subnet: '10.0.0.1 - 10.0.0.2',
      telemetryType: 'App-ID, Threat Prevention IPS logs, WildFire sandbox verdicts, SSL decryption logs',
      sensor: 'Syslog / API Stream to SIEM',
      icon: Shield,
      color: 'border-orange-500/40 bg-orange-500/10 text-orange-600 dark:text-orange-400',
      description: 'Active/Passive Next-Gen Firewall pair enforcing strict zero-trust segmentation between Workstations, Data Center servers, DMZ, and OT/ICS.',
      sampleEvent: 'THREAT: High Severity Exploit | CVE-2026-2184 | SRC: 10.0.40.15 (DMZ) -> DST: 10.0.20.10:8080 | ACTION: RESET_BOTH',
    },
    {
      id: 'lg-vlan-mgmt',
      name: 'VLAN 10: Secure Management Segment',
      role: 'Network Switches, Out-of-Band IPMI & Console',
      subnet: '10.0.10.0/24 (Strict Jump Host Access)',
      telemetryType: 'SSH auth logs, TACACS+ / RADIUS audit records, SNMP traps',
      sensor: 'Syslog & TACACS+ Accounting',
      icon: Lock,
      color: 'border-slate-500/40 bg-slate-500/10 text-slate-700 dark:text-slate-300',
      description: 'Isolated out-of-band management network accessible ONLY via MFA bastion jump host. Zero direct Internet connectivity allowed.',
      sampleEvent: 'TACACS_AUTH: User admin_karthik authenticated via JumpHost [10.0.10.5] -> Switch-Core-01 config session',
    },
    {
      id: 'lg-vlan-servers',
      name: 'VLAN 20: Core Server Farm & Local SIEM',
      role: 'Domain Controllers, File Servers, Splunk/Elastic Forwarder',
      subnet: '10.0.20.0/24',
      telemetryType: 'Windows Event Logs, Linux auth.log, Database audit logs, Kafka streaming logs',
      sensor: 'Elasticsearch / Splunk Forwarder + TheHive integration',
      icon: Database,
      color: 'border-blue-500/40 bg-blue-500/10 text-blue-600 dark:text-blue-400',
      description: 'Hosts local branch servers, dedicated log collector queue, and read-replica directory databases.',
      sampleEvent: 'EVENT_ID: 4720 (User Account Created) | TARGET: svc_backup | CREATOR: cdac_admin | PRIVILEGE: SeBackupPrivilege',
    },
    {
      id: 'lg-vlan-users',
      name: 'VLAN 30: Staff Workstations (100+ Endpoints)',
      role: 'Corporate Workstations & Laptops',
      subnet: '10.0.30.0/24 & 10.0.31.0/24',
      telemetryType: 'Full EDR telemetry, Sysmon Process Trees, DNS Client queries, USB Insertion logs',
      sensor: 'CrowdStrike/Defender EDR + Sysmon',
      icon: Monitor,
      color: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
      description: 'Standard end-user subnet. Devices cannot communicate peer-to-peer (isolated via Private VLANs) to stop lateral movement.',
      sampleEvent: 'EDR_ALERT: Lateral Movement Attempt via SMB Named Pipes (PsExec) from 10.0.30.42 to 10.0.30.88 BLOCKED',
    },
    {
      id: 'lg-vlan-dmz',
      name: 'VLAN 40: DMZ Perimeter Services',
      role: 'Public Web Portal, Reverse Proxy, External SFTP',
      subnet: '10.0.40.0/24',
      telemetryType: 'Nginx WAF logs, ModSecurity alerts, SSL handshake failures',
      sensor: 'WAF & Suricata NIDS',
      icon: Activity,
      color: 'border-yellow-500/40 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
      description: 'Isolated perimeter services accessible from WAN. Blocked by firewall from initiating connections inbound to internal servers.',
      sampleEvent: 'WAF_BLOCK: SQL Injection Pattern matched in URI [/api/query?id=1%20OR%201=1] IP: 45.33.32.156',
    },
    {
      id: 'lg-vlan-ot',
      name: 'VLAN 50: OT/ICS Operational Technology Gateway',
      role: 'Building Management (BMS), CCTV, Industrial Controllers (PLC)',
      subnet: '10.0.50.0/24 (Strict Purdue Level 2/3 Separation)',
      telemetryType: 'Modbus / BACnet protocol telemetry, Industrial IDS alerts, Serial-to-Ethernet gateway logs',
      sensor: 'Nozomi / Claroty Industrial Sensor',
      icon: Cpu,
      color: 'border-purple-500/40 bg-purple-500/10 text-purple-600 dark:text-purple-400',
      description: 'Critical physical infrastructure subnet. Strictly segregated following Purdue model. No direct internet ingress or egress.',
      sampleEvent: 'IND_ALERT: Unauthorized Modbus Function Code 0x05 (Write Single Coil) directed at PLC 10.0.50.12',
    },
  ];

  const activeNodes = selectedBranch === 'small' ? smallBranchNodes : largerBranchNodes;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-6xl h-[90vh] max-h-[880px] flex flex-col bg-card rounded-2xl border border-border shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-muted/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-500/20">
              <Network className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-foreground tracking-tight">
                  CDAC Bengaluru — Branch Network Architecture
                </h2>
                <Badge className="bg-blue-600 text-white font-mono text-[11px]">
                  Interactive Topology
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Compare Small Branch vs Larger Enterprise Branch security boundaries and telemetry pipelines
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-lg h-9 w-9 text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Branch Selection Bar */}
        <div className="px-6 py-3 border-b bg-background/50 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-muted-foreground">Select Topology:</span>
            <div className="inline-flex rounded-xl p-1 bg-muted/60 border border-border">
              <button
                onClick={() => {
                  setSelectedBranch('small');
                  setSelectedNode(null);
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedBranch === 'small'
                    ? 'bg-card text-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                1. Small Branch Network (25 Endpoints)
              </button>
              <button
                onClick={() => {
                  setSelectedBranch('larger');
                  setSelectedNode(null);
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedBranch === 'larger'
                    ? 'bg-card text-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                2. Larger Enterprise Branch (100+ Endpoints, DMZ & OT)
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <Badge variant="outline" className="font-mono text-[11px]">
              {selectedBranch === 'small' ? 'Flat Layer-2 Subnet + Zeek Tap' : 'Segmented 802.1Q VLANs + EDR/SIEM/OT'}
            </Badge>
          </div>
        </div>

        {/* Content Body: Split Architecture & Inspector */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-0">
          {/* Architecture Nodes Grid (Left 7 cols) */}
          <div className="lg:col-span-7 overflow-y-auto p-5 space-y-4 border-r">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">
                {selectedBranch === 'small'
                  ? 'Small Branch Components (Click any component to inspect telemetry)'
                  : 'Enterprise Branch Segments & Core Services (Click to inspect)'}
              </span>
              <span>{activeNodes.length} Network Nodes</span>
            </div>

            {/* Architecture Visual Topology Cards */}
            <div className="space-y-3">
              {activeNodes.map((node) => {
                const IconComponent = node.icon;
                const isSelected = selectedNode?.id === node.id;

                return (
                  <div
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isSelected
                        ? 'border-blue-500 bg-blue-500/10 ring-2 ring-blue-500/30'
                        : 'border-border/80 bg-card hover:border-blue-500/40 hover:bg-muted/30'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${node.color}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>

                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-bold text-sm text-foreground">
                            {node.name}
                          </h4>
                          <Badge variant="outline" className="text-[10px] font-mono">
                            {node.subnet}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {node.role}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto shrink-0 text-xs">
                      <Badge variant="secondary" className="text-[10px] font-mono hidden md:inline">
                        {node.sensor.split(' ')[0]}
                      </Badge>
                      <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${isSelected ? 'rotate-90 text-blue-500' : ''}`} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary Diagram Key */}
            <div className="p-4 rounded-xl border bg-muted/20 text-xs space-y-2 mt-4">
              <span className="font-bold text-foreground block">
                Log Forwarding Pipeline to CDAC Bengaluru SOC:
              </span>
              <p className="text-muted-foreground leading-relaxed">
                All telemetry events flow from branch sensors via encrypted TLS (Port 5044 / 9997) to the central indexer. Analysts at L1 triage alerts using unified timestamps normalized to UTC (+05:30 IST display).
              </p>
            </div>
          </div>

          {/* Node Inspector & Telemetry Payload (Right 5 cols) */}
          <div className="lg:col-span-5 overflow-y-auto p-5 bg-card space-y-5">
            {selectedNode ? (
              <div className="space-y-5 animate-fade-in">
                {/* Node Title Header */}
                <div className="space-y-1.5 border-b pb-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="font-mono text-[10px] font-bold">
                      {selectedNode.subnet}
                    </Badge>
                    <Badge className="bg-blue-600 text-white text-[10px]">
                      {selectedNode.role}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-extrabold text-foreground tracking-tight">
                    {selectedNode.name}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {selectedNode.description}
                  </p>
                </div>

                {/* Telemetry Types & Sensor */}
                <div className="space-y-2 text-xs">
                  <h4 className="font-bold uppercase tracking-wider text-muted-foreground text-[11px]">
                    Telemetry Collected
                  </h4>
                  <div className="p-3 rounded-xl border bg-muted/15 space-y-1">
                    <span className="font-semibold text-foreground block">
                      Data Types:
                    </span>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedNode.telemetryType}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl border bg-muted/15 space-y-1">
                    <span className="font-semibold text-foreground block">
                      Collection Mechanism / Sensor:
                    </span>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedNode.sensor}
                    </p>
                  </div>
                </div>

                {/* Sample Telemetry Log Record */}
                <div className="space-y-2">
                  <h4 className="font-bold uppercase tracking-wider text-muted-foreground text-[11px] flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-blue-500" />
                    Sample Telemetry Log Entry
                  </h4>
                  <div className="p-3.5 rounded-xl border border-blue-500/20 bg-slate-950 text-emerald-400 font-mono text-[11px] leading-relaxed overflow-x-auto shadow-inner">
                    <code>{selectedNode.sampleEvent}</code>
                  </div>
                </div>

                {/* Analyst Triage Context */}
                <div className="p-3.5 rounded-xl border border-primary/20 bg-primary/5 text-xs space-y-1">
                  <span className="font-bold text-primary flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    L1 Analyst Triaging Note:
                  </span>
                  <p className="text-muted-foreground leading-relaxed">
                    When an alarm alerts on this node, always verify whether observed activity is an authorized administrator routine or an unexpected deviation from standard baseline behavior.
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 text-muted-foreground space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center ring-8 ring-blue-500/5">
                  <Network className="w-7 h-7" />
                </div>
                <div className="space-y-1 max-w-xs">
                  <h4 className="text-sm font-bold text-foreground">
                    Select a Component to Inspect
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Click on any firewall, switch, workstation segment, or OT gateway on the left to inspect its IP subnet, telemetry types, and live sample log entry.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t bg-muted/30 flex items-center justify-between text-xs text-muted-foreground">
          <span>CDAC BENGALURU — SOC ANALYST L1 NETWORK TOPOLOGY REFERENCE</span>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-7 text-xs">
            Close Topology
          </Button>
        </div>
      </div>
    </div>
  );
}
