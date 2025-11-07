// Brand UI Components Index
// Reusable components extracted from Controller AI Workbench prototype

export { BrandHeader } from "./header";
export type { BrandHeaderProps } from "./header";

export { Section } from "./section";
export type { SectionProps } from "./section";

export {
  PremiumCard,
  PremiumCardHeader,
  PremiumCardFooter,
  PremiumCardTitle,
  PremiumCardDescription,
  PremiumCardContent,
  KPICard
} from "./premium-card";
export type { KPICardProps } from "./premium-card";

export { ChartFrame, ChartLegend } from "./chart-frame";
export type { ChartFrameProps, ChartLegendProps } from "./chart-frame";

export {
  AgentBadge,
  AgentWorkflowStep,
  AgentProcessIndicator
} from "./agent-badge";
export type {
  AgentBadgeProps,
  AgentWorkflowStepProps,
  AgentProcessIndicatorProps
} from "./agent-badge";

export {
  DataTableFrame,
  StatusBadge,
  FinancialNumber
} from "./data-table-frame";
export type {
  DataTableFrameProps,
  StatusBadgeProps,
  FinancialNumberProps
} from "./data-table-frame";

// Brand constants and utilities
export const BRAND_COLORS = {
  primary: "#8b5cf6",
  secondary: "#3b82f6",
  success: "#10b981",
  warning: "#f59e0b",
  danger: "#ef4444",
  agent: "#8b5cf6"
} as const;

export const CHART_COLORS = [
  "#8b5cf6", // Primary purple
  "#3b82f6", // Blue
  "#10b981", // Success green
  "#f59e0b", // Warning amber
  "#ef4444", // Danger red
  "#6b7280"  // Neutral gray
] as const;

export const FINANCIAL_STATUS_COLORS = {
  completed: "#10b981",
  inProgress: "#f59e0b",
  pending: "#3b82f6",
  blocked: "#ef4444",
  notStarted: "#6b7280"
} as const;
