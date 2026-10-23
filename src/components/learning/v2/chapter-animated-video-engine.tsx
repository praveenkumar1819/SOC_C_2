'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  ChevronRight,
  ChevronLeft,
  Shield,
  Activity,
  Cpu,
  Layers,
  Radio,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Server,
  Lock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { sound } from '@/lib/sound-effects';
import { V2ChapterNormalized, V2Unit, V2Module } from '@/data/curriculum-v2-data';

// =============================================================================
// DOMAIN-SPECIFIC VIDEO ANIMATION DEFINITIONS
// ALL vector node labels are STRICTLY <= 4 letters as required by user spec.
// =============================================================================

export interface VideoNode {
  id: string;
  label: string; // STRICT: <= 4 letters (e.g. 'PLC', 'HMI', 'FW', 'DMZ', 'IT')
  sub: string;   // STRICT: <= 4 letters (e.g. 'OT', 'CTRL', 'ACT', 'SENS')
  cx: number;
  cy: number;
  boxX: number;
  boxY: number;
  width: number;
  height: number;
  roleType: 'source' | 'boundary' | 'target' | 'safety' | 'sensor' | 'actuator';
  description: string;
}

export interface VideoConduit {
  from: string;
  to: string;
  label?: string; // STRICT: <= 4 letters (e.g. 'DATA', 'FLOW', 'MODB', 'SYNC')
  activeInScenes: number[];
  color?: string;
  dashed?: boolean;
}

export interface VideoScene {
  id: number;
  code: string;  // STRICT: <= 4 letters (e.g. 'NORM', 'FLOW', 'SCAN', 'SAFE')
  title: string;
  summary: string;
  activeNodeIds: string[];
  alertNodeIds?: string[];
  blockedNodeIds?: string[];
  telemetryLog: string;
  outcomeTakeaway: string;
}

export interface DomainVideoModel {
  domainId: string;
  domainName: string;
  badgeCode: string; // STRICT: <= 4 letters (e.g. 'OT', 'NET', 'EVTX', 'SIEM')
  caption: string;
  nodes: VideoNode[];
  conduits: VideoConduit[];
  scenes: VideoScene[];
}

// -----------------------------------------------------------------------------
// 1. MODULE 10: OT / ICS & SCADA SECURITY DOMAINS
// -----------------------------------------------------------------------------

// Model 1A: OT versus Office IT (Module 10 Unit 2 Chapter 1)
const OT_VS_IT_MODEL: DomainVideoModel = {
  domainId: 'ot-vs-it',
  domainName: 'OT vs Office IT Architecture',
  badgeCode: 'OT',
  caption: 'Industrial Plant OT Determinism vs Corporate Office IT Security',
  nodes: [
    {
      id: 'it',
      label: 'IT',
      sub: 'CORP',
      cx: 58,
      cy: 60,
      boxX: 36,
      boxY: 38,
      width: 44,
      height: 42,
      roleType: 'source',
      description: 'Corporate office IT network prioritizing data Confidentiality (CONF). Frequent patches and planned reboot downtime.',
    },
    {
      id: 'corp',
      label: 'CORP',
      sub: 'ERP',
      cx: 58,
      cy: 160,
      boxX: 36,
      boxY: 138,
      width: 44,
      height: 42,
      roleType: 'source',
      description: 'Business enterprise workstation and email services. Standard TCP/IP with high tolerance for latency.',
    },
    {
      id: 'fw',
      label: 'FW',
      sub: 'GATE',
      cx: 145,
      cy: 60,
      boxX: 125,
      boxY: 38,
      width: 42,
      height: 42,
      roleType: 'boundary',
      description: 'Dual-homed perimeter firewall enforcing strict segmentation between corporate office and plant floor.',
    },
    {
      id: 'dmz',
      label: 'DMZ',
      sub: 'iDMZ',
      cx: 145,
      cy: 160,
      boxX: 125,
      boxY: 138,
      width: 42,
      height: 42,
      roleType: 'boundary',
      description: 'Industrial DMZ (Purdue Level 3.5). Prevents direct routable connectivity between business IT and industrial fieldbus.',
    },
    {
      id: 'scad',
      label: 'SCAD',
      sub: 'OPS',
      cx: 232,
      cy: 50,
      boxX: 210,
      boxY: 28,
      width: 46,
      height: 42,
      roleType: 'target',
      description: 'Supervisory Control and Data Acquisition (SCADA) server aggregating real-time telemetry at Purdue Level 3.',
    },
    {
      id: 'hmi',
      label: 'HMI',
      sub: 'DISP',
      cx: 232,
      cy: 140,
      boxX: 210,
      boxY: 118,
      width: 46,
      height: 42,
      roleType: 'target',
      description: 'Human-Machine Interface console enabling operators to observe continuous plant telemetry without disruption.',
    },
    {
      id: 'plc',
      label: 'PLC',
      sub: 'CTRL',
      cx: 312,
      cy: 50,
      boxX: 290,
      boxY: 28,
      width: 44,
      height: 42,
      roleType: 'actuator',
      description: 'Programmable Logic Controller (Purdue Level 1). Deterministic real-time millisecond execution of ladder logic loops.',
    },
    {
      id: 'sens',
      label: 'SENS',
      sub: 'PHYS',
      cx: 312,
      cy: 130,
      boxX: 290,
      boxY: 108,
      width: 44,
      height: 42,
      roleType: 'sensor',
      description: 'Field 4-20mA pressure/temperature sensor feeding physical state into PLC I/O modules.',
    },
    {
      id: 'valv',
      label: 'VALV',
      sub: 'SAFE',
      cx: 312,
      cy: 210,
      boxX: 290,
      boxY: 188,
      width: 44,
      height: 42,
      roleType: 'safety',
      description: 'Physical actuator / Solenoid pressure release valve. Availability (AVAL) and Safety (SAFE) are non-negotiable.',
    },
  ],
  conduits: [
    { from: 'corp', to: 'it', label: 'LAN', activeInScenes: [0, 1] },
    { from: 'it', to: 'fw', label: 'HTTP', activeInScenes: [1, 2], dashed: true },
    { from: 'fw', to: 'dmz', label: 'DIOD', activeInScenes: [2, 3] },
    { from: 'dmz', to: 'scad', label: 'HIST', activeInScenes: [0, 3] },
    { from: 'scad', to: 'hmi', label: 'SYNC', activeInScenes: [0, 1, 3] },
    { from: 'hmi', to: 'plc', label: 'MODB', activeInScenes: [0, 3] },
    { from: 'plc', to: 'sens', label: 'LOOP', activeInScenes: [0, 1, 2, 3] },
    { from: 'plc', to: 'valv', label: 'ACT', activeInScenes: [0, 3] },
  ],
  scenes: [
    {
      id: 0,
      code: 'NORM',
      title: 'Deterministic Plant Control Cycle',
      summary: 'OT fieldbus operates in a closed, hard real-time loop. PLC polls SENS and controls VALV with 100% availability.',
      activeNodeIds: ['plc', 'sens', 'valv', 'hmi', 'scad'],
      telemetryLog: 'MODB_POLL: Unit 0x01 | Coil 0012: ACTIVE | Jitter: <2ms | AVAL: 100%',
      outcomeTakeaway: 'OT prioritizes Availability & Safety (AIC triad), unlike IT which prioritizes Confidentiality (CIA triad).',
    },
    {
      id: 1,
      code: 'FLOW',
      title: 'Corporate IT Traffic in Parallel',
      summary: 'Office workstations handle email and business ERP. High tolerance for delays; reboots are routine in IT.',
      activeNodeIds: ['it', 'corp', 'plc', 'sens'],
      telemetryLog: 'HTTP_REQ: ERP_SYNC host=corp-pc-02 | TLS 1.3 | Latency: 48ms | CONF: HIGH',
      outcomeTakeaway: 'Office IT systems can tolerate reboot maintenance; an unexpected reboot of a plant PLC causes catastrophic pipeline trips.',
    },
    {
      id: 2,
      code: 'SCAN',
      title: 'Unapproved IT Scan Hits Boundary',
      summary: 'A corporate vulnerability scanner or malware probe attempts to sweep into the industrial network.',
      activeNodeIds: ['it', 'fw', 'dmz'],
      alertNodeIds: ['it', 'fw'],
      blockedNodeIds: ['fw'],
      telemetryLog: 'ALERT: NMAP_SWEEP src=10.10.4.5 dst=192.168.10.0/24 port=502 | ACTION: DROP',
      outcomeTakeaway: 'Standard IT port scanners cause legacy PLCs and RTUs to crash. Never scan industrial subnets with IT tools.',
    },
    {
      id: 3,
      code: 'SAFE',
      title: 'Boundary Enforcement & 100% Plant Uptime',
      summary: 'The industrial DMZ and firewall drop the unauthenticated packet. Physical PLC and valve continue uninterrupted.',
      activeNodeIds: ['fw', 'dmz', 'scad', 'plc', 'valv'],
      blockedNodeIds: ['fw'],
      telemetryLog: 'PACKET_DROP: Rule 104-AIRGAP | Field loop intact | Trip count: 0 | Plant state: SAFE',
      outcomeTakeaway: 'Outcome achieved: Strict segmentation protects physical actuators while plant operations maintain continuous uptime.',
    },
  ],
};

// Model 1B: Purdue Model Segmentation & Safety (Module 10 Unit 2 Chapter 2)
const OT_SEGMENTATION_MODEL: DomainVideoModel = {
  domainId: 'ot-segmentation',
  domainName: 'Purdue Model & Safety Instrumented Systems',
  badgeCode: 'PURD',
  caption: 'Multi-Tier Industrial Segmentation from Enterprise ERP to Physical SIS Safety',
  nodes: [
    {
      id: 'l4',
      label: 'ERP',
      sub: 'L4',
      cx: 60,
      cy: 60,
      boxX: 38,
      boxY: 38,
      width: 44,
      height: 42,
      roleType: 'source',
      description: 'Purdue Level 4: Enterprise business planning, logistics, and corporate internet gateways.',
    },
    {
      id: 'l35',
      label: 'DMZ',
      sub: 'L3.5',
      cx: 145,
      cy: 60,
      boxX: 123,
      boxY: 38,
      width: 44,
      height: 42,
      roleType: 'boundary',
      description: 'Purdue Level 3.5: Industrial DMZ with data historians and patch distribution proxies.',
    },
    {
      id: 'l3',
      label: 'OPS',
      sub: 'L3',
      cx: 145,
      cy: 160,
      boxX: 123,
      boxY: 138,
      width: 44,
      height: 42,
      roleType: 'boundary',
      description: 'Purdue Level 3: Site operations, engineering workstations, and SCADA central databases.',
    },
    {
      id: 'l2',
      label: 'HMI',
      sub: 'L2',
      cx: 232,
      cy: 60,
      boxX: 210,
      boxY: 38,
      width: 44,
      height: 42,
      roleType: 'target',
      description: 'Purdue Level 2: Area supervisory control consoles and operator control room HMIs.',
    },
    {
      id: 'l1',
      label: 'PLC',
      sub: 'L1',
      cx: 232,
      cy: 160,
      boxX: 210,
      boxY: 138,
      width: 44,
      height: 42,
      roleType: 'actuator',
      description: 'Purdue Level 1: Basic control PLCs, RTUs, and distributed controller processing racks.',
    },
    {
      id: 'sis',
      label: 'SIS',
      sub: 'SAFE',
      cx: 312,
      cy: 60,
      boxX: 290,
      boxY: 38,
      width: 44,
      height: 42,
      roleType: 'safety',
      description: 'Safety Instrumented System (SIS). Hardwired emergency stop mechanism isolated from network attack.',
    },
    {
      id: 'l0',
      label: 'PHYS',
      sub: 'L0',
      cx: 312,
      cy: 160,
      boxX: 290,
      boxY: 138,
      width: 44,
      height: 42,
      roleType: 'sensor',
      description: 'Purdue Level 0: Physical process pumps, chemical piping, motors, and electrical switchgear.',
    },
  ],
  conduits: [
    { from: 'l4', to: 'l35', label: 'SYNC', activeInScenes: [0, 1] },
    { from: 'l35', to: 'l3', label: 'DIOD', activeInScenes: [0, 2] },
    { from: 'l3', to: 'l2', label: 'HIST', activeInScenes: [0, 1, 2] },
    { from: 'l2', to: 'l1', label: 'MODB', activeInScenes: [0, 2, 3] },
    { from: 'l1', to: 'l0', label: 'IO', activeInScenes: [0, 1, 2, 3] },
    { from: 'sis', to: 'l0', label: 'TRIP', activeInScenes: [2, 3], dashed: true },
  ],
  scenes: [
    {
      id: 0,
      code: 'PURD',
      title: 'Purdue Hierarchy Telemetry Flow',
      summary: 'Data flows upward through DMZ Level 3.5. Direct cross-tier routing is strictly prohibited.',
      activeNodeIds: ['l4', 'l35', 'l3', 'l2', 'l1', 'l0'],
      telemetryLog: 'PURDUE_SYNC: L0->L1->L2->L3->L3.5 Data Diode verified | Diode state: UNIDIRECTIONAL',
      outcomeTakeaway: 'The Purdue Model creates defensive depth; an attacker in ERP (L4) cannot directly access PLCs (L1).',
    },
    {
      id: 1,
      code: 'SEGM',
      title: 'Air-Gap & Data Diode Protection',
      summary: 'Data diode allows operational metrics to mirror into the business network without return paths.',
      activeNodeIds: ['l35', 'l3', 'l2', 'l1'],
      telemetryLog: 'DIODE_FEED: Mirroring sensor metrics to DMZ | Inbound payload: REJECTED | Loss: 0%',
      outcomeTakeaway: 'Unidirectional gateways protect lower Purdue levels by physically restricting inbound commands.',
    },
    {
      id: 2,
      code: 'TRIP',
      title: 'Malicious Command Blocked by Safety Interlock',
      summary: 'Attacker attempts overpressure injection on PLC. Hardware-isolated SIS intercepts anomalies.',
      activeNodeIds: ['l1', 'sis', 'l0'],
      alertNodeIds: ['l1', 'sis'],
      telemetryLog: 'INTRUSION_DETECTED: Malicious Modbus 0x05 write | Intercepted by hardwired SIS logic',
      outcomeTakeaway: 'Safety Instrumented Systems (SIS) operate independently of control software to guarantee human safety.',
    },
    {
      id: 3,
      code: 'SAFE',
      title: 'Plant Preservation & Failsafe Execution',
      summary: 'Hardwired interlock releases pressure safely. Physical plant integrity preserved without explosion.',
      activeNodeIds: ['sis', 'l0', 'l1'],
      telemetryLog: 'SAFETY_INTERLOCK: Valve trip engaged | Pressure: NORMAL | Process state: SAFE',
      outcomeTakeaway: 'Outcome: Physical safety overrides any software command, protecting life and equipment.',
    },
  ],
};

// Model 1C: OT Response Boundaries (Module 10 Unit 3 Chapters 1 & 2)
const OT_RESPONSE_MODEL: DomainVideoModel = {
  domainId: 'ot-response',
  domainName: 'OT Incident Response Boundaries',
  badgeCode: 'RESP',
  caption: 'Critical Protocol for L1 Analysts: Stopping, Seeking Approval, and Escalating',
  nodes: [
    {
      id: 'l1',
      label: 'L1',
      sub: 'SOC',
      cx: 60,
      cy: 100,
      boxX: 38,
      boxY: 78,
      width: 44,
      height: 44,
      roleType: 'source',
      description: 'L1 Security Analyst in the central SOC. Monitors alerts but holds strict OT response boundaries.',
    },
    {
      id: 'stop',
      label: 'STOP',
      sub: 'RULE',
      cx: 145,
      cy: 60,
      boxX: 123,
      boxY: 38,
      width: 44,
      height: 42,
      roleType: 'boundary',
      description: 'Golden Rule: DO NOT issue host network isolation, active scans, or reboot commands to OT equipment.',
    },
    {
      id: 'escl',
      label: 'ESCL',
      sub: 'ENG',
      cx: 145,
      cy: 160,
      boxX: 123,
      boxY: 138,
      width: 44,
      height: 42,
      roleType: 'boundary',
      description: 'Mandatory escalation channel to certified Control Systems Engineers before taking any action.',
    },
    {
      id: 'eng',
      label: 'ENG',
      sub: 'PLNT',
      cx: 232,
      cy: 100,
      boxX: 210,
      boxY: 78,
      width: 46,
      height: 44,
      roleType: 'target',
      description: 'On-site Plant Operations Engineer with physical authorization and process safety responsibility.',
    },
    {
      id: 'plc',
      label: 'PLC',
      sub: 'LIVE',
      cx: 312,
      cy: 60,
      boxX: 290,
      boxY: 38,
      width: 44,
      height: 42,
      roleType: 'actuator',
      description: 'Live production PLC. Premature network isolation can disable cooling systems or pressure relief.',
    },
    {
      id: 'safe',
      label: 'SAFE',
      sub: 'PHYS',
      cx: 312,
      cy: 160,
      boxX: 290,
      boxY: 138,
      width: 44,
      height: 42,
      roleType: 'safety',
      description: 'Physical equipment operating under active safety parameters with zero unplanned downtime.',
    },
  ],
  conduits: [
    { from: 'l1', to: 'stop', label: 'CHK', activeInScenes: [0, 1] },
    { from: 'l1', to: 'escl', label: 'COMM', activeInScenes: [1, 2] },
    { from: 'escl', to: 'eng', label: 'DISP', activeInScenes: [2, 3] },
    { from: 'eng', to: 'plc', label: 'INSP', activeInScenes: [3] },
    { from: 'plc', to: 'safe', label: 'LOOP', activeInScenes: [0, 1, 2, 3] },
  ],
  scenes: [
    {
      id: 0,
      code: 'ALRT',
      title: 'Anomalous OT Alert Fired in SOC',
      summary: 'L1 Analyst receives an anomalous Modbus function code alert originating from an engineering subnet.',
      activeNodeIds: ['l1', 'plc', 'safe'],
      alertNodeIds: ['l1'],
      telemetryLog: 'ALERT_FIRE: OT-ANOM-992 | Suspicious Modbus 0x05 Write on PLC-03 | Priority: HIGH',
      outcomeTakeaway: 'Observe, document evidence, and immediately verify the host before taking containment actions.',
    },
    {
      id: 1,
      code: 'STOP',
      title: 'L1 Analyst Boundary Verification',
      summary: 'L1 Analyst pauses: IT playbook action "Isolate Host" is strictly prohibited on operational PLCs.',
      activeNodeIds: ['l1', 'stop'],
      blockedNodeIds: ['stop'],
      telemetryLog: 'PLAYBOOK_GUARD: Action "ISOLATE_ENDPOINT" BLOCKED by OT safety rule. Escalate to ENG.',
      outcomeTakeaway: 'Standard IT containment playbooks cause catastrophic plant shutoffs if executed against OT controllers.',
    },
    {
      id: 2,
      code: 'ESCL',
      title: 'Handoff to Certified Plant Engineer',
      summary: 'Analyst dispatches verified alert context directly to on-call Control Systems Engineer.',
      activeNodeIds: ['l1', 'escl', 'eng'],
      telemetryLog: 'DISPATCH: Handoff ticket sent to #ot-plant-engineer-ops with exact IP, Unit ID, and PCAP.',
      outcomeTakeaway: 'Always communicate through designated safe channels with exact technical evidence.',
    },
    {
      id: 3,
      code: 'SAFE',
      title: 'Physical In-Person Verification & Safe Triage',
      summary: 'Plant engineer inspects physical terminal block; verifies legitimate calibration maintenance.',
      activeNodeIds: ['eng', 'plc', 'safe'],
      telemetryLog: 'ENGINEER_SIGNOFF: Scheduled calibration verified on PLC-03 | Plant state: 100% SAFE',
      outcomeTakeaway: 'Outcome: Zero disruption to critical industrial processes; false positive resolved cleanly.',
    },
  ],
};

