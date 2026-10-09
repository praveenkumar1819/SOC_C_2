"use client";

import React, { useState } from "react";
import { LabId, LabCompletionResult } from "../types/lab.types";
import { useSocDashboardState } from "../hooks/useSocDashboardState";
import { useTourState } from "../hooks/useTourState";
import { SocHeader } from "./SocHeader";
import { AlertQueuePanel } from "./AlertQueuePanel";
import { AlertDetailPanel } from "./AlertDetailPanel";
import { LabTaskPanel } from "./LabTaskPanel";
import { LabControlsBar } from "./LabControlsBar";
import { DashboardTourOverlay } from "./DashboardTourOverlay";
import { LabCompletionModal } from "./LabCompletionModal";
import styles from "../styles/soc-dashboard.module.css";
import "../styles/soc-theme.css";

export interface SocDashboardContainerProps {
  labId: LabId;
  onComplete?: (result: LabCompletionResult) => void;
  onClose?: () => void;
  showTourFirst?: boolean;
  isModal?: boolean;
  isInline?: boolean;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
}

export const SocDashboardContainer: React.FC<SocDashboardContainerProps> = ({
  labId: initialLabId,
  onComplete,
  onClose,
  showTourFirst = false,
  isModal = false,
  isInline = false,
  isFullscreen = false,
  onToggleFullscreen,
}) => {
  const [currentLabId, setCurrentLabId] = useState<LabId>(initialLabId);

  const {
    scenarioData,
    alerts,
    selectedAlertId,
    selectedAlert,
    activeConsoleTab,
    evidenceChecklist,
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
    closeCompletionModal,
  } = useSocDashboardState(currentLabId, onComplete);

  const tour = useTourState(showTourFirst);

  const handleNextLab = () => {
    closeCompletionModal();
    if (currentLabId === "lab-01") setCurrentLabId("lab-02");
    else if (currentLabId === "lab-02") setCurrentLabId("lab-03");
    else if (currentLabId === "lab-03") setCurrentLabId("lab-04");
  };

  return (
    <div className={`soc-root flex flex-col h-full w-full bg-[#0a0e14] text-slate-100 overflow-hidden relative font-sans ${isInline ? "rounded-2xl" : ""}`}>
      {/* 1. Header */}
      <SocHeader
        labId={currentLabId}
        labTitle={scenarioData.title}
        elapsedSeconds={elapsedSeconds}
        onOpenTour={tour.startTour}
        onClose={onClose || (isFullscreen && onToggleFullscreen ? onToggleFullscreen : undefined)}
        isModal={isModal}
        isFullscreen={isFullscreen}
        onToggleFullscreen={onToggleFullscreen}
      />

      {/* 2. Main 3-Column Tactical SOC Layout */}
      <div className={`${isModal ? styles.modalDashboardGrid : styles.dashboardGrid} flex-1 min-h-0 w-full`}>
        {/* Left Column: Alert Queue */}
        <AlertQueuePanel
          alerts={alerts}
          selectedAlertId={selectedAlertId}
          onSelectAlert={selectAlert}
        />

        {/* Center Column: Alert Telemetry & 5 Consoles */}
        <AlertDetailPanel
          alert={selectedAlert}
          activeConsoleTab={activeConsoleTab}
          onTabChange={switchConsole}
          evidenceItems={evidenceChecklist}
        />

        {/* Right Column: Lab Mission Task */}
        <LabTaskPanel
          labId={currentLabId}
          answers={answers}
          onUpdateAnswers={updateAnswers}
        />
      </div>

      {/* 3. Bottom Controls Bar */}
      <LabControlsBar
        labId={currentLabId}
        hintsUsed={hintsUsed}
        currentHintText={currentHintText}
        onGetHint={getNextHint}
        onReset={resetLab}
        onSubmit={submitLab}
      />

      {/* 4. Orientation Tour Overlay */}
      <DashboardTourOverlay
        isOpen={tour.isTourOpen}
        currentStep={tour.currentStep}
        totalSteps={tour.totalSteps}
        stepData={tour.activeStepData}
        onNext={tour.nextStep}
        onPrev={tour.prevStep}
        onComplete={tour.completeTour}
      />

      {/* 5. Completion / Results Modal */}
      <LabCompletionModal
        isOpen={showCompletionModal}
        result={completionResult}
        onClose={closeCompletionModal}
        onRetry={resetLab}
        onNextLab={currentLabId !== "lab-04" ? handleNextLab : undefined}
      />
    </div>
  );
};
