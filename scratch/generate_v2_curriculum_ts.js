const fs = require('fs');
const path = require('path');

// Raw module data from CDAC Bengaluru curriculum
const MODULES_RAW = [
  {
    id: '00',
    title: 'Orientation: Your First SOC Shift',
    level: 'Beginner',
    difficulty: 'BEGINNER',
    order: 0,
    theoryHours: 1,
    labHours: 0,
    totalHours: 1,
    mentor: 'Ananya',
    mentorRole: 'Experienced L1 Analyst',
    story: 'You join the CDAC Bengaluru SOC learning environment. Mentor Ananya, an experienced L1 analyst, explains the shift, learning path, lab safety and how to ask for help.',
    units: [
      {
        id: 'M00-U1',
        unitNumber: 1,
        title: 'Welcome to the SOC',
        description: 'Understand your role as an L1 Analyst, the 24/7 operations environment, and how this interactive course works.',
        chapters: [
          {
            id: 'M00-U1-C1',
            title: 'Your first shift and the L1 role',
            duration: 7,
            concept: 'What an L1 analyst does: triaging alerts, following playbooks, and protecting organization assets 24/7 without needing a computer science degree.',
            visualDesc: 'Visual story: Arriving at CDAC Bengaluru SOC, observing screens with incoming events, and Ananya handing you your daily checklist.',
            interactiveDesc: 'Analyst Role Matcher: Match common SOC tasks (Triage, Escalation, Documentation) to the correct tier.',
            questions: [
              {
                question: 'What is the primary responsibility of a Level 1 (L1) SOC Analyst?',
                options: ['Reverse-engineer zero-day exploits', 'Perform initial alert triage, entity identification, and escalate verified threats', 'Re-architect company firewalls', 'Conduct legal press conferences'],
                correctAnswer: 1,
                explanation: 'L1 analysts monitor incoming queues, verify facts (WHO, WHAT, WHERE, WHEN), and escalate confirmed incidents according to playbooks.'
              },
              {
                question: 'Do you need prior hacking or advanced programming skills to start as an L1 analyst?',
                options: ['Yes, must know assembly language', 'No, keen observation, checklist discipline, and curiosity are primary', 'Yes, minimum 5 years in malware authoring', 'Only if working on Linux'],
                correctAnswer: 1,
                explanation: 'L1 operations emphasize disciplined triage, pattern recognition, and following Standard Operating Procedures (SOPs).'
              }
            ]
          },
          {
            id: 'M00-U1-C2',
            title: 'How this course works',
            duration: 7,
            concept: 'The 4-section chapter model: Theory -> Visual Story -> Interactive Activity -> Knowledge Check. Active retention over passive watching.',
            visualDesc: 'Animation: The 4-step workflow displaying progress rings, XP rewards, and immediate feedback loops.',
            interactiveDesc: 'Sequence Arranger: Drag the 4 learning sections into their pedagogical order.',
            questions: [
              {
                question: 'What is the sequence of the 4-section chapter learning flow?',
                options: ['Assessment -> Theory -> Interactive -> Video', 'Theory -> Video/Visual -> Interactive -> Knowledge Check', 'Video -> Lab -> Exam -> Theory', 'Interactive -> Audio -> Reading -> Quiz'],
                correctAnswer: 1,
                explanation: 'Each chapter follows: 1. Theory, 2. Video/Visual Element, 3. Interactive Learning, 4. Knowledge Check.'
              }
            ]
          }
        ],
        assessment: {
          id: 'M00-U1-A',
          title: 'Unit Assessment: Welcome to the SOC',
          duration: 7,
          passingScore: 80,
          xpReward: 50,
          questions: [
            {
              question: 'In the CDAC Bengaluru SOC environment, who is your primary orientation mentor?',
              options: ['Mentor Karthik', 'Mentor Ananya', 'Mentor Ravi', 'Mentor Meera'],
              correctAnswer: 1,
              explanation: 'Mentor Ananya is an experienced L1 analyst who guides your orientation and foundational triage.'
            },
            {
              question: 'When an alert sounds, what is the analyst’s immediate mindset?',
              options: ['Panic and shut down all branch servers', 'Stay calm, verify the facts, and follow standard checklists', 'Ignore it until a manager notices', 'Immediately delete the logs'],
              correctAnswer: 1,
              explanation: 'Discipline and calm fact-gathering prevent knee-jerk errors and alert fatigue.'
            }
          ]
        }
      },
      {
        id: 'M00-U2',
        unitNumber: 2,
        title: 'Learning Safely',
        description: 'Understand safe evidence handling, simulated environments, isolated VMs, and how to ask mentors for guidance.',
        chapters: [
          {
            id: 'M00-U2-C1',
            title: 'Resource packs, simulations and isolated VMs',
            duration: 7,
            concept: 'Practicing safely: Why malware and raw pcaps must remain in sandbox VMs or simulated log packs rather than local workstations.',
            visualDesc: 'Diagram: Isolated VM boundaries showing host-only networking and snapshot rollback safeguards.',
            interactiveDesc: 'Safe Environment Sorter: Categorize analysis tasks into "Safe on Workstation" vs "Requires Isolated Sandbox VM".',
            questions: [
              {
                question: 'Why do we inspect suspicious executable attachments inside an isolated VM?',
                options: ['VMs are faster than real hardware', 'To prevent accidental infection of your primary workstation or network', 'Because Windows cannot open files', 'VMs have better screen resolution'],
                correctAnswer: 1,
                explanation: 'Isolated virtual machines isolate hazardous payloads from production networks and enable clean resets.'
              }
            ]
          },
          {
            id: 'M00-U2-C2',
            title: 'Evidence handling and asking for help',
            duration: 7,
            concept: 'Preserving integrity: never tamper with raw timestamps, record exact steps, and know when to flag questions to mentors.',
            visualDesc: 'Visual guide: Clean handoff note showing exact evidence references versus incomplete assumptions.',
            interactiveDesc: 'Evidence Checklist Builder: Select the 4 critical facts needed before asking a senior mentor for assistance.',
            questions: [
              {
                question: 'What is the best way to ask Mentor Ananya for help with an unfamiliar alert?',
                options: ['Say "the screen looks weird"', 'Provide the Alert ID, user, host, observed timeline, and specific question', 'Wait until your shift ends', 'Forward the alert to the entire company'],
                correctAnswer: 1,
                explanation: 'A structured question with Alert ID and observed evidence allows mentors to give quick, targeted guidance.'
              }
            ]
          }
        ],
        assessment: {
          id: 'M00-U2-A',
          title: 'Unit Assessment: Learning Safely',
          duration: 7,
          passingScore: 80,
          xpReward: 50,
          questions: [
            {
              question: 'What should you do before executing any unfamiliar command or payload in a lab?',
              options: ['Verify you are in an isolated VM or safe sandbox', 'Send it via email to test filters', 'Disable your firewall', 'Execute as Domain Admin'],
              correctAnswer: 0,
              explanation: 'Always verify sandbox isolation to prevent unintended execution.'
            }
          ]
        }
      },
      {
        id: 'M00-U3',
        unitNumber: 3,
        title: 'The Learning Journey',
        description: 'How simulated FinCorp-style alerts reflect enterprise threats in the CDAC learning setting, and how modules connect to shifts.',
        chapters: [
          {
            id: 'M00-U3-C1',
            title: 'FinCorp-style alerts in a CDAC learning setting',
            duration: 6,
            concept: 'Realistic scenario alerts: Investigating user FIN-OPS-01 on BLR-BR-WS-04 using authentic JSON/CSV logs.',
            visualDesc: 'Alert Interface Tour: Highlighting the Alert Queue pane, Alert ID, Timestamp, and Severity badges.',
            interactiveDesc: 'Alert Field Inspector: Click on a live alert card to highlight Source IP, User, and Trigger Rule.',
            questions: [
              {
                question: 'In our course scenarios, what does entity "BLR-BR-WS-04" represent?',
                options: ['A cloud database in Europe', 'Workstation 04 located at the Bengaluru Branch', 'An external hacker group', 'A router serial number'],
                correctAnswer: 1,
                explanation: 'BLR-BR-WS-04 represents Bengaluru Branch Workstation #04.'
              }
            ]
          },
          {
            id: 'M00-U3-C2',
            title: 'How modules connect to a shift',
            duration: 6,
            concept: 'The cumulative learning arc: from host fundamentals (Mod 01) and networking (Mod 02) to SIEM (Mod 05) and Incident Response (Mod 14).',
            visualDesc: 'Flowchart: The 15 modules mapped into foundational, analytical, and incident management stages.',
            interactiveDesc: 'Shift Timeline Tracing: Place daily SOC activities onto an 8-hour shift clock.',
            questions: [
              {
                question: 'Why do we study computer and networking fundamentals before opening a SIEM?',
                options: ['SIEM interfaces require networking knowledge to interpret IP addresses and ports', 'To pass time', 'Because SIEMs do not use computers', 'It is optional and not recommended'],
                correctAnswer: 0,
                explanation: 'Understanding packets, ports, and OS processes allows you to accurately interpret what SIEM logs are telling you.'
              }
            ]
          }
        ],
        assessment: {
          id: 'M00-U3-A',
          title: 'Unit Assessment: The Learning Journey',
          duration: 6,
          passingScore: 80,
          xpReward: 50,
          questions: [
            {
              question: 'How do modules 00 through 14 prepare you for certified L1 readiness?',
              options: ['By providing 50 hours of grounded theory and 40 hours of hands-on tool labs', 'By teaching you how to hack competitors', 'By only requiring multiple choice quizzes', 'By skipping log analysis'],
              correctAnswer: 0,
              explanation: 'The 90-hour curriculum balances 50 hours of structured concept learning with 40 hours of practical lab exercises.'
            }
          ]
        }
      }
    ]
  },
  {
    id: '01',
    title: 'Computer Fundamentals',
    level: 'Beginner',
    difficulty: 'BEGINNER',
    order: 1,
    theoryHours: 2,
    labHours: 1,
    totalHours: 3,
    mentor: 'Ravi',
    mentorRole: 'Workstation & Host Mentor',
    story: 'Mentor Ravi, an experienced L1 analyst, introduces the analyst workstation, operating systems, users, files, processes and basic commands.',
    units: [
      {
        id: 'M01-U1',
        unitNumber: 1,
        title: 'The Analyst Workstation',
        description: 'Hardware, operating systems, user accounts, files, paths, and permissions from an investigation perspective.',
        chapters: [
          {
            id: 'M01-U1-C1',
            title: 'Hardware, OS and accounts',
            duration: 14,
            concept: 'Understanding CPU, RAM, disk, OS architecture, and user accounts (standard vs administrative/root privileges).',
            visualDesc: 'Visual story: Ravi inspecting workstation resources, local accounts, and privilege levels.',
            interactiveDesc: 'Privilege Level Matcher: Distinguish standard user permissions from local admin / root capabilities.',
            questions: [
              {
                question: 'Why are standard office employees not given Administrator privileges by default?',
                options: ['To save RAM', 'To prevent accidental system corruption and limit the impact if an account is compromised', 'Because Windows requires it', 'To reduce electricity consumption'],
                correctAnswer: 1,
                explanation: 'Principle of Least Privilege prevents malware executing under a standard account from modifying core OS files.'
              }
            ]
          },
          {
            id: 'M01-U1-C2',
            title: 'Files, paths and permissions',
            duration: 14,
            concept: 'Windows vs Linux paths, executable extensions (.exe, .bat, .ps1, .sh), hidden files, and read/write/execute permissions.',
            visualDesc: 'Interactive path comparison: C:\\Windows\\System32 vs /etc and /var/log directories.',
            interactiveDesc: 'File Path Inspector: Spot anomalous executable paths like running binaries directly from C:\\Users\\...\\AppData\\Local\\Temp.',
            questions: [
              {
                question: 'Why is an executable launching directly from a user’s Temp directory suspicious?',
                options: ['Temp directories are read-only', 'Standard software installs to Program Files; malware frequently drops into Temp folders', 'Windows deletes Temp every 5 minutes', 'Temp folders only contain text files'],
                correctAnswer: 1,
                explanation: 'Standard users have write permissions in Temp folders, making them a common staging ground for dropped payloads.'
              }
            ]
          }
        ],
        assessment: {
          id: 'M01-U1-A',
          title: 'Unit Assessment: The Analyst Workstation',
          duration: 14,
          passingScore: 80,
          xpReward: 50,
          questions: [
            {
              question: 'Which Linux directory holds system configuration and service definitions?',
              options: ['/tmp', '/etc', '/dev', '/media'],
              correctAnswer: 1,
              explanation: '/etc stores system-wide configuration files.'
            }
          ]
        }
      },
      {
        id: 'M01-U2',
        unitNumber: 2,
        title: 'Processes and Services',
        description: 'What processes and background services do, process trees, and distinguishing routine from unfamiliar activity.',
        chapters: [
          {
            id: 'M01-U2-C1',
            title: 'What processes and services do',
            duration: 13,
            concept: 'Process IDs (PIDs), parent processes (PPID), and background services running independently of logged-in sessions.',
            visualDesc: 'Diagram: A legitimate process tree (explorer.exe -> winword.exe) vs an anomalous tree (winword.exe -> powershell.exe).',
            interactiveDesc: 'Process Lineage Tracing: Trace child PIDs back to their originating parent process.',
            questions: [
              {
                question: 'What is a PPID in operating systems?',
                options: ['Process Protection Identifier', 'Parent Process ID', 'Private Protocol Index', 'Password Packet Identifier'],
                correctAnswer: 1,
                explanation: 'PPID refers to the Process ID of the parent application that spawned the child process.'
              }
            ]
          },
          {
            id: 'M01-U2-C2',
            title: 'Routine versus unfamiliar activity',
            duration: 13,
            concept: 'Establishing host baselines: recognizing standard Windows binaries (svchost.exe, lsass.exe) vs typosquatted names (scvhost.exe).',
            visualDesc: 'Comparison chart: Legitimate system processes vs common masquerading techniques.',
            interactiveDesc: 'Anomaly Spotter: Find the imposter process name among standard system processes.',
            questions: [
              {
                question: 'What makes "svch0st.exe" running from C:\\Users\\Public highly suspicious?',
                options: ['It uses a zero instead of "o" and runs from an unusual directory', 'Windows does not have svchost', 'It is running as a service', 'Public folder is read-only'],
                correctAnswer: 0,
                explanation: 'Adversaries use typosquatting and staging directories (C:\\Users\\Public) to masquerade as core Windows services.'
              }
            ]
          }
        ],
        assessment: {
          id: 'M01-U2-A',
          title: 'Unit Assessment: Processes and Services',
          duration: 13,
          passingScore: 80,
          xpReward: 50,
          questions: [
            {
              question: 'Under normal circumstances, what process spawns user applications after logging into Windows?',
              options: ['explorer.exe', 'lsass.exe', 'smss.exe', 'wininit.exe'],
              correctAnswer: 0,
              explanation: 'Windows Explorer (explorer.exe) represents the user desktop shell and launches user-initiated applications.'
            }
          ]
        }
      },
      {
        id: 'M01-U3',
        unitNumber: 3,
        title: 'Basic System Orientation',
        description: 'Command-line essentials, users, hostnames, timestamps, and gathering basic workstation evidence.',
        chapters: [
          {
            id: 'M01-U3-C1',
            title: 'Command-line essentials',
            duration: 13,
            concept: 'Basic command line utilities on Windows (whoami, hostname, tasklist, netstat) and Linux (whoami, uname -a, ps aux, ss -tlpn).',
            visualDesc: 'Terminal simulation showing output of `whoami /user` and `hostname`.',
            interactiveDesc: 'Command Matcher: Match the investigation question (Who am I logged in as? What ports are open?) to the right command.',
            questions: [
              {
                question: 'Which command quickly displays your current user account in both Windows cmd and Linux bash?',
                options: ['whoami', 'netstat', 'dir', 'ipconfig'],
                correctAnswer: 0,
                explanation: '`whoami` prints the current username in both operating systems.'
              }
            ]
          },
          {
            id: 'M01-U3-C2',
            title: 'Users, hostnames and timestamps',
            duration: 13,
            concept: 'Correlating user account names with machine hostnames and normalizing UTC timestamps across time zones.',
            visualDesc: 'Timeline graphic: Converting local IST (+05:30) event logs into universal UTC timestamps.',
            interactiveDesc: 'Timestamp Normalizer: Match IST timestamps to standard UTC timestamps.',
            questions: [
              {
                question: 'Why do SOC analysts normalize timestamps across different system logs to UTC?',
                options: ['Computers can only count in UTC', 'To accurately reconstruct the sequence of events across servers in different time zones', 'UTC prevents viruses', 'To make logs shorter'],
                correctAnswer: 1,
                explanation: 'Reconstructing an intrusion timeline requires a common reference clock across all distributed endpoints and sensors.'
              }
            ]
          }
        ],
        assessment: {
          id: 'M01-U3-A',
          title: 'Unit Assessment: Basic System Orientation',
          duration: 13,
          passingScore: 80,
          xpReward: 50,
          questions: [
            {
              question: 'Which command lists active network sockets and listening ports on Windows?',
              options: ['netstat -ano', 'hostname', 'taskkill', 'echo'],
              correctAnswer: 0,
              explanation: '`netstat -ano` displays active TCP/UDP connections and associated process IDs.'
            }
          ]
        }
      }
    ]
  }
];