// -----------------------------------------------------------------------------
// 2. NETWORK PROTOCOLS & PACKET FLOW (Module 2, Module 7)
// -----------------------------------------------------------------------------
const NETWORK_PACKET_MODEL: DomainVideoModel = {
  domainId: 'network-packet',
  domainName: 'TCP/IP Handshake & Packet Inspection',
  badgeCode: 'PACK',
  caption: 'TCP 3-Way Handshake, DNS Resolution, and Payload Inspection',
  nodes: [
    {
      id: 'cli',
      label: 'CLI',
      sub: 'HOST',
      cx: 60,
      cy: 70,
      boxX: 38,
      boxY: 48,
      width: 44,
      height: 44,
      roleType: 'source',
      description: 'Client endpoint generating outbound socket connections over ephemeral ports.',
    },
    {
      id: 'rout',
      label: 'ROUT',
      sub: 'GATE',
      cx: 145,
      cy: 70,
      boxX: 123,
      boxY: 48,
      width: 44,
      height: 44,
      roleType: 'boundary',
      description: 'Core switch / Gateway router translating ARP and forwarding IP packets.',
    },
    {
      id: 'tap',
      label: 'TAP',
      sub: 'ZEEK',
      cx: 145,
      cy: 170,
      boxX: 123,
      boxY: 148,
      width: 44,
      height: 44,
      roleType: 'sensor',
      description: 'Passive Network TAP mirroring raw bytes to Zeek and Suricata sensors.',
    },
    {
      id: 'fw',
      label: 'FW',
      sub: 'INSP',
      cx: 232,
      cy: 70,
      boxX: 210,
      boxY: 48,
      width: 44,
      height: 44,
      roleType: 'boundary',
      description: 'Stateful firewall inspecting TCP flags (SYN, ACK) and connection states.',
    },
    {
      id: 'dns',
      label: 'DNS',
      sub: 'UDP',
      cx: 232,
      cy: 170,
      boxX: 210,
      boxY: 148,
      width: 44,
      height: 44,
      roleType: 'target',
      description: 'Enterprise DNS resolver converting FQDNs into routable IPv4 addresses.',
    },
    {
      id: 'srv',
      label: 'SRV',
      sub: 'DEST',
      cx: 312,
      cy: 70,
      boxX: 290,
      boxY: 48,
      width: 44,
      height: 44,
      roleType: 'target',
      description: 'Destination web server listening on TCP port 443 with TLS encryption.',
    },
  ],
  conduits: [
    { from: 'cli', to: 'rout', label: 'ARP', activeInScenes: [0] },
    { from: 'rout', to: 'tap', label: 'SPAN', activeInScenes: [0, 1, 2, 3] },
    { from: 'rout', to: 'fw', label: 'SYN', activeInScenes: [1] },
    { from: 'fw', to: 'dns', label: 'PORT', activeInScenes: [0] },
    { from: 'fw', to: 'srv', label: 'TLS', activeInScenes: [2, 3] },
    { from: 'srv', to: 'cli', label: 'ACK', activeInScenes: [1, 2], dashed: true },
  ],
  scenes: [
    {
      id: 0,
      code: 'DNS',
      title: 'DNS Resolution via UDP:53',
      summary: 'Client queries DNS server for destination IP. Network TAP captures request query in Zeek log.',
      activeNodeIds: ['cli', 'rout', 'dns', 'tap'],
      telemetryLog: 'DNS_REQ: query=api.secure-bank.in qtype=A | ans=10.20.40.12 | proto=UDP:53',
      outcomeTakeaway: 'Always inspect DNS query logs to verify whether destination FQDN matches expected domain baseline.',
    },
    {
      id: 1,
      code: 'SYN',
      title: 'TCP 3-Way Handshake (SYN -> SYN/ACK -> ACK)',
      summary: 'Client sends SYN packet (seq=100); Server replies SYN/ACK (seq=300, ack=101); Client sends ACK.',
      activeNodeIds: ['cli', 'rout', 'fw', 'srv', 'tap'],
      telemetryLog: 'TCP_FLOW: [SYN] win=64240 -> [SYN,ACK] win=65535 -> [ACK] established',
      outcomeTakeaway: 'Stateful firewalls drop unsolicited SYN/ACK and FIN packets that lack preceding handshake state.',
    },
    {
      id: 2,
      code: 'TLS',
      title: 'TLS 1.3 Cryptographic Negotiation',
      summary: 'Client Hello exchanges cipher suites and TLS JA3 fingerprint; server returns signed certificate.',
      activeNodeIds: ['cli', 'fw', 'srv', 'tap'],
      telemetryLog: 'TLS_RECORD: Handshake ClientHello | JA3=771,4865-4866-4867 | SNI=api.secure-bank.in',
      outcomeTakeaway: 'JA3 fingerprints allow security analysts to identify malware clients even when traffic is fully encrypted.',
    },
    {
      id: 3,
      code: 'PCAP',
      title: 'Full Packet Capture Validation',
      summary: 'Passive TAP completes session logging; zero TCP retransmissions, zero anomalous payload alerts.',
      activeNodeIds: ['cli', 'srv', 'tap'],
      telemetryLog: 'ZEEK_CONN: uid=C8921 dur=1.42s bytes_in=4120 bytes_out=890 proto=tcp state=SF',
      outcomeTakeaway: 'Outcome: Empirical verification confirmed User, Host, IP, and Timestamps from wire telemetry.',
    },
  ],
};

// -----------------------------------------------------------------------------
// 3. WINDOWS AUTHENTICATION & KERBEROS FORENSICS (Module 5, Module 1)
// -----------------------------------------------------------------------------
const WINDOWS_AUTH_MODEL: DomainVideoModel = {
  domainId: 'windows-auth',
  domainName: 'Windows Authentication & Kerberos',
  badgeCode: 'EVTX',
  caption: 'Kerberos TGT/TGS Ticket Granting & Event 4624/4625 Telemetry',
  nodes: [
    {
      id: 'user',
      label: 'USER',
      sub: 'CLNT',
      cx: 60,
      cy: 90,
      boxX: 38,
      boxY: 68,
      width: 44,
      height: 44,
      roleType: 'source',
      description: 'Enterprise domain user logging into Windows 11 endpoint with smartcard or password.',
    },
    {
      id: 'kdc',
      label: 'KDC',
      sub: 'AUTH',
      cx: 145,
      cy: 50,
      boxX: 123,
      boxY: 28,
      width: 44,
      height: 44,
      roleType: 'boundary',
      description: 'Key Distribution Center running on Domain Controller. Validates AS-REQ and signs TGT tickets.',
    },
    {
      id: 'tgt',
      label: 'TGT',
      sub: 'TGS',
      cx: 145,
      cy: 150,
      boxX: 123,
      boxY: 128,
      width: 44,
      height: 44,
      roleType: 'boundary',
      description: 'Ticket Granting Ticket stored in LSASS memory; used to request service access tickets.',
    },
    {
      id: 'lsas',
      label: 'LSAS',
      sub: 'MEM',
      cx: 232,
      cy: 50,
      boxX: 210,
      boxY: 28,
      width: 44,
      height: 44,
      roleType: 'target',
      description: 'Local Security Authority Subsystem Service (LSASS.exe). Protected by Credential Guard.',
    },
    {
      id: 'evtx',
      label: 'EVTX',
      sub: 'LOGS',
      cx: 232,
      cy: 150,
      boxX: 210,
      boxY: 128,
      width: 44,
      height: 44,
      roleType: 'sensor',
      description: 'Windows Security Event Log recording Event 4624 (Logon) and Event 4625 (Logon Failure).',
    },
    {
      id: 'host',
      label: 'HOST',
      sub: 'SRV',
      cx: 312,
      cy: 90,
      boxX: 290,
      boxY: 68,
      width: 44,
      height: 44,
      roleType: 'target',
      description: 'Target enterprise server (File share, SQL, or intranet portal) accepting Kerberos TGS.',
    },
  ],
  conduits: [
    { from: 'user', to: 'kdc', label: 'REQ', activeInScenes: [0] },
    { from: 'kdc', to: 'tgt', label: 'SIGN', activeInScenes: [0, 1] },
    { from: 'user', to: 'lsas', label: 'INJ', activeInScenes: [1, 2] },
    { from: 'lsas', to: 'evtx', label: '4624', activeInScenes: [2, 3] },
    { from: 'tgt', to: 'host', label: 'TGS', activeInScenes: [3] },
  ],
  scenes: [
    {
      id: 0,
      code: 'KDC',
      title: 'Kerberos AS-REQ & TGT Issuance',
      summary: 'User initiates logon; Domain Controller KDC verifies master key and returns encrypted TGT ticket.',
      activeNodeIds: ['user', 'kdc', 'tgt'],
      telemetryLog: 'KERB_AS: user=b_sharma realm=CDAC.GOV.IN | preauth=PA_ENC_TIMESTAMP | status=SUCCESS',
      outcomeTakeaway: 'Successful Kerberos authentication leaves auditable Event 4768 in the Domain Controller event log.',
    },
    {
      id: 1,
      code: 'MEM',
      title: 'Ticket Caching in LSASS Memory',
      summary: 'TGT ticket is safely cached in LSASS.exe memory. Windows Defender Credential Guard protects tokens.',
      activeNodeIds: ['tgt', 'lsas'],
      telemetryLog: 'LSASS_CACHE: LUID=0x3e7 | CredentialGuard=ENABLED | VirtualizationBasedSecurity=ACTIVE',
      outcomeTakeaway: 'Watch for unauthorized processes attempting to open LSASS handles with PROCESS_VM_READ permissions.',
    },
    {
      id: 2,
      code: '4624',
      title: 'Windows Event 4624 Logon Generated',
      summary: 'Security log writes Event 4624 Logon Type 10 (RemoteInteractive) or Type 3 (Network).',
      activeNodeIds: ['lsas', 'evtx'],
      telemetryLog: 'EVTX: EventID=4624 LogonType=10 user=b_sharma host=FIN-PC-04 ip=10.10.20.15 auth=Kerberos',
      outcomeTakeaway: 'Distinguish between Logon Type 2 (Interactive Console), Type 3 (Network), and Type 10 (RDP).',
    },
    {
      id: 3,
      code: 'SAFE',
      title: 'Verified Access to Destination Server',
      summary: 'Host accepts TGS ticket; session established with zero credential leakage.',
      activeNodeIds: ['tgt', 'host', 'evtx'],
      telemetryLog: 'SMB_SESSION: TreeConnect to \\\\FILE-SRV-01\\FINANCE | Privilege=Standard | Status=CLEAN',
      outcomeTakeaway: 'Outcome: Verified authenticated access without pass-the-hash or golden ticket tampering.',
    },
  ],
};

// -----------------------------------------------------------------------------
// 4. SIEM & LOG NORMALIZATION PIPELINE (Module 4)
// -----------------------------------------------------------------------------
const SIEM_PIPELINE_MODEL: DomainVideoModel = {
  domainId: 'siem-pipeline',
  domainName: 'SIEM Normalization & Correlation',
  badgeCode: 'SIEM',
  caption: 'Raw Log Parsing, ECS Normalization, Sigma Rule Matching, and Alert Queue',
  nodes: [
    {
      id: 'src',
      label: 'SRC',
      sub: 'LOGS',
      cx: 60,
      cy: 90,
      boxX: 38,
      boxY: 68,
      width: 44,
      height: 44,
      roleType: 'source',
      description: 'Distributed log sources: Windows Sysmon, Linux auditd, perimeter firewalls, and cloud APIs.',
    },
    {
      id: 'pars',
      label: 'PARS',
      sub: 'JSON',
      cx: 145,
      cy: 50,
      boxX: 123,
      boxY: 28,
      width: 44,
      height: 44,
      roleType: 'boundary',
      description: 'Grok / Regex parser stripping raw strings and breaking timestamps into normalized format.',
    },
    {
      id: 'norm',
      label: 'NORM',
      sub: 'ECS',
      cx: 145,
      cy: 150,
      boxX: 123,
      boxY: 128,
      width: 44,
      height: 44,
      roleType: 'boundary',
      description: 'Elastic Common Schema (ECS) mapping field names: host.name, source.ip, user.name, event.action.',
    },
    {
      id: 'sigm',
      label: 'SIGM',
      sub: 'RULE',
      cx: 232,
      cy: 50,
      boxX: 210,
      boxY: 28,
      width: 44,
      height: 44,
      roleType: 'target',
      description: 'Sigma correlation rule evaluating logic across 5-minute sliding telemetry windows.',
    },
    {
      id: 'alrt',
      label: 'ALRT',
      sub: 'CRIT',
      cx: 232,
      cy: 150,
      boxX: 210,
      boxY: 128,
      width: 44,
      height: 44,
      roleType: 'safety',
      description: 'Generated high-fidelity security alarm linked to MITRE ATT&CK technique ID.',
    },
    {
      id: 'queu',
      label: 'QUEU',
      sub: 'L1',
      cx: 312,
      cy: 90,
      boxX: 290,
      boxY: 68,
      width: 44,
      height: 44,
      roleType: 'actuator',
      description: 'L1 triage dispatch queue with 15-minute SLA countdown timer and case ticket.',
    },
  ],
  conduits: [
    { from: 'src', to: 'pars', label: 'RAW', activeInScenes: [0] },
    { from: 'pars', to: 'norm', label: 'ECS', activeInScenes: [0, 1] },
    { from: 'norm', to: 'sigm', label: 'EVAL', activeInScenes: [1, 2] },
    { from: 'sigm', to: 'alrt', label: 'TRIG', activeInScenes: [2] },
    { from: 'alrt', to: 'queu', label: 'DISP', activeInScenes: [2, 3] },
  ],
  scenes: [
    {
      id: 0,
      code: 'RAW',
      title: 'High-Volume Raw Log Ingestion',
      summary: 'Raw event stream ingested from endpoints; parser processes unformatted strings into JSON tokens.',
      activeNodeIds: ['src', 'pars'],
      telemetryLog: 'INGEST: 12,450 eps | Agent: Sysmon v14.1 | Stream: Microsoft-Windows-Sysmon/Operational',
      outcomeTakeaway: 'Parser failures drop fields; always verify normalized fields match standard schemas.',
    },
    {
      id: 1,
      code: 'NORM',
      title: 'ECS Schema Normalization',
      summary: 'Data normalized into standard field names: user.name, host.name, process.command_line.',
      activeNodeIds: ['pars', 'norm'],
      telemetryLog: 'NORM_MAP: host.name="CDAC-WS-04" | process.name="powershell.exe" | user.name="b_sharma"',
      outcomeTakeaway: 'Normalized logs allow universal Sigma rules to match across multiple vendor technologies.',
    },
    {
      id: 2,
      code: 'SIGM',
      title: 'Sigma Correlation Rule Triggered',
      summary: 'Correlation engine matches suspicious base64 encoded PowerShell execution.',
      activeNodeIds: ['norm', 'sigm', 'alrt'],
      alertNodeIds: ['sigm', 'alrt'],
      telemetryLog: 'SIGMA_MATCH: rule="Suspicious Encoded PowerShell Execution" technique=T1059.001 severity=HIGH',
      outcomeTakeaway: 'Never ignore correlation thresholds; single low events aggregate into critical breaches.',
    },
    {
      id: 3,
      code: 'QUEU',
      title: 'Alert Dispatched to L1 Analyst Queue',
      summary: 'SIEM assigns Alert ID with SLA 15-minute target countdown for empirical triage.',
      activeNodeIds: ['alrt', 'queu'],
      telemetryLog: 'QUEUE_ITEM: ID=SEC-ALERT-2026-991 | SLA: 15m remaining | Assignee: L1 Analyst',
      outcomeTakeaway: 'Outcome: Complete triage lifecycle started with all empirical evidence pre-correlated.',
    },
  ],
};

// -----------------------------------------------------------------------------
// 5. LINUX SYSTEM AUDITING & SUDO ACTIVITY (Module 07 Linux)
// -----------------------------------------------------------------------------
const LINUX_AUDIT_MODEL: DomainVideoModel = {
  domainId: 'linux-audit',
  domainName: 'Linux Security & Auditd Monitoring',
  badgeCode: 'LNX',
  caption: 'Linux Authentication, Sudo Privileges, Auditd Syscalls and Auth.log',
  nodes: [
    {
      id: 'ssh',
      label: 'SSH',
      sub: 'AUTH',
      cx: 60,
      cy: 90,
      boxX: 38,
      boxY: 68,
      width: 44,
      height: 44,
      roleType: 'source',
      description: 'Inbound SSH session authenticated via public key on port 22.',
    },
    {
      id: 'pam',
      label: 'PAM',
      sub: 'MOD',
      cx: 145,
      cy: 50,
      boxX: 123,
      boxY: 28,
      width: 44,
      height: 44,
      roleType: 'boundary',
      description: 'Pluggable Authentication Modules (PAM) validating account restrictions and groups.',
    },
    {
      id: 'bash',
      label: 'BASH',
      sub: 'PROC',
      cx: 145,
      cy: 150,
      boxX: 123,
      boxY: 128,
      width: 44,
      height: 44,
      roleType: 'boundary',
      description: 'Interactive bash terminal shell spawned with standard non-root user UID 1001.',
    },
    {
      id: 'sudo',
      label: 'SUDO',
      sub: 'ROOT',
      cx: 232,
      cy: 50,
      boxX: 210,
      boxY: 28,
      width: 44,
      height: 44,
      roleType: 'target',
      description: 'Sudo binary execution elevating privileges to UID 0 (root) recorded in /var/log/auth.log.',
    },
    {
      id: 'audt',
      label: 'AUDT',
      sub: 'EVNT',
      cx: 232,
      cy: 150,
      boxX: 210,
      boxY: 128,
      width: 44,
      height: 44,
      roleType: 'sensor',
      description: 'Linux auditd daemon hooking execve and openat syscalls with audit key rules.',
    },
    {
      id: 'logs',
      label: 'LOGS',
      sub: 'FILE',
      cx: 312,
      cy: 90,
      boxX: 290,
      boxY: 68,
      width: 44,
      height: 44,
      roleType: 'safety',
      description: 'Persistent log repository: /var/log/secure and /var/log/audit/audit.log.',
    },
  ],
  conduits: [
    { from: 'ssh', to: 'pam', label: 'AUTH', activeInScenes: [0] },
    { from: 'pam', to: 'bash', label: 'SPAW', activeInScenes: [0, 1] },
    { from: 'bash', to: 'sudo', label: 'ELEV', activeInScenes: [1, 2] },
    { from: 'sudo', to: 'audt', label: 'SYSC', activeInScenes: [2, 3] },
    { from: 'audt', to: 'logs', label: 'AUDD', activeInScenes: [2, 3] },
  ],
  scenes: [
    {
      id: 0,
      code: 'AUTH',
      title: 'PAM Authentication Accepted',
      summary: 'Public key accepted for user devops; PAM opens session in /var/log/auth.log.',
      activeNodeIds: ['ssh', 'pam', 'bash'],
      telemetryLog: 'PAM_AUTH: Accepted publickey for devops from 10.10.15.42 port 48212 ssh2: RSA',
      outcomeTakeaway: 'Always cross-check accepted SSH key fingerprints with approved DevOps asset inventories.',
    },
    {
      id: 1,
      code: 'SPAW',
      title: 'Interactive Bash Shell Spawned',
      summary: 'Child process bash (PID 4910) created with restricted environment variables.',
      activeNodeIds: ['pam', 'bash'],
      telemetryLog: 'SYSTEMD: pam_unix(sshd:session): session opened for user devops(uid=1001)',
      outcomeTakeaway: 'Monitor sudden shell spawns from daemon service accounts like www-data or nobody.',
    },
    {
      id: 2,
      code: 'SUDO',
      title: 'Sudo Privilege Escalation Observed',
      summary: 'User devops executes sudo command to edit production configuration files.',
      activeNodeIds: ['bash', 'sudo', 'audt'],
      alertNodeIds: ['sudo'],
      telemetryLog: 'SUDO_LOG: devops : TTY=pts/0 ; PWD=/home/devops ; USER=root ; COMMAND=/bin/nano /etc/shadow',
      outcomeTakeaway: 'Unauthorized attempts to inspect /etc/shadow or edit /etc/sudoers trigger urgent triage.',
    },
    {
      id: 3,
      code: 'AUDD',
      title: 'Auditd Syscall Rule Captured',
      summary: 'Kernel audit subsystem records raw syscall event with arch, euid, and command arguments.',
      activeNodeIds: ['sudo', 'audt', 'logs'],
      telemetryLog: 'AUDIT_SYSCALL: arch=c000003e syscall=59 success=yes exit=0 a0=55a1 euid=0 key="identity_watch"',
      outcomeTakeaway: 'Outcome: Kernel-level auditd logs cannot be erased by ordinary sudoers; full audit trail safe.',
    },
  ],
};

