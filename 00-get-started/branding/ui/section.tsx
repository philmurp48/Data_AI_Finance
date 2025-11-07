import React from "react";
import { cn } from "@/lib/utils";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  description?: string;
  headerAction?: React.ReactNode;
  variant?: "default" | "compact" | "spacious";
  children: React.ReactNode;
}

/**
 * Brand-compliant section component with consistent spacing and typography
 * Provides standardized layout for page sections
 */
export function Section({
  title,
  description,
  headerAction,
  variant = "default",
  children,
  className,
  ...props
}: SectionProps) {
  const sectionClasses = cn(
    "space-y-6", // Default spacing
    variant === "compact" && "space-y-4",
    variant === "spacious" && "space-y-8",
    className
  );

  const showHeader = title || description || headerAction;

  return (
    <section className={sectionClasses} {...props}>
      {showHeader && (
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            {title && (
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-gray-600 font-medium">
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
      )}
      
      {children}
    </section>
  );
}
