// Auto-generated 90-chapter specifications from Master Curriculum XLS
// Synchronizes Section 2 (Visual Demo) and Section 3 (Interactive Activity)

export interface ChapterSpecItem {
  chapterId: string;
  chapterTitle: string;
  moduleId: string;
  moduleTitle: string;
  unitId: string;
  unitTitle: string;
  mentorContext: string;
  section2: {
    title: string;
    visualType: 'animated-story' | 'diagram' | 'interface-tour' | 'flowchart' | 'packet-flow';
    rawVisualFormat: string;
    description: string;
    visualDirection: string;
    steps: Array<{
      id: number;
      stage: string;
      title: string;
      description: string;
      telemetrySnippet?: string;
      highlightText?: string;
    }>;
  };
  section3: {
    title: string;
    type: 'matching' | 'sorting' | 'clue-reveal' | 'drag-drop' | 'packet-trace';
    rawActivityType: string;
    instructions: string;
    scenario: string;
    uxDirection: string;
    items: Array<{
      id: string;
      label: string;
      category?: string;
      summary: string;
      description?: string;
    }>;
  };
}

export const CHAPTER_V2_SPECS: Record<string, ChapterSpecItem> = {
  "M00-U1-C1": {
    "chapterId": "M00-U1-C1",
    "chapterTitle": "Your first shift and the L1 role",
    "moduleId": "00",
    "moduleTitle": "Orientation: Your First SOC Shift",
    "unitId": "M00-U1",
    "unitTitle": "Welcome to the SOC",
    "mentorContext": "You join the CDAC Bengaluru SOC learning environment. Mentor Ananya, an experienced L1 analyst, explains the shift, learning path, lab safety and how to ask for help.",
    "section2": {
      "title": "Your first shift and the L1 role — Visual Story",
      "visualType": "animated-story",
      "rawVisualFormat": "Animated Workflow",
      "description": "Animate the analyst moving through the workflow using large character and tool icons; each step lights up, transitions smoothly, and ends with the resulting status. Title: “Your first shift and",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Your first shift and the L1 role — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-12 (10.0.4.21). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-12 | IP: 10.0.4.21 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Animate the analyst moving through the workflow using large character and tool icons; each step lights up, transitions smoothly, and ends with the resulting status. Title: “Your first shift and Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-12 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M00-U1-C1 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Match the Concepts: Your first shift and the L1 role",
      "type": "matching",
      "rawActivityType": "Concept / Term Matching",
      "instructions": "Create Focus: Your first shift and the L1 role. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity",
      "scenario": "You join the CDAC Bengaluru SOC learning environment. Mentor Ananya, an experienced L1 analyst, explains the shift, learning path, lab safety and how to ask for help.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "match-M00-U1-C1-1",
          "label": "Core Observable on Host: CDAC-BLR-WS-12",
          "summary": "Raw telemetry indicator extracted directly from the system event log or network sensor."
        },
        {
          "id": "match-M00-U1-C1-2",
          "label": "SOP Baseline Verification",
          "summary": "Structured procedure to confirm whether the activity matches authorized organizational norms."
        },
        {
          "id": "match-M00-U1-C1-3",
          "label": "Correlation Context",
          "summary": "Connecting host activity with network logs to establish a coherent chronological narrative."
        },
        {
          "id": "match-M00-U1-C1-4",
          "label": "L1 Case Disposition",
          "summary": "Final categorization (True Positive / False Positive / Benign) with structured mentor handoff notes."
        }
      ]
    }
  },
  "M00-U1-C2": {
    "chapterId": "M00-U1-C2",
    "chapterTitle": "How this course works",
    "moduleId": "00",
    "moduleTitle": "Orientation: Your First SOC Shift",
    "unitId": "M00-U1",
    "unitTitle": "Welcome to the SOC",
    "mentorContext": "You join the CDAC Bengaluru SOC learning environment. Mentor Ananya, an experienced L1 analyst, explains the shift, learning path, lab safety and how to ask for help.",
    "section2": {
      "title": "How this course works — Visual Story",
      "visualType": "interface-tour",
      "rawVisualFormat": "Security Interface Tour",
      "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “How this course works”. Optional one-sentence",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "How this course works — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-13 (10.0.4.22). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-13 | IP: 10.0.4.22 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “How this course works”. Optional one-sentence Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-13 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M00-U1-C2 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Sort the Scenario: How this course works",
      "type": "sorting",
      "rawActivityType": "Safe / Unsafe Sorter",
      "instructions": "Present Focus: How this course works. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one viewport.",
      "scenario": "You join the CDAC Bengaluru SOC learning environment. Mentor Ananya, an experienced L1 analyst, explains the shift, learning path, lab safety and how to ask for help.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "sort-M00-U1-C2-1",
          "label": "Authorized Scheduled Maintenance on Host: CDAC-BLR-WS-13",
          "category": "Safe / Routine",
          "summary": "Documented IT change window activity verified against internal change request ticket."
        },
        {
          "id": "sort-M00-U1-C2-2",
          "label": "Unauthenticated Ingress Connection via Ephemeral Port",
          "category": "Suspicious / Unsafe",
          "summary": "Incoming network connection without prior session establishment or identity certificate."
        },
        {
          "id": "sort-M00-U1-C2-3",
          "label": "Standard Domain Controller Sync (Host: CDAC-BLR-DC01)",
          "category": "Safe / Routine",
          "summary": "Routine Kerberos ticket granting and LDAP directory replication between authoritative servers."
        },
        {
          "id": "sort-M00-U1-C2-4",
          "label": "Encoded PowerShell Command from Temporary Folder",
          "category": "Suspicious / Unsafe",
          "summary": "Base64 encoded execution launched from AppData\\Local\\Temp by a standard user account."
        }
      ]
    }
  },
  "M00-U2-C1": {
    "chapterId": "M00-U2-C1",
    "chapterTitle": "Resource packs, simulations and isolated VMs",
    "moduleId": "00",
    "moduleTitle": "Orientation: Your First SOC Shift",
    "unitId": "M00-U2",
    "unitTitle": "Learning Safely",
    "mentorContext": "You join the CDAC Bengaluru SOC learning environment. Mentor Ananya, an experienced L1 analyst, explains the shift, learning path, lab safety and how to ask for help.",
    "section2": {
      "title": "Resource packs, simulations and isolated VMs — Visual Story",
      "visualType": "packet-flow",
      "rawVisualFormat": "Data-Flow Animation",
      "description": "Animate a staff device sending packets through branch network components; use moving dots, large SVG icons, glowing paths, and a clear source-to-destination route. Title: “Resource packs, simulations and isolated VMs”.",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Resource packs, simulations and isolated VMs — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-02 (10.0.4.31). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-02 | IP: 10.0.4.31 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Animate a staff device sending packets through branch network components; use moving dots, large SVG icons, glowing paths, and a clear source-to-destination route. Title: “Resource packs, simulations and isolated VMs”. Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-02 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M00-U2-C1 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Reveal the Clues: Resource packs, simulations and isolated VMs",
      "type": "clue-reveal",
      "rawActivityType": "Clue & Evidence Reveal",
      "instructions": "Show Focus: Resource packs, simulations and isolated VMs. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within",
      "scenario": "You join the CDAC Bengaluru SOC learning environment. Mentor Ananya, an experienced L1 analyst, explains the shift, learning path, lab safety and how to ask for help.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "clue-M00-U2-C1-1",
          "label": "Host Name & Asset Tag: CDAC-BLR-WS-02",
          "summary": "Confirmed client workstation in CDAC Bengaluru engineering lab segment with standard privileges."
        },
        {
          "id": "clue-M00-U2-C1-2",
          "label": "Process Execution Hierarchy & Parent PID",
          "summary": "Child process spawned under atypical parent, requiring command-line argument verification."
        },
        {
          "id": "clue-M00-U2-C1-3",
          "label": "Normalized UTC Timestamp & Event Frequency",
          "summary": "Event clustered within a 45-second window during non-business hours (02:14:32 UTC)."
        },
        {
          "id": "clue-M00-U2-C1-4",
          "label": "Network Destination & Reputation Confidence",
          "summary": "Outbound egress towards external IP flagged in threat intelligence feeds as suspicious C2 infrastructure."
        }
      ]
    }
  },
  "M00-U2-C2": {
    "chapterId": "M00-U2-C2",
    "chapterTitle": "Evidence handling and asking for help",
    "moduleId": "00",
    "moduleTitle": "Orientation: Your First SOC Shift",
    "unitId": "M00-U2",
    "unitTitle": "Learning Safely",
    "mentorContext": "You join the CDAC Bengaluru SOC learning environment. Mentor Ananya, an experienced L1 analyst, explains the shift, learning path, lab safety and how to ask for help.",
    "section2": {
      "title": "Evidence handling and asking for help — Visual Story",
      "visualType": "animated-story",
      "rawVisualFormat": "Story Scene / Character Animation",
      "description": "Show a mentor and learner acting out the situation; animate the relevant people or devices, reveal the key action visually, and finish with one clear takeaway. Title: “Evidence handling and",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Evidence handling and asking for help — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-03 (10.0.4.32). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-03 | IP: 10.0.4.32 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Show a mentor and learner acting out the situation; animate the relevant people or devices, reveal the key action visually, and finish with one clear takeaway. Title: “Evidence handling and Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-03 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M00-U2-C2 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Reveal the Clues: Evidence handling and asking for help",
      "type": "clue-reveal",
      "rawActivityType": "Clue & Evidence Reveal",
      "instructions": "Show Focus: Evidence handling and asking for help. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within",
      "scenario": "You join the CDAC Bengaluru SOC learning environment. Mentor Ananya, an experienced L1 analyst, explains the shift, learning path, lab safety and how to ask for help.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "clue-M00-U2-C2-1",
          "label": "Host Name & Asset Tag: CDAC-BLR-WS-03",
          "summary": "Confirmed client workstation in CDAC Bengaluru engineering lab segment with standard privileges."
        },
        {
          "id": "clue-M00-U2-C2-2",
          "label": "Process Execution Hierarchy & Parent PID",
          "summary": "Child process spawned under atypical parent, requiring command-line argument verification."
        },
        {
          "id": "clue-M00-U2-C2-3",
          "label": "Normalized UTC Timestamp & Event Frequency",
          "summary": "Event clustered within a 45-second window during non-business hours (02:14:32 UTC)."
        },
        {
          "id": "clue-M00-U2-C2-4",
          "label": "Network Destination & Reputation Confidence",
          "summary": "Outbound egress towards external IP flagged in threat intelligence feeds as suspicious C2 infrastructure."
        }
      ]
    }
  },
  "M00-U3-C1": {
    "chapterId": "M00-U3-C1",
    "chapterTitle": "FinCorp-style alerts in a CDAC learning setting",
    "moduleId": "00",
    "moduleTitle": "Orientation: Your First SOC Shift",
    "unitId": "M00-U3",
    "unitTitle": "The Learning Journey",
    "mentorContext": "You join the CDAC Bengaluru SOC learning environment. Mentor Ananya, an experienced L1 analyst, explains the shift, learning path, lab safety and how to ask for help.",
    "section2": {
      "title": "FinCorp-style alerts in a CDAC learning setting — Visual Story",
      "visualType": "interface-tour",
      "rawVisualFormat": "Security Interface Tour",
      "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “FinCorp-style alerts in a CDAC learning",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "FinCorp-style alerts in a CDAC learning setting — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-12 (10.0.4.41). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-12 | IP: 10.0.4.41 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “FinCorp-style alerts in a CDAC learning Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-12 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M00-U3-C1 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Reveal the Clues: FinCorp-style alerts in a CDAC learning setting",
      "type": "clue-reveal",
      "rawActivityType": "Clue & Evidence Reveal",
      "instructions": "Show Focus: FinCorp-style alerts in a CDAC learning setting. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity",
      "scenario": "You join the CDAC Bengaluru SOC learning environment. Mentor Ananya, an experienced L1 analyst, explains the shift, learning path, lab safety and how to ask for help.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "clue-M00-U3-C1-1",
          "label": "Host Name & Asset Tag: CDAC-BLR-WS-12",
          "summary": "Confirmed client workstation in CDAC Bengaluru engineering lab segment with standard privileges."
        },
        {
          "id": "clue-M00-U3-C1-2",
          "label": "Process Execution Hierarchy & Parent PID",
          "summary": "Child process spawned under atypical parent, requiring command-line argument verification."
        },
        {
          "id": "clue-M00-U3-C1-3",
          "label": "Normalized UTC Timestamp & Event Frequency",
          "summary": "Event clustered within a 45-second window during non-business hours (02:14:32 UTC)."
        },
        {
          "id": "clue-M00-U3-C1-4",
          "label": "Network Destination & Reputation Confidence",
          "summary": "Outbound egress towards external IP flagged in threat intelligence feeds as suspicious C2 infrastructure."
        }
      ]
    }
  },
  "M00-U3-C2": {
    "chapterId": "M00-U3-C2",
    "chapterTitle": "How modules connect to a shift",
    "moduleId": "00",
    "moduleTitle": "Orientation: Your First SOC Shift",
    "unitId": "M00-U3",
    "unitTitle": "The Learning Journey",
    "mentorContext": "You join the CDAC Bengaluru SOC learning environment. Mentor Ananya, an experienced L1 analyst, explains the shift, learning path, lab safety and how to ask for help.",
    "section2": {
      "title": "How modules connect to a shift — Visual Story",
      "visualType": "animated-story",
      "rawVisualFormat": "Animated Workflow",
      "description": "Animate the analyst moving through the workflow using large character and tool icons; each step lights up, transitions smoothly, and ends with the resulting status. Title: “How modules connect to",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "How modules connect to a shift — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-13 (10.0.4.42). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-13 | IP: 10.0.4.42 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Animate the analyst moving through the workflow using large character and tool icons; each step lights up, transitions smoothly, and ends with the resulting status. Title: “How modules connect to Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-13 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M00-U3-C2 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Match the Concepts: How modules connect to a shift",
      "type": "matching",
      "rawActivityType": "Concept / Term Matching",
      "instructions": "Create Focus: How modules connect to a shift. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within",
      "scenario": "You join the CDAC Bengaluru SOC learning environment. Mentor Ananya, an experienced L1 analyst, explains the shift, learning path, lab safety and how to ask for help.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "match-M00-U3-C2-1",
          "label": "Core Observable on Host: CDAC-BLR-WS-13",
          "summary": "Raw telemetry indicator extracted directly from the system event log or network sensor."
        },
        {
          "id": "match-M00-U3-C2-2",
          "label": "SOP Baseline Verification",
          "summary": "Structured procedure to confirm whether the activity matches authorized organizational norms."
        },
        {
          "id": "match-M00-U3-C2-3",
          "label": "Correlation Context",
          "summary": "Connecting host activity with network logs to establish a coherent chronological narrative."
        },
        {
          "id": "match-M00-U3-C2-4",
          "label": "L1 Case Disposition",
          "summary": "Final categorization (True Positive / False Positive / Benign) with structured mentor handoff notes."
        }
      ]
    }
  },
  "M01-U1-C1": {
    "chapterId": "M01-U1-C1",
    "chapterTitle": "Hardware, OS and accounts",
    "moduleId": "01",
    "moduleTitle": "Computer Fundamentals",
    "unitId": "M01-U1",
    "unitTitle": "The Analyst Workstation",
    "mentorContext": "Mentor Ravi, an experienced L1 analyst, introduces the analyst workstation, operating systems, users, files, processes and basic commands.",
    "section2": {
      "title": "Hardware, OS and accounts — Visual Story",
      "visualType": "interface-tour",
      "rawVisualFormat": "Security Interface Tour",
      "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Hardware, OS and accounts”. Optional one-sentence",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Hardware, OS and accounts — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-12 (10.0.4.21). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-12 | IP: 10.0.4.21 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Hardware, OS and accounts”. Optional one-sentence Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-12 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M01-U1-C1 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Sort the Scenario: Hardware, OS and accounts",
      "type": "sorting",
      "rawActivityType": "Safe / Unsafe Sorter",
      "instructions": "Present Focus: Hardware, OS and accounts. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one viewport.",
      "scenario": "Mentor Ravi, an experienced L1 analyst, introduces the analyst workstation, operating systems, users, files, processes and basic commands.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "sort-M01-U1-C1-1",
          "label": "Authorized Scheduled Maintenance on Host: CDAC-BLR-WS-12",
          "category": "Safe / Routine",
          "summary": "Documented IT change window activity verified against internal change request ticket."
        },
        {
          "id": "sort-M01-U1-C1-2",
          "label": "Unauthenticated Ingress Connection via Ephemeral Port",
          "category": "Suspicious / Unsafe",
          "summary": "Incoming network connection without prior session establishment or identity certificate."
        },
        {
          "id": "sort-M01-U1-C1-3",
          "label": "Standard Domain Controller Sync (Host: CDAC-BLR-DC01)",
          "category": "Safe / Routine",
          "summary": "Routine Kerberos ticket granting and LDAP directory replication between authoritative servers."
        },
        {
          "id": "sort-M01-U1-C1-4",
          "label": "Encoded PowerShell Command from Temporary Folder",
          "category": "Suspicious / Unsafe",
          "summary": "Base64 encoded execution launched from AppData\\Local\\Temp by a standard user account."
        }
      ]
    }
  },
  "M01-U1-C2": {
    "chapterId": "M01-U1-C2",
    "chapterTitle": "Files, paths and permissions",
    "moduleId": "01",
    "moduleTitle": "Computer Fundamentals",
    "unitId": "M01-U1",
    "unitTitle": "The Analyst Workstation",
    "mentorContext": "Mentor Ravi, an experienced L1 analyst, introduces the analyst workstation, operating systems, users, files, processes and basic commands.",
    "section2": {
      "title": "Files, paths and permissions — Visual Story",
      "visualType": "packet-flow",
      "rawVisualFormat": "Data-Flow Animation",
      "description": "Animate a staff device sending packets through branch network components; use moving dots, large SVG icons, glowing paths, and a clear source-to-destination route. Title: “Files, paths and permissions”. Optional one-sentence",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Files, paths and permissions — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-13 (10.0.4.22). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-13 | IP: 10.0.4.22 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Animate a staff device sending packets through branch network components; use moving dots, large SVG icons, glowing paths, and a clear source-to-destination route. Title: “Files, paths and permissions”. Optional one-sentence Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-13 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M01-U1-C2 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Reveal the Clues: Files, paths and permissions",
      "type": "clue-reveal",
      "rawActivityType": "Clue & Evidence Reveal",
      "instructions": "Show Focus: Files, paths and permissions. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one viewport.",
      "scenario": "Mentor Ravi, an experienced L1 analyst, introduces the analyst workstation, operating systems, users, files, processes and basic commands.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "clue-M01-U1-C2-1",
          "label": "Host Name & Asset Tag: CDAC-BLR-WS-13",
          "summary": "Confirmed client workstation in CDAC Bengaluru engineering lab segment with standard privileges."
        },
        {
          "id": "clue-M01-U1-C2-2",
          "label": "Process Execution Hierarchy & Parent PID",
          "summary": "Child process spawned under atypical parent, requiring command-line argument verification."
        },
        {
          "id": "clue-M01-U1-C2-3",
          "label": "Normalized UTC Timestamp & Event Frequency",
          "summary": "Event clustered within a 45-second window during non-business hours (02:14:32 UTC)."
        },
        {
          "id": "clue-M01-U1-C2-4",
          "label": "Network Destination & Reputation Confidence",
          "summary": "Outbound egress towards external IP flagged in threat intelligence feeds as suspicious C2 infrastructure."
        }
      ]
    }
  },
  "M01-U2-C1": {
    "chapterId": "M01-U2-C1",
    "chapterTitle": "What processes and services do",
    "moduleId": "01",
    "moduleTitle": "Computer Fundamentals",
    "unitId": "M01-U2",
    "unitTitle": "Processes and Services",
    "mentorContext": "Mentor Ravi, an experienced L1 analyst, introduces the analyst workstation, operating systems, users, files, processes and basic commands.",
    "section2": {
      "title": "What processes and services do — Visual Story",
      "visualType": "animated-story",
      "rawVisualFormat": "Animated Workflow",
      "description": "Animate the analyst moving through the workflow using large character and tool icons; each step lights up, transitions smoothly, and ends with the resulting status. Title: “What processes and services",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "What processes and services do — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-02 (10.0.4.31). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-02 | IP: 10.0.4.31 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Animate the analyst moving through the workflow using large character and tool icons; each step lights up, transitions smoothly, and ends with the resulting status. Title: “What processes and services Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-02 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M01-U2-C1 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Build the Flow: What processes and services do",
      "type": "drag-drop",
      "rawActivityType": "Drag-and-Drop Workflow",
      "instructions": "Provide Focus: What processes and services do. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one",
      "scenario": "Mentor Ravi, an experienced L1 analyst, introduces the analyst workstation, operating systems, users, files, processes and basic commands.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "step-M01-U2-C1-1",
          "label": "Step 1: Alert Ingestion & Queue Assignment",
          "summary": "Acknowledge incoming telemetry in the SIEM alert queue and assign ticket to active shift analyst."
        },
        {
          "id": "step-M01-U2-C1-2",
          "label": "Step 2: Entity Identification & Asset Context",
          "summary": "Identify the 5 Ws: Affected Host Name, Source IP, User Account, and Network Segment."
        },
        {
          "id": "step-M01-U2-C1-3",
          "label": "Step 3: Playbook Verification & False Positive Filter",
          "summary": "Validate against known baseline exceptions, standard maintenance windows, and SOP criteria."
        },
        {
          "id": "step-M01-U2-C1-4",
          "label": "Step 4: Ticket Disposition & Escalation Handoff",
          "summary": "Document exact findings with verified evidence, set severity disposition, and escalate to L2."
        }
      ]
    }
  },
  "M01-U2-C2": {
    "chapterId": "M01-U2-C2",
    "chapterTitle": "Routine versus unfamiliar activity",
    "moduleId": "01",
    "moduleTitle": "Computer Fundamentals",
    "unitId": "M01-U2",
    "unitTitle": "Processes and Services",
    "mentorContext": "Mentor Ravi, an experienced L1 analyst, introduces the analyst workstation, operating systems, users, files, processes and basic commands.",
    "section2": {
      "title": "Routine versus unfamiliar activity — Visual Story",
      "visualType": "animated-story",
      "rawVisualFormat": "Animated Workflow",
      "description": "Animate the analyst moving through the workflow using large character and tool icons; each step lights up, transitions smoothly, and ends with the resulting status. Title: “Routine versus unfamiliar activity”.",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Routine versus unfamiliar activity — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-03 (10.0.4.32). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-03 | IP: 10.0.4.32 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Animate the analyst moving through the workflow using large character and tool icons; each step lights up, transitions smoothly, and ends with the resulting status. Title: “Routine versus unfamiliar activity”. Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-03 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M01-U2-C2 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Build the Flow: Routine versus unfamiliar activity",
      "type": "drag-drop",
      "rawActivityType": "Drag-and-Drop Workflow",
      "instructions": "Provide Focus: Routine versus unfamiliar activity. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one viewport.",
      "scenario": "Mentor Ravi, an experienced L1 analyst, introduces the analyst workstation, operating systems, users, files, processes and basic commands.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "step-M01-U2-C2-1",
          "label": "Step 1: Alert Ingestion & Queue Assignment",
          "summary": "Acknowledge incoming telemetry in the SIEM alert queue and assign ticket to active shift analyst."
        },
        {
          "id": "step-M01-U2-C2-2",
          "label": "Step 2: Entity Identification & Asset Context",
          "summary": "Identify the 5 Ws: Affected Host Name, Source IP, User Account, and Network Segment."
        },
        {
          "id": "step-M01-U2-C2-3",
          "label": "Step 3: Playbook Verification & False Positive Filter",
          "summary": "Validate against known baseline exceptions, standard maintenance windows, and SOP criteria."
        },
        {
          "id": "step-M01-U2-C2-4",
          "label": "Step 4: Ticket Disposition & Escalation Handoff",
          "summary": "Document exact findings with verified evidence, set severity disposition, and escalate to L2."
        }
      ]
    }
  },
  "M01-U3-C1": {
    "chapterId": "M01-U3-C1",
    "chapterTitle": "Command-line essentials",
    "moduleId": "01",
    "moduleTitle": "Computer Fundamentals",
    "unitId": "M01-U3",
    "unitTitle": "Basic System Orientation",
    "mentorContext": "Mentor Ravi, an experienced L1 analyst, introduces the analyst workstation, operating systems, users, files, processes and basic commands.",
    "section2": {
      "title": "Command-line essentials — Visual Story",
      "visualType": "animated-story",
      "rawVisualFormat": "Animated Workflow",
      "description": "Animate the analyst moving through the workflow using large character and tool icons; each step lights up, transitions smoothly, and ends with the resulting status. Title: “Command-line essentials”. Optional one-sentence",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Command-line essentials — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-12 (10.0.4.41). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-12 | IP: 10.0.4.41 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Animate the analyst moving through the workflow using large character and tool icons; each step lights up, transitions smoothly, and ends with the resulting status. Title: “Command-line essentials”. Optional one-sentence Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-12 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M01-U3-C1 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Match the Concepts: Command-line essentials",
      "type": "matching",
      "rawActivityType": "Concept / Term Matching",
      "instructions": "Create draggable concept Focus: Command-line essentials. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one viewport.",
      "scenario": "Mentor Ravi, an experienced L1 analyst, introduces the analyst workstation, operating systems, users, files, processes and basic commands.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "match-M01-U3-C1-1",
          "label": "Core Observable on Host: CDAC-BLR-WS-12",
          "summary": "Raw telemetry indicator extracted directly from the system event log or network sensor."
        },
        {
          "id": "match-M01-U3-C1-2",
          "label": "SOP Baseline Verification",
          "summary": "Structured procedure to confirm whether the activity matches authorized organizational norms."
        },
        {
          "id": "match-M01-U3-C1-3",
          "label": "Correlation Context",
          "summary": "Connecting host activity with network logs to establish a coherent chronological narrative."
        },
        {
          "id": "match-M01-U3-C1-4",
          "label": "L1 Case Disposition",
          "summary": "Final categorization (True Positive / False Positive / Benign) with structured mentor handoff notes."
        }
      ]
    }
  },
  "M01-U3-C2": {
    "chapterId": "M01-U3-C2",
    "chapterTitle": "Users, hostnames and timestamps",
    "moduleId": "01",
    "moduleTitle": "Computer Fundamentals",
    "unitId": "M01-U3",
    "unitTitle": "Basic System Orientation",
    "mentorContext": "Mentor Ravi, an experienced L1 analyst, introduces the analyst workstation, operating systems, users, files, processes and basic commands.",
    "section2": {
      "title": "Users, hostnames and timestamps — Visual Story",
      "visualType": "interface-tour",
      "rawVisualFormat": "Security Interface Tour",
      "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Users, hostnames and timestamps”. Optional one-sentence",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Users, hostnames and timestamps — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-13 (10.0.4.42). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-13 | IP: 10.0.4.42 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Users, hostnames and timestamps”. Optional one-sentence Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-13 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M01-U3-C2 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Sort the Scenario: Users, hostnames and timestamps",
      "type": "sorting",
      "rawActivityType": "Safe / Unsafe Sorter",
      "instructions": "Present Focus: Users, hostnames and timestamps. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one viewport.",
      "scenario": "Mentor Ravi, an experienced L1 analyst, introduces the analyst workstation, operating systems, users, files, processes and basic commands.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "sort-M01-U3-C2-1",
          "label": "Authorized Scheduled Maintenance on Host: CDAC-BLR-WS-13",
          "category": "Safe / Routine",
          "summary": "Documented IT change window activity verified against internal change request ticket."
        },
        {
          "id": "sort-M01-U3-C2-2",
          "label": "Unauthenticated Ingress Connection via Ephemeral Port",
          "category": "Suspicious / Unsafe",
          "summary": "Incoming network connection without prior session establishment or identity certificate."
        },
        {
          "id": "sort-M01-U3-C2-3",
          "label": "Standard Domain Controller Sync (Host: CDAC-BLR-DC01)",
          "category": "Safe / Routine",
          "summary": "Routine Kerberos ticket granting and LDAP directory replication between authoritative servers."
        },
        {
          "id": "sort-M01-U3-C2-4",
          "label": "Encoded PowerShell Command from Temporary Folder",
          "category": "Suspicious / Unsafe",
          "summary": "Base64 encoded execution launched from AppData\\Local\\Temp by a standard user account."
        }
      ]
    }
  },
  "M02-U1-C1": {
    "chapterId": "M02-U1-C1",
    "chapterTitle": "IP addresses, masks and gateways",
    "moduleId": "02",
    "moduleTitle": "Networking Fundamentals",
    "unitId": "M02-U1",
    "unitTitle": "How Branch Devices Connect",
    "mentorContext": "Mentor Ravi walks you through a small CDAC Bengaluru branch network, from a staff laptop to the local switch, gateway, DNS and an internal service.",
    "section2": {
      "title": "IP addresses, masks and gateways — Visual Story",
      "visualType": "packet-flow",
      "rawVisualFormat": "Data-Flow Animation",
      "description": "Animate a staff device sending packets through branch network components; use moving dots, large SVG icons, glowing paths, and a clear source-to-destination route. Title: “IP addresses, masks and gateways”. Optional",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "IP addresses, masks and gateways — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-12 (10.0.4.21). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-12 | IP: 10.0.4.21 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Animate a staff device sending packets through branch network components; use moving dots, large SVG icons, glowing paths, and a clear source-to-destination route. Title: “IP addresses, masks and gateways”. Optional Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-12 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M02-U1-C1 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Reveal the Clues: IP addresses, masks and gateways",
      "type": "clue-reveal",
      "rawActivityType": "Clue & Evidence Reveal",
      "instructions": "Show Focus: IP addresses, masks and gateways. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one",
      "scenario": "Mentor Ravi walks you through a small CDAC Bengaluru branch network, from a staff laptop to the local switch, gateway, DNS and an internal service.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "clue-M02-U1-C1-1",
          "label": "Host Name & Asset Tag: CDAC-BLR-WS-12",
          "summary": "Confirmed client workstation in CDAC Bengaluru engineering lab segment with standard privileges."
        },
        {
          "id": "clue-M02-U1-C1-2",
          "label": "Process Execution Hierarchy & Parent PID",
          "summary": "Child process spawned under atypical parent, requiring command-line argument verification."
        },
        {
          "id": "clue-M02-U1-C1-3",
          "label": "Normalized UTC Timestamp & Event Frequency",
          "summary": "Event clustered within a 45-second window during non-business hours (02:14:32 UTC)."
        },
        {
          "id": "clue-M02-U1-C1-4",
          "label": "Network Destination & Reputation Confidence",
          "summary": "Outbound egress towards external IP flagged in threat intelligence feeds as suspicious C2 infrastructure."
        }
      ]
    }
  },
  "M02-U1-C2": {
    "chapterId": "M02-U1-C2",
    "chapterTitle": "Switches, routers and access points",
    "moduleId": "02",
    "moduleTitle": "Networking Fundamentals",
    "unitId": "M02-U1",
    "unitTitle": "How Branch Devices Connect",
    "mentorContext": "Mentor Ravi walks you through a small CDAC Bengaluru branch network, from a staff laptop to the local switch, gateway, DNS and an internal service.",
    "section2": {
      "title": "Switches, routers and access points — Visual Story",
      "visualType": "packet-flow",
      "rawVisualFormat": "Data-Flow Animation",
      "description": "Animate a staff device sending packets through branch network components; use moving dots, large SVG icons, glowing paths, and a clear source-to-destination route. Title: “Switches, routers and access points”. Optional",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Switches, routers and access points — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-13 (10.0.4.22). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-13 | IP: 10.0.4.22 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Animate a staff device sending packets through branch network components; use moving dots, large SVG icons, glowing paths, and a clear source-to-destination route. Title: “Switches, routers and access points”. Optional Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-13 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M02-U1-C2 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Trace the Signal: Switches, routers and access points",
      "type": "packet-trace",
      "rawActivityType": "Packet / Event Tracer",
      "instructions": "Animate Focus: Switches, routers and access points. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one",
      "scenario": "Mentor Ravi walks you through a small CDAC Bengaluru branch network, from a staff laptop to the local switch, gateway, DNS and an internal service.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "trace-M02-U1-C2-1",
          "label": "Ingress Packet at Gateway Router [Host: CDAC-BLR-WS-13]",
          "summary": "Initial TCP handshake packet traversing the perimeter interface with valid checksum."
        },
        {
          "id": "trace-M02-U1-C2-2",
          "label": "Passive TAP Sensor Inspection [Zeek-Perimeter-01]",
          "summary": "Protocol metadata extracted: SSL/TLS handshake certificates and SNI domain inspected."
        },
        {
          "id": "trace-M02-U1-C2-3",
          "label": "Core Switch Port Mirroring [Port 24]",
          "summary": "Payload header verified for anomaly indicators, protocol compliance, and anomalous flags."
        },
        {
          "id": "trace-M02-U1-C2-4",
          "label": "SIEM Forwarder Buffer [CDAC-SIEM-PROD]",
          "summary": "Indexed into event search repository within 1.2 seconds with normalized CIM fields."
        }
      ]
    }
  },
  "M02-U2-C1": {
    "chapterId": "M02-U2-C1",
    "chapterTitle": "DNS and DHCP",
    "moduleId": "02",
    "moduleTitle": "Networking Fundamentals",
    "unitId": "M02-U2",
    "unitTitle": "Name and Address Services",
    "mentorContext": "Mentor Ravi walks you through a small CDAC Bengaluru branch network, from a staff laptop to the local switch, gateway, DNS and an internal service.",
    "section2": {
      "title": "DNS and DHCP — Visual Story",
      "visualType": "packet-flow",
      "rawVisualFormat": "Data-Flow Animation",
      "description": "Animate a staff device sending packets through branch network components; use moving dots, large SVG icons, glowing paths, and a clear source-to-destination route. Title: “DNS and DHCP”. Optional one-sentence description",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "DNS and DHCP — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-02 (10.0.4.31). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-02 | IP: 10.0.4.31 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Animate a staff device sending packets through branch network components; use moving dots, large SVG icons, glowing paths, and a clear source-to-destination route. Title: “DNS and DHCP”. Optional one-sentence description Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-02 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M02-U2-C1 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Trace the Signal: DNS and DHCP",
      "type": "packet-trace",
      "rawActivityType": "Packet / Event Tracer",
      "instructions": "Animate packets Focus: DNS and DHCP. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one viewport.",
      "scenario": "Mentor Ravi walks you through a small CDAC Bengaluru branch network, from a staff laptop to the local switch, gateway, DNS and an internal service.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "trace-M02-U2-C1-1",
          "label": "Ingress Packet at Gateway Router [Host: CDAC-BLR-WS-02]",
          "summary": "Initial TCP handshake packet traversing the perimeter interface with valid checksum."
        },
        {
          "id": "trace-M02-U2-C1-2",
          "label": "Passive TAP Sensor Inspection [Zeek-Perimeter-01]",
          "summary": "Protocol metadata extracted: SSL/TLS handshake certificates and SNI domain inspected."
        },
        {
          "id": "trace-M02-U2-C1-3",
          "label": "Core Switch Port Mirroring [Port 24]",
          "summary": "Payload header verified for anomaly indicators, protocol compliance, and anomalous flags."
        },
        {
          "id": "trace-M02-U2-C1-4",
          "label": "SIEM Forwarder Buffer [CDAC-SIEM-PROD]",
          "summary": "Indexed into event search repository within 1.2 seconds with normalized CIM fields."
        }
      ]
    }
  },
  "M02-U2-C2": {
    "chapterId": "M02-U2-C2",
    "chapterTitle": "Ports, TCP and UDP",
    "moduleId": "02",
    "moduleTitle": "Networking Fundamentals",
    "unitId": "M02-U2",
    "unitTitle": "Name and Address Services",
    "mentorContext": "Mentor Ravi walks you through a small CDAC Bengaluru branch network, from a staff laptop to the local switch, gateway, DNS and an internal service.",
    "section2": {
      "title": "Ports, TCP and UDP — Visual Story",
      "visualType": "packet-flow",
      "rawVisualFormat": "Data-Flow Animation",
      "description": "Animate a staff device sending packets through branch network components; use moving dots, large SVG icons, glowing paths, and a clear source-to-destination route. Title: “Ports, TCP and UDP”. Optional one-sentence",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Ports, TCP and UDP — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-03 (10.0.4.32). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-03 | IP: 10.0.4.32 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Animate a staff device sending packets through branch network components; use moving dots, large SVG icons, glowing paths, and a clear source-to-destination route. Title: “Ports, TCP and UDP”. Optional one-sentence Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-03 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M02-U2-C2 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Trace the Signal: Ports, TCP and UDP",
      "type": "packet-trace",
      "rawActivityType": "Packet / Event Tracer",
      "instructions": "Animate Focus: Ports, TCP and UDP. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one viewport.",
      "scenario": "Mentor Ravi walks you through a small CDAC Bengaluru branch network, from a staff laptop to the local switch, gateway, DNS and an internal service.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "trace-M02-U2-C2-1",
          "label": "Ingress Packet at Gateway Router [Host: CDAC-BLR-WS-03]",
          "summary": "Initial TCP handshake packet traversing the perimeter interface with valid checksum."
        },
        {
          "id": "trace-M02-U2-C2-2",
          "label": "Passive TAP Sensor Inspection [Zeek-Perimeter-01]",
          "summary": "Protocol metadata extracted: SSL/TLS handshake certificates and SNI domain inspected."
        },
        {
          "id": "trace-M02-U2-C2-3",
          "label": "Core Switch Port Mirroring [Port 24]",
          "summary": "Payload header verified for anomaly indicators, protocol compliance, and anomalous flags."
        },
        {
          "id": "trace-M02-U2-C2-4",
          "label": "SIEM Forwarder Buffer [CDAC-SIEM-PROD]",
          "summary": "Indexed into event search repository within 1.2 seconds with normalized CIM fields."
        }
      ]
    }
  },
  "M02-U3-C1": {
    "chapterId": "M02-U3-C1",
    "chapterTitle": "Small branch: staff devices, switch, router/firewall, Wi-Fi and shared services",
    "moduleId": "02",
    "moduleTitle": "Networking Fundamentals",
    "unitId": "M02-U3",
    "unitTitle": "Understanding Branch Architecture",
    "mentorContext": "Mentor Ravi walks you through a small CDAC Bengaluru branch network, from a staff laptop to the local switch, gateway, DNS and an internal service.",
    "section2": {
      "title": "Small branch: staff devices, switch, router/firewall, Wi-Fi and shared services — Visual Story",
      "visualType": "packet-flow",
      "rawVisualFormat": "Data-Flow Animation",
      "description": "Animate a staff device sending packets through branch network components; use moving dots, large SVG icons, glowing paths, and a clear source-to-destination route. Title: “Small branch: staff devices, switch, router/firewall,",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Small branch: staff devices, switch, router/firewall, Wi-Fi and shared services — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-12 (10.0.4.41). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-12 | IP: 10.0.4.41 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Animate a staff device sending packets through branch network components; use moving dots, large SVG icons, glowing paths, and a clear source-to-destination route. Title: “Small branch: staff devices, switch, router/firewall, Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-12 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M02-U3-C1 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Trace the Signal: Small branch: staff devices, switch, router/firewall, Wi-Fi and shared services",
      "type": "packet-trace",
      "rawActivityType": "Packet / Event Tracer",
      "instructions": "Animate Focus: Small branch: staff devices, switch, router/firewall, Wi-Fi and shared services. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep",
      "scenario": "Mentor Ravi walks you through a small CDAC Bengaluru branch network, from a staff laptop to the local switch, gateway, DNS and an internal service.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "trace-M02-U3-C1-1",
          "label": "Ingress Packet at Gateway Router [Host: CDAC-BLR-WS-12]",
          "summary": "Initial TCP handshake packet traversing the perimeter interface with valid checksum."
        },
        {
          "id": "trace-M02-U3-C1-2",
          "label": "Passive TAP Sensor Inspection [Zeek-Perimeter-01]",
          "summary": "Protocol metadata extracted: SSL/TLS handshake certificates and SNI domain inspected."
        },
        {
          "id": "trace-M02-U3-C1-3",
          "label": "Core Switch Port Mirroring [Port 24]",
          "summary": "Payload header verified for anomaly indicators, protocol compliance, and anomalous flags."
        },
        {
          "id": "trace-M02-U3-C1-4",
          "label": "SIEM Forwarder Buffer [CDAC-SIEM-PROD]",
          "summary": "Indexed into event search repository within 1.2 seconds with normalized CIM fields."
        }
      ]
    }
  },
  "M02-U3-C2": {
    "chapterId": "M02-U3-C2",
    "chapterTitle": "Larger branch: VLANs, multiple access switches, server/network segments and central connectivity",
    "moduleId": "02",
    "moduleTitle": "Networking Fundamentals",
    "unitId": "M02-U3",
    "unitTitle": "Understanding Branch Architecture",
    "mentorContext": "Mentor Ravi walks you through a small CDAC Bengaluru branch network, from a staff laptop to the local switch, gateway, DNS and an internal service.",
    "section2": {
      "title": "Larger branch: VLANs, multiple access switches, server/network segments and central connectivity — Visual Story",
      "visualType": "packet-flow",
      "rawVisualFormat": "Data-Flow Animation",
      "description": "Animate a staff device sending packets through branch network components; use moving dots, large SVG icons, glowing paths, and a clear source-to-destination route. Title: “Larger branch: VLANs, multiple access switches,",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Larger branch: VLANs, multiple access switches, server/network segments and central connectivity — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-13 (10.0.4.42). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-13 | IP: 10.0.4.42 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Animate a staff device sending packets through branch network components; use moving dots, large SVG icons, glowing paths, and a clear source-to-destination route. Title: “Larger branch: VLANs, multiple access switches, Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-13 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M02-U3-C2 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Trace the Signal: Larger branch: VLANs, multiple access switches, server/network segments and central connectivity",
      "type": "packet-trace",
      "rawActivityType": "Packet / Event Tracer",
      "instructions": "Animate Focus: Larger branch: VLANs, multiple access switches, server/network segments and central connectivity. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling;",
      "scenario": "Mentor Ravi walks you through a small CDAC Bengaluru branch network, from a staff laptop to the local switch, gateway, DNS and an internal service.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "trace-M02-U3-C2-1",
          "label": "Ingress Packet at Gateway Router [Host: CDAC-BLR-WS-13]",
          "summary": "Initial TCP handshake packet traversing the perimeter interface with valid checksum."
        },
        {
          "id": "trace-M02-U3-C2-2",
          "label": "Passive TAP Sensor Inspection [Zeek-Perimeter-01]",
          "summary": "Protocol metadata extracted: SSL/TLS handshake certificates and SNI domain inspected."
        },
        {
          "id": "trace-M02-U3-C2-3",
          "label": "Core Switch Port Mirroring [Port 24]",
          "summary": "Payload header verified for anomaly indicators, protocol compliance, and anomalous flags."
        },
        {
          "id": "trace-M02-U3-C2-4",
          "label": "SIEM Forwarder Buffer [CDAC-SIEM-PROD]",
          "summary": "Indexed into event search repository within 1.2 seconds with normalized CIM fields."
        }
      ]
    }
  },
  "M03-U1-C1": {
    "chapterId": "M03-U1-C1",
    "chapterTitle": "Assets, threats and vulnerabilities",
    "moduleId": "03",
    "moduleTitle": "Cybersecurity Fundamentals",
    "unitId": "M03-U1",
    "unitTitle": "Security Foundations",
    "mentorContext": "Mentor Ananya introduces assets, threats, vulnerabilities, controls and risk using ordinary office and branch scenarios.",
    "section2": {
      "title": "Assets, threats and vulnerabilities — Visual Story",
      "visualType": "diagram",
      "rawVisualFormat": "Concept Visualization",
      "description": "Build a visual metaphor with large SVG objects and animated connections; reveal one concept at a time, use minimal labels, and end on the practical meaning. Title: “Assets, threats and",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Assets, threats and vulnerabilities — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-12 (10.0.4.21). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-12 | IP: 10.0.4.21 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Build a visual metaphor with large SVG objects and animated connections; reveal one concept at a time, use minimal labels, and end on the practical meaning. Title: “Assets, threats and Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-12 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M03-U1-C1 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Reveal the Clues: Assets, threats and vulnerabilities",
      "type": "clue-reveal",
      "rawActivityType": "Clue & Evidence Reveal",
      "instructions": "Show Focus: Assets, threats and vulnerabilities. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one viewport.",
      "scenario": "Mentor Ananya introduces assets, threats, vulnerabilities, controls and risk using ordinary office and branch scenarios.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "clue-M03-U1-C1-1",
          "label": "Host Name & Asset Tag: CDAC-BLR-WS-12",
          "summary": "Confirmed client workstation in CDAC Bengaluru engineering lab segment with standard privileges."
        },
        {
          "id": "clue-M03-U1-C1-2",
          "label": "Process Execution Hierarchy & Parent PID",
          "summary": "Child process spawned under atypical parent, requiring command-line argument verification."
        },
        {
          "id": "clue-M03-U1-C1-3",
          "label": "Normalized UTC Timestamp & Event Frequency",
          "summary": "Event clustered within a 45-second window during non-business hours (02:14:32 UTC)."
        },
        {
          "id": "clue-M03-U1-C1-4",
          "label": "Network Destination & Reputation Confidence",
          "summary": "Outbound egress towards external IP flagged in threat intelligence feeds as suspicious C2 infrastructure."
        }
      ]
    }
  },
  "M03-U1-C2": {
    "chapterId": "M03-U1-C2",
    "chapterTitle": "Risk, impact and likelihood",
    "moduleId": "03",
    "moduleTitle": "Cybersecurity Fundamentals",
    "unitId": "M03-U1",
    "unitTitle": "Security Foundations",
    "mentorContext": "Mentor Ananya introduces assets, threats, vulnerabilities, controls and risk using ordinary office and branch scenarios.",
    "section2": {
      "title": "Risk, impact and likelihood — Visual Story",
      "visualType": "diagram",
      "rawVisualFormat": "Concept Visualization",
      "description": "Build a visual metaphor with large SVG objects and animated connections; reveal one concept at a time, use minimal labels, and end on the practical meaning. Title: “Risk, impact and",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Risk, impact and likelihood — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-13 (10.0.4.22). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-13 | IP: 10.0.4.22 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Build a visual metaphor with large SVG objects and animated connections; reveal one concept at a time, use minimal labels, and end on the practical meaning. Title: “Risk, impact and Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-13 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M03-U1-C2 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Sort the Scenario: Risk, impact and likelihood",
      "type": "sorting",
      "rawActivityType": "Safe / Unsafe Sorter",
      "instructions": "Present Focus: Risk, impact and likelihood. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one viewport.",
      "scenario": "Mentor Ananya introduces assets, threats, vulnerabilities, controls and risk using ordinary office and branch scenarios.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "sort-M03-U1-C2-1",
          "label": "Authorized Scheduled Maintenance on Host: CDAC-BLR-WS-13",
          "category": "Safe / Routine",
          "summary": "Documented IT change window activity verified against internal change request ticket."
        },
        {
          "id": "sort-M03-U1-C2-2",
          "label": "Unauthenticated Ingress Connection via Ephemeral Port",
          "category": "Suspicious / Unsafe",
          "summary": "Incoming network connection without prior session establishment or identity certificate."
        },
        {
          "id": "sort-M03-U1-C2-3",
          "label": "Standard Domain Controller Sync (Host: CDAC-BLR-DC01)",
          "category": "Safe / Routine",
          "summary": "Routine Kerberos ticket granting and LDAP directory replication between authoritative servers."
        },
        {
          "id": "sort-M03-U1-C2-4",
          "label": "Encoded PowerShell Command from Temporary Folder",
          "category": "Suspicious / Unsafe",
          "summary": "Base64 encoded execution launched from AppData\\Local\\Temp by a standard user account."
        }
      ]
    }
  },
  "M03-U2-C1": {
    "chapterId": "M03-U2-C1",
    "chapterTitle": "Phishing and credential attacks",
    "moduleId": "03",
    "moduleTitle": "Cybersecurity Fundamentals",
    "unitId": "M03-U2",
    "unitTitle": "Common Threats",
    "mentorContext": "Mentor Ananya introduces assets, threats, vulnerabilities, controls and risk using ordinary office and branch scenarios.",
    "section2": {
      "title": "Phishing and credential attacks — Visual Story",
      "visualType": "diagram",
      "rawVisualFormat": "Concept Visualization",
      "description": "Build a visual metaphor with large SVG objects and animated connections; reveal one concept at a time, use minimal labels, and end on the practical meaning. Title: “Phishing and credential",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Phishing and credential attacks — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-02 (10.0.4.31). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-02 | IP: 10.0.4.31 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Build a visual metaphor with large SVG objects and animated connections; reveal one concept at a time, use minimal labels, and end on the practical meaning. Title: “Phishing and credential Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-02 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M03-U2-C1 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Reveal the Clues: Phishing and credential attacks",
      "type": "clue-reveal",
      "rawActivityType": "Clue & Evidence Reveal",
      "instructions": "Show Focus: Phishing and credential attacks. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one viewport.",
      "scenario": "Mentor Ananya introduces assets, threats, vulnerabilities, controls and risk using ordinary office and branch scenarios.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "clue-M03-U2-C1-1",
          "label": "Host Name & Asset Tag: CDAC-BLR-WS-02",
          "summary": "Confirmed client workstation in CDAC Bengaluru engineering lab segment with standard privileges."
        },
        {
          "id": "clue-M03-U2-C1-2",
          "label": "Process Execution Hierarchy & Parent PID",
          "summary": "Child process spawned under atypical parent, requiring command-line argument verification."
        },
        {
          "id": "clue-M03-U2-C1-3",
          "label": "Normalized UTC Timestamp & Event Frequency",
          "summary": "Event clustered within a 45-second window during non-business hours (02:14:32 UTC)."
        },
        {
          "id": "clue-M03-U2-C1-4",
          "label": "Network Destination & Reputation Confidence",
          "summary": "Outbound egress towards external IP flagged in threat intelligence feeds as suspicious C2 infrastructure."
        }
      ]
    }
  },
  "M03-U2-C2": {
    "chapterId": "M03-U2-C2",
    "chapterTitle": "Malware, insider and network threats",
    "moduleId": "03",
    "moduleTitle": "Cybersecurity Fundamentals",
    "unitId": "M03-U2",
    "unitTitle": "Common Threats",
    "mentorContext": "Mentor Ananya introduces assets, threats, vulnerabilities, controls and risk using ordinary office and branch scenarios.",
    "section2": {
      "title": "Malware, insider and network threats — Visual Story",
      "visualType": "packet-flow",
      "rawVisualFormat": "Data-Flow Animation",
      "description": "Animate a staff device sending packets through branch network components; use moving dots, large SVG icons, glowing paths, and a clear source-to-destination route. Title: “Malware, insider and network threats”. Optional",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Malware, insider and network threats — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-03 (10.0.4.32). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-03 | IP: 10.0.4.32 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Animate a staff device sending packets through branch network components; use moving dots, large SVG icons, glowing paths, and a clear source-to-destination route. Title: “Malware, insider and network threats”. Optional Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-03 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M03-U2-C2 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Trace the Signal: Malware, insider and network threats",
      "type": "packet-trace",
      "rawActivityType": "Packet / Event Tracer",
      "instructions": "Animate Focus: Malware, insider and network threats. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one",
      "scenario": "Mentor Ananya introduces assets, threats, vulnerabilities, controls and risk using ordinary office and branch scenarios.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "trace-M03-U2-C2-1",
          "label": "Ingress Packet at Gateway Router [Host: CDAC-BLR-WS-03]",
          "summary": "Initial TCP handshake packet traversing the perimeter interface with valid checksum."
        },
        {
          "id": "trace-M03-U2-C2-2",
          "label": "Passive TAP Sensor Inspection [Zeek-Perimeter-01]",
          "summary": "Protocol metadata extracted: SSL/TLS handshake certificates and SNI domain inspected."
        },
        {
          "id": "trace-M03-U2-C2-3",
          "label": "Core Switch Port Mirroring [Port 24]",
          "summary": "Payload header verified for anomaly indicators, protocol compliance, and anomalous flags."
        },
        {
          "id": "trace-M03-U2-C2-4",
          "label": "SIEM Forwarder Buffer [CDAC-SIEM-PROD]",
          "summary": "Indexed into event search repository within 1.2 seconds with normalized CIM fields."
        }
      ]
    }
  },
  "M03-U3-C1": {
    "chapterId": "M03-U3-C1",
    "chapterTitle": "Prevention, detection and response",
    "moduleId": "03",
    "moduleTitle": "Cybersecurity Fundamentals",
    "unitId": "M03-U3",
    "unitTitle": "Defensive Controls",
    "mentorContext": "Mentor Ananya introduces assets, threats, vulnerabilities, controls and risk using ordinary office and branch scenarios.",
    "section2": {
      "title": "Prevention, detection and response — Visual Story",
      "visualType": "interface-tour",
      "rawVisualFormat": "Security Interface Tour",
      "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Prevention, detection and response”. Optional one-sentence",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Prevention, detection and response — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-12 (10.0.4.41). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-12 | IP: 10.0.4.41 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Prevention, detection and response”. Optional one-sentence Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-12 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M03-U3-C1 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Build the Flow: Prevention, detection and response",
      "type": "drag-drop",
      "rawActivityType": "Drag-and-Drop Workflow",
      "instructions": "Provide Focus: Prevention, detection and response. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one viewport.",
      "scenario": "Mentor Ananya introduces assets, threats, vulnerabilities, controls and risk using ordinary office and branch scenarios.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "step-M03-U3-C1-1",
          "label": "Step 1: Alert Ingestion & Queue Assignment",
          "summary": "Acknowledge incoming telemetry in the SIEM alert queue and assign ticket to active shift analyst."
        },
        {
          "id": "step-M03-U3-C1-2",
          "label": "Step 2: Entity Identification & Asset Context",
          "summary": "Identify the 5 Ws: Affected Host Name, Source IP, User Account, and Network Segment."
        },
        {
          "id": "step-M03-U3-C1-3",
          "label": "Step 3: Playbook Verification & False Positive Filter",
          "summary": "Validate against known baseline exceptions, standard maintenance windows, and SOP criteria."
        },
        {
          "id": "step-M03-U3-C1-4",
          "label": "Step 4: Ticket Disposition & Escalation Handoff",
          "summary": "Document exact findings with verified evidence, set severity disposition, and escalate to L2."
        }
      ]
    }
  },
  "M03-U3-C2": {
    "chapterId": "M03-U3-C2",
    "chapterTitle": "Least privilege and defense in depth",
    "moduleId": "03",
    "moduleTitle": "Cybersecurity Fundamentals",
    "unitId": "M03-U3",
    "unitTitle": "Defensive Controls",
    "mentorContext": "Mentor Ananya introduces assets, threats, vulnerabilities, controls and risk using ordinary office and branch scenarios.",
    "section2": {
      "title": "Least privilege and defense in depth — Visual Story",
      "visualType": "diagram",
      "rawVisualFormat": "Concept Visualization",
      "description": "Build a visual metaphor with large SVG objects and animated connections; reveal one concept at a time, use minimal labels, and end on the practical meaning. Title: “Least privilege and",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Least privilege and defense in depth — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-13 (10.0.4.42). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-13 | IP: 10.0.4.42 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Build a visual metaphor with large SVG objects and animated connections; reveal one concept at a time, use minimal labels, and end on the practical meaning. Title: “Least privilege and Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-13 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M03-U3-C2 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Sort the Scenario: Least privilege and defense in depth",
      "type": "sorting",
      "rawActivityType": "Safe / Unsafe Sorter",
      "instructions": "Present Focus: Least privilege and defense in depth. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within",
      "scenario": "Mentor Ananya introduces assets, threats, vulnerabilities, controls and risk using ordinary office and branch scenarios.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "sort-M03-U3-C2-1",
          "label": "Authorized Scheduled Maintenance on Host: CDAC-BLR-WS-13",
          "category": "Safe / Routine",
          "summary": "Documented IT change window activity verified against internal change request ticket."
        },
        {
          "id": "sort-M03-U3-C2-2",
          "label": "Unauthenticated Ingress Connection via Ephemeral Port",
          "category": "Suspicious / Unsafe",
          "summary": "Incoming network connection without prior session establishment or identity certificate."
        },
        {
          "id": "sort-M03-U3-C2-3",
          "label": "Standard Domain Controller Sync (Host: CDAC-BLR-DC01)",
          "category": "Safe / Routine",
          "summary": "Routine Kerberos ticket granting and LDAP directory replication between authoritative servers."
        },
        {
          "id": "sort-M03-U3-C2-4",
          "label": "Encoded PowerShell Command from Temporary Folder",
          "category": "Suspicious / Unsafe",
          "summary": "Base64 encoded execution launched from AppData\\Local\\Temp by a standard user account."
        }
      ]
    }
  },
  "M04-U1-C1": {
    "chapterId": "M04-U1-C1",
    "chapterTitle": "L1/L2/L3 roles and mentor handoffs",
    "moduleId": "04",
    "moduleTitle": "SOC Operations & Alert Triage",
    "unitId": "M04-U1",
    "unitTitle": "SOC People and Workflow",
    "mentorContext": "Mentor Ananya coaches you through an alert involving employee user FIN-OPS-01 on BLR-BR-WS-04. You identify entities, check evidence, judge context, set a priority and write an L1 note.",
    "section2": {
      "title": "L1/L2/L3 roles and mentor handoffs — Visual Story",
      "visualType": "animated-story",
      "rawVisualFormat": "Animated Workflow",
      "description": "Animate the analyst moving through the workflow using large character and tool icons; each step lights up, transitions smoothly, and ends with the resulting status. Title: “L1/L2/L3 roles and mentor",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "L1/L2/L3 roles and mentor handoffs — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-12 (10.0.4.21). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-12 | IP: 10.0.4.21 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Animate the analyst moving through the workflow using large character and tool icons; each step lights up, transitions smoothly, and ends with the resulting status. Title: “L1/L2/L3 roles and mentor Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-12 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M04-U1-C1 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Build the Flow: L1/L2/L3 roles and mentor handoffs",
      "type": "drag-drop",
      "rawActivityType": "Drag-and-Drop Workflow",
      "instructions": "Provide Focus: L1/L2/L3 roles and mentor handoffs. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one",
      "scenario": "Mentor Ananya coaches you through an alert involving employee user FIN-OPS-01 on BLR-BR-WS-04. You identify entities, check evidence, judge context, set a priority and write an L1 note.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "step-M04-U1-C1-1",
          "label": "Step 1: Alert Ingestion & Queue Assignment",
          "summary": "Acknowledge incoming telemetry in the SIEM alert queue and assign ticket to active shift analyst."
        },
        {
          "id": "step-M04-U1-C1-2",
          "label": "Step 2: Entity Identification & Asset Context",
          "summary": "Identify the 5 Ws: Affected Host Name, Source IP, User Account, and Network Segment."
        },
        {
          "id": "step-M04-U1-C1-3",
          "label": "Step 3: Playbook Verification & False Positive Filter",
          "summary": "Validate against known baseline exceptions, standard maintenance windows, and SOP criteria."
        },
        {
          "id": "step-M04-U1-C1-4",
          "label": "Step 4: Ticket Disposition & Escalation Handoff",
          "summary": "Document exact findings with verified evidence, set severity disposition, and escalate to L2."
        }
      ]
    }
  },
  "M04-U1-C2": {
    "chapterId": "M04-U1-C2",
    "chapterTitle": "Alert queue, triage and ownership",
    "moduleId": "04",
    "moduleTitle": "SOC Operations & Alert Triage",
    "unitId": "M04-U1",
    "unitTitle": "SOC People and Workflow",
    "mentorContext": "Mentor Ananya coaches you through an alert involving employee user FIN-OPS-01 on BLR-BR-WS-04. You identify entities, check evidence, judge context, set a priority and write an L1 note.",
    "section2": {
      "title": "Alert queue, triage and ownership — Visual Story",
      "visualType": "interface-tour",
      "rawVisualFormat": "Security Interface Tour",
      "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Alert queue, triage and ownership”. Optional",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Alert queue, triage and ownership — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-13 (10.0.4.22). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-13 | IP: 10.0.4.22 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Alert queue, triage and ownership”. Optional Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-13 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M04-U1-C2 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Build the Flow: Alert queue, triage and ownership",
      "type": "drag-drop",
      "rawActivityType": "Drag-and-Drop Workflow",
      "instructions": "Provide Focus: Alert queue, triage and ownership. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one",
      "scenario": "Mentor Ananya coaches you through an alert involving employee user FIN-OPS-01 on BLR-BR-WS-04. You identify entities, check evidence, judge context, set a priority and write an L1 note.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "step-M04-U1-C2-1",
          "label": "Step 1: Alert Ingestion & Queue Assignment",
          "summary": "Acknowledge incoming telemetry in the SIEM alert queue and assign ticket to active shift analyst."
        },
        {
          "id": "step-M04-U1-C2-2",
          "label": "Step 2: Entity Identification & Asset Context",
          "summary": "Identify the 5 Ws: Affected Host Name, Source IP, User Account, and Network Segment."
        },
        {
          "id": "step-M04-U1-C2-3",
          "label": "Step 3: Playbook Verification & False Positive Filter",
          "summary": "Validate against known baseline exceptions, standard maintenance windows, and SOP criteria."
        },
        {
          "id": "step-M04-U1-C2-4",
          "label": "Step 4: Ticket Disposition & Escalation Handoff",
          "summary": "Document exact findings with verified evidence, set severity disposition, and escalate to L2."
        }
      ]
    }
  },
  "M04-U2-C1": {
    "chapterId": "M04-U2-C1",
    "chapterTitle": "Event versus alert",
    "moduleId": "04",
    "moduleTitle": "SOC Operations & Alert Triage",
    "unitId": "M04-U2",
    "unitTitle": "Events, Alerts and Cases",
    "mentorContext": "Mentor Ananya coaches you through an alert involving employee user FIN-OPS-01 on BLR-BR-WS-04. You identify entities, check evidence, judge context, set a priority and write an L1 note.",
    "section2": {
      "title": "Event versus alert — Visual Story",
      "visualType": "interface-tour",
      "rawVisualFormat": "Security Interface Tour",
      "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Event versus alert”. Optional one-sentence description",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Event versus alert — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-02 (10.0.4.31). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-02 | IP: 10.0.4.31 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Event versus alert”. Optional one-sentence description Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-02 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M04-U2-C1 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Build the Flow: Event versus alert",
      "type": "drag-drop",
      "rawActivityType": "Drag-and-Drop Workflow",
      "instructions": "Provide large Focus: Event versus alert. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one viewport.",
      "scenario": "Mentor Ananya coaches you through an alert involving employee user FIN-OPS-01 on BLR-BR-WS-04. You identify entities, check evidence, judge context, set a priority and write an L1 note.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "step-M04-U2-C1-1",
          "label": "Step 1: Alert Ingestion & Queue Assignment",
          "summary": "Acknowledge incoming telemetry in the SIEM alert queue and assign ticket to active shift analyst."
        },
        {
          "id": "step-M04-U2-C1-2",
          "label": "Step 2: Entity Identification & Asset Context",
          "summary": "Identify the 5 Ws: Affected Host Name, Source IP, User Account, and Network Segment."
        },
        {
          "id": "step-M04-U2-C1-3",
          "label": "Step 3: Playbook Verification & False Positive Filter",
          "summary": "Validate against known baseline exceptions, standard maintenance windows, and SOP criteria."
        },
        {
          "id": "step-M04-U2-C1-4",
          "label": "Step 4: Ticket Disposition & Escalation Handoff",
          "summary": "Document exact findings with verified evidence, set severity disposition, and escalate to L2."
        }
      ]
    }
  },
  "M04-U2-C2": {
    "chapterId": "M04-U2-C2",
    "chapterTitle": "Incident versus case",
    "moduleId": "04",
    "moduleTitle": "SOC Operations & Alert Triage",
    "unitId": "M04-U2",
    "unitTitle": "Events, Alerts and Cases",
    "mentorContext": "Mentor Ananya coaches you through an alert involving employee user FIN-OPS-01 on BLR-BR-WS-04. You identify entities, check evidence, judge context, set a priority and write an L1 note.",
    "section2": {
      "title": "Incident versus case — Visual Story",
      "visualType": "interface-tour",
      "rawVisualFormat": "Security Interface Tour",
      "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Incident versus case”. Optional one-sentence description",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Incident versus case — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-03 (10.0.4.32). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-03 | IP: 10.0.4.32 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Incident versus case”. Optional one-sentence description Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-03 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M04-U2-C2 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Build the Flow: Incident versus case",
      "type": "drag-drop",
      "rawActivityType": "Drag-and-Drop Workflow",
      "instructions": "Provide large Focus: Incident versus case. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one viewport.",
      "scenario": "Mentor Ananya coaches you through an alert involving employee user FIN-OPS-01 on BLR-BR-WS-04. You identify entities, check evidence, judge context, set a priority and write an L1 note.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "step-M04-U2-C2-1",
          "label": "Step 1: Alert Ingestion & Queue Assignment",
          "summary": "Acknowledge incoming telemetry in the SIEM alert queue and assign ticket to active shift analyst."
        },
        {
          "id": "step-M04-U2-C2-2",
          "label": "Step 2: Entity Identification & Asset Context",
          "summary": "Identify the 5 Ws: Affected Host Name, Source IP, User Account, and Network Segment."
        },
        {
          "id": "step-M04-U2-C2-3",
          "label": "Step 3: Playbook Verification & False Positive Filter",
          "summary": "Validate against known baseline exceptions, standard maintenance windows, and SOP criteria."
        },
        {
          "id": "step-M04-U2-C2-4",
          "label": "Step 4: Ticket Disposition & Escalation Handoff",
          "summary": "Document exact findings with verified evidence, set severity disposition, and escalate to L2."
        }
      ]
    }
  },
  "M04-U3-C1": {
    "chapterId": "M04-U3-C1",
    "chapterTitle": "Identify user, host, IP, time and count",
    "moduleId": "04",
    "moduleTitle": "SOC Operations & Alert Triage",
    "unitId": "M04-U3",
    "unitTitle": "Initial Alert Triage",
    "mentorContext": "Mentor Ananya coaches you through an alert involving employee user FIN-OPS-01 on BLR-BR-WS-04. You identify entities, check evidence, judge context, set a priority and write an L1 note.",
    "section2": {
      "title": "Identify user, host, IP, time and count — Visual Story",
      "visualType": "interface-tour",
      "rawVisualFormat": "Security Interface Tour",
      "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Identify user, host, IP, time and",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Identify user, host, IP, time and count — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-12 (10.0.4.41). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-12 | IP: 10.0.4.41 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Identify user, host, IP, time and Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-12 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M04-U3-C1 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Reveal the Clues: Identify user, host, IP, time and count",
      "type": "clue-reveal",
      "rawActivityType": "Clue & Evidence Reveal",
      "instructions": "Show Focus: Identify user, host, IP, time and count. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity",
      "scenario": "Mentor Ananya coaches you through an alert involving employee user FIN-OPS-01 on BLR-BR-WS-04. You identify entities, check evidence, judge context, set a priority and write an L1 note.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "clue-M04-U3-C1-1",
          "label": "Host Name & Asset Tag: CDAC-BLR-WS-12",
          "summary": "Confirmed client workstation in CDAC Bengaluru engineering lab segment with standard privileges."
        },
        {
          "id": "clue-M04-U3-C1-2",
          "label": "Process Execution Hierarchy & Parent PID",
          "summary": "Child process spawned under atypical parent, requiring command-line argument verification."
        },
        {
          "id": "clue-M04-U3-C1-3",
          "label": "Normalized UTC Timestamp & Event Frequency",
          "summary": "Event clustered within a 45-second window during non-business hours (02:14:32 UTC)."
        },
        {
          "id": "clue-M04-U3-C1-4",
          "label": "Network Destination & Reputation Confidence",
          "summary": "Outbound egress towards external IP flagged in threat intelligence feeds as suspicious C2 infrastructure."
        }
      ]
    }
  },
  "M04-U3-C2": {
    "chapterId": "M04-U3-C2",
    "chapterTitle": "Context, disposition and analyst notes",
    "moduleId": "04",
    "moduleTitle": "SOC Operations & Alert Triage",
    "unitId": "M04-U3",
    "unitTitle": "Initial Alert Triage",
    "mentorContext": "Mentor Ananya coaches you through an alert involving employee user FIN-OPS-01 on BLR-BR-WS-04. You identify entities, check evidence, judge context, set a priority and write an L1 note.",
    "section2": {
      "title": "Context, disposition and analyst notes — Visual Story",
      "visualType": "interface-tour",
      "rawVisualFormat": "Security Interface Tour",
      "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Context, disposition and analyst notes”. Optional",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Context, disposition and analyst notes — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-13 (10.0.4.42). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-13 | IP: 10.0.4.42 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Context, disposition and analyst notes”. Optional Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-13 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M04-U3-C2 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Reveal the Clues: Context, disposition and analyst notes",
      "type": "clue-reveal",
      "rawActivityType": "Clue & Evidence Reveal",
      "instructions": "Show Focus: Context, disposition and analyst notes. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one",
      "scenario": "Mentor Ananya coaches you through an alert involving employee user FIN-OPS-01 on BLR-BR-WS-04. You identify entities, check evidence, judge context, set a priority and write an L1 note.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "clue-M04-U3-C2-1",
          "label": "Host Name & Asset Tag: CDAC-BLR-WS-13",
          "summary": "Confirmed client workstation in CDAC Bengaluru engineering lab segment with standard privileges."
        },
        {
          "id": "clue-M04-U3-C2-2",
          "label": "Process Execution Hierarchy & Parent PID",
          "summary": "Child process spawned under atypical parent, requiring command-line argument verification."
        },
        {
          "id": "clue-M04-U3-C2-3",
          "label": "Normalized UTC Timestamp & Event Frequency",
          "summary": "Event clustered within a 45-second window during non-business hours (02:14:32 UTC)."
        },
        {
          "id": "clue-M04-U3-C2-4",
          "label": "Network Destination & Reputation Confidence",
          "summary": "Outbound egress towards external IP flagged in threat intelligence feeds as suspicious C2 infrastructure."
        }
      ]
    }
  },
  "M05-U1-C1": {
    "chapterId": "M05-U1-C1",
    "chapterTitle": "What SIEM does and does not do",
    "moduleId": "05",
    "moduleTitle": "SIEM Fundamentals & Search",
    "unitId": "M05-U1",
    "unitTitle": "SIEM Purpose and Data",
    "mentorContext": "Mentor Karthik, a senior L1/SIEM operator, shows how branch logs reach a SIEM, how to search them and how detections surface for analysts.",
    "section2": {
      "title": "What SIEM does and does not do — Visual Story",
      "visualType": "interface-tour",
      "rawVisualFormat": "Security Interface Tour",
      "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “What SIEM does and does not",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "What SIEM does and does not do — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-12 (10.0.4.21). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-12 | IP: 10.0.4.21 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “What SIEM does and does not Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-12 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M05-U1-C1 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Reveal the Clues: What SIEM does and does not do",
      "type": "clue-reveal",
      "rawActivityType": "Clue & Evidence Reveal",
      "instructions": "Show Focus: What SIEM does and does not do. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity",
      "scenario": "Mentor Karthik, a senior L1/SIEM operator, shows how branch logs reach a SIEM, how to search them and how detections surface for analysts.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "clue-M05-U1-C1-1",
          "label": "Host Name & Asset Tag: CDAC-BLR-WS-12",
          "summary": "Confirmed client workstation in CDAC Bengaluru engineering lab segment with standard privileges."
        },
        {
          "id": "clue-M05-U1-C1-2",
          "label": "Process Execution Hierarchy & Parent PID",
          "summary": "Child process spawned under atypical parent, requiring command-line argument verification."
        },
        {
          "id": "clue-M05-U1-C1-3",
          "label": "Normalized UTC Timestamp & Event Frequency",
          "summary": "Event clustered within a 45-second window during non-business hours (02:14:32 UTC)."
        },
        {
          "id": "clue-M05-U1-C1-4",
          "label": "Network Destination & Reputation Confidence",
          "summary": "Outbound egress towards external IP flagged in threat intelligence feeds as suspicious C2 infrastructure."
        }
      ]
    }
  },
  "M05-U1-C2": {
    "chapterId": "M05-U1-C2",
    "chapterTitle": "Log sources and ingestion concepts",
    "moduleId": "05",
    "moduleTitle": "SIEM Fundamentals & Search",
    "unitId": "M05-U1",
    "unitTitle": "SIEM Purpose and Data",
    "mentorContext": "Mentor Karthik, a senior L1/SIEM operator, shows how branch logs reach a SIEM, how to search them and how detections surface for analysts.",
    "section2": {
      "title": "Log sources and ingestion concepts — Visual Story",
      "visualType": "interface-tour",
      "rawVisualFormat": "Security Interface Tour",
      "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Log sources and ingestion concepts”. Optional",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Log sources and ingestion concepts — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-13 (10.0.4.22). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-13 | IP: 10.0.4.22 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Log sources and ingestion concepts”. Optional Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-13 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M05-U1-C2 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Reveal the Clues: Log sources and ingestion concepts",
      "type": "clue-reveal",
      "rawActivityType": "Clue & Evidence Reveal",
      "instructions": "Show Focus: Log sources and ingestion concepts. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one",
      "scenario": "Mentor Karthik, a senior L1/SIEM operator, shows how branch logs reach a SIEM, how to search them and how detections surface for analysts.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "clue-M05-U1-C2-1",
          "label": "Host Name & Asset Tag: CDAC-BLR-WS-13",
          "summary": "Confirmed client workstation in CDAC Bengaluru engineering lab segment with standard privileges."
        },
        {
          "id": "clue-M05-U1-C2-2",
          "label": "Process Execution Hierarchy & Parent PID",
          "summary": "Child process spawned under atypical parent, requiring command-line argument verification."
        },
        {
          "id": "clue-M05-U1-C2-3",
          "label": "Normalized UTC Timestamp & Event Frequency",
          "summary": "Event clustered within a 45-second window during non-business hours (02:14:32 UTC)."
        },
        {
          "id": "clue-M05-U1-C2-4",
          "label": "Network Destination & Reputation Confidence",
          "summary": "Outbound egress towards external IP flagged in threat intelligence feeds as suspicious C2 infrastructure."
        }
      ]
    }
  },
  "M05-U2-C1": {
    "chapterId": "M05-U2-C1",
    "chapterTitle": "Fields, time ranges and filters",
    "moduleId": "05",
    "moduleTitle": "SIEM Fundamentals & Search",
    "unitId": "M05-U2",
    "unitTitle": "Searching and Filtering",
    "mentorContext": "Mentor Karthik, a senior L1/SIEM operator, shows how branch logs reach a SIEM, how to search them and how detections surface for analysts.",
    "section2": {
      "title": "Fields, time ranges and filters — Visual Story",
      "visualType": "interface-tour",
      "rawVisualFormat": "Security Interface Tour",
      "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Fields, time ranges and filters”. Optional",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Fields, time ranges and filters — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-02 (10.0.4.31). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-02 | IP: 10.0.4.31 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Fields, time ranges and filters”. Optional Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-02 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M05-U2-C1 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Reveal the Clues: Fields, time ranges and filters",
      "type": "clue-reveal",
      "rawActivityType": "Clue & Evidence Reveal",
      "instructions": "Show Focus: Fields, time ranges and filters. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one",
      "scenario": "Mentor Karthik, a senior L1/SIEM operator, shows how branch logs reach a SIEM, how to search them and how detections surface for analysts.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "clue-M05-U2-C1-1",
          "label": "Host Name & Asset Tag: CDAC-BLR-WS-02",
          "summary": "Confirmed client workstation in CDAC Bengaluru engineering lab segment with standard privileges."
        },
        {
          "id": "clue-M05-U2-C1-2",
          "label": "Process Execution Hierarchy & Parent PID",
          "summary": "Child process spawned under atypical parent, requiring command-line argument verification."
        },
        {
          "id": "clue-M05-U2-C1-3",
          "label": "Normalized UTC Timestamp & Event Frequency",
          "summary": "Event clustered within a 45-second window during non-business hours (02:14:32 UTC)."
        },
        {
          "id": "clue-M05-U2-C1-4",
          "label": "Network Destination & Reputation Confidence",
          "summary": "Outbound egress towards external IP flagged in threat intelligence feeds as suspicious C2 infrastructure."
        }
      ]
    }
  },
  "M05-U2-C2": {
    "chapterId": "M05-U2-C2",
    "chapterTitle": "Basic query logic",
    "moduleId": "05",
    "moduleTitle": "SIEM Fundamentals & Search",
    "unitId": "M05-U2",
    "unitTitle": "Searching and Filtering",
    "mentorContext": "Mentor Karthik, a senior L1/SIEM operator, shows how branch logs reach a SIEM, how to search them and how detections surface for analysts.",
    "section2": {
      "title": "Basic query logic — Visual Story",
      "visualType": "interface-tour",
      "rawVisualFormat": "Security Interface Tour",
      "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Basic query logic”. Optional one-sentence description",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Basic query logic — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-03 (10.0.4.32). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-03 | IP: 10.0.4.32 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Basic query logic”. Optional one-sentence description Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-03 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M05-U2-C2 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Reveal the Clues: Basic query logic",
      "type": "clue-reveal",
      "rawActivityType": "Clue & Evidence Reveal",
      "instructions": "Show a Focus: Basic query logic. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one viewport.",
      "scenario": "Mentor Karthik, a senior L1/SIEM operator, shows how branch logs reach a SIEM, how to search them and how detections surface for analysts.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "clue-M05-U2-C2-1",
          "label": "Host Name & Asset Tag: CDAC-BLR-WS-03",
          "summary": "Confirmed client workstation in CDAC Bengaluru engineering lab segment with standard privileges."
        },
        {
          "id": "clue-M05-U2-C2-2",
          "label": "Process Execution Hierarchy & Parent PID",
          "summary": "Child process spawned under atypical parent, requiring command-line argument verification."
        },
        {
          "id": "clue-M05-U2-C2-3",
          "label": "Normalized UTC Timestamp & Event Frequency",
          "summary": "Event clustered within a 45-second window during non-business hours (02:14:32 UTC)."
        },
        {
          "id": "clue-M05-U2-C2-4",
          "label": "Network Destination & Reputation Confidence",
          "summary": "Outbound egress towards external IP flagged in threat intelligence feeds as suspicious C2 infrastructure."
        }
      ]
    }
  },
  "M05-U3-C1": {
    "chapterId": "M05-U3-C1",
    "chapterTitle": "Rules, correlation and alert output",
    "moduleId": "05",
    "moduleTitle": "SIEM Fundamentals & Search",
    "unitId": "M05-U3",
    "unitTitle": "Detection and Use Cases",
    "mentorContext": "Mentor Karthik, a senior L1/SIEM operator, shows how branch logs reach a SIEM, how to search them and how detections surface for analysts.",
    "section2": {
      "title": "Rules, correlation and alert output — Visual Story",
      "visualType": "interface-tour",
      "rawVisualFormat": "Security Interface Tour",
      "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Rules, correlation and alert output”. Optional",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Rules, correlation and alert output — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-12 (10.0.4.41). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-12 | IP: 10.0.4.41 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Rules, correlation and alert output”. Optional Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-12 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M05-U3-C1 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Build the Flow: Rules, correlation and alert output",
      "type": "drag-drop",
      "rawActivityType": "Drag-and-Drop Workflow",
      "instructions": "Provide Focus: Rules, correlation and alert output. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one",
      "scenario": "Mentor Karthik, a senior L1/SIEM operator, shows how branch logs reach a SIEM, how to search them and how detections surface for analysts.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "step-M05-U3-C1-1",
          "label": "Step 1: Alert Ingestion & Queue Assignment",
          "summary": "Acknowledge incoming telemetry in the SIEM alert queue and assign ticket to active shift analyst."
        },
        {
          "id": "step-M05-U3-C1-2",
          "label": "Step 2: Entity Identification & Asset Context",
          "summary": "Identify the 5 Ws: Affected Host Name, Source IP, User Account, and Network Segment."
        },
        {
          "id": "step-M05-U3-C1-3",
          "label": "Step 3: Playbook Verification & False Positive Filter",
          "summary": "Validate against known baseline exceptions, standard maintenance windows, and SOP criteria."
        },
        {
          "id": "step-M05-U3-C1-4",
          "label": "Step 4: Ticket Disposition & Escalation Handoff",
          "summary": "Document exact findings with verified evidence, set severity disposition, and escalate to L2."
        }
      ]
    }
  },
  "M05-U3-C2": {
    "chapterId": "M05-U3-C2",
    "chapterTitle": "Application, identity, host, network and compliance examples",
    "moduleId": "05",
    "moduleTitle": "SIEM Fundamentals & Search",
    "unitId": "M05-U3",
    "unitTitle": "Detection and Use Cases",
    "mentorContext": "Mentor Karthik, a senior L1/SIEM operator, shows how branch logs reach a SIEM, how to search them and how detections surface for analysts.",
    "section2": {
      "title": "Application, identity, host, network and compliance examples — Visual Story",
      "visualType": "packet-flow",
      "rawVisualFormat": "Data-Flow Animation",
      "description": "Animate a staff device sending packets through branch network components; use moving dots, large SVG icons, glowing paths, and a clear source-to-destination route. Title: “Application, identity, host, network and compliance",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Application, identity, host, network and compliance examples — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-13 (10.0.4.42). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-13 | IP: 10.0.4.42 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Animate a staff device sending packets through branch network components; use moving dots, large SVG icons, glowing paths, and a clear source-to-destination route. Title: “Application, identity, host, network and compliance Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-13 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M05-U3-C2 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Trace the Signal: Application, identity, host, network and compliance examples",
      "type": "packet-trace",
      "rawActivityType": "Packet / Event Tracer",
      "instructions": "Animate Focus: Application, identity, host, network and compliance examples. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity",
      "scenario": "Mentor Karthik, a senior L1/SIEM operator, shows how branch logs reach a SIEM, how to search them and how detections surface for analysts.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "trace-M05-U3-C2-1",
          "label": "Ingress Packet at Gateway Router [Host: CDAC-BLR-WS-13]",
          "summary": "Initial TCP handshake packet traversing the perimeter interface with valid checksum."
        },
        {
          "id": "trace-M05-U3-C2-2",
          "label": "Passive TAP Sensor Inspection [Zeek-Perimeter-01]",
          "summary": "Protocol metadata extracted: SSL/TLS handshake certificates and SNI domain inspected."
        },
        {
          "id": "trace-M05-U3-C2-3",
          "label": "Core Switch Port Mirroring [Port 24]",
          "summary": "Payload header verified for anomaly indicators, protocol compliance, and anomalous flags."
        },
        {
          "id": "trace-M05-U3-C2-4",
          "label": "SIEM Forwarder Buffer [CDAC-SIEM-PROD]",
          "summary": "Indexed into event search repository within 1.2 seconds with normalized CIM fields."
        }
      ]
    }
  },
  "M06-U1-C1": {
    "chapterId": "M06-U1-C1",
    "chapterTitle": "Timestamp, source, fields and outcome",
    "moduleId": "06",
    "moduleTitle": "Log & Event Analysis",
    "unitId": "M06-U1",
    "unitTitle": "Reading Log Records",
    "mentorContext": "Mentor Karthik helps you compare Windows, Linux, identity and network records, build a basic timeline and distinguish observed facts from assumptions.",
    "section2": {
      "title": "Timestamp, source, fields and outcome — Visual Story",
      "visualType": "interface-tour",
      "rawVisualFormat": "Security Interface Tour",
      "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Timestamp, source, fields and outcome”. Optional",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Timestamp, source, fields and outcome — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-12 (10.0.4.21). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-12 | IP: 10.0.4.21 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Timestamp, source, fields and outcome”. Optional Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-12 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M06-U1-C1 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Reveal the Clues: Timestamp, source, fields and outcome",
      "type": "clue-reveal",
      "rawActivityType": "Clue & Evidence Reveal",
      "instructions": "Show Focus: Timestamp, source, fields and outcome. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one",
      "scenario": "Mentor Karthik helps you compare Windows, Linux, identity and network records, build a basic timeline and distinguish observed facts from assumptions.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "clue-M06-U1-C1-1",
          "label": "Host Name & Asset Tag: CDAC-BLR-WS-12",
          "summary": "Confirmed client workstation in CDAC Bengaluru engineering lab segment with standard privileges."
        },
        {
          "id": "clue-M06-U1-C1-2",
          "label": "Process Execution Hierarchy & Parent PID",
          "summary": "Child process spawned under atypical parent, requiring command-line argument verification."
        },
        {
          "id": "clue-M06-U1-C1-3",
          "label": "Normalized UTC Timestamp & Event Frequency",
          "summary": "Event clustered within a 45-second window during non-business hours (02:14:32 UTC)."
        },
        {
          "id": "clue-M06-U1-C1-4",
          "label": "Network Destination & Reputation Confidence",
          "summary": "Outbound egress towards external IP flagged in threat intelligence feeds as suspicious C2 infrastructure."
        }
      ]
    }
  },
  "M06-U1-C2": {
    "chapterId": "M06-U1-C2",
    "chapterTitle": "Parsing and normalization concepts",
    "moduleId": "06",
    "moduleTitle": "Log & Event Analysis",
    "unitId": "M06-U1",
    "unitTitle": "Reading Log Records",
    "mentorContext": "Mentor Karthik helps you compare Windows, Linux, identity and network records, build a basic timeline and distinguish observed facts from assumptions.",
    "section2": {
      "title": "Parsing and normalization concepts — Visual Story",
      "visualType": "interface-tour",
      "rawVisualFormat": "Security Interface Tour",
      "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Parsing and normalization concepts”. Optional one-sentence",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Parsing and normalization concepts — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-13 (10.0.4.22). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-13 | IP: 10.0.4.22 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Parsing and normalization concepts”. Optional one-sentence Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-13 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M06-U1-C2 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Reveal the Clues: Parsing and normalization concepts",
      "type": "clue-reveal",
      "rawActivityType": "Clue & Evidence Reveal",
      "instructions": "Show Focus: Parsing and normalization concepts. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one viewport.",
      "scenario": "Mentor Karthik helps you compare Windows, Linux, identity and network records, build a basic timeline and distinguish observed facts from assumptions.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "clue-M06-U1-C2-1",
          "label": "Host Name & Asset Tag: CDAC-BLR-WS-13",
          "summary": "Confirmed client workstation in CDAC Bengaluru engineering lab segment with standard privileges."
        },
        {
          "id": "clue-M06-U1-C2-2",
          "label": "Process Execution Hierarchy & Parent PID",
          "summary": "Child process spawned under atypical parent, requiring command-line argument verification."
        },
        {
          "id": "clue-M06-U1-C2-3",
          "label": "Normalized UTC Timestamp & Event Frequency",
          "summary": "Event clustered within a 45-second window during non-business hours (02:14:32 UTC)."
        },
        {
          "id": "clue-M06-U1-C2-4",
          "label": "Network Destination & Reputation Confidence",
          "summary": "Outbound egress towards external IP flagged in threat intelligence feeds as suspicious C2 infrastructure."
        }
      ]
    }
  },
  "M06-U2-C1": {
    "chapterId": "M06-U2-C1",
    "chapterTitle": "Build a simple timeline",
    "moduleId": "06",
    "moduleTitle": "Log & Event Analysis",
    "unitId": "M06-U2",
    "unitTitle": "Correlating Basic Events",
    "mentorContext": "Mentor Karthik helps you compare Windows, Linux, identity and network records, build a basic timeline and distinguish observed facts from assumptions.",
    "section2": {
      "title": "Build a simple timeline — Visual Story",
      "visualType": "interface-tour",
      "rawVisualFormat": "Security Interface Tour",
      "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Build a simple timeline”. Optional one-sentence",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Build a simple timeline — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-02 (10.0.4.31). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-02 | IP: 10.0.4.31 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Build a simple timeline”. Optional one-sentence Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-02 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M06-U2-C1 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Trace the Signal: Build a simple timeline",
      "type": "packet-trace",
      "rawActivityType": "Packet / Event Tracer",
      "instructions": "Animate Focus: Build a simple timeline. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one viewport.",
      "scenario": "Mentor Karthik helps you compare Windows, Linux, identity and network records, build a basic timeline and distinguish observed facts from assumptions.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "trace-M06-U2-C1-1",
          "label": "Ingress Packet at Gateway Router [Host: CDAC-BLR-WS-02]",
          "summary": "Initial TCP handshake packet traversing the perimeter interface with valid checksum."
        },
        {
          "id": "trace-M06-U2-C1-2",
          "label": "Passive TAP Sensor Inspection [Zeek-Perimeter-01]",
          "summary": "Protocol metadata extracted: SSL/TLS handshake certificates and SNI domain inspected."
        },
        {
          "id": "trace-M06-U2-C1-3",
          "label": "Core Switch Port Mirroring [Port 24]",
          "summary": "Payload header verified for anomaly indicators, protocol compliance, and anomalous flags."
        },
        {
          "id": "trace-M06-U2-C1-4",
          "label": "SIEM Forwarder Buffer [CDAC-SIEM-PROD]",
          "summary": "Indexed into event search repository within 1.2 seconds with normalized CIM fields."
        }
      ]
    }
  },
  "M06-U2-C2": {
    "chapterId": "M06-U2-C2",
    "chapterTitle": "Compare related records across sources",
    "moduleId": "06",
    "moduleTitle": "Log & Event Analysis",
    "unitId": "M06-U2",
    "unitTitle": "Correlating Basic Events",
    "mentorContext": "Mentor Karthik helps you compare Windows, Linux, identity and network records, build a basic timeline and distinguish observed facts from assumptions.",
    "section2": {
      "title": "Compare related records across sources — Visual Story",
      "visualType": "interface-tour",
      "rawVisualFormat": "Security Interface Tour",
      "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Compare related records across sources”. Optional",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Compare related records across sources — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-03 (10.0.4.32). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-03 | IP: 10.0.4.32 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Compare related records across sources”. Optional Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-03 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M06-U2-C2 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Reveal the Clues: Compare related records across sources",
      "type": "clue-reveal",
      "rawActivityType": "Clue & Evidence Reveal",
      "instructions": "Show Focus: Compare related records across sources. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one",
      "scenario": "Mentor Karthik helps you compare Windows, Linux, identity and network records, build a basic timeline and distinguish observed facts from assumptions.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "clue-M06-U2-C2-1",
          "label": "Host Name & Asset Tag: CDAC-BLR-WS-03",
          "summary": "Confirmed client workstation in CDAC Bengaluru engineering lab segment with standard privileges."
        },
        {
          "id": "clue-M06-U2-C2-2",
          "label": "Process Execution Hierarchy & Parent PID",
          "summary": "Child process spawned under atypical parent, requiring command-line argument verification."
        },
        {
          "id": "clue-M06-U2-C2-3",
          "label": "Normalized UTC Timestamp & Event Frequency",
          "summary": "Event clustered within a 45-second window during non-business hours (02:14:32 UTC)."
        },
        {
          "id": "clue-M06-U2-C2-4",
          "label": "Network Destination & Reputation Confidence",
          "summary": "Outbound egress towards external IP flagged in threat intelligence feeds as suspicious C2 infrastructure."
        }
      ]
    }
  },
  "M06-U3-C1": {
    "chapterId": "M06-U3-C1",
    "chapterTitle": "Corroboration, gaps and uncertainty",
    "moduleId": "06",
    "moduleTitle": "Log & Event Analysis",
    "unitId": "M06-U3",
    "unitTitle": "Evidence Quality",
    "mentorContext": "Mentor Karthik helps you compare Windows, Linux, identity and network records, build a basic timeline and distinguish observed facts from assumptions.",
    "section2": {
      "title": "Corroboration, gaps and uncertainty — Visual Story",
      "visualType": "animated-story",
      "rawVisualFormat": "Animated Workflow",
      "description": "Animate the analyst moving through the workflow using large character and tool icons; each step lights up, transitions smoothly, and ends with the resulting status. Title: “Corroboration, gaps and uncertainty”.",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Corroboration, gaps and uncertainty — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-12 (10.0.4.41). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-12 | IP: 10.0.4.41 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Animate the analyst moving through the workflow using large character and tool icons; each step lights up, transitions smoothly, and ends with the resulting status. Title: “Corroboration, gaps and uncertainty”. Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-12 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M06-U3-C1 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Reveal the Clues: Corroboration, gaps and uncertainty",
      "type": "clue-reveal",
      "rawActivityType": "Clue & Evidence Reveal",
      "instructions": "Show Focus: Corroboration, gaps and uncertainty. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one viewport.",
      "scenario": "Mentor Karthik helps you compare Windows, Linux, identity and network records, build a basic timeline and distinguish observed facts from assumptions.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "clue-M06-U3-C1-1",
          "label": "Host Name & Asset Tag: CDAC-BLR-WS-12",
          "summary": "Confirmed client workstation in CDAC Bengaluru engineering lab segment with standard privileges."
        },
        {
          "id": "clue-M06-U3-C1-2",
          "label": "Process Execution Hierarchy & Parent PID",
          "summary": "Child process spawned under atypical parent, requiring command-line argument verification."
        },
        {
          "id": "clue-M06-U3-C1-3",
          "label": "Normalized UTC Timestamp & Event Frequency",
          "summary": "Event clustered within a 45-second window during non-business hours (02:14:32 UTC)."
        },
        {
          "id": "clue-M06-U3-C1-4",
          "label": "Network Destination & Reputation Confidence",
          "summary": "Outbound egress towards external IP flagged in threat intelligence feeds as suspicious C2 infrastructure."
        }
      ]
    }
  },
  "M06-U3-C2": {
    "chapterId": "M06-U3-C2",
    "chapterTitle": "Observed fact versus analyst inference",
    "moduleId": "06",
    "moduleTitle": "Log & Event Analysis",
    "unitId": "M06-U3",
    "unitTitle": "Evidence Quality",
    "mentorContext": "Mentor Karthik helps you compare Windows, Linux, identity and network records, build a basic timeline and distinguish observed facts from assumptions.",
    "section2": {
      "title": "Observed fact versus analyst inference — Visual Story",
      "visualType": "interface-tour",
      "rawVisualFormat": "Security Interface Tour",
      "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Observed fact versus analyst inference”. Optional",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Observed fact versus analyst inference — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-13 (10.0.4.42). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-13 | IP: 10.0.4.42 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Observed fact versus analyst inference”. Optional Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-13 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M06-U3-C2 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Reveal the Clues: Observed fact versus analyst inference",
      "type": "clue-reveal",
      "rawActivityType": "Clue & Evidence Reveal",
      "instructions": "Show Focus: Observed fact versus analyst inference. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one",
      "scenario": "Mentor Karthik helps you compare Windows, Linux, identity and network records, build a basic timeline and distinguish observed facts from assumptions.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "clue-M06-U3-C2-1",
          "label": "Host Name & Asset Tag: CDAC-BLR-WS-13",
          "summary": "Confirmed client workstation in CDAC Bengaluru engineering lab segment with standard privileges."
        },
        {
          "id": "clue-M06-U3-C2-2",
          "label": "Process Execution Hierarchy & Parent PID",
          "summary": "Child process spawned under atypical parent, requiring command-line argument verification."
        },
        {
          "id": "clue-M06-U3-C2-3",
          "label": "Normalized UTC Timestamp & Event Frequency",
          "summary": "Event clustered within a 45-second window during non-business hours (02:14:32 UTC)."
        },
        {
          "id": "clue-M06-U3-C2-4",
          "label": "Network Destination & Reputation Confidence",
          "summary": "Outbound egress towards external IP flagged in threat intelligence feeds as suspicious C2 infrastructure."
        }
      ]
    }
  },
  "M07-U1-C1": {
    "chapterId": "M07-U1-C1",
    "chapterTitle": "Windows event log basics",
    "moduleId": "07",
    "moduleTitle": "Windows & Linux Security Monitoring",
    "unitId": "M07-U1",
    "unitTitle": "Windows Security Monitoring",
    "mentorContext": "Mentor Ravi guides you through basic host logs and routine-versus-unusual activity on a branch workstation and Linux server.",
    "section2": {
      "title": "Windows event log basics — Visual Story",
      "visualType": "interface-tour",
      "rawVisualFormat": "Security Interface Tour",
      "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Windows event log basics”. Optional one-sentence",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Windows event log basics — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-12 (10.0.4.21). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-12 | IP: 10.0.4.21 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Windows event log basics”. Optional one-sentence Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-12 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M07-U1-C1 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Reveal the Clues: Windows event log basics",
      "type": "clue-reveal",
      "rawActivityType": "Clue & Evidence Reveal",
      "instructions": "Show Focus: Windows event log basics. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one viewport.",
      "scenario": "Mentor Ravi guides you through basic host logs and routine-versus-unusual activity on a branch workstation and Linux server.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "clue-M07-U1-C1-1",
          "label": "Host Name & Asset Tag: CDAC-BLR-WS-12",
          "summary": "Confirmed client workstation in CDAC Bengaluru engineering lab segment with standard privileges."
        },
        {
          "id": "clue-M07-U1-C1-2",
          "label": "Process Execution Hierarchy & Parent PID",
          "summary": "Child process spawned under atypical parent, requiring command-line argument verification."
        },
        {
          "id": "clue-M07-U1-C1-3",
          "label": "Normalized UTC Timestamp & Event Frequency",
          "summary": "Event clustered within a 45-second window during non-business hours (02:14:32 UTC)."
        },
        {
          "id": "clue-M07-U1-C1-4",
          "label": "Network Destination & Reputation Confidence",
          "summary": "Outbound egress towards external IP flagged in threat intelligence feeds as suspicious C2 infrastructure."
        }
      ]
    }
  },
  "M07-U1-C2": {
    "chapterId": "M07-U1-C2",
    "chapterTitle": "Logon and account activity",
    "moduleId": "07",
    "moduleTitle": "Windows & Linux Security Monitoring",
    "unitId": "M07-U1",
    "unitTitle": "Windows Security Monitoring",
    "mentorContext": "Mentor Ravi guides you through basic host logs and routine-versus-unusual activity on a branch workstation and Linux server.",
    "section2": {
      "title": "Logon and account activity — Visual Story",
      "visualType": "interface-tour",
      "rawVisualFormat": "Security Interface Tour",
      "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Logon and account activity”. Optional one-sentence",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Logon and account activity — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-13 (10.0.4.22). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-13 | IP: 10.0.4.22 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Logon and account activity”. Optional one-sentence Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-13 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M07-U1-C2 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Sort the Scenario: Logon and account activity",
      "type": "sorting",
      "rawActivityType": "Safe / Unsafe Sorter",
      "instructions": "Present Focus: Logon and account activity. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one viewport.",
      "scenario": "Mentor Ravi guides you through basic host logs and routine-versus-unusual activity on a branch workstation and Linux server.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "sort-M07-U1-C2-1",
          "label": "Authorized Scheduled Maintenance on Host: CDAC-BLR-WS-13",
          "category": "Safe / Routine",
          "summary": "Documented IT change window activity verified against internal change request ticket."
        },
        {
          "id": "sort-M07-U1-C2-2",
          "label": "Unauthenticated Ingress Connection via Ephemeral Port",
          "category": "Suspicious / Unsafe",
          "summary": "Incoming network connection without prior session establishment or identity certificate."
        },
        {
          "id": "sort-M07-U1-C2-3",
          "label": "Standard Domain Controller Sync (Host: CDAC-BLR-DC01)",
          "category": "Safe / Routine",
          "summary": "Routine Kerberos ticket granting and LDAP directory replication between authoritative servers."
        },
        {
          "id": "sort-M07-U1-C2-4",
          "label": "Encoded PowerShell Command from Temporary Folder",
          "category": "Suspicious / Unsafe",
          "summary": "Base64 encoded execution launched from AppData\\Local\\Temp by a standard user account."
        }
      ]
    }
  },
  "M07-U2-C1": {
    "chapterId": "M07-U2-C1",
    "chapterTitle": "Authentication and system logs",
    "moduleId": "07",
    "moduleTitle": "Windows & Linux Security Monitoring",
    "unitId": "M07-U2",
    "unitTitle": "Linux Security Monitoring",
    "mentorContext": "Mentor Ravi guides you through basic host logs and routine-versus-unusual activity on a branch workstation and Linux server.",
    "section2": {
      "title": "Authentication and system logs — Visual Story",
      "visualType": "interface-tour",
      "rawVisualFormat": "Security Interface Tour",
      "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Authentication and system logs”. Optional one-sentence",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Authentication and system logs — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-02 (10.0.4.31). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-02 | IP: 10.0.4.31 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Authentication and system logs”. Optional one-sentence Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-02 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M07-U2-C1 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Reveal the Clues: Authentication and system logs",
      "type": "clue-reveal",
      "rawActivityType": "Clue & Evidence Reveal",
      "instructions": "Show Focus: Authentication and system logs. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one viewport.",
      "scenario": "Mentor Ravi guides you through basic host logs and routine-versus-unusual activity on a branch workstation and Linux server.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "clue-M07-U2-C1-1",
          "label": "Host Name & Asset Tag: CDAC-BLR-WS-02",
          "summary": "Confirmed client workstation in CDAC Bengaluru engineering lab segment with standard privileges."
        },
        {
          "id": "clue-M07-U2-C1-2",
          "label": "Process Execution Hierarchy & Parent PID",
          "summary": "Child process spawned under atypical parent, requiring command-line argument verification."
        },
        {
          "id": "clue-M07-U2-C1-3",
          "label": "Normalized UTC Timestamp & Event Frequency",
          "summary": "Event clustered within a 45-second window during non-business hours (02:14:32 UTC)."
        },
        {
          "id": "clue-M07-U2-C1-4",
          "label": "Network Destination & Reputation Confidence",
          "summary": "Outbound egress towards external IP flagged in threat intelligence feeds as suspicious C2 infrastructure."
        }
      ]
    }
  },
  "M07-U2-C2": {
    "chapterId": "M07-U2-C2",
    "chapterTitle": "Users, services and sudo activity",
    "moduleId": "07",
    "moduleTitle": "Windows & Linux Security Monitoring",
    "unitId": "M07-U2",
    "unitTitle": "Linux Security Monitoring",
    "mentorContext": "Mentor Ravi guides you through basic host logs and routine-versus-unusual activity on a branch workstation and Linux server.",
    "section2": {
      "title": "Users, services and sudo activity — Visual Story",
      "visualType": "interface-tour",
      "rawVisualFormat": "Security Interface Tour",
      "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Users, services and sudo activity”. Optional",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Users, services and sudo activity — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-03 (10.0.4.32). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-03 | IP: 10.0.4.32 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Users, services and sudo activity”. Optional Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-03 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M07-U2-C2 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Sort the Scenario: Users, services and sudo activity",
      "type": "sorting",
      "rawActivityType": "Safe / Unsafe Sorter",
      "instructions": "Present Focus: Users, services and sudo activity. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one",
      "scenario": "Mentor Ravi guides you through basic host logs and routine-versus-unusual activity on a branch workstation and Linux server.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "sort-M07-U2-C2-1",
          "label": "Authorized Scheduled Maintenance on Host: CDAC-BLR-WS-03",
          "category": "Safe / Routine",
          "summary": "Documented IT change window activity verified against internal change request ticket."
        },
        {
          "id": "sort-M07-U2-C2-2",
          "label": "Unauthenticated Ingress Connection via Ephemeral Port",
          "category": "Suspicious / Unsafe",
          "summary": "Incoming network connection without prior session establishment or identity certificate."
        },
        {
          "id": "sort-M07-U2-C2-3",
          "label": "Standard Domain Controller Sync (Host: CDAC-BLR-DC01)",
          "category": "Safe / Routine",
          "summary": "Routine Kerberos ticket granting and LDAP directory replication between authoritative servers."
        },
        {
          "id": "sort-M07-U2-C2-4",
          "label": "Encoded PowerShell Command from Temporary Folder",
          "category": "Suspicious / Unsafe",
          "summary": "Base64 encoded execution launched from AppData\\Local\\Temp by a standard user account."
        }
      ]
    }
  },
  "M07-U3-C1": {
    "chapterId": "M07-U3-C1",
    "chapterTitle": "Baseline and unusual activity",
    "moduleId": "07",
    "moduleTitle": "Windows & Linux Security Monitoring",
    "unitId": "M07-U3",
    "unitTitle": "Host Triage",
    "mentorContext": "Mentor Ravi guides you through basic host logs and routine-versus-unusual activity on a branch workstation and Linux server.",
    "section2": {
      "title": "Baseline and unusual activity — Visual Story",
      "visualType": "interface-tour",
      "rawVisualFormat": "Security Interface Tour",
      "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Baseline and unusual activity”. Optional one-sentence",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Baseline and unusual activity — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-12 (10.0.4.41). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-12 | IP: 10.0.4.41 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Baseline and unusual activity”. Optional one-sentence Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-12 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M07-U3-C1 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Sort the Scenario: Baseline and unusual activity",
      "type": "sorting",
      "rawActivityType": "Safe / Unsafe Sorter",
      "instructions": "Present Focus: Baseline and unusual activity. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one viewport.",
      "scenario": "Mentor Ravi guides you through basic host logs and routine-versus-unusual activity on a branch workstation and Linux server.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "sort-M07-U3-C1-1",
          "label": "Authorized Scheduled Maintenance on Host: CDAC-BLR-WS-12",
          "category": "Safe / Routine",
          "summary": "Documented IT change window activity verified against internal change request ticket."
        },
        {
          "id": "sort-M07-U3-C1-2",
          "label": "Unauthenticated Ingress Connection via Ephemeral Port",
          "category": "Suspicious / Unsafe",
          "summary": "Incoming network connection without prior session establishment or identity certificate."
        },
        {
          "id": "sort-M07-U3-C1-3",
          "label": "Standard Domain Controller Sync (Host: CDAC-BLR-DC01)",
          "category": "Safe / Routine",
          "summary": "Routine Kerberos ticket granting and LDAP directory replication between authoritative servers."
        },
        {
          "id": "sort-M07-U3-C1-4",
          "label": "Encoded PowerShell Command from Temporary Folder",
          "category": "Suspicious / Unsafe",
          "summary": "Base64 encoded execution launched from AppData\\Local\\Temp by a standard user account."
        }
      ]
    }
  },
  "M07-U3-C2": {
    "chapterId": "M07-U3-C2",
    "chapterTitle": "Cross-check user and host context",
    "moduleId": "07",
    "moduleTitle": "Windows & Linux Security Monitoring",
    "unitId": "M07-U3",
    "unitTitle": "Host Triage",
    "mentorContext": "Mentor Ravi guides you through basic host logs and routine-versus-unusual activity on a branch workstation and Linux server.",
    "section2": {
      "title": "Cross-check user and host context — Visual Story",
      "visualType": "packet-flow",
      "rawVisualFormat": "Data-Flow Animation",
      "description": "Animate a staff device sending packets through branch network components; use moving dots, large SVG icons, glowing paths, and a clear source-to-destination route. Title: “Cross-check user and host context”. Optional",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Cross-check user and host context — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-13 (10.0.4.42). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-13 | IP: 10.0.4.42 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Animate a staff device sending packets through branch network components; use moving dots, large SVG icons, glowing paths, and a clear source-to-destination route. Title: “Cross-check user and host context”. Optional Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-13 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M07-U3-C2 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Reveal the Clues: Cross-check user and host context",
      "type": "clue-reveal",
      "rawActivityType": "Clue & Evidence Reveal",
      "instructions": "Show Focus: Cross-check user and host context. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one",
      "scenario": "Mentor Ravi guides you through basic host logs and routine-versus-unusual activity on a branch workstation and Linux server.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "clue-M07-U3-C2-1",
          "label": "Host Name & Asset Tag: CDAC-BLR-WS-13",
          "summary": "Confirmed client workstation in CDAC Bengaluru engineering lab segment with standard privileges."
        },
        {
          "id": "clue-M07-U3-C2-2",
          "label": "Process Execution Hierarchy & Parent PID",
          "summary": "Child process spawned under atypical parent, requiring command-line argument verification."
        },
        {
          "id": "clue-M07-U3-C2-3",
          "label": "Normalized UTC Timestamp & Event Frequency",
          "summary": "Event clustered within a 45-second window during non-business hours (02:14:32 UTC)."
        },
        {
          "id": "clue-M07-U3-C2-4",
          "label": "Network Destination & Reputation Confidence",
          "summary": "Outbound egress towards external IP flagged in threat intelligence feeds as suspicious C2 infrastructure."
        }
      ]
    }
  },
  "M08-U1-C1": {
    "chapterId": "M08-U1-C1",
    "chapterTitle": "Packets, flows and PCAP",
    "moduleId": "08",
    "moduleTitle": "Network Security Monitoring",
    "unitId": "M08-U1",
    "unitTitle": "Network Visibility",
    "mentorContext": "Mentor Meera, a network security analyst, helps you inspect a supplied packet capture and summarize the evidence behind a network alert.",
    "section2": {
      "title": "Packets, flows and PCAP — Visual Story",
      "visualType": "packet-flow",
      "rawVisualFormat": "Data-Flow Animation",
      "description": "Animate a staff device sending packets through branch network components; use moving dots, large SVG icons, glowing paths, and a clear source-to-destination route. Title: “Packets, flows and PCAP”. Optional one-sentence",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Packets, flows and PCAP — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-12 (10.0.4.21). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-12 | IP: 10.0.4.21 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Animate a staff device sending packets through branch network components; use moving dots, large SVG icons, glowing paths, and a clear source-to-destination route. Title: “Packets, flows and PCAP”. Optional one-sentence Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-12 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M08-U1-C1 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Trace the Signal: Packets, flows and PCAP",
      "type": "packet-trace",
      "rawActivityType": "Packet / Event Tracer",
      "instructions": "Animate Focus: Packets, flows and PCAP. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one viewport.",
      "scenario": "Mentor Meera, a network security analyst, helps you inspect a supplied packet capture and summarize the evidence behind a network alert.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "trace-M08-U1-C1-1",
          "label": "Ingress Packet at Gateway Router [Host: CDAC-BLR-WS-12]",
          "summary": "Initial TCP handshake packet traversing the perimeter interface with valid checksum."
        },
        {
          "id": "trace-M08-U1-C1-2",
          "label": "Passive TAP Sensor Inspection [Zeek-Perimeter-01]",
          "summary": "Protocol metadata extracted: SSL/TLS handshake certificates and SNI domain inspected."
        },
        {
          "id": "trace-M08-U1-C1-3",
          "label": "Core Switch Port Mirroring [Port 24]",
          "summary": "Payload header verified for anomaly indicators, protocol compliance, and anomalous flags."
        },
        {
          "id": "trace-M08-U1-C1-4",
          "label": "SIEM Forwarder Buffer [CDAC-SIEM-PROD]",
          "summary": "Indexed into event search repository within 1.2 seconds with normalized CIM fields."
        }
      ]
    }
  },
  "M08-U1-C2": {
    "chapterId": "M08-U1-C2",
    "chapterTitle": "DNS, HTTP(S) and connection metadata",
    "moduleId": "08",
    "moduleTitle": "Network Security Monitoring",
    "unitId": "M08-U1",
    "unitTitle": "Network Visibility",
    "mentorContext": "Mentor Meera, a network security analyst, helps you inspect a supplied packet capture and summarize the evidence behind a network alert.",
    "section2": {
      "title": "DNS, HTTP(S) and connection metadata — Visual Story",
      "visualType": "packet-flow",
      "rawVisualFormat": "Data-Flow Animation",
      "description": "Animate a staff device sending packets through branch network components; use moving dots, large SVG icons, glowing paths, and a clear source-to-destination route. Title: “DNS, HTTP(S) and connection metadata”. Optional",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "DNS, HTTP(S) and connection metadata — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-13 (10.0.4.22). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-13 | IP: 10.0.4.22 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Animate a staff device sending packets through branch network components; use moving dots, large SVG icons, glowing paths, and a clear source-to-destination route. Title: “DNS, HTTP(S) and connection metadata”. Optional Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-13 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M08-U1-C2 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Trace the Signal: DNS, HTTP(S) and connection metadata",
      "type": "packet-trace",
      "rawActivityType": "Packet / Event Tracer",
      "instructions": "Animate Focus: DNS, HTTP(S) and connection metadata. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one",
      "scenario": "Mentor Meera, a network security analyst, helps you inspect a supplied packet capture and summarize the evidence behind a network alert.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "trace-M08-U1-C2-1",
          "label": "Ingress Packet at Gateway Router [Host: CDAC-BLR-WS-13]",
          "summary": "Initial TCP handshake packet traversing the perimeter interface with valid checksum."
        },
        {
          "id": "trace-M08-U1-C2-2",
          "label": "Passive TAP Sensor Inspection [Zeek-Perimeter-01]",
          "summary": "Protocol metadata extracted: SSL/TLS handshake certificates and SNI domain inspected."
        },
        {
          "id": "trace-M08-U1-C2-3",
          "label": "Core Switch Port Mirroring [Port 24]",
          "summary": "Payload header verified for anomaly indicators, protocol compliance, and anomalous flags."
        },
        {
          "id": "trace-M08-U1-C2-4",
          "label": "SIEM Forwarder Buffer [CDAC-SIEM-PROD]",
          "summary": "Indexed into event search repository within 1.2 seconds with normalized CIM fields."
        }
      ]
    }
  },
  "M08-U2-C1": {
    "chapterId": "M08-U2-C1",
    "chapterTitle": "Filters and conversations",
    "moduleId": "08",
    "moduleTitle": "Network Security Monitoring",
    "unitId": "M08-U2",
    "unitTitle": "Inspecting Traffic",
    "mentorContext": "Mentor Meera, a network security analyst, helps you inspect a supplied packet capture and summarize the evidence behind a network alert.",
    "section2": {
      "title": "Filters and conversations — Visual Story",
      "visualType": "packet-flow",
      "rawVisualFormat": "Data-Flow Animation",
      "description": "Animate a staff device sending packets through branch network components; use moving dots, large SVG icons, glowing paths, and a clear source-to-destination route. Title: “Filters and conversations”. Optional one-sentence description",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Filters and conversations — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-02 (10.0.4.31). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-02 | IP: 10.0.4.31 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Animate a staff device sending packets through branch network components; use moving dots, large SVG icons, glowing paths, and a clear source-to-destination route. Title: “Filters and conversations”. Optional one-sentence description Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-02 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M08-U2-C1 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Trace the Signal: Filters and conversations",
      "type": "packet-trace",
      "rawActivityType": "Packet / Event Tracer",
      "instructions": "Animate packets Focus: Filters and conversations. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one viewport.",
      "scenario": "Mentor Meera, a network security analyst, helps you inspect a supplied packet capture and summarize the evidence behind a network alert.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "trace-M08-U2-C1-1",
          "label": "Ingress Packet at Gateway Router [Host: CDAC-BLR-WS-02]",
          "summary": "Initial TCP handshake packet traversing the perimeter interface with valid checksum."
        },
        {
          "id": "trace-M08-U2-C1-2",
          "label": "Passive TAP Sensor Inspection [Zeek-Perimeter-01]",
          "summary": "Protocol metadata extracted: SSL/TLS handshake certificates and SNI domain inspected."
        },
        {
          "id": "trace-M08-U2-C1-3",
          "label": "Core Switch Port Mirroring [Port 24]",
          "summary": "Payload header verified for anomaly indicators, protocol compliance, and anomalous flags."
        },
        {
          "id": "trace-M08-U2-C1-4",
          "label": "SIEM Forwarder Buffer [CDAC-SIEM-PROD]",
          "summary": "Indexed into event search repository within 1.2 seconds with normalized CIM fields."
        }
      ]
    }
  },
  "M08-U2-C2": {
    "chapterId": "M08-U2-C2",
    "chapterTitle": "Repeated attempts and scan-like patterns",
    "moduleId": "08",
    "moduleTitle": "Network Security Monitoring",
    "unitId": "M08-U2",
    "unitTitle": "Inspecting Traffic",
    "mentorContext": "Mentor Meera, a network security analyst, helps you inspect a supplied packet capture and summarize the evidence behind a network alert.",
    "section2": {
      "title": "Repeated attempts and scan-like patterns — Visual Story",
      "visualType": "packet-flow",
      "rawVisualFormat": "Data-Flow Animation",
      "description": "Animate a staff device sending packets through branch network components; use moving dots, large SVG icons, glowing paths, and a clear source-to-destination route. Title: “Repeated attempts and scan-like patterns”. Optional",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Repeated attempts and scan-like patterns — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-03 (10.0.4.32). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-03 | IP: 10.0.4.32 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Animate a staff device sending packets through branch network components; use moving dots, large SVG icons, glowing paths, and a clear source-to-destination route. Title: “Repeated attempts and scan-like patterns”. Optional Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-03 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M08-U2-C2 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Trace the Signal: Repeated attempts and scan-like patterns",
      "type": "packet-trace",
      "rawActivityType": "Packet / Event Tracer",
      "instructions": "Animate Focus: Repeated attempts and scan-like patterns. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one",
      "scenario": "Mentor Meera, a network security analyst, helps you inspect a supplied packet capture and summarize the evidence behind a network alert.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "trace-M08-U2-C2-1",
          "label": "Ingress Packet at Gateway Router [Host: CDAC-BLR-WS-03]",
          "summary": "Initial TCP handshake packet traversing the perimeter interface with valid checksum."
        },
        {
          "id": "trace-M08-U2-C2-2",
          "label": "Passive TAP Sensor Inspection [Zeek-Perimeter-01]",
          "summary": "Protocol metadata extracted: SSL/TLS handshake certificates and SNI domain inspected."
        },
        {
          "id": "trace-M08-U2-C2-3",
          "label": "Core Switch Port Mirroring [Port 24]",
          "summary": "Payload header verified for anomaly indicators, protocol compliance, and anomalous flags."
        },
        {
          "id": "trace-M08-U2-C2-4",
          "label": "SIEM Forwarder Buffer [CDAC-SIEM-PROD]",
          "summary": "Indexed into event search repository within 1.2 seconds with normalized CIM fields."
        }
      ]
    }
  },
  "M08-U3-C1": {
    "chapterId": "M08-U3-C1",
    "chapterTitle": "Source/destination context",
    "moduleId": "08",
    "moduleTitle": "Network Security Monitoring",
    "unitId": "M08-U3",
    "unitTitle": "Network Alert Triage",
    "mentorContext": "Mentor Meera, a network security analyst, helps you inspect a supplied packet capture and summarize the evidence behind a network alert.",
    "section2": {
      "title": "Source/destination context — Visual Story",
      "visualType": "packet-flow",
      "rawVisualFormat": "Data-Flow Animation",
      "description": "Animate a staff device sending packets through branch network components; use moving dots, large SVG icons, glowing paths, and a clear source-to-destination route. Title: “Source/destination context”. Optional one-sentence description only.",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Source/destination context — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-12 (10.0.4.41). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-12 | IP: 10.0.4.41 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Animate a staff device sending packets through branch network components; use moving dots, large SVG icons, glowing paths, and a clear source-to-destination route. Title: “Source/destination context”. Optional one-sentence description only. Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-12 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M08-U3-C1 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Trace the Signal: Source/destination context",
      "type": "packet-trace",
      "rawActivityType": "Packet / Event Tracer",
      "instructions": "Animate packets or Focus: Source/destination context. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one viewport.",
      "scenario": "Mentor Meera, a network security analyst, helps you inspect a supplied packet capture and summarize the evidence behind a network alert.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "trace-M08-U3-C1-1",
          "label": "Ingress Packet at Gateway Router [Host: CDAC-BLR-WS-12]",
          "summary": "Initial TCP handshake packet traversing the perimeter interface with valid checksum."
        },
        {
          "id": "trace-M08-U3-C1-2",
          "label": "Passive TAP Sensor Inspection [Zeek-Perimeter-01]",
          "summary": "Protocol metadata extracted: SSL/TLS handshake certificates and SNI domain inspected."
        },
        {
          "id": "trace-M08-U3-C1-3",
          "label": "Core Switch Port Mirroring [Port 24]",
          "summary": "Payload header verified for anomaly indicators, protocol compliance, and anomalous flags."
        },
        {
          "id": "trace-M08-U3-C1-4",
          "label": "SIEM Forwarder Buffer [CDAC-SIEM-PROD]",
          "summary": "Indexed into event search repository within 1.2 seconds with normalized CIM fields."
        }
      ]
    }
  },
  "M08-U3-C2": {
    "chapterId": "M08-U3-C2",
    "chapterTitle": "Write a concise evidence summary",
    "moduleId": "08",
    "moduleTitle": "Network Security Monitoring",
    "unitId": "M08-U3",
    "unitTitle": "Network Alert Triage",
    "mentorContext": "Mentor Meera, a network security analyst, helps you inspect a supplied packet capture and summarize the evidence behind a network alert.",
    "section2": {
      "title": "Write a concise evidence summary — Visual Story",
      "visualType": "packet-flow",
      "rawVisualFormat": "Data-Flow Animation",
      "description": "Animate a staff device sending packets through branch network components; use moving dots, large SVG icons, glowing paths, and a clear source-to-destination route. Title: “Write a concise evidence summary”. Optional",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Write a concise evidence summary — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-13 (10.0.4.42). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-13 | IP: 10.0.4.42 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Animate a staff device sending packets through branch network components; use moving dots, large SVG icons, glowing paths, and a clear source-to-destination route. Title: “Write a concise evidence summary”. Optional Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-13 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M08-U3-C2 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Trace the Signal: Write a concise evidence summary",
      "type": "packet-trace",
      "rawActivityType": "Packet / Event Tracer",
      "instructions": "Animate Focus: Write a concise evidence summary. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one",
      "scenario": "Mentor Meera, a network security analyst, helps you inspect a supplied packet capture and summarize the evidence behind a network alert.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "trace-M08-U3-C2-1",
          "label": "Ingress Packet at Gateway Router [Host: CDAC-BLR-WS-13]",
          "summary": "Initial TCP handshake packet traversing the perimeter interface with valid checksum."
        },
        {
          "id": "trace-M08-U3-C2-2",
          "label": "Passive TAP Sensor Inspection [Zeek-Perimeter-01]",
          "summary": "Protocol metadata extracted: SSL/TLS handshake certificates and SNI domain inspected."
        },
        {
          "id": "trace-M08-U3-C2-3",
          "label": "Core Switch Port Mirroring [Port 24]",
          "summary": "Payload header verified for anomaly indicators, protocol compliance, and anomalous flags."
        },
        {
          "id": "trace-M08-U3-C2-4",
          "label": "SIEM Forwarder Buffer [CDAC-SIEM-PROD]",
          "summary": "Indexed into event search repository within 1.2 seconds with normalized CIM fields."
        }
      ]
    }
  },
  "M09-U1-C1": {
    "chapterId": "M09-U1-C1",
    "chapterTitle": "Endpoint telemetry and alerts",
    "moduleId": "09",
    "moduleTitle": "Endpoint Detection & Response (EDR)",
    "unitId": "M09-U1",
    "unitTitle": "EDR Fundamentals",
    "mentorContext": "Mentor Ananya walks you through endpoint alert context, device/user details and basic file/process evidence, then explains when to escalate.",
    "section2": {
      "title": "Endpoint telemetry and alerts — Visual Story",
      "visualType": "interface-tour",
      "rawVisualFormat": "Security Interface Tour",
      "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Endpoint telemetry and alerts”. Optional one-sentence",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Endpoint telemetry and alerts — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-12 (10.0.4.21). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-12 | IP: 10.0.4.21 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Endpoint telemetry and alerts”. Optional one-sentence Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-12 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M09-U1-C1 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Reveal the Clues: Endpoint telemetry and alerts",
      "type": "clue-reveal",
      "rawActivityType": "Clue & Evidence Reveal",
      "instructions": "Show Focus: Endpoint telemetry and alerts. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one viewport.",
      "scenario": "Mentor Ananya walks you through endpoint alert context, device/user details and basic file/process evidence, then explains when to escalate.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "clue-M09-U1-C1-1",
          "label": "Host Name & Asset Tag: CDAC-BLR-WS-12",
          "summary": "Confirmed client workstation in CDAC Bengaluru engineering lab segment with standard privileges."
        },
        {
          "id": "clue-M09-U1-C1-2",
          "label": "Process Execution Hierarchy & Parent PID",
          "summary": "Child process spawned under atypical parent, requiring command-line argument verification."
        },
        {
          "id": "clue-M09-U1-C1-3",
          "label": "Normalized UTC Timestamp & Event Frequency",
          "summary": "Event clustered within a 45-second window during non-business hours (02:14:32 UTC)."
        },
        {
          "id": "clue-M09-U1-C1-4",
          "label": "Network Destination & Reputation Confidence",
          "summary": "Outbound egress towards external IP flagged in threat intelligence feeds as suspicious C2 infrastructure."
        }
      ]
    }
  },
  "M09-U1-C2": {
    "chapterId": "M09-U1-C2",
    "chapterTitle": "EDR versus traditional antivirus",
    "moduleId": "09",
    "moduleTitle": "Endpoint Detection & Response (EDR)",
    "unitId": "M09-U1",
    "unitTitle": "EDR Fundamentals",
    "mentorContext": "Mentor Ananya walks you through endpoint alert context, device/user details and basic file/process evidence, then explains when to escalate.",
    "section2": {
      "title": "EDR versus traditional antivirus — Visual Story",
      "visualType": "interface-tour",
      "rawVisualFormat": "Security Interface Tour",
      "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “EDR versus traditional antivirus”. Optional one-sentence",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "EDR versus traditional antivirus — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-13 (10.0.4.22). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-13 | IP: 10.0.4.22 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “EDR versus traditional antivirus”. Optional one-sentence Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-13 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M09-U1-C2 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Match the Concepts: EDR versus traditional antivirus",
      "type": "matching",
      "rawActivityType": "Concept / Term Matching",
      "instructions": "Create Focus: EDR versus traditional antivirus. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one viewport.",
      "scenario": "Mentor Ananya walks you through endpoint alert context, device/user details and basic file/process evidence, then explains when to escalate.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "match-M09-U1-C2-1",
          "label": "Core Observable on Host: CDAC-BLR-WS-13",
          "summary": "Raw telemetry indicator extracted directly from the system event log or network sensor."
        },
        {
          "id": "match-M09-U1-C2-2",
          "label": "SOP Baseline Verification",
          "summary": "Structured procedure to confirm whether the activity matches authorized organizational norms."
        },
        {
          "id": "match-M09-U1-C2-3",
          "label": "Correlation Context",
          "summary": "Connecting host activity with network logs to establish a coherent chronological narrative."
        },
        {
          "id": "match-M09-U1-C2-4",
          "label": "L1 Case Disposition",
          "summary": "Final categorization (True Positive / False Positive / Benign) with structured mentor handoff notes."
        }
      ]
    }
  },
  "M09-U2-C1": {
    "chapterId": "M09-U2-C1",
    "chapterTitle": "Device, user, file and process context",
    "moduleId": "09",
    "moduleTitle": "Endpoint Detection & Response (EDR)",
    "unitId": "M09-U2",
    "unitTitle": "Understanding Endpoint Alerts",
    "mentorContext": "Mentor Ananya walks you through endpoint alert context, device/user details and basic file/process evidence, then explains when to escalate.",
    "section2": {
      "title": "Device, user, file and process context — Visual Story",
      "visualType": "interface-tour",
      "rawVisualFormat": "Security Interface Tour",
      "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Device, user, file and process context”.",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Device, user, file and process context — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-02 (10.0.4.31). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-02 | IP: 10.0.4.31 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Device, user, file and process context”. Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-02 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M09-U2-C1 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Build the Flow: Device, user, file and process context",
      "type": "drag-drop",
      "rawActivityType": "Drag-and-Drop Workflow",
      "instructions": "Provide Focus: Device, user, file and process context. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within",
      "scenario": "Mentor Ananya walks you through endpoint alert context, device/user details and basic file/process evidence, then explains when to escalate.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "step-M09-U2-C1-1",
          "label": "Step 1: Alert Ingestion & Queue Assignment",
          "summary": "Acknowledge incoming telemetry in the SIEM alert queue and assign ticket to active shift analyst."
        },
        {
          "id": "step-M09-U2-C1-2",
          "label": "Step 2: Entity Identification & Asset Context",
          "summary": "Identify the 5 Ws: Affected Host Name, Source IP, User Account, and Network Segment."
        },
        {
          "id": "step-M09-U2-C1-3",
          "label": "Step 3: Playbook Verification & False Positive Filter",
          "summary": "Validate against known baseline exceptions, standard maintenance windows, and SOP criteria."
        },
        {
          "id": "step-M09-U2-C1-4",
          "label": "Step 4: Ticket Disposition & Escalation Handoff",
          "summary": "Document exact findings with verified evidence, set severity disposition, and escalate to L2."
        }
      ]
    }
  },
  "M09-U2-C2": {
    "chapterId": "M09-U2-C2",
    "chapterTitle": "Timeline and alert evidence",
    "moduleId": "09",
    "moduleTitle": "Endpoint Detection & Response (EDR)",
    "unitId": "M09-U2",
    "unitTitle": "Understanding Endpoint Alerts",
    "mentorContext": "Mentor Ananya walks you through endpoint alert context, device/user details and basic file/process evidence, then explains when to escalate.",
    "section2": {
      "title": "Timeline and alert evidence — Visual Story",
      "visualType": "interface-tour",
      "rawVisualFormat": "Security Interface Tour",
      "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Timeline and alert evidence”. Optional one-sentence",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Timeline and alert evidence — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-03 (10.0.4.32). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-03 | IP: 10.0.4.32 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Timeline and alert evidence”. Optional one-sentence Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-03 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M09-U2-C2 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Trace the Signal: Timeline and alert evidence",
      "type": "packet-trace",
      "rawActivityType": "Packet / Event Tracer",
      "instructions": "Animate Focus: Timeline and alert evidence. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one viewport.",
      "scenario": "Mentor Ananya walks you through endpoint alert context, device/user details and basic file/process evidence, then explains when to escalate.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "trace-M09-U2-C2-1",
          "label": "Ingress Packet at Gateway Router [Host: CDAC-BLR-WS-03]",
          "summary": "Initial TCP handshake packet traversing the perimeter interface with valid checksum."
        },
        {
          "id": "trace-M09-U2-C2-2",
          "label": "Passive TAP Sensor Inspection [Zeek-Perimeter-01]",
          "summary": "Protocol metadata extracted: SSL/TLS handshake certificates and SNI domain inspected."
        },
        {
          "id": "trace-M09-U2-C2-3",
          "label": "Core Switch Port Mirroring [Port 24]",
          "summary": "Payload header verified for anomaly indicators, protocol compliance, and anomalous flags."
        },
        {
          "id": "trace-M09-U2-C2-4",
          "label": "SIEM Forwarder Buffer [CDAC-SIEM-PROD]",
          "summary": "Indexed into event search repository within 1.2 seconds with normalized CIM fields."
        }
      ]
    }
  },
  "M09-U3-C1": {
    "chapterId": "M09-U3-C1",
    "chapterTitle": "Validate basic indicators",
    "moduleId": "09",
    "moduleTitle": "Endpoint Detection & Response (EDR)",
    "unitId": "M09-U3",
    "unitTitle": "L1 Endpoint Response",
    "mentorContext": "Mentor Ananya walks you through endpoint alert context, device/user details and basic file/process evidence, then explains when to escalate.",
    "section2": {
      "title": "Validate basic indicators — Visual Story",
      "visualType": "interface-tour",
      "rawVisualFormat": "Security Interface Tour",
      "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Validate basic indicators”. Optional one-sentence description",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Validate basic indicators — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-12 (10.0.4.41). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-12 | IP: 10.0.4.41 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Validate basic indicators”. Optional one-sentence description Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-12 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M09-U3-C1 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Build the Flow: Validate basic indicators",
      "type": "drag-drop",
      "rawActivityType": "Drag-and-Drop Workflow",
      "instructions": "Provide large Focus: Validate basic indicators. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one viewport.",
      "scenario": "Mentor Ananya walks you through endpoint alert context, device/user details and basic file/process evidence, then explains when to escalate.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "step-M09-U3-C1-1",
          "label": "Step 1: Alert Ingestion & Queue Assignment",
          "summary": "Acknowledge incoming telemetry in the SIEM alert queue and assign ticket to active shift analyst."
        },
        {
          "id": "step-M09-U3-C1-2",
          "label": "Step 2: Entity Identification & Asset Context",
          "summary": "Identify the 5 Ws: Affected Host Name, Source IP, User Account, and Network Segment."
        },
        {
          "id": "step-M09-U3-C1-3",
          "label": "Step 3: Playbook Verification & False Positive Filter",
          "summary": "Validate against known baseline exceptions, standard maintenance windows, and SOP criteria."
        },
        {
          "id": "step-M09-U3-C1-4",
          "label": "Step 4: Ticket Disposition & Escalation Handoff",
          "summary": "Document exact findings with verified evidence, set severity disposition, and escalate to L2."
        }
      ]
    }
  },
  "M09-U3-C2": {
    "chapterId": "M09-U3-C2",
    "chapterTitle": "Safe actions and escalation boundaries",
    "moduleId": "09",
    "moduleTitle": "Endpoint Detection & Response (EDR)",
    "unitId": "M09-U3",
    "unitTitle": "L1 Endpoint Response",
    "mentorContext": "Mentor Ananya walks you through endpoint alert context, device/user details and basic file/process evidence, then explains when to escalate.",
    "section2": {
      "title": "Safe actions and escalation boundaries — Visual Story",
      "visualType": "interface-tour",
      "rawVisualFormat": "Security Interface Tour",
      "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Safe actions and escalation boundaries”. Optional",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Safe actions and escalation boundaries — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-13 (10.0.4.42). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-13 | IP: 10.0.4.42 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Safe actions and escalation boundaries”. Optional Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-13 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M09-U3-C2 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Build the Flow: Safe actions and escalation boundaries",
      "type": "drag-drop",
      "rawActivityType": "Drag-and-Drop Workflow",
      "instructions": "Provide Focus: Safe actions and escalation boundaries. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one",
      "scenario": "Mentor Ananya walks you through endpoint alert context, device/user details and basic file/process evidence, then explains when to escalate.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "step-M09-U3-C2-1",
          "label": "Step 1: Alert Ingestion & Queue Assignment",
          "summary": "Acknowledge incoming telemetry in the SIEM alert queue and assign ticket to active shift analyst."
        },
        {
          "id": "step-M09-U3-C2-2",
          "label": "Step 2: Entity Identification & Asset Context",
          "summary": "Identify the 5 Ws: Affected Host Name, Source IP, User Account, and Network Segment."
        },
        {
          "id": "step-M09-U3-C2-3",
          "label": "Step 3: Playbook Verification & False Positive Filter",
          "summary": "Validate against known baseline exceptions, standard maintenance windows, and SOP criteria."
        },
        {
          "id": "step-M09-U3-C2-4",
          "label": "Step 4: Ticket Disposition & Escalation Handoff",
          "summary": "Document exact findings with verified evidence, set severity disposition, and escalate to L2."
        }
      ]
    }
  },
  "M10-U1-C1": {
    "chapterId": "M10-U1-C1",
    "chapterTitle": "SIEM, EDR, XDR and case management",
    "moduleId": "10",
    "moduleTitle": "Security Ecosystem: XDR, Response Tools & OT/ICS",
    "unitId": "M10-U1",
    "unitTitle": "Security Tool Ecosystem",
    "mentorContext": "Mentor Karthik introduces how XDR, EDR, SIEM, SOAR and case-management tools complement one another, then contrasts office IT with OT/ICS safety and availability needs.",
    "section2": {
      "title": "SIEM, EDR, XDR and case management — Visual Story",
      "visualType": "interface-tour",
      "rawVisualFormat": "Security Interface Tour",
      "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “SIEM, EDR, XDR and case management”.",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "SIEM, EDR, XDR and case management — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-12 (10.0.4.21). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-12 | IP: 10.0.4.21 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “SIEM, EDR, XDR and case management”. Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-12 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M10-U1-C1 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Build the Flow: SIEM, EDR, XDR and case management",
      "type": "drag-drop",
      "rawActivityType": "Drag-and-Drop Workflow",
      "instructions": "Provide Focus: SIEM, EDR, XDR and case management. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within",
      "scenario": "Mentor Karthik introduces how XDR, EDR, SIEM, SOAR and case-management tools complement one another, then contrasts office IT with OT/ICS safety and availability needs.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "step-M10-U1-C1-1",
          "label": "Step 1: Alert Ingestion & Queue Assignment",
          "summary": "Acknowledge incoming telemetry in the SIEM alert queue and assign ticket to active shift analyst."
        },
        {
          "id": "step-M10-U1-C1-2",
          "label": "Step 2: Entity Identification & Asset Context",
          "summary": "Identify the 5 Ws: Affected Host Name, Source IP, User Account, and Network Segment."
        },
        {
          "id": "step-M10-U1-C1-3",
          "label": "Step 3: Playbook Verification & False Positive Filter",
          "summary": "Validate against known baseline exceptions, standard maintenance windows, and SOP criteria."
        },
        {
          "id": "step-M10-U1-C1-4",
          "label": "Step 4: Ticket Disposition & Escalation Handoff",
          "summary": "Document exact findings with verified evidence, set severity disposition, and escalate to L2."
        }
      ]
    }
  },
  "M10-U1-C2": {
    "chapterId": "M10-U1-C2",
    "chapterTitle": "SOAR and response-tool roles",
    "moduleId": "10",
    "moduleTitle": "Security Ecosystem: XDR, Response Tools & OT/ICS",
    "unitId": "M10-U1",
    "unitTitle": "Security Tool Ecosystem",
    "mentorContext": "Mentor Karthik introduces how XDR, EDR, SIEM, SOAR and case-management tools complement one another, then contrasts office IT with OT/ICS safety and availability needs.",
    "section2": {
      "title": "SOAR and response-tool roles — Visual Story",
      "visualType": "interface-tour",
      "rawVisualFormat": "Security Interface Tour",
      "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “SOAR and response-tool roles”. Optional one-sentence",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "SOAR and response-tool roles — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-13 (10.0.4.22). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-13 | IP: 10.0.4.22 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “SOAR and response-tool roles”. Optional one-sentence Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-13 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M10-U1-C2 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Build the Flow: SOAR and response-tool roles",
      "type": "drag-drop",
      "rawActivityType": "Drag-and-Drop Workflow",
      "instructions": "Provide Focus: SOAR and response-tool roles. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one viewport.",
      "scenario": "Mentor Karthik introduces how XDR, EDR, SIEM, SOAR and case-management tools complement one another, then contrasts office IT with OT/ICS safety and availability needs.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "step-M10-U1-C2-1",
          "label": "Step 1: Alert Ingestion & Queue Assignment",
          "summary": "Acknowledge incoming telemetry in the SIEM alert queue and assign ticket to active shift analyst."
        },
        {
          "id": "step-M10-U1-C2-2",
          "label": "Step 2: Entity Identification & Asset Context",
          "summary": "Identify the 5 Ws: Affected Host Name, Source IP, User Account, and Network Segment."
        },
        {
          "id": "step-M10-U1-C2-3",
          "label": "Step 3: Playbook Verification & False Positive Filter",
          "summary": "Validate against known baseline exceptions, standard maintenance windows, and SOP criteria."
        },
        {
          "id": "step-M10-U1-C2-4",
          "label": "Step 4: Ticket Disposition & Escalation Handoff",
          "summary": "Document exact findings with verified evidence, set severity disposition, and escalate to L2."
        }
      ]
    }
  },
  "M10-U2-C1": {
    "chapterId": "M10-U2-C1",
    "chapterTitle": "OT versus office IT",
    "moduleId": "10",
    "moduleTitle": "Security Ecosystem: XDR, Response Tools & OT/ICS",
    "unitId": "M10-U2",
    "unitTitle": "OT/ICS Security Introduction",
    "mentorContext": "Mentor Karthik introduces how XDR, EDR, SIEM, SOAR and case-management tools complement one another, then contrasts office IT with OT/ICS safety and availability needs.",
    "section2": {
      "title": "OT versus office IT — Visual Story",
      "visualType": "diagram",
      "rawVisualFormat": "Concept Visualization",
      "description": "Build a visual metaphor with large SVG objects and animated connections; reveal one concept at a time, use minimal labels, and end on the practical meaning. Title: “OT versus office",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "OT versus office IT — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-02 (10.0.4.31). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-02 | IP: 10.0.4.31 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Build a visual metaphor with large SVG objects and animated connections; reveal one concept at a time, use minimal labels, and end on the practical meaning. Title: “OT versus office Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-02 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M10-U2-C1 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Reveal the Clues: OT versus office IT",
      "type": "clue-reveal",
      "rawActivityType": "Clue & Evidence Reveal",
      "instructions": "Show Focus: OT versus office IT. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one viewport.",
      "scenario": "Mentor Karthik introduces how XDR, EDR, SIEM, SOAR and case-management tools complement one another, then contrasts office IT with OT/ICS safety and availability needs.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "clue-M10-U2-C1-1",
          "label": "Host Name & Asset Tag: CDAC-BLR-WS-02",
          "summary": "Confirmed client workstation in CDAC Bengaluru engineering lab segment with standard privileges."
        },
        {
          "id": "clue-M10-U2-C1-2",
          "label": "Process Execution Hierarchy & Parent PID",
          "summary": "Child process spawned under atypical parent, requiring command-line argument verification."
        },
        {
          "id": "clue-M10-U2-C1-3",
          "label": "Normalized UTC Timestamp & Event Frequency",
          "summary": "Event clustered within a 45-second window during non-business hours (02:14:32 UTC)."
        },
        {
          "id": "clue-M10-U2-C1-4",
          "label": "Network Destination & Reputation Confidence",
          "summary": "Outbound egress towards external IP flagged in threat intelligence feeds as suspicious C2 infrastructure."
        }
      ]
    }
  },
  "M10-U2-C2": {
    "chapterId": "M10-U2-C2",
    "chapterTitle": "Availability, safety and segmentation",
    "moduleId": "10",
    "moduleTitle": "Security Ecosystem: XDR, Response Tools & OT/ICS",
    "unitId": "M10-U2",
    "unitTitle": "OT/ICS Security Introduction",
    "mentorContext": "Mentor Karthik introduces how XDR, EDR, SIEM, SOAR and case-management tools complement one another, then contrasts office IT with OT/ICS safety and availability needs.",
    "section2": {
      "title": "Availability, safety and segmentation — Visual Story",
      "visualType": "diagram",
      "rawVisualFormat": "Concept Visualization",
      "description": "Build a visual metaphor with large SVG objects and animated connections; reveal one concept at a time, use minimal labels, and end on the practical meaning. Title: “Availability, safety and",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Availability, safety and segmentation — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-03 (10.0.4.32). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-03 | IP: 10.0.4.32 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Build a visual metaphor with large SVG objects and animated connections; reveal one concept at a time, use minimal labels, and end on the practical meaning. Title: “Availability, safety and Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-03 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M10-U2-C2 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Sort the Scenario: Availability, safety and segmentation",
      "type": "sorting",
      "rawActivityType": "Safe / Unsafe Sorter",
      "instructions": "Present Focus: Availability, safety and segmentation. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one viewport.",
      "scenario": "Mentor Karthik introduces how XDR, EDR, SIEM, SOAR and case-management tools complement one another, then contrasts office IT with OT/ICS safety and availability needs.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "sort-M10-U2-C2-1",
          "label": "Authorized Scheduled Maintenance on Host: CDAC-BLR-WS-03",
          "category": "Safe / Routine",
          "summary": "Documented IT change window activity verified against internal change request ticket."
        },
        {
          "id": "sort-M10-U2-C2-2",
          "label": "Unauthenticated Ingress Connection via Ephemeral Port",
          "category": "Suspicious / Unsafe",
          "summary": "Incoming network connection without prior session establishment or identity certificate."
        },
        {
          "id": "sort-M10-U2-C2-3",
          "label": "Standard Domain Controller Sync (Host: CDAC-BLR-DC01)",
          "category": "Safe / Routine",
          "summary": "Routine Kerberos ticket granting and LDAP directory replication between authoritative servers."
        },
        {
          "id": "sort-M10-U2-C2-4",
          "label": "Encoded PowerShell Command from Temporary Folder",
          "category": "Suspicious / Unsafe",
          "summary": "Base64 encoded execution launched from AppData\\Local\\Temp by a standard user account."
        }
      ]
    }
  },
  "M10-U3-C1": {
    "chapterId": "M10-U3-C1",
    "chapterTitle": "Common response actions at a high level",
    "moduleId": "10",
    "moduleTitle": "Security Ecosystem: XDR, Response Tools & OT/ICS",
    "unitId": "M10-U3",
    "unitTitle": "Response Boundaries",
    "mentorContext": "Mentor Karthik introduces how XDR, EDR, SIEM, SOAR and case-management tools complement one another, then contrasts office IT with OT/ICS safety and availability needs.",
    "section2": {
      "title": "Common response actions at a high level — Visual Story",
      "visualType": "animated-story",
      "rawVisualFormat": "Animated Workflow",
      "description": "Animate the analyst moving through the workflow using large character and tool icons; each step lights up, transitions smoothly, and ends with the resulting status. Title: “Common response actions at",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Common response actions at a high level — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-12 (10.0.4.41). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-12 | IP: 10.0.4.41 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Animate the analyst moving through the workflow using large character and tool icons; each step lights up, transitions smoothly, and ends with the resulting status. Title: “Common response actions at Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-12 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M10-U3-C1 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Build the Flow: Common response actions at a high level",
      "type": "drag-drop",
      "rawActivityType": "Drag-and-Drop Workflow",
      "instructions": "Provide Focus: Common response actions at a high level. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity",
      "scenario": "Mentor Karthik introduces how XDR, EDR, SIEM, SOAR and case-management tools complement one another, then contrasts office IT with OT/ICS safety and availability needs.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "step-M10-U3-C1-1",
          "label": "Step 1: Alert Ingestion & Queue Assignment",
          "summary": "Acknowledge incoming telemetry in the SIEM alert queue and assign ticket to active shift analyst."
        },
        {
          "id": "step-M10-U3-C1-2",
          "label": "Step 2: Entity Identification & Asset Context",
          "summary": "Identify the 5 Ws: Affected Host Name, Source IP, User Account, and Network Segment."
        },
        {
          "id": "step-M10-U3-C1-3",
          "label": "Step 3: Playbook Verification & False Positive Filter",
          "summary": "Validate against known baseline exceptions, standard maintenance windows, and SOP criteria."
        },
        {
          "id": "step-M10-U3-C1-4",
          "label": "Step 4: Ticket Disposition & Escalation Handoff",
          "summary": "Document exact findings with verified evidence, set severity disposition, and escalate to L2."
        }
      ]
    }
  },
  "M10-U3-C2": {
    "chapterId": "M10-U3-C2",
    "chapterTitle": "When to stop, seek approval and escalate",
    "moduleId": "10",
    "moduleTitle": "Security Ecosystem: XDR, Response Tools & OT/ICS",
    "unitId": "M10-U3",
    "unitTitle": "Response Boundaries",
    "mentorContext": "Mentor Karthik introduces how XDR, EDR, SIEM, SOAR and case-management tools complement one another, then contrasts office IT with OT/ICS safety and availability needs.",
    "section2": {
      "title": "When to stop, seek approval and escalate — Visual Story",
      "visualType": "animated-story",
      "rawVisualFormat": "Animated Workflow",
      "description": "Animate the analyst moving through the workflow using large character and tool icons; each step lights up, transitions smoothly, and ends with the resulting status. Title: “When to stop, seek",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "When to stop, seek approval and escalate — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-13 (10.0.4.42). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-13 | IP: 10.0.4.42 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Animate the analyst moving through the workflow using large character and tool icons; each step lights up, transitions smoothly, and ends with the resulting status. Title: “When to stop, seek Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-13 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M10-U3-C2 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Build the Flow: When to stop, seek approval and escalate",
      "type": "drag-drop",
      "rawActivityType": "Drag-and-Drop Workflow",
      "instructions": "Provide Focus: When to stop, seek approval and escalate. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity",
      "scenario": "Mentor Karthik introduces how XDR, EDR, SIEM, SOAR and case-management tools complement one another, then contrasts office IT with OT/ICS safety and availability needs.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "step-M10-U3-C2-1",
          "label": "Step 1: Alert Ingestion & Queue Assignment",
          "summary": "Acknowledge incoming telemetry in the SIEM alert queue and assign ticket to active shift analyst."
        },
        {
          "id": "step-M10-U3-C2-2",
          "label": "Step 2: Entity Identification & Asset Context",
          "summary": "Identify the 5 Ws: Affected Host Name, Source IP, User Account, and Network Segment."
        },
        {
          "id": "step-M10-U3-C2-3",
          "label": "Step 3: Playbook Verification & False Positive Filter",
          "summary": "Validate against known baseline exceptions, standard maintenance windows, and SOP criteria."
        },
        {
          "id": "step-M10-U3-C2-4",
          "label": "Step 4: Ticket Disposition & Escalation Handoff",
          "summary": "Document exact findings with verified evidence, set severity disposition, and escalate to L2."
        }
      ]
    }
  },
  "M11-U1-C1": {
    "chapterId": "M11-U1-C1",
    "chapterTitle": "Authentication, MFA and sign-ins",
    "moduleId": "11",
    "moduleTitle": "Identity, Email & Threat Intelligence",
    "unitId": "M11-U1",
    "unitTitle": "Identity Monitoring",
    "mentorContext": "Mentor Meera helps you triage a suspicious sign-in and reported email, then enriches sample indicators using public sources and careful confidence notes.",
    "section2": {
      "title": "Authentication, MFA and sign-ins — Visual Story",
      "visualType": "interface-tour",
      "rawVisualFormat": "Security Interface Tour",
      "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Authentication, MFA and sign-ins”. Optional one-sentence",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Authentication, MFA and sign-ins — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-12 (10.0.4.21). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-12 | IP: 10.0.4.21 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Authentication, MFA and sign-ins”. Optional one-sentence Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-12 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M11-U1-C1 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Reveal the Clues: Authentication, MFA and sign-ins",
      "type": "clue-reveal",
      "rawActivityType": "Clue & Evidence Reveal",
      "instructions": "Show Focus: Authentication, MFA and sign-ins. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one viewport.",
      "scenario": "Mentor Meera helps you triage a suspicious sign-in and reported email, then enriches sample indicators using public sources and careful confidence notes.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "clue-M11-U1-C1-1",
          "label": "Host Name & Asset Tag: CDAC-BLR-WS-12",
          "summary": "Confirmed client workstation in CDAC Bengaluru engineering lab segment with standard privileges."
        },
        {
          "id": "clue-M11-U1-C1-2",
          "label": "Process Execution Hierarchy & Parent PID",
          "summary": "Child process spawned under atypical parent, requiring command-line argument verification."
        },
        {
          "id": "clue-M11-U1-C1-3",
          "label": "Normalized UTC Timestamp & Event Frequency",
          "summary": "Event clustered within a 45-second window during non-business hours (02:14:32 UTC)."
        },
        {
          "id": "clue-M11-U1-C1-4",
          "label": "Network Destination & Reputation Confidence",
          "summary": "Outbound egress towards external IP flagged in threat intelligence feeds as suspicious C2 infrastructure."
        }
      ]
    }
  },
  "M11-U1-C2": {
    "chapterId": "M11-U1-C2",
    "chapterTitle": "Privileged accounts and context",
    "moduleId": "11",
    "moduleTitle": "Identity, Email & Threat Intelligence",
    "unitId": "M11-U1",
    "unitTitle": "Identity Monitoring",
    "mentorContext": "Mentor Meera helps you triage a suspicious sign-in and reported email, then enriches sample indicators using public sources and careful confidence notes.",
    "section2": {
      "title": "Privileged accounts and context — Visual Story",
      "visualType": "interface-tour",
      "rawVisualFormat": "Security Interface Tour",
      "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Privileged accounts and context”. Optional one-sentence",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Privileged accounts and context — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-13 (10.0.4.22). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-13 | IP: 10.0.4.22 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Privileged accounts and context”. Optional one-sentence Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-13 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M11-U1-C2 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Reveal the Clues: Privileged accounts and context",
      "type": "clue-reveal",
      "rawActivityType": "Clue & Evidence Reveal",
      "instructions": "Show Focus: Privileged accounts and context. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one viewport.",
      "scenario": "Mentor Meera helps you triage a suspicious sign-in and reported email, then enriches sample indicators using public sources and careful confidence notes.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "clue-M11-U1-C2-1",
          "label": "Host Name & Asset Tag: CDAC-BLR-WS-13",
          "summary": "Confirmed client workstation in CDAC Bengaluru engineering lab segment with standard privileges."
        },
        {
          "id": "clue-M11-U1-C2-2",
          "label": "Process Execution Hierarchy & Parent PID",
          "summary": "Child process spawned under atypical parent, requiring command-line argument verification."
        },
        {
          "id": "clue-M11-U1-C2-3",
          "label": "Normalized UTC Timestamp & Event Frequency",
          "summary": "Event clustered within a 45-second window during non-business hours (02:14:32 UTC)."
        },
        {
          "id": "clue-M11-U1-C2-4",
          "label": "Network Destination & Reputation Confidence",
          "summary": "Outbound egress towards external IP flagged in threat intelligence feeds as suspicious C2 infrastructure."
        }
      ]
    }
  },
  "M11-U2-C1": {
    "chapterId": "M11-U2-C1",
    "chapterTitle": "Sender, reply-to, URLs and attachments",
    "moduleId": "11",
    "moduleTitle": "Identity, Email & Threat Intelligence",
    "unitId": "M11-U2",
    "unitTitle": "Email Security Triage",
    "mentorContext": "Mentor Meera helps you triage a suspicious sign-in and reported email, then enriches sample indicators using public sources and careful confidence notes.",
    "section2": {
      "title": "Sender, reply-to, URLs and attachments — Visual Story",
      "visualType": "interface-tour",
      "rawVisualFormat": "Security Interface Tour",
      "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Sender, reply-to, URLs and attachments”. Optional",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Sender, reply-to, URLs and attachments — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-02 (10.0.4.31). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-02 | IP: 10.0.4.31 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Sender, reply-to, URLs and attachments”. Optional Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-02 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M11-U2-C1 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Reveal the Clues: Sender, reply-to, URLs and attachments",
      "type": "clue-reveal",
      "rawActivityType": "Clue & Evidence Reveal",
      "instructions": "Show Focus: Sender, reply-to, URLs and attachments. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one",
      "scenario": "Mentor Meera helps you triage a suspicious sign-in and reported email, then enriches sample indicators using public sources and careful confidence notes.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "clue-M11-U2-C1-1",
          "label": "Host Name & Asset Tag: CDAC-BLR-WS-02",
          "summary": "Confirmed client workstation in CDAC Bengaluru engineering lab segment with standard privileges."
        },
        {
          "id": "clue-M11-U2-C1-2",
          "label": "Process Execution Hierarchy & Parent PID",
          "summary": "Child process spawned under atypical parent, requiring command-line argument verification."
        },
        {
          "id": "clue-M11-U2-C1-3",
          "label": "Normalized UTC Timestamp & Event Frequency",
          "summary": "Event clustered within a 45-second window during non-business hours (02:14:32 UTC)."
        },
        {
          "id": "clue-M11-U2-C1-4",
          "label": "Network Destination & Reputation Confidence",
          "summary": "Outbound egress towards external IP flagged in threat intelligence feeds as suspicious C2 infrastructure."
        }
      ]
    }
  },
  "M11-U2-C2": {
    "chapterId": "M11-U2-C2",
    "chapterTitle": "Safe handling of suspicious messages",
    "moduleId": "11",
    "moduleTitle": "Identity, Email & Threat Intelligence",
    "unitId": "M11-U2",
    "unitTitle": "Email Security Triage",
    "mentorContext": "Mentor Meera helps you triage a suspicious sign-in and reported email, then enriches sample indicators using public sources and careful confidence notes.",
    "section2": {
      "title": "Safe handling of suspicious messages — Visual Story",
      "visualType": "interface-tour",
      "rawVisualFormat": "Security Interface Tour",
      "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Safe handling of suspicious messages”. Optional",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Safe handling of suspicious messages — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-03 (10.0.4.32). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-03 | IP: 10.0.4.32 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Safe handling of suspicious messages”. Optional Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-03 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M11-U2-C2 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Sort the Scenario: Safe handling of suspicious messages",
      "type": "sorting",
      "rawActivityType": "Safe / Unsafe Sorter",
      "instructions": "Present Focus: Safe handling of suspicious messages. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one",
      "scenario": "Mentor Meera helps you triage a suspicious sign-in and reported email, then enriches sample indicators using public sources and careful confidence notes.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "sort-M11-U2-C2-1",
          "label": "Authorized Scheduled Maintenance on Host: CDAC-BLR-WS-03",
          "category": "Safe / Routine",
          "summary": "Documented IT change window activity verified against internal change request ticket."
        },
        {
          "id": "sort-M11-U2-C2-2",
          "label": "Unauthenticated Ingress Connection via Ephemeral Port",
          "category": "Suspicious / Unsafe",
          "summary": "Incoming network connection without prior session establishment or identity certificate."
        },
        {
          "id": "sort-M11-U2-C2-3",
          "label": "Standard Domain Controller Sync (Host: CDAC-BLR-DC01)",
          "category": "Safe / Routine",
          "summary": "Routine Kerberos ticket granting and LDAP directory replication between authoritative servers."
        },
        {
          "id": "sort-M11-U2-C2-4",
          "label": "Encoded PowerShell Command from Temporary Folder",
          "category": "Suspicious / Unsafe",
          "summary": "Base64 encoded execution launched from AppData\\Local\\Temp by a standard user account."
        }
      ]
    }
  },
  "M11-U3-C1": {
    "chapterId": "M11-U3-C1",
    "chapterTitle": "IOC types and reputation sources",
    "moduleId": "11",
    "moduleTitle": "Identity, Email & Threat Intelligence",
    "unitId": "M11-U3",
    "unitTitle": "Threat Intelligence Basics",
    "mentorContext": "Mentor Meera helps you triage a suspicious sign-in and reported email, then enriches sample indicators using public sources and careful confidence notes.",
    "section2": {
      "title": "IOC types and reputation sources — Visual Story",
      "visualType": "diagram",
      "rawVisualFormat": "Concept Visualization",
      "description": "Build a visual metaphor with large SVG objects and animated connections; reveal one concept at a time, use minimal labels, and end on the practical meaning. Title: “IOC types and",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "IOC types and reputation sources — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-12 (10.0.4.41). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-12 | IP: 10.0.4.41 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Build a visual metaphor with large SVG objects and animated connections; reveal one concept at a time, use minimal labels, and end on the practical meaning. Title: “IOC types and Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-12 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M11-U3-C1 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Reveal the Clues: IOC types and reputation sources",
      "type": "clue-reveal",
      "rawActivityType": "Clue & Evidence Reveal",
      "instructions": "Show Focus: IOC types and reputation sources. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one",
      "scenario": "Mentor Meera helps you triage a suspicious sign-in and reported email, then enriches sample indicators using public sources and careful confidence notes.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "clue-M11-U3-C1-1",
          "label": "Host Name & Asset Tag: CDAC-BLR-WS-12",
          "summary": "Confirmed client workstation in CDAC Bengaluru engineering lab segment with standard privileges."
        },
        {
          "id": "clue-M11-U3-C1-2",
          "label": "Process Execution Hierarchy & Parent PID",
          "summary": "Child process spawned under atypical parent, requiring command-line argument verification."
        },
        {
          "id": "clue-M11-U3-C1-3",
          "label": "Normalized UTC Timestamp & Event Frequency",
          "summary": "Event clustered within a 45-second window during non-business hours (02:14:32 UTC)."
        },
        {
          "id": "clue-M11-U3-C1-4",
          "label": "Network Destination & Reputation Confidence",
          "summary": "Outbound egress towards external IP flagged in threat intelligence feeds as suspicious C2 infrastructure."
        }
      ]
    }
  },
  "M11-U3-C2": {
    "chapterId": "M11-U3-C2",
    "chapterTitle": "Confidence, freshness and context",
    "moduleId": "11",
    "moduleTitle": "Identity, Email & Threat Intelligence",
    "unitId": "M11-U3",
    "unitTitle": "Threat Intelligence Basics",
    "mentorContext": "Mentor Meera helps you triage a suspicious sign-in and reported email, then enriches sample indicators using public sources and careful confidence notes.",
    "section2": {
      "title": "Confidence, freshness and context — Visual Story",
      "visualType": "diagram",
      "rawVisualFormat": "Concept Visualization",
      "description": "Build a visual metaphor with large SVG objects and animated connections; reveal one concept at a time, use minimal labels, and end on the practical meaning. Title: “Confidence, freshness and",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Confidence, freshness and context — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-13 (10.0.4.42). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-13 | IP: 10.0.4.42 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Build a visual metaphor with large SVG objects and animated connections; reveal one concept at a time, use minimal labels, and end on the practical meaning. Title: “Confidence, freshness and Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-13 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M11-U3-C2 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Sort the Scenario: Confidence, freshness and context",
      "type": "sorting",
      "rawActivityType": "Safe / Unsafe Sorter",
      "instructions": "Present Focus: Confidence, freshness and context. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one viewport.",
      "scenario": "Mentor Meera helps you triage a suspicious sign-in and reported email, then enriches sample indicators using public sources and careful confidence notes.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "sort-M11-U3-C2-1",
          "label": "Authorized Scheduled Maintenance on Host: CDAC-BLR-WS-13",
          "category": "Safe / Routine",
          "summary": "Documented IT change window activity verified against internal change request ticket."
        },
        {
          "id": "sort-M11-U3-C2-2",
          "label": "Unauthenticated Ingress Connection via Ephemeral Port",
          "category": "Suspicious / Unsafe",
          "summary": "Incoming network connection without prior session establishment or identity certificate."
        },
        {
          "id": "sort-M11-U3-C2-3",
          "label": "Standard Domain Controller Sync (Host: CDAC-BLR-DC01)",
          "category": "Safe / Routine",
          "summary": "Routine Kerberos ticket granting and LDAP directory replication between authoritative servers."
        },
        {
          "id": "sort-M11-U3-C2-4",
          "label": "Encoded PowerShell Command from Temporary Folder",
          "category": "Suspicious / Unsafe",
          "summary": "Base64 encoded execution launched from AppData\\Local\\Temp by a standard user account."
        }
      ]
    }
  },
  "M12-U1-C1": {
    "chapterId": "M12-U1-C1",
    "chapterTitle": "Triggers, actions and playbooks",
    "moduleId": "12",
    "moduleTitle": "SOAR & Basic SOC Automation",
    "unitId": "M12-U1",
    "unitTitle": "Automation Concepts",
    "mentorContext": "Mentor Karthik demonstrates a safe, approval-based playbook for repetitive enrichment and notification tasks.",
    "section2": {
      "title": "Triggers, actions and playbooks — Visual Story",
      "visualType": "interface-tour",
      "rawVisualFormat": "Security Interface Tour",
      "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Triggers, actions and playbooks”. Optional one-sentence",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Triggers, actions and playbooks — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-12 (10.0.4.21). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-12 | IP: 10.0.4.21 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Triggers, actions and playbooks”. Optional one-sentence Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-12 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M12-U1-C1 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Build the Flow: Triggers, actions and playbooks",
      "type": "drag-drop",
      "rawActivityType": "Drag-and-Drop Workflow",
      "instructions": "Provide Focus: Triggers, actions and playbooks. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one viewport.",
      "scenario": "Mentor Karthik demonstrates a safe, approval-based playbook for repetitive enrichment and notification tasks.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "step-M12-U1-C1-1",
          "label": "Step 1: Alert Ingestion & Queue Assignment",
          "summary": "Acknowledge incoming telemetry in the SIEM alert queue and assign ticket to active shift analyst."
        },
        {
          "id": "step-M12-U1-C1-2",
          "label": "Step 2: Entity Identification & Asset Context",
          "summary": "Identify the 5 Ws: Affected Host Name, Source IP, User Account, and Network Segment."
        },
        {
          "id": "step-M12-U1-C1-3",
          "label": "Step 3: Playbook Verification & False Positive Filter",
          "summary": "Validate against known baseline exceptions, standard maintenance windows, and SOP criteria."
        },
        {
          "id": "step-M12-U1-C1-4",
          "label": "Step 4: Ticket Disposition & Escalation Handoff",
          "summary": "Document exact findings with verified evidence, set severity disposition, and escalate to L2."
        }
      ]
    }
  },
  "M12-U1-C2": {
    "chapterId": "M12-U1-C2",
    "chapterTitle": "Enrichment and notification use cases",
    "moduleId": "12",
    "moduleTitle": "SOAR & Basic SOC Automation",
    "unitId": "M12-U1",
    "unitTitle": "Automation Concepts",
    "mentorContext": "Mentor Karthik demonstrates a safe, approval-based playbook for repetitive enrichment and notification tasks.",
    "section2": {
      "title": "Enrichment and notification use cases — Visual Story",
      "visualType": "animated-story",
      "rawVisualFormat": "Animated Workflow",
      "description": "Animate the analyst moving through the workflow using large character and tool icons; each step lights up, transitions smoothly, and ends with the resulting status. Title: “Enrichment and notification use",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Enrichment and notification use cases — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-13 (10.0.4.22). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-13 | IP: 10.0.4.22 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Animate the analyst moving through the workflow using large character and tool icons; each step lights up, transitions smoothly, and ends with the resulting status. Title: “Enrichment and notification use Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-13 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M12-U1-C2 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Build the Flow: Enrichment and notification use cases",
      "type": "drag-drop",
      "rawActivityType": "Drag-and-Drop Workflow",
      "instructions": "Provide Focus: Enrichment and notification use cases. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one",
      "scenario": "Mentor Karthik demonstrates a safe, approval-based playbook for repetitive enrichment and notification tasks.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "step-M12-U1-C2-1",
          "label": "Step 1: Alert Ingestion & Queue Assignment",
          "summary": "Acknowledge incoming telemetry in the SIEM alert queue and assign ticket to active shift analyst."
        },
        {
          "id": "step-M12-U1-C2-2",
          "label": "Step 2: Entity Identification & Asset Context",
          "summary": "Identify the 5 Ws: Affected Host Name, Source IP, User Account, and Network Segment."
        },
        {
          "id": "step-M12-U1-C2-3",
          "label": "Step 3: Playbook Verification & False Positive Filter",
          "summary": "Validate against known baseline exceptions, standard maintenance windows, and SOP criteria."
        },
        {
          "id": "step-M12-U1-C2-4",
          "label": "Step 4: Ticket Disposition & Escalation Handoff",
          "summary": "Document exact findings with verified evidence, set severity disposition, and escalate to L2."
        }
      ]
    }
  },
  "M12-U2-C1": {
    "chapterId": "M12-U2-C1",
    "chapterTitle": "Conditions and approval gates",
    "moduleId": "12",
    "moduleTitle": "SOAR & Basic SOC Automation",
    "unitId": "M12-U2",
    "unitTitle": "Safe Workflow Design",
    "mentorContext": "Mentor Karthik demonstrates a safe, approval-based playbook for repetitive enrichment and notification tasks.",
    "section2": {
      "title": "Conditions and approval gates — Visual Story",
      "visualType": "animated-story",
      "rawVisualFormat": "Animated Workflow",
      "description": "Animate the analyst moving through the workflow using large character and tool icons; each step lights up, transitions smoothly, and ends with the resulting status. Title: “Conditions and approval gates”.",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Conditions and approval gates — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-02 (10.0.4.31). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-02 | IP: 10.0.4.31 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Animate the analyst moving through the workflow using large character and tool icons; each step lights up, transitions smoothly, and ends with the resulting status. Title: “Conditions and approval gates”. Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-02 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M12-U2-C1 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Build the Flow: Conditions and approval gates",
      "type": "drag-drop",
      "rawActivityType": "Drag-and-Drop Workflow",
      "instructions": "Provide Focus: Conditions and approval gates. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one viewport.",
      "scenario": "Mentor Karthik demonstrates a safe, approval-based playbook for repetitive enrichment and notification tasks.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "step-M12-U2-C1-1",
          "label": "Step 1: Alert Ingestion & Queue Assignment",
          "summary": "Acknowledge incoming telemetry in the SIEM alert queue and assign ticket to active shift analyst."
        },
        {
          "id": "step-M12-U2-C1-2",
          "label": "Step 2: Entity Identification & Asset Context",
          "summary": "Identify the 5 Ws: Affected Host Name, Source IP, User Account, and Network Segment."
        },
        {
          "id": "step-M12-U2-C1-3",
          "label": "Step 3: Playbook Verification & False Positive Filter",
          "summary": "Validate against known baseline exceptions, standard maintenance windows, and SOP criteria."
        },
        {
          "id": "step-M12-U2-C1-4",
          "label": "Step 4: Ticket Disposition & Escalation Handoff",
          "summary": "Document exact findings with verified evidence, set severity disposition, and escalate to L2."
        }
      ]
    }
  },
  "M12-U2-C2": {
    "chapterId": "M12-U2-C2",
    "chapterTitle": "Failure handling, logging and auditability",
    "moduleId": "12",
    "moduleTitle": "SOAR & Basic SOC Automation",
    "unitId": "M12-U2",
    "unitTitle": "Safe Workflow Design",
    "mentorContext": "Mentor Karthik demonstrates a safe, approval-based playbook for repetitive enrichment and notification tasks.",
    "section2": {
      "title": "Failure handling, logging and auditability — Visual Story",
      "visualType": "interface-tour",
      "rawVisualFormat": "Security Interface Tour",
      "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Failure handling, logging and auditability”. Optional",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Failure handling, logging and auditability — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-03 (10.0.4.32). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-03 | IP: 10.0.4.32 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Failure handling, logging and auditability”. Optional Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-03 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M12-U2-C2 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Build the Flow: Failure handling, logging and auditability",
      "type": "drag-drop",
      "rawActivityType": "Drag-and-Drop Workflow",
      "instructions": "Provide Focus: Failure handling, logging and auditability. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one",
      "scenario": "Mentor Karthik demonstrates a safe, approval-based playbook for repetitive enrichment and notification tasks.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "step-M12-U2-C2-1",
          "label": "Step 1: Alert Ingestion & Queue Assignment",
          "summary": "Acknowledge incoming telemetry in the SIEM alert queue and assign ticket to active shift analyst."
        },
        {
          "id": "step-M12-U2-C2-2",
          "label": "Step 2: Entity Identification & Asset Context",
          "summary": "Identify the 5 Ws: Affected Host Name, Source IP, User Account, and Network Segment."
        },
        {
          "id": "step-M12-U2-C2-3",
          "label": "Step 3: Playbook Verification & False Positive Filter",
          "summary": "Validate against known baseline exceptions, standard maintenance windows, and SOP criteria."
        },
        {
          "id": "step-M12-U2-C2-4",
          "label": "Step 4: Ticket Disposition & Escalation Handoff",
          "summary": "Document exact findings with verified evidence, set severity disposition, and escalate to L2."
        }
      ]
    }
  },
  "M12-U3-C1": {
    "chapterId": "M12-U3-C1",
    "chapterTitle": "Human review and reversible actions",
    "moduleId": "12",
    "moduleTitle": "SOAR & Basic SOC Automation",
    "unitId": "M12-U3",
    "unitTitle": "L1 Automation Boundaries",
    "mentorContext": "Mentor Karthik demonstrates a safe, approval-based playbook for repetitive enrichment and notification tasks.",
    "section2": {
      "title": "Human review and reversible actions — Visual Story",
      "visualType": "interface-tour",
      "rawVisualFormat": "Security Interface Tour",
      "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Human review and reversible actions”. Optional",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Human review and reversible actions — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-12 (10.0.4.41). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-12 | IP: 10.0.4.41 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Human review and reversible actions”. Optional Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-12 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M12-U3-C1 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Sort the Scenario: Human review and reversible actions",
      "type": "sorting",
      "rawActivityType": "Safe / Unsafe Sorter",
      "instructions": "Present Focus: Human review and reversible actions. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one",
      "scenario": "Mentor Karthik demonstrates a safe, approval-based playbook for repetitive enrichment and notification tasks.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "sort-M12-U3-C1-1",
          "label": "Authorized Scheduled Maintenance on Host: CDAC-BLR-WS-12",
          "category": "Safe / Routine",
          "summary": "Documented IT change window activity verified against internal change request ticket."
        },
        {
          "id": "sort-M12-U3-C1-2",
          "label": "Unauthenticated Ingress Connection via Ephemeral Port",
          "category": "Suspicious / Unsafe",
          "summary": "Incoming network connection without prior session establishment or identity certificate."
        },
        {
          "id": "sort-M12-U3-C1-3",
          "label": "Standard Domain Controller Sync (Host: CDAC-BLR-DC01)",
          "category": "Safe / Routine",
          "summary": "Routine Kerberos ticket granting and LDAP directory replication between authoritative servers."
        },
        {
          "id": "sort-M12-U3-C1-4",
          "label": "Encoded PowerShell Command from Temporary Folder",
          "category": "Suspicious / Unsafe",
          "summary": "Base64 encoded execution launched from AppData\\Local\\Temp by a standard user account."
        }
      ]
    }
  },
  "M12-U3-C2": {
    "chapterId": "M12-U3-C2",
    "chapterTitle": "What must not run automatically",
    "moduleId": "12",
    "moduleTitle": "SOAR & Basic SOC Automation",
    "unitId": "M12-U3",
    "unitTitle": "L1 Automation Boundaries",
    "mentorContext": "Mentor Karthik demonstrates a safe, approval-based playbook for repetitive enrichment and notification tasks.",
    "section2": {
      "title": "What must not run automatically — Visual Story",
      "visualType": "packet-flow",
      "rawVisualFormat": "Data-Flow Animation",
      "description": "Animate a staff device sending packets through branch network components; use moving dots, large SVG icons, glowing paths, and a clear source-to-destination route. Title: “What must not run automatically”. Optional",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "What must not run automatically — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-13 (10.0.4.42). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-13 | IP: 10.0.4.42 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Animate a staff device sending packets through branch network components; use moving dots, large SVG icons, glowing paths, and a clear source-to-destination route. Title: “What must not run automatically”. Optional Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-13 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M12-U3-C2 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Reveal the Clues: What must not run automatically",
      "type": "clue-reveal",
      "rawActivityType": "Clue & Evidence Reveal",
      "instructions": "Show Focus: What must not run automatically. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one",
      "scenario": "Mentor Karthik demonstrates a safe, approval-based playbook for repetitive enrichment and notification tasks.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "clue-M12-U3-C2-1",
          "label": "Host Name & Asset Tag: CDAC-BLR-WS-13",
          "summary": "Confirmed client workstation in CDAC Bengaluru engineering lab segment with standard privileges."
        },
        {
          "id": "clue-M12-U3-C2-2",
          "label": "Process Execution Hierarchy & Parent PID",
          "summary": "Child process spawned under atypical parent, requiring command-line argument verification."
        },
        {
          "id": "clue-M12-U3-C2-3",
          "label": "Normalized UTC Timestamp & Event Frequency",
          "summary": "Event clustered within a 45-second window during non-business hours (02:14:32 UTC)."
        },
        {
          "id": "clue-M12-U3-C2-4",
          "label": "Network Destination & Reputation Confidence",
          "summary": "Outbound egress towards external IP flagged in threat intelligence feeds as suspicious C2 infrastructure."
        }
      ]
    }
  },
  "M13-U1-C1": {
    "chapterId": "M13-U1-C1",
    "chapterTitle": "Tactics, techniques and procedures",
    "moduleId": "13",
    "moduleTitle": "MITRE ATT&CK for L1 Analysts",
    "unitId": "M13-U1",
    "unitTitle": "ATT&CK Basics",
    "mentorContext": "Mentor Ananya shows how to use ATT&CK as a shared vocabulary for observed behavior without overclaiming that a technique mapping proves an attack.",
    "section2": {
      "title": "Tactics, techniques and procedures — Visual Story",
      "visualType": "diagram",
      "rawVisualFormat": "Concept Visualization",
      "description": "Build a visual metaphor with large SVG objects and animated connections; reveal one concept at a time, use minimal labels, and end on the practical meaning. Title: “Tactics, techniques and",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Tactics, techniques and procedures — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-12 (10.0.4.21). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-12 | IP: 10.0.4.21 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Build a visual metaphor with large SVG objects and animated connections; reveal one concept at a time, use minimal labels, and end on the practical meaning. Title: “Tactics, techniques and Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-12 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M13-U1-C1 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Reveal the Clues: Tactics, techniques and procedures",
      "type": "clue-reveal",
      "rawActivityType": "Clue & Evidence Reveal",
      "instructions": "Show Focus: Tactics, techniques and procedures. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one viewport.",
      "scenario": "Mentor Ananya shows how to use ATT&CK as a shared vocabulary for observed behavior without overclaiming that a technique mapping proves an attack.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "clue-M13-U1-C1-1",
          "label": "Host Name & Asset Tag: CDAC-BLR-WS-12",
          "summary": "Confirmed client workstation in CDAC Bengaluru engineering lab segment with standard privileges."
        },
        {
          "id": "clue-M13-U1-C1-2",
          "label": "Process Execution Hierarchy & Parent PID",
          "summary": "Child process spawned under atypical parent, requiring command-line argument verification."
        },
        {
          "id": "clue-M13-U1-C1-3",
          "label": "Normalized UTC Timestamp & Event Frequency",
          "summary": "Event clustered within a 45-second window during non-business hours (02:14:32 UTC)."
        },
        {
          "id": "clue-M13-U1-C1-4",
          "label": "Network Destination & Reputation Confidence",
          "summary": "Outbound egress towards external IP flagged in threat intelligence feeds as suspicious C2 infrastructure."
        }
      ]
    }
  },
  "M13-U1-C2": {
    "chapterId": "M13-U1-C2",
    "chapterTitle": "Using the matrix as a vocabulary",
    "moduleId": "13",
    "moduleTitle": "MITRE ATT&CK for L1 Analysts",
    "unitId": "M13-U1",
    "unitTitle": "ATT&CK Basics",
    "mentorContext": "Mentor Ananya shows how to use ATT&CK as a shared vocabulary for observed behavior without overclaiming that a technique mapping proves an attack.",
    "section2": {
      "title": "Using the matrix as a vocabulary — Visual Story",
      "visualType": "diagram",
      "rawVisualFormat": "Concept Visualization",
      "description": "Build a visual metaphor with large SVG objects and animated connections; reveal one concept at a time, use minimal labels, and end on the practical meaning. Title: “Using the matrix",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Using the matrix as a vocabulary — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-13 (10.0.4.22). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-13 | IP: 10.0.4.22 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Build a visual metaphor with large SVG objects and animated connections; reveal one concept at a time, use minimal labels, and end on the practical meaning. Title: “Using the matrix Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-13 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M13-U1-C2 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Reveal the Clues: Using the matrix as a vocabulary",
      "type": "clue-reveal",
      "rawActivityType": "Clue & Evidence Reveal",
      "instructions": "Show Focus: Using the matrix as a vocabulary. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within",
      "scenario": "Mentor Ananya shows how to use ATT&CK as a shared vocabulary for observed behavior without overclaiming that a technique mapping proves an attack.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "clue-M13-U1-C2-1",
          "label": "Host Name & Asset Tag: CDAC-BLR-WS-13",
          "summary": "Confirmed client workstation in CDAC Bengaluru engineering lab segment with standard privileges."
        },
        {
          "id": "clue-M13-U1-C2-2",
          "label": "Process Execution Hierarchy & Parent PID",
          "summary": "Child process spawned under atypical parent, requiring command-line argument verification."
        },
        {
          "id": "clue-M13-U1-C2-3",
          "label": "Normalized UTC Timestamp & Event Frequency",
          "summary": "Event clustered within a 45-second window during non-business hours (02:14:32 UTC)."
        },
        {
          "id": "clue-M13-U1-C2-4",
          "label": "Network Destination & Reputation Confidence",
          "summary": "Outbound egress towards external IP flagged in threat intelligence feeds as suspicious C2 infrastructure."
        }
      ]
    }
  },
  "M13-U2-C1": {
    "chapterId": "M13-U2-C1",
    "chapterTitle": "Credential access and discovery examples",
    "moduleId": "13",
    "moduleTitle": "MITRE ATT&CK for L1 Analysts",
    "unitId": "M13-U2",
    "unitTitle": "Map Basic Observations",
    "mentorContext": "Mentor Ananya shows how to use ATT&CK as a shared vocabulary for observed behavior without overclaiming that a technique mapping proves an attack.",
    "section2": {
      "title": "Credential access and discovery examples — Visual Story",
      "visualType": "animated-story",
      "rawVisualFormat": "Animated Workflow",
      "description": "Animate the analyst moving through the workflow using large character and tool icons; each step lights up, transitions smoothly, and ends with the resulting status. Title: “Credential access and discovery",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Credential access and discovery examples — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-02 (10.0.4.31). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-02 | IP: 10.0.4.31 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Animate the analyst moving through the workflow using large character and tool icons; each step lights up, transitions smoothly, and ends with the resulting status. Title: “Credential access and discovery Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-02 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M13-U2-C1 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Match the Concepts: Credential access and discovery examples",
      "type": "matching",
      "rawActivityType": "Concept / Term Matching",
      "instructions": "Create Focus: Credential access and discovery examples. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one",
      "scenario": "Mentor Ananya shows how to use ATT&CK as a shared vocabulary for observed behavior without overclaiming that a technique mapping proves an attack.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "match-M13-U2-C1-1",
          "label": "Core Observable on Host: CDAC-BLR-WS-02",
          "summary": "Raw telemetry indicator extracted directly from the system event log or network sensor."
        },
        {
          "id": "match-M13-U2-C1-2",
          "label": "SOP Baseline Verification",
          "summary": "Structured procedure to confirm whether the activity matches authorized organizational norms."
        },
        {
          "id": "match-M13-U2-C1-3",
          "label": "Correlation Context",
          "summary": "Connecting host activity with network logs to establish a coherent chronological narrative."
        },
        {
          "id": "match-M13-U2-C1-4",
          "label": "L1 Case Disposition",
          "summary": "Final categorization (True Positive / False Positive / Benign) with structured mentor handoff notes."
        }
      ]
    }
  },
  "M13-U2-C2": {
    "chapterId": "M13-U2-C2",
    "chapterTitle": "Choose a plausible technique carefully",
    "moduleId": "13",
    "moduleTitle": "MITRE ATT&CK for L1 Analysts",
    "unitId": "M13-U2",
    "unitTitle": "Map Basic Observations",
    "mentorContext": "Mentor Ananya shows how to use ATT&CK as a shared vocabulary for observed behavior without overclaiming that a technique mapping proves an attack.",
    "section2": {
      "title": "Choose a plausible technique carefully — Visual Story",
      "visualType": "interface-tour",
      "rawVisualFormat": "Security Interface Tour",
      "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Choose a plausible technique carefully”. Optional",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Choose a plausible technique carefully — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-03 (10.0.4.32). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-03 | IP: 10.0.4.32 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Show Ananya opening a simplified, fictional security interface; animate cursor clicks, zoom into relevant fields, then reveal the resulting record beside the screen. Title: “Choose a plausible technique carefully”. Optional Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-03 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M13-U2-C2 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Sort the Scenario: Choose a plausible technique carefully",
      "type": "sorting",
      "rawActivityType": "Safe / Unsafe Sorter",
      "instructions": "Present Focus: Choose a plausible technique carefully. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one",
      "scenario": "Mentor Ananya shows how to use ATT&CK as a shared vocabulary for observed behavior without overclaiming that a technique mapping proves an attack.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "sort-M13-U2-C2-1",
          "label": "Authorized Scheduled Maintenance on Host: CDAC-BLR-WS-03",
          "category": "Safe / Routine",
          "summary": "Documented IT change window activity verified against internal change request ticket."
        },
        {
          "id": "sort-M13-U2-C2-2",
          "label": "Unauthenticated Ingress Connection via Ephemeral Port",
          "category": "Suspicious / Unsafe",
          "summary": "Incoming network connection without prior session establishment or identity certificate."
        },
        {
          "id": "sort-M13-U2-C2-3",
          "label": "Standard Domain Controller Sync (Host: CDAC-BLR-DC01)",
          "category": "Safe / Routine",
          "summary": "Routine Kerberos ticket granting and LDAP directory replication between authoritative servers."
        },
        {
          "id": "sort-M13-U2-C2-4",
          "label": "Encoded PowerShell Command from Temporary Folder",
          "category": "Suspicious / Unsafe",
          "summary": "Base64 encoded execution launched from AppData\\Local\\Temp by a standard user account."
        }
      ]
    }
  },
  "M13-U3-C1": {
    "chapterId": "M13-U3-C1",
    "chapterTitle": "Evidence and uncertainty",
    "moduleId": "13",
    "moduleTitle": "MITRE ATT&CK for L1 Analysts",
    "unitId": "M13-U3",
    "unitTitle": "Communicate the Mapping",
    "mentorContext": "Mentor Ananya shows how to use ATT&CK as a shared vocabulary for observed behavior without overclaiming that a technique mapping proves an attack.",
    "section2": {
      "title": "Evidence and uncertainty — Visual Story",
      "visualType": "packet-flow",
      "rawVisualFormat": "Data-Flow Animation",
      "description": "Animate a staff device sending packets through branch network components; use moving dots, large SVG icons, glowing paths, and a clear source-to-destination route. Title: “Evidence and uncertainty”. Optional one-sentence description",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Evidence and uncertainty — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-12 (10.0.4.41). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-12 | IP: 10.0.4.41 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Animate a staff device sending packets through branch network components; use moving dots, large SVG icons, glowing paths, and a clear source-to-destination route. Title: “Evidence and uncertainty”. Optional one-sentence description Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-12 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M13-U3-C1 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Reveal the Clues: Evidence and uncertainty",
      "type": "clue-reveal",
      "rawActivityType": "Clue & Evidence Reveal",
      "instructions": "Show a Focus: Evidence and uncertainty. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one viewport.",
      "scenario": "Mentor Ananya shows how to use ATT&CK as a shared vocabulary for observed behavior without overclaiming that a technique mapping proves an attack.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "clue-M13-U3-C1-1",
          "label": "Host Name & Asset Tag: CDAC-BLR-WS-12",
          "summary": "Confirmed client workstation in CDAC Bengaluru engineering lab segment with standard privileges."
        },
        {
          "id": "clue-M13-U3-C1-2",
          "label": "Process Execution Hierarchy & Parent PID",
          "summary": "Child process spawned under atypical parent, requiring command-line argument verification."
        },
        {
          "id": "clue-M13-U3-C1-3",
          "label": "Normalized UTC Timestamp & Event Frequency",
          "summary": "Event clustered within a 45-second window during non-business hours (02:14:32 UTC)."
        },
        {
          "id": "clue-M13-U3-C1-4",
          "label": "Network Destination & Reputation Confidence",
          "summary": "Outbound egress towards external IP flagged in threat intelligence feeds as suspicious C2 infrastructure."
        }
      ]
    }
  },
  "M13-U3-C2": {
    "chapterId": "M13-U3-C2",
    "chapterTitle": "Do not infer a full attack chain",
    "moduleId": "13",
    "moduleTitle": "MITRE ATT&CK for L1 Analysts",
    "unitId": "M13-U3",
    "unitTitle": "Communicate the Mapping",
    "mentorContext": "Mentor Ananya shows how to use ATT&CK as a shared vocabulary for observed behavior without overclaiming that a technique mapping proves an attack.",
    "section2": {
      "title": "Do not infer a full attack chain — Visual Story",
      "visualType": "diagram",
      "rawVisualFormat": "Concept Visualization",
      "description": "Build a visual metaphor with large SVG objects and animated connections; reveal one concept at a time, use minimal labels, and end on the practical meaning. Title: “Do not infer",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Do not infer a full attack chain — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-13 (10.0.4.42). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-13 | IP: 10.0.4.42 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Build a visual metaphor with large SVG objects and animated connections; reveal one concept at a time, use minimal labels, and end on the practical meaning. Title: “Do not infer Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-13 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M13-U3-C2 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Sort the Scenario: Do not infer a full attack chain",
      "type": "sorting",
      "rawActivityType": "Safe / Unsafe Sorter",
      "instructions": "Present Focus: Do not infer a full attack chain. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity",
      "scenario": "Mentor Ananya shows how to use ATT&CK as a shared vocabulary for observed behavior without overclaiming that a technique mapping proves an attack.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "sort-M13-U3-C2-1",
          "label": "Authorized Scheduled Maintenance on Host: CDAC-BLR-WS-13",
          "category": "Safe / Routine",
          "summary": "Documented IT change window activity verified against internal change request ticket."
        },
        {
          "id": "sort-M13-U3-C2-2",
          "label": "Unauthenticated Ingress Connection via Ephemeral Port",
          "category": "Suspicious / Unsafe",
          "summary": "Incoming network connection without prior session establishment or identity certificate."
        },
        {
          "id": "sort-M13-U3-C2-3",
          "label": "Standard Domain Controller Sync (Host: CDAC-BLR-DC01)",
          "category": "Safe / Routine",
          "summary": "Routine Kerberos ticket granting and LDAP directory replication between authoritative servers."
        },
        {
          "id": "sort-M13-U3-C2-4",
          "label": "Encoded PowerShell Command from Temporary Folder",
          "category": "Suspicious / Unsafe",
          "summary": "Base64 encoded execution launched from AppData\\Local\\Temp by a standard user account."
        }
      ]
    }
  },
  "M14-U1-C1": {
    "chapterId": "M14-U1-C1",
    "chapterTitle": "Preparation, detection, response and recovery",
    "moduleId": "14",
    "moduleTitle": "Incident Response & SOC Documentation",
    "unitId": "M14-U1",
    "unitTitle": "Incident Response Lifecycle",
    "mentorContext": "Mentors Ananya and Meera coach you to prepare a timeline, document findings, route escalation, complete a case record and hand over open work.",
    "section2": {
      "title": "Preparation, detection, response and recovery — Visual Story",
      "visualType": "animated-story",
      "rawVisualFormat": "Animated Workflow",
      "description": "Animate the analyst moving through the workflow using large character and tool icons; each step lights up, transitions smoothly, and ends with the resulting status. Title: “Preparation, detection, response and",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Preparation, detection, response and recovery — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-12 (10.0.4.21). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-12 | IP: 10.0.4.21 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Animate the analyst moving through the workflow using large character and tool icons; each step lights up, transitions smoothly, and ends with the resulting status. Title: “Preparation, detection, response and Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-12 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M14-U1-C1 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Build the Flow: Preparation, detection, response and recovery",
      "type": "drag-drop",
      "rawActivityType": "Drag-and-Drop Workflow",
      "instructions": "Provide Focus: Preparation, detection, response and recovery. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one",
      "scenario": "Mentors Ananya and Meera coach you to prepare a timeline, document findings, route escalation, complete a case record and hand over open work.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "step-M14-U1-C1-1",
          "label": "Step 1: Alert Ingestion & Queue Assignment",
          "summary": "Acknowledge incoming telemetry in the SIEM alert queue and assign ticket to active shift analyst."
        },
        {
          "id": "step-M14-U1-C1-2",
          "label": "Step 2: Entity Identification & Asset Context",
          "summary": "Identify the 5 Ws: Affected Host Name, Source IP, User Account, and Network Segment."
        },
        {
          "id": "step-M14-U1-C1-3",
          "label": "Step 3: Playbook Verification & False Positive Filter",
          "summary": "Validate against known baseline exceptions, standard maintenance windows, and SOP criteria."
        },
        {
          "id": "step-M14-U1-C1-4",
          "label": "Step 4: Ticket Disposition & Escalation Handoff",
          "summary": "Document exact findings with verified evidence, set severity disposition, and escalate to L2."
        }
      ]
    }
  },
  "M14-U1-C2": {
    "chapterId": "M14-U1-C2",
    "chapterTitle": "L1 responsibilities and escalation",
    "moduleId": "14",
    "moduleTitle": "Incident Response & SOC Documentation",
    "unitId": "M14-U1",
    "unitTitle": "Incident Response Lifecycle",
    "mentorContext": "Mentors Ananya and Meera coach you to prepare a timeline, document findings, route escalation, complete a case record and hand over open work.",
    "section2": {
      "title": "L1 responsibilities and escalation — Visual Story",
      "visualType": "animated-story",
      "rawVisualFormat": "Animated Workflow",
      "description": "Animate the analyst moving through the workflow using large character and tool icons; each step lights up, transitions smoothly, and ends with the resulting status. Title: “L1 responsibilities and escalation”.",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "L1 responsibilities and escalation — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-13 (10.0.4.22). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-13 | IP: 10.0.4.22 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Animate the analyst moving through the workflow using large character and tool icons; each step lights up, transitions smoothly, and ends with the resulting status. Title: “L1 responsibilities and escalation”. Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-13 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M14-U1-C2 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Build the Flow: L1 responsibilities and escalation",
      "type": "drag-drop",
      "rawActivityType": "Drag-and-Drop Workflow",
      "instructions": "Provide Focus: L1 responsibilities and escalation. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one viewport.",
      "scenario": "Mentors Ananya and Meera coach you to prepare a timeline, document findings, route escalation, complete a case record and hand over open work.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "step-M14-U1-C2-1",
          "label": "Step 1: Alert Ingestion & Queue Assignment",
          "summary": "Acknowledge incoming telemetry in the SIEM alert queue and assign ticket to active shift analyst."
        },
        {
          "id": "step-M14-U1-C2-2",
          "label": "Step 2: Entity Identification & Asset Context",
          "summary": "Identify the 5 Ws: Affected Host Name, Source IP, User Account, and Network Segment."
        },
        {
          "id": "step-M14-U1-C2-3",
          "label": "Step 3: Playbook Verification & False Positive Filter",
          "summary": "Validate against known baseline exceptions, standard maintenance windows, and SOP criteria."
        },
        {
          "id": "step-M14-U1-C2-4",
          "label": "Step 4: Ticket Disposition & Escalation Handoff",
          "summary": "Document exact findings with verified evidence, set severity disposition, and escalate to L2."
        }
      ]
    }
  },
  "M14-U2-C1": {
    "chapterId": "M14-U2-C1",
    "chapterTitle": "Timeline, evidence and clear notes",
    "moduleId": "14",
    "moduleTitle": "Incident Response & SOC Documentation",
    "unitId": "M14-U2",
    "unitTitle": "Case Documentation",
    "mentorContext": "Mentors Ananya and Meera coach you to prepare a timeline, document findings, route escalation, complete a case record and hand over open work.",
    "section2": {
      "title": "Timeline, evidence and clear notes — Visual Story",
      "visualType": "animated-story",
      "rawVisualFormat": "Animated Workflow",
      "description": "Animate the analyst moving through the workflow using large character and tool icons; each step lights up, transitions smoothly, and ends with the resulting status. Title: “Timeline, evidence and clear",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Timeline, evidence and clear notes — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-02 (10.0.4.31). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-02 | IP: 10.0.4.31 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Animate the analyst moving through the workflow using large character and tool icons; each step lights up, transitions smoothly, and ends with the resulting status. Title: “Timeline, evidence and clear Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-02 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M14-U2-C1 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Trace the Signal: Timeline, evidence and clear notes",
      "type": "packet-trace",
      "rawActivityType": "Packet / Event Tracer",
      "instructions": "Animate Focus: Timeline, evidence and clear notes. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one",
      "scenario": "Mentors Ananya and Meera coach you to prepare a timeline, document findings, route escalation, complete a case record and hand over open work.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "trace-M14-U2-C1-1",
          "label": "Ingress Packet at Gateway Router [Host: CDAC-BLR-WS-02]",
          "summary": "Initial TCP handshake packet traversing the perimeter interface with valid checksum."
        },
        {
          "id": "trace-M14-U2-C1-2",
          "label": "Passive TAP Sensor Inspection [Zeek-Perimeter-01]",
          "summary": "Protocol metadata extracted: SSL/TLS handshake certificates and SNI domain inspected."
        },
        {
          "id": "trace-M14-U2-C1-3",
          "label": "Core Switch Port Mirroring [Port 24]",
          "summary": "Payload header verified for anomaly indicators, protocol compliance, and anomalous flags."
        },
        {
          "id": "trace-M14-U2-C1-4",
          "label": "SIEM Forwarder Buffer [CDAC-SIEM-PROD]",
          "summary": "Indexed into event search repository within 1.2 seconds with normalized CIM fields."
        }
      ]
    }
  },
  "M14-U2-C2": {
    "chapterId": "M14-U2-C2",
    "chapterTitle": "Severity, confidence and disposition",
    "moduleId": "14",
    "moduleTitle": "Incident Response & SOC Documentation",
    "unitId": "M14-U2",
    "unitTitle": "Case Documentation",
    "mentorContext": "Mentors Ananya and Meera coach you to prepare a timeline, document findings, route escalation, complete a case record and hand over open work.",
    "section2": {
      "title": "Severity, confidence and disposition — Visual Story",
      "visualType": "animated-story",
      "rawVisualFormat": "Animated Workflow",
      "description": "Animate the analyst moving through the workflow using large character and tool icons; each step lights up, transitions smoothly, and ends with the resulting status. Title: “Severity, confidence and disposition”.",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Severity, confidence and disposition — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-03 (10.0.4.32). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-03 | IP: 10.0.4.32 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Animate the analyst moving through the workflow using large character and tool icons; each step lights up, transitions smoothly, and ends with the resulting status. Title: “Severity, confidence and disposition”. Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-03 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M14-U2-C2 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Build the Flow: Severity, confidence and disposition",
      "type": "drag-drop",
      "rawActivityType": "Drag-and-Drop Workflow",
      "instructions": "Provide Focus: Severity, confidence and disposition. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one viewport.",
      "scenario": "Mentors Ananya and Meera coach you to prepare a timeline, document findings, route escalation, complete a case record and hand over open work.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "step-M14-U2-C2-1",
          "label": "Step 1: Alert Ingestion & Queue Assignment",
          "summary": "Acknowledge incoming telemetry in the SIEM alert queue and assign ticket to active shift analyst."
        },
        {
          "id": "step-M14-U2-C2-2",
          "label": "Step 2: Entity Identification & Asset Context",
          "summary": "Identify the 5 Ws: Affected Host Name, Source IP, User Account, and Network Segment."
        },
        {
          "id": "step-M14-U2-C2-3",
          "label": "Step 3: Playbook Verification & False Positive Filter",
          "summary": "Validate against known baseline exceptions, standard maintenance windows, and SOP criteria."
        },
        {
          "id": "step-M14-U2-C2-4",
          "label": "Step 4: Ticket Disposition & Escalation Handoff",
          "summary": "Document exact findings with verified evidence, set severity disposition, and escalate to L2."
        }
      ]
    }
  },
  "M14-U3-C1": {
    "chapterId": "M14-U3-C1",
    "chapterTitle": "Escalation path and ownership",
    "moduleId": "14",
    "moduleTitle": "Incident Response & SOC Documentation",
    "unitId": "M14-U3",
    "unitTitle": "Handover and Closure",
    "mentorContext": "Mentors Ananya and Meera coach you to prepare a timeline, document findings, route escalation, complete a case record and hand over open work.",
    "section2": {
      "title": "Escalation path and ownership — Visual Story",
      "visualType": "animated-story",
      "rawVisualFormat": "Animated Workflow",
      "description": "Animate the analyst moving through the workflow using large character and tool icons; each step lights up, transitions smoothly, and ends with the resulting status. Title: “Escalation path and ownership”.",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Escalation path and ownership — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-12 (10.0.4.41). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-12 | IP: 10.0.4.41 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Animate the analyst moving through the workflow using large character and tool icons; each step lights up, transitions smoothly, and ends with the resulting status. Title: “Escalation path and ownership”. Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-12 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M14-U3-C1 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Build the Flow: Escalation path and ownership",
      "type": "drag-drop",
      "rawActivityType": "Drag-and-Drop Workflow",
      "instructions": "Provide Focus: Escalation path and ownership. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one viewport.",
      "scenario": "Mentors Ananya and Meera coach you to prepare a timeline, document findings, route escalation, complete a case record and hand over open work.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "step-M14-U3-C1-1",
          "label": "Step 1: Alert Ingestion & Queue Assignment",
          "summary": "Acknowledge incoming telemetry in the SIEM alert queue and assign ticket to active shift analyst."
        },
        {
          "id": "step-M14-U3-C1-2",
          "label": "Step 2: Entity Identification & Asset Context",
          "summary": "Identify the 5 Ws: Affected Host Name, Source IP, User Account, and Network Segment."
        },
        {
          "id": "step-M14-U3-C1-3",
          "label": "Step 3: Playbook Verification & False Positive Filter",
          "summary": "Validate against known baseline exceptions, standard maintenance windows, and SOP criteria."
        },
        {
          "id": "step-M14-U3-C1-4",
          "label": "Step 4: Ticket Disposition & Escalation Handoff",
          "summary": "Document exact findings with verified evidence, set severity disposition, and escalate to L2."
        }
      ]
    }
  },
  "M14-U3-C2": {
    "chapterId": "M14-U3-C2",
    "chapterTitle": "Shift handover and lessons learned",
    "moduleId": "14",
    "moduleTitle": "Incident Response & SOC Documentation",
    "unitId": "M14-U3",
    "unitTitle": "Handover and Closure",
    "mentorContext": "Mentors Ananya and Meera coach you to prepare a timeline, document findings, route escalation, complete a case record and hand over open work.",
    "section2": {
      "title": "Shift handover and lessons learned — Visual Story",
      "visualType": "animated-story",
      "rawVisualFormat": "Animated Workflow",
      "description": "Animate the analyst moving through the workflow using large character and tool icons; each step lights up, transitions smoothly, and ends with the resulting status. Title: “Shift handover and lessons",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Shift handover and lessons learned — Telemetry Ingestion",
          "description": "Sensor capture on Host Name: CDAC-BLR-WS-13 (10.0.4.42). Real-time event ingestion initiates forensic validation per CDAC SOPs.",
          "telemetrySnippet": "Host Name: CDAC-BLR-WS-13 | IP: 10.0.4.42 | User: b_sharma@cdac.in | Sensor: Zeek-TAP-01 | ACTION: ALERT",
          "highlightText": "Ingestion & Demarcation"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Contextual Identity & Entity Resolution",
          "description": "Animate the analyst moving through the workflow using large character and tool icons; each step lights up, transitions smoothly, and ends with the resulting status. Title: “Shift handover and lessons Correlating records across Active Directory (Host Name: CDAC-BLR-DC01).",
          "telemetrySnippet": "Target Host Name: CDAC-BLR-WS-13 | Domain: CDAC-BLR-DC01 | Role: Workstation | Criticality: Medium",
          "highlightText": "Context Cross-Check"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Playbook Execution & Indicator Verification",
          "description": "Verifying observed artifacts against baseline activity. Differentiating benign administrative tasks from unauthorized anomalies.",
          "telemetrySnippet": "CHECKLIST: Parent process, command-line arguments, hashes, and remote destinations evaluated.",
          "highlightText": "Playbook Verification"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Shift Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M14-U3-C2 | STATUS: Triaged | DISPOSITION: Verified Observables Attached",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Build the Flow: Shift handover and lessons learned",
      "type": "drag-drop",
      "rawActivityType": "Drag-and-Drop Workflow",
      "instructions": "Provide Focus: Shift handover and lessons learned. Use the CDAC Bengaluru training story, mentor characters, bold SVG icons, minimal text, and responsive dark/light styling; keep the complete activity within one",
      "scenario": "Mentors Ananya and Meera coach you to prepare a timeline, document findings, route escalation, complete a case record and hand over open work.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "step-M14-U3-C2-1",
          "label": "Step 1: Alert Ingestion & Queue Assignment",
          "summary": "Acknowledge incoming telemetry in the SIEM alert queue and assign ticket to active shift analyst."
        },
        {
          "id": "step-M14-U3-C2-2",
          "label": "Step 2: Entity Identification & Asset Context",
          "summary": "Identify the 5 Ws: Affected Host Name, Source IP, User Account, and Network Segment."
        },
        {
          "id": "step-M14-U3-C2-3",
          "label": "Step 3: Playbook Verification & False Positive Filter",
          "summary": "Validate against known baseline exceptions, standard maintenance windows, and SOP criteria."
        },
        {
          "id": "step-M14-U3-C2-4",
          "label": "Step 4: Ticket Disposition & Escalation Handoff",
          "summary": "Document exact findings with verified evidence, set severity disposition, and escalate to L2."
        }
      ]
    }
  }
};
