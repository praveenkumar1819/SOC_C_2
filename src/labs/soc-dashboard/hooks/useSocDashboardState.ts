"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  LabId,
  ConsoleTab,
  AlertSummary,
  EvidenceChecklistItem,
  LabCompletionResult,
  Lab01Answers,
  Lab02Answers,
  Lab03Answers,
  Lab04Answers,
} from "../types/lab.types";
import { LAB_01_SCENARIO } from "../data/lab-scenarios/lab-01-basic-triage";
import { LAB_02_SCENARIO } from "../data/lab-scenarios/lab-02-false-positives";
import { LAB_03_SCENARIO } from "../data/lab-scenarios/lab-03-severity-classification";
import { LAB_04_SCENARIO } from "../data/lab-scenarios/lab-04-incident-escalation";
import { LAB_DIALOGUES } from "../data/module-04-integration";
import { useLabValidation } from "./useLabValidation";

const getDefaultAnswers = (labId: LabId) => {
  switch (labId) {
    case "lab-01":
      return {
        who: "",
        what: "",
        where: "",
        when: "",
        howMany: "",
        verdict: "",
        reasoning: "",
      } as Lab01Answers;
    case "lab-02":
      return {
        classifications: {},
        reasoning: {},
      } as Lab02Answers;
    case "lab-03":
      return {
        severities: {},
        priorityDecision: "",
        reasoning: "",
      } as Lab03Answers;
    case "lab-04":
      return {
        escalations: {},
        coordinationNotes: "",
      } as Lab04Answers;
  }
};

export const useSocDashboardState = (
  labId: LabId,
  onCompleteCallback?: (result: LabCompletionResult) => void
) => {
  const scenarioData = useMemo(() => {
    switch (labId) {
      case "lab-01":
        return LAB_01_SCENARIO;
      case "lab-02":
        return LAB_02_SCENARIO;
      case "lab-03":
        return LAB_03_SCENARIO;
      case "lab-04":
        return LAB_04_SCENARIO;
    }
  }, [labId]);

  const alerts = scenarioData.alerts;
  const initialAlertId = alerts[0]?.id || "";

  const [selectedAlertId, setSelectedAlertId] = useState<string>(initialAlertId);
  const [activeConsoleTab, setActiveConsoleTab] = useState<ConsoleTab>("email");
  const [evidenceChecklist, setEvidenceChecklist] = useState<EvidenceChecklistItem[]>(
    scenarioData.evidenceChecklist
  );
  const [visitedConsoles, setVisitedConsoles] = useState<Set<ConsoleTab>>(
    new Set(["email"])
  );
  const [answers, setAnswers] = useState<any>(() => getDefaultAnswers(labId));
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [hintsUsed, setHintsUsed] = useState<number>(0);
  const [activeHintIndex, setActiveHintIndex] = useState<number>(-1);
  const [showCompletionModal, setShowCompletionModal] = useState<boolean>(false);
  const [completionResult, setCompletionResult] = useState<LabCompletionResult | null>(null);

  const { validate } = useLabValidation(labId);

  // Synchronize when labId changes
  useEffect(() => {
    setSelectedAlertId(alerts[0]?.id || "");
    setActiveConsoleTab("email");
    setVisitedConsoles(new Set(["email"]));
    setEvidenceChecklist(scenarioData.evidenceChecklist);
    setAnswers(getDefaultAnswers(labId));
    setElapsedSeconds(0);
    setHintsUsed(0);
    setActiveHintIndex(-1);
    setShowCompletionModal(false);
    setCompletionResult(null);
  }, [labId, alerts, scenarioData]);

  // Elapsed time counter
  useEffect(() => {
    if (!isTimerRunning) return;
    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Handle switching consoles and discovering evidence
  const switchConsole = useCallback((tab: ConsoleTab) => {
    setActiveConsoleTab(tab);
    setVisitedConsoles((prev) => new Set([...prev, tab]));

    // Mark evidence as discovered if related to this console
    setEvidenceChecklist((prev) =>
      prev.map((item) =>
        item.consoleTab === tab ? { ...item, discovered: true } : item
      )
    );
  }, []);

  const selectAlert = useCallback((alertId: string) => {
    setSelectedAlertId(alertId);
  }, []);

  const updateAnswers = useCallback((updater: (prev: any) => any) => {
    setAnswers(updater);
  }, []);

  const getNextHint = useCallback(() => {
    const hints = LAB_DIALOGUES[labId]?.hints || [];
    if (hints.length === 0) return null;
    const nextIdx = (activeHintIndex + 1) % hints.length;
    setActiveHintIndex(nextIdx);
    setHintsUsed((prev) => prev + 1);
    return hints[nextIdx];
  }, [labId, activeHintIndex]);

  const resetLab = useCallback(() => {
    setAnswers(getDefaultAnswers(labId));
    setEvidenceChecklist(scenarioData.evidenceChecklist);
    setActiveHintIndex(-1);
    setShowCompletionModal(false);
    setCompletionResult(null);
  }, [labId, scenarioData]);

  const submitLab = useCallback(() => {
    const validation = validate(answers);
    const result: LabCompletionResult = {
      labId,
      passed: validation.passed,
      score: validation.score,
      timeSpent: elapsedSeconds,
      answers,
      feedback: validation.feedback,
      timestamp: new Date().toISOString(),
      metrics: {
        accuracy: validation.score,
        consolesVisited: visitedConsoles.size,
        hintsUsed,
      },
    };

    setCompletionResult(result);
    setShowCompletionModal(true);
    if (result.passed) {
      setIsTimerRunning(false);
    }
    if (onCompleteCallback) {
      onCompleteCallback(result);
    }
    return result;
  }, [validate, answers, labId, elapsedSeconds, visitedConsoles.size, hintsUsed, onCompleteCallback]);

  const currentHintText = useMemo(() => {
    if (activeHintIndex < 0) return null;
    return LAB_DIALOGUES[labId]?.hints[activeHintIndex] || null;
  }, [labId, activeHintIndex]);

  return {
    labId,
    scenarioData,
    alerts,
    selectedAlertId,
    selectedAlert: alerts.find((a) => a.id === selectedAlertId) || alerts[0],
    activeConsoleTab,
    evidenceChecklist,
    visitedConsoles,
    answers,
    elapsedSeconds,
    hintsUsed,
    currentHintText,
    showCompletionModal,
    completionResult,
    selectAlert,
    switchConsole,
    updateAnswers,
    getNextHint,
    resetLab,
    submitLab,
    closeCompletionModal: () => setShowCompletionModal(false),
  };
};
