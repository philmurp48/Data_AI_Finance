import React from "react";
import { Bot, Sparkles, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AgentBadgeProps {
  agentCode?: string;
  agentName?: string;
  status?: "idle" | "processing" | "completed" | "error";
  confidence?: number;
  size?: "sm" | "md" | "lg";
  variant?: "subtle" | "prominent" | "compact";
  showIcon?: boolean;
  showStatus?: boolean;
  showConfidence?: boolean;
  className?: string;
}

/**
 * Brand-compliant AI agent badge component
 * Provides consistent styling for AI agent indicators throughout the platform
 */
export function AgentBadge({
  agentCode,
  agentName,
  status = "idle",
  confidence,
  size = "md",
  variant = "subtle",
  showIcon = true,
  showStatus = false,
  showConfidence = false,
  className,
}: AgentBadgeProps) {
  const sizeClasses = {
    sm: "text-xs px-2 py-1 gap-1",
    md: "text-sm px-3 py-1.5 gap-2", 
    lg: "text-base px-4 py-2 gap-2"
  };

  const variantClasses = {
    subtle: "bg-agent-50 text-agent-900 border border-agent-200",
    prominent: "bg-gradient-to-r from-agent-500 to-agent-600 text-white shadow-lg",
    compact: "bg-agent-100 text-agent-800 border border-agent-300"
  };

  const statusIcons = {
    idle: Bot,
    processing: Clock,
    completed: CheckCircle,
    error: AlertCircle
  };

  const StatusIcon = statusIcons[status];

  const getStatusColor = () => {
    switch (status) {
      case "processing": return "text-warning-600";
      case "completed": return "text-success-600";
      case "error": return "text-danger-600";
      default: return "text-agent-600";
    }
  };

  const displayText = agentCode || agentName || "AI";

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full font-medium transition-all duration-200",
        sizeClasses[size],
        variantClasses[variant],
        variant === "prominent" && "hover:shadow-xl hover:scale-105",
        className
      )}
    >
      {showIcon && (
        <div className={cn("flex-shrink-0", showStatus && getStatusColor())}>
          {showStatus ? (
            <StatusIcon className={size === "sm" ? "h-3 w-3" : "h-4 w-4"} />
          ) : (
            <Bot className={size === "sm" ? "h-3 w-3" : "h-4 w-4"} />
          )}
        </div>
      )}

      <span className="font-semibold">{displayText}</span>

      {showConfidence && confidence && (
        <span className={cn(
          "text-xs opacity-75",
          variant === "prominent" ? "text-white/80" : "text-agent-600"
        )}>
          {confidence}%
        </span>
      )}
    </div>
  );
}

export interface AgentWorkflowStepProps {
  step: string;
  status: "completed" | "active" | "pending";
  description?: string;
  confidence?: number;
  className?: string;
}

/**
 * Agent workflow step indicator
 * Shows progress through AI agent processes with visual status indicators
 */
export function AgentWorkflowStep({
  step,
  status,
  description,
  confidence,
  className
}: AgentWorkflowStepProps) {
  const statusColors = {
    completed: "bg-success text-success-foreground",
    active: "bg-agent text-white",
    pending: "bg-gray-200 text-gray-600"
  };

  const stepNumber = status === "completed" ? "✓" : status === "active" ? "•" : "○";

  return (
    <div className={cn("flex items-start gap-3", className)}>
      <div className={cn(
        "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
        statusColors[status]
      )}>
        {stepNumber}
      </div>
      
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <span className={cn(
            "font-medium",
            status === "completed" ? "text-gray-900" : status === "active" ? "text-agent-900" : "text-gray-500"
          )}>
            {step}
          </span>
          
          {confidence && status !== "pending" && (
            <span className="text-xs text-gray-500 tabular-nums">
              {confidence}%
            </span>
          )}
        </div>
        
        {description && (
          <p className="text-sm text-gray-600">{description}</p>
        )}
      </div>
    </div>
  );
}

export interface AgentProcessIndicatorProps {
  title?: string;
  steps: Array<{
    step: string;
    status: "completed" | "active" | "pending";
    description?: string;
    confidence?: number;
  }>;
  className?: string;
}

/**
 * Complete AI agent process indicator
 * Shows full workflow progress with multiple steps
 */
export function AgentProcessIndicator({
  title,
  steps,
  className
}: AgentProcessIndicatorProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {title && (
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-agent-500" />
          <h4 className="font-semibold text-gray-900">{title}</h4>
        </div>
      )}
      
      <div className="space-y-3">
        {steps.map((step, index) => (
          <AgentWorkflowStep
            key={index}
            step={step.step}
            status={step.status}
            description={step.description}
            confidence={step.confidence}
          />
        ))}
      </div>
    </div>
  );
}
