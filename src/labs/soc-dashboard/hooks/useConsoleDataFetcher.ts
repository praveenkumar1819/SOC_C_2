"use client";

import { useMemo } from "react";
import { getEmailLogsByAlert } from "../data/console-data/email-gateway-logs";
import { getEDRProcessTreeByAlert } from "../data/console-data/edr-process-trees";
import { getSIEMCorrelationByAlert } from "../data/console-data/siem-events";
import { getFirewallLogsByAlert } from "../data/console-data/firewall-logs";
import { getTimelineEventsByAlert } from "../data/console-data/timeline-events";
import {
  EmailLog,
  EDRProcessTree,
  SIEMCorrelation,
  FirewallLog,
  TimelineEvent,
} from "../types/lab.types";

export interface ConsoleDataSet {
  emailLogs: EmailLog[];
  edrTree: EDRProcessTree | null;
  siemCorrelation: SIEMCorrelation | null;
  firewallLogs: FirewallLog[];
  timelineEvents: TimelineEvent[];
}

export const useConsoleDataFetcher = (alertId: string): ConsoleDataSet => {
  return useMemo(() => {
    return {
      emailLogs: getEmailLogsByAlert(alertId),
      edrTree: getEDRProcessTreeByAlert(alertId),
      siemCorrelation: getSIEMCorrelationByAlert(alertId),
      firewallLogs: getFirewallLogsByAlert(alertId),
      timelineEvents: getTimelineEventsByAlert(alertId),
    };
  }, [alertId]);
};
