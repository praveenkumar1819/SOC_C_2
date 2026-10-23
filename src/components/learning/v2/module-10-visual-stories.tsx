'use client';

import { VisualNodeItem } from './interactive-visual-story-engine';

// =============================================================================
// MODULE 10: SECURITY ECOSYSTEM: XDR, RESPONSE TOOLS & OT/ICS — NODE DEFINITIONS (18 Bespoke Models)
// Guide: Mentor Karthik (Senior Security Architect & OT/ICS Industrial Control Specialist / Incident Commander)
// Motto: "These tools complement one another. SOAR coordinates, it does not command. OT systems move something physical. Boundaries protect people and processes. Knowing when to stop is the mark of a true analyst."
// =============================================================================

// -----------------------------------------------------------------------------
// CHAPTER 1: M10-U1-C1 (One investigation, several workbenches)
// -----------------------------------------------------------------------------

// 1. Pillar 1: The Multi-Workbench Ecosystem (Case Record at the Center)
export const multiWorkbenchEcosystemNodes: VisualNodeItem[] = [
  {
    id: 'bench-case-record',
    label: '1. Central Incident Case Record (The Hub)',
    sub: 'Case #2026-881 Master Dossier',
    badge: 'CORE REPOSITORY',
    description: 'The master case ticket repository sits at the center of the investigation, preserving timestamps, observations, analyst decisions, and evidentiary chain of custody.',
    details: 'Mentor Karthik emphasizes: "These tools complement one another. Case management preserves the work, decisions, and ownership across them."',
    tags: ['Master Case: #2026-881', 'Central Hub', 'Chain of Custody', 'Cross-Tool Dossier'],
  },
  {
    id: 'bench-siem-logs',
    label: '2. SIEM Log Correlation Workbench',
    sub: 'Central Log Aggregation & Search',
    badge: 'HISTORICAL RETROSPECTIVE',
    description: 'Queries millions of normalized events across weeks of historical server logs, proxy requests, and VPN authentications.',
    details: 'Karthik notes: "Use the SIEM workbench to answer the broader environmental question: where else in the organization has this activity appeared?"',
    tags: ['Tool: SIEM', 'Scope: Enterprise Wide', 'Normalization: ECS', 'Historical Query'],
  },
  {
    id: 'bench-edr-process',
    label: '3. EDR Endpoint Telemetry Workbench',
    sub: 'Live Host Flight Recorder & Isolation',
    badge: 'HOST INSPECTION',
    description: 'Real-time host inspection workbench showing kernel callbacks, parent-child process ancestry, command-line arguments, and one-click host isolation.',
    details: 'Karthik instructs: "When you need to look inside the memory of BLR-BR-WS-04, pivot to the EDR workbench for granular process ancestry."',
    tags: ['Tool: EDR', 'Workstation: BLR-BR-WS-04', 'Kernel Hooks', 'Process Lineage'],
  },
  {
    id: 'bench-karthik-synthesis',
    label: '4. Karthik\'s Complementarity Synthesis',
    sub: 'Tools Complement; Case Management Preserves',
    badge: 'KARTHIK DOCTRINE',
    description: 'Foundational SOC architecture doctrine: no single tool solves the entire case. Tools provide specialized vantage points; the case record binds them into a defensible investigation.',
    details: 'Karthik concludes: "A skilled analyst does not live inside only one console. You pivot between SIEM, EDR, and identity, recording verified facts into the central ticket."',
    tags: ['Complementary Roles', 'No Single Console', 'Defensible Evidence', 'SOC Architecture'],
  },
];

// 2. Pillar 2: XDR Cross-Domain Correlation vs Visibility Coverage
export const xdrCrossDomainNodes: VisualNodeItem[] = [
  {
    id: 'xdr-endpoint-telemetry',
    label: '1. Endpoint Telemetry Domain',
    sub: 'Workstations, Servers & Drivers',
    badge: 'HOST DOMAIN',
    description: 'Streams host-level process trees, file modifications, and local registry changes directly into the XDR correlation fabric.',
    details: 'Karthik explains: "XDR attempts to connect disparate dots into a single story without manual log searches."',
    tags: ['Domain: Endpoint', 'Signals: Sysmon 1/3/11', 'Host Health', 'XDR Ingest'],
  },
  {
    id: 'xdr-network-telemetry',
    label: '2. Network Telemetry Domain',
    sub: 'NDR Flow & Wire Sensors',
    badge: 'NETWORK DOMAIN',
    description: 'Ingests Zeek connection records, TLS certificate metadata, and firewall session flows without relying on host agent drivers.',
    details: 'Karthik observes: "Network telemetry catches unmonitored devices that lack EDR software."',
    tags: ['Domain: Network', 'Sensor: Wire PCAP', 'Unmonitored Assets', 'Flow Analysis'],
  },
  {
    id: 'xdr-cloud-identity',
    label: '3. Cloud & Identity Domain',
    sub: 'Entra ID / Kerberos & M365 Email',
    badge: 'IDENTITY DOMAIN',
    description: 'Tracks user authentication anomalies, MFA push fatigue challenges, impossible travel logins, and suspicious email inbox rules.',
    details: 'Karthik instructs: "Identity provides the human anchor. Without identity context, host and network alerts remain anonymous."',
    tags: ['Domain: Identity', 'Tokens: OAuth / Kerberos', 'User Ramesh', 'Travel Velocity'],
  },
  {
    id: 'xdr-coverage-audit',
    label: '4. The Coverage Map Reality Check',
    sub: 'Product Names != Guaranteed Visibility',
    badge: 'REALITY AUDIT',
    description: 'Critical analyst principle: purchasing an XDR platform does NOT guarantee every data source is connected. Analysts must verify active coverage boundaries.',
    details: 'Karthik asks: "Does buying XDR guarantee every data source is connected? No. Product names cannot substitute for an environment map."',
    tags: ['Environment Map', 'Verified Connectors', 'Zero Blind Faith', 'Coverage Gap Audit'],
  },
];

