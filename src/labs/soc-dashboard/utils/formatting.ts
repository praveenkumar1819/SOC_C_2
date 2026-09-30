export const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

export const getSeverityBadgeClass = (severity: string): string => {
  switch (severity.toUpperCase()) {
    case "CRITICAL":
      return "bg-red-500/20 text-red-400 border border-red-500/40";
    case "HIGH":
      return "bg-orange-500/20 text-orange-400 border border-orange-500/40";
    case "MEDIUM-HIGH":
      return "bg-amber-500/20 text-amber-300 border border-amber-500/40";
    case "MEDIUM":
      return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/40";
    case "LOW":
      return "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40";
    case "INFO":
    default:
      return "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40";
  }
};

export const getRiskScoreColor = (score: number): string => {
  if (score >= 80) return "text-red-400";
  if (score >= 50) return "text-amber-400";
  if (score >= 20) return "text-yellow-400";
  return "text-emerald-400";
};

export const truncateHash = (hash?: string, chars: number = 8): string => {
  if (!hash) return "N/A";
  if (hash.length <= chars * 2) return hash;
  return `${hash.slice(0, chars)}...${hash.slice(-chars)}`;
};

export const sanitizeAnswer = (val: string): string => {
  return val.trim().toLowerCase().replace(/\s+/g, " ");
};
