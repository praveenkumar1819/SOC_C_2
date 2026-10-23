// ============================================================================
// CDAC BENGALURU — SOC ANALYST L1 CURRICULUM
// Terminology Scaffolding & Individual Concept Process Context for All Chapters
// ============================================================================

export interface TerminologyScaffolding {
  concept: string;
  analogy: string;
  definition: string;
  whyItMatters: string;
}

export interface InstructionalProcessStage {
  stage: string;
  action: string;
  explanation: string;
}

export interface InstructionalConceptContext {
  conceptHeadline: string;
  overview: string;
  processStages: InstructionalProcessStage[];
  doctrineNote: string;
}

export interface ChapterScaffoldingItem {
  terminologyScaffolding: TerminologyScaffolding;
  instructionalContext: InstructionalConceptContext;
}

// Curated scaffolding database keyed by Chapter ID or core concept keywords
export const CHAPTER_SCAFFOLDING_MAP: Record<string, ChapterScaffoldingItem> = {
  // --------------------------------------------------------------------------
  // MODULE 00: Orientation: Your First SOC Shift
  // --------------------------------------------------------------------------
  "M00-U1-C1": {
    terminologyScaffolding: {
      concept: "Curiosity with Disciplined Restraint",
      analogy: "Like visiting an air traffic control tower for the first time: you are not asked to land a plane today; you first observe how radar screens work and learn that touching buttons blindly causes chaos.",
      definition: "The fundamental beginner posture in security operations where an apprentice observes, learns ordinary baselines, and asks for guidance before altering unfamiliar configurations.",
      whyItMatters: "Prevents accidental system disruptions and establishes the cardinal rule of SOC triage: never guess when you encounter unfamiliar activity.",
    },
    instructionalContext: {
      conceptHeadline: "Beginning as a Visiting Learner & The First Golden Rule",
      overview: "You arrive at the fictionalised CDAC Bengaluru learning SOC not as a seasoned investigator, but as a curious visitor wearing a 'SOC Learner' badge. Mentor Ananya welcomes you. You do not need an IT degree or hacking experience. Before you can spot anomalies or investigate threats, you must first understand what ordinary, everyday computer activity looks like. When something unfamiliar appears on your screen, you never guess or click blindly—you pause and ask for help.",
      processStages: [
        {
          stage: "Phase 1: Arrive & Observe",
          action: "Receive Visitor Badge",
          explanation: "Receive your 'SOC Learner' badge; establish your learning preferences (text size, captions, audio controls).",
        },
        {
          stage: "Phase 2: Baseline Understanding",
          action: "Understand Ordinary Activity",
          explanation: "Familiarize yourself with everyday computer interactions before studying attacks or anomalies.",
        },
        {
          stage: "Phase 3: The First Golden Rule",
          action: "Ask Before Changing",
          explanation: "When facing unfamiliar screens or instructions, stop and ask for help before altering any system setting.",
        },
      ],
      doctrineNote: "Analyst Doctrine: Curiosity is always welcome; unsupported, speculative action is not.",
    },
  },

  "M00-U1-C2": {
    terminologyScaffolding: {
      concept: "SOC Role Boundaries & Cross-Team Cooperation",
      analogy: "Like hospital security: guards monitor premises, alarms, and emergency doors, but they coordinate with doctors who treat patients, pharmacists who manage medicine, and IT who maintain records—guards don't perform surgery or fix every printer.",
      definition: "The organizational division of responsibilities where the Security Operations Centre (SOC) monitors threats and coordinates responses, while distinct IT and business teams own and maintain devices, accounts, networks, and services.",
      whyItMatters: "Eliminates the dangerous misconception that the SOC runs every department or fixes every broken keyboard; effective security depends on close cooperation with service owners.",
    },
    instructionalContext: {
      conceptHeadline: "The 6 Teaching Zones & Cross-Team Collaboration",
      overview: "Mentor Ananya introduces the 6 learning zones of the training campus: Staff Support, Computing, Network Services, Identity Services, Security Monitoring, and Response Coordination (plus an Industrial Demonstration Zone). The SOC does not repair every computer or manage every payroll system. Instead, it monitors telemetry and works hand-in-hand with the specialists who own those assets.",
      processStages: [
        {
          stage: "Phase 1: Map the Teaching Zones",
          action: "Demarcate Specializations",
          explanation: "Identify who handles physical hardware, who provisions accounts, and who routes network traffic.",
        },
        {
          stage: "Phase 2: Route Daily Requests",
          action: "Direct Non-Security Tickets",
          explanation: "Route non-security issues (broken keyboard to Staff Support, password reset to Identity) away from the SOC queue.",
        },
        {
          stage: "Phase 3: Coordinate on Alerts",
          action: "Partner with Service Owners",
          explanation: "When a security alert triggers, investigate with the relevant service owner rather than acting in isolation.",
        },
      ],
      doctrineNote: "Analyst Doctrine: Cooperation matters more than pretending one team knows everything.",
    },
  },

  "M00-U2-C1": {
    terminologyScaffolding: {
      concept: "Isolated Training Sandbox Boundaries",
      analogy: "Like a student chemistry lab with protective fume hoods: experiments take place inside safe glass enclosures with emergency eyewash stations; students are strictly forbidden from taking reactive chemicals into the hallway or campus cafeteria.",
      definition: "A strictly controlled, isolated simulation environment (marked with a blue visual border and host-only networking) that permits learners to safely inspect files and practice commands without risking outside or production systems.",
      whyItMatters: "A virtual machine is not automatically an impermeable safety shield; misconfigured network adapters can bridge lab traffic to external networks.",
    },
    instructionalContext: {
      conceptHeadline: "Safe Practice Space & Lab Boundary Discipline",
      overview: "Mentor Ravi guides you into your learning console, marked by a distinct blue boundary. In this course, every dataset, simulation, and VM is an authorized practice tool. Ravi demonstrates how to verify host-only networking, how to use snapshot resets to return to a clean baseline, and reinforces that lab permissions never authorize scanning or probing college or external networks.",
      processStages: [
        {
          stage: "Phase 1: Verify Console Boundary",
          action: "Inspect Blue Training Border",
          explanation: "Confirm the blue outline and isolated host-only network adapter configuration before loading any exercise.",
        },
        {
          stage: "Phase 2: Practice Non-Destructively",
          action: "Stay Within Lab Scope",
          explanation: "Work inside the sandbox with supplied files; observe behavior without altering host settings.",
        },
        {
          stage: "Phase 3: Reset & Safeguard",
          action: "Snapshot Rollback",
          explanation: "Use snapshot rollback to reset the sandbox cleanly; never point course tools at external or home networks.",
        },
      ],
      doctrineNote: "Analyst Doctrine: A virtual machine is not automatically a safety barrier; stop and ask whenever the lab boundary is unclear.",
    },
  },

  "M00-U2-C2": {
    terminologyScaffolding: {
      concept: "Evidence Integrity & The Safe Pause",
      analogy: "Like a forensic crime scene: detectives photograph fingerprints and place physical items in sealed tamper-evident bags; they never wash, scrub, or 'tidy up' the evidence before dusting it for prints.",
      definition: "The fundamental evidentiary standard requiring that original logs and system artifacts remain intact and unmodified, while analysis occurs exclusively on verified working copies with documented source metadata.",
      whyItMatters: "Modifying or 'tidying' an original log destroys forensic validity, prevents independent verification by senior analysts, and makes legal attribution impossible.",
    },
    instructionalContext: {
      conceptHeadline: "Preserving Original Clues & The Power of a Safe Pause",
      overview: "Mentor Ananya places a sample alert log beside a working duplicate. She explains why you must never edit original evidence to make it 'look cleaner'. If an unfamiliar command might overwrite or delete data, the correct professional reaction is not to gamble—it is to pause, record what is on the screen, and ask for senior guidance.",
      processStages: [
        {
          stage: "Phase 1: Lock the Original",
          action: "Preserve Intact Copy",
          explanation: "Preserve source log files in an unedited, read-only state with verified collection timestamps.",
        },
        {
          stage: "Phase 2: Analyze Working Copies",
          action: "Operate on Duplicates",
          explanation: "Duplicate the artifact; perform all filtering, highlighting, and parsing exclusively on the copy.",
        },
        {
          stage: "Phase 3: Exercise Safe Pause",
          action: "Stop, Record, and Consult",
          explanation: "If an unfamiliar command risks deleting or altering records, stop immediately, note the state, and consult your mentor.",
        },
      ],
      doctrineNote: "Analyst Doctrine: A safe pause is always better than an irreversible guess.",
    },
  },

  "M00-U3-C1": {
    terminologyScaffolding: {
      concept: "Entity Separation (Service vs Account vs Host)",
      analogy: "Like a bank: the Branch Savings Department is the service, a teller's employee ID card is the account, the computer terminal on Counter 4 is the workstation, and the physical person standing at the counter is the human—confusing the terminal with the person leads to false accusations.",
      definition: "The disciplined forensic practice of treating business services, user accounts (e.g., FIN-OPS-01), device hostnames (e.g., BLR-BR-WS-04), and physical humans as separate observable entities in security telemetry.",
      whyItMatters: "An account name appearing in a log does not prove that the assigned employee was physically typing at that keyboard; compromised credentials, automated scripts, or session hijacking can generate actions under that account.",
    },
    instructionalContext: {
      conceptHeadline: "Introducing the Recurring Finance Case & Entity Separation",
      overview: "Throughout our training journey, we will follow a fictional branch finance support service. Mentor Ananya introduces account FIN-OPS-01 and workstation BLR-BR-WS-04. These synthetic identifiers provide realistic enterprise context. Crucially, Ananya demonstrates that an account identifier is not the computer's name, and activity recorded under an account is not automatic proof of a specific person's actions.",
      processStages: [
        {
          stage: "Phase 1: Demarcate Business Service",
          action: "Identify Context",
          explanation: "Understand the role and normal daily activities of the Branch Finance Support desk.",
        },
        {
          stage: "Phase 2: Distinguish Entities",
          action: "Separate Account and Host",
          explanation: "Recognize FIN-OPS-01 as an account credential and BLR-BR-WS-04 as an endpoint device.",
        },
        {
          stage: "Phase 3: Record Observable Facts",
          action: "Document Neutral Telemetry",
          explanation: "Document 'Activity recorded under account FIN-OPS-01 on host BLR-BR-WS-04' rather than asserting human intent.",
        },
      ],
      doctrineNote: "Analyst Doctrine: Never equate an account identifier with proof of a person; keep service, account, and host strictly separated.",
    },
  },

  "M00-U3-C2": {
    terminologyScaffolding: {
      concept: "Scaffolded Progression to L1 Autonomy",
      analogy: "Like learning to drive: you start with an instructor operating dual pedals in an empty parking lot, progress to quiet neighborhood roads, and eventually drive solo on bustling highways following standard road laws.",
      definition: "A pedagogical learning trajectory spanning 15 modules where mentor scaffolding and step-by-step guidance gradually reduce as the learner builds muscle memory, culminating in autonomous L1 triage and shift handover.",
      whyItMatters: "Prevents cognitive overload by introducing everyday computing and networking concepts before complex SIEM searches, while clarifying that course completion prepares you for supervised L1 apprenticeship rather than instant external certification.",
    },
    instructionalContext: {
      conceptHeadline: "The 4-Section Learning Flow & Your Path to L1 Handover",
      overview: "Every chapter follows a consistent 4-section rhythm: Theory Briefing, Animated Visual Story, Interactive Activity, and Knowledge Check. Mentor Ananya explains how hints and direct instructions will gradually taper off across the 15 modules until you can independently evaluate alerts, assemble 5 W's evidence, and deliver a professional shift handover.",
      processStages: [
        {
          stage: "Phase 1: Master the 4-Section Flow",
          action: "Learn with Structure",
          explanation: "Engage with Theory, observe Visual motion, practice Interactive skills, and pass Knowledge Checks.",
        },
        {
          stage: "Phase 2: Build Cumulative Foundations",
          action: "Progress Systematically",
          explanation: "Progress from computers and networks to security fundamentals, SIEM search, and threat triage.",
        },
        {
          stage: "Phase 3: Achieve L1 Practice Readiness",
          action: "Reach Supervised Autonomy",
          explanation: "Transition from a guided visitor to a disciplined apprentice capable of evidence-based triage.",
        },
      ],
      doctrineNote: "Analyst Doctrine: Your destination is disciplined, evidence-based beginner L1 practice, not instant expertise.",
    },
  },

  // --------------------------------------------------------------------------
  // MODULE 01: Computer Fundamentals (The Analyst Workstation, Processes & Orientation)
  // --------------------------------------------------------------------------
  "M01-U1-C1": {
    terminologyScaffolding: {
      concept: "Hardware, Operating Systems (OS) & User Accounts",
      analogy: "Like a corporate office building: Hardware is the physical building, desks, and filing cabinets; the Operating System is the master office manager who assigns desks, schedules meetings, and enforces rules; and User Accounts are employee badges—Standard Badges let people work at their desks, while Master Keys (Admin/Root) are locked away because they can rewire the building or wipe the archives.",
      definition: "The three core building blocks of computing: 1. Physical Hardware (CPU processor, volatile RAM memory, permanent Disk storage); 2. Operating System (master software like Windows or Linux managing hardware and running applications); 3. User Accounts (digital identities separating safe daily work via Standard Users from privileged system control via Administrators/Root).",
      whyItMatters: "Every security event involves a user account running software on an operating system powered by physical hardware. Understanding these basics is essential to knowing whether an action is normal daily work or an attacker attempting to compromise the system.",
    },
    instructionalContext: {
      conceptHeadline: "Foundations: What is Hardware, The Operating System & User Accounts?",
      overview: "Mentor Ravi introduces the three foundational pillars of the analyst workstation: physical Hardware (the electronics), the Operating System (the master software conductor), and User Accounts (the digital identities controlling who can do what). Before investigating advanced cyber intrusions, an analyst must understand how programs execute in memory, how the OS protects resources, and why separating standard users from administrators stops malware in its tracks.",
      processStages: [
        {
          stage: "Pillar 1: Hardware",
          action: "CPU, RAM & Storage",
          explanation: "The CPU calculates instructions, RAM acts as temporary volatile working memory, and Disk/SSD provides permanent long-term storage.",
        },
        {
          stage: "Pillar 2: Operating System",
          action: "Master Software Manager",
          explanation: "Windows or Linux bridges hardware with software—managing memory, coordinating processes, and enforcing system security boundaries.",
        },
        {
          stage: "Pillar 3: User Accounts",
          action: "Standard vs Administrator",
          explanation: "Standard accounts handle daily tasks safely. Administrators possess full system control. Least privilege contains malware blast radiuses.",
        },
      ],
      doctrineNote: "Foundational Doctrine: Hardware provides the physical power, the OS manages the machine, and User Accounts define trust boundaries.",
    },
  },

  "M01-U1-C2": {
    terminologyScaffolding: {
      concept: "Filesystem Paths & Execution Boundaries",
      analogy: "Like an office building's public mail drop vs executive vault: anyone can leave an envelope in the public drop box (user-writable Temp folders), but the executive vault (System32) requires master keys and authorization to access.",
      definition: "The hierarchical directory structures of Windows (NTFS) and Linux (ext4), governing file execution permissions, script extensions (.bat, .ps1, .sh), and distinguishing standard program installation paths from suspicious user-writable staging locations.",
      whyItMatters: "Adversaries cannot write directly to protected system directories without admin rights, so they almost always drop their malicious payloads into user-writable staging paths like AppData\\Local\\Temp or /tmp.",
    },
    instructionalContext: {
      conceptHeadline: "Spotting Anomalous Executable Paths & Permission Abuse",
      overview: "When triaging endpoint alerts, an analyst must immediately inspect the executable's launch path. Standard business software executes from Program Files or /usr/bin. When an executable or script launches from a temporary staging directory or hidden folder, it warrants immediate investigation.",
      processStages: [
        {
          stage: "Phase 1: Path Inspection",
          action: "Verify Directory Context",
          explanation: "Determine if the binary launched from standard program directories or user-writable temporary paths (AppData\\Local\\Temp).",
        },
        {
          stage: "Phase 2: Extension & Masquerading Check",
          action: "Inspect File Extension",
          explanation: "Look for double extensions (invoice.pdf.exe) or living-off-the-land scripts (.ps1, .vbs, .bat) executing from staging folders.",
        },
        {
          stage: "Phase 3: Access Control Verification",
          action: "Check Permissions & Hashes",
          explanation: "Check NTFS ACL permissions, verify digital code-signing status, and extract the SHA-256 hash for reputation lookup.",
        },
      ],
      doctrineNote: "Path Integrity Doctrine: Legitimate software lives in protected directories; binaries executing from Temp or Public are guilty until proven innocent.",
    },
  },

  "M01-U2-C1": {
    terminologyScaffolding: {
      concept: "Parent-Child Process Trees & PID Lineage",
      analogy: "Like a family tree with birth certificates: every child process has an originating parent. If a quiet accounting spreadsheet suddenly gives birth to a command prompt that downloads internet files, the parentage immediately reveals foul play.",
      definition: "The operating system mechanism where running programs are assigned unique Process IDs (PIDs) and track their creating Parent Process ID (PPID), while background services execute headlessly under dedicated service accounts.",
      whyItMatters: "Process tree analysis is the single most reliable method for detecting living-off-the-land techniques (e.g. Word documents spawning PowerShell or cmd.exe).",
    },
    instructionalContext: {
      conceptHeadline: "Deconstructing Process Hierarchies & Lineage Tracking",
      overview: "Every process in Windows and Linux has a parent. By analyzing the parent-child relationship (PPID to PID), an L1 analyst reconstructs the exact sequence of events: what program spawned the process, what arguments were passed, and which user initiated it.",
      processStages: [
        {
          stage: "Phase 1: Lineage Identification",
          action: "Map Child to Parent PPID",
          explanation: "Map child PID back to its parent PPID to determine the execution origin (e.g., explorer.exe vs winword.exe).",
        },
        {
          stage: "Phase 2: Anomaly Evaluation",
          action: "Identify Suspicious Spawns",
          explanation: "Flag unexpected parent-child pairs like office productivity suites spawning command shells or script interpreters.",
        },
        {
          stage: "Phase 3: Command-Line Reconstruction",
          action: "Extract Execution Flags",
          explanation: "Inspect the full command-line arguments to spot base64 encoded strings, hidden windows, or execution bypass flags.",
        },
      ],
      doctrineNote: "Lineage Doctrine: Always trace child processes back to their true parent; child processes inherit privileges and context from their creator.",
    },
  },

  "M01-U2-C2": {
    terminologyScaffolding: {
      concept: "Host Baselines & Masquerading Detection",
      analogy: "Like spotting counterfeit currency: cashiers don't study every fake bill; they know genuine banknotes so intimately that subtle misspellings, wrong textures, or odd paper weights stand out immediately.",
      definition: "The investigative discipline of establishing standard operating baselines (legitimate binary names, standard directory paths, expected parent processes) to detect adversary masquerading, typosquatting (e.g., svch0st.exe), and rogue services.",
      whyItMatters: "Adversaries disguise malware under names resembling legitimate Windows services (scvhost.exe, lsas.exe) to blend into high-volume task lists and deceive inattentive analysts.",
    },
    instructionalContext: {
      conceptHeadline: "Distinguishing Normal System Binaries from Imposter Masquerading",
      overview: "To spot what is anomalous, an analyst must master what is normal. Legitimate Windows system processes have known paths (e.g., svchost.exe must always live in C:\\Windows\\System32 with services.exe as its parent). A process claiming to be svchost running from C:\\Users\\Public is an immediate confirmed intrusion.",
      processStages: [
        {
          stage: "Phase 1: Baseline Verification",
          action: "Check Canonical Path & Parent",
          explanation: "Verify whether the binary name, directory path, and parent match standard OS baseline architecture.",
        },
        {
          stage: "Phase 2: Typosquatting Inspection",
          action: "Spot Character Substitutions",
          explanation: "Scan for character substitutions (zero for 'o'), trailing whitespace, or added letters like csrsss.exe or lsasss.exe.",
        },
        {
          stage: "Phase 3: Digital Signature Check",
          action: "Validate Authenticode Signature",
          explanation: "Confirm whether the binary is digitally signed by Microsoft or an authorized enterprise software vendor.",
        },
      ],
      doctrineNote: "Baseline Doctrine: Know what legitimate system processes look like; if path, parent, or signature doesn't match, it is an imposter.",
    },
  },

  "M01-U3-C1": {
    terminologyScaffolding: {
      concept: "Non-Invasive Command-Line Triage",
      analogy: "Like a doctor taking vital signs with a stethoscope, blood pressure cuff, and thermometer: you measure pulse, oxygen, and temperature to diagnose the patient without performing invasive surgery.",
      definition: "The rapid, non-destructive execution of native operating system command-line utilities (whoami, hostname, tasklist, netstat -ano, uname -a, ps aux, ss -tlpn) to gather volatile host evidence during the first 10 minutes of alert triage.",
      whyItMatters: "Allows L1 analysts to capture volatile observables (logged-in user, active network sockets, running processes) before memory state changes or malware wipes its footprints.",
    },
    instructionalContext: {
      conceptHeadline: "Executing Live Host Orientation with Native OS Utilities",
      overview: "Mentor Ravi instructs you in the first response protocol upon receiving a workstation alert. Using native CLI utilities, you extract crucial volatile evidence without modifying system state or alerting the adversary.",
      processStages: [
        {
          stage: "Phase 1: Identity & Host Verification",
          action: "Run Identity Commands",
          explanation: "Execute `whoami /user` and `hostname` to verify the exact logged-in account SID, privilege group, and asset name.",
        },
        {
          stage: "Phase 2: Process Enumeration",
          action: "Inspect Active Task List",
          explanation: "Execute `tasklist` or `ps aux` to correlate the alert PID with active running binaries and parent session IDs.",
        },
        {
          stage: "Phase 3: Network Socket Mapping",
          action: "Map Open Ports to PIDs",
          explanation: "Execute `netstat -ano` or `ss -tlpn` to map listening ports and outbound foreign IP connections directly back to process PIDs.",
        },
      ],
      doctrineNote: "Volatile Triage Doctrine: Gather evidence with non-invasive native tools; preserve volatile state before taking reboot or containment actions.",
    },
  },

  "M01-U3-C2": {
    terminologyScaffolding: {
      concept: "Entity Correlation & Universal UTC Normalization",
      analogy: "Like air traffic controllers coordinating flights across continents: every radar screen, pilot radio, and control tower operates strictly on Greenwich Mean Time (UTC) to prevent fatal mid-air scheduling collisions.",
      definition: "The rigorous correlation of User identities (SIDs, usernames) with Host assets (hostnames, MACs, IPs) and the conversion of disparate local timestamps (e.g., IST +05:30) into universal Coordinated Universal Time (UTC) to build an indisputable event sequence.",
      whyItMatters: "An intrusion spans firewalls, cloud services, and endpoints across multiple regions. If timestamps are not normalized to UTC, an analyst might conclude an action happened before its cause, destroying forensic integrity.",
    },
    instructionalContext: {
      conceptHeadline: "Mastering Entity Correlation & Multi-Source Timeline Alignment",
      overview: "In this concluding chapter of Module 01, you connect User, Host, and Time. You learn how to convert local IST timestamps (+05:30) from CDAC Bengaluru endpoints to UTC, link user sessions across IP addresses, and build a single chronologically accurate intrusion timeline.",
      processStages: [
        {
          stage: "Phase 1: Entity Resolution",
          action: "Bind Account to Host & Time",
          explanation: "Correlate observed account `FIN-OPS-01` with asset `BLR-BR-WS-04` and explicit local timestamp `14:30:00 IST`.",
        },
        {
          stage: "Phase 2: Timezone Normalization",
          action: "Convert Local Time to UTC",
          explanation: "Convert local Indian Standard Time (+05:30) event logs to universal UTC standard to ensure proper chronological order.",
        },
        {
          stage: "Phase 3: Timeline Sequencing",
          action: "Reconstruct Master Timeline",
          explanation: "Assemble disparate events from endpoint Sysmon, perimeter firewalls, and authentication servers into a single chronological chain.",
        },
      ],
      doctrineNote: "Forensic Integrity Doctrine: Time is the spine of digital forensics; always normalize to UTC before drawing conclusions.",
    },
  },

  // --------------------------------------------------------------------------
  // MODULE 02: Core Networking for Defenders
  // --------------------------------------------------------------------------
  "M02-U1-C1": {
    terminologyScaffolding: {
      concept: "The OSI & TCP/IP Layer Model",
      analogy: "Like an international postal courier system: your letter is written in a language (Application), put into an envelope (Transport), labeled with country & zip code (Network), sorted into delivery trucks (Data Link), and moved across physical roads (Physical).",
      definition: "A hierarchical conceptual framework that standardizes network communications into discrete layers (Application, Transport, Network, Data Link, Physical) to enable interoperability and compartmentalized troubleshooting.",
      whyItMatters: "Allows defenders to pinpoint exactly where an attack is taking place — whether an attacker is tampering with Layer 7 HTTP payloads, Layer 4 TCP port scans, or Layer 3 IP spoofing.",
    },
    instructionalContext: {
      conceptHeadline: "Demystifying Network Layer Telemetry for L1 Analysts",
      overview: "Every network connection creates artifacts across multiple layers. When an alert fires in your SIEM or Zeek sensor, you must correlate layer 3 IP addresses with layer 4 port numbers and layer 7 application headers to understand what transpired.",
      processStages: [
        {
          stage: "Phase 1: Layer Demarcation",
          action: "Identify Layer of Origin",
          explanation: "Determine whether the alert is inspecting raw ethernet frames, routing IP headers, or decrypted HTTP request bodies.",
        },
        {
          stage: "Phase 2: Header Decomposition",
          action: "Extract Protocol Identifiers",
          explanation: "Break down the packet: source IP, destination IP, transport protocol (TCP/UDP), and destination service port.",
        },
        {
          stage: "Phase 3: Telemetry Correlation",
          action: "Link to Host Process",
          explanation: "Map the network socket (IP:Port) back to the specific endpoint process PID that opened the connection.",
        },
      ],
      doctrineNote: "Network Doctrine: Attackers can disguise payloads, but they cannot escape the laws of packet routing.",
    },
  },

  "M02-U1-C2": {
    terminologyScaffolding: {
      concept: "TCP 3-Way Handshake & Connection States",
      analogy: "Like a formal diplomatic phone call: Party A says 'Hello, can you hear me?' (SYN), Party B replies 'Yes, I hear you, can you hear me?' (SYN-ACK), and Party A confirms 'Yes, loud and clear' (ACK). Only then does real conversation begin.",
      definition: "The standardized 3-step synchronization mechanism (SYN -> SYN-ACK -> ACK) that establishes a reliable, bidirectional, stateful TCP connection before application data can be exchanged.",
      whyItMatters: "Allows analysts to immediately detect port scans (half-open SYN scans where ACK is never sent), connection timeouts, and command-and-control beaconing activity.",
    },
    instructionalContext: {
      conceptHeadline: "Analyzing TCP Connection States & Scan Signatures",
      overview: "Understanding TCP connection states is essential for distinguishing between successful connections, rejected attempts, and reconnaissance port scans. An L1 analyst looks at flags and byte flows to evaluate connection health and intent.",
      processStages: [
        {
          stage: "Phase 1: Flag Inspection",
          action: "Examine Packet Flags",
          explanation: "Check TCP control bits: SYN (synchronize), ACK (acknowledge), FIN (finish), and RST (reset).",
        },
        {
          stage: "Phase 2: State Tracking",
          action: "Confirm Session Established",
          explanation: "Verify whether the 3-way handshake completed or if the target host responded with RST (port closed).",
        },
        {
          stage: "Phase 3: Anomaly Detection",
          action: "Spot Port Scanning Patterns",
          explanation: "Identify high-volume SYN packets sent to hundreds of ports without completing the handshake (SYN flood or scan).",
        },
      ],
      doctrineNote: "Stateful Verification: A single SYN is an inquiry; completed data transfer requires a completed 3-way handshake.",
    },
  },

  "M02-U2-C1": {
    terminologyScaffolding: {
      concept: "DNS Resolution & Triage Observables",
      analogy: "Like the global phone directory: you know the name of a business (e.g. google.com), but your phone can only dial their telephone number (e.g. 142.250.190.46). The DNS server looks up the number for you.",
      definition: "The Domain Name System (DNS) protocol that resolves human-readable domain names into machine-routable IP addresses via recursive hierarchical queries.",
      whyItMatters: "Almost all cyberattacks rely on DNS to locate command-and-control servers; analyzing DNS request logs reveals newly registered domains, suspicious query lengths, and tunneling attempts.",
    },
    instructionalContext: {
      conceptHeadline: "Investigating DNS Telemetry & Identifying Malicious Lookups",
      overview: "DNS queries are one of the richest sources of threat telemetry. Before malware connects to a C2 server, it almost always issues a DNS query. Analysts check domain age, reputation, entropy, and query frequency to catch adversary infrastructure.",
      processStages: [
        {
          stage: "Phase 1: Query Extraction",
          action: "Isolate Domain Name",
          explanation: "Extract the exact Fully Qualified Domain Name (FQDN) queried by the endpoint from Zeek or Sysmon Event 22.",
        },
        {
          stage: "Phase 2: Reputation & Age Check",
          action: "Query WHOIS & Threat Feeds",
          explanation: "Check when the domain was registered; domains created less than 30 days ago carrying random characters are high-risk.",
        },
        {
          stage: "Phase 3: Resolution Corroboration",
          action: "Map to IP Observable",
          explanation: "Correlate the returned DNS answer (A record IP) against firewall egress logs to verify if traffic actually flowed.",
        },
      ],
      doctrineNote: "DNS Intelligence: Attackers change IPs frequently, but domain names and query patterns leave permanent footprints in your logs.",
    },
  },

  "M02-U2-C2": {
    terminologyScaffolding: {
      concept: "DNS Tunneling & Data Smuggling",
      analogy: "Like smuggling secret messages out of a prison inside normal letters to the prison librarian: the guards allow letters asking for book titles, so inmates encode stolen documents into fake book titles.",
      definition: "A covert data exfiltration and C2 technique that encodes arbitrary data or commands inside standard DNS query subdomains (e.g. `secretdata123.attacker.com`), bypassing firewalls that allow unrestricted outbound DNS.",
      whyItMatters: "Allows adversaries to steal sensitive files or receive commands even from air-gapped or restricted networks where web browsing and SSH are completely blocked.",
    },
    instructionalContext: {
      conceptHeadline: "Detecting DNS Tunneling & High-Entropy Query Streams",
      overview: "Because DNS traffic (port 53) is commonly allowed outbound by firewalls, adversaries exploit it for tunneling. To spot tunneling, analysts watch for abnormal TXT record requests, massive query volume to a single domain, and high-entropy base64 strings in subdomains.",
      processStages: [
        {
          stage: "Phase 1: Volume & Entropy Analysis",
          action: "Identify Unusual Query Lengths",
          explanation: "Flag DNS queries where subdomains exceed 50 characters or contain random-looking alphanumeric strings.",
        },
        {
          stage: "Phase 2: Frequency & Protocol Inspection",
          action: "Analyze Record Types",
          explanation: "Check for abnormal spikes in TXT or NULL record queries, which are commonly used to return payload data.",
        },
        {
          stage: "Phase 3: Destination Assessment",
          action: "Inspect Authoritative Nameserver",
          explanation: "Identify the authoritative nameserver hosting the domain to see if it belongs to dynamic DNS or known tunneling utilities.",
        },
      ],
      doctrineNote: "Look for Anomalous Density: Normal DNS queries are short and human-readable; tunnel queries are dense, frequent, and unreadable.",
    },
  },

  "M02-U3-C1": {
    terminologyScaffolding: {
      concept: "Internal Subnetting & Network Segmentation",
      analogy: "Like watertight bulkhead compartments in an ocean liner: if seawater breaches one cargo compartment, the waterproof doors seal it off so the entire ship does not sink.",
      definition: "The architectural division of a computer network into smaller, isolated subnetworks and security zones (DMZ, Corporate, Engineering, Finance, Management) controlled by access control lists (ACLs) and internal firewalls.",
      whyItMatters: "Prevents an attacker who compromises a single receptionist workstation from immediately pivoting or spreading ransomware across finance servers and domain controllers.",
    },
    instructionalContext: {
      conceptHeadline: "Network Segmentation Triage & Lateral Movement Boundaries",
      overview: "When investigating an incident, an analyst must understand network zones. Traffic between workstations in the same VLAN is normal, but unexpected direct connections between a guest Wi-Fi laptop and an internal banking database trigger immediate critical alarms.",
      processStages: [
        {
          stage: "Phase 1: Zone Classification",
          action: "Determine Source and Target Zones",
          explanation: "Check IP address ranges (e.g. 10.0.1.0/24 vs 10.0.4.0/24) to identify which security zone is communicating.",
        },
        {
          stage: "Phase 2: Egress & Ingress Policy Check",
          action: "Verify Firewall Rules",
          explanation: "Confirm whether traffic crosses an internal firewall or router, and whether the connection violated zone traversal policies.",
        },
        {
          stage: "Phase 3: Lateral Movement Triage",
          action: "Detect Unauthorized Pivots",
          explanation: "Flag non-standard admin protocols (RDP, SMB, SSH) originating from standard user zones directed toward server subnets.",
        },
      ],
      doctrineNote: "Zone Awareness: Always check what zone the host belongs to; crossing security zones without a business ticket is an intrusion indicator.",
    },
  },

  "M02-U3-C2": {
    terminologyScaffolding: {
      concept: "Perimeter Firewalls vs Internal NAT Gateways",
      analogy: "Like a high-rise office building security checkpoint: the front desk lobby checks employee badges entering from the street (Firewall), while the internal phone switchboard lets 500 office phones share 5 external phone lines (NAT).",
      definition: "Network Address Translation (NAT) maps private RFC 1918 internal IP addresses to public routable IP addresses, while firewalls evaluate stateful rules to allow or deny traffic crossing network perimeters.",
      whyItMatters: "Analysts must correlate external public firewall logs back to internal private NAT table mappings to identify which internal host actually originated a malicious connection.",
    },
    instructionalContext: {
      conceptHeadline: "Correlating Firewall Egress & De-NATing Internal Hosts",
      overview: "When threat intel reports that an external IP was contacted by your organization, the firewall log will show your public gateway IP. You must inspect NAT translation tables to 'de-NAT' the session and identify the actual compromised internal workstation.",
      processStages: [
        {
          stage: "Phase 1: Firewall Log Inspection",
          action: "Locate Egress Record",
          explanation: "Find the firewall event matching the external destination IP and port reported in the threat alert.",
        },
        {
          stage: "Phase 2: NAT Translation Lookup",
          action: "De-NAT Source Address",
          explanation: "Match the firewall source translation port and timestamp against internal NAT gateway logs to pinpoint the private IP.",
        },
        {
          stage: "Phase 3: Internal Host Verification",
          action: "Resolve Asset Identity",
          explanation: "Query DHCP and Active Directory with the private IP to determine the exact hostname and logged-in employee.",
        },
      ],
      doctrineNote: "De-NATing Discipline: Never stop at the firewall gateway IP; trace the session through NAT to identify the real compromised device.",
    },
  },
};