// Helper to fill modules 02 through 14 programmatically from the canonical syllabus
const MODULE_CONFIGS = [
  { id: '02', title: 'Networking Fundamentals', mentor: 'Ravi', mentorRole: 'Network & Branch Mentor', level: 'Beginner', diff: 'BEGINNER', th: 2, lh: 1, tot: 3, story: 'Mentor Ravi walks you through a small CDAC Bengaluru branch network, from a staff laptop to the local switch, gateway, DNS and an internal service.' },
  { id: '03', title: 'Cybersecurity Fundamentals', mentor: 'Ananya', mentorRole: 'Experienced L1 Mentor', level: 'Beginner', diff: 'BEGINNER', th: 2, lh: 1, tot: 3, story: 'Mentor Ananya introduces assets, threats, vulnerabilities, controls and risk using ordinary office and branch scenarios.' },
  { id: '04', title: 'SOC Operations & Alert Triage', mentor: 'Ananya', mentorRole: 'Experienced L1 Mentor', level: 'Beginner', diff: 'BEGINNER', th: 5, lh: 4, tot: 9, story: 'Mentor Ananya coaches you through an alert involving employee user FIN-OPS-01 on BLR-BR-WS-04. You identify entities, check evidence, judge context, set a priority and write an L1 note.' },
  { id: '05', title: 'SIEM Fundamentals & Search', mentor: 'Karthik', mentorRole: 'Senior L1 / SIEM Operator', level: 'Beginner–Intermediate', diff: 'INTERMEDIATE', th: 5, lh: 5, tot: 10, story: 'Mentor Karthik, a senior L1/SIEM operator, shows how branch logs reach a SIEM, how to search them and how detections surface for analysts.' },
  { id: '06', title: 'Log & Event Analysis', mentor: 'Karthik', mentorRole: 'Senior L1 / SIEM Operator', level: 'Beginner–Intermediate', diff: 'INTERMEDIATE', th: 4, lh: 4, tot: 8, story: 'Mentor Karthik helps you compare Windows, Linux, identity and network records, build a basic timeline and distinguish observed facts from assumptions.' },
  { id: '07', title: 'Windows & Linux Security Monitoring', mentor: 'Ravi', mentorRole: 'Host Security Mentor', level: 'Beginner–Intermediate', diff: 'INTERMEDIATE', th: 4, lh: 4, tot: 8, story: 'Mentor Ravi guides you through basic host logs and routine-versus-unusual activity on a branch workstation and Linux server.' },
  { id: '08', title: 'Network Security Monitoring', mentor: 'Meera', mentorRole: 'Network Security Analyst', level: 'Beginner–Intermediate', diff: 'INTERMEDIATE', th: 4, lh: 4, tot: 8, story: 'Mentor Meera, a network security analyst, helps you inspect a supplied packet capture and summarize the evidence behind a network alert.' },
  { id: '09', title: 'Endpoint Detection & Response (EDR)', mentor: 'Ananya', mentorRole: 'Experienced L1 Mentor', level: 'Beginner–Intermediate', diff: 'INTERMEDIATE', th: 3, lh: 3, tot: 6, story: 'Mentor Ananya walks you through endpoint alert context, device/user details and basic file/process evidence, then explains when to escalate.' },
  { id: '10', title: 'Security Ecosystem: XDR, Response Tools & OT/ICS', mentor: 'Karthik', mentorRole: 'Senior Security Architect', level: 'Beginner–Intermediate', diff: 'INTERMEDIATE', th: 3, lh: 1, tot: 4, story: 'Mentor Karthik introduces how XDR, EDR, SIEM, SOAR and case-management tools complement one another, then contrasts office IT with OT/ICS safety and availability needs.' },
  { id: '11', title: 'Identity, Email & Threat Intelligence', mentor: 'Meera', mentorRole: 'Threat Intelligence Analyst', level: 'Beginner–Intermediate', diff: 'INTERMEDIATE', th: 4, lh: 4, tot: 8, story: 'Mentor Meera helps you triage a suspicious sign-in and reported email, then enriches sample indicators using public sources and careful confidence notes.' },
  { id: '12', title: 'SOAR & Basic SOC Automation', mentor: 'Karthik', mentorRole: 'SOC Automation Lead', level: 'Beginner–Intermediate', diff: 'INTERMEDIATE', th: 3, lh: 2, tot: 5, story: 'Mentor Karthik demonstrates a safe, approval-based playbook for repetitive enrichment and notification tasks.' },
  { id: '13', title: 'MITRE ATT&CK for L1 Analysts', mentor: 'Ananya', mentorRole: 'Threat Methodology Mentor', level: 'Beginner–Intermediate', diff: 'INTERMEDIATE', th: 3, lh: 2, tot: 5, story: 'Mentor Ananya shows how to use ATT&CK as a shared vocabulary for observed behavior without overclaiming that a technique mapping proves an attack.' },
  { id: '14', title: 'Incident Response & SOC Documentation', mentor: 'Ananya & Meera', mentorRole: 'Senior Incident Responders', level: 'Beginner–Intermediate', diff: 'INTERMEDIATE', th: 5, lh: 4, tot: 9, story: 'Mentors Ananya and Meera coach you to prepare a timeline, document findings, route escalation, complete a case record and hand over open work.' },
];