// 3. Pillar 3: Case Management & Chain of Custody
export const caseManagementCustodyNodes: VisualNodeItem[] = [
  {
    id: 'case-ticket-owner',
    label: '1. Explicit Ticket Assignment & Ownership',
    sub: 'Assigned Analyst & Shift Handoff',
    badge: 'OWNERSHIP GOVERNANCE',
    description: 'Establishes clear operational accountability: Case #2026-881 assigned to Apprentice Analyst under Shift Lead Ananya and Incident Commander Karthik.',
    details: 'Karthik teaches: "An alert without an owner is an incident waiting to be dropped. Every case must have an unambiguous owner."',
    tags: ['Case Owner', 'Accountability', 'Shift Tracking', 'SLA Timers'],
  },
  {
    id: 'case-decision-log',
    label: '2. Contemporaneous Decision Log',
    sub: 'Why Actions Were Taken / Rejected',
    badge: 'DECISION AUDIT',
    description: 'Records not only technical findings, but the explicit rationale behind actions taken or rejected (e.g. "Device isolated after verifying user Ramesh was not on domain controller").',
    details: 'Karthik states: "Six months from now in a legal deposition, the decision log proves that your response was proportionate and authorized."',
    tags: ['Rationale Recorded', 'Proportionate Response', 'Legal Audit Trail', 'Supervisory Notes'],
  },
  {
    id: 'case-evidence-artifacts',
    label: '3. Cryptographic Evidence Vault',
    sub: 'SHA-256 Checksums for PCAPs & Memory',
    badge: 'CHAIN OF CUSTODY',
    description: 'Attaches volatile memory dumps, carved PCAP objects, and EDR process trees sealed with cryptographic SHA-256 hashes to guarantee tamper resistance.',
    details: 'Karthik notes: "Evidence without a hash is easily contested. Every artifact in the case ticket must have a cryptographic seal."',
    tags: ['SHA-256 Sealed', 'Tamper Resistance', 'Evidence Vault', 'Digital Integrity'],
  },
  {
    id: 'case-handoff-signoff',
    label: '4. Incident Closure & Supervisory Seal',
    sub: 'Formal Resolution Classification',
    badge: 'CLOSURE DISPOSITION',
    description: 'Final disposition closure: True Positive Malicious, threat contained, lateral movement verified zero, supervisory sign-off stamped.',
    details: 'Karthik concludes: "Case management is how the security team proves its worth to executive leadership and external compliance auditors."',
    tags: ['Resolution Signed', 'Supervisory Seal', 'Executive Briefing', 'Compliance Ready'],
  },
];

// -----------------------------------------------------------------------------
// CHAPTER 2: M10-U1-C2 (The coordinator, not the commander)
// -----------------------------------------------------------------------------

// 4. Pillar 1: SOAR Playbook Orchestration Loop
export const soarOrchestrationLoopNodes: VisualNodeItem[] = [
  {
    id: 'soar-ingest-trigger',
    label: '1. Automated Alert Ingestion Trigger',
    sub: 'Webhook from EDR / SIEM Alert #881',
    badge: 'PIPELINE TRIGGER',
    description: 'The SOAR platform ingests high-fidelity alerts from SIEM or EDR, automatically instantiating a standardized incident response playbook.',
    details: 'Mentor Karthik explains: "SOAR coordinates repeatable tasks. It should operate within approved permissions and safeguards."',
    tags: ['Trigger: Alert #881', 'Webhook Ingestion', 'Standardized Playbook', 'Automated Triage'],
  },
  {
    id: 'soar-automated-enrichment',
    label: '2. Multi-API Context Enrichment',
    sub: 'VirusTotal, AbuseIPDB & Active Directory',
    badge: 'BACKGROUND ENRICHMENT',
    description: 'Playbook automatically queries threat intelligence feeds, checks domain age, and pulls the logged-in employee profile in parallel without human lag.',
    details: 'Karthik notes: "Enrichment is where SOAR shines: saving 12 minutes of manual copy-pasting for every incoming alert."',
    tags: ['API Enrichment', 'Threat Feeds', 'User Identity Lookup', 'Time Saved: 12m'],
  },
  {
    id: 'soar-analyst-decision-gate',
    label: '3. Mandatory Human-In-The-Loop Gate',
    sub: 'Review Point Before Disruptive Action',
    badge: 'APPROVAL BARRIER',
    description: 'The automated playbook pauses execution and surfaces an interactive review card to the analyst: "Enrichment complete. Approve host isolation?"',
    details: 'Karthik warns: "Can automation decide anything just because an alert arrives? No. We design review points and safeguards according to risk."',
    tags: ['Human-In-The-Loop', 'Review Point', 'Safety Safeguard', 'Zero Blind Automation'],
  },
  {
    id: 'soar-structured-action',
    label: '4. Governed Action Execution',
    sub: 'Structured Update & Ticket Update',
    badge: 'AUDITED EXECUTION',
    description: 'Once human authorization is granted, SOAR issues the structured API command to isolate WS-04, updates the firewall blocklist, and notes the ticket.',
    details: 'Karthik summarizes: "SOAR is the coordinator, not the commander. The human analyst remains the operational commander."',
    tags: ['API Execution', 'Ticket Updated', 'Coordinator Role', 'Karthik Principle'],
  },
];

// 5. Pillar 2: Technical Capability vs Operational Authority
export const capabilityVsAuthorityNodes: VisualNodeItem[] = [
  {
    id: 'auth-api-capability',
    label: '1. Technical API Capability (The Lever)',
    sub: 'Ability to Execute Action in Console',
    badge: 'RAW CAPABILITY',
    description: 'The software API, command shell, or admin console provides the physical ability to isolate workstations, reset passwords, or disconnect switches.',
    details: 'The apprentice asks: "If the API token has admin rights, can\'t the SOAR script just isolate every device that raises an alert?"',
    tags: ['Raw API Lever', 'Admin Token', 'Technical Power', 'Script Capability'],
  },
  {
    id: 'auth-policy-boundary',
    label: '2. Operational Authority (The Permission)',
    sub: 'Governance Policy & Incident Command',
    badge: 'GOVERNANCE PERMISSION',
    description: 'The organizational governance policy defining who is formally permitted to disrupt business assets, services, and payroll functions.',
    details: 'Karthik asks: "Should a tool\'s technical capability be treated as your permission to use it? No. Capability and authority are fundamentally different."',
    tags: ['Policy Boundary', 'Operational Permission', 'Governance Matrix', 'Change Authority'],
  },
  {
    id: 'auth-unilateral-danger',
    label: '3. The Runaway Automation Disaster',
    sub: 'Ungoverned Scripts Severing Core Services',
    badge: 'CATASTROPHIC RISK',
    description: 'Real-world risk: an unconstrained automation playbook triggers on a false-positive flood, automatically locking out 4,000 corporate users on Monday morning.',
    details: 'Karthik cautions: "An analyst who confuses capability with authority turns a minor security blip into a company-wide operational crisis."',
    tags: ['Lockout Crisis', 'False Alarm Hazard', 'Runaway Script', 'Business Interruption'],
  },
  {
    id: 'auth-karthik-doctrine',
    label: '4. Karthik\'s Authority Mandate',
    sub: 'Authority Governs Every Technical Act',
    badge: 'COMMAND MANDATE',
    description: 'Golden SOC rule: before invoking any disruptive technical lever, verify that your tier, role, and ticket status grant explicit operational authorization.',
    details: 'Karthik concludes: "Capability is what the tool can do. Authority is what the business allows you to do. Never confuse the two."',
    tags: ['Core Distinction', 'Karthik Mandate', 'Disciplined SOC', 'Safety Boundary'],
  },
];

