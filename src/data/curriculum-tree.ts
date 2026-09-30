import { MODULE_04_UNITS } from './modules/module-04-units';

export interface CurriculumTopic {
  id: string;
  moduleId: string;
  unitId: string;
  title: string;
  order: number;
  estimatedMinutes?: number;
  xpReward?: number;
  isAssessment?: boolean;
}

export interface CurriculumUnit {
  id: string;
  moduleId: string;
  unitNumber: number;
  title: string;
  description?: string;
  topics: CurriculumTopic[];
}

export interface CurriculumModule {
  id: string;
  title: string;
  description: string;
  order: number;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  estimatedHours: number;
  isPublished: boolean;
  defaultLocked: boolean;
  units: CurriculumUnit[];
}

// Generate Module 04 units & topics from MODULE_04_UNITS
const module04Units: CurriculumUnit[] = MODULE_04_UNITS.map((u) => {
  const topics: CurriculumTopic[] = u.topics.map((t) => ({
    id: t.id,
    moduleId: '04',
    unitId: u.id,
    title: t.title,
    order: t.order,
    estimatedMinutes: t.estimatedMinutes,
    xpReward: t.xpReward,
    isAssessment: false,
  }));

  // Add the unit's assessment as the final item of that unit
  topics.push({
    id: u.assessment.id,
    moduleId: '04',
    unitId: u.id,
    title: `${u.title.split(':')[0]} Assessment (100 pts)`,
    order: topics.length + 1,
    estimatedMinutes: 15,
    xpReward: u.assessment.xpReward,
    isAssessment: true,
  });

  return {
    id: u.id,
    moduleId: '04',
    unitNumber: u.unitNumber,
    title: u.title,
    description: u.description,
    topics,
  };
});