// Generic / Default fallback generator for any chapter in the curriculum
export function generateChapterScaffolding(
  chapterId: string,
  chapterTitle: string,
  conceptText?: string,
  unitTitle?: string,
  moduleTitle?: string
): ChapterScaffoldingItem {
  // If explicitly mapped, return exact curated entry
  if (CHAPTER_SCAFFOLDING_MAP[chapterId]) {
    return CHAPTER_SCAFFOLDING_MAP[chapterId];
  }

  // Generate intelligent contextual scaffolding based on title and concept
  const titleLower = chapterTitle.toLowerCase();
  const conceptClean = conceptText || `Core operational doctrine and defensive techniques for ${chapterTitle}`;

  let conceptName = chapterTitle;
  let analogy = `Like a security checkpoint verifying travelers: standard operating procedures verify that incoming events match authorized business patterns before granting access to critical enterprise assets.`;
  let definition = `A structured operational methodology and telemetry verification protocol governing how ${chapterTitle.toLowerCase()} is detected, analyzed, and mitigated within enterprise SOC workflows.`;
  let whyItMatters = `Ensures L1 analysts can rapidly isolate genuine security threats, eliminate noisy false alarms, and maintain continuous visibility across organizational assets.`;

  // Dynamic domain detection
  if (titleLower.includes('phish') || titleLower.includes('email')) {
    conceptName = "Email Telemetry & Header Verification";
    analogy = "Like checking a wax-sealed postal letter: you examine the postmark, return address authenticity, and whether the envelope contains hidden dangerous powders before handing it to the executive.";
    definition = "The systematic inspection of email envelope headers, SPF/DKIM/DMARC authentication records, and attached payloads to distinguish legitimate correspondence from adversary social engineering.";
    whyItMatters = "Email remains the primary attack vector for enterprise breaches; rapid header analysis stops ransomware and credential theft before users click.";
  } else if (titleLower.includes('kerberos') || titleLower.includes('ticket') || titleLower.includes('identity') || titleLower.includes('auth')) {
    conceptName = "Identity Authentication & Token Security";
    analogy = "Like a hotel electronic keycard: when you check in at the front desk (KDC), you receive a programmed keycard (TGT) that lets you unlock only your room and the gym, without showing your passport at every door.";
    definition = "The cryptographic verification of user identities and issuance of temporary, signed session tickets that authorize access to network resources without repeatedly transmitting plaintext passwords.";
    whyItMatters = "Attackers steal identity tokens (Pass-the-Hash, Golden Ticket) to masquerade as legitimate administrators; detecting token misuse prevents full Active Directory takeovers.";
  } else if (titleLower.includes('edr') || titleLower.includes('process') || titleLower.includes('endpoint')) {
    conceptName = "Endpoint Behavioral Telemetry & Process Trees";
    analogy = "Like a security camera recording family lineage: if a harmless calculator app suddenly gives birth to a command prompt that downloads files from the internet, you immediately know something is wrong.";
    definition = "Continuous low-level monitoring of operating system events (process execution, thread injection, registry modifications, and disk writes) to spot anomalous adversary behaviors in real time.";
    whyItMatters = "Modern fileless malware avoids traditional antivirus; inspecting parent-child process relationships exposes living-off-the-land techniques.";
  } else if (titleLower.includes('pcap') || titleLower.includes('packet') || titleLower.includes('traffic') || titleLower.includes('zeek')) {
    conceptName = "Deep Packet Inspection & Flow Telemetry";
    analogy = "Like black box flight recorders on an airplane: while radar tells you where the plane flew, the flight recorder preserves every pilot command, cabin alert, and sensor reading during the flight.";
    definition = "The capturing and forensic analysis of raw network frames (PCAP) and normalized network session logs (Zeek/Suricata) to inspect payloads, protocol anomalies, and exfiltration channels.";
    whyItMatters = "Provides undeniable forensic evidence of what data actually crossed the wire, helping defenders prove whether confidential assets were successfully stolen.";
  } else if (titleLower.includes('siem') || titleLower.includes('log') || titleLower.includes('ingest')) {
    conceptName = "SIEM Log Ingestion & Schema Normalization";
    analogy = "Like the central police dispatch center: hundreds of police radios, 911 phone calls, and traffic cameras all stream into one dashboard where incidents are tagged, filtered, and prioritized on a single screen.";
    definition = "The centralized aggregation, parsing, indexing, and correlation of security events across hundreds of heterogeneous servers, firewalls, and applications into a common searchable schema.";
    whyItMatters = "Without a normalized SIEM, an analyst would have to manually log into 50 different servers to investigate a single suspicious user login.";
  } else if (titleLower.includes('sigma') || titleLower.includes('rule') || titleLower.includes('detect') || titleLower.includes('yara')) {
    conceptName = "Detection Engineering & Correlation Rules";
    analogy = "Like tripwire laser alarms in a bank vault: the alarm doesn't fire when authorized bank tellers walk during daytime, but trips instantly if someone crosses the laser field at 3:00 AM on Sunday.";
    definition = "The systematic design of logic-based detection rules (Sigma, YARA, SIEM correlations) that evaluate structured telemetry fields to trigger alerts when adversary patterns occur.";
    whyItMatters = "High-quality detection rules catch attackers while minimizing false positive fatigue, allowing analysts to respond within strict SLA response windows.";
  } else if (titleLower.includes('triage') || titleLower.includes('playbook') || titleLower.includes('sop') || titleLower.includes('sop')) {
    conceptName = "Alert Triage & Standard Playbooks";
    analogy = "Like an airline pilot's emergency checklist during engine failure: pilots do not improvise; they pull up the exact engine failure checklist and execute verified steps in sequential order.";
    definition = "A formalized, repeatable procedure that guides an analyst step-by-step through evaluating alerts, verifying facts, eliminating false alarms, and executing containment actions.";
    whyItMatters = "Standardizes defense quality across shifts so critical containment steps are never skipped during stressful security emergencies.";
  } else if (titleLower.includes('mitre') || titleLower.includes('intel') || titleLower.includes('threat') || titleLower.includes('att&ck')) {
    conceptName = "Threat Intelligence & MITRE ATT&CK Mapping";
    analogy = "Like a sports team's scouting playbook: studying the opposing team's preferred formations, trick plays, and quarterback tendencies so defenders can anticipate and block the play before the ball is thrown.";
    definition = "An evidence-based knowledge repository and matrix of adversary tactics, techniques, and procedures (TTPs) used to understand threat actor methods and identify gaps in defensive coverage.";
    whyItMatters = "Transforms defense from reactive guessing to proactive hunting by mapping observable artifacts directly to documented adversary behaviors.";
  } else if (titleLower.includes('incident') || titleLower.includes('contain') || titleLower.includes('response')) {
    conceptName = "Incident Response & Threat Containment";
    analogy = "Like closing emergency fire doors in a burning skyscraper: isolating the fire to a single wing of the building while firefighters extinguish the blaze and rescue the occupants safely.";
    definition = "The rapid execution of technical containment measures (endpoint network isolation, session revocation, firewall rule blocks) to halt adversary activity while preserving forensic evidence.";
    whyItMatters = "Minimizes dwell time and operational damage, stopping an initial single-machine foothold from escalating into an enterprise-wide disaster.";
  }

  return {
    terminologyScaffolding: {
      concept: conceptName,
      analogy,
      definition,
      whyItMatters,
    },
    instructionalContext: {
      conceptHeadline: `Instructional Foundations: ${conceptName}`,
      overview: `In this chapter, analysts focus on the core principles of ${chapterTitle}. Grounded in active CDAC Bengaluru SOC protocols, you will learn to understand the foundational mechanics of ${conceptName.toLowerCase()}, identify key observables, and apply empirical triage discipline.`,
      processStages: [
        {
          stage: "Phase 1: Telemetry Ingestion",
          action: "Capture & Identify",
          explanation: `Inspect raw event streams from sensors to locate relevant ${chapterTitle.toLowerCase()} indicators and extract core observables (User, Host, IP).`,
        },
        {
          stage: "Phase 2: Contextual Triage",
          action: "Correlate & Cross-Check",
          explanation: `Compare observed activity against organizational baselines, change management records, and standard operating procedures.`,
        },
        {
          stage: "Phase 3: Operational Decision",
          action: "Resolve or Escalate",
          explanation: `Document findings clearly with UTC timestamps, rule out benign false positives, and formulate the appropriate tier-1 response.`,
        },
      ],
      doctrineNote: "Empirical Rigor: Never guess; verify User, Host, IP, and Timestamps across independent telemetry feeds.",
    },
  };
}

// Master accessor
export function getChapterScaffolding(
  chapterId: string,
  chapterTitle: string,
  conceptText?: string,
  unitTitle?: string,
  moduleTitle?: string
): ChapterScaffoldingItem {
  return generateChapterScaffolding(chapterId, chapterTitle, conceptText, unitTitle, moduleTitle);
}
