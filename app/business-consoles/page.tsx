'use client';

import { businessConsoles } from '@/lib/business-console-drivers';
import { AnimatePresence, motion } from 'framer-motion';
import {
    BarChart3,
    ChevronRight,
    Grid,
    Minus,
    Search,
    TrendingDown,
    TrendingUp
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// Category definitions
const categories = [
    { id: 'all', name: 'All Consoles', icon: Grid },
    { id: 'commercial', name: 'Commercial Performance', icon: TrendingUp },
    { id: 'operational', name: 'Operational Performance', icon: BarChart3 },
    { id: 'financial', name: 'Financial Performance', icon: TrendingUp },
    { id: 'risk', name: 'Risk & Compliance', icon: BarChart3 }
];

// Map consoles to categories
const consoleCategories: Record<string, string> = {
    'market-demand': 'commercial',
    'product-mix': 'commercial',
    'volume': 'commercial',
    'pricing': 'commercial',
    'product-line-profitability': 'operational',
    'adjacencies': 'operational',
    'production-build-plan': 'operational',
    'inventory': 'operational',
    'consolidated-results-expectations': 'financial',
    'capital-allocation-management': 'financial',
    'compliance': 'risk',
    'risk': 'risk',
    'sensitivities': 'risk',
    'competitors': 'risk'
};

// Generate synthetic performance data for drivers
const generatePerformanceData = (driverName: string) => {
    // Generate random but consistent data based on driver name
    const hash = driverName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const value = ((hash % 40) - 20) / 10; // Range: -2.0 to +2.0
    const trend = value > 0.5 ? 'up' : value < -0.5 ? 'down' : 'stable';
    const status = value > 0.5 ? 'good' : value < -0.5 ? 'poor' : 'warning';

    return {
        value: value.toFixed(1),
        percentage: Math.abs(value * 10).toFixed(1),
        trend,
        status,
        metric: `${Math.abs(hash % 100)}%` // Some metric value
    };
};

// Get color classes based on status
const getStatusColors = (status: string) => {
    switch (status) {
        case 'good':
            return {
                bg: 'bg-green-50',
                border: 'border-green-200',
                text: 'text-green-700',
                icon: 'text-green-600'
            };
        case 'warning':
            return {
                bg: 'bg-yellow-50',
                border: 'border-yellow-200',
                text: 'text-yellow-700',
                icon: 'text-yellow-600'
            };
        case 'poor':
            return {
                bg: 'bg-red-50',
                border: 'border-red-200',
                text: 'text-red-700',
                icon: 'text-red-600'
            };
        default:
            return {
                bg: 'bg-gray-50',
                border: 'border-gray-200',
                text: 'text-gray-700',
                icon: 'text-gray-600'
            };
    }
};

export default function BusinessConsolesPage() {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedConsole, setSelectedConsole] = useState('market-demand');
    const [expandedDrivers, setExpandedDrivers] = useState<Set<string>>(new Set()); // Start with everything collapsed

    // Filter consoles based on category and search
    const filteredConsoles = businessConsoles.filter(console => {
        const matchesCategory = selectedCategory === 'all' || consoleCategories[console.id] === selectedCategory;
        const matchesSearch = console.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            console.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Get selected console data for performance tree
    const selectedConsoleData = businessConsoles.find(c => c.id === selectedConsole);

    // Toggle driver expansion
    const toggleDriver = (driverId: string) => {
        const newExpanded = new Set(expandedDrivers);
        if (newExpanded.has(driverId)) {
            newExpanded.delete(driverId);
        } else {
            newExpanded.add(driverId);
        }
        setExpandedDrivers(newExpanded);
    };

    // Render performance driver tree
    const renderDriverTree = () => {
        if (!selectedConsoleData) return null;

        return (
            <div className="space-y-4">
                {/* Metrics Breakdown - Show how drivers contribute to each metric */}
                {selectedConsoleData.metrics.map((metric, metricIndex) => {
                    const metricPerf = generatePerformanceData(metric.label);
                    const metricColors = getStatusColors(metric.trend === 'up' ? 'good' : metric.trend === 'down' ? 'poor' : 'warning');

                    return (
                        <div key={metricIndex} className="space-y-2">
                            {/* Metric Header */}
                            <div className={`${metricColors.bg} ${metricColors.border} border rounded-lg p-3 shadow-sm`}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-medium text-sm text-gray-900">{metric.label}</h4>
                                        <p className="text-lg font-bold text-gray-900">{metric.value}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center space-x-1">
                                            {metric.trend === 'up' && <TrendingUp className={`w-4 h-4 ${metricColors.icon}`} />}
                                            {metric.trend === 'down' && <TrendingDown className={`w-4 h-4 ${metricColors.icon}`} />}
                                            {metric.trend === 'stable' && <Minus className={`w-4 h-4 ${metricColors.icon}`} />}
                                            <span className={`text-sm font-bold ${metricColors.text}`}>
                                                {metric.change > 0 ? '+' : ''}{metric.change}%
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-500">{metric.trend === 'up' ? 'vs last period' : metric.trend === 'down' ? 'vs last period' : 'stable'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Key Drivers Contributing to this Metric */}
                            <div className="ml-8 space-y-1">
                                {selectedConsoleData.keyDrivers.slice(metricIndex * 3, (metricIndex * 3) + 3).map((driver, driverIndex) => {
                                    const globalIndex = metricIndex * 3 + driverIndex;
                                    const driverPerf = generatePerformanceData(driver.name);
                                    const driverColors = getStatusColors(driverPerf.status);
                                    const isExpanded = expandedDrivers.has(String(globalIndex));

                                    return (
                                        <div key={globalIndex} className="relative">
                                            {/* Connector from metric to driver */}
                                            <div className="absolute -left-8 top-3 w-8 h-0.5 bg-gray-300"></div>

                                            <div className={`${driverColors.bg} ${driverColors.border} border rounded p-2 shadow-sm`}>
                                                <div
                                                    className="flex items-center justify-between cursor-pointer"
                                                    onClick={() => driver.subDrivers && driver.subDrivers.length > 0 && toggleDriver(String(globalIndex))}
                                                >
                                                    <div className="flex items-center space-x-1">
                                                        {driver.subDrivers && driver.subDrivers.length > 0 && (
                                                            <ChevronRight className={`w-3 h-3 text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                                                        )}
                                                        <span className="text-xs font-medium text-gray-900">{driver.name}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-1">
                                                        <span className={`text-xs ${driverColors.text}`}>
                                                            {Number(driverPerf.value) > 0 ? '+' : ''}{driverPerf.percentage}%
                                                        </span>
                                                        {driverPerf.trend === 'up' && <TrendingUp className={`w-2.5 h-2.5 ${driverColors.icon}`} />}
                                                        {driverPerf.trend === 'down' && <TrendingDown className={`w-2.5 h-2.5 ${driverColors.icon}`} />}
                                                    </div>
                                                </div>

                                                {/* Sub-drivers - Only show when expanded */}
                                                {isExpanded && driver.subDrivers && driver.subDrivers.length > 0 && (
                                                    <div className="mt-2 ml-4 space-y-0.5 text-xs">
                                                        {driver.subDrivers.slice(0, 2).map((subDriver, subIndex) => {
                                                            const subPerf = generatePerformanceData(subDriver);
                                                            const subColors = getStatusColors(subPerf.status);

                                                            return (
                                                                <div key={subIndex} className="flex items-center justify-between py-0.5">
                                                                    <span className="text-gray-600 truncate pr-2">• {subDriver}</span>
                                                                    <span className={`${subColors.text} text-xs`}>
                                                                        {subPerf.percentage}%
                                                                    </span>
                                                                </div>
                                                            );
                                                        })}
                                                        {driver.subDrivers.length > 2 && (
                                                            <p className="text-gray-400 pl-2">+{driver.subDrivers.length - 2} more</p>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}

                {/* Additional Drivers Section */}
                {selectedConsoleData.keyDrivers.length > 6 && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-xs text-gray-500 text-center">
                            {selectedConsoleData.keyDrivers.length - 6} additional drivers influence overall performance
                        </p>
                    </div>
                )}
            </div>
        );
    };

    const handleConsoleSelect = (consoleId: string) => {
        setSelectedConsole(consoleId);
    };

    const handleViewConsole = (consoleId: string) => {
        // Navigate to the console page when View Console button is clicked
        if (consoleId === 'market-demand') {
            router.push('/business-consoles/market-demand');
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="py-6">
                        <h1 className="text-3xl font-bold text-navy-900">Business Insight Consoles</h1>
                        <p className="mt-2 text-gray-600">
                            Comprehensive business intelligence across all key performance areas
                        </p>
                    </div>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="py-4 space-y-4">
                        {/* Search Bar */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search consoles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                            />
                        </div>

                        {/* Category Tabs */}
                        <div className="flex space-x-1 overflow-x-auto">
                            {categories.map((category) => {
                                const Icon = category.icon;
                                const count = category.id === 'all'
                                    ? businessConsoles.length
                                    : businessConsoles.filter(c => consoleCategories[c.id] === category.id).length;

                                return (
                                    <button
                                        key={category.id}
                                        onClick={() => setSelectedCategory(category.id)}
                                        className={`
                                            flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap
                                            ${selectedCategory === category.id
                                                ? 'bg-cyan-50 text-cyan-700 border-2 border-cyan-500'
                                                : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border-2 border-transparent'
                                            }
                                        `}
                                    >
                                        <Icon className="w-4 h-4" />
                                        <span>{category.name}</span>
                                        <span className={`
                                            px-2 py-0.5 rounded-full text-xs font-semibold
                                            ${selectedCategory === category.id
                                                ? 'bg-cyan-100 text-cyan-700'
                                                : 'bg-gray-200 text-gray-600'
                                            }
                                        `}>
                                            {count}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Console Cards */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-navy-900 mb-4">Select a Console</h2>

                        <AnimatePresence mode="popLayout">
                            {filteredConsoles.map((console, index) => {
                                const Icon = console.icon;
                                const isSelected = selectedConsole === console.id;

                                return (
                                    <motion.div
                                        key={console.id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ delay: index * 0.05 }}
                                        className={`
                                            relative rounded-xl p-4 cursor-pointer transition-all
                                            ${isSelected
                                                ? 'bg-navy-gradient border-2 border-cyan-500 shadow-lg shadow-cyan-500/20'
                                                : `${console.bgColor} hover:shadow-md border-2 ${console.borderColor}`
                                            }
                                        `}
                                        onClick={() => handleConsoleSelect(console.id)}
                                    >
                                        <div className="flex items-start space-x-3">
                                            <div className={`
                                                p-2.5 rounded-lg flex-shrink-0
                                                ${isSelected
                                                    ? 'bg-cyan-gradient shadow-lg shadow-cyan-500/50'
                                                    : `${console.bgColor} ${console.iconColor}`
                                                }
                                            `}>
                                                <Icon className={`w-5 h-5 ${isSelected ? 'text-navy-900' : ''}`} />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div className="flex-1">
                                                        <h3 className={`font-semibold text-base leading-tight ${isSelected ? 'text-white' : 'text-navy-900'}`}>
                                                            {console.title}
                                                        </h3>
                                                        <p className={`text-xs mt-1 leading-relaxed ${isSelected ? 'text-cyan-100' : 'text-gray-600'}`}>
                                                            {console.description}
                                                        </p>
                                                    </div>
                                                    <div className="ml-3 flex-shrink-0">
                                                        {console.status === 'View Console' && (
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleViewConsole(console.id);
                                                                }}
                                                                className={`
                                                                    px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                                                                    ${isSelected
                                                                        ? 'bg-cyan-gradient text-navy-900 hover:shadow-lg hover:shadow-cyan-500/50 border border-cyan-500'
                                                                        : 'bg-cyan-600 text-white hover:bg-cyan-700 hover:shadow-md'
                                                                    }
                                                                `}
                                                            >
                                                                View Console →
                                                            </button>
                                                        )}
                                                        {console.status === 'Coming Soon' && (
                                                            <span className={`
                                                                inline-block px-3 py-1.5 rounded-lg text-xs font-medium
                                                                ${isSelected
                                                                    ? 'bg-white/20 text-cyan-200 border border-cyan-400/30'
                                                                    : 'bg-gray-50 text-gray-500 border border-gray-200'
                                                                }
                                                            `}>
                                                                Coming Soon
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Metrics - More compact */}
                                                <div className="grid grid-cols-2 gap-3">
                                                    {console.metrics.map((metric) => (
                                                        <div key={metric.label} className={`${isSelected ? 'bg-white/10' : 'bg-white'} rounded-lg px-3 py-2`}>
                                                            <p className={`text-xs ${isSelected ? 'text-cyan-200' : 'text-gray-500'}`}>
                                                                {metric.label}
                                                            </p>
                                                            <div className="flex items-baseline space-x-2 mt-0.5">
                                                                <p className={`text-sm font-semibold ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                                                                    {metric.value}
                                                                </p>
                                                                <p className={`text-xs flex items-center ${metric.trend === 'up' ? (isSelected ? 'text-green-400' : 'text-green-600') :
                                                                    metric.trend === 'down' ? (isSelected ? 'text-red-400' : 'text-red-600') :
                                                                        (isSelected ? 'text-gray-300' : 'text-gray-400')
                                                                    }`}>
                                                                    {metric.trend === 'up' && '↑'}
                                                                    {metric.trend === 'down' && '↓'}
                                                                    {metric.trend === 'stable' && '→'}
                                                                    {metric.change > 0 ? '+' : ''}{metric.change}%
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>

                    {/* Performance Driver Tree */}
                    <div className="lg:sticky lg:top-32">
                        <h2 className="text-lg font-semibold text-navy-900 mb-2">
                            Performance Driver Tree
                        </h2>
                        <p className="text-xs text-gray-600 mb-4">
                            Shows key drivers contributing to each metric. Click to expand details.
                        </p>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                            {renderDriverTree()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}