// -----------------------------------------------------------------------------
// 6. EDR PROCESS BEHAVIOR & HOST CONTAINMENT (Module 09 EDR)
// -----------------------------------------------------------------------------
const EDR_BEHAVIOR_MODEL: DomainVideoModel = {
  domainId: 'edr-behavior',
  domainName: 'Endpoint Detection & Response (EDR)',
  badgeCode: 'EDR',
  caption: 'Process Execution Trees, API Hooking, Behavioral Detection & Network Containment',
  nodes: [
    {
      id: 'doc',
      label: 'DOC',
      sub: 'FILE',
      cx: 60,
      cy: 90,
      boxX: 38,
      boxY: 68,
      width: 44,
      height: 44,
      roleType: 'source',
      description: 'Phishing macro document received via email or shared folder.',
    },
    {
      id: 'word',
      label: 'WORD',
      sub: 'PROC',
      cx: 145,
      cy: 50,
      boxX: 123,
      boxY: 28,
      width: 44,
      height: 44,
      roleType: 'boundary',
      description: 'Legitimate parent process winword.exe executing in standard user session.',
    },
    {
      id: 'psh',
      label: 'PSH',
      sub: 'SPAW',
      cx: 145,
      cy: 150,
      boxX: 123,
      boxY: 128,
      width: 44,
      height: 44,
      roleType: 'boundary',
      description: 'Anomalous child process powershell.exe spawned with hidden window and bypass flags.',
    },
    {
      id: 'inj',
      label: 'INJ',
      sub: 'MEM',
      cx: 232,
      cy: 50,
      boxX: 210,
      boxY: 28,
      width: 44,
      height: 44,
      roleType: 'target',
      description: 'Process injection / hollowing attempt targeting svchost.exe or notepad.exe.',
    },
    {
      id: 'edr',
      label: 'EDR',
      sub: 'HOOK',
      cx: 232,
      cy: 150,
      boxX: 210,
      boxY: 128,
      width: 44,
      height: 44,
      roleType: 'sensor',
      description: 'EDR kernel driver intercepts VirtualAllocEx and WriteProcessMemory API calls.',
    },
    {
      id: 'isol',
      label: 'ISOL',
      sub: 'SAFE',
      cx: 312,
      cy: 90,
      boxX: 290,
      boxY: 68,
      width: 44,
      height: 44,
      roleType: 'safety',
      description: 'Automated EDR host isolation cutting off network traffic while maintaining cloud console telemetry.',
    },
  ],
  conduits: [
    { from: 'doc', to: 'word', label: 'OPEN', activeInScenes: [0] },
    { from: 'word', to: 'psh', label: 'SPAW', activeInScenes: [0, 1] },
    { from: 'psh', to: 'inj', label: 'INJ', activeInScenes: [1, 2] },
    { from: 'inj', to: 'edr', label: 'HOOK', activeInScenes: [2, 3] },
    { from: 'edr', to: 'isol', label: 'DROP', activeInScenes: [3] },
  ],
  scenes: [
    {
      id: 0,
      code: 'SPAW',
      title: 'Anomalous Child Process Tree',
      summary: 'Office document spawns powershell.exe: classic Parent-Child anomaly (T1059.001).',
      activeNodeIds: ['doc', 'word', 'psh'],
      alertNodeIds: ['psh'],
      telemetryLog: 'EDR_ALERT: Parent: winword.exe (PID 2104) -> Child: powershell.exe (PID 8840) -NoP -Hidden',
      outcomeTakeaway: 'Office applications should never spawn PowerShell or cmd.exe in standard enterprise workflows.',
    },
    {
      id: 1,
      code: 'INJ',
      title: 'Memory Injection API Detected',
      summary: 'PowerShell script attempts to inject shellcode into legitimate system memory space.',
      activeNodeIds: ['psh', 'inj', 'edr'],
      alertNodeIds: ['inj'],
      telemetryLog: 'KERNEL_HOOK: VirtualAllocEx on target PID 4120 with PAGE_EXECUTE_READWRITE | THREAT: HIGH',
      outcomeTakeaway: 'EDR agents monitor API calls that request executable memory outside standard dynamic link libraries.',
    },
    {
      id: 2,
      code: 'HOOK',
      title: 'Process Terminated by EDR Sensor',
      summary: 'Sensor driver kills malicious PID 8840 before payload can beacon out to external C2.',
      activeNodeIds: ['inj', 'edr'],
      blockedNodeIds: ['edr'],
      telemetryLog: 'ACTION_BLOCKED: Process powershell.exe (PID 8840) TERMINATED by Falcon Kernel Engine',
      outcomeTakeaway: 'Behavioral detection catches zero-day execution without waiting for antivirus file hash definitions.',
    },
    {
      id: 3,
      code: 'ISOL',
      title: 'Host Network Isolation Engaged',
      summary: 'Analyst triggers network containment: all TCP sockets blocked except secure EDR tunnel.',
      activeNodeIds: ['edr', 'isol'],
      telemetryLog: 'HOST_CONTAINED: FIN-PC-04 isolated from LAN. Only management telemetry active | STATE: SAFE',
      outcomeTakeaway: 'Outcome: Lateral movement blocked across corporate LAN while investigation proceeds securely.',
    },
  ],
};

// -----------------------------------------------------------------------------
// 7. EMAIL SECURITY & THREAT INTELLIGENCE (Module 11)
// -----------------------------------------------------------------------------
const EMAIL_PHISH_MODEL: DomainVideoModel = {
  domainId: 'email-phish',
  domainName: 'Email Phishing & Threat Intelligence',
  badgeCode: 'MAIL',
  caption: 'SMTP Header Analysis, SPF/DKIM Authentication, Sandbox Detonation & IOC Matching',
  nodes: [
    {
      id: 'smtp',
      label: 'SMTP',
      sub: 'SEND',
      cx: 60,
      cy: 90,
      boxX: 38,
      boxY: 68,
      width: 44,
      height: 44,
      roleType: 'source',
      description: 'External SMTP mail server transmitting inbound spear-phishing message.',
    },
    {
      id: 'spf',
      label: 'SPF',
      sub: 'AUTH',
      cx: 145,
      cy: 50,
      boxX: 123,
      boxY: 28,
      width: 44,
      height: 44,
      roleType: 'boundary',
      description: 'Sender Policy Framework (SPF) evaluating sending IP against sender DNS record.',
    },
    {
      id: 'dkim',
      label: 'DKIM',
      sub: 'SIGN',
      cx: 145,
      cy: 150,
      boxX: 123,
      boxY: 128,
      width: 44,
      height: 44,
      roleType: 'boundary',
      description: 'DomainKeys Identified Mail (DKIM) verifying cryptographic email signature.',
    },
    {
      id: 'link',
      label: 'LINK',
      sub: 'URL',
      cx: 232,
      cy: 50,
      boxX: 210,
      boxY: 28,
      width: 44,
      height: 44,
      roleType: 'target',
      description: 'Embedded hyperlinked URL pointing to deceptive typosquatting credential harvesting portal.',
    },
    {
      id: 'sand',
      label: 'SAND',
      sub: 'DET',
      cx: 232,
      cy: 150,
      boxX: 210,
      boxY: 128,
      width: 44,
      height: 44,
      roleType: 'sensor',
      description: 'Automated malware sandbox detonating attached file and inspecting outbound DNS requests.',
    },
    {
      id: 'quar',
      label: 'QUAR',
      sub: 'DROP',
      cx: 312,
      cy: 90,
      boxX: 290,
      boxY: 68,
      width: 44,
      height: 44,
      roleType: 'safety',
      description: 'Email security gateway quarantine holding malicious message away from employee inbox.',
    },
  ],
  conduits: [
    { from: 'smtp', to: 'spf', label: 'IP', activeInScenes: [0] },
    { from: 'spf', to: 'dkim', label: 'CRYP', activeInScenes: [0, 1] },
    { from: 'dkim', to: 'link', label: 'SCAN', activeInScenes: [1, 2] },
    { from: 'link', to: 'sand', label: 'DETO', activeInScenes: [2, 3] },
    { from: 'sand', to: 'quar', label: 'DROP', activeInScenes: [3] },
  ],
  scenes: [
    {
      id: 0,
      code: 'MAIL',
      title: 'Inbound Message Hits Mail Gateway',
      summary: 'Deceptive email with subject "Urgent: Salary Revision" delivered to edge mail transfer agent.',
      activeNodeIds: ['smtp', 'spf'],
      telemetryLog: 'MTA_IN: From: ceo@f1n-corp.com (IP: 185.220.101.5) | Subject: Urgent Wire Transfer Request',
      outcomeTakeaway: 'Always inspect the actual envelope Return-Path header rather than the friendly display name.',
    },
    {
      id: 1,
      code: 'AUTH',
      title: 'SPF Hard Fail & DKIM Header Mismatch',
      summary: 'Sender IP does not exist in DNS TXT record; cryptographic signature missing or forged.',
      activeNodeIds: ['spf', 'dkim', 'link'],
      alertNodeIds: ['spf', 'dkim'],
      telemetryLog: 'AUTH_RESULT: spf=hardfail (185.220.101.5 not authorized) dkim=none dmarc=fail (p=reject)',
      outcomeTakeaway: 'DMARC alignment failure indicates spoofed executive impersonation attempt.',
    },
    {
      id: 2,
      code: 'DETO',
      title: 'Automated Sandbox Detonation',
      summary: 'Sandbox emulator opens embedded link; identifies fake Microsoft 365 credential prompt.',
      activeNodeIds: ['link', 'sand'],
      telemetryLog: 'SANDBOX_FINDING: URL redirects to login-update-verify[.]pw | PhishTank score: 98/100 MALICIOUS',
      outcomeTakeaway: 'Never click suspicious URLs from an analyst workstation; use isolated sandboxes or urlscan.io.',
    },
    {
      id: 3,
      code: 'QUAR',
      title: 'Message Quarantined & IOC Propagated',
      summary: 'Message pulled from all mailboxes; malicious domain added to perimeter blocklist.',
      activeNodeIds: ['sand', 'quar'],
      blockedNodeIds: ['quar'],
      telemetryLog: 'QUARANTINE: Message ID 99214 purged from 14 recipients | IOC domain blacklisted: TRUE',
      outcomeTakeaway: 'Outcome: Organization protected from credential theft; threat intel updated with zero clicks.',
    },
  ],
};

// -----------------------------------------------------------------------------
// 8. SOAR PLAYBOOK AUTOMATION & APPROVAL GATES (Module 12)
// -----------------------------------------------------------------------------
const SOAR_AUTOMATION_MODEL: DomainVideoModel = {
  domainId: 'soar-automation',
  domainName: 'SOAR & Playbook Automation',
  badgeCode: 'SOAR',
  caption: 'Automated Alert Ingestion, API Threat Enrichment, Human Approval Gates & Playbook Actions',
  nodes: [
    {
      id: 'alrt',
      label: 'ALRT',
      sub: 'IN',
      cx: 60,
      cy: 90,
      boxX: 38,
      boxY: 68,
      width: 44,
      height: 44,
      roleType: 'source',
      description: 'Incoming high-priority security alert ingested via webhook from SIEM or EDR.',
    },
    {
      id: 'soar',
      label: 'SOAR',
      sub: 'PLAY',
      cx: 145,
      cy: 50,
      boxX: 123,
      boxY: 28,
      width: 44,
      height: 44,
      roleType: 'boundary',
      description: 'SOAR orchestration engine executing standard automated workflow playbook.',
    },
    {
      id: 'enr',
      label: 'ENR',
      sub: 'API',
      cx: 145,
      cy: 150,
      boxX: 123,
      boxY: 128,
      width: 44,
      height: 44,
      roleType: 'sensor',
      description: 'Automated REST API threat enrichment: VirusTotal score, IP geo-lookup, and Active Directory check.',
    },
    {
      id: 'gate',
      label: 'GATE',
      sub: 'HUM',
      cx: 232,
      cy: 50,
      boxX: 210,
      boxY: 28,
      width: 44,
      height: 44,
      roleType: 'target',
      description: 'Mandatory Human-in-the-Loop approval gate requiring L1 analyst click to authorize high-impact action.',
    },
    {
      id: 'exec',
      label: 'EXEC',
      sub: 'ACT',
      cx: 232,
      cy: 150,
      boxX: 210,
      boxY: 128,
      width: 44,
      height: 44,
      roleType: 'actuator',
      description: 'Target firewall API blocking IP, or identity provider revoking active session tokens.',
    },
    {
      id: 'case',
      label: 'CASE',
      sub: 'DOC',
      cx: 312,
      cy: 90,
      boxX: 290,
      boxY: 68,
      width: 44,
      height: 44,
      roleType: 'safety',
      description: 'Automated case management ticket updated with full audit trail and timestamps.',
    },
  ],
  conduits: [
    { from: 'alrt', to: 'soar', label: 'TRIG', activeInScenes: [0] },
    { from: 'soar', to: 'enr', label: 'CALL', activeInScenes: [0, 1] },
    { from: 'enr', to: 'gate', label: 'PASS', activeInScenes: [1, 2] },
    { from: 'gate', to: 'exec', label: 'APPR', activeInScenes: [2, 3] },
    { from: 'exec', to: 'case', label: 'LOG', activeInScenes: [3] },
  ],
  scenes: [
    {
      id: 0,
      code: 'TRIG',
      title: 'Alert Triggers Playbook Execution',
      summary: 'SOAR receives alert; evaluates trigger criteria and spawns "Phishing Triage" playbook.',
      activeNodeIds: ['alrt', 'soar'],
      telemetryLog: 'PLAYBOOK_START: Name="Auto_Triage_Phish_v2" | Trigger=Alert SEC-994 | Status=RUNNING',
      outcomeTakeaway: 'Automated triggers reduce MTTA (Mean Time to Acknowledge) from minutes to sub-seconds.',
    },
    {
      id: 1,
      code: 'ENR',
      title: 'Multi-Source API Enrichment',
      summary: 'SOAR queries VirusTotal, Shodan, and Active Directory; aggregates observables onto case card.',
      activeNodeIds: ['soar', 'enr', 'gate'],
      telemetryLog: 'API_ENRICH: VT_score=14/70 | ASN=AS14061 DigitalOcean | AD_User="finance_dept" | High Risk',
      outcomeTakeaway: 'Automating repetitive query tasks frees analysts to focus on cognitive investigation decisions.',
    },
    {
      id: 2,
      code: 'GATE',
      title: 'Human-in-the-Loop Analyst Gate',
      summary: 'Playbook halts at safety gate: L1 Analyst reviews empirical findings and clicks "Approve Containment".',
      activeNodeIds: ['enr', 'gate'],
      alertNodeIds: ['gate'],
      telemetryLog: 'APPROVAL_GATE: High-impact action "BLOCK_IP" pending L1 analyst signature | SLA: 3m',
      outcomeTakeaway: 'Critical response actions must never run fully automated without human oversight gates.',
    },
    {
      id: 3,
      code: 'EXEC',
      title: 'Action Executed & Case Documented',
      summary: 'Firewall API commits block rule; ticketing system closes incident with full reproducible log.',
      activeNodeIds: ['gate', 'exec', 'case'],
      telemetryLog: 'PLAYBOOK_COMPLETE: FW rule added | User session terminated | Ticket #IR-2026-44 updated',
      outcomeTakeaway: 'Outcome: Reversible containment completed in seconds with complete auditable compliance record.',
    },
  ],
};

// -----------------------------------------------------------------------------
// 9. MITRE ATT&CK MATRIX & TTP MAPPING (Module 13)
// -----------------------------------------------------------------------------
const MITRE_MATRIX_MODEL: DomainVideoModel = {
  domainId: 'mitre-matrix',
  domainName: 'MITRE ATT&CK Matrix Mapping',
  badgeCode: 'TTP',
  caption: 'Tactics, Techniques & Procedures (TTPs) Mapping from Initial Access to Impact',
  nodes: [
    {
      id: 'init',
      label: 'INIT',
      sub: 'TA01',
      cx: 60,
      cy: 90,
      boxX: 38,
      boxY: 68,
      width: 44,
      height: 44,
      roleType: 'source',
      description: 'Tactic TA0001 Initial Access: Spearphishing link or external service exploitation.',
    },
    {
      id: 'exec',
      label: 'EXEC',
      sub: 'TA02',
      cx: 145,
      cy: 50,
      boxX: 123,
      boxY: 28,
      width: 44,
      height: 44,
      roleType: 'boundary',
      description: 'Tactic TA0002 Execution: Command and Scripting Interpreter (T1059 PowerShell/Bash).',
    },
    {
      id: 'pers',
      label: 'PERS',
      sub: 'TA03',
      cx: 145,
      cy: 150,
      boxX: 123,
      boxY: 128,
      width: 44,
      height: 44,
      roleType: 'target',
      description: 'Tactic TA0003 Persistence: Scheduled Task/Job (T1053) or Registry Run Keys (T1547).',
    },
    {
      id: 'cred',
      label: 'CRED',
      sub: 'TA06',
      cx: 232,
      cy: 50,
      boxX: 210,
      boxY: 28,
      width: 44,
      height: 44,
      roleType: 'target',
      description: 'Tactic TA0006 Credential Access: OS Credential Dumping (T1003 LSASS Memory / SAM).',
    },
    {
      id: 'c2',
      label: 'C2',
      sub: 'TA11',
      cx: 232,
      cy: 150,
      boxX: 210,
      boxY: 128,
      width: 44,
      height: 44,
      roleType: 'sensor',
      description: 'Tactic TA0011 Command and Control: Application Layer Protocol (T1071 HTTPS/DNS).',
    },
    {
      id: 'map',
      label: 'MAP',
      sub: 'L1',
      cx: 312,
      cy: 90,
      boxX: 290,
      boxY: 68,
      width: 44,
      height: 44,
      roleType: 'safety',
      description: 'L1 Analyst mapping empirical log observables to exact technique IDs without guesswork.',
    },
  ],
  conduits: [
    { from: 'init', to: 'exec', label: 'T156', activeInScenes: [0] },
    { from: 'exec', to: 'pers', label: 'T105', activeInScenes: [0, 1] },
    { from: 'pers', to: 'cred', label: 'T100', activeInScenes: [1, 2] },
    { from: 'cred', to: 'c2', label: 'T107', activeInScenes: [2, 3] },
    { from: 'c2', to: 'map', label: 'EVID', activeInScenes: [3] },
  ],
  scenes: [
    {
      id: 0,
      code: 'INIT',
      title: 'Technique T1566: Phishing Attachment',
      summary: 'Analyst links email log artifact to Initial Access tactic (TA0001) based on raw email header.',
      activeNodeIds: ['init', 'exec'],
      telemetryLog: 'MITRE_MAP: technique="T1566.001" tactic="Initial Access" artifact="invoice.xlsm" confidence=HIGH',
      outcomeTakeaway: 'Always verify technique mapping with primary telemetry rather than guessing the attack chain.',
    },
    {
      id: 1,
      code: 'EXEC',
      title: 'Technique T1059: Command Scripting',
      summary: 'Process launch log confirms execution of base64 PowerShell command.',
      activeNodeIds: ['exec', 'pers'],
      alertNodeIds: ['exec'],
      telemetryLog: 'MITRE_MAP: technique="T1059.001" tactic="Execution" process="powershell.exe" confidence=CERTAIN',
      outcomeTakeaway: 'Differentiate between the tool (PowerShell) and the technique (Scripting Interpreter execution).',
    },
    {
      id: 2,
      code: 'CRED',
      title: 'Technique T1003: LSASS Memory Dump',
      summary: 'Sysmon Event 10 indicates unauthorized handle opened to lsass.exe process.',
      activeNodeIds: ['pers', 'cred', 'c2'],
      alertNodeIds: ['cred'],
      telemetryLog: 'MITRE_MAP: technique="T1003.001" tactic="Credential Access" target="lsass.exe" access=0x1010',
      outcomeTakeaway: 'Credential dumping triggers immediate escalation to Tier 2 and password reset playbooks.',
    },
    {
      id: 3,
      code: 'MAP',
      title: 'Structured MITRE Report Completed',
      summary: 'Analyst synthesizes empirical evidence into standardized ATT&CK navigator layer for incident response.',
      activeNodeIds: ['c2', 'map'],
      telemetryLog: 'ATTACK_MATRIX: 4 Techniques mapped | Zero uncorroborated inferences | Ready for L2 handoff',
      outcomeTakeaway: 'Outcome: Clear adversary behavioral vocabulary shared across all tiers of the SOC.',
    },
  ],
};