// 6. Pillar 3: Automated Playbook Guardrails & Failure Handling
export const safeAutomationGuardrailsNodes: VisualNodeItem[] = [
  {
    id: 'guard-critical-asset-blocklist',
    label: '1. Critical Asset Exclusion Guardrail',
    sub: 'Protected Controllers, DCs & DBs',
    badge: 'SAFETY FILTER',
    description: 'Hard-coded exclusion blocklist prohibiting automated playbooks from ever attempting host isolation or power-cycling on domain controllers or plant servers.',
    details: 'Karthik instructs: "If an alert originates from an industrial PLC or primary domain controller, automation must immediately fail safe to read-only mode."',
    tags: ['Asset Exclusion', 'DC Protected', 'PLC Guarded', 'Hard Safety Filter'],
  },
  {
    id: 'guard-rate-limiter',
    label: '2. Blast-Radius Rate Limiting',
    sub: 'Max 3 Automated Actions / 15 Minutes',
    badge: 'RATE LIMITER',
    description: 'Circuit breaker throttling automated response actions. If more than 3 containment actions trigger within 15 minutes, execution freezes and alerts Senior Architect Karthik.',
    details: 'Karthik explains: "Rate limiters protect the business from cascading false alarms or adversary-poisoned log floods."',
    tags: ['Rate Limiting', 'Circuit Breaker', 'Blast Radius Cap', 'Cascading Defense'],
  },
  {
    id: 'guard-fallback-route',
    label: '3. Graceful Failure & Fallback Handling',
    sub: 'API Timeout & Manual Route',
    badge: 'FAIL-SAFE ROUTE',
    description: 'If a third-party enrichment API times out or the firewall reject call fails, the playbook does not crash silently—it logs the error and pages the on-call analyst.',
    details: 'Karthik dictates: "Automation must handle failures gracefully. Document the timeout and hand the case cleanly to human hands."',
    tags: ['Graceful Fallback', 'API Timeout', 'Manual Route', 'Transparent Error'],
  },
  {
    id: 'guard-audit-trail',
    label: '4. Automated Execution Audit Trail',
    sub: 'Immutable Log of Playbook Steps',
    badge: 'EXECUTION AUDIT',
    description: 'Every API request, response payload, timestamp, and decision check is stamped into an immutable audit ledger for supervisory compliance review.',
    details: 'Karthik summarizes: "Safe automation is predictable, bounded, auditable, and easily overridden by authorized humans."',
    tags: ['Immutable Ledger', 'Predictable SOAR', 'Auditable Pipeline', 'Executive Peace of Mind'],
  },
];

// -----------------------------------------------------------------------------
// CHAPTER 3: M10-U2-C1 (A system that moves something physical)
// -----------------------------------------------------------------------------

// 7. Pillar 1: IT vs OT Fundamentals (Data in Transit vs Kinetic World)
export const otVsItFundamentalsNodes: VisualNodeItem[] = [
  {
    id: 'fund-it-data',
    label: '1. Enterprise Information Technology (IT)',
    sub: 'Data at Rest, in Transit & Processed',
    badge: 'DATA CENTRIC',
    description: 'Enterprise IT manages financial spreadsheets, customer emails, web portals, and relational databases. Primary priority: Confidentiality of corporate data.',
    details: 'Mentor Karthik introduces the plant floor: "In IT, if a server slows down for 3 seconds, an email arrives slightly late. In OT, 3 seconds can blow a pressure gasket."',
    tags: ['Domain: Enterprise IT', 'Focus: Data & Confidentiality', 'Tolerates Latency', 'Frequent Patching'],
  },
  {
    id: 'fund-ot-kinetic',
    label: '2. Operational Technology (OT / ICS)',
    sub: 'Hardware & Software Moving Physical Matter',
    badge: 'PHYSICAL / KINETIC',
    description: 'OT directly monitors and controls physical processes: spinning chemical pumps, electrical power grids, water purification valves, and robotic assembly arms.',
    details: 'Karthik instructs: "OT systems interact with physical processes. ICS includes systems used to monitor and control industrial operations."',
    tags: ['Domain: Industrial OT', 'Focus: Physical Matter & Kinetic', 'Zero Tolerance for Lag', 'Years of Uptime'],
  },
  {
    id: 'fund-cia-flip',
    label: '3. The Flipped Security Triad (Safety & Availability)',
    sub: 'CIA (Confidentiality First) vs AIC / Safety',
    badge: 'PRIORITY FLIP',
    description: 'While enterprise IT prioritizes Confidentiality &gt; Integrity &gt; Availability, industrial OT prioritizes Physical Safety &gt; Availability &gt; Integrity &gt; Confidentiality.',
    details: 'Karthik states: "In an industrial plant, human life and physical safety reign supreme. Encrypting traffic is worthless if it crashes the emergency cooling system."',
    tags: ['Safety First', 'Availability Paramount', 'CIA vs AIC', 'Human Life Protection'],
  },
  {
    id: 'fund-karthik-principle',
    label: '4. Karthik\'s Operational Respect Principle',
    sub: 'Understand the Process Before the Action',
    badge: 'OPERATIONAL RESPECT',
    description: 'Foundational doctrine for cyber analysts entering industrial environments: never apply generic enterprise IT assumptions to a physical production line.',
    details: 'Karthik warns: "Before you propose a technical action, understand what physical equipment moves, heats, or pressurizes as a result."',
    tags: ['Physical Awareness', 'Zero Assumptions', 'Engineer Partnership', 'Plant Protection'],
  },
];

