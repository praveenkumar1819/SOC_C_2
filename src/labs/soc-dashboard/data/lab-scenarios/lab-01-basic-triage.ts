import { AlertSummary, EvidenceChecklistItem } from "../../types/lab.types";

export const LAB_01_SCENARIO = {
  labId: "lab-01" as const,
  title: "Lab 01: Basic Alert Triage",
  subtitle: "Extract the 5 Critical W's & Determine Attack Verdict",
  difficulty: "BEGINNER",
  durationMinutes: 15,
  narrative: `Tuesday morning, 09:20 AM. Your second day at FinCorp SOC.

Rajesh Kumar (your mentor) pulls up his chair:
"Okay, an alert just hit the triage queue: SEC-2026-0412. This is your first real alert to investigate.

I want you to extract the 5 critical fields:
1. WHO: Target account / user
2. WHAT: Target system / computer hostname
3. WHERE: Source IP address (internal workstation or external)
4. WHEN: Exact timestamp of the malicious activity
5. HOW MANY: Alert count / event frequency

Open the alert. Check all 5 consoles. Pivot through Email, EDR, SIEM, Firewall, and Timeline to verify your findings.
Then give me your verdict: Is this a True Positive attack or a False Alarm?

You have 15 minutes. I am watching but letting you drive. Go!"`,

  mentorName: "Rajesh Kumar",
  mentorRole: "Senior L1 SOC Analyst & Lead Mentor",

  alerts: [
    {
      id: "SEC-2026-0412",
      rule: "Suspicious Office Application Child Process",
      priority: "MEDIUM-HIGH",
      generatedTime: "2026-01-15 09:20:02 EST",
      timestamp: "2026-01-15 09:19:58 EST",
      user: "mchen",
      host: "FIN-BOS-MCHEN-047",
      sourceIp: "10.20.5.147",
      eventCount: 1,
      status: "NEW",
      category: "Endpoint / Malware Execution",
      description: "Microsoft Word spawned powershell.exe with Base64 encoded payload and attempted outbound connection.",
    } as AlertSummary,
  ],

  evidenceChecklist: [
    {
      id: "ev-1",
      label: "Email Gateway: Identify sender address, subject, and macro attachment",
      consoleTab: "email",
      discovered: false,
      hint: "Switch to the Email tab to inspect the incoming invoice email and attachment details.",
    },
    {
      id: "ev-2",
      label: "EDR Console: Trace parent-child process tree (WINWORD -> powershell.exe)",
      consoleTab: "edr",
      discovered: false,
      hint: "Look at the EDR process hierarchy to identify the child process and command line parameters.",
    },
    {
      id: "ev-3",
      label: "Firewall / Threat Intel: Verify outbound callback IP and C2 reputation",
      consoleTab: "firewall",
      discovered: false,
      hint: "Examine the blocked outbound traffic to 198.51.100.84:443 in the Firewall console.",
    },
    {
      id: "ev-4",
      label: "SIEM Console: Correlate multi-stage detection confidence",
      consoleTab: "siem",
      discovered: false,
      hint: "Review the SIEM correlation sequence linking the email delivery to process execution.",
    },
    {
      id: "ev-5",
      label: "Timeline Console: Reconstruct sequence of events from 09:15 to 09:20",
      consoleTab: "timeline",
      discovered: false,
      hint: "Check the chronological timeline view to observe how quickly the victim opened the attachment.",
    },
  ] as EvidenceChecklistItem[],

  taskFields: [
    {
      key: "who",
      label: "WHO (Target Account)",
      placeholder: "e.g., mchen",
      correctAnswer: "mchen",
      hint: "Look at the Email Gateway console recipient or alert details for the target username.",
      acceptedAnswers: ["mchen", "mchen@fincorp.local", "michael chen", "fincorp\\mchen"],
    },
    {
      key: "what",
      label: "WHAT (Target System)",
      placeholder: "e.g., FIN-BOS-MCHEN-047",
      correctAnswer: "FIN-BOS-MCHEN-047",
      hint: "Check the EDR console hostname where WINWORD.EXE and PowerShell were executed.",
      acceptedAnswers: ["fin-bos-mchen-047", "mchen-047", "fin-bos-mchen047"],
    },
    {
      key: "where",
      label: "WHERE (Source IP Address)",
      placeholder: "e.g., 10.20.5.147",
      correctAnswer: "10.20.5.147",
      hint: "Check the alert header or firewall source IP for Michael's workstation IP.",
      acceptedAnswers: ["10.20.5.147", "10.20.5.147 (internal)", "10.20.5.147 (workstation)"],
    },
    {
      key: "when",
      label: "WHEN (Timestamp of Malicious Execution)",
      placeholder: "e.g., 09:19:58",
      correctAnswer: "09:19:58",
      hint: "What exact time did PowerShell execute? Check the EDR console or timeline.",
      acceptedAnswers: ["09:19:58", "09:19:58 est", "2026-01-15 09:19:58", "09:19"],
    },
    {
      key: "howMany",
      label: "HOW MANY (Event Count)",
      placeholder: "e.g., 1",
      correctAnswer: "1",
      hint: "Check the alert event count. Is this an isolated single occurrence or recurring?",
      acceptedAnswers: ["1", "1 event", "one", "single"],
    },
  ],

  verdictQuestion: {
    question: "Based on all evidence, what is your triage classification?",
    options: [
      {
        value: "TP",
        label: "True Positive — Real spear phishing and macro malware attack",
        description: "Adversary targeted Michael Chen with malicious docm macro to spawn PowerShell and establish C2 connection.",
      },
      {
        value: "FP",
        label: "False Positive — Benign administrative macro automation",
        description: "Expected office workflow mistakenly flagged by heuristic rules.",
      },
      {
        value: "BENIGN",
        label: "Benign Activity — System maintenance routine",
        description: "Scheduled update or routine OS task without malicious intent.",
      },
    ],
    correctValue: "TP",
  },

  reasoningPrompt: "Explain your verdict in 2-3 sentences referencing specific console evidence (sender domain, macro, PowerShell, C2):",
};
