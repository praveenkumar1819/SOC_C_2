'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface VectorProps {
  currentStage: number; // 1 to 5
}

// =========================================================================
// TOPIC 1-1: Enterprise Telemetry & Data Pipeline Architecture Vector
// Real-world scenario: Workstation FIN-WS-09 infected -> Egress -> SIEM -> L1 Queue
// =========================================================================
export function Topic11Vector({ currentStage }: VectorProps) {
  return (
    <div className="w-full h-64 bg-slate-950 rounded-xl relative overflow-hidden flex items-center justify-center p-2 border border-slate-800">
      <svg viewBox="0 0 800 240" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad-pulse" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="1" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="grad-alert" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#b91c1c" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Background Grid Pattern */}
        <pattern id="grid11" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.5" />
        </pattern>
        <rect width="800" height="240" fill="url(#grid11)" opacity="0.4" />

        {/* Data Transmission Connecting Bus Lines */}
        <path d="M 120 120 L 260 120" stroke="#334155" strokeWidth="3" strokeDasharray="4 4" />
        <path d="M 320 120 L 460 120" stroke="#334155" strokeWidth="3" strokeDasharray="4 4" />
        <path d="M 520 120 L 660 120" stroke="#334155" strokeWidth="3" strokeDasharray="4 4" />

        {/* Animated Moving Data Packet Pulses */}
        <motion.circle
          cx={currentStage >= 2 ? 260 : 120}
          cy="120"
          r="6"
          fill="#38bdf8"
          filter="url(#glow)"
          animate={{ cx: [120, 260, 460, 660] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
        />

        {/* NODE 1: Compromised Endpoint (FIN-WS-09) */}
        <g transform="translate(60, 70)">
          <rect
            width="100"
            height="100"
            rx="12"
            fill="#0f172a"
            stroke={currentStage === 1 ? '#ef4444' : '#334155'}
            strokeWidth={currentStage === 1 ? 2.5 : 1}
          />
          <rect x="25" y="20" width="50" height="35" rx="4" fill="#1e293b" />
          <path d="M 35 65 L 65 65" stroke="#64748b" strokeWidth="3" />
          <circle cx="50" cy="37" r="8" fill={currentStage >= 1 ? '#ef4444' : '#64748b'} filter={currentStage === 1 ? 'url(#glow)' : undefined} />
          <text x="50" y="80" fill="#94a3b8" fontSize="9" fontWeight="bold" textAnchor="middle">ENDPOINT</text>
          <text x="50" y="92" fill="#ef4444" fontSize="8" textAnchor="middle" fontWeight="bold">FIN-WS-09</text>
        </g>

        {/* NODE 2: Log Forwarder / Edge Gateway */}
        <g transform="translate(240, 70)">
          <rect
            width="100"
            height="100"
            rx="12"
            fill="#0f172a"
            stroke={currentStage === 2 ? '#38bdf8' : '#334155'}
            strokeWidth={currentStage === 2 ? 2.5 : 1}
          />
          <path d="M 35 25 L 65 25 L 75 45 L 25 45 Z" fill="#1e293b" stroke="#475569" />
          <rect x="30" y="45" width="40" height="20" rx="3" fill="#334155" />
          <circle cx="42" cy="55" r="3" fill="#22c55e" />
          <circle cx="58" cy="55" r="3" fill={currentStage >= 2 ? '#38bdf8' : '#64748b'} />
          <text x="50" y="80" fill="#94a3b8" fontSize="9" fontWeight="bold" textAnchor="middle">FORWARDER</text>
          <text x="50" y="92" fill="#38bdf8" fontSize="8" textAnchor="middle">TLS 1.3 / Port 6514</text>
        </g>

        {/* NODE 3: Cloud SIEM Correlation (Sentinel/Splunk) */}
        <g transform="translate(440, 70)">
          <rect
            width="100"
            height="100"
            rx="12"
            fill="#0f172a"
            stroke={currentStage >= 3 ? '#a855f7' : '#334155'}
            strokeWidth={currentStage === 3 || currentStage === 4 ? 2.5 : 1}
          />
          <rect x="25" y="20" width="50" height="12" rx="3" fill="#1e293b" />
          <rect x="25" y="36" width="50" height="12" rx="3" fill="#1e293b" />
          <rect x="25" y="52" width="50" height="12" rx="3" fill="#1e293b" />
          <circle cx="33" cy="26" r="2.5" fill="#a855f7" />
          <circle cx="33" cy="42" r="2.5" fill="#38bdf8" />
          <circle cx="33" cy="58" r="2.5" fill={currentStage >= 4 ? '#ef4444' : '#22c55e'} />
          <text x="50" y="80" fill="#94a3b8" fontSize="9" fontWeight="bold" textAnchor="middle">SIEM ENGINE</text>
          <text x="50" y="92" fill="#a855f7" fontSize="8" textAnchor="middle">Rule T1059.001</text>
        </g>

        {/* NODE 4: L1 Analyst Triage Console */}
        <g transform="translate(640, 70)">
          <rect
            width="100"
            height="100"
            rx="12"
            fill="#0f172a"
            stroke={currentStage === 5 ? '#22c55e' : '#334155'}
            strokeWidth={currentStage === 5 ? 2.5 : 1}
          />
          <circle cx="50" cy="35" r="14" fill="#1e293b" stroke="#334155" />
          <circle cx="50" cy="32" r="6" fill="#38bdf8" />
          <path d="M 38 48 C 38 42 62 42 62 48" stroke="#38bdf8" strokeWidth="2" />
          <rect x="25" y="56" width="50" height="12" rx="3" fill={currentStage === 5 ? '#22c55e' : '#334155'} />
          <text x="50" y="65" fill="#0f172a" fontSize="7" fontWeight="bold" textAnchor="middle">
            {currentStage === 5 ? 'CLAIMED' : 'QUEUE'}
          </text>
          <text x="50" y="82" fill="#94a3b8" fontSize="9" fontWeight="bold" textAnchor="middle">L1 ANALYST</text>
          <text x="50" y="93" fill="#22c55e" fontSize="8" textAnchor="middle">SLA: 30 Mins</text>
        </g>
      </svg>
    </div>
  );
}

// =========================================================================
// TOPIC 1-2: SOC Tier Escalation Funnel & Incident Routing Vector
// Real-world scenario: 50k EPS -> Filtered to 50 L1 -> 5 L2 -> 1 L3 CSIRT
// =========================================================================
export function Topic12Vector({ currentStage }: VectorProps) {
  return (
    <div className="w-full h-64 bg-slate-950 rounded-xl relative overflow-hidden flex items-center justify-center p-2 border border-slate-800">
      <svg viewBox="0 0 800 240" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <pattern id="grid12" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.5" />
        </pattern>
        <rect width="800" height="240" fill="url(#grid12)" opacity="0.4" />

        {/* Funnel Vectors */}
        <polygon points="100,30 320,30 260,190 160,190" fill="#0f172a" stroke="#334155" strokeWidth="2" />
        
        {/* Tier Ingestion Layers */}
        <rect x="110" y="40" width="200" height="25" rx="4" fill="#1e293b" />
        <text x="210" y="57" fill="#94a3b8" fontSize="10" textAnchor="middle" fontWeight="bold">Raw Telemetry: 50,000 EPS</text>

        <rect x="130" y="75" width="160" height="25" rx="4" fill="#334155" />
        <text x="210" y="92" fill="#cbd5e1" fontSize="10" textAnchor="middle" fontWeight="bold">SIEM Correlated Alerts: 50/day</text>

        {/* Tier 1 Box */}
        <g transform="translate(360, 30)">
          <rect
            width="170"
            height="55"
            rx="8"
            fill="#0f172a"
            stroke={currentStage <= 2 ? '#38bdf8' : '#334155'}
            strokeWidth={currentStage <= 2 ? 2.5 : 1}
          />
          <circle cx="25" cy="27" r="12" fill="#38bdf8" fillOpacity="0.2" />
          <text x="25" y="32" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">L1</text>
          <text x="48" y="24" fill="#f8fafc" fontSize="11" fontWeight="bold">Tier 1: Triage</text>
          <text x="48" y="40" fill="#94a3b8" fontSize="9">Scope Alert & Filter FPs</text>
        </g>

        {/* Arrow to Tier 2 */}
        <path d="M 445 85 L 445 105" stroke={currentStage >= 3 ? '#a855f7' : '#334155'} strokeWidth="2.5" markerEnd="url(#arrow)" />

        {/* Tier 2 Box */}
        <g transform="translate(360, 105)">
          <rect
            width="170"
            height="55"
            rx="8"
            fill="#0f172a"
            stroke={currentStage === 3 || currentStage === 4 ? '#a855f7' : '#334155'}
            strokeWidth={currentStage === 3 || currentStage === 4 ? 2.5 : 1}
          />
          <circle cx="25" cy="27" r="12" fill="#a855f7" fillOpacity="0.2" />
          <text x="25" y="32" fill="#a855f7" fontSize="11" fontWeight="bold" textAnchor="middle">L2</text>
          <text x="48" y="24" fill="#f8fafc" fontSize="11" fontWeight="bold">Tier 2: Incident Resp</text>
          <text x="48" y="40" fill="#94a3b8" fontSize="9">Host Isolation & Remediation</text>
        </g>

        {/* Arrow to Tier 3 / CSIRT */}
        <path d="M 530 132 L 600 132" stroke={currentStage >= 4 ? '#ef4444' : '#334155'} strokeWidth="2.5" />

        {/* Tier 3 / CSIRT Box */}
        <g transform="translate(600, 95)">
          <rect
            width="170"
            height="75"
            rx="8"
            fill="#0f172a"
            stroke={currentStage >= 4 ? '#ef4444' : '#334155'}
            strokeWidth={currentStage >= 4 ? 2.5 : 1}
          />
          <circle cx="25" cy="37" r="12" fill="#ef4444" fillOpacity="0.2" />
          <text x="25" y="42" fill="#ef4444" fontSize="11" fontWeight="bold" textAnchor="middle">L3</text>
          <text x="48" y="30" fill="#f8fafc" fontSize="11" fontWeight="bold">Tier 3 / CSIRT</text>
          <text x="48" y="46" fill="#94a3b8" fontSize="9">Malware Reverse Eng</text>
          <text x="48" y="59" fill="#ef4444" fontSize="8" fontWeight="bold">Crisis Handoff to CISO</text>
        </g>
      </svg>
    </div>
  );
}

// =========================================================================
// TOPIC 1-3: Modern SOC Technology Stack Vector (NDR, EDR, SIEM, SOAR)
// =========================================================================
export function Topic13Vector({ currentStage }: VectorProps) {
  return (
    <div className="w-full h-64 bg-slate-950 rounded-xl relative overflow-hidden flex items-center justify-center p-2 border border-slate-800">
      <svg viewBox="0 0 800 240" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <pattern id="grid13" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.5" />
        </pattern>
        <rect width="800" height="240" fill="url(#grid13)" opacity="0.4" />

        {/* Central SIEM Node */}
        <circle cx="400" cy="120" r="48" fill="#0f172a" stroke="#a855f7" strokeWidth="3" />
        <text x="400" y="115" fill="#f8fafc" fontSize="12" fontWeight="bold" textAnchor="middle">SIEM</text>
        <text x="400" y="132" fill="#a855f7" fontSize="9" textAnchor="middle" fontWeight="bold">Correlation Hub</text>

        {/* Satellite 1: NDR (Network Wire) */}
        <g transform="translate(100, 30)">
          <rect width="140" height="60" rx="8" fill="#0f172a" stroke={currentStage === 1 ? '#38bdf8' : '#334155'} strokeWidth="2" />
          <text x="70" y="28" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">NDR (Zeek/ExtraHop)</text>
          <text x="70" y="45" fill="#94a3b8" fontSize="9" textAnchor="middle">Packet & Flow Wire</text>
        </g>
        <path d="M 240 60 L 360 100" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />

        {/* Satellite 2: EDR (Endpoint Kernel) */}
        <g transform="translate(100, 150)">
          <rect width="140" height="60" rx="8" fill="#0f172a" stroke={currentStage === 2 ? '#22c55e' : '#334155'} strokeWidth="2" />
          <text x="70" y="28" fill="#22c55e" fontSize="11" fontWeight="bold" textAnchor="middle">EDR (Defender/Crowd)</text>
          <text x="70" y="45" fill="#94a3b8" fontSize="9" textAnchor="middle">Kernel Process Hook</text>
        </g>
        <path d="M 240 180 L 360 140" stroke="#22c55e" strokeWidth="2" strokeDasharray="3 3" />

        {/* Satellite 3: SOAR (Automation Engine) */}
        <g transform="translate(560, 85)">
          <rect width="150" height="70" rx="8" fill="#0f172a" stroke={currentStage >= 4 ? '#eab308' : '#334155'} strokeWidth="2" />
          <text x="75" y="30" fill="#eab308" fontSize="11" fontWeight="bold" textAnchor="middle">SOAR (Playbooks)</text>
          <text x="75" y="48" fill="#94a3b8" fontSize="9" textAnchor="middle">Automated Isolation</text>
          <text x="75" y="60" fill="#eab308" fontSize="8" textAnchor="middle">Firewall IP Block API</text>
        </g>
        <path d="M 448 120 L 560 120" stroke="#eab308" strokeWidth="3" />
      </svg>
    </div>
  );
}

// =========================================================================
// TOPIC 2-1: SIEM Alert Ingestion Queue & SLA Countdown Vector
// =========================================================================
export function Topic21Vector({ currentStage }: VectorProps) {
  return (
    <div className="w-full h-64 bg-slate-950 rounded-xl relative overflow-hidden flex items-center justify-center p-2 border border-slate-800">
      <svg viewBox="0 0 800 240" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <pattern id="grid21" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.5" />
        </pattern>
        <rect width="800" height="240" fill="url(#grid21)" opacity="0.4" />

        {/* Queue Container */}
        <rect x="50" y="30" width="700" height="180" rx="10" fill="#0f172a" stroke="#334155" strokeWidth="2" />
        <text x="70" y="55" fill="#f8fafc" fontSize="12" fontWeight="bold">SIEM REAL-TIME ALERT QUEUE STREAM</text>
        <text x="650" y="55" fill="#22c55e" fontSize="10" fontWeight="bold">● LIVE INGESTION</text>

        {/* Alert Row 1: High */}
        <g transform="translate(70, 70)">
          <rect width="660" height="35" rx="6" fill="#1e293b" stroke={currentStage >= 1 ? '#ef4444' : '#475569'} strokeWidth="1.5" />
          <circle cx="20" cy="18" r="5" fill="#ef4444" />
          <text x="35" y="22" fill="#ef4444" fontSize="10" fontWeight="bold">P1 - CRITICAL</text>
          <text x="140" y="22" fill="#f8fafc" fontSize="10">Active Ransomware Canary Triggered (Host: FIN-DB01)</text>
          <rect x="520" y="8" width="70" height="20" rx="4" fill="#450a0a" />
          <text x="555" y="22" fill="#f87171" fontSize="9" textAnchor="middle" fontWeight="bold">SLA: 12m Left</text>
          <rect x="600" y="8" width="50" height="20" rx="4" fill="#0284c7" />
          <text x="625" y="22" fill="#ffffff" fontSize="9" textAnchor="middle" fontWeight="bold">Claim</text>
        </g>

        {/* Alert Row 2: Password Spray */}
        <g transform="translate(70, 115)">
          <rect width="660" height="35" rx="6" fill="#1e293b" stroke={currentStage >= 2 ? '#f59e0b' : '#475569'} strokeWidth="1.5" />
          <circle cx="20" cy="18" r="5" fill="#f59e0b" />
          <text x="35" y="22" fill="#f59e0b" fontSize="10" fontWeight="bold">P2 - HIGH</text>
          <text x="140" y="22" fill="#f8fafc" fontSize="10">Multiple Kerberos Pre-Auth Failures (48 Users / 10m)</text>
          <rect x="520" y="8" width="70" height="20" rx="4" fill="#451a03" />
          <text x="555" y="22" fill="#fbbf24" fontSize="9" textAnchor="middle" fontWeight="bold">SLA: 28m Left</text>
          <rect x="600" y="8" width="50" height="20" rx="4" fill="#334155" />
          <text x="625" y="22" fill="#94a3b8" fontSize="9" textAnchor="middle">Queued</text>
        </g>

        {/* Alert Row 3: Medium */}
        <g transform="translate(70, 160)">
          <rect width="660" height="35" rx="6" fill="#1e293b" stroke="#334155" />
          <circle cx="20" cy="18" r="5" fill="#38bdf8" />
          <text x="35" y="22" fill="#38bdf8" fontSize="10" fontWeight="bold">P3 - MEDIUM</text>
          <text x="140" y="22" fill="#f8fafc" fontSize="10">Anomalous Outbound DNS TXT Query Volume (Workstation)</text>
          <rect x="520" y="8" width="70" height="20" rx="4" fill="#082f49" />
          <text x="555" y="22" fill="#38bdf8" fontSize="9" textAnchor="middle" fontWeight="bold">SLA: 1h 45m</text>
          <rect x="600" y="8" width="50" height="20" rx="4" fill="#334155" />
          <text x="625" y="22" fill="#94a3b8" fontSize="9" textAnchor="middle">Queued</text>
        </g>
      </svg>
    </div>
  );
}

// =========================================================================
// TOPIC 2-2: Forensic Process Tree & Context Analysis Vector
// =========================================================================
export function Topic22Vector({ currentStage }: VectorProps) {
  return (
    <div className="w-full h-64 bg-slate-950 rounded-xl relative overflow-hidden flex items-center justify-center p-2 border border-slate-800">
      <svg viewBox="0 0 800 240" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <pattern id="grid22" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.5" />
        </pattern>
        <rect width="800" height="240" fill="url(#grid22)" opacity="0.4" />

        {/* Tree Root: WINWORD.EXE */}
        <g transform="translate(60, 40)">
          <rect width="180" height="50" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
          <text x="15" y="24" fill="#38bdf8" fontSize="10" fontWeight="bold">ROOT PROCESS (Parent)</text>
          <text x="15" y="40" fill="#f8fafc" fontSize="11" fontFamily="monospace">WINWORD.EXE (PID: 4920)</text>
        </g>

        {/* Branch connector */}
        <path d="M 240 65 L 290 65 L 290 120 L 330 120" stroke="#ef4444" strokeWidth="2.5" />

        {/* Child 1: cmd.exe */}
        <g transform="translate(330, 95)">
          <rect width="180" height="50" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
          <text x="15" y="24" fill="#f59e0b" fontSize="10" fontWeight="bold">SPAWNED SHELL (Child)</text>
          <text x="15" y="40" fill="#f8fafc" fontSize="11" fontFamily="monospace">cmd.exe /c (PID: 5812)</text>
        </g>

        {/* Branch connector 2 */}
        <path d="M 510 120 L 560 120 L 560 175 L 600 175" stroke="#ef4444" strokeWidth="2.5" />

        {/* Child 2: powershell.exe */}
        <g transform="translate(600, 150)">
          <rect width="180" height="55" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="2.5" />
          <text x="15" y="22" fill="#ef4444" fontSize="10" fontWeight="bold">MALICIOUS EXECUTION</text>
          <text x="15" y="36" fill="#fecaca" fontSize="10" fontFamily="monospace">powershell -enc SQB...</text>
          <text x="15" y="48" fill="#ef4444" fontSize="8" fontWeight="bold">Network Beacon $\to$ 203.0.113.88</text>
        </g>
      </svg>
    </div>
  );
}

// =========================================================================
// TOPIC 2-3: True Positive vs False Positive Triage Decision Tree Vector
// =========================================================================
export function Topic23Vector({ currentStage }: VectorProps) {
  return (
    <div className="w-full h-64 bg-slate-950 rounded-xl relative overflow-hidden flex items-center justify-center p-2 border border-slate-800">
      <svg viewBox="0 0 800 240" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <pattern id="grid23" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.5" />
        </pattern>
        <rect width="800" height="240" fill="url(#grid23)" opacity="0.4" />

        {/* Incoming Alert Root */}
        <g transform="translate(40, 95)">
          <rect width="160" height="55" rx="8" fill="#0f172a" stroke="#a855f7" strokeWidth="2" />
          <text x="80" y="25" fill="#f8fafc" fontSize="11" fontWeight="bold" textAnchor="middle">INCOMING ALERT</text>
          <text x="80" y="42" fill="#a855f7" fontSize="9" textAnchor="middle">SSH / SMB Failed Auth</text>
        </g>

        {/* Split decision arrows */}
        <path d="M 200 110 L 290 110 L 340 60 L 400 60" stroke="#22c55e" strokeWidth="2" />
        <path d="M 200 135 L 290 135 L 340 180 L 400 180" stroke="#ef4444" strokeWidth="2" />

        {/* Branch A: False Positive Path */}
        <g transform="translate(400, 30)">
          <rect width="360" height="60" rx="8" fill="#064e3b" stroke="#22c55e" strokeWidth="2" />
          <text x="15" y="25" fill="#86efac" fontSize="11" fontWeight="bold">VERDICT: FALSE POSITIVE (Benign)</text>
          <text x="15" y="42" fill="#d1fae5" fontSize="9">Source: Internal Vulnerability Scanner (Nessus IP 10.0.4.15)</text>
          <text x="15" y="53" fill="#86efac" fontSize="8">Change Ticket CHG-8910 Approved • Action: Tune SIEM threshold</text>
        </g>

        {/* Branch B: True Positive Path */}
        <g transform="translate(400, 150)">
          <rect width="360" height="65" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="2.5" />
          <text x="15" y="25" fill="#fca5a5" fontSize="11" fontWeight="bold">VERDICT: TRUE POSITIVE (Malicious Intrusion)</text>
          <text x="15" y="42" fill="#fee2e2" fontSize="9">Source: External Tor Exit Node IP (198.51.100.42)</text>
          <text x="15" y="55" fill="#ef4444" fontSize="8" fontWeight="bold">Action: Block IP at Perimeter + Enforce Password Reset</text>
        </g>
      </svg>
    </div>
  );
}

// =========================================================================
// TOPIC 3-1: Severity Matrix & SLA Countdown Vector
// =========================================================================
export function Topic31Vector({ currentStage }: VectorProps) {
  return (
    <div className="w-full h-64 bg-slate-950 rounded-xl relative overflow-hidden flex items-center justify-center p-2 border border-slate-800">
      <svg viewBox="0 0 800 240" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <pattern id="grid31" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.5" />
        </pattern>
        <rect width="800" height="240" fill="url(#grid31)" opacity="0.4" />

        {/* 2x2 Severity Quadrant */}
        <g transform="translate(80, 25)">
          {/* P1 Box */}
          <rect x="0" y="0" width="140" height="90" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="2" />
          <text x="70" y="30" fill="#f87171" fontSize="12" fontWeight="bold" textAnchor="middle">P1 - CRITICAL</text>
          <text x="70" y="50" fill="#fecaca" fontSize="9" textAnchor="middle">Domain Controller Compromise</text>
          <text x="70" y="70" fill="#ef4444" fontSize="11" fontWeight="bold" textAnchor="middle">SLA: 15 MINS</text>

          {/* P2 Box */}
          <rect x="150" y="0" width="140" height="90" rx="8" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
          <text x="220" y="30" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">P2 - HIGH</text>
          <text x="220" y="50" fill="#fef3c7" fontSize="9" textAnchor="middle">Exec Workstation Trojan</text>
          <text x="220" y="70" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">SLA: 1 HOUR</text>

          {/* P3 Box */}
          <rect x="0" y="100" width="140" height="90" rx="8" fill="#082f49" stroke="#38bdf8" strokeWidth="2" />
          <text x="70" y="130" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">P3 - MEDIUM</text>
          <text x="70" y="150" fill="#e0f2fe" fontSize="9" textAnchor="middle">Single Suspicious Script</text>
          <text x="70" y="170" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">SLA: 4 HOURS</text>

          {/* P4 Box */}
          <rect x="150" y="100" width="140" height="90" rx="8" fill="#14532d" stroke="#22c55e" strokeWidth="2" />
          <text x="220" y="130" fill="#4ade80" fontSize="12" fontWeight="bold" textAnchor="middle">P4 - LOW</text>
          <text x="220" y="150" fill="#dcfce7" fontSize="9" textAnchor="middle">Isolated Port Scan / Noise</text>
          <text x="220" y="170" fill="#22c55e" fontSize="11" fontWeight="bold" textAnchor="middle">SLA: 24 HOURS</text>
        </g>

        {/* Formula Representation on the right */}
        <g transform="translate(420, 50)">
          <rect width="320" height="140" rx="10" fill="#0f172a" stroke="#334155" />
          <text x="160" y="30" fill="#f8fafc" fontSize="11" fontWeight="bold" textAnchor="middle">ENTERPRISE SEVERITY FORMULA</text>
          <text x="160" y="55" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">Severity = Asset Impact × Threat Urgency</text>
          <path d="M 30 75 L 290 75" stroke="#334155" />
          <text x="160" y="95" fill="#94a3b8" fontSize="9" textAnchor="middle">Critical Asset + Active Execution = P1 (Immediate Escalate)</text>
          <text x="160" y="115" fill="#94a3b8" fontSize="9" textAnchor="middle">Non-Critical + Benign Scan = P4 (Standard Queue)</text>
        </g>
      </svg>
    </div>
  );
}

// =========================================================================
// TOPIC 3-2: Shift Handover & Escalation Flight Plan Vector
// =========================================================================
export function Topic32Vector({ currentStage }: VectorProps) {
  return (
    <div className="w-full h-64 bg-slate-950 rounded-xl relative overflow-hidden flex items-center justify-center p-2 border border-slate-800">
      <svg viewBox="0 0 800 240" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <pattern id="grid32" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.5" />
        </pattern>
        <rect width="800" height="240" fill="url(#grid32)" opacity="0.4" />

        {/* Day Shift Analyst */}
        <g transform="translate(60, 60)">
          <rect width="180" height="120" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
          <circle cx="90" cy="35" r="16" fill="#0369a1" />
          <text x="90" y="40" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">DAY</text>
          <text x="90" y="70" fill="#f8fafc" fontSize="11" fontWeight="bold" textAnchor="middle">Outgoing Shift (US)</text>
          <text x="90" y="88" fill="#38bdf8" fontSize="9" textAnchor="middle">07:00 - 19:00 UTC</text>
          <text x="90" y="105" fill="#94a3b8" fontSize="8" textAnchor="middle">3 Active P1/P2 Tickets</text>
        </g>

        {/* 5 W's Dossier in Transit */}
        <g transform="translate(290, 80)">
          <rect width="220" height="80" rx="8" fill="#1e293b" stroke="#a855f7" strokeWidth="2" />
          <text x="110" y="25" fill="#a855f7" fontSize="10" fontWeight="bold" textAnchor="middle">THE 5 W&apos;s HANDOVER DOSSIER</text>
          <text x="110" y="42" fill="#cbd5e1" fontSize="9" textAnchor="middle">Who • What • Where • When (UTC) • Why</text>
          <text x="110" y="60" fill="#22c55e" fontSize="8" fontWeight="bold" textAnchor="middle">✓ Signed & Verified by Tier 1 Lead</text>
        </g>

        {/* Transfer vectors */}
        <path d="M 240 120 L 290 120" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow)" />
        <path d="M 510 120 L 560 120" stroke="#22c55e" strokeWidth="3" markerEnd="url(#arrow)" />

        {/* Night Shift Analyst */}
        <g transform="translate(560, 60)">
          <rect width="180" height="120" rx="10" fill="#0f172a" stroke="#22c55e" strokeWidth="2" />
          <circle cx="90" cy="35" r="16" fill="#15803d" />
          <text x="90" y="40" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">NIGHT</text>
          <text x="90" y="70" fill="#f8fafc" fontSize="11" fontWeight="bold" textAnchor="middle">Incoming Shift (APAC)</text>
          <text x="90" y="88" fill="#22c55e" fontSize="9" textAnchor="middle">19:00 - 07:00 UTC</text>
          <text x="90" y="105" fill="#94a3b8" fontSize="8" textAnchor="middle">Acknowledged in War Room</text>
        </g>
      </svg>
    </div>
  );
}

