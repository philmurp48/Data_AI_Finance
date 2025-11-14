'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
    BarChart3,
    Brain,
    FileText,
    Grid,
    Home,
    LayoutDashboard,
    LogOut,
    Menu,
    Repeat,
    Search,
    TrendingUp,
    X
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ManagementReportingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [shouldPulse, setShouldPulse] = useState(false);
    const pathname = usePathname();

    // Check if we're on the home page to set initial menu state
    useEffect(() => {
        const isHomePage = pathname === '/';
        if (isHomePage) {
            setIsMenuOpen(false);
            setShouldPulse(true);
            // Stop pulsing after 3 seconds
            const timer = setTimeout(() => setShouldPulse(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [pathname]);

    const navigationItems = [
        {
            title: 'Home',
            href: '/',
            icon: Home,
            subItems: []
        },
        {
            title: 'Executive Summary',
            href: '/executive-summary',
            icon: LayoutDashboard,
            subItems: []
        },
        {
            title: 'Monthly Operating Report',
            href: '/monthly-report',
            icon: FileText,
            subItems: []
        },
        {
            title: 'Business Insight Consoles',
            href: '/business-consoles',
            icon: BarChart3,
            subItems: [
                { title: 'Market & Demand', href: '/business-consoles/market-demand' },
                { title: 'Sales Performance', href: '/business-consoles/sales-performance' },
                { title: 'Operations & Supply Chain', href: '/business-consoles/operations' },
                { title: 'Financial Performance', href: '/business-consoles/financial-performance' },
                { title: 'Product & Innovation', href: '/business-consoles/product-innovation' },
                { title: 'Customer Experience', href: '/business-consoles/customer-experience' }
            ]
        },
        {
            title: 'Scenario Modeling',
            href: '/scenario-modeling',
            icon: TrendingUp,
            subItems: []
        },
        {
            title: 'Report HUB',
            href: '/report-hub',
            icon: Grid,
            subItems: []
        },
        {
            title: 'Month-end Close',
            href: '/month-end-close',
            icon: TrendingUp,
            subItems: []
        },
        {
            title: 'Connected Enterprise Planning',
            href: '/connected-planning',
            icon: Repeat,
            subItems: []
        },
        {
            title: 'AI Agents',
            href: '/ai-agents',
            icon: Brain,
            subItems: []
        }
    ];

    // Check if we're on the home page
    const isHomePage = pathname === '/';

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="bg-navy-gradient border-b border-gray-700">
                <div className="flex items-center justify-between h-16 px-4">
                    {/* Left side - Menu toggle and Platform Title */}
                    <div className="flex items-center space-x-4 flex-1">
                        {/* Menu Toggle Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={`p-2 rounded-lg hover:bg-white/10 transition-all ${shouldPulse && !isMenuOpen ? 'animate-safari-pulse bg-purple-500/20' : ''
                                }`}
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? (
                                <X className="w-5 h-5 text-white" />
                            ) : (
                                <Menu className="w-5 h-5 text-white" />
                            )}
                        </button>

                        {/* Platform Title */}
                        <h1 className="text-lg font-semibold text-white">
                            Finance360
                        </h1>
                    </div>

                    {/* Center - Search Bar (hidden on home page) */}
                    {!isHomePage && (
                        <div className="flex-1 max-w-2xl mx-4">
                            <div className="flex items-center">
                                <div className="relative flex-1">
                                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Ask me anything about your business..."
                                        className="w-full pl-12 pr-4 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-l-full text-sm text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                </div>
                                <button className="px-8 py-2.5 bg-purple-gradient text-white font-medium rounded-r-full hover:shadow-lg hover:shadow-purple-500/50 transition-all text-sm whitespace-nowrap border border-purple-500">
                                    AI Search
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Right side - User info and more (hidden on home page) */}
                    {!isHomePage && (
                        <div className="flex items-center space-x-4 flex-1 justify-end">
                            <div className="flex items-center space-x-3">
                                <div className="text-right">
                                    <p className="text-sm font-medium text-white">Sarah Johnson</p>
                                    <p className="text-xs text-gray-300">Finance Executive</p>
                                </div>
                                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-purple-500/50">
                                    <img
                                        src="/images/Sarah-Johnson-Finance-Executive-headshot.png"
                                        alt="Sarah Johnson"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Slide-out Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMenuOpen(false)}
                            className="fixed inset-0 bg-black bg-opacity-50 z-40"
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ x: -320 }}
                            animate={{ x: 0 }}
                            exit={{ x: -320 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed left-0 top-0 bottom-0 w-80 bg-navy-gradient shadow-2xl z-50 flex flex-col border-r border-gray-700"
                        >
                            {/* Menu Header */}
                            <div className="p-6 border-b border-gray-700">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-white">Finance360</h2>
                                    <button
                                        onClick={() => setIsMenuOpen(false)}
                                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                    >
                                        <X className="w-5 h-5 text-white" />
                                    </button>
                                </div>
                            </div>

                            {/* Navigation Links */}
                            <nav className="flex-1 overflow-y-auto p-4">
                                <div className="space-y-1">
                                    {navigationItems.map((item) => {
                                        const Icon = item.icon;
                                        const isActive = pathname === item.href;
                                        return (
                                            <Link
                                                key={item.title}
                                                href={item.href}
                                                onClick={() => setIsMenuOpen(false)}
                                                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${isActive
                                                    ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30 shadow-lg shadow-purple-500/20'
                                                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                                                    }`}
                                            >
                                                <Icon className={`w-5 h-5 ${isActive ? 'text-purple-400' : ''}`} />
                                                <span className="font-medium">{item.title}</span>
                                                {isActive && (
                                                    <motion.div
                                                        layoutId="activeIndicator"
                                                        className="absolute left-0 w-1 h-8 bg-purple-400 rounded-r-full"
                                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                    />
                                                )}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </nav>

                            {/* User Section - Simplified */}
                            <div className="mb-6 p-4 bg-black/20 rounded-lg mx-4">
                                <div className="flex items-center space-x-3 mb-2">
                                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-purple-500/50">
                                        <img
                                            src="/images/Sarah-Johnson-Finance-Executive-headshot.png"
                                            alt="Sarah Johnson"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-white">Sarah Johnson</p>
                                        <p className="text-xs text-gray-400">Finance Executive</p>
                                    </div>
                                </div>
                                <Link href="/ai-alerts" className="block w-full mt-3 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-left">
                                    AI Alert System
                                </Link>
                                <button
                                    onClick={() => {
                                        document.cookie = 'isAuthenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
                                        // Clear disclaimer acknowledgment so it shows again on next login
                                        localStorage.removeItem('disclaimerAcknowledged');
                                        window.location.href = '/login';
                                    }}
                                    className="w-full mt-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-left flex items-center space-x-2"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content Area */}
            <div className="flex-1 overflow-auto bg-gray-50">
                {children}
            </div>
        </div>
    );
} 