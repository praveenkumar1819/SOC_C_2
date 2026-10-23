"use client";

import { useCallback } from "react";
import {
  LabId,
  AnyLabAnswers,
  Lab01Answers,
  Lab02Answers,
  Lab03Answers,
  Lab04Answers,
  ValidationResult,
} from "../types/lab.types";
import {
  validateLab01,
  validateLab02,
  validateLab03,
  validateLab04,
} from "../utils/validation";

export const useLabValidation = (labId: LabId) => {
  const validate = useCallback(
    (answers: AnyLabAnswers): ValidationResult => {
      switch (labId) {
        case "lab-01":
          return validateLab01(answers as Lab01Answers);
        case "lab-02":
          return validateLab02(answers as Lab02Answers);
        case "lab-03":
          return validateLab03(answers as Lab03Answers);
        case "lab-04":
          return validateLab04(answers as Lab04Answers);
        default:
          return {
            passed: false,
            score: 0,
            feedback: "Unknown Lab ID",
            mentorName: "Rajesh Kumar",
            mentorRole: "L1 Mentor",
          };
      }
    },
    [labId]
  );

  return { validate };
};
