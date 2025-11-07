import * as React from "react";
import { cn } from "@/lib/utils";

const PremiumCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // Base premium card styling
      "premium-card",
      "relative overflow-hidden rounded-xl border border-slate-200/60 bg-white",
      // Premium shadows and transitions
      "shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1",
      // Enhanced hover effects with purple tints
      "hover:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.08),0_16px_32px_-8px_rgba(139,92,246,0.15)]",
      "hover:border-primary-500/30",
      className
    )}
    {...props}
  />
));
PremiumCard.displayName = "PremiumCard";

const PremiumCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6 pb-4", className)} {...props} />
));
PremiumCardHeader.displayName = "PremiumCardHeader";

const PremiumCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-xl font-bold leading-none tracking-tight text-gray-900", className)}
    {...props}
  />
));
PremiumCardTitle.displayName = "PremiumCardTitle";

const PremiumCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-gray-600 font-medium", className)} {...props} />
));
PremiumCardDescription.displayName = "PremiumCardDescription";

const PremiumCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
PremiumCardContent.displayName = "PremiumCardContent";

const PremiumCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
));
PremiumCardFooter.displayName = "PremiumCardFooter";

export interface KPICardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  description?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  variant?: "default" | "success" | "warning" | "danger";
  icon?: React.ReactNode;
}

/**
 * Brand-compliant KPI card with premium styling
 * Used for displaying key metrics and performance indicators
 */
export function KPICard({
  title,
  value,
  description,
  trend,
  trendValue,
  variant = "default",
  icon,
  className,
  ...props
}: KPICardProps) {
  const variantClasses = {
    default: "card-accent-primary",
    success: "card-accent-success", 
    warning: "card-accent-warning",
    danger: "card-accent-danger"
  };

  const trendClasses = {
    up: "text-success-dark",
    down: "text-danger-dark",
    neutral: "text-gray-500"
  };

  return (
    <PremiumCard className={cn(variantClasses[variant], className)} {...props}>
      <PremiumCardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <PremiumCardTitle className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
            {title}
          </PremiumCardTitle>
          {icon && (
            <div className="text-primary-500">
              {icon}
            </div>
          )}
        </div>
      </PremiumCardHeader>
      <PremiumCardContent>
        <div className="space-y-2">
          <div className="text-3xl font-bold text-gray-900 tabular-nums">
            {value}
          </div>
          <div className="flex items-center gap-2 text-sm">
            {description && (
              <span className="text-gray-600 font-medium">{description}</span>
            )}
            {trend && trendValue && (
              <span className={cn("font-semibold", trendClasses[trend])}>
                {trendValue}
              </span>
            )}
          </div>
        </div>
      </PremiumCardContent>
    </PremiumCard>
  );
}

export {
  PremiumCard,
  PremiumCardHeader,
  PremiumCardFooter,
  PremiumCardTitle,
  PremiumCardDescription,
  PremiumCardContent,
};