const UNIT_TITLES = {
  '02': [
    { title: 'How Branch Devices Connect', desc: 'IP addresses, masks, gateways, switches, routers, and access points in branch offices.', c1: 'IP addresses, masks and gateways', c2: 'Switches, routers and access points', d1: 14, d2: 14, da: 14 },
    { title: 'Name and Address Services', desc: 'DNS, DHCP, ports, and transport protocols (TCP vs UDP).', c1: 'DNS and DHCP', c2: 'Ports, TCP and UDP', d1: 13, d2: 13, da: 13 },
    { title: 'Understanding Branch Architecture', desc: 'Comparing small branch networks with larger multi-switch VLAN environments.', c1: 'Small branch: staff devices, switch, router/firewall, Wi-Fi and shared services', c2: 'Larger branch: VLANs, multiple access switches, server/network segments and central connectivity', d1: 13, d2: 13, da: 13 }
  ],
  '03': [
    { title: 'Security Foundations', desc: 'Assets, threats, vulnerabilities, risk, impact, and likelihood.', c1: 'Assets, threats and vulnerabilities', c2: 'Risk, impact and likelihood', d1: 14, d2: 14, da: 14 },
    { title: 'Common Threats', desc: 'Phishing, credential attacks, malware, insider threats, and network scans.', c1: 'Phishing and credential attacks', c2: 'Malware, insider and network threats', d1: 13, d2: 13, da: 13 },
    { title: 'Defensive Controls', desc: 'Prevention, detection, response, least privilege, and defense-in-depth.', c1: 'Prevention, detection and response', c2: 'Least privilege and defense in depth', d1: 13, d2: 13, da: 13 }
  ],
  '04': [
    { title: 'SOC People and Workflow', desc: 'L1/L2/L3 roles, mentor handoffs, alert queues, triage, and ticket ownership.', c1: 'L1/L2/L3 roles and mentor handoffs', c2: 'Alert queue, triage and ownership', d1: 34, d2: 34, da: 34 },
    { title: 'Events, Alerts and Cases', desc: 'Distinguishing raw events from correlated alerts, and incidents from cases.', c1: 'Event versus alert', c2: 'Incident versus case', d1: 33, d2: 33, da: 33 },
    { title: 'Initial Alert Triage', desc: 'Extracting user, host, IP, time, and count; recording notes and dispositions.', c1: 'Identify user, host, IP, time and count', c2: 'Context, disposition and analyst notes', d1: 33, d2: 33, da: 33 }
  ],
  '05': [
    { title: 'SIEM Purpose and Data', desc: 'What SIEM platforms do, log sources, and ingestion concepts.', c1: 'What SIEM does and does not do', c2: 'Log sources and ingestion concepts', d1: 34, d2: 34, da: 34 },
    { title: 'Searching and Filtering', desc: 'Filtering by fields and time ranges, basic query syntax in OpenSearch/Splunk.', c1: 'Fields, time ranges and filters', c2: 'Basic query logic', d1: 33, d2: 33, da: 33 },
    { title: 'Detection and Use Cases', desc: 'Correlation rules, threshold alerts, and common detection examples.', c1: 'Rules, correlation and alert output', c2: 'Application, identity, host, network and compliance examples', d1: 33, d2: 33, da: 33 }
  ],
  '06': [
    { title: 'Reading Log Records', desc: 'Timestamp, source, fields, outcome, parsing, and normalization concepts.', c1: 'Timestamp, source, fields and outcome', c2: 'Parsing and normalization concepts', d1: 27, d2: 27, da: 27 },
    { title: 'Correlating Basic Events', desc: 'Building simple event timelines and comparing related records across sources.', c1: 'Build a simple timeline', c2: 'Compare related records across sources', d1: 27, d2: 27, da: 27 },
    { title: 'Evidence Quality', desc: 'Corroboration, evidence gaps, uncertainty, and distinguishing facts from inferences.', c1: 'Corroboration, gaps and uncertainty', c2: 'Observed fact versus analyst inference', d1: 26, d2: 26, da: 26 }
  ],
  '07': [
    { title: 'Windows Security Monitoring', desc: 'Windows event logs, Event IDs 4624/4625, logon types, and user activity.', c1: 'Windows event log basics', c2: 'Logon and account activity', d1: 27, d2: 27, da: 27 },
    { title: 'Linux Security Monitoring', desc: 'Linux authentication logs, system logs, users, services, and sudo activity.', c1: 'Authentication and system logs', c2: 'Users, services and sudo activity', d1: 27, d2: 27, da: 27 },
    { title: 'Host Triage', desc: 'Distinguishing baseline from unusual activity; cross-checking user and host context.', c1: 'Baseline and unusual activity', c2: 'Cross-check user and host context', d1: 26, d2: 26, da: 26 }
  ],
  '08': [
    { title: 'Network Visibility', desc: 'Packets, flows, PCAP captures, DNS metadata, and connection states.', c1: 'Packets, flows and PCAP', c2: 'DNS, HTTP(S) and connection metadata', d1: 27, d2: 27, da: 27 },
    { title: 'Inspecting Traffic', desc: 'Display filters, TCP conversation streams, repeated attempts, and scan patterns.', c1: 'Filters and conversations', c2: 'Repeated attempts and scan-like patterns', d1: 27, d2: 27, da: 27 },
    { title: 'Network Alert Triage', desc: 'Source and destination context, writing concise evidence-backed summaries.', c1: 'Source/destination context', c2: 'Write a concise evidence summary', d1: 26, d2: 26, da: 26 }
  ],
  '09': [
    { title: 'EDR Fundamentals', desc: 'Endpoint telemetry, real-time alerts, and comparing EDR with traditional antivirus.', c1: 'Endpoint telemetry and alerts', c2: 'EDR versus traditional antivirus', d1: 20, d2: 20, da: 20 },
    { title: 'Understanding Endpoint Alerts', desc: 'Device, user, file, process context, and timeline evidence analysis.', c1: 'Device, user, file and process context', c2: 'Timeline and alert evidence', d1: 20, d2: 20, da: 20 },
    { title: 'L1 Endpoint Response', desc: 'Validating basic indicators, safe quarantine actions, and escalation boundaries.', c1: 'Validate basic indicators', c2: 'Safe actions and escalation boundaries', d1: 20, d2: 20, da: 20 }
  ],
  '10': [
    { title: 'Security Tool Ecosystem', desc: 'How SIEM, EDR, XDR, SOAR, and case management tools complement one another.', c1: 'SIEM, EDR, XDR and case management', c2: 'SOAR and response-tool roles', d1: 20, d2: 20, da: 20 },
    { title: 'OT/ICS Security Introduction', desc: 'Contrasting office IT with OT/ICS; availability, safety, and segmentation.', c1: 'OT versus office IT', c2: 'Availability, safety and segmentation', d1: 20, d2: 20, da: 20 },
    { title: 'Response Boundaries', desc: 'Common response actions at a high level; knowing when to stop, seek approval, and escalate.', c1: 'Common response actions at a high level', c2: 'When to stop, seek approval and escalate', d1: 20, d2: 20, da: 20 }
  ],
  '11': [
    { title: 'Identity Monitoring', desc: 'Authentication, Multi-Factor Authentication (MFA), sign-ins, and privileged accounts.', c1: 'Authentication, MFA and sign-ins', c2: 'Privileged accounts and context', d1: 27, d2: 27, da: 27 },
    { title: 'Email Security Triage', desc: 'Sender, reply-to, URLs, attachments, and safe handling of suspicious messages.', c1: 'Sender, reply-to, URLs and attachments', c2: 'Safe handling of suspicious messages', d1: 27, d2: 27, da: 27 },
    { title: 'Threat Intelligence Basics', desc: 'IOC types, reputation sources, confidence ratings, freshness, and context.', c1: 'IOC types and reputation sources', c2: 'Confidence, freshness and context', d1: 26, d2: 26, da: 26 }
  ],
  '12': [
    { title: 'Automation Concepts', desc: 'Triggers, actions, playbooks, enrichment, and notification use cases.', c1: 'Triggers, actions and playbooks', c2: 'Enrichment and notification use cases', d1: 20, d2: 20, da: 20 },
    { title: 'Safe Workflow Design', desc: 'Conditions, human approval gates, failure handling, logging, and auditability.', c1: 'Conditions and approval gates', c2: 'Failure handling, logging and auditability', d1: 20, d2: 20, da: 20 },
    { title: 'L1 Automation Boundaries', desc: 'Human review, reversible actions, and what must never run automatically.', c1: 'Human review and reversible actions', c2: 'What must not run automatically', d1: 20, d2: 20, da: 20 }
  ],
  '13': [
    { title: 'ATT&CK Basics', desc: 'Tactics, techniques, procedures (TTPs), and using the matrix as a common vocabulary.', c1: 'Tactics, techniques and procedures', c2: 'Using the matrix as a vocabulary', d1: 20, d2: 20, da: 20 },
    { title: 'Map Basic Observations', desc: 'Credential access and discovery examples; choosing plausible techniques carefully.', c1: 'Credential access and discovery examples', c2: 'Choose a plausible technique carefully', d1: 20, d2: 20, da: 20 },
    { title: 'Communicate the Mapping', desc: 'Evidence, uncertainty, and avoiding premature inference of full attack chains.', c1: 'Evidence and uncertainty', c2: 'Do not infer a full attack chain', d1: 20, d2: 20, da: 20 }
  ],
  '14': [
    { title: 'Incident Response Lifecycle', desc: 'NIST/SANS lifecycle phases: preparation, detection, response, recovery, and L1 handoffs.', c1: 'Preparation, detection, response and recovery', c2: 'L1 responsibilities and escalation', d1: 34, d2: 34, da: 34 },
    { title: 'Case Documentation', desc: 'Building timelines, linking evidence, clear notes, severity ratings, and confidence.', c1: 'Timeline, evidence and clear notes', c2: 'Severity, confidence and disposition', d1: 33, d2: 33, da: 33 },
    { title: 'Handover and Closure', desc: 'Escalation paths, case ownership, shift handovers, and lessons learned.', c1: 'Escalation path and ownership', c2: 'Shift handover and lessons learned', d1: 33, d2: 33, da: 33 }
  ]
};

