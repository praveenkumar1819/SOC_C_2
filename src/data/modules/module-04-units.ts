import { VisualStoryStep } from '@/components/learning/visual-story-demo';
import { InvestigationEvidenceCard } from '@/components/learning/interactive-investigation';
import { DragDropItem } from '@/components/learning/drag-drop-check';
import { MatchPair } from '@/components/learning/matching-check-shuffled';
import { TriageScenario } from '@/components/learning/tp-fp-triage';

export interface TopicContent {
  id: string;
  unitId: string;
  title: string;
  order: number;
  estimatedMinutes: number;
  xpReward: number;

  // 1. Theory (4-6 lines concise explanation + Know More)
  theory: {
    summaryLines: string[];
    knowMore: {
      title: string;
      description: string;
      externalUrl: string;
      externalLabel: string;
    };
  };

  // 2. Demo (Visual story / video-like animation: watch & understand)
  demo: {
    title: string;
    subtitle: string;
    steps: VisualStoryStep[];
  };

  // 3. Interactive (Hands-on investigation: click & engage)
  interactive: {
    title: string;
    scenario: string;
    cards: InvestigationEvidenceCard[];
  };

  // 4. Real-world SOC Context
  socContext: {
    title: string;
    scenario: string;
    analystMindset: string;
    bestPractices: string[];
  };

  // 5. Knowledge Checks (Varied interactive formats)
  knowledgeCheck: {
    dragDrop?: {
      title: string;
      instructions: string;
      items: DragDropItem[];
      explanation: string;
    };
    matching?: {
      title: string;
      instructions: string;
      pairs: MatchPair[];
      explanation: string;
    };
    triageScenario?: TriageScenario;
  };
}

export interface UnitAssessmentQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface UnitStructure {
  id: string;
  unitNumber: number;
  title: string;
  description: string;
  estimatedHours: number;
  topics: TopicContent[];
  assessment: {
    id: string;
    title: string;
    passingScore: number;
    xpReward: number;
    questions: UnitAssessmentQuestion[];
  };
}

