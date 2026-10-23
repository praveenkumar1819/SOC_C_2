// CDAC BENGALURU — SOC ANALYST L1 (VERSION 2 CURRICULUM)
// 90-hour story-based curriculum | 50h theory + 40h practical labs | 15 Modules, 45 Units, 90 Chapters, 45 Assessments, 40 Labs

import { CHAPTER_V2_SPECS } from './curriculum-v2-specs-data';
import {
  TerminologyScaffolding,
  InstructionalConceptContext,
  getChapterScaffolding,
} from './curriculum-v2-scaffolding-data';
export { CHAPTER_V2_SPECS, getChapterScaffolding };
export type { TerminologyScaffolding, InstructionalConceptContext };

export interface ExtraBox {
  id: string;
  type: 'text' | 'image' | 'icon' | 'callout' | 'banner';
  title?: string;
  content: string;
  imageUrl?: string;
  iconName?: string;
  calloutType?: 'info' | 'warning' | 'success' | 'danger' | 'tip';
  animation?: 'none' | 'pulse' | 'bounce' | 'glow' | 'slide';
  order?: number;
}

export interface FormalDefinition {
  id?: string;
  term: string;
  definition: string;
  sourceStandard: 'NIST' | 'ISO' | 'MITRE' | 'CDAC' | 'RFC' | 'SANS' | 'CISA' | 'OTHER';
  sourceUrl?: string;
  citationCode?: string;
}

export interface SectionStyleConfig {
  fontFamily?: 'sans' | 'mono' | 'serif' | 'cyber' | 'poppins' | 'samsung' | 'beebeez' | 'striker' | 'spartan';
  fontScale?: 'compact' | 'normal' | 'relaxed' | 'large';
  headingWeight?: 'normal' | 'semibold' | 'bold' | 'extrabold';
  lineHeight?: 'tight' | 'normal' | 'relaxed' | 'loose';
  accentColor?: string;
}

export interface ChapterSection1Theory {
  title: string;
  subtitle: string;
  content: string;
  keyTakeaway: string;
  cdacScenario: string;
  audioUrl?: string;
  audioDuration?: string;
  audioAutoplay?: boolean;
  mentor?: string;
  mentorRole?: string;
  formalDefinitions?: FormalDefinition[];
  extraBoxes?: ExtraBox[];
  elementOrder?: string[];
  styleOverride?: SectionStyleConfig;
  terminologyScaffolding?: TerminologyScaffolding;
  instructionalContext?: InstructionalConceptContext;
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
  audioUrl?: string;
  audioDuration?: string;
  audioAutoplay?: boolean;
  extraBoxes?: ExtraBox[];
  elementOrder?: string[];
  styleOverride?: SectionStyleConfig;
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
  audioUrl?: string;
  audioAutoplay?: boolean;
  extraBoxes?: ExtraBox[];
  elementOrder?: string[];
  styleOverride?: SectionStyleConfig;
}

export type QuestionType = 'mcq' | 'matching' | 'drag-drop' | 'input-value';

export interface QuestionMatchingPair {
  id: string;
  left: string;
  right: string;
}

export interface QuestionDragDropItem {
  id: string;
  token: string;
  targetSlot: string;
}

export interface QuestionItem {
  id?: string;
  type?: QuestionType;
  question: string;
  options: string[];
  correctAnswer: number | string | Record<string, string>;
  explanation: string;
  matchingPairs?: QuestionMatchingPair[];
  dragDropItems?: QuestionDragDropItem[];
  acceptedAnswers?: string[];
  caseSensitive?: boolean;
}

export interface ChapterSection4KnowledgeCheck {
  title: string;
  questions: QuestionItem[];
  audioUrl?: string;
  audioAutoplay?: boolean;
  extraBoxes?: ExtraBox[];
  elementOrder?: string[];
  styleOverride?: SectionStyleConfig;
}

export interface V2Chapter {
  id: string;
  chapterNumber?: number;
  title: string;
  duration: number; // minutes
  xpReward?: number;
  mentor?: string;
  mentorRole?: string;
  story?: string;
  concept?: string;
  visualDesc?: string;
  interactiveDesc?: string;
  questions?: QuestionItem[];
  section1_theory?: ChapterSection1Theory;
  section2_visual?: ChapterSection2Visual;
  section3_interactive?: ChapterSection3Interactive;
  section4_knowledgeCheck?: ChapterSection4KnowledgeCheck;
}