// Build all 15 modules
const allModules = [...MODULES_RAW];

for (const cfg of MODULE_CONFIGS) {
  const unitsSpec = UNIT_TITLES[cfg.id];
  const builtUnits = unitsSpec.map((uSpec, uIdx) => {
    const unitNum = uIdx + 1;
    const unitId = `M${cfg.id}-U${unitNum}`;
    return {
      id: unitId,
      unitNumber: unitNum,
      title: uSpec.title,
      description: uSpec.desc,
      chapters: [
        {
          id: `${unitId}-C1`,
          title: uSpec.c1,
          duration: uSpec.d1,
          concept: `Core concepts for ${uSpec.c1} explained for L1 SOC analysts in the CDAC Bengaluru learning setting.`,
          visualDesc: `Visual story for ${uSpec.c1} illustrating key evidence indicators and workflow steps.`,
          interactiveDesc: `Hands-on activity: Identify and match key elements of ${uSpec.c1}.`,
          questions: [
            {
              question: `What is the key takeaway when evaluating ${uSpec.c1} in an L1 operational setting?`,
              options: [
                'Always verify the observed evidence and correlate across multiple records',
                'Assume the first alarm is 100% correct without checking',
                'Delete the log entry to reduce ticket queue count',
                'Immediately shutdown the entire branch network'
              ],
              correctAnswer: 0,
              explanation: `Careful verification and corroborating facts across sources prevents false alarms and ensures high evidence quality.`
            }
          ]
        },
        {
          id: `${unitId}-C2`,
          title: uSpec.c2,
          duration: uSpec.d2,
          concept: `Operational application of ${uSpec.c2} during alert triage and analyst shifts.`,
          visualDesc: `Interface walkthrough and telemetry demo for ${uSpec.c2}.`,
          interactiveDesc: `Interactive investigation: Analyze sample records related to ${uSpec.c2}.`,
          questions: [
            {
              question: `How does understanding ${uSpec.c2} assist an L1 analyst on shift?`,
              options: [
                'It allows distinguishing normal baseline operations from suspicious outliers',
                'It guarantees zero alerts will ever trigger',
                'It replaces the need for a SIEM',
                'It eliminates the need for supervisor handoffs'
              ],
              correctAnswer: 0,
              explanation: `Understanding expected baseline behaviors enables analysts to quickly spot deviations and anomalous patterns.`
            }
          ]
        }
      ],
      assessment: {
        id: `${unitId}-A`,
        title: `Unit Assessment: ${uSpec.title}`,
        duration: uSpec.da,
        passingScore: 80,
        xpReward: 50,
        questions: [
          {
            question: `In Unit ${unitNum} (${uSpec.title}), what is the primary standard for documenting findings?`,
            options: [
              'Clear facts with supporting timestamps, host, and user references',
              'Personal opinions without log evidence',
              'One-word answers without context',
              'Forwarding raw screenshots without explanation'
            ],
            correctAnswer: 0,
            explanation: 'Professional SOC documentation requires specific facts, timestamps, and verifiable references.'
          }
        ]
      }
    };
  });

  allModules.push({
    id: cfg.id,
    title: cfg.title,
    level: cfg.level,
    difficulty: cfg.diff,
    order: parseInt(cfg.id, 10),
    theoryHours: cfg.th,
    labHours: cfg.lh,
    totalHours: cfg.tot,
    mentor: cfg.mentor,
    mentorRole: cfg.mentorRole,
    story: cfg.story,
    units: builtUnits
  });
}

