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
    "chapterTitle": "A visitor, not yet an analyst",
    "moduleId": "00",
    "moduleTitle": "Orientation: Your First SOC Shift",
    "unitId": "M00-U1",
    "unitTitle": "Orientation & Teaching Zones",
    "mentorContext": "Mentor Ananya welcomes you at the fictionalised CDAC Bengaluru learning campus. You arrive as a curious visitor, not an experienced analyst.",
    "section2": {
      "title": "A visitor, not yet an analyst — Animated Visual Story",
      "visualType": "animated-story",
      "rawVisualFormat": "Animated Scene: Arrival & First Golden Rule",
      "description": "Morning light falls across the CDAC Bengaluru campus. You receive your 'SOC Learner' badge and learn the first golden rule: always ask for help before changing anything.",
      "visualDirection": "Vector nodes for CDAC campus, Badge, Mentor Ananya, Learner, and Safety Rule. Strict <= 4-letter labels.",
      "steps": [
        {
          "id": 1,
          "stage": "Campus Arrival",
          "title": "Morning Light at CDAC Bengaluru",
          "description": "You arrive at the training facility carrying curiosity rather than technical expertise.",
          "telemetrySnippet": "CAMPUS_ENTRY: Facility=CDAC-BLR | Status=VISITOR | Guide=Ananya",
          "highlightText": "Curious Visitor"
        },
        {
          "id": 2,
          "stage": "Badge Issuance",
          "title": "Badge Issued: SOC Learner",
          "description": "Ananya presents your orientation badge reading 'SOC Learner'. No prior IT degree required.",
          "telemetrySnippet": "BADGE_ISSUE: Name=Trainee | Role='SOC Learner' | Scope=TRAINING_ONLY",
          "highlightText": "SOC Learner"
        },
        {
          "id": 3,
          "stage": "Mentor Guidance",
          "title": "Understanding Ordinary First",
          "description": "Ananya explains: before studying attacks, you will first understand ordinary everyday computer activity.",
          "telemetrySnippet": "ORIENT_SOP: Rule=Understand_Ordinary_Activity_Before_Threats",
          "highlightText": "Ordinary Baselines"
        },
        {
          "id": 4,
          "stage": "The Golden Rule",
          "title": "First Rule: Ask Before Changing",
          "description": "If a screen shows something unfamiliar: ask for help before changing anything. Curiosity is welcome; unsupported action is not.",
          "telemetrySnippet": "FIRST_RULE: State=UNFAMILIAR | Action=ASK_FOR_HELP | Speculation=PROHIBITED",
          "highlightText": "Ask Before Changing"
        }
      ]
    },
    "section3": {
      "title": "Orientation Preferences & First Golden Rule",
      "type": "matching",
      "rawActivityType": "Interactive Matcher",
      "instructions": "Match each orientation principle and practice setting to its correct operational explanation.",
      "scenario": "Mentor Ananya welcomes you to the CDAC Bengaluru learning environment and configures your initial learning preferences.",
      "uxDirection": "Clear cards, instant visual feedback, plain-language explanations.",
      "items": [
        {
          "id": "match-M00-U1-C1-1",
          "label": "Visitor Badge: SOC Learner",
          "summary": "Marks your arrival as a learner; you are not expected to investigate attacks today."
        },
        {
          "id": "match-M00-U1-C1-2",
          "label": "Starting Baseline",
          "summary": "Understanding ordinary everyday computer activity before hunting for threats."
        },
        {
          "id": "match-M00-U1-C1-3",
          "label": "Unfamiliar Screen Response",
          "summary": "Stop, observe, and ask for help before changing any system configuration."
        },
        {
          "id": "match-M00-U1-C1-4",
          "label": "Curiosity vs Unsupported Action",
          "summary": "Curiosity is always welcome, but taking unsupported actions without guidance is prohibited."
        }
      ]
    }
  },
  "M00-U1-C2": {
    "chapterId": "M00-U1-C2",
    "chapterTitle": "The centre and its people",
    "moduleId": "00",
    "moduleTitle": "Orientation: Your First SOC Shift",
    "unitId": "M00-U1",
    "unitTitle": "Orientation & Teaching Zones",
    "mentorContext": "Mentor Ananya walks you through the 6 teaching zones on the campus map and explains the boundaries of the SOC.",
    "section2": {
      "title": "The centre and its people — Animated Visual Story",
      "visualType": "animated-story",
      "rawVisualFormat": "Teaching Zone Interactive Map",
      "description": "An interactive campus map reveals the 6 teaching zones: Staff Support, Network Services, Identity Services, Security Monitoring, Response Coordination, and Industrial Simulation.",
      "visualDirection": "SVG nodes showing discrete teaching zones and signal conduits to the SOC node. Strict <= 4-letter labels.",
      "steps": [
        {
          "id": 1,
          "stage": "Campus Zones",
          "title": "The 6 Specialized Teaching Zones",
          "description": "Ananya outlines the campus teaching zones. The SOC does not own every service or fix every computer.",
          "telemetrySnippet": "ZONE_MAP: Staff_Support | Network | Identity | Monitoring | Response | Industrial",
          "highlightText": "Teaching Zones"
        },
        {
          "id": 2,
          "stage": "Staff Support",
          "title": "Staff Support: Physical Hardware & Peripherals",
          "description": "Staff Support repairs broken keyboards, physical laptops, and monitors. Non-security requests belong here.",
          "telemetrySnippet": "TICKET_ROUT: Type=HARDWARE_FAULT | Target=STAFF_SUPPORT | Severity=LOW",
          "highlightText": "Staff Support"
        },
        {
          "id": 3,
          "stage": "Identity Services",
          "title": "Identity Services: User Logins & Accounts",
          "description": "Identity administrators manage account provisioning, MFA tokens, and password resets.",
          "telemetrySnippet": "IDENTITY_ADMIN: Action=PROVISION_USER | Scope=BRANCH_CREDENTIALS",
          "highlightText": "Identity Services"
        },
        {
          "id": 4,
          "stage": "SOC Coordination",
          "title": "SOC Monitoring & Cross-Team Cooperation",
          "description": "The SOC monitors security telemetry and coordinates with the teams who own the devices, accounts, and networks.",
          "telemetrySnippet": "SOC_COOP: Alert=SEC-ALRT-01 | Owner=FIN_DEPT | Action=COORDINATE_TRIAGE",
          "highlightText": "Cooperation"
        }
      ]
    },
    "section3": {
      "title": "Teaching Zone Request Router",
      "type": "sorting",
      "rawActivityType": "Request Sorter",
      "instructions": "Route incoming campus requests to the correct teaching zone team: Staff Support, Identity Services, Network Services, or Security Monitoring.",
      "scenario": "Campus users submit operational tickets. Direct each issue to its proper teaching-zone team.",
      "uxDirection": "Category trays, clear drag-and-drop or click-to-place mechanics.",
      "items": [
        {
          "id": "sort-M00-U1-C2-1",
          "label": "Physical broken keyboard on desk 12",
          "category": "Staff Support",
          "summary": "Hardware replacement and physical peripheral repair."
        },
        {
          "id": "sort-M00-U1-C2-2",
          "label": "Password reset and account unlock request",
          "category": "Identity Services",
          "summary": "User credential lifecycle and authentication administration."
        },
        {
          "id": "sort-M00-U1-C2-3",
          "label": "Suspicious login alert at 03:00 AM",
          "category": "Security Monitoring",
          "summary": "Triaging anomalous authentication telemetry against baselines."
        },
        {
          "id": "sort-M00-U1-C2-4",
          "label": "Network switch link flapping on floor 2",
          "category": "Network Services",
          "summary": "Infrastructure connectivity, cabling, and switch routing."
        }
      ]
    }
  },
  "M00-U2-C1": {
    "chapterId": "M00-U2-C1",
    "chapterTitle": "Your practice space",
    "moduleId": "00",
    "moduleTitle": "Orientation: Your First SOC Shift",
    "unitId": "M00-U2",
    "unitTitle": "Safe Practice & Evidence Preservation",
    "mentorContext": "Mentor Ravi guides you into your learning console and demonstrates the boundaries of your safe practice environment.",
    "section2": {
      "title": "Your practice space — Animated Visual Story",
      "visualType": "animated-story",
      "rawVisualFormat": "Sandbox Boundary Diagram",
      "description": "Ravi demonstrates the blue border surrounding your learning console, isolated VM networking, and snapshot rollback.",
      "visualDirection": "Blue border visual canvas, VM host-only networking, locked production door. Strict <= 4-letter labels.",
      "steps": [
        {
          "id": 1,
          "stage": "Visual Boundary",
          "title": "The Blue-Bordered Training Console",
          "description": "A blue border surrounds the learning console, clearly marking it as a safe practice space separate from production.",
          "telemetrySnippet": "CONSOLE_STATE: Mode=SIMULATION | Boundary=TRAINING_ENCLAVE | Border=BLUE",
          "highlightText": "Training Border"
        },
        {
          "id": 2,
          "stage": "Sandbox Isolation",
          "title": "Isolated VM with Host-Only Networking",
          "description": "Ravi demonstrates that a virtual machine is not automatically safe unless host-only isolation settings are active.",
          "telemetrySnippet": "NET_CONFIG: Adapter=HOST_ONLY | Bridge=DISABLED | OutboundInternet=BLOCKED",
          "highlightText": "Host-Only Mode"
        },
        {
          "id": 3,
          "stage": "Clean Reset",
          "title": "Snapshot Rollback & Practice Reset",
          "description": "Supplied practice files can be safely tested; snapshot rollback restores the clean baseline in seconds.",
          "telemetrySnippet": "SNAPSHOT_ROLLBACK: Target=VM_PRACTICE_01 | State=CLEAN_BASELINE_RESTORED",
          "highlightText": "Snapshot Reset"
        },
        {
          "id": 4,
          "stage": "Boundary Check",
          "title": "Strict Boundary: No Outside Scanning",
          "description": "Lab permissions stay strictly inside the simulation; probing college or home networks is strictly prohibited.",
          "telemetrySnippet": "BOUNDARY_GUARD: OutboundScan=BLOCKED | Target=EXTERNAL | Status=PROHIBITED",
          "highlightText": "Boundary Rule"
        }
      ]
    },
    "section3": {
      "title": "Safe Practice Boundary Sorter",
      "type": "sorting",
      "rawActivityType": "Boundary Sorter",
      "instructions": "Classify each lab activity as 'Authorized Safe Practice' or 'Prohibited / Out of Scope'.",
      "scenario": "Mentor Ravi reviews lab safety rules before opening simulated evidence packs.",
      "uxDirection": "Two clear columns, immediate color feedback.",
      "items": [
        {
          "id": "sort-M00-U2-C1-1",
          "label": "Testing commands on supplied practice VM with host-only network",
          "category": "Authorized Safe Practice",
          "summary": "Contained within designated training sandbox with no external risk."
        },
        {
          "id": "sort-M00-U2-C1-2",
          "label": "Running port scanners against campus or college Wi-Fi",
          "category": "Prohibited / Out of Scope",
          "summary": "Lab permissions do not extend to outside networks without explicit authorization."
        },
        {
          "id": "sort-M00-U2-C1-3",
          "label": "Using snapshot rollback to restore clean practice state",
          "category": "Authorized Safe Practice",
          "summary": "Standard reset procedure ensuring repeatability and safe reuse."
        },
        {
          "id": "sort-M00-U2-C1-4",
          "label": "Changing VM network settings to bridged mode on production LAN",
          "category": "Prohibited / Out of Scope",
          "summary": "Bridging a lab VM exposes production enterprise networks to lab hazards."
        }
      ]
    }
  },
  "M00-U2-C2": {
    "chapterId": "M00-U2-C2",
    "chapterTitle": "A clue worth preserving",
    "moduleId": "00",
    "moduleTitle": "Orientation: Your First SOC Shift",
    "unitId": "M00-U2",
    "unitTitle": "Safe Practice & Evidence Preservation",
    "mentorContext": "Mentor Ananya introduces evidence integrity, working copies, and the discipline of a safe pause.",
    "section2": {
      "title": "A clue worth preserving — Animated Visual Story",
      "visualType": "animated-story",
      "rawVisualFormat": "Evidence Duplication & Safe Pause",
      "description": "Ananya inspects a sample alert and raw log export; she demonstrates locking original files and working strictly on copies.",
      "visualDirection": "Original log locked in read-only format; working copy generated in cyan; safe pause stop-sign. Strict <= 4-letter labels.",
      "steps": [
        {
          "id": 1,
          "stage": "Lock Original",
          "title": "Original Evidence Kept Intact",
          "description": "Original evidence must never be modified or 'tidied up'. It remains locked in read-only format for independent review.",
          "telemetrySnippet": "FILE_ATTR: Target=auth_20261014.log | State=READ_ONLY | SHA256=a8f4c... LOCKED",
          "highlightText": "Original Intact"
        },
        {
          "id": 2,
          "stage": "Working Copy",
          "title": "Creating a Duplicate Working Copy",
          "description": "The analyst duplicates the artifact; all searching, highlighting, and parsing occur strictly on the working copy.",
          "telemetrySnippet": "COPY_CREATE: Source=auth_20261014.log -> Target=auth_working_copy.log",
          "highlightText": "Working Copy"
        },
        {
          "id": 3,
          "stage": "Record Metadata",
          "title": "Documenting Collection Time & Source",
          "description": "Record who extracted the file, from which host, the exact timestamp, and the explicit time zone.",
          "telemetrySnippet": "EVIDENCE_LEDGER: Host=BLR-BR-WS-04 | Time=2026-10-14T09:15:00+05:30 | Collector=Learner",
          "highlightText": "Record Metadata"
        },
        {
          "id": 4,
          "stage": "Safe Pause",
          "title": "The Safe Pause Over Guessing",
          "description": "When an unfamiliar command might delete or alter data: stop, record what you see, and ask the mentor for help.",
          "telemetrySnippet": "SAFE_PAUSE: Command=DESTRUCTIVE_RISK | Status=HALTED | Action=CONSULT_MENTOR",
          "highlightText": "Safe Pause"
        }
      ]
    },
    "section3": {
      "title": "Evidence Handling & Action Classifier",
      "type": "sorting",
      "rawActivityType": "Evidence Sorter",
      "instructions": "Sort each action into 'Preserve & Document', 'Safe Pause & Ask', or 'Unsafe / Destructive'.",
      "scenario": "You receive your first raw evidence export file during shift orientation.",
      "uxDirection": "Three distinct drop zones with informative guidance.",
      "items": [
        {
          "id": "sort-M00-U2-C2-1",
          "label": "Setting original log file to read-only and hashing it",
          "category": "Preserve & Document",
          "summary": "Ensures evidence integrity can be verified by senior investigators."
        },
        {
          "id": "sort-M00-U2-C2-2",
          "label": "Editing original log file in a text editor to remove messy lines",
          "category": "Unsafe / Destructive",
          "summary": "Modifying original evidence invalidates forensic chain of custody."
        },
        {
          "id": "sort-M00-U2-C2-3",
          "label": "Stopping and noting the screen when a command might overwrite data",
          "category": "Safe Pause & Ask",
          "summary": "A safe pause prevents irreversible data loss."
        },
        {
          "id": "sort-M00-U2-C2-4",
          "label": "Recording the exact source host and time zone on the evidence note",
          "category": "Preserve & Document",
          "summary": "Ensures timestamps can be correlated without timezone ambiguity."
        }
      ]
    }
  },
  "M00-U3-C1": {
    "chapterId": "M00-U3-C1",
    "chapterTitle": "The service we will follow",
    "moduleId": "00",
    "moduleTitle": "Orientation: Your First SOC Shift",
    "unitId": "M00-U3",
    "unitTitle": "The Recurring Case & The Learning Route",
    "mentorContext": "Mentor Ananya introduces the recurring fictional Branch Finance Support service, account FIN-OPS-01, and workstation BLR-BR-WS-04.",
    "section2": {
      "title": "The service we will follow — Animated Visual Story",
      "visualType": "animated-story",
      "rawVisualFormat": "Entity Separation Flow",
      "description": "Ananya breaks down the finance support desk: the staff portal, email, shared documents, account FIN-OPS-01, and workstation BLR-BR-WS-04.",
      "visualDirection": "Distinct vector nodes for Service, Account, Workstation, IP Address, and Human User. Strict <= 4-letter labels.",
      "steps": [
        {
          "id": 1,
          "stage": "Business Service",
          "title": "Branch Finance Support Service",
          "description": "A fictional branch finance support desk gives everyday tasks a consistent business context throughout our course.",
          "telemetrySnippet": "BUSINESS_SERVICE: Name=Branch_Finance_Support | Scope=Invoices_Payroll",
          "highlightText": "Finance Service"
        },
        {
          "id": 2,
          "stage": "Account Identifier",
          "title": "Account FIN-OPS-01 (Not a Machine)",
          "description": "FIN-OPS-01 is an account credential used for finance operations. It is not the computer's name.",
          "telemetrySnippet": "ACCOUNT_ENTITY: ID=FIN-OPS-01 | Type=USER_ACCOUNT | Role=Finance_Operations",
          "highlightText": "Account FIN-OPS-01"
        },
        {
          "id": 3,
          "stage": "Workstation Host",
          "title": "Workstation BLR-BR-WS-04 (Endpoint)",
          "description": "BLR-BR-WS-04 is the physical workstation endpoint located at the Bengaluru branch, separate from the account.",
          "telemetrySnippet": "HOST_ENTITY: Name=BLR-BR-WS-04 | OS=Windows_10 | IP=10.10.20.15",
          "highlightText": "Host BLR-BR-WS-04"
        },
        {
          "id": 4,
          "stage": "Entity Separation",
          "title": "Account Does Not Prove Person",
          "description": "Actions recorded under account FIN-OPS-01 do not prove who sat at the keyboard. Keep all entities separate.",
          "telemetrySnippet": "FORENSIC_RULE: Account_Activity != Proof_Of_Person | Keep_Entities_Distinct",
          "highlightText": "Entity Separation"
        }
      ]
    },
    "section3": {
      "title": "Four-Tray Entity Classifier",
      "type": "matching",
      "rawActivityType": "Entity Matching",
      "instructions": "Match each identifier from the recurring finance scenario to its correct architectural entity type.",
      "scenario": "An alert arrives referencing multiple tokens. Correctly categorize each entity to avoid confusion.",
      "uxDirection": "Entity cards matching to clear category definition trays.",
      "items": [
        {
          "id": "match-M00-U3-C1-1",
          "label": "FIN-OPS-01",
          "summary": "Account Identifier: A user credential, not a physical machine."
        },
        {
          "id": "match-M00-U3-C1-2",
          "label": "BLR-BR-WS-04",
          "summary": "Workstation Identifier: The endpoint device, separate from the account."
        },
        {
          "id": "match-M00-U3-C1-3",
          "label": "Branch Finance Support",
          "summary": "Business Service: The operational context providing daily business tasks."
        },
        {
          "id": "match-M00-U3-C1-4",
          "label": "10.10.20.15",
          "summary": "Network Address: The dynamic IP address leased to the workstation."
        }
      ]
    }
  },
  "M00-U3-C2": {
    "chapterId": "M00-U3-C2",
    "chapterTitle": "The route from beginner to L1",
    "moduleId": "00",
    "moduleTitle": "Orientation: Your First SOC Shift",
    "unitId": "M00-U3",
    "unitTitle": "The Recurring Case & The Learning Route",
    "mentorContext": "Mentor Ananya outlines the 15-module learning roadmap and the 4-section chapter model leading to supervised L1 practice.",
    "section2": {
      "title": "The route from beginner to L1 — Animated Visual Story",
      "visualType": "animated-story",
      "rawVisualFormat": "Curriculum Route & Section Flow",
      "description": "A pathway illuminates across 15 modules: Computers -> Networks -> Security -> Triage -> Evidence Tools -> Response -> Handover.",
      "visualDirection": "Concentric illuminated steps for the 4 sections per chapter, fading mentor scaffolding, and L1 handover badge. Strict <= 4-letter labels.",
      "steps": [
        {
          "id": 1,
          "stage": "Chapter Rhythm",
          "title": "The 4-Section Chapter Architecture",
          "description": "Every chapter delivers: 1. Theory Briefing, 2. Animated Visual Story, 3. Interactive Activity, 4. Knowledge Check.",
          "telemetrySnippet": "CHAPTER_SPEC: Section1=Theory | Section2=Visual | Section3=Interactive | Section4=Quiz",
          "highlightText": "4-Section Model"
        },
        {
          "id": 2,
          "stage": "Module Progression",
          "title": "15 Modules: From Host to Handover",
          "description": "Foundations build systematically: host computers (M01) and networks (M02) lead to SIEM (M05) and Incident Response (M14).",
          "telemetrySnippet": "CURRICULUM_ARC: Modules=00_to_14 | Total_Hours=90 | Theory=50h | Labs=40h",
          "highlightText": "15 Modules"
        },
        {
          "id": 3,
          "stage": "Fading Scaffolding",
          "title": "Gradual Reduction of Mentor Hints",
          "description": "Detailed prompts gradually reduce as your skills mature, preparing you for independent operational decision-making.",
          "telemetrySnippet": "SCAFFOLDING_CURVE: Early=Guided_Prompts -> Late=Autonomous_Playbook_Triage",
          "highlightText": "Fading Hints"
        },
        {
          "id": 4,
          "stage": "Course Destination",
          "title": "Destination: Evidence-Based L1 Practice",
          "description": "The goal is rigorous, evidence-based beginner L1 practice within playbooks, not instant external certification.",
          "telemetrySnippet": "GOAL_STATE: Role='L1 SOC Apprentice' | Core_Skill='Evidence_Based_Triage'",
          "highlightText": "L1 Practice"
        }
      ]
    },
    "section3": {
      "title": "Chapter Section Sequencer",
      "type": "matching",
      "rawActivityType": "Section Matching",
      "instructions": "Match each section of a chapter to its pedagogical role in your learning journey.",
      "scenario": "Familiarize yourself with the consistent 4-section structure of every chapter in the curriculum.",
      "uxDirection": "Section sequence cards matching to learning outcomes.",
      "items": [
        {
          "id": "match-M00-U3-C2-1",
          "label": "Section 1: Theory Briefing",
          "summary": "Mentor dialogue, plain-English analogies, and official NIST/ISO definitions."
        },
        {
          "id": "match-M00-U3-C2-2",
          "label": "Section 2: Animated Visual Story",
          "summary": "Dynamic vector simulation with strict <=4-letter labels illustrating system mechanisms."
        },
        {
          "id": "match-M00-U3-C2-3",
          "label": "Section 3: Interactive Activity",
          "summary": "Safe sandbox exercises where you sort, match, and manipulate evidence hands-on."
        },
        {
          "id": "match-M00-U3-C2-4",
          "label": "Section 4: Knowledge Check",
          "summary": "Scenario-based questions confirming retention before progressing to the next chapter."
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
    "mentorContext": "Mentor Ravi, Workstation & Host Mentor, introduces the analyst workstation: physical Hardware (CPU, RAM, Disk), the master Operating System, and User Account privilege boundaries on BLR-BR-WS-04.",
    "section2": {
      "title": "Hardware, OS and accounts — Visual Story",
      "visualType": "animated-story",
      "rawVisualFormat": "Animated Visual Story",
      "description": "Mentor Ravi illustrates the journey from physical Hardware (CPU, RAM, Disk) booting the Operating System (OS) into memory, to a Standard User (FIN-OPS-01) logging in under Least Privilege protections on workstation BLR-BR-WS-04.",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Hardware Power",
          "title": "Physical Hardware: CPU, RAM & Storage Boot",
          "description": "Workstation Host: BLR-BR-WS-04 powers on. Physical CPU and RAM initialize; OS kernel image loaded from Disk storage into fast working memory.",
          "telemetrySnippet": "HARDWARE_BOOT: CPU=x86_64 Processor | RAM=16GB Initialized | DISK=NVMe SSD (C:\\) Loaded",
          "highlightText": "Hardware Initialization"
        },
        {
          "id": 2,
          "stage": "OS Management",
          "title": "The Operating System Takes Command",
          "description": "The OS (Windows/Linux) acts as the master manager—allocating RAM memory, scheduling CPU tasks, and controlling disk file access.",
          "telemetrySnippet": "OS_INIT: Windows Kernel Active | Hardware drivers loaded | NTFS filesystem mounted on C:\\",
          "highlightText": "OS Resource Control"
        },
        {
          "id": 3,
          "stage": "User Identity",
          "title": "Standard User Session Established",
          "description": "Employee logs in with account FIN-OPS-01 (Standard User). Granted safe permissions to edit daily documents, but blocked from modifying system files.",
          "telemetrySnippet": "USER_AUTH: User=FIN-OPS-01 | AccountType=STANDARD | Rights=Read/Write own documents only",
          "highlightText": "Standard User Session"
        },
        {
          "id": 4,
          "stage": "Least Privilege",
          "title": "Administrator Privileges & Least Privilege",
          "description": "Unauthorized attempt to modify system files is blocked by the OS. Admin/Root elevation required, containing malware spread.",
          "telemetrySnippet": "ACCESS_CHECK: Write C:\\Windows\\System32 | Status=BLOCKED | Admin approval required (PoLP)",
          "highlightText": "Least Privilege Defense"
        }
      ]
    },
    "section3": {
      "title": "Sort the Components: Hardware, OS and Accounts",
      "type": "sorting",
      "rawActivityType": "Safe / Unsafe Sorter",
      "instructions": "Classify each workstation element into 'Safe / Routine' versus 'Suspicious / Unsafe' based on standard user vs administrative privilege limits.",
      "scenario": "Mentor Ravi tests your ability to distinguish everyday safe computer activity from dangerous unauthorized system actions on BLR-BR-WS-04.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "sort-M01-U1-C1-1",
          "label": "Standard User Running Office Software (winword.exe)",
          "category": "Safe / Routine",
          "summary": "Standard everyday user account executing approved application within user memory space."
        },
        {
          "id": "sort-M01-U1-C1-2",
          "label": "Unprivileged User Writing to C:\\Windows\\System32",
          "category": "Suspicious / Unsafe",
          "summary": "Standard account attempting unauthorized modification of protected operating system binaries."
        },
        {
          "id": "sort-M01-U1-C1-3",
          "label": "Authorized System Service Operating Under SYSTEM Account",
          "category": "Safe / Routine",
          "summary": "Legitimate background operating system daemon executing under authoritative service account."
        },
        {
          "id": "sort-M01-U1-C1-4",
          "label": "Hidden Script Attempting Silent Administrator Elevation",
          "category": "Suspicious / Unsafe",
          "summary": "Unapproved script attempting to gain full administrator privileges without user knowledge."
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
    "mentorContext": "Mentor Ravi, Workstation & Host Mentor, guides analysts through filesystem paths, NTFS ACL permissions, and identifying anomalous staging folders on BLR-BR-WS-04.",
    "section2": {
      "title": "Files, paths and permissions — Visual Story",
      "visualType": "animated-story",
      "rawVisualFormat": "Animated Visual Story",
      "description": "Mentor Ravi inspects filesystem execution boundaries, comparing protected Program Files directories with world-writable user Temp staging locations on BLR-BR-WS-04.",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Files, paths and permissions — Telemetry Ingestion",
          "description": "Host: BLR-BR-WS-04 (10.10.20.15). Telemetry flags binary drop into AppData\\Local\\Temp staging folder under account FIN-OPS-01.",
          "telemetrySnippet": "FILE_WRITE: C:\\Users\\FIN-OPS-01\\AppData\\Local\\Temp\\svchost.exe | Size: 412KB | Hash: e3b0c442...",
          "highlightText": "Ingestion & Staging Flag"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "NTFS ACL & Path Permission Validation",
          "description": "Standard users have write access in Temp, but AppLocker execution prevention rule evaluates payload.",
          "telemetrySnippet": "ACL_EVAL: BUILTIN\\Users has WRITE on Temp | AppLocker Rule: BLOCK_UNAPPROVED_TEMP_EXEC",
          "highlightText": "ACL Verification"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Execution Prevention Interception",
          "description": "Endpoint defense intercepts dropped binary execution before process launch occurs.",
          "telemetrySnippet": "APPLOCKER_BLOCK: EventID 8004 | Rule: Deny %TEMP%\\*.exe | Outcome: BLOCKED",
          "highlightText": "Execution Blocked"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Package & Path Documentation",
          "description": "Consolidating telemetry evidence with normalized UTC timestamps, verified observables, and L1 handoff notes.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M01-U1-C2 | Path: %TEMP%\\svchost.exe | Disposition: Dropper Blocked",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Reveal the Clues: Files, paths and permissions",
      "type": "clue-reveal",
      "rawActivityType": "Clue & Evidence Reveal",
      "instructions": "Inspect workstation filesystem clues to identify whether execution paths and file permissions adhere to security baselines.",
      "scenario": "Mentor Ravi presents forensic clues from an endpoint alert involving dropped files in user directories on BLR-BR-WS-04.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "clue-M01-U1-C2-1",
          "label": "Staging Path: C:\\Users\\FIN-OPS-01\\AppData\\Local\\Temp\\installer.exe",
          "summary": "Standard users have write permission in Temp folders, making them a primary target for malware staging."
        },
        {
          "id": "clue-M01-U1-C2-2",
          "label": "NTFS Permissions: BUILTIN\\Users (Read, Write, Execute)",
          "summary": "Permissive user directory permissions allow arbitrary executable placement without administrative credentials."
        },
        {
          "id": "clue-M01-U1-C2-3",
          "label": "Masquerading Name: invoice_receipt.pdf.exe",
          "summary": "Double extension payload taking advantage of hidden file extensions in default Windows Explorer view."
        },
        {
          "id": "clue-M01-U1-C2-4",
          "label": "Protected Directory: C:\\Program Files (x86)\\",
          "summary": "Standard users have read-only access here; software installation strictly requires UAC elevation."
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
    "mentorContext": "Mentor Ravi, Workstation & Host Mentor, teaches process hierarchy, Process IDs (PID), Parent Process IDs (PPID), and background services on BLR-BR-WS-04.",
    "section2": {
      "title": "What processes and services do — Visual Story",
      "visualType": "animated-story",
      "rawVisualFormat": "Animated Visual Story",
      "description": "Mentor Ravi walks through process creation, parent-child process lineages (PPID to PID), and background services managed by the Service Control Manager on BLR-BR-WS-04.",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "What processes and services do — Telemetry Ingestion",
          "description": "Process telemetry on Host: BLR-BR-WS-04 (10.10.20.15). Sysmon Event 1 captures process creation.",
          "telemetrySnippet": "Sysmon Event 1: ProcessCreate | Process: powershell.exe | PID: 8840 | PPID: 2104 (winword.exe)",
          "highlightText": "Ingestion & Sysmon Capture"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Parent Process Lineage Traced",
          "description": "Correlating parent process PID 2104 reveals Microsoft Word as the spawning parent executing encoded command line.",
          "telemetrySnippet": "PARENT_CHECK: PPID 2104 = winword.exe | User: FIN-OPS-01 | Cmd: powershell.exe -enc SQBFAFgA...",
          "highlightText": "Lineage Correlation"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Process Anomaly Verification",
          "description": "Office applications spawning command-line interpreters violates organizational baseline and triggers threat alert.",
          "telemetrySnippet": "ANOMALY: winword.exe spawning powershell.exe | Heuristic: Malicious Macro Activity Detected",
          "highlightText": "Anomaly Confirmed"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Containment & Case Disposition",
          "description": "Process terminated; parent document quarantined; process tree and PPID evidence attached to ticket.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M01-U2-C1 | PPID: 2104 | Child PID: 8840 | Status: Quarantined",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Build the Flow: What processes and services do",
      "type": "drag-drop",
      "rawActivityType": "Drag-and-Drop Workflow",
      "instructions": "Arrange the process lifecycle steps in correct chronological order from kernel initialization to interactive process execution.",
      "scenario": "Mentor Ravi guides analysts to map out the standard Windows process creation hierarchy on BLR-BR-WS-04.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "step-M01-U2-C1-1",
          "label": "Core OS Boot: ntoskrnl.exe -> smss.exe",
          "summary": "Initial Windows session manager initialized during early system startup."
        },
        {
          "id": "step-M01-U2-C1-2",
          "label": "Service Controller: wininit.exe -> services.exe",
          "summary": "Service Control Manager starts and oversees background system services."
        },
        {
          "id": "step-M01-U2-C1-3",
          "label": "Interactive Shell: winlogon.exe -> explorer.exe",
          "summary": "Desktop shell launches user environment and handles user-initiated application starts."
        },
        {
          "id": "step-M01-U2-C1-4",
          "label": "Suspicious Process Spawn: winword.exe (PPID 2104) -> powershell.exe (PID 8840)",
          "summary": "Atypical child process spawn indicative of macro-based malicious code execution."
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
    "mentorContext": "Mentor Ravi, Workstation & Host Mentor, teaches analysts how to establish host baselines and detect typosquatted imposter binaries on BLR-BR-WS-04.",
    "section2": {
      "title": "Routine versus unfamiliar activity — Visual Story",
      "visualType": "animated-story",
      "rawVisualFormat": "Animated Visual Story",
      "description": "Mentor Ravi demonstrates establishing workstation baselines, comparing authentic Windows service binaries with typosquatted imposters on BLR-BR-WS-04.",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Routine versus unfamiliar activity — Telemetry Ingestion",
          "description": "Endpoint telemetry on Host: BLR-BR-WS-04 (10.10.20.15) detects binary named svch0st.exe.",
          "telemetrySnippet": "PROCESS_START: svch0st.exe | Path: C:\\Users\\Public\\svch0st.exe | PID: 5412 | Parent: cmd.exe",
          "highlightText": "Ingestion & Anomaly Flag"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Typosquat & Digital Signature Verification",
          "description": "Binary inspected for Authenticode digital signature and standard Windows directory location.",
          "telemetrySnippet": "SIG_CHECK: Issuer: UNSIGNED | Expected Path: C:\\Windows\\System32\\svchost.exe | Actual: C:\\Users\\Public",
          "highlightText": "Signature Verification"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Masquerading Verdict Established",
          "description": "Adversary used digit '0' instead of letter 'o' to masquerade as the Service Host process.",
          "telemetrySnippet": "VERDICT: Typosquatted binary masquerade | Name: svch0st.exe != svchost.exe | Confidence: 99%",
          "highlightText": "Masquerade Confirmed"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Remediation & Handoff Package",
          "description": "Process terminated; SHA-256 hash pushed to enterprise EDR blocklist; host isolated.",
          "telemetrySnippet": "TICKET: CDAC-SOC-2026-M01-U2-C2 | Status: True Positive | Indicator: svch0st.exe | Disposition: Isolated",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Sort the Activity: Routine versus unfamiliar activity",
      "type": "sorting",
      "rawActivityType": "Safe / Unsafe Sorter",
      "instructions": "Distinguish routine Windows system processes from suspicious imposter binaries masquerading as legitimate services.",
      "scenario": "Mentor Ravi challenges analysts to review active processes and separate normal baseline binaries from imposter executables on BLR-BR-WS-04.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "sort-M01-U2-C2-1",
          "label": "Authentic svchost.exe in C:\\Windows\\System32 (Signed by Microsoft)",
          "category": "Safe / Routine",
          "summary": "Legitimate Windows Service Host binary located in protected System32 with valid digital signature."
        },
        {
          "id": "sort-M01-U2-C2-2",
          "label": "Typosquatted svch0st.exe in C:\\Users\\Public (Unsigned)",
          "category": "Suspicious / Unsafe",
          "summary": "Malicious imposter process executing from world-writable public folder with digit substitution."
        },
        {
          "id": "sort-M01-U2-C2-3",
          "label": "Single lsass.exe process running under SYSTEM from System32",
          "category": "Safe / Routine",
          "summary": "Legitimate Local Security Authority Subsystem Service isolated as a protected process."
        },
        {
          "id": "sort-M01-U2-C2-4",
          "label": "Secondary lsass.exe spawned by explorer.exe or cmd.exe",
          "category": "Suspicious / Unsafe",
          "summary": "Adversary attempting credential dumping or process masquerading outside normal system boot."
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
    "mentorContext": "Mentor Ravi, Workstation & Host Mentor, trains analysts to execute essential command-line tools for rapid endpoint triage on BLR-BR-WS-04.",
    "section2": {
      "title": "Command-line essentials — Visual Story",
      "visualType": "animated-story",
      "rawVisualFormat": "Animated Visual Story",
      "description": "Mentor Ravi introduces essential host command-line triage utilities for investigating users, host identities, active processes, and open sockets on BLR-BR-WS-04.",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Command-line essentials — Telemetry Ingestion",
          "description": "Analyst initiates live triage on Host: BLR-BR-WS-04 (10.10.20.15) via administrative console.",
          "telemetrySnippet": "CMD_SESSION: Interactive triage session established on BLR-BR-WS-04 | Analyst: Ravi (L1)",
          "highlightText": "Console Triage Session"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "Identity & Host Validation",
          "description": "Executing whoami /user and hostname to confirm identity context and workstation tag.",
          "telemetrySnippet": "> whoami /user: cdac\\FIN-OPS-01 S-1-5-21-3829-1002 | > hostname: BLR-BR-WS-04",
          "highlightText": "Identity Observables"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "Process & Socket Enumeration",
          "description": "Running tasklist and netstat -ano to map network listening ports to running process IDs.",
          "telemetrySnippet": "> netstat -ano: TCP 0.0.0.0:4444 0.0.0.0:0 LISTENING PID 8840 | > tasklist: powershell.exe PID 8840",
          "highlightText": "Socket to PID Mapping"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Evidence Consolidaton & Shift Documentation",
          "description": "CLI observables compiled into standardized shift triage package with verified process and port evidence.",
          "telemetrySnippet": "TRIAGE_PACKAGE: Host: BLR-BR-WS-04 | User: FIN-OPS-01 | Port: 4444 | PID: 8840 | Disposition: Complete",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Match the Commands: Command-line essentials",
      "type": "matching",
      "rawActivityType": "Concept / Term Matching",
      "instructions": "Match each command-line utility to its primary operational investigation objective.",
      "scenario": "Mentor Ravi tests your ability to select the right CLI tool during active endpoint triage on BLR-BR-WS-04.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "match-M01-U3-C1-1",
          "label": "whoami /user",
          "summary": "Inspect logged-in account name, SID, and privilege group memberships."
        },
        {
          "id": "match-M01-U3-C1-2",
          "label": "hostname",
          "summary": "Identify local workstation or server name registered in Active Directory."
        },
        {
          "id": "match-M01-U3-C1-3",
          "label": "tasklist /v",
          "summary": "Enumerate running processes, Process IDs (PIDs), and active memory usage."
        },
        {
          "id": "match-M01-U3-C1-4",
          "label": "netstat -ano",
          "summary": "Display active network connections, listening ports, and owning PIDs."
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
    "mentorContext": "Mentor Ravi, Workstation & Host Mentor, trains analysts to correlate user identities, hostnames, and normalize local event timestamps to UTC on BLR-BR-WS-04.",
    "section2": {
      "title": "Users, hostnames and timestamps — Visual Story",
      "visualType": "animated-story",
      "rawVisualFormat": "Animated Visual Story",
      "description": "Mentor Ravi explains correlating user accounts with machine hostnames and normalizing local event timestamps into universal UTC timelines on BLR-BR-WS-04.",
      "visualDirection": "Use moving characters/devices/packets, large SVG icons or GIF-like animation; show foreground action and background system response together.",
      "steps": [
        {
          "id": 1,
          "stage": "Initial Ingestion",
          "title": "Users, hostnames and timestamps — Telemetry Ingestion",
          "description": "Multiple event logs arrive from Host: BLR-BR-WS-04 (10.10.20.15) with local time offset.",
          "telemetrySnippet": "LOG_INGEST: Endpoint log time: 14:30:00 IST (+05:30) | Host: BLR-BR-WS-04 | User: FIN-OPS-01",
          "highlightText": "Multi-Sensor Ingestion"
        },
        {
          "id": 2,
          "stage": "Correlation & Context",
          "title": "UTC Normalization & Clock Synchronization",
          "description": "SIEM ingestion pipeline converts local IST timestamp to coordinated universal time (UTC).",
          "telemetrySnippet": "TIME_NORM: 14:30:00 IST - 05:30:00 = 09:00:00 UTC | Reference: CDAC-NTP-01 synced",
          "highlightText": "UTC Normalization"
        },
        {
          "id": 3,
          "stage": "Forensic Validation",
          "title": "User & Hostname Directory Correlation",
          "description": "Cross-referencing account FIN-OPS-01 with Active Directory confirms assigned finance workstation BLR-BR-WS-04.",
          "telemetrySnippet": "AD_CORRELATE: User FIN-OPS-01 assigned to BLR-BR-WS-04 (MAC: 00:1A:2B:3C:4D:5E) | Department: Finance",
          "highlightText": "Directory Correlation"
        },
        {
          "id": 4,
          "stage": "Disposition & Handoff",
          "title": "Chronological Incident Timeline Assembly",
          "description": "Unified timeline assembled across endpoint, firewall, and authentication logs with synchronized UTC timestamps.",
          "telemetrySnippet": "TIMELINE: 09:00:00 UTC Auth Success -> 09:00:08 UTC File Read -> 09:00:15 UTC Egress Synced",
          "highlightText": "Triage Handoff Package"
        }
      ]
    },
    "section3": {
      "title": "Sort the Scenario: Users, hostnames and timestamps",
      "type": "sorting",
      "rawActivityType": "Safe / Unsafe Sorter",
      "instructions": "Classify host identity and timestamp observations into Safe / Routine versus Suspicious / Unsafe.",
      "scenario": "Mentor Ravi reviews identity records and sensor timestamps across branch endpoints to detect anomalies on BLR-BR-WS-04.",
      "uxDirection": "Large SVG icons; character/device/packet animation; short feedback; no long text.",
      "items": [
        {
          "id": "sort-M01-U3-C2-1",
          "label": "Normalized Event: 14:30:00 IST (+05:30) converted to 09:00:00 UTC",
          "category": "Safe / Routine",
          "summary": "Standard timestamp normalization across distributed enterprise sensors to ensure timeline accuracy."
        },
        {
          "id": "sort-M01-U3-C2-2",
          "label": "Authenticated Domain User FIN-OPS-01 on Assigned Host BLR-BR-WS-04",
          "category": "Safe / Routine",
          "summary": "Legitimate employee logon matching assigned hardware asset and Active Directory profile."
        },
        {
          "id": "sort-M01-U3-C2-3",
          "label": "Off-Hours Logon: Local Account adm_backup Created at 02:14:00 UTC",
          "category": "Suspicious / Unsafe",
          "summary": "Unscheduled local account creation during non-business hours without change request ticket."
        },
        {
          "id": "sort-M01-U3-C2-4",
          "label": "Clock Skew Alert: 45-Minute Timestamp Drift on Security Sensor",
          "category": "Suspicious / Unsafe",
          "summary": "Sensor time desynchronization prevents accurate forensic timeline reconstruction."
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
