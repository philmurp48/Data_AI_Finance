'use client';

import { motion } from 'framer-motion';
import {
    AlertTriangle,
    BarChart3,
    Calendar,
    FileText,
    Layers,
    Target,
    TrendingUp,
    Shield
} from 'lucide-react';
import { useState } from 'react';
import ExecutiveDashboard from './ExecutiveDashboard';
import FinancialPerformance from './FinancialPerformance';
import ForwardOutlook from './ForwardOutlook';
import OperationalPerformance from './OperationalPerformance';
import RiskCompliance from './RiskCompliance';
import StrategicInitiatives from './StrategicInitiatives';

const tabs = [
    { id: 'executive-dashboard', name: 'Executive Dashboard', icon: Layers },
    { id: 'financial-performance', name: 'Financial Performance', icon: BarChart3 },
    { id: 'operational-performance', name: 'Operational Performance', icon: TrendingUp },
    { id: 'strategic-initiatives', name: 'Strategic Initiatives', icon: Target },
    { id: 'risk-compliance', name: 'Risk & Compliance', icon: Shield },
    { id: 'forward-outlook', name: 'Forward Outlook', icon: Calendar }
];

export default function MonthlyReportPage() {
    const [activeTab, setActiveTab] = useState('executive-dashboard');
    const [selectedPeriod, setSelectedPeriod] = useState('November 2024');
    const [selectedComparison, setSelectedComparison] = useState('vs Plan');

    const renderContent = () => {
        const filters = {
            selectedPeriod,
            selectedComparison
        };

        switch (activeTab) {
            case 'executive-dashboard':
                return <ExecutiveDashboard filters={filters} />;
            case 'financial-performance':
                return <FinancialPerformance filters={filters} />;
            case 'operational-performance':
                return <OperationalPerformance filters={filters} />;
            case 'strategic-initiatives':
                return <StrategicInitiatives filters={filters} />;
            case 'risk-compliance':
                return <RiskCompliance filters={filters} />;
            case 'forward-outlook':
                return <ForwardOutlook filters={filters} />;
            default:
                return <ExecutiveDashboard filters={filters} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="py-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl shadow-lg shadow-purple-500/20">
                                    <FileText className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-navy-900">Monthly Operating Report</h1>
                                    <p className="text-gray-600 mt-1">
                                        State of the Business • C-Suite Review
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Global Filters */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="py-3 flex items-center justify-between">
                        {/* Left side filters */}
                        <div className="flex items-center space-x-4">
                            <select
                                value={selectedPeriod}
                                onChange={(e) => setSelectedPeriod(e.target.value)}
                                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="November 2024">November 2024</option>
                                <option value="October 2024">October 2024</option>
                                <option value="September 2024">September 2024</option>
                                <option value="Q4 2024">Q4 2024</option>
                            </select>

                            <select
                                value={selectedComparison}
                                onChange={(e) => setSelectedComparison(e.target.value)}
                                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="vs Plan">vs Plan</option>
                                <option value="vs Last Year">vs Last Year</option>
                                <option value="vs Last Month">vs Last Month</option>
                                <option value="vs Budget">vs Budget</option>
                            </select>
                        </div>

                        {/* Right side status indicator */}
                        <div className="flex items-center space-x-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-xs font-medium text-green-800">
                                Report Status: Final
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white border-b border-gray-200">
                <div className="px-4 sm:px-6 lg:px-8">
                    <nav className="flex space-x-8 -mb-px overflow-x-auto">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`
                                        flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap
                                        ${activeTab === tab.id
                                            ? 'border-purple-500 text-purple-600'
                                            : 'border-transparent text-gray-500 hover:text-navy-900 hover:border-gray-300'
                                        }
                                    `}
                                >
                                    <Icon className="w-4 h-4" />
                                    <span>{tab.name}</span>
                                </button>
                            );
                        })}
                    </nav>
                </div>
            </div>

            {/* Content */}
            <div className="px-4 sm:px-6 lg:px-8 py-8">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {renderContent()}
                </motion.div>
            </div>
        </div>
    );
}