// All 40 Labs
const ALL_LABS = [
  { id: 'LAB-01', moduleId: '01', module: 'Computer Fundamentals', title: 'Orient yourself in Ubuntu', format: 'Live VM', duration: 40, tools: 'Ubuntu Server 24.04; terminal', objective: 'Identify the VM, current account and core system context.', mentor: 'Ravi', tasks: ['Run hostname and identify the OS', 'Identify current user and working directory', 'List three running processes with ps aux'], outcome: 'A short workstation inventory with commands and observations.', evidence: 'Learner submits terminal log and brief explanation.' },
  { id: 'LAB-02', moduleId: '02', module: 'Networking Fundamentals', title: 'Trace a small-branch network', format: 'Simulated Lab', duration: 45, tools: 'draw.io; branch diagram; Wireshark capture', objective: 'Trace a device-to-service path and label basic network components.', mentor: 'Ravi', tasks: ['Label staff laptop, switch, gateway and DNS', 'Trace route to internal service', 'Identify source/destination IPs and ports in capture'], outcome: 'Annotated small-branch network diagram and traffic worksheet.', evidence: 'Learner submits diagram and traffic summary.' },
  { id: 'LAB-03', moduleId: '03', module: 'Cybersecurity Fundamentals', title: 'Classify a branch security scenario', format: 'Simulated Lab', duration: 45, tools: 'Scenario cards; spreadsheet/browser', objective: 'Distinguish assets, threats, vulnerabilities, controls and impact.', mentor: 'Ananya', tasks: ['Identify two key assets', 'Match threat and system weakness', 'Choose relevant security control', 'Write one-sentence risk rationale'], outcome: 'Completed scenario worksheet with evidence-based reasoning.', evidence: 'Learner submits completed scenario worksheet.' },
  { id: 'LAB-04', moduleId: '04', module: 'SOC Operations & Alert Triage', title: 'Read the incoming alert', format: 'Simulated Lab', duration: 55, tools: 'JSON/CSV alert bundle; spreadsheet', objective: 'Extract key fields required for first-pass triage.', mentor: 'Ananya', tasks: ['Find user, host, source IP and timestamp', 'Record attempt count and alert reason', 'Identify two missing context fields'], outcome: 'Alert triage worksheet for FIN-OPS-01 on BLR-BR-WS-04.', evidence: 'Learner submits triage worksheet.' },
  { id: 'LAB-05', moduleId: '04', module: 'SOC Operations & Alert Triage', title: 'Build a login timeline', format: 'Simulated Lab', duration: 65, tools: 'Authentication CSV; spreadsheet', objective: 'Order relevant events and note what they do and do not prove.', mentor: 'Ananya', tasks: ['Sort records chronologically', 'Mark failed and successful logons', 'Highlight first relevant sequence', 'Write one cautious finding'], outcome: 'Timeline plus short evidence summary.', evidence: 'Learner submits timeline file.' },
  { id: 'LAB-06', moduleId: '04', module: 'SOC Operations & Alert Triage', title: 'Context and false-positive decision', format: 'Simulated Lab', duration: 60, tools: 'Scenario cards; alert bundle', objective: 'Classify examples as expected, benign or suspicious using context.', mentor: 'Ananya', tasks: ['Review user, device, and source context', 'Classify each of 3 scenarios', 'Choose strongest supporting evidence', 'Record uncertainty notes'], outcome: 'Three reasoned decisions and one escalation trigger.', evidence: 'Learner submits decision rationale.' },
  { id: 'LAB-07', moduleId: '04', module: 'SOC Operations & Alert Triage', title: 'Write an L1 handoff', format: 'Simulated Lab', duration: 70, tools: 'Case-note template; TheHive CE optional', objective: 'Produce a concise, audit-grade case note.', mentor: 'Ananya', tasks: ['Summarize what triggered alert', 'Record entities and time window', 'List evidence and limitations', 'Recommend close, monitor, or escalate'], outcome: 'Reviewable case note with disposition and rationale.', evidence: 'Learner submits case note artifact.' },
  { id: 'LAB-08', moduleId: '05', module: 'SIEM Fundamentals & Search', title: 'Explore a SIEM interface', format: 'Live VM', duration: 90, tools: 'OpenSearch + Dashboards; sample logs', objective: 'Understand dashboard, index/data view and basic search workflow.', mentor: 'Karthik', tasks: ['Open prepared dashboard', 'Locate supplied log dataset', 'Filter by time and user', 'Capture three matching records'], outcome: 'Screenshots and saved query with brief interpretation.', evidence: 'Learner submits query screenshots.' },
  { id: 'LAB-09', moduleId: '05', module: 'SIEM Fundamentals & Search', title: 'Search security events', format: 'Simulated Lab', duration: 55, tools: 'OpenSearch Dashboards / prepared demo; JSON logs', objective: 'Use basic filters to find events relevant to an alert.', mentor: 'Karthik', tasks: ['Set time range', 'Filter by user or host', 'Filter by event outcome', 'Record matching results'], outcome: 'Query/filter worksheet and matching records.', evidence: 'Learner submits worksheet.' },
  { id: 'LAB-10', moduleId: '05', module: 'SIEM Fundamentals & Search', title: 'Inspect fields across sources', format: 'Simulated Lab', duration: 50, tools: 'Windows/Linux logs; spreadsheet', objective: 'Recognize common fields and source-specific differences.', mentor: 'Karthik', tasks: ['Find timestamp, user, host fields', 'Compare outcome fields', 'Map equivalent fields into common table'], outcome: 'Common-field mapping table.', evidence: 'Learner submits mapping table.' },
  { id: 'LAB-11', moduleId: '05', module: 'SIEM Fundamentals & Search', title: 'Review a simple detection', format: 'Simulated Lab', duration: 60, tools: 'Sample SIEM alert with linked records', objective: 'Explain why the detection generated an alert.', mentor: 'Karthik', tasks: ['Read detection reason', 'Open linked records', 'Identify supporting evidence', 'Write one limitation'], outcome: 'Detection explanation with evidence references.', evidence: 'Learner submits analysis.' },
  { id: 'LAB-12', moduleId: '05', module: 'SIEM Fundamentals & Search', title: 'Build a basic dashboard view', format: 'Simulated Lab', duration: 65, tools: 'OpenSearch Dashboards / screenshot pack', objective: 'Understand a simple alert-count/time visualization and limits.', mentor: 'Karthik', tasks: ['Inspect visualization and filters', 'Identify busiest time window', 'Compare counts by source', 'Write one useful observation'], outcome: 'Annotated dashboard screenshot or chart summary.', evidence: 'Learner submits dashboard summary.' },
  { id: 'LAB-13', moduleId: '06', module: 'Log & Event Analysis', title: 'Read Windows event records', format: 'Simulated Lab', duration: 50, tools: 'EVTX-to-CSV/JSON sample; screenshots', objective: 'Identify core fields in a Windows security record.', mentor: 'Karthik', tasks: ['Locate event time and category', 'Identify account and workstation fields', 'Record success/failure outcome'], outcome: 'Annotated event worksheet.', evidence: 'Learner submits annotated worksheet.' },
  { id: 'LAB-14', moduleId: '06', module: 'Log & Event Analysis', title: 'Compare mixed log formats', format: 'Simulated Lab', duration: 55, tools: 'Windows/Linux samples; spreadsheet', objective: 'Map equivalent fields across disparate log sources.', mentor: 'Karthik', tasks: ['Identify timestamp formats', 'Map user and host fields', 'Map outcome/action fields', 'Note one source-specific field'], outcome: 'Completed field normalization table.', evidence: 'Learner submits table.' },
  { id: 'LAB-15', moduleId: '06', module: 'Log & Event Analysis', title: 'Build a multi-source timeline', format: 'Simulated Lab', duration: 70, tools: 'Auth and network records; spreadsheet', objective: 'Create a simple chronology with evidence references.', mentor: 'Karthik', tasks: ['Normalize times to one timezone', 'Sort records', 'Link only supported records', 'Mark observed facts vs inference'], outcome: 'Timeline with references and uncertainty notes.', evidence: 'Learner submits timeline file.' },
  { id: 'LAB-16', moduleId: '06', module: 'Log & Event Analysis', title: 'Review evidence gaps', format: 'Simulated Lab', duration: 65, tools: 'Alert plus incomplete log bundle', objective: 'Identify missing context before making strong conclusions.', mentor: 'Karthik', tasks: ['List available evidence', 'Identify at least two gaps', 'Choose next useful data source', 'Write cautious assessment'], outcome: 'Evidence-gap checklist and recommendation.', evidence: 'Learner submits checklist.' },
  { id: 'LAB-17', moduleId: '07', module: 'Windows & Linux Security Monitoring', title: 'Explore Windows Event Viewer', format: 'Live VM', duration: 75, tools: 'Windows 10/11 VM; Event Viewer', objective: 'Locate security logs and interpret basic logon events.', mentor: 'Ravi', tasks: ['Open Windows Event Viewer', 'Navigate to Windows Logs > Security', 'Filter for logon events (4624/4625)', 'Record event time, account, result'], outcome: 'Screenshots or exported records plus interpretation.', evidence: 'Learner submits event export.' },
  { id: 'LAB-18', moduleId: '07', module: 'Windows & Linux Security Monitoring', title: 'Review Linux authentication logs', format: 'Live VM', duration: 65, tools: 'Ubuntu Server 24.04; journalctl', objective: 'Find authentication and privilege-use evidence safely.', mentor: 'Ravi', tasks: ['Inspect recent authentication messages', 'Find login example in logs', 'Review sudo-related activity', 'Summarize result'], outcome: 'Command output and brief finding.', evidence: 'Learner submits terminal log.' },
  { id: 'LAB-19', moduleId: '07', module: 'Windows & Linux Security Monitoring', title: 'Compare normal and unusual host activity', format: 'Simulated Lab', duration: 55, tools: 'Host log bundle; spreadsheet', objective: 'Compare activity against a simple stated baseline.', mentor: 'Ravi', tasks: ['Group events by user or host', 'Identify one outlier', 'Check timestamp and context', 'State alternative benign explanation'], outcome: 'Normal-versus-unusual comparison table.', evidence: 'Learner submits comparison table.' },
  { id: 'LAB-20', moduleId: '07', module: 'Windows & Linux Security Monitoring', title: 'Write a host triage note', format: 'Simulated Lab', duration: 45, tools: 'Host log bundle; case-note template', objective: 'Communicate a host finding without overclaiming.', mentor: 'Ravi', tasks: ['Summarize observed activity', 'Reference two records', 'List one limitation', 'Recommend next step'], outcome: 'Concise host triage note.', evidence: 'Learner submits triage note.' },
  { id: 'LAB-21', moduleId: '08', module: 'Network Security Monitoring', title: 'Wireshark interface orientation', format: 'Live VM', duration: 80, tools: 'Wireshark; sample PCAP', objective: 'Learn packet list, packet details, filters, and conversation panes.', mentor: 'Meera', tasks: ['Open supplied PCAP', 'Locate packet list and details', 'Apply basic display filter', 'Follow one TCP conversation'], outcome: 'Annotated screenshot and flow description.', evidence: 'Learner submits screenshot and summary.' },
  { id: 'LAB-22', moduleId: '08', module: 'Network Security Monitoring', title: 'Inspect DNS and web traffic', format: 'Simulated Lab', duration: 55, tools: 'Wireshark; supplied PCAP', objective: 'Identify DNS lookups and destination connections.', mentor: 'Meera', tasks: ['Filter DNS traffic', 'Record queried domain and response IP', 'Find related destination connection', 'Note what TLS encryption conceals'], outcome: 'Domain/IP worksheet with evidence.', evidence: 'Learner submits worksheet.' },
  { id: 'LAB-23', moduleId: '08', module: 'Network Security Monitoring', title: 'Review repeated connections', format: 'Simulated Lab', duration: 65, tools: 'Wireshark; sample PCAP', objective: 'Recognize repeated connection attempts without premature alarm.', mentor: 'Meera', tasks: ['Filter by source address', 'Compare destination ports', 'Identify time window and frequency', 'Write balanced assessment'], outcome: 'Network observation with endpoints and timeframe.', evidence: 'Learner submits assessment.' },
  { id: 'LAB-24', moduleId: '08', module: 'Network Security Monitoring', title: 'Summarize a network alert', format: 'Simulated Lab', duration: 40, tools: 'PCAP and alert card; case template', objective: 'Tie visible traffic to alert fields and state limitations.', mentor: 'Meera', tasks: ['Match time and endpoints', 'Select relevant packets', 'Record one supported finding', 'Recommend close or escalate'], outcome: 'Evidence-backed network triage summary.', evidence: 'Learner submits summary.' },
  { id: 'LAB-25', moduleId: '09', module: 'Endpoint Detection & Response (EDR)', title: 'Read an endpoint alert view', format: 'Simulated Lab', duration: 50, tools: 'EDR alert export; annotated screenshots', objective: 'Identify device, user, time, severity and available evidence.', mentor: 'Ananya', tasks: ['Find device and user', 'Read alert reason and severity', 'Locate file/hash fields if present', 'Flag missing fields'], outcome: 'Endpoint alert summary.', evidence: 'Learner submits alert summary.' },
  { id: 'LAB-26', moduleId: '09', module: 'Endpoint Detection & Response (EDR)', title: 'Review endpoint event context', format: 'Simulated Lab', duration: 60, tools: 'Endpoint event bundle; JSON/CSV viewer', objective: 'Order a small set of endpoint records by time and device.', mentor: 'Ananya', tasks: ['Sort records by time', 'Match device and user', 'Identify related process records', 'Separate fact from inference'], outcome: 'Basic endpoint timeline.', evidence: 'Learner submits timeline.' },
  { id: 'LAB-27', moduleId: '09', module: 'Endpoint Detection & Response (EDR)', title: 'Choose an L1 endpoint disposition', format: 'Simulated Lab', duration: 50, tools: 'Endpoint scenarios; response policy', objective: 'Choose a policy-aligned next step.', mentor: 'Ananya', tasks: ['Review scenario and evidence', 'Choose close, monitor, or escalate', 'State what evidence supports choice'], outcome: 'Disposition with concise rationale.', evidence: 'Learner submits disposition note.' },
  { id: 'LAB-28', moduleId: '10', module: 'Security Ecosystem: XDR, Response Tools & OT/ICS', title: 'Explore the security ecosystem and OT boundary', format: 'Simulated Lab', duration: 60, tools: 'Tool-role cards; branch diagrams', objective: 'Distinguish SIEM, EDR, XDR, SOAR, case management and OT monitoring.', mentor: 'Karthik', tasks: ['Match tool categories to purposes', 'Trace one endpoint alert across tools', 'Compare office IT and OT priorities', 'Complete safety-first escalation checklist'], outcome: 'Tool-to-purpose map and OT-safe checklist.', evidence: 'Learner submits checklist.' },
  { id: 'LAB-29', moduleId: '11', module: 'Identity, Email & Threat Intelligence', title: 'Inspect a suspicious email safely', format: 'Simulated Lab', duration: 55, tools: 'Sample .eml; text viewer; screenshots', objective: 'Review sender, reply-to, URLs and attachment names without opening files.', mentor: 'Meera', tasks: ['Compare From and Reply-To', 'Inspect URL text without visiting', 'Record attachment names', 'Identify two indicators'], outcome: 'Email triage worksheet.', evidence: 'Learner submits email worksheet.' },
  { id: 'LAB-30', moduleId: '11', module: 'Identity, Email & Threat Intelligence', title: 'Review identity sign-in records', format: 'Simulated Lab', duration: 55, tools: 'Sign-in CSV/JSON; spreadsheet', objective: 'Check identity context and authentication details.', mentor: 'Meera', tasks: ['Find user, IP, and time', 'Check MFA and outcome fields', 'Compare with expected user context', 'Write cautious assessment'], outcome: 'Identity triage note.', evidence: 'Learner submits identity note.' },
  { id: 'LAB-31', moduleId: '11', module: 'Identity, Email & Threat Intelligence', title: 'Enrich sample indicators', format: 'Simulated Lab', duration: 60, tools: 'MITRE ATT&CK; URLhaus; VirusTotal optional', objective: 'Check an indicator using trusted sources and note limitations.', mentor: 'Meera', tasks: ['Identify indicator type', 'Check approved source or offline snapshot', 'Record source and lookup time', 'Rate confidence with a caveat'], outcome: 'IOC enrichment table with source and confidence.', evidence: 'Learner submits IOC table.' },
  { id: 'LAB-32', moduleId: '11', module: 'Identity, Email & Threat Intelligence', title: 'Create a phishing handoff', format: 'Simulated Lab', duration: 70, tools: 'Sample email, sign-in logs, case template', objective: 'Combine email and identity evidence into one concise handoff.', mentor: 'Meera', tasks: ['Summarize the report', 'List indicators and evidence', 'Connect identity context only when supported', 'Recommend escalation or closure'], outcome: 'Phishing case note with references.', evidence: 'Learner submits case note.' },
  { id: 'LAB-33', moduleId: '12', module: 'SOAR & Basic SOC Automation', title: 'Map a safe triage playbook', format: 'Simulated Lab', duration: 65, tools: 'draw.io; playbook cards', objective: 'Arrange a simple enrichment and notification workflow.', mentor: 'Karthik', tasks: ['Place trigger and inputs', 'Add enrichment step', 'Add analyst approval gate', 'Add outcome and audit record'], outcome: 'Playbook diagram with human approval gate.', evidence: 'Learner submits playbook diagram.' },
  { id: 'LAB-34', moduleId: '12', module: 'SOAR & Basic SOC Automation', title: 'Test playbook branches', format: 'Simulated Lab', duration: 55, tools: 'Scenario JSON/CSV; playbook logic', objective: 'Check benign and suspicious paths in a mock workflow.', mentor: 'Karthik', tasks: ['Run through two supplied cases', 'Choose branch conditions', 'Identify a failure case', 'Add a guardrail'], outcome: 'Decision table and guardrail notes.', evidence: 'Learner submits decision table.' },
  { id: 'LAB-35', moduleId: '13', module: 'MITRE ATT&CK for L1 Analysts', title: 'Map observed behavior to ATT&CK', format: 'Simulated Lab', duration: 65, tools: 'MITRE ATT&CK website; behavior cards', objective: 'Map an observation to a plausible technique using evidence.', mentor: 'Ananya', tasks: ['Read observed behavior', 'Find relevant ATT&CK technique', 'Record supporting evidence', 'Write one uncertainty'], outcome: 'Technique mapping worksheet.', evidence: 'Learner submits mapping worksheet.' },
  { id: 'LAB-36', moduleId: '13', module: 'MITRE ATT&CK for L1 Analysts', title: 'Prepare an ATT&CK handoff', format: 'Simulated Lab', duration: 55, tools: 'Alert narrative; ATT&CK Navigator optional', objective: 'Communicate behavior and mapping without overclaiming.', mentor: 'Ananya', tasks: ['Summarize observed behavior', 'Add technique only if supported', 'Cite evidence', 'State what is not yet known'], outcome: 'One-page evidence-led summary.', evidence: 'Learner submits summary.' },
  { id: 'LAB-37', moduleId: '14', module: 'Incident Response & SOC Documentation', title: 'Create an incident timeline', format: 'Simulated Lab', duration: 55, tools: 'Provided logs; timeline template', objective: 'Build a chronological record with references.', mentor: 'Ananya & Meera', tasks: ['Order records and normalize timezone', 'Add source references', 'Separate facts from assumptions'], outcome: 'Timeline suitable for case review.', evidence: 'Learner submits timeline file.' },
  { id: 'LAB-38', moduleId: '14', module: 'Incident Response & SOC Documentation', title: 'Complete a case record in TheHive', format: 'Live VM', duration: 90, tools: 'TheHive Community Edition / local sandbox', objective: 'Populate a basic case record using supplied evidence.', mentor: 'Ananya & Meera', tasks: ['Create/open the case', 'Add summary and observables', 'Record evidence and assessment', 'Set status/owner and next step'], outcome: 'Completed case record with evidence and disposition.', evidence: 'Learner submits case record export.' },
  { id: 'LAB-39', moduleId: '14', module: 'Incident Response & SOC Documentation', title: 'Practice escalation and closure', format: 'Simulated Lab', duration: 60, tools: 'Escalation policy; scenario cards', objective: 'Route a case to the right owner and document why.', mentor: 'Ananya & Meera', tasks: ['Select receiving team', 'Attach key facts and timeline', 'State reason and urgency', 'Record outstanding questions'], outcome: 'Escalation/closure decision and rationale.', evidence: 'Learner submits decision artifact.' },
  { id: 'LAB-40', moduleId: '14', module: 'Incident Response & SOC Documentation', title: 'Shift handover simulation', format: 'Simulated Lab', duration: 75, tools: 'Three learning cases; handover template', objective: 'Prioritize open cases and hand over work clearly.', mentor: 'Ananya & Meera', tasks: ['Review three open cases', 'Order by urgency using policy', 'Record owner and status', 'Write next action for each'], outcome: 'Concise shift handover summary.', evidence: 'Learner submits handover summary.' },
];

