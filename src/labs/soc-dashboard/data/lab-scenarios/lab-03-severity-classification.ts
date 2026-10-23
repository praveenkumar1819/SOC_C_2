import { AlertSummary, EvidenceChecklistItem } from "../../types/lab.types";

export interface IncidentClassificationItem {
  id: string;
  title: string;
  category: string;
  timestamp: string;
  user: string;
  host: string;
  sourceIp: string;
  description: string;
  correctSeverity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  matrixDetails: {
    assetCriticality: string;
    threatConfidence: string;
    businessImpact: string;
    sla: string;
  };
  reasoning: string;
}

export const LAB_03_SCENARIO = {
  labId: "lab-03" as const,
  title: "Lab 03: Severity Classification & Triage Economics",
  subtitle: "Apply the Severity Matrix & Allocate Limited SOC Work-Hours",
  difficulty: "INTERMEDIATE",
  durationMinutes: 18,
  narrative: `Thursday morning, 10:00 AM. Day 4 of training.

Elena Gomez (SOC Operations Manager) walks up to your desk:
"Analyst, we have 6 pending security incidents in our shift queue. I have 2 analysts on duty today, giving us a maximum combined capacity of 16 analyst-hours (8 hours active investigation time).

Every incident cannot be treated like a three-alarm fire.
You must apply our FinCorp Severity Matrix:
  Asset Criticality (Tier 1-4) × Threat Confidence × Potential Business Impact

I need you to:
1. Classify each of the 6 incidents into LOW, MEDIUM, HIGH, or CRITICAL.
2. Formulate your daily shift priority strategy based on SLA urgency and effort hours.

Show me your triage logic. Which do we resolve today, and which can wait?"`,

  mentorName: "Elena Gomez",
  mentorRole: "SOC Operations Manager",

  incidents: [
    {
      id: "INC-001",
      title: "Failed Login Spike — User Forgot Password",
      category: "Authentication / User Error",
      timestamp: "2026-01-17 08:45:00 EST",
      user: "jsmith",
      host: "FIN-BOS-JSMITH-W4521",
      sourceIp: "10.20.5.88",
      description: "5 consecutive failed interactive login attempts. Internal office workstation IP. Matching Help Desk ticket exists.",
      correctSeverity: "LOW",
      matrixDetails: {
        assetCriticality: "Tier 1: Standard internal user workstation",
        threatConfidence: "Benign user password typo verified by Help Desk ticket HD-90812",
        businessImpact: "None: Routine lockout",
        sla: "24 Hours (Close after routine audit)",
      },
      reasoning: "Routine user error on non-critical endpoint with open helpdesk ticket. Low severity.",
    },
    {
      id: "INC-002",
      title: "Perimeter Phishing Dropper Quarantined",
      category: "Email / Perimeter Defense",
      timestamp: "2026-01-17 08:30:15 EST",
      user: "finance-dept",
      host: "FIN-BOS-MAIL-GW01",
      sourceIp: "198.51.100.99",
      description: "Inbound malicious macro quarantined automatically by email gateway. Zero user mailboxes received payload.",
      correctSeverity: "LOW",
      matrixDetails: {
        assetCriticality: "Tier 1: Email gateway boundary filter",
        threatConfidence: "Blocked before user delivery (Threat prevented)",
        businessImpact: "None: Zero endpoints exposed",
        sla: "24 Hours",
      },
      reasoning: "Perimeter controls worked exactly as designed. Threat neutralized before delivery. Low severity.",
    },
    {
      id: "INC-003",
      title: "Suspicious Encoded PowerShell on Standard Workstation",
      category: "Endpoint / Suspicious Execution",
      timestamp: "2026-01-17 11:15:20 EST",
      user: "kpatel",
      host: "FIN-BOS-WS-099",
      sourceIp: "10.20.5.99",
      description: "Non-critical workstation spawned short Base64 encoded PowerShell. Attacker access unconfirmed; needs investigation.",
      correctSeverity: "MEDIUM",
      matrixDetails: {
        assetCriticality: "Tier 2: Standard employee desktop",
        threatConfidence: "Attempted / Unconfirmed execution",
        businessImpact: "Low-to-Medium (Local workstation breach risk)",
        sla: "4 Hours",
      },
      reasoning: "Active anomaly on standard host requiring prompt triage to prevent lateral movement. Medium severity.",
    },
    {
      id: "INC-004",
      title: "Brute Force Attack Targeting Domain Admin Account",
      category: "Identity / External Threat",
      timestamp: "2026-01-17 09:55:00 EST",
      user: "svance",
      host: "FIN-BOS-DC01",
      sourceIp: "185.220.101.5",
      description: "47 automated authentication attempts against Domain Admin account svance from known Eastern European Tor botnet IP.",
      correctSeverity: "HIGH",
      matrixDetails: {
        assetCriticality: "Tier 4: Enterprise Domain Controller & Domain Admin Credential",
        threatConfidence: "Active external threat probing high-privilege credentials",
        businessImpact: "Catastrophic if breach occurs; currently holding at perimeter",
        sla: "1 Hour (Immediate investigation & IP block)",
      },
      reasoning: "High-value administrative account under active adversary attack. High severity requiring urgent mitigation.",
    },
    {
      id: "INC-005",
      title: "Active Ransomware Encryption on Production File Server",
      category: "Malware / Enterprise Outage",
      timestamp: "2026-01-17 14:02:11 EST",
      user: "SYSTEM",
      host: "FIN-BOS-FILESERVER-01",
      sourceIp: "10.20.100.18",
      description: "Volume shadow copies wiped. 1,420 production enterprise files encrypted to .locked. 500+ employees locked out.",
      correctSeverity: "CRITICAL",
      matrixDetails: {
        assetCriticality: "Tier 4: Core Production Enterprise File Storage",
        threatConfidence: "Active, confirmed, ongoing ransomware destruction",
        businessImpact: "Critical: Complete business operation stoppage & catastrophic data loss",
        sla: "IMMEDIATE (All hands on deck / Emergency containment)",
      },
      reasoning: "Active ransomware actively encrypting corporate data. Critical severity requiring emergency containment.",
    },
    {
      id: "INC-006",
      title: "USB Data Transfer — Authorized IT Staff Hardware Disposal",
      category: "Data Loss Prevention / Policy",
      timestamp: "2026-01-17 15:10:00 EST",
      user: "tech_support",
      host: "FIN-BOS-WS-102",
      sourceIp: "10.20.5.102",
      description: "50 MB USB backup completed during authorized hardware refresh. Approved IT change ticket CHG-2026-9011 on file.",
      correctSeverity: "LOW",
      matrixDetails: {
        assetCriticality: "Tier 1: Standard client workstation",
        threatConfidence: "Authorized employee activity",
        businessImpact: "None: Documented IT lifecycle maintenance",
        sla: "24 Hours (Audit logging only)",
      },
      reasoning: "Documented IT maintenance with verified change approval ticket. Low severity.",
    },
  ] as IncidentClassificationItem[],

  alerts: [
    {
      id: "INC-001",
      rule: "Repeated Failed Interactive Logins",
      priority: "LOW",
      generatedTime: "2026-01-17 08:45:00 EST",
      timestamp: "2026-01-17 08:45:00 EST",
      user: "jsmith",
      host: "FIN-BOS-JSMITH-W4521",
      sourceIp: "10.20.5.88",
      eventCount: 5,
      status: "NEW",
      category: "Authentication",
      description: "5 consecutive failed interactive login attempts. Internal office workstation IP.",
    },
    {
      id: "INC-002",
      rule: "Perimeter Malware Inbound Quarantine",
      priority: "LOW",
      generatedTime: "2026-01-17 08:30:15 EST",
      timestamp: "2026-01-17 08:30:15 EST",
      user: "finance-dept",
      host: "FIN-BOS-MAIL-GW01",
      sourceIp: "198.51.100.99",
      eventCount: 1,
      status: "NEW",
      category: "Perimeter",
      description: "Inbound malicious macro quarantined automatically by email gateway.",
    },
    {
      id: "INC-003",
      rule: "Suspicious PowerShell Execution",
      priority: "MEDIUM",
      generatedTime: "2026-01-17 11:15:20 EST",
      timestamp: "2026-01-17 11:15:20 EST",
      user: "kpatel",
      host: "FIN-BOS-WS-099",
      sourceIp: "10.20.5.99",
      eventCount: 1,
      status: "NEW",
      category: "Endpoint",
      description: "Non-critical workstation spawned short Base64 encoded PowerShell.",
    },
    {
      id: "INC-004",
      rule: "External Brute Force Targeting Domain Admin",
      priority: "HIGH",
      generatedTime: "2026-01-17 09:55:00 EST",
      timestamp: "2026-01-17 09:55:00 EST",
      user: "svance",
      host: "FIN-BOS-DC01",
      sourceIp: "185.220.101.5",
      eventCount: 47,
      status: "NEW",
      category: "Identity",
      description: "47 automated authentication attempts against Domain Admin account svance from Tor botnet IP.",
    },
    {
      id: "INC-005",
      rule: "Active Ransomware Encryption & Shadow Copy Deletion",
      priority: "CRITICAL",
      generatedTime: "2026-01-17 14:02:11 EST",
      timestamp: "2026-01-17 14:02:11 EST",
      user: "SYSTEM",
      host: "FIN-BOS-FILESERVER-01",
      sourceIp: "10.20.100.18",
      eventCount: 1420,
      status: "NEW",
      category: "Malware",
      description: "Volume shadow copies wiped. 1,420 production enterprise files encrypted to .locked.",
    },
    {
      id: "INC-006",
      rule: "USB Data Transfer Policy Exception",
      priority: "LOW",
      generatedTime: "2026-01-17 15:10:00 EST",
      timestamp: "2026-01-17 15:10:00 EST",
      user: "tech_support",
      host: "FIN-BOS-WS-102",
      sourceIp: "10.20.5.102",
      eventCount: 1,
      status: "NEW",
      category: "DLP",
      description: "50 MB USB backup completed during authorized hardware refresh with change ticket.",
    },
  ] as AlertSummary[],

  evidenceChecklist: [
    {
      id: "ev-301",
      label: "Evaluate Asset Tier: Distinguish Tier 0 Domain Controller vs. Tier 1 Workstation",
      consoleTab: "siem",
      discovered: false,
      hint: "Check server infrastructure records to verify which systems hold Tier 0 / Tier 4 critical status.",
    },
    {
      id: "ev-302",
      label: "Assess Threat Status: Active ongoing attack vs. Perimeter-blocked probe",
      consoleTab: "edr",
      discovered: false,
      hint: "Compare INC-005 (ongoing active encryption) vs. INC-002 (blocked at email gateway).",
    },
    {
      id: "ev-303",
      label: "Examine Threat Intel: High-risk botnet brute force IP",
      consoleTab: "firewall",
      discovered: false,
      hint: "Review firewall reputation intelligence on 185.220.101.5 in INC-004.",
    },
  ] as EvidenceChecklistItem[],

  priorityDecisionOptions: [
    {
      value: "PRIORITY_A",
      label: "Immediate: INC-005 (CRITICAL, 6h) + INC-004 (HIGH, 4h) | Defer: INC-003, INC-001, 002, 006",
      description: "Recommended: Focus shift capacity entirely on stopping active ransomware destruction and securing Domain Admin account.",
      isCorrect: true,
    },
    {
      value: "PRIORITY_B",
      label: "Quick Wins: INC-001 (1h) + INC-002 (1h) + INC-006 (1h) + INC-003 (3h) | Defer: INC-005, 004",
      description: "Flawed: Closes easiest tickets first while active ransomware encrypts production file server.",
      isCorrect: false,
    },
    {
      value: "PRIORITY_C",
      label: "Divide evenly: 1 hour on each of the 6 incidents",
      description: "Flawed: Violates emergency triage protocol; fails to contain critical emergency.",
      isCorrect: false,
    },
  ],
};