// =========================================================================
// TOPIC 3-3: Incident Ticketing Standards & Audit Chain Vector
// =========================================================================
export function Topic33Vector({ currentStage }: VectorProps) {
  return (
    <div className="w-full h-64 bg-slate-950 rounded-xl relative overflow-hidden flex items-center justify-center p-2 border border-slate-800">
      <svg viewBox="0 0 800 240" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <pattern id="grid33" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.5" />
        </pattern>
        <rect width="800" height="240" fill="url(#grid33)" opacity="0.4" />

        {/* Ticket Mockup Window */}
        <rect x="80" y="30" width="640" height="180" rx="10" fill="#0f172a" stroke="#334155" strokeWidth="2" />
        
        {/* Ticket Header Bar */}
        <rect x="80" y="30" width="640" height="35" rx="10" fill="#1e293b" />
        <circle cx="105" cy="47" r="4" fill="#ef4444" />
        <circle cx="120" cy="47" r="4" fill="#f59e0b" />
        <circle cx="135" cy="47" r="4" fill="#22c55e" />
        <text x="160" y="52" fill="#cbd5e1" fontSize="11" fontWeight="bold">ServiceNow SecOps • INC-2026-90412</text>
        <rect x="620" y="38" width="80" height="20" rx="4" fill="#065f46" />
        <text x="660" y="52" fill="#6ee7b7" fontSize="9" textAnchor="middle" fontWeight="bold">AUDIT READY ✓</text>

        {/* Ticket Body Content */}
        <g transform="translate(105, 80)">
          <text x="0" y="15" fill="#94a3b8" fontSize="10">Short Description:</text>
          <text x="110" y="15" fill="#f8fafc" fontSize="10" fontWeight="bold">Active Credential Spray against VPN Gateway [True Positive]</text>

          <text x="0" y="35" fill="#94a3b8" fontSize="10">Target Entity:</text>
          <text x="110" y="35" fill="#38bdf8" fontSize="10" fontFamily="monospace">vpn.fincorp.internal (12 User Accounts)</text>

          <text x="0" y="55" fill="#94a3b8" fontSize="10">IOC Hashes &amp; IPs:</text>
          <text x="110" y="55" fill="#f59e0b" fontSize="10" fontFamily="monospace">198.51.100.42 (Tor Exit Node, Confidence 94%)</text>

          <text x="0" y="75" fill="#94a3b8" fontSize="10">Containment Action:</text>
          <text x="110" y="75" fill="#22c55e" fontSize="10" fontWeight="bold">Firewall drop rule applied at 03:18:04 UTC • User passwords reset</text>

          <text x="0" y="95" fill="#94a3b8" fontSize="10">Assigned Analyst:</text>
          <text x="110" y="95" fill="#cbd5e1" fontSize="10">John Analyst (L1 Tier) • Reviewed by Tier 2 Lead</text>
        </g>
      </svg>
    </div>
  );
}

// Master component to render the appropriate vector for any topic
export function TopicScenarioVector({ topicId, currentStage }: { topicId: string; currentStage: number }) {
  switch (topicId) {
    case 'topic-1-1':
      return <Topic11Vector currentStage={currentStage} />;
    case 'topic-1-2':
      return <Topic12Vector currentStage={currentStage} />;
    case 'topic-1-3':
      return <Topic13Vector currentStage={currentStage} />;
    case 'topic-2-1':
      return <Topic21Vector currentStage={currentStage} />;
    case 'topic-2-2':
      return <Topic22Vector currentStage={currentStage} />;
    case 'topic-2-3':
      return <Topic23Vector currentStage={currentStage} />;
    case 'topic-3-1':
      return <Topic31Vector currentStage={currentStage} />;
    case 'topic-3-2':
      return <Topic32Vector currentStage={currentStage} />;
    case 'topic-3-3':
      return <Topic33Vector currentStage={currentStage} />;
    default:
      return <Topic11Vector currentStage={currentStage} />;
  }
}