console.log('Modules compiled:', allModules.length);
console.log('Total Units:', allModules.reduce((acc, m) => acc + m.units.length, 0));
console.log('Total Chapters:', allModules.reduce((acc, m) => acc + m.units.reduce((uAcc, u) => uAcc + u.chapters.length, 0), 0));
console.log('Total Labs:', ALL_LABS.length);

const tsContent = `// CDAC BENGALURU — SOC ANALYST L1 (VERSION 2 CURRICULUM)
// 90-hour story-based curriculum | 50h theory + 40h practical labs | 15 Modules, 45 Units, 90 Chapters, 45 Assessments, 40 Labs

export interface ChapterSection1Theory {
  title: string;
  subtitle: string;
  content: string;
  keyTakeaway: string;
  cdacScenario: string;
  audioUrl?: string;
  audioDuration?: string;
}

export interface VisualStep {
  id: number;
  stage: string;
  title: string;
  description: string;
  telemetrySnippet?: string;
  highlightText?: string;
}

export interface AnnotatedScreenshot {
  id: string;
  url: string;
  title: string;
  caption: string;
  whatToNotice: string;
  whyItMatters: string;
}

export interface ChapterSection2Visual {
  title: string;
  visualType: 'animated-story' | 'diagram' | 'interface-tour' | 'flowchart' | 'packet-flow';
  description: string;
  steps: VisualStep[];
  optionalScreenshots: AnnotatedScreenshot[];
}

export interface InteractiveItem {
  id: string;
  category?: string;
  label: string;
  description?: string;
  summary: string;
  matchedId?: string;
}

export interface ChapterSection3Interactive {
  title: string;
  type: 'matching' | 'sorting' | 'clue-reveal' | 'drag-drop' | 'packet-trace';
  instructions: string;
  scenario?: string;
  items: InteractiveItem[];
}

export interface QuestionItem {
  id?: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface ChapterSection4KnowledgeCheck {
  title: string;
  questions: QuestionItem[];
}

export interface V2Chapter {
  id: string;
  chapterNumber: number;
  title: string;
  duration: number; // minutes
  xpReward: number;
  mentor: string;
  mentorRole: string;
  story: string;
  section1_theory: ChapterSection1Theory;
  section2_visual: ChapterSection2Visual;
  section3_interactive: ChapterSection3Interactive;
  section4_knowledgeCheck: ChapterSection4KnowledgeCheck;
}

export interface V2UnitAssessment {
  id: string;
  title: string;
  duration: number;
  passingScore: number;
  xpReward: number;
  questions: QuestionItem[];
}

export interface V2Unit {
  id: string;
  unitNumber: number;
  title: string;
  description: string;
  chapters: V2Chapter[];
  assessment: V2UnitAssessment;
}

export interface V2Module {
  id: string;
  title: string;
  level: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  order: number;
  theoryHours: number;
  labHours: number;
  totalHours: number;
  mentor: string;
  mentorRole: string;
  story: string;
  units: V2Unit[];
}

export interface V2Lab {
  id: string;
  moduleId: string;
  module: string;
  title: string;
  format: 'Live VM' | 'Simulated Lab';
  duration: number; // minutes
  tools: string;
  objective: string;
  mentor: string;
  tasks: string[];
  outcome: string;
  evidence: string;
}

export const V2_MODULES: V2Module[] = ${JSON.stringify(allModules, null, 2)};

export const V2_LABS: V2Lab[] = ${JSON.stringify(ALL_LABS, null, 2)};
`;