// -----------------------------------------------------------------------------
// 10. INCIDENT RESPONSE LIFECYCLE & CASE DOCUMENTATION (Module 14)
// -----------------------------------------------------------------------------
const INCIDENT_RESPONSE_MODEL: DomainVideoModel = {
  domainId: 'incident-response',
  domainName: 'Incident Response Lifecycle (PICERL)',
  badgeCode: 'IR',
  caption: 'Preparation, Identification, Containment, Eradication, Recovery & Post-Incident Review',
  nodes: [
    {
      id: 'prep',
      label: 'PREP',
      sub: 'SOP',
      cx: 60,
      cy: 90,
      boxX: 38,
      boxY: 68,
      width: 44,
      height: 44,
      roleType: 'source',
      description: 'Phase 1 Preparation: Playbooks, access controls, contact lists, and jump bags.',
    },
    {
      id: 'idnt',
      label: 'IDNT',
      sub: 'ALRT',
      cx: 145,
      cy: 50,
      boxX: 123,
      boxY: 28,
      width: 44,
      height: 44,
      roleType: 'boundary',
      description: 'Phase 2 Identification: Triaging observables, confirming breach vs false positive.',
    },
    {
      id: 'cont',
      label: 'CONT',
      sub: 'ISOL',
      cx: 145,
      cy: 150,
      boxX: 123,
      boxY: 128,
      width: 44,
      height: 44,
      roleType: 'target',
      description: 'Phase 3 Containment: Short-term isolation of affected host and account disablement.',
    },
    {
      id: 'erad',
      label: 'ERAD',
      sub: 'CLEA',
      cx: 232,
      cy: 50,
      boxX: 210,
      boxY: 28,
      width: 44,
      height: 44,
      roleType: 'target',
      description: 'Phase 4 Eradication: Removing malware artifacts, persistent registry keys, and rootkits.',
    },
    {
      id: 'reco',
      label: 'RECO',
      sub: 'REST',
      cx: 232,
      cy: 150,
      boxX: 210,
      boxY: 128,
      width: 44,
      height: 44,
      roleType: 'sensor',
      description: 'Phase 5 Recovery: Restoring clean systems from backup, verifying enhanced monitoring.',
    },
    {
      id: 'post',
      label: 'POST',
      sub: 'LESS',
      cx: 312,
      cy: 90,
      boxX: 290,
      boxY: 68,
      width: 44,
      height: 44,
      roleType: 'safety',
      description: 'Phase 6 Lessons Learned: Documenting case timeline, root cause analysis, and SOP updates.',
    },
  ],
  conduits: [
    { from: 'prep', to: 'idnt', label: 'SOP', activeInScenes: [0] },
    { from: 'idnt', to: 'cont', label: 'EVID', activeInScenes: [0, 1] },
    { from: 'cont', to: 'erad', label: 'ISOL', activeInScenes: [1, 2] },
    { from: 'erad', to: 'reco', label: 'SCAN', activeInScenes: [2, 3] },
    { from: 'reco', to: 'post', label: 'DOC', activeInScenes: [3] },
  ],
  scenes: [
    {
      id: 0,
      code: 'IDNT',
      title: 'Incident Identification & Triage',
      summary: 'L1 Analyst verifies User, Host, IP, and Timestamps; declares True Positive incident.',
      activeNodeIds: ['prep', 'idnt'],
      telemetryLog: 'IR_CASE_OPEN: Incident ID #IR-2026-881 | Severity: HIGH | Declared by L1 Analyst',
      outcomeTakeaway: 'Distinguish between benign operational anomalies and confirmed security incidents.',
    },
    {
      id: 1,
      code: 'CONT',
      title: 'Immediate Threat Containment',
      summary: 'Affected endpoint isolated from network; attacker C2 connection abruptly severed.',
      activeNodeIds: ['idnt', 'cont'],
      alertNodeIds: ['cont'],
      telemetryLog: 'CONTAINMENT: Host FIN-WS-02 ISOLATED | Kerberos ticket invalidated | Lateral spread halted',
      outcomeTakeaway: 'Containment must be executed quickly to prevent ransomware spreading across shared subnets.',
    },
    {
      id: 2,
      code: 'ERAD',
      title: 'Artifact Eradication & Verification',
      summary: 'Tier 2/3 forensics team cleans persistence keys and verifies no dormant secondary backdoors.',
      activeNodeIds: ['cont', 'erad', 'reco'],
      telemetryLog: 'ERADICATION: Malicious scheduled task removed | SHA256 purged from storage | State: CLEAN',
      outcomeTakeaway: 'Never restore a system until the exact persistence mechanism has been identified and eradicated.',
    },
    {
      id: 3,
      code: 'POST',
      title: 'Post-Incident Review & Handover',
      summary: 'Shift handover memo signed; root cause identified and detection rule added to SIEM repository.',
      activeNodeIds: ['reco', 'post'],
      telemetryLog: 'POST_MORTEM: Root Cause: Phishing attachment | Case Closed | New Sigma Rule deployed',
      outcomeTakeaway: 'Outcome: Incident formally closed with permanent hardening added to protect future shifts.',
    },
  ],
};

// -----------------------------------------------------------------------------
// 11A. MODULE 00 UNIT 1 CHAPTER 1: A visitor, not yet an analyst
// -----------------------------------------------------------------------------
const M00_U1_C1_VISITOR_MODEL: DomainVideoModel = {
  domainId: 'm00-u1-c1-visitor',
  domainName: 'A Visitor, Not Yet an Analyst',
  badgeCode: 'VISI',
  caption: 'Arrival at CDAC Bengaluru Learning Campus, Visitor Badge & The First Rule',
  nodes: [
    {
      id: 'camp',
      label: 'CDAC',
      sub: 'BLR',
      cx: 60,
      cy: 90,
      boxX: 38,
      boxY: 68,
      width: 44,
      height: 44,
      roleType: 'source',
      description: 'CDAC Bengaluru learning campus where your training journey begins.',
    },
    {
      id: 'bdge',
      label: 'BDGE',
      sub: 'LEAR',
      cx: 145,
      cy: 50,
      boxX: 123,
      boxY: 28,
      width: 44,
      height: 44,
      roleType: 'boundary',
      description: 'Visitor badge reading "SOC Learner"—no prior IT background required.',
    },
    {
      id: 'anan',
      label: 'ANAN',
      sub: 'LEAD',
      cx: 145,
      cy: 150,
      boxX: 123,
      boxY: 128,
      width: 44,
      height: 44,
      roleType: 'boundary',
      description: 'Mentor Ananya, SOC shift lead: patient, precise, and supportive.',
    },
    {
      id: 'you',
      label: 'YOU',
      sub: 'NEW',
      cx: 232,
      cy: 90,
      boxX: 210,
      boxY: 68,
      width: 44,
      height: 44,
      roleType: 'target',
      description: 'Visiting learner carrying curiosity rather than prior technical knowledge.',
    },
    {
      id: 'safe',
      label: 'SAFE',
      sub: 'RULE',
      cx: 312,
      cy: 90,
      boxX: 290,
      boxY: 68,
      width: 44,
      height: 44,
      roleType: 'safety',
      description: 'Golden Rule: Ask for help before changing anything unfamiliar.',
    },
  ],
  conduits: [
    { from: 'camp', to: 'bdge', label: 'JOIN', activeInScenes: [0] },
    { from: 'bdge', to: 'anan', label: 'MEET', activeInScenes: [0, 1] },
    { from: 'anan', to: 'you', label: 'GUID', activeInScenes: [1, 2] },
    { from: 'you', to: 'safe', label: 'ASK', activeInScenes: [2, 3] },
  ],
  scenes: [
    {
      id: 0,
      code: 'ARRV',
      title: 'Arrival at CDAC Bengaluru Campus',
      summary: 'Morning light falls across the training campus. You arrive as a curious visitor, ready to learn.',
      activeNodeIds: ['camp', 'bdge'],
      telemetryLog: 'CAMPUS_ENTRY: Facility=CDAC-BLR | Badge=PENDING | Status=VISITOR_CHECKIN',
      outcomeTakeaway: 'You do not need an IT background; everyday curiosity is your best starting point.',
    },
    {
      id: 1,
      code: 'BDGE',
      title: 'Visitor Badge Issued: SOC Learner',
      summary: 'Mentor Ananya welcomes you and presents your badge reading "SOC Learner".',
      activeNodeIds: ['bdge', 'anan'],
      telemetryLog: 'BADGE_ISSUE: Name=Trainee | Role="SOC Learner" | Access=TRAINING_CAMPUS',
      outcomeTakeaway: 'Nobody expects you to investigate an attack today; baseline understanding comes first.',
    },
    {
      id: 2,
      code: 'DISC',
      title: 'Understand Ordinary Activity First',
      summary: 'Before recognizing cyber danger, you must first understand how ordinary computers and software work.',
      activeNodeIds: ['anan', 'you'],
      telemetryLog: 'ORIENT_SOP: Lesson=Understand_Ordinary_Activity | Focus=Baselines_First',
      outcomeTakeaway: 'Understanding ordinary computing provides the foundation to spot genuine anomalies later.',
    },
    {
      id: 3,
      code: 'RULE',
      title: 'First Rule: Ask Before Changing Anything',
      summary: 'When encountering an unfamiliar screen or setting: ask for help before changing anything.',
      activeNodeIds: ['you', 'safe'],
      telemetryLog: 'GOLDEN_RULE: State=UNFAMILIAR | Action=ASK_FOR_HELP | Curiosity=WELCOME',
      outcomeTakeaway: 'Analyst Doctrine: Curiosity is welcome; unsupported, speculative action is not.',
    },
  ],
};

// -----------------------------------------------------------------------------
// 11B. MODULE 00 UNIT 1 CHAPTER 2: The centre and its people
// -----------------------------------------------------------------------------
const M00_U1_C2_ZONES_MODEL: DomainVideoModel = {
  domainId: 'm00-u1-c2-zones',
  domainName: 'The Centre and Its People',
  badgeCode: 'ZONE',
  caption: 'The 6 Teaching Zones: Support, Network, Identity, Monitoring, Response & Industrial',
  nodes: [
    {
      id: 'staf',
      label: 'STAF',
      sub: 'SUPP',
      cx: 60,
      cy: 60,
      boxX: 38,
      boxY: 38,
      width: 44,
      height: 42,
      roleType: 'source',
      description: 'Staff Support: Handles physical hardware, broken keyboards, and desktop peripherals.',
    },
    {
      id: 'idnt',
      label: 'IDNT',
      sub: 'AUTH',
      cx: 60,
      cy: 160,
      boxX: 38,
      boxY: 138,
      width: 44,
      height: 42,
      roleType: 'source',
      description: 'Identity Services: Manages user logins, passwords, MFA tokens, and account permissions.',
    },
    {
      id: 'net',
      label: 'NET',
      sub: 'ROUT',
      cx: 145,
      cy: 110,
      boxX: 123,
      boxY: 88,
      width: 44,
      height: 44,
      roleType: 'boundary',
      description: 'Network Services: Manages physical switches, routers, and campus data connectivity.',
    },
    {
      id: 'mon',
      label: 'MON',
      sub: 'SOC',
      cx: 232,
      cy: 60,
      boxX: 210,
      boxY: 38,
      width: 44,
      height: 42,
      roleType: 'target',
      description: 'Security Monitoring (SOC): Observes telemetry and alerts without owning every department.',
    },
    {
      id: 'resp',
      label: 'RESP',
      sub: 'IR',
      cx: 232,
      cy: 160,
      boxX: 210,
      boxY: 138,
      width: 44,
      height: 42,
      roleType: 'actuator',
      description: 'Response Coordination: Executes containment playbooks and works with service owners.',
    },
    {
      id: 'ind',
      label: 'IND',
      sub: 'DEMO',
      cx: 312,
      cy: 110,
      boxX: 290,
      boxY: 88,
      width: 44,
      height: 44,
      roleType: 'safety',
      description: 'Industrial Demonstration Zone: Safe testbed for physical controllers and OT simulations.',
    },
  ],
  conduits: [
    { from: 'staf', to: 'mon', label: 'CORD', activeInScenes: [0, 1] },
    { from: 'idnt', to: 'mon', label: 'AUTH', activeInScenes: [1, 2] },
    { from: 'net', to: 'mon', label: 'FLOW', activeInScenes: [2] },
    { from: 'mon', to: 'resp', label: 'ESCL', activeInScenes: [2, 3] },
    { from: 'resp', to: 'ind', label: 'SAFE', activeInScenes: [3] },
  ],
  scenes: [
    {
      id: 0,
      code: 'MAP',
      title: 'The 6 Campus Teaching Zones',
      summary: 'A training map reveals staff support, network, identity, monitoring, response, and industrial zones.',
      activeNodeIds: ['staf', 'net', 'idnt', 'mon'],
      telemetryLog: 'ZONE_MAP: Staff_Support | Network | Identity | Monitoring | Response | Industrial',
      outcomeTakeaway: 'These are teaching zones; the SOC does not own every service or fix every computer.',
    },
    {
      id: 1,
      code: 'STAF',
      title: 'Routing Non-Security Requests Away from SOC',
      summary: 'A broken keyboard is routed to Staff Support; an account password unlock goes to Identity Services.',
      activeNodeIds: ['staf', 'idnt'],
      telemetryLog: 'TICKET_ROUTE: Keyboard_Fault -> STAFF_SUPPORT | Password_Reset -> IDENTITY_SERVICES',
      outcomeTakeaway: 'The SOC does not repair keyboards; specialists manage their own operational domains.',
    },
    {
      id: 2,
      code: 'MON',
      title: 'SOC Observes Security Telemetry',
      summary: 'When a suspicious login alert occurs, the SOC begins triage while informing the identity team.',
      activeNodeIds: ['idnt', 'net', 'mon'],
      alertNodeIds: ['mon'],
      telemetryLog: 'ALERT_TRIAGE: Alert=SEC-ALRT-01 | Target=Identity_Log | Status=COORDINATING',
      outcomeTakeaway: 'The SOC investigates security while keeping the asset or service owner informed.',
    },
    {
      id: 3,
      code: 'COOP',
      title: 'Cooperation Across Team Boundaries',
      summary: 'Security responders coordinate with service owners rather than acting in isolated silos.',
      activeNodeIds: ['mon', 'resp', 'ind'],
      telemetryLog: 'COLLAB_MEMO: Security_Lead + Service_Owner -> Joint_Verification_Signed',
      outcomeTakeaway: 'Analyst Doctrine: Cooperation matters more than pretending one team knows everything.',
    },
  ],
};

// -----------------------------------------------------------------------------
// 11C. MODULE 00 UNIT 2 CHAPTER 1: Your practice space
// -----------------------------------------------------------------------------
const M00_U2_C1_PRACTICE_SPACE_MODEL: DomainVideoModel = {
  domainId: 'm00-u2-c1-space',
  domainName: 'Your Practice Space',
  badgeCode: 'LAB',
  caption: 'Blue-Bordered Learning Console, Isolated Sandbox VM & Safe Boundaries',
  nodes: [
    {
      id: 'blue',
      label: 'BLUE',
      sub: 'LINE',
      cx: 60,
      cy: 90,
      boxX: 38,
      boxY: 68,
      width: 44,
      height: 44,
      roleType: 'source',
      description: 'Blue border framing the learning console—marking it as a safe training space.',
    },
    {
      id: 'vm',
      label: 'VM',
      sub: 'ISOL',
      cx: 145,
      cy: 50,
      boxX: 123,
      boxY: 28,
      width: 44,
      height: 44,
      roleType: 'boundary',
      description: 'Supplied training virtual machine with safe exercise files.',
    },
    {
      id: 'prod',
      label: 'PROD',
      sub: 'LOCK',
      cx: 145,
      cy: 150,
      boxX: 123,
      boxY: 128,
      width: 44,
      height: 44,
      roleType: 'boundary',
      description: 'Locked production operations—completely separated from training exercises.',
    },
    {
      id: 'mode',
      label: 'MODE',
      sub: 'HOST',
      cx: 232,
      cy: 50,
      boxX: 210,
      boxY: 28,
      width: 44,
      height: 44,
      roleType: 'sensor',
      description: 'Approved host-only network mode preventing outside traffic leakage.',
    },
    {
      id: 'rest',
      label: 'REST',
      sub: 'SNAP',
      cx: 232,
      cy: 150,
      boxX: 210,
      boxY: 128,
      width: 44,
      height: 44,
      roleType: 'target',
      description: 'Snapshot reset procedure returning the practice space to a known clean baseline.',
    },
    {
      id: 'gate',
      label: 'GATE',
      sub: 'SAFE',
      cx: 312,
      cy: 90,
      boxX: 290,
      boxY: 68,
      width: 44,
      height: 44,
      roleType: 'safety',
      description: 'Safety boundary rule: Never scan or target college or external networks.',
    },
  ],
  conduits: [
    { from: 'blue', to: 'vm', label: 'ISOL', activeInScenes: [0, 1] },
    { from: 'vm', to: 'mode', label: 'CONF', activeInScenes: [1, 2] },
    { from: 'mode', to: 'rest', label: 'CLEA', activeInScenes: [2] },
    { from: 'mode', to: 'gate', label: 'STOP', activeInScenes: [2, 3] },
    { from: 'prod', to: 'gate', label: 'DENY', activeInScenes: [3] },
  ],
  scenes: [
    {
      id: 0,
      code: 'BLUE',
      title: 'Blue Outline: Safe Training Console',
      summary: 'A blue border surrounds your learning screen; everything inside is an authorized simulation.',
      activeNodeIds: ['blue', 'vm'],
      telemetryLog: 'TRAINING_CONSOLE: Border=BLUE | State=SIMULATED | Production=ISOLATED',
      outcomeTakeaway: 'Blue outlines clearly indicate safe practice spaces separate from production.',
    },
    {
      id: 1,
      code: 'ISOL',
      title: 'Host-Only Network Isolation',
      summary: 'Mentor Ravi verifies the network mode: a VM is not automatically safe unless isolated.',
      activeNodeIds: ['vm', 'mode'],
      telemetryLog: 'VM_CONFIG: Adapter=Host-Only (192.168.56.0/24) | Internet=OFF | Bridge=DISABLED',
      outcomeTakeaway: 'A virtual machine is not automatically a safety barrier; use supplied isolation settings.',
    },
    {
      id: 2,
      code: 'REST',
      title: 'Safe Reset & Snapshot Rollback',
      summary: 'Ravi demonstrates the reset procedure; practice files can be tested without fear of permanent damage.',
      activeNodeIds: ['mode', 'rest'],
      telemetryLog: 'SNAPSHOT_RESET: Target=Lab_VM_01 | State=CLEAN_BASELINE | Data=PRESERVED',
      outcomeTakeaway: 'Snapshot rollbacks ensure a reliable, repeatable environment for risk-free learning.',
    },
    {
      id: 3,
      code: 'STOP',
      title: 'Boundary Check: No Outside Probing',
      summary: 'Permission for this lab does not include other systems. Never target college or home networks.',
      activeNodeIds: ['prod', 'gate'],
      blockedNodeIds: ['prod'],
      telemetryLog: 'SAFETY_POLICY: Target=OUTSIDE_NETWORKS | Status=PROHIBITED | StopAndAsk=TRUE',
      outcomeTakeaway: 'Analyst Doctrine: Stop and ask whenever the lab boundary is unclear.',
    },
  ],
};

