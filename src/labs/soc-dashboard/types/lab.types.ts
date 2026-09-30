export type LabId = "lab-01" | "lab-02" | "lab-03" | "lab-04";

export type ConsoleTab = "email" | "edr" | "siem" | "firewall" | "timeline";

export type AlertSeverity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export interface AlertSummary {
  id: string;
  rule: string;
  priority: "LOW" | "MEDIUM" | "MEDIUM-HIGH" | "HIGH" | "CRITICAL";
  generatedTime: string;
  timestamp: string;
  user: string;
  host: string;
  sourceIp: string;
  eventCount: number;
  status: "NEW" | "INVESTIGATING" | "ESCALATED" | "CLOSED";
  category?: string;
  description?: string;
  expectedClassification?: string;
  reasoningDetail?: string;
}

export interface EmailAttachment {
  filename: string;
  size: string | number;
  extension: string;
  isMacroEnabled: boolean;
  hash?: string;
  verdict?: string;
}

export interface EmailLog {
  id: string;
  timestamp: string;
  from: string;
  realSender?: string;
  to: string;
  subject: string;
  body?: string;
  attachment?: EmailAttachment;
  riskScore: number;
  verdictLabel: string;
  verdictColor: "success" | "warning" | "danger" | "info";
  indicators: string[];
}

export interface EDRNetworkAttempt {
  destination: string;
  protocol?: string;
  status: string;
  blockReason?: string;
}

export interface EDRProcessNode {
  name: string;
  pid: number;
  ppid?: number | null;
  commandLine?: string;
  timestamp: string;
  user?: string;
  status: "running" | "TERMINATED" | "blocked" | "exited";
  severity?: "INFO" | "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  action?: string;
  networkAttempt?: EDRNetworkAttempt;
  children?: EDRProcessNode[];
}

export interface EDRProcessTree {
  timestamp: string;
  host: string;
  user: string;
  processes: EDRProcessNode[];
}

export interface SIEMCorrelatedEvent {
  sequence: number;
  timestamp: string;
  source: string;
  eventType: string;
  description: string;
  severity: "info" | "warning" | "critical" | "success";
}

export interface SIEMCorrelation {
  alertId: string;
  rule: string;
  ruleDescription: string;
  priority: string;
  confidence: number;
  correlatedEvents: SIEMCorrelatedEvent[];
  verdict: string;
}

export interface ThreatIntelInfo {
  destination: string;
  reputation: string;
  knownGroup?: string;
  abuseReports?: number;
  previousIncidents?: number;
  lastSeen?: string;
  geoLocation?: string;
  riskLevel?: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
}

export interface FirewallLog {
  id: string;
  timestamp: string;
  sourceIp: string;
  sourcePort: number;
  destinationIp: string;
  destinationPort: number;
  protocol: string;
  action: "ALLOWED" | "BLOCKED" | "DROPPED";
  rule: string;
  dataTransferred: string;
  threatIntel?: ThreatIntelInfo;
}

export interface TimelineEvent {
  id: string;
  timestamp: string;
  timeOnly: string;
  source: "Email Gateway" | "EDR" | "SIEM" | "Firewall" | "Auth" | "System";
  event: string;
  details: string;
  severity: "info" | "low" | "medium" | "high" | "critical";
}

export interface EvidenceChecklistItem {
  id: string;
  label: string;
  consoleTab: ConsoleTab;
  discovered: boolean;
  hint: string;
}

// Lab 01 specific answers
export interface Lab01Answers {
  who: string;
  what: string;
  where: string;
  when: string;
  howMany: string;
  verdict: "TP" | "FP" | "BENIGN" | "";
  reasoning: string;
}

// Lab 02 specific answers
export interface Lab02Answers {
  classifications: Record<string, string>; // alertId -> "TRUE POSITIVE" | "FALSE POSITIVE" | "EXPECTED ACTIVITY"
  reasoning: Record<string, string>;
}

// Lab 03 specific answers
export interface Lab03Answers {
  severities: Record<string, "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" | "">;
  priorityDecision: string;
  reasoning: string;
}

// Lab 04 specific answers
export interface Lab04Answers {
  escalations: Record<string, string>;
  coordinationNotes: string;
}

export type AnyLabAnswers = Lab01Answers | Lab02Answers | Lab03Answers | Lab04Answers;

export interface ValidationResult {
  passed: boolean;
  score: number;
  fieldResults?: Record<string, boolean | number>;
  feedback: string;
  mentorName: string;
  mentorRole: string;
  detailedAnalysis?: string[];
}

export interface LabCompletionResult {
  labId: LabId;
  passed: boolean;
  score: number;
  timeSpent: number; // in seconds
  answers: AnyLabAnswers;
  feedback: string;
  timestamp: string;
  metrics?: {
    accuracy: number;
    consolesVisited: number;
    hintsUsed: number;
  };
}

export interface TourStep {
  element: string;
  title: string;
  description: string;
  position: "top" | "bottom" | "left" | "right";
  action?: "click" | "hover" | "wait";
}