const outputPath = path.join(process.cwd(), 'src/data/curriculum-v2-data.ts');
fs.writeFileSync(outputPath, tsContent, 'utf8');
console.log('✅ Written curriculum-v2-data.ts successfully to', outputPath);

// 1. Sync .data/curriculum-v2-store.json
const v2StorePath = path.join(process.cwd(), '.data/curriculum-v2-store.json');
fs.writeFileSync(v2StorePath, JSON.stringify(allModules, null, 2), 'utf8');
console.log('✅ Synchronized .data/curriculum-v2-store.json');

// 2. Sync .data/labs-v2-store.json
const labsStorePath = path.join(process.cwd(), '.data/labs-v2-store.json');
fs.writeFileSync(labsStorePath, JSON.stringify(ALL_LABS, null, 2), 'utf8');
console.log('✅ Synchronized .data/labs-v2-store.json');

// 3. Sync .data/local-store.json modules
const storePath = path.join(process.cwd(), '.data/local-store.json');
if (fs.existsSync(storePath)) {
  const store = JSON.parse(fs.readFileSync(storePath, 'utf8'));
  store.modules = allModules.map((m) => ({
    id: m.id,
    title: m.title,
    description: m.story,
    order: m.order,
    difficulty: m.difficulty,
    estimatedHours: m.totalHours,
    resourceLabs: m.units.length,
    liveLabs: m.units.length,
    isPublished: true,
    isLocked: false,
    learningObjectives: [
      `Master core principles of ${m.title} in the CDAC Bengaluru learning setting.`,
      `Learn with mentor ${m.mentor} (${m.mentorRole}).`,
      `Understand theoretical frameworks and complete practical exercises.`,
      `Complete unit assessments and hands-on lab requirements.`
    ],
    prerequisites: m.order === 0 ? [] : [String(m.order - 1).padStart(2, '0')]
  }));
  fs.writeFileSync(storePath, JSON.stringify(store, null, 2), 'utf8');
  console.log('✅ Synchronized .data/local-store.json with 15 V2 modules');
}