export const MODULE_04_UNITS: UnitStructure[] = [
  {
    "id": "unit-1",
    "unitNumber": 1,
    "title": "Unit 1: SOC Architecture",
    "description": "Understand the three foundational pillars (People, Process, Technology), organizational hierarchy, and enterprise telemetry data flows.",
    "estimatedHours": 2,
    "topics": [
      {
        "id": "topic-1-1",
        "unitId": "unit-1",
        "title": "Chapter 1: People",
        "order": 1,
        "estimatedMinutes": 15,
        "xpReward": 35,
        "theory": {
          "summaryLines": [
            "People represent the human analysts, engineers, and leaders who operate the Security Operations Center.",
            "Tier 1 (Triage Analyst): Performs first-line triage, validates alerts, extracts entities, and handles initial containment within strict SLAs.",
            "Tier 2 (Incident Responder): Conducts in-depth forensic investigation, tracks lateral movement, and executes root cause eradication.",
            "Tier 3 (Threat Hunter / SME): Performs proactive adversary hunting, malware reverse-engineering, and builds advanced detection signatures.",
            "SOC Lead & CISO: Directs operations, manages incident crises, ensures regulatory compliance, and reports to executive stakeholders."
          ],
          "knowMore": {
            "title": "NIST SP 800-61 Rev 2: Organizing an Incident Response Capability",
            "description": "Learn the official NIST guidelines on staffing models, tier responsibilities, and analyst skill requirements.",
            "externalUrl": "https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final",
            "externalLabel": "NIST SOC Staffing"
          }
        },
        "demo": {
                  "title": "[Demo] Meet the SOC Team",
                  "subtitle": "Watch how alerts route through L1 Triage, L2 Incident Response, L3 Threat Hunting, and SOC Management",
                  "steps": [
                            {
                                      "id": 1,
                                      "stage": "1. The Alert Queue",
                                      "iconName": "siem",
                                      "title": "Incoming Alert Enters FinCorp Queue",
                                      "description": "Security telemetry generates alert ALT-2026-04 on workstation FIN-PC-04, appearing in the centralized SOC triage queue.",
                                      "telemetrySnippet": "QUEUE: FinCorp Triage Queue | Alert: Multiple Failed Logins | Entity: FIN-PC-04 | Status: Unassigned",
                                      "highlightText": "The alert queue is the shared operational entry point for the entire SOC team."
                            },
                            {
                                      "id": 2,
                                      "stage": "2. Tier 1 Triage",
                                      "iconName": "analyst",
                                      "title": "L1 Analyst Claims Alert & Validates Activity",
                                      "description": "L1 Analyst claims the alert, verifies the affected user (Finance01) and workstation (FIN-PC-04), and checks for active anomalies.",
                                      "telemetrySnippet": "L1 STATUS: In Review by L1 | Target: Finance01 | Source IP: 10.10.20.15 | SLA Timer: 14m Remaining",
                                      "highlightText": "L1 analysts handle rapid first-line qualification, entity identification, and initial triage."
                            },
                            {
                                      "id": 3,
                                      "stage": "3. Tier 2 Response",
                                      "iconName": "server",
                                      "title": "L2 Analyst Investigates Escalated Incidents",
                                      "description": "When alerts show signs of compromise, L2 conducts deep investigation, examines host telemetry, and isolates affected systems.",
                                      "telemetrySnippet": "L2 ACTION: Deep Host Telemetry Review | Active Containment | Root-Cause Trace",
                                      "highlightText": "L2 incident responders take over complex investigations requiring host-level containment and remediation."
                            },
                            {
                                      "id": 4,
                                      "stage": "4. Tier 3 Hunting",
                                      "iconName": "endpoint",
                                      "title": "L3 Senior Analyst Hunts Enterprise Threats",
                                      "description": "L3 hunts for stealthy adversary behavior, analyzes advanced threat patterns, and builds detection signatures across FinCorp.",
                                      "telemetrySnippet": "L3 SEARCH: Fleet-Wide IOC Sweep | YARA Signature Deployed | Behavioral Correlation",
                                      "highlightText": "L3 senior specialists proactively hunt for stealth threats that evade standard rule detections."
                            },
                            {
                                      "id": 5,
                                      "stage": "5. SOC Management",
                                      "iconName": "analyst",
                                      "title": "SOC Lead Coordinates Operations & Crisis",
                                      "description": "SOC Manager oversees shift coverage, monitors queue metrics, coordinates inter-team communication, and reports to leadership.",
                                      "telemetrySnippet": "MANAGEMENT: Shift Triage SLA: 98.4% | Escalations Active: 1 | Stakeholder Briefing Prepared",
                                      "highlightText": "The SOC Manager ensures operational excellence, resource allocation, and executive incident reporting."
                            }
                  ]
        },
        "interactive": {
                  "title": "[Interactive] Who Handles What?",
                  "scenario": "Assign each SOC operational responsibility to the correct team role: L1 Analyst, L2 Analyst, L3 / Senior Analyst, or SOC Manager.",
                  "cards": [
                            {
                                      "id": "ev-t1",
                                      "category": "User",
                                      "label": "Initial Alert Triage",
                                      "summary": "First-line review, entity validation, and preliminary qualification within strict SLA timers.",
                                      "detailedFindings": "L1 triage analysts claim unassigned alerts, extract key entities (User, Host, IP), and determine whether activity warrants closure or escalation.",
                                      "severityIndicator": "Normal"
                            },
                            {
                                      "id": "ev-t2",
                                      "category": "Source IP",
                                      "label": "Deep Investigation & Containment",
                                      "summary": "Host-level forensics, process analysis, and coordinated remediation.",
                                      "detailedFindings": "L2 incident responders perform in-depth analysis of confirmed threats, contain affected systems, and eliminate adversary foothold.",
                                      "severityIndicator": "Suspicious"
                            },
                            {
                                      "id": "ev-t3",
                                      "category": "Event ID",
                                      "label": "Advanced Technical Threat Hunting",
                                      "summary": "Proactive adversary hunting, malware analysis, and detection engineering.",
                                      "detailedFindings": "L3 senior analysts develop custom detections, analyze suspicious binary files, and sweep enterprise telemetry for stealth indicators.",
                                      "severityIndicator": "Malicious"
                            },
                            {
                                      "id": "ev-mgr",
                                      "category": "Timeline",
                                      "label": "SOC Operations Coordination",
                                      "summary": "Shift governance, SLA monitoring, and executive incident communication.",
                                      "detailedFindings": "The SOC Manager coordinates resources across shifts, leads crisis communication during major incidents, and maintains audit compliance.",
                                      "severityIndicator": "Normal"
                            }
                  ]
        },
        "socContext": {
          "title": "The Human Element: Avoiding Burnout",
          "scenario": "A Tier 1 analyst reviews 500 alerts per shift without break, leading to alert fatigue and a missed ransomware intrusion.",
          "analystMindset": "Security operations is a marathon, not a sprint. Proper shift rotations, automated triage assistance, and continuous learning keep analysts sharp.",
          "bestPractices": [
            "Take scheduled breaks during long monitoring shifts to maintain vigilance.",
            "Collaborate with team members during ambiguous or complex investigations.",
            "Flag recurring noisy alerts for tuning to reduce unnecessary queue burden."
          ]
        },
        "knowledgeCheck": {
          "matching": {
            "title": "Match SOC Roles to Responsibilities",
            "instructions": "Match each SOC role with its primary duty.",
            "pairs": [
              {
                "id": "r1",
                "left": "Tier 1 Triage Analyst",
                "right": "First-line alert review, entity extraction, and host isolation"
              },
              {
                "id": "r2",
                "left": "Tier 2 Incident Responder",
                "right": "Deep memory forensics, attack path analysis, and eradication"
              },
              {
                "id": "r3",
                "left": "Tier 3 Threat Hunter",
                "right": "Proactive adversary hunting and malware reverse engineering"
              },
              {
                "id": "r4",
                "left": "SOC Manager",
                "right": "Operational governance, SLA management, and CISO reporting"
              }
            ],
            "explanation": "Tier 1 triages and contains; Tier 2 investigates and eradicates; Tier 3 reverses malware and hunts; Managers lead governance."
          }
        }
      },
      {
        "id": "topic-1-2",
        "unitId": "unit-1",
        "title": "Chapter 2: Process",
        "order": 2,
        "estimatedMinutes": 15,
        "xpReward": 35,
        "theory": {
          "summaryLines": [
            "Process establishes standard operating procedures, investigation workflows, and response playbooks.",
            "Standard Operating Procedures (SOPs) provide step-by-step instructions for daily operations and routine tasks.",
            "Incident Response Playbooks define the precise investigative actions required for specific threat categories (Phishing, Ransomware, Brute Force).",
            "Service Level Agreements (SLAs) set time-bound response and resolution standards (e.g. 15-minute response for Critical alerts).",
            "Without repeatable processes, investigation quality varies widely between analysts, creating dangerous security gaps."
          ],
          "knowMore": {
            "title": "SANS Institute: Incident Response Playbooks",
            "description": "Learn how standard playbooks create repeatable, audit-ready triage procedures across enterprise security teams.",
            "externalUrl": "https://www.sans.org/white-papers/38580/",
            "externalLabel": "SANS Playbook Guide"
          }
        },
        "demo": {
                  "title": "[Demo] An Alert's Journey",
                  "subtitle": "Follow an alert as it moves step-by-step through the standard SOC operational lifecycle",
                  "steps": [
                            {
                                      "id": 1,
                                      "stage": "1. Alert Received",
                                      "iconName": "siem",
                                      "title": "Alert Ingested Into Triage Queue",
                                      "description": "FinCorp SIEM generates an alert after correlation rules detect anomalous authentication activity.",
                                      "telemetrySnippet": "STAGE 1: Ingestion | Rule: Multiple Failed Logins | Queue: Tier 1 Active Queue",
                                      "highlightText": "The alert journey begins the instant correlation detection triggers in the SIEM."
                            },
                            {
                                      "id": 2,
                                      "stage": "2. Triage",
                                      "iconName": "analyst",
                                      "title": "Analyst Verifies Initial Scope",
                                      "description": "L1 analyst claims the alert, reads the trigger conditions, and extracts target entities.",
                                      "telemetrySnippet": "STAGE 2: Triage | Analyst: Assigned | Entity: Finance01 (FIN-PC-04) | Initial SLA: Active",
                                      "highlightText": "Triage determines whether the alert represents a legitimate security concern or false alarm."
                            },
                            {
                                      "id": 3,
                                      "stage": "3. Investigation",
                                      "iconName": "server",
                                      "title": "Correlating Supporting Telemetry",
                                      "description": "Analyst reviews chronological evidence, checks source IP reputation, and verifies user context.",
                                      "telemetrySnippet": "STAGE 3: Investigation | Timeline Analyzed | Context: User called helpdesk regarding password typo",
                                      "highlightText": "Investigation looks beyond the alert banner to uncover what actually transpired."
                            },
                            {
                                      "id": 4,
                                      "stage": "4. Document",
                                      "iconName": "endpoint",
                                      "title": "Recording Audit-Proof Findings",
                                      "description": "Analyst documents the findings, evidence sources, employee verification, and timeline in the ticket.",
                                      "telemetrySnippet": "STAGE 4: Documentation | Findings Logged | Evidence Attached | Root Cause: User Typo",
                                      "highlightText": "Clear documentation ensures operational continuity and provides a verifiable audit trail."
                            },
                            {
                                      "id": 5,
                                      "stage": "5. Escalate / Close",
                                      "iconName": "analyst",
                                      "title": "Final Ticket Disposition",
                                      "description": "Alert is classified as a Benign False Positive and closed, or packaged with evidence and escalated to L2.",
                                      "telemetrySnippet": "STAGE 5: Disposition | Classification: False Positive (User Error) | Ticket: Closed",
                                      "highlightText": "Every alert resolves into an informed disposition: closure with rationale or escalation with evidence."
                            }
                  ]
        },
        "interactive": {
                  "title": "[Interactive] Build the SOC Workflow",
                  "scenario": "Arrange the shuffled SOC process stages in their correct operational sequence from receipt to resolution.",
                  "cards": [
                            {
                                      "id": "wf-1",
                                      "category": "Timeline",
                                      "label": "Stage 1: Receive",
                                      "summary": "Alert arrives in the centralized queue from the SIEM correlation engine.",
                                      "detailedFindings": "Alert appears in the unified dashboard with initial severity and timestamp.",
                                      "severityIndicator": "Normal"
                            },
                            {
                                      "id": "wf-2",
                                      "category": "User",
                                      "label": "Stage 2: Understand",
                                      "summary": "Identify the trigger, affected user, host asset, and source IP.",
                                      "detailedFindings": "Analyst reads the rule definition and extracts target entities.",
                                      "severityIndicator": "Normal"
                            },
                            {
                                      "id": "wf-3",
                                      "category": "Event ID",
                                      "label": "Stage 3: Investigate",
                                      "summary": "Examine chronological event logs and organizational context.",
                                      "detailedFindings": "Correlate authentication logs and verify if user had legitimate reason for activity.",
                                      "severityIndicator": "Suspicious"
                            },
                            {
                                      "id": "wf-4",
                                      "category": "Source IP",
                                      "label": "Stage 4: Document",
                                      "summary": "Record findings, evidence citations, and actions taken.",
                                      "detailedFindings": "Write clear, concise investigation notes adhering to SOC ticketing standards.",
                                      "severityIndicator": "Normal"
                            },
                            {
                                      "id": "wf-5",
                                      "category": "Timeline",
                                      "label": "Stage 5: Escalate / Close",
                                      "summary": "Apply final disposition: resolve benign ticket or escalate verified threat.",
                                      "detailedFindings": "Close with justification or transfer cleanly to L2 Incident Response.",
                                      "severityIndicator": "Normal"
                            }
                  ]
        },
        "socContext": {
          "title": "Process Consistency During High-Stress Breaches",
          "scenario": "During an active malware outbreak, an analyst panics and begins unplugging network cables without documenting host IDs or saving RAM.",
          "analystMindset": "In high-pressure crises, rely on the playbook. Trusting proven processes prevents errors and ensures evidence is preserved.",
          "bestPractices": [
            "Follow playbook steps in order rather than skipping ahead.",
            "Document every step taken directly into the investigation ticket.",
            "Submit recommendations to update playbooks when new attacker techniques are encountered."
          ]
        },
        "knowledgeCheck": {
          "matching": {
            "title": "Match Process Types to Purpose",
            "instructions": "Match each process element with its role.",
            "pairs": [
              {
                "id": "pr1",
                "left": "Incident Playbook",
                "right": "Step-by-step technical procedures for specific threat types"
              },
              {
                "id": "pr2",
                "left": "Standard Operating Procedure",
                "right": "Daily operational guidelines for shift management and triage"
              },
              {
                "id": "pr3",
                "left": "Service Level Agreement (SLA)",
                "right": "Contractual deadlines for alert response and incident containment"
              },
              {
                "id": "pr4",
                "left": "Escalation Matrix",
                "right": "Decision rules governing when to transfer tickets to higher tiers"
              }
            ],
            "explanation": "Playbooks govern specific threats, SOPs govern daily operations, SLAs set response timers, and escalation matrices control handoffs."
          }
        }
      },
      {
        "id": "topic-1-3",
        "unitId": "unit-1",
        "title": "Chapter 3: Technology",
        "order": 3,
        "estimatedMinutes": 15,
        "xpReward": 35,
        "theory": {
          "summaryLines": [
            "Technology provides the visibility, analytics, detection, and automation platforms required to monitor enterprise assets.",
            "SIEM (Security Information & Event Management): Aggregates, correlates, and analyzes security logs from across the enterprise in real time.",
            "EDR (Endpoint Detection & Response): Continuously monitors endpoint process, file, and network activity with live isolation capabilities.",
            "NDR (Network Detection & Response): Inspects raw wire traffic, captures PCAPs, and detects lateral movement or C2 beaconing.",
            "SOAR (Security Orchestration, Automation & Response): Executes automated playbooks to enrich alerts, query threat intel, and block malicious IPs."
          ],
          "knowMore": {
            "title": "Gartner Magic Quadrant for Security Information and Event Management",
            "description": "Learn how modern SIEM, EDR, and SOAR tools integrate into unified XDR architectures.",
            "externalUrl": "https://www.gartner.com/reviews/market/security-information-and-event-management",
            "externalLabel": "Gartner SIEM Guide"
          }
        },
        "demo": {
                  "title": "[Demo] The SOC Toolset",
                  "subtitle": "See how telemetry from endpoints, networks, email, and identity flows into the analyst's toolset",
                  "steps": [
                            {
                                      "id": 1,
                                      "stage": "1. Security Sources",
                                      "iconName": "endpoint",
                                      "title": "Enterprise Telemetry Generation",
                                      "description": "Workstations, network firewalls, email gateways, and Active Directory log activity across FinCorp.",
                                      "telemetrySnippet": "SOURCES: FIN-PC-04 (Endpoint) | Edge Firewall (Network) | M365 (Email) | Entra ID (Identity)",
                                      "highlightText": "Diverse telemetry sources provide the raw visibility necessary to detect threats."
                            },
                            {
                                      "id": 2,
                                      "stage": "2. SIEM Platform",
                                      "iconName": "siem",
                                      "title": "Centralized Log Search & Correlation",
                                      "description": "The SIEM aggregates logs from all enterprise sources, normalizes timestamps, and applies detection rules.",
                                      "telemetrySnippet": "SIEM: Ingesting 12,000 EPS | Correlation Active: Rule 104 (Failed Login Spike)",
                                      "highlightText": "The SIEM correlates signals across different systems to identify attacks that single tools miss."
                            },
                            {
                                      "id": 3,
                                      "stage": "3. EDR (Endpoint Detection)",
                                      "iconName": "server",
                                      "title": "Deep Host Telemetry & Isolation",
                                      "description": "EDR agents capture running process trees, network sockets, and provide one-click host isolation.",
                                      "telemetrySnippet": "EDR: FIN-PC-04 Online | Sensor v8.2 | Process Tree Monitored | Host Isolation: Ready",
                                      "highlightText": "EDR gives analysts immediate visibility and containment control directly on user workstations."
                            },
                            {
                                      "id": 4,
                                      "stage": "4. Network & Email Defenses",
                                      "iconName": "attacker",
                                      "title": "Perimeter & Inbound Protection",
                                      "description": "Next-generation firewalls inspect network traffic while email gateways detonate suspicious attachments.",
                                      "telemetrySnippet": "NETWORK/EMAIL: Perimeter Inbound Pass | Email Gateway: Clean | Port Inspection: Active",
                                      "highlightText": "Perimeter tools defend the border and generate crucial network flow telemetry."
                            },
                            {
                                      "id": 5,
                                      "stage": "5. Case Management",
                                      "iconName": "analyst",
                                      "title": "Ticketing & Investigation Tracking",
                                      "description": "Centralized case management where the analyst documents findings, tracks SLA timers, and manages cases.",
                                      "telemetrySnippet": "TICKETING: Case #2026-881 Opened | Assigned: L1 Analyst | SLA: 30m | Status: Investigating",
                                      "highlightText": "Case management systems preserve institutional memory and track incident lifecycles."
                            }
                  ]
        },
        "interactive": {
                  "title": "[Interactive] Which Tool Helps?",
                  "scenario": "Match each practical investigation need to the appropriate SOC technology category.",
                  "cards": [
                            {
                                      "id": "tool-siem",
                                      "category": "Event ID",
                                      "label": "SIEM (Security Information & Event Management)",
                                      "summary": "Used to search, aggregate, and correlate security logs across the enterprise.",
                                      "detailedFindings": "Best suited when you need to run historical queries, cross-correlate firewall and authentication events, and detect patterns.",
                                      "severityIndicator": "Normal"
                            },
                            {
                                      "id": "tool-edr",
                                      "category": "User",
                                      "label": "EDR (Endpoint Detection & Response)",
                                      "summary": "Used to inspect process executions and isolate compromised endpoints.",
                                      "detailedFindings": "Best suited when verifying what parent processes spawned on a workstation or containing an infected host remotely.",
                                      "severityIndicator": "Normal"
                            },
                            {
                                      "id": "tool-net",
                                      "category": "Source IP",
                                      "label": "Firewall / Network Monitoring",
                                      "summary": "Used to inspect network traffic flows and block malicious IP connections.",
                                      "detailedFindings": "Best suited when checking outbound connection attempts, protocol anomalies, and enforcing perimeter IP blocks.",
                                      "severityIndicator": "Normal"
                            },
                            {
                                      "id": "tool-case",
                                      "category": "Timeline",
                                      "label": "Case Management / Ticketing",
                                      "summary": "Used to manage investigations, assign tasks, and maintain audit records.",
                                      "detailedFindings": "Best suited for logging evidence, tracking SLA response deadlines, and coordinating handoffs between analyst tiers.",
                                      "severityIndicator": "Normal"
                            }
                  ]
        },
        "socContext": {
          "title": "The Single Pane of Glass Reality",
          "scenario": "An analyst relies entirely on SIEM alerts without ever checking EDR or network telemetry, missing an in-memory attack.",
          "analystMindset": "No single tool provides 100% visibility. Correlate host EDR logs with network NDR traffic and perimeter firewalls for complete truth.",
          "bestPractices": [
            "Pivot from SIEM alerts directly into EDR consoles to inspect process execution trees.",
            "Cross-check external IPs against proxy and firewall logs to verify data egress volume.",
            "Leverage SOAR automated enrichment to save time during initial alert triage."
          ]
        },
        "knowledgeCheck": {
          "matching": {
            "title": "Match Security Technologies to Primary Capabilities",
            "instructions": "Match each security platform to its core strength.",
            "pairs": [
              {
                "id": "tc1",
                "left": "SIEM",
                "right": "Centralized log aggregation, normalization, and cross-source correlation"
              },
              {
                "id": "tc2",
                "left": "EDR",
                "right": "Host-level process monitoring, memory inspection, and network isolation"
              },
              {
                "id": "tc3",
                "left": "NDR",
                "right": "Wire traffic analysis, protocol inspection, and packet capture"
              },
              {
                "id": "tc4",
                "left": "SOAR",
                "right": "Automated playbook orchestration, enrichment, and rapid containment actions"
              }
            ],
            "explanation": "SIEM correlates logs; EDR monitors and isolates endpoints; NDR inspects wire traffic; SOAR automates repetitive actions."
          }
        }
      },
      {
        "id": "topic-1-4",
        "unitId": "unit-1",
        "title": "Chapter 4: Data Flow & SOC Architecture Demo",
        "order": 4,
        "estimatedMinutes": 20,
        "xpReward": 50,
        "theory": {
          "summaryLines": [
            "Security data flow traces the path from raw activity on an asset to actionable intelligence on an analyst dashboard.",
            "Step 1: Endpoints, servers, firewalls, and SaaS apps generate raw logs (e.g. Syslog, Windows Event Logs).",
            "Step 2: Universal Forwarders or Log Shippers compress, encrypt, and transmit logs to central collection indexers.",
            "Step 3: The SIEM parses fields (user, IP, process, timestamp), normalizes them to an OSSEM/CIM schema, and indexes them.",
            "Step 4: Real-time correlation engines evaluate rules against incoming logs and fire high-fidelity alerts when thresholds or patterns are matched."
          ],
          "knowMore": {
            "title": "MITRE ATT&CK: Data Source Mapping and Ingestion Visibility",
            "description": "Learn how modern SOCs align their log ingestion pipelines with MITRE ATT&CK techniques to eliminate detection blind spots.",
            "externalUrl": "https://attack.mitre.org/datasources/",
            "externalLabel": "MITRE Data Sources"
          }
        },
        "demo": {
                  "title": "[Demo] Follow the Security Signal",
                  "subtitle": "Trace a security signal from an employee workstation all the way to an L1 analyst alert",
                  "steps": [
                            {
                                      "id": 1,
                                      "stage": "1. Employee Activity",
                                      "iconName": "endpoint",
                                      "title": "User Interacts with Workstation",
                                      "description": "Employee Finance01 logs into workstation FIN-PC-04 on the FinCorp internal network.",
                                      "telemetrySnippet": "SIGNAL 1: Interactive logon initiated on workstation FIN-PC-04 by user Finance01.",
                                      "highlightText": "All enterprise telemetry begins with human or automated activity on computing systems."
                            },
                            {
                                      "id": 2,
                                      "stage": "2. Security Data Generated",
                                      "iconName": "server",
                                      "title": "Local OS & Sensor Record Telemetry",
                                      "description": "The operating system records logon events, process executions, and network socket creations.",
                                      "telemetrySnippet": "SIGNAL 2: Windows Security Event 4625 recorded (Bad Password). Local sensor captures event.",
                                      "highlightText": "Security sensors convert physical and software interactions into structured telemetry records."
                            },
                            {
                                      "id": 3,
                                      "stage": "3. Security Platform Ingestion",
                                      "iconName": "siem",
                                      "title": "Telemetry Streamed to Central Platform",
                                      "description": "Logs stream securely across the internal network to the centralized security data platform.",
                                      "telemetrySnippet": "SIGNAL 3: Telemetry packet transmitted to central SIEM cluster for parsing and indexing.",
                                      "highlightText": "Reliable log forwarding ensures timely ingestion without data loss."
                            },
                            {
                                      "id": 4,
                                      "stage": "4. Detection Engine Evaluation",
                                      "iconName": "attacker",
                                      "title": "Correlation Rule Identifies Anomaly",
                                      "description": "Detection logic recognizes a cluster of failed attempts exceeding normal baseline thresholds.",
                                      "telemetrySnippet": "SIGNAL 4: Rule 'Multiple Failed Logins' triggered: Count = 18 in 2 minutes.",
                                      "highlightText": "Detection rules turn passive event data into active, prioritized security signals."
                            },
                            {
                                      "id": 5,
                                      "stage": "5. SOC Alert Dispatched",
                                      "iconName": "analyst",
                                      "title": "Alert Placed in L1 Analyst Queue",
                                      "description": "A structured alert appears in the SOC console ready for an L1 analyst to begin triage.",
                                      "telemetrySnippet": "SIGNAL 5: Alert ALT-2026-04 created | Severity: Medium | Assigned to L1 Triage Queue.",
                                      "highlightText": "The completed data pipeline delivers timely, actionable intelligence directly to the analyst."
                            }
                  ]
        },
        "interactive": {
                  "title": "[Interactive] Trace the Alert",
                  "scenario": "Click the stages in order to trace the complete security signal path from initial user activity to the L1 analyst.",
                  "cards": [
                            {
                                      "id": "sig-src",
                                      "category": "User",
                                      "label": "Step 1: Source Activity",
                                      "summary": "Employee Finance01 attempts password entry on workstation FIN-PC-04.",
                                      "detailedFindings": "Initial user interaction generates local authentication telemetry on the host.",
                                      "severityIndicator": "Normal"
                            },
                            {
                                      "id": "sig-data",
                                      "category": "Event ID",
                                      "label": "Step 2: Security Telemetry",
                                      "summary": "Operating system generates Event 4625 audit records and sensor telemetry.",
                                      "detailedFindings": "Structured event data is captured with timestamps, usernames, and host IP addresses.",
                                      "severityIndicator": "Normal"
                            },
                            {
                                      "id": "sig-det",
                                      "category": "Source IP",
                                      "label": "Step 3: Detection Logic",
                                      "summary": "Central SIEM correlation rule evaluates incoming event threshold.",
                                      "detailedFindings": "Rule identifies 18 failed login attempts within a narrow 2-minute time window.",
                                      "severityIndicator": "Suspicious"
                            },
                            {
                                      "id": "sig-alert",
                                      "category": "Timeline",
                                      "label": "Step 4: SOC Alert & Analyst Triage",
                                      "summary": "Alert ALT-2026-04 is generated and dispatched to the L1 analyst queue.",
                                      "detailedFindings": "Analyst receives actionable alert with extracted entities ready for immediate triage.",
                                      "severityIndicator": "Normal"
                            }
                  ]
        },
        "socContext": {
          "title": "Understanding Telemetry Delays (Latency & Jitter)",
          "scenario": "An attacker compromises a laptop while the employee is traveling on an airplane. No logs reach the SIEM until the VPN reconnects.",
          "analystMindset": "Always compare Event Timestamp (when it happened on the host) vs Ingestion Timestamp (when the SIEM received it). A 4-hour delay indicates host disconnection or forwarder queuing.",
          "bestPractices": [
            "Account for timezone conversions (ensure all SIEM queries standardize on UTC).",
            "Investigate ingestion lag if alerts appear minutes or hours after process execution.",
            "Report broken forwarders immediately to maintain visibility coverage."
          ]
        },
        "knowledgeCheck": {
          "dragDrop": {
            "title": "Sequence the SOC Data Flow",
            "instructions": "Drag and arrange the 5 stages of security data flow in their correct sequential order from origin to analyst.",
            "items": [
              {
                "id": "df-1",
                "label": "Event Generation on Host (Process execution / network socket)",
                "order": 1
              },
              {
                "id": "df-2",
                "label": "Forwarder Transmission (Encrypted log shipping via TLS)",
                "order": 2
              },
              {
                "id": "df-3",
                "label": "SIEM Parsing & Normalization (Extracting standard CIM fields)",
                "order": 3
              },
              {
                "id": "df-4",
                "label": "Correlation Rule Trigger (Detection criteria met, alert created)",
                "order": 4
              },
              {
                "id": "df-5",
                "label": "Analyst Triage & Qualification (L1 claims ticket and verifies IOCs)",
                "order": 5
              }
            ],
            "explanation": "Telemetry originates on the host, travels via log forwarders to the SIEM, undergoes normalization and correlation, and finally surfaces as an analyst alert."
          }
        }
      }
    ],
    "assessment": {
      "id": "unit-1-assessment",
      "title": "Unit 1 Challenge: Elena Gomez Shift Handover Briefing",
      "passingScore": 75,
      "xpReward": 100,
      "questions": [
        {
          "id": "u1-q1",
          "question": "What are the three fundamental pillars that form the foundation of any effective SOC?",
          "options": [
            "Hardware, Software, Firmware",
            "People, Process, Technology",
            "Firewalls, Antivirus, SIEM",
            "Identification, Protection, Recovery"
          ],
          "correctAnswer": 1,
          "explanation": "The three foundational pillars of a SOC are People (analysts), Process (SOPs and playbooks), and Technology (monitoring tools)."
        },
        {
          "id": "u1-q2",
          "question": "In a tiered SOC hierarchy, what is the primary operational responsibility of a Tier 1 Analyst?",
          "options": [
            "Malware reverse engineering and memory extraction",
            "Writing executive risk disclosures for the board",
            "Triage inbound alerts, extract entities, verify IOCs, and escalate true threats within SLA",
            "Designing enterprise firewall architectures"
          ],
          "correctAnswer": 2,
          "explanation": "Tier 1 analysts handle initial queue triage, entity validation, basic containment, and escalation within SLA timeframes."
        },
        {
          "id": "u1-q3",
          "question": "Why is log normalization to a Common Information Model (CIM) essential in a modern SIEM?",
          "options": [
            "It compresses logs to zero bytes",
            "It allows unified detection rules to query fields consistently across heterogeneous vendors (Windows, Linux, Palo Alto)",
            "It eliminates the need for Tier 2 analysts",
            "It encrypts local workstation hard drives"
          ],
          "correctAnswer": 1,
          "explanation": "Normalization standardizes field names (e.g. src_ip, user, process_name) so rules can detect attacks regardless of the log vendor source."
        },
        {
          "id": "u1-q4",
          "question": "When comparing Event Time vs Ingestion Time in an alert investigation, a large time difference usually indicates:",
          "options": [
            "A cyberattack in progress",
            "Telemetry latency caused by offline endpoints, slow network pipes, or forwarder queuing",
            "The SIEM clock is broken",
            "The alert is definitely a false positive"
          ],
          "correctAnswer": 1,
          "explanation": "A gap between Event Time (endpoint occurrence) and Ingestion Time (SIEM receipt) indicates network latency, offline machines, or forwarder backlog."
        }
      ]
    }
  },
  {
    "id": "unit-2",
    "unitNumber": 2,
    "title": "Unit 2: Alerts & Events",
    "description": "Learn the strict operational taxonomy separating raw log Events from SIEM Alerts, qualified Incidents, and legal Cases.",
    "estimatedHours": 2,
    "topics": [
      {
        "id": "topic-2-1",
        "unitId": "unit-2",
        "title": "Topic 1: Events vs. Alerts",
        "order": 1,
        "estimatedMinutes": 20,
        "xpReward": 50,
        "theory": {
          "summaryLines": [
            "An Event is any observable occurrence in a system, network, or application (e.g. user login, DNS query, firewall packet drop).",
            "An enterprise generates billions of events daily—99.99% of which are normal, benign business activities.",
            "An Alert is an event (or correlated sequence of events) that meets a predefined detection rule or statistical threshold indicating potential malicious activity.",
            "Alerts require human or automated investigation to evaluate context and determine legitimacy.",
            "Confusing raw events with alerts leads to catastrophic analyst burnout and alert fatigue."
          ],
          "knowMore": {
            "title": "SANS Institute: From Logs to Security Events and Alerts",
            "description": "Read the SANS guide on event filtering, correlation rules, and reducing noise in enterprise monitoring systems.",
            "externalUrl": "https://www.sans.org/white-papers/33209/",
            "externalLabel": "SANS Event Management"
          }
        },
        "demo": {
                  "title": "[Demo] Something Happened: Activity to Alert",
                  "subtitle": "Understand how normal events are recorded and when patterns elevate into an actionable alert",
                  "steps": [
                            {
                                      "id": 1,
                                      "stage": "1. Activity Occurs",
                                      "iconName": "endpoint",
                                      "title": "User Enters Password",
                                      "description": "Finance01 types a password on FIN-PC-04. The operating system evaluates the credentials against Active Directory.",
                                      "telemetrySnippet": "LOGON_PROMPT: User 'Finance01' submitting authentication request on workstation FIN-PC-04.",
                                      "highlightText": "Routine computer interactions occur continuously across the enterprise."
                            },
                            {
                                      "id": 2,
                                      "stage": "2. Event Recorded",
                                      "iconName": "server",
                                      "title": "Single Security Event Generated",
                                      "description": "One login attempt generates a single security event recording what happened, timestamped in the log.",
                                      "telemetrySnippet": "EVENT: ID=4625 | Status=0xC000006A (Bad Password) | User=Finance01 | Time=10:31:40",
                                      "highlightText": "An event is a neutral, factual historical record that an action occurred."
                            },
                            {
                                      "id": 3,
                                      "stage": "3. Pattern Emerges",
                                      "iconName": "attacker",
                                      "title": "Multiple Related Events Occur",
                                      "description": "Within 60 seconds, 4 additional failed attempts occur in quick succession for the same account.",
                                      "telemetrySnippet": "EVENT CLUSTER: 10:31:44 (Fail) | 10:31:47 (Fail) | 10:31:52 (Fail) | Total Failures: 4",
                                      "highlightText": "Single events are rarely dangerous; patterns of repeated events signal potential issues."
                            },
                            {
                                      "id": 4,
                                      "stage": "4. Pattern Recognition",
                                      "iconName": "siem",
                                      "title": "SIEM Detection Rule Evaluates Stream",
                                      "description": "The correlation engine evaluates the event stream and identifies abnormal frequency exceeding normal baseline.",
                                      "telemetrySnippet": "CORRELATION: Threshold breached (>3 failures in 1 min) | Condition: TRUE",
                                      "highlightText": "Detection logic transforms raw event streams into meaningful pattern indicators."
                            },
                            {
                                      "id": 5,
                                      "stage": "5. Alert Dispatched",
                                      "iconName": "analyst",
                                      "title": "Alert Placed in Queue for Review",
                                      "description": "An alert appears on the L1 analyst dashboard, elevating the activity from passive log storage to active human review.",
                                      "telemetrySnippet": "ALERT: Multiple Failed Login Attempts | Target: Finance01 | Host: FIN-PC-04 | Priority: Medium",
                                      "highlightText": "An event records activity. An alert brings potentially important activity to analyst attention."
                            }
                  ]
        },
        "interactive": {
                  "title": "[Interactive] Event or Alert?",
                  "scenario": "Classify each security occurrence as either a raw Event (informational log) or an actionable Alert (requires attention).",
                  "cards": [
                            {
                                      "id": "ea-1",
                                      "category": "User",
                                      "label": "User successfully logged in at 09:00 AM",
                                      "summary": "Event 4624 generated from employee's assigned workstation during standard working hours.",
                                      "detailedFindings": "Classification: EVENT. Standard normal business activity that is logged for audit purposes but requires no analyst action.",
                                      "severityIndicator": "Normal"
                            },
                            {
                                      "id": "ea-2",
                                      "category": "Source IP",
                                      "label": "Firewall dropped inbound packet on port 23",
                                      "summary": "Edge firewall blocked unsolicited Telnet connection from an external public IP address.",
                                      "detailedFindings": "Classification: EVENT. Routine firewall enforcement dropping unsolicited traffic. Millions occur daily without needing triage.",
                                      "severityIndicator": "Normal"
                            },
                            {
                                      "id": "ea-3",
                                      "category": "Event ID",
                                      "label": "15 failed logins detected in 60 seconds",
                                      "summary": "Abnormal volume of credential failures followed by temporary account lockout.",
                                      "detailedFindings": "Classification: ALERT. A pattern of repeated failures crosses threshold and requires human triage to rule out brute force.",
                                      "severityIndicator": "Suspicious"
                            },
                            {
                                      "id": "ea-4",
                                      "category": "Timeline",
                                      "label": "Suspicious login pattern outside business hours",
                                      "summary": "Finance executive account authenticating at 03:30 AM from a previously unseen overseas IP.",
                                      "detailedFindings": "Classification: ALERT. High-risk behavioral anomaly requiring immediate validation against user travel schedules.",
                                      "severityIndicator": "Suspicious"
                            }
                  ]
        },
        "socContext": {
          "title": "Managing the Alert-to-Event Ratio",
          "scenario": "A SOC director notices analysts are closing 400 alerts an hour without investigating because threshold rules fire on every port scan.",
          "analystMindset": "If an alert fires 100 times a day and 99 are ignored, it is not an alert—it is noise. Raise tuning tickets to fix noisy detection logic.",
          "bestPractices": [
            "Verify raw underlying events before forming a triage conclusion.",
            "Check for event suppression or deduplication in the SIEM to prevent duplicate queue items.",
            "Ensure alerts provide direct drill-down links to original raw event logs."
          ]
        },
        "knowledgeCheck": {
          "matching": {
            "title": "Classify Telemetry as Event vs Alert",
            "instructions": "Match the description on the left with whether it constitutes an Event or an Alert.",
            "pairs": [
              {
                "id": "ea1",
                "left": "Firewall drops a single inbound packet on port 445",
                "right": "Routine Network Event (Individual dropped packet log)"
              },
              {
                "id": "ea2",
                "left": "Host initiates 500 connections to external IPs in 5 seconds",
                "right": "Network Anomaly Alert (Port scan / C2 burst detected)"
              },
              {
                "id": "ea3",
                "left": "Employee unlocks their Windows workstation at 9:00 AM",
                "right": "Standard Authentication Event (Normal user login record)"
              },
              {
                "id": "ea4",
                "left": "Command line launches encoded web download script",
                "right": "High-Priority Threat Alert (Adversary execution technique)"
              }
            ],
            "explanation": "Single operational occurrences are raw Events (log records); aggregated patterns matching threat signatures or anomaly thresholds are Actionable Alerts."
          }
        }
      },
      {
        "id": "topic-2-2",
        "unitId": "unit-2",
        "title": "Topic 2: Incidents & Cases",
        "order": 2,
        "estimatedMinutes": 20,
        "xpReward": 50,
        "theory": {
          "summaryLines": [
            "An Alert becomes an Incident when an analyst investigates and confirms that unauthorized, malicious, or policy-violating activity has actually occurred.",
            "Not all alerts are incidents: false positives are closed, and benign true positives are handled without formal incident declaration.",
            "A Case is the formal operational and legal container tracking the entire incident lifecycle (evidence artifacts, timeline, notes, remediation).",
            "Cases maintain chain of custody, track billable hours, record regulatory notification deadlines, and support post-incident audits.",
            "Summary Hierarchy: Millions of Events -> Thousands of Alerts -> Tens of Confirmed Incidents -> Documented Cases."
          ],
          "knowMore": {
            "title": "ISO/IEC 27035: Information Security Incident Management Standard",
            "description": "Learn the international standard for managing security incidents, structuring investigation cases, and documenting legal evidence.",
            "externalUrl": "https://www.iso.org/standard/60803.html",
            "externalLabel": "ISO 27035 Incident Standard"
          }
        },
        "demo": {
                  "title": "[Demo] From Alert to Investigation",
                  "subtitle": "Watch an unverified alert transition into a confirmed incident and an organized case record",
                  "steps": [
                            {
                                      "id": 1,
                                      "stage": "1. Unverified Alert",
                                      "iconName": "siem",
                                      "title": "Alert ALT-2026-04 Enters Triage",
                                      "description": "L1 claims the alert for multiple failed login attempts on Finance01. At this stage, it is merely an unverified indicator.",
                                      "telemetrySnippet": "STATE: Alert | ID: ALT-2026-04 | Status: Unverified | Trigger: Multiple Failed Logins",
                                      "highlightText": "Alerts represent unverified security signals that require human validation."
                            },
                            {
                                      "id": 2,
                                      "stage": "2. Analyst Triage",
                                      "iconName": "analyst",
                                      "title": "Analyst Inspects Activity Context",
                                      "description": "L1 reviews recent host activity and observes subsequent unauthorized access commands executed on FIN-PC-04.",
                                      "telemetrySnippet": "FINDING: Failed logins were followed by unauthorized privilege escalation script execution.",
                                      "highlightText": "Triage separates harmless anomalies from genuine security threats."
                            },
                            {
                                      "id": 3,
                                      "stage": "3. Declared Incident",
                                      "iconName": "attacker",
                                      "title": "Security Issue Confirmed",
                                      "description": "Analyst confirms unauthorized access. The alert is formally upgraded to an active Incident.",
                                      "telemetrySnippet": "UPGRADE: Alert -> INCIDENT | Classification: Unauthorized Access | Scope: Workstation FIN-PC-04",
                                      "highlightText": "An incident is a confirmed violation or imminent threat to computer security policies."
                            },
                            {
                                      "id": 4,
                                      "stage": "4. Case Created",
                                      "iconName": "server",
                                      "title": "Formal Investigation Case Opened",
                                      "description": "A formal Case is established to organize forensic artifacts, assign remediation tasks, and track response timeline.",
                                      "telemetrySnippet": "CASE MANAGEMENT: Case #INC-2026-104 Created | Owner: Tier 2 Response | SLA: Active",
                                      "highlightText": "A case is the structured investigation file that tracks evidence, actions, and resolution."
                            },
                            {
                                      "id": 5,
                                      "stage": "5. Coordinated Resolution",
                                      "iconName": "analyst",
                                      "title": "Remediation & Closure",
                                      "description": "Host is isolated, malicious processes terminated, credentials rotated, and lessons documented in the case record.",
                                      "telemetrySnippet": "RESOLUTION: Eradication Complete | Systems Verified | Final Report Filed",
                                      "highlightText": "Structured cases ensure accountability and thorough remediation across the organization."
                            }
                  ]
        },
        "interactive": {
                  "title": "[Interactive] Where Does It Belong?",
                  "scenario": "Categorize each security situation into the appropriate level: Event, Alert, Incident, or Case.",
                  "cards": [
                            {
                                      "id": "cat-event",
                                      "category": "User",
                                      "label": "Backup Server Routine Connection",
                                      "summary": "Scheduled database backup completes successfully at 02:00 AM, logging 40 MB data transfer.",
                                      "detailedFindings": "Level: EVENT. Expected baseline log entry that records normal system behavior.",
                                      "severityIndicator": "Normal"
                            },
                            {
                                      "id": "cat-alert",
                                      "category": "Event ID",
                                      "label": "Unusual Spike in Failed Logins",
                                      "summary": "SIEM fires detection for 18 failed login attempts on workstation FIN-PC-04.",
                                      "detailedFindings": "Level: ALERT. A triggered rule flagging an anomaly that requires human analyst review.",
                                      "severityIndicator": "Suspicious"
                            },
                            {
                                      "id": "cat-incident",
                                      "category": "Source IP",
                                      "label": "Confirmed Unauthorized Database Access",
                                      "summary": "Triage confirms an external IP accessed customer payroll records without authorization.",
                                      "detailedFindings": "Level: INCIDENT. A verified security breach violating organizational data confidentiality.",
                                      "severityIndicator": "Malicious"
                            },
                            {
                                      "id": "cat-case",
                                      "category": "Timeline",
                                      "label": "Multi-Team Investigation Record",
                                      "summary": "Centralized file containing forensic logs, legal notifications, and remediation checklists.",
                                      "detailedFindings": "Level: CASE. The administrative wrapper organizing evidence, actions, and post-incident reporting.",
                                      "severityIndicator": "Normal"
                            }
                  ]
        },
        "socContext": {
          "title": "Chain of Custody and Evidence Integrity",
          "scenario": "During a breach investigation, an analyst copies malware samples onto a personal USB drive without hashing or recording dates.",
          "analystMindset": "In a court of law or regulatory hearing, undocumented evidence is inadmissible. A formal Case guarantees cryptographic hashing (SHA256) and audit logging.",
          "bestPractices": [
            "Record SHA-256 hashes of all suspicious binaries and files before interacting with them.",
            "Never execute unapproved remediations without logging the action in the Case ticket.",
            "Ensure incident declarations follow the organizational escalation matrix immediately."
          ]
        },
        "knowledgeCheck": {
          "matching": {
            "title": "Match Definitions: Event, Alert, Incident, Case",
            "instructions": "Match each term with its correct security operations definition.",
            "pairs": [
              {
                "id": "t1",
                "left": "Event",
                "right": "Any observable technical occurrence on host or network"
              },
              {
                "id": "t2",
                "left": "Alert",
                "right": "Signal generated by rule matching potential maliciousness"
              },
              {
                "id": "t3",
                "left": "Incident",
                "right": "Confirmed security compromise requiring active response"
              },
              {
                "id": "t4",
                "left": "Case",
                "right": "Formal documented investigation file tracking evidence and timeline"
              }
            ],
            "explanation": "Events are raw facts; Alerts are filtered warnings; Incidents are confirmed attacks; Cases are documented investigation records."
          }
        }
      }
    ],
    "assessment": {
      "id": "unit-2-assessment",
      "title": "Topic 2 Assessment: Alerts & Events Mastery",
      "passingScore": 75,
      "xpReward": 100,
      "questions": [
        {
          "id": "u2-q1",
          "question": "What distinguishes a security Alert from a raw security Event?",
          "options": [
            "Events are always malicious, whereas alerts are benign",
            "An alert is generated when an event (or correlation of events) triggers a detection rule",
            "Events only come from firewalls, while alerts come from antivirus",
            "Alerts are stored in cold storage while events are displayed on dashboards"
          ],
          "correctAnswer": 1,
          "explanation": "Events are raw operational records; an alert is generated only when events meet specific detection or threshold rules."
        },
        {
          "id": "u2-q2",
          "question": "Under what condition should a Tier 1 analyst declare a formal Security Incident?",
          "options": [
            "Immediately whenever any alert is received in the queue",
            "When triage investigation confirms that unauthorized, malicious, or policy-violating activity has occurred",
            "Only after senior management approves via email",
            "Only if the company stock price drops"
          ],
          "correctAnswer": 1,
          "explanation": "An incident is declared once verification confirms true malicious intent or unauthorized impact on assets."
        },
        {
          "id": "u2-q3",
          "question": "What is the primary operational purpose of opening an investigation Case in the ticketing system?",
          "options": [
            "To delete old event logs and save disk space",
            "To track investigation evidence, timeline, actions taken, and legal chain of custody",
            "To prevent other analysts from seeing the alert",
            "To automatically reset all passwords across the domain"
          ],
          "correctAnswer": 1,
          "explanation": "A Case serves as the formal repository documenting forensic evidence, actions, timeline, and post-incident remediation."
        },
        {
          "id": "u2-q4",
          "question": "If an enterprise generates 50,000,000 firewall events per day, why does the SOC not investigate each event individually?",
          "options": [
            "Firewall events are always encrypted and cannot be viewed",
            "The vast majority are legitimate, routine network traffic; correlation rules filter for anomalous threat patterns to prevent analyst overwhelm",
            "Firewalls are not part of SOC monitoring",
            "Analysts only work 2 hours a day"
          ],
          "correctAnswer": 1,
          "explanation": "Filtering and correlation rules reduce millions of routine events into a manageable queue of high-probability candidate alerts."
        }
      ]
    }
  },
  {
    "id": "unit-3",
    "unitNumber": 3,
    "title": "Unit 3: Alert Triage",
    "description": "Master systematic alert triage: understand the alert signature, extract core entities (User, Host, IP), verify evidence, and investigate real-world attacks.",
    "estimatedHours": 2,
    "topics": [
      {
        "id": "topic-3-1",
        "unitId": "unit-3",
        "title": "Topic 1: Open the Alert — The 5 Critical Fields",
        "order": 1,
        "estimatedMinutes": 20,
        "xpReward": 50,
        "theory": {
          "summaryLines": [
            "10:47 AM at FinCorp Boston SOC: Alert #SEC-2024-10847 flashes amber-red on your queue: 'Multiple Failed Login Attempts Followed by Host Probe'.",
            "The Pressure: Shift Lead Marcus Vance stops at your desk: 'Got anything hot on 10847? Standup with the CISO is in 5 minutes. Give me a read in 60 seconds.'",
            "The Overload Trap: The alert contains 28 lines of raw SIEM JSON—hex codes, GUIDs, and timestamps. Junior analysts freeze trying to read it all; senior analysts use the 5-Field Framework.",
            "The 5 Critical Anchors: In the first 60 seconds, exactly 5 fields matter: WHO (Target Account), WHAT (Target Asset), WHERE (Source IP), WHEN (Timestamp), and HOW MANY (Attempt Count).",
            "The Threat Story: Extracting these 5 fields transforms chaos into a defensible briefing: 'External IP 198.51.100.47 made 5 rapid failed logins against our Domain Controller FINCORP-DC01 targeting jdavis.'"
          ],
          "knowMore": {
            "title": "SANS Triage Playbook: The 5-Field Framework for Alert Qualification",
            "description": "Learn how top-tier enterprise SOCs extract WHO, WHAT, WHERE, WHEN, and HOW MANY within 60 seconds to eliminate triage paralysis.",
            "externalUrl": "https://www.sans.org/blog/soc-alert-triage-methodology/",
            "externalLabel": "SANS Alert Triage Guide"
          }
        },
        "demo": {
          "title": "[Demo] The 60-Second Alert Triage",
          "subtitle": "Watch an analyst face Alert #SEC-2024-10847, conquer information overload, and extract the 5 critical fields under shift lead pressure",
          "steps": [
            {
              "id": 1,
              "stage": "1. Ingestion & Panic",
              "iconName": "siem",
              "title": "Alert #SEC-2024-10847 Arrives Raw",
              "description": "A wall of 28 JSON fields lands on your screen. Shift Lead Marcus Vance asks: 'What've we got in 60 seconds?'",
              "telemetrySnippet": "ALERT #SEC-2024-10847: Rule='Multiple Failed Logins' | Priority=MEDIUM | RawFields=28 | Status=NEW",
              "highlightText": "Do NOT read line-by-line. 75% of raw SIEM fields are for compliance and audit trails, not initial triage."
            },
            {
              "id": 2,
              "stage": "2. Extract WHO & WHAT",
              "iconName": "analyst",
              "title": "Anchor 1 & 2: Target User & Target Host",
              "description": "Analyst extracts TargetUserName 'jdavis' (Commercial Loan Underwriter) and Computer 'FINCORP-DC01' (Primary Domain Controller).",
              "telemetrySnippet": "WHO: TargetUserName=jdavis | WHAT: Computer=FINCORP-DC01.fincorp.local (Tier-0 Domain Controller)",
              "highlightText": "Targeting a Domain Controller immediately elevates operational concern—this is critical enterprise infrastructure."
            },
            {
              "id": 3,
              "stage": "3. Extract WHERE",
              "iconName": "server",
              "title": "Anchor 3: Source Network Address",
              "description": "Analyst isolates IpAddress '198.51.100.47'. This is a public external IP, NOT an internal office subnet.",
              "telemetrySnippet": "WHERE: IpAddress=198.51.100.47 | Subnet=Public WAN (External) | Internal=NO | Port=54218",
              "highlightText": "Private IPs (10.x.x.x, 192.168.x.x) suggest internal noise; public IPs mean an external entity is knocking at the gate."
            },
            {
              "id": 4,
              "stage": "4. Extract WHEN & HOW MANY",
              "iconName": "attacker",
              "title": "Anchor 4 & 5: Time Window & Attempt Count",
              "description": "Analyst notes 5 failed attempts (Event ID 4625, SubStatus 0xC000006A) tightly clustered within 90 seconds starting at 14:30:12 EST.",
              "telemetrySnippet": "WHEN: 2024-01-15 14:30:12 - 14:31:45 EST | HOW MANY: 5 failed attempts | LogonType: 3 (Network)",
              "highlightText": "5 rapid network logons in 90 seconds indicate automated script probing, not a human typo."
            },
            {
              "id": 5,
              "stage": "5. Deliver Lead Briefing",
              "iconName": "endpoint",
              "title": "Deliver the 18-Second Briefing to Marcus",
              "description": "Analyst briefs Marcus with calm confidence: 'External IP 198.51.100.47 made 5 failed network logons against DC01 targeting jdavis in 90s. All blocked; escalating to L2 for perimeter firewall block.'",
              "telemetrySnippet": "BRIEFING COMPLETE: Time Taken=18s | Verdict=True Positive Probe | Escalation=L2 Firewall Block Initiated",
              "highlightText": "You went from information overload to calm, credible analyst in under 60 seconds."
            }
          ]
        },
        "interactive": {
          "title": "[Interactive] FinCorp Case #SEC-2024-10847 Triage Workbench",
          "scenario": "Marcus Vance is standing at your desk. Click the 5 critical fields in Alert #SEC-2024-10847 to pin them to your investigation panel and formulate your briefing.",
          "cards": [
            {
              "id": "ent-who",
              "category": "User",
              "label": "WHO (Account): jdavis@fincorp.local",
              "summary": "Jane Davis, Senior Commercial Loan Underwriter.",
              "detailedFindings": "Extracted Entity: User = jdavis. High-value business identity with loan access. No active password reset requested.",
              "severityIndicator": "Normal"
            },
            {
              "id": "ent-what",
              "category": "Event ID",
              "label": "WHAT (Host): FINCORP-DC01",
              "summary": "Primary Active Directory Domain Controller.",
              "detailedFindings": "Extracted Entity: Host = FINCORP-DC01.fincorp.local. Tier-0 Crown Jewel server. An attack here threatens enterprise auth.",
              "severityIndicator": "Malicious"
            },
            {
              "id": "ent-where",
              "category": "Source IP",
              "label": "WHERE (Source IP): 198.51.100.47 (External)",
              "summary": "Public WAN address originating outside the corporate firewall.",
              "detailedFindings": "Extracted Entity: Source IP = 198.51.100.47. External untrusted host. GeoIP resolves to unassigned bulletproof hosting provider.",
              "severityIndicator": "Suspicious"
            },
            {
              "id": "ent-when",
              "category": "Timeline",
              "label": "WHEN (Time): 14:30:12 - 14:31:45 EST",
              "summary": "Active afternoon business hours (Boston SOC time).",
              "detailedFindings": "Extracted Entity: Time Window = 93 seconds total duration. All attempts clustered within minutes of alert trigger.",
              "severityIndicator": "Normal"
            },
            {
              "id": "ent-howmany",
              "category": "Event ID",
              "label": "HOW MANY (Volume): 5 Failed Logons (Event 4625)",
              "summary": "5 sequential network logon failures with bad password codes.",
              "detailedFindings": "Extracted Entity: Event Count = 5. SubStatus 0xC000006A (Bad password). LogonType 3 (Network). Consistent with automated password spray.",
              "severityIndicator": "Suspicious"
            }
          ]
        },
        "socContext": {
          "title": "The FinCorp 60-Second Standup Briefing",
          "scenario": "Marcus Vance is standing at your desk with 60 seconds on the clock before his CISO standup. Junior analysts say 'I am still reading the logs.' Trained analysts deliver the 5-field sentence.",
          "analystMindset": "Never read an alert line-by-line. Extract the 5 anchors first, build the threat story, verify account impact, and take decisive operational action.",
          "bestPractices": [
            "Check asset criticality first: an attack on a Domain Controller (FINCORP-DC01) commands immediate priority over a guest Wi-Fi laptop.",
            "Verify RFC 1918 private subnets (10.x.x.x, 192.168.x.x) vs external public IPs to separate internal user typos from external adversaries.",
            "Calculate the attempt rate: human typing mistakes occur once or twice; automated credential attacks hit 5+ times in under two minutes."
          ]
        },
        "knowledgeCheck": {
          "dragDrop": {
            "title": "Sequence the 5 Critical Triage Anchors",
            "instructions": "Arrange the 5 triage fields in the logical order an analyst evaluates them to build an incident narrative.",
            "items": [
              {
                "id": "fa-1",
                "label": "WHO: Identify Targeted Account & Privilege Level (TargetUserName)",
                "order": 1
              },
              {
                "id": "fa-2",
                "label": "WHAT: Identify Target Host & Asset Criticality (Computer Name)",
                "order": 2
              },
              {
                "id": "fa-3",
                "label": "WHERE: Identify Originating IP & Network Boundary (Source IP)",
                "order": 3
              },
              {
                "id": "fa-4",
                "label": "WHEN: Establish Incident Time Window & Business Context (Timestamp)",
                "order": 4
              },
              {
                "id": "fa-5",
                "label": "HOW MANY: Measure Attack Frequency & Automation Pattern (Event Count)",
                "order": 5
              }
            ],
            "explanation": "Evaluating WHO is targeted and WHAT system is hit establishes asset criticality, followed by WHERE (origin), WHEN (timeline), and HOW MANY (automation velocity) to complete the threat story."
          }
        }
      },
      {
        "id": "topic-3-2",
        "unitId": "unit-3",
        "title": "Topic 2: Check Evidence & [Lab] 🔵 Basic Alert Triage",
        "order": 2,
        "estimatedMinutes": 25,
        "xpReward": 75,
        "theory": {
          "summaryLines": [
            "Once entities are identified, the analyst must check corroborating evidence to prove or disprove malicious activity.",
            "Process Lineage: Examine parent-child relationships (e.g. WINWORD.EXE spawning powershell.exe is a classic malicious execution chain).",
            "Command Line Parameters: Decode Base64 strings, analyze switches (-w hidden, -nop, -enc), and look for obfuscation techniques.",
            "File System & Hashes: Look up SHA-256 hashes in EDR and VirusTotal; verify if files were created in temporary directories (%AppData%, %Temp%).",
            "Network Flows: Corroborate endpoint process activity with firewall or proxy logs to verify data transfer volumes."
          ],
          "knowMore": {
            "title": "MITRE ATT&CK: T1059 Command and Scripting Interpreter Triage",
            "description": "Learn how to detect and investigate living-off-the-land script interpreters used by initial access brokers.",
            "externalUrl": "https://attack.mitre.org/techniques/T1059/",
            "externalLabel": "MITRE ATT&CK T1059"
          }
        },
        "demo": {
                  "title": "[Demo] Look Beyond the Alert",
                  "subtitle": "Watch the analyst examine supporting chronological evidence to determine what actually happened",
                  "steps": [
                            {
                                      "id": 1,
                                      "stage": "1. Beyond the Alert",
                                      "iconName": "siem",
                                      "title": "Alert is a Starting Point, Not Proof",
                                      "description": "An alert highlights an anomaly, but does not provide the verdict. Analyst opens the event log timeline.",
                                      "telemetrySnippet": "SEARCH: index=security host=FIN-PC-04 earliest=10:30:00 latest=10:35:00",
                                      "highlightText": "Never close or escalate an alert based solely on the summary banner—inspect the supporting events."
                            },
                            {
                                      "id": 2,
                                      "stage": "2. The Failure Sequence",
                                      "iconName": "attacker",
                                      "title": "Chronological Failed Attempts",
                                      "description": "10:31:40 (Failed), 10:31:44 (Failed), 10:31:47 (Failed), 10:31:52 (Failed). SubStatus 0xC000006A (Bad Password).",
                                      "telemetrySnippet": "10:31:40 - 10:31:52: Four rapid Event 4625 records from local console.",
                                      "highlightText": "Failure codes reveal whether the username was invalid or the password was mistyped."
                            },
                            {
                                      "id": 3,
                                      "stage": "3. The Crucial Turning Point",
                                      "iconName": "endpoint",
                                      "title": "Successful Logon at 10:32:05",
                                      "description": "Thirteen seconds after the last failure, Windows Event 4624 (Logon Success) is logged for Finance01 from the same PC.",
                                      "telemetrySnippet": "10:32:05 - Event 4624 (Logon Success) | LogonType=2 (Interactive) | User=Finance01",
                                      "highlightText": "A successful interactive login immediately following failures strongly suggests user typo correction."
                            },
                            {
                                      "id": 4,
                                      "stage": "4. Correlate User Context",
                                      "iconName": "server",
                                      "title": "Employee Contacted IT Helpdesk",
                                      "description": "Helpdesk ticketing system records a ticket from Finance01 at 10:30 AM stating 'Caps Lock was stuck on keyboard.'",
                                      "telemetrySnippet": "HELPDESK CORRELATION: Ticket #HD-44102 | User: Finance01 | Note: Caps lock keyboard issue resolved",
                                      "highlightText": "Correlating helpdesk tickets and user confirmation turns ambiguous data into verified certainty."
                            },
                            {
                                      "id": 5,
                                      "stage": "5. Triage Conclusion",
                                      "iconName": "analyst",
                                      "title": "Benign User Error (False Positive)",
                                      "description": "Alert + Evidence + Context shows a user password mistype rather than external adversary penetration.",
                                      "telemetrySnippet": "TRIAGE VERDICT: Benign False Positive | Root Cause: User Typo / Caps Lock | Closure Approved",
                                      "highlightText": "Investigating context eliminates unnecessary escalations and protects analyst focus."
                            }
                  ]
        },
        "interactive": {
                  "title": "[Interactive] Follow the Evidence",
                  "scenario": "Examine the timeline evidence. Select the key evidence items that matter for deciding the alert disposition.",
                  "cards": [
                            {
                                      "id": "ev-fails",
                                      "category": "Timeline",
                                      "label": "10:31:40 - 10:31:52: Rapid Failed Logins",
                                      "summary": "4 failed logon attempts in 12 seconds with error 'Bad Password'.",
                                      "detailedFindings": "Key Evidence: Demonstrates the exact frequency and nature of the failed authentications.",
                                      "severityIndicator": "Suspicious"
                            },
                            {
                                      "id": "ev-success",
                                      "category": "Event ID",
                                      "label": "10:32:05: Event 4624 (Logon Success)",
                                      "summary": "Successful interactive console logon from the exact same workstation.",
                                      "detailedFindings": "Key Evidence: Proves the legitimate user was physically present and successfully logged in.",
                                      "severityIndicator": "Normal"
                            },
                            {
                                      "id": "ev-src",
                                      "category": "Source IP",
                                      "label": "Source IP 10.10.20.15 (Assigned Desk)",
                                      "summary": "Source IP matches employee's assigned physical desk workstation on the corporate LAN.",
                                      "detailedFindings": "Key Evidence: Rules out external adversary access or unauthorized network bridging.",
                                      "severityIndicator": "Normal"
                            },
                            {
                                      "id": "ev-noise",
                                      "category": "User",
                                      "label": "Display Driver Telemetry (1920x1080)",
                                      "summary": "Routine graphics monitor resolution update logged by display adapter.",
                                      "detailedFindings": "De-emphasized: Peripheral telemetry unrelated to authentication security analysis.",
                                      "severityIndicator": "Normal"
                            }
                  ]
        },
        "socContext": {
          "title": "Decisive Triage Under SLA Pressure",
          "scenario": "An alert must be triaged within 15 minutes. The analyst finds an encoded script but cannot decode all 4,000 characters immediately.",
          "analystMindset": "Triage does not require full reverse-engineering; it requires proving or disproving malicious intent. WINWORD spawning PowerShell downloading external binaries is 100% True Positive.",
          "bestPractices": [
            "Isolate the host immediately via EDR when execution of an unknown dropper is confirmed.",
            "Export process execution command lines directly into the incident ticket.",
            "Collect RAM and triage packages before rebooting the compromised asset."
          ]
        },
        "knowledgeCheck": {
          "triageScenario": {
            "id": "ts-triage-lab",
            "alertName": "Alert ALT-2026-04: Multiple Failed Logins Followed by Success",
            "severity": "HIGH",
            "scenarioText": "User Finance01 on host FIN-PC-04 recorded 8 consecutive failed logon attempts (Event 4625) within 45 seconds, immediately followed by 1 successful logon (Event 4624) from external IP 198.51.100.25 (a known Tor exit node).",
            "evidenceItems": [
              {
                "label": "Target User & Host",
                "value": "Finance01 @ FIN-PC-04",
                "insight": "Corporate finance payroll workstation"
              },
              {
                "label": "Logon Sequence",
                "value": "8x Event 4625 (Bad Password) -> 1x Event 4624",
                "insight": "Credential guessing / password spray pattern"
              },
              {
                "label": "Source IP Intel",
                "value": "198.51.100.25 (Tor Exit Node)",
                "insight": "Anonymized external address, non-corporate VPN"
              }
            ],
            "correctVerdict": "TRUE_POSITIVE",
            "rationale": "Rapid consecutive logon failures followed by immediate logon success from an external anonymizing Tor exit node confirms unauthorized credential compromise.",
            "analystAction": "Revoke active session tokens for Finance01, isolate workstation FIN-PC-04 via EDR, and escalate case to Tier 2 Incident Response."
          }
        }
      }
    ],
    "assessment": {
      "id": "unit-3-assessment",
      "title": "Topic 3 Assessment: Alert Triage Methodology",
      "passingScore": 75,
      "xpReward": 100,
      "questions": [
        {
          "id": "u3-q1",
          "question": "What is the very first step an analyst should perform when opening a newly assigned alert?",
          "options": [
            "Immediately isolate the domain controller",
            "Read and understand the alert rule logic, trigger signature, and intended threat category",
            "Delete the alert from the queue to keep SLA low",
            "Call the user on the phone"
          ],
          "correctAnswer": 1,
          "explanation": "Before investigating entities, you must understand what specific detection rule fired and why it was created."
        },
        {
          "id": "u3-q2",
          "question": "In process lineage analysis, which of the following parent-child relationships is most indicative of malicious activity?",
          "options": [
            "explorer.exe spawning chrome.exe",
            "services.exe spawning svchost.exe",
            "WINWORD.EXE spawning powershell.exe with -enc arguments",
            "system spawning smss.exe"
          ],
          "correctAnswer": 2,
          "explanation": "Microsoft Office applications (Word, Excel) spawning command interpreters (cmd.exe, powershell.exe) is a classic macro attack pattern."
        },
        {
          "id": "u3-q3",
          "question": "When checking external IP reputation during entity extraction, what does a high Abuse Confidence Score (90%+) on AbuseIPDB signify?",
          "options": [
            "The IP belongs to a trusted government agency",
            "Multiple independent organizations have recently reported malicious activity (brute force, C2, scanning) originating from that IP",
            "The IP address is definitely offline",
            "The alert should be closed as false positive"
          ],
          "correctAnswer": 1,
          "explanation": "High abuse scores reflect verified recent malicious activity reported across global networks."
        },
        {
          "id": "u3-q4",
          "question": "Why should an analyst NOT reboot an endpoint immediately upon confirming a true positive malware infection?",
          "options": [
            "Rebooting deletes all logs permanently from the SIEM",
            "Volatile evidence stored in RAM (decrypted malware keys, active C2 sockets, injected code) will be permanently lost",
            "Rebooting upgrades Windows automatically",
            "Analysts are not allowed to reboot computers"
          ],
          "correctAnswer": 1,
          "explanation": "Rebooting destroys RAM and volatile memory. The analyst should isolate the host via EDR network containment while keeping power on for forensic memory capture."
        }
      ]
    }
  },
  {
    "id": "unit-4",
    "unitNumber": 4,
    "title": "Unit 4: False Positives",
    "description": "Learn to accurately differentiate malicious intrusions from expected administrative activity, benign software behavior, and SIEM detection errors.",
    "estimatedHours": 2,
    "topics": [
      {
        "id": "topic-4-1",
        "unitId": "unit-4",
        "title": "Topic 1: Expected Activity & Benign Behavior",
        "order": 1,
        "estimatedMinutes": 20,
        "xpReward": 50,
        "theory": {
          "summaryLines": [
            "A False Positive (FP) occurs when a security rule triggers on activity that is completely legitimate, authorized, or benign.",
            "Expected Activity includes scheduled IT tasks: vulnerability scanners (Nessus/Qualys), backup software (Veeam), software deployment (SCCM/Intune), and approved penetration tests.",
            "Benign Activity includes legitimate administrative tools (Living off the Land) such as IT admins using PsExec, PowerShell, or certutil to update certificates.",
            "A True Positive (TP) is confirmed malicious or unauthorized activity matching attacker tactics.",
            "A Benign True Positive (BTP) is authorized activity that technically matches rule logic (e.g. an approved IT script using whoami.exe for hardware inventory)."
          ],
          "knowMore": {
            "title": "NIST: Minimizing False Positive Rates in Intrusion Detection",
            "description": "Learn scientific approaches for measuring False Positive Rates (FPR), tuning detection filters, and maintaining high precision in SOC alerting.",
            "externalUrl": "https://csrc.nist.gov/glossary/term/false_positive",
            "externalLabel": "NIST False Positive Guide"
          }
        },
        "demo": {
                  "title": "[Demo] Same Alert, Different Story",
                  "subtitle": "See how identical alerts take on completely different meanings when evaluated with organizational context",
                  "steps": [
                            {
                                      "id": 1,
                                      "stage": "1. Identical Triggers",
                                      "iconName": "siem",
                                      "title": "Two Alerts with Identical Names",
                                      "description": "Both scenarios trigger the exact same SIEM alert: 'Multiple Failed Login Attempts' (Threshold > 3 failures).",
                                      "telemetrySnippet": "ALERT A: Multiple Failed Logins | ALERT B: Multiple Failed Logins | Identical Rule Trigger",
                                      "highlightText": "Alert names alone do not convey risk; context determines the true meaning."
                            },
                            {
                                      "id": 2,
                                      "stage": "2. Scenario A Context",
                                      "iconName": "endpoint",
                                      "title": "Scenario A: User Forgot Password",
                                      "description": "Source is FIN-PC-04 at 09:05 AM on Monday. User called helpdesk regarding an expired password.",
                                      "telemetrySnippet": "SCENARIO A: Known User (Finance01) | Known Host (FIN-PC-04) | Business Hours | Internal LAN",
                                      "highlightText": "Scenario A has low risk: expected user, known device, normal business hours."
                            },
                            {
                                      "id": 3,
                                      "stage": "3. Scenario B Context",
                                      "iconName": "attacker",
                                      "title": "Scenario B: External Credential Attack",
                                      "description": "Source is an unallocated external IP (198.51.100.42) at 03:15 AM attempting 25 different employee accounts.",
                                      "telemetrySnippet": "SCENARIO B: Unknown Source IP | Multiple Target Users | 03:15 AM Weekend | Non-Standard Subnet",
                                      "highlightText": "Scenario B represents an active credential spray attack targeting the perimeter."
                            },
                            {
                                      "id": 4,
                                      "stage": "4. Comparative Evaluation",
                                      "iconName": "server",
                                      "title": "Side-by-Side Context Comparison",
                                      "description": "Scenario A: Internal LAN, single user, followed by success. Scenario B: External WAN, multi-user spray, no success.",
                                      "telemetrySnippet": "EVALUATION: Scenario A = Benign User Error | Scenario B = Active Adversary Spray",
                                      "highlightText": "Evaluating who, where, and when instantly differentiates harmless noise from real attacks."
                            },
                            {
                                      "id": 5,
                                      "stage": "5. Assessment Conclusion",
                                      "iconName": "analyst",
                                      "title": "Different Assessment for Identical Alerts",
                                      "description": "Same Alert + Different Context = Different Assessment. Scenario A is closed; Scenario B triggers immediate IP block.",
                                      "telemetrySnippet": "DISPOSITION: Alert A -> Close (False Positive) | Alert B -> Escalate & Contain (True Positive)",
                                      "highlightText": "Contextual reasoning is the core skill that defines an effective SOC analyst."
                            }
                  ]
        },
        "interactive": {
                  "title": "[Interactive] Context Changes the Story",
                  "scenario": "Sort each context factor into whether it indicates Expected/Benign activity or Suspicious/Malicious activity.",
                  "cards": [
                            {
                                      "id": "ctx-1",
                                      "category": "User",
                                      "label": "Logon from assigned desk PC during business hours",
                                      "summary": "Finance01 logging into FIN-PC-04 at 09:00 AM on a Tuesday.",
                                      "detailedFindings": "Classification: EXPECTED / BENIGN. Standard user routine matching established behavioral baseline.",
                                      "severityIndicator": "Normal"
                            },
                            {
                                      "id": "ctx-2",
                                      "category": "Source IP",
                                      "label": "Scheduled vulnerability scan from IT subnet",
                                      "summary": "Vulnerability scanner IP running authenticated checks during approved maintenance window.",
                                      "detailedFindings": "Classification: EXPECTED / BENIGN. Authorized security testing documented in IT change calendar.",
                                      "severityIndicator": "Normal"
                            },
                            {
                                      "id": "ctx-3",
                                      "category": "Event ID",
                                      "label": "External IP attempting 30 employee accounts",
                                      "summary": "Single public IP sending repeated authentication requests across diverse usernames.",
                                      "detailedFindings": "Classification: SUSPICIOUS. Classic horizontal password spray attempting to compromise accounts.",
                                      "severityIndicator": "Malicious"
                            },
                            {
                                      "id": "ctx-4",
                                      "category": "Timeline",
                                      "label": "High-volume login attempts at 03:00 AM on Sunday",
                                      "summary": "Authentication requests surging during non-business hours from unfamiliar network origin.",
                                      "detailedFindings": "Classification: SUSPICIOUS. Temporal anomaly indicating potential automated adversary probing.",
                                      "severityIndicator": "Suspicious"
                            }
                  ]
        },
        "socContext": {
          "title": "The Danger of Careless False Positive Closures",
          "scenario": "An attacker noticed that the SOC always ignores alerts on \"svc_scanner\", so they named their malware \"svc_scanner.exe\" to avoid detection.",
          "analystMindset": "Never judge an alert solely by the process name or username. Verify the full path, parent process, hash, and destination network.",
          "bestPractices": [
            "Always link an authorized Change Request (CHG#) or Jira ticket when closing as expected activity.",
            "Verify that the process hash matches the authentic vendor binary, not an imposter.",
            "Confirm that source and destination IP addresses match documented infrastructure zones."
          ]
        },
        "knowledgeCheck": {
          "matching": {
            "title": "Classify True vs False Positive Scenarios",
            "instructions": "Match each scenario to its correct classification.",
            "pairs": [
              {
                "id": "fp1",
                "left": "Vulnerability scanner runs scheduled port sweep matching approved change ticket",
                "right": "False Positive: Expected System Activity (Authorized scanner run)"
              },
              {
                "id": "fp2",
                "left": "Word doc spawns powershell downloading executable from unknown IP",
                "right": "True Positive: Malicious Execution (Initial macro dropper)"
              },
              {
                "id": "fp3",
                "left": "HR user attempts 3 incorrect passwords after returning from vacation",
                "right": "False Positive: Benign User Error (Routine credential mistake)"
              },
              {
                "id": "fp4",
                "left": "Ransomware deletes volume shadow copies via vssadmin",
                "right": "True Positive: Destructive Attack (Inhibiting system recovery)"
              }
            ],
            "explanation": "Authorized tasks and benign mistakes are False Positives; unauthorized macro execution and ransomware destruction are True Positives."
          }
        }
      },
      {
        "id": "topic-4-2",
        "unitId": "unit-4",
        "title": "Topic 2: Detection Errors & [Lab] 🔵 False-Positive Identification",
        "order": 2,
        "estimatedMinutes": 25,
        "xpReward": 75,
        "theory": {
          "summaryLines": [
            "Detection Errors occur when a correlation rule is poorly constructed, contains flawed regular expressions, or uses overly broad logic.",
            "Example of a Flawed Rule: Triggering on any command containing the word \"admin\" will generate hundreds of false alerts from administrative URLs and filenames.",
            "Example of a Flawed Threshold: Firing an alert on >3 failed logins in an hour triggers on every human employee who typos their credentials.",
            "The SIEM Tuning Loop: Tier 1 analysts must report flawed rules to Tier 3 detection engineers with concrete recommendations for rule refinement.",
            "Good rule refinement adds precise exclusions (e.g. filter by known Parent PID, specific signer certificates, or dedicated management subnets)."
          ],
          "knowMore": {
            "title": "Sigma HQ: Best Practices for Writing Robust Detection Rules",
            "description": "Read the official Sigma rule documentation on constructing precise condition logic that minimizes detection noise.",
            "externalUrl": "https://github.com/SigmaHQ/sigma",
            "externalLabel": "Sigma Rule Guidelines"
          }
        },
        "demo": {
                  "title": "[Demo] When the Detection Gets It Wrong",
                  "subtitle": "Observe how rigid detection rules generate alert noise and how contextual tuning restores signal clarity",
                  "steps": [
                            {
                                      "id": 1,
                                      "stage": "1. Naive Detection Rule",
                                      "iconName": "siem",
                                      "title": "Rigid Threshold Rule Configured",
                                      "description": "SIEM rule is created: 'If Failed Logins > 3, Trigger Alert'. Rule has no contextual exceptions or whitelists.",
                                      "telemetrySnippet": "RULE DEFINITION: index=auth action=failure | stats count by user | where count > 3",
                                      "highlightText": "Overly simplistic detection logic triggers on normal human mistakes as well as attacks."
                            },
                            {
                                      "id": 2,
                                      "stage": "2. Monday Morning Avalanche",
                                      "iconName": "endpoint",
                                      "title": "50 Employees Mistype Passwords",
                                      "description": "Employees returning from the weekend mistype passwords; 50 alerts instantly flood the SOC queue.",
                                      "telemetrySnippet": "QUEUE FLOOD: 50 New Alerts | Rule: Failed Logins > 3 | All internal finance/sales users",
                                      "highlightText": "High false-positive rates drown analysts in noise and cause severe alert fatigue."
                            },
                            {
                                      "id": 3,
                                      "stage": "3. Alert Fatigue & Blindspots",
                                      "iconName": "attacker",
                                      "title": "Real Attacks Buried in Noise",
                                      "description": "While analysts spend hours closing benign typo alerts, an actual password spray slips past undetected.",
                                      "telemetrySnippet": "CONSEQUENCE: Analyst time consumed | True threat delayed in backlog",
                                      "highlightText": "Alert noise is dangerous because it masks genuine threats waiting in the queue."
                            },
                            {
                                      "id": 4,
                                      "stage": "4. Adding Context to Detection",
                                      "iconName": "server",
                                      "title": "Tuning Rule with Smarter Filters",
                                      "description": "Engineers tune the rule: require failures across multiple user accounts OR from non-whitelisted external IPs.",
                                      "telemetrySnippet": "TUNED RULE: where user_count > 5 OR src_ip NOT IN (corporate_subnets)",
                                      "highlightText": "Adding contextual filters eliminates benign user errors without lowering security posture."
                            },
                            {
                                      "id": 5,
                                      "stage": "5. Clean Signal Restored",
                                      "iconName": "analyst",
                                      "title": "False Positives Drop 90%",
                                      "description": "Routine user typos no longer alert, while true multi-account adversary sprays remain reliably caught.",
                                      "telemetrySnippet": "OUTCOME: Queue volume normalized | False positives: -90% | Real attacks: 100% caught",
                                      "highlightText": "Effective detection engineering balances sensitivity to attacks with tolerance for normal operations."
                            }
                  ]
        },
        "interactive": {
                  "title": "[Interactive] Find the False Positive",
                  "scenario": "Analyze each realistic alert scenario and determine whether it represents a False Positive (Benign/Expected) or a True Positive (Suspicious).",
                  "cards": [
                            {
                                      "id": "fp-1",
                                      "category": "User",
                                      "label": "Employee forgot password after vacation",
                                      "summary": "Finance clerk enters wrong password 4 times, then calls helpdesk and logs in successfully.",
                                      "detailedFindings": "Verdict: FALSE POSITIVE (Benign User Error). Expected human behavior; no adversary involvement.",
                                      "severityIndicator": "Normal"
                            },
                            {
                                      "id": "fp-2",
                                      "category": "Source IP",
                                      "label": "Scheduled vulnerability scan on servers",
                                      "summary": "Approved scanner tests administrative credentials during scheduled Sunday maintenance window.",
                                      "detailedFindings": "Verdict: FALSE POSITIVE (Expected Activity). Authorized security audit documented in advance.",
                                      "severityIndicator": "Normal"
                            },
                            {
                                      "id": "fp-3",
                                      "category": "Event ID",
                                      "label": "Unknown source attacking 40 accounts",
                                      "summary": "Foreign public IP attempts dictionary passwords against 40 separate executive usernames in 2 minutes.",
                                      "detailedFindings": "Verdict: TRUE POSITIVE (Malicious Credential Spray). Active adversary reconnaissance requiring immediate response.",
                                      "severityIndicator": "Malicious"
                            },
                            {
                                      "id": "fp-4",
                                      "category": "Timeline",
                                      "label": "SysAdmin syncs domain controller service",
                                      "summary": "Lead administrator runs scheduled PowerShell script to synchronize service accounts across forest.",
                                      "detailedFindings": "Verdict: FALSE POSITIVE (Authorized Admin Activity). Routine infrastructure operations.",
                                      "severityIndicator": "Normal"
                            }
                  ]
        },
        "socContext": {
          "title": "Closing the Feedback Loop with Detection Engineering",
          "scenario": "An alert for \"Certutil Download\" triggers 40 times a week on the same software update script.",
          "analystMindset": "Do not just close false positives—fix them. Submit tuning tickets specifying the exact parent path and hash exclusions needed.",
          "bestPractices": [
            "Include the alert ID and raw log payload in all SIEM tuning requests.",
            "Never request a blanket exclusion of an entire binary (e.g. do not exclude all powershell.exe).",
            "Always test rule modifications in staging before deploying to the production alert queue."
          ]
        },
        "knowledgeCheck": {
          "triageScenario": {
            "id": "ts-fp-lab",
            "alertName": "Alert ALT-309: High-Volume Network Port Scan",
            "severity": "MEDIUM",
            "scenarioText": "SIEM detected 5,000 port connections from 10.0.99.10 across internal subnets. The asset database confirms 10.0.99.10 is the enterprise Tenable Nessus scanner running its scheduled Thursday audit.",
            "evidenceItems": [
              {
                "label": "Source Host",
                "value": "10.0.99.10 (Nessus Scanner)",
                "insight": "Authorized vulnerability scanner"
              },
              {
                "label": "Destination",
                "value": "10.0.4.0/24 (Internal LAN)",
                "insight": "Scheduled weekly audit"
              },
              {
                "label": "Change Ticket",
                "value": "CHG-9901 (Approved)",
                "insight": "Authorized maintenance window"
              }
            ],
            "correctVerdict": "FALSE_POSITIVE",
            "rationale": "The scan activity originates from an authorized vulnerability scanner during an approved maintenance window, constituting expected administrative activity.",
            "analystAction": "Document change ticket CHG-9901 in the ticket, close alert as False Positive (Expected Activity), and verify exclusion tuning."
          }
        }
      }
    ],
    "assessment": {
      "id": "unit-4-assessment",
      "title": "Topic 4 Assessment: False Positive Analysis",
      "passingScore": 75,
      "xpReward": 100,
      "questions": [
        {
          "id": "u4-q1",
          "question": "What defines a security False Positive in a SOC environment?",
          "options": [
            "An alert that accurately detected a real hacker",
            "An alert triggered on activity that is legitimate, authorized, or benign",
            "A malware attack that succeeded without detection",
            "An alert that was sent to the wrong analyst"
          ],
          "correctAnswer": 1,
          "explanation": "A false positive is an alert that fired on normal, approved, or non-malicious activity."
        },
        {
          "id": "u4-q2",
          "question": "Which of the following is the most reliable method to verify if suspicious admin activity is authorized Expected Activity?",
          "options": [
            "Asking the employee on Slack if they did it",
            "Checking the enterprise Change Management system (e.g. ServiceNow CHG tickets) for an approved maintenance window",
            "Assuming anything done by an IT admin is always safe",
            "Waiting 24 hours to see if anything breaks"
          ],
          "correctAnswer": 1,
          "explanation": "Authorized IT maintenance and deployments are documented in approved Change Management tickets."
        },
        {
          "id": "u4-q3",
          "question": "What is the primary operational danger of having an excessively high False Positive Rate in the SOC?",
          "options": [
            "The SIEM database runs out of disk space",
            "Analyst alert fatigue leads to genuine attacks being overlooked or hastily closed",
            "Antivirus licenses expire faster",
            "Network bandwidth slows down by 50%"
          ],
          "correctAnswer": 1,
          "explanation": "Alert fatigue causes exhausted analysts to overlook subtle indicators of genuine compromise."
        },
        {
          "id": "u4-q4",
          "question": "When submitting a tuning request to Detection Engineering for a noisy rule, what information must the Tier 1 analyst provide?",
          "options": [
            "Just say \"the rule is bad\"",
            "The Alert ID, raw log payload, why it is benign, and specific narrow exclusion criteria (e.g. parent process, path, hash)",
            "A request to delete the entire SIEM rule completely",
            "The user password"
          ],
          "correctAnswer": 1,
          "explanation": "Specific evidence and narrow exclusion recommendations allow engineers to tune out noise without creating blind spots."
        }
      ]
    }
  },
  {
    "id": "unit-5",
    "unitNumber": 5,
    "title": "Unit 5: Severity",
    "description": "Master incident severity classification (Low, Medium, High, Critical) using asset impact, attacker progress, evidence confidence, and SLA timers.",
    "estimatedHours": 2,
    "topics": [
      {
        "id": "topic-5-1",
        "unitId": "unit-5",
        "title": "Topic 1: Severity Scale: Low, Medium, High & Critical",
        "order": 1,
        "estimatedMinutes": 20,
        "xpReward": 50,
        "theory": {
          "summaryLines": [
            "Severity ratings dictate the urgency, response speed, resource allocation, and escalation thresholds for an alert.",
            "Critical (P1): Active widespread ransomware, domain controller compromise, or data exfiltration. SLA: 15-minute response, 24/7 immediate callout.",
            "High (P2): Single-host malware execution, compromised privileged account, or active C2 beaconing. SLA: 1-hour response.",
            "Medium (P3): Isolated suspicious activity, unauthorized software installation, or multiple failed logins on non-critical assets. SLA: 4-hour response.",
            "Low (P4): Minor policy violations, single port scans, adware detections, or low-probability anomalies. SLA: 24-hour response.",
            "Service Level Agreements (SLAs) measure Mean Time to Detect (MTTD) and Mean Time to Respond (MTTR)."
          ],
          "knowMore": {
            "title": "FIRST Common Vulnerability Scoring System (CVSS) and Severity Metrics",
            "description": "Learn the international industry standard for assessing vulnerability severity and translating impact into operational SOC priority.",
            "externalUrl": "https://www.first.org/cvss/",
            "externalLabel": "FIRST CVSS Standards"
          }
        },
        "demo": {
                  "title": "[Demo] How Serious Is It? The Severity Continuum",
                  "subtitle": "Watch how the same alert type escalates in priority as scope, impact, and adversarial progression increase",
                  "steps": [
                            {
                                      "id": 1,
                                      "stage": "1. Low Severity",
                                      "iconName": "endpoint",
                                      "title": "Isolated Anomaly on Standard Workstation",
                                      "description": "4 failed logins on workstation FIN-PC-04, known user, followed immediately by successful logon.",
                                      "telemetrySnippet": "SEVERITY: LOW | Scope: Single Standard PC | Impact: None | User: Finance01 | Resolved",
                                      "highlightText": "Low severity alerts involve minimal business impact and isolated, non-critical assets."
                            },
                            {
                                      "id": 2,
                                      "stage": "2. Medium Severity",
                                      "iconName": "server",
                                      "title": "Multiple Failures Across Sensitive Subnet",
                                      "description": "20 failed logins targeting a finance supervisor account originating from an unfamiliar internal subnet.",
                                      "telemetrySnippet": "SEVERITY: MEDIUM | Scope: Elevated Account | Subnet: Unknown Internal | SLA: 30 Mins",
                                      "highlightText": "Medium severity indicates potential internal scanning or probing against sensitive personnel."
                            },
                            {
                                      "id": 3,
                                      "stage": "3. High Severity",
                                      "iconName": "siem",
                                      "title": "Password Spray Against Domain Admins",
                                      "description": "External adversary testing leaked passwords against all Domain Administrator and executive accounts.",
                                      "telemetrySnippet": "SEVERITY: HIGH | Scope: Domain Admins Targeted | Source: External WAN | SLA: 15 Mins",
                                      "highlightText": "High severity reflects active adversary campaigns threatening privileged credentials or core systems."
                            },
                            {
                                      "id": 4,
                                      "stage": "4. Critical Severity",
                                      "iconName": "attacker",
                                      "title": "Breach on Primary Domain Controller",
                                      "description": "Failed logins on Domain Controller followed by successful authentication, privilege escalation, and data staging.",
                                      "telemetrySnippet": "SEVERITY: CRITICAL | Scope: Primary DC Compromised | Active Lateral Movement | All Hands",
                                      "highlightText": "Critical severity requires immediate all-hands containment: the core business is under active threat."
                            },
                            {
                                      "id": 5,
                                      "stage": "5. Analyst Prioritization",
                                      "iconName": "analyst",
                                      "title": "Prioritize by Impact, Not Just Volume",
                                      "description": "L1 analysts triage queue items based on asset criticality and attacker progress, not just alert arrival time.",
                                      "telemetrySnippet": "QUEUE MANAGEMENT: Critical DC Alert jumped to #1 Priority | Low alerts held in queue",
                                      "highlightText": "Effective severity classification ensures critical incidents receive instant containment."
                            }
                  ]
        },
        "interactive": {
                  "title": "[Interactive] Set the Priority",
                  "scenario": "Evaluate each incident situation and assign it to the appropriate severity level: Low, Medium, or High.",
                  "cards": [
                            {
                                      "id": "sev-low",
                                      "category": "User",
                                      "label": "Employee mistypes password on laptop",
                                      "summary": "User mistypes password 5 times before successfully logging in; source is local corporate office.",
                                      "detailedFindings": "Priority: LOW. Minor user friction with zero indicator of adversary involvement.",
                                      "severityIndicator": "Normal"
                            },
                            {
                                      "id": "sev-med",
                                      "category": "Source IP",
                                      "label": "Unfamiliar IP port scanning internal file server",
                                      "summary": "Internal host scans ports 445 and 3389 across the finance file server; no connections completed.",
                                      "detailedFindings": "Priority: MEDIUM. Suspicious internal reconnaissance requiring host investigation.",
                                      "severityIndicator": "Suspicious"
                            },
                            {
                                      "id": "sev-high",
                                      "category": "Event ID",
                                      "label": "Compromised Domain Admin accessing executive share",
                                      "summary": "Domain administrator account accessing confidential executive M&A folders at 02:00 AM from a VPN IP.",
                                      "detailedFindings": "Priority: HIGH. High-privilege identity anomaly with immediate enterprise risk.",
                                      "severityIndicator": "Malicious"
                            }
                  ]
        },
        "socContext": {
          "title": "Managing SLA Breach Risks",
          "scenario": "A Critical alert fires at 02:00 AM. The on-duty Tier 1 analyst leaves it in queue because their shift ends in 30 minutes.",
          "analystMindset": "A Critical SLA timer never stops. A P1 breach must be acknowledged and contained immediately, regardless of shift changes.",
          "bestPractices": [
            "Acknowledge P1/Critical alerts within 5 minutes to stop the SLA clock.",
            "Never downgrade an alert severity simply to avoid an SLA breach penalty.",
            "Conduct a formal handoff meeting for any open High or Critical alerts at shift handover."
          ]
        },
        "knowledgeCheck": {
          "matching": {
            "title": "Match Severity Levels to Target Response SLAs",
            "instructions": "Match each severity level with its typical enterprise SOC response timeframe.",
            "pairs": [
              {
                "id": "sv1",
                "left": "Critical (P1)",
                "right": "15 Minutes (Immediate 24/7 callout & containment)"
              },
              {
                "id": "sv2",
                "left": "High (P2)",
                "right": "1 Hour (Active single-system compromise response)"
              },
              {
                "id": "sv3",
                "left": "Medium (P3)",
                "right": "4 Hours (Isolated suspicious activity investigation)"
              },
              {
                "id": "sv4",
                "left": "Low (P4)",
                "right": "24 Hours (Low risk policy violations and hygiene)"
              }
            ],
            "explanation": "Critical alerts require immediate 15-minute response; Low alerts allow 24-hour business day triage."
          }
        }
      },
      {
        "id": "topic-5-2",
        "unitId": "unit-5",
        "title": "Topic 2: Impact, Confidence & [Lab] 🔵 Severity Classification",
        "order": 2,
        "estimatedMinutes": 25,
        "xpReward": 75,
        "theory": {
          "summaryLines": [
            "Severity is not arbitrary; it is calculated using the formula: Severity = Impact × Confidence.",
            "Impact measures the potential harm to the business: Asset Criticality (Crown Jewels vs guest VM) + Attacker Objective (Reconnaissance vs Destruction).",
            "Confidence measures the fidelity of the telemetry: Single heuristic anomaly (Low Confidence) vs Multiple corroborating EDR + Firewall IOCs (High Confidence).",
            "A High Impact alert with Low Confidence requires urgent verification before shutting down production systems.",
            "A High Impact alert with High Confidence requires immediate emergency containment."
          ],
          "knowMore": {
            "title": "MITRE ATT&CK: Assessing Adversary Objectives and Impact",
            "description": "Learn how to map threat actor tactics (Impact TA0040) to enterprise risk calculations.",
            "externalUrl": "https://attack.mitre.org/tactics/TA0040/",
            "externalLabel": "MITRE ATT&CK Impact"
          }
        },
        "demo": {
                  "title": "[Demo] Context Before Classification: Impact & Confidence",
                  "subtitle": "See how asset value and evidence reliability shape triage priority without rigid mathematical formulas",
                  "steps": [
                            {
                                      "id": 1,
                                      "stage": "1. Evaluating Asset Impact",
                                      "iconName": "endpoint",
                                      "title": "Asset Value Sets Potential Risk",
                                      "description": "A suspicious script on a guest Wi-Fi kiosk has minor business impact. The same script on the Core Banking Server is catastrophic.",
                                      "telemetrySnippet": "IMPACT EVALUATION: Guest Kiosk = Minimal Impact | Core Banking SWIFT Server = Catastrophic Impact",
                                      "highlightText": "Asset criticality defines what the organization stands to lose if the asset is compromised."
                            },
                            {
                                      "id": 2,
                                      "stage": "2. Evaluating Evidence Confidence",
                                      "iconName": "server",
                                      "title": "Evidence Reliability Sets Certainty",
                                      "description": "An unverified anomaly score provides low confidence. Confirmed threat intel plus malicious process execution provides high confidence.",
                                      "telemetrySnippet": "CONFIDENCE: Heuristic Score (Low) vs. Known Malware Hash + Active C2 Connection (High)",
                                      "highlightText": "Confidence measures how strongly the available technical artifacts prove malicious intent."
                            },
                            {
                                      "id": 3,
                                      "stage": "3. Combining the Two Dimensions",
                                      "iconName": "siem",
                                      "title": "Balancing Impact Against Confidence",
                                      "description": "High Impact + High Confidence = Immediate Incident Declaration. Low Impact + Low Confidence = Standard Queue Triage.",
                                      "telemetrySnippet": "MATRIX: High Impact & High Confidence -> P1 Emergency | Low & Low -> Routine Review",
                                      "highlightText": "Analyst triage weighs potential business harm alongside technical evidence certainty."
                            },
                            {
                                      "id": 4,
                                      "stage": "4. The Real-World Asymmetry",
                                      "iconName": "attacker",
                                      "title": "Why High Impact Always Escalates",
                                      "description": "Even low-confidence alerts must be prioritized if they target Tier-0 crown jewels like Active Directory or payment gateways.",
                                      "telemetrySnippet": "OPERATIONAL REALITY: Domain Controller alert must be checked immediately, even if confidence is low.",
                                      "highlightText": "When critical assets are threatened, the cost of a false negative far outweighs false positive triage time."
                            },
                            {
                                      "id": 5,
                                      "stage": "5. Professional Classification",
                                      "iconName": "analyst",
                                      "title": "Context-Driven Decision Making",
                                      "description": "L1 analysts classify incidents based on realistic business context rather than mathematical formulas.",
                                      "telemetrySnippet": "CLASSIFICATION: Priority 1 (High Impact Crown Jewel) | Escalation Dispatched to L2 Response",
                                      "highlightText": "Professional severity classification requires understanding the business, not just the logs."
                            }
                  ]
        },
        "interactive": {
                  "title": "[Interactive] What Changes Your Assessment?",
                  "scenario": "Add context factors to the investigation workbench and observe how they increase or decrease the incident triage priority.",
                  "cards": [
                            {
                                      "id": "fac-crown",
                                      "category": "User",
                                      "label": "Target Asset: Core SWIFT Banking Server",
                                      "summary": "Asset handles live wire transactions and customer payment processing.",
                                      "detailedFindings": "Effect: MAJOR PRIORITY BOOST. Threat to mission-critical asset elevates any alert to immediate high priority.",
                                      "severityIndicator": "Malicious"
                            },
                            {
                                      "id": "fac-kiosk",
                                      "category": "Source IP",
                                      "label": "Target Asset: Isolated Guest Wi-Fi Kiosk",
                                      "summary": "Non-domain device segmented on an isolated guest Internet VLAN.",
                                      "detailedFindings": "Effect: PRIORITY DECREASE. Compromise cannot access internal corporate network or sensitive data.",
                                      "severityIndicator": "Normal"
                            },
                            {
                                      "id": "fac-hash",
                                      "category": "Event ID",
                                      "label": "Evidence: Confirmed Malware Hash",
                                      "summary": "File SHA256 matches verified threat intelligence signature from CISA advisory.",
                                      "detailedFindings": "Effect: HIGH CONFIDENCE BOOST. Eliminates ambiguity and proves malicious intent.",
                                      "severityIndicator": "Malicious"
                            },
                            {
                                      "id": "fac-heur",
                                      "category": "Timeline",
                                      "label": "Evidence: Single Ambiguous Heuristic Score",
                                      "summary": "Statistical model flagged unusual traffic volume with no supporting process anomalies.",
                                      "detailedFindings": "Effect: VERIFICATION NEEDED. Requires analyst investigation to confirm if activity is benign.",
                                      "severityIndicator": "Suspicious"
                            }
                  ]
        },
        "socContext": {
          "title": "Avoiding Under-Categorization of Low-Noise Threats",
          "scenario": "An attacker executes slow, stealthy reconnaissance (1 command every 6 hours) on a database server. Analyst flags it as Low because volume is small.",
          "analystMindset": "Volume does not equal severity. Sophisticated nation-state actors generate very few alerts. Evaluate the asset value and actor intent.",
          "bestPractices": [
            "Classify any confirmed hands-on-keyboard activity on a server as High or Critical.",
            "Factor in regulatory impact (GDPR, HIPAA, PCI-DSS) when assessing data breach severity.",
            "Document the rationale behind severity upgrades or downgrades in the ticket log."
          ]
        },
        "knowledgeCheck": {
          "triageScenario": {
            "id": "ts-sev-lab",
            "alertName": "Alert ALT-502: Credential Compromise on Sensitive Payroll Workstation",
            "severity": "HIGH",
            "scenarioText": "User Finance01 on workstation FIN-PC-04 (FinCorp Payroll Department) suffered 8 brute force login failures followed by a successful interactive logon from an unauthorized Tor exit node at 02:40 AM outside business hours.",
            "evidenceItems": [
              {
                "label": "Target Host Asset Value",
                "value": "FIN-PC-04 (Tier 2 Sensitive Payroll Asset)",
                "insight": "High Impact: Holds unencrypted corporate payroll and employee banking records"
              },
              {
                "label": "Threat Behavior",
                "value": "Brute-force credential cracking followed by interactive logon",
                "insight": "High Confidence: Direct adversary session confirmed"
              },
              {
                "label": "Temporal Anomaly",
                "value": "02:40 AM Local Time (Off-Hours)",
                "insight": "Deviates from Finance01 normal working hours (9 AM - 5 PM)"
              }
            ],
            "correctVerdict": "TRUE_POSITIVE",
            "rationale": "High impact on a sensitive payroll workstation combined with high confidence from confirmed unauthorized off-hours access mandates classification as a High Severity (P2) incident under the 1-hour SLA.",
            "analystAction": "Escalate ticket to Tier 2 with P2 High classification, trigger EDR network isolation on FIN-PC-04, and initiate credential revocation for Finance01."
          }
        }
      }
    ],
    "assessment": {
      "id": "unit-5-assessment",
      "title": "Topic 5 Assessment: Severity Classification",
      "passingScore": 75,
      "xpReward": 100,
      "questions": [
        {
          "id": "u5-q1",
          "question": "What are the two primary factors used to objectively determine incident severity?",
          "options": [
            "Day of the week and analyst mood",
            "Asset Impact (Business Criticality) and Evidence Confidence (Fidelity)",
            "Length of the alert name and number of characters",
            "Operating system brand and CPU speed"
          ],
          "correctAnswer": 1,
          "explanation": "Severity is calculated by multiplying the potential Business Impact of the asset by the Confidence level of the telemetry."
        },
        {
          "id": "u5-q2",
          "question": "Which of the following incidents qualifies as a Critical (P1) severity rating?",
          "options": [
            "A single failed password attempt on a guest Wi-Fi portal",
            "Active ransomware spreading across enterprise servers and domain controllers",
            "An employee visiting a sports news website during lunch",
            "A printer running low on toner"
          ],
          "correctAnswer": 1,
          "explanation": "Ransomware impacting multiple servers or core domain controllers threatens business survival and is a Critical (P1) emergency."
        },
        {
          "id": "u5-q3",
          "question": "In standard SOC operational metrics, what does \"MTTR\" stand for?",
          "options": [
            "Maximum Telemetry Tracking Record",
            "Mean Time to Respond (or Remediate)",
            "Main Threat Triage Routine",
            "Multi-Tier Threat Recovery"
          ],
          "correctAnswer": 1,
          "explanation": "MTTR stands for Mean Time to Respond (or Remediate), measuring how quickly the team neutralizes confirmed threats."
        },
        {
          "id": "u5-q4",
          "question": "If an alert fires on a Tier 0 Crown Jewel server, but the telemetry is heuristic with low confidence, what should the analyst do?",
          "options": [
            "Immediately wipe the server without checking",
            "Ignore it because confidence is low",
            "Triage with urgency: quickly verify corroborating telemetry before executing disruptive containment",
            "Wait 48 hours for more alerts to accumulate"
          ],
          "correctAnswer": 2,
          "explanation": "High impact demands urgent attention, but low confidence requires fast verification before taking disruptive actions on production systems."
        }
      ]
    }
  },
  {
    "id": "unit-6",
    "unitNumber": 6,
    "title": "Unit 6: Escalation",
    "description": "Execute seamless incident escalation: tier-to-tier handoffs (L1 → L2, L2 → L3), specialist team engagement, executive crisis communications, and warm transfers.",
    "estimatedHours": 2,
    "topics": [
      {
        "id": "topic-6-1",
        "unitId": "unit-6",
        "title": "Topic 1: Tiered Escalation: L1 → L2 and L2 → L3",
        "order": 1,
        "estimatedMinutes": 20,
        "xpReward": 50,
        "theory": {
          "summaryLines": [
            "Escalation is the formal transfer of an investigation from an analyst to higher-tier specialists when the scope exceeds playbook procedures.",
            "L1 → L2 Escalation: Tier 1 escalates when an alert is verified as a True Positive, requires host memory forensics, or needs complex lateral movement tracking.",
            "L2 → L3 Escalation: Tier 2 escalates to Tier 3 when custom malware reverse-engineering, kernel-level rootkit analysis, or threat hunting across enterprise logs is required.",
            "A cold handoff (simply reassigning the ticket without notes) creates confusion and delays response.",
            "A warm handoff requires direct communication: concise summary of findings, verified IOCs, actions taken, and recommended next steps."
          ],
          "knowMore": {
            "title": "CREST: Incident Response Maturity and Handover Procedures",
            "description": "Learn industry best practices for escalation workflows, analyst briefing protocols, and multi-tier incident handling.",
            "externalUrl": "https://www.crest-approved.org/",
            "externalLabel": "CREST IR Standards"
          }
        },
        "demo": {
                  "title": "[Demo] Passing the Investigation Forward",
                  "subtitle": "Watch an L1 analyst package findings, evidence, and timeline for a seamless escalation to Tier 2",
                  "steps": [
                            {
                                      "id": 1,
                                      "stage": "1. L1 Validates True Positive",
                                      "iconName": "analyst",
                                      "title": "Initial Triage Completed",
                                      "description": "L1 analyst validates that failed logins on FIN-PC-04 were followed by an unauthorized remote PowerShell shell.",
                                      "telemetrySnippet": "L1 TRIAGE COMPLETE: Validated True Positive | Host FIN-PC-04 | User Finance01 | Issue: Remote Shell",
                                      "highlightText": "Escalation begins only after L1 has qualified the alert and gathered the foundational facts."
                            },
                            {
                                      "id": 2,
                                      "stage": "2. Package Essential Artifacts",
                                      "iconName": "siem",
                                      "title": "User, Host, IP, and Timeline Assembled",
                                      "description": "L1 compiles affected User (Finance01), Host (FIN-PC-04), Source IP (10.10.20.15), and exact chronological event log.",
                                      "telemetrySnippet": "PACKAGE: User=Finance01 | Host=FIN-PC-04 | IP=10.10.20.15 | Timeline=10:31:40 - 10:33:10",
                                      "highlightText": "A complete escalation package gives Tier 2 all necessary context without duplicate triage."
                            },
                            {
                                      "id": 3,
                                      "stage": "3. Articulate Findings & Reason",
                                      "iconName": "server",
                                      "title": "Clear Escalation Justification",
                                      "description": "L1 writes: 'Interactive shell opened from unauthorized internal IP; requires deep memory forensics and host isolation.'",
                                      "telemetrySnippet": "REASON FOR ESCALATION: Potential lateral movement; L2 memory capture and network isolation required.",
                                      "highlightText": "Always state clearly WHY the incident is being escalated and what actions are recommended."
                            },
                            {
                                      "id": 4,
                                      "stage": "4. Tier 2 Warm Transfer",
                                      "iconName": "endpoint",
                                      "title": "Seamless Handoff to Incident Responder",
                                      "description": "Case is routed directly into the Tier 2 queue with all artifacts attached, triggering responder notification.",
                                      "telemetrySnippet": "TRANSFER: Case #2026-104 assigned to L2 On-Call | SLA: 15m Response | Handshake: Complete",
                                      "highlightText": "Warm handoffs ensure continuity so response actions begin immediately."
                            },
                            {
                                      "id": 5,
                                      "stage": "5. Tier 2 Takes Immediate Action",
                                      "iconName": "analyst",
                                      "title": "Containment Begins Without Delay",
                                      "description": "L2 opens the ticket, reviews L1's timeline, and immediately triggers EDR host isolation on FIN-PC-04.",
                                      "telemetrySnippet": "L2 ACTION: Workstation FIN-PC-04 isolated from network | Memory dump initiated",
                                      "highlightText": "Thorough L1 documentation enables instantaneous Tier 2 containment."
                            }
                  ]
        },
        "interactive": {
                  "title": "[Interactive] Who Needs This Next?",
                  "scenario": "Review the current investigation state for three scenarios and route each to L1 (Triage), L2 (Incident Response), or L3 (Threat Hunting).",
                  "cards": [
                            {
                                      "id": "esc-l1",
                                      "category": "User",
                                      "label": "New Unvalidated Alert on Marketing PC",
                                      "summary": "Raw SIEM alert for multiple failed logins on a marketing laptop; no investigation started.",
                                      "detailedFindings": "Route to: L1 ANALYST (Initial Triage). Needs entity extraction, timeline analysis, and initial qualification.",
                                      "severityIndicator": "Normal"
                            },
                            {
                                      "id": "esc-l2",
                                      "category": "Source IP",
                                      "label": "Validated Unauthorized PowerShell Shell",
                                      "summary": "L1 validated that a billing workstation spawned an unauthorized remote command shell.",
                                      "detailedFindings": "Route to: L2 ANALYST (Incident Response). Needs host containment, memory forensics, and eradication.",
                                      "severityIndicator": "Suspicious"
                            },
                            {
                                      "id": "esc-l3",
                                      "category": "Event ID",
                                      "label": "Suspected Zero-Day Undocumented Binary",
                                      "summary": "Stealth malware binary discovered with no antivirus signatures and custom encryption routine.",
                                      "detailedFindings": "Route to: L3 ANALYST (Threat Hunting / Malware Analysis). Needs reverse engineering and fleet-wide hunting.",
                                      "severityIndicator": "Malicious"
                            }
                  ]
        },
        "socContext": {
          "title": "Avoiding the \"Dump and Run\" Antipattern",
          "scenario": "An L1 analyst receives a confusing alert, writes \"looks weird please check\", and reassigns it to L2 without isolating the host or listing IOCs.",
          "analystMindset": "Your name is on the ticket. Escalating without clear findings forces Tier 2 to start from scratch and wastes critical golden-hour response time.",
          "bestPractices": [
            "Always execute immediate containment (e.g. host isolation) before handing off if active malware is confirmed.",
            "Include exact timestamps, process IDs, and hashes in the handover notes.",
            "Remain available for 10 minutes after escalation in case Tier 2 has clarifying questions."
          ]
        },
        "knowledgeCheck": {
          "matching": {
            "title": "Match Incident Tasks to Correct SOC Tier",
            "instructions": "Match each security operations task with the appropriate tier responsible.",
            "pairs": [
              {
                "id": "et1",
                "left": "Initial alert triage, entity extraction, and host isolation",
                "right": "Tier 1 (Triage Analyst)"
              },
              {
                "id": "et2",
                "left": "Deep forensic analysis, lateral movement tracking, and eradication",
                "right": "Tier 2 (Incident Responder)"
              },
              {
                "id": "et3",
                "left": "Advanced malware reverse-engineering and threat hunting",
                "right": "Tier 3 (Threat Hunter / Specialist)"
              },
              {
                "id": "et4",
                "left": "External crisis communication, regulatory notice, and board briefing",
                "right": "SOC Manager / CISO"
              }
            ],
            "explanation": "Tier 1 triages and contains; Tier 2 investigates and eradicates; Tier 3 reverses malware and hunts; Leadership manages external crisis communications."
          }
        }
      },
      {
        "id": "topic-6-2",
        "unitId": "unit-6",
        "title": "Topic 2: Specialist & Management Escalation",
        "order": 2,
        "estimatedMinutes": 20,
        "xpReward": 50,
        "theory": {
          "summaryLines": [
            "Security incidents frequently cross technical boundaries requiring Specialist Escalation to external technical teams.",
            "Network Engineering: Engaged to apply emergency perimeter firewall blocks, capture packet PCAPs, or reroute BGP traffic.",
            "IAM / Active Directory Admins: Engaged to revoke Kerberos Golden Tickets (krbtgt reset), reset compromised credentials, or disable federated SSO.",
            "Management Escalation is mandatory when an incident involves severe financial loss, regulatory reporting deadlines (e.g. GDPR 72-hour notification), or executive data.",
            "The SOC Lead briefs the CISO and Incident Commander; the CISO handles corporate communications, legal counsel, and law enforcement."
          ],
          "knowMore": {
            "title": "ENISA: Good Practice Guide for Incident Management Communications",
            "description": "Learn European guidelines on crisis communications, cross-functional escalation, and regulatory breach notification procedures.",
            "externalUrl": "https://www.enisa.europa.eu/",
            "externalLabel": "ENISA Crisis Communications"
          }
        },
        "demo": {
                  "title": "[Demo] When More People Need to Know",
                  "subtitle": "Observe how complex security incidents coordinate cross-functional teams and executive leadership",
                  "steps": [
                            {
                                      "id": 1,
                                      "stage": "1. Cross-Functional Incident",
                                      "iconName": "analyst",
                                      "title": "Incident Exceeds SOC Boundaries",
                                      "description": "Confirmed intrusion involves compromised Active Directory accounts, perimeter firewalls, and cloud databases.",
                                      "telemetrySnippet": "SCOPE: Active Directory Kerberos compromised | Firewall egress detected | Multiple systems affected",
                                      "highlightText": "Major incidents require coordination across multiple IT, security, and management teams."
                            },
                            {
                                      "id": 2,
                                      "stage": "2. Identity & AD Team Escalation",
                                      "iconName": "server",
                                      "title": "Engaging Identity Administration",
                                      "description": "SOC contacts Identity team to revoke compromised Kerberos tickets, force password resets, and lock accounts.",
                                      "telemetrySnippet": "IDENTITY ENGAGEMENT: Ticket #AD-991 | Revoke KRBTGT | Force reset for Finance01 and Admins",
                                      "highlightText": "Specialist teams execute domain-level remediation that SOC analysts do not directly manage."
                            },
                            {
                                      "id": 3,
                                      "stage": "3. Network Engineering Escalation",
                                      "iconName": "endpoint",
                                      "title": "Engaging Network Operations",
                                      "description": "Network team is tasked with implementing emergency perimeter ACL blocks and isolating VLAN switch ports.",
                                      "telemetrySnippet": "NETWORK ENGAGEMENT: Block external IP 198.51.100.42 at edge firewalls | Quarantine VLAN 20",
                                      "highlightText": "Network engineers isolate attack vectors and cut off adversary command-and-control channels."
                            },
                            {
                                      "id": 4,
                                      "stage": "4. Management Escalation",
                                      "iconName": "siem",
                                      "title": "Briefing Leadership & Legal Counsel",
                                      "description": "SOC Manager briefs CISO, corporate legal, and compliance officers regarding potential regulatory reporting requirements.",
                                      "telemetrySnippet": "EXECUTIVE BRIEFING: Severity: High | Customer Data: Uncompromised | Briefing Delivered to CISO",
                                      "highlightText": "Executive escalation ensures legal compliance, regulatory reporting, and strategic crisis management."
                            },
                            {
                                      "id": 5,
                                      "stage": "5. Unified Incident Response",
                                      "iconName": "attacker",
                                      "title": "Coordinated Enterprise Defense",
                                      "description": "All teams operate under unified incident command, ensuring rapid containment while protecting business operations.",
                                      "telemetrySnippet": "UNIFIED COMMAND: Threat contained across Identity, Network, and Endpoints | Operations Normal",
                                      "highlightText": "Structured cross-functional collaboration is what successfully resolves enterprise incidents."
                            }
                  ]
        },
        "interactive": {
                  "title": "[Interactive] Route the Escalation",
                  "scenario": "Direct each specialized escalation requirement to the appropriate partner team: Identity/AD Team, Network Team, or SOC Management.",
                  "cards": [
                            {
                                      "id": "route-id",
                                      "category": "User",
                                      "label": "Domain-Wide Credential Revocation",
                                      "summary": "Compromised administrative account requires immediate Kerberos ticket reset across domain controllers.",
                                      "detailedFindings": "Route to: IDENTITY / AD TEAM. Active Directory specialists possess authority to reset forest credentials.",
                                      "severityIndicator": "Normal"
                            },
                            {
                                      "id": "route-net",
                                      "category": "Source IP",
                                      "label": "Perimeter C2 Firewall Block",
                                      "summary": "Host attempting connections to active adversary C2 IP; requires emergency perimeter firewall ACL block.",
                                      "detailedFindings": "Route to: NETWORK ENGINEERING. Network team manages perimeter routing and edge firewall configurations.",
                                      "severityIndicator": "Suspicious"
                            },
                            {
                                      "id": "route-mgmt",
                                      "category": "Timeline",
                                      "label": "Regulatory Breach Notification Assessment",
                                      "summary": "Incident involves potential exposure of customer records requiring legal and compliance evaluation.",
                                      "detailedFindings": "Route to: SOC MANAGEMENT & LEADERSHIP. Senior leadership and legal counsel manage compliance disclosures.",
                                      "severityIndicator": "Malicious"
                            }
                  ]
        },
        "socContext": {
          "title": "Never Speculate During Executive Escalation",
          "scenario": "During an executive call, an analyst tells the CEO \"I think the Chinese government stole all our trade secrets,\" without forensic proof.",
          "analystMindset": "Speak only to confirmed facts. Distinguish clearly between \"What we know\", \"What we suspect\", and \"What we are currently investigating\".",
          "bestPractices": [
            "Use standard incident status terminology (Contained, Eradicated, Investigating).",
            "Avoid technical acronyms when briefing non-technical executive leadership.",
            "Maintain strict confidentiality—never discuss active breaches on unencrypted personal channels."
          ]
        },
        "knowledgeCheck": {
          "matching": {
            "title": "Match Escalation Needs to External Departments",
            "instructions": "Match the incident situation on the left with the correct department on the right.",
            "pairs": [
              {
                "id": "me1",
                "left": "Attacker exfiltrated unencrypted EU customer database",
                "right": "Legal & Privacy Counsel"
              },
              {
                "id": "me2",
                "left": "Need emergency BGP null route for C2 IP range on edge routers",
                "right": "Network Infrastructure Engineering"
              },
              {
                "id": "me3",
                "left": "Journalists requesting comment on ransomware leak site post",
                "right": "Public Relations / Media Relations"
              },
              {
                "id": "me4",
                "left": "Compromised employee suspected of insider sabotage",
                "right": "Human Resources & Corporate Security"
              }
            ],
            "explanation": "Cross-functional escalation engages specialists according to legal, infrastructure, public, and personnel requirements."
          }
        }
      }
    ],
    "assessment": {
      "id": "unit-6-assessment",
      "title": "Topic 6 Assessment: Escalation Procedures",
      "passingScore": 75,
      "xpReward": 100,
      "questions": [
        {
          "id": "u6-q1",
          "question": "What is the primary difference between a \"warm handoff\" and a \"cold handoff\" during incident escalation?",
          "options": [
            "A warm handoff occurs during summer months only",
            "A warm handoff involves direct communication with the incoming team, including a summary of findings, verified IOCs, and actions taken",
            "A cold handoff requires calling the police",
            "A warm handoff requires shutting down the server"
          ],
          "correctAnswer": 1,
          "explanation": "A warm handoff ensures all investigative context, containment actions, and verified IOCs are directly transferred to the receiving responder."
        },
        {
          "id": "u6-q2",
          "question": "When should a Tier 1 analyst escalate an investigation to Tier 2?",
          "options": [
            "Whenever an alert has more than 5 lines of text",
            "When initial triage confirms a True Positive intrusion requiring deep forensics, host memory analysis, or complex containment outside standard playbooks",
            "Only when the analyst wants to go on lunch",
            "Never; Tier 1 must solve all incidents alone"
          ],
          "correctAnswer": 1,
          "explanation": "Tier 1 escalates to Tier 2 when an attack is verified and requires advanced investigation beyond the scope of initial triage playbooks."
        },
        {
          "id": "u6-q3",
          "question": "If an ongoing breach compromises personal customer records subject to GDPR, what is the mandatory external regulatory reporting deadline?",
          "options": [
            "30 days",
            "72 hours",
            "6 months",
            "1 year"
          ],
          "correctAnswer": 1,
          "explanation": "Under GDPR Article 33, organizations must notify supervisory authorities within 72 hours of becoming aware of a personal data breach."
        },
        {
          "id": "u6-q4",
          "question": "Why must technical analysts avoid speculative statements (e.g. \"We think Russian state actors hacked us\") when briefing executive leadership?",
          "options": [
            "It causes technical jargon confusion",
            "Premature speculation can trigger inappropriate legal disclosures, public panic, or incorrect regulatory filings before forensic evidence confirms attribution",
            "Executive leaders do not understand politics",
            "It makes the SIEM slower"
          ],
          "correctAnswer": 1,
          "explanation": "Executive and legal decisions must be grounded in verified forensic evidence, not unconfirmed speculation."
        }
      ]
    }
  },
  {
    "id": "unit-7",
    "unitNumber": 7,
    "title": "Unit 7: SOC Documentation",
    "description": "Master professional incident documentation: the 5 core pillars (Findings, Evidence, Timeline, Actions, Recommendations), ticketing excellence, and audit readiness.",
    "estimatedHours": 2,
    "topics": [
      {
        "id": "topic-7-1",
        "unitId": "unit-7",
        "title": "Topic 1: The 5 Pillars of Documentation & [Demo] SOC Ticket",
        "order": 1,
        "estimatedMinutes": 20,
        "xpReward": 50,
        "theory": {
          "summaryLines": [
            "In security operations, if an action was not documented, it legally and operationally never happened.",
            "Pillar 1: Findings. Concise executive summary detailing what occurred, affected assets, and the root cause.",
            "Pillar 2: Evidence. Technical artifacts including process command lines, SHA-256 hashes, IP addresses, domains, and log excerpts.",
            "Pillar 3: Timeline. Chronological sequence of events in UTC from initial access to detection, containment, and recovery.",
            "Pillar 4: Actions. Exact steps executed by analysts (e.g. host isolated at 03:18 UTC, password reset at 03:22 UTC, firewall block applied at 03:25 UTC).",
            "Pillar 5: Recommendation. Strategic mitigations to prevent recurrence (e.g. disable Office macros, implement MFA on VPN, tune SIEM rule)."
          ],
          "knowMore": {
            "title": "SANS Institute: Writing Effective Incident Reports for Management and Technical Teams",
            "description": "Learn the industry benchmark for structuring incident documentation that withstands regulatory and judicial scrutiny.",
            "externalUrl": "https://www.sans.org/white-papers/33349/",
            "externalLabel": "SANS Incident Documentation"
          }
        },
        "demo": {
                  "title": "[Demo] Turn Investigation Into a Record",
                  "subtitle": "Watch a vague, unhelpful analyst note transform into a professional, audit-proof SOC investigation ticket",
                  "steps": [
                            {
                                      "id": 1,
                                      "stage": "1. The Poor Analyst Note",
                                      "iconName": "attacker",
                                      "title": "Vague, Incomplete Ticket Entry",
                                      "description": "Analyst writes: 'Looked at alert. Seems suspicious. Closed.' Provides zero technical value to peers or auditors.",
                                      "telemetrySnippet": "BAD NOTE: 'Looked at alert. Seems suspicious. Closed.' (NO entities, NO evidence, NO justification)",
                                      "highlightText": "Incomplete notes force other analysts to redo work and fail regulatory compliance audits."
                            },
                            {
                                      "id": 2,
                                      "stage": "2. Adding What Happened",
                                      "iconName": "endpoint",
                                      "title": "Clear Incident Summary",
                                      "description": "Summary added: 'Investigated Multiple Failed Logins for user Finance01 on host FIN-PC-04 originating from internal IP 10.10.20.15.'",
                                      "telemetrySnippet": "SUMMARY: Alert ALT-2026-04 | User: Finance01 | Host: FIN-PC-04 | IP: 10.10.20.15 | Time: 10:32 AM",
                                      "highlightText": "A strong summary immediately answers who, what, where, and when."
                            },
                            {
                                      "id": 3,
                                      "stage": "3. Attaching Technical Evidence",
                                      "iconName": "server",
                                      "title": "Citing Specific Event Logs",
                                      "description": "Analyst logs exact timestamps: 4 failed attempts (Event 4625) followed by successful interactive logon (Event 4624) at 10:32:05.",
                                      "telemetrySnippet": "EVIDENCE: Event 4625 (10:31:40, 10:31:44, 10:31:47, 10:31:52) -> Event 4624 Success (10:32:05)",
                                      "highlightText": "Evidence citations prove your conclusions with verifiable log artifacts."
                            },
                            {
                                      "id": 4,
                                      "stage": "4. Documenting Verified Findings",
                                      "iconName": "siem",
                                      "title": "Explaining the Root Cause",
                                      "description": "Analyst notes: 'Contacted user via phone; employee confirmed Caps Lock keyboard typo. No unauthorized processes spawned.'",
                                      "telemetrySnippet": "FINDING: User mistyped password due to Caps Lock key. Clean process tree confirmed via EDR.",
                                      "highlightText": "Documenting root-cause verification establishes why the activity occurred."
                            },
                            {
                                      "id": 5,
                                      "stage": "5. Disposition & Recommendations",
                                      "iconName": "analyst",
                                      "title": "Audit-Proof Ticket Complete",
                                      "description": "Ticket closed as 'Benign False Positive (User Error)'. Ready for peer review, compliance inspection, and metrics tracking.",
                                      "telemetrySnippet": "DISPOSITION: Closed - False Positive (User Error) | Recommendations: None | Audit Ready: YES",
                                      "highlightText": "Professional documentation turns your investigation into a permanent, defensible enterprise record."
                            }
                  ]
        },
        "interactive": {
                  "title": "[Interactive] Build the Analyst Note",
                  "scenario": "Assemble the core components of a professional SOC investigation note in their proper logical order.",
                  "cards": [
                            {
                                      "id": "note-sum",
                                      "category": "User",
                                      "label": "1. Incident Summary",
                                      "summary": "Clear statement of the alert type, affected user (Finance01), host (FIN-PC-04), and timestamp.",
                                      "detailedFindings": "Component 1: Summarizes the alert background and target entities.",
                                      "severityIndicator": "Normal"
                            },
                            {
                                      "id": "note-ent",
                                      "category": "Source IP",
                                      "label": "2. Core Entities & Scoping",
                                      "summary": "Detailed User, Host, IP, and subnet context extracted during initial triage.",
                                      "detailedFindings": "Component 2: Scopes the exact boundary of the affected systems.",
                                      "severityIndicator": "Normal"
                            },
                            {
                                      "id": "note-ev",
                                      "category": "Event ID",
                                      "label": "3. Chronological Evidence",
                                      "summary": "Exact log timestamps: 4 failed attempts followed by successful Event 4624 at 10:32:05.",
                                      "detailedFindings": "Component 3: Concrete technical artifacts supporting the analysis.",
                                      "severityIndicator": "Normal"
                            },
                            {
                                      "id": "note-find",
                                      "category": "Timeline",
                                      "label": "4. Analyst Finding & Root Cause",
                                      "summary": "User verified password typo via telephone; clean process tree confirmed in EDR.",
                                      "detailedFindings": "Component 4: Explains what caused the anomaly and validates safety.",
                                      "severityIndicator": "Normal"
                            },
                            {
                                      "id": "note-disp",
                                      "category": "Timeline",
                                      "label": "5. Action & Final Disposition",
                                      "summary": "Ticket closed as Benign False Positive (User Error); audit-ready.",
                                      "detailedFindings": "Component 5: Concludes ticket with clear classification.",
                                      "severityIndicator": "Normal"
                            }
                  ]
        },
        "socContext": {
          "title": "Documentation for Incident Retrospectives and Audits",
          "scenario": "Six months after an incident, insurance auditors investigate a $1M cyber claim and request ticket records for proof of timely containment.",
          "analystMindset": "Write every ticket as if it will be read aloud in a courtroom by opposing counsel or examined by financial auditors.",
          "bestPractices": [
            "Standardize on ISO 8601 UTC timestamps (YYYY-MM-DDTHH:MM:SSZ).",
            "Always link related tickets (parent case, change requests, EDR alerts).",
            "Never edit or delete historical timestamps—append update notes sequentially."
          ]
        },
        "knowledgeCheck": {
          "dragDrop": {
            "title": "Arrange the 5 Core Documentation Pillars",
            "instructions": "Order the five essential sections of an audit-grade SOC incident report.",
            "items": [
              {
                "id": "dp-1",
                "label": "Executive Summary & Findings (Root-cause overview for management)",
                "order": 1
              },
              {
                "id": "dp-2",
                "label": "Forensic Evidence (Hashes, IPs, command lines, log snippets)",
                "order": 2
              },
              {
                "id": "dp-3",
                "label": "Chronological Timeline (UTC timestamps from access to containment)",
                "order": 3
              },
              {
                "id": "dp-4",
                "label": "Actions Taken (EDR containment, host isolation, account resets)",
                "order": 4
              },
              {
                "id": "dp-5",
                "label": "Remediation Recommendations (GPO hardening, firewall rules, user training)",
                "order": 5
              }
            ],
            "explanation": "Reports begin with executive findings, present evidence and timeline, record containment actions, and finish with prevention recommendations."
          }
        }
      },
      {
        "id": "topic-7-2",
        "unitId": "unit-7",
        "title": "Topic 2: [Lab] 🖥️ Create Incident Ticket",
        "order": 2,
        "estimatedMinutes": 25,
        "xpReward": 75,
        "theory": {
          "summaryLines": [
            "Creating an incident ticket is the culminating practical skill of a Tier 1 SOC Analyst.",
            "Every ticket must include standard fields: Incident Title, Severity Level, Affected Asset, User ID, Detection Source, and Status.",
            "The Investigation Narrative must clearly explain the attack chain from initial access through execution, persistence, and C2 communication.",
            "Containment Verification: Explicitly state the exact timestamp when network isolation was verified.",
            "Closing Codes: Ensure accurate resolution categorization (True Positive - Contained, False Positive - Tuned, Benign - Expected)."
          ],
          "knowMore": {
            "title": "NIST Computer Security Incident Handling: Section 3.4 Documentation",
            "description": "Review official guidelines on maintaining incident documentation logs and evidence checklists.",
            "externalUrl": "https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final",
            "externalLabel": "NIST SP 800-61 Documentation"
          }
        },
        "demo": {
                  "title": "[Demo] From Alert to Case Record",
                  "subtitle": "See how all findings from the FinCorp investigation come together in a complete incident ticket record",
                  "steps": [
                            {
                                      "id": 1,
                                      "stage": "1. Case Ingestion & Scoping",
                                      "iconName": "siem",
                                      "title": "Ticket Header & Metadata Populated",
                                      "description": "Ticket #2026-04 opened in case management. Alert ID ALT-2026-04, FinCorp finance subnet, initial Medium severity.",
                                      "telemetrySnippet": "TICKET HEADER: Case #2026-04 | Title: Failed Login Spike | Subnet: Finance LAN | Severity: Medium",
                                      "highlightText": "Standardized ticket headers ensure cases are easily indexed and searched."
                            },
                            {
                                      "id": 2,
                                      "stage": "2. Entity Information Recorded",
                                      "iconName": "endpoint",
                                      "title": "User, Host, and Network Details",
                                      "description": "User: Finance01 (Billing clerk) | Host: FIN-PC-04 | Source IP: 10.10.20.15 | Subnet: Internal VLAN 20.",
                                      "telemetrySnippet": "ENTITIES: User=Finance01 | Host=FIN-PC-04 | IP=10.10.20.15 | Asset Criticality=Standard",
                                      "highlightText": "Recording entity metadata enables automated correlation across past and future cases."
                            },
                            {
                                      "id": 3,
                                      "stage": "3. Chronological Timeline Attached",
                                      "iconName": "server",
                                      "title": "Chronological Sequence of Events",
                                      "description": "10:31:40 to 10:31:52: Four failed attempts (Event 4625). 10:32:05: Successful interactive logon (Event 4624).",
                                      "telemetrySnippet": "TIMELINE: 10:31:40 (Fail) -> 10:31:44 (Fail) -> 10:31:47 (Fail) -> 10:31:52 (Fail) -> 10:32:05 (Success)",
                                      "highlightText": "The chronological timeline provides a complete replay of what transpired."
                            },
                            {
                                      "id": 4,
                                      "stage": "4. Investigative Actions & Verification",
                                      "iconName": "analyst",
                                      "title": "Verification Call & Host Inspection",
                                      "description": "Analyst contacted Finance01 to verify typo; EDR process tree inspected with 0 suspicious child processes spawned.",
                                      "telemetrySnippet": "ACTIONS: Direct user verification completed | EDR process inspection: 0 anomalies | Host safe",
                                      "highlightText": "Active verification proves the analyst validated the host before closing the case."
                            },
                            {
                                      "id": 5,
                                      "stage": "5. Final Resolution & Closure",
                                      "iconName": "analyst",
                                      "title": "Audit-Ready Case Closed",
                                      "description": "Ticket resolved as 'Closed — Benign False Positive (User Error)'. Archived in audit database for compliance review.",
                                      "telemetrySnippet": "FINAL STATUS: Closed | Disposition: Benign False Positive | SLA: Met (18m / 30m) | Signoff: L1 Analyst",
                                      "highlightText": "A properly closed ticket provides defensible documentation that withstands compliance scrutiny."
                            }
                  ]
        },
        "interactive": {
                  "title": "[Interactive] Complete the Case Record",
                  "scenario": "Place the available investigation findings from FinCorp alert ALT-2026-04 into their correct ticket fields.",
                  "cards": [
                            {
                                      "id": "rec-ent",
                                      "category": "User",
                                      "label": "Target Entity Details",
                                      "summary": "User: Finance01 | Host: FIN-PC-04 | Source IP: 10.10.20.15.",
                                      "detailedFindings": "Field: Target Entities. Records the affected identity, workstation asset, and network location.",
                                      "severityIndicator": "Normal"
                            },
                            {
                                      "id": "rec-time",
                                      "category": "Timeline",
                                      "label": "Event Chronology",
                                      "summary": "10:31:40-10:31:52 (Failures) -> 10:32:05 (Logon Success).",
                                      "detailedFindings": "Field: Timeline. Chronological sequence of authentications demonstrating user recovery.",
                                      "severityIndicator": "Normal"
                            },
                            {
                                      "id": "rec-ev",
                                      "category": "Event ID",
                                      "label": "Verification Evidence",
                                      "summary": "User confirmed password mistype; clean process trees verified in EDR telemetry.",
                                      "detailedFindings": "Field: Verification Findings. Confirms root cause and absence of adversary persistence.",
                                      "severityIndicator": "Normal"
                            },
                            {
                                      "id": "rec-disp",
                                      "category": "Source IP",
                                      "label": "Final Ticket Disposition",
                                      "summary": "Closed — Benign False Positive (User Error).",
                                      "detailedFindings": "Field: Disposition. Formal audit resolution closing the investigation.",
                                      "severityIndicator": "Normal"
                            }
                  ]
        },
        "socContext": {
          "title": "The Post-Incident Review (Lessons Learned)",
          "scenario": "Following a major malware outbreak, the CISO hosts a Blameless Post-Mortem to determine how defenses failed.",
          "analystMindset": "A post-mortem does not assign blame to people; it identifies systemic gaps in technology and process so the enterprise improves.",
          "bestPractices": [
            "Participate actively in post-incident reviews with actionable feedback.",
            "Update relevant playbooks immediately if gaps were discovered during triage.",
            "Ensure all remediation tasks have assigned owners and completion target dates."
          ]
        },
        "knowledgeCheck": {
          "triageScenario": {
            "id": "ts-doc-lab",
            "alertName": "Case CASE-2026-04: Incident Closure & Post-Mortem Verification",
            "severity": "HIGH",
            "scenarioText": "L1 Analyst is completing the formal closure checklist for CASE-2026-04 (Brute Force Credential Compromise on FIN-PC-04). Workstation FIN-PC-04 was isolated within 11 minutes, user Finance01 password reset, and perimeter firewalls blocked the malicious Tor IP 198.51.100.25.",
            "evidenceItems": [
              {
                "label": "Containment SLA",
                "value": "Workstation FIN-PC-04 Isolated at 02:51 UTC (11 mins into 60 min SLA)",
                "insight": "All containment SLAs met successfully"
              },
              {
                "label": "Identity Remediation",
                "value": "Finance01 Password Reset & Kerberos Tickets Purged",
                "insight": "Adversary session terminated and credentials invalidated"
              },
              {
                "label": "Lessons Learned Action",
                "value": "GPO lockout policy updated from 10 attempts to 5 attempts",
                "insight": "Systemic preventive hardening implemented"
              }
            ],
            "correctVerdict": "TRUE_POSITIVE",
            "rationale": "The incident was a confirmed True Positive attack that has now been fully contained, eradicated, and remediated with complete root-cause documentation and preventive GPO hardening.",
            "analystAction": "Finalize audit notes with all 5 documentation pillars, attach EDR containment logs, and transition case status to Resolved / Closed."
          }
        }
      }
    ],
    "assessment": {
      "id": "unit-7-assessment",
      "title": "Topic 7 Assessment: SOC Documentation Standards",
      "passingScore": 75,
      "xpReward": 100,
      "questions": [
        {
          "id": "u7-q1",
          "question": "What are the five core pillars of an audit-grade SOC incident report?",
          "options": [
            "Intro, Body, Conclusion, Footnotes, Appendix",
            "Findings, Evidence, Timeline, Actions, Recommendations",
            "User, Password, IP, Port, Protocol",
            "Detection, Prevention, Destruction, Recovery, Payment"
          ],
          "correctAnswer": 1,
          "explanation": "The five pillars are Findings (Summary), Evidence (Technical IOCs), Timeline (Chronology), Actions (Containment), and Recommendations (Future hardening)."
        },
        {
          "id": "u7-q2",
          "question": "Why must timestamps in security documentation always be recorded in UTC (Coordinated Universal Time)?",
          "options": [
            "UTC looks more professional on paper",
            "Enterprises have assets spread across multiple global timezones; standardizing on UTC prevents chronological ambiguity during cross-system correlation",
            "Computers can only understand UTC time",
            "Local daylight savings time is illegal in cybersecurity"
          ],
          "correctAnswer": 1,
          "explanation": "Standardizing on UTC eliminates confusion across distributed systems, multi-national assets, and daylight savings transitions."
        },
        {
          "id": "u7-q3",
          "question": "What is the primary objective of the \"Recommendations\" section in an incident ticket?",
          "options": [
            "To criticize the user who made a mistake",
            "To propose strategic preventative technical and policy controls that stop similar attacks from recurring",
            "To request a salary increase for the analyst",
            "To recommend purchasing more computer monitors"
          ],
          "correctAnswer": 1,
          "explanation": "Recommendations turn incident lessons into permanent defensive hardening (e.g. GPO restrictions, MFA enforcement, firewall rules)."
        },
        {
          "id": "u7-q4",
          "question": "If an analyst isolates an infected host but fails to document the action in the incident ticket, what is the consequence during an audit?",
          "options": [
            "Nothing, verbal confirmation is always sufficient",
            "The action is considered unverified or unperformed, potentially causing regulatory compliance failure or legal liability",
            "The ticketing system automatically deletes the case",
            "The host reconnects itself automatically"
          ],
          "correctAnswer": 1,
          "explanation": "In security operations and compliance audits: \"If it was not documented in the ticket, it never happened.\""
        }
      ]
    }
  }
];
