# Unified SOC Dashboard Lab System

## Overview

The **SOC Dashboard Lab System** is an isolated, interactive training environment that serves **4 progressive lab scenarios** (`lab-01` through `lab-04`) within a single, realistic Security Operations Center workstation.

The dashboard adapts its alerts, console telemetry, tasks, and validation according to the active `labId`, maintaining total narrative alignment with Module 04 ("Incident Triage & Analysis") and its characters (Rajesh Kumar, Priya Sharma, Aditya Deshmukh, Elena Gomez, and Michael Chen).

---

## Directory Architecture

```
/src/labs/
├── soc-dashboard/
│   ├── components/
│   │   ├── SocDashboardContainer.tsx       # Main orchestrator component
│   │   ├── SocHeader.tsx                   # Tactical SOC header & timer
│   │   ├── AlertQueuePanel.tsx             # Interactive alert queue & filter
│   │   ├── AlertDetailPanel.tsx            # Alert details & console host
│   │   ├── ConsoleTabsNavigation.tsx       # 5 console navigation tabs
│   │   ├── EmailGatewayConsole.tsx         # Inbound email inspection
│   │   ├── EDRConsole.tsx                  # Process tree & execution lineage
│   │   ├── SIEMConsole.tsx                 # Multi-source correlation rules
│   │   ├── FirewallConsole.tsx             # Network flows & Threat Intel
│   │   ├── TimelineConsole.tsx             # Chronological attack reconstruction
│   │   ├── EvidenceChecklistPanel.tsx      # Evidence discovery checklist
│   │   ├── LabTaskPanel.tsx                # Dynamic task & verdict panel
│   │   ├── LabControlsBar.tsx              # Hints, Reset, Submit controls
│   │   ├── DashboardTourOverlay.tsx        # Guided orientation tour
│   │   └── LabCompletionModal.tsx          # Scoring, feedback & debrief
│   │
│   ├── data/
│   │   ├── static-data.ts                  # FinCorp assets, users & hosts
│   │   ├── module-04-integration.ts        # Characters, timeline & dialogue
│   │   ├── console-data/                   # Realistic telemetry generators
│   │   └── lab-scenarios/                  # Lab 01 to 04 scenario datasets
│   │
│   ├── hooks/
│   │   ├── useSocDashboardState.ts         # Central state management
│   │   ├── useConsoleDataFetcher.ts        # Dynamic telemetry loader
│   │   ├── useLabValidation.ts             # Validation coordinator
│   │   └── useTourState.ts                 # Orientation tour state
│   │
│   ├── utils/
│   │   ├── validation.ts                   # Scoring and validation rules
│   │   ├── scoring.ts                      # Weighting & keyword evaluation
│   │   └── formatting.ts                   # Badges, durations & text sanitation
│   │
│   ├── styles/                             # Tactical dark theme & layout CSS
│   ├── SocDashboardLab.tsx                 # Direct wrapper export
│   └── index.ts                            # Barrel export
│
├── floating-lab-button/
│   ├── FloatingLabButton.tsx               # Fixed trigger button
│   ├── LabModalWindow.tsx                  # Resizable modal window
│   └── index.ts
│
├── index.ts                                # Top-level export
└── README.md                               # This documentation
```

---

## The 4 Progressive Labs

| Lab ID | Title | Difficulty | Focus | Passing Criteria |
| :--- | :--- | :--- | :--- | :--- |
| **`lab-01`** | Basic Alert Triage | Beginner | Extract 5 Critical W's (WHO, WHAT, WHERE, WHEN, HOW MANY) + TP/FP Verdict | All 5 fields correct, TP verdict, reasoning score >= 75% |
| **`lab-02`** | False Positive Discrimination | Intermediate | Classify 4 disparate alerts into True Positive, False Positive, or Expected Activity | At least 3 out of 4 correct (75%+) |
| **`lab-03`** | Severity Classification | Intermediate | Apply Severity Matrix (Asset Tier × Threat Status × Impact) to 6 incidents & allocate shift capacity | At least 5 out of 6 correct + optimal shift triage |
| **`lab-04`** | Incident Escalation | Advanced | Orchestrate multi-host spear-phishing breach with L2, L3, Identity, Firewall, Database & Management teams | At least 5 out of 6 correct routing decisions |

---

## The 5 Security Investigation Consoles

1. **Email Gateway**: Inspects SMTP envelopes, SPF/DKIM validation, macro attachments (.docm), sender domain spoofing, and heuristic risk scores.
2. **EDR Console**: Visualizes Windows parent-child process trees (`explorer.exe` → `WINWORD.EXE` → `powershell.exe`), command line arguments, PIDs, and automated containment actions.
3. **SIEM Correlation**: Displays correlated detection rules, confidence percentages, and multi-source event sequences.
4. **Firewall / Threat Intel**: Tracks perimeter connections, blocked ports, and external IP threat dossiers (reputation, known APT groups, abuse reports, geolocation).
5. **Timeline Console**: Reconstructs the end-to-end chronological timeline of events across authentication, email, endpoint, and perimeter devices.

---

## Usage Examples

### 1. In-Page Standalone Component
```tsx
import { SocDashboardLab } from "@/labs";

export default function MyLabPage() {
  return (
    <div className="h-screen w-screen">
      <SocDashboardLab
        labId="lab-01"
        showTourFirst={true}
        onComplete={(result) => {
          console.log("Lab finished with score:", result.score);
        }}
      />
    </div>
  );
}
```

### 2. Floating Button with Modal Window
```tsx
import React, { useState } from "react";
import { FloatingLabButton, LabModalWindow } from "@/labs";

export function CourseTopicView() {
  const [isLabOpen, setIsLabOpen] = useState(false);

  return (
    <div>
      {/* Existing course content */}
      <h1>Topic 2: First Alert Triage</h1>

      {/* Floating launcher trigger */}
      <FloatingLabButton
        labId="lab-01"
        onClick={() => setIsLabOpen(true)}
      />

      {/* Resizable Modal Window */}
      <LabModalWindow
        isOpen={isLabOpen}
        labId="lab-01"
        onClose={() => setIsLabOpen(false)}
        onComplete={(result) => {
          if (result.passed) {
            alert(`Great work! You scored ${result.score}%`);
          }
        }}
      />
    </div>
  );
}
```

---

## Safety & Isolation Guarantee

- All code resides strictly under `/src/labs/`.
- No modification to existing course files was required during this delivery phase.
- Ready for non-breaking Phase 2 integration when requested.
