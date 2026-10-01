import { VisualStoryStep } from '@/components/learning/visual-story-demo';
import { InvestigationEvidenceCard } from '@/components/learning/interactive-investigation';
import { DragDropItem } from '@/components/learning/drag-drop-check';
import { MatchPair } from '@/components/learning/matching-check-shuffled';
import { TriageScenario } from '@/components/learning/tp-fp-triage';
import { TopicContent, UnitStructure } from './module-04-units';

export const MODULE_00_UNITS: UnitStructure[] = [
  // =========================================================================
  // UNIT 1: The Non-IT Primer: Demystifying Cybersecurity & The SOC
  // =========================================================================
  {
    id: 'unit-0-1',
    unitNumber: 1,
    title: 'Unit 1: The Non-IT Primer — Demystifying Cybersecurity & The Digital Guard',
    description: 'Welcome! No computer science degree or coding background needed. Learn what we do using everyday Indian analogies (Society Watchman, Swiggy delivery, ATM receipts), demystify tech words, and stay calm with the Burnt Toast rule.',
    estimatedHours: 0.5,
    topics: [
      {
        id: 'topic-0-1-1',
        unitId: 'unit-0-1',
        title: 'Chapter 1: The Digital Society Watchman (What Do We Do?)',
        order: 1,
        estimatedMinutes: 8,
        xpReward: 35,
        theory: {
          summaryLines: [
            'A Security Operations Center (SOC) is the central monitoring control room that protects an organization from digital threats 24/7/365.',
            'Think of a SOC like airport security or a modern office building control center: security cameras monitor doors, sensors detect smoke, and guards respond if an unauthorized person tries to enter.',
            'As an L1 SOC Analyst, you are the digital security guard watching incoming alerts on computer screens to verify whether activity is normal or suspicious.',
            'You do NOT need a computer science degree, math background, or hacking skills to excel—the job relies on curiosity, keen observation, and following clear checklists.',
            'When an alarm sounds, your job is simple: inspect the facts, ask who did what and when, determine if it is harmless or dangerous, and take the right action.'
          ],
          knowMore: {
            title: 'CISA: What is a Security Operations Center?',
            description: 'The Cybersecurity and Infrastructure Security Agency explains how modern organizations organize defense teams to safeguard everyday operations.',
            externalUrl: 'https://www.cisa.gov/resources-tools/services',
            externalLabel: 'CISA SOC Overview'
          }
        },
        demo: {
          title: 'Physical World vs Digital World: The Security Guard Analogy',
          subtitle: 'See how a physical building break-in maps directly to digital cyber defense.',
          steps: [
            {
              id: 1,
              stage: '1. The Asset',
              iconName: 'server',
              title: 'The Protected Building vs The Corporate Server',
              description: 'In the physical world, a bank has a vault holding cash. In the digital world, a hospital or bank has servers holding customer records and financial data.',
              telemetrySnippet: 'ASSET: Main Customer Database Server | Location: Headquarters Data Center | Status: Protected',
              highlightText: 'Every organization has high-value digital assets they must keep safe.'
            },
            {
              id: 2,
              stage: '2. The Intruder',
              iconName: 'attacker',
              title: 'The Lockpicker vs The Password Guesser',
              description: 'A physical burglar tries jiggling the back door lock at 2:00 AM. A cyber attacker uses software across the ocean to try guessing employee passwords repeatedly.',
              telemetrySnippet: 'ACTIVITY: 25 failed password attempts within 40 seconds from external IP address.',
              highlightText: 'Intruders in both worlds try doors until they find an open or weak lock.'
            },
            {
              id: 3,
              stage: '3. The Sensor Alarm',
              iconName: 'siem',
              title: 'The Motion Sensor Trips vs An Alert is Generated',
              description: 'The physical building sensor detects motion and turns on a flashing red light. The digital monitoring system detects 25 failed logins and triggers an Alert.',
              telemetrySnippet: 'ALERT: Multiple Failed Logins Detected (Event ID 4625) | Severity: Medium | Queue: New',
              highlightText: 'The alarm does not mean disaster—it simply means a human needs to look.'
            },
            {
              id: 4,
              stage: '4. The Human Check',
              iconName: 'analyst',
              title: 'The Guard Checks CCTV vs The Analyst Reviews the Alert',
              description: 'The security guard reviews the CCTV camera to see if it is a stray cat or a real burglar. The SOC analyst checks if the user is a legitimate employee who forgot their password or an external hacker.',
              telemetrySnippet: 'ANALYST REVIEW: User "sarah.finance" is on approved leave; source location is foreign country. Conclusion: Imposter.',
              highlightText: 'Human judgment is the core superpower of every SOC analyst.'
            },
            {
              id: 5,
              stage: '5. The Response',
              iconName: 'endpoint',
              title: 'Locking the Door & Escalating',
              description: 'The guard bolts the door and notifies the police. The SOC analyst temporarily locks the account, prevents further attempts, and alerts the incident response team.',
              telemetrySnippet: 'ACTION: Account Locked | Firewall Rule Created | Escalation Ticket #2026-01 Submitted',
              highlightText: 'Quick, calm action protects the organization before any harm is done.'
            }
          ]
        },
        interactive: {
          title: 'Everyday Analogy Matcher',
          scenario: 'Match everyday physical security concepts to their digital cybersecurity equivalents.',
          cards: [
            {
              id: 'ev-soc-1',
              category: 'User',
              label: 'Building Security Guard',
              summary: 'Monitors the entrance lobby, checks visitor badges, and investigates alarms.',
              detailedFindings: 'Digital Equivalent: Tier 1 (L1) SOC Analyst. You monitor the alert dashboard, verify user actions, and escalate real threats.',
              severityIndicator: 'Normal'
            },
            {
              id: 'ev-soc-2',
              category: 'Event ID',
              label: 'Lobby Visitor Sign-in Register',
              summary: 'A paper book where every guest writes down their name, timestamp, and purpose of visit.',
              detailedFindings: 'Digital Equivalent: Computer Security Log (Event Log). A digital record created every time someone logs in, opens a file, or connects to a network.',
              severityIndicator: 'Normal'
            },
            {
              id: 'ev-soc-3',
              category: 'Timeline',
              label: 'Building Smoke Detector Alarm',
              summary: 'Emits a loud beep whenever smoke particles pass its internal optical sensor.',
              detailedFindings: 'Digital Equivalent: SIEM Security Alert. Software that rings an alarm whenever a suspicious pattern occurs, like 20 wrong passwords in 10 seconds.',
              severityIndicator: 'Suspicious'
            },
            {
              id: 'ev-soc-4',
              category: 'Source IP',
              label: 'Locked Vault with Guard Dog',
              summary: 'High-security room containing diamonds or company trade secrets with restricted keycard access.',
              detailedFindings: 'Digital Equivalent: Corporate Database Server. High-value computer storing customer records, guarded by firewalls and encryption.',
              severityIndicator: 'Normal'
            }
          ]
        },
        socContext: {
          title: 'Why Non-IT Professionals Make Incredible SOC Analysts',
          scenario: 'Thousands of successful SOC analysts started as nurses, customer support agents, retail managers, administrative assistants, teachers, and warehouse supervisors. Why? Because the skills that make a great analyst are NOT memorizing code—they are communication, attention to detail, empathy, and pattern recognition.',
          analystMindset: 'Do not let technical terms intimidate you. Every complex computer system was built by humans to perform everyday tasks: sending messages, storing files, and checking identities. If you can follow a cooking recipe or assemble furniture with an instruction booklet, you can master SOC analysis.',
          bestPractices: [
            'Stay curious: Always ask "Does this activity make sense for this person at this time of day?"',
            'Follow the playbook: You never have to guess—the SOC provides step-by-step checklists (SOPs) for every common scenario.',
            'Never hesitate to ask questions: Great SOC teams collaborate and mentor junior analysts constantly.',
            'Take it one concept at a time: Master the plain English concept before worrying about technical acronyms.'
          ]
        },
        knowledgeCheck: {
          matching: {
            title: 'Match the Physical World to the Digital SOC',
            instructions: 'Pair each physical security concept on the left with its digital cybersecurity equivalent on the right.',
            pairs: [
              { id: 'p1', left: 'Lobby Visitor Logbook', right: 'Computer Event Logs' },
              { id: 'p2', left: 'Building Smoke Detector Alarm', right: 'SIEM Security Alert' },
              { id: 'p3', left: 'Security Guard in Control Room', right: 'L1 SOC Analyst' },
              { id: 'p4', left: 'Bank Vault with Cash', right: 'Database Server with Customer Data' }
            ],
            explanation: 'Just like a physical building relies on guards, alarms, and visitor books, a digital network relies on analysts, alerts, and event logs!'
          }
        }
      },
      {
        id: 'topic-0-1-2',
        unitId: 'unit-0-1',
        title: 'Chapter 2: Module 04 Vocabulary Decoder (Every Term in Plain English)',
        order: 2,
        estimatedMinutes: 10,
        xpReward: 35,
        theory: {
          summaryLines: [
            'Tech terminology often sounds intimidating, but every term is just a fancy label for a simple, everyday concept.',
            'IP Address: Just like your home has a postal street address (123 Maple Street) and your phone has a phone number, every computer on the internet has a unique numerical address (e.g. 192.168.1.10).',
            'Server: A server is simply a computer that never turns off and provides a service to others—like a central restaurant kitchen making meals for dining tables.',
            'Log File: A digital receipt or diary entry. Every time a computer boots up, a user logs in, or a file is opened, the system writes down: Who, What, Where, and When.',
            'Port Number: If an IP address is a large apartment building, the Port is the specific apartment room number (Room 80 for websites, Room 443 for secure websites, Room 22 for remote administration).'
          ],
          knowMore: {
            title: 'Khan Academy: How the Internet Works',
            description: 'Free, beginner-friendly visual guide explaining IP addresses, packets, and how computers communicate across the globe.',
            externalUrl: 'https://www.khanacademy.org/computing/computers-and-internet/xcae6f4a7ff015e7d:the-internet',
            externalLabel: 'Khan Academy Internet Guide'
          }
        },
        demo: {
          title: 'The Digital Post Office: How Data Travels',
          subtitle: 'Watch how an email or file travels across the world just like a stamped letter.',
          steps: [
            {
              id: 1,
              stage: '1. Writing the Letter',
              iconName: 'endpoint',
              title: 'Writing Data on Your Computer',
              description: 'You type an email or click a link. Your computer packages this message into small digital envelopes called "Packets".',
              telemetrySnippet: 'PACKET: Source: 10.0.0.15 (Your Laptop) | Destination: 93.184.216.34 (Website)',
              highlightText: 'Every piece of digital information is broken into small, numbered envelopes called packets.'
            },
            {
              id: 2,
              stage: '2. Return & Delivery Address',
              iconName: 'endpoint',
              title: 'Addressing with IP Addresses',
              description: 'Just like putting sender and recipient addresses on an envelope, every packet stamps your IP address (source) and the target server IP address (destination).',
              telemetrySnippet: 'HEADER: SRC_IP: 192.168.1.50 -> DST_IP: 204.79.197.200 | PORT: 443 (Secure Web)',
              highlightText: 'Computers route information using IP addresses and port numbers.'
            },
            {
              id: 3,
              stage: '3. Postal Sorting Hubs',
              iconName: 'server',
              title: 'Routers & The Internet Highway',
              description: 'Postal sorting centers read the zip code and pass the envelope along trucks. Internet Routers read the IP address and pass the packets along fiber cables in milliseconds.',
              telemetrySnippet: 'ROUTING: Hop 1 (Home Gateway) -> Hop 2 (ISP Core) -> Hop 3 (Cloud Data Center)',
              highlightText: 'Routers are the digital postal sorting hubs of the global internet.'
            },
            {
              id: 4,
              stage: '4. Arrival & Delivery',
              iconName: 'server',
              title: 'The Server Opens the Envelopes',
              description: 'The destination server receives all the packets, reassembles them in order, and delivers the web page or stores the email.',
              telemetrySnippet: 'STATUS: HTTP 200 OK | Payload Delivered | Connection Closed Gracefully',
              highlightText: 'When all packets arrive, the destination computer reads the full message.'
            },
            {
              id: 5,
              stage: '5. The Delivery Receipt',
              iconName: 'analyst',
              title: 'The Log is Created',
              description: 'Both computers write a diary entry in their log files: "At 14:02:11, IP 192.168.1.50 accessed web page /login.html". As an analyst, this log is the evidence you read!',
              telemetrySnippet: 'LOG ENTRY: 2026-10-01 14:02:11 [INFO] WebServer: Successful connection from 192.168.1.50 to port 443',
              highlightText: 'Logs are the breadcrumbs and receipts that allow analysts to reconstruct history.'
            }
          ]
        },
        interactive: {
          title: 'Jargon Translator (Click to Decode)',
          scenario: 'Inspect common IT buzzwords and see their plain English translation and real-world analogy.',
          cards: [
            {
              id: 'ev-jargon-1',
              category: 'Source IP',
              label: 'IP Address (Internet Protocol Address)',
              summary: 'A set of numbers like 192.168.1.25 or 142.250.190.46.',
              detailedFindings: 'Plain English: Your computer\'s phone number or home postal address. Without it, the internet wouldn\'t know where to send your web pages and emails.',
              severityIndicator: 'Normal'
            },
            {
              id: 'ev-jargon-2',
              category: 'Event ID',
              label: 'Log / Telemetry',
              summary: 'Lines of text generated by operating systems recording activity.',
              detailedFindings: 'Plain English: A cash register receipt or airplane black box. It proves who did what, on which machine, at what exact second.',
              severityIndicator: 'Normal'
            },
            {
              id: 'ev-jargon-3',
              category: 'User',
              label: 'Port Number',
              summary: 'A number between 1 and 65535 attached to an IP address (e.g., :80, :443, :22).',
              detailedFindings: 'Plain English: Apartment room numbers in a building. The IP is the street building; Port 80 is the front lobby, Port 443 is the secure bank vault room.',
              severityIndicator: 'Normal'
            },
            {
              id: 'ev-jargon-4',
              category: 'Timeline',
              label: 'Firewall',
              summary: 'A digital gatekeeper inspecting all incoming and outgoing connections.',
              detailedFindings: 'Plain English: The security guard booth at the entrance of a gated community. If your car doesn\'t have an approved pass, you are turned away.',
              severityIndicator: 'Normal'
            }
          ]
        },
        socContext: {
          title: 'How Analysts Read Technical Data Without Being Programmers',
          scenario: 'When you open a security alert, you do not write software code. You look at structured fields: "Source IP", "Destination IP", "User Name", "Timestamp", and "Action". Think of it like reading an itemized restaurant bill or an airline boarding pass.',
          analystMindset: 'Always look for the story behind the data: "Who is the user? Where did they connect from? Did they succeed or fail? What time did it happen?" If an accountant from London is logging in at 3:00 AM from a computer in an unfamiliar country, common sense tells you something is wrong.',
          bestPractices: [
            'Look at the Timestamp first: Was this action performed during normal business hours or in the middle of the night?',
            'Check the User Account: Is this a regular employee, an IT administrator, or a service account?',
            'Verify the IP Address: Is it an internal office IP (safe) or an unfamiliar public IP from abroad (suspicious)?',
            'Trust your everyday intuition: If something looks odd, investigate further according to standard procedure.'
          ]
        },
        knowledgeCheck: {
          matching: {
            title: 'Match Tech Terms to Everyday Objects',
            instructions: 'Match the technical term on the left with its real-world analogy on the right.',
            pairs: [
              { id: 't1', left: 'IP Address', right: 'Home Postal Address / Phone Number' },
              { id: 't2', left: 'Port Number', right: 'Apartment Room Door Number' },
              { id: 't3', left: 'Log File', right: 'Cash Register Receipt / Diary Entry' },
              { id: 't4', left: 'Firewall', right: 'Gated Community Security Booth' }
            ],
            explanation: 'Great job! Once you realize tech terms are just everyday objects with digital names, cybersecurity becomes intuitive and accessible.'
          }
        }
      },
      {
        id: 'topic-0-1-3',
        unitId: 'unit-0-1',
        title: 'Chapter 3: Burnt Toast vs Real Fire (The Triage Secret)',
        order: 3,
        estimatedMinutes: 10,
        xpReward: 35,
        theory: {
          summaryLines: [
            'Cyber threats are not movie-style magic; they are simple tricks designed to bypass locks or trick humans into opening doors.',
            'Phishing: A fraudulent email or message disguised as a trusted friend, bank, or colleague asking you to click a link or reveal a password—like a scammer wearing a fake courier uniform.',
            'Malware (Malicious Software): Unwanted computer programs (viruses, spyware, trojans) that sneak onto a computer to spy on keystrokes, steal files, or give an attacker remote control.',
            'Ransomware: A specific type of malware that locks and encrypts all company documents with a digital padlock, demanding money (ransom) to unlock them.',
            'In a SOC, your alerts help catch these threats early—stopping a phishing email before an employee clicks, or quarantining malware before it can spread.'
          ],
          knowMore: {
            title: 'FTC Consumer Advice: How to Recognize and Avoid Phishing',
            description: 'The Federal Trade Commission provides clear, visual examples of real-world phishing lures and deceptive tactics.',
            externalUrl: 'https://consumer.ftc.gov/articles/how-recognize-and-avoid-phishing-scams',
            externalLabel: 'FTC Phishing Guide'
          }
        },
        demo: {
          title: 'The Anatomy of a Phishing Attack',
          subtitle: 'Follow the lifecycle of how an attacker tries to trick an office employee and how the SOC catches it.',
          steps: [
            {
              id: 1,
              stage: '1. The Bait',
              iconName: 'attacker',
              title: 'The Fake Email Arrives',
              description: 'An attacker crafts an email that looks identical to a Microsoft Office 365 password reset, urging "Your password expires in 15 minutes! Click here to keep it active."',
              telemetrySnippet: 'EMAIL: From: support@micros0ft-security-notice.com | Subject: URGENT: Password Expiring | Links: 1',
              highlightText: 'Attackers use urgency and fear to make people act without thinking.'
            },
            {
              id: 2,
              stage: '2. The Human Trap',
              iconName: 'endpoint',
              title: 'The Employee Clicks',
              description: 'A busy employee named John clicks the link. A fake login screen opens asking for his username and password.',
              telemetrySnippet: 'BROWSER EVENT: Outbound HTTP GET tohxxp://micros0ft-security-notice[.]com/login.php',
              highlightText: 'The fake website steals John\'s credentials as soon as he types them.'
            },
            {
              id: 3,
              stage: '3. The Intrusion Attempt',
              iconName: 'attacker',
              title: 'Attacker Tries to Log In',
              description: 'Within 5 minutes, the attacker in another country uses John\'s stolen password to log into the corporate email portal.',
              telemetrySnippet: 'AUTH: User: john.doe@company.com | IP: 185.220.101.5 (Known VPN Proxy) | Result: Success',
              highlightText: 'The attacker attempts to blend in using legitimate stolen credentials.'
            },
            {
              id: 4,
              stage: '4. The Alarm Rings',
              iconName: 'siem',
              title: 'Impossible Travel Alert Fires',
              description: 'The SOC detection engine notices John logged in from New York 10 minutes ago, and now logged in from an overseas server. It generates an "Impossible Travel" alert!',
              telemetrySnippet: 'ALERT: Impossible Travel Anomaly | User: john.doe | Distance: 4,500 miles in 10 mins | Severity: High',
              highlightText: 'A human cannot fly 4,500 miles in 10 minutes—this is a clear giveaway!'
            },
            {
              id: 5,
              stage: '5. The SOC Intercepts',
              iconName: 'analyst',
              title: 'Analyst Quarantines the Threat',
              description: 'The L1 analyst sees the alert, resets John\'s password immediately, terminates the attacker\'s active session, and saves the day!',
              telemetrySnippet: 'INCIDENT ACTION: Active Session Revoked | Password Reset Triggered | IP Blacklisted on Firewall',
              highlightText: 'Fast triage prevents the attacker from accessing customer data.'
            }
          ]
        },
        interactive: {
          title: 'Threat Detective: Spot the Red Flags',
          scenario: 'Inspect 4 security findings and identify the suspicious indicators.',
          cards: [
            {
              id: 'ev-threat-1',
              category: 'User',
              label: 'Suspicious Email Sender',
              summary: 'Email from: "billing-paypal-support@gmail.com" with subject "Urgent: Account Suspended".',
              detailedFindings: 'Red Flag: A major corporation like PayPal will never send official account notices from a free public @gmail.com address. This is a classic phishing lure.',
              severityIndicator: 'Malicious'
            },
            {
              id: 'ev-threat-2',
              category: 'Timeline',
              label: 'Urgent Tone & Threat of Penalty',
              summary: '"You have 2 hours to confirm your bank info or your account will be permanently deleted!"',
              detailedFindings: 'Red Flag: Psychological pressure. Scammers want you in a state of panic so you don\'t stop to verify with your IT department.',
              severityIndicator: 'Suspicious'
            },
            {
              id: 'ev-threat-3',
              category: 'Event ID',
              label: 'Deceptive Hyperlink URL',
              summary: 'Text says "www.chase.com", but hovering over the button reveals the true link: "www.chase-login-verify99.ru".',
              detailedFindings: 'Red Flag: Domain spoofing. The actual destination website is registered in another country and is completely unrelated to Chase Bank.',
              severityIndicator: 'Malicious'
            },
            {
              id: 'ev-threat-4',
              category: 'Source IP',
              label: 'Company IT Announcement',
              summary: 'Email from "helpdesk@company.com" announcing scheduled weekend server maintenance.',
              detailedFindings: 'Legitimate: Internal verified sender, no urgent threats, no password requests, aligns with monthly calendar schedule.',
              severityIndicator: 'Normal'
            }
          ]
        },
        socContext: {
          title: 'Why Humans Are the First & Last Line of Defense',
          scenario: 'Over 85% of corporate cyber breaches involve human error—an employee clicking a phishing email, plugging in an unvetted flash drive, or reusing a weak password. Security technology filters out 99% of spam, but the clever 1% reaches human inboxes. That is where you come in.',
          analystMindset: 'As an analyst, treat users with empathy, not blame. Attackers are professional con artists. Your role in the SOC is to support employees, investigate calmly when accidents happen, and neutralize threats swiftly.',
          bestPractices: [
            'Look at the sender domain carefully: Look for subtle misspellings like "micros0ft.com" or "g00gle.com".',
            'Hover before clicking: Inspect the actual destination URL of links without opening them.',
            'Never enter passwords on unverified sites: Legitimate IT teams will never ask you to email your password.',
            'Report quickly: The faster an analyst is alerted to a suspicious email, the faster the whole company is shielded.'
          ]
        },
        knowledgeCheck: {
          dragDrop: {
            title: 'Arrange the Phishing Defense Steps in Order',
            instructions: 'Put the operational response steps in the correct order when an employee reports a suspicious email.',
            items: [
              { id: 's1', label: '1. Receive report: Employee flags strange email asking for urgent password update', order: 1 },
              { id: 's2', label: '2. Inspect sender & links: Check true email header and verify domain legitimacy', order: 2 },
              { id: 's3', label: '3. Verify impact: Check if the employee entered credentials or downloaded attachments', order: 3 },
              { id: 's4', label: '4. Contain & block: Reset employee credentials and block the malicious domain on the firewall', order: 4 }
            ],
            explanation: 'Perfect sequence! Fast reporting, careful inspection, checking impact, and executing containment stops threats in their tracks.'
          }
        }
      }
    ],
    assessment: {
      id: 'unit-0-1-assessment',
      title: 'Unit 1 Assessment: Non-IT Fundamentals & SOC Foundations',
      passingScore: 80,
      xpReward: 100,
      questions: [
        {
          id: 'q-0-1-1',
          question: 'What is the primary role of a Tier 1 (L1) SOC Analyst?',
          options: [
            'To write thousands of lines of programming code to build computer games',
            'To monitor incoming security alerts, inspect the facts, and determine if an alarm is harmless or a real threat',
            'To physically repair damaged computer monitors and replace server cables',
            'To hack into rival corporate networks without authorization'
          ],
          correctAnswer: 1,
          explanation: 'L1 SOC Analysts are the frontline defenders: monitoring the alert queue, triaging alarms, extracting key details, and escalating verified threats.'
        },
        {
          id: 'q-0-1-2',
          question: 'In everyday terms, what is an "IP Address"?',
          options: [
            'A secret password that only programmers know',
            'A unique numerical address (like a home postal address or phone number) that identifies a computer on a network',
            'A physical microchip that must be replaced every month',
            'An antivirus software application'
          ],
          correctAnswer: 1,
          explanation: 'An IP address is simply the digital phone number or street address that allows computers to find and communicate with each other.'
        },
        {
          id: 'q-0-1-3',
          question: 'What is a "Log File" in a computer system?',
          options: [
            'A piece of wood used to power older computer engines',
            'A digital receipt or diary entry that records who logged in, what action was taken, and at what exact timestamp',
            'A software program that automatically deletes all customer records',
            'A computer virus created by cybercriminals'
          ],
          correctAnswer: 1,
          explanation: 'Logs are the breadcrumbs and receipts of computing. Every action leaves a log entry, allowing analysts to investigate what happened.'
        },
        {
          id: 'q-0-1-4',
          question: 'Why do attackers use Phishing emails rather than attempting complex hacking tricks?',
          options: [
            'Because phishing emails are illegal, while hacking is allowed',
            'Because tricking a human into voluntarily giving up their password with an urgent fake email is much easier than breaking through strong firewalls',
            'Because computers do not have email capability',
            'Because phishing only works on mobile phones'
          ],
          correctAnswer: 1,
          explanation: 'Humans are the easiest target. It takes seconds to send a deceptive email, whereas hacking through encrypted enterprise firewalls is extremely difficult.'
        },
        {
          id: 'q-0-1-5',
          question: 'Do you need a computer science degree or programming background to become a successful SOC analyst?',
          options: [
            'Yes, you must have a Master\'s degree in Mathematics',
            'No; the core skills are curiosity, attention to detail, following standard operating procedures (SOPs), and asking the right questions',
            'Yes, you must memorize every programming language before you can start',
            'Only if you work in Europe or Asia'
          ],
          correctAnswer: 1,
          explanation: 'L1 SOC work is based on analytical thinking, keen observation, and following playbooks. Thousands of top analysts transitioned from non-technical backgrounds!'
        }
      ]
    }
  },

  // =========================================================================
  // UNIT 2: How This Course & Platform Works (Your Interactive Training Ground)
  // =========================================================================
  {
    id: 'unit-0-2',
    unitNumber: 2,
    title: 'Unit 2: How This Course & Labs Work — Zero-Fear Flight Simulator',
    description: 'Demystify what a "Lab" really is: a safe flight simulator where mentors Rajesh Sir and Priya Di guide every single click. Experience your first guided simulation with zero risk.',
    estimatedHours: 0.5,
    topics: [
      {
        id: 'topic-0-2-1',
        unitId: 'unit-0-2',
        title: 'Chapter 1: Module 04 Consoles Tour: The 5 Screens You Will Operate',
        order: 1,
        estimatedMinutes: 8,
        xpReward: 35,
        theory: {
          summaryLines: [
            'Traditional cybersecurity courses overwhelm students with 50-slide PowerPoint presentations and dry PDF textbooks. Our platform does the opposite.',
            'Every single chapter follows an identical 5-step interactive structure designed for rapid understanding and long-term memory retention.',
            'Step 1: Theory (Core Concept) — 4 to 6 concise lines in plain English explaining what the concept is and why it matters, with a "Know More" reference drawer.',
            'Step 2: Visual Story Demo — An animated sequence that lets you watch real attack scenarios step-by-step with play/pause and telemetry previews.',
            'Step 3: Interactive SOC Simulator — A zero-risk, hands-on console where you click, inspect evidence cards, filter logs, and practice real analyst tools.',
            'Step 4 & 5: Real-World SOC Context & Chapter Knowledge Checks — Field best practices plus interactive drag-and-drop or matching exercises to verify your understanding.'
          ],
          knowMore: {
            title: 'Learning Science: The Power of Active Recall & Simulation',
            description: 'Educational psychology proves that interactive simulation yields 75% knowledge retention compared to only 10% from passive reading.',
            externalUrl: 'https://en.wikipedia.org/wiki/Active_recall',
            externalLabel: 'Active Recall Research'
          }
        },
        demo: {
          title: 'Touring a Platform Chapter: The 5 Sections',
          subtitle: 'See how each chapter guides you effortlessly from beginner understanding to hands-on mastery.',
          steps: [
            {
              id: 1,
              stage: 'Section 1: Theory',
              iconName: 'endpoint',
              title: 'Read the Bite-Sized Foundation',
              description: 'Begin each topic with 4 to 5 bullet points. Every technical term is clickable—if you don\'t recognize a word, clicking it opens a simple explanation.',
              telemetrySnippet: 'FEATURE: Plain-English summary + Clickable Floating Glossary + Authoritative NIST/CISA links',
              highlightText: 'Start with high-level clarity before diving into technical details.'
            },
            {
              id: 2,
              stage: 'Section 2: Visual Demo',
              iconName: 'server',
              title: 'Watch the Story Unfold',
              description: 'Click Next to step through an animated attack and defense story. Watch how an attacker moves and how security telemetry records their actions.',
              telemetrySnippet: 'FEATURE: Interactive visual storyboard with real tool screens (Splunk, Wireshark, Windows Event Viewer)',
              highlightText: 'Visualizing telemetry makes abstract logs tangible and easy to follow.'
            },
            {
              id: 3,
              stage: 'Section 3: Interactive Simulator',
              iconName: 'analyst',
              title: 'Hands-On Practice in a Safe Sandbox',
              description: 'Engage with the interactive dashboard on the page! You can click buttons, assign roles, inspect evidence cards, and test your decisions with zero risk of breaking anything.',
              telemetrySnippet: 'FEATURE: Fully simulated SOC consoles, log filters, triage buttons, and instant feedback',
              highlightText: 'You learn by doing, not just watching.'
            },
            {
              id: 4,
              stage: 'Section 4: Field Context',
              iconName: 'endpoint',
              title: 'Learn How Analysts Think on the Job',
              description: 'Read the operational reality of what SOC analysts face during their daily shifts, along with industry best practices and mindset tips.',
              telemetrySnippet: 'FEATURE: Real-world operational scenarios + Analyst Mindset + Field-proven best practices',
              highlightText: 'Connect academic concepts to day-to-day job expectations.'
            },
            {
              id: 5,
              stage: 'Section 5: Knowledge Check',
              iconName: 'siem',
              title: 'Lock In Your Skills & Earn XP',
              description: 'Complete the drag-and-drop or matching exercise at the bottom of the chapter. Solve it correctly to unlock instant XP and reveal the Next Chapter button!',
              telemetrySnippet: 'FEATURE: Drag-and-drop sequencing, matching pairs, and scenario verdicts with instant score updates',
              highlightText: 'Immediate feedback ensures you are 100% ready for the next topic.'
            }
          ]
        },
        interactive: {
          title: '5-Step Loop Walkthrough',
          scenario: 'Click through each step of our learning methodology to see what tools are at your fingertips.',
          cards: [
            {
              id: 'ev-loop-1',
              category: 'User',
              label: 'Step 1: Theory & Core Concepts',
              summary: 'Bite-sized, jargon-free bullet points outlining the foundational concept.',
              detailedFindings: 'Includes the "Know More" reference drawer with links to NIST, CISA, and MITRE standards for deep-dive reading when you want it.',
              severityIndicator: 'Normal'
            },
            {
              id: 'ev-loop-2',
              category: 'Timeline',
              label: 'Step 2: Visual Story Demo',
              summary: 'Animated, step-by-step walkthrough showing attacker techniques and telemetry.',
              detailedFindings: 'Lets you pause, advance, or rewind animations to see how log entries appear in real time.',
              severityIndicator: 'Normal'
            },
            {
              id: 'ev-loop-3',
              category: 'Event ID',
              label: 'Step 3: Interactive SOC Simulator',
              summary: 'Hands-on console embedded right on the page.',
              detailedFindings: 'Click evidence cards, test alert classification, filter logs, and experiment without any software installation required.',
              severityIndicator: 'Normal'
            },
            {
              id: 'ev-loop-4',
              category: 'Source IP',
              label: 'Step 4 & 5: Field Context & Knowledge Check',
              summary: 'Practical job advice followed by interactive quizzes and drag-and-drop exercises.',
              detailedFindings: 'Earns you 35-50 XP per topic, unlocks the next chapter, and tracks your live progress on the dashboard.',
              severityIndicator: 'Normal'
            }
          ]
        },
        socContext: {
          title: 'How to Study Effectively on This Platform',
          scenario: 'You do not need to spend 8 hours in a row studying. The human brain absorbs technical concepts best in short, focused 20-30 minute sessions. Doing one chapter a day will comfortably take you through the entire curriculum.',
          analystMindset: 'Celebrate small wins! Every chapter you complete is another real-world tool or concept you can speak intelligently about in a junior SOC analyst job interview.',
          bestPractices: [
            'Do not rush: Read the theory summary lines carefully and explore the clickable glossary terms.',
            'Play with the interactive simulators: Click different options to see what happens when an alert is harmless vs malicious.',
            'Review explanations: When you finish a knowledge check, read the explanation box to reinforce your understanding.',
            'Track your streak: Consistent daily practice beats cramming every single time.'
          ]
        },
        knowledgeCheck: {
          dragDrop: {
            title: 'Arrange the 5-Step Learning Loop in Proper Order',
            instructions: 'Order the five stages of each chapter from first to last.',
            items: [
              { id: 'l1', label: '1. Theory: 4-6 concise lines explaining the core concept in plain English', order: 1 },
              { id: 'l2', label: '2. Visual Story Demo: Watch the attack and telemetry unfold step-by-step', order: 2 },
              { id: 'l3', label: '3. Interactive Simulator: Hands-on zero-risk practice on the dashboard', order: 3 },
              { id: 'l4', label: '4. Real-World Field Context: Operational best practices & analyst mindset', order: 4 },
              { id: 'l5', label: '5. Knowledge Check: Interactive drag-drop/matching check to earn XP', order: 5 }
            ],
            explanation: 'You nailed the sequence! This 5-step active learning cycle ensures you truly understand and can apply every cybersecurity concept.'
          }
        }
      },
      {
        id: 'topic-0-2-2',
        unitId: 'unit-0-2',
        title: 'Chapter 2: What is a "Lab"? (Safe Flight Simulator)',
        order: 2,
        estimatedMinutes: 8,
        xpReward: 35,
        theory: {
          summaryLines: [
            'Learning technical cybersecurity should be engaging, rewarding, and fun—not exhausting or dry.',
            'XP (Experience Points) & Levels: You earn +35 XP for completing a topic, +50 XP for solving knowledge checks, and +100 XP for passing unit assessments. As your XP grows, your analyst level increases from Cadet (Level 1) to Senior Analyst.',
            'Badges & Certifications: Passing unit assessments and milestones unlocks special collectible badges displayed on your student profile.',
            'Floating Glossary: Whenever you see a term highlighted in blue (like SIEM, IP Address, or False Positive), you can click it! A popup drawer appears with a 10-second everyday analogy, formal definition, and NIST reference link.',
            'Curriculum Tree Drawer: Click the "Curriculum Tree" button in the navigation bar anytime to view all 18 course modules, see chapter progress, and jump between topics.'
          ],
          knowMore: {
            title: 'NIST Computer Security Resource Center Glossary',
            description: 'Explore the official NIST repository containing definitions for over 7,000 cybersecurity terms and standards.',
            externalUrl: 'https://csrc.nist.gov/glossary',
            externalLabel: 'NIST CSRC Glossary'
          }
        },
        demo: {
          title: 'Gamification and Helper Tools in Action',
          subtitle: 'Discover how XP, badges, streaks, and the floating glossary support your study routine.',
          steps: [
            {
              id: 1,
              stage: '1. XP Points',
              iconName: 'endpoint',
              title: 'Earn XP for Every Action',
              description: 'Reading a chapter, completing a simulation, and answering quiz questions all credit XP instantly to your profile.',
              telemetrySnippet: 'XP SYSTEM: +35 XP awarded for Topic Completion | Total XP: 175 | Level: 1 (SOC Cadet)',
              highlightText: 'XP turns every chapter into visible, rewarding progress.'
            },
            {
              id: 2,
              stage: '2. Leveling Up',
              iconName: 'analyst',
              title: 'Advance from Cadet to Senior Analyst',
              description: 'As you accumulate XP across modules, your analyst rank advances: Level 1 (Cadet), Level 2 (Junior Triage), Level 3 (Incident Responder), Level 4 (Threat Specialist).',
              telemetrySnippet: 'RANK ADVANCEMENT: Level Up! You achieved Level 2 (Junior Triage Analyst)',
              highlightText: 'Your level reflects the breadth of your hands-on investigation experience.'
            },
            {
              id: 3,
              stage: '3. Floating Glossary',
              iconName: 'siem',
              title: 'Never Feel Lost with Clickable Terms',
              description: 'Never feel embarrassed about an unfamiliar term. Click any blue-highlighted word in the text to see an instant, friendly everyday analogy.',
              telemetrySnippet: 'GLOSSARY POPUP: "SIEM" -> Analogy: The Central CCTV Security Control Room -> Definition: Security Information & Event Management',
              highlightText: 'The built-in glossary demystifies complex acronyms on demand.'
            },
            {
              id: 4,
              stage: '4. Curriculum Drawer',
              iconName: 'server',
              title: 'Navigate Any Module Anytime',
              description: 'Open the Curriculum Tree drawer from the top bar to search for any topic, preview upcoming modules, or track your completion status.',
              telemetrySnippet: 'DRAWER: 18 Modules Mapped | Search Query: "Phishing" -> 4 matching chapters found',
              highlightText: 'The full roadmap is always one click away.'
            },
            {
              id: 5,
              stage: '5. Achievement Badges',
              iconName: 'endpoint',
              title: 'Showcase Your Mastery',
              description: 'Complete unit assessments with 80% or higher to earn collectible achievement badges celebrating your milestones.',
              telemetrySnippet: 'BADGE EARNED: "First Responder Badge" unlocked! Added to student dashboard.',
              highlightText: 'Collect badges to showcase your growing cybersecurity toolkit.'
            }
          ]
        },
        interactive: {
          title: 'Platform Tool Simulator',
          scenario: 'Inspect the primary navigation and study features available to you across the entire platform.',
          cards: [
            {
              id: 'ev-tool-1',
              category: 'User',
              label: 'Floating Glossary Tooltips',
              summary: 'Clickable links embedded inside chapter text.',
              detailedFindings: 'Clicking any term opens a contextual definition drawer with: Full Form, Category, Simple Analogy, Official Definition, and SOC Context.',
              severityIndicator: 'Normal'
            },
            {
              id: 'ev-tool-2',
              category: 'Timeline',
              label: 'Curriculum Tree Drawer',
              summary: 'Slide-out navigation drawer accessible from the top header.',
              detailedFindings: 'Allows searching across all 18 modules, viewing prerequisite requirements, and jumping directly to any unlocked chapter.',
              severityIndicator: 'Normal'
            },
            {
              id: 'ev-tool-3',
              category: 'Event ID',
              label: 'XP & Level Tracker',
              summary: 'Persistent gamification counter displayed on your dashboard.',
              detailedFindings: 'Automatically tracks your completed chapters, assessment scores, and computes your current progress percentage.',
              severityIndicator: 'Normal'
            },
            {
              id: 'ev-tool-4',
              category: 'Source IP',
              label: 'Safe Hands-On Playground',
              summary: 'Interactive triage widgets with instant hints and explanations.',
              detailedFindings: 'No penalty for incorrect answers—retry as many times as you like until the concept clicks completely.',
              severityIndicator: 'Normal'
            }
          ]
        },
        socContext: {
          title: 'Building Lifelong Learning Habits',
          scenario: 'In the cybersecurity field, technology changes rapidly. Senior analysts with 10 years of experience still look up terms and read documentation every single day. Nobody expects you to have an encyclopedic memory—the mark of a true professional is knowing how to find answers efficiently.',
          analystMindset: 'Never feel bad about looking up a term in the glossary or re-reading a chapter. The best analysts are not the ones who pretend to know everything—they are the ones who verify their facts thoroughly before making a decision.',
          bestPractices: [
            'Use the glossary freely: If you see a term you aren\'t 100% sure of, click it to see its simple analogy.',
            'Aim for streak consistency: Even 10 minutes a day keeps your momentum alive and reinforces neural pathways.',
            'Review past chapters: Use the curriculum drawer to revisit earlier concepts whenever you need a quick refresher.',
            'Celebrate every milestone: Earning an assessment badge proves you have mastered that skill!'
          ]
        },
        knowledgeCheck: {
          matching: {
            title: 'Match the Platform Feature to Its Purpose',
            instructions: 'Pair each platform feature on the left with what it does on the right.',
            pairs: [
              { id: 'f1', left: 'Floating Glossary', right: 'Clickable terms with instant everyday analogies' },
              { id: 'f2', left: 'Curriculum Tree Drawer', right: 'Slide-out map to search and browse all 18 modules' },
              { id: 'f3', left: 'XP System', right: 'Points awarded for completing topics and quizzes' },
              { id: 'f4', left: 'Unit Assessments', right: 'Comprehensive quizzes that unlock milestone badges' }
            ],
            explanation: 'Excellent! These tools are designed to support and reward you at every single step of your journey.'
          }
        }
      },
      {
        id: 'topic-0-2-3',
        unitId: 'unit-0-2',
        title: 'Chapter 3: Your First Guided Lab (Mentor Holding Your Hand)',
        order: 3,
        estimatedMinutes: 10,
        xpReward: 35,
        theory: {
          summaryLines: [
            'The single most important day-to-day task of an L1 SOC Analyst is Alert Triage: determining whether an alarm is real trouble or a harmless false alarm.',
            'True Positive (TP): The alarm sounded because of a REAL threat (e.g. an unauthorized hacker really is guessing passwords). Action: Escalate and contain immediately!',
            'False Positive (FP): The alarm sounded, but the activity was completely HARMLESS (e.g. an employee accidentally typed their password wrong 3 times before getting it right, or IT was testing a new laptop). Action: Document and close harmlessly!',
            'In a real-world enterprise SOC, between 60% and 80% of all incoming alerts turn out to be False Positives! Knowing how to check the facts calmly without panicking is the hallmark of a great analyst.',
            'In this platform, you can practice triaging alerts as many times as you want in a 100% safe environment with instant guidance.'
          ],
          knowMore: {
            title: 'SANS Institute: The Alert Triage & Qualification Playbook',
            description: 'Learn the official industry workflow for evaluating incoming alerts and distinguishing genuine intrusions from benign anomalies.',
            externalUrl: 'https://www.sans.org/white-papers/39945/',
            externalLabel: 'SANS Triage Playbook'
          }
        },
        demo: {
          title: 'Triage in Action: Burnt Toast vs Real Fire',
          subtitle: 'Understand the difference between a False Positive (burnt toast) and a True Positive (real fire).',
          steps: [
            {
              id: 1,
              stage: '1. The Smoke Alarm Rings',
              iconName: 'siem',
              title: 'An Alarm Sounds in the Kitchen',
              description: 'The kitchen smoke detector starts beeping loudly. Does this mean the whole house is burning down? Not necessarily!',
              telemetrySnippet: 'ALARM: Smoke Detected in Kitchen | Sensor: Optical Smoke 01 | Status: Active Alarm',
              highlightText: 'An alarm is an invitation to investigate, not an immediate emergency.'
            },
            {
              id: 2,
              stage: '2. The Human Verification',
              iconName: 'analyst',
              title: 'You Walk In and Check the Facts',
              description: 'You walk into the kitchen. You see a slice of bread stuck in the toaster producing light smoke. There is no fire on the walls or counter.',
              telemetrySnippet: 'OBSERVATION: Toaster setting 10/10 | Bread charred | No flame present | Stove is off',
              highlightText: 'Observing the physical environment provides immediate context.'
            },
            {
              id: 3,
              stage: '3. The Verdict: False Positive',
              iconName: 'endpoint',
              title: 'Benign Cause Identified (False Positive)',
              description: 'This is a False Positive! The smoke detector did its job correctly by detecting smoke, but there is no danger. You open the window, press the silence button, and eat breakfast.',
              telemetrySnippet: 'VERDICT: False Positive (Benign) | Rationale: Burnt toast, no hazard | Action: Alarm Reset',
              highlightText: 'False positives are harmless events that triggered a sensitive detector.'
            },
            {
              id: 4,
              stage: '4. The Contrast: True Positive',
              iconName: 'attacker',
              title: 'What Would a True Positive Look Like?',
              description: 'If you walked into the kitchen and saw flames licking up the curtains and spreading across the cabinets, that is a True Positive! You immediately call the fire department and evacuate.',
              telemetrySnippet: 'TRUE POSITIVE: Uncontrolled flame on wall | Action: Call 911 | Evacuate occupants immediately',
              highlightText: 'True positives require immediate containment and escalation.'
            },
            {
              id: 5,
              stage: '5. The Digital SOC Equivalent',
              iconName: 'server',
              title: 'Digital Alerts Work the Exact Same Way',
              description: 'If an employee forgot their password on Monday morning: False Positive (burnt toast). If an unknown server in another country is trying 500 passwords a second: True Positive (real fire)!',
              telemetrySnippet: 'SOC PRINCIPLE: Always verify the user, the time, and the source before deciding.',
              highlightText: 'Context and evidence separate false alarms from true incidents.'
            }
          ]
        },
        interactive: {
          title: 'Evidence Investigation: The Monday Morning Login Alarm',
          scenario: 'An alert just appeared in your queue: "Multiple Failed Logins for Alice in Accounting". Inspect the 4 evidence cards to decide the verdict.',
          cards: [
            {
              id: 'ev-triage-1',
              category: 'User',
              label: 'Target User: Alice Walker (Accounting)',
              summary: 'Account has been active for 4 years with no past security incidents.',
              detailedFindings: 'Alice is a known full-time employee who works in the downtown office. She usually logs on at 8:50 AM on weekdays.',
              severityIndicator: 'Normal'
            },
            {
              id: 'ev-triage-2',
              category: 'Timeline',
              label: 'Timestamp of Failed Logins',
              summary: '3 failed attempts occurred at 08:52 AM, followed by a SUCCESSFUL login at 08:53 AM.',
              detailedFindings: 'All attempts happened in a 60-second window. The successful login was immediately followed by normal email and spreadsheet activity.',
              severityIndicator: 'Normal'
            },
            {
              id: 'ev-triage-3',
              category: 'Source IP',
              label: 'Source Workstation & Network',
              summary: 'IP: 10.10.4.88 (Corporate HQ WiFi, 3rd Floor Accounting Desk).',
              detailedFindings: 'Physical location confirmed on company premises. The device is Alice\'s standard company-issued Dell laptop.',
              severityIndicator: 'Normal'
            },
            {
              id: 'ev-triage-4',
              category: 'Event ID',
              label: 'Windows Security Event ID: 4625 & 4624',
              summary: 'Event 4625 (Failed Password, SubStatus: Bad Password) -> Event 4624 (Successful Logon).',
              detailedFindings: 'Conclusion: Alice simply mistyped her password twice after coming back from the weekend, then entered it correctly on the 3rd try.',
              severityIndicator: 'Normal'
            }
          ]
        },
        socContext: {
          title: 'How to Document a False Positive Professionally',
          scenario: 'When you conclude an alert is a False Positive, you do not just delete it. You write a brief 2-sentence note in the ticketing system: "User Alice Walker had 3 failed logon attempts from corporate laptop followed by successful logon. User contacted and confirmed accidental typo. Closing as False Positive - Benign User Mistake."',
          analystMindset: 'Documenting your reasoning clearly protects both the company and yourself. If a senior analyst or manager reviews the ticket next week, your clear notes prove you did a thorough, competent investigation.',
          bestPractices: [
            'State the What: What triggered the alarm? (e.g., 3 failed logins)',
            'State the Who & Where: Who was the user and where did they connect from? (e.g., Alice on HQ WiFi)',
            'State the Resolution: Did they successfully log in afterward or contact IT?',
            'State the Verdict: Clearly state "Closed as False Positive" with the justification.'
          ]
        },
        knowledgeCheck: {
          triageScenario: {
            id: 'triage-0-1',
            alertName: 'Excessive Failed Logons Followed by Success',
            severity: 'LOW',
            scenarioText: 'User "david.sales" triggered an alert for 4 failed password attempts at 9:02 AM from his assigned desk in the Boston branch office. At 9:03 AM, a successful login was recorded, and David called the internal IT helpdesk stating his Caps Lock key was accidentally turned on.',
            evidenceItems: [
              { label: 'User Account', value: 'david.sales (Sales Rep)', insight: 'Legitimate employee during standard working hours' },
              { label: 'Workstation IP', value: '10.20.10.45 (Boston Office Desk)', insight: 'Trusted corporate subnet; physical desk verified' },
              { label: 'Resolution', value: 'Successful login at 9:03 AM + IT Helpdesk call', insight: 'Caps Lock confirmed by user; normal behavior followed' }
            ],
            correctVerdict: 'FALSE_POSITIVE',
            rationale: 'All failed attempts originated from the employee\'s physical desk during work hours, followed immediately by successful logon and confirmation of an accidental Caps Lock key. There is zero evidence of an external attacker.',
            analystAction: 'Document notes indicating user typo confirmed by Helpdesk and close ticket as False Positive (Benign Activity).'
          }
        }
      }
    ],
    assessment: {
      id: 'unit-0-2-assessment',
      title: 'Unit 2 Assessment: Platform Navigation & Triage Basics',
      passingScore: 80,
      xpReward: 100,
      questions: [
        {
          id: 'q-0-2-1',
          question: 'What happens when you click on a blue-highlighted term anywhere inside a chapter?',
          options: [
            'Your web browser crashes and you lose all your progress',
            'The Floating Glossary opens with a simple everyday analogy, plain English definition, and official reference',
            'You are charged a fee on your credit card',
            'Your account is automatically logged out'
          ],
          correctAnswer: 1,
          explanation: 'The Floating Glossary is your built-in study assistant! Clicking any highlighted term gives you a fast, friendly explanation on demand.'
        },
        {
          id: 'q-0-2-2',
          question: 'What is a "False Positive" in cybersecurity triage?',
          options: [
            'An alert that detected an actual cybercriminal stealing confidential files',
            'An alert triggered by harmless or normal activity (like an employee forgetting their password or IT running maintenance)',
            'A computer monitor that displays incorrect colors',
            'A virus that infects the computer without triggering alarms'
          ],
          correctAnswer: 1,
          explanation: 'A False Positive is a false alarm—the detector was sensitive and triggered, but the underlying activity was completely benign.'
        },
        {
          id: 'q-0-2-3',
          question: 'What percentage of daily alerts in a real enterprise SOC typically turn out to be False Positives?',
          options: [
            '0% — every alert is always a catastrophic emergency',
            'Between 60% and 80%',
            'Exactly 100%',
            'Less than 1%'
          ],
          correctAnswer: 1,
          explanation: 'Between 60% and 80% of daily alerts in corporate environments are benign false alarms. Triage analysts quickly verify and dismiss them.'
        },
        {
          id: 'q-0-2-4',
          question: 'What is the purpose of the 5-step learning loop used across this course?',
          options: [
            'To make the course take as long as possible',
            'To guide you step-by-step from plain-English theory to visual animation, hands-on simulation, real-world context, and knowledge verification',
            'To force you to write programming code before you can learn anything',
            'To prevent you from taking notes'
          ],
          correctAnswer: 1,
          explanation: 'The 5-step cycle builds confidence and deep understanding by pairing bite-sized explanations with hands-on simulations.'
        },
        {
          id: 'q-0-2-5',
          question: 'If you make a mistake while practicing in our interactive simulators or quizzes, what happens?',
          options: [
            'You are locked out of the course permanently',
            'Nothing bad! The platform is a completely safe sandbox—you can review the explanation and retry until you understand',
            'Your computer files are encrypted',
            'You lose all your XP points forever'
          ],
          correctAnswer: 1,
          explanation: 'Our platform is a zero-risk practice ground. Making mistakes is how all great analysts learn!'
        }
      ]
    }
  },

  // =========================================================================
  // UNIT 3: The SOC Analyst Mindset & Non-IT Success Playbook
  // =========================================================================
  {
    id: 'unit-0-3',
    unitNumber: 3,
    title: 'Unit 3: The Detective Mindset & Your 15-Minute Daily Roadmap',
    description: 'Discover why curiosity and checklists beat coding, how famous detectives solve cases without computers, and master your 15-minute daily roadmap with your morning chai.',
    estimatedHours: 0.5,
    topics: [
      {
        id: 'topic-0-3-1',
        unitId: 'unit-0-3',
        title: 'Chapter 1: Module 04 End-to-End Triage Flow: 5 Stages of an Incident',
        order: 1,
        estimatedMinutes: 8,
        xpReward: 35,
        theory: {
          summaryLines: [
            'Hollywood portrays cybersecurity as a hooded hacker furiously typing green code on a dark screen. In the real world, SOC analysis is detective work.',
            'You do not write software code. Instead, you look for clues: "Why did this login happen at 3:00 AM? Why is a marketing employee downloading database administration tools?"',
            'In a SOC, you are never left to guess what to do. Organizations use Standard Operating Procedures (SOPs) and Playbooks—step-by-step checklists created by senior engineers.',
            'Think of a commercial airline pilot: before takeoff, the pilot does not invent flying procedures from memory; they follow a strict pre-flight checklist. SOC analysts follow playbooks in the exact same way.',
            'Your greatest assets are curiosity, attention to detail, and a calm, methodical approach to following the playbook.'
          ],
          knowMore: {
            title: 'NIST SP 800-61 Rev. 2: Computer Security Incident Handling Guide',
            description: 'The authoritative NIST framework detailing the standard phases of incident handling: Preparation, Detection & Analysis, Containment, Eradication, and Recovery.',
            externalUrl: 'https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final',
            externalLabel: 'NIST Incident Handling'
          }
        },
        demo: {
          title: 'Following the Playbook: The Airline Pilot Method',
          subtitle: 'Watch how following a simple 4-step checklist resolves a critical security alarm without panic.',
          steps: [
            {
              id: 1,
              stage: '1. The Alert Triggers',
              iconName: 'siem',
              title: 'Alarm: Suspicious File Download',
              description: 'An alert appears: "Potential Malware Download on Workstation WS-FIN-09". Rather than guessing, the analyst opens the "Phishing & Malware Triage Playbook".',
              telemetrySnippet: 'PLAYBOOK ACTIVATED: SOP-MALWARE-01 | Step 1: Identify Entity & File Hash',
              highlightText: 'Playbooks eliminate guesswork and provide structured clarity.'
            },
            {
              id: 2,
              stage: '2. Check Item 1: Identify File',
              iconName: 'endpoint',
              title: 'Checklist Step 1: Look Up the File Hash',
              description: 'The playbook says: "Copy the file fingerprint (hash) and paste it into VirusTotal (a public file reputation checker)."',
              telemetrySnippet: 'VIRUSTOTAL RESULT: File Hash: e3b0c44298fc... | 0/72 Antivirus Engines Flagged (Clean)',
              highlightText: 'External reputation databases instantly reveal if a file is known malware.'
            },
            {
              id: 3,
              stage: '3. Check Item 2: User Contact',
              iconName: 'analyst',
              title: 'Checklist Step 2: Verify Legitimate Purpose',
              description: 'The playbook says: "Call or message the employee to ask what they downloaded." The analyst sends a quick Teams message: "Hi Mark, did you just download the Q3 Tax Table from ADP?" Mark replies: "Yes, just doing quarterly payroll!"',
              telemetrySnippet: 'COMMUNICATION: User confirms legitimate download from approved vendor ADP portal.',
              highlightText: 'A 30-second user confirmation frequently resolves ambiguous alerts.'
            },
            {
              id: 4,
              stage: '4. Check Item 3: Document Findings',
              iconName: 'server',
              title: 'Checklist Step 3: Record Evidence in the Ticket',
              description: 'The playbook says: "Attach VirusTotal clean report, paste user confirmation message, and assign category Benign."',
              telemetrySnippet: 'TICKET UPDATE: Evidence attached | Category: False Positive (Approved Software) | Status: Closed',
              highlightText: 'Thorough documentation provides an audit trail for management.'
            },
            {
              id: 5,
              stage: '5. Case Closed Methodically',
              iconName: 'endpoint',
              title: 'Zero Panic, Total Professionalism',
              description: 'The alert was resolved in under 4 minutes by following the checklist. No coding was written, no servers were rebooted, and operations continued smoothly.',
              telemetrySnippet: 'METRIC: Triage completed in 3m 42s (SLA Target: < 15 mins) | SLA Compliant: YES',
              highlightText: 'Following standard procedures guarantees high-quality, reproducible results.'
            }
          ]
        },
        interactive: {
          title: 'Playbook Checklist Runner',
          scenario: 'Walk through an interactive 4-step checklist to triage an alert for a suspicious USB drive.',
          cards: [
            {
              id: 'ev-mindset-1',
              category: 'User',
              label: 'Step 1: Check Employee Authorization',
              summary: 'Did this employee request approval to use an external USB drive for business purposes?',
              detailedFindings: 'Checked IT Service Desk portal: Ticket #IT-9402 shows an approved request from HR Director to export archive files for an annual audit.',
              severityIndicator: 'Normal'
            },
            {
              id: 'ev-mindset-2',
              category: 'Event ID',
              label: 'Step 2: Antivirus Scan Results',
              summary: 'Did the endpoint antivirus scan the flash drive automatically when plugged in?',
              detailedFindings: 'Endpoint log: Defender Antivirus scanned 42 files on drive E:. Scan result: 0 threats detected, drive is clean.',
              severityIndicator: 'Normal'
            },
            {
              id: 'ev-mindset-3',
              category: 'Timeline',
              label: 'Step 3: Data Movement Volume',
              summary: 'Was any confidential data leaked or sent over the internet?',
              detailedFindings: 'Network monitoring: 0 outbound connections during USB insertion. Only approved local PDF archives were written.',
              severityIndicator: 'Normal'
            },
            {
              id: 'ev-mindset-4',
              category: 'Source IP',
              label: 'Step 4: Ticket Conclusion',
              summary: 'Formulate final ticket disposition and close.',
              detailedFindings: 'Disposition: False Positive / Authorized Policy Exception. Attached Ticket #IT-9402 as reference.',
              severityIndicator: 'Normal'
            }
          ]
        },
        socContext: {
          title: 'The Soft Skills That Land Real Cybersecurity Jobs',
          scenario: 'Hiring managers often say: "We can teach anyone technical tools like Splunk or Wireshark in two weeks. But we cannot easily teach honesty, curiosity, clear writing, and calm teamwork." If you come from a non-IT background, your past life experience is a massive advantage, not a disadvantage.',
          analystMindset: 'Take pride in your communication skills. Writing clear incident tickets, explaining technical events to non-technical business managers, and staying calm under pressure are the exact attributes that lead to promotions in security operations.',
          bestPractices: [
            'Be methodical: Never skip steps in the SOP—checklists ensure consistency even during high-stress alerts.',
            'Write clearly: Use simple, unambiguous sentences when writing notes in incident tickets.',
            'Collaborate: If you are unsure about an alert, share your screen with a Tier 2 colleague and walk through it together.',
            'Embrace the detective mindset: View every alert as a small mystery to solve with evidence and logic.'
          ]
        },
        knowledgeCheck: {
          matching: {
            title: 'Match the Analyst Trait to Its Impact',
            instructions: 'Match each core analyst quality on the left with why it matters on the right.',
            pairs: [
              { id: 'm1', left: 'Curiosity', right: 'Drives you to ask "Why did this happen at 3:00 AM?"' },
              { id: 'm2', left: 'Following Playbooks (SOPs)', right: 'Prevents mistakes by guiding you through proven checklists' },
              { id: 'm3', left: 'Clear Documentation', right: 'Allows teammates and managers to understand what you found' },
              { id: 'm4', left: 'Calm Demeanor', right: 'Prevents panic when high-severity alerts ring' }
            ],
            explanation: 'Outstanding! These four traits are the true hallmarks of elite cybersecurity professionals.'
          }
        }
      },
      {
        id: 'topic-0-3-2',
        unitId: 'unit-0-3',
        title: 'Chapter 2: 15-Minute Daily Roadmap (Chai & Learn)',
        order: 2,
        estimatedMinutes: 10,
        xpReward: 35,
        theory: {
          summaryLines: [
            'Now that you understand what a SOC is, how the platform works, and the analyst mindset, you are ready to conquer the entire 18-module journey.',
            'Modules 1 through 3 will teach you Computer, Networking, and Security fundamentals. When you see new terms like "TCP/IP" or "DNS", don\'t panic—remember they are just digital addresses and phone books!',
            'Module 4 is "SOC Operations"—the comprehensive, realistic simulation module where you work with full SIEM dashboards, process trees, and live investigation scenarios.',
            'Study Strategy: Do 1 to 2 chapters per day (15 to 30 minutes). Consistency will take you further than pulling an exhausting all-nighter.',
            'You are now equipped with the confidence and foundation to navigate any module in this platform. Welcome to your journey toward becoming a certified SOC Analyst L1!'
          ],
          knowMore: {
            title: 'NICE Cybersecurity Workforce Framework (NIST SP 800-181)',
            description: 'The official national standard defining knowledge, skills, and abilities required for Security Operations Center Analysts (Work Role ID: PR-CDA-001).',
            externalUrl: 'https://niccs.cisa.gov/workforce-development/nice-framework',
            externalLabel: 'NICE Workforce Framework'
          }
        },
        demo: {
          title: 'The 18-Module Journey: From Zero to Certified L1 Analyst',
          subtitle: 'See the four major phases of your transformation into an industry-ready security defender.',
          steps: [
            {
              id: 1,
              stage: 'Phase 1: Orientation',
              iconName: 'endpoint',
              title: 'Module 00: Foundation & Mindset (You Are Here!)',
              description: 'You demystified tech jargon, understood the physical-to-digital analogies, learned how the platform works, and practiced triage.',
              telemetrySnippet: 'MILESTONE: Module 00 Complete | Foundation: Established | Beginner Confidence: 100%',
              highlightText: 'You now possess the foundational context needed to learn without intimidation.'
            },
            {
              id: 2,
              stage: 'Phase 2: Core Foundations',
              iconName: 'server',
              title: 'Modules 01 - 03: Computers, Networks & Security',
              description: 'Learn operating systems (Windows & Linux), how networks connect computers (IPs, Ports, DNS), and core security defenses.',
              telemetrySnippet: 'CURRICULUM: Operating Systems -> Network Telemetry -> Core Threats & Controls',
              highlightText: 'Understanding the underlying technology makes detecting anomalies easy.'
            },
            {
              id: 3,
              stage: 'Phase 3: Deep SOC Operations',
              iconName: 'analyst',
              title: 'Module 04: Hands-On SOC Operations Pipeline',
              description: 'Step into the full simulation! Work with SIEM logs, analyze process trees, classify true vs false positives, and escalate incidents.',
              telemetrySnippet: 'SIMULATION: Multi-console dashboard + EDR Process Trees + 4 Progressive Lab Scenarios',
              highlightText: 'Module 04 transforms your foundational theory into authentic operational capability.'
            },
            {
              id: 4,
              stage: 'Phase 4: Advanced Specialization',
              iconName: 'siem',
              title: 'Modules 05 - 18: Threat Hunting, EDR & Incident Response',
              description: 'Master advanced security tooling: Splunk, Wireshark, CrowdStrike EDR, cloud security, memory forensics, and career interview prep.',
              telemetrySnippet: 'ADVANCED TOOLING: Cloud Telemetry, Forensic Analysis, Threat Intelligence, Interview Readiness',
              highlightText: 'Comprehensive preparation for high-paying junior SOC roles.'
            },
            {
              id: 5,
              stage: 'Certification',
              iconName: 'endpoint',
              title: 'Certified SOC Analyst L1 Credential',
              description: 'Complete the curriculum, pass the capstone assessments, and earn your verified certification ready for your resume and LinkedIn!',
              telemetrySnippet: 'CREDENTIAL: SOC Analyst L1 Certified | ID: SOC-2026-CERT | Status: Active & Verified',
              highlightText: 'Your bridge from complete beginner to accredited cybersecurity professional.'
            }
          ]
        },
        interactive: {
          title: 'Course Milestone Roadmap Explorer',
          scenario: 'Inspect the four major phases of your training journey and the skills you will gain in each.',
          cards: [
            {
              id: 'ev-road-1',
              category: 'User',
              label: 'Phase 1: Orientation & Tech Demystification',
              summary: 'Module 00: Welcome to Cybersecurity & Platform Orientation.',
              detailedFindings: 'Skills: Digital security analogies, basic IT vocabulary, platform 5-step learning loop, alert triage mechanics, and analyst mindset.',
              severityIndicator: 'Normal'
            },
            {
              id: 'ev-road-2',
              category: 'Timeline',
              label: 'Phase 2: Systems, Networks & Defense',
              summary: 'Modules 01 - 03: Operating Systems, Computer Architecture, and Networks.',
              detailedFindings: 'Skills: Reading Windows Event Logs, understanding Linux command lines, tracing network packets, and spotting malware indicators.',
              severityIndicator: 'Normal'
            },
            {
              id: 'ev-road-3',
              category: 'Event ID',
              label: 'Phase 3: The Operational Crucible',
              summary: 'Module 04: SOC Operations & Interactive Investigation Pipeline.',
              detailedFindings: 'Skills: Full enterprise SIEM navigation, alert queue management, triage decision trees, severity matrices, and escalation handoffs.',
              severityIndicator: 'Normal'
            },
            {
              id: 'ev-road-4',
              category: 'Source IP',
              label: 'Phase 4: Mastery & Career Readiness',
              summary: 'Modules 05 - 18: Advanced Tooling, Threat Hunting & Career Prep.',
              detailedFindings: 'Skills: Proactive adversary hunting, memory analysis, incident ticketing, mock technical interviews, and resume building.',
              severityIndicator: 'Normal'
            }
          ]
        },
        socContext: {
          title: 'Your Personal Pledge as an Aspiring Analyst',
          scenario: 'Every great cybersecurity professional was once exactly where you are today—looking at unfamiliar terms and wondering if they could do it. You can. Take it one chapter at a time, trust the process, and celebrate your progress.',
          analystMindset: '"I don\'t need to know everything today. I only need to learn one concept today, practice it in the simulator, and come back tomorrow to build on it."',
          bestPractices: [
            'Set a daily study reminder: Pick a comfortable 20-minute window each day (morning coffee, lunch break, or evening).',
            'Take handwritten notes: Writing key concepts in your own words helps solidify connections in your brain.',
            'Re-read when stuck: If a chapter in Modules 1-4 feels difficult, re-read the plain-English summary or open the glossary.',
            'Believe in your trajectory: You have completed Module 00—you are already on your way!'
          ]
        },
        knowledgeCheck: {
          dragDrop: {
            title: 'Arrange the 4 Course Phases in Chronological Order',
            instructions: 'Order the four learning phases of the course curriculum from start to finish.',
            items: [
              { id: 'p1', label: '1. Phase 1: Orientation, Mindset & Tech Jargon Demystification (Module 00)', order: 1 },
              { id: 'p2', label: '2. Phase 2: Core Computing, Operating Systems & Network Telemetry (Modules 01-03)', order: 2 },
              { id: 'p3', label: '3. Phase 3: Hands-on SOC Operations & SIEM Triage Pipeline (Module 04)', order: 3 },
              { id: 'p4', label: '4. Phase 4: Advanced Threat Hunting, Forensics & Career Readiness (Modules 05-18)', order: 4 }
            ],
            explanation: 'Superb! You now understand the full roadmap. Each phase builds naturally on the previous one without sudden leaps.'
          }
        }
      }
    ],
    assessment: {
      id: 'unit-0-3-assessment',
      title: 'Unit 3 Assessment: Analyst Mindset & Course Graduation',
      passingScore: 80,
      xpReward: 100,
      questions: [
        {
          id: 'q-0-3-1',
          question: 'In a real-world SOC, what is a "Playbook" or "SOP" (Standard Operating Procedure)?',
          options: [
            'A comic book that analysts read during their lunch break',
            'A step-by-step checklist created by senior engineers telling you exactly which facts to verify and what actions to take for an alert',
            'A secret hacking manual stolen from cybercriminals',
            'A software program that automatically closes all alerts without human review'
          ],
          correctAnswer: 1,
          explanation: 'Playbooks and SOPs are structured checklists—just like a pilot\'s pre-flight checklist—ensuring analysts investigate alerts consistently and thoroughly.'
        },
        {
          id: 'q-0-3-2',
          question: 'Why are curiosity and observation more important for a junior SOC analyst than knowing how to write software code?',
          options: [
            'Because computers in a SOC do not have keyboards',
            'Because the job is detective work: spotting anomalies, asking why something happened at an unusual time, and verifying facts',
            'Because programmers are banned from working in cybersecurity',
            'Because coding is only used by cyber attackers'
          ],
          correctAnswer: 1,
          explanation: 'L1 analysis is investigative work. Asking the right questions and noticing discrepancies between normal baseline and anomalous behavior catches threats.'
        },
        {
          id: 'q-0-3-3',
          question: 'What is the recommended study routine for completing this course effectively without burning out?',
          options: [
            'Studying for 14 hours straight on Saturday night without sleep',
            'Completing 1 to 2 focused chapters per day (15 to 30 minutes) with consistent daily practice',
            'Skipping all the theory and just guessing randomly on the quizzes',
            'Reading through all 18 modules in a single afternoon'
          ],
          correctAnswer: 1,
          explanation: 'Bite-sized, consistent daily learning (15-30 mins) builds long-term retention and prevents mental fatigue.'
        },
        {
          id: 'q-0-3-4',
          question: 'When you proceed into Module 01 (Computer Fundamentals) and encounter technical terms like Windows Event Logs or Linux processes, how should you approach them?',
          options: [
            'Panic and assume you can never work in cybersecurity',
            'Remember they are just digital records of everyday activities (like visitor sign-in sheets), take them one concept at a time, and use the glossary',
            'Skip directly to the final exam',
            'Memorize every single line of code'
          ],
          correctAnswer: 1,
          explanation: 'Every technical topic builds on everyday analogies. Using the built-in glossary and taking it step-by-step makes every module manageable.'
        },
        {
          id: 'q-0-3-5',
          question: 'What should you do after completing this Course Introduction Module?',
          options: [
            'Give up because cybersecurity is only for computer scientists',
            'Celebrate your first completed milestone, review your dashboard progress, and proceed with confidence into Module 01!',
            'Delete your account and start over',
            'Wait three years before opening the next module'
          ],
          correctAnswer: 1,
          explanation: 'Congratulations! You have completed the orientation and built the foundational mindset needed to thrive across the entire SOC Analyst curriculum.'
        }
      ]
    }
  }
];