// 8. Pillar 2: Industrial Simulator: Sensor, Controller, Actuator & HMI
export const icsComponentsLoopNodes: VisualNodeItem[] = [
  {
    id: 'ics-physical-sensor',
    label: '1. Physical Sensor (The Measurer)',
    sub: 'Flow Meter & Pressure Transducer',
    badge: 'MEASURING ROLE',
    description: 'Physical instrument measuring real-world analog properties: pipe pressure (PSI), water flow rate (L/min), or temperature (°C).',
    details: 'Karthik demonstrates on the CDAC industrial simulator: "The sensor converts physical reality into electrical signals for the controller."',
    tags: ['Component: Sensor', 'Role: Measuring', 'Analog Signal', 'Pressure / Flow'],
  },
  {
    id: 'ics-plc-controller',
    label: '2. Industrial Controller (The Brain)',
    sub: 'Programmable Logic Controller (PLC) / RTU',
    badge: 'CONTROLLING ROLE',
    description: 'Ruggedized industrial computer running hard real-time ladder logic loops (Scan &rarr; Compute &rarr; Output) without a Windows desktop or keyboard.',
    details: 'Karthik explains: "The PLC compares sensor readings against setpoints. If pressure exceeds 85 PSI, it signals the relief pump to activate."',
    tags: ['Component: PLC / RTU', 'Role: Controlling', 'Ladder Logic', 'Deterministic Scan'],
  },
  {
    id: 'ics-physical-actuator',
    label: '3. Physical Actuator (The Muscle)',
    sub: 'Miniature Electric Pump & Solenoid Valve',
    badge: 'KINETIC ACTION',
    description: 'Physical equipment that moves or alters physical state: electric motors, water pumps, heater coils, or chemical injector valves.',
    details: 'Karthik highlights: "The actuator is where cyber commands become physical kinetic motion in the real world."',
    tags: ['Component: Actuator', 'Role: Physical Muscle', 'Spinning Pump', 'Kinetic Valve'],
  },
  {
    id: 'ics-hmi-supervisor',
    label: '4. Operator HMI (The Supervisor)',
    sub: 'Human-Machine Interface Screen',
    badge: 'SUPERVISING ROLE',
    description: 'Graphical supervisory workstation screen in the plant control room allowing human plant operators to observe live pipe diagrams and adjust setpoints.',
    details: 'Karthik notes: "The HMI allows plant operators to supervise the system. Notice: this is a simulator. Real operational changes require explicit authorization."',
    tags: ['Component: HMI', 'Role: Supervising', 'Control Room Screen', 'Operator Oversight'],
  },
];

// 9. Pillar 3: The Peril of the IT Reboot in Physical Plants
export const rebootPerilSafetyNodes: VisualNodeItem[] = [
  {
    id: 'peril-it-reboot-habit',
    label: '1. The Enterprise IT Habit: "Just Reboot It"',
    sub: 'Standard Office Troubleshooting Reflex',
    badge: 'IT REFLEX TRAP',
    description: 'In enterprise IT, rebooting a sluggish PC or restarting an application service is the routine first-line troubleshooting step.',
    details: 'Karthik asks: "Why can an IT-style restart be especially risky in an industrial environment?"',
    tags: ['IT Reflex', 'Reboot Habit', 'Office Assumption', 'Unchecked Reflex'],
  },
  {
    id: 'peril-ot-catastrophe',
    label: '2. The Physical Catastrophe of an OT Reboot',
    sub: 'Frozen Valves, Overpressure & Physical Damage',
    badge: 'PHYSICAL DAMAGE',
    description: 'Rebooting an active PLC drops all output pins to 0V for 15 seconds. Failsafe valves may slam shut, causing water hammer, bursting pipes, or destroying turbines.',
    details: 'The apprentice answers: "It might interrupt a physical process and create safety, environmental, or physical equipment consequences."',
    tags: ['Physical Consequence', 'Water Hammer', 'Pipe Burst Risk', 'Turbine Overheat'],
  },
  {
    id: 'peril-specialist-protocol',
    label: '3. Specialist Coordination & Engineering Controls',
    sub: 'Plant Operator Consultation Mandate',
    badge: 'ENGINEERING PROTOCOL',
    description: 'Mandatory SOC policy: cyber analysts NEVER send reboot, patch, or scan commands to industrial controllers without plant engineer sign-off.',
    details: 'Karthik affirms: "Correct. Understand the physical process and coordinate with plant engineers before proposing any technical action."',
    tags: ['Plant Coordination', 'Specialist Sign-Off', 'Engineered Maintenance', 'Safe Protocol'],
  },
  {
    id: 'peril-karthik-warning',
    label: '4. Karthik\'s Industrial Restraint Mandate',
    sub: 'Cyber Protection Without Physical Ruin',
    badge: 'KARTHIK MANDATE',
    description: 'Core cybersecurity tenet: defensive interventions must never cause greater physical damage than the adversary could achieve.',
    details: 'Karthik concludes: "Our mission is to defend the plant, not trip the emergency safety valves through ignorance."',
    tags: ['Defensive Harmony', 'Restraint Mandate', 'Zero Self-Harm', 'Safety Culture'],
  },
];

// -----------------------------------------------------------------------------
// CHAPTER 4: M10-U2-C2 (Boundaries protect people and processes)
// -----------------------------------------------------------------------------