export const CURRICULUM_TREE: CurriculumModule[] = [
  {
    id: '00',
    title: 'Course Orientation',
    description: 'Welcome to SOC Analyst L1, learning journey & analyst mindset.',
    order: 0,
    difficulty: 'BEGINNER',
    estimatedHours: 2,
    isPublished: true,
    defaultLocked: false,
    units: [
      {
        id: 'unit-00-1',
        moduleId: '00',
        unitNumber: 1,
        title: 'Unit 1: SOC Orientation & Foundations',
        description: 'Understand the role of a modern SOC and your learning path.',
        topics: [
          { id: 'topic-00-1', moduleId: '00', unitId: 'unit-00-1', title: 'Welcome & Course Roadmap', order: 1, estimatedMinutes: 10, xpReward: 20 },
          { id: 'topic-00-2', moduleId: '00', unitId: 'unit-00-1', title: 'The SOC Analyst Mindset & Ethics', order: 2, estimatedMinutes: 15, xpReward: 30 },
          { id: 'topic-00-3', moduleId: '00', unitId: 'unit-00-1', title: 'Platform Workflow & Lab Setup', order: 3, estimatedMinutes: 15, xpReward: 30 },
        ],
      },
    ],
  },
  {
    id: '01',
    title: 'Computer Fundamentals',
    description: 'Master foundational computer and operating system concepts for SOC analysis.',
    order: 1,
    difficulty: 'BEGINNER',
    estimatedHours: 10,
    isPublished: true,
    defaultLocked: false,
    units: [
      {
        id: 'unit-01-1',
        moduleId: '01',
        unitNumber: 1,
        title: 'Unit 1: Operating Systems & Architecture',
        description: 'Windows vs Linux architecture and kernel subsystems.',
        topics: [
          { id: 'topic-01-1', moduleId: '01', unitId: 'unit-01-1', title: 'Windows OS Architecture & Win32 APIs', order: 1, estimatedMinutes: 20, xpReward: 40 },
          { id: 'topic-01-2', moduleId: '01', unitId: 'unit-01-1', title: 'Linux Architecture & CLI Essentials', order: 2, estimatedMinutes: 20, xpReward: 40 },
        ],
      },
      {
        id: 'unit-01-2',
        moduleId: '01',
        unitNumber: 2,
        title: 'Unit 2: Processes, Services & Memory',
        description: 'Process trees, daemons, and system execution telemetry.',
        topics: [
          { id: 'topic-01-3', moduleId: '01', unitId: 'unit-01-2', title: 'Process Trees & Lineage Analysis', order: 1, estimatedMinutes: 25, xpReward: 50 },
          { id: 'topic-01-4', moduleId: '01', unitId: 'unit-01-2', title: 'Windows Services & Background Daemons', order: 2, estimatedMinutes: 20, xpReward: 40 },
        ],
      },
      {
        id: 'unit-01-3',
        moduleId: '01',
        unitNumber: 3,
        title: 'Unit 3: Permissions & Access Controls',
        description: 'User privileges, DACLs, SIDs, and suspicious behaviors.',
        topics: [
          { id: 'topic-01-5', moduleId: '01', unitId: 'unit-01-3', title: 'Users, Groups, SIDs & Permissions', order: 1, estimatedMinutes: 20, xpReward: 40 },
          { id: 'topic-01-6', moduleId: '01', unitId: 'unit-01-3', title: 'Identifying Anomalous System Activity', order: 2, estimatedMinutes: 25, xpReward: 50 },
        ],
      },
    ],
  },
  {
    id: '02',
    title: 'Networking Fundamentals',
    description: 'Build essential networking knowledge for security telemetry and packet inspection.',
    order: 2,
    difficulty: 'BEGINNER',
    estimatedHours: 10,
    isPublished: true,
    defaultLocked: false,
    units: [
      {
        id: 'unit-02-1',
        moduleId: '02',
        unitNumber: 1,
        title: 'Unit 1: Network Models & Encapsulation',
        description: 'OSI 7-layer vs TCP/IP 4-layer model and encapsulation.',
        topics: [
          { id: 'topic-02-1', moduleId: '02', unitId: 'unit-02-1', title: 'OSI vs TCP/IP Models', order: 1, estimatedMinutes: 20, xpReward: 40 },
          { id: 'topic-02-2', moduleId: '02', unitId: 'unit-02-1', title: 'Ethernet, MAC & ARP Resolution', order: 2, estimatedMinutes: 20, xpReward: 40 },
        ],
      },
      {
        id: 'unit-02-2',
        moduleId: '02',
        unitNumber: 2,
        title: 'Unit 2: Core Protocols & Addressing',
        description: 'IP addressing, subnetting, TCP handshake, UDP.',
        topics: [
          { id: 'topic-02-3', moduleId: '02', unitId: 'unit-02-2', title: 'IPv4 / IPv6 Subnetting & CIDR', order: 1, estimatedMinutes: 25, xpReward: 50 },
          { id: 'topic-02-4', moduleId: '02', unitId: 'unit-02-2', title: 'TCP Handshake, Flags & UDP Sockets', order: 2, estimatedMinutes: 25, xpReward: 50 },
        ],
      },
      {
        id: 'unit-02-3',
        moduleId: '02',
        unitNumber: 3,
        title: 'Unit 3: Critical Protocols & Network Security',
        description: 'DNS, DHCP, HTTP/S, TLS and network monitoring points.',
        topics: [
          { id: 'topic-02-5', moduleId: '02', unitId: 'unit-02-3', title: 'DNS Resolution & DNS Tunnelling', order: 1, estimatedMinutes: 25, xpReward: 50 },
          { id: 'topic-02-6', moduleId: '02', unitId: 'unit-02-3', title: 'DHCP, HTTP/S & TLS Handshakes', order: 2, estimatedMinutes: 20, xpReward: 40 },
        ],
      },
    ],
  },
  {
    id: '03',
    title: 'Cybersecurity Fundamentals',
    description: 'Learn core security principles, attack surfaces, threat actors, and defense concepts.',
    order: 3,
    difficulty: 'BEGINNER',
    estimatedHours: 7,
    isPublished: true,
    defaultLocked: false,
    units: [
      {
        id: 'unit-03-1',
        moduleId: '03',
        unitNumber: 1,
        title: 'Unit 1: Security Models & Threat Actors',
        description: 'CIA triad, Defense-in-Depth, and adversary classifications.',
        topics: [
          { id: 'topic-03-1', moduleId: '03', unitId: 'unit-03-1', title: 'CIA Triad & Defense-in-Depth', order: 1, estimatedMinutes: 20, xpReward: 40 },
          { id: 'topic-03-2', moduleId: '03', unitId: 'unit-03-1', title: 'Threat Actor Types & Motivations', order: 2, estimatedMinutes: 20, xpReward: 40 },
        ],
      },
      {
        id: 'unit-03-2',
        moduleId: '03',
        unitNumber: 2,
        title: 'Unit 2: Malware & Attack Patterns',
        description: 'Ransomware, trojans, backdoors, and Indicators of Compromise.',
        topics: [
          { id: 'topic-03-3', moduleId: '03', unitId: 'unit-03-2', title: 'Malware Taxonomy & Delivery Vectors', order: 1, estimatedMinutes: 25, xpReward: 50 },
          { id: 'topic-03-4', moduleId: '03', unitId: 'unit-03-2', title: 'Indicators of Compromise (IOCs) & Hashes', order: 2, estimatedMinutes: 25, xpReward: 50 },
        ],
      },
    ],
  },
  {
    id: '04',
    title: 'SOC Operations',
    description: 'Master the 7 core units of SOC L1 operations: architecture, triage, FPs, severity, escalation, and tickets.',
    order: 4,
    difficulty: 'INTERMEDIATE',
    estimatedHours: 3,
    isPublished: true,
    defaultLocked: false,
    units: module04Units,
  },
  {
    id: '05',
    title: 'SIEM',
    description: 'Security Information and Event Management architecture, log ingestion, search queries, and alert rules.',
    order: 5,
    difficulty: 'INTERMEDIATE',
    estimatedHours: 12,
    isPublished: true,
    defaultLocked: false,
    units: [
      {
        id: 'unit-05-1',
        moduleId: '05',
        unitNumber: 1,
        title: 'Unit 1: SIEM Architecture & Ingestion',
        description: 'Universal Forwarders, Indexers, Search Heads, and CIM Normalization.',
        topics: [
          { id: 'topic-05-1', moduleId: '05', unitId: 'unit-05-1', title: 'SIEM Architecture & Data Shippers', order: 1, estimatedMinutes: 20, xpReward: 40 },
          { id: 'topic-05-2', moduleId: '05', unitId: 'unit-05-1', title: 'CIM Normalization & Event Parsing', order: 2, estimatedMinutes: 25, xpReward: 50 },
        ],
      },
      {
        id: 'unit-05-2',
        moduleId: '05',
        unitNumber: 2,
        title: 'Unit 2: SIEM Search & Query Languages',
        description: 'Splunk Processing Language (SPL) & Microsoft Kusto Query Language (KQL).',
        topics: [
          { id: 'topic-05-3', moduleId: '05', unitId: 'unit-05-2', title: 'SPL & KQL Query Fundamentals', order: 1, estimatedMinutes: 30, xpReward: 60 },
          { id: 'topic-05-4', moduleId: '05', unitId: 'unit-05-2', title: 'Interactive SIEM Query Playground', order: 2, estimatedMinutes: 40, xpReward: 80 },
        ],
      },
      {
        id: 'unit-05-3',
        moduleId: '05',
        unitNumber: 3,
        title: 'Unit 3: Correlation Rules & Tuning',
        description: 'Scheduled correlation searches, threshold logic, and alert suppression.',
        topics: [
          { id: 'topic-05-5', moduleId: '05', unitId: 'unit-05-3', title: 'Authoring SIEM Correlation Rules', order: 1, estimatedMinutes: 25, xpReward: 50 },
          { id: 'topic-05-6', moduleId: '05', unitId: 'unit-05-3', title: 'Rule Tuning & Noise Reduction', order: 2, estimatedMinutes: 25, xpReward: 50 },
        ],
      },
    ],
  },
  {
    id: '06',
    title: 'Log & Event Analysis',
    description: 'Master analyzing Windows Security Events, Linux syslog, web server, and network logs.',
    order: 6,
    difficulty: 'INTERMEDIATE',
    estimatedHours: 7,
    isPublished: true,
    defaultLocked: true,
    units: [
      {
        id: 'unit-06-1',
        moduleId: '06',
        unitNumber: 1,
        title: 'Unit 1: Windows Security Event IDs',
        description: 'Event IDs 4624, 4625, 4688, 4720, 7045, 1102.',
        topics: [
          { id: 'topic-06-1', moduleId: '06', unitId: 'unit-06-1', title: 'Critical Windows Security Event IDs', order: 1, estimatedMinutes: 25, xpReward: 50 },
          { id: 'topic-06-2', moduleId: '06', unitId: 'unit-06-1', title: 'Logon Types & Authentication Analysis', order: 2, estimatedMinutes: 25, xpReward: 50 },
        ],
      },
      {
        id: 'unit-06-2',
        moduleId: '06',
        unitNumber: 2,
        title: 'Unit 2: Linux & Network Device Logs',
        description: 'Syslog channels, auditd, and firewall/proxy telemetry.',
        topics: [
          { id: 'topic-06-3', moduleId: '06', unitId: 'unit-06-2', title: 'Linux auth.log & auditd Investigations', order: 1, estimatedMinutes: 25, xpReward: 50 },
          { id: 'topic-06-4', moduleId: '06', unitId: 'unit-06-2', title: 'Firewall & Web Proxy Log Analysis', order: 2, estimatedMinutes: 25, xpReward: 50 },
        ],
      },
    ],
  },
  {
    id: '07',
    title: 'Windows & Linux Security Monitoring',
    description: 'Endpoint monitoring with Sysmon, PowerShell Script Block logging, and Linux audit frameworks.',
    order: 7,
    difficulty: 'INTERMEDIATE',
    estimatedHours: 8,
    isPublished: true,
    defaultLocked: true,
    units: [
      {
        id: 'unit-07-1',
        moduleId: '07',
        unitNumber: 1,
        title: 'Unit 1: Sysmon & Advanced Windows Telemetry',
        description: 'Process creation (Event 1), Network connections (Event 3), Driver loads (Event 6).',
        topics: [
          { id: 'topic-07-1', moduleId: '07', unitId: 'unit-07-1', title: 'Sysmon Schema & Detection Configurations', order: 1, estimatedMinutes: 30, xpReward: 60 },
          { id: 'topic-07-2', moduleId: '07', unitId: 'unit-07-1', title: 'PowerShell Script Block Logging (Event 4104)', order: 2, estimatedMinutes: 25, xpReward: 50 },
        ],
      },
      {
        id: 'unit-07-2',
        moduleId: '07',
        unitNumber: 2,
        title: 'Unit 2: Linux Endpoint Monitoring',
        description: 'Auditd rule sets, sudo tracking, and bash history monitoring.',
        topics: [
          { id: 'topic-07-3', moduleId: '07', unitId: 'unit-07-2', title: 'Linux Sudo Abuse & Privilege Escalation', order: 1, estimatedMinutes: 25, xpReward: 50 },
          { id: 'topic-07-4', moduleId: '07', unitId: 'unit-07-2', title: 'Detecting Linux Persistence & Rootkits', order: 2, estimatedMinutes: 30, xpReward: 60 },
        ],
      },
    ],
  },
  {
    id: '08',
    title: 'Network Security Monitoring',
    description: 'Packet analysis with Wireshark, Zeek network metadata, and Snort/Suricata signature detection.',
    order: 8,
    difficulty: 'ADVANCED',
    estimatedHours: 7,
    isPublished: true,
    defaultLocked: true,
    units: [
      {
        id: 'unit-08-1',
        moduleId: '08',
        unitNumber: 1,
        title: 'Unit 1: PCAP & Wireshark Deep Dive',
        description: 'Packet dissection, Berkeley Packet Filters, and protocol inspection.',
        topics: [
          { id: 'topic-08-1', moduleId: '08', unitId: 'unit-08-1', title: 'Wireshark Display Filters & TCP Streams', order: 1, estimatedMinutes: 30, xpReward: 60 },
          { id: 'topic-08-2', moduleId: '08', unitId: 'unit-08-1', title: 'Hunting Unencrypted Credentials in PCAPs', order: 2, estimatedMinutes: 25, xpReward: 50 },
        ],
      },
      {
        id: 'unit-08-2',
        moduleId: '08',
        unitNumber: 2,
        title: 'Unit 2: Network Intrusion Detection',
        description: 'Snort/Suricata alerts and Zeek connection/DNS logs.',
        topics: [
          { id: 'topic-08-3', moduleId: '08', unitId: 'unit-08-2', title: 'Suricata Signatures & Rule Syntax', order: 1, estimatedMinutes: 25, xpReward: 50 },
          { id: 'topic-08-4', moduleId: '08', unitId: 'unit-08-2', title: 'Zeek conn.log & dns.log Hunting', order: 2, estimatedMinutes: 30, xpReward: 60 },
        ],
      },
    ],
  },
  {
    id: '09',
    title: 'EDR & Endpoint Monitoring',
    description: 'Endpoint Detection and Response architecture, process injection analysis, and remote host containment.',
    order: 9,
    difficulty: 'ADVANCED',
    estimatedHours: 5,
    isPublished: true,
    defaultLocked: true,
    units: [
      {
        id: 'unit-09-1',
        moduleId: '09',
        unitNumber: 1,
        title: 'Unit 1: EDR Architecture & Telemetry',
        description: 'Kernel sensors, behavioral heuristics, and memory dumping.',
        topics: [
          { id: 'topic-09-1', moduleId: '09', unitId: 'unit-09-1', title: 'EDR Sensor Architecture & Kernel Callbacks', order: 1, estimatedMinutes: 25, xpReward: 50 },
          { id: 'topic-09-2', moduleId: '09', unitId: 'unit-09-1', title: 'Process Injections & LSASS Dumping', order: 2, estimatedMinutes: 30, xpReward: 60 },
        ],
      },
      {
        id: 'unit-09-2',
        moduleId: '09',
        unitNumber: 2,
        title: 'Unit 2: Host Isolation & Live Response',
        description: 'Network quarantine, memory capture, and artifact collection.',
        topics: [
          { id: 'topic-09-3', moduleId: '09', unitId: 'unit-09-2', title: 'Host Network Containment Procedures', order: 1, estimatedMinutes: 20, xpReward: 40 },
          { id: 'topic-09-4', moduleId: '09', unitId: 'unit-09-2', title: 'Live Response Terminal Investigations', order: 2, estimatedMinutes: 25, xpReward: 50 },
        ],
      },
    ],
  },
  {
    id: '10',
    title: 'Detection & Response Ecosystem',
    description: 'Understand the multi-tool ecosystem: EDR, NDR, XDR, CDR, and Managed Detection & Response.',
    order: 10,
    difficulty: 'ADVANCED',
    estimatedHours: 5,
    isPublished: true,
    defaultLocked: true,
    units: [
      {
        id: 'unit-10-1',
        moduleId: '10',
        unitNumber: 1,
        title: 'Unit 1: Comparing XDR, EDR, NDR and CDR',
        description: 'Layered visibility across cloud, identity, endpoint, and network.',
        topics: [
          { id: 'topic-10-1', moduleId: '10', unitId: 'unit-10-1', title: 'Cross-Layer Detection (XDR) Concepts', order: 1, estimatedMinutes: 25, xpReward: 50 },
          { id: 'topic-10-2', moduleId: '10', unitId: 'unit-10-1', title: 'MDR Operating Models & Shared Responsibilities', order: 2, estimatedMinutes: 20, xpReward: 40 },
        ],
      },
    ],
  },
  {
    id: '11',
    title: 'Identity, Email & Threat Intelligence',
    description: 'Active Directory security, Kerberoasting, email phishing header analysis, and threat intelligence feeds.',
    order: 11,
    difficulty: 'INTERMEDIATE',
    estimatedHours: 9,
    isPublished: true,
    defaultLocked: true,
    units: [
      {
        id: 'unit-11-1',
        moduleId: '11',
        unitNumber: 1,
        title: 'Unit 1: Active Directory Attacks & Defense',
        description: 'Kerberos tickets, Kerberoasting, AS-REP roasting, DCSync.',
        topics: [
          { id: 'topic-11-1', moduleId: '11', unitId: 'unit-11-1', title: 'Active Directory Architecture & Kerberos', order: 1, estimatedMinutes: 30, xpReward: 60 },
          { id: 'topic-11-2', moduleId: '11', unitId: 'unit-11-1', title: 'Detecting Kerberoasting & Pass-the-Hash', order: 2, estimatedMinutes: 30, xpReward: 60 },
        ],
      },
      {
        id: 'unit-11-2',
        moduleId: '11',
        unitNumber: 2,
        title: 'Unit 2: Phishing & Threat Intelligence',
        description: 'SPF, DKIM, DMARC validation, STIX/TAXII threat intel feeds.',
        topics: [
          { id: 'topic-11-3', moduleId: '11', unitId: 'unit-11-2', title: 'Phishing Email Header Analysis', order: 1, estimatedMinutes: 25, xpReward: 50 },
          { id: 'topic-11-4', moduleId: '11', unitId: 'unit-11-2', title: 'Enriching Alerts with Threat Intelligence', order: 2, estimatedMinutes: 25, xpReward: 50 },
        ],
      },
    ],
  },
  {
    id: '12',
    title: 'SOAR & SOC Automation',
    description: 'Automated incident triage, orchestration playbooks, API integrations, and human decision gates.',
    order: 12,
    difficulty: 'INTERMEDIATE',
    estimatedHours: 5,
    isPublished: true,
    defaultLocked: true,
    units: [
      {
        id: 'unit-12-1',
        moduleId: '12',
        unitNumber: 1,
        title: 'Unit 1: Playbook Automation & Orchestration',
        description: 'SOAR connectors, automated enrichment, and host isolation triggers.',
        topics: [
          { id: 'topic-12-1', moduleId: '12', unitId: 'unit-12-1', title: 'SOAR Architecture & Playbook Lifecycle', order: 1, estimatedMinutes: 25, xpReward: 50 },
          { id: 'topic-12-2', moduleId: '12', unitId: 'unit-12-1', title: 'Building Automated Triage Playbooks', order: 2, estimatedMinutes: 30, xpReward: 60 },
        ],
      },
    ],
  },
  {
    id: '13',
    title: 'MITRE ATT&CK for SOC',
    description: 'Map real-world security alerts to tactics, techniques, and procedures (TTPs).',
    order: 13,
    difficulty: 'INTERMEDIATE',
    estimatedHours: 3,
    isPublished: true,
    defaultLocked: true,
    units: [
      {
        id: 'unit-13-1',
        moduleId: '13',
        unitNumber: 1,
        title: 'Unit 1: ATT&CK Mapping & Coverage',
        description: 'Adversary tactics, sub-techniques, and Navigator heatmaps.',
        topics: [
          { id: 'topic-13-1', moduleId: '13', unitId: 'unit-13-1', title: 'MITRE ATT&CK Structure & TTPs', order: 1, estimatedMinutes: 20, xpReward: 40 },
          { id: 'topic-13-2', moduleId: '13', unitId: 'unit-13-1', title: 'Mapping Alert Evidence to ATT&CK Matrix', order: 2, estimatedMinutes: 25, xpReward: 50 },
        ],
      },
    ],
  },
  {
    id: '14',
    title: 'Incident Response & SOC Documentation',
    description: 'NIST SP 800-61 Rev 2 incident handling lifecycle, forensic timelines, and audit-grade tickets.',
    order: 14,
    difficulty: 'INTERMEDIATE',
    estimatedHours: 5,
    isPublished: true,
    defaultLocked: true,
    units: [
      {
        id: 'unit-14-1',
        moduleId: '14',
        unitNumber: 1,
        title: 'Unit 1: Incident Response Handling',
        description: 'Preparation, Detection, Containment, Eradication, Recovery, Lessons Learned.',
        topics: [
          { id: 'topic-14-1', moduleId: '14', unitId: 'unit-14-1', title: 'NIST SP 800-61 Incident Handling Phases', order: 1, estimatedMinutes: 25, xpReward: 50 },
          { id: 'topic-14-2', moduleId: '14', unitId: 'unit-14-1', title: 'Building Chronological Incident Timelines', order: 2, estimatedMinutes: 25, xpReward: 50 },
        ],
      },
    ],
  },
  {
    id: '15',
    title: 'OT & ICS Security',
    description: 'Operational Technology, SCADA environments, Purdue Model, and industrial protocol monitoring.',
    order: 15,
    difficulty: 'INTERMEDIATE',
    estimatedHours: 5,
    isPublished: true,
    defaultLocked: true,
    units: [
      {
        id: 'unit-15-1',
        moduleId: '15',
        unitNumber: 1,
        title: 'Unit 1: OT / SCADA Security Foundations',
        description: 'Modbus, DNP3, Ethernet/IP, and passive network monitoring.',
        topics: [
          { id: 'topic-15-1', moduleId: '15', unitId: 'unit-15-1', title: 'The Purdue Model & IT vs OT Differences', order: 1, estimatedMinutes: 25, xpReward: 50 },
          { id: 'topic-15-2', moduleId: '15', unitId: 'unit-15-1', title: 'Safe Monitoring of Industrial Protocols', order: 2, estimatedMinutes: 25, xpReward: 50 },
        ],
      },
    ],
  },
  {
    id: '16',
    title: 'SOC L1 Investigation Scenarios',
    description: 'End-to-end practical investigations of real-world multi-stage enterprise intrusions.',
    order: 16,
    difficulty: 'ADVANCED',
    estimatedHours: 8,
    isPublished: true,
    defaultLocked: true,
    units: [
      {
        id: 'unit-16-1',
        moduleId: '16',
        unitNumber: 1,
        title: 'Unit 1: Real-World Investigation Drills',
        description: 'Phishing payload, lateral movement, and data exfiltration scenarios.',
        topics: [
          { id: 'topic-16-1', moduleId: '16', unitId: 'unit-16-1', title: 'Investigation: Executive Phishing & Credential Theft', order: 1, estimatedMinutes: 45, xpReward: 90 },
          { id: 'topic-16-2', moduleId: '16', unitId: 'unit-16-1', title: 'Investigation: Ransomware Infiltration & Containment', order: 2, estimatedMinutes: 50, xpReward: 100 },
        ],
      },
    ],
  },
  {
    id: '17',
    title: 'Final SOC L1 Assessment',
    description: 'Comprehensive theoretical examination, live SOC investigation lab, and certification issuance.',
    order: 17,
    difficulty: 'ADVANCED',
    estimatedHours: 3,
    isPublished: true,
    defaultLocked: true,
    units: [
      {
        id: 'unit-17-1',
        moduleId: '17',
        unitNumber: 1,
        title: 'Unit 1: Certification Evaluation',
        description: 'Pass the 50-question knowledge exam and practical incident report submission.',
        topics: [
          { id: 'topic-17-1', moduleId: '17', unitId: 'unit-17-1', title: 'SOC Analyst L1 Knowledge Assessment', order: 1, estimatedMinutes: 60, xpReward: 200, isAssessment: true },
          { id: 'topic-17-2', moduleId: '17', unitId: 'unit-17-1', title: 'Practical Incident Report & Evaluation', order: 2, estimatedMinutes: 60, xpReward: 200, isAssessment: true },
        ],
      },
    ],
  },
];