// -----------------------------------------------------------------------------
// 11D. MODULE 00 UNIT 2 CHAPTER 2: A clue worth preserving
// -----------------------------------------------------------------------------
const M00_U2_C2_PRESERVE_CLUE_MODEL: DomainVideoModel = {
  domainId: 'm00-u2-c2-clue',
  domainName: 'A Clue Worth Preserving',
  badgeCode: 'EVID',
  caption: 'Original Evidence Locked Intact, Working Copies & The Safe Pause',
  nodes: [
    {
      id: 'orig',
      label: 'ORIG',
      sub: 'LOCK',
      cx: 60,
      cy: 90,
      boxX: 38,
      boxY: 68,
      width: 44,
      height: 44,
      roleType: 'source',
      description: 'Original evidence file locked in read-only format—never edited or cleaned up.',
    },
    {
      id: 'copy',
      label: 'COPY',
      sub: 'WORK',
      cx: 145,
      cy: 50,
      boxX: 123,
      boxY: 28,
      width: 44,
      height: 44,
      roleType: 'boundary',
      description: 'Working duplicate copy where all filtering, searching, and analysis take place.',
    },
    {
      id: 'meta',
      label: 'META',
      sub: 'TIME',
      cx: 145,
      cy: 150,
      boxX: 123,
      boxY: 128,
      width: 44,
      height: 44,
      roleType: 'sensor',
      description: 'Metadata: Source host, extraction time, and explicit time zone convention.',
    },
    {
      id: 'doc',
      label: 'DOC',
      sub: 'NOTE',
      cx: 232,
      cy: 50,
      boxX: 210,
      boxY: 28,
      width: 44,
      height: 44,
      roleType: 'target',
      description: 'Documenting every action so another analyst can verify the exact steps.',
    },
    {
      id: 'paus',
      label: 'PAUS',
      sub: 'SAFE',
      cx: 232,
      cy: 150,
      boxX: 210,
      boxY: 128,
      width: 44,
      height: 44,
      roleType: 'safety',
      description: 'Safe Pause: If an unfamiliar command might delete data, stop and record what you see.',
    },
    {
      id: 'ment',
      label: 'MENT',
      sub: 'HELP',
      cx: 312,
      cy: 90,
      boxX: 290,
      boxY: 68,
      width: 44,
      height: 44,
      roleType: 'safety',
      description: 'Mentor guidance: Asking for help when commands or instructions carry risk.',
    },
  ],
  conduits: [
    { from: 'orig', to: 'copy', label: 'FORK', activeInScenes: [0, 1] },
    { from: 'orig', to: 'meta', label: 'ATTR', activeInScenes: [1] },
    { from: 'copy', to: 'doc', label: 'LOG', activeInScenes: [1, 2] },
    { from: 'doc', to: 'paus', label: 'HALT', activeInScenes: [2, 3] },
    { from: 'paus', to: 'ment', label: 'ASK', activeInScenes: [3] },
  ],
  scenes: [
    {
      id: 0,
      code: 'LOCK',
      title: 'Original Evidence Kept Intact',
      summary: 'Mentor Ananya shows a raw alert log. Never "tidy" an original; lock it read-only.',
      activeNodeIds: ['orig', 'copy'],
      telemetryLog: 'EVIDENCE_LOCK: File=auth_raw.log | Mode=READ_ONLY | ModifyingOriginal=PROHIBITED',
      outcomeTakeaway: 'Evidence is information another analyst can inspect, not your memory of what happened.',
    },
    {
      id: 1,
      code: 'COPY',
      title: 'Work on a Duplicate Copy',
      summary: 'Analyst duplicates the source file. All searching and formatting occur on the working copy.',
      activeNodeIds: ['copy', 'meta'],
      telemetryLog: 'DUPLICATE: Source=auth_raw.log -> WorkingCopy=auth_working.log | SHA256=MATCH',
      outcomeTakeaway: 'Always keep the original intact and work exclusively on documented duplicates.',
    },
    {
      id: 2,
      code: 'META',
      title: 'Record Source & Collection Time',
      summary: 'Document where the file came from, when it was collected, and which time zone was used.',
      activeNodeIds: ['copy', 'doc'],
      telemetryLog: 'METADATA_RECORD: Host=BLR-BR-WS-04 | Time=2026-10-14T09:15:00+05:30 | Action=PARSED',
      outcomeTakeaway: 'Documenting source and time ensures findings are repeatable and independently verifiable.',
    },
    {
      id: 3,
      code: 'PAUS',
      title: 'The Safe Pause Over Guessing',
      summary: 'If an instruction might delete data: pause, record what you see, and ask the mentor.',
      activeNodeIds: ['paus', 'ment'],
      telemetryLog: 'SAFE_PAUSE: Command=UNKNOWN_DELETE | State=HALTED | Contact=Mentor_Ananya',
      outcomeTakeaway: 'Analyst Doctrine: A safe pause is always better than an irreversible guess.',
    },
  ],
};

// -----------------------------------------------------------------------------
// 11E. MODULE 00 UNIT 3 CHAPTER 1: The service we will follow
// -----------------------------------------------------------------------------
const M00_U3_C1_ENTITIES_MODEL: DomainVideoModel = {
  domainId: 'm00-u3-c1-entities',
  domainName: 'The Service We Will Follow',
  badgeCode: 'CASE',
  caption: 'Separating Entities: Service, Account FIN-OPS-01 & Workstation BLR-BR-WS-04',
  nodes: [
    {
      id: 'serv',
      label: 'SERV',
      sub: 'FIN',
      cx: 60,
      cy: 90,
      boxX: 38,
      boxY: 68,
      width: 44,
      height: 44,
      roleType: 'source',
      description: 'Fictional branch finance support service providing daily business context.',
    },
    {
      id: 'acct',
      label: 'ACCT',
      sub: 'FIN1',
      cx: 145,
      cy: 50,
      boxX: 123,
      boxY: 28,
      width: 44,
      height: 44,
      roleType: 'boundary',
      description: 'Account identifier: FIN-OPS-01. An account label, NOT the computer name.',
    },
    {
      id: 'host',
      label: 'HOST',
      sub: 'WS04',
      cx: 145,
      cy: 150,
      boxX: 123,
      boxY: 128,
      width: 44,
      height: 44,
      roleType: 'boundary',
      description: 'Workstation identifier: BLR-BR-WS-04. The physical computer endpoint.',
    },
    {
      id: 'ip',
      label: 'IP',
      sub: 'ADDR',
      cx: 232,
      cy: 50,
      boxX: 210,
      boxY: 28,
      width: 44,
      height: 44,
      roleType: 'sensor',
      description: 'Network IP address leased to the workstation (10.10.20.15).',
    },
    {
      id: 'user',
      label: 'USER',
      sub: 'HUM',
      cx: 232,
      cy: 150,
      boxX: 210,
      boxY: 128,
      width: 44,
      height: 44,
      roleType: 'target',
      description: 'Human at keyboard: an account log does NOT prove who sat at the machine.',
    },
    {
      id: 'card',
      label: 'CARD',
      sub: 'TRIA',
      cx: 312,
      cy: 90,
      boxX: 290,
      boxY: 68,
      width: 44,
      height: 44,
      roleType: 'safety',
      description: 'Triage observation card keeping all entities strictly separated.',
    },
  ],
  conduits: [
    { from: 'serv', to: 'acct', label: 'CRED', activeInScenes: [0, 1] },
    { from: 'serv', to: 'host', label: 'ASST', activeInScenes: [0, 1] },
    { from: 'host', to: 'ip', label: 'DHCP', activeInScenes: [1, 2] },
    { from: 'acct', to: 'user', label: 'AUTH', activeInScenes: [2] },
    { from: 'host', to: 'card', label: 'EVID', activeInScenes: [2, 3] },
    { from: 'user', to: 'card', label: 'FACT', activeInScenes: [3] },
  ],
  scenes: [
    {
      id: 0,
      code: 'SERV',
      title: 'Branch Finance Support Service',
      summary: 'A fictional finance support desk uses a staff portal, email, and shared documents.',
      activeNodeIds: ['serv', 'acct', 'host'],
      telemetryLog: 'SERVICE_INIT: Desk="Branch Finance Support" | Portal=ACTIVE | Documents=SHARED',
      outcomeTakeaway: 'The recurring finance service gives everyday operations a consistent business context.',
    },
    {
      id: 1,
      code: 'ACCT',
      title: 'Account FIN-OPS-01 (Not a Machine)',
      summary: 'FIN-OPS-01 is an account label. The workstation BLR-BR-WS-04 is a separate device.',
      activeNodeIds: ['acct', 'host', 'ip'],
      telemetryLog: 'ENTITY_MAPPING: Account="FIN-OPS-01" | Workstation="BLR-BR-WS-04" | IP=10.10.20.15',
      outcomeTakeaway: 'FIN-OPS-01 is an account credential; BLR-BR-WS-04 is the workstation device.',
    },
    {
      id: 2,
      code: 'HOST',
      title: 'Account Does Not Prove Person',
      summary: 'Activity recorded under FIN-OPS-01 does not prove who was physically at the keyboard.',
      activeNodeIds: ['host', 'user'],
      telemetryLog: 'OBSERVABLE_FACT: "Activity recorded under account FIN-OPS-01 on BLR-BR-WS-04"',
      outcomeTakeaway: 'Record the account and device; never assume which human typed without evidence.',
    },
    {
      id: 3,
      code: 'DIFF',
      title: 'Keeping Entities Separate in Notes',
      summary: 'Separating service, account, device, and network address prevents investigation errors.',
      activeNodeIds: ['host', 'card'],
      telemetryLog: 'TRIAGE_NOTE: Service=Finance | User=FIN-OPS-01 | Host=BLR-BR-WS-04 | IP=10.10.20.15',
      outcomeTakeaway: 'Analyst Doctrine: Keeping entities separate will prevent many investigation mistakes.',
    },
  ],
};

// -----------------------------------------------------------------------------
// 11F. MODULE 00 UNIT 3 CHAPTER 2: The route from beginner to L1
// -----------------------------------------------------------------------------
const M00_U3_C2_ROUTE_MODEL: DomainVideoModel = {
  domainId: 'm00-u3-c2-route',
  domainName: 'The Route from Beginner to L1',
  badgeCode: 'PATH',
  caption: 'The 4-Section Learning Flow & Progressive Shift to Autonomous L1 Practice',
  nodes: [
    {
      id: 'thry',
      label: 'THRY',
      sub: 'READ',
      cx: 60,
      cy: 60,
      boxX: 38,
      boxY: 38,
      width: 44,
      height: 42,
      roleType: 'source',
      description: 'Section 1: Theory Briefing with mentor explanations and everyday definitions.',
    },
    {
      id: 'anim',
      label: 'ANIM',
      sub: 'VECT',
      cx: 60,
      cy: 160,
      boxX: 38,
      boxY: 138,
      width: 44,
      height: 42,
      roleType: 'source',
      description: 'Section 2: Animated Visual Story demonstrating mechanisms with strict <=4-letter labels.',
    },
    {
      id: 'lab',
      label: 'LAB',
      sub: 'HAND',
      cx: 145,
      cy: 110,
      boxX: 123,
      boxY: 88,
      width: 44,
      height: 44,
      roleType: 'boundary',
      description: 'Section 3: Interactive Activity offering safe sandbox practice.',
    },
    {
      id: 'chk',
      label: 'CHK',
      sub: 'QUIZ',
      cx: 232,
      cy: 60,
      boxX: 210,
      boxY: 38,
      width: 44,
      height: 42,
      roleType: 'target',
      description: 'Section 4: Knowledge Check confirming concept retention.',
    },
    {
      id: 'fpos',
      label: 'FPOS',
      sub: 'HINT',
      cx: 232,
      cy: 160,
      boxX: 210,
      boxY: 138,
      width: 44,
      height: 42,
      roleType: 'sensor',
      description: 'Fading scaffolding: Mentor prompts gradually reduce as autonomy builds.',
    },
    {
      id: 'dest',
      label: 'DEST',
      sub: 'L1',
      cx: 312,
      cy: 110,
      boxX: 290,
      boxY: 88,
      width: 44,
      height: 44,
      roleType: 'safety',
      description: 'Destination: Supervised, evidence-based beginner L1 triage practice.',
    },
  ],
  conduits: [
    { from: 'thry', to: 'anim', label: 'SEEN', activeInScenes: [0] },
    { from: 'anim', to: 'lab', label: 'PRAC', activeInScenes: [0, 1] },
    { from: 'lab', to: 'chk', label: 'TEST', activeInScenes: [1, 2] },
    { from: 'chk', to: 'fpos', label: 'FADE', activeInScenes: [2] },
    { from: 'fpos', to: 'dest', label: 'GOAL', activeInScenes: [2, 3] },
  ],
  scenes: [
    {
      id: 0,
      code: 'FLOW',
      title: 'The 4-Section Chapter Architecture',
      summary: 'Every chapter follows: Theory -> Animated Visual Story -> Interactive Simulator -> Knowledge Check.',
      activeNodeIds: ['thry', 'anim', 'lab', 'chk'],
      telemetryLog: 'PEDAGOGY: Section1=Theory | Section2=Visual | Section3=Interactive | Section4=Check',
      outcomeTakeaway: 'The 4-section flow ensures active practice over passive video consumption.',
    },
    {
      id: 1,
      code: 'PRAC',
      title: 'From Computing Basics to SOC Handover',
      summary: 'The 15 modules build systematically: computers and networks lead to triage, SIEM, and incident handover.',
      activeNodeIds: ['anim', 'lab'],
      telemetryLog: 'CURRICULUM_PATH: M00_Orientation -> M01_Host -> M02_Net -> M05_SIEM -> M14_Handover',
      outcomeTakeaway: 'You will not be asked to hunt threats before understanding ordinary computer systems.',
    },
    {
      id: 2,
      code: 'FADE',
      title: 'Scaffolding Gradually Reduces',
      summary: 'Support gradually tapers off; by Module 14 you triage and document within an L1 playbook.',
      activeNodeIds: ['chk', 'fpos'],
      telemetryLog: 'AUTONOMY_CURVE: Early=StepByStep_Prompts -> Late=Autonomous_Playbook_Triage',
      outcomeTakeaway: 'Support gradually reduces so you develop genuine operational confidence.',
    },
    {
      id: 3,
      code: 'DEST',
      title: 'Destination: Evidence-Based L1 Practice',
      summary: 'The goal is evidence-based beginner L1 practice, not instant external certification.',
      activeNodeIds: ['fpos', 'dest'],
      telemetryLog: 'COURSE_DESTINATION: Role="Evidence-Based L1 Practice" | WorkplaceAuth=SEPARATE',
      outcomeTakeaway: 'Analyst Doctrine: Your destination is evidence-based beginner L1 practice, not instant expertise.',
    },
  ],
};

const SOC_ORIENTATION_MODEL: DomainVideoModel = M00_U1_C1_VISITOR_MODEL;

// -----------------------------------------------------------------------------
// 12A. MODULE 01 UNIT 1 CHAPTER 1: Hardware, OS & User Accounts
// -----------------------------------------------------------------------------
const M01_U1_C1_ACCOUNTS_MODEL: DomainVideoModel = {
  domainId: 'm01-u1-c1-accounts',
  domainName: 'Hardware, OS & User Account Boundaries',
  badgeCode: 'PRIV',
  caption: 'Physical Hardware (CPU/RAM/DISK), Operating System & Account Privileges',
  nodes: [
    {
      id: 'disk',
      label: 'DISK',
      sub: 'STOR',
      cx: 55,
      cy: 150,
      boxX: 33,
      boxY: 128,
      width: 44,
      height: 44,
      roleType: 'sensor',
      description: 'Persistent physical storage (SSD/HDD) retaining the OS, applications, and documents even when powered off.',
    },
    {
      id: 'ram',
      label: 'RAM',
      sub: 'MEM',
      cx: 55,
      cy: 50,
      boxX: 33,
      boxY: 28,
      width: 44,
      height: 44,
      roleType: 'target',
      description: 'Fast volatile working memory holding active programs. When power turns off, RAM wipes clean.',
    },
    {
      id: 'cpu',
      label: 'CPU',
      sub: 'PROC',
      cx: 140,
      cy: 50,
      boxX: 118,
      boxY: 28,
      width: 44,
      height: 44,
      roleType: 'boundary',
      description: 'Central Processing Unit: the computer brain executing software calculations and instructions.',
    },
    {
      id: 'os',
      label: 'OS',
      sub: 'MGR',
      cx: 140,
      cy: 150,
      boxX: 118,
      boxY: 128,
      width: 44,
      height: 44,
      roleType: 'boundary',
      description: 'The Operating System (Windows/Linux): master software managing hardware, memory, files, and processes.',
    },
    {
      id: 'user',
      label: 'USER',
      sub: 'STD',
      cx: 240,
      cy: 90,
      boxX: 218,
      boxY: 68,
      width: 44,
      height: 44,
      roleType: 'source',
      description: 'Standard User Account: safe everyday employee identity restricted from modifying system files or installing drivers.',
    },
    {
      id: 'root',
      label: 'ROOT',
      sub: 'ADM',
      cx: 315,
      cy: 90,
      boxX: 293,
      boxY: 68,
      width: 44,
      height: 44,
      roleType: 'safety',
      description: 'Administrator / Root: master superuser account with full authority to alter system configurations.',
    },
  ],
  conduits: [
    { from: 'disk', to: 'ram', label: 'LOAD', activeInScenes: [0] },
    { from: 'ram', to: 'cpu', label: 'EXEC', activeInScenes: [0, 1] },
    { from: 'cpu', to: 'os', label: 'RUN', activeInScenes: [1] },
    { from: 'os', to: 'user', label: 'AUTH', activeInScenes: [2] },
    { from: 'user', to: 'root', label: 'ELEV', activeInScenes: [3], dashed: true },
  ],
  scenes: [
    {
      id: 0,
      code: 'BOOT',
      title: 'Hardware Boot: Disk Loads OS Into RAM',
      summary: 'Physical storage (Disk) loads the Operating System into fast temporary working memory (RAM); the CPU begins executing instructions.',
      activeNodeIds: ['disk', 'ram', 'cpu'],
      telemetryLog: 'HARDWARE_BOOT: Disk SSD -> RAM 16GB | CPU=x86_64 Active | OS kernel loaded',
      outcomeTakeaway: 'Hardware foundation: CPU executes instructions, RAM holds active data, Disk stores data permanently.',
    },
    {
      id: 1,
      code: 'MGR',
      title: 'The Operating System Takes Command',
      summary: 'The OS (Windows/Linux) acts as master manager—coordinating physical hardware, managing memory, and mounting the filesystem.',
      activeNodeIds: ['cpu', 'os', 'ram', 'disk'],
      telemetryLog: 'OS_INIT: Hardware devices mapped | Drivers loaded | File system mounted on Disk',
      outcomeTakeaway: 'The OS is the essential bridge connecting physical hardware chips to software applications.',
    },
    {
      id: 2,
      code: 'USER',
      title: 'Standard User Session Established',
      summary: 'Employee logs in with a Standard User account. The OS allows editing personal documents, but isolates system files.',
      activeNodeIds: ['os', 'user'],
      telemetryLog: 'USER_LOGIN: User=b_sharma | AccountType=STANDARD | Rights=Read/Write own documents only',
      outcomeTakeaway: 'Standard User accounts protect the system by isolating daily work from core OS settings.',
    },
    {
      id: 3,
      code: 'SAFE',
      title: 'Administrator Privilege & Least Privilege Boundary',
      summary: 'Unauthorized system change attempted; the OS enforces the Principle of Least Privilege and halts execution until Admin/Root approval.',
      activeNodeIds: ['user', 'root', 'os'],
      alertNodeIds: ['root'],
      telemetryLog: 'SECURITY_BOUNDARY: Modify system drivers | Status=ADMIN_REQUIRED | Standard user blocked',
      outcomeTakeaway: 'Principle of Least Privilege: Restricting daily users keeps the entire operating system safe.',
    },
  ],
};