// 10. Pillar 1: The Purdue Model Hierarchy (Levels 0 to 5)
export const purdueModelLayersNodes: VisualNodeItem[] = [
  {
    id: 'purdue-l4-enterprise',
    label: '1. Levels 4 & 5: Enterprise Network (IT)',
    sub: 'Corporate LAN, Email, ERP & Internet',
    badge: 'LEVEL 4/5 ENTERPRISE',
    description: 'Corporate business network containing finance workstations (WS-04), email servers, web portals, and internet uplinks.',
    details: 'Mentor Karthik displays the architectural diagram: "This simplified Purdue-style model explains protective layers; actual plant networks vary."',
    tags: ['Level 4/5', 'Corporate LAN', 'User Ramesh', 'Internet Gateway'],
  },
  {
    id: 'purdue-l35-dmz',
    label: '2. Level 3.5: Industrial DMZ (IDMZ)',
    sub: 'Protective Barrier & Data Historian',
    badge: 'LEVEL 3.5 IDMZ',
    description: 'The strict demilitarized zone separating enterprise IT from plant operations. Contains jump hosts, update mirrors, and replicated Data Historians.',
    details: 'Karthik emphasizes: "No direct traffic is ever allowed to cross between Level 4 and Level 2. All communications terminate at the IDMZ."',
    tags: ['Level 3.5 IDMZ', 'Security Barrier', 'Data Historian', 'Zero Direct Routing'],
  },
  {
    id: 'purdue-l2-supervisory',
    label: '3. Level 2: Supervisory Control Network',
    sub: 'Plant Control Room, SCADA & HMIs',
    badge: 'LEVEL 2 SUPERVISORY',
    description: 'Operator control consoles, HMI graphic displays, engineering workstations, and alarm management servers monitoring the physical plant.',
    details: 'Karthik explains: "Level 2 allows human operators to observe and supervise automated processes without touching the physical wiring."',
    tags: ['Level 2', 'Control Room', 'SCADA / HMI', 'Operator Consoles'],
  },
  {
    id: 'purdue-l10-physical',
    label: '4. Levels 1 & 0: Basic Control & Field Devices',
    sub: 'PLCs, RTUs, Field Sensors & Spinning Pumps',
    badge: 'LEVEL 1/0 KINETIC',
    description: 'Deterministic field level: PLCs executing real-time logic connected directly to physical sensors, pressure valves, and motor drives.',
    details: 'Karthik instructs: "Level 1 and 0 are the sacred physical core. An unauthorized packet here could stop a city\'s clean water supply."',
    tags: ['Level 1/0', 'Deterministic PLCs', 'Physical Pumps', 'Critical Physical Core'],
  },
];

// 11. Pillar 2: Industrial DMZ & Data Historian Replicated Telemetry
export const segmentationDmzBoundaryNodes: VisualNodeItem[] = [
  {
    id: 'seg-corporate-access',
    label: '1. Corporate IT Reporting Access',
    sub: 'Finance & Executive Production Dashboards',
    badge: 'READ-ONLY ENTERPRISE',
    description: 'Corporate analysts review daily factory output, energy consumption, and billing metrics without establishing connections into the plant.',
    details: 'Karthik asks: "How does corporate finance view production numbers without creating a security hole into the turbines?"',
    tags: ['Corporate Reporting', 'Production Metrics', 'Safe Read Access', 'Zero Plant Risk'],
  },
  {
    id: 'seg-industrial-dmz-firewall',
    label: '2. Industrial DMZ Dual Firewall Architecture',
    sub: 'IT Firewall + Plant OT Firewall',
    badge: 'DUAL FIREWALL PERIMETER',
    description: 'Two separate firewalls from different vendors manage the IDMZ boundary. No common administrator credentials or single-point failures.',
    details: 'Karthik teaches: "The dual-firewall IDMZ ensures that an adversary who compromises corporate IT still faces a hardened barrier before reaching OT."',
    tags: ['Dual Firewall', 'Two Vendors', 'Hardened IDMZ', 'No Shared Logins'],
  },
  {
    id: 'seg-mirrored-historian',
    label: '3. Mirrored Data Historian Replication',
    sub: 'One-Way Database Mirroring Outward',
    badge: 'HISTORIAN REPLICATION',
    description: 'Plant operations push production telemetry outward into the IDMZ Historian. Corporate IT queries the IDMZ mirror. Zero inbound connections permitted.',
    details: 'Karthik explains: "Data flows outward; control commands never flow inward from the enterprise network."',
    tags: ['Data Historian', 'Unidirectional Flow', 'Replicated Database', 'Safe Telemetry Mirror'],
  },
  {
    id: 'seg-unapproved-path',
    label: '4. Rejecting Direct / Guest Infiltration Routes',
    sub: 'Blocking Rogue Bridging & Dual-NIC Laptops',
    badge: 'BLOCKED ROGUE ROUTE 🚫',
    description: 'Strict architectural prohibition: vendor laptops or rogue Wi-Fi bridges connecting guest networks directly into Level 1 control networks are severed immediately.',
    details: 'Karthik states: "Trace the approved path and instantly reject any direct route from a guest or corporate network to control equipment."',
    tags: ['Rogue Route Blocked', 'Dual-NIC Prohibited', 'No Bridging', 'Segmentation Audit'],
  },
];

// 12. Pillar 3: Passive Network Taps vs The Active Port-Scan Trap
export const passiveMonitoringDoctrineNodes: VisualNodeItem[] = [
  {
    id: 'scan-active-nmap-trap',
    label: '1. The Active Nmap Port-Scan Disaster Trap',
    sub: 'Rookie IT Reflex: Running Aggressive Scans',
    badge: 'FATAL IT MISTAKE ⚠️',
    description: 'An inexperienced IT analyst runs an aggressive Nmap/Nessus port scan against an industrial subnet. Fragile legacy PLCs crash instantly from malformed TCP packets.',
    details: 'Karthik asks: "Should an L1 learner actively scan unknown industrial equipment to identify it?" The apprentice replies: "No. Never!"',
    tags: ['Active Scan Trap', 'Nmap Hazard', 'Fragile TCP Stacks', 'Crash Potential'],
  },
  {
    id: 'scan-passive-span-tap',
    label: '2. Passive Network Taps & SPAN Mirroring',
    sub: 'Zero-Interference Physical Optical Taps',
    badge: 'APPROVED PASSIVE METHOD ✓',
    description: 'Hardware optical test access points (TAPs) or switch SPAN ports copy wire traffic to network intrusion sensors without transmitting a single packet onto the plant bus.',
    details: 'The apprentice answers: "I should use approved passive evidence and consult the OT team." Karthik nods: "Exactly. Zero risk to the controller."',
    tags: ['Hardware TAP', 'SPAN Mirror Port', 'Zero Interference', 'Safe Passive PCAP'],
  },
  {
    id: 'scan-ot-team-consult',
    label: '3. Plant Engineering Consultation Protocol',
    sub: 'Verifying Hardware Identity with Engineers',
    badge: 'ENGINEERING PARTNERSHIP',
    description: 'Instead of port-scanning a mysterious IP at 192.168.10.45, the analyst walks to the control room and checks the plant wiring blueprint with Sunil, the lead plant operator.',
    details: 'Karthik highlights: "A 5-minute conversation with plant engineers is safer and more accurate than 1,000 active scan packets."',
    tags: ['Control Room Walk', 'Operator Sunil', 'Plant Blueprints', 'Accurate Inventory'],
  },
  {
    id: 'scan-karthik-rule',
    label: '4. Karthik\'s Dual-Respect Doctrine',
    sub: 'Visibility Needs Bounded by Operational Safety',
    badge: 'KARTHIK DOCTRINE',
    description: 'The defining principle of industrial cybersecurity: security visibility is essential, but operational safety and process continuity always take precedence.',
    details: 'Karthik concludes: "A truly useful analyst respects both visibility needs and operational safety. We protect the plant without shaking the ladder."',
    tags: ['Dual Respect', 'Safety First', 'Non-Disruptive SOC', 'Architectural Seal'],
  },
];

