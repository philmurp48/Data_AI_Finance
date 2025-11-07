import React from "react";
import { cn } from "@/lib/utils";
import { PremiumCard, PremiumCardHeader, PremiumCardTitle, PremiumCardContent } from "./premium-card";

export interface ChartFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  height?: number;
  headerAction?: React.ReactNode;
  variant?: "default" | "compact";
  children: React.ReactNode;
}

/**
 * Brand-compliant chart frame component
 * Provides consistent styling and layout for all chart components
 */
export function ChartFrame({
  title,
  description,
  height = 300,
  headerAction,
  variant = "default",
  children,
  className,
  ...props
}: ChartFrameProps) {
  const showHeader = title || description || headerAction;

  return (
    <PremiumCard className={className} {...props}>
      {showHeader && (
        <PremiumCardHeader className={variant === "compact" ? "pb-2" : "pb-4"}>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              {title && (
                <PremiumCardTitle className={variant === "compact" ? "text-lg" : "text-xl"}>
                  {title}
                </PremiumCardTitle>
              )}
              {description && (
                <p className="text-sm text-gray-600 font-medium">
                  {description}
                </p>
              )}
            </div>
            {headerAction && (
              <div className="flex-shrink-0">
                {headerAction}
              </div>
            )}
          </div>
        </PremiumCardHeader>
      )}
      
      <PremiumCardContent className={variant === "compact" ? "pt-2" : "pt-0"}>
        <div
          style={{ height: `${height}px` }}
          className="w-full"
        >
          {children}
        </div>
      </PremiumCardContent>
    </PremiumCard>
  );
}

export interface ChartLegendProps {
  items: Array<{
    color: string;
    label: string;
    value?: string | number;
  }>;
  layout?: "horizontal" | "vertical";
  className?: string;
}

/**
 * Standardized chart legend component
 * Consistent styling for chart legends across the platform
 */
export function ChartLegend({ 
  items, 
  layout = "horizontal", 
  className 
}: ChartLegendProps) {
  return (
    <div 
      className={cn(
        "flex gap-4",
        layout === "vertical" && "flex-col gap-2",
        className
      )}
    >
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <span className="text-sm font-medium text-gray-700">
            {item.label}
          </span>
          {item.value && (
            <span className="text-sm text-gray-500 tabular-nums">
              {item.value}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