export interface V2ChapterNormalized {
  id: string;
  chapterNumber: number;
  title: string;
  duration: number;
  xpReward: number;
  mentor: string;
  mentorRole: string;
  story: string;
  concept?: string;
  visualDesc?: string;
  interactiveDesc?: string;
  questions?: QuestionItem[];
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

export const V2_MODULES: V2Module[] = [
  {
    "id": "00",
    "title": "Orientation: Your First SOC Shift",
    "level": "Beginner",
    "difficulty": "BEGINNER",
    "order": 0,
    "theoryHours": 1,
    "labHours": 0,
    "totalHours": 1,
    "mentor": "Ananya",
    "mentorRole": "SOC Shift Lead & Learning Guide",
    "story": "You join the fictionalised CDAC Bengaluru learning SOC. Mentor Ananya introduces the learning campus, teaching zones, safe lab boundaries, and the recurring branch finance case.",
    "units": [
      {
        "id": "M00-U1",
        "unitNumber": 1,
        "title": "Orientation & Teaching Zones",
        "description": "Arrive as a curious visitor, learn the first golden rule of SOC triage, and explore the 6 specialized campus teaching zones.",
        "chapters": [
          {
            "id": "M00-U1-C1",
            "title": "A visitor, not yet an analyst",
            "duration": 7,
            "xpReward": 35,
            "mentor": "Ananya",
            "mentorRole": "SOC Shift Lead & Learning Guide",
            "concept": "Arriving as a visiting learner with curiosity rather than technical expertise; understanding ordinary computer activity first, and applying the golden rule: ask before changing anything.",
            "story": "Morning light falls across a fictionalised CDAC Bengaluru learning campus. A visitor badge reads 'SOC Learner'. Mentor Ananya welcomes you.",
            "visualDesc": "Animated Visual Story: Morning light across CDAC Bengaluru campus, badge issuance, and the first golden rule: ask before changing anything.",
            "interactiveDesc": "Interactive Matcher: Match orientation principles, learner preferences, and safe guidance.",
            "section1_theory": {
              "title": "A visitor, not yet an analyst",
              "subtitle": "Welcome to CDAC Bengaluru & The First Golden Rule of SOC Triage",
              "content": "Welcome to the fictionalised CDAC Bengaluru Security Operations Centre (SOC) learning environment. As you step through the reception doors, morning light falls across the training campus, and you receive an orientation badge reading “SOC Learner.”\n\nMentor Ananya, the SOC shift lead, greets you warmly:\n“Welcome. You do not need an IT background, and nobody expects you to investigate an attack today.”\nYou might reply: “I use a phone and a laptop every day, but I do not understand what happens inside them.”\nAnanya smiles: “That is our exact starting point. First, we will understand ordinary activity; later, we will recognise activity that needs checking.”\n\nThe Cardinal Rule of Security Operations\nIn security monitoring, beginners often fear that they will make a mistake or feel pressured to click buttons hastily when an alert sounds. Ananya establishes our foundational rule right away:\n“First question: if a screen shows something unfamiliar, should you guess, change it, or ask for help?”\nThe only safe and professional response is:\n“Ask for help before changing anything.”\nAnanya confirms: “Exactly. Curiosity is welcome; unsupported action is not.”\n\nWhy Ordinary Activity Comes First\nYou cannot spot an anomaly without knowing what normal looks like. In cybersecurity, defenders call this the \"operational baseline.\" Before opening complex security consoles, we first learn how an everyday computer boots up, how files are stored, and how people communicate across networks. When you encounter something strange, disciplined analysts do not guess—they observe, record, and verify.",
              "keyTakeaway": "Curiosity is welcome; unsupported action is not. Never guess when encountering unfamiliar activity—always observe and ask for help before changing anything.",
              "cdacScenario": "Mentor Ananya welcomes the visiting learner to CDAC Bengaluru, issues the 'SOC Learner' badge, and introduces the foundational doctrine of safe observation.",
              "formalDefinitions": [
                {
                  "term": "Operational Baseline",
                  "sourceStandard": "NIST",
                  "citationCode": "NIST SP 800-137",
                  "definition": "A documented set of specifications or normal operational activity patterns for a system, against which subsequent changes or anomalies are compared."
                },
                {
                  "term": "Security Operations Centre (SOC)",
                  "sourceStandard": "ISO",
                  "citationCode": "ISO/IEC 27035",
                  "definition": "A centralised operational unit where enterprise information systems are continuously monitored, assessed, and protected against cybersecurity incidents."
                },
                {
                  "term": "Disciplined Restraint",
                  "sourceStandard": "CDAC",
                  "citationCode": "CDAC-SOP-L1-01",
                  "definition": "The core operational posture requiring an apprentice analyst to verify observable facts and consult senior mentors before modifying unfamiliar configurations."
                }
              ]
            },
            "questions": [
              {
                "id": "q-M00-U1-C1-1",
                "type": "mcq",
                "question": "If a training or security console screen displays something unfamiliar, what should you do?",
                "options": [
                  "Guess what it means and click settings randomly to test them",
                  "Ask for help before changing anything",
                  "Immediately power off the entire facility",
                  "Pretend you understand and ignore the screen"
                ],
                "correctAnswer": 1,
                "explanation": "As Mentor Ananya emphasizes: 'Curiosity is welcome; unsupported action is not.' Always ask for help before changing anything unfamiliar."
              },
              {
                "id": "q-M00-U1-C1-2",
                "type": "matching",
                "question": "Match each orientation concept to its core operational meaning:",
                "options": [],
                "correctAnswer": 0,
                "explanation": "Establishing these foundational baselines ensures a confident, risk-free learning journey.",
                "matchingPairs": [
                  { "id": "p1", "left": "Visitor Badge: 'SOC Learner'", "right": "Marks your start as a visiting learner; no prior IT degree expected" },
                  { "id": "p2", "left": "Starting Baseline", "right": "Understanding ordinary computer activity before hunting for threats" },
                  { "id": "p3", "left": "Unfamiliar Screen Response", "right": "Stop, observe, and ask for help before changing any system setting" },
                  { "id": "p4", "left": "Curiosity vs Action", "right": "Curiosity is always welcome, but unsupported speculative action is prohibited" }
                ]
              },
              {
                "id": "q-M00-U1-C1-3",
                "type": "drag-drop",
                "question": "Classify each analyst action into the appropriate behavioral category:",
                "options": [],
                "correctAnswer": 0,
                "explanation": "Disciplined restraint protects live systems from well-intentioned but unauthorized changes.",
                "dragDropItems": [
                  { "id": "d1", "token": "Asking mentor when an unfamiliar instruction appears", "targetSlot": "Recommended Action" },
                  { "id": "d2", "token": "Clicking random administrative settings to guess what happens", "targetSlot": "Unsafe / Prohibited" },
                  { "id": "d3", "token": "Observing everyday normal activity before hunting for threats", "targetSlot": "Recommended Action" },
                  { "id": "d4", "token": "Modifying workstation configuration without guidance", "targetSlot": "Unsafe / Prohibited" }
                ]
              },
              {
                "id": "q-M00-U1-C1-4",
                "type": "input-value",
                "question": "What title is printed on the visitor orientation badge handed to you by Mentor Ananya? (Enter 2 words)",
                "options": [],
                "correctAnswer": 0,
                "explanation": "Ananya issues you a visitor badge reading 'SOC Learner' to indicate you are beginning as an apprentice.",
                "acceptedAnswers": ["SOC Learner", "SOC LEARNER", "soc learner"]
              }
            ]
          },
          {
            "id": "M00-U1-C2",
            "title": "The centre and its people",
            "duration": 7,
            "xpReward": 35,
            "mentor": "Ananya",
            "mentorRole": "SOC Shift Lead & Learning Guide",
            "concept": "Understanding SOC role boundaries: the SOC monitors security and coordinates with system owners, but does not own every service or repair every computer.",
            "story": "Mentor Ananya displays a map of the training centre revealing 6 distinct teaching zones: Staff Support, Computing, Network Services, Identity Services, Security Monitoring, and Response Coordination.",
            "visualDesc": "Animated Visual Story: The 6 teaching zones on campus, showing ticket routing and SOC cross-team cooperation.",
            "interactiveDesc": "Request Sorter: Route incoming requests (broken keyboard, password reset, security alert, network link) to their respective teaching zones.",
            "section1_theory": {
              "title": "The centre and its people",
              "subtitle": "The 6 Teaching Zones & Why the SOC Does Not Own Every Service",
              "content": "Mentor Ananya brings up an illustrated map of the CDAC Bengaluru learning facility. The map highlights six distinct teaching zones:\n1. Staff Support (Hardware, peripherals, desktop setups)\n2. Computing & Workstations (End-user devices and operating systems)\n3. Network Services (Switches, routers, firewalls, and campus cabling)\n4. Identity Services (User accounts, passwords, MFA credentials, permissions)\n5. Security Monitoring (The SOC: telemetry streams, alert queues, triage)\n6. Response Coordination (Playbooks, incident containment, recovery)\n(Alongside an Industrial Demonstration Zone simulating factory PLCs).\n\nAnanya clarifies immediately:\n“These are teaching zones, not a claim about the real organisation's departments or infrastructure.”\nThe learner asks an essential question:\n“Does the SOC repair every computer and run every department?”\nAnanya responds firmly:\n“No. It monitors security and coordinates with people who own devices, accounts, networks, and business services.”\n\nWhy Boundaries and Cooperation Matter\nA common misconception among beginners is that cybersecurity analysts control every computer, rewrite every application, and replace broken hardware. In reality, modern enterprises rely on specialized division of responsibility:\n- If an employee spills tea on their keyboard, they contact Staff Support.\n- If a staff member forgets their domain password, Identity Services manages credential resets.\n- If a network cable is unplugged, Network Services investigates the switch port.\n- When an anomalous after-hours sign-in alert fires, the Security Monitoring team investigates.\n\nAnanya poses the key question:\n“Who should investigate an alert while keeping the service owner informed?”\nThe learner replies:\n“The security team, with the appropriate owner's help.”\nAnanya smiles:\n“Correct. Cooperation matters more than pretending one team knows everything.”",
              "keyTakeaway": "The SOC monitors security and coordinates with service owners—it does not own or repair every system in the enterprise. Cooperation matters more than pretending one team knows everything.",
              "cdacScenario": "Mentor Ananya walks the learner across the 6 campus teaching zones, showing why ticket routing and cross-team cooperation are vital.",
              "formalDefinitions": [
                {
                  "term": "Service Owner",
                  "sourceStandard": "ISO",
                  "citationCode": "ISO/IEC 20000-1",
                  "definition": "The individual or business unit accountable for the delivery, maintenance, and operational integrity of a specific IT service or system."
                },
                {
                  "term": "Role Demarcation",
                  "sourceStandard": "NIST",
                  "citationCode": "NIST SP 800-53 AC-5",
                  "definition": "The separation of organizational duties between security monitoring personnel and system administrators to ensure accountability and prevent conflicts of interest."
                },
                {
                  "term": "Cross-Functional Cooperation",
                  "sourceStandard": "CISA",
                  "citationCode": "CISA Incident Response Guide",
                  "definition": "Collaborative engagement between security analysts and IT asset owners during incident triage to ensure operational continuity."
                }
              ]
            },
            "questions": [
              {
                "id": "q-M00-U1-C2-1",
                "type": "mcq",
                "question": "Does the Security Operations Centre (SOC) repair every broken computer and manage every business department?",
                "options": [
                  "Yes, the SOC is responsible for all physical hardware repairs and payroll software",
                  "No. It monitors security telemetry and coordinates with the teams who own devices, accounts, networks, and services",
                  "Yes, security analysts replace all IT helpdesk and network engineering staff",
                  "Only when the manager is absent"
                ],
                "correctAnswer": 1,
                "explanation": "The SOC monitors security signals and coordinates with service owners; it does not replace helpdesk, network, or identity administrators."
              },
              {
                "id": "q-M00-U1-C2-2",
                "type": "matching",
                "question": "Match each operational request to its designated teaching zone team:",
                "options": [],
                "correctAnswer": 0,
                "explanation": "Proper request routing ensures issues reach the responsible domain owners quickly.",
                "matchingPairs": [
                  { "id": "p1", "left": "Physical broken keyboard on desk 12", "right": "Staff Support (Hardware & Desktop Peripherals)" },
                  { "id": "p2", "left": "Password reset and account unlock request", "right": "Identity Services (User Credentials & Authentication)" },
                  { "id": "p3", "left": "Suspicious login alert at 03:00 AM", "right": "Security Monitoring (SOC Triage & Alert Analysis)" },
                  { "id": "p4", "left": "Network switch link flapping on floor 2", "right": "Network Services (Switches, Cabling & Routing)" }
                ]
              },
              {
                "id": "q-M00-U1-C2-3",
                "type": "drag-drop",
                "question": "Classify each task into either SOC Responsibility or Service Owner Responsibility:",
                "options": [],
                "correctAnswer": 0,
                "explanation": "Security teams monitor and coordinate; asset and service owners maintain and configure the underlying systems.",
                "dragDropItems": [
                  { "id": "d1", "token": "Triaging a suspicious outbound connection alert", "targetSlot": "SOC Responsibility" },
                  { "id": "d2", "token": "Replacing physical printer toner cartridges", "targetSlot": "Service Owner Responsibility" },
                  { "id": "d3", "token": "Coordinating an alert investigation with system owners", "targetSlot": "SOC Responsibility" },
                  { "id": "d4", "token": "Provisioning a new employee email account", "targetSlot": "Service Owner Responsibility" }
                ]
              },
              {
                "id": "q-M00-U1-C2-4",
                "type": "input-value",
                "question": "Who should investigate a suspicious security alert while keeping the service owner informed? (Enter 2 words)",
                "options": [],
                "correctAnswer": 0,
                "explanation": "Mentor Ananya confirms: 'The security team, with the appropriate owner's help.'",
                "acceptedAnswers": ["security team", "Security team", "Security Team", "SOC team", "SOC Team"]
              }
            ]
          }
        ],
        "assessment": {
          "id": "M00-U1-A",
          "title": "Unit 1 Assessment: Orientation & Teaching Zones",
          "duration": 10,
          "passingScore": 80,
          "xpReward": 50,
          "questions": [
            {
              "question": "A user calls stating their physical workstation keyboard is unresponsive after a spill. To which campus team should this request be routed?",
              "options": [
                "Security Operations Centre (SOC) Tier 1",
                "Staff Support (Hardware & Desktop Peripherals)",
                "Incident Response War Room",
                "Industrial Demonstration Zone"
              ],
              "correctAnswer": 1,
              "explanation": "Physical hardware faults belong to Staff Support. The SOC investigates security alarms, not peripheral hardware maintenance."
            },
            {
              "question": "Why does the SOC coordinate with service owners during an alert investigation rather than acting completely alone?",
              "options": [
                "Because service owners understand normal business activity, authorized maintenance, and system criticality",
                "Because the SOC has no computers of its own",
                "To pass off all blame to other departments",
                "Because security analysts are not allowed to read alerts"
              ],
              "correctAnswer": 0,
              "explanation": "As Mentor Ananya emphasizes: 'Cooperation matters more than pretending one team knows everything.' Service owners provide context on authorized business operations."
            },
            {
              "question": "What is the primary operational rule when an apprentice analyst encounters an unfamiliar screen in the training environment?",
              "options": [
                "Reboot the domain controller",
                "Ask for help before changing anything",
                "Guess the configuration setting and test it live",
                "Delete the associated configuration file"
              ],
              "correctAnswer": 1,
              "explanation": "Disciplined restraint: 'Ask for help before changing anything. Curiosity is welcome; unsupported action is not.'"
            },
            {
              "question": "What is the title on the visitor badge issued to you at CDAC Bengaluru? (Enter 2 words)",
              "options": [],
              "correctAnswer": 0,
              "explanation": "You receive a visitor badge reading 'SOC Learner'.",
              "acceptedAnswers": ["SOC Learner", "SOC LEARNER", "soc learner"]
            }
          ]
        }
      },
      {
        "id": "M00-U2",
        "unitNumber": 2,
        "title": "Safe Practice & Evidence Preservation",
        "description": "Master the boundaries of your blue-bordered training console, host-only VM isolation, and the discipline of preserving original evidence.",
        "chapters": [
          {
            "id": "M00-U2-C1",
            "title": "Your practice space",
            "duration": 7,
            "xpReward": 35,
            "mentor": "Ravi",
            "mentorRole": "Systems & Network Foundations Guide",
            "concept": "Safe practice space: A virtual machine is not automatically a safety barrier; host-only isolation settings and snapshot resets ensure safe, non-destructive learning.",
            "story": "A blue border surrounds the learning console. Mentor Ravi demonstrates isolated virtual machines, host-only networking, and why lab permissions never extend to outside networks.",
            "visualDesc": "Animated Visual Story: Blue-bordered training console, isolated sandbox VM, snapshot rollback, and boundary checks.",
            "interactiveDesc": "Boundary Sorter: Classify tasks into Authorized Safe Practice vs Prohibited / Out of Scope.",
            "section1_theory": {
              "title": "Your practice space",
              "subtitle": "The Blue-Bordered Console, Virtual Machine Isolation & Lab Scope",
              "content": "Mentor Ravi steps forward to introduce your practice workstation. As you look at the monitor, a distinct blue border surrounds the desktop. Nearby, an illustration of a locked heavy doorway represents production enterprise operations.\n\nRavi explains the safety boundary:\n“Everything you touch in this course is a supplied simulation, training dataset, or explicitly authorised isolated lab.”\nThe learner asks a natural question:\n“Can a virtual machine affect something outside the lab?”\nRavi answers directly:\n“Yes, if configured badly. Use the supplied isolation settings; a virtual machine is not automatically a safety barrier.”\n\nHow Virtual Machines Work & Why Isolation Matters\nA Virtual Machine (VM) is a software computer running inside physical hardware. It feels like an independent PC, with its own operating system and files. However, if a virtual machine is set to \"Bridged\" network mode, it shares the physical network card with the host computer—meaning any scan, payload, or network traffic can reach production servers, campus Wi-Fi, or home routers!\n\nTo prevent accidental leaks, our training environment enforces two strict safeguards:\n1. Host-Only Network Isolation: The VM communicates only with simulated training nodes inside your console. All outbound internet and local network bridging are disabled.\n2. Snapshot Rollback: Before testing any command or opening a practice sample, the system records a clean snapshot. If anything breaks, a single reset restores the clean baseline in seconds.\n\nThe Lab Boundary Rule\nRavi tests your understanding:\n“May you point a lab exercise at your college network without permission?”\nThe learner replies:\n“No. Permission for this lab does not include other systems.”\nRavi confirms:\n“Correct. Stop and ask whenever the lab boundary is unclear.”",
              "keyTakeaway": "A virtual machine is not automatically a safety barrier—always use supplied isolation settings. Practice stays strictly within authorized boundaries; never point lab tools at outside or production networks.",
              "cdacScenario": "Mentor Ravi demonstrates sandbox networking, snapshot resets, and the strict rules governing lab boundaries.",
              "formalDefinitions": [
                {
                  "term": "Isolated Sandbox",
                  "sourceStandard": "NIST",
                  "citationCode": "NIST SP 800-86",
                  "definition": "A controlled, segregated compute environment configured to prevent software execution or network communications from impacting production systems."
                },
                {
                  "term": "Host-Only Networking",
                  "sourceStandard": "RFC",
                  "citationCode": "RFC 1918",
                  "definition": "A virtual network adapter configuration that restricts communications exclusively between virtual machines and the host hypervisor, blocking external routing."
                },
                {
                  "term": "Authorization Scope",
                  "sourceStandard": "ISO",
                  "citationCode": "ISO/IEC 27001",
                  "definition": "The defined, documented perimeter within which testing, monitoring, or analysis activities are explicitly permitted by organizational leadership."
                }
              ]
            },
            "questions": [
              {
                "id": "q-M00-U2-C1-1",
                "type": "mcq",
                "question": "Is a virtual machine (VM) automatically a guaranteed safety barrier on its own?",
                "options": [
                  "Yes, VMs can never send network traffic to other machines under any circumstances",
                  "No. If configured badly (such as in bridged mode), it can affect outside systems; you must use supplied isolation settings",
                  "Yes, because virtual machines do not use electricity",
                  "No, virtual machines cannot run software"
                ],
                "correctAnswer": 1,
                "explanation": "As Mentor Ravi warns, a VM is not automatically safe on its own. Misconfigured network adapters can expose outside networks unless host-only isolation is active."
              },
              {
                "id": "q-M00-U2-C1-2",
                "type": "matching",
                "question": "Match each lab safety mechanism to its operational purpose:",
                "options": [],
                "correctAnswer": 0,
                "explanation": "Understanding these safeguards allows you to practice realistic techniques with complete peace of mind.",
                "matchingPairs": [
                  { "id": "p1", "left": "Blue Console Border", "right": "Visual indicator confirming you are inside an authorized training environment" },
                  { "id": "p2", "left": "Host-Only Networking", "right": "Isolates practice traffic from the campus network and public internet" },
                  { "id": "p3", "left": "Snapshot Rollback", "right": "Instant recovery procedure restoring the VM to a known clean baseline" },
                  { "id": "p4", "left": "Lab Scope Boundary", "right": "Authorization applies strictly to lab targets; outside networks are prohibited" }
                ]
              },
              {
                "id": "q-M00-U2-C1-3",
                "type": "drag-drop",
                "question": "Classify each activity into Authorized Safe Practice or Prohibited / Out of Scope:",
                "options": [],
                "correctAnswer": 0,
                "explanation": "Never probe, scan, or execute tools against third-party or production networks without written permission.",
                "dragDropItems": [
                  { "id": "d1", "token": "Running commands on supplied isolated training VM", "targetSlot": "Authorized Safe Practice" },
                  { "id": "d2", "token": "Pointing a network scanner at your college or home Wi-Fi", "targetSlot": "Prohibited / Out of Scope" },
                  { "id": "d3", "token": "Using snapshot reset to restore a clean baseline", "targetSlot": "Authorized Safe Practice" },
                  { "id": "d4", "token": "Changing VM adapter to bridged mode to access production LAN", "targetSlot": "Prohibited / Out of Scope" }
                ]
              },
              {
                "id": "q-M00-U2-C1-4",
                "type": "input-value",
                "question": "What color visual border surrounds your training console to signify an authorized practice space? (Enter 1 color word)",
                "options": [],
                "correctAnswer": 0,
                "explanation": "A distinct blue border frames the training console, distinguishing simulated practice from production operations.",
                "acceptedAnswers": ["blue", "Blue", "BLUE"]
              }
            ]
          },
          {
            "id": "M00-U2-C2",
            "title": "A clue worth preserving",
            "duration": 7,
            "xpReward": 35,
            "mentor": "Ananya",
            "mentorRole": "SOC Shift Lead & Learning Guide",
            "concept": "Evidence preservation: never modify original evidence; work strictly on duplicates; record source and collection timestamps; apply the safe pause over guessing.",
            "story": "Mentor Ananya presents a sample alert and raw log export beside a separate working copy. She teaches why evidence must be preserved intact and the power of a safe pause.",
            "visualDesc": "Animated Visual Story: Locking original logs in read-only format, generating working copies, and executing the safe pause.",
            "interactiveDesc": "Evidence Sorter: Sort actions into Preserve & Document, Safe Pause & Ask, or Unsafe / Destructive.",
            "section1_theory": {
              "title": "A clue worth preserving",
              "subtitle": "Evidence Integrity, Working Copies & The Power of a Safe Pause",
              "content": "Mentor Ananya brings up two files side-by-side on your console screen. On the left is an original raw log file named auth_raw.log. On the right is a second file named auth_working_copy.log.\n\nAnanya defines digital evidence:\n“Evidence is information another analyst can inspect, not just your memory of what happened.”\nThe learner notices messy, unformatted lines in the original file and asks:\n“Can I tidy the original file so it looks clearer?”\nAnanya responds with an immediate, vital lesson:\n“Keep the original intact. Work on a copy and record its source, collection time, and your actions.”\n\nThe Evidentiary Chain & Why Originals Are Untouchable\nIn cybersecurity investigations, an alert may eventually lead to a formal incident report, human resources action, or even legal proceedings. If an analyst modifies, reformats, or deletes lines from an original log file—even with the best intentions—the integrity of the entire investigation is permanently destroyed!\nTo preserve evidence integrity, analysts follow three golden habits:\n1. Make the Original Read-Only: Never edit the source file. Compute its cryptographic hash (such as SHA-256) and lock it.\n2. Work Exclusively on Copies: Create a working duplicate. Search, highlight, filter, and parse within the working copy.\n3. Record Collection Metadata: Always note who collected the record, from which device hostname, at what exact time, and under what specific time zone (e.g., UTC or IST).\n\nThe Safe Pause\nAnanya poses a final critical scenario:\n“If an unfamiliar instruction might delete data, what comes next?”\nThe learner answers thoughtfully:\n“Pause, record what I see, and contact the mentor.”\nAnanya nods approvingly:\n“Correct. A safe pause is better than an irreversible guess.”",
              "keyTakeaway": "Never modify original evidence files—always work on copies. Record the source, collection time, and actions. A safe pause is always better than an irreversible guess.",
              "cdacScenario": "Mentor Ananya demonstrates evidence preservation on raw logs and guides the learner through the safe pause protocol.",
              "formalDefinitions": [
                {
                  "term": "Evidence Integrity",
                  "sourceStandard": "NIST",
                  "citationCode": "NIST SP 800-86",
                  "definition": "The state of digital evidence wherein it has not been altered, modified, corrupted, or tampered with since its initial acquisition."
                },
                {
                  "term": "Working Copy",
                  "sourceStandard": "ISO",
                  "citationCode": "ISO/IEC 27037",
                  "definition": "An exact bit-stream duplicate of digital evidence used by forensic analysts for examination to ensure the master source remains intact."
                },
                {
                  "term": "Safe Pause",
                  "sourceStandard": "CDAC",
                  "citationCode": "CDAC-SOP-EVID-02",
                  "definition": "The procedural requirement to halt execution, record current display observables, and consult senior leads whenever an action carries risk of data destruction."
                }
              ]
            },
            "questions": [
              {
                "id": "q-M00-U2-C2-1",
                "type": "mcq",
                "question": "Why should an analyst never edit or 'tidy up' an original evidence log file?",
                "options": [
                  "Because text editors cannot open log files",
                  "Because evidence must remain intact so another analyst or investigator can independently inspect and verify it",
                  "Because computers automatically crash when text files are opened",
                  "It is acceptable to edit originals if you do it quickly"
                ],
                "correctAnswer": 1,
                "explanation": "As Mentor Ananya teaches: 'Evidence is information another analyst can inspect, not just your memory.' Originals must remain unaltered."
              },
              {
                "id": "q-M00-U2-C2-2",
                "type": "matching",
                "question": "Match each evidence handling concept to its core operational requirement:",
                "options": [],
                "correctAnswer": 0,
                "explanation": "Following disciplined evidence handling procedures ensures your investigation findings are bulletproof.",
                "matchingPairs": [
                  { "id": "p1", "left": "Original Source File", "right": "Kept locked in read-only state; never modified or reformatted" },
                  { "id": "p2", "left": "Working Duplicate Copy", "right": "The file where filtering, parsing, and analytical notes occur" },
                  { "id": "p3", "left": "Collection Metadata", "right": "Documenting source host, extraction time, and explicit time zone" },
                  { "id": "p4", "left": "Safe Pause Protocol", "right": "Stopping, recording observations, and consulting mentor before risky commands" }
                ]
              },
              {
                "id": "q-M00-U2-C2-3",
                "type": "drag-drop",
                "question": "Classify each action into Sound Evidence Practice or Destructive / Unsafe:",
                "options": [],
                "correctAnswer": 0,
                "explanation": "Working on duplicates and pausing when uncertain protects evidence integrity.",
                "dragDropItems": [
                  { "id": "d1", "token": "Creating a duplicate copy of raw log before running grep", "targetSlot": "Sound Evidence Practice" },
                  { "id": "d2", "token": "Editing the master log file to delete noisy error lines", "targetSlot": "Destructive / Unsafe" },
                  { "id": "d3", "token": "Pausing and taking notes when an unfamiliar command might delete files", "targetSlot": "Sound Evidence Practice" },
                  { "id": "d4", "token": "Guessing and running a destructive command on an unknown directory", "targetSlot": "Destructive / Unsafe" }
                ]
              },
              {
                "id": "q-M00-U2-C2-4",
                "type": "input-value",
                "question": "What should an analyst do when encountering an unfamiliar command that might delete or alter data? (Enter 1 action word: Guess, Pause, Delete)",
                "options": [],
                "correctAnswer": 0,
                "explanation": "Ananya affirms: 'Pause, record what I see, and contact the mentor. A safe pause is better than an irreversible guess.'",
                "acceptedAnswers": ["pause", "Pause", "PAUSE"]
              }
            ]
          }
        ],
        "assessment": {
          "id": "M00-U2-A",
          "title": "Unit 2 Assessment: Safe Practice & Evidence Preservation",
          "duration": 10,
          "passingScore": 80,
          "xpReward": 50,
          "questions": [
            {
              "question": "Why must you verify host-only network adapter settings on a practice VM before analyzing unfamiliar files?",
              "options": [
                "To speed up the internet download speed",
                "To ensure malware or simulated traffic cannot escape the virtual machine and reach campus or production networks",
                "To enable automatic printing to office printers",
                "Because Windows cannot boot without host-only networking"
              ],
              "correctAnswer": 1,
              "explanation": "Host-only networking restricts packets exclusively to the local hypervisor, preventing untrusted data from leaking into external networks."
            },
            {
              "question": "An apprentice analyst receives a raw syslog export and opens it directly in a text editor, deleting several noisy lines to make the report look neater. What critical rule was violated?",
              "options": [
                "Never modify original evidence; all analysis and filtering must be performed exclusively on verified working copies",
                "Syslog files can only be read on Linux",
                "The analyst should have deleted the entire folder instead",
                "No rule was violated"
              ],
              "correctAnswer": 0,
              "explanation": "Original evidence must remain 100% intact so another investigator can verify the findings independently."
            },
            {
              "question": "When faced with an unfamiliar system instruction that might overwrite files or delete database tables, what is the professional course of action?",
              "options": [
                "Execute the command immediately to see what breaks",
                "Execute a safe pause: record current screen observables and consult your mentor before taking action",
                "Turn off your monitor and go home",
                "Blame the network engineering team"
              ],
              "correctAnswer": 1,
              "explanation": "A safe pause prevents irreversible damage; stopping to record and consult senior leads is a mark of professional maturity."
            },
            {
              "question": "What procedure allows an analyst to instantly restore a training virtual machine back to its known clean baseline? (Enter 2 words)",
              "options": [],
              "correctAnswer": 0,
              "explanation": "A snapshot rollback (or snapshot reset) reverts the virtual disk to its clean state.",
              "acceptedAnswers": ["snapshot rollback", "Snapshot Rollback", "Snapshot rollback", "snapshot reset", "Snapshot Reset"]
            }
          ]
        }
      },
      {
        "id": "M00-U3",
        "unitNumber": 3,
        "title": "The Recurring Case & The Learning Route",
        "description": "Meet our recurring branch finance support scenario, master entity separation (service vs account vs host), and understand the 15-module path to L1 practice.",
        "chapters": [
          {
            "id": "M00-U3-C1",
            "title": "The service we will follow",
            "duration": 6,
            "xpReward": 35,
            "mentor": "Ananya",
            "mentorRole": "SOC Shift Lead & Learning Guide",
            "concept": "Entity separation: distinguishing business services, user accounts (FIN-OPS-01), workstation devices (BLR-BR-WS-04), and human users in evidence logs.",
            "story": "Mentor Ananya introduces our recurring training case: the fictional Branch Finance Support service, user account FIN-OPS-01, and workstation BLR-BR-WS-04.",
            "visualDesc": "Animated Visual Story: Branch finance support desk, distinguishing FIN-OPS-01 account from BLR-BR-WS-04 workstation and human user.",
            "interactiveDesc": "Entity Matcher: Match identifiers to Account, Workstation, Business Service, and Network Address.",
            "section1_theory": {
              "title": "The service we will follow",
              "subtitle": "The Recurring Finance Support Case & Entity Separation",
              "content": "To make your learning realistic and consistent, our course does not present disconnected, random alert puzzles. Instead, we follow a single, coherent business environment across multiple releases of evidence.\n\nMentor Ananya displays a business overview card:\n“Our recurring case follows account FIN-OPS-01 and workstation BLR-BR-WS-04; these are fictional learning identifiers.”\nThe learner asks for clarification:\n“Is FIN-OPS-01 the computer's name?”\nAnanya responds with an essential distinction:\n“No. It is an account label. The workstation is a separate entity, and an account does not prove who was at the keyboard.”\n\nThe Four Distinct Entities in Security Telemetry\nIn security operations, confusion between devices, accounts, and human users causes catastrophic investigative errors. Ananya breaks down the four distinct entities you will track:\n1. Business Service: The organizational process providing business value. Here, it is the fictional Branch Finance Support service, which handles staff portals, invoices, and shared branch documents.\n2. User Account (FIN-OPS-01): A digital security credential used to log into systems and access services. An account is an identity token, not a physical box.\n3. Workstation Endpoint (BLR-BR-WS-04): The physical computer hardware located on desk 4 at the Bengaluru branch. It has its own operating system and disk.\n4. Network Address (10.10.20.15): The temporary IP address leased to the workstation by the branch DHCP router.\n\nThe Human Factor & Forensic Restraint\nAnanya emphasizes:\n“Which label identifies the workstation in our story?”\nThe learner replies:\n“BLR-BR-WS-04.”\nAnanya nods:\n“Right. Keeping entities separate will prevent many investigation mistakes.”\nIf an alert states that account FIN-OPS-01 accessed a file at 02:00 AM, a disciplined analyst writes: “Activity was recorded under account FIN-OPS-01 from host BLR-BR-WS-04.” They do NOT jump to conclusions and accuse a specific employee of being awake and typing at that hour!",
              "keyTakeaway": "An account (FIN-OPS-01) is not a workstation (BLR-BR-WS-04), and an account name does not prove who was physically at the keyboard. Keeping entities separate prevents fundamental investigation mistakes.",
              "cdacScenario": "Mentor Ananya introduces the recurring branch finance support service, account FIN-OPS-01, and workstation BLR-BR-WS-04.",
              "formalDefinitions": [
                {
                  "term": "Entity Resolution",
                  "sourceStandard": "NIST",
                  "citationCode": "NIST SP 800-137",
                  "definition": "The forensic process of disambiguating and correlating discrete digital identifiers (such as user accounts, hostnames, IP addresses, and MAC addresses) into their corresponding real-world assets."
                },
                {
                  "term": "Account Credential",
                  "sourceStandard": "ISO",
                  "citationCode": "ISO/IEC 24760-1",
                  "definition": "A set of data establishing the claimed digital identity of an entity within an access control domain."
                },
                {
                  "term": "Endpoint Asset",
                  "sourceStandard": "CISA",
                  "citationCode": "CIS Controls v8.1",
                  "definition": "Any physical or virtual computing device (workstation, server, mobile device) connected to the organizational network infrastructure."
                }
              ]
            },
            "questions": [
              {
                "id": "q-M00-U3-C1-1",
                "type": "mcq",
                "question": "In our recurring course scenario, what does the identifier 'FIN-OPS-01' represent?",
                "options": [
                  "The hostname of the branch core router",
                  "An account identifier used for finance support operations, which is separate from the physical computer",
                  "The serial number of the office laser printer",
                  "A piece of known malware"
                ],
                "correctAnswer": 1,
                "explanation": "FIN-OPS-01 is an account credential used in the branch finance service; it is not the computer's name."
              },
              {
                "id": "q-M00-U3-C1-2",
                "type": "matching",
                "question": "Match each identifier from the recurring finance scenario to its architectural entity type:",
                "options": [],
                "correctAnswer": 0,
                "explanation": "Keeping entities separate prevents confusing accounts, machines, services, and network addresses.",
                "matchingPairs": [
                  { "id": "p1", "left": "FIN-OPS-01", "right": "User Account Identifier (Credential used for finance tasks)" },
                  { "id": "p2", "left": "BLR-BR-WS-04", "right": "Workstation Endpoint Identifier (Physical machine at Bengaluru branch)" },
                  { "id": "p3", "left": "Branch Finance Support", "right": "Business Service (Context of invoices, portal, and shared documents)" },
                  { "id": "p4", "left": "10.10.20.15", "right": "Network IP Address (Dynamic address currently leased to the host)" }
                ]
              },
              {
                "id": "q-M00-U3-C1-3",
                "type": "drag-drop",
                "question": "Classify each observation statement as either Disciplined Observable or Speculative Leap:",
                "options": [],
                "correctAnswer": 0,
                "explanation": "Analysts record verifiable facts (who logged in, from where); they do not speculate about human presence without physical evidence.",
                "dragDropItems": [
                  { "id": "d1", "token": "Logon event recorded under account FIN-OPS-01 on host BLR-BR-WS-04", "targetSlot": "Disciplined Observable" },
                  { "id": "d2", "token": "Employee Sharma personally sat at the desk and typed the command", "targetSlot": "Speculative Leap" },
                  { "id": "d3", "token": "Outbound HTTPS connection initiated from IP 10.10.20.15", targetSlot: "Disciplined Observable" },
                  { "id": "d4", "token": "The finance team is definitely working on a secret weekend project", targetSlot: "Speculative Leap" }
                ]
              },
              {
                "id": "q-M00-U3-C1-4",
                "type": "input-value",
                "question": "Which exact identifier represents the physical workstation device in our recurring finance scenario?",
                "options": [],
                "correctAnswer": 0,
                "explanation": "BLR-BR-WS-04 identifies Bengaluru Branch Workstation #04.",
                "acceptedAnswers": ["BLR-BR-WS-04", "blr-br-ws-04"]
              }
            ]
          },
          {
            "id": "M00-U3-C2",
            "title": "The route from beginner to L1",
            "duration": 6,
            "xpReward": 35,
            "mentor": "Ananya",
            "mentorRole": "SOC Shift Lead & Learning Guide",
            "concept": "Curriculum roadmap: Theory -> Visual -> Interactive -> Knowledge Check. Support gradually reduces until autonomous L1 playbook triage is achieved.",
            "story": "Mentor Ananya illuminates the full learning route across 15 modules and explains the 4-section chapter model leading to supervised L1 handover.",
            "visualDesc": "Animated Visual Story: The 4-section chapter workflow, 15-module progression, fading scaffolding, and L1 handover destination.",
            "interactiveDesc": "Section Matcher: Match chapter sections to their pedagogical roles.",
            "section1_theory": {
              "title": "The route from beginner to L1",
              "subtitle": "The 4-Section Learning Architecture & Your Path to Supervised L1 Readiness",
              "content": "Mentor Ananya brings up the grand roadmap of the entire curriculum. A pathway lights up across 15 modules:\nComputers (M01) ➔ Networks (M02) ➔ Security Fundamentals (M03) ➔ Alert Triage (M04) ➔ SIEM Search (M05) ➔ Log Analysis (M06) ➔ Host & Network Monitoring (M07–M08) ➔ EDR & Ecosystems (M09–M10) ➔ Identity & Threat Intel (M11) ➔ Automation & ATT&CK (M12–M13) ➔ Incident Handover (M14).\n\nAnanya describes the consistent structure of your daily shifts:\n“Each chapter gives you theory, a visual or demonstration, an activity, and a short knowledge check.”\nThe learner asks:\n“When will I work without you explaining every click?”\nAnanya explains how scaffolding works:\n“Support gradually reduces. By the final simulation, you will triage, document, and escalate within an L1 playbook.”\n\nThe 4-Section Learning Engine\nEvery chapter in this course follows an active, predictable 4-section rhythm:\n1. Section 1: Theory Briefing — Opening mentor dialogue, clear everyday analogies, plain-English mechanisms, and formal NIST/ISO definitions.\n2. Section 2: Animated Visual Story — Vector simulations illustrating system mechanics with strict, concise labels so you can watch telemetry in motion.\n3. Section 3: Interactive Activity — Hands-on sandboxes where you sort evidence, match concepts, or trace packet routes without fear of making mistakes.\n4. Section 4: Knowledge Check — Scenario-based questions that validate your retention and build analytical muscle memory.\n\nSetting Clear Expectations\nAnanya concludes with an essential question regarding your destination:\n“Does finishing this course automatically authorise production access or award an external certification?”\nThe learner replies accurately:\n“No. It develops foundational skills; workplace authorisation and certification are separate.”\nAnanya smiles:\n“Exactly. Your destination is evidence-based beginner L1 practice, not instant expertise.”",
              "keyTakeaway": "The learning journey moves through 4 consistent sections per chapter with scaffolded support that gradually reduces. Your destination is evidence-based beginner L1 practice.",
              "cdacScenario": "Mentor Ananya outlines the 15-module learning roadmap and explains the 4-section chapter model leading to supervised L1 practice.",
              "formalDefinitions": [
                {
                  "term": "Pedagogical Scaffolding",
                  "sourceStandard": "NIST",
                  "citationCode": "NIST NICE Framework",
                  "definition": "A teaching structure that provides extensive support during initial skill acquisition, systematically tapering off guidance as learner competence increases."
                },
                {
                  "term": "L1 Triage Competency",
                  "sourceStandard": "CDAC",
                  "citationCode": "CDAC-L1-COMPETENCY-01",
                  "definition": "The demonstrated ability to intake raw alerts, verify observable entities (User, Host, IP, Timestamp), and execute standard escalation playbooks."
                },
                {
                  "term": "Shift Handover",
                  "sourceStandard": "ISO",
                  "citationCode": "ISO/IEC 27035-2",
                  "definition": "The structured procedural transfer of active incident tickets, ongoing investigations, and situational context from an outgoing analyst to an incoming shift."
                }
              ]
            },
            "questions": [
              {
                "id": "q-M00-U3-C2-1",
                "type": "mcq",
                "question": "Does completing this course automatically grant you enterprise production network access or an external certification?",
                "options": [
                  "Yes, you are immediately certified to change production firewall rules anywhere in the world",
                  "No. It develops foundational, evidence-based skills; workplace production access and certification are separate formal processes",
                  "Yes, but only for Linux servers",
                  "Yes, by skipping all unit assessments"
                ],
                "correctAnswer": 1,
                "explanation": "As Mentor Ananya confirms: 'It develops foundational skills; workplace authorisation and certification are separate formal processes. Your destination is evidence-based beginner L1 practice.'"
              },
              {
                "id": "q-M00-U3-C2-2",
                "type": "matching",
                "question": "Match each section of a chapter to its pedagogical role:",
                "options": [],
                "correctAnswer": 0,
                "explanation": "The consistent 4-section flow ensures active learning over passive video watching.",
                "matchingPairs": [
                  { "id": "p1", "left": "Section 1: Theory Briefing", "right": "Mentor dialogue, everyday analogies, plain-English mechanisms, and standards" },
                  { "id": "p2", "left": "Section 2: Animated Visual Story", "right": "Dynamic vector simulation illustrating telemetry and system motion" },
                  { "id": "p3", "left": "Section 3: Interactive Activity", "right": "Hands-on sandbox practice where you sort, match, and manipulate evidence" },
                  { "id": "p4", "left": "Section 4: Knowledge Check", "right": "Scenario questions confirming retention before progressing to the next chapter" }
                ]
              },
              {
                "id": "q-M00-U3-C2-3",
                "type": "drag-drop",
                "question": "Classify the curriculum progression into its three major phases:",
                "options": [],
                "correctAnswer": 0,
                "explanation": "The curriculum builds from host and network baselines into telemetry search and professional incident response.",
                "dragDropItems": [
                  { "id": "d1", "token": "Hardware, Operating Systems & Networks (M00-M02)", "targetSlot": "Foundational Baselines" },
                  { "id": "d2", "token": "Alert Triage, SIEM Search & Log Analysis (M04-M06)", "targetSlot": "Analytical Core" },
                  { "id": "d3", "token": "ATT&CK Mapping, Playbooks & Shift Handover (M12-M14)", targetSlot: "Professional Practice" },
                  { "id": "d4", "token": "Understanding ordinary user accounts and filesystem paths (M01)", targetSlot: "Foundational Baselines" }
                ]
              },
              {
                "id": "q-M00-U3-C2-4",
                "type": "input-value",
                "question": "How many learner-facing sections make up every chapter in this course? (Enter a number)",
                "options": [],
                "correctAnswer": 0,
                "explanation": "Every chapter strictly follows exactly 4 learner-facing sections: Theory, Visual/Video Story, Interactive Activity, and Knowledge Check.",
                "acceptedAnswers": ["4", "four", "Four"]
              }
            ]
          }
        ],
        "assessment": {
          "id": "M00-U3-A",
          "title": "Unit 3 Assessment: The Learning Journey & Case Entities",
          "duration": 10,
          "passingScore": 80,
          "xpReward": 50,
          "questions": [
            {
              "question": "An alert log states: 'User FIN-OPS-01 logged onto BLR-BR-WS-04 at 23:45 UTC.' Why is it an error to assert that employee Ramesh was physically sitting at that desk?",
              "options": [
                "Because an account identifier is a credential; credentials can be automated, shared, or compromised. The log only proves the account was used, not which human physically typed",
                "Because computers in Bengaluru do not have keyboards",
                "Because UTC time cannot be converted to local time",
                "Because FIN-OPS-01 is a printer serial number"
              ],
              "correctAnswer": 0,
              "explanation": "Forensic restraint: an account credential is not physical proof of a person. Actions recorded under an account must be documented as account activity, not assumed human presence."
            },
            {
              "question": "Why does the course introduce computer hardware and networking fundamentals before opening a SIEM console?",
              "options": [
                "Because SIEM logs record IP addresses, ports, PIDs, and paths; without understanding ordinary systems, an analyst cannot interpret what the logs mean",
                "To delay practical learning as long as possible",
                "Because SIEM consoles do not work on networks",
                "It is optional and not recommended"
              ],
              "correctAnswer": 0,
              "explanation": "Understanding host processes and network packet flow provides the essential context required to understand SIEM telemetry."
            },
            {
              "question": "What is the primary objective of your 90-hour learning journey?",
              "options": [
                "To achieve disciplined, evidence-based beginner L1 triage practice within playbooks",
                "To hack competitors and bypass security controls",
                "To memorize 5,000 Linux commands without understanding them",
                "To immediately replace senior L3 threat hunters on day one"
              ],
              "correctAnswer": 0,
              "explanation": "Mentor Ananya emphasizes: 'Your destination is evidence-based beginner L1 practice, not instant expertise.'"
            },
            {
              "question": "Which identifier represents the workstation endpoint in the recurring branch finance scenario? (Enter exact code)",
              "options": [],
              "correctAnswer": 0,
              "explanation": "BLR-BR-WS-04 identifies Bengaluru Branch Workstation #04.",
              "acceptedAnswers": ["BLR-BR-WS-04", "blr-br-ws-04"]
            }
          ]
        }
      }
    ]
  },
  {
    "id": "01",
    "title": "Computer Fundamentals",
    "level": "Beginner",
    "difficulty": "BEGINNER",
    "order": 1,
    "theoryHours": 2,
    "labHours": 1,
    "totalHours": 3,
    "mentor": "Ravi",
    "mentorRole": "Workstation & Host Mentor",
    "story": "Mentor Ravi, an experienced L1 analyst, introduces the analyst workstation, operating systems, users, files, processes and basic commands.",
    "units": [
      {
        "id": "M01-U1",
        "unitNumber": 1,
        "title": "The Analyst Workstation",
        "description": "Hardware, operating systems, user accounts, files, paths, and permissions from an investigation perspective.",
        "chapters": [
          {
            "id": "M01-U1-C1",
            "title": "Hardware, OS and accounts",
            "duration": 14,
            "xpReward": 35,
            "mentor": "Ravi",
            "mentorRole": "Workstation & Host Mentor",
            "concept": "Understanding physical hardware (CPU, RAM, storage), the operating system as coordinator, and user accounts as identity boundaries enforcing least privilege.",
            "story": "Beside the finance desk at CDAC Bengaluru, Mentor Ravi opens an animated workstation diagram. He introduces cooperating hardware parts, the role of the OS, and why least privilege protects the endpoint.",
            "visualDesc": "Animated Visual Story: Workstation diagram tracing CPU, RAM, and Disk booting the OS, establishing a standard user session, and enforcing least privilege boundaries.",
            "interactiveDesc": "Component Sorter: Classify elements into Physical Hardware, Operating System Roles, and User Account Privileges.",
            "section1_theory": {
              "title": "Hardware, OS and accounts",
              "subtitle": "A Computer Becomes Understandable: Physical Components, The Operating System & Account Boundaries",
              "content": "Mentor Ravi sits beside you at the branch finance desk. On the screen, an animated diagram illuminates the internal workings of workstation BLR-BR-WS-04 without taking any physical screws out of the machine.\n\nRavi begins with a reassuring smile:\n“Think of the computer as cooperating parts: processor, memory, storage, and devices for input and output.”\nThe learner asks a natural question:\n“Are memory and storage the same thing?”\nRavi shakes his head gently:\n“Memory supports current work; storage keeps files beyond a restart. The operating system coordinates resources and access.”\n\n1. Familiar Situation: Working at an Office Desk\nImagine you are sitting at a branch desk creating a monthly budget spreadsheet. You type numbers on the keyboard, watch them appear on the screen, calculate a total, and save the document before shutting down for the night. You don't need to know electronic circuit design to notice that the computer does three different jobs: it processes numbers, it holds your active window open, and it files the spreadsheet away permanently.\n\n2. Plain-Language Explanation: The Four Cooperating Parts\nEvery computer relies on four fundamental elements:\n• Processor (CPU): The electronic engine that performs calculations and follows software instructions billions of times each second.\n• Volatile Memory (RAM): The fast temporary workspace. When you open an application or document, it loads into RAM so the CPU can read it instantly. When power is turned off, everything in RAM evaporates.\n• Persistent Storage (SSD or HDD): The permanent digital filing cabinet. Your operating system, spreadsheets, and emails remain safely saved here even when the machine is shut down.\n• Input & Output (I/O): Keyboards and mice bring your commands in; monitors and network cards send information out.\n\n3. The Operating System: The Master Coordinator\nRaw silicon chips cannot run applications on their own. The Operating System (such as Microsoft Windows or Linux) is the master coordinator. The inner core of the OS—the Kernel—manages physical hardware drivers, divides CPU time between programs, and isolates memory so one frozen application cannot crash the whole machine.\n\n4. User Accounts & Least Privilege\nThe OS creates User Accounts to establish identity and security boundaries:\n• Standard User Account: Used for everyday work (typing documents, browsing, reviewing invoices). Standard users can save their own files but cannot modify operating system files or install device drivers.\n• Administrator / Root Account: Holds master system authority to change system settings, install software, and reconfigure security policies.\nThe Principle of Least Privilege (PoLP) requires that users operate with the minimum permissions needed for their daily tasks. If an employee with a standard account opens a malicious attachment by mistake, the damage is contained within their personal workspace—the malware cannot silently overwrite core system files.\n\n5. Story Example: Workstation BLR-BR-WS-04\nAt our CDAC Bengaluru branch finance desk, account FIN-OPS-01 logs into workstation BLR-BR-WS-04. Ravi shows how opening an invoice report loads data from the SSD into RAM, where the CPU calculates totals. Because FIN-OPS-01 is a standard user, the operating system prevents any accidental or malicious changes to protected Windows system directories.\n\nRavi checks your understanding:\n“Which usually retains a saved report after the power is turned off?”\nThe learner responds:\n“Storage.”\nRavi nods:\n“Correct. You now have a simple model for understanding what a workstation does.”",
              "keyTakeaway": "A computer consists of cooperating parts: processor (CPU), temporary working memory (RAM), persistent storage (SSD/HDD), and the operating system that coordinates them. User accounts enforce least privilege to contain potential harm.",
              "cdacScenario": "Mentor Ravi introduces the foundational workstation architecture on BLR-BR-WS-04, demonstrating how the OS arbitrates CPU, RAM, storage, and standard user privileges.",
              "formalDefinitions": [
                {
                  "term": "Computer Hardware",
                  "sourceStandard": "NIST",
                  "citationCode": "NIST SP 800-30",
                  "definition": "The material physical components of an information system, including processors (CPUs), volatile working memory (RAM), persistent storage drives (SSDs/HDDs), and input/output interfaces."
                },
                {
                  "term": "Operating System (OS)",
                  "sourceStandard": "ISO",
                  "citationCode": "ISO/IEC 2382",
                  "definition": "Master software that controls the execution of programs and provides services such as resource allocation, memory management, scheduling, input/output control, and data management."
                },
                {
                  "term": "Principle of Least Privilege",
                  "sourceStandard": "NIST",
                  "citationCode": "NIST SP 800-53 AC-6",
                  "definition": "The security principle requiring that every user account, program, and process be granted only the minimum necessary privileges required to perform its authorized function."
                }
              ]
            },
            "questions": [
              {
                "id": "q-M01-U1-C1-1",
                "type": "mcq",
                "question": "What is the primary role of an Operating System (OS) in a computer?",
                "options": [
                  "To supply physical electric power to the motherboard",
                  "To act as the master software bridge between physical hardware (CPU, RAM, storage) and user applications, while enforcing security boundaries",
                  "To replace the need for physical RAM memory chips",
                  "To automatically format the hard drive on every startup"
                ],
                "correctAnswer": 1,
                "explanation": "An Operating System (like Windows or Linux) manages physical hardware resources, provides the filesystem, schedules running processes, and controls user access permissions."
              },
              {
                "id": "q-M01-U1-C1-2",
                "type": "matching",
                "question": "Match each fundamental computer component to its core operational role:",
                "options": [],
                "correctAnswer": 0,
                "explanation": "Understanding how CPU, RAM, Disk storage, and User Accounts interact is essential for analyzing host behavior.",
                "matchingPairs": [
                  { "id": "p1", "left": "CPU (Central Processing Unit)", "right": "The brain of the computer that processes calculations and executes software instructions" },
                  { "id": "p2", "left": "RAM (Random Access Memory)", "right": "Fast temporary working memory that holds active programs and clears when powered off" },
                  { "id": "p3", "left": "Storage / Disk (SSD/HDD)", "right": "Permanent filing cabinet that retains the OS and user files even when powered down" },
                  { "id": "p4", "left": "Standard User Account", "right": "User identity restricted to daily tasks that cannot modify core OS files or install drivers" }
                ]
              },
              {
                "id": "q-M01-U1-C1-3",
                "type": "drag-drop",
                "question": "Classify each item into its correct operational category:",
                "options": [],
                "correctAnswer": 0,
                "explanation": "Distinguishing physical hardware, operating system functions, and account privileges forms the baseline of host triage.",
                "dragDropItems": [
                  { "id": "d1", "token": "Physical Intel/AMD Processor (CPU)", "targetSlot": "Hardware Component" },
                  { "id": "d2", "token": "Managing memory allocation and scheduling running processes", "targetSlot": "Operating System Function" },
                  { "id": "d3", "token": "Standard employee restricted by the Principle of Least Privilege", "targetSlot": "User Account & Privilege" },
                  { "id": "d4", "token": "RAM memory sticks holding active application data", "targetSlot": "Hardware Component" }
                ]
              },
              {
                "id": "q-M01-U1-C1-4",
                "type": "input-value",
                "question": "What temporary high-speed working memory holds currently active programs and loses all stored data when the computer is shut down? (Enter 3-letter abbreviation)",
                "options": [],
                "correctAnswer": 0,
                "explanation": "RAM (Random Access Memory) is volatile working memory used by the CPU for active processes. When powered off, RAM loses its state.",
                "acceptedAnswers": ["RAM", "Random Access Memory", "R.A.M."]
              }
            ]
          },
          {
            "id": "M01-U1-C2",
            "title": "Files, paths and permissions",
            "duration": 14,
            "xpReward": 35,
            "mentor": "Ravi",
            "mentorRole": "Workstation & Host Mentor",
            "concept": "Understanding filesystem paths, read/write/execute permissions, account-based access control, and why access-denied is an expected security boundary.",
            "story": "On workstation BLR-BR-WS-04, two accounts inspect the same folder. Mentor Ravi explains filesystem paths, file permissions, and why files in temporary folders require careful context.",
            "visualDesc": "Animated Visual Story: Path inspection, account permission checks, access-denied evaluation, and temporary folder context.",
            "interactiveDesc": "File Path Inspector: Spot anomalous executable paths like running binaries directly from user temporary folders.",
            "section1_theory": {
              "title": "Files, paths and permissions",
              "subtitle": "Who Can Open This Folder? File Paths, Access Control & Temporary Staging Directories",
              "content": "Mentor Ravi brings up a folder view on workstation BLR-BR-WS-04. Two user sessions are displayed side by side: one account opens a finance report with ease, while a second account clicks the exact same folder and receives an “Access Denied” dialog.\n\nRavi explains the core principle:\n“A path locates a file. Permissions describe what an account is allowed to do with it.”\nThe learner glances at a folder labeled Temp and asks:\n“If a file is in a temporary folder, does that make it malicious?”\nRavi smiles warmly:\n“No. Temporary folders have legitimate uses, but writable locations can matter when we investigate suspicious execution.”\n\n1. Familiar Situation: Shared Office Folders & Locked Cabinets\nIn any busy office, some documents are open for all staff to read (like cafeteria menus or company holiday lists), while payroll records and personnel evaluations are locked in human resources filing cabinets. If you don't have the key, the drawer stays locked. The computer enforces the exact same rules digitally.\n\n2. Plain-Language Explanation: Paths & Permissions\n• File & Folder: A file is a named collection of data (like a document, image, or script); a folder (directory) organizes files into logical groups.\n• Path: The full digital address specifying where a file lives. In Windows, paths start with a drive letter (such as C:\\Finance\\Reports\\july.xlsx). In Linux, paths start from the root forward slash (such as /var/log/syslog).\n• Permissions: The rules governing actions on a file:\n  - Read (R): View or open the contents.\n  - Write (W): Modify, overwrite, or delete the file.\n  - Execute (X): Run the file as an active software program or script.\n\n3. Access Denied: A Security Boundary, Not a Malfunction\nWhen an operating system displays “Access Denied”, beginner users often worry that the computer crashed or the hard drive is corrupted. Ravi poses a key question:\n“Does an access-denied message mean the computer is broken?”\nThe learner answers thoughtfully:\n“Not necessarily; the account may lack permission.”\nRavi confirms:\n“Exactly. Record the account, path, requested action, and result before drawing conclusions.”\n\n4. Why Writable Locations Matter in Security Triage\nStandard enterprise users are forbidden from writing files to system directories like C:\\Windows\\System32 or /etc. However, users must be able to create scratch files, so operating systems provide user-writable temporary directories—such as %TEMP% (C:\\Users\\<User>\\AppData\\Local\\Temp) in Windows or /tmp in Linux.\nBecause standard users have write access here, software installers unpack setup files into Temp. Adversaries exploit this same permission to drop unauthorized executables without needing administrative rights. A file in Temp is not automatically malware, but an executable launching from Temp is a clue that warrants immediate investigation.\n\n5. Story Example: Investigating BLR-BR-WS-04\nOn workstation BLR-BR-WS-04, user account FIN-OPS-01 accesses the shared folder C:\\Finance\\Invoices. The account possesses Read and Write permissions for daily invoices. However, when an unverified script attempts to write an executable into C:\\Windows\\System32, Windows halts the operation with an Access Denied error. Ravi notes: the defense worked as designed; our job as analysts is to record what happened factually.",
              "keyTakeaway": "A file path provides its precise digital address, while permissions determine which accounts can Read, Write, or Execute it. An access-denied message is an intentional security boundary, not a system failure. Always verify path context.",
              "cdacScenario": "Ravi demonstrates file paths, NTFS access permissions, and temporary directory behavior on BLR-BR-WS-04, showing why access-denied errors protect system integrity.",
              "formalDefinitions": [
                {
                  "term": "File System Path",
                  "sourceStandard": "ISO",
                  "citationCode": "IEEE Std 1003.1",
                  "definition": "A string of characters used to uniquely identify a file or directory within a hierarchical directory structure."
                },
                {
                  "term": "Discretionary Access Control (DAC)",
                  "sourceStandard": "NIST",
                  "citationCode": "NIST SP 800-162",
                  "definition": "A means of restricting access to objects based on the identity of subjects and groups to which they belong, typically configured via Access Control Lists (ACLs)."
                },
                {
                  "term": "Staging Directory",
                  "sourceStandard": "CISA",
                  "citationCode": "MITRE ATT&CK T1074",
                  "definition": "A user-writable location (such as %TEMP% or /tmp) leveraged for temporary data storage or the staging of downloaded binaries prior to execution."
                }
              ]
            },
            "questions": [
              {
                "id": "q-M01-U1-C2-1",
                "type": "mcq",
                "question": "Why do adversaries frequently drop secondary malware payloads into C:\\Users\\<Username>\\AppData\\Local\\Temp?",
                "options": [
                  "Temp folders are protected by default Windows BitLocker encryption",
                  "Standard unprivileged users possess write permissions in Temp folders without triggering UAC administrative prompts",
                  "Windows automatically runs all executable files stored in Temp at startup",
                  "Temp directories are invisible to endpoint antivirus scanners"
                ],
                "correctAnswer": 1,
                "explanation": "Because standard users have write access to their own AppData\\Local\\Temp folder, droppers stage payloads there without needing administrator rights."
              },
              {
                "id": "q-M01-U1-C2-2",
                "type": "matching",
                "question": "Match each file path to its security classification and default permission model in Windows:",
                "options": [],
                "correctAnswer": 0,
                "explanation": "Adversaries exploit world-writable user paths because system directories require elevated administrative permissions.",
                "matchingPairs": [
                  { "id": "p1", "left": "C:\\Program Files\\", "right": "Protected: Admin write required, standard users read-only" },
                  { "id": "p2", "left": "C:\\Users\\<User>\\AppData\\Local\\Temp\\", "right": "Permissive: Standard user write access (common staging area)" },
                  { "id": "p3", "left": "C:\\Windows\\System32\\drivers\\etc\\hosts", "right": "System Critical: Protected name resolution mapping file" },
                  { "id": "p4", "left": "/etc/passwd & /etc/shadow", "right": "Linux: User credentials configuration files" }
                ]
              },
              {
                "id": "q-M01-U1-C2-3",
                "type": "drag-drop",
                "question": "Classify each filesystem observable into its operational risk level:",
                "options": [],
                "correctAnswer": 0,
                "explanation": "Binaries launching from user Temp folders and double-extension files represent major indicators of staging and social engineering.",
                "dragDropItems": [
                  { "id": "d1", "token": "update.exe launched from %TEMP%", "targetSlot": "Suspicious / High Risk" },
                  { "id": "d2", "token": "excel.exe launched from C:\\Program Files\\Microsoft Office", "targetSlot": "Baseline / Low Risk" },
                  { "id": "d3", "token": "invoice.pdf.exe masquerading with double extension", "targetSlot": "Suspicious / High Risk" },
                  { "id": "d4", "token": "notepad.exe launched from C:\\Windows\\System32", "targetSlot": "Baseline / Low Risk" }
                ]
              },
              {
                "id": "q-M01-U1-C2-4",
                "type": "input-value",
                "question": "What is the standard Windows environment variable that points to the user's temporary directory? (e.g. %VAR%)",
                "options": [],
                "correctAnswer": 0,
                "explanation": "%TEMP% resolves to C:\\Users\\<Username>\\AppData\\Local\\Temp, the default writable scratch space for user sessions.",
                "acceptedAnswers": ["%TEMP%", "TEMP", "%TMP%", "TMP"]
              }
            ]
          }
        ],
        "assessment": {
          "id": "M01-U1-A",
          "title": "Unit 1 Assessment: The Analyst Workstation",
          "duration": 15,
          "passingScore": 80,
          "xpReward": 50,
          "questions": [
            {
              "question": "Which component of a workstation provides fast, temporary working memory for active programs and loses its contents when the machine is powered off?",
              "options": [
                "Persistent Storage Drive (SSD/HDD)",
                "Random Access Memory (RAM)",
                "Central Processing Unit (CPU)",
                "Read-Only BIOS Chip"
              ],
              "correctAnswer": 1,
              "explanation": "RAM (Random Access Memory) provides fast volatile workspace for active programs. When power is cut, RAM loses all stored data, unlike persistent SSD/HDD storage."
            },
            {
              "question": "When an employee attempts to save a file to C:\\Windows\\System32 and receives an 'Access Denied' message, what does this indicate?",
              "options": [
                "The computer's storage drive has experienced a permanent hardware failure",
                "The operating system is broken and needs to be completely reinstalled",
                "The user account lacks write permission for that protected system directory",
                "The file was automatically encrypted by ransomware"
              ],
              "correctAnswer": 2,
              "explanation": "An 'Access Denied' message is an expected security boundary. Standard user accounts lack write permissions to critical operating system directories by design."
            },
            {
              "question": "During an alert review on host BLR-BR-WS-04, an analyst discovers an executable file located in C:\\Users\\FIN-OPS-01\\AppData\\Local\\Temp\\. What is the most accurate assessment of this file location?",
              "options": [
                "Every file located in a temporary directory is guaranteed to be hostile malware",
                "Temporary folders have legitimate uses, but user-writable paths warrant verification because droppers often stage files there without admin rights",
                "Windows automatically prohibits all software from ever running in temporary directories",
                "Files in temporary directories can only be created by system administrators"
              ],
              "correctAnswer": 1,
              "explanation": "Temporary folders are world-writable by the user session. Many legitimate installers use them, but adversaries also leverage them. The location requires careful context, not automatic assumption."
            },
            {
              "question": "Review the following workstation access control configuration:\nPath: C:\\BranchFinance\\AuditReports\\\nAccount: FIN-OPS-01 | Rights: Read, ListDirectory\nAccount: Local_Admin | Rights: Full Control\nIf user FIN-OPS-01 attempts to modify and overwrite an existing report in this folder, what will occur?",
              "options": [
                "The report will be successfully overwritten because the user has Read access",
                "The operating system will block the change with an access error because the account lacks Write permission",
                "The operating system will automatically promote FIN-OPS-01 to administrator status",
                "The file will be permanently deleted from the hard drive"
              ],
              "correctAnswer": 1,
              "explanation": "Permissions are granular. Having Read and List permissions does not grant Write or Modify permissions. The operating system will block the modification attempt."
            },
            {
              "question": "An apprentice analyst triaging BLR-BR-WS-04 notices that an unapproved executable attempted to write to C:\\Program Files\\ under account FIN-OPS-01 and failed due to insufficient privileges. What is the most disciplined next step?",
              "options": [
                "Grant account FIN-OPS-01 permanent local administrator rights so the program can complete its task",
                "Record the account, full path, attempted action, and failure outcome, then check whether the execution was part of an approved software deployment",
                "Immediately format the hard drive of BLR-BR-WS-04 without recording notes",
                "Delete the user account FIN-OPS-01 from the domain controller"
              ],
              "correctAnswer": 1,
              "explanation": "Disciplined analysts record observable facts (account, path, action, outcome) and verify whether the action was scheduled business maintenance before jumping to drastic, unsupported conclusions."
            }
          ]
        }
      },
      {
        "id": "M01-U2",
        "unitNumber": 2,
        "title": "Processes and Services",
        "description": "What processes and background services do, process trees, and distinguishing routine from unfamiliar activity.",
        "chapters": [
          {
            "id": "M01-U2-C1",
            "title": "What processes and services do",
            "duration": 13,
            "xpReward": 35,
            "mentor": "Ravi",
            "mentorRole": "Workstation & Host Mentor",
            "concept": "Understanding stored programs vs running processes, Process IDs (PIDs), parent-child process relationships, and background services.",
            "story": "Mentor Ravi launches a harmless text editor on BLR-BR-WS-04 to demonstrate how programs become processes. He reveals Process IDs, parent processes, and background services running without windows.",
            "visualDesc": "Animated Visual Story: Process creation, PID assignment, parent-child lineage (PPID to PID), and background services managed by the Service Control Manager.",
            "interactiveDesc": "Process Lineage Tracing: Trace child PIDs back to their originating parent process.",
            "section1_theory": {
              "title": "What processes and services do",
              "subtitle": "Programs Doing Work: Process Instances, Process IDs (PIDs) & Background Services",
              "content": "Mentor Ravi gestures to the clean desktop of workstation BLR-BR-WS-04. With a double-click, he opens a simple text editor. A plain white window appears on the screen.\n\nRavi explains the distinction:\n“A program is stored instructions; a process is a running instance. Services often perform background work.”\nThe learner watches the window appear and asks:\n“So every process belongs to a window I can see?”\nRavi shakes his head:\n“No. Many do not. Processes have identifiers, accounts, executable paths, and sometimes parent processes.”\n\n1. Familiar Situation: Recipes vs Active Cooking\nThink of a recipe in a printed cookbook. Sitting on the kitchen shelf, the recipe is just text on paper—it isn't baking a cake or slicing vegetables. But when a chef steps up to the counter and begins following the steps, an active cooking session begins. If two chefs follow the same recipe at two different counters at the same time, you have two independent cooking sessions running simultaneously.\n\n2. Plain-Language Explanation: Programs vs Processes\n• Program: The compiled code and instructions stored permanently on disk (for example, notepad.exe stored in C:\\Windows\\System32).\n• Process: An active, running instance of that program loaded into memory (RAM) and executing on the processor (CPU).\n• Process Identifier (PID): A unique temporary number assigned by the operating system to identify each running process.\nRavi demonstrates by opening a second copy of the text editor. Both windows say “Notepad”, but when Ravi checks the task list, one is PID 4120 and the other is PID 6844.\n\nRavi tests your reasoning:\n“If the editor starts twice, must both instances have the same process identifier?”\nThe learner replies:\n“No; each running instance can have its own identifier.”\nRavi confirms:\n“Correct. A process name alone is not a unique identity.”\n\n3. Parent-Child Process Lineage (PPID)\nProcesses rarely start by magic; almost every process is launched by another process. The creator is the Parent Process, and the newly launched task is the Child Process.\n• Normal Example: You open your desktop folder and double-click an invoice. The desktop shell (explorer.exe) is the parent, and the spreadsheet app (excel.exe) is the child.\n• Suspicious Example: A word document (winword.exe) suddenly launches a script interpreter (powershell.exe) in the background. Tracking the Parent Process ID (PPID) helps analysts immediately spot unauthorized command execution.\n\n4. Background Services: Invisible Helpers\nMany crucial operating system tasks run silently in the background without any visible desktop window, menu bar, or taskbar icon. These are called Services (in Windows) or Daemons (in Linux). For example, the print spooler service waits quietly for documents to print, and the time synchronization service keeps the system clock accurate. They start when the computer boots and run under dedicated system accounts.\n\n5. Story Example: Observing BLR-BR-WS-04\nOn workstation BLR-BR-WS-04, Ravi guides you to inspect the active task list. You identify account FIN-OPS-01 running an accounting tool under PID 3312, spawned by explorer.exe. Meanwhile, in the background, the Windows Service Host (svchost.exe) runs under PID 916 with no visible desktop window, faithfully serving background network requests.",
              "keyTakeaway": "A program is stored code on disk; a process is an active instance running in memory with its own Process ID (PID). Services perform necessary background work without desktop windows. Tracing parent-child relationships reveals how tasks originated.",
              "cdacScenario": "Ravi demonstrates process creation, PID assignment, parent-child lineage, and background services on BLR-BR-WS-04.",
              "formalDefinitions": [
                {
                  "term": "Process Context",
                  "sourceStandard": "ISO",
                  "citationCode": "ISO/IEC 2382",
                  "definition": "An address space, thread of execution, and security token allocated by the operating system to execute a sequence of software instructions."
                },
                {
                  "term": "Process Identifier (PID)",
                  "sourceStandard": "ISO",
                  "citationCode": "IEEE Std 1003.1",
                  "definition": "A unique, non-negative integer assigned by the operating system kernel to identify an active process instance throughout its execution lifecycle."
                },
                {
                  "term": "Background Service",
                  "sourceStandard": "NIST",
                  "citationCode": "NIST SP 800-123",
                  "definition": "A long-running executable that operates in the background without user intervention or interactive desktop windows, managed by the Service Control Manager."
                }
              ]
            },
            "questions": [
              {
                "id": "q-M01-U2-C1-1",
                "type": "mcq",
                "question": "In Windows process monitoring (Sysmon Event 1), what critical indicator reveals whether an execution was triggered by a macro inside Microsoft Word?",
                "options": [
                  "The file size of cmd.exe",
                  "The Parent Process ID (PPID) pointing to winword.exe",
                  "The current system uptime",
                  "The display monitor resolution"
                ],
                "correctAnswer": 1,
                "explanation": "Sysmon Event 1 logs the ParentProcessId and ParentImage. If winword.exe spawns powershell.exe or cmd.exe, it indicates weaponized macro activity."
              },
              {
                "id": "q-M01-U2-C1-2",
                "type": "matching",
                "question": "Match each Windows process management concept to its forensic role:",
                "options": [],
                "correctAnswer": 0,
                "explanation": "Tracing parent-child process relationships is the core technique for spotting living-off-the-land (LotL) execution.",
                "matchingPairs": [
                  { "id": "p1", "left": "PID (Process ID)", "right": "Unique numeric identifier assigned to a running process instance" },
                  { "id": "p2", "left": "PPID (Parent PID)", "right": "Identifier of the process that spawned this child process" },
                  { "id": "p3", "left": "services.exe", "right": "Service Control Manager responsible for background daemon services" },
                  { "id": "p4", "left": "explorer.exe", "right": "User desktop GUI shell that spawns user-launched applications" }
                ]
              },
              {
                "id": "q-M01-U2-C1-3",
                "type": "drag-drop",
                "question": "Classify each process parent-child relationship into Normal Baseline vs Anomalous Threat:",
                "options": [],
                "correctAnswer": 0,
                "explanation": "Office applications and PDF readers should not legitimately spawn command shells or script interpreters.",
                "dragDropItems": [
                  { "id": "d1", "token": "explorer.exe -> winword.exe", "targetSlot": "Normal Baseline" },
                  { "id": "d2", "token": "winword.exe -> powershell.exe", "targetSlot": "Anomalous Threat" },
                  { "id": "d3", "token": "services.exe -> svchost.exe", "targetSlot": "Normal Baseline" },
                  { "id": "d4", "token": "acrobat.exe -> cmd.exe", "targetSlot": "Anomalous Threat" }
                ]
              },
              {
                "id": "q-M01-U2-C1-4",
                "type": "input-value",
                "question": "Which Windows core background service manager spawns svchost.exe service instances? (Enter executable name with extension)",
                "options": [],
                "correctAnswer": 0,
                "explanation": "services.exe (the Service Control Manager) manages all background Windows services and is the authentic parent of svchost.exe.",
                "acceptedAnswers": ["services.exe", "services"]
              }
            ]
          },
          {
            "id": "M01-U2-C2",
            "title": "Routine versus unfamiliar activity",
            "duration": 13,
            "xpReward": 35,
            "mentor": "Ravi",
            "mentorRole": "Workstation & Host Mentor",
            "concept": "Distinguishing normal baseline system processes from unfamiliar or suspicious activity; verifying context rather than judging by name alone; investigating typosquatted binaries like svch0st.exe.",
            "story": "Mentor Ravi displays two process cards from workstation BLR-BR-WS-04. He teaches the learner that unfamiliar does not mean hostile, a familiar name is not a guarantee of safety, and context must always be verified.",
            "visualDesc": "Animated Visual Story: Known updater vs unfamiliar executable cards, path verification, Authenticode signatures, and typosquat detection.",
            "interactiveDesc": "Anomaly Spotter: Find the imposter process name among standard system processes.",
            "section1_theory": {
              "title": "Routine versus unfamiliar activity",
              "subtitle": "Unfamiliar Does Not Mean Hostile: Baselining, Context Verification & Masquerading Detection",
              "content": "Mentor Ravi displays two process cards side by side on his screen. One card shows an unfamiliar software updater from a hardware vendor; the other shows an executable whose name closely mimics a core Windows service.\n\nRavi explains the core analytical principle:\n“We investigate context: path, publisher information, account, parent process, time, and approved activity.”\nThe learner looks at the second card and remarks:\n“This name resembles a Windows component. Is that enough to trust it?”\nRavi shakes his head firmly:\n“No. Names can be misleading. Neither a familiar name nor a strange name settles the question.”\n\n1. Familiar Situation: Odd Names in the Task Manager\nHave you ever opened your computer's task manager and felt alarmed by strange process names like ctfmon.exe, spoolsv.exe, or igfxpers.exe? To someone without an IT background, these look like secret codes or dangerous viruses. In reality, they are standard system components that help manage keyboards, printers, and graphics cards.\n\n2. Plain-Language Explanation: Routine vs Unfamiliar\nEvery organization develops an Operational Baseline—a picture of what normal daily computer activity looks like:\n• Routine Activity: Everyday business tools (office software, approved branch banking portals, standard backup scripts) executing from standard directories at expected working hours.\n• Unfamiliar Activity: An executable name or background task you haven't seen before. Unfamiliar does NOT automatically mean malicious! It could be a scheduled software update, a newly deployed accounting patch, or a printer driver.\nDisciplined analysts do not raise emergency panic alarms just because a filename looks strange. They investigate its context.\n\n3. The Danger of Masquerading (Typosquatting)\nBecause attackers know analysts look for obvious malware names, they frequently use Masquerading. They name their malicious files to look almost identical to trusted system files:\n• Authentic Windows Service Host: svchost.exe (spelled with the letter 'o', located strictly in C:\\Windows\\System32, signed by Microsoft).\n• Typosquatted Imposter: svch0st.exe (substituting the digit '0' for the letter 'o', located in C:\\Users\\Public\\ or C:\\Temp\\, unsigned).\n\nRavi points to the suspicious card and asks:\n“You see svch0st.exe, with a zero. What can you responsibly say?”\nThe learner replies with disciplined accuracy:\n“The name is suspiciously similar; I should verify its path and other evidence.”\nRavi beams with approval:\n“Good. You have identified a reason to investigate without claiming proof of malware.”\n\n4. The 5-Point Context Checklist\nWhen evaluating an unfamiliar process, verify these five contextual pillars:\n1. Directory Path: Does it run from C:\\Program Files\\ or System32, or from a temporary user-writable folder?\n2. Digital Publisher: Is the file digitally signed by a trusted vendor (like Microsoft or your branch software supplier)?\n3. User Account: Is it running under a system service account or an interactive standard user?\n4. Parent Process: Did an authorized system service launch it, or was it spawned by a suspicious command script?\n5. Approved Change Window: Did IT schedule maintenance or an update at this specific hour?\n\n5. Story Example: Triage on BLR-BR-WS-04\nAt the Bengaluru branch, an automated alert flags an unfamiliar process named branch_sync.exe. An apprentice analyst might want to immediately kill the process and unplug the cable. Mentor Ravi pauses and checks the context: the binary lives in C:\\Program Files\\BranchTools\\, is signed by the CDAC banking portal vendor, and corresponds to an approved 14:00 branch sync schedule. The activity is routine and benign. Fact-based verification prevented a disruptive false alarm!",
              "keyTakeaway": "Unfamiliar does not mean hostile, and a familiar name does not guarantee safety. Never judge an executable by filename alone; always verify directory path, parent process, digital signature, and approved business context.",
              "cdacScenario": "Ravi guides the learner through two process cards on BLR-BR-WS-04, distinguishing an approved branch synchronization tool from a typosquatted svch0st.exe binary.",
              "formalDefinitions": [
                {
                  "term": "Operational Baseline",
                  "sourceStandard": "NIST",
                  "citationCode": "NIST SP 800-137",
                  "definition": "The set of normal execution profiles, active binaries, and network behaviors observed under authorized enterprise operations."
                },
                {
                  "term": "Masquerading",
                  "sourceStandard": "CISA",
                  "citationCode": "MITRE ATT&CK T1036.005",
                  "definition": "An adversary defense evasion technique wherein the name or location of an executable is manipulated to mimic legitimate system software."
                },
                {
                  "term": "Digital Signature Verification",
                  "sourceStandard": "NIST",
                  "citationCode": "NIST SP 800-53 SI-7",
                  "definition": "Cryptographic validation confirming the authenticity and integrity of executable code against a trusted software publisher."
                }
              ]
            },
            "questions": [
              {
                "id": "q-M01-U2-C2-1",
                "type": "mcq",
                "question": "An endpoint alert flags an executable named 'svch0st.exe' running from C:\\Users\\Public\\svch0st.exe. Why is this a definitive indicator of compromise?",
                "options": [
                  "Windows requires svchost to run from the Desktop",
                  "Legitimate svchost.exe is spelled with an 'o', resides strictly in C:\\Windows\\System32, and is signed by Microsoft",
                  "All files in C:\\Users\\Public are automatically corrupted",
                  "svchost cannot run as a service"
                ],
                "correctAnswer": 1,
                "explanation": "Typosquatting ('svch0st' with a zero) and non-standard path execution (C:\\Users\\Public instead of System32) are classic masquerading tactics."
              },
              {
                "id": "q-M01-U2-C2-2",
                "type": "matching",
                "question": "Match each Windows system binary to its legitimate path and operational purpose:",
                "options": [],
                "correctAnswer": 0,
                "explanation": "Authentic Windows system binaries reside in %SystemRoot%\\System32; identical names outside this directory are suspicious.",
                "matchingPairs": [
                  { "id": "p1", "left": "svchost.exe in System32", "right": "Generic host process for Windows services running from DLLs" },
                  { "id": "p2", "left": "lsass.exe in System32", "right": "Local Security Authority Subsystem enforcing security policies" },
                  { "id": "p3", "left": "smss.exe in System32", "right": "Session Manager Subsystem; early master system process" },
                  { "id": "p4", "left": "svch0st.exe in Users\\Public", "right": "Malicious imposter process masquerading via typosquatting" }
                ]
              },
              {
                "id": "q-M01-U2-C2-3",
                "type": "drag-drop",
                "question": "Classify each observed host binary into Baseline Legitimate vs Imposter Anomaly:",
                "options": [],
                "correctAnswer": 0,
                "explanation": "A single lsass.exe should run under SYSTEM from System32. Secondary instances or typosquatted spellings indicate credential theft or masquerading.",
                "dragDropItems": [
                  { "id": "d1", "token": "lsass.exe (Single instance, SYSTEM, C:\\Windows\\System32)", "targetSlot": "Baseline Legitimate" },
                  { "id": "d2", "token": "lsass.exe (Parent: cmd.exe, Path: C:\\Temp\\lsass.exe)", "targetSlot": "Imposter Anomaly" },
                  { "id": "d3", "token": "svchost.exe -k netsvcs (Parent: services.exe)", "targetSlot": "Baseline Legitimate" },
                  { "id": "d4", "token": "scvhost.exe (Spelled with c before v, Unsigned)", "targetSlot": "Imposter Anomaly" }
                ]
              },
              {
                "id": "q-M01-U2-C2-4",
                "type": "input-value",
                "question": "What character did the attacker substitute for the letter 'o' in the imposter process name 'svch0st.exe'?",
                "options": [],
                "correctAnswer": 0,
                "explanation": "Adversaries use digit '0' to mimic the letter 'o' (leetspeak typosquatting) hoping analysts glance over the log without scrutiny.",
                "acceptedAnswers": ["0", "zero", "number 0", "digit 0"]
              }
            ]
          }
        ],
        "assessment": {
          "id": "M01-U2-A",
          "title": "Unit 2 Assessment: Processes and Services",
          "duration": 14,
          "passingScore": 80,
          "xpReward": 50,
          "questions": [
            {
              "question": "What is the primary difference between a program and a process?",
              "options": [
                "A program is stored instructions on disk; a process is an active running instance executing in memory",
                "A program is always malicious; a process is always safe",
                "A program only runs on Linux; a process only runs on Windows",
                "A program requires a monitor; a process does not use physical hardware"
              ],
              "correctAnswer": 0,
              "explanation": "A program consists of static code stored on disk. When executed, the operating system loads it into memory as an active process."
            },
            {
              "question": "If two separate instances of the Calculator application are opened simultaneously on workstation BLR-BR-WS-04, what is true about their Process Identifiers (PIDs)?",
              "options": [
                "Both instances must share the exact same PID because they share the same executable name",
                "Each active instance is assigned its own distinct, unique Process ID by the operating system",
                "The second instance will not be assigned a PID until the first instance is closed",
                "Process IDs are only assigned to background services, not user calculators"
              ],
              "correctAnswer": 1,
              "explanation": "Every running process instance receives a distinct PID. A process name alone is not a unique identifier."
            },
            {
              "question": "An analyst inspecting tasklist telemetry encounters an unfamiliar executable named acct_daemon.exe. How should the analyst proceed?",
              "options": [
                "Immediately quarantine the host and report a confirmed breach because the name is unfamiliar",
                "Verify the file's path, parent process, digital signature, and check for approved business software before reaching a conclusion",
                "Ignore the executable completely because any file ending in .exe is safe",
                "Rename the executable to notepad.exe to make it routine"
              ],
              "correctAnswer": 1,
              "explanation": "Unfamiliar does not mean hostile. Professional analysts inspect context (path, parent, signature, schedule) rather than jumping to panic or dismissing unknown tasks."
            },
            {
              "question": "Compare the following two process records captured from workstation BLR-BR-WS-04:\nRecord 1: Name: svchost.exe | Path: C:\\Windows\\System32\\svchost.exe | Parent: services.exe | Signed: Microsoft Corporation\nRecord 2: Name: svch0st.exe | Path: C:\\Users\\FIN-OPS-01\\AppData\\Local\\Temp\\svch0st.exe | Parent: cmd.exe | Signed: Unsigned\nWhy does Record 2 represent a significant reason to investigate?",
              "options": [
                "Because Record 2 runs from System32",
                "Because Record 2 is signed by Microsoft Corporation",
                "Because Record 2 uses typosquatting (digit 0 instead of letter o), executes from a user temporary directory, and was spawned by a command shell",
                "Because Record 2 has a lower Process ID than Record 1"
              ],
              "correctAnswer": 2,
              "explanation": "Record 2 demonstrates multiple suspicious indicators: leetspeak typosquatting ('svch0st' with a zero), execution from a writable user temp directory, lack of digital signature, and an anomalous parent process (cmd.exe)."
            },
            {
              "question": "On workstation BLR-BR-WS-04, an alert indicates that Microsoft Word (winword.exe, PID 4210) spawned a child process powershell.exe (PID 7830) running an encoded command line. What is the most accurate and responsible triage note to record?",
              "options": [
                "Routine user activity: office workers frequently execute encoded PowerShell commands from Word documents",
                "Anomalous parent-child relationship: winword.exe spawned powershell.exe with encoded arguments; warrants immediate escalation for macro-based payload execution",
                "System failure: Microsoft Word has corrupted its font cache and should be uninstalled",
                "Hardware error: the CPU has overheated and scrambled the process table"
              ],
              "correctAnswer": 1,
              "explanation": "Office productivity applications do not legitimately spawn PowerShell to run encoded commands. Documenting the specific parent-child lineage and escalating follows disciplined L1 triage."
            }
          ]
        }
      },
      {
        "id": "M01-U3",
        "unitNumber": 3,
        "title": "Basic System Orientation",
        "description": "Command-line essentials, users, hostnames, timestamps, and gathering basic workstation evidence.",
        "chapters": [
          {
            "id": "M01-U3-C1",
            "title": "Command-line essentials",
            "duration": 13,
            "xpReward": 35,
            "mentor": "Ravi",
            "mentorRole": "Workstation & Host Mentor",
            "concept": "Using safe, approved observational commands (hostname, whoami, tasklist) to ask questions of the workstation; understanding output before continuing; avoiding destructive guesses.",
            "story": "A terminal appears beside plain-language cards reading 'Who am I?', 'Which device?', and 'What is running?'. Mentor Ravi guides the learner to run safe observational commands on workstation BLR-BR-WS-04.",
            "visualDesc": "Animated Visual Story: Terminal simulation displaying whoami, hostname, and tasklist with plain-language question cards and safe boundary guidance.",
            "interactiveDesc": "Command Matcher: Match the investigation question (Who am I logged in as? What ports are open?) to the right command.",
            "section1_theory": {
              "title": "Command-line essentials",
              "subtitle": "Talking to the Workstation: Safe Observational Commands, Question-First Triage & Avoiding Destructive Actions",
              "content": "Mentor Ravi opens a black terminal window on workstation BLR-BR-WS-04. A simple white prompt blinks patiently on the screen: C:\\Users\\FIN-OPS-01>. Beside the monitor, Ravi places three clear index cards: “Which device?”, “Who am I?”, and “What is running?”.\n\nRavi introduces the interface:\n“A command line is another interface. We will use only approved observational commands in this lab.”\nThe learner looks at the blank screen with slight hesitation:\n“Do I need to memorise every command?”\nRavi reassures them with a smile:\n“No. Learn the question first; use a reference sheet and understand the output before continuing.”\n\n1. Familiar Situation: Speaking Directly to a Helpful Assistant\nIf you ask a store assistant, “Excuse me, which aisle has printer paper?”, they give you a direct, specific answer. The command line works the same way: instead of navigating five graphical menus and searching for icons with a mouse, you type a short question into the terminal, press Enter, and the operating system replies immediately with the exact facts.\n\n2. The Question-First Approach to CLI\nBeginners often feel overwhelmed by thousands of technical command options. Professional analysts never memorize everything; they approach the terminal with a specific investigation question:\n• Question 1: “Which computer is this?” ➔ Run: hostname\n  Output: BLR-BR-WS-04 (identifies the physical branch machine).\n• Question 2: “Which account is active in this session?” ➔ Run: whoami\n  Output: cdac\\fin-ops-01 (identifies the user account and domain).\n• Question 3: “What programs are currently active in memory?” ➔ Run: tasklist\n  Output: A structured table showing image names, PIDs, session names, and memory usage.\n\n3. The Golden Rule of Live Triage: Observational vs Destructive Commands\nIn security triage, our goal is to observe and preserve evidence without altering system state.\n• Safe Observational Commands: Commands like hostname, whoami, tasklist, and netstat only read information from memory. They do not delete files, terminate services, or modify configurations.\n• Risky / Destructive Commands: Commands like del, rm, format, or taskkill /f change or destroy data.\nRavi asks an essential safety question:\n“If a command asks you to delete files, is it part of today's observation exercise?”\nThe learner answers firmly:\n“No. I should stop and check the instructions.”\nRavi nods with satisfaction:\n“Correct. Copying unfamiliar commands blindly is not an analyst skill.”\n\n4. Understanding Output Before Moving On\nRunning a command is only half the job; an analyst must understand what the terminal returns. If you run whoami /user, the output displays the account name and a long string called a Security Identifier (SID) like S-1-5-21-.... This SID is the machine's internal badge number for that account. Take a moment to read the columns and numbers rather than rushing to type the next command.\n\n5. Story Example: Lab Triage on BLR-BR-WS-04\nInside the isolated training VM at CDAC Bengaluru, the learner follows Ravi's instructions:\n1. Types hostname ➔ Terminal returns BLR-BR-WS-04.\n2. Types whoami ➔ Terminal returns cdac\\FIN-OPS-01.\n3. Types tasklist ➔ Identifies the active accounting software process.\nThe learner records these three verified facts into an initial observation card. Not a single file was altered, and valuable evidence was safely documented!",
              "keyTakeaway": "The command-line is an interface for asking questions. Learn the question before the command, rely on reference sheets, use approved observational commands (hostname, whoami, tasklist), and never copy or execute destructive commands blindly.",
              "cdacScenario": "Ravi guides the learner in the isolated CDAC lab VM to run safe observational triage commands on BLR-BR-WS-04 without modifying system state.",
              "formalDefinitions": [
                {
                  "term": "Command Line Interface (CLI)",
                  "sourceStandard": "ISO",
                  "citationCode": "IEEE Std 1003.1",
                  "definition": "A text-based user interface used to view system state and execute system utilities via typed input strings."
                },
                {
                  "term": "Volatile Data Collection",
                  "sourceStandard": "RFC",
                  "citationCode": "RFC 3227",
                  "definition": "The systematic acquisition of live, transient system evidence (logged-on users, running processes, active network connections) in order of volatility."
                },
                {
                  "term": "Non-Invasive Triage",
                  "sourceStandard": "NIST",
                  "citationCode": "NIST SP 800-86",
                  "definition": "Forensic examination techniques that inspect volatile and non-volatile system state while avoiding alteration of original evidentiary artifacts."
                }
              ]
            },
            "questions": [
              {
                "id": "q-M01-U3-C1-1",
                "type": "mcq",
                "question": "During live host triage, which Windows command displays active TCP/UDP connections along with the owning Process ID (PID) for each socket?",
                "options": [
                  "hostname",
                  "netstat -ano",
                  "echo %PATH%",
                  "dir /s"
                ],
                "correctAnswer": 1,
                "explanation": "`netstat -ano` displays active network connections (-a), numerical IP addresses/ports (-n), and the owning PID (-o)."
              },
              {
                "id": "q-M01-U3-C1-2",
                "type": "matching",
                "question": "Match each triage command to the critical observable evidence it extracts:",
                "options": [],
                "correctAnswer": 0,
                "explanation": "These 4 native commands form the core initial triage checklist for any L1 host investigation.",
                "matchingPairs": [
                  { "id": "p1", "left": "whoami /user", "right": "Current username and Security Identifier (SID)" },
                  { "id": "p2", "left": "hostname", "right": "Local machine network name for Active Directory correlation" },
                  { "id": "p3", "left": "tasklist /v", "right": "All active processes, session names, and PID numbers" },
                  { "id": "p4", "left": "netstat -ano", "right": "Listening network ports mapped to responsible process PIDs" }
                ]
              },
              {
                "id": "q-M01-U3-C1-3",
                "type": "drag-drop",
                "question": "Classify each investigation question into the command that answers it:",
                "options": [],
                "correctAnswer": 0,
                "explanation": "Knowing which CLI utility answers each fundamental triage question speeds up incident qualification.",
                "dragDropItems": [
                  { "id": "d1", "token": "What is the machine name of this compromised endpoint?", "targetSlot": "hostname" },
                  { "id": "d2", "token": "What is the SID and privilege token of the active session?", "targetSlot": "whoami /user" },
                  { "id": "d3", "token": "Which PID is listening on suspicious port 4444?", "targetSlot": "netstat -ano" },
                  { "id": "d4", "token": "Is powershell.exe currently running in memory?", "targetSlot": "tasklist" }
                ]
              },
              {
                "id": "q-M01-U3-C1-4",
                "type": "input-value",
                "question": "Which command-line utility prints the logged-in username on both Windows cmd and Linux bash shells?",
                "options": [],
                "correctAnswer": 0,
                "explanation": "`whoami` prints the current user account in both Windows and POSIX-compliant operating systems.",
                "acceptedAnswers": ["whoami", "whoami.exe"]
              }
            ]
          },
          {
            "id": "M01-U3-C2",
            "title": "Users, hostnames and timestamps",
            "duration": 13,
            "xpReward": 35,
            "mentor": "Ravi",
            "mentorRole": "Workstation & Host Mentor",
            "concept": "Building a structured workstation evidence card with hostname, account, clock time, and explicit time zone; distinguishing account credentials from proof of human presence; UTC normalization.",
            "story": "Mentor Ravi guides the learner to build an identity card for evidence on workstation BLR-BR-WS-04. He demonstrates how to turn vague notes into precise, verifiable evidence with explicit time zones.",
            "visualDesc": "Animated Visual Story: Building an evidence identity card with BLR-BR-WS-04, FIN-OPS-01, IST (+05:30) timestamps, and UTC normalization.",
            "interactiveDesc": "Timestamp Normalizer: Match IST timestamps to standard UTC timestamps.",
            "section1_theory": {
              "title": "Users, hostnames and timestamps",
              "subtitle": "An Identity Card for Evidence: Disambiguating Entities, Preserving Time Zones & Professional Triage Documentation",
              "content": "Mentor Ravi places an initial scrap of paper on the desk. Written in scribbled pencil is an ambiguous note from a previous shift: “Someone did something yesterday on the finance PC.”\n\nRavi shakes his head with a gentle grin:\n“These fields give observations an address in the investigation: which system, which account, and when.”\nThe learner points to the account field and asks:\n“If the account is FIN-OPS-01, can I write that the employee personally performed every action?”\nRavi provides an essential forensic guideline:\n“Not from that field alone. Say the activity was recorded under that account.”\n\n1. Familiar Situation: A Lost Package Without an Address\nImagine receiving an urgent postal delivery with no sender name, no street address, and no postal date stamp—just a note saying “Important item enclosed.” You would have no idea who sent it, which house it belongs to, or whether it arrived today or three weeks ago. Digital evidence without an address is equally useless in a security investigation.\n\n2. The 3-Part Workstation Evidence Identity Card\nTo give any security observation a solid, indisputable address, an analyst documents three fundamental anchor fields:\n• 1. Hostname (Which computer?): The unique machine name on the enterprise network (e.g., BLR-BR-WS-04). This separates the hardware asset from other laptops and servers.\n• 2. Account Identifier (Under which identity?): The credential logged into the session (e.g., FIN-OPS-01). Remember: an account is an identity token, not proof of who sat in the chair! Credentials can be shared, automated, or compromised. Always write: “Activity recorded under account FIN-OPS-01”.\n• 3. Timestamp & Explicit Time Zone (When did it occur?): The exact hour, minute, second, and time zone offset (e.g., 2026-10-14 14:30:00 IST [+05:30]).\n\n3. Why Time Zones Matter: The UTC Standard\nRavi tests your reasoning on timestamps:\n“Why preserve the time zone as well as the clock time?”\nThe learner answers thoughtfully:\n“Because the same clock reading can mean different moments in different zones.”\nRavi confirms:\n“Exactly. Your first useful evidence note is now clear enough for someone else to read.”\nCDAC Bengaluru operates in Indian Standard Time (IST, UTC+05:30). If an event happens at 14:30:00 IST and you omit the time zone, an analyst in London (UTC) reading “14:30” would assume the event happened five and a half hours later! Security Operations Centres standardize on Coordinated Universal Time (UTC) to sequence events across global sensors accurately:\n14:30:00 IST minus 05:30:00 = 09:00:00 UTC.\n\n4. Repairing Vague Notes into Professional Triage Artifacts\nCompare these two case notes:\n• Vague & Unusable: “Finance user had a virus yesterday.” (Who? Which PC? When? What virus?)\n• Professional & Verifiable: “Host: BLR-BR-WS-04 | Account: FIN-OPS-01 | Time: 2026-10-14 14:30:12 IST (09:00:12 UTC) | Observable: Execution of unapproved script blocked in %TEMP% by endpoint policy.”\n\n5. Story Example: Completing the Case Note on BLR-BR-WS-04\nBeside Mentor Ravi, the learner completes their first official workstation observation card for the recurring branch finance case. The card records:\n• Machine: BLR-BR-WS-04\n• Account: FIN-OPS-01\n• Timestamp: 2026-10-14 14:30:00 IST (UTC+05:30) / 09:00:00 UTC\n• Action: Safe baseline verification complete; standard user session active; no elevated administrative anomalies detected.\nRavi signs off on the note with an encouraging nod: you have completed Module 01 and learned to observe, document, and reason like a true L1 apprentice!",
              "keyTakeaway": "Every piece of evidence requires an address: Hostname, Account, and exact Timestamp with an explicit time zone. Never confuse an account with proof of a person. Standardizing timestamps to UTC ensures accurate chronological timelines.",
              "cdacScenario": "Mentor Ravi guides the learner to convert a vague note into a structured workstation evidence card for BLR-BR-WS-04 and FIN-OPS-01 with normalized UTC timestamps.",
              "formalDefinitions": [
                {
                  "term": "Evidence Documentation",
                  "sourceStandard": "ISO",
                  "citationCode": "ISO/IEC 27037",
                  "definition": "The process of identifying, collecting, acquiring, and preserving digital evidence with verifiable metadata to maintain chain of custody."
                },
                {
                  "term": "Coordinated Universal Time (UTC)",
                  "sourceStandard": "ISO",
                  "citationCode": "ISO 8601",
                  "definition": "The primary time standard by which the world regulates clocks and time, providing an unambiguous chronological baseline for distributed log correlation."
                },
                {
                  "term": "Entity Resolution",
                  "sourceStandard": "NIST",
                  "citationCode": "NIST SP 800-137",
                  "definition": "The forensic disambiguation and linkage between accounts, physical endpoints, IP addresses, and real-world persons during incident analysis."
                }
              ]
            },
            "questions": [
              {
                "id": "q-M01-U3-C2-1",
                "type": "mcq",
                "question": "An endpoint log generated at CDAC Bengaluru shows an event time of 14:44:12 IST (+05:30). What is this event time normalized to UTC?",
                "options": [
                  "20:14:12 UTC",
                  "09:14:12 UTC",
                  "14:44:12 UTC",
                  "11:30:00 UTC"
                ],
                "correctAnswer": 1,
                "explanation": "IST is UTC+05:30. Subtracting 5 hours and 30 minutes from 14:44:12 gives 09:14:12 UTC."
              },
              {
                "id": "q-M01-U3-C2-2",
                "type": "matching",
                "question": "Match each entity identifier to its purpose in multi-source SOC correlation:",
                "options": [],
                "correctAnswer": 0,
                "explanation": "Correlating User + Host + IP + Normalized UTC Timestamp provides the foundation of empirical incident triage.",
                "matchingPairs": [
                  { "id": "p1", "left": "Normalized UTC Timestamp", "right": "Universal chronological sequencing across geographically distributed sensors" },
                  { "id": "p2", "left": "Machine Hostname (e.g. BLR-BR-WS-04)", "right": "Associates network traffic with physical hardware asset and department" },
                  { "id": "p3", "left": "Domain User Account (e.g. FIN-OPS-01)", "right": "Identifies digital credential context and Active Directory role permissions" },
                  { "id": "p4", "left": "Source IP Address (e.g. 10.10.20.15)", "right": "Layer 3 network locator bound to endpoint subnet and DHCP lease" }
                ]
              },
              {
                "id": "q-M01-U3-C2-3",
                "type": "drag-drop",
                "question": "Classify each identity and timestamp observation into Routine vs Suspicious:",
                "options": [],
                "correctAnswer": 0,
                "explanation": "Clock drifts and unauthorized off-hours local accounts must be escalated immediately.",
                "dragDropItems": [
                  { "id": "d1", "token": "Log timestamp 14:44:12 IST normalized to 09:14:12 UTC", "targetSlot": "Routine / Normal" },
                  { "id": "d2", "token": "Local account adm_temp created at 02:15 UTC without ticket", "targetSlot": "Suspicious / Flagged" },
                  { "id": "d3", "token": "Account FIN-OPS-01 authenticating to assigned host BLR-BR-WS-04", "targetSlot": "Routine / Normal" },
                  { "id": "d4", "token": "Sensor clock drifting 45 minutes from NTP server", "targetSlot": "Suspicious / Flagged" }
                ]
              },
              {
                "id": "q-M01-U3-C2-4",
                "type": "input-value",
                "question": "If an event occurred at 15:30:00 IST (+05:30), what is the corresponding UTC hour in 24-hour HH:MM format? (Enter HH:MM)",
                "options": [],
                "correctAnswer": 0,
                "explanation": "15:30:00 IST minus 5 hours and 30 minutes equals 10:00 UTC.",
                "acceptedAnswers": ["10:00", "10:00:00", "10:00 UTC"]
              }
            ]
          }
        ],
        "assessment": {
          "id": "M01-U3-A",
          "title": "Unit 3 Assessment: Basic System Orientation",
          "duration": 14,
          "passingScore": 80,
          "xpReward": 50,
          "questions": [
            {
              "question": "Which native command-line utility should an analyst run on a Windows workstation to identify the machine's local computer name?",
              "options": [
                "hostname",
                "whoami",
                "tasklist",
                "format"
              ],
              "correctAnswer": 0,
              "explanation": "Running `hostname` prints the local machine's configured computer name (such as BLR-BR-WS-04) without modifying any settings."
            },
            {
              "question": "An analyst executes whoami on a branch terminal and observes the output cdac\\FIN-OPS-01. What does this observable prove?",
              "options": [
                "It proves that employee Ramesh was physically sitting at the keyboard typing",
                "It proves that the workstation hardware was manufactured by CDAC",
                "It confirms the active user account context under which commands in this session execute",
                "It proves that the computer has been compromised by malware"
              ],
              "correctAnswer": 2,
              "explanation": "An account identifier is a digital credential context. It verifies which account token is active, not which human being was physically touching the keys."
            },
            {
              "question": "Why must a security analyst always include the explicit time zone (such as IST / UTC+05:30 or UTC) when recording an event timestamp in an incident note?",
              "options": [
                "Because computers in different countries cannot subtract numbers",
                "Because omitting the time zone causes cross-region event logs to be misaligned or sequenced in the wrong chronological order",
                "Because recording the time zone makes log files smaller on disk",
                "Because time zones prevent antivirus software from alerting"
              ],
              "correctAnswer": 1,
              "explanation": "Sensors and analysts operate across distributed geographic regions. Without an explicit time zone or UTC normalization, reconstructing the true order of events across firewalls and endpoints is impossible."
            },
            {
              "question": "Consider the following raw terminal capture from an isolated triage session:\nC:\\> hostname\nBLR-BR-WS-04\nC:\\> whoami\ncdac\\FIN-OPS-01\nCollection Time: 14:30:00 IST (+05:30)\nWhich of the following is the most professional and forensically accurate summary note?",
              "options": [
                "Employee FIN-OPS-01 was caught hacking BLR-BR-WS-04 at 14:30",
                "Observed host: BLR-BR-WS-04 | Account: FIN-OPS-01 | Timestamp: 14:30:00 IST (09:00:00 UTC) | Session verified via native observational commands",
                "Someone logged into a computer yesterday afternoon and did some work",
                "Workstation BLR-BR-WS-04 has failed its hardware diagnostics"
              ],
              "correctAnswer": 1,
              "explanation": "A professional triage note records specific, verifiable observables (host, account, normalized time, method) without speculation or accusatory language."
            },
            {
              "question": "You receive an incomplete ticket handover reading: 'A bad program ran on the finance computer this morning.' Using the system orientation principles taught by Mentor Ravi, what is the best immediate response?",
              "options": [
                "Run `del C:\\*.*` across the network to wipe potential infections immediately",
                "Use the command reference to query the specific hostname, account context, and active processes, and request the exact timestamp and log source before taking action",
                "Guess that the program was a ransomware strain and pull the building's main power switch",
                "Close the ticket as resolved because vague tickets are unimportant"
              ],
              "correctAnswer": 1,
              "explanation": "Disciplined analysts do not guess or execute destructive commands. They use non-invasive observational queries and reference sheets to identify the specific host, account, and timestamp."
            }
          ]
        }
      }
    ]
  },
  {
    "id": "02",
    "title": "Networking Fundamentals",
    "level": "Beginner",
    "difficulty": "BEGINNER",
    "order": 2,
    "theoryHours": 2,
    "labHours": 1,
    "totalHours": 3,
    "mentor": "Ravi",
    "mentorRole": "Network & Branch Mentor",
    "story": "Mentor Ravi walks you through a small CDAC Bengaluru branch network, from a staff laptop to the local switch, gateway, DNS and an internal service.",
    "units": [
      {
        "id": "M02-U1",
        "unitNumber": 1,
        "title": "How Branch Devices Connect",
        "description": "IP addresses, masks, gateways, switches, routers, and access points in branch offices.",
        "chapters": [
          {
            "id": "M02-U1-C1",
            "title": "IP addresses, masks and gateways",
            "duration": 14,
            "concept": "Core concepts for IP addresses, masks and gateways explained for L1 SOC analysts in the CDAC Bengaluru learning setting.",
            "visualDesc": "Visual story for IP addresses, masks and gateways illustrating key evidence indicators and workflow steps.",
            "interactiveDesc": "Hands-on activity: Identify and match key elements of IP addresses, masks and gateways.",
            "questions": [
              {
                "question": "What is the key takeaway when evaluating IP addresses, masks and gateways in an L1 operational setting?",
                "options": [
                  "Always verify the observed evidence and correlate across multiple records",
                  "Assume the first alarm is 100% correct without checking",
                  "Delete the log entry to reduce ticket queue count",
                  "Immediately shutdown the entire branch network"
                ],
                "correctAnswer": 0,
                "explanation": "Careful verification and corroborating facts across sources prevents false alarms and ensures high evidence quality."
              }
            ]
          },
          {
            "id": "M02-U1-C2",
            "title": "Switches, routers and access points",
            "duration": 14,
            "concept": "Operational application of Switches, routers and access points during alert triage and analyst shifts.",
            "visualDesc": "Interface walkthrough and telemetry demo for Switches, routers and access points.",
            "interactiveDesc": "Interactive investigation: Analyze sample records related to Switches, routers and access points.",
            "questions": [
              {
                "question": "How does understanding Switches, routers and access points assist an L1 analyst on shift?",
                "options": [
                  "It allows distinguishing normal baseline operations from suspicious outliers",
                  "It guarantees zero alerts will ever trigger",
                  "It replaces the need for a SIEM",
                  "It eliminates the need for supervisor handoffs"
                ],
                "correctAnswer": 0,
                "explanation": "Understanding expected baseline behaviors enables analysts to quickly spot deviations and anomalous patterns."
              }
            ]
          }
        ],
        "assessment": {
          "id": "M02-U1-A",
          "title": "Unit Assessment: How Branch Devices Connect",
          "duration": 14,
          "passingScore": 80,
          "xpReward": 50,
          "questions": [
            {
              "question": "In Unit 1 (How Branch Devices Connect), what is the primary standard for documenting findings?",
              "options": [
                "Clear facts with supporting timestamps, host, and user references",
                "Personal opinions without log evidence",
                "One-word answers without context",
                "Forwarding raw screenshots without explanation"
              ],
              "correctAnswer": 0,
              "explanation": "Professional SOC documentation requires specific facts, timestamps, and verifiable references."
            }
          ]
        }
      },
      {
        "id": "M02-U2",
        "unitNumber": 2,
        "title": "Name and Address Services",
        "description": "DNS, DHCP, ports, and transport protocols (TCP vs UDP).",
        "chapters": [
          {
            "id": "M02-U2-C1",
            "title": "DNS and DHCP",
            "duration": 13,
            "concept": "Core concepts for DNS and DHCP explained for L1 SOC analysts in the CDAC Bengaluru learning setting.",
            "visualDesc": "Visual story for DNS and DHCP illustrating key evidence indicators and workflow steps.",
            "interactiveDesc": "Hands-on activity: Identify and match key elements of DNS and DHCP.",
            "questions": [
              {
                "question": "What is the key takeaway when evaluating DNS and DHCP in an L1 operational setting?",
                "options": [
                  "Always verify the observed evidence and correlate across multiple records",
                  "Assume the first alarm is 100% correct without checking",
                  "Delete the log entry to reduce ticket queue count",
                  "Immediately shutdown the entire branch network"
                ],
                "correctAnswer": 0,
                "explanation": "Careful verification and corroborating facts across sources prevents false alarms and ensures high evidence quality."
              }
            ]
          },
          {
            "id": "M02-U2-C2",
            "title": "Ports, TCP and UDP",
            "duration": 13,
            "concept": "Operational application of Ports, TCP and UDP during alert triage and analyst shifts.",
            "visualDesc": "Interface walkthrough and telemetry demo for Ports, TCP and UDP.",
            "interactiveDesc": "Interactive investigation: Analyze sample records related to Ports, TCP and UDP.",
            "questions": [
              {
                "question": "How does understanding Ports, TCP and UDP assist an L1 analyst on shift?",
                "options": [
                  "It allows distinguishing normal baseline operations from suspicious outliers",
                  "It guarantees zero alerts will ever trigger",
                  "It replaces the need for a SIEM",
                  "It eliminates the need for supervisor handoffs"
                ],
                "correctAnswer": 0,
                "explanation": "Understanding expected baseline behaviors enables analysts to quickly spot deviations and anomalous patterns."
              }
            ]
          }
        ],
        "assessment": {
          "id": "M02-U2-A",
          "title": "Unit Assessment: Name and Address Services",
          "duration": 13,
          "passingScore": 80,
          "xpReward": 50,
          "questions": [
            {
              "question": "In Unit 2 (Name and Address Services), what is the primary standard for documenting findings?",
              "options": [
                "Clear facts with supporting timestamps, host, and user references",
                "Personal opinions without log evidence",
                "One-word answers without context",
                "Forwarding raw screenshots without explanation"
              ],
              "correctAnswer": 0,
              "explanation": "Professional SOC documentation requires specific facts, timestamps, and verifiable references."
            }
          ]
        }
      },
      {
        "id": "M02-U3",
        "unitNumber": 3,
        "title": "Understanding Branch Architecture",
        "description": "Comparing small branch networks with larger multi-switch VLAN environments.",
        "chapters": [
          {
            "id": "M02-U3-C1",
            "title": "Small branch: staff devices, switch, router/firewall, Wi-Fi and shared services",
            "duration": 13,
            "concept": "Core concepts for Small branch: staff devices, switch, router/firewall, Wi-Fi and shared services explained for L1 SOC analysts in the CDAC Bengaluru learning setting.",
            "visualDesc": "Visual story for Small branch: staff devices, switch, router/firewall, Wi-Fi and shared services illustrating key evidence indicators and workflow steps.",
            "interactiveDesc": "Hands-on activity: Identify and match key elements of Small branch: staff devices, switch, router/firewall, Wi-Fi and shared services.",
            "questions": [
              {
                "question": "What is the key takeaway when evaluating Small branch: staff devices, switch, router/firewall, Wi-Fi and shared services in an L1 operational setting?",
                "options": [
                  "Always verify the observed evidence and correlate across multiple records",
                  "Assume the first alarm is 100% correct without checking",
                  "Delete the log entry to reduce ticket queue count",
                  "Immediately shutdown the entire branch network"
                ],
                "correctAnswer": 0,
                "explanation": "Careful verification and corroborating facts across sources prevents false alarms and ensures high evidence quality."
              }
            ]
          },
          {
            "id": "M02-U3-C2",
            "title": "Larger branch: VLANs, multiple access switches, server/network segments and central connectivity",
            "duration": 13,
            "concept": "Operational application of Larger branch: VLANs, multiple access switches, server/network segments and central connectivity during alert triage and analyst shifts.",
            "visualDesc": "Interface walkthrough and telemetry demo for Larger branch: VLANs, multiple access switches, server/network segments and central connectivity.",
            "interactiveDesc": "Interactive investigation: Analyze sample records related to Larger branch: VLANs, multiple access switches, server/network segments and central connectivity.",
            "questions": [
              {
                "question": "How does understanding Larger branch: VLANs, multiple access switches, server/network segments and central connectivity assist an L1 analyst on shift?",
                "options": [
                  "It allows distinguishing normal baseline operations from suspicious outliers",
                  "It guarantees zero alerts will ever trigger",
                  "It replaces the need for a SIEM",
                  "It eliminates the need for supervisor handoffs"
                ],
                "correctAnswer": 0,
                "explanation": "Understanding expected baseline behaviors enables analysts to quickly spot deviations and anomalous patterns."
              }
            ]
          }
        ],
        "assessment": {
          "id": "M02-U3-A",
          "title": "Unit Assessment: Understanding Branch Architecture",
          "duration": 13,
          "passingScore": 80,
          "xpReward": 50,
          "questions": [
            {
              "question": "In Unit 3 (Understanding Branch Architecture), what is the primary standard for documenting findings?",
              "options": [
                "Clear facts with supporting timestamps, host, and user references",
                "Personal opinions without log evidence",
                "One-word answers without context",
                "Forwarding raw screenshots without explanation"
              ],
              "correctAnswer": 0,
              "explanation": "Professional SOC documentation requires specific facts, timestamps, and verifiable references."
            }
          ]
        }
      }
    ]
  },
  {
    "id": "03",
    "title": "Cybersecurity Fundamentals",
    "level": "Beginner",
    "difficulty": "BEGINNER",
    "order": 3,
    "theoryHours": 2,
    "labHours": 1,
    "totalHours": 3,
    "mentor": "Ananya",
    "mentorRole": "Experienced L1 Mentor",
    "story": "Mentor Ananya introduces assets, threats, vulnerabilities, controls and risk using ordinary office and branch scenarios.",
    "units": [
      {
        "id": "M03-U1",
        "unitNumber": 1,
        "title": "Security Foundations",
        "description": "Assets, threats, vulnerabilities, risk, impact, and likelihood.",
        "chapters": [
          {
            "id": "M03-U1-C1",
            "title": "Assets, threats and vulnerabilities",
            "duration": 14,
            "concept": "Core concepts for Assets, threats and vulnerabilities explained for L1 SOC analysts in the CDAC Bengaluru learning setting.",
            "visualDesc": "Visual story for Assets, threats and vulnerabilities illustrating key evidence indicators and workflow steps.",
            "interactiveDesc": "Hands-on activity: Identify and match key elements of Assets, threats and vulnerabilities.",
            "questions": [
              {
                "question": "What is the key takeaway when evaluating Assets, threats and vulnerabilities in an L1 operational setting?",
                "options": [
                  "Always verify the observed evidence and correlate across multiple records",
                  "Assume the first alarm is 100% correct without checking",
                  "Delete the log entry to reduce ticket queue count",
                  "Immediately shutdown the entire branch network"
                ],
                "correctAnswer": 0,
                "explanation": "Careful verification and corroborating facts across sources prevents false alarms and ensures high evidence quality."
              }
            ]
          },
          {
            "id": "M03-U1-C2",
            "title": "Risk, impact and likelihood",
            "duration": 14,
            "concept": "Operational application of Risk, impact and likelihood during alert triage and analyst shifts.",
            "visualDesc": "Interface walkthrough and telemetry demo for Risk, impact and likelihood.",
            "interactiveDesc": "Interactive investigation: Analyze sample records related to Risk, impact and likelihood.",
            "questions": [
              {
                "question": "How does understanding Risk, impact and likelihood assist an L1 analyst on shift?",
                "options": [
                  "It allows distinguishing normal baseline operations from suspicious outliers",
                  "It guarantees zero alerts will ever trigger",
                  "It replaces the need for a SIEM",
                  "It eliminates the need for supervisor handoffs"
                ],
                "correctAnswer": 0,
                "explanation": "Understanding expected baseline behaviors enables analysts to quickly spot deviations and anomalous patterns."
              }
            ]
          }
        ],
        "assessment": {
          "id": "M03-U1-A",
          "title": "Unit Assessment: Security Foundations",
          "duration": 14,
          "passingScore": 80,
          "xpReward": 50,
          "questions": [
            {
              "question": "In Unit 1 (Security Foundations), what is the primary standard for documenting findings?",
              "options": [
                "Clear facts with supporting timestamps, host, and user references",
                "Personal opinions without log evidence",
                "One-word answers without context",
                "Forwarding raw screenshots without explanation"
              ],
              "correctAnswer": 0,
              "explanation": "Professional SOC documentation requires specific facts, timestamps, and verifiable references."
            }
          ]
        }
      },
      {
        "id": "M03-U2",
        "unitNumber": 2,
        "title": "Common Threats",
        "description": "Phishing, credential attacks, malware, insider threats, and network scans.",
        "chapters": [
          {
            "id": "M03-U2-C1",
            "title": "Phishing and credential attacks",
            "duration": 13,
            "concept": "Core concepts for Phishing and credential attacks explained for L1 SOC analysts in the CDAC Bengaluru learning setting.",
            "visualDesc": "Visual story for Phishing and credential attacks illustrating key evidence indicators and workflow steps.",
            "interactiveDesc": "Hands-on activity: Identify and match key elements of Phishing and credential attacks.",
            "questions": [
              {
                "question": "What is the key takeaway when evaluating Phishing and credential attacks in an L1 operational setting?",
                "options": [
                  "Always verify the observed evidence and correlate across multiple records",
                  "Assume the first alarm is 100% correct without checking",
                  "Delete the log entry to reduce ticket queue count",
                  "Immediately shutdown the entire branch network"
                ],
                "correctAnswer": 0,
                "explanation": "Careful verification and corroborating facts across sources prevents false alarms and ensures high evidence quality."
              }
            ]
          },
          {
            "id": "M03-U2-C2",
            "title": "Malware, insider and network threats",
            "duration": 13,
            "concept": "Operational application of Malware, insider and network threats during alert triage and analyst shifts.",
            "visualDesc": "Interface walkthrough and telemetry demo for Malware, insider and network threats.",
            "interactiveDesc": "Interactive investigation: Analyze sample records related to Malware, insider and network threats.",
            "questions": [
              {
                "question": "How does understanding Malware, insider and network threats assist an L1 analyst on shift?",
                "options": [
                  "It allows distinguishing normal baseline operations from suspicious outliers",
                  "It guarantees zero alerts will ever trigger",
                  "It replaces the need for a SIEM",
                  "It eliminates the need for supervisor handoffs"
                ],
                "correctAnswer": 0,
                "explanation": "Understanding expected baseline behaviors enables analysts to quickly spot deviations and anomalous patterns."
              }
            ]
          }
        ],
        "assessment": {
          "id": "M03-U2-A",
          "title": "Unit Assessment: Common Threats",
          "duration": 13,
          "passingScore": 80,
          "xpReward": 50,
          "questions": [
            {
              "question": "In Unit 2 (Common Threats), what is the primary standard for documenting findings?",
              "options": [
                "Clear facts with supporting timestamps, host, and user references",
                "Personal opinions without log evidence",
                "One-word answers without context",
                "Forwarding raw screenshots without explanation"
              ],
              "correctAnswer": 0,
              "explanation": "Professional SOC documentation requires specific facts, timestamps, and verifiable references."
            }
          ]
        }
      },
      {
        "id": "M03-U3",
        "unitNumber": 3,
        "title": "Defensive Controls",
        "description": "Prevention, detection, response, least privilege, and defense-in-depth.",
        "chapters": [
          {
            "id": "M03-U3-C1",
            "title": "Prevention, detection and response",
            "duration": 13,
            "concept": "Core concepts for Prevention, detection and response explained for L1 SOC analysts in the CDAC Bengaluru learning setting.",
            "visualDesc": "Visual story for Prevention, detection and response illustrating key evidence indicators and workflow steps.",
            "interactiveDesc": "Hands-on activity: Identify and match key elements of Prevention, detection and response.",
            "questions": [
              {
                "question": "What is the key takeaway when evaluating Prevention, detection and response in an L1 operational setting?",
                "options": [
                  "Always verify the observed evidence and correlate across multiple records",
                  "Assume the first alarm is 100% correct without checking",
                  "Delete the log entry to reduce ticket queue count",
                  "Immediately shutdown the entire branch network"
                ],
                "correctAnswer": 0,
                "explanation": "Careful verification and corroborating facts across sources prevents false alarms and ensures high evidence quality."
              }
            ]
          },
          {
            "id": "M03-U3-C2",
            "title": "Least privilege and defense in depth",
            "duration": 13,
            "concept": "Operational application of Least privilege and defense in depth during alert triage and analyst shifts.",
            "visualDesc": "Interface walkthrough and telemetry demo for Least privilege and defense in depth.",
            "interactiveDesc": "Interactive investigation: Analyze sample records related to Least privilege and defense in depth.",
            "questions": [
              {
                "question": "How does understanding Least privilege and defense in depth assist an L1 analyst on shift?",
                "options": [
                  "It allows distinguishing normal baseline operations from suspicious outliers",
                  "It guarantees zero alerts will ever trigger",
                  "It replaces the need for a SIEM",
                  "It eliminates the need for supervisor handoffs"
                ],
                "correctAnswer": 0,
                "explanation": "Understanding expected baseline behaviors enables analysts to quickly spot deviations and anomalous patterns."
              }
            ]
          }
        ],
        "assessment": {
          "id": "M03-U3-A",
          "title": "Unit Assessment: Defensive Controls",
          "duration": 13,
          "passingScore": 80,
          "xpReward": 50,
          "questions": [
            {
              "question": "In Unit 3 (Defensive Controls), what is the primary standard for documenting findings?",
              "options": [
                "Clear facts with supporting timestamps, host, and user references",
                "Personal opinions without log evidence",
                "One-word answers without context",
                "Forwarding raw screenshots without explanation"
              ],
              "correctAnswer": 0,
              "explanation": "Professional SOC documentation requires specific facts, timestamps, and verifiable references."
            }
          ]
        }
      }
    ]
  },
  {
    "id": "04",
    "title": "SOC Operations & Alert Triage",
    "level": "Beginner",
    "difficulty": "BEGINNER",
    "order": 4,
    "theoryHours": 5,
    "labHours": 4,
    "totalHours": 9,
    "mentor": "Ananya",
    "mentorRole": "Experienced L1 Mentor",
    "story": "Mentor Ananya coaches you through an alert involving employee user FIN-OPS-01 on BLR-BR-WS-04. You identify entities, check evidence, judge context, set a priority and write an L1 note.",
    "units": [
      {
        "id": "M04-U1",
        "unitNumber": 1,
        "title": "SOC People and Workflow",
        "description": "L1/L2/L3 roles, mentor handoffs, alert queues, triage, and ticket ownership.",
        "chapters": [
          {
            "id": "M04-U1-C1",
            "title": "L1/L2/L3 roles and mentor handoffs",
            "duration": 34,
            "concept": "Core concepts for L1/L2/L3 roles and mentor handoffs explained for L1 SOC analysts in the CDAC Bengaluru learning setting.",
            "visualDesc": "Visual story for L1/L2/L3 roles and mentor handoffs illustrating key evidence indicators and workflow steps.",
            "interactiveDesc": "Hands-on activity: Identify and match key elements of L1/L2/L3 roles and mentor handoffs.",
            "questions": [
              {
                "question": "What is the key takeaway when evaluating L1/L2/L3 roles and mentor handoffs in an L1 operational setting?",
                "options": [
                  "Always verify the observed evidence and correlate across multiple records",
                  "Assume the first alarm is 100% correct without checking",
                  "Delete the log entry to reduce ticket queue count",
                  "Immediately shutdown the entire branch network"
                ],
                "correctAnswer": 0,
                "explanation": "Careful verification and corroborating facts across sources prevents false alarms and ensures high evidence quality."
              }
            ]
          },
          {
            "id": "M04-U1-C2",
            "title": "Alert queue, triage and ownership",
            "duration": 34,
            "concept": "Operational application of Alert queue, triage and ownership during alert triage and analyst shifts.",
            "visualDesc": "Interface walkthrough and telemetry demo for Alert queue, triage and ownership.",
            "interactiveDesc": "Interactive investigation: Analyze sample records related to Alert queue, triage and ownership.",
            "questions": [
              {
                "question": "How does understanding Alert queue, triage and ownership assist an L1 analyst on shift?",
                "options": [
                  "It allows distinguishing normal baseline operations from suspicious outliers",
                  "It guarantees zero alerts will ever trigger",
                  "It replaces the need for a SIEM",
                  "It eliminates the need for supervisor handoffs"
                ],
                "correctAnswer": 0,
                "explanation": "Understanding expected baseline behaviors enables analysts to quickly spot deviations and anomalous patterns."
              }
            ]
          }
        ],
        "assessment": {
          "id": "M04-U1-A",
          "title": "Unit Assessment: SOC People and Workflow",
          "duration": 34,
          "passingScore": 80,
          "xpReward": 50,
          "questions": [
            {
              "question": "In Unit 1 (SOC People and Workflow), what is the primary standard for documenting findings?",
              "options": [
                "Clear facts with supporting timestamps, host, and user references",
                "Personal opinions without log evidence",
                "One-word answers without context",
                "Forwarding raw screenshots without explanation"
              ],
              "correctAnswer": 0,
              "explanation": "Professional SOC documentation requires specific facts, timestamps, and verifiable references."
            }
          ]
        }
      },
      {
        "id": "M04-U2",
        "unitNumber": 2,
        "title": "Events, Alerts and Cases",
        "description": "Distinguishing raw events from correlated alerts, and incidents from cases.",
        "chapters": [
          {
            "id": "M04-U2-C1",
            "title": "Event versus alert",
            "duration": 33,
            "concept": "Core concepts for Event versus alert explained for L1 SOC analysts in the CDAC Bengaluru learning setting.",
            "visualDesc": "Visual story for Event versus alert illustrating key evidence indicators and workflow steps.",
            "interactiveDesc": "Hands-on activity: Identify and match key elements of Event versus alert.",
            "questions": [
              {
                "question": "What is the key takeaway when evaluating Event versus alert in an L1 operational setting?",
                "options": [
                  "Always verify the observed evidence and correlate across multiple records",
                  "Assume the first alarm is 100% correct without checking",
                  "Delete the log entry to reduce ticket queue count",
                  "Immediately shutdown the entire branch network"
                ],
                "correctAnswer": 0,
                "explanation": "Careful verification and corroborating facts across sources prevents false alarms and ensures high evidence quality."
              }
            ]
          },
          {
            "id": "M04-U2-C2",
            "title": "Incident versus case",
            "duration": 33,
            "concept": "Operational application of Incident versus case during alert triage and analyst shifts.",
            "visualDesc": "Interface walkthrough and telemetry demo for Incident versus case.",
            "interactiveDesc": "Interactive investigation: Analyze sample records related to Incident versus case.",
            "questions": [
              {
                "question": "How does understanding Incident versus case assist an L1 analyst on shift?",
                "options": [
                  "It allows distinguishing normal baseline operations from suspicious outliers",
                  "It guarantees zero alerts will ever trigger",
                  "It replaces the need for a SIEM",
                  "It eliminates the need for supervisor handoffs"
                ],
                "correctAnswer": 0,
                "explanation": "Understanding expected baseline behaviors enables analysts to quickly spot deviations and anomalous patterns."
              }
            ]
          }
        ],
        "assessment": {
          "id": "M04-U2-A",
          "title": "Unit Assessment: Events, Alerts and Cases",
          "duration": 33,
          "passingScore": 80,
          "xpReward": 50,
          "questions": [
            {
              "question": "In Unit 2 (Events, Alerts and Cases), what is the primary standard for documenting findings?",
              "options": [
                "Clear facts with supporting timestamps, host, and user references",
                "Personal opinions without log evidence",
                "One-word answers without context",
                "Forwarding raw screenshots without explanation"
              ],
              "correctAnswer": 0,
              "explanation": "Professional SOC documentation requires specific facts, timestamps, and verifiable references."
            }
          ]
        }
      },
      {
        "id": "M04-U3",
        "unitNumber": 3,
        "title": "Initial Alert Triage",
        "description": "Extracting user, host, IP, time, and count; recording notes and dispositions.",
        "chapters": [
          {
            "id": "M04-U3-C1",
            "title": "Identify user, host, IP, time and count",
            "duration": 33,
            "concept": "Core concepts for Identify user, host, IP, time and count explained for L1 SOC analysts in the CDAC Bengaluru learning setting.",
            "visualDesc": "Visual story for Identify user, host, IP, time and count illustrating key evidence indicators and workflow steps.",
            "interactiveDesc": "Hands-on activity: Identify and match key elements of Identify user, host, IP, time and count.",
            "questions": [
              {
                "question": "What is the key takeaway when evaluating Identify user, host, IP, time and count in an L1 operational setting?",
                "options": [
                  "Always verify the observed evidence and correlate across multiple records",
                  "Assume the first alarm is 100% correct without checking",
                  "Delete the log entry to reduce ticket queue count",
                  "Immediately shutdown the entire branch network"
                ],
                "correctAnswer": 0,
                "explanation": "Careful verification and corroborating facts across sources prevents false alarms and ensures high evidence quality."
              }
            ]
          },
          {
            "id": "M04-U3-C2",
            "title": "Context, disposition and analyst notes",
            "duration": 33,
            "concept": "Operational application of Context, disposition and analyst notes during alert triage and analyst shifts.",
            "visualDesc": "Interface walkthrough and telemetry demo for Context, disposition and analyst notes.",
            "interactiveDesc": "Interactive investigation: Analyze sample records related to Context, disposition and analyst notes.",
            "questions": [
              {
                "question": "How does understanding Context, disposition and analyst notes assist an L1 analyst on shift?",
                "options": [
                  "It allows distinguishing normal baseline operations from suspicious outliers",
                  "It guarantees zero alerts will ever trigger",
                  "It replaces the need for a SIEM",
                  "It eliminates the need for supervisor handoffs"
                ],
                "correctAnswer": 0,
                "explanation": "Understanding expected baseline behaviors enables analysts to quickly spot deviations and anomalous patterns."
              }
            ]
          }
        ],
        "assessment": {
          "id": "M04-U3-A",
          "title": "Unit Assessment: Initial Alert Triage",
          "duration": 33,
          "passingScore": 80,
          "xpReward": 50,
          "questions": [
            {
              "question": "In Unit 3 (Initial Alert Triage), what is the primary standard for documenting findings?",
              "options": [
                "Clear facts with supporting timestamps, host, and user references",
                "Personal opinions without log evidence",
                "One-word answers without context",
                "Forwarding raw screenshots without explanation"
              ],
              "correctAnswer": 0,
              "explanation": "Professional SOC documentation requires specific facts, timestamps, and verifiable references."
            }
          ]
        }
      }
    ]
  },
  {
    "id": "05",
    "title": "SIEM Fundamentals & Search",
    "level": "Beginner–Intermediate",
    "difficulty": "INTERMEDIATE",
    "order": 5,
    "theoryHours": 5,
    "labHours": 5,
    "totalHours": 10,
    "mentor": "Karthik",
    "mentorRole": "Senior L1 / SIEM Operator",
    "story": "Mentor Karthik, a senior L1/SIEM operator, shows how branch logs reach a SIEM, how to search them and how detections surface for analysts.",
    "units": [
      {
        "id": "M05-U1",
        "unitNumber": 1,
        "title": "SIEM Purpose and Data",
        "description": "What SIEM platforms do, log sources, and ingestion concepts.",
        "chapters": [
          {
            "id": "M05-U1-C1",
            "title": "What SIEM does and does not do",
            "duration": 34,
            "concept": "Core concepts for What SIEM does and does not do explained for L1 SOC analysts in the CDAC Bengaluru learning setting.",
            "visualDesc": "Visual story for What SIEM does and does not do illustrating key evidence indicators and workflow steps.",
            "interactiveDesc": "Hands-on activity: Identify and match key elements of What SIEM does and does not do.",
            "questions": [
              {
                "question": "What is the key takeaway when evaluating What SIEM does and does not do in an L1 operational setting?",
                "options": [
                  "Always verify the observed evidence and correlate across multiple records",
                  "Assume the first alarm is 100% correct without checking",
                  "Delete the log entry to reduce ticket queue count",
                  "Immediately shutdown the entire branch network"
                ],
                "correctAnswer": 0,
                "explanation": "Careful verification and corroborating facts across sources prevents false alarms and ensures high evidence quality."
              }
            ]
          },
          {
            "id": "M05-U1-C2",
            "title": "Log sources and ingestion concepts",
            "duration": 34,
            "concept": "Operational application of Log sources and ingestion concepts during alert triage and analyst shifts.",
            "visualDesc": "Interface walkthrough and telemetry demo for Log sources and ingestion concepts.",
            "interactiveDesc": "Interactive investigation: Analyze sample records related to Log sources and ingestion concepts.",
            "questions": [
              {
                "question": "How does understanding Log sources and ingestion concepts assist an L1 analyst on shift?",
                "options": [
                  "It allows distinguishing normal baseline operations from suspicious outliers",
                  "It guarantees zero alerts will ever trigger",
                  "It replaces the need for a SIEM",
                  "It eliminates the need for supervisor handoffs"
                ],
                "correctAnswer": 0,
                "explanation": "Understanding expected baseline behaviors enables analysts to quickly spot deviations and anomalous patterns."
              }
            ]
          }
        ],
        "assessment": {
          "id": "M05-U1-A",
          "title": "Unit Assessment: SIEM Purpose and Data",
          "duration": 34,
          "passingScore": 80,
          "xpReward": 50,
          "questions": [
            {
              "question": "In Unit 1 (SIEM Purpose and Data), what is the primary standard for documenting findings?",
              "options": [
                "Clear facts with supporting timestamps, host, and user references",
                "Personal opinions without log evidence",
                "One-word answers without context",
                "Forwarding raw screenshots without explanation"
              ],
              "correctAnswer": 0,
              "explanation": "Professional SOC documentation requires specific facts, timestamps, and verifiable references."
            }
          ]
        }
      },
      {
        "id": "M05-U2",
        "unitNumber": 2,
        "title": "Searching and Filtering",
        "description": "Filtering by fields and time ranges, basic query syntax in OpenSearch/Splunk.",
        "chapters": [
          {
            "id": "M05-U2-C1",
            "title": "Fields, time ranges and filters",
            "duration": 33,
            "concept": "Core concepts for Fields, time ranges and filters explained for L1 SOC analysts in the CDAC Bengaluru learning setting.",
            "visualDesc": "Visual story for Fields, time ranges and filters illustrating key evidence indicators and workflow steps.",
            "interactiveDesc": "Hands-on activity: Identify and match key elements of Fields, time ranges and filters.",
            "questions": [
              {
                "question": "What is the key takeaway when evaluating Fields, time ranges and filters in an L1 operational setting?",
                "options": [
                  "Always verify the observed evidence and correlate across multiple records",
                  "Assume the first alarm is 100% correct without checking",
                  "Delete the log entry to reduce ticket queue count",
                  "Immediately shutdown the entire branch network"
                ],
                "correctAnswer": 0,
                "explanation": "Careful verification and corroborating facts across sources prevents false alarms and ensures high evidence quality."
              }
            ]
          },
          {
            "id": "M05-U2-C2",
            "title": "Basic query logic",
            "duration": 33,
            "concept": "Operational application of Basic query logic during alert triage and analyst shifts.",
            "visualDesc": "Interface walkthrough and telemetry demo for Basic query logic.",
            "interactiveDesc": "Interactive investigation: Analyze sample records related to Basic query logic.",
            "questions": [
              {
                "question": "How does understanding Basic query logic assist an L1 analyst on shift?",
                "options": [
                  "It allows distinguishing normal baseline operations from suspicious outliers",
                  "It guarantees zero alerts will ever trigger",
                  "It replaces the need for a SIEM",
                  "It eliminates the need for supervisor handoffs"
                ],
                "correctAnswer": 0,
                "explanation": "Understanding expected baseline behaviors enables analysts to quickly spot deviations and anomalous patterns."
              }
            ]
          }
        ],
        "assessment": {
          "id": "M05-U2-A",
          "title": "Unit Assessment: Searching and Filtering",
          "duration": 33,
          "passingScore": 80,
          "xpReward": 50,
          "questions": [
            {
              "question": "In Unit 2 (Searching and Filtering), what is the primary standard for documenting findings?",
              "options": [
                "Clear facts with supporting timestamps, host, and user references",
                "Personal opinions without log evidence",
                "One-word answers without context",
                "Forwarding raw screenshots without explanation"
              ],
              "correctAnswer": 0,
              "explanation": "Professional SOC documentation requires specific facts, timestamps, and verifiable references."
            }
          ]
        }
      },
      {
        "id": "M05-U3",
        "unitNumber": 3,
        "title": "Detection and Use Cases",
        "description": "Correlation rules, threshold alerts, and common detection examples.",
        "chapters": [
          {
            "id": "M05-U3-C1",
            "title": "Rules, correlation and alert output",
            "duration": 33,
            "concept": "Core concepts for Rules, correlation and alert output explained for L1 SOC analysts in the CDAC Bengaluru learning setting.",
            "visualDesc": "Visual story for Rules, correlation and alert output illustrating key evidence indicators and workflow steps.",
            "interactiveDesc": "Hands-on activity: Identify and match key elements of Rules, correlation and alert output.",
            "questions": [
              {
                "question": "What is the key takeaway when evaluating Rules, correlation and alert output in an L1 operational setting?",
                "options": [
                  "Always verify the observed evidence and correlate across multiple records",
                  "Assume the first alarm is 100% correct without checking",
                  "Delete the log entry to reduce ticket queue count",
                  "Immediately shutdown the entire branch network"
                ],
                "correctAnswer": 0,
                "explanation": "Careful verification and corroborating facts across sources prevents false alarms and ensures high evidence quality."
              }
            ]
          },
          {
            "id": "M05-U3-C2",
            "title": "Application, identity, host, network and compliance examples",
            "duration": 33,
            "concept": "Operational application of Application, identity, host, network and compliance examples during alert triage and analyst shifts.",
            "visualDesc": "Interface walkthrough and telemetry demo for Application, identity, host, network and compliance examples.",
            "interactiveDesc": "Interactive investigation: Analyze sample records related to Application, identity, host, network and compliance examples.",
            "questions": [
              {
                "question": "How does understanding Application, identity, host, network and compliance examples assist an L1 analyst on shift?",
                "options": [
                  "It allows distinguishing normal baseline operations from suspicious outliers",
                  "It guarantees zero alerts will ever trigger",
                  "It replaces the need for a SIEM",
                  "It eliminates the need for supervisor handoffs"
                ],
                "correctAnswer": 0,
                "explanation": "Understanding expected baseline behaviors enables analysts to quickly spot deviations and anomalous patterns."
              }
            ]
          }
        ],
        "assessment": {
          "id": "M05-U3-A",
          "title": "Unit Assessment: Detection and Use Cases",
          "duration": 33,
          "passingScore": 80,
          "xpReward": 50,
          "questions": [
            {
              "question": "In Unit 3 (Detection and Use Cases), what is the primary standard for documenting findings?",
              "options": [
                "Clear facts with supporting timestamps, host, and user references",
                "Personal opinions without log evidence",
                "One-word answers without context",
                "Forwarding raw screenshots without explanation"
              ],
              "correctAnswer": 0,
              "explanation": "Professional SOC documentation requires specific facts, timestamps, and verifiable references."
            }
          ]
        }
      }
    ]
  },
  {
    "id": "06",
    "title": "Log & Event Analysis",
    "level": "Beginner–Intermediate",
    "difficulty": "INTERMEDIATE",
    "order": 6,
    "theoryHours": 4,
    "labHours": 4,
    "totalHours": 8,
    "mentor": "Karthik",
    "mentorRole": "Senior L1 / SIEM Operator",
    "story": "Mentor Karthik helps you compare Windows, Linux, identity and network records, build a basic timeline and distinguish observed facts from assumptions.",
    "units": [
      {
        "id": "M06-U1",
        "unitNumber": 1,
        "title": "Reading Log Records",
        "description": "Timestamp, source, fields, outcome, parsing, and normalization concepts.",
        "chapters": [
          {
            "id": "M06-U1-C1",
            "title": "Timestamp, source, fields and outcome",
            "duration": 27,
            "concept": "Core concepts for Timestamp, source, fields and outcome explained for L1 SOC analysts in the CDAC Bengaluru learning setting.",
            "visualDesc": "Visual story for Timestamp, source, fields and outcome illustrating key evidence indicators and workflow steps.",
            "interactiveDesc": "Hands-on activity: Identify and match key elements of Timestamp, source, fields and outcome.",
            "questions": [
              {
                "question": "What is the key takeaway when evaluating Timestamp, source, fields and outcome in an L1 operational setting?",
                "options": [
                  "Always verify the observed evidence and correlate across multiple records",
                  "Assume the first alarm is 100% correct without checking",
                  "Delete the log entry to reduce ticket queue count",
                  "Immediately shutdown the entire branch network"
                ],
                "correctAnswer": 0,
                "explanation": "Careful verification and corroborating facts across sources prevents false alarms and ensures high evidence quality."
              }
            ]
          },
          {
            "id": "M06-U1-C2",
            "title": "Parsing and normalization concepts",
            "duration": 27,
            "concept": "Operational application of Parsing and normalization concepts during alert triage and analyst shifts.",
            "visualDesc": "Interface walkthrough and telemetry demo for Parsing and normalization concepts.",
            "interactiveDesc": "Interactive investigation: Analyze sample records related to Parsing and normalization concepts.",
            "questions": [
              {
                "question": "How does understanding Parsing and normalization concepts assist an L1 analyst on shift?",
                "options": [
                  "It allows distinguishing normal baseline operations from suspicious outliers",
                  "It guarantees zero alerts will ever trigger",
                  "It replaces the need for a SIEM",
                  "It eliminates the need for supervisor handoffs"
                ],
                "correctAnswer": 0,
                "explanation": "Understanding expected baseline behaviors enables analysts to quickly spot deviations and anomalous patterns."
              }
            ]
          }
        ],
        "assessment": {
          "id": "M06-U1-A",
          "title": "Unit Assessment: Reading Log Records",
          "duration": 27,
          "passingScore": 80,
          "xpReward": 50,
          "questions": [
            {
              "question": "In Unit 1 (Reading Log Records), what is the primary standard for documenting findings?",
              "options": [
                "Clear facts with supporting timestamps, host, and user references",
                "Personal opinions without log evidence",
                "One-word answers without context",
                "Forwarding raw screenshots without explanation"
              ],
              "correctAnswer": 0,
              "explanation": "Professional SOC documentation requires specific facts, timestamps, and verifiable references."
            }
          ]
        }
      },
      {
        "id": "M06-U2",
        "unitNumber": 2,
        "title": "Correlating Basic Events",
        "description": "Building simple event timelines and comparing related records across sources.",
        "chapters": [
          {
            "id": "M06-U2-C1",
            "title": "Build a simple timeline",
            "duration": 27,
            "concept": "Core concepts for Build a simple timeline explained for L1 SOC analysts in the CDAC Bengaluru learning setting.",
            "visualDesc": "Visual story for Build a simple timeline illustrating key evidence indicators and workflow steps.",
            "interactiveDesc": "Hands-on activity: Identify and match key elements of Build a simple timeline.",
            "questions": [
              {
                "question": "What is the key takeaway when evaluating Build a simple timeline in an L1 operational setting?",
                "options": [
                  "Always verify the observed evidence and correlate across multiple records",
                  "Assume the first alarm is 100% correct without checking",
                  "Delete the log entry to reduce ticket queue count",
                  "Immediately shutdown the entire branch network"
                ],
                "correctAnswer": 0,
                "explanation": "Careful verification and corroborating facts across sources prevents false alarms and ensures high evidence quality."
              }
            ]
          },
          {
            "id": "M06-U2-C2",
            "title": "Compare related records across sources",
            "duration": 27,
            "concept": "Operational application of Compare related records across sources during alert triage and analyst shifts.",
            "visualDesc": "Interface walkthrough and telemetry demo for Compare related records across sources.",
            "interactiveDesc": "Interactive investigation: Analyze sample records related to Compare related records across sources.",
            "questions": [
              {
                "question": "How does understanding Compare related records across sources assist an L1 analyst on shift?",
                "options": [
                  "It allows distinguishing normal baseline operations from suspicious outliers",
                  "It guarantees zero alerts will ever trigger",
                  "It replaces the need for a SIEM",
                  "It eliminates the need for supervisor handoffs"
                ],
                "correctAnswer": 0,
                "explanation": "Understanding expected baseline behaviors enables analysts to quickly spot deviations and anomalous patterns."
              }
            ]
          }
        ],
        "assessment": {
          "id": "M06-U2-A",
          "title": "Unit Assessment: Correlating Basic Events",
          "duration": 27,
          "passingScore": 80,
          "xpReward": 50,
          "questions": [
            {
              "question": "In Unit 2 (Correlating Basic Events), what is the primary standard for documenting findings?",
              "options": [
                "Clear facts with supporting timestamps, host, and user references",
                "Personal opinions without log evidence",
                "One-word answers without context",
                "Forwarding raw screenshots without explanation"
              ],
              "correctAnswer": 0,
              "explanation": "Professional SOC documentation requires specific facts, timestamps, and verifiable references."
            }
          ]
        }
      },
      {
        "id": "M06-U3",
        "unitNumber": 3,
        "title": "Evidence Quality",
        "description": "Corroboration, evidence gaps, uncertainty, and distinguishing facts from inferences.",
        "chapters": [
          {
            "id": "M06-U3-C1",
            "title": "Corroboration, gaps and uncertainty",
            "duration": 26,
            "concept": "Core concepts for Corroboration, gaps and uncertainty explained for L1 SOC analysts in the CDAC Bengaluru learning setting.",
            "visualDesc": "Visual story for Corroboration, gaps and uncertainty illustrating key evidence indicators and workflow steps.",
            "interactiveDesc": "Hands-on activity: Identify and match key elements of Corroboration, gaps and uncertainty.",
            "questions": [
              {
                "question": "What is the key takeaway when evaluating Corroboration, gaps and uncertainty in an L1 operational setting?",
                "options": [
                  "Always verify the observed evidence and correlate across multiple records",
                  "Assume the first alarm is 100% correct without checking",
                  "Delete the log entry to reduce ticket queue count",
                  "Immediately shutdown the entire branch network"
                ],
                "correctAnswer": 0,
                "explanation": "Careful verification and corroborating facts across sources prevents false alarms and ensures high evidence quality."
              }
            ]
          },
          {
            "id": "M06-U3-C2",
            "title": "Observed fact versus analyst inference",
            "duration": 26,
            "concept": "Operational application of Observed fact versus analyst inference during alert triage and analyst shifts.",
            "visualDesc": "Interface walkthrough and telemetry demo for Observed fact versus analyst inference.",
            "interactiveDesc": "Interactive investigation: Analyze sample records related to Observed fact versus analyst inference.",
            "questions": [
              {
                "question": "How does understanding Observed fact versus analyst inference assist an L1 analyst on shift?",
                "options": [
                  "It allows distinguishing normal baseline operations from suspicious outliers",
                  "It guarantees zero alerts will ever trigger",
                  "It replaces the need for a SIEM",
                  "It eliminates the need for supervisor handoffs"
                ],
                "correctAnswer": 0,
                "explanation": "Understanding expected baseline behaviors enables analysts to quickly spot deviations and anomalous patterns."
              }
            ]
          }
        ],
        "assessment": {
          "id": "M06-U3-A",
          "title": "Unit Assessment: Evidence Quality",
          "duration": 26,
          "passingScore": 80,
          "xpReward": 50,
          "questions": [
            {
              "question": "In Unit 3 (Evidence Quality), what is the primary standard for documenting findings?",
              "options": [
                "Clear facts with supporting timestamps, host, and user references",
                "Personal opinions without log evidence",
                "One-word answers without context",
                "Forwarding raw screenshots without explanation"
              ],
              "correctAnswer": 0,
              "explanation": "Professional SOC documentation requires specific facts, timestamps, and verifiable references."
            }
          ]
        }
      }
    ]
  },
  {
    "id": "07",
    "title": "Windows & Linux Security Monitoring",
    "level": "Beginner–Intermediate",
    "difficulty": "INTERMEDIATE",
    "order": 7,
    "theoryHours": 4,
    "labHours": 4,
    "totalHours": 8,
    "mentor": "Ravi",
    "mentorRole": "Host Security Mentor",
    "story": "Mentor Ravi guides you through basic host logs and routine-versus-unusual activity on a branch workstation and Linux server.",
    "units": [
      {
        "id": "M07-U1",
        "unitNumber": 1,
        "title": "Windows Security Monitoring",
        "description": "Windows event logs, Event IDs 4624/4625, logon types, and user activity.",
        "chapters": [
          {
            "id": "M07-U1-C1",
            "title": "Windows event log basics",
            "duration": 27,
            "concept": "Core concepts for Windows event log basics explained for L1 SOC analysts in the CDAC Bengaluru learning setting.",
            "visualDesc": "Visual story for Windows event log basics illustrating key evidence indicators and workflow steps.",
            "interactiveDesc": "Hands-on activity: Identify and match key elements of Windows event log basics.",
            "questions": [
              {
                "question": "What is the key takeaway when evaluating Windows event log basics in an L1 operational setting?",
                "options": [
                  "Always verify the observed evidence and correlate across multiple records",
                  "Assume the first alarm is 100% correct without checking",
                  "Delete the log entry to reduce ticket queue count",
                  "Immediately shutdown the entire branch network"
                ],
                "correctAnswer": 0,
                "explanation": "Careful verification and corroborating facts across sources prevents false alarms and ensures high evidence quality."
              }
            ]
          },
          {
            "id": "M07-U1-C2",
            "title": "Logon and account activity",
            "duration": 27,
            "concept": "Operational application of Logon and account activity during alert triage and analyst shifts.",
            "visualDesc": "Interface walkthrough and telemetry demo for Logon and account activity.",
            "interactiveDesc": "Interactive investigation: Analyze sample records related to Logon and account activity.",
            "questions": [
              {
                "question": "How does understanding Logon and account activity assist an L1 analyst on shift?",
                "options": [
                  "It allows distinguishing normal baseline operations from suspicious outliers",
                  "It guarantees zero alerts will ever trigger",
                  "It replaces the need for a SIEM",
                  "It eliminates the need for supervisor handoffs"
                ],
                "correctAnswer": 0,
                "explanation": "Understanding expected baseline behaviors enables analysts to quickly spot deviations and anomalous patterns."
              }
            ]
          }
        ],
        "assessment": {
          "id": "M07-U1-A",
          "title": "Unit Assessment: Windows Security Monitoring",
          "duration": 27,
          "passingScore": 80,
          "xpReward": 50,
          "questions": [
            {
              "question": "In Unit 1 (Windows Security Monitoring), what is the primary standard for documenting findings?",
              "options": [
                "Clear facts with supporting timestamps, host, and user references",
                "Personal opinions without log evidence",
                "One-word answers without context",
                "Forwarding raw screenshots without explanation"
              ],
              "correctAnswer": 0,
              "explanation": "Professional SOC documentation requires specific facts, timestamps, and verifiable references."
            }
          ]
        }
      },
      {
        "id": "M07-U2",
        "unitNumber": 2,
        "title": "Linux Security Monitoring",
        "description": "Linux authentication logs, system logs, users, services, and sudo activity.",
        "chapters": [
          {
            "id": "M07-U2-C1",
            "title": "Authentication and system logs",
            "duration": 27,
            "concept": "Core concepts for Authentication and system logs explained for L1 SOC analysts in the CDAC Bengaluru learning setting.",
            "visualDesc": "Visual story for Authentication and system logs illustrating key evidence indicators and workflow steps.",
            "interactiveDesc": "Hands-on activity: Identify and match key elements of Authentication and system logs.",
            "questions": [
              {
                "question": "What is the key takeaway when evaluating Authentication and system logs in an L1 operational setting?",
                "options": [
                  "Always verify the observed evidence and correlate across multiple records",
                  "Assume the first alarm is 100% correct without checking",
                  "Delete the log entry to reduce ticket queue count",
                  "Immediately shutdown the entire branch network"
                ],
                "correctAnswer": 0,
                "explanation": "Careful verification and corroborating facts across sources prevents false alarms and ensures high evidence quality."
              }
            ]
          },
          {
            "id": "M07-U2-C2",
            "title": "Users, services and sudo activity",
            "duration": 27,
            "concept": "Operational application of Users, services and sudo activity during alert triage and analyst shifts.",
            "visualDesc": "Interface walkthrough and telemetry demo for Users, services and sudo activity.",
            "interactiveDesc": "Interactive investigation: Analyze sample records related to Users, services and sudo activity.",
            "questions": [
              {
                "question": "How does understanding Users, services and sudo activity assist an L1 analyst on shift?",
                "options": [
                  "It allows distinguishing normal baseline operations from suspicious outliers",
                  "It guarantees zero alerts will ever trigger",
                  "It replaces the need for a SIEM",
                  "It eliminates the need for supervisor handoffs"
                ],
                "correctAnswer": 0,
                "explanation": "Understanding expected baseline behaviors enables analysts to quickly spot deviations and anomalous patterns."
              }
            ]
          }
        ],
        "assessment": {
          "id": "M07-U2-A",
          "title": "Unit Assessment: Linux Security Monitoring",
          "duration": 27,
          "passingScore": 80,
          "xpReward": 50,
          "questions": [
            {
              "question": "In Unit 2 (Linux Security Monitoring), what is the primary standard for documenting findings?",
              "options": [
                "Clear facts with supporting timestamps, host, and user references",
                "Personal opinions without log evidence",
                "One-word answers without context",
                "Forwarding raw screenshots without explanation"
              ],
              "correctAnswer": 0,
              "explanation": "Professional SOC documentation requires specific facts, timestamps, and verifiable references."
            }
          ]
        }
      },
      {
        "id": "M07-U3",
        "unitNumber": 3,
        "title": "Host Triage",
        "description": "Distinguishing baseline from unusual activity; cross-checking user and host context.",
        "chapters": [
          {
            "id": "M07-U3-C1",
            "title": "Baseline and unusual activity",
            "duration": 26,
            "concept": "Core concepts for Baseline and unusual activity explained for L1 SOC analysts in the CDAC Bengaluru learning setting.",
            "visualDesc": "Visual story for Baseline and unusual activity illustrating key evidence indicators and workflow steps.",
            "interactiveDesc": "Hands-on activity: Identify and match key elements of Baseline and unusual activity.",
            "questions": [
              {
                "question": "What is the key takeaway when evaluating Baseline and unusual activity in an L1 operational setting?",
                "options": [
                  "Always verify the observed evidence and correlate across multiple records",
                  "Assume the first alarm is 100% correct without checking",
                  "Delete the log entry to reduce ticket queue count",
                  "Immediately shutdown the entire branch network"
                ],
                "correctAnswer": 0,
                "explanation": "Careful verification and corroborating facts across sources prevents false alarms and ensures high evidence quality."
              }
            ]
          },
          {
            "id": "M07-U3-C2",
            "title": "Cross-check user and host context",
            "duration": 26,
            "concept": "Operational application of Cross-check user and host context during alert triage and analyst shifts.",
            "visualDesc": "Interface walkthrough and telemetry demo for Cross-check user and host context.",
            "interactiveDesc": "Interactive investigation: Analyze sample records related to Cross-check user and host context.",
            "questions": [
              {
                "question": "How does understanding Cross-check user and host context assist an L1 analyst on shift?",
                "options": [
                  "It allows distinguishing normal baseline operations from suspicious outliers",
                  "It guarantees zero alerts will ever trigger",
                  "It replaces the need for a SIEM",
                  "It eliminates the need for supervisor handoffs"
                ],
                "correctAnswer": 0,
                "explanation": "Understanding expected baseline behaviors enables analysts to quickly spot deviations and anomalous patterns."
              }
            ]
          }
        ],
        "assessment": {
          "id": "M07-U3-A",
          "title": "Unit Assessment: Host Triage",
          "duration": 26,
          "passingScore": 80,
          "xpReward": 50,
          "questions": [
            {
              "question": "In Unit 3 (Host Triage), what is the primary standard for documenting findings?",
              "options": [
                "Clear facts with supporting timestamps, host, and user references",
                "Personal opinions without log evidence",
                "One-word answers without context",
                "Forwarding raw screenshots without explanation"
              ],
              "correctAnswer": 0,
              "explanation": "Professional SOC documentation requires specific facts, timestamps, and verifiable references."
            }
          ]
        }
      }
    ]
  },
  {
    "id": "08",
    "title": "Network Security Monitoring",
    "level": "Beginner–Intermediate",
    "difficulty": "INTERMEDIATE",
    "order": 8,
    "theoryHours": 4,
    "labHours": 4,
    "totalHours": 8,
    "mentor": "Meera",
    "mentorRole": "Network Security Analyst",
    "story": "Mentor Meera, a network security analyst, helps you inspect a supplied packet capture and summarize the evidence behind a network alert.",
    "units": [
      {
        "id": "M08-U1",
        "unitNumber": 1,
        "title": "Network Visibility",
        "description": "Packets, flows, PCAP captures, DNS metadata, and connection states.",
        "chapters": [
          {
            "id": "M08-U1-C1",
            "title": "Packets, flows and PCAP",
            "duration": 27,
            "concept": "Core concepts for Packets, flows and PCAP explained for L1 SOC analysts in the CDAC Bengaluru learning setting.",
            "visualDesc": "Visual story for Packets, flows and PCAP illustrating key evidence indicators and workflow steps.",
            "interactiveDesc": "Hands-on activity: Identify and match key elements of Packets, flows and PCAP.",
            "questions": [
              {
                "question": "What is the key takeaway when evaluating Packets, flows and PCAP in an L1 operational setting?",
                "options": [
                  "Always verify the observed evidence and correlate across multiple records",
                  "Assume the first alarm is 100% correct without checking",
                  "Delete the log entry to reduce ticket queue count",
                  "Immediately shutdown the entire branch network"
                ],
                "correctAnswer": 0,
                "explanation": "Careful verification and corroborating facts across sources prevents false alarms and ensures high evidence quality."
              }
            ]
          },
          {
            "id": "M08-U1-C2",
            "title": "DNS, HTTP(S) and connection metadata",
            "duration": 27,
            "concept": "Operational application of DNS, HTTP(S) and connection metadata during alert triage and analyst shifts.",
            "visualDesc": "Interface walkthrough and telemetry demo for DNS, HTTP(S) and connection metadata.",
            "interactiveDesc": "Interactive investigation: Analyze sample records related to DNS, HTTP(S) and connection metadata.",
            "questions": [
              {
                "question": "How does understanding DNS, HTTP(S) and connection metadata assist an L1 analyst on shift?",
                "options": [
                  "It allows distinguishing normal baseline operations from suspicious outliers",
                  "It guarantees zero alerts will ever trigger",
                  "It replaces the need for a SIEM",
                  "It eliminates the need for supervisor handoffs"
                ],
                "correctAnswer": 0,
                "explanation": "Understanding expected baseline behaviors enables analysts to quickly spot deviations and anomalous patterns."
              }
            ]
          }
        ],
        "assessment": {
          "id": "M08-U1-A",
          "title": "Unit Assessment: Network Visibility",
          "duration": 27,
          "passingScore": 80,
          "xpReward": 50,
          "questions": [
            {
              "question": "In Unit 1 (Network Visibility), what is the primary standard for documenting findings?",
              "options": [
                "Clear facts with supporting timestamps, host, and user references",
                "Personal opinions without log evidence",
                "One-word answers without context",
                "Forwarding raw screenshots without explanation"
              ],
              "correctAnswer": 0,
              "explanation": "Professional SOC documentation requires specific facts, timestamps, and verifiable references."
            }
          ]
        }
      },
      {
        "id": "M08-U2",
        "unitNumber": 2,
        "title": "Inspecting Traffic",
        "description": "Display filters, TCP conversation streams, repeated attempts, and scan patterns.",
        "chapters": [
          {
            "id": "M08-U2-C1",
            "title": "Filters and conversations",
            "duration": 27,
            "concept": "Core concepts for Filters and conversations explained for L1 SOC analysts in the CDAC Bengaluru learning setting.",
            "visualDesc": "Visual story for Filters and conversations illustrating key evidence indicators and workflow steps.",
            "interactiveDesc": "Hands-on activity: Identify and match key elements of Filters and conversations.",
            "questions": [
              {
                "question": "What is the key takeaway when evaluating Filters and conversations in an L1 operational setting?",
                "options": [
                  "Always verify the observed evidence and correlate across multiple records",
                  "Assume the first alarm is 100% correct without checking",
                  "Delete the log entry to reduce ticket queue count",
                  "Immediately shutdown the entire branch network"
                ],
                "correctAnswer": 0,
                "explanation": "Careful verification and corroborating facts across sources prevents false alarms and ensures high evidence quality."
              }
            ]
          },
          {
            "id": "M08-U2-C2",
            "title": "Repeated attempts and scan-like patterns",
            "duration": 27,
            "concept": "Operational application of Repeated attempts and scan-like patterns during alert triage and analyst shifts.",
            "visualDesc": "Interface walkthrough and telemetry demo for Repeated attempts and scan-like patterns.",
            "interactiveDesc": "Interactive investigation: Analyze sample records related to Repeated attempts and scan-like patterns.",
            "questions": [
              {
                "question": "How does understanding Repeated attempts and scan-like patterns assist an L1 analyst on shift?",
                "options": [
                  "It allows distinguishing normal baseline operations from suspicious outliers",
                  "It guarantees zero alerts will ever trigger",
                  "It replaces the need for a SIEM",
                  "It eliminates the need for supervisor handoffs"
                ],
                "correctAnswer": 0,
                "explanation": "Understanding expected baseline behaviors enables analysts to quickly spot deviations and anomalous patterns."
              }
            ]
          }
        ],
        "assessment": {
          "id": "M08-U2-A",
          "title": "Unit Assessment: Inspecting Traffic",
          "duration": 27,
          "passingScore": 80,
          "xpReward": 50,
          "questions": [
            {
              "question": "In Unit 2 (Inspecting Traffic), what is the primary standard for documenting findings?",
              "options": [
                "Clear facts with supporting timestamps, host, and user references",
                "Personal opinions without log evidence",
                "One-word answers without context",
                "Forwarding raw screenshots without explanation"
              ],
              "correctAnswer": 0,
              "explanation": "Professional SOC documentation requires specific facts, timestamps, and verifiable references."
            }
          ]
        }
      },
      {
        "id": "M08-U3",
        "unitNumber": 3,
        "title": "Network Alert Triage",
        "description": "Source and destination context, writing concise evidence-backed summaries.",
        "chapters": [
          {
            "id": "M08-U3-C1",
            "title": "Source/destination context",
            "duration": 26,
            "concept": "Core concepts for Source/destination context explained for L1 SOC analysts in the CDAC Bengaluru learning setting.",
            "visualDesc": "Visual story for Source/destination context illustrating key evidence indicators and workflow steps.",
            "interactiveDesc": "Hands-on activity: Identify and match key elements of Source/destination context.",
            "questions": [
              {
                "question": "What is the key takeaway when evaluating Source/destination context in an L1 operational setting?",
                "options": [
                  "Always verify the observed evidence and correlate across multiple records",
                  "Assume the first alarm is 100% correct without checking",
                  "Delete the log entry to reduce ticket queue count",
                  "Immediately shutdown the entire branch network"
                ],
                "correctAnswer": 0,
                "explanation": "Careful verification and corroborating facts across sources prevents false alarms and ensures high evidence quality."
              }
            ]
          },
          {
            "id": "M08-U3-C2",
            "title": "Write a concise evidence summary",
            "duration": 26,
            "concept": "Operational application of Write a concise evidence summary during alert triage and analyst shifts.",
            "visualDesc": "Interface walkthrough and telemetry demo for Write a concise evidence summary.",
            "interactiveDesc": "Interactive investigation: Analyze sample records related to Write a concise evidence summary.",
            "questions": [
              {
                "question": "How does understanding Write a concise evidence summary assist an L1 analyst on shift?",
                "options": [
                  "It allows distinguishing normal baseline operations from suspicious outliers",
                  "It guarantees zero alerts will ever trigger",
                  "It replaces the need for a SIEM",
                  "It eliminates the need for supervisor handoffs"
                ],
                "correctAnswer": 0,
                "explanation": "Understanding expected baseline behaviors enables analysts to quickly spot deviations and anomalous patterns."
              }
            ]
          }
        ],
        "assessment": {
          "id": "M08-U3-A",
          "title": "Unit Assessment: Network Alert Triage",
          "duration": 26,
          "passingScore": 80,
          "xpReward": 50,
          "questions": [
            {
              "question": "In Unit 3 (Network Alert Triage), what is the primary standard for documenting findings?",
              "options": [
                "Clear facts with supporting timestamps, host, and user references",
                "Personal opinions without log evidence",
                "One-word answers without context",
                "Forwarding raw screenshots without explanation"
              ],
              "correctAnswer": 0,
              "explanation": "Professional SOC documentation requires specific facts, timestamps, and verifiable references."
            }
          ]
        }
      }
    ]
  },
  {
    "id": "09",
    "title": "Endpoint Detection & Response (EDR)",
    "level": "Beginner–Intermediate",
    "difficulty": "INTERMEDIATE",
    "order": 9,
    "theoryHours": 3,
    "labHours": 3,
    "totalHours": 6,
    "mentor": "Ananya",
    "mentorRole": "Experienced L1 Mentor",
    "story": "Mentor Ananya walks you through endpoint alert context, device/user details and basic file/process evidence, then explains when to escalate.",
    "units": [
      {
        "id": "M09-U1",
        "unitNumber": 1,
        "title": "EDR Fundamentals",
        "description": "Endpoint telemetry, real-time alerts, and comparing EDR with traditional antivirus.",
        "chapters": [
          {
            "id": "M09-U1-C1",
            "title": "Endpoint telemetry and alerts",
            "duration": 20,
            "concept": "Core concepts for Endpoint telemetry and alerts explained for L1 SOC analysts in the CDAC Bengaluru learning setting.",
            "visualDesc": "Visual story for Endpoint telemetry and alerts illustrating key evidence indicators and workflow steps.",
            "interactiveDesc": "Hands-on activity: Identify and match key elements of Endpoint telemetry and alerts.",
            "questions": [
              {
                "question": "What is the key takeaway when evaluating Endpoint telemetry and alerts in an L1 operational setting?",
                "options": [
                  "Always verify the observed evidence and correlate across multiple records",
                  "Assume the first alarm is 100% correct without checking",
                  "Delete the log entry to reduce ticket queue count",
                  "Immediately shutdown the entire branch network"
                ],
                "correctAnswer": 0,
                "explanation": "Careful verification and corroborating facts across sources prevents false alarms and ensures high evidence quality."
              }
            ]
          },
          {
            "id": "M09-U1-C2",
            "title": "EDR versus traditional antivirus",
            "duration": 20,
            "concept": "Operational application of EDR versus traditional antivirus during alert triage and analyst shifts.",
            "visualDesc": "Interface walkthrough and telemetry demo for EDR versus traditional antivirus.",
            "interactiveDesc": "Interactive investigation: Analyze sample records related to EDR versus traditional antivirus.",
            "questions": [
              {
                "question": "How does understanding EDR versus traditional antivirus assist an L1 analyst on shift?",
                "options": [
                  "It allows distinguishing normal baseline operations from suspicious outliers",
                  "It guarantees zero alerts will ever trigger",
                  "It replaces the need for a SIEM",
                  "It eliminates the need for supervisor handoffs"
                ],
                "correctAnswer": 0,
                "explanation": "Understanding expected baseline behaviors enables analysts to quickly spot deviations and anomalous patterns."
              }
            ]
          }
        ],
        "assessment": {
          "id": "M09-U1-A",
          "title": "Unit Assessment: EDR Fundamentals",
          "duration": 20,
          "passingScore": 80,
          "xpReward": 50,
          "questions": [
            {
              "question": "In Unit 1 (EDR Fundamentals), what is the primary standard for documenting findings?",
              "options": [
                "Clear facts with supporting timestamps, host, and user references",
                "Personal opinions without log evidence",
                "One-word answers without context",
                "Forwarding raw screenshots without explanation"
              ],
              "correctAnswer": 0,
              "explanation": "Professional SOC documentation requires specific facts, timestamps, and verifiable references."
            }
          ]
        }
      },
      {
        "id": "M09-U2",
        "unitNumber": 2,
        "title": "Understanding Endpoint Alerts",
        "description": "Device, user, file, process context, and timeline evidence analysis.",
        "chapters": [
          {
            "id": "M09-U2-C1",
            "title": "Device, user, file and process context",
            "duration": 20,
            "concept": "Core concepts for Device, user, file and process context explained for L1 SOC analysts in the CDAC Bengaluru learning setting.",
            "visualDesc": "Visual story for Device, user, file and process context illustrating key evidence indicators and workflow steps.",
            "interactiveDesc": "Hands-on activity: Identify and match key elements of Device, user, file and process context.",
            "questions": [
              {
                "question": "What is the key takeaway when evaluating Device, user, file and process context in an L1 operational setting?",
                "options": [
                  "Always verify the observed evidence and correlate across multiple records",
                  "Assume the first alarm is 100% correct without checking",
                  "Delete the log entry to reduce ticket queue count",
                  "Immediately shutdown the entire branch network"
                ],
                "correctAnswer": 0,
                "explanation": "Careful verification and corroborating facts across sources prevents false alarms and ensures high evidence quality."
              }
            ]
          },
          {
            "id": "M09-U2-C2",
            "title": "Timeline and alert evidence",
            "duration": 20,
            "concept": "Operational application of Timeline and alert evidence during alert triage and analyst shifts.",
            "visualDesc": "Interface walkthrough and telemetry demo for Timeline and alert evidence.",
            "interactiveDesc": "Interactive investigation: Analyze sample records related to Timeline and alert evidence.",
            "questions": [
              {
                "question": "How does understanding Timeline and alert evidence assist an L1 analyst on shift?",
                "options": [
                  "It allows distinguishing normal baseline operations from suspicious outliers",
                  "It guarantees zero alerts will ever trigger",
                  "It replaces the need for a SIEM",
                  "It eliminates the need for supervisor handoffs"
                ],
                "correctAnswer": 0,
                "explanation": "Understanding expected baseline behaviors enables analysts to quickly spot deviations and anomalous patterns."
              }
            ]
          }
        ],
        "assessment": {
          "id": "M09-U2-A",
          "title": "Unit Assessment: Understanding Endpoint Alerts",
          "duration": 20,
          "passingScore": 80,
          "xpReward": 50,
          "questions": [
            {
              "question": "In Unit 2 (Understanding Endpoint Alerts), what is the primary standard for documenting findings?",
              "options": [
                "Clear facts with supporting timestamps, host, and user references",
                "Personal opinions without log evidence",
                "One-word answers without context",
                "Forwarding raw screenshots without explanation"
              ],
              "correctAnswer": 0,
              "explanation": "Professional SOC documentation requires specific facts, timestamps, and verifiable references."
            }
          ]
        }
      },
      {
        "id": "M09-U3",
        "unitNumber": 3,
        "title": "L1 Endpoint Response",
        "description": "Validating basic indicators, safe quarantine actions, and escalation boundaries.",
        "chapters": [
          {
            "id": "M09-U3-C1",
            "title": "Validate basic indicators",
            "duration": 20,
            "concept": "Core concepts for Validate basic indicators explained for L1 SOC analysts in the CDAC Bengaluru learning setting.",
            "visualDesc": "Visual story for Validate basic indicators illustrating key evidence indicators and workflow steps.",
            "interactiveDesc": "Hands-on activity: Identify and match key elements of Validate basic indicators.",
            "questions": [
              {
                "question": "What is the key takeaway when evaluating Validate basic indicators in an L1 operational setting?",
                "options": [
                  "Always verify the observed evidence and correlate across multiple records",
                  "Assume the first alarm is 100% correct without checking",
                  "Delete the log entry to reduce ticket queue count",
                  "Immediately shutdown the entire branch network"
                ],
                "correctAnswer": 0,
                "explanation": "Careful verification and corroborating facts across sources prevents false alarms and ensures high evidence quality."
              }
            ]
          },
          {
            "id": "M09-U3-C2",
            "title": "Safe actions and escalation boundaries",
            "duration": 20,
            "concept": "Operational application of Safe actions and escalation boundaries during alert triage and analyst shifts.",
            "visualDesc": "Interface walkthrough and telemetry demo for Safe actions and escalation boundaries.",
            "interactiveDesc": "Interactive investigation: Analyze sample records related to Safe actions and escalation boundaries.",
            "questions": [
              {
                "question": "How does understanding Safe actions and escalation boundaries assist an L1 analyst on shift?",
                "options": [
                  "It allows distinguishing normal baseline operations from suspicious outliers",
                  "It guarantees zero alerts will ever trigger",
                  "It replaces the need for a SIEM",
                  "It eliminates the need for supervisor handoffs"
                ],
                "correctAnswer": 0,
                "explanation": "Understanding expected baseline behaviors enables analysts to quickly spot deviations and anomalous patterns."
              }
            ]
          }
        ],
        "assessment": {
          "id": "M09-U3-A",
          "title": "Unit Assessment: L1 Endpoint Response",
          "duration": 20,
          "passingScore": 80,
          "xpReward": 50,
          "questions": [
            {
              "question": "In Unit 3 (L1 Endpoint Response), what is the primary standard for documenting findings?",
              "options": [
                "Clear facts with supporting timestamps, host, and user references",
                "Personal opinions without log evidence",
                "One-word answers without context",
                "Forwarding raw screenshots without explanation"
              ],
              "correctAnswer": 0,
              "explanation": "Professional SOC documentation requires specific facts, timestamps, and verifiable references."
            }
          ]
        }
      }
    ]
  },
  {
    "id": "10",
    "title": "Security Ecosystem: XDR, Response Tools & OT/ICS",
    "level": "Beginner–Intermediate",
    "difficulty": "INTERMEDIATE",
    "order": 10,
    "theoryHours": 3,
    "labHours": 1,
    "totalHours": 4,
    "mentor": "Karthik",
    "mentorRole": "Senior Security Architect",
    "story": "Mentor Karthik introduces how XDR, EDR, SIEM, SOAR and case-management tools complement one another, then contrasts office IT with OT/ICS safety and availability needs.",
    "units": [
      {
        "id": "M10-U1",
        "unitNumber": 1,
        "title": "Security Tool Ecosystem",
        "description": "How SIEM, EDR, XDR, SOAR, and case management tools complement one another.",
        "chapters": [
          {
            "id": "M10-U1-C1",
            "title": "SIEM, EDR, XDR and case management",
            "duration": 20,
            "concept": "Core concepts for SIEM, EDR, XDR and case management explained for L1 SOC analysts in the CDAC Bengaluru learning setting.",
            "visualDesc": "Visual story for SIEM, EDR, XDR and case management illustrating key evidence indicators and workflow steps.",
            "interactiveDesc": "Hands-on activity: Identify and match key elements of SIEM, EDR, XDR and case management.",
            "questions": [
              {
                "question": "What is the key takeaway when evaluating SIEM, EDR, XDR and case management in an L1 operational setting?",
                "options": [
                  "Always verify the observed evidence and correlate across multiple records",
                  "Assume the first alarm is 100% correct without checking",
                  "Delete the log entry to reduce ticket queue count",
                  "Immediately shutdown the entire branch network"
                ],
                "correctAnswer": 0,
                "explanation": "Careful verification and corroborating facts across sources prevents false alarms and ensures high evidence quality."
              }
            ]
          },
          {
            "id": "M10-U1-C2",
            "title": "SOAR and response-tool roles",
            "duration": 20,
            "concept": "Operational application of SOAR and response-tool roles during alert triage and analyst shifts.",
            "visualDesc": "Interface walkthrough and telemetry demo for SOAR and response-tool roles.",
            "interactiveDesc": "Interactive investigation: Analyze sample records related to SOAR and response-tool roles.",
            "questions": [
              {
                "question": "How does understanding SOAR and response-tool roles assist an L1 analyst on shift?",
                "options": [
                  "It allows distinguishing normal baseline operations from suspicious outliers",
                  "It guarantees zero alerts will ever trigger",
                  "It replaces the need for a SIEM",
                  "It eliminates the need for supervisor handoffs"
                ],
                "correctAnswer": 0,
                "explanation": "Understanding expected baseline behaviors enables analysts to quickly spot deviations and anomalous patterns."
              }
            ]
          }
        ],
        "assessment": {
          "id": "M10-U1-A",
          "title": "Unit Assessment: Security Tool Ecosystem",
          "duration": 20,
          "passingScore": 80,
          "xpReward": 50,
          "questions": [
            {
              "question": "In Unit 1 (Security Tool Ecosystem), what is the primary standard for documenting findings?",
              "options": [
                "Clear facts with supporting timestamps, host, and user references",
                "Personal opinions without log evidence",
                "One-word answers without context",
                "Forwarding raw screenshots without explanation"
              ],
              "correctAnswer": 0,
              "explanation": "Professional SOC documentation requires specific facts, timestamps, and verifiable references."
            }
          ]
        }
      },
      {
        "id": "M10-U2",
        "unitNumber": 2,
        "title": "OT/ICS Security Introduction",
        "description": "Contrasting office IT with OT/ICS; availability, safety, and segmentation.",
        "chapters": [
          {
            "id": "M10-U2-C1",
            "title": "OT versus office IT",
            "duration": 20,
            "concept": "Core concepts for OT versus office IT explained for L1 SOC analysts in the CDAC Bengaluru learning setting.",
            "visualDesc": "Visual story for OT versus office IT illustrating key evidence indicators and workflow steps.",
            "interactiveDesc": "Hands-on activity: Identify and match key elements of OT versus office IT.",
            "questions": [
              {
                "question": "What is the key takeaway when evaluating OT versus office IT in an L1 operational setting?",
                "options": [
                  "Always verify the observed evidence and correlate across multiple records",
                  "Assume the first alarm is 100% correct without checking",
                  "Delete the log entry to reduce ticket queue count",
                  "Immediately shutdown the entire branch network"
                ],
                "correctAnswer": 0,
                "explanation": "Careful verification and corroborating facts across sources prevents false alarms and ensures high evidence quality."
              }
            ]
          },
          {
            "id": "M10-U2-C2",
            "title": "Availability, safety and segmentation",
            "duration": 20,
            "concept": "Operational application of Availability, safety and segmentation during alert triage and analyst shifts.",
            "visualDesc": "Interface walkthrough and telemetry demo for Availability, safety and segmentation.",
            "interactiveDesc": "Interactive investigation: Analyze sample records related to Availability, safety and segmentation.",
            "questions": [
              {
                "question": "How does understanding Availability, safety and segmentation assist an L1 analyst on shift?",
                "options": [
                  "It allows distinguishing normal baseline operations from suspicious outliers",
                  "It guarantees zero alerts will ever trigger",
                  "It replaces the need for a SIEM",
                  "It eliminates the need for supervisor handoffs"
                ],
                "correctAnswer": 0,
                "explanation": "Understanding expected baseline behaviors enables analysts to quickly spot deviations and anomalous patterns."
              }
            ]
          }
        ],
        "assessment": {
          "id": "M10-U2-A",
          "title": "Unit Assessment: OT/ICS Security Introduction",
          "duration": 20,
          "passingScore": 80,
          "xpReward": 50,
          "questions": [
            {
              "question": "In Unit 2 (OT/ICS Security Introduction), what is the primary standard for documenting findings?",
              "options": [
                "Clear facts with supporting timestamps, host, and user references",
                "Personal opinions without log evidence",
                "One-word answers without context",
                "Forwarding raw screenshots without explanation"
              ],
              "correctAnswer": 0,
              "explanation": "Professional SOC documentation requires specific facts, timestamps, and verifiable references."
            }
          ]
        }
      },
      {
        "id": "M10-U3",
        "unitNumber": 3,
        "title": "Response Boundaries",
        "description": "Common response actions at a high level; knowing when to stop, seek approval, and escalate.",
        "chapters": [
          {
            "id": "M10-U3-C1",
            "title": "Common response actions at a high level",
            "duration": 20,
            "concept": "Core concepts for Common response actions at a high level explained for L1 SOC analysts in the CDAC Bengaluru learning setting.",
            "visualDesc": "Visual story for Common response actions at a high level illustrating key evidence indicators and workflow steps.",
            "interactiveDesc": "Hands-on activity: Identify and match key elements of Common response actions at a high level.",
            "questions": [
              {
                "question": "What is the key takeaway when evaluating Common response actions at a high level in an L1 operational setting?",
                "options": [
                  "Always verify the observed evidence and correlate across multiple records",
                  "Assume the first alarm is 100% correct without checking",
                  "Delete the log entry to reduce ticket queue count",
                  "Immediately shutdown the entire branch network"
                ],
                "correctAnswer": 0,
                "explanation": "Careful verification and corroborating facts across sources prevents false alarms and ensures high evidence quality."
              }
            ]
          },
          {
            "id": "M10-U3-C2",
            "title": "When to stop, seek approval and escalate",
            "duration": 20,
            "concept": "Operational application of When to stop, seek approval and escalate during alert triage and analyst shifts.",
            "visualDesc": "Interface walkthrough and telemetry demo for When to stop, seek approval and escalate.",
            "interactiveDesc": "Interactive investigation: Analyze sample records related to When to stop, seek approval and escalate.",
            "questions": [
              {
                "question": "How does understanding When to stop, seek approval and escalate assist an L1 analyst on shift?",
                "options": [
                  "It allows distinguishing normal baseline operations from suspicious outliers",
                  "It guarantees zero alerts will ever trigger",
                  "It replaces the need for a SIEM",
                  "It eliminates the need for supervisor handoffs"
                ],
                "correctAnswer": 0,
                "explanation": "Understanding expected baseline behaviors enables analysts to quickly spot deviations and anomalous patterns."
              }
            ]
          }
        ],
        "assessment": {
          "id": "M10-U3-A",
          "title": "Unit Assessment: Response Boundaries",
          "duration": 20,
          "passingScore": 80,
          "xpReward": 50,
          "questions": [
            {
              "question": "In Unit 3 (Response Boundaries), what is the primary standard for documenting findings?",
              "options": [
                "Clear facts with supporting timestamps, host, and user references",
                "Personal opinions without log evidence",
                "One-word answers without context",
                "Forwarding raw screenshots without explanation"
              ],
              "correctAnswer": 0,
              "explanation": "Professional SOC documentation requires specific facts, timestamps, and verifiable references."
            }
          ]
        }
      }
    ]
  },
  {
    "id": "11",
    "title": "Identity, Email & Threat Intelligence",
    "level": "Beginner–Intermediate",
    "difficulty": "INTERMEDIATE",
    "order": 11,
    "theoryHours": 4,
    "labHours": 4,
    "totalHours": 8,
    "mentor": "Meera",
    "mentorRole": "Threat Intelligence Analyst",
    "story": "Mentor Meera helps you triage a suspicious sign-in and reported email, then enriches sample indicators using public sources and careful confidence notes.",
    "units": [
      {
        "id": "M11-U1",
        "unitNumber": 1,
        "title": "Identity Monitoring",
        "description": "Authentication, Multi-Factor Authentication (MFA), sign-ins, and privileged accounts.",
        "chapters": [
          {
            "id": "M11-U1-C1",
            "title": "Authentication, MFA and sign-ins",
            "duration": 27,
            "concept": "Core concepts for Authentication, MFA and sign-ins explained for L1 SOC analysts in the CDAC Bengaluru learning setting.",
            "visualDesc": "Visual story for Authentication, MFA and sign-ins illustrating key evidence indicators and workflow steps.",
            "interactiveDesc": "Hands-on activity: Identify and match key elements of Authentication, MFA and sign-ins.",
            "questions": [
              {
                "question": "What is the key takeaway when evaluating Authentication, MFA and sign-ins in an L1 operational setting?",
                "options": [
                  "Always verify the observed evidence and correlate across multiple records",
                  "Assume the first alarm is 100% correct without checking",
                  "Delete the log entry to reduce ticket queue count",
                  "Immediately shutdown the entire branch network"
                ],
                "correctAnswer": 0,
                "explanation": "Careful verification and corroborating facts across sources prevents false alarms and ensures high evidence quality."
              }
            ]
          },
          {
            "id": "M11-U1-C2",
            "title": "Privileged accounts and context",
            "duration": 27,
            "concept": "Operational application of Privileged accounts and context during alert triage and analyst shifts.",
            "visualDesc": "Interface walkthrough and telemetry demo for Privileged accounts and context.",
            "interactiveDesc": "Interactive investigation: Analyze sample records related to Privileged accounts and context.",
            "questions": [
              {
                "question": "How does understanding Privileged accounts and context assist an L1 analyst on shift?",
                "options": [
                  "It allows distinguishing normal baseline operations from suspicious outliers",
                  "It guarantees zero alerts will ever trigger",
                  "It replaces the need for a SIEM",
                  "It eliminates the need for supervisor handoffs"
                ],
                "correctAnswer": 0,
                "explanation": "Understanding expected baseline behaviors enables analysts to quickly spot deviations and anomalous patterns."
              }
            ]
          }
        ],
        "assessment": {
          "id": "M11-U1-A",
          "title": "Unit Assessment: Identity Monitoring",
          "duration": 27,
          "passingScore": 80,
          "xpReward": 50,
          "questions": [
            {
              "question": "In Unit 1 (Identity Monitoring), what is the primary standard for documenting findings?",
              "options": [
                "Clear facts with supporting timestamps, host, and user references",
                "Personal opinions without log evidence",
                "One-word answers without context",
                "Forwarding raw screenshots without explanation"
              ],
              "correctAnswer": 0,
              "explanation": "Professional SOC documentation requires specific facts, timestamps, and verifiable references."
            }
          ]
        }
      },
      {
        "id": "M11-U2",
        "unitNumber": 2,
        "title": "Email Security Triage",
        "description": "Sender, reply-to, URLs, attachments, and safe handling of suspicious messages.",
        "chapters": [
          {
            "id": "M11-U2-C1",
            "title": "Sender, reply-to, URLs and attachments",
            "duration": 27,
            "concept": "Core concepts for Sender, reply-to, URLs and attachments explained for L1 SOC analysts in the CDAC Bengaluru learning setting.",
            "visualDesc": "Visual story for Sender, reply-to, URLs and attachments illustrating key evidence indicators and workflow steps.",
            "interactiveDesc": "Hands-on activity: Identify and match key elements of Sender, reply-to, URLs and attachments.",
            "questions": [
              {
                "question": "What is the key takeaway when evaluating Sender, reply-to, URLs and attachments in an L1 operational setting?",
                "options": [
                  "Always verify the observed evidence and correlate across multiple records",
                  "Assume the first alarm is 100% correct without checking",
                  "Delete the log entry to reduce ticket queue count",
                  "Immediately shutdown the entire branch network"
                ],
                "correctAnswer": 0,
                "explanation": "Careful verification and corroborating facts across sources prevents false alarms and ensures high evidence quality."
              }
            ]
          },
          {
            "id": "M11-U2-C2",
            "title": "Safe handling of suspicious messages",
            "duration": 27,
            "concept": "Operational application of Safe handling of suspicious messages during alert triage and analyst shifts.",
            "visualDesc": "Interface walkthrough and telemetry demo for Safe handling of suspicious messages.",
            "interactiveDesc": "Interactive investigation: Analyze sample records related to Safe handling of suspicious messages.",
            "questions": [
              {
                "question": "How does understanding Safe handling of suspicious messages assist an L1 analyst on shift?",
                "options": [
                  "It allows distinguishing normal baseline operations from suspicious outliers",
                  "It guarantees zero alerts will ever trigger",
                  "It replaces the need for a SIEM",
                  "It eliminates the need for supervisor handoffs"
                ],
                "correctAnswer": 0,
                "explanation": "Understanding expected baseline behaviors enables analysts to quickly spot deviations and anomalous patterns."
              }
            ]
          }
        ],
        "assessment": {
          "id": "M11-U2-A",
          "title": "Unit Assessment: Email Security Triage",
          "duration": 27,
          "passingScore": 80,
          "xpReward": 50,
          "questions": [
            {
              "question": "In Unit 2 (Email Security Triage), what is the primary standard for documenting findings?",
              "options": [
                "Clear facts with supporting timestamps, host, and user references",
                "Personal opinions without log evidence",
                "One-word answers without context",
                "Forwarding raw screenshots without explanation"
              ],
              "correctAnswer": 0,
              "explanation": "Professional SOC documentation requires specific facts, timestamps, and verifiable references."
            }
          ]
        }
      },
      {
        "id": "M11-U3",
        "unitNumber": 3,
        "title": "Threat Intelligence Basics",
        "description": "IOC types, reputation sources, confidence ratings, freshness, and context.",
        "chapters": [
          {
            "id": "M11-U3-C1",
            "title": "IOC types and reputation sources",
            "duration": 26,
            "concept": "Core concepts for IOC types and reputation sources explained for L1 SOC analysts in the CDAC Bengaluru learning setting.",
            "visualDesc": "Visual story for IOC types and reputation sources illustrating key evidence indicators and workflow steps.",
            "interactiveDesc": "Hands-on activity: Identify and match key elements of IOC types and reputation sources.",
            "questions": [
              {
                "question": "What is the key takeaway when evaluating IOC types and reputation sources in an L1 operational setting?",
                "options": [
                  "Always verify the observed evidence and correlate across multiple records",
                  "Assume the first alarm is 100% correct without checking",
                  "Delete the log entry to reduce ticket queue count",
                  "Immediately shutdown the entire branch network"
                ],
                "correctAnswer": 0,
                "explanation": "Careful verification and corroborating facts across sources prevents false alarms and ensures high evidence quality."
              }
            ]
          },
          {
            "id": "M11-U3-C2",
            "title": "Confidence, freshness and context",
            "duration": 26,
            "concept": "Operational application of Confidence, freshness and context during alert triage and analyst shifts.",
            "visualDesc": "Interface walkthrough and telemetry demo for Confidence, freshness and context.",
            "interactiveDesc": "Interactive investigation: Analyze sample records related to Confidence, freshness and context.",
            "questions": [
              {
                "question": "How does understanding Confidence, freshness and context assist an L1 analyst on shift?",
                "options": [
                  "It allows distinguishing normal baseline operations from suspicious outliers",
                  "It guarantees zero alerts will ever trigger",
                  "It replaces the need for a SIEM",
                  "It eliminates the need for supervisor handoffs"
                ],
                "correctAnswer": 0,
                "explanation": "Understanding expected baseline behaviors enables analysts to quickly spot deviations and anomalous patterns."
              }
            ]
          }
        ],
        "assessment": {
          "id": "M11-U3-A",
          "title": "Unit Assessment: Threat Intelligence Basics",
          "duration": 26,
          "passingScore": 80,
          "xpReward": 50,
          "questions": [
            {
              "question": "In Unit 3 (Threat Intelligence Basics), what is the primary standard for documenting findings?",
              "options": [
                "Clear facts with supporting timestamps, host, and user references",
                "Personal opinions without log evidence",
                "One-word answers without context",
                "Forwarding raw screenshots without explanation"
              ],
              "correctAnswer": 0,
              "explanation": "Professional SOC documentation requires specific facts, timestamps, and verifiable references."
            }
          ]
        }
      }
    ]
  },
  {
    "id": "12",
    "title": "SOAR & Basic SOC Automation",
    "level": "Beginner–Intermediate",
    "difficulty": "INTERMEDIATE",
    "order": 12,
    "theoryHours": 3,
    "labHours": 2,
    "totalHours": 5,
    "mentor": "Karthik",
    "mentorRole": "SOC Automation Lead",
    "story": "Mentor Karthik demonstrates a safe, approval-based playbook for repetitive enrichment and notification tasks.",
    "units": [
      {
        "id": "M12-U1",
        "unitNumber": 1,
        "title": "Automation Concepts",
        "description": "Triggers, actions, playbooks, enrichment, and notification use cases.",
        "chapters": [
          {
            "id": "M12-U1-C1",
            "title": "Triggers, actions and playbooks",
            "duration": 20,
            "concept": "Core concepts for Triggers, actions and playbooks explained for L1 SOC analysts in the CDAC Bengaluru learning setting.",
            "visualDesc": "Visual story for Triggers, actions and playbooks illustrating key evidence indicators and workflow steps.",
            "interactiveDesc": "Hands-on activity: Identify and match key elements of Triggers, actions and playbooks.",
            "questions": [
              {
                "question": "What is the key takeaway when evaluating Triggers, actions and playbooks in an L1 operational setting?",
                "options": [
                  "Always verify the observed evidence and correlate across multiple records",
                  "Assume the first alarm is 100% correct without checking",
                  "Delete the log entry to reduce ticket queue count",
                  "Immediately shutdown the entire branch network"
                ],
                "correctAnswer": 0,
                "explanation": "Careful verification and corroborating facts across sources prevents false alarms and ensures high evidence quality."
              }
            ]
          },
          {
            "id": "M12-U1-C2",
            "title": "Enrichment and notification use cases",
            "duration": 20,
            "concept": "Operational application of Enrichment and notification use cases during alert triage and analyst shifts.",
            "visualDesc": "Interface walkthrough and telemetry demo for Enrichment and notification use cases.",
            "interactiveDesc": "Interactive investigation: Analyze sample records related to Enrichment and notification use cases.",
            "questions": [
              {
                "question": "How does understanding Enrichment and notification use cases assist an L1 analyst on shift?",
                "options": [
                  "It allows distinguishing normal baseline operations from suspicious outliers",
                  "It guarantees zero alerts will ever trigger",
                  "It replaces the need for a SIEM",
                  "It eliminates the need for supervisor handoffs"
                ],
                "correctAnswer": 0,
                "explanation": "Understanding expected baseline behaviors enables analysts to quickly spot deviations and anomalous patterns."
              }
            ]
          }
        ],
        "assessment": {
          "id": "M12-U1-A",
          "title": "Unit Assessment: Automation Concepts",
          "duration": 20,
          "passingScore": 80,
          "xpReward": 50,
          "questions": [
            {
              "question": "In Unit 1 (Automation Concepts), what is the primary standard for documenting findings?",
              "options": [
                "Clear facts with supporting timestamps, host, and user references",
                "Personal opinions without log evidence",
                "One-word answers without context",
                "Forwarding raw screenshots without explanation"
              ],
              "correctAnswer": 0,
              "explanation": "Professional SOC documentation requires specific facts, timestamps, and verifiable references."
            }
          ]
        }
      },
      {
        "id": "M12-U2",
        "unitNumber": 2,
        "title": "Safe Workflow Design",
        "description": "Conditions, human approval gates, failure handling, logging, and auditability.",
        "chapters": [
          {
            "id": "M12-U2-C1",
            "title": "Conditions and approval gates",
            "duration": 20,
            "concept": "Core concepts for Conditions and approval gates explained for L1 SOC analysts in the CDAC Bengaluru learning setting.",
            "visualDesc": "Visual story for Conditions and approval gates illustrating key evidence indicators and workflow steps.",
            "interactiveDesc": "Hands-on activity: Identify and match key elements of Conditions and approval gates.",
            "questions": [
              {
                "question": "What is the key takeaway when evaluating Conditions and approval gates in an L1 operational setting?",
                "options": [
                  "Always verify the observed evidence and correlate across multiple records",
                  "Assume the first alarm is 100% correct without checking",
                  "Delete the log entry to reduce ticket queue count",
                  "Immediately shutdown the entire branch network"
                ],
                "correctAnswer": 0,
                "explanation": "Careful verification and corroborating facts across sources prevents false alarms and ensures high evidence quality."
              }
            ]
          },
          {
            "id": "M12-U2-C2",
            "title": "Failure handling, logging and auditability",
            "duration": 20,
            "concept": "Operational application of Failure handling, logging and auditability during alert triage and analyst shifts.",
            "visualDesc": "Interface walkthrough and telemetry demo for Failure handling, logging and auditability.",
            "interactiveDesc": "Interactive investigation: Analyze sample records related to Failure handling, logging and auditability.",
            "questions": [
              {
                "question": "How does understanding Failure handling, logging and auditability assist an L1 analyst on shift?",
                "options": [
                  "It allows distinguishing normal baseline operations from suspicious outliers",
                  "It guarantees zero alerts will ever trigger",
                  "It replaces the need for a SIEM",
                  "It eliminates the need for supervisor handoffs"
                ],
                "correctAnswer": 0,
                "explanation": "Understanding expected baseline behaviors enables analysts to quickly spot deviations and anomalous patterns."
              }
            ]
          }
        ],
        "assessment": {
          "id": "M12-U2-A",
          "title": "Unit Assessment: Safe Workflow Design",
          "duration": 20,
          "passingScore": 80,
          "xpReward": 50,
          "questions": [
            {
              "question": "In Unit 2 (Safe Workflow Design), what is the primary standard for documenting findings?",
              "options": [
                "Clear facts with supporting timestamps, host, and user references",
                "Personal opinions without log evidence",
                "One-word answers without context",
                "Forwarding raw screenshots without explanation"
              ],
              "correctAnswer": 0,
              "explanation": "Professional SOC documentation requires specific facts, timestamps, and verifiable references."
            }
          ]
        }
      },
      {
        "id": "M12-U3",
        "unitNumber": 3,
        "title": "L1 Automation Boundaries",
        "description": "Human review, reversible actions, and what must never run automatically.",
        "chapters": [
          {
            "id": "M12-U3-C1",
            "title": "Human review and reversible actions",
            "duration": 20,
            "concept": "Core concepts for Human review and reversible actions explained for L1 SOC analysts in the CDAC Bengaluru learning setting.",
            "visualDesc": "Visual story for Human review and reversible actions illustrating key evidence indicators and workflow steps.",
            "interactiveDesc": "Hands-on activity: Identify and match key elements of Human review and reversible actions.",
            "questions": [
              {
                "question": "What is the key takeaway when evaluating Human review and reversible actions in an L1 operational setting?",
                "options": [
                  "Always verify the observed evidence and correlate across multiple records",
                  "Assume the first alarm is 100% correct without checking",
                  "Delete the log entry to reduce ticket queue count",
                  "Immediately shutdown the entire branch network"
                ],
                "correctAnswer": 0,
                "explanation": "Careful verification and corroborating facts across sources prevents false alarms and ensures high evidence quality."
              }
            ]
          },
          {
            "id": "M12-U3-C2",
            "title": "What must not run automatically",
            "duration": 20,
            "concept": "Operational application of What must not run automatically during alert triage and analyst shifts.",
            "visualDesc": "Interface walkthrough and telemetry demo for What must not run automatically.",
            "interactiveDesc": "Interactive investigation: Analyze sample records related to What must not run automatically.",
            "questions": [
              {
                "question": "How does understanding What must not run automatically assist an L1 analyst on shift?",
                "options": [
                  "It allows distinguishing normal baseline operations from suspicious outliers",
                  "It guarantees zero alerts will ever trigger",
                  "It replaces the need for a SIEM",
                  "It eliminates the need for supervisor handoffs"
                ],
                "correctAnswer": 0,
                "explanation": "Understanding expected baseline behaviors enables analysts to quickly spot deviations and anomalous patterns."
              }
            ]
          }
        ],
        "assessment": {
          "id": "M12-U3-A",
          "title": "Unit Assessment: L1 Automation Boundaries",
          "duration": 20,
          "passingScore": 80,
          "xpReward": 50,
          "questions": [
            {
              "question": "In Unit 3 (L1 Automation Boundaries), what is the primary standard for documenting findings?",
              "options": [
                "Clear facts with supporting timestamps, host, and user references",
                "Personal opinions without log evidence",
                "One-word answers without context",
                "Forwarding raw screenshots without explanation"
              ],
              "correctAnswer": 0,
              "explanation": "Professional SOC documentation requires specific facts, timestamps, and verifiable references."
            }
          ]
        }
      }
    ]
  },
  {
    "id": "13",
    "title": "MITRE ATT&CK for L1 Analysts",
    "level": "Beginner–Intermediate",
    "difficulty": "INTERMEDIATE",
    "order": 13,
    "theoryHours": 3,
    "labHours": 2,
    "totalHours": 5,
    "mentor": "Ananya",
    "mentorRole": "Threat Methodology Mentor",
    "story": "Mentor Ananya shows how to use ATT&CK as a shared vocabulary for observed behavior without overclaiming that a technique mapping proves an attack.",
    "units": [
      {
        "id": "M13-U1",
        "unitNumber": 1,
        "title": "ATT&CK Basics",
        "description": "Tactics, techniques, procedures (TTPs), and using the matrix as a common vocabulary.",
        "chapters": [
          {
            "id": "M13-U1-C1",
            "title": "Tactics, techniques and procedures",
            "duration": 20,
            "concept": "Core concepts for Tactics, techniques and procedures explained for L1 SOC analysts in the CDAC Bengaluru learning setting.",
            "visualDesc": "Visual story for Tactics, techniques and procedures illustrating key evidence indicators and workflow steps.",
            "interactiveDesc": "Hands-on activity: Identify and match key elements of Tactics, techniques and procedures.",
            "questions": [
              {
                "question": "What is the key takeaway when evaluating Tactics, techniques and procedures in an L1 operational setting?",
                "options": [
                  "Always verify the observed evidence and correlate across multiple records",
                  "Assume the first alarm is 100% correct without checking",
                  "Delete the log entry to reduce ticket queue count",
                  "Immediately shutdown the entire branch network"
                ],
                "correctAnswer": 0,
                "explanation": "Careful verification and corroborating facts across sources prevents false alarms and ensures high evidence quality."
              }
            ]
          },
          {
            "id": "M13-U1-C2",
            "title": "Using the matrix as a vocabulary",
            "duration": 20,
            "concept": "Operational application of Using the matrix as a vocabulary during alert triage and analyst shifts.",
            "visualDesc": "Interface walkthrough and telemetry demo for Using the matrix as a vocabulary.",
            "interactiveDesc": "Interactive investigation: Analyze sample records related to Using the matrix as a vocabulary.",
            "questions": [
              {
                "question": "How does understanding Using the matrix as a vocabulary assist an L1 analyst on shift?",
                "options": [
                  "It allows distinguishing normal baseline operations from suspicious outliers",
                  "It guarantees zero alerts will ever trigger",
                  "It replaces the need for a SIEM",
                  "It eliminates the need for supervisor handoffs"
                ],
                "correctAnswer": 0,
                "explanation": "Understanding expected baseline behaviors enables analysts to quickly spot deviations and anomalous patterns."
              }
            ]
          }
        ],
        "assessment": {
          "id": "M13-U1-A",
          "title": "Unit Assessment: ATT&CK Basics",
          "duration": 20,
          "passingScore": 80,
          "xpReward": 50,
          "questions": [
            {
              "question": "In Unit 1 (ATT&CK Basics), what is the primary standard for documenting findings?",
              "options": [
                "Clear facts with supporting timestamps, host, and user references",
                "Personal opinions without log evidence",
                "One-word answers without context",
                "Forwarding raw screenshots without explanation"
              ],
              "correctAnswer": 0,
              "explanation": "Professional SOC documentation requires specific facts, timestamps, and verifiable references."
            }
          ]
        }
      },
      {
        "id": "M13-U2",
        "unitNumber": 2,
        "title": "Map Basic Observations",
        "description": "Credential access and discovery examples; choosing plausible techniques carefully.",
        "chapters": [
          {
            "id": "M13-U2-C1",
            "title": "Credential access and discovery examples",
            "duration": 20,
            "concept": "Core concepts for Credential access and discovery examples explained for L1 SOC analysts in the CDAC Bengaluru learning setting.",
            "visualDesc": "Visual story for Credential access and discovery examples illustrating key evidence indicators and workflow steps.",
            "interactiveDesc": "Hands-on activity: Identify and match key elements of Credential access and discovery examples.",
            "questions": [
              {
                "question": "What is the key takeaway when evaluating Credential access and discovery examples in an L1 operational setting?",
                "options": [
                  "Always verify the observed evidence and correlate across multiple records",
                  "Assume the first alarm is 100% correct without checking",
                  "Delete the log entry to reduce ticket queue count",
                  "Immediately shutdown the entire branch network"
                ],
                "correctAnswer": 0,
                "explanation": "Careful verification and corroborating facts across sources prevents false alarms and ensures high evidence quality."
              }
            ]
          },
          {
            "id": "M13-U2-C2",
            "title": "Choose a plausible technique carefully",
            "duration": 20,
            "concept": "Operational application of Choose a plausible technique carefully during alert triage and analyst shifts.",
            "visualDesc": "Interface walkthrough and telemetry demo for Choose a plausible technique carefully.",
            "interactiveDesc": "Interactive investigation: Analyze sample records related to Choose a plausible technique carefully.",
            "questions": [
              {
                "question": "How does understanding Choose a plausible technique carefully assist an L1 analyst on shift?",
                "options": [
                  "It allows distinguishing normal baseline operations from suspicious outliers",
                  "It guarantees zero alerts will ever trigger",
                  "It replaces the need for a SIEM",
                  "It eliminates the need for supervisor handoffs"
                ],
                "correctAnswer": 0,
                "explanation": "Understanding expected baseline behaviors enables analysts to quickly spot deviations and anomalous patterns."
              }
            ]
          }
        ],
        "assessment": {
          "id": "M13-U2-A",
          "title": "Unit Assessment: Map Basic Observations",
          "duration": 20,
          "passingScore": 80,
          "xpReward": 50,
          "questions": [
            {
              "question": "In Unit 2 (Map Basic Observations), what is the primary standard for documenting findings?",
              "options": [
                "Clear facts with supporting timestamps, host, and user references",
                "Personal opinions without log evidence",
                "One-word answers without context",
                "Forwarding raw screenshots without explanation"
              ],
              "correctAnswer": 0,
              "explanation": "Professional SOC documentation requires specific facts, timestamps, and verifiable references."
            }
          ]
        }
      },
      {
        "id": "M13-U3",
        "unitNumber": 3,
        "title": "Communicate the Mapping",
        "description": "Evidence, uncertainty, and avoiding premature inference of full attack chains.",
        "chapters": [
          {
            "id": "M13-U3-C1",
            "title": "Evidence and uncertainty",
            "duration": 20,
            "concept": "Core concepts for Evidence and uncertainty explained for L1 SOC analysts in the CDAC Bengaluru learning setting.",
            "visualDesc": "Visual story for Evidence and uncertainty illustrating key evidence indicators and workflow steps.",
            "interactiveDesc": "Hands-on activity: Identify and match key elements of Evidence and uncertainty.",
            "questions": [
              {
                "question": "What is the key takeaway when evaluating Evidence and uncertainty in an L1 operational setting?",
                "options": [
                  "Always verify the observed evidence and correlate across multiple records",
                  "Assume the first alarm is 100% correct without checking",
                  "Delete the log entry to reduce ticket queue count",
                  "Immediately shutdown the entire branch network"
                ],
                "correctAnswer": 0,
                "explanation": "Careful verification and corroborating facts across sources prevents false alarms and ensures high evidence quality."
              }
            ]
          },
          {
            "id": "M13-U3-C2",
            "title": "Do not infer a full attack chain",
            "duration": 20,
            "concept": "Operational application of Do not infer a full attack chain during alert triage and analyst shifts.",
            "visualDesc": "Interface walkthrough and telemetry demo for Do not infer a full attack chain.",
            "interactiveDesc": "Interactive investigation: Analyze sample records related to Do not infer a full attack chain.",
            "questions": [
              {
                "question": "How does understanding Do not infer a full attack chain assist an L1 analyst on shift?",
                "options": [
                  "It allows distinguishing normal baseline operations from suspicious outliers",
                  "It guarantees zero alerts will ever trigger",
                  "It replaces the need for a SIEM",
                  "It eliminates the need for supervisor handoffs"
                ],
                "correctAnswer": 0,
                "explanation": "Understanding expected baseline behaviors enables analysts to quickly spot deviations and anomalous patterns."
              }
            ]
          }
        ],
        "assessment": {
          "id": "M13-U3-A",
          "title": "Unit Assessment: Communicate the Mapping",
          "duration": 20,
          "passingScore": 80,
          "xpReward": 50,
          "questions": [
            {
              "question": "In Unit 3 (Communicate the Mapping), what is the primary standard for documenting findings?",
              "options": [
                "Clear facts with supporting timestamps, host, and user references",
                "Personal opinions without log evidence",
                "One-word answers without context",
                "Forwarding raw screenshots without explanation"
              ],
              "correctAnswer": 0,
              "explanation": "Professional SOC documentation requires specific facts, timestamps, and verifiable references."
            }
          ]
        }
      }
    ]
  },
  {
    "id": "14",
    "title": "Incident Response & SOC Documentation",
    "level": "Beginner–Intermediate",
    "difficulty": "INTERMEDIATE",
    "order": 14,
    "theoryHours": 5,
    "labHours": 4,
    "totalHours": 9,
    "mentor": "Ananya & Meera",
    "mentorRole": "Senior Incident Responders",
    "story": "Mentors Ananya and Meera coach you to prepare a timeline, document findings, route escalation, complete a case record and hand over open work.",
    "units": [
      {
        "id": "M14-U1",
        "unitNumber": 1,
        "title": "Incident Response Lifecycle",
        "description": "NIST/SANS lifecycle phases: preparation, detection, response, recovery, and L1 handoffs.",
        "chapters": [
          {
            "id": "M14-U1-C1",
            "title": "Preparation, detection, response and recovery",
            "duration": 34,
            "concept": "Core concepts for Preparation, detection, response and recovery explained for L1 SOC analysts in the CDAC Bengaluru learning setting.",
            "visualDesc": "Visual story for Preparation, detection, response and recovery illustrating key evidence indicators and workflow steps.",
            "interactiveDesc": "Hands-on activity: Identify and match key elements of Preparation, detection, response and recovery.",
            "questions": [
              {
                "question": "What is the key takeaway when evaluating Preparation, detection, response and recovery in an L1 operational setting?",
                "options": [
                  "Always verify the observed evidence and correlate across multiple records",
                  "Assume the first alarm is 100% correct without checking",
                  "Delete the log entry to reduce ticket queue count",
                  "Immediately shutdown the entire branch network"
                ],
                "correctAnswer": 0,
                "explanation": "Careful verification and corroborating facts across sources prevents false alarms and ensures high evidence quality."
              }
            ]
          },
          {
            "id": "M14-U1-C2",
            "title": "L1 responsibilities and escalation",
            "duration": 34,
            "concept": "Operational application of L1 responsibilities and escalation during alert triage and analyst shifts.",
            "visualDesc": "Interface walkthrough and telemetry demo for L1 responsibilities and escalation.",
            "interactiveDesc": "Interactive investigation: Analyze sample records related to L1 responsibilities and escalation.",
            "questions": [
              {
                "question": "How does understanding L1 responsibilities and escalation assist an L1 analyst on shift?",
                "options": [
                  "It allows distinguishing normal baseline operations from suspicious outliers",
                  "It guarantees zero alerts will ever trigger",
                  "It replaces the need for a SIEM",
                  "It eliminates the need for supervisor handoffs"
                ],
                "correctAnswer": 0,
                "explanation": "Understanding expected baseline behaviors enables analysts to quickly spot deviations and anomalous patterns."
              }
            ]
          }
        ],
        "assessment": {
          "id": "M14-U1-A",
          "title": "Unit Assessment: Incident Response Lifecycle",
          "duration": 34,
          "passingScore": 80,
          "xpReward": 50,
          "questions": [
            {
              "question": "In Unit 1 (Incident Response Lifecycle), what is the primary standard for documenting findings?",
              "options": [
                "Clear facts with supporting timestamps, host, and user references",
                "Personal opinions without log evidence",
                "One-word answers without context",
                "Forwarding raw screenshots without explanation"
              ],
              "correctAnswer": 0,
              "explanation": "Professional SOC documentation requires specific facts, timestamps, and verifiable references."
            }
          ]
        }
      },
      {
        "id": "M14-U2",
        "unitNumber": 2,
        "title": "Case Documentation",
        "description": "Building timelines, linking evidence, clear notes, severity ratings, and confidence.",
        "chapters": [
          {
            "id": "M14-U2-C1",
            "title": "Timeline, evidence and clear notes",
            "duration": 33,
            "concept": "Core concepts for Timeline, evidence and clear notes explained for L1 SOC analysts in the CDAC Bengaluru learning setting.",
            "visualDesc": "Visual story for Timeline, evidence and clear notes illustrating key evidence indicators and workflow steps.",
            "interactiveDesc": "Hands-on activity: Identify and match key elements of Timeline, evidence and clear notes.",
            "questions": [
              {
                "question": "What is the key takeaway when evaluating Timeline, evidence and clear notes in an L1 operational setting?",
                "options": [
                  "Always verify the observed evidence and correlate across multiple records",
                  "Assume the first alarm is 100% correct without checking",
                  "Delete the log entry to reduce ticket queue count",
                  "Immediately shutdown the entire branch network"
                ],
                "correctAnswer": 0,
                "explanation": "Careful verification and corroborating facts across sources prevents false alarms and ensures high evidence quality."
              }
            ]
          },
          {
            "id": "M14-U2-C2",
            "title": "Severity, confidence and disposition",
            "duration": 33,
            "concept": "Operational application of Severity, confidence and disposition during alert triage and analyst shifts.",
            "visualDesc": "Interface walkthrough and telemetry demo for Severity, confidence and disposition.",
            "interactiveDesc": "Interactive investigation: Analyze sample records related to Severity, confidence and disposition.",
            "questions": [
              {
                "question": "How does understanding Severity, confidence and disposition assist an L1 analyst on shift?",
                "options": [
                  "It allows distinguishing normal baseline operations from suspicious outliers",
                  "It guarantees zero alerts will ever trigger",
                  "It replaces the need for a SIEM",
                  "It eliminates the need for supervisor handoffs"
                ],
                "correctAnswer": 0,
                "explanation": "Understanding expected baseline behaviors enables analysts to quickly spot deviations and anomalous patterns."
              }
            ]
          }
        ],
        "assessment": {
          "id": "M14-U2-A",
          "title": "Unit Assessment: Case Documentation",
          "duration": 33,
          "passingScore": 80,
          "xpReward": 50,
          "questions": [
            {
              "question": "In Unit 2 (Case Documentation), what is the primary standard for documenting findings?",
              "options": [
                "Clear facts with supporting timestamps, host, and user references",
                "Personal opinions without log evidence",
                "One-word answers without context",
                "Forwarding raw screenshots without explanation"
              ],
              "correctAnswer": 0,
              "explanation": "Professional SOC documentation requires specific facts, timestamps, and verifiable references."
            }
          ]
        }
      },
      {
        "id": "M14-U3",
        "unitNumber": 3,
        "title": "Handover and Closure",
        "description": "Escalation paths, case ownership, shift handovers, and lessons learned.",
        "chapters": [
          {
            "id": "M14-U3-C1",
            "title": "Escalation path and ownership",
            "duration": 33,
            "concept": "Core concepts for Escalation path and ownership explained for L1 SOC analysts in the CDAC Bengaluru learning setting.",
            "visualDesc": "Visual story for Escalation path and ownership illustrating key evidence indicators and workflow steps.",
            "interactiveDesc": "Hands-on activity: Identify and match key elements of Escalation path and ownership.",
            "questions": [
              {
                "question": "What is the key takeaway when evaluating Escalation path and ownership in an L1 operational setting?",
                "options": [
                  "Always verify the observed evidence and correlate across multiple records",
                  "Assume the first alarm is 100% correct without checking",
                  "Delete the log entry to reduce ticket queue count",
                  "Immediately shutdown the entire branch network"
                ],
                "correctAnswer": 0,
                "explanation": "Careful verification and corroborating facts across sources prevents false alarms and ensures high evidence quality."
              }
            ]
          },
          {
            "id": "M14-U3-C2",
            "title": "Shift handover and lessons learned",
            "duration": 33,
            "concept": "Operational application of Shift handover and lessons learned during alert triage and analyst shifts.",
            "visualDesc": "Interface walkthrough and telemetry demo for Shift handover and lessons learned.",
            "interactiveDesc": "Interactive investigation: Analyze sample records related to Shift handover and lessons learned.",
            "questions": [
              {
                "question": "How does understanding Shift handover and lessons learned assist an L1 analyst on shift?",
                "options": [
                  "It allows distinguishing normal baseline operations from suspicious outliers",
                  "It guarantees zero alerts will ever trigger",
                  "It replaces the need for a SIEM",
                  "It eliminates the need for supervisor handoffs"
                ],
                "correctAnswer": 0,
                "explanation": "Understanding expected baseline behaviors enables analysts to quickly spot deviations and anomalous patterns."
              }
            ]
          }
        ],
        "assessment": {
          "id": "M14-U3-A",
          "title": "Unit Assessment: Handover and Closure",
          "duration": 33,
          "passingScore": 80,
          "xpReward": 50,
          "questions": [
            {
              "question": "In Unit 3 (Handover and Closure), what is the primary standard for documenting findings?",
              "options": [
                "Clear facts with supporting timestamps, host, and user references",
                "Personal opinions without log evidence",
                "One-word answers without context",
                "Forwarding raw screenshots without explanation"
              ],
              "correctAnswer": 0,
              "explanation": "Professional SOC documentation requires specific facts, timestamps, and verifiable references."
            }
          ]
        }
      }
    ]
  }
];

export const V2_LABS: V2Lab[] = [
  {
    "id": "LAB-01",
    "moduleId": "01",
    "module": "Computer Fundamentals",
    "title": "Orient yourself in Ubuntu",
    "format": "Live VM",
    "duration": 40,
    "tools": "Ubuntu Server 24.04; terminal",
    "objective": "Identify the VM, current account and core system context.",
    "mentor": "Ravi",
    "tasks": [
      "Run hostname and identify the OS",
      "Identify current user and working directory",
      "List three running processes with ps aux"
    ],
    "outcome": "A short workstation inventory with commands and observations.",
    "evidence": "Learner submits terminal log and brief explanation."
  },
  {
    "id": "LAB-02",
    "moduleId": "02",
    "module": "Networking Fundamentals",
    "title": "Trace a small-branch network",
    "format": "Simulated Lab",
    "duration": 45,
    "tools": "draw.io; branch diagram; Wireshark capture",
    "objective": "Trace a device-to-service path and label basic network components.",
    "mentor": "Ravi",
    "tasks": [
      "Label staff laptop, switch, gateway and DNS",
      "Trace route to internal service",
      "Identify source/destination IPs and ports in capture"
    ],
    "outcome": "Annotated small-branch network diagram and traffic worksheet.",
    "evidence": "Learner submits diagram and traffic summary."
  },
  {
    "id": "LAB-03",
    "moduleId": "03",
    "module": "Cybersecurity Fundamentals",
    "title": "Classify a branch security scenario",
    "format": "Simulated Lab",
    "duration": 45,
    "tools": "Scenario cards; spreadsheet/browser",
    "objective": "Distinguish assets, threats, vulnerabilities, controls and impact.",
    "mentor": "Ananya",
    "tasks": [
      "Identify two key assets",
      "Match threat and system weakness",
      "Choose relevant security control",
      "Write one-sentence risk rationale"
    ],
    "outcome": "Completed scenario worksheet with evidence-based reasoning.",
    "evidence": "Learner submits completed scenario worksheet."
  },
  {
    "id": "LAB-04",
    "moduleId": "04",
    "module": "SOC Operations & Alert Triage",
    "title": "Read the incoming alert",
    "format": "Simulated Lab",
    "duration": 55,
    "tools": "JSON/CSV alert bundle; spreadsheet",
    "objective": "Extract key fields required for first-pass triage.",
    "mentor": "Ananya",
    "tasks": [
      "Find user, host, source IP and timestamp",
      "Record attempt count and alert reason",
      "Identify two missing context fields"
    ],
    "outcome": "Alert triage worksheet for FIN-OPS-01 on BLR-BR-WS-04.",
    "evidence": "Learner submits triage worksheet."
  },
  {
    "id": "LAB-05",
    "moduleId": "04",
    "module": "SOC Operations & Alert Triage",
    "title": "Build a login timeline",
    "format": "Simulated Lab",
    "duration": 65,
    "tools": "Authentication CSV; spreadsheet",
    "objective": "Order relevant events and note what they do and do not prove.",
    "mentor": "Ananya",
    "tasks": [
      "Sort records chronologically",
      "Mark failed and successful logons",
      "Highlight first relevant sequence",
      "Write one cautious finding"
    ],
    "outcome": "Timeline plus short evidence summary.",
    "evidence": "Learner submits timeline file."
  },
  {
    "id": "LAB-06",
    "moduleId": "04",
    "module": "SOC Operations & Alert Triage",
    "title": "Context and false-positive decision",
    "format": "Simulated Lab",
    "duration": 60,
    "tools": "Scenario cards; alert bundle",
    "objective": "Classify examples as expected, benign or suspicious using context.",
    "mentor": "Ananya",
    "tasks": [
      "Review user, device, and source context",
      "Classify each of 3 scenarios",
      "Choose strongest supporting evidence",
      "Record uncertainty notes"
    ],
    "outcome": "Three reasoned decisions and one escalation trigger.",
    "evidence": "Learner submits decision rationale."
  },
  {
    "id": "LAB-07",
    "moduleId": "04",
    "module": "SOC Operations & Alert Triage",
    "title": "Write an L1 handoff",
    "format": "Simulated Lab",
    "duration": 70,
    "tools": "Case-note template; TheHive CE optional",
    "objective": "Produce a concise, audit-grade case note.",
    "mentor": "Ananya",
    "tasks": [
      "Summarize what triggered alert",
      "Record entities and time window",
      "List evidence and limitations",
      "Recommend close, monitor, or escalate"
    ],
    "outcome": "Reviewable case note with disposition and rationale.",
    "evidence": "Learner submits case note artifact."
  },
  {
    "id": "LAB-08",
    "moduleId": "05",
    "module": "SIEM Fundamentals & Search",
    "title": "Explore a SIEM interface",
    "format": "Live VM",
    "duration": 90,
    "tools": "OpenSearch + Dashboards; sample logs",
    "objective": "Understand dashboard, index/data view and basic search workflow.",
    "mentor": "Karthik",
    "tasks": [
      "Open prepared dashboard",
      "Locate supplied log dataset",
      "Filter by time and user",
      "Capture three matching records"
    ],
    "outcome": "Screenshots and saved query with brief interpretation.",
    "evidence": "Learner submits query screenshots."
  },
  {
    "id": "LAB-09",
    "moduleId": "05",
    "module": "SIEM Fundamentals & Search",
    "title": "Search security events",
    "format": "Simulated Lab",
    "duration": 55,
    "tools": "OpenSearch Dashboards / prepared demo; JSON logs",
    "objective": "Use basic filters to find events relevant to an alert.",
    "mentor": "Karthik",
    "tasks": [
      "Set time range",
      "Filter by user or host",
      "Filter by event outcome",
      "Record matching results"
    ],
    "outcome": "Query/filter worksheet and matching records.",
    "evidence": "Learner submits worksheet."
  },
  {
    "id": "LAB-10",
    "moduleId": "05",
    "module": "SIEM Fundamentals & Search",
    "title": "Inspect fields across sources",
    "format": "Simulated Lab",
    "duration": 50,
    "tools": "Windows/Linux logs; spreadsheet",
    "objective": "Recognize common fields and source-specific differences.",
    "mentor": "Karthik",
    "tasks": [
      "Find timestamp, user, host fields",
      "Compare outcome fields",
      "Map equivalent fields into common table"
    ],
    "outcome": "Common-field mapping table.",
    "evidence": "Learner submits mapping table."
  },
  {
    "id": "LAB-11",
    "moduleId": "05",
    "module": "SIEM Fundamentals & Search",
    "title": "Review a simple detection",
    "format": "Simulated Lab",
    "duration": 60,
    "tools": "Sample SIEM alert with linked records",
    "objective": "Explain why the detection generated an alert.",
    "mentor": "Karthik",
    "tasks": [
      "Read detection reason",
      "Open linked records",
      "Identify supporting evidence",
      "Write one limitation"
    ],
    "outcome": "Detection explanation with evidence references.",
    "evidence": "Learner submits analysis."
  },
  {
    "id": "LAB-12",
    "moduleId": "05",
    "module": "SIEM Fundamentals & Search",
    "title": "Build a basic dashboard view",
    "format": "Simulated Lab",
    "duration": 65,
    "tools": "OpenSearch Dashboards / screenshot pack",
    "objective": "Understand a simple alert-count/time visualization and limits.",
    "mentor": "Karthik",
    "tasks": [
      "Inspect visualization and filters",
      "Identify busiest time window",
      "Compare counts by source",
      "Write one useful observation"
    ],
    "outcome": "Annotated dashboard screenshot or chart summary.",
    "evidence": "Learner submits dashboard summary."
  },
  {
    "id": "LAB-13",
    "moduleId": "06",
    "module": "Log & Event Analysis",
    "title": "Read Windows event records",
    "format": "Simulated Lab",
    "duration": 50,
    "tools": "EVTX-to-CSV/JSON sample; screenshots",
    "objective": "Identify core fields in a Windows security record.",
    "mentor": "Karthik",
    "tasks": [
      "Locate event time and category",
      "Identify account and workstation fields",
      "Record success/failure outcome"
    ],
    "outcome": "Annotated event worksheet.",
    "evidence": "Learner submits annotated worksheet."
  },
  {
    "id": "LAB-14",
    "moduleId": "06",
    "module": "Log & Event Analysis",
    "title": "Compare mixed log formats",
    "format": "Simulated Lab",
    "duration": 55,
    "tools": "Windows/Linux samples; spreadsheet",
    "objective": "Map equivalent fields across disparate log sources.",
    "mentor": "Karthik",
    "tasks": [
      "Identify timestamp formats",
      "Map user and host fields",
      "Map outcome/action fields",
      "Note one source-specific field"
    ],
    "outcome": "Completed field normalization table.",
    "evidence": "Learner submits table."
  },
  {
    "id": "LAB-15",
    "moduleId": "06",
    "module": "Log & Event Analysis",
    "title": "Build a multi-source timeline",
    "format": "Simulated Lab",
    "duration": 70,
    "tools": "Auth and network records; spreadsheet",
    "objective": "Create a simple chronology with evidence references.",
    "mentor": "Karthik",
    "tasks": [
      "Normalize times to one timezone",
      "Sort records",
      "Link only supported records",
      "Mark observed facts vs inference"
    ],
    "outcome": "Timeline with references and uncertainty notes.",
    "evidence": "Learner submits timeline file."
  },
  {
    "id": "LAB-16",
    "moduleId": "06",
    "module": "Log & Event Analysis",
    "title": "Review evidence gaps",
    "format": "Simulated Lab",
    "duration": 65,
    "tools": "Alert plus incomplete log bundle",
    "objective": "Identify missing context before making strong conclusions.",
    "mentor": "Karthik",
    "tasks": [
      "List available evidence",
      "Identify at least two gaps",
      "Choose next useful data source",
      "Write cautious assessment"
    ],
    "outcome": "Evidence-gap checklist and recommendation.",
    "evidence": "Learner submits checklist."
  },
  {
    "id": "LAB-17",
    "moduleId": "07",
    "module": "Windows & Linux Security Monitoring",
    "title": "Explore Windows Event Viewer",
    "format": "Live VM",
    "duration": 75,
    "tools": "Windows 10/11 VM; Event Viewer",
    "objective": "Locate security logs and interpret basic logon events.",
    "mentor": "Ravi",
    "tasks": [
      "Open Windows Event Viewer",
      "Navigate to Windows Logs > Security",
      "Filter for logon events (4624/4625)",
      "Record event time, account, result"
    ],
    "outcome": "Screenshots or exported records plus interpretation.",
    "evidence": "Learner submits event export."
  },
  {
    "id": "LAB-18",
    "moduleId": "07",
    "module": "Windows & Linux Security Monitoring",
    "title": "Review Linux authentication logs",
    "format": "Live VM",
    "duration": 65,
    "tools": "Ubuntu Server 24.04; journalctl",
    "objective": "Find authentication and privilege-use evidence safely.",
    "mentor": "Ravi",
    "tasks": [
      "Inspect recent authentication messages",
      "Find login example in logs",
      "Review sudo-related activity",
      "Summarize result"
    ],
    "outcome": "Command output and brief finding.",
    "evidence": "Learner submits terminal log."
  },
  {
    "id": "LAB-19",
    "moduleId": "07",
    "module": "Windows & Linux Security Monitoring",
    "title": "Compare normal and unusual host activity",
    "format": "Simulated Lab",
    "duration": 55,
    "tools": "Host log bundle; spreadsheet",
    "objective": "Compare activity against a simple stated baseline.",
    "mentor": "Ravi",
    "tasks": [
      "Group events by user or host",
      "Identify one outlier",
      "Check timestamp and context",
      "State alternative benign explanation"
    ],
    "outcome": "Normal-versus-unusual comparison table.",
    "evidence": "Learner submits comparison table."
  },
  {
    "id": "LAB-20",
    "moduleId": "07",
    "module": "Windows & Linux Security Monitoring",
    "title": "Write a host triage note",
    "format": "Simulated Lab",
    "duration": 45,
    "tools": "Host log bundle; case-note template",
    "objective": "Communicate a host finding without overclaiming.",
    "mentor": "Ravi",
    "tasks": [
      "Summarize observed activity",
      "Reference two records",
      "List one limitation",
      "Recommend next step"
    ],
    "outcome": "Concise host triage note.",
    "evidence": "Learner submits triage note."
  },
  {
    "id": "LAB-21",
    "moduleId": "08",
    "module": "Network Security Monitoring",
    "title": "Wireshark interface orientation",
    "format": "Live VM",
    "duration": 80,
    "tools": "Wireshark; sample PCAP",
    "objective": "Learn packet list, packet details, filters, and conversation panes.",
    "mentor": "Meera",
    "tasks": [
      "Open supplied PCAP",
      "Locate packet list and details",
      "Apply basic display filter",
      "Follow one TCP conversation"
    ],
    "outcome": "Annotated screenshot and flow description.",
    "evidence": "Learner submits screenshot and summary."
  },
  {
    "id": "LAB-22",
    "moduleId": "08",
    "module": "Network Security Monitoring",
    "title": "Inspect DNS and web traffic",
    "format": "Simulated Lab",
    "duration": 55,
    "tools": "Wireshark; supplied PCAP",
    "objective": "Identify DNS lookups and destination connections.",
    "mentor": "Meera",
    "tasks": [
      "Filter DNS traffic",
      "Record queried domain and response IP",
      "Find related destination connection",
      "Note what TLS encryption conceals"
    ],
    "outcome": "Domain/IP worksheet with evidence.",
    "evidence": "Learner submits worksheet."
  },
  {
    "id": "LAB-23",
    "moduleId": "08",
    "module": "Network Security Monitoring",
    "title": "Review repeated connections",
    "format": "Simulated Lab",
    "duration": 65,
    "tools": "Wireshark; sample PCAP",
    "objective": "Recognize repeated connection attempts without premature alarm.",
    "mentor": "Meera",
    "tasks": [
      "Filter by source address",
      "Compare destination ports",
      "Identify time window and frequency",
      "Write balanced assessment"
    ],
    "outcome": "Network observation with endpoints and timeframe.",
    "evidence": "Learner submits assessment."
  },
  {
    "id": "LAB-24",
    "moduleId": "08",
    "module": "Network Security Monitoring",
    "title": "Summarize a network alert",
    "format": "Simulated Lab",
    "duration": 40,
    "tools": "PCAP and alert card; case template",
    "objective": "Tie visible traffic to alert fields and state limitations.",
    "mentor": "Meera",
    "tasks": [
      "Match time and endpoints",
      "Select relevant packets",
      "Record one supported finding",
      "Recommend close or escalate"
    ],
    "outcome": "Evidence-backed network triage summary.",
    "evidence": "Learner submits summary."
  },
  {
    "id": "LAB-25",
    "moduleId": "09",
    "module": "Endpoint Detection & Response (EDR)",
    "title": "Read an endpoint alert view",
    "format": "Simulated Lab",
    "duration": 50,
    "tools": "EDR alert export; annotated screenshots",
    "objective": "Identify device, user, time, severity and available evidence.",
    "mentor": "Ananya",
    "tasks": [
      "Find device and user",
      "Read alert reason and severity",
      "Locate file/hash fields if present",
      "Flag missing fields"
    ],
    "outcome": "Endpoint alert summary.",
    "evidence": "Learner submits alert summary."
  },
  {
    "id": "LAB-26",
    "moduleId": "09",
    "module": "Endpoint Detection & Response (EDR)",
    "title": "Review endpoint event context",
    "format": "Simulated Lab",
    "duration": 60,
    "tools": "Endpoint event bundle; JSON/CSV viewer",
    "objective": "Order a small set of endpoint records by time and device.",
    "mentor": "Ananya",
    "tasks": [
      "Sort records by time",
      "Match device and user",
      "Identify related process records",
      "Separate fact from inference"
    ],
    "outcome": "Basic endpoint timeline.",
    "evidence": "Learner submits timeline."
  },
  {
    "id": "LAB-27",
    "moduleId": "09",
    "module": "Endpoint Detection & Response (EDR)",
    "title": "Choose an L1 endpoint disposition",
    "format": "Simulated Lab",
    "duration": 50,
    "tools": "Endpoint scenarios; response policy",
    "objective": "Choose a policy-aligned next step.",
    "mentor": "Ananya",
    "tasks": [
      "Review scenario and evidence",
      "Choose close, monitor, or escalate",
      "State what evidence supports choice"
    ],
    "outcome": "Disposition with concise rationale.",
    "evidence": "Learner submits disposition note."
  },
  {
    "id": "LAB-28",
    "moduleId": "10",
    "module": "Security Ecosystem: XDR, Response Tools & OT/ICS",
    "title": "Explore the security ecosystem and OT boundary",
    "format": "Simulated Lab",
    "duration": 60,
    "tools": "Tool-role cards; branch diagrams",
    "objective": "Distinguish SIEM, EDR, XDR, SOAR, case management and OT monitoring.",
    "mentor": "Karthik",
    "tasks": [
      "Match tool categories to purposes",
      "Trace one endpoint alert across tools",
      "Compare office IT and OT priorities",
      "Complete safety-first escalation checklist"
    ],
    "outcome": "Tool-to-purpose map and OT-safe checklist.",
    "evidence": "Learner submits checklist."
  },
  {
    "id": "LAB-29",
    "moduleId": "11",
    "module": "Identity, Email & Threat Intelligence",
    "title": "Inspect a suspicious email safely",
    "format": "Simulated Lab",
    "duration": 55,
    "tools": "Sample .eml; text viewer; screenshots",
    "objective": "Review sender, reply-to, URLs and attachment names without opening files.",
    "mentor": "Meera",
    "tasks": [
      "Compare From and Reply-To",
      "Inspect URL text without visiting",
      "Record attachment names",
      "Identify two indicators"
    ],
    "outcome": "Email triage worksheet.",
    "evidence": "Learner submits email worksheet."
  },
  {
    "id": "LAB-30",
    "moduleId": "11",
    "module": "Identity, Email & Threat Intelligence",
    "title": "Review identity sign-in records",
    "format": "Simulated Lab",
    "duration": 55,
    "tools": "Sign-in CSV/JSON; spreadsheet",
    "objective": "Check identity context and authentication details.",
    "mentor": "Meera",
    "tasks": [
      "Find user, IP, and time",
      "Check MFA and outcome fields",
      "Compare with expected user context",
      "Write cautious assessment"
    ],
    "outcome": "Identity triage note.",
    "evidence": "Learner submits identity note."
  },
  {
    "id": "LAB-31",
    "moduleId": "11",
    "module": "Identity, Email & Threat Intelligence",
    "title": "Enrich sample indicators",
    "format": "Simulated Lab",
    "duration": 60,
    "tools": "MITRE ATT&CK; URLhaus; VirusTotal optional",
    "objective": "Check an indicator using trusted sources and note limitations.",
    "mentor": "Meera",
    "tasks": [
      "Identify indicator type",
      "Check approved source or offline snapshot",
      "Record source and lookup time",
      "Rate confidence with a caveat"
    ],
    "outcome": "IOC enrichment table with source and confidence.",
    "evidence": "Learner submits IOC table."
  },
  {
    "id": "LAB-32",
    "moduleId": "11",
    "module": "Identity, Email & Threat Intelligence",
    "title": "Create a phishing handoff",
    "format": "Simulated Lab",
    "duration": 70,
    "tools": "Sample email, sign-in logs, case template",
    "objective": "Combine email and identity evidence into one concise handoff.",
    "mentor": "Meera",
    "tasks": [
      "Summarize the report",
      "List indicators and evidence",
      "Connect identity context only when supported",
      "Recommend escalation or closure"
    ],
    "outcome": "Phishing case note with references.",
    "evidence": "Learner submits case note."
  },
  {
    "id": "LAB-33",
    "moduleId": "12",
    "module": "SOAR & Basic SOC Automation",
    "title": "Map a safe triage playbook",
    "format": "Simulated Lab",
    "duration": 65,
    "tools": "draw.io; playbook cards",
    "objective": "Arrange a simple enrichment and notification workflow.",
    "mentor": "Karthik",
    "tasks": [
      "Place trigger and inputs",
      "Add enrichment step",
      "Add analyst approval gate",
      "Add outcome and audit record"
    ],
    "outcome": "Playbook diagram with human approval gate.",
    "evidence": "Learner submits playbook diagram."
  },
  {
    "id": "LAB-34",
    "moduleId": "12",
    "module": "SOAR & Basic SOC Automation",
    "title": "Test playbook branches",
    "format": "Simulated Lab",
    "duration": 55,
    "tools": "Scenario JSON/CSV; playbook logic",
    "objective": "Check benign and suspicious paths in a mock workflow.",
    "mentor": "Karthik",
    "tasks": [
      "Run through two supplied cases",
      "Choose branch conditions",
      "Identify a failure case",
      "Add a guardrail"
    ],
    "outcome": "Decision table and guardrail notes.",
    "evidence": "Learner submits decision table."
  },
  {
    "id": "LAB-35",
    "moduleId": "13",
    "module": "MITRE ATT&CK for L1 Analysts",
    "title": "Map observed behavior to ATT&CK",
    "format": "Simulated Lab",
    "duration": 65,
    "tools": "MITRE ATT&CK website; behavior cards",
    "objective": "Map an observation to a plausible technique using evidence.",
    "mentor": "Ananya",
    "tasks": [
      "Read observed behavior",
      "Find relevant ATT&CK technique",
      "Record supporting evidence",
      "Write one uncertainty"
    ],
    "outcome": "Technique mapping worksheet.",
    "evidence": "Learner submits mapping worksheet."
  },
  {
    "id": "LAB-36",
    "moduleId": "13",
    "module": "MITRE ATT&CK for L1 Analysts",
    "title": "Prepare an ATT&CK handoff",
    "format": "Simulated Lab",
    "duration": 55,
    "tools": "Alert narrative; ATT&CK Navigator optional",
    "objective": "Communicate behavior and mapping without overclaiming.",
    "mentor": "Ananya",
    "tasks": [
      "Summarize observed behavior",
      "Add technique only if supported",
      "Cite evidence",
      "State what is not yet known"
    ],
    "outcome": "One-page evidence-led summary.",
    "evidence": "Learner submits summary."
  },
  {
    "id": "LAB-37",
    "moduleId": "14",
    "module": "Incident Response & SOC Documentation",
    "title": "Create an incident timeline",
    "format": "Simulated Lab",
    "duration": 55,
    "tools": "Provided logs; timeline template",
    "objective": "Build a chronological record with references.",
    "mentor": "Ananya & Meera",
    "tasks": [
      "Order records and normalize timezone",
      "Add source references",
      "Separate facts from assumptions"
    ],
    "outcome": "Timeline suitable for case review.",
    "evidence": "Learner submits timeline file."
  },
  {
    "id": "LAB-38",
    "moduleId": "14",
    "module": "Incident Response & SOC Documentation",
    "title": "Complete a case record in TheHive",
    "format": "Live VM",
    "duration": 90,
    "tools": "TheHive Community Edition / local sandbox",
    "objective": "Populate a basic case record using supplied evidence.",
    "mentor": "Ananya & Meera",
    "tasks": [
      "Create/open the case",
      "Add summary and observables",
      "Record evidence and assessment",
      "Set status/owner and next step"
    ],
    "outcome": "Completed case record with evidence and disposition.",
    "evidence": "Learner submits case record export."
  },
  {
    "id": "LAB-39",
    "moduleId": "14",
    "module": "Incident Response & SOC Documentation",
    "title": "Practice escalation and closure",
    "format": "Simulated Lab",
    "duration": 60,
    "tools": "Escalation policy; scenario cards",
    "objective": "Route a case to the right owner and document why.",
    "mentor": "Ananya & Meera",
    "tasks": [
      "Select receiving team",
      "Attach key facts and timeline",
      "State reason and urgency",
      "Record outstanding questions"
    ],
    "outcome": "Escalation/closure decision and rationale.",
    "evidence": "Learner submits decision artifact."
  },
  {
    "id": "LAB-40",
    "moduleId": "14",
    "module": "Incident Response & SOC Documentation",
    "title": "Shift handover simulation",
    "format": "Simulated Lab",
    "duration": 75,
    "tools": "Three learning cases; handover template",
    "objective": "Prioritize open cases and hand over work clearly.",
    "mentor": "Ananya & Meera",
    "tasks": [
      "Review three open cases",
      "Order by urgency using policy",
      "Record owner and status",
      "Write next action for each"
    ],
    "outcome": "Concise shift handover summary.",
    "evidence": "Learner submits handover summary."
  }
];

export function normalizeV2Chapter(
  raw: any,
  unit?: V2Unit,
  module?: V2Module,
  chapterIndex: number = 0
): V2ChapterNormalized {
  if (!raw) {
    return {
      id: 'chapter-default',
      chapterNumber: 1,
      title: 'Chapter Overview',
      duration: 15,
      xpReward: 35,
      mentor: module?.mentor || 'Ananya',
      mentorRole: module?.mentorRole || 'Experienced L1 Analyst',
      story: module?.story || '',
      section1_theory: {
        title: 'Core Concept',
        subtitle: 'Foundational Knowledge',
        content: 'Content loading...',
        keyTakeaway: 'Always verify telemetry before escalating.',
        cdacScenario: '',
      },
      section2_visual: {
        title: 'Visual Walkthrough',
        visualType: 'animated-story',
        description: 'Visual walkthrough of concepts.',
        steps: [],
        optionalScreenshots: [],
      },
      section3_interactive: {
        title: 'Interactive Activity',
        type: 'matching',
        instructions: 'Match the terms.',
        items: [],
      },
      section4_knowledgeCheck: {
        title: 'Knowledge Check',
        questions: [],
      },
    };
  }

  const mentor = raw.mentor || module?.mentor || 'Ananya';
  const mentorRole = raw.mentorRole || module?.mentorRole || 'Experienced L1 Analyst';
  const story = raw.story || module?.story || 'CDAC Bengaluru SOC shift operation';
  const chapterNumber = raw.chapterNumber || chapterIndex + 1;
  const duration = raw.duration || 15;
  const xpReward = raw.xpReward || 35;

  // Compute intelligent scaffolding and concept process context for this chapter
  const scaffolding = getChapterScaffolding(
    raw.id,
    raw.title,
    raw.concept,
    unit?.title,
    module?.title
  );

  // 1. Section 1: Theory
  const section1_theory: ChapterSection1Theory = {
    title: raw.section1_theory?.title || raw.title,
    subtitle: raw.section1_theory?.subtitle || 'Operational Concept & Triage Protocols',
    content:
      raw.section1_theory?.content ||
      raw.concept ||
      `In this chapter at CDAC Bengaluru SOC, analysts explore the core principles of ${raw.title}. Grounded in active shift protocols, analysts learn to identify relevant observables, interpret telemetry feeds, and apply structured playbooks to maintain continuous 24/7 visibility without succumbing to alert fatigue.`,
    keyTakeaway:
      raw.section1_theory?.keyTakeaway ||
      'Correlate host telemetry with network timestamps before formulating an incident verdict.',
    cdacScenario:
      raw.section1_theory?.cdacScenario ||
      story ||
      'Active triage shift at CDAC Bengaluru SOC.',
    audioUrl: raw.section1_theory?.audioUrl || '',
    audioDuration: raw.section1_theory?.audioDuration || `${duration} min`,
    audioAutoplay: raw.section1_theory?.audioAutoplay ?? false,
    mentor: raw.section1_theory?.mentor || mentor,
    mentorRole: raw.section1_theory?.mentorRole || mentorRole,
    formalDefinitions: raw.section1_theory?.formalDefinitions || [],
    extraBoxes: raw.section1_theory?.extraBoxes || [],
    elementOrder: raw.section1_theory?.elementOrder || [
      'title',
      'mentor',
      'cdacScenario',
      'content',
      'instructionalContext',
      'terminologyScaffolding',
      'keyTakeaway',
      'formalDefinitions',
      'extraBoxes',
    ],
    styleOverride: raw.section1_theory?.styleOverride,
    terminologyScaffolding: raw.section1_theory?.terminologyScaffolding || scaffolding.terminologyScaffolding,
    instructionalContext: raw.section1_theory?.instructionalContext || scaffolding.instructionalContext,
  };

  const spec = CHAPTER_V2_SPECS[raw.id];

  // 2. Section 2: Visual Walkthrough
  const defaultVisualSteps: VisualStep[] = [
    {
      id: 1,
      stage: 'Initial Ingestion',
      title: 'Telemetry Event Captured',
      description: `Sensor records an observable event related to ${raw.title}. Timestamp and source entity are parsed into the unified event schema.`,
      telemetrySnippet: `SRC: 10.0.4.15 | SENSOR: Perimeter-Zeek-01 | ACTION: ALERT | TOPIC: ${raw.title}`,
      highlightText: 'Sensor Ingestion',
    },
    {
      id: 2,
      stage: 'Correlation',
      title: 'Context & Identity Resolution',
      description: 'Host, user account, and network segment context are matched against authoritative assets directory to determine operational criticality.',
      telemetrySnippet: 'Host Name: CDAC-BLR-WS-08 | IP: 10.0.4.15 | User: b_sharma@cdac.in | Domain: CDAC-BLR-DC01 | Role: Workstation',
      highlightText: 'Asset Resolution',
    },
    {
      id: 3,
      stage: 'Validation',
      title: 'Playbook Verification Checklist',
      description: 'Standard Operating Procedures (SOP) are verified step-by-step to distinguish benign administrative tasks from unauthorized anomalies.',
      telemetrySnippet: 'CHECKLIST: Verifying parent process, command-line arguments, and destination reputation.',
      highlightText: 'SOP Verification',
    },
    {
      id: 4,
      stage: 'Handoff',
      title: 'Documentation & Escalation Package',
      description: 'Findings are consolidated into the shift ticket with normalized UTC timestamps, verified observables, and handoff recommendations.',
      telemetrySnippet: 'TICKET: SOC-CDAC-2026 | STATUS: Triaged | DISPOSITION: Verified Observables Attached',
      highlightText: 'Shift Package',
    },
  ];

  const section2_visual: ChapterSection2Visual = {
    title: raw.section2_visual?.title || spec?.section2.title || `${raw.title} — Visual & Telemetry Walkthrough`,
    visualType: raw.section2_visual?.visualType || spec?.section2.visualType || 'animated-story',
    description:
      raw.section2_visual?.description ||
      spec?.section2.description ||
      raw.visualDesc ||
      'Step-by-step visual demonstration of telemetry indicators observed during active operations.',
    steps:
      raw.section2_visual?.steps && raw.section2_visual.steps.length > 0
        ? raw.section2_visual.steps
        : (spec?.section2.steps || defaultVisualSteps),
    optionalScreenshots: raw.section2_visual?.optionalScreenshots || [],
    audioUrl: raw.section2_visual?.audioUrl || '',
    audioDuration: raw.section2_visual?.audioDuration || `${duration} min`,
    audioAutoplay: raw.section2_visual?.audioAutoplay ?? false,
    extraBoxes: raw.section2_visual?.extraBoxes || [],
    elementOrder: raw.section2_visual?.elementOrder || [
      'title',
      'description',
      'visualDisplay',
      'extraBoxes',
      'audio',
    ],
    styleOverride: raw.section2_visual?.styleOverride,
  };

  // 3. Section 3: Interactive Activity
  const defaultInteractiveItems: InteractiveItem[] = [
    {
      id: 'act-1',
      label: 'Telemetry Inspection',
      summary: 'Verify event timestamps and source host identity against active directory logs.',
      category: 'Triage',
    },
    {
      id: 'act-2',
      label: 'Playbook Cross-Check',
      summary: 'Review standard operating procedure steps to establish whether behavior is baseline or anomalous.',
      category: 'Verification',
    },
    {
      id: 'act-3',
      label: 'Case Documentation',
      summary: 'Log the 5 Ws (Who, What, When, Where, Why) clearly in the ticketing system for peer review.',
      category: 'Documentation',
    },
  ];

  const section3_interactive: ChapterSection3Interactive = {
    title: raw.section3_interactive?.title || spec?.section3.title || 'Interactive Investigation Activity',
    type: raw.section3_interactive?.type || spec?.section3.type || 'matching',
    instructions:
      raw.section3_interactive?.instructions ||
      spec?.section3.instructions ||
      raw.interactiveDesc ||
      'Inspect the operational scenario and match the key observation to its corresponding analyst triage action.',
    scenario: raw.section3_interactive?.scenario || spec?.section3.scenario || 'Active shift queue triage at CDAC Bengaluru SOC.',
    items:
      raw.section3_interactive?.items && raw.section3_interactive.items.length > 0
        ? raw.section3_interactive.items
        : (spec?.section3.items || defaultInteractiveItems),
    audioUrl: raw.section3_interactive?.audioUrl || '',
    audioAutoplay: raw.section3_interactive?.audioAutoplay ?? false,
    extraBoxes: raw.section3_interactive?.extraBoxes || [],
    elementOrder: raw.section3_interactive?.elementOrder || [
      'title',
      'instructions',
      'interactiveEngine',
      'extraBoxes',
    ],
    styleOverride: raw.section3_interactive?.styleOverride,
  };

  // 4. Section 4: Knowledge Check
  const rawQuestions =
    raw.section4_knowledgeCheck?.questions ||
    raw.questions ||
    [];

  const questions: QuestionItem[] =
    rawQuestions.length > 0
      ? rawQuestions.map((q: any, i: number) => ({
          id: q.id || `q-${raw.id}-${i}`,
          type: q.type || 'mcq',
          question: q.question,
          options: q.options || [],
          correctAnswer: q.correctAnswer !== undefined ? q.correctAnswer : 0,
          explanation: q.explanation || 'Verified as standard CDAC Bengaluru SOC operational practice.',
          matchingPairs: q.matchingPairs || [],
          dragDropItems: q.dragDropItems || [],
          acceptedAnswers: q.acceptedAnswers || [],
          caseSensitive: q.caseSensitive ?? false,
        }))
      : [
          {
            id: `q-${raw.id}-0`,
            type: 'mcq',
            question: `What is the analyst's primary objective when investigating ${raw.title}?`,
            options: [
              'Gather verifiable facts, correlate across telemetry sources, and follow standard checklists',
              'Immediately delete all logs to prevent alert queue overflow',
              'Assume the alert is harmless without reviewing evidence',
              'Shut down the core firewall without manager notification',
            ],
            correctAnswer: 0,
            explanation:
              'A Level 1 SOC Analyst focuses on calm, methodical fact verification and following standardized playbooks.',
          },
        ];

  const section4_knowledgeCheck: ChapterSection4KnowledgeCheck = {
    title: raw.section4_knowledgeCheck?.title || 'Knowledge Check',
    questions,
    audioUrl: raw.section4_knowledgeCheck?.audioUrl || '',
    audioAutoplay: raw.section4_knowledgeCheck?.audioAutoplay ?? false,
    extraBoxes: raw.section4_knowledgeCheck?.extraBoxes || [],
    elementOrder: raw.section4_knowledgeCheck?.elementOrder || [
      'title',
      'questions',
      'extraBoxes',
    ],
    styleOverride: raw.section4_knowledgeCheck?.styleOverride,
  };

  return {
    id: raw.id,
    chapterNumber,
    title: raw.title,
    duration,
    xpReward,
    mentor,
    mentorRole,
    story,
    section1_theory,
    section2_visual,
    section3_interactive,
    section4_knowledgeCheck,
  };
}