// -----------------------------------------------------------------------------
// CHAPTER 5: M10-U3-C1 (Response is a business decision too)
// -----------------------------------------------------------------------------

// 13. Pillar 1: The High-Level Response Action Triad
export const threeResponseActionsNodes: VisualNodeItem[] = [
  {
    id: 'act-block-destination',
    label: '1. Action: Block Destination (Firewall / Proxy)',
    sub: 'Target: Foreign C2 IP or Malicious Domain',
    badge: 'NETWORK CONDUIT',
    description: 'Applies perimeter firewall or DNS sinkhole rule blocking outbound traffic to malicious infrastructure (e.g. 198.51.100.24).',
    details: 'Mentor Karthik explains: "Each action has a target, intended benefit, potential side effects, and an authorized decision maker."',
    tags: ['Action: Block IP/DNS', 'Target: Remote Host', 'Benefit: Cuts C2 Beacon', 'Side Effect: Shared IP Outage'],
  },
  {
    id: 'act-disable-account',
    label: '2. Action: Disable Account / Revoke Tokens',
    sub: 'Target: User Credential (FIN-OPS-01)',
    badge: 'IDENTITY CONDUIT',
    description: 'Revokes active Kerberos/OAuth session tokens and disables active directory login credentials for compromised identity.',
    details: 'Karthik notes: "Disabling an account halts active adversary access, but immediately blocks the employee from doing their job."',
    tags: ['Action: Account Disable', 'Target: User Ramesh', 'Benefit: Halts Cred Theft', 'Side Effect: User Locked Out'],
  },
  {
    id: 'act-isolate-device',
    label: '3. Action: Isolate Device (EDR Host Agent)',
    sub: 'Target: Workstation BLR-BR-WS-04',
    badge: 'ENDPOINT CONDUIT',
    description: 'Sever local LAN and WAN network adapters via kernel driver firewall while keeping encrypted EDR management tunnel open.',
    details: 'Karthik instructs: "Device isolation stops lateral movement across the branch, but severs the employee\'s network connectivity."',
    tags: ['Action: Host Isolation', 'Target: WS-04', 'Benefit: Halts Lateral Spread', 'Side Effect: Host Disconnected'],
  },
  {
    id: 'act-karthik-synthesis',
    label: '4. Karthik\'s Action Mapping Matrix',
    sub: 'Target • Benefit • Side Effect • Authorizer',
    badge: 'DECISION MATRIX',
    description: 'Every defensive proposal must document all 4 facets: Target Asset, Intended Benefit, Potential Side Effects, and Authorized Decision Maker.',
    details: 'Karthik dictates: "Never propose a response action without specifying its potential side effects and required approval level."',
    tags: ['4-Facet Matrix', 'Disciplined Proposal', 'No Blind Levers', 'Governance Framework'],
  },
];

// 14. Pillar 2: Evaluating Potential Side Effects & Collateral Outage
export const sideEffectsBusinessImpactNodes: VisualNodeItem[] = [
  {
    id: 'side-shared-ip-risk',
    label: '1. The Shared Hosting IP Risk',
    sub: 'Collateral Damage from IP Blacklisting',
    badge: 'COLLATERAL DAMAGE',
    description: 'Adversary hosted C2 on Cloudflare or AWS shared IP. Blocking the raw IP severs access to 400 legitimate vendor websites used by branch accounting!',
    details: 'Karthik highlights: "A careless IP block can take down your own corporate supply chain. Always evaluate shared infrastructure risks."',
    tags: ['Shared CDN IP', 'Collateral Outage', 'Supply Chain Risk', 'Domain-Level Preferred'],
  },
  {
    id: 'side-service-account-risk',
    label: '2. The Service Account Lockout Disaster',
    sub: 'Disabling Shared Batch & Database Credentials',
    badge: 'ENTERPRISE CRASH',
    description: 'Analyst disables an account flagged for suspicious off-hours logons, discovering too late it was the core SAP database sync service account. All branch transactions freeze.',
    details: 'Karthik warns: "Verify whether the account is a human employee or an automated service account before revoking credentials."',
    tags: ['Service Account', 'Database Dependency', 'Production Freeze', 'Account Verification'],
  },
  {
    id: 'side-plant-controller-risk',
    label: '3. The Industrial Plant Controller Context',
    sub: 'Applying Office Playbooks to Plant Hardware',
    badge: 'CATASTROPHIC BLAST',
    description: 'The apprentice asks: "Can I use the finance-workstation playbook on a controller?" Karthik responds: "No! Asset type and operational context matter; OT response needs its own approved process."',
    details: 'Karthik states: "Isolating an industrial controller can cause an uncontrolled emergency plant shutdown. Different assets demand different playbooks."',
    tags: ['Controller Risk', 'Context Matters', 'OT Playbook', 'Zero Cross-Contamination'],
  },
  {
    id: 'side-karthik-mitigation',
    label: '4. The Proportionate Response Doctrine',
    sub: 'Balancing Containment Against Business Harm',
    badge: 'BUSINESS EQUILIBRIUM',
    description: 'The mature SOC balance: containment measures must be aggressive enough to halt the adversary, but measured enough to avoid doing the adversary\'s destructive job for them.',
    details: 'Karthik concludes: "Response is a business decision too. Security analysts protect business viability, not just raw telemetry purity."',
    tags: ['Business Viability', 'Proportionate Action', 'Balanced Defense', 'Executive Equilibrium'],
  },
];

