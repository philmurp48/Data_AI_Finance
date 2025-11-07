"use client";

import { Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export interface BrandHeaderProps {
  title?: string;
  subtitle?: string;
  logoSrc?: string;
  showSearch?: boolean;
  showNotifications?: boolean;
  showUserMenu?: boolean;
  onSearchClick?: () => void;
  onUserClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Brand-compliant header component with dark premium gradient
 * Features Accenture logo, gradient text, and consistent styling
 */
export function BrandHeader({
  title = "Controller AI Workbench",
  subtitle = "AI-Powered R2R Platform",
  logoSrc = "/accenture-logo.png",
  showSearch = true,
  showNotifications = true,
  showUserMenu = true,
  onSearchClick,
  onUserClick,
  className = "",
  children,
  ...props
}: BrandHeaderProps) {
  return (
    <header 
      className={`sticky top-0 z-50 w-full border-b border-slate-800/50 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-2xl shadow-black/20 ${className}`}
      {...props}
    >
      <div className="flex h-16 items-center gap-4 px-8">
        {/* Logo and Title */}
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12">
            <Image
              src={logoSrc}
              alt="Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-xs text-primary-300 font-medium">{subtitle}</p>
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          {/* Custom children (like notifications dropdown) */}
          {children}

          {/* Search */}
          {showSearch && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onSearchClick}
              className="text-slate-300 hover:text-white hover:bg-white/10 rounded-xl"
            >
              <Search className="h-5 w-5" />
            </Button>
          )}

          {/* User menu */}
          {showUserMenu && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onUserClick}
              className="text-slate-300 hover:text-white hover:bg-white/10 rounded-xl"
            >
              <User className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
