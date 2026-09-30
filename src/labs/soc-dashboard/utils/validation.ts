import {
  Lab01Answers,
  Lab02Answers,
  Lab03Answers,
  Lab04Answers,
  ValidationResult,
} from "../types/lab.types";
import { LAB_01_SCENARIO } from "../data/lab-scenarios/lab-01-basic-triage";
import { LAB_02_SCENARIO } from "../data/lab-scenarios/lab-02-false-positives";
import { LAB_03_SCENARIO } from "../data/lab-scenarios/lab-03-severity-classification";
import { LAB_04_SCENARIO } from "../data/lab-scenarios/lab-04-incident-escalation";
import { calculateReasoningScore, calculateWeightedScore } from "./scoring";
import { sanitizeAnswer } from "./formatting";

export const validateLab01 = (answers: Lab01Answers): ValidationResult => {
  const fieldResults: Record<string, boolean> = {};
  let correctFieldCount = 0;

  LAB_01_SCENARIO.taskFields.forEach((field) => {
    const rawVal = answers[field.key as keyof Lab01Answers] || "";
    const cleanVal = sanitizeAnswer(rawVal);
    const isMatch = field.acceptedAnswers.some((accepted) =>
      cleanVal.includes(accepted.toLowerCase())
    );

    fieldResults[field.key] = isMatch;
    if (isMatch) correctFieldCount++;
  });

  const verdictMatch = answers.verdict === LAB_01_SCENARIO.verdictQuestion.correctValue;
  fieldResults["verdict"] = verdictMatch;

  const reasoningEval = calculateReasoningScore(answers.reasoning || "", [
    "spoof",
    "macro",
    "powershell",
    "c2",
    "invoice",
    "attack",
    "blocked",
  ]);

  const fieldScore = (correctFieldCount / LAB_01_SCENARIO.taskFields.length) * 100;
  const verdictScore = verdictMatch ? 100 : 0;

  const totalScore = calculateWeightedScore([
    { weight: 0.5, score: fieldScore },
    { weight: 0.3, score: verdictScore },
    { weight: 0.2, score: reasoningEval.score },
  ]);

  const passed = totalScore >= 75 && verdictMatch && correctFieldCount >= 4;

  let feedback = "";
  if (passed) {
    feedback = `Outstanding work! Rajesh Kumar (your mentor) gives a nod:
"You nailed the 5 critical fields and correctly identified this spear-phishing attack as a True Positive. 
You traced the malicious chain from spoofed invoice email → macro execution → PowerShell spawn → blocked C2 beacon. 
Your technical reasoning demonstrates genuine SOC analyst competence."`;
  } else {
    feedback = `Rajesh Kumar pulls up your submission:
"Not quite ready to sign off yet. Check the fields marked in red. 
Make sure you extract the exact target user (mchen), workstation hostname, internal IP, and process execution timestamp from the consoles. 
Remember: WINWORD spawning PowerShell is a classic True Positive attack vector."`;
  }

  return {
    passed,
    score: totalScore,
    fieldResults,
    feedback,
    mentorName: LAB_01_SCENARIO.mentorName,
    mentorRole: LAB_01_SCENARIO.mentorRole,
    detailedAnalysis: [
      `Target Extraction: ${correctFieldCount}/${LAB_01_SCENARIO.taskFields.length} fields correct`,
      `Verdict: ${verdictMatch ? "Correct (True Positive)" : "Incorrect"}`,
      `Reasoning Depth: ${reasoningEval.matchedTerms.length} threat indicators cited (${reasoningEval.score}%)`,
    ],
  };
};

export const validateLab02 = (answers: Lab02Answers): ValidationResult => {
  const fieldResults: Record<string, boolean> = {};
  let correctCount = 0;

  LAB_02_SCENARIO.alerts.forEach((alert) => {
    const userChoice = answers.classifications?.[alert.id];
    const isMatch = userChoice === alert.expectedClassification;
    fieldResults[alert.id] = isMatch;
    if (isMatch) correctCount++;
  });

  const accuracy = (correctCount / LAB_02_SCENARIO.alerts.length) * 100;
  const passed = correctCount >= 3; // 75%+ passing threshold

  let feedback = "";
  if (passed) {
    feedback = `Rajesh Kumar smiles with approval:
"Excellent discrimination! You avoided falling into the classic trap of alert fatigue.
You recognized that SEC-0421 was Defender unpacking files, SEC-0422 was an authorized 3 AM backup, SEC-0423 was an active Cobalt Strike attack, and SEC-0424 was daily developer ETL.
Distinguishing benign anomalies from real threat actors is what defines a dependable SOC analyst."`;
  } else {
    feedback = `Rajesh points at your classification table:
"You had trouble separating routine maintenance from attack telemetry. Look closely at process lineage in EDR (is it MsMpEng or an unknown script?) and check whether service accounts (svc_backup, developer_svc) have authorized IT tickets and schedules."`;
  }

  return {
    passed,
    score: Math.round(accuracy),
    fieldResults,
    feedback,
    mentorName: LAB_02_SCENARIO.mentorName,
    mentorRole: LAB_02_SCENARIO.mentorRole,
    detailedAnalysis: [
      `Alert Classifications: ${correctCount}/${LAB_02_SCENARIO.alerts.length} correct`,
      `SEC-0421 (AV Temp Files): ${fieldResults["SEC-2026-0421"] ? "Correct (False Positive)" : "Incorrect"}`,
      `SEC-0422 (Backup Service): ${fieldResults["SEC-2026-0422"] ? "Correct (Expected Activity)" : "Incorrect"}`,
      `SEC-0423 (Encoded PowerShell): ${fieldResults["SEC-2026-0423"] ? "Correct (True Positive)" : "Incorrect"}`,
      `SEC-0424 (Database ETL): ${fieldResults["SEC-2026-0424"] ? "Correct (Expected Activity)" : "Incorrect"}`,
    ],
  };
};