// 15. Pillar 3: Reversibility Fallacy & Approval Workflow
export const reversibilityVsJudgmentNodes: VisualNodeItem[] = [
  {
    id: 'rev-fallacy-myth',
    label: '1. The "Reversibility Fallacy" Myth',
    sub: 'Rookie Excuse: "We can easily undo it"',
    badge: 'FALLACY TRAP ⚠️',
    description: 'An inexperienced analyst argues: "It\'s reversible—we can un-isolate the device or unblock the IP in 10 minutes if we\'re wrong, so why wait for approval?"',
    details: 'Karthik asks: "If an action is reversible, is it automatically harmless?" The apprentice replies: "No. The interruption may still cause harm before it is reversed."',
    tags: ['Reversibility Myth', 'Harm Accumulation', 'Rookie Excuse', 'Unplanned Interruption'],
  },
  {
    id: 'rev-unrecoverable-damage',
    label: '2. Unrecoverable Time-Sensitive Losses',
    sub: 'Canceled Transactions, Factory Spoilage & Panic',
    badge: 'REAL-WORLD COST',
    description: 'Even a temporary 10-minute severance during payroll cut-off or factory chemical batching causes permanent financial penalties, spoiled materials, and executive panic.',
    details: 'Karthik affirms: "Correct. Reversibility reduces some risks but does not remove the need for operational judgment."',
    tags: ['Financial Penalty', 'Material Loss', 'Operational Shock', 'Irreversible Cost'],
  },
  {
    id: 'rev-approval-gate',
    label: '3. Authorized Approval Gates by Severity',
    sub: 'Tier 1 &rarr; Shift Lead Ananya &rarr; Architect Karthik',
    badge: 'GOVERNANCE HIERARCHY',
    description: 'Documented approval hierarchy: L1 prepares verified impact checklist; Shift Lead Ananya authorizes single-host isolation; Senior Architect Karthik approves plant/domain-wide containment.',
    details: 'Karthik instructs: "Pair each action with the asset owner, impact check, approval requirement, and verification step."',
    tags: ['Approval Gate', 'Tier 1 to Lead', 'Karthik Sign-Off', 'Formal Escalation'],
  },
  {
    id: 'rev-policy-verification',
    label: '4. Post-Action Verification & Restoration Test',
    sub: 'Confirming Desired Effect & Reversal Readiness',
    badge: 'VERIFICATION AUDIT',
    description: 'Every approved response action mandates a post-execution verification test: confirm threat beacon is dead, verify critical business lifeline remains active, and test rapid restoration procedure.',
    details: 'Karthik concludes: "A professional response includes authorization, execution, verification, and an audited path back to normal operations."',
    tags: ['Verification Test', 'Restoration Ready', 'Complete Lifecycle', 'Supervisory Seal'],
  },
];

// -----------------------------------------------------------------------------
// CHAPTER 6: M10-U3-C2 (Knowing when to stop)
// -----------------------------------------------------------------------------

// 16. Pillar 1: The Read-Only Restraint Barrier for Unfamiliar Assets
export const readOnlyBoundaryNodes: VisualNodeItem[] = [
  {
    id: 'barrier-unfamiliar-asset',
    label: '1. Unfamiliar Asset Alert Ingestion',
    sub: 'Alert Flags Industrial Asset BLR-PLANT-PLC-02',
    badge: 'UNKNOWN ASSET ALERT',
    description: 'An alert enters the queue mentioning an unfamiliar asset identifier (`BLR-PLANT-PLC-02`, IP: 192.168.10.15) outside the standard branch workstation inventory.',
    details: 'Mentor Karthik observes: "A simulated alert mentions an unfamiliar industrial asset. Notice what happens to your console controls."',
    tags: ['Unfamiliar Asset', 'PLC-02', 'Outside Office Baseline', 'High Vigilance'],
  },
  {
    id: 'barrier-controls-locked',
    label: '2. The Automated Read-Only Safety Lockout',
    sub: 'Disruptive Action Levers Turn Read-Only 🔒',
    badge: 'READ-ONLY LOCKOUT',
    description: 'The console safety governor detects an industrial asset tag and immediately locks all disruptive action buttons (Isolate, Reboot, Kill Process). All views shift to Read-Only mode.',
    details: 'Karthik dictates: "Your controls become read-only. This separate practice scenario is not automatically part of the finance case."',
    tags: ['Controls Locked 🔒', 'Read-Only Mode', 'Safety Governor', 'Prevent Unchecked Action'],
  },
  {
    id: 'barrier-evidence-preservation',
    label: '3. Non-Disruptive Evidence Gathering',
    sub: 'Passive PCAP, Modbus Telemetry & Log Inspection',
    badge: 'PASSIVE EVIDENCE',
    description: 'Without touching or querying the physical controller, the analyst reviews existing passive sensor logs, Modbus function code anomalies, and switch mirror packet captures.',
    details: 'The apprentice affirms: "I will preserve the details, identify the OT contact, and use the approved escalation route."',
    tags: ['Passive Capture', 'Modbus Inspection', 'Preserve Details', 'Zero Plant Risk'],
  },
  {
    id: 'barrier-karthik-admonition',
    label: '4. Karthik\'s Restraint Admonition',
    sub: 'Accurate Triage Beats Pressing Every Button',
    badge: 'ANALYST VALUE',
    description: 'Foundational career guidance from Senior Architect Karthik: an L1 analyst\'s true professional value lies in accurate triage, rigorous scoping, and disciplined coordination.',
    details: 'Karthik concludes: "What is the safe response if you cannot confirm the asset\'s function? Avoid disruptive action and escalate the uncertainty promptly. Your value is accurate triage, not pressing every button."',
    tags: ['True Analyst Value', 'Accurate Triage', 'Disciplined Restraint', 'Career Rule'],
  },
];

