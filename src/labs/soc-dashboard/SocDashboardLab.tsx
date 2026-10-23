"use client";

import React from "react";
import { SocDashboardContainer, SocDashboardContainerProps } from "./components/SocDashboardContainer";

export const SocDashboardLab: React.FC<SocDashboardContainerProps> = (props) => {
  return <SocDashboardContainer {...props} />;
};

export default SocDashboardLab;
