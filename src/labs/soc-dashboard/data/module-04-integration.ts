export const MODULE04_TIMELINE = {
  week: "Training Week at FinCorp SOC",
  days: {
    monday: "Week 2 - Theoretical foundation & SOC workflow architectures",
    tuesday: "Day 2 - Your second day: handling real live telemetry (Lab 01)",
    wednesday: "Day 3 - Independent triage & false positive discernment (Lab 02)",
    thursday: "Day 4 - Incident triage, severity scoring & resource economics (Lab 03)",
    friday: "Day 5 - Cross-functional crisis coordination & incident escalation (Lab 04)",
  },
};

export const MENTOR_PERSONAS = {
  rajesh: {
    name: "Rajesh Kumar",
    role: "L1 SOC Analyst & Lead Mentor",
    avatar: "👨‍💻",
    badge: "L1 Mentor",
    greeting: "Rajesh pulls up a chair beside your dual-monitor workstation.",
  },
  priya: {
    name: "Priya Sharma",
    role: "L2 Incident Responder",
    avatar: "👩‍💼",
    badge: "L2 Incident Response",
    greeting: "Priya glances up from her live incident containment console.",
  },
  aditya: {
    name: "Aditya Deshmukh",
    role: "L3 Threat Hunter",
    avatar: "🕵️‍♂️",
    badge: "L3 Threat Intel",
    greeting: "Aditya adjusts his glasses and points to the threat actor signature matrix.",
  },
  elena: {
    name: "Elena Gomez",
    role: "SOC Operations Manager",
    avatar: "👩‍✈️",
    badge: "SOC Operations Manager",
    greeting: "Elena leans into the workstation with an urgent operational briefing.",
  },
};

export const LAB_DIALOGUES = {
  "lab-01": {
    opening: "Rajesh leans in: 'Okay, an alert just hit the queue: SEC-2026-0412. Your first real alert. Extract the 5 critical W's: WHO, WHAT, WHERE, WHEN, HOW MANY. Pivot across the 5 security consoles to build the story, then deliver your verdict.'",
    hints: [
      "Check the Email Gateway console to identify the exact recipient and sender spoofing indicators.",
      "Inspect the EDR console process tree to see what executable was launched when the attachment was opened.",
      "Check the Firewall / Threat Intel console to verify if the outbound callback IP is a known malicious C2.",
    ],
    review: "Rajesh is reviewing your 5-field triage writeup and verdict...",
  },
  "lab-02": {
    opening: "Rajesh says: 'Not every blip on the radar is an adversary. Half of an analyst's sanity comes from knowing what is benign noise vs. legitimate danger. Investigate all 4 alerts in your queue and classify each correctly.'",
    hints: [
      "For SEC-2026-0421, check whether the file creator is the local antivirus engine and if the created files are .tmp files.",
      "For SEC-2026-0422, note the time (03:00 AM) and verify whether svc_backup has an authorized IT maintenance window.",
      "For SEC-2026-0423, Base64 encoded PowerShell attempting persistence and C2 beaconing is virtually never benign.",
      "For SEC-2026-0424, check whether the SSIS job runs daily at 16:00 and is an approved ETL routine.",
    ],
    review: "Rajesh examines your false positive filtering decisions...",
  },
  "lab-03": {
    opening: "Elena Gomez steps over: 'Analyst, our queue is spiking with 6 concurrent incidents, and we have only 2 analysts on shift. Use the Severity Matrix (Asset Tier × Threat Confidence × Impact) to classify every incident and prioritize what we must remediate today.'",
    hints: [
      "Active ransomware encrypting Tier 1 file servers must always be rated CRITICAL (SLA: Immediate).",
      "Brute force attacks on Domain Admin accounts, even if currently failing, represent imminent Tier 0 compromise (HIGH).",
      "Blocked phishing with no user compromise is low impact and safely prioritized as LOW.",
    ],
    review: "Elena reviews your severity triage and shift allocation decisions...",
  },
  "lab-04": {
    opening: "Rajesh and Priya gather by your desk: 'Multi-host attack in progress. A spear phishing campaign compromised multiple hosts, a Domain Admin credential was hijacked, and 250 GB of data is moving. An L1 does not solve this alone—orchestrate the response by escalating to the correct specialists.'",
    hints: [
      "Containment and incident response orchestration is led by Priya Sharma (L2).",
      "Campaign-wide retrospective threat hunting and pattern analysis belongs to Aditya Deshmukh (L3).",
      "Remediating compromised Active Directory DA credentials requires the specialized Identity / AD Administration Team.",
      "Public relations, regulator notifications, and legal disclosures require Elena Gomez (SOC Manager).",
    ],
    review: "The entire FinCorp SOC team evaluates your incident coordination...",
  },
};
