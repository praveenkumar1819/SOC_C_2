import { AlertSummary, EvidenceChecklistItem } from "../../types/lab.types";

export interface EscalationDecisionItem {
  id: string;
  question: string;
  context: string;
  options: {
    value: string;
    label: string;
    role: string;
    isCorrect: boolean;
  }[];
  correctAnswer: string;
  reasoning: string;
}

export const LAB_04_SCENARIO = {
  labId: "lab-04" as const,
  title: "Lab 04: Incident Escalation & Team Coordination",
  subtitle: "Orchestrate Multi-Host Crisis Response with SOC Specialists",
  difficulty: "ADVANCED",
  durationMinutes: 25,
  narrative: `Friday morning, 09:00 AM. Day 5 of training. Final lab.

Rajesh Kumar and Priya Sharma gather beside your triage console:
"We have a multi-system, active cyber crisis. A targeted spear-phishing campaign hit 47 employees. Three Finance laptops executed malicious code, a Domain Admin credential was compromised, and 250 GB of data is currently streaming out of the enterprise.

Your job as an L1 analyst is NOT to fix this alone. If you try to do everything yourself, the network burns while you write firewall rules.
Your job is to orchestrate: identify what needs doing, and route it to the exact right specialists and leadership.

This is where the SOC functions as a unified team.
Make the 6 critical escalation routing decisions. Coordinate containment, investigation, credential resets, firewall perimeter blocking, forensics, and executive crisis disclosure."`,

  mentorName: "Rajesh Kumar & Priya Sharma",
  mentorRole: "L1 Lead Mentor & L2 Incident Response Lead",

  alerts: [
    {
      id: "SEC-2026-0501",
      rule: "Targeted Spear Phishing Campaign (47 Recipients)",
      priority: "HIGH",
      generatedTime: "2026-01-18 09:00:00 EST",
      timestamp: "2026-01-18 09:00:00 EST",
      user: "47 recipients",
      host: "FIN-BOS-MAIL-GW01",
      sourceIp: "198.51.100.11",
      eventCount: 47,
      status: "NEW",
      category: "Email",
      description: "Spear phishing email with malicious bonus matrix attachment delivered to 47 Finance & HR employees.",
    },
    {
      id: "SEC-2026-0502",
      rule: "Cobalt Strike DLL Injection on Multiple Endpoints",
      priority: "CRITICAL",
      generatedTime: "2026-01-18 09:15:10 EST",
      timestamp: "2026-01-18 09:15:10 EST",
      user: "mchen (+2 others)",
      host: "FIN-BOS-MCHEN-047",
      sourceIp: "10.20.5.147",
      eventCount: 3,
      status: "NEW",
      category: "Endpoint",
      description: "Malware execution confirmed on 3 laptops. Reflective DLL injection into rundll32.exe.",
    },
    {
      id: "SEC-2026-0503",
      rule: "Domain Admin Lateral Movement via Non-Admin Workstation",
      priority: "CRITICAL",
      generatedTime: "2026-01-18 09:22:00 EST",
      timestamp: "2026-01-18 09:22:00 EST",
      user: "svance (DA)",
      host: "FIN-BOS-FILESERVER-01",
      sourceIp: "10.20.5.147",
      eventCount: 12,
      status: "NEW",
      category: "Identity",
      description: "Compromised Domain Admin credentials used from mchen workstation to enumerate sensitive file shares.",
    },
    {
      id: "SEC-2026-0504",
      rule: "Mass Egress Data Exfiltration (250 GB)",
      priority: "CRITICAL",
      generatedTime: "2026-01-18 09:25:00 EST",
      timestamp: "2026-01-18 09:25:00 EST",
      user: "SYSTEM",
      host: "FIN-BOS-MCHEN-047",
      sourceIp: "10.20.5.147",
      eventCount: 1,
      status: "NEW",
      category: "Network / Exfiltration",
      description: "250 GB encrypted archive transmitted to untrusted offshore hosting provider 198.51.100.200.",
    },
  ] as AlertSummary[],

  evidenceChecklist: [
    {
      id: "ev-401",
      label: "Map Attack Chain: Inbound Phishing -> 3 Hosts Infected -> DA Hijack -> Data Exfiltration",
      consoleTab: "timeline",
      discovered: false,
      hint: "Inspect the multi-stage timeline sequence across the morning from 09:00 to 09:25.",
    },
    {
      id: "ev-402",
      label: "Analyze Exfiltration Destination: IP 198.51.100.200 threat attribution",
      consoleTab: "firewall",
      discovered: false,
      hint: "Check the Firewall console threat intel reputation on the exfiltration drop point.",
    },
    {
      id: "ev-403",
      label: "Review Active Directory Kerberos Logins from non-admin host",
      consoleTab: "siem",
      discovered: false,
      hint: "Examine SIEM correlated event 1 under SEC-2026-0503 for the hijacked ticket.",
    },
  ] as EvidenceChecklistItem[],

  escalationDecisions: [
    {
      id: "esc-1",
      question: "Who coordinates overall incident containment & response workflow?",
      context: "Multiple endpoints infected, need coordinated host isolation and evidence preservation.",
      options: [
        { value: "L1_SELF", label: "You (L1 Analyst) — Try to isolate all machines yourself", role: "L1 Triage", isCorrect: false },
        { value: "L2_PRIYA", label: "Priya Sharma (L2 Incident Responder) — Lead containment orchestration", role: "L2 Response", isCorrect: true },
        { value: "L3_ADITYA", label: "Aditya Deshmukh (L3 Threat Hunter) — Focus on deep memory analysis", role: "L3 Hunting", isCorrect: false },
        { value: "MANAGER_ELENA", label: "Elena Gomez (SOC Manager) — Business communications", role: "Leadership", isCorrect: false },
      ],
      correctAnswer: "L2_PRIYA",
      reasoning: "L2 Incident Responders are the designated coordinators for incident containment playbooks and resource tasking.",
    },
    {
      id: "esc-2",
      question: "Who investigates whether this attack is part of a wider, enterprise-wide APT campaign?",
      context: "Adversary used custom Cobalt Strike malleable profiles and spoofed partner infrastructure.",
      options: [
        { value: "L1_SELF", label: "You (L1 Analyst) — Run manual search queries on one machine", role: "L1 Triage", isCorrect: false },
        { value: "L2_PRIYA", label: "Priya Sharma (L2) — Containment coordination", role: "L2 Response", isCorrect: false },
        { value: "L3_ADITYA", label: "Aditya Deshmukh (L3 Threat Hunter) — Campaign hunt and IOC pattern correlation", role: "L3 Hunting", isCorrect: true },
        { value: "HELP_DESK", label: "IT Helpdesk — Check user tickets", role: "Support", isCorrect: false },
      ],
      correctAnswer: "L3_ADITYA",
      reasoning: "L3 Threat Hunters specialize in enterprise-wide proactive hunts, adversary infrastructure clustering, and threat intelligence pivoting.",
    },
    {
      id: "esc-3",
      question: "Who must safely reset and audit the compromised Domain Admin account (svance)?",
      context: "Active Directory Domain Controller credentials have been abused for lateral movement across corporate shares.",
      options: [
        { value: "L1_SELF", label: "You (L1 Analyst) — Change user password in local Windows settings", role: "L1 Triage", isCorrect: false },
        { value: "L2_PRIYA", label: "Priya Sharma (L2) — Incident response coordinator", role: "L2 Response", isCorrect: false },
        { value: "IDENTITY_TEAM", label: "Identity & Access Management / AD Team (Specialist) — Tier 0 credential reset & Kerberos ticket purge", role: "Specialist", isCorrect: true },
        { value: "MANAGER_ELENA", label: "Elena Gomez (Manager) — Authorize without technical execution", role: "Leadership", isCorrect: false },
      ],
      correctAnswer: "IDENTITY_TEAM",
      reasoning: "Only the dedicated Identity / Active Directory Administration Team can safely invalidate Golden/Silver Kerberos tickets (krbtgt double-reset) and verify AD persistence hooks.",
    },
    {
      id: "esc-4",
      question: "Who immediately creates the enterprise-wide block rule for the adversary's C2 & exfiltration IP (198.51.100.200)?",
      context: "Active outbound connection streaming data out of the Boston perimeter.",
      options: [
        { value: "L1_SELF", label: "You (L1 Analyst) — Edit production firewall routing tables", role: "L1 Triage", isCorrect: false },
        { value: "L2_PRIYA", label: "Priya Sharma (L2) — Requests emergency change, but doesn't commit firewall config directly", role: "L2 Response", isCorrect: false },
        { value: "FIREWALL_TEAM", label: "Network Security / Firewall Engineering Team (Specialist) — Implement perimeter block & drop active sessions", role: "Specialist", isCorrect: true },
        { value: "VENDOR_SUPPORT", label: "External ISP Customer Support", role: "External", isCorrect: false },
      ],
      correctAnswer: "FIREWALL_TEAM",
      reasoning: "Network Security Engineers manage change controls on production edge firewalls and can terminate active TCP states to sever exfiltration immediately.",
    },
    {
      id: "esc-5",
      question: "Who conducts the forensic database audit to determine exactly which customer records were exfiltrated?",
      context: "250 GB egress payload suspected of containing sensitive customer PII and financial records.",
      options: [
        { value: "L1_SELF", label: "You (L1 Analyst) — Query database tables directly from terminal", role: "L1 Triage", isCorrect: false },
        { value: "DATABASE_TEAM", label: "Database Administration & Forensics Team (Specialist) — Parse transaction logs to catalog impacted data", role: "Specialist", isCorrect: true },
        { value: "HR_DEPARTMENT", label: "Human Resources — Review employee list", role: "HR", isCorrect: false },
        { value: "L3_ADITYA", label: "Aditya Deshmukh (L3) — Infrastructure hunting", role: "L3 Hunting", isCorrect: false },
      ],
      correctAnswer: "DATABASE_TEAM",
      reasoning: "Database Operations Specialists possess the schema and transaction log analysis tools required to determine exact row-level data access and exfiltration scope.",
    },
    {
      id: "esc-6",
      question: "Who possesses executive authority to notify regulators, legal counsel, and affected customers?",
      context: "Potential compromise of 2,000,000+ consumer records requiring mandatory statutory breach disclosure.",
      options: [
        { value: "L1_SELF", label: "You (L1 Analyst) — Send customer email warning", role: "L1 Triage", isCorrect: false },
        { value: "L2_PRIYA", label: "Priya Sharma (L2) — Operational lead only", role: "L2 Response", isCorrect: false },
        { value: "L3_ADITYA", label: "Aditya Deshmukh (L3) — Technical hunter only", role: "L3 Hunting", isCorrect: false },
        { value: "MANAGER_ELENA", label: "Elena Gomez (SOC Operations Manager) — Brief CISO, Legal Counsel, and Executive PR", role: "Leadership", isCorrect: true },
      ],
      correctAnswer: "MANAGER_ELENA",
      reasoning: "Only SOC Leadership (Elena Gomez) and executive management liaise with Corporate Legal, Risk, and Public Relations to fulfill regulatory disclosure obligations.",
    },
  ] as EscalationDecisionItem[],

  teamFeedback: {
    rajesh: `Rajesh Kumar (L1 Mentor): "Flawless escalation triage. You understood the golden rule of L1: don't bottleneck an active crisis by pretending you can solo a nation-state campaign. You gathered the facts and engaged the response apparatus."`,
    priya: `Priya Sharma (L2 Response Lead): "I have operational command of the incident now. Laptops FIN-BOS-MCHEN-047, -048, and -052 are isolated from the network. Identity team is executing the krbtgt double-reset, and the Firewall team severed the C2 pipe."`,
    aditya: `Aditya Deshmukh (L3 Threat Hunter): "Threat hunt underway across all 1,200 endpoints. Confirmed 47 emails received, 3 opened, 0 further persistence found. Attribution points to threat cluster UNC4120. Great early catch on the lateral movement."`,
    elena: `Elena Gomez (SOC Operations Manager): "I am currently briefing the CISO and General Counsel. Because your escalation was crisp and immediate, our window of exposure was under 35 minutes. Welcome to the FinCorp SOC, Analyst. You passed training week with flying colors."`,
  },
};