// -----------------------------------------------------------------------------
// 12B. MODULE 01 UNIT 1 CHAPTER 2: Files, Paths & Permissions
// -----------------------------------------------------------------------------
const M01_U1_C2_PATHS_MODEL: DomainVideoModel = {
  domainId: 'm01-u1-c2-paths',
  domainName: 'Filesystem Paths & Execution Boundaries',
  badgeCode: 'PATH',
  caption: 'Protected Program Directories vs Writable Temp Staging Folders',
  nodes: [
    {
      id: 'disk',
      label: 'DISK',
      sub: 'NTFS',
      cx: 60,
      cy: 90,
      boxX: 38,
      boxY: 68,
      width: 44,
      height: 44,
      roleType: 'source',
      description: 'Host storage volume formatted with NTFS / ext4 filesystem access control lists.',
    },
    {
      id: 'prog',
      label: 'PROG',
      sub: 'PROT',
      cx: 145,
      cy: 50,
      boxX: 123,
      boxY: 28,
      width: 44,
      height: 44,
      roleType: 'boundary',
      description: 'Canonical installation directory C:\\Program Files protected by TrustedInstaller permissions.',
    },
    {
      id: 'temp',
      label: 'TEMP',
      sub: 'USER',
      cx: 145,
      cy: 150,
      boxX: 123,
      boxY: 128,
      width: 44,
      height: 44,
      roleType: 'boundary',
      description: 'User-writable temporary staging folder AppData\\Local\\Temp used for software caches.',
    },
    {
      id: 'drop',
      label: 'DROP',
      sub: 'PAYL',
      cx: 232,
      cy: 50,
      boxX: 210,
      boxY: 28,
      width: 44,
      height: 44,
      roleType: 'target',
      description: 'Adversary payload or obfuscated script dropped into user directory.',
    },
    {
      id: 'exec',
      label: 'EXEC',
      sub: 'RUN',
      cx: 232,
      cy: 150,
      boxX: 210,
      boxY: 128,
      width: 44,
      height: 44,
      roleType: 'sensor',
      description: 'Windows script host or powershell.exe attempting to invoke dropped payload.',
    },
    {
      id: 'blok',
      label: 'BLOK',
      sub: 'SAFE',
      cx: 312,
      cy: 90,
      boxX: 290,
      boxY: 68,
      width: 44,
      height: 44,
      roleType: 'safety',
      description: 'Application control / AppLocker rule preventing script execution from writable folders.',
    },
  ],
  conduits: [
    { from: 'disk', to: 'prog', label: 'ACL', activeInScenes: [0] },
    { from: 'disk', to: 'temp', label: 'WRIT', activeInScenes: [0, 1] },
    { from: 'temp', to: 'drop', label: 'STAG', activeInScenes: [1, 2] },
    { from: 'drop', to: 'exec', label: 'SPAW', activeInScenes: [2, 3] },
    { from: 'exec', to: 'blok', label: 'DENY', activeInScenes: [3] },
  ],
  scenes: [
    {
      id: 0,
      code: 'NORM',
      title: 'Protected Program Files Installation',
      summary: 'Legitimate business software installs to C:\\Program Files; write access restricted strictly to TrustedInstaller.',
      activeNodeIds: ['disk', 'prog'],
      telemetryLog: 'DIR_VERIFY: Path=C:\\Program Files\\BusinessApp | Owner=NT SERVICE\\TrustedInstaller | Perms=READ_ONLY',
      outcomeTakeaway: 'Legitimate corporate software lives in protected directories guarded by strict administrative ACLs.',
    },
    {
      id: 1,
      code: 'DROP',
      title: 'Adversary Drops Payload in User Temp',
      summary: 'Phishing macro drops obfuscated script payload.vbs into user-writable AppData\\Local\\Temp directory.',
      activeNodeIds: ['temp', 'drop'],
      alertNodeIds: ['drop'],
      telemetryLog: 'FILE_CREATE: Path=C:\\Users\\b_sharma\\AppData\\Local\\Temp\\update.vbs | Size=42KB | User=b_sharma',
      outcomeTakeaway: 'Adversaries exploit user-writable staging folders like Temp and Public to stage dropped files.',
    },
    {
      id: 2,
      code: 'EXEC',
      title: 'Script Engine Execution Attempt',
      summary: 'WScript attempts to execute dropped payload directly from the temporary user directory.',
      activeNodeIds: ['drop', 'exec'],
      alertNodeIds: ['exec'],
      telemetryLog: 'PROCESS_LAUNCH: Parent=wscript.exe | Target=update.vbs | WorkingDir=C:\\Users\\...\\AppData\\Local\\Temp',
      outcomeTakeaway: 'Always scrutinize process execution originating from temporary directories or hidden user folders.',
    },
    {
      id: 3,
      code: 'BLOK',
      title: 'AppLocker Execution Policy Enforced',
      summary: 'Software Restriction Policy blocks binary/script execution originating from user-writable directories.',
      activeNodeIds: ['exec', 'blok'],
      blockedNodeIds: ['blok'],
      telemetryLog: 'APPLOCKER_BLOCK: EventID=8004 | %LOCALAPPDATA%\\Temp\\update.vbs PREVENTED from running | State=SAFE',
      outcomeTakeaway: 'Outcome: Application whitelisting prevents untrusted code execution from staging directories.',
    },
  ],
};

// -----------------------------------------------------------------------------
// 12C. MODULE 01 UNIT 2 CHAPTER 1: What Processes and Services Do
// -----------------------------------------------------------------------------
const M01_U2_C1_PROCESS_TREE_MODEL: DomainVideoModel = {
  domainId: 'm01-u2-c1-processes',
  domainName: 'Process Hierarchies & PID Lineage',
  badgeCode: 'PROC',
  caption: 'Process IDs (PID), Parent PPID Lineage, and Headless Background Services',
  nodes: [
    {
      id: 'init',
      label: 'INIT',
      sub: 'SMSS',
      cx: 60,
      cy: 90,
      boxX: 38,
      boxY: 68,
      width: 44,
      height: 44,
      roleType: 'source',
      description: 'System initialization process (smss.exe PID 4) bootstrapping OS subsystems.',
    },
    {
      id: 'svc',
      label: 'SVC',
      sub: 'HEAD',
      cx: 145,
      cy: 50,
      boxX: 123,
      boxY: 28,
      width: 44,
      height: 44,
      roleType: 'boundary',
      description: 'Service Control Manager (services.exe PID 620) launching headless system daemons.',
    },
    {
      id: 'expl',
      label: 'EXPL',
      sub: 'SHEL',
      cx: 145,
      cy: 150,
      boxX: 123,
      boxY: 128,
      width: 44,
      height: 44,
      roleType: 'boundary',
      description: 'Windows Explorer shell (explorer.exe PID 1084) managing the interactive user desktop.',
    },
    {
      id: 'word',
      label: 'WORD',
      sub: 'OFFC',
      cx: 232,
      cy: 50,
      boxX: 210,
      boxY: 28,
      width: 44,
      height: 44,
      roleType: 'target',
      description: 'User application Microsoft Word (winword.exe PID 2104) editing an invoice document.',
    },
    {
      id: 'psh',
      label: 'PSH',
      sub: 'SPAW',
      cx: 232,
      cy: 150,
      boxX: 210,
      boxY: 128,
      width: 44,
      height: 44,
      roleType: 'sensor',
      description: 'Anomalous child process (powershell.exe PID 8840) spawned with hidden execution flags.',
    },
    {
      id: 'tree',
      label: 'TREE',
      sub: 'PPID',
      cx: 312,
      cy: 90,
      boxX: 290,
      boxY: 68,
      width: 44,
      height: 44,
      roleType: 'safety',
      description: 'Forensic process tree inspection revealing Parent Process ID (PPID) connection.',
    },
  ],
  conduits: [
    { from: 'init', to: 'svc', label: 'BOOT', activeInScenes: [0] },
    { from: 'init', to: 'expl', label: 'DESK', activeInScenes: [0, 1] },
    { from: 'expl', to: 'word', label: 'USER', activeInScenes: [1, 2] },
    { from: 'word', to: 'psh', label: 'SPAW', activeInScenes: [2, 3] },
    { from: 'psh', to: 'tree', label: 'LINE', activeInScenes: [3] },
  ],
  scenes: [
    {
      id: 0,
      code: 'BOOT',
      title: 'System Initialization & Background Services',
      summary: 'Kernel initializes smss.exe (PID 4), spawning services.exe to manage background daemons independently of user sessions.',
      activeNodeIds: ['init', 'svc'],
      telemetryLog: 'SYSTEM_BOOT: smss.exe (PID 4) -> services.exe (PID 620) | Headless background services active',
      outcomeTakeaway: 'Background services run without user interaction under dedicated service accounts (SYSTEM, LOCAL SERVICE).',
    },
    {
      id: 1,
      code: 'DESK',
      title: 'User Desktop Shell Spawns Applications',
      summary: 'User logs in; explorer.exe (PID 1084) initializes desktop environment and launches approved business apps.',
      activeNodeIds: ['init', 'expl', 'word'],
      telemetryLog: 'PROC_CREATE: Parent=explorer.exe (PID 1084) -> Child=winword.exe (PID 2104) | User=b_sharma',
      outcomeTakeaway: 'Normal user applications should trace their lineage back to the interactive desktop shell (explorer.exe).',
    },
    {
      id: 2,
      code: 'SPAW',
      title: 'Anomalous Child Process Spawn Detected',
      summary: 'Microsoft Word unexpectedly spawns powershell.exe with hidden window flag: classic T1059 anomaly.',
      activeNodeIds: ['word', 'psh'],
      alertNodeIds: ['psh'],
      telemetryLog: 'SYSMON_EVENT_1: ParentImage=winword.exe (PID 2104) -> Image=powershell.exe (PID 8840) -NoP -Hidden',
      outcomeTakeaway: 'Office documents should never spawn command shells or PowerShell interpreters in standard business operations.',
    },
    {
      id: 3,
      code: 'TREE',
      title: 'Forensic Lineage Tracing via PPID',
      summary: 'L1 Analyst inspects PPID 2104; connects PowerShell process directly to malicious invoice macro.',
      activeNodeIds: ['psh', 'tree'],
      telemetryLog: 'LINEAGE_VERIFY: PID 8840 parent is confirmed PPID 2104 | Triage: Confirmed Living-off-the-Land Attack',
      outcomeTakeaway: 'Outcome: Process tree tracing indisputably exposes the originating attack vector.',
    },
  ],
};

// -----------------------------------------------------------------------------
// 12D. MODULE 01 UNIT 2 CHAPTER 2: Routine vs Unfamiliar Activity
// -----------------------------------------------------------------------------
const M01_U2_C2_BASELINES_MODEL: DomainVideoModel = {
  domainId: 'm01-u2-c2-baselines',
  domainName: 'Host Baselines & Imposter Masquerading',
  badgeCode: 'BASE',
  caption: 'Legitimate System32 Binaries vs Typosquatted Names & Public Folder Staging',
  nodes: [
    {
      id: 'sys',
      label: 'SYS',
      sub: 'DIR',
      cx: 60,
      cy: 90,
      boxX: 38,
      boxY: 68,
      width: 44,
      height: 44,
      roleType: 'source',
      description: 'Canonical protected Windows system directory C:\\Windows\\System32.',
    },
    {
      id: 'norm',
      label: 'SVCH',
      sub: 'AUTH',
      cx: 145,
      cy: 50,
      boxX: 123,
      boxY: 28,
      width: 44,
      height: 44,
      roleType: 'boundary',
      description: 'Legitimate Windows Service Host svchost.exe signed by Microsoft Corporation.',
    },
    {
      id: 'publ',
      label: 'PUBL',
      sub: 'DIR',
      cx: 145,
      cy: 150,
      boxX: 123,
      boxY: 128,
      width: 44,
      height: 44,
      roleType: 'boundary',
      description: 'Writable shared directory C:\\Users\\Public commonly abused for staging.',
    },
    {
      id: 'typo',
      label: 'TYPO',
      sub: 'FAKE',
      cx: 232,
      cy: 50,
      boxX: 210,
      boxY: 28,
      width: 44,
      height: 44,
      roleType: 'target',
      description: 'Imposter binary svch0st.exe (with numeral 0) attempting masquerading deception.',
    },
    {
      id: 'hash',
      label: 'HASH',
      sub: 'VERF',
      cx: 232,
      cy: 150,
      boxX: 210,
      boxY: 128,
      width: 44,
      height: 44,
      roleType: 'sensor',
      description: 'Authenticode digital signature and SHA-256 binary hash validation.',
    },
    {
      id: 'flag',
      label: 'FLAG',
      sub: 'ALRT',
      cx: 312,
      cy: 90,
      boxX: 290,
      boxY: 68,
      width: 44,
      height: 44,
      roleType: 'safety',
      description: 'L1 Analyst declares True Positive alert; contains host and terminates rogue process.',
    },
  ],
  conduits: [
    { from: 'sys', to: 'norm', label: 'PATH', activeInScenes: [0] },
    { from: 'norm', to: 'hash', label: 'SIGN', activeInScenes: [0, 1] },
    { from: 'publ', to: 'typo', label: 'DROP', activeInScenes: [1, 2] },
    { from: 'typo', to: 'hash', label: 'FAIL', activeInScenes: [2, 3] },
    { from: 'hash', to: 'flag', label: 'ALRT', activeInScenes: [3] },
  ],
  scenes: [
    {
      id: 0,
      code: 'NORM',
      title: 'Legitimate svchost Baseline Verified',
      summary: 'Legitimate Service Host executes from C:\\Windows\\System32; digitally signed by Microsoft Corporation.',
      activeNodeIds: ['sys', 'norm', 'hash'],
      telemetryLog: 'BASELINE_CHECK: Path=C:\\Windows\\System32\\svchost.exe | Parent=services.exe | Signature=VALID_MSFT',
      outcomeTakeaway: 'Always verify the canonical directory path and Microsoft digital signature of core operating system binaries.',
    },
    {
      id: 1,
      code: 'TYPO',
      title: 'Adversary Deploys Typosquatted svch0st',
      summary: 'Attacker drops imposter binary with numeral 0 replacing letter "o" into C:\\Users\\Public directory.',
      activeNodeIds: ['publ', 'typo'],
      alertNodeIds: ['typo'],
      telemetryLog: 'ALERT_SUSPICIOUS: Image="C:\\Users\\Public\\svch0st.exe" (PID 4992) | Typosquat pattern detected',
      outcomeTakeaway: 'Adversaries rely on visual similarity (svch0st vs svchost) to hide in task lists from careless reviewers.',
    },
    {
      id: 2,
      code: 'FAIL',
      title: 'Digital Signature & Path Validation Fails',
      summary: 'Forensic inspection reveals binary is unsigned and executing from outside Windows\\System32.',
      activeNodeIds: ['typo', 'hash'],
      alertNodeIds: ['hash'],
      telemetryLog: 'SIGN_CHECK: svch0st.exe | Issuer=UNSIGNED | FileHash=8f3c4e... (Known CoinMiner) | Path=ANOMALOUS',
      outcomeTakeaway: 'A system process running from outside System32 or lacking a Microsoft signature is 100% malicious.',
    },
    {
      id: 3,
      code: 'FLAG',
      title: 'Analyst Flags Masqueraded Imposter',
      summary: 'L1 Analyst flags True Positive alert; initiates host containment and terminates PID 4992.',
      activeNodeIds: ['hash', 'flag'],
      telemetryLog: 'TRIAGE_MEMO: True Positive: Masqueraded binary terminated | Host FIN-PC-04 contained | Threat neutralized',
      outcomeTakeaway: 'Outcome: Baselines enable instant detection of masqueraded malware without signature delays.',
    },
  ],
};

// -----------------------------------------------------------------------------
// 12E. MODULE 01 UNIT 3 CHAPTER 1: Command-Line Essentials
// -----------------------------------------------------------------------------
const M01_U3_C1_CLI_TRIAGE_MODEL: DomainVideoModel = {
  domainId: 'm01-u3-c1-cli',
  domainName: 'Command-Line Triage Essentials',
  badgeCode: 'CLI',
  caption: 'Non-Invasive Live Forensics: whoami, hostname, tasklist, and netstat -ano',
  nodes: [
    {
      id: 'cli',
      label: 'CLI',
      sub: 'TERM',
      cx: 60,
      cy: 90,
      boxX: 38,
      boxY: 68,
      width: 44,
      height: 44,
      roleType: 'source',
      description: 'Administrative terminal shell console used for non-destructive live host triage.',
    },
    {
      id: 'who',
      label: 'WHO',
      sub: 'USER',
      cx: 145,
      cy: 50,
      boxX: 123,
      boxY: 28,
      width: 44,
      height: 44,
      roleType: 'boundary',
      description: 'whoami /user output extracting current account name, domain, and security identifier (SID).',
    },
    {
      id: 'name',
      label: 'NAME',
      sub: 'HOST',
      cx: 145,
      cy: 150,
      boxX: 123,
      boxY: 128,
      width: 44,
      height: 44,
      roleType: 'boundary',
      description: 'hostname utility confirming physical machine identification and branch location.',
    },
    {
      id: 'task',
      label: 'TASK',
      sub: 'PROC',
      cx: 232,
      cy: 50,
      boxX: 210,
      boxY: 28,
      width: 44,
      height: 44,
      roleType: 'target',
      description: 'tasklist command enumerating volatile process names, PIDs, and memory usage.',
    },
    {
      id: 'sock',
      label: 'SOCK',
      sub: 'PORT',
      cx: 232,
      cy: 150,
      boxX: 210,
      boxY: 128,
      width: 44,
      height: 44,
      roleType: 'sensor',
      description: 'netstat -ano command mapping active listening sockets and foreign IP connections to PIDs.',
    },
    {
      id: 'dump',
      label: 'DUMP',
      sub: 'EVID',
      cx: 312,
      cy: 90,
      boxX: 290,
      boxY: 68,
      width: 44,
      height: 44,
      roleType: 'safety',
      description: 'Sanitized volatile evidence log preserved for inclusion in incident handover ticket.',
    },
  ],
  conduits: [
    { from: 'cli', to: 'who', label: 'SID', activeInScenes: [0] },
    { from: 'cli', to: 'name', label: 'ASST', activeInScenes: [0, 1] },
    { from: 'cli', to: 'task', label: 'PID', activeInScenes: [1, 2] },
    { from: 'cli', to: 'sock', label: 'PORT', activeInScenes: [2, 3] },
    { from: 'sock', to: 'dump', label: 'SAVE', activeInScenes: [3] },
  ],
  scenes: [
    {
      id: 0,
      code: 'WHO',
      title: 'Resolving User Identity & SID via whoami',
      summary: 'Analyst executes `whoami /user` to extract the exact security identifier and domain name.',
      activeNodeIds: ['cli', 'who'],
      telemetryLog: 'CLI_EXEC: whoami /user -> USER: CDAC\\b_sharma | SID: S-1-5-21-3829104-1002',
      outcomeTakeaway: '`whoami` confirms the active execution context and distinguishes local users from domain accounts.',
    },
    {
      id: 1,
      code: 'NAME',
      title: 'Confirming Asset Name via hostname',
      summary: 'Analyst runs `hostname` to confirm whether the alert is on a branch PC, server, or jump host.',
      activeNodeIds: ['cli', 'name'],
      telemetryLog: 'CLI_EXEC: hostname -> BLR-FIN-PC-04 | OS: Windows 11 Enterprise | Domain: CDAC.GOV.IN',
      outcomeTakeaway: 'Always verify asset hostname to determine system criticality and department impact.',
    },
    {
      id: 2,
      code: 'TASK',
      title: 'Enumerating Processes via tasklist',
      summary: 'Analyst runs `tasklist /v` to inspect running processes, memory usage, and user session IDs.',
      activeNodeIds: ['cli', 'task'],
      telemetryLog: 'CLI_EXEC: tasklist -> Image: powershell.exe | PID: 8840 | Session: 1 | Mem: 48,120 K',
      outcomeTakeaway: '`tasklist` provides volatile process state before memory can be altered or cleared.',
    },
    {
      id: 3,
      code: 'SOCK',
      title: 'Mapping Sockets via netstat -ano',
      summary: 'Analyst runs `netstat -ano` to map active outbound TCP connection to suspect foreign IP directly to PID 8840.',
      activeNodeIds: ['cli', 'sock', 'dump'],
      telemetryLog: 'CLI_EXEC: netstat -ano -> TCP 10.10.20.15:49182 185.220.101.5:443 ESTABLISHED 8840',
      outcomeTakeaway: 'Outcome: The -o switch in netstat provides the smoking gun linking foreign network sockets to local PIDs.',
    },
  ],
};

