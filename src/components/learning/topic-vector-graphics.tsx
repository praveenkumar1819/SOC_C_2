'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface VectorProps {
  currentStage: number; // 1 to 5
}

// =========================================================================
// TOPIC 1.1: Meet the SOC Team
// =========================================================================
export function Topic11Vector({ currentStage }: VectorProps) {
  const roles = [
    { name: 'Queue', title: 'Alert Queue', color: '#64748b', x: 70 },
    { name: 'L1', title: 'L1 Triage', color: '#0ea5e9', x: 230 },
    { name: 'L2', title: 'L2 Response', color: '#3b82f6', x: 390 },
    { name: 'L3', title: 'L3 Hunter', color: '#8b5cf6', x: 550 },
    { name: 'MGR', title: 'SOC Lead', color: '#10b981', x: 710 },
  ];

  const activeX = roles[Math.min(currentStage - 1, roles.length - 1)].x;

  return (
    <div className="w-full h-56 bg-slate-950 rounded-xl relative overflow-hidden flex items-center justify-center p-2 border border-slate-800">
      <svg viewBox="0 0 800 220" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="glow11" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Connecting Line */}
        <line x1="70" y1="110" x2="710" y2="110" stroke="#334155" strokeWidth="3" strokeDasharray="6 6" />

        {/* Animated Alert Pulse */}
        <motion.circle
          cx={activeX}
          cy="110"
          r="10"
          fill="#38bdf8"
          filter="url(#glow11)"
          animate={{ r: [8, 14, 8], opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />

        {/* Roles Nodes */}
        {roles.map((r, i) => {
          const isActive = currentStage === i + 1;
          return (
            <g key={r.name} transform={`translate(${r.x - 45}, 60)`}>
              <rect
                width="90"
                height="100"
                rx="12"
                fill={isActive ? '#1e293b' : '#0f172a'}
                stroke={isActive ? r.color : '#334155'}
                strokeWidth={isActive ? '2.5' : '1'}
              />
              <circle cx="45" cy="35" r="18" fill={isActive ? r.color : '#1e293b'} fillOpacity={isActive ? '0.3' : '1'} stroke={r.color} strokeWidth="1.5" />
              <text x="45" y="40" fill="#f8fafc" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                {r.name}
              </text>
              <text x="45" y="75" fill="#e2e8f0" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                {r.title}
              </text>
              <text x="45" y="90" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="sans-serif">
                {i === 0 ? 'Incoming' : i === 1 ? 'Qualify' : i === 2 ? 'Remediate' : i === 3 ? 'Deep Hunt' : 'Coordinate'}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// =========================================================================
// TOPIC 1.2: An Alert's Journey (Workflow Pipeline)
// =========================================================================
export function Topic12Vector({ currentStage }: VectorProps) {
  const steps = [
    { title: '1. Receive', sub: 'Queue Ingestion', x: 80 },
    { title: '2. Understand', sub: 'Entity Extraction', x: 230 },
    { title: '3. Investigate', sub: 'Context & History', x: 380 },
    { title: '4. Document', sub: 'Ticket Findings', x: 530 },
    { title: '5. Resolve', sub: 'Close or Escalate', x: 680 },
  ];

  return (
    <div className="w-full h-56 bg-slate-950 rounded-xl relative overflow-hidden flex items-center justify-center p-2 border border-slate-800">
      <svg viewBox="0 0 800 220" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="80" y1="110" x2="680" y2="110" stroke="#334155" strokeWidth="4" />
        <motion.line
          x1="80"
          y1="110"
          x2={steps[Math.min(currentStage - 1, steps.length - 1)].x}
          y2="110"
          stroke="#38bdf8"
          strokeWidth="4"
        />

        {steps.map((s, idx) => {
          const isPassed = currentStage >= idx + 1;
          const isCurrent = currentStage === idx + 1;

          return (
            <g key={s.title} transform={`translate(${s.x - 55}, 65)`}>
              <rect
                width="110"
                height="90"
                rx="12"
                fill={isCurrent ? '#1e293b' : isPassed ? '#0f172a' : '#090d16'}
                stroke={isCurrent ? '#38bdf8' : isPassed ? '#10b981' : '#334155'}
                strokeWidth={isCurrent ? '2.5' : '1'}
              />
              <circle cx="55" cy="25" r="12" fill={isPassed ? '#10b981' : '#1e293b'} stroke={isCurrent ? '#38bdf8' : '#334155'} strokeWidth="1.5" />
              <text x="55" y="29" fill="#f8fafc" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                {isPassed ? '✓' : idx + 1}
              </text>
              <text x="55" y="58" fill="#f8fafc" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                {s.title}
              </text>
              <text x="55" y="74" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="sans-serif">
                {s.sub}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// =========================================================================
// TOPIC 1.3: The SOC Toolset
// =========================================================================
export function Topic13Vector({ currentStage }: VectorProps) {
  return (
    <div className="w-full h-56 bg-slate-950 rounded-xl relative overflow-hidden flex items-center justify-center p-2 border border-slate-800">
      <svg viewBox="0 0 800 220" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Left Side: Sources */}
        <g transform="translate(60, 40)">
          <rect width="180" height="140" rx="12" fill="#0f172a" stroke="#334155" />
          <text x="90" y="25" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            TELEMETRY SOURCES
          </text>
          <text x="20" y="55" fill="#e2e8f0" fontSize="10" fontFamily="sans-serif">• Endpoints (FIN-PC-04)</text>
          <text x="20" y="80" fill="#e2e8f0" fontSize="10" fontFamily="sans-serif">• Network Firewalls</text>
          <text x="20" y="105" fill="#e2e8f0" fontSize="10" fontFamily="sans-serif">• Email Gateway</text>
          <text x="20" y="130" fill="#e2e8f0" fontSize="10" fontFamily="sans-serif">• Active Directory Identity</text>
        </g>

        {/* Center: Ingestion Flow */}
        <path d="M 240 110 L 370 110" stroke="#38bdf8" strokeWidth="3" strokeDasharray="6 4" />

        {/* Center: Core Tech */}
        <g transform="translate(370, 30)">
          <rect width="200" height="160" rx="12" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
          <text x="100" y="25" fill="#f8fafc" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            SOC CORE PLATFORM
          </text>
          <rect x="20" y="40" width="160" height="30" rx="6" fill="#0f172a" stroke="#334155" />
          <text x="100" y="60" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">SIEM Log Correlation</text>
          <rect x="20" y="80" width="160" height="30" rx="6" fill="#0f172a" stroke="#334155" />
          <text x="100" y="100" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">EDR Endpoint Isolation</text>
          <rect x="20" y="120" width="160" height="30" rx="6" fill="#0f172a" stroke="#334155" />
          <text x="100" y="140" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Case Management & SOPs</text>
        </g>

        {/* Right Side: Analyst */}
        <path d="M 570 110 L 640 110" stroke="#10b981" strokeWidth="3" />
        <g transform="translate(640, 60)">
          <rect width="100" height="100" rx="12" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
          <circle cx="50" cy="40" r="18" fill="#10b981" fillOpacity="0.2" stroke="#10b981" />
          <text x="50" y="44" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">L1</text>
          <text x="50" y="75" fill="#f8fafc" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Analyst</text>
          <text x="50" y="90" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="sans-serif">Triage Queue</text>
        </g>
      </svg>
    </div>
  );
}

// =========================================================================
// TOPIC 1.4: Follow the Security Signal
// =========================================================================
export function Topic14Vector({ currentStage }: VectorProps) {
  const nodes = [
    { title: 'User Action', sub: 'FIN-PC-04', x: 80 },
    { title: 'Sensor Log', sub: 'Event 4625', x: 230 },
    { title: 'SIEM Ingest', sub: 'Log Parsing', x: 380 },
    { title: 'Detection', sub: 'Rule Trigger', x: 530 },
    { title: 'L1 Alert', sub: 'Queue Triage', x: 680 },
  ];

  return (
    <div className="w-full h-56 bg-slate-950 rounded-xl relative overflow-hidden flex items-center justify-center p-2 border border-slate-800">
      <svg viewBox="0 0 800 220" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="80" y1="110" x2="680" y2="110" stroke="#334155" strokeWidth="4" />
        {nodes.map((n, i) => {
          const active = currentStage >= i + 1;
          return (
            <g key={n.title} transform={`translate(${n.x - 50}, 65)`}>
              <rect
                width="100"
                height="90"
                rx="12"
                fill={active ? '#1e293b' : '#0f172a'}
                stroke={active ? '#38bdf8' : '#334155'}
                strokeWidth={active ? '2' : '1'}
              />
              <circle cx="50" cy="30" r="14" fill={active ? '#38bdf8' : '#1e293b'} fillOpacity={active ? '0.2' : '1'} stroke="#38bdf8" />
              <text x="50" y="34" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">{i + 1}</text>
              <text x="50" y="60" fill="#f8fafc" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">{n.title}</text>
              <text x="50" y="75" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="sans-serif">{n.sub}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// =========================================================================
// TOPIC 2.1: Something Happened: Activity to Alert
// =========================================================================
export function Topic21Vector({ currentStage }: VectorProps) {
  return (
    <div className="w-full h-56 bg-slate-950 rounded-xl relative overflow-hidden flex items-center justify-center p-2 border border-slate-800">
      <svg viewBox="0 0 800 220" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(60, 60)">
          <rect width="140" height="100" rx="12" fill="#0f172a" stroke="#334155" />
          <text x="70" y="30" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">1. USER ACTION</text>
          <text x="70" y="55" fill="#e2e8f0" fontSize="10" textAnchor="middle" fontFamily="sans-serif">Finance01</text>
          <text x="70" y="75" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="sans-serif">Types Password</text>
        </g>

        <path d="M 200 110 L 260 110" stroke="#38bdf8" strokeWidth="2" />

        <g transform="translate(260, 60)">
          <rect width="140" height="100" rx="12" fill="#0f172a" stroke="#334155" />
          <text x="70" y="30" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">2. RAW EVENT</text>
          <text x="70" y="55" fill="#e2e8f0" fontSize="10" textAnchor="middle" fontFamily="sans-serif">Event ID 4625</text>
          <text x="70" y="75" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="sans-serif">Logon Failure (x1)</text>
        </g>

        <path d="M 400 110 L 460 110" stroke="#38bdf8" strokeWidth="2" />

        <g transform="translate(460, 60)">
          <rect width="140" height="100" rx="12" fill="#0f172a" stroke="#f59e0b" />
          <text x="70" y="30" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">3. PATTERN</text>
          <text x="70" y="55" fill="#e2e8f0" fontSize="10" textAnchor="middle" fontFamily="sans-serif">4 Failed Attempts</text>
          <text x="70" y="75" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="sans-serif">Within 60 Seconds</text>
        </g>

        <path d="M 600 110 L 660 110" stroke="#ef4444" strokeWidth="2" />

        <g transform="translate(660, 60)">
          <rect width="100" height="100" rx="12" fill="#1e293b" stroke="#ef4444" strokeWidth="2" />
          <text x="50" y="30" fill="#ef4444" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">4. ALERT</text>
          <text x="50" y="55" fill="#f8fafc" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">ALT-2026-04</text>
          <text x="50" y="75" fill="#fca5a5" fontSize="9" textAnchor="middle" fontFamily="sans-serif">L1 Review Needed</text>
        </g>
      </svg>
    </div>
  );
}

// =========================================================================
// TOPIC 2.2: From Alert to Investigation (Funnel)
// =========================================================================
export function Topic22Vector({ currentStage }: VectorProps) {
  return (
    <div className="w-full h-56 bg-slate-950 rounded-xl relative overflow-hidden flex items-center justify-center p-2 border border-slate-800">
      <svg viewBox="0 0 800 220" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Stages of Funnel */}
        <g transform="translate(60, 70)">
          <rect width="130" height="80" rx="10" fill="#0f172a" stroke="#f59e0b" />
          <text x="65" y="30" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">ALERT</text>
          <text x="65" y="50" fill="#e2e8f0" fontSize="10" textAnchor="middle" fontFamily="sans-serif">Unverified Anomaly</text>
        </g>

        <path d="M 190 110 L 260 110" stroke="#38bdf8" strokeWidth="2" />

        <g transform="translate(260, 70)">
          <rect width="130" height="80" rx="10" fill="#0f172a" stroke="#38bdf8" />
          <text x="65" y="30" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">TRIAGE</text>
          <text x="65" y="50" fill="#e2e8f0" fontSize="10" textAnchor="middle" fontFamily="sans-serif">Analyst Investigates</text>
        </g>

        <path d="M 390 110 L 460 110" stroke="#ef4444" strokeWidth="2" />

        <g transform="translate(460, 70)">
          <rect width="130" height="80" rx="10" fill="#1e293b" stroke="#ef4444" strokeWidth="2" />
          <text x="65" y="30" fill="#ef4444" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">INCIDENT</text>
          <text x="65" y="50" fill="#e2e8f0" fontSize="10" textAnchor="middle" fontFamily="sans-serif">Breach Confirmed</text>
        </g>

        <path d="M 590 110 L 660 110" stroke="#10b981" strokeWidth="2" />

        <g transform="translate(660, 70)">
          <rect width="100" height="80" rx="10" fill="#0f172a" stroke="#10b981" />
          <text x="50" y="30" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">CASE</text>
          <text x="50" y="50" fill="#e2e8f0" fontSize="10" textAnchor="middle" fontFamily="sans-serif">Investigation File</text>
        </g>
      </svg>
    </div>
  );
}

// =========================================================================
// TOPIC 3.1: Open the Alert (Entity Highlighting)
// =========================================================================
export function Topic31Vector({ currentStage }: VectorProps) {
  return (
    <div className="w-full h-56 bg-slate-950 rounded-xl relative overflow-hidden flex items-center justify-center p-2 border border-slate-800">
      <svg viewBox="0 0 800 220" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Alert Window */}
        <g transform="translate(60, 25)">
          <rect width="680" height="170" rx="12" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
          <rect x="0" y="0" width="680" height="32" rx="12" fill="#1e293b" />
          <circle cx="20" cy="16" r="5" fill="#ef4444" />
          <circle cx="35" cy="16" r="5" fill="#f59e0b" />
          <circle cx="50" cy="16" r="5" fill="#10b981" />
          <text x="340" y="21" fill="#f8fafc" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            FinCorp SIEM Triage: Alert #SEC-2024-10847 — 5 Critical Anchors
          </text>

          {/* Highlighted Entity Boxes */}
          <rect x="25" y="48" width="115" height="46" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="82" y="66" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="sans-serif">1. WHO</text>
          <text x="82" y="83" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">jdavis</text>

          <rect x="155" y="48" width="115" height="46" rx="6" fill="#1e293b" stroke="#f43f5e" strokeWidth="1.5" />
          <text x="212" y="66" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="sans-serif">2. WHAT</text>
          <text x="212" y="83" fill="#f43f5e" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">FINCORP-DC01</text>

          <rect x="285" y="48" width="115" height="46" rx="6" fill="#1e293b" stroke="#a855f7" strokeWidth="1.5" />
          <text x="342" y="66" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="sans-serif">3. WHERE</text>
          <text x="342" y="83" fill="#a855f7" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">198.51.100.47</text>

          <rect x="415" y="48" width="115" height="46" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
          <text x="472" y="66" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="sans-serif">4. WHEN</text>
          <text x="472" y="83" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">14:30:12 EST</text>

          <rect x="545" y="48" width="115" height="46" rx="6" fill="#1e293b" stroke="#fbbf24" strokeWidth="1.5" />
          <text x="602" y="66" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="sans-serif">5. HOW MANY</text>
          <text x="602" y="83" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">5 Failed (90s)</text>

          {/* Threat Story Footer */}
          <rect x="25" y="108" width="635" height="42" rx="8" fill="#0b1329" stroke="#1e293b" />
          <text x="342" y="125" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            Synthesized Threat Story:
          </text>
          <text x="342" y="139" fill="#94a3b8" fontSize="9.5" textAnchor="middle" fontFamily="sans-serif">
            &quot;External IP 198.51.100.47 launched 5 failed network logons against Domain Controller DC01 targeting jdavis in 90 seconds.&quot;
          </text>
        </g>
      </svg>
    </div>
  );
}

// =========================================================================
// TOPIC 3.2: Look Beyond the Alert (Timeline)
// =========================================================================
export function Topic32Vector({ currentStage }: VectorProps) {
  return (
    <div className="w-full h-56 bg-slate-950 rounded-xl relative overflow-hidden flex items-center justify-center p-2 border border-slate-800">
      <svg viewBox="0 0 800 220" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="100" y1="110" x2="700" y2="110" stroke="#334155" strokeWidth="4" />

        {/* Failed dots */}
        {[
          { time: '10:31:40', label: 'Fail #1', x: 150 },
          { time: '10:31:44', label: 'Fail #2', x: 270 },
          { time: '10:31:47', label: 'Fail #3', x: 390 },
          { time: '10:31:52', label: 'Fail #4', x: 510 },
        ].map((pt) => (
          <g key={pt.time} transform={`translate(${pt.x}, 110)`}>
            <circle cx="0" cy="0" r="10" fill="#ef4444" stroke="#f87171" strokeWidth="2" />
            <text x="0" y="-18" fill="#fca5a5" fontSize="10" textAnchor="middle" fontFamily="sans-serif">{pt.label}</text>
            <text x="0" y="24" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="sans-serif">{pt.time}</text>
          </g>
        ))}

        {/* Success dot */}
        <g transform="translate(650, 110)">
          <circle cx="0" cy="0" r="14" fill="#10b981" stroke="#34d399" strokeWidth="3" />
          <text x="0" y="-22" fill="#6ee7b7" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">SUCCESS!</text>
          <text x="0" y="26" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="sans-serif">10:32:05</text>
        </g>
      </svg>
    </div>
  );
}

// =========================================================================
// TOPIC 4.1: Same Alert, Different Story
// =========================================================================
export function Topic41Vector({ currentStage }: VectorProps) {
  return (
    <div className="w-full h-56 bg-slate-950 rounded-xl relative overflow-hidden flex items-center justify-center p-2 border border-slate-800">
      <svg viewBox="0 0 800 220" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Left Side: Scenario A */}
        <g transform="translate(60, 30)">
          <rect width="320" height="160" rx="12" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
          <text x="160" y="25" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            SCENARIO A: BENIGN USER TYPO
          </text>
          <text x="30" y="60" fill="#e2e8f0" fontSize="10" fontFamily="sans-serif">User: Finance01 (Known Identity)</text>
          <text x="30" y="85" fill="#e2e8f0" fontSize="10" fontFamily="sans-serif">Host: FIN-PC-04 (Assigned Desk)</text>
          <text x="30" y="110" fill="#e2e8f0" fontSize="10" fontFamily="sans-serif">Time: 09:05 AM (Business Hours)</text>
          <text x="30" y="135" fill="#10b981" fontSize="11" fontWeight="bold" fontFamily="sans-serif">Verdict: Benign False Positive</text>
        </g>

        {/* Right Side: Scenario B */}
        <g transform="translate(420, 30)">
          <rect width="320" height="160" rx="12" fill="#0f172a" stroke="#ef4444" strokeWidth="2" />
          <text x="160" y="25" fill="#ef4444" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            SCENARIO B: ACTIVE ATTACK
          </text>
          <text x="30" y="60" fill="#e2e8f0" fontSize="10" fontFamily="sans-serif">Source: 198.51.100.42 (External WAN)</text>
          <text x="30" y="85" fill="#e2e8f0" fontSize="10" fontFamily="sans-serif">Targets: 25 Distinct Usernames</text>
          <text x="30" y="110" fill="#e2e8f0" fontSize="10" fontFamily="sans-serif">Time: 03:15 AM (Weekend Night)</text>
          <text x="30" y="135" fill="#ef4444" fontSize="11" fontWeight="bold" fontFamily="sans-serif">Verdict: True Positive Attack</text>
        </g>
      </svg>
    </div>
  );
}

// =========================================================================
// TOPIC 4.2: When the Detection Gets It Wrong
// =========================================================================
export function Topic42Vector({ currentStage }: VectorProps) {
  return (
    <div className="w-full h-56 bg-slate-950 rounded-xl relative overflow-hidden flex items-center justify-center p-2 border border-slate-800">
      <svg viewBox="0 0 800 220" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(80, 40)">
          <rect width="280" height="140" rx="12" fill="#1e293b" stroke="#ef4444" strokeWidth="2" />
          <text x="140" y="25" fill="#ef4444" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            NAIVE DETECTION RULE
          </text>
          <text x="140" y="55" fill="#e2e8f0" fontSize="10" textAnchor="middle" fontFamily="sans-serif">Rule: Failed Logins &gt; 3</text>
          <text x="140" y="85" fill="#fca5a5" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            50 Alerts Flooded (High Noise!)
          </text>
          <text x="140" y="115" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="sans-serif">
            Alert fatigue blinds analyst to real threats
          </text>
        </g>

        <path d="M 360 110 L 440 110" stroke="#38bdf8" strokeWidth="3" />

        <g transform="translate(440, 40)">
          <rect width="280" height="140" rx="12" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
          <text x="140" y="25" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            CONTEXT-TUNED DETECTION
          </text>
          <text x="140" y="55" fill="#e2e8f0" fontSize="10" textAnchor="middle" fontFamily="sans-serif">Rule: Failures across &gt;5 accounts OR external</text>
          <text x="140" y="85" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            Noise Reduced 90% (Clean Signal)
          </text>
          <text x="140" y="115" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="sans-serif">
            Real adversary sprays reliably caught
          </text>
        </g>
      </svg>
    </div>
  );
}

// =========================================================================
// TOPIC 5.1: How Serious Is It? (Severity Continuum)
// =========================================================================
export function Topic51Vector({ currentStage }: VectorProps) {
  const levels = [
    { name: 'LOW', sub: 'Standard PC Typo', color: '#10b981', x: 100 },
    { name: 'MEDIUM', sub: 'Subnet Scan', color: '#f59e0b', x: 300 },
    { name: 'HIGH', sub: 'Admin Spray', color: '#f97316', x: 500 },
    { name: 'CRITICAL', sub: 'Domain Controller Breach', color: '#ef4444', x: 700 },
  ];

  return (
    <div className="w-full h-56 bg-slate-950 rounded-xl relative overflow-hidden flex items-center justify-center p-2 border border-slate-800">
      <svg viewBox="0 0 800 220" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="100" y1="110" x2="700" y2="110" stroke="#334155" strokeWidth="6" />

        {levels.map((lvl, idx) => {
          const active = currentStage >= idx + 1;
          return (
            <g key={lvl.name} transform={`translate(${lvl.x}, 110)`}>
              <circle cx="0" cy="0" r="16" fill={active ? lvl.color : '#1e293b'} stroke={lvl.color} strokeWidth="2.5" />
              <text x="0" y="5" fill="#f8fafc" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                {idx + 1}
              </text>
              <text x="0" y="-24" fill={lvl.color} fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                {lvl.name}
              </text>
              <text x="0" y="32" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="sans-serif">
                {lvl.sub}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// =========================================================================
// TOPIC 5.2: Impact & Confidence Matrix
// =========================================================================
export function Topic52Vector({ currentStage }: VectorProps) {
  return (
    <div className="w-full h-56 bg-slate-950 rounded-xl relative overflow-hidden flex items-center justify-center p-2 border border-slate-800">
      <svg viewBox="0 0 800 220" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(180, 20)">
          {/* Axis */}
          <line x1="50" y1="160" x2="400" y2="160" stroke="#475569" strokeWidth="2" />
          <line x1="50" y1="160" x2="50" y2="20" stroke="#475569" strokeWidth="2" />
          <text x="225" y="185" fill="#94a3b8" fontSize="11" textAnchor="middle" fontFamily="sans-serif">CONFIDENCE →</text>
          <text x="20" y="90" fill="#94a3b8" fontSize="11" textAnchor="middle" fontFamily="sans-serif" transform="rotate(-90 20 90)">IMPACT →</text>

          {/* Quadrants */}
          <rect x="60" y="100" width="160" height="50" fill="#1e293b" stroke="#334155" />
          <text x="140" y="130" fill="#94a3b8" fontSize="10" textAnchor="middle" fontFamily="sans-serif">Low / Routine</text>

          <rect x="230" y="100" width="160" height="50" fill="#1e293b" stroke="#f59e0b" />
          <text x="310" y="130" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Medium Priority</text>

          <rect x="60" y="30" width="160" height="60" fill="#1e293b" stroke="#f97316" />
          <text x="140" y="65" fill="#f97316" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">High (Crown Jewel)</text>

          <rect x="230" y="30" width="160" height="60" fill="#1e293b" stroke="#ef4444" strokeWidth="2" />
          <text x="310" y="65" fill="#ef4444" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">CRITICAL EMERGENCY</text>
        </g>
      </svg>
    </div>
  );
}

// =========================================================================
// TOPIC 6.1: Passing the Investigation Forward
// =========================================================================
export function Topic61Vector({ currentStage }: VectorProps) {
  return (
    <div className="w-full h-56 bg-slate-950 rounded-xl relative overflow-hidden flex items-center justify-center p-2 border border-slate-800">
      <svg viewBox="0 0 800 220" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* L1 Side */}
        <g transform="translate(100, 50)">
          <rect width="180" height="120" rx="12" fill="#0f172a" stroke="#0ea5e9" strokeWidth="2" />
          <text x="90" y="30" fill="#0ea5e9" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">L1 TRIAGE</text>
          <text x="90" y="55" fill="#e2e8f0" fontSize="10" textAnchor="middle" fontFamily="sans-serif">Entities Qualified</text>
          <text x="90" y="75" fill="#e2e8f0" fontSize="10" textAnchor="middle" fontFamily="sans-serif">Timeline Documented</text>
          <text x="90" y="95" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Finding Framed</text>
        </g>

        {/* Moving Package */}
        <g transform="translate(340, 70)">
          <rect width="120" height="80" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
          <text x="60" y="25" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">ESCALATION PKG</text>
          <text x="60" y="45" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="sans-serif">User: Finance01</text>
          <text x="60" y="60" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="sans-serif">Host: FIN-PC-04</text>
          <text x="60" y="75" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="sans-serif">Artifacts Attached</text>
        </g>

        {/* L2 Side */}
        <g transform="translate(520, 50)">
          <rect width="180" height="120" rx="12" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
          <text x="90" y="30" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">L2 INCIDENT RESPONDER</text>
          <text x="90" y="55" fill="#e2e8f0" fontSize="10" textAnchor="middle" fontFamily="sans-serif">Immediate Containment</text>
          <text x="90" y="75" fill="#e2e8f0" fontSize="10" textAnchor="middle" fontFamily="sans-serif">Host Isolation</text>
          <text x="90" y="95" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Memory Forensics</text>
        </g>
      </svg>
    </div>
  );
}

// =========================================================================
// TOPIC 6.2: When More People Need to Know
// =========================================================================
export function Topic62Vector({ currentStage }: VectorProps) {
  return (
    <div className="w-full h-56 bg-slate-950 rounded-xl relative overflow-hidden flex items-center justify-center p-2 border border-slate-800">
      <svg viewBox="0 0 800 220" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Center: SOC */}
        <g transform="translate(330, 70)">
          <rect width="140" height="80" rx="12" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
          <text x="70" y="35" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">SOC INCIDENT</text>
          <text x="70" y="55" fill="#f8fafc" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">COMMAND</text>
        </g>

        {/* Spoke 1: Identity */}
        <path d="M 330 110 L 190 60" stroke="#f59e0b" strokeWidth="2" />
        <g transform="translate(50, 25)">
          <rect width="140" height="70" rx="10" fill="#0f172a" stroke="#f59e0b" />
          <text x="70" y="25" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">IDENTITY TEAM</text>
          <text x="70" y="45" fill="#e2e8f0" fontSize="9" textAnchor="middle" fontFamily="sans-serif">Revoke Kerberos Tickets</text>
        </g>

        {/* Spoke 2: Network */}
        <path d="M 330 110 L 190 160" stroke="#10b981" strokeWidth="2" />
        <g transform="translate(50, 125)">
          <rect width="140" height="70" rx="10" fill="#0f172a" stroke="#10b981" />
          <text x="70" y="25" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">NETWORK TEAM</text>
          <text x="70" y="45" fill="#e2e8f0" fontSize="9" textAnchor="middle" fontFamily="sans-serif">Perimeter Firewall Block</text>
        </g>

        {/* Spoke 3: Leadership */}
        <path d="M 470 110 L 610 110" stroke="#ef4444" strokeWidth="2" />
        <g transform="translate(610, 75)">
          <rect width="140" height="70" rx="10" fill="#0f172a" stroke="#ef4444" />
          <text x="70" y="25" fill="#ef4444" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">SOC LEADERSHIP</text>
          <text x="70" y="45" fill="#e2e8f0" fontSize="9" textAnchor="middle" fontFamily="sans-serif">CISO & Legal Briefing</text>
        </g>
      </svg>
    </div>
  );
}

// =========================================================================
// TOPIC 7.1: Turn Investigation Into a Record
// =========================================================================
export function Topic71Vector({ currentStage }: VectorProps) {
  return (
    <div className="w-full h-56 bg-slate-950 rounded-xl relative overflow-hidden flex items-center justify-center p-2 border border-slate-800">
      <svg viewBox="0 0 800 220" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Poor Note */}
        <g transform="translate(80, 40)">
          <rect width="260" height="140" rx="12" fill="#1e293b" stroke="#ef4444" strokeWidth="1.5" />
          <text x="130" y="25" fill="#ef4444" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">POOR ANALYST NOTE</text>
          <text x="20" y="60" fill="#fca5a5" fontSize="11" fontStyle="italic" fontFamily="sans-serif">"Looked at alert.</text>
          <text x="20" y="80" fill="#fca5a5" fontSize="11" fontStyle="italic" fontFamily="sans-serif">Seems suspicious.</text>
          <text x="20" y="100" fill="#fca5a5" fontSize="11" fontStyle="italic" fontFamily="sans-serif">Closed ticket."</text>
          <line x1="20" y1="120" x2="240" y2="120" stroke="#ef4444" strokeWidth="2" />
        </g>

        <path d="M 350 110 L 430 110" stroke="#38bdf8" strokeWidth="3" />

        {/* Structured Ticket */}
        <g transform="translate(440, 25)">
          <rect width="280" height="170" rx="12" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
          <text x="140" y="25" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">AUDIT-PROOF SOC RECORD</text>
          <text x="20" y="50" fill="#e2e8f0" fontSize="10" fontFamily="sans-serif">1. Summary: Multiple failed logins</text>
          <text x="20" y="70" fill="#e2e8f0" fontSize="10" fontFamily="sans-serif">2. Entities: Finance01 | FIN-PC-04</text>
          <text x="20" y="90" fill="#e2e8f0" fontSize="10" fontFamily="sans-serif">3. Evidence: 4 Failures + Event 4624</text>
          <text x="20" y="110" fill="#e2e8f0" fontSize="10" fontFamily="sans-serif">4. Finding: Verified user typo (Caps Lock)</text>
          <text x="20" y="130" fill="#e2e8f0" fontSize="10" fontFamily="sans-serif">5. Disposition: Closed - Benign FP</text>
        </g>
      </svg>
    </div>
  );
}

// =========================================================================
// TOPIC 7.2: From Alert to Case Record
// =========================================================================
export function Topic72Vector({ currentStage }: VectorProps) {
  return (
    <div className="w-full h-56 bg-slate-950 rounded-xl relative overflow-hidden flex items-center justify-center p-2 border border-slate-800">
      <svg viewBox="0 0 800 220" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(100, 25)">
          <rect width="600" height="170" rx="12" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
          <rect x="0" y="0" width="600" height="30" rx="12" fill="#1e293b" />
          <text x="300" y="20" fill="#f8fafc" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
            CASE RECORD #2026-04 — FINCORP SECURITY OPERATIONS CENTER
          </text>

          <g transform="translate(20, 45)">
            <text x="0" y="15" fill="#94a3b8" fontSize="10" fontFamily="sans-serif">ALERT ID: ALT-2026-04</text>
            <text x="200" y="15" fill="#94a3b8" fontSize="10" fontFamily="sans-serif">SUBNET: Finance VLAN 20</text>
            <text x="400" y="15" fill="#10b981" fontSize="10" fontWeight="bold" fontFamily="sans-serif">STATUS: CLOSED (RESOLVED)</text>
          </g>

          <line x1="20" y1="75" x2="580" y2="75" stroke="#334155" strokeWidth="1" />

          <g transform="translate(20, 95)">
            <text x="0" y="15" fill="#e2e8f0" fontSize="10" fontFamily="sans-serif">Target: Finance01 | FIN-PC-04 | 10.10.20.15</text>
            <text x="0" y="35" fill="#e2e8f0" fontSize="10" fontFamily="sans-serif">Chronology: 10:31:40 (Fail) → 10:31:52 (Fail) → 10:32:05 (Success)</text>
            <text x="0" y="55" fill="#34d399" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Verified Root Cause: User Typo | EDR Inspection: 0 Anomalous Processes</text>
          </g>
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
    case 'topic-1-4':
      return <Topic14Vector currentStage={currentStage} />;
    case 'topic-2-1':
      return <Topic21Vector currentStage={currentStage} />;
    case 'topic-2-2':
      return <Topic22Vector currentStage={currentStage} />;
    case 'topic-3-1':
      return <Topic31Vector currentStage={currentStage} />;
    case 'topic-3-2':
      return <Topic32Vector currentStage={currentStage} />;
    case 'topic-4-1':
      return <Topic41Vector currentStage={currentStage} />;
    case 'topic-4-2':
      return <Topic42Vector currentStage={currentStage} />;
    case 'topic-5-1':
      return <Topic51Vector currentStage={currentStage} />;
    case 'topic-5-2':
      return <Topic52Vector currentStage={currentStage} />;
    case 'topic-6-1':
      return <Topic61Vector currentStage={currentStage} />;
    case 'topic-6-2':
      return <Topic62Vector currentStage={currentStage} />;
    case 'topic-7-1':
      return <Topic71Vector currentStage={currentStage} />;
    case 'topic-7-2':
      return <Topic72Vector currentStage={currentStage} />;
    default:
      return <Topic11Vector currentStage={currentStage} />;
  }
}