export const validateLab03 = (answers: Lab03Answers): ValidationResult => {
  const fieldResults: Record<string, boolean> = {};
  let correctCount = 0;

  LAB_03_SCENARIO.incidents.forEach((inc) => {
    const userChoice = answers.severities?.[inc.id];
    const isMatch = userChoice === inc.correctSeverity;
    fieldResults[inc.id] = isMatch;
    if (isMatch) correctCount++;
  });

  const priorityMatch = answers.priorityDecision === "PRIORITY_A";
  fieldResults["priorityDecision"] = priorityMatch;

  const incidentScore = (correctCount / LAB_03_SCENARIO.incidents.length) * 100;
  const priorityScore = priorityMatch ? 100 : 0;

  const totalScore = calculateWeightedScore([
    { weight: 0.7, score: incidentScore },
    { weight: 0.3, score: priorityScore },
  ]);

  const passed = correctCount >= 5 && priorityMatch;

  let feedback = "";
  if (passed) {
    feedback = `Elena Gomez (SOC Operations Manager) applauds your strategy:
"Outstanding triage economics! You recognized that active ransomware on a file server (INC-005) is an existential emergency (CRITICAL), while brute-force against a Domain Admin (INC-004) demands urgent defense (HIGH).
You correctly allocated our 8 hours of analyst capacity to containment rather than burning hours on routine password resets."`;
  } else {
    feedback = `Elena Gomez reviews your prioritization:
"In a real crisis, this queue allocation would cause a breach. Remember: Active ongoing damage to Tier 4 assets (ransomware encrypting servers) must always take absolute precedence over isolated or blocked perimeter probes."`;
  }

  return {
    passed,
    score: totalScore,
    fieldResults,
    feedback,
    mentorName: LAB_03_SCENARIO.mentorName,
    mentorRole: LAB_03_SCENARIO.mentorRole,
    detailedAnalysis: [
      `Severity Matrix Precision: ${correctCount}/${LAB_03_SCENARIO.incidents.length} correct`,
      `Shift Resource Allocation: ${priorityMatch ? "Optimal (CRITICAL + HIGH priority)" : "Sub-optimal"}`,
    ],
  };
};

export const validateLab04 = (answers: Lab04Answers): ValidationResult => {
  const fieldResults: Record<string, boolean> = {};
  let correctCount = 0;

  LAB_04_SCENARIO.escalationDecisions.forEach((dec) => {
    const userChoice = answers.escalations?.[dec.id];
    const isMatch = userChoice === dec.correctAnswer;
    fieldResults[dec.id] = isMatch;
    if (isMatch) correctCount++;
  });

  const totalDecisions = LAB_04_SCENARIO.escalationDecisions.length;
  const score = Math.round((correctCount / totalDecisions) * 100);
  const passed = correctCount >= 5;

  let feedback = "";
  if (passed) {
    feedback = `The FinCorp SOC leadership team congratulates you:
Elena Gomez: "You demonstrated what makes a great SOC analyst: knowing when and where to escalate. Priya coordinated containment, Aditya hunted the campaign, the Identity and Firewall teams neutralized credentials and C2 channels, and leadership notified counsel."
Rajesh Kumar: "Training week is officially completed. Welcome to the FinCorp SOC team!"`;
  } else {
    feedback = `Rajesh and Priya review your escalation routing:
"You misrouted critical responsibilities. Remember: an L1 analyst must never attempt to solo an active multi-system breach. L2 orchestrates containment, L3 conducts proactive campaign threat hunting, and specialized engineering teams handle Domain Admin resets and firewall rules."`;
  }

  return {
    passed,
    score,
    fieldResults,
    feedback,
    mentorName: LAB_04_SCENARIO.mentorName,
    mentorRole: LAB_04_SCENARIO.mentorRole,
    detailedAnalysis: [
      `Escalation Routing Accuracy: ${correctCount}/${totalDecisions} correct (${score}%)`,
      `Incident Orchestrator: ${fieldResults["esc-1"] ? "Correct (Priya Sharma - L2)" : "Incorrect"}`,
      `Threat Campaign Hunter: ${fieldResults["esc-2"] ? "Correct (Aditya Deshmukh - L3)" : "Incorrect"}`,
      `Active Directory / DA Reset: ${fieldResults["esc-3"] ? "Correct (Identity Team)" : "Incorrect"}`,
      `Firewall C2 Block: ${fieldResults["esc-4"] ? "Correct (Firewall Team)" : "Incorrect"}`,
      `Exfiltration Forensics: ${fieldResults["esc-5"] ? "Correct (Database Team)" : "Incorrect"}`,
      `Crisis Disclosure & Legal: ${fieldResults["esc-6"] ? "Correct (Elena Gomez - Manager)" : "Incorrect"}`,
    ],
  };
};