// -----------------------------------------------------------------------------
// 12F. MODULE 01 UNIT 3 CHAPTER 2: Users, Hostnames & Timestamps
// -----------------------------------------------------------------------------
const M01_U3_C2_TIMESTAMPS_MODEL: DomainVideoModel = {
  domainId: 'm01-u3-c2-timestamps',
  domainName: 'Entity Correlation & UTC Normalization',
  badgeCode: 'TIME',
  caption: 'Correlating User, Host, IP, and Normalizing Local IST (+05:30) to UTC',
  nodes: [
    {
      id: 'user',
      label: 'USER',
      sub: 'ID',
      cx: 60,
      cy: 90,
      boxX: 38,
      boxY: 68,
      width: 44,
      height: 44,
      roleType: 'source',
      description: 'Human account identity (b_sharma) resolved from Active Directory authentication logs.',
    },
    {
      id: 'host',
      label: 'HOST',
      sub: 'WS04',
      cx: 145,
      cy: 50,
      boxX: 123,
      boxY: 28,
      width: 44,
      height: 44,
      roleType: 'boundary',
      description: 'Physical endpoint workstation BLR-FIN-PC-04 registered in CDAC asset inventory.',
    },
    {
      id: 'ip',
      label: 'IP',
      sub: 'DHCP',
      cx: 145,
      cy: 150,
      boxX: 123,
      boxY: 128,
      width: 44,
      height: 44,
      roleType: 'boundary',
      description: 'Dynamic IP lease 10.10.20.15 verified against DHCP server allocation timestamp.',
    },
    {
      id: 'ist',
      label: 'IST',
      sub: 'LOCL',
      cx: 232,
      cy: 50,
      boxX: 210,
      boxY: 28,
      width: 44,
      height: 44,
      roleType: 'target',
      description: 'Local system clock recording event at 14:44:12 Indian Standard Time (+05:30).',
    },
    {
      id: 'utc',
      label: 'UTC',
      sub: 'NORM',
      cx: 232,
      cy: 150,
      boxX: 210,
      boxY: 128,
      width: 44,
      height: 44,
      roleType: 'sensor',
      description: 'Universal normalized timestamp 09:14:12 UTC ensuring global chronological order.',
    },
    {
      id: 'sync',
      label: 'SYNC',
      sub: 'LINE',
      cx: 312,
      cy: 90,
      boxX: 290,
      boxY: 68,
      width: 44,
      height: 44,
      roleType: 'safety',
      description: 'Master incident timeline correlating endpoint, firewall, and cloud logs in UTC.',
    },
  ],
  conduits: [
    { from: 'user', to: 'host', label: 'LOGN', activeInScenes: [0] },
    { from: 'host', to: 'ip', label: 'LEAS', activeInScenes: [0, 1] },
    { from: 'host', to: 'ist', label: 'TIME', activeInScenes: [1, 2] },
    { from: 'ist', to: 'utc', label: 'CONV', activeInScenes: [2, 3] },
    { from: 'utc', to: 'sync', label: 'JOIN', activeInScenes: [3] },
  ],
  scenes: [
    {
      id: 0,
      code: 'ID',
      title: 'Resolving User & Host Association',
      summary: 'Analyst corroborates that user b_sharma logged on interactively to workstation BLR-FIN-PC-04.',
      activeNodeIds: ['user', 'host'],
      telemetryLog: 'ENTITY_BIND: User="b_sharma" | Host="BLR-FIN-PC-04" | LogonType=2 (Interactive Console)',
      outcomeTakeaway: 'Always correlate the human identity with the physical machine before escalating cases.',
    },
    {
      id: 1,
      code: 'IP',
      title: 'Binding Dynamic DHCP Lease IP',
      summary: 'DHCP server logs confirm IP 10.10.20.15 was assigned to host BLR-FIN-PC-04 at the exact alert timestamp.',
      activeNodeIds: ['host', 'ip'],
      telemetryLog: 'DHCP_CORR: Host="BLR-FIN-PC-04" MAC=00:50:56:a1:b2:c3 -> IP=10.10.20.15 LeaseTime=8h',
      outcomeTakeaway: 'IPs change dynamically under DHCP; always check DHCP logs to confirm which host held the IP at that time.',
    },
    {
      id: 2,
      code: 'CONV',
      title: 'Converting Local IST to Universal UTC',
      summary: 'Local endpoint event recorded at 14:44:12 IST (+05:30) converted to 09:14:12 UTC to align with cloud logs.',
      activeNodeIds: ['host', 'ist', 'utc'],
      telemetryLog: 'TIME_NORM: Local 14:44:12.180 IST (-05:30) -> Normalized: 2026-10-14T09:14:12.180Z (UTC)',
      outcomeTakeaway: 'Failing to convert timezones causes analysts to misjudge the order of adversary actions.',
    },
    {
      id: 3,
      code: 'SYNC',
      title: 'Multi-Source Chronological Master Timeline',
      summary: 'Endpoint Sysmon, firewall egress, and cloud authentication aligned into an indisputable chronological timeline.',
      activeNodeIds: ['utc', 'sync'],
      telemetryLog: 'TIMELINE_SYNC: 09:14:12 (Auth) -> 09:14:13 (Process) -> 09:14:15 (Firewall Outbound) | Clean sequence',
      outcomeTakeaway: 'Outcome: Empirical chronological alignment turns disparate logs into indisputable court-admissible evidence.',
    },
  ],
};

// -----------------------------------------------------------------------------
// 13. CYBERSECURITY FUNDAMENTALS & DEFENSIVE CONTROLS (Module 03)
// -----------------------------------------------------------------------------
const CYBER_FUNDAMENTALS_MODEL: DomainVideoModel = {
  domainId: 'cyber-fundamentals',
  domainName: 'Cybersecurity Principles & Threat Models',
  badgeCode: 'FUND',
  caption: 'CIA Triad, Threat Actors, Vulnerability Exploitation & Defense in Depth',
  nodes: [
    {
      id: 'conf',
      label: 'CONF',
      sub: 'ENCR',
      cx: 60,
      cy: 60,
      boxX: 38,
      boxY: 38,
      width: 44,
      height: 42,
      roleType: 'source',
      description: 'Confidentiality: Protecting sensitive data from unauthorized reading via AES-256 encryption.',
    },
    {
      id: 'int',
      label: 'INT',
      sub: 'HASH',
      cx: 60,
      cy: 160,
      boxX: 38,
      boxY: 138,
      width: 44,
      height: 42,
      roleType: 'source',
      description: 'Integrity: Guaranteeing data has not been modified using SHA-256 cryptographic hashes.',
    },
    {
      id: 'aval',
      label: 'AVAL',
      sub: 'UPTM',
      cx: 145,
      cy: 110,
      boxX: 123,
      boxY: 88,
      width: 44,
      height: 44,
      roleType: 'boundary',
      description: 'Availability: Ensuring systems remain operational and accessible under SLA targets.',
    },
    {
      id: 'vuln',
      label: 'VULN',
      sub: 'FLAW',
      cx: 232,
      cy: 60,
      boxX: 210,
      boxY: 38,
      width: 44,
      height: 42,
      roleType: 'target',
      description: 'Vulnerability: Software flaw or misconfiguration that can be exploited by an attacker.',
    },
    {
      id: 'risk',
      label: 'RISK',
      sub: 'IMPC',
      cx: 232,
      cy: 160,
      boxX: 210,
      boxY: 138,
      width: 44,
      height: 42,
      roleType: 'target',
      description: 'Risk: The calculated product of Likelihood × Impact to critical enterprise operations.',
    },
    {
      id: 'fw',
      label: 'FW',
      sub: 'DEFN',
      cx: 312,
      cy: 110,
      boxX: 290,
      boxY: 88,
      width: 44,
      height: 44,
      roleType: 'safety',
      description: 'Defense in Depth: Layered security controls (Firewall, EDR, MFA) mitigating threats.',
    },
  ],
  conduits: [
    { from: 'conf', to: 'aval', label: 'CRYP', activeInScenes: [0] },
    { from: 'int', to: 'aval', label: 'SLA', activeInScenes: [0] },
    { from: 'vuln', to: 'risk', label: 'EXPO', activeInScenes: [1, 2] },
    { from: 'risk', to: 'fw', label: 'CTRL', activeInScenes: [2, 3] },
  ],
  scenes: [
    {
      id: 0,
      code: 'TRID',
      title: 'The Core CIA Security Triad',
      summary: 'Confidentiality, Integrity, and Availability form the foundation of all security architecture.',
      activeNodeIds: ['conf', 'int', 'aval'],
      telemetryLog: 'TRIAD_STATUS: Confidentiality=ENCRYPTED | Integrity=VERIFIED_SHA256 | Availability=99.99%',
      outcomeTakeaway: 'In corporate IT, Confidentiality often leads; in industrial OT, Availability and Safety are paramount.',
    },
    {
      id: 1,
      code: 'RISK',
      title: 'Threat Actor Exploitation Attempt',
      summary: 'External threat actor attempts to leverage unpatched vulnerability on internet-facing server.',
      activeNodeIds: ['vuln', 'risk'],
      alertNodeIds: ['vuln'],
      telemetryLog: 'THREAT_SCAN: External IP 45.33.32.156 probe CVE-2023-34362 on public portal',
      outcomeTakeaway: 'A vulnerability without an active threat actor poses lower immediate risk than an exploited zero-day.',
    },
    {
      id: 2,
      code: 'VULN',
      title: 'Risk Calculation & Prioritization',
      summary: 'Security team evaluates exploitability and business impact to prioritize rapid remediation.',
      activeNodeIds: ['risk', 'fw'],
      telemetryLog: 'RISK_MATRIX: Likelihood=HIGH | Impact=CRITICAL | Calculated Risk Score=9.4/10',
      outcomeTakeaway: 'Risk management ensures SOC resources focus on high-impact assets rather than endless low-level noise.',
    },
    {
      id: 3,
      code: 'DEFN',
      title: 'Multi-Layer Defense in Depth Barrier',
      summary: 'Perimeter firewall drops malicious payload; host EDR terminates secondary beacon attempt.',
      activeNodeIds: ['risk', 'fw'],
      blockedNodeIds: ['fw'],
      telemetryLog: 'DEFENSE_IN_DEPTH: WAF blocked SQLi injection -> EDR agent verified clean -> Impact: ZERO',
      outcomeTakeaway: 'Outcome: When one defensive layer fails, adjacent layers ensure the asset remains protected.',
    },
  ],
};

// -----------------------------------------------------------------------------
// 14. LOG & EVENT ANALYSIS (Module 06)
// -----------------------------------------------------------------------------
const LOG_ANALYSIS_MODEL: DomainVideoModel = {
  domainId: 'log-analysis',
  domainName: 'Log Analysis & Multi-Source Correlation',
  badgeCode: 'LOGS',
  caption: 'UTC Timestamp Synchronization, Log Parsing, Cross-Source Timeline & Evidence Rigor',
  nodes: [
    {
      id: 'time',
      label: 'TIME',
      sub: 'UTC',
      cx: 60,
      cy: 90,
      boxX: 38,
      boxY: 68,
      width: 44,
      height: 44,
      roleType: 'source',
      description: 'NTP-synchronized universal UTC timestamp ensuring reliable event sequencing.',
    },
    {
      id: 'src',
      label: 'SRC',
      sub: 'ORIG',
      cx: 145,
      cy: 50,
      boxX: 123,
      boxY: 28,
      width: 44,
      height: 44,
      roleType: 'source',
      description: 'Originating device (Firewall, Domain Controller, Linux host, or Cloud service).',
    },
    {
      id: 'raw',
      label: 'RAW',
      sub: 'STR',
      cx: 145,
      cy: 150,
      boxX: 123,
      boxY: 128,
      width: 44,
      height: 44,
      roleType: 'boundary',
      description: 'Raw unparsed syslog string received over UDP port 514.',
    },
    {
      id: 'pars',
      label: 'PARS',
      sub: 'JSON',
      cx: 232,
      cy: 50,
      boxX: 210,
      boxY: 28,
      width: 44,
      height: 44,
      roleType: 'target',
      description: 'Grok / JSON parser extracting discrete fields: src_ip, dst_port, user, and action.',
    },
    {
      id: 'corr',
      label: 'CORR',
      sub: 'LINK',
      cx: 232,
      cy: 150,
      boxX: 210,
      boxY: 128,
      width: 44,
      height: 44,
      roleType: 'target',
      description: 'Timeline correlation engine aligning firewall connection with Windows logon event.',
    },
    {
      id: 'fact',
      label: 'FACT',
      sub: 'EVID',
      cx: 312,
      cy: 90,
      boxX: 290,
      boxY: 68,
      width: 44,
      height: 44,
      roleType: 'safety',
      description: 'Verified empirical evidence: separating confirmed observations from subjective inference.',
    },
  ],
  conduits: [
    { from: 'src', to: 'raw', label: 'SEND', activeInScenes: [0] },
    { from: 'raw', to: 'pars', label: 'GROK', activeInScenes: [0, 1] },
    { from: 'time', to: 'corr', label: 'SYNC', activeInScenes: [1, 2] },
    { from: 'pars', to: 'corr', label: 'ECS', activeInScenes: [2] },
    { from: 'corr', to: 'fact', label: 'VERF', activeInScenes: [2, 3] },
  ],
  scenes: [
    {
      id: 0,
      code: 'RAW',
      title: 'Unstructured Log Stream Ingestion',
      summary: 'Raw string emitted from border firewall; contains IP, port, timestamp, and rule name.',
      activeNodeIds: ['src', 'raw'],
      telemetryLog: 'RAW_SYSLOG: Oct 14 09:22:14 edge-fw-01 kernel: [ALLOW] IN=eth0 OUT=eth1 SRC=10.10.4.12 DST=1.1.1.1',
      outcomeTakeaway: 'Always verify source hostname and timestamp timezone before analyzing raw strings.',
    },
    {
      id: 1,
      code: 'PARS',
      title: 'Regex Parsing into Key-Value Fields',
      summary: 'Grok extraction maps raw text into searchable keys: source.ip and destination.port.',
      activeNodeIds: ['raw', 'pars'],
      telemetryLog: 'PARSED_JSON: {"source.ip": "10.10.4.12", "destination.port": 53, "network.protocol": "udp"}',
      outcomeTakeaway: 'Normalization errors cause missed detections; verify extracted field types.',
    },
    {
      id: 2,
      code: 'SYNC',
      title: 'Cross-Source Timeline Correlation',
      summary: 'Firewall outbound socket correlated with endpoint process launch at 09:22:14.210 UTC.',
      activeNodeIds: ['time', 'pars', 'corr'],
      telemetryLog: 'CORRELATION: Host FIN-PC-04 (09:22:14.198) matched Firewall session #8812 (09:22:14.210)',
      outcomeTakeaway: 'Time synchronization across enterprise NTP servers is mandatory for digital forensics.',
    },
    {
      id: 3,
      code: 'FACT',
      title: 'Empirical Fact vs Analyst Inference',
      summary: 'Analyst documents observed facts: "User logged on from IP X", avoiding speculative guesses.',
      activeNodeIds: ['corr', 'fact'],
      telemetryLog: 'EVIDENCE_NOTE: Fact: 3 failed logons followed by success. Inference: Brute force (Unconfirmed).',
      outcomeTakeaway: 'Outcome: High-integrity case notes rely solely on verifiable log observables.',
    },
  ],
};

// -----------------------------------------------------------------------------
// 15. SECURITY ECOSYSTEM & TELEMETRY FUSION (Module 10 Unit 1)
// -----------------------------------------------------------------------------
const SECURITY_ECOSYSTEM_MODEL: DomainVideoModel = {
  domainId: 'security-ecosystem',
  domainName: 'Integrated Security Ecosystem',
  badgeCode: 'XDR',
  caption: 'Cross-Domain Telemetry Fusion: SIEM, EDR, Network TAP, SOAR & Case Management',
  nodes: [
    {
      id: 'siem',
      label: 'SIEM',
      sub: 'CORR',
      cx: 60,
      cy: 60,
      boxX: 38,
      boxY: 38,
      width: 44,
      height: 42,
      roleType: 'source',
      description: 'SIEM platform aggregating central logs and evaluating multi-source correlation rules.',
    },
    {
      id: 'edr',
      label: 'EDR',
      sub: 'HOST',
      cx: 60,
      cy: 160,
      boxX: 38,
      boxY: 138,
      width: 44,
      height: 42,
      roleType: 'source',
      description: 'EDR agent providing deep endpoint visibility, memory telemetry, and process execution trees.',
    },
    {
      id: 'tap',
      label: 'TAP',
      sub: 'NET',
      cx: 145,
      cy: 110,
      boxX: 123,
      boxY: 88,
      width: 44,
      height: 44,
      roleType: 'boundary',
      description: 'Network TAP capturing raw packet payloads and TLS metadata at wire speed.',
    },
    {
      id: 'xdr',
      label: 'XDR',
      sub: 'FUSN',
      cx: 232,
      cy: 60,
      boxX: 210,
      boxY: 38,
      width: 44,
      height: 42,
      roleType: 'target',
      description: 'Extended Detection & Response (XDR) fusing endpoint, network, and cloud telemetry.',
    },
    {
      id: 'soar',
      label: 'SOAR',
      sub: 'ACT',
      cx: 232,
      cy: 160,
      boxX: 210,
      boxY: 138,
      width: 44,
      height: 42,
      roleType: 'actuator',
      description: 'SOAR platform automating threat intelligence lookups and containment workflows.',
    },
    {
      id: 'tikt',
      label: 'TIKT',
      sub: 'L1',
      cx: 312,
      cy: 110,
      boxX: 290,
      boxY: 88,
      width: 44,
      height: 44,
      roleType: 'safety',
      description: 'Unified analyst case workbench presenting correlated alert context in one console.',
    },
  ],
  conduits: [
    { from: 'siem', to: 'xdr', label: 'LOGS', activeInScenes: [0] },
    { from: 'edr', to: 'xdr', label: 'PROC', activeInScenes: [0, 1] },
    { from: 'tap', to: 'xdr', label: 'PCAP', activeInScenes: [1] },
    { from: 'xdr', to: 'soar', label: 'CORR', activeInScenes: [2] },
    { from: 'soar', to: 'tikt', label: 'DISP', activeInScenes: [2, 3] },
  ],
  scenes: [
    {
      id: 0,
      code: 'FUSN',
      title: 'Cross-Domain Telemetry Aggregation',
      summary: 'Endpoint process events from EDR and log records from SIEM stream into unified pipeline.',
      activeNodeIds: ['siem', 'edr', 'xdr'],
      telemetryLog: 'XDR_INGEST: Ingesting 45k eps from SIEM + 12k EDR telemetry events from agents',
      outcomeTakeaway: 'Siloed tools create blind spots; telemetry fusion provides complete visibility.',
    },
    {
      id: 1,
      code: 'CORR',
      title: 'Endpoint & Network Packet Correlated',
      summary: 'EDR process powershell.exe aligned with suspicious outbound TLS connection captured by TAP.',
      activeNodeIds: ['edr', 'tap', 'xdr'],
      alertNodeIds: ['xdr'],
      telemetryLog: 'CORRELATION: PID 8840 socket matched TAP TLS session to 185.220.101.5 on port 443',
      outcomeTakeaway: 'Correlating host and network data eliminates guesswork regarding which process opened the connection.',
    },
    {
      id: 2,
      code: 'AUTO',
      title: 'Automated Threat Intel Enrichment',
      summary: 'SOAR queries IP reputation databases; confirms destination IP is active C2 node.',
      activeNodeIds: ['xdr', 'soar'],
      telemetryLog: 'SOAR_ENRICH: Destination IP matched known Cobalt Strike team server | Confidence=99%',
      outcomeTakeaway: 'Automated threat scoring speeds up triage without requiring manual browser lookups.',
    },
    {
      id: 3,
      code: 'DISP',
      title: 'Unified Case Dispatched to L1 Analyst',
      summary: 'Single composite alert ticket delivered to analyst queue with all supporting evidence attached.',
      activeNodeIds: ['soar', 'tikt'],
      telemetryLog: 'TICKET_CREATE: Case #SEC-XDR-992 | Pre-packaged with Process Tree, PCAP, and IOCs',
      outcomeTakeaway: 'Outcome: Analyst performs fast, high-confidence triage with all evidence in one view.',
    },
  ],
};

