"use client";

import { useState, useEffect } from "react";
import { TourStep } from "../types/lab.types";

export const TOUR_STEPS: TourStep[] = [
  {
    element: "alert-queue-panel",
    title: "1. Incident & Alert Queue",
    description: "Your operational inbox. Every incoming security event, SIEM correlation, or heuristic detection arrives here. Click any alert to inspect its metadata.",
    position: "right",
  },
  {
    element: "alert-detail-panel",
    title: "2. Alert Details & Telemetry",
    description: "Inspect the core alert properties: impacted user, source IP, workstation hostname, detection rule, and event frequency.",
    position: "bottom",
  },
  {
    element: "console-tabs-nav",
    title: "3. 5 Security Investigation Consoles",
    description: "Switch seamlessly between Email Gateway, EDR Process Trees, SIEM Rules, Firewall / Threat Intel, and Chronological Timelines to uncover the full attack chain.",
    position: "bottom",
  },
  {
    element: "evidence-checklist-panel",
    title: "4. Evidence Checklist",
    description: "Track key pieces of telemetry you uncover as you investigate across the different security consoles.",
    position: "left",
  },
  {
    element: "lab-task-panel",
    title: "5. Operational Triage Task",
    description: "Your analyst mission for this lab. Extract critical fields, classify attack vs false positive, apply severity matrices, or orchestrate escalations.",
    position: "left",
  },
  {
    element: "lab-controls-bar",
    title: "6. SOC Controls & Submission",
    description: "Need guidance? Ask mentor Rajesh for a hint. When your investigation is complete, submit your findings for scoring and team review.",
    position: "top",
  },
];

export const useTourState = (initialOpen: boolean = false) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const tourCompleted = localStorage.getItem("soc_dashboard_tour_completed");
      if (!tourCompleted && initialOpen) {
        setIsOpen(true);
      }
    }
  }, [initialOpen]);

  const startTour = () => {
    setCurrentStep(0);
    setIsOpen(true);
  };

  const nextStep = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      completeTour();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const completeTour = () => {
    setIsOpen(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("soc_dashboard_tour_completed", "true");
    }
  };

  return {
    isTourOpen: isOpen,
    currentStep,
    totalSteps: TOUR_STEPS.length,
    activeStepData: TOUR_STEPS[currentStep],
    startTour,
    nextStep,
    prevStep,
    completeTour,
  };
};
