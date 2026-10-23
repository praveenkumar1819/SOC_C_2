import { AlertSummary, EvidenceChecklistItem } from "../../types/lab.types";

export const LAB_02_SCENARIO = {
  labId: "lab-02" as const,
  title: "Lab 02: False Positive Identification",
  subtitle: "Filter SOC Noise from Real Danger Across 4 Incidents",
  difficulty: "INTERMEDIATE",
  durationMinutes: 20,
  narrative: `Wednesday morning, 09:30 AM. Day 3 of training.

Your queue has 4 pending alerts. Rajesh Kumar says:
"Not all of these are real threats. Alert fatigue kills SOC analysts. Some of these are false alarms from aggressive detection rules. Some are authorized maintenance routines. And some are genuine attacks waiting to breach us.

Your job is to separate the noise from real danger.
Investigate each of the 4 alerts across all 5 consoles, explore the context, and classify each one:
- TRUE POSITIVE: Genuine adversary activity requiring containment and escalation
- FALSE POSITIVE: Benign activity erroneously flagged by overzealous rules
- EXPECTED ACTIVITY: Authorized, scheduled business or IT maintenance routine

You need at least 3 out of 4 correct (75%+) to pass. Let's see your analyst judgment."`,

  mentorName: "Rajesh Kumar",
  mentorRole: "Senior L1 SOC Analyst & Lead Mentor",

  alerts: [
    {
      id: "SEC-2026-0421",
      rule: "Suspicious File Encryption Pattern",
      priority: "MEDIUM",
      generatedTime: "2026-01-16 09:15:00 EST",
      timestamp: "2026-01-16 09:14:50 EST",
      user: "jsmith",
      host: "FIN-BOS-JSMITH-W4521",
      sourceIp: "10.20.5.88",
      eventCount: 52,
      status: "NEW",
      category: "Endpoint / Ransomware Heuristic",
      description: "Heuristic threshold: 52 files created within 60s in AppData\\Local\\Temp.",
      expectedClassification: "FALSE POSITIVE",
      reasoningDetail: "Microsoft Defender Antivirus (MsMpEng.exe) unpacking an email attachment for deep sandboxing. All created files are temporary .tmp files without encryption.",
    } as AlertSummary,
    {
      id: "SEC-2026-0422",
      rule: "Scheduled Backup Service Activity",
      priority: "LOW",
      generatedTime: "2026-01-16 03:00:15 EST",
      timestamp: "2026-01-16 03:00:00 EST",
      user: "svc_backup",
      host: "FIN-BOS-SERVER-DB01",
      sourceIp: "10.20.100.32",
      eventCount: 1,
      status: "NEW",
      category: "Server / Off-Hours Activity",
      description: "Privileged service account accessed database files off-hours (03:00 AM).",
      expectedClassification: "EXPECTED ACTIVITY",
      reasoningDetail: "Scheduled daily backup routine running at 03:00 AM under authorized service account svc_backup with approved change ticket CHG-2026-8812.",
    } as AlertSummary,
    {
      id: "SEC-2026-0423",
      rule: "PowerShell Execution with Encoded Command",
      priority: "HIGH",
      generatedTime: "2026-01-16 14:45:40 EST",
      timestamp: "2026-01-16 14:45:30 EST",
      user: "Unknown",
      host: "FIN-BOS-W7821",
      sourceIp: "10.20.8.21",
      eventCount: 4,
      status: "NEW",
      category: "Endpoint / Execution & Persistence",
      description: "Base64 encoded PowerShell spawned by wscript.exe, created persistence task, and attempted external beaconing.",
      expectedClassification: "TRUE POSITIVE",
      reasoningDetail: "Attacker delivered malicious ISO container containing VBScript, which launched encoded PowerShell, established scheduled task persistence, and beaconed to Cobalt Strike C2.",
    } as AlertSummary,
    {
      id: "SEC-2026-0424",
      rule: "Database Query Anomaly",
      priority: "MEDIUM",
      generatedTime: "2026-01-16 16:20:10 EST",
      timestamp: "2026-01-16 16:20:00 EST",
      user: "developer_svc",
      host: "FIN-BOS-DB-DEV-01",
      sourceIp: "10.20.100.40",
      eventCount: 2,
      status: "NEW",
      category: "Database / Data Transfer",
      description: "1.2 GB internal transfer during batch query routine outside standard OLTP transactions.",
      expectedClassification: "EXPECTED ACTIVITY",
      reasoningDetail: "Daily recurring ETL batch executed by developer_svc at 16:00 EST syncing development data warehouse. Fully documented internal operational process.",
    } as AlertSummary,
  ],

  evidenceChecklist: [
    {
      id: "ev-201",
      label: "SEC-2026-0421: Verify process lineage is MsMpEng.exe Defender engine",
      consoleTab: "edr",
      discovered: false,
      hint: "Check the EDR console for the parent process creating the 52 .tmp files.",
    },
    {
      id: "ev-202",
      label: "SEC-2026-0422: Verify maintenance window & ITSM change ticket",
      consoleTab: "siem",
      discovered: false,
      hint: "Inspect the SIEM correlation events to find the approved change ticket ID.",
    },
    {
      id: "ev-203",
      label: "SEC-2026-0423: Verify Cobalt Strike C2 threat intelligence feed match",
      consoleTab: "firewall",
      discovered: false,
      hint: "Check the Firewall console destination IP reputation for 203.0.113.195.",
    },
    {
      id: "ev-204",
      label: "SEC-2026-0424: Confirm daily ETL SSIS package execution schedule",
      consoleTab: "edr",
      discovered: false,
      hint: "Review the command line in EDR: DTExec.exe executing DailyLedgerETL.dtsx.",
    },
  ] as EvidenceChecklistItem[],

  classificationOptions: [
    {
      value: "TRUE POSITIVE",
      label: "True Positive",
      badgeClass: "text-red-400 border-red-500/50 bg-red-950/30",
      description: "Confirmed malicious activity requiring SOC response and incident containment.",
    },
    {
      value: "FALSE POSITIVE",
      label: "False Positive",
      badgeClass: "text-amber-400 border-amber-500/50 bg-amber-950/30",
      description: "Benign activity triggering a false alert due to aggressive or flawed detection rules.",
    },
    {
      value: "EXPECTED ACTIVITY",
      label: "Expected Activity",
      badgeClass: "text-emerald-400 border-emerald-500/50 bg-emerald-950/30",
      description: "Authorized, planned business or IT administrative task with verified change approval.",
    },
  ],
};