// -----------------------------------------------------------------------------
// Helper: Select the appropriate Domain Model for ANY chapter
// -----------------------------------------------------------------------------
export function getDomainModelForChapter(
  chapter: V2ChapterNormalized,
  unit: V2Unit,
  module: V2Module
): DomainVideoModel {
  const modId = String(module.id || module.order || '').toLowerCase();
  const cTitle = (chapter.title || '').toLowerCase();
  const cConcept = (chapter.concept || '').toLowerCase();
  const uTitle = (unit.title || '').toLowerCase();

  // MODULE 10: OT / ICS / SCADA & Response Boundaries
  if (modId.includes('10') || cTitle.includes('ot') || cTitle.includes('ics') || cTitle.includes('scada')) {
    if (cTitle.includes('boundary') || cTitle.includes('escalat') || cTitle.includes('stop') || uTitle.includes('response')) {
      return OT_RESPONSE_MODEL;
    }
    if (cTitle.includes('availability') || cTitle.includes('segment') || cTitle.includes('purdue') || cTitle.includes('safety')) {
      return OT_SEGMENTATION_MODEL;
    }
    if (cTitle.includes('ecosystem') || uTitle.includes('ecosystem') || cTitle.includes('soar') || cTitle.includes('xdr')) {
      return SECURITY_ECOSYSTEM_MODEL;
    }
    // Default for Module 10 Unit 2 Chapter 1: "OT versus office IT"
    return OT_VS_IT_MODEL;
  }

  // MODULE 00: Orientation (Dedicated Models for each of the 6 individual chapters)
  if (modId.includes('00') || modId === '0' || cTitle.includes('visitor') || cTitle.includes('orientation')) {
    const cId = String(chapter.id || '').toUpperCase();
    if (cId.includes('M00-U1-C1') || cTitle.includes('visitor')) {
      return M00_U1_C1_VISITOR_MODEL;
    }
    if (cId.includes('M00-U1-C2') || cTitle.includes('centre') || cTitle.includes('people')) {
      return M00_U1_C2_ZONES_MODEL;
    }
    if (cId.includes('M00-U2-C1') || cTitle.includes('practice space')) {
      return M00_U2_C1_PRACTICE_SPACE_MODEL;
    }
    if (cId.includes('M00-U2-C2') || cTitle.includes('preserving') || cTitle.includes('clue')) {
      return M00_U2_C2_PRESERVE_CLUE_MODEL;
    }
    if (cId.includes('M00-U3-C1') || cTitle.includes('service we will follow') || cTitle.includes('fincorp')) {
      return M00_U3_C1_ENTITIES_MODEL;
    }
    if (cId.includes('M00-U3-C2') || cTitle.includes('route') || cTitle.includes('beginner to l1')) {
      return M00_U3_C2_ROUTE_MODEL;
    }
    return M00_U1_C1_VISITOR_MODEL;
  }

  // MODULE 01: Computer Fundamentals (Dedicated Models for each of the 6 individual chapters)
  if (modId.includes('01') || modId === '1') {
    const cId = String(chapter.id || '').toUpperCase();
    if (cId.includes('M01-U1-C1') || cTitle.includes('hardware') || cTitle.includes('accounts')) {
      return M01_U1_C1_ACCOUNTS_MODEL;
    }
    if (cId.includes('M01-U1-C2') || cTitle.includes('paths') || cTitle.includes('permissions')) {
      return M01_U1_C2_PATHS_MODEL;
    }
    if (cId.includes('M01-U2-C1') || cTitle.includes('what processes') || cTitle.includes('services do')) {
      return M01_U2_C1_PROCESS_TREE_MODEL;
    }
    if (cId.includes('M01-U2-C2') || cTitle.includes('routine') || cTitle.includes('unfamiliar')) {
      return M01_U2_C2_BASELINES_MODEL;
    }
    if (cId.includes('M01-U3-C1') || cTitle.includes('command-line') || cTitle.includes('essentials')) {
      return M01_U3_C1_CLI_TRIAGE_MODEL;
    }
    if (cId.includes('M01-U3-C2') || cTitle.includes('timestamps') || cTitle.includes('hostnames')) {
      return M01_U3_C2_TIMESTAMPS_MODEL;
    }
    return M01_U1_C1_ACCOUNTS_MODEL;
  }

  // MODULE 02 & MODULE 08: Networking Fundamentals & Network Security Monitoring
  if (
    modId.includes('02') ||
    modId.includes('08') ||
    cTitle.includes('network') ||
    cTitle.includes('packet') ||
    cTitle.includes('pcap') ||
    cTitle.includes('protocol') ||
    cTitle.includes('tcp') ||
    cTitle.includes('traffic')
  ) {
    return NETWORK_PACKET_MODEL;
  }

  // MODULE 03: Cybersecurity Fundamentals
  if (modId.includes('03') || cTitle.includes('cybersecurity fundamentals') || cTitle.includes('threats') || cTitle.includes('controls') || cTitle.includes('cia')) {
    return CYBER_FUNDAMENTALS_MODEL;
  }

  // MODULE 04 & MODULE 05: SIEM Fundamentals, Alert Triage & Sigma Rules
  if (
    modId.includes('04') ||
    modId.includes('05') ||
    cTitle.includes('siem') ||
    cTitle.includes('sigma') ||
    cTitle.includes('alert triage')
  ) {
    return SIEM_PIPELINE_MODEL;
  }

  // MODULE 06: Log & Event Analysis
  if (modId.includes('06') || cTitle.includes('log') || cTitle.includes('timeline') || cTitle.includes('evidence quality')) {
    return LOG_ANALYSIS_MODEL;
  }

  // MODULE 07: Windows & Linux Security Monitoring
  if (modId.includes('07')) {
    if (uTitle.includes('linux') || cTitle.includes('linux') || cTitle.includes('sudo') || cTitle.includes('auth.log')) {
      return LINUX_AUDIT_MODEL;
    }
    return WINDOWS_AUTH_MODEL;
  }

  // MODULE 09: Endpoint Detection & Response (EDR)
  if (modId.includes('09') || cTitle.includes('edr') || cTitle.includes('endpoint')) {
    return EDR_BEHAVIOR_MODEL;
  }

  // MODULE 11: Identity, Email & Threat Intelligence
  if (modId.includes('11')) {
    if (uTitle.includes('email') || cTitle.includes('email') || cTitle.includes('phish') || cTitle.includes('sender')) {
      return EMAIL_PHISH_MODEL;
    }
    if (uTitle.includes('threat') || cTitle.includes('threat intel') || cTitle.includes('ioc')) {
      return EMAIL_PHISH_MODEL;
    }
    return WINDOWS_AUTH_MODEL;
  }

  // MODULE 12: SOAR & Basic SOC Automation
  if (modId.includes('12') || cTitle.includes('soar') || cTitle.includes('automation') || cTitle.includes('playbook')) {
    return SOAR_AUTOMATION_MODEL;
  }

  // MODULE 13: MITRE ATT&CK for L1 Analysts
  if (modId.includes('13') || cTitle.includes('mitre') || cTitle.includes('att&ck') || cTitle.includes('tactic') || cTitle.includes('technique')) {
    return MITRE_MATRIX_MODEL;
  }

  // MODULE 14: Incident Response & SOC Documentation
  if (modId.includes('14') || cTitle.includes('incident response') || cTitle.includes('documentation') || cTitle.includes('handover') || cTitle.includes('closure')) {
    return INCIDENT_RESPONSE_MODEL;
  }

  // Explicit Fallbacks based on title keywords
  if (cTitle.includes('linux') || cConcept.includes('linux')) return LINUX_AUDIT_MODEL;
  if (cTitle.includes('windows') || cConcept.includes('windows')) return WINDOWS_AUTH_MODEL;
  if (cTitle.includes('edr') || cConcept.includes('edr')) return EDR_BEHAVIOR_MODEL;
  if (cTitle.includes('email') || cConcept.includes('email')) return EMAIL_PHISH_MODEL;
  if (cTitle.includes('soar') || cConcept.includes('soar')) return SOAR_AUTOMATION_MODEL;
  if (cTitle.includes('mitre') || cConcept.includes('mitre')) return MITRE_MATRIX_MODEL;
  if (cTitle.includes('ot') || cConcept.includes('ot')) return OT_VS_IT_MODEL;

  return NETWORK_PACKET_MODEL;
}

// =============================================================================
// MAIN COMPONENT: ChapterAnimatedVideoEngine
// Operates "like a video" with video scrubber, auto-play progression,
// and STRICTLY <= 4 letter labels on all visual elements.
// =============================================================================

interface ChapterAnimatedVideoEngineProps {
  chapter: V2ChapterNormalized;
  unit: V2Unit;
  module: V2Module;
  isMuted?: boolean;
  onSelectNode?: (nodeLabel: string) => void;
}

export function ChapterAnimatedVideoEngine({
  chapter,
  unit,
  module,
  isMuted = false,
  onSelectNode,
}: ChapterAnimatedVideoEngineProps) {
  const model = getDomainModelForChapter(chapter, unit, module);
  const [currentSceneIdx, setCurrentSceneIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [progressSec, setProgressSec] = useState<number>(0);

  const totalScenes = model.scenes.length;
  const currentScene = model.scenes[currentSceneIdx] || model.scenes[0];

  // Auto-play timer ("Like a Video")
  useEffect(() => {
    if (!isPlaying) return;

    const intervalMs = Math.round(3500 / playbackSpeed);
    const interval = setInterval(() => {
      setCurrentSceneIdx((prev) => {
        const next = (prev + 1) % totalScenes;
        if (!isMuted) {
          sound.playClick();
        }
        return next;
      });
      setProgressSec((prev) => (prev + 1) % (totalScenes * 4));
    }, intervalMs);

    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, totalScenes, isMuted]);

  const activeNode = model.nodes.find((n) => n.id === selectedNodeId) ||
    model.nodes.find((n) => currentScene.activeNodeIds.includes(n.id)) ||
    model.nodes[0];

  const handleTogglePlay = () => {
    if (!isMuted) sound.playClick();
    setIsPlaying((prev) => !prev);
  };

  const handlePrevScene = () => {
    if (!isMuted) sound.playClick();
    setCurrentSceneIdx((prev) => (prev - 1 + totalScenes) % totalScenes);
  };

  const handleNextScene = () => {
    if (!isMuted) sound.playClick();
    setCurrentSceneIdx((prev) => (prev + 1) % totalScenes);
  };

  const handleSelectScene = (idx: number) => {
    if (!isMuted) sound.playClick();
    setCurrentSceneIdx(idx);
  };

  const [showRawTelemetry, setShowRawTelemetry] = useState<boolean>(false);

  return (
    <div className="rounded-3xl p-4 sm:p-6 bg-white dark:bg-card text-foreground border border-slate-200 dark:border-border shadow-xs space-y-4">
      {/* Video Player Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Badge className="bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 text-[9px] font-mono font-bold flex items-center gap-1.5 px-2 py-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
            <span>ANIMATED CONCEPT STORY</span>
          </Badge>
          <span className="font-bold text-xs sm:text-sm text-slate-800 dark:text-sky-300 font-mono tracking-wider uppercase truncate">
            {model.domainName}
          </span>
        </div>

        {/* Video Time Code & Scene Code */}
        <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
          <span className="bg-sky-50 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-500/30 px-2 py-0.5 rounded font-bold">
            {currentScene.code}
          </span>
          <span>
            SCENE {currentSceneIdx + 1}/{totalScenes}
          </span>
        </div>
      </div>

      {/* SVG Canvas (360×260px) - STRICTLY <= 4 Letters on all visible graphic labels */}
      <div className="relative rounded-2xl p-4 bg-slate-50/90 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 flex flex-col items-center justify-center overflow-hidden">
        <svg
          viewBox="0 0 360 260"
          className="w-full max-w-[360px] h-[240px] sm:h-[260px] select-none"
          style={{ overflow: 'visible' }}
        >
          <defs>
            <filter id="videoGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Conduits / Connectors */}
          {model.conduits.map((c, cIdx) => {
            const fromNode = model.nodes.find((n) => n.id === c.from);
            const toNode = model.nodes.find((n) => n.id === c.to);
            if (!fromNode || !toNode) return null;

            const isFlowing = c.activeInScenes.includes(currentSceneIdx);
            const lineColor = isFlowing ? '#0284c7' : '#cbd5e1';

            return (
              <g key={`conduit-${cIdx}`}>
                <line
                  x1={fromNode.cx}
                  y1={fromNode.cy}
                  x2={toNode.cx}
                  y2={toNode.cy}
                  stroke={lineColor}
                  strokeWidth={isFlowing ? '2.5' : '1.5'}
                  strokeDasharray={isFlowing ? '5 5' : '3 3'}
                  className={isFlowing ? 'animated-signal-line' : ''}
                />
                {/* Moving Signal Packet on Active Conduits */}
                {isFlowing && (
                  <circle
                    cx={fromNode.cx + (toNode.cx - fromNode.cx) * 0.52}
                    cy={fromNode.cy + (toNode.cy - fromNode.cy) * 0.52}
                    r="3.5"
                    fill="#0284c7"
                    className="animate-pulse"
                  />
                )}
                {/* Conduit Midpoint Token - STRICTLY <= 4 letters */}
                {c.label && isFlowing && (
                  <text
                    x={fromNode.cx + (toNode.cx - fromNode.cx) * 0.5}
                    y={fromNode.cy + (toNode.cy - fromNode.cy) * 0.5 - 5}
                    textAnchor="middle"
                    fill="#0369a1"
                    fontSize="7"
                    fontWeight="700"
                    fontFamily="monospace"
                  >
                    {c.label.slice(0, 4)}
                  </text>
                )}
              </g>
            );
          })}

          {/* Graphic Nodes - STRICTLY <= 4 letters */}
          {model.nodes.map((n) => {
            const isSceneActive = currentScene.activeNodeIds.includes(n.id);
            const isAlert = currentScene.alertNodeIds?.includes(n.id);
            const isBlocked = currentScene.blockedNodeIds?.includes(n.id);
            const isSelected = selectedNodeId === n.id;

            let rectFill = '#ffffff';
            let strokeColor = '#cbd5e1';
            let textColor = '#0f172a';

            if (isBlocked) {
              rectFill = '#ffe4e6';
              strokeColor = '#f43f5e';
              textColor = '#be123c';
            } else if (isAlert) {
              rectFill = '#fef3c7';
              strokeColor = '#f59e0b';
              textColor = '#b45309';
            } else if (isSelected || isSceneActive) {
              rectFill = '#f0f9ff';
              strokeColor = '#0284c7';
              textColor = '#0369a1';
            }

            return (
              <g
                key={`node-${n.id}`}
                className="cursor-pointer transition-transform hover:scale-105"
                onClick={() => {
                  if (!isMuted) sound.playClick();
                  setSelectedNodeId(n.id);
                  if (onSelectNode) onSelectNode(n.label);
                }}
              >
                {/* Node Box */}
                <rect
                  x={n.boxX}
                  y={n.boxY}
                  width={n.width}
                  height={n.height}
                  rx="6"
                  fill={rectFill}
                  stroke={strokeColor}
                  strokeWidth={isSelected || isSceneActive ? '2' : '1'}
                  style={
                    isSelected || isSceneActive
                      ? { filter: 'drop-shadow(0 2px 6px rgba(2, 132, 199, 0.3))' }
                      : {}
                  }
                />

                {/* Main Label: STRICTLY <= 4 letters */}
                <text
                  x={n.cx}
                  y={n.boxY + 16}
                  textAnchor="middle"
                  fill={textColor}
                  fontSize="10"
                  fontWeight="800"
                  fontFamily="monospace"
                >
                  {n.label.slice(0, 4)}
                </text>

                {/* Sub Label: STRICTLY <= 4 letters */}
                <text
                  x={n.cx}
                  y={n.boxY + 30}
                  textAnchor="middle"
                  fill={isAlert ? '#b45309' : isBlocked ? '#e11d48' : '#64748b'}
                  fontSize="7"
                  fontWeight="600"
                  fontFamily="monospace"
                >
                  {n.sub.slice(0, 4)}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Video Scrubber & Playback Timeline Bar */}
        <div className="w-full pt-3 flex items-center justify-between gap-2 border-t border-slate-200/80 dark:border-slate-800/80 mt-2">
          {/* Play/Pause & Step Buttons */}
          <div className="flex items-center gap-1.5">
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={handleTogglePlay}
              className="h-7 px-2.5 text-xs font-mono gap-1 rounded-lg border-sky-500/30 text-sky-700 dark:text-sky-300 bg-sky-50 dark:bg-sky-950/40 hover:bg-sky-100 dark:hover:bg-sky-900/60"
              title={isPlaying ? 'Pause video simulation' : 'Play video simulation'}
            >
              {isPlaying ? <Pause className="w-3 h-3 text-sky-600" /> : <Play className="w-3 h-3 text-sky-600" />}
              <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
            </Button>

            <button
              type="button"
              onClick={handlePrevScene}
              className="p-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
              title="Previous scene"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={handleNextScene}
              className="p-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
              title="Next scene"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Interactive Scene Keyframe Indicators */}
          <div className="flex items-center gap-1">
            {model.scenes.map((sc, sIdx) => {
              const isActive = currentSceneIdx === sIdx;
              return (
                <button
                  key={sIdx}
                  type="button"
                  onClick={() => handleSelectScene(sIdx)}
                  className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold transition-all cursor-pointer border ${
                    isActive
                      ? 'bg-sky-600 border-sky-600 text-white shadow-2xs'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
                  }`}
                >
                  {sc.code}
                </button>
              );
            })}
          </div>

          {/* Speed Toggle */}
          <button
            type="button"
            onClick={() => setPlaybackSpeed((prev) => (prev === 1 ? 1.5 : prev === 1.5 ? 2 : 1))}
            className="text-[10px] font-mono px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-sky-600 cursor-pointer"
            title="Video playback speed"
          >
            {playbackSpeed}x
          </button>
        </div>
      </div>

      {/* Synchronized Video Scene Narration Transcript (Explains Chapter Outcome) */}
      <div className="p-4 rounded-2xl bg-sky-50/70 dark:bg-sky-950/20 border border-sky-200/70 dark:border-sky-900/40 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-sky-200/60 dark:border-slate-800/80 pb-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-sky-600" />
              <span>
                SCENE #{currentSceneIdx + 1}: {currentScene.title}
              </span>
            </span>
          </div>

          <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 text-[9px] font-mono font-bold px-2 py-0.5">
            OUTCOME ACTIVE
          </Badge>
        </div>

        {/* Outcome Description */}
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
          {currentScene.summary}
        </p>

        {/* Key Takeaway Pill */}
        <div className="pt-1 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 dark:text-slate-400">
          <span className="text-sky-800 dark:text-sky-300 font-semibold">
            <strong>Takeaway: </strong> {currentScene.outcomeTakeaway}
          </span>
          <span className="text-slate-500 text-[11px]">
            Node: <strong className="text-slate-700 dark:text-slate-300">{activeNode.label}</strong> ({activeNode.description.slice(0, 36)}...)
          </span>
        </div>

        {/* Optional Collapsible Raw Telemetry Log */}
        <div className="pt-1 border-t border-sky-200/50 dark:border-slate-800/60 mt-1">
          <button
            type="button"
            onClick={() => setShowRawTelemetry(!showRawTelemetry)}
            className="text-[10px] font-mono text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 underline cursor-pointer"
          >
            {showRawTelemetry ? '▼ Hide Technical Telemetry Event' : '▶ Show Technical Telemetry Event'}
          </button>
          {showRawTelemetry && (
            <div className="mt-1.5 p-2 rounded-lg bg-slate-900 text-emerald-400 font-mono text-[10px] truncate">
              {currentScene.telemetryLog}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