// Flat list of Module 04 sequential items for strict lock determination
export const MODULE_04_SEQUENCE = module04Units.flatMap((u) => u.topics);

/**
 * Returns the status of a topic: 'completed' | 'current' | 'locked' | 'available'
 */
export function getTopicStatus({
  topicId,
  moduleId,
  completedTopics,
  completedUnits,
  currentTopicId,
  unlockedAssessments = [],
  isAssessment = false,
}: {
  topicId: string;
  moduleId: string;
  completedTopics: Set<string>;
  completedUnits: Set<string>;
  currentTopicId: string | null;
  unlockedAssessments?: string[];
  isAssessment?: boolean;
}): 'completed' | 'current' | 'locked' | 'available' {
  const isUnlockAll = unlockedAssessments.includes('unlock-all') || unlockedAssessments.includes(topicId);

  // 1. Completed check
  if (isAssessment) {
    if (completedUnits.has(topicId) || isUnlockAll && completedUnits.has(topicId)) {
      return 'completed';
    }
  } else {
    if (completedTopics.has(topicId)) {
      return 'completed';
    }
  }

  // 2. Currently active topic check
  if (currentTopicId === topicId) {
    return 'current';
  }

  // If unlocked via admin override
  if (isUnlockAll) {
    return 'available';
  }

  // For Module 04: Sequential locking — each topic is locked until previous is done
  if (moduleId === '04') {
    const seqIndex = MODULE_04_SEQUENCE.findIndex((t) => t.id === topicId);
    // First topic is always available
    if (seqIndex <= 0) return 'available';
    const prevTopic = MODULE_04_SEQUENCE[seqIndex - 1];
    const prevDone = prevTopic.isAssessment
      ? completedUnits.has(prevTopic.id) || (prevTopic.id.includes('assessment') && completedUnits.has(prevTopic.id.replace('-assessment', '')))
      : completedTopics.has(prevTopic.id);
    if (!prevDone) return 'locked';
    return 'available';
  }

  // For other modules (00-03, 05-17):
  return 'available';
}

/**
 * Returns the status of a module: 'completed' | 'current' | 'locked' | 'available'
 */
export function getModuleStatus({
  module,
  completedModules,
  completedTopics,
  completedUnits,
  currentModuleId,
  unlockedAssessments = [],
}: {
  module: CurriculumModule;
  completedModules: Set<string>;
  completedTopics: Set<string>;
  completedUnits: Set<string>;
  currentModuleId: string | null;
  unlockedAssessments?: string[];
}): 'completed' | 'current' | 'locked' | 'available' {
  if (completedModules.has(module.id)) {
    return 'completed';
  }

  if (currentModuleId === module.id) {
    return 'current';
  }

  const isUnlockAll = unlockedAssessments.includes('unlock-all') || unlockedAssessments.includes(module.id);
  if (isUnlockAll) {
    return 'available';
  }

  // Check if module is locked
  if (module.defaultLocked) {
    // If prerequisite (previous module) is not completed, locked
    const prevOrder = module.order - 1;
    const prevModule = CURRICULUM_TREE.find((m) => m.order === prevOrder);
    if (prevModule && !completedModules.has(prevModule.id)) {
      return 'locked';
    }
  }

  return 'available';
}
