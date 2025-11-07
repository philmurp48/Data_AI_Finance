import React from "react";
import { cn } from "@/lib/utils";
import { PremiumCard, PremiumCardHeader, PremiumCardTitle, PremiumCardContent } from "./premium-card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface DataTableFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  headerAction?: React.ReactNode;
  showPagination?: boolean;
  currentPage?: number;
  totalPages?: number;
  pageSize?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  children: React.ReactNode;
}

/**
 * Brand-compliant data table frame with consistent styling and pagination
 * Wraps table components with premium card styling and pagination controls
 */
export function DataTableFrame({
  title,
  description,
  headerAction,
  showPagination = true,
  currentPage = 1,
  totalPages = 1,
  pageSize = 50,
  totalItems,
  onPageChange,
  onPageSizeChange,
  children,
  className,
  ...props
}: DataTableFrameProps) {
  const showHeader = title || description || headerAction;
  
  const handlePageSizeChange = (value: string) => {
    onPageSizeChange?.(parseInt(value));
  };

  const startItem = totalItems ? (currentPage - 1) * pageSize + 1 : 0;
  const endItem = totalItems ? Math.min(currentPage * pageSize, totalItems) : 0;

  return (
    <PremiumCard className={className} {...props}>
      {showHeader && (
        <PremiumCardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              {title && (
                <PremiumCardTitle>{title}</PremiumCardTitle>
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
      
      <PremiumCardContent className="p-0">
        {/* Table container with scroll */}
        <div className="overflow-x-auto">
          {children}
        </div>
        
        {/* Pagination */}
        {showPagination && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              {/* Page size selector */}
              <div className="flex items-center gap-2">
                <span>Show:</span>
                <Select value={pageSize.toString()} onValueChange={handlePageSizeChange}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                    <SelectItem value="200">200</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Results info */}
              {totalItems && (
                <span className="tabular-nums">
                  Showing {startItem.toLocaleString()}-{endItem.toLocaleString()} of {totalItems.toLocaleString()}
                </span>
              )}
            </div>
            
            {/* Page navigation */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange?.(currentPage - 1)}
                disabled={currentPage <= 1}
                className="gap-1"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              
              <div className="flex items-center gap-1">
                {/* Page numbers */}
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum: number;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "ghost"}
                      size="sm"
                      onClick={() => onPageChange?.(pageNum)}
                      className="w-8 h-8 p-0"
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange?.(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="gap-1"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </PremiumCardContent>
    </PremiumCard>
  );
}

export interface StatusBadgeProps {
  status: string;
  variant?: "default" | "success" | "warning" | "danger" | "info";
  size?: "sm" | "md";
  className?: string;
}

/**
 * Standardized status badge for data tables
 * Consistent styling for status indicators across all tables
 */
export function StatusBadge({
  status,
  variant = "default",
  size = "sm",
  className
}: StatusBadgeProps) {
  const variantClasses = {
    default: "bg-gray-100 text-gray-800 border-gray-200",
    success: "bg-success-light text-success-dark border-success/20",
    warning: "bg-warning-light text-warning-dark border-warning/20", 
    danger: "bg-danger-light text-danger-dark border-danger/20",
    info: "bg-info-light text-info-dark border-info/20"
  };

  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium border",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {status}
    </span>
  );
}

export interface FinancialNumberProps {
  value: number;
  currency?: string;
  showSign?: boolean;
  precision?: number;
  className?: string;
}

/**
 * Standardized financial number formatting
 * Consistent styling for monetary values in tables and cards
 */
export function FinancialNumber({
  value,
  currency = "USD",
  showSign = false,
  precision = 2,
  className
}: FinancialNumberProps) {
  const isNegative = value < 0;
  const absValue = Math.abs(value);
  
  const formatValue = () => {
    const formatted = absValue.toLocaleString(undefined, {
      minimumFractionDigits: precision,
      maximumFractionDigits: precision
    });
    
    if (currency) {
      const symbol = currency === "USD" ? "$" : currency === "EUR" ? "€" : currency;
      return `${symbol}${formatted}`;
    }
    
    return formatted;
  };

  return (
    <span
      className={cn(
        "tabular-nums font-mono text-right",
        isNegative ? "text-danger-600" : showSign && value > 0 ? "text-success-600" : "text-gray-900",
        className
      )}
    >
      {isNegative && "-"}{showSign && !isNegative && value > 0 && "+"}{formatValue()}
    </span>
  );
}