// 17. Pillar 2: The Manufactured Link Fallacy (Separate Practice Scenarios)
export const antiManufacturedLinkNodes: VisualNodeItem[] = [
  {
    id: 'link-finance-case',
    label: '1. Active Case #2026-881 (Finance Branch Workstation)',
    sub: 'Target: BLR-BR-WS-04 • User: Ramesh • Excel Macro',
    badge: 'PRIMARY CASE',
    description: 'The active investigation you have tracked through Modules 04–09: an employee spreadsheet macro spawning PowerShell C2 to 198.51.100.24.',
    details: 'Karthik asks: "Is this new industrial simulator alert part of Ramesh\'s branch office finance case?"',
    tags: ['Case #2026-881', 'Finance Branch', 'User Ramesh', 'Workstation WS-04'],
  },
  {
    id: 'link-ot-practice-case',
    label: '2. Separate Practice Scenario (Plant Water Pump)',
    sub: 'Target: BLR-PLANT-PLC-02 • Simulated Cooling Pump',
    badge: 'PRACTICE LAB ONLY',
    description: 'An educational practice simulation designed to teach industrial safety boundaries, completely isolated in the CDAC training lab environment.',
    details: 'The apprentice answers: "No. This separate practice scenario is not automatically part of the finance case."',
    tags: ['Separate Scenario', 'Training Simulation', 'Water Pump Controller', 'No Relation'],
  },
  {
    id: 'link-manufactured-error',
    label: '3. The Manufactured Link Cognitive Trap',
    sub: 'Rookie Error: Forcing Unrelated Alerts Together',
    badge: 'COGNITIVE TRAP ⚠️',
    description: 'A pervasive junior analyst fallacy: assuming that because two alerts appear during the same shift or training module, they must be part of an elaborate master conspiracy.',
    details: 'Karthik warns: "Do not manufacture a link just because two alerts occur during the same lesson. Every link must be proven by shared telemetry, not coincidence."',
    tags: ['Manufactured Link', 'False Conspiracy', 'Confirmation Bias', 'Unproven Connection'],
  },
  {
    id: 'link-evidence-discipline',
    label: '4. Forensic Discipline: Dual Independent Dossiers',
    sub: 'Strict Case Demarcation & Evidence Scoping',
    badge: 'FORENSIC DISCIPLINE',
    description: 'Maintains two cleanly separated case dossiers: Case #2026-881 remains focused on the finance branch; the industrial practice alert routes independently to plant engineering.',
    details: 'Karthik praises: "Excellent forensic discipline. Accurate incident reporting requires knowing what NOT to include as much as what to include."',
    tags: ['Separated Dossiers', 'Clean Demarcation', 'Disciplined Scoping', 'Professional Rigor'],
  },
];

// 18. Pillar 3: Specialized OT Escalation Dossier & Handoff
export const otSpecialistEscalationNodes: VisualNodeItem[] = [
  {
    id: 'esc-dossier-identifiers',
    label: '1. Asset Identifiers & Exact Observation Window',
    sub: 'Target: BLR-PLANT-PLC-02 (192.168.10.15) • Time: 14:35:10 UTC',
    badge: 'ASSET IDENTIFICATION',
    description: 'Documents concrete facts: exact asset hostname, MAC address, physical rack location, Modbus Unit ID, and microsecond observation timestamp.',
    details: 'Karthik instructs: "Draft an escalation containing asset identifiers, observation time, detection source, explicit uncertainty, and request for review."',
    tags: ['Asset ID: PLC-02', 'IP: 192.168.10.15', 'Time: 14:35:10 UTC', 'Modbus Unit: 1'],
  },
  {
    id: 'esc-dossier-uncertainty',
    label: '2. Explicit Statement of Uncertainty & Restraint',
    sub: 'Documented: "Asset function unknown; disruptive action avoided"',
    badge: 'HONEST UNCERTAINTY',
    description: 'Explicit documentation in the escalation note: "Asset role in physical process unconfirmed. Zero disruptive containment commands issued. Read-only packet capture attached."',
    details: 'Karthik highlights: "Documenting honest uncertainty is a strength. It tells the industrial engineering team that the plant is safe from rogue IT reboots."',
    tags: ['Honest Uncertainty', 'Read-Only Preserved', 'Zero Disruption', 'Professional Candor'],
  },
  {
    id: 'esc-specialist-routing',
    label: '3. Approved Escalation Route: Industrial Plant Operations',
    sub: 'Routing to Plant Operator Sunil & ICS Incident Commander',
    badge: 'SPECIALIST ROUTING',
    description: 'Case transferred directly to the designated OT plant security liaison (Sunil, Lead Plant Operator) and Senior Incident Commander Karthik.',
    details: 'Karthik notes: "An L1 analyst routes the alert to its specialist owner with clear observations and no unauthorized containment."',
    tags: ['Operator Sunil', 'Architect Karthik', 'Designated Routing', 'Approved Escalation'],
  },
  {
    id: 'esc-karthik-seal',
    label: '4. Module 10 Master Supervisory Seal',
    sub: 'Certified Incident Governance & Ecosystem Completion',
    badge: 'SUPERVISORY SEAL',
    description: 'Senior Architect Karthik reviews the completed dossier, validates the disciplined restraint, and stamps the official CDAC supervisory seal on Module 10.',
    details: 'Karthik concludes: "Outstanding work, Apprentice Analyst. You have mastered tool coordination, physical process safety, and the vital wisdom of knowing when to stop."',
    tags: ['Supervisory Sign-Off', 'Module 10 Complete', 'Ecosystem Mastered', 'Ready for Module 11'],
  },
];

// =============================================================================
// COMPLETE MODULE 10 NODES MAPPING DICTIONARY
// =============================================================================
export const module10NodesMap: Record<string, VisualNodeItem[]> = {
  // Chapter 1: One investigation, several workbenches
  'm10-workbench-ecosystem': multiWorkbenchEcosystemNodes,
  'm10-xdr-cross-domain': xdrCrossDomainNodes,
  'm10-case-management-custody': caseManagementCustodyNodes,

  // Chapter 2: The coordinator, not the commander
  'm10-soar-orchestration-loop': soarOrchestrationLoopNodes,
  'm10-capability-vs-authority': capabilityVsAuthorityNodes,
  'm10-safe-automation-guardrails': safeAutomationGuardrailsNodes,

  // Chapter 3: A system that moves something physical
  'm10-ot-vs-it-fundamentals': otVsItFundamentalsNodes,
  'm10-ics-components-loop': icsComponentsLoopNodes,
  'm10-reboot-peril-safety': rebootPerilSafetyNodes,

  // Chapter 4: Boundaries protect people and processes
  'm10-purdue-model-layers': purdueModelLayersNodes,
  'm10-segmentation-dmz-boundary': segmentationDmzBoundaryNodes,
  'm10-passive-monitoring-doctrine': passiveMonitoringDoctrineNodes,

  // Chapter 5: Response is a business decision too
  'm10-three-response-actions': threeResponseActionsNodes,
  'm10-side-effects-business-impact': sideEffectsBusinessImpactNodes,
  'm10-reversibility-vs-judgment': reversibilityVsJudgmentNodes,

  // Chapter 6: Knowing when to stop
  'm10-read-only-boundary': readOnlyBoundaryNodes,
  'm10-anti-manufactured-link': antiManufacturedLinkNodes,
  'm10-ot-specialist-escalation': otSpecialistEscalationNodes,
};
