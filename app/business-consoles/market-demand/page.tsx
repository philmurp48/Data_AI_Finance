'use client';

import { motion } from 'framer-motion';
import {
    BarChart3,
    Brain,
    Database,
    FileText,
    Filter,
    Layers,
    Sparkles,
    TrendingUp
} from 'lucide-react';
import { useState } from 'react';
import Analytics from './Analytics';
import Bridge from './Bridge';
import BusinessNarrative from './BusinessNarrative';
import Custom from './Custom';
import DataView from './DataView';
import ExecutiveSummary from './ExecutiveSummary';

const tabs = [
    { id: 'executive-summary', name: 'Executive Summary', icon: Layers },
    { id: 'business-narrative', name: 'Business Narrative', icon: FileText },
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'bridge', name: 'Bridge', icon: TrendingUp },
    { id: 'data-view', name: 'Data View', icon: Database },
    { id: 'custom', name: 'Custom', icon: Sparkles }
];

export default function MarketDemandPage() {
    const [activeTab, setActiveTab] = useState('executive-summary');
    const [selectedRegion, setSelectedRegion] = useState('GMNA');
    const [selectedSite, setSelectedSite] = useState('All');
    const [selectedDivision, setSelectedDivision] = useState('All');
    const [selectedNameplate, setSelectedNameplate] = useState('All');
    const [selectedFunction, setSelectedFunction] = useState('All');
    const [selectedPeriod, setSelectedPeriod] = useState('Q');
    const [selectedComparison, setSelectedComparison] = useState('YoY');
    const [selectedTimeToggle, setSelectedTimeToggle] = useState('M/Q/Y');
    const [selectedValueView, setSelectedValueView] = useState('Total $');

    const renderContent = () => {
        const filters = {
            selectedRegion,
            selectedSite,
            selectedDivision,
            selectedNameplate,
            selectedFunction,
            selectedPeriod,
            selectedComparison,
            selectedTimeToggle,
            selectedValueView
        };

        switch (activeTab) {
            case 'executive-summary':
                return <ExecutiveSummary filters={filters} />;
            case 'business-narrative':
                return <BusinessNarrative />;
            case 'analytics':
                return <Analytics />;
            case 'bridge':
                return <Bridge />;
            case 'data-view':
                return <DataView />;
            case 'custom':
                return <Custom />;
            default:
                return <ExecutiveSummary filters={filters} />;
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
                                <div className="p-3 bg-cyan-gradient rounded-xl shadow-lg shadow-cyan-500/20">
                                    <TrendingUp className="w-8 h-8 text-navy-900" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-navy-900">Market & Demand Intelligence</h1>
                                    <p className="text-gray-600 mt-1">
                                        Real-time market insights and demand forecasting
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
                            <div className="flex items-center space-x-2">
                                <Filter className="w-4 h-4 text-gray-500" />
                                <span className="text-sm font-medium text-gray-700">View By:</span>
                            </div>

                            <select
                                value={selectedRegion}
                                onChange={(e) => setSelectedRegion(e.target.value)}
                                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            >
                                <option value="GMNA">GMNA</option>
                                <option value="GMI">GMI</option>
                                <option value="China">China</option>
                                <option value="Global">Global</option>
                            </select>

                            <select
                                value={selectedSite}
                                onChange={(e) => setSelectedSite(e.target.value)}
                                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            >
                                <option value="All">All Sites</option>
                                <option value="Arlington">Arlington</option>
                                <option value="Detroit">Detroit</option>
                                <option value="Flint">Flint</option>
                                <option value="Lansing">Lansing</option>
                                <option value="Spring Hill">Spring Hill</option>
                            </select>

                            <select
                                value={selectedDivision}
                                onChange={(e) => setSelectedDivision(e.target.value)}
                                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            >
                                <option value="All">All Divisions</option>
                                <option value="Chevrolet">Chevrolet</option>
                                <option value="Cadillac">Cadillac</option>
                                <option value="GMC">GMC</option>
                                <option value="Buick">Buick</option>
                            </select>

                            <select
                                value={selectedNameplate}
                                onChange={(e) => setSelectedNameplate(e.target.value)}
                                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            >
                                <option value="All">All</option>
                                <option value="Escalade">Escalade</option>
                                <option value="Tahoe">Tahoe</option>
                                <option value="Silverado">Silverado</option>
                                <option value="Sierra">Sierra</option>
                                <option value="Corvette">Corvette</option>
                            </select>

                            <select
                                value={selectedFunction}
                                onChange={(e) => setSelectedFunction(e.target.value)}
                                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            >
                                <option value="All">All</option>
                                <option value="Mfg">Mfg.</option>
                                <option value="Sales">Sales</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Service">Service</option>
                            </select>
                        </div>

                        {/* Center period controls */}
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center bg-gray-100 rounded-lg p-1">
                                <button
                                    onClick={() => setSelectedPeriod('D')}
                                    className={`px-3 py-1 text-sm font-medium rounded transition-colors ${selectedPeriod === 'D' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                                        }`}
                                >
                                    Daily
                                </button>
                                <button
                                    onClick={() => setSelectedPeriod('M')}
                                    className={`px-3 py-1 text-sm font-medium rounded transition-colors ${selectedPeriod === 'M' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                                        }`}
                                >
                                    Monthly
                                </button>
                                <button
                                    onClick={() => setSelectedPeriod('Q')}
                                    className={`px-3 py-1 text-sm font-medium rounded transition-colors ${selectedPeriod === 'Q' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                                        }`}
                                >
                                    Quarterly
                                </button>
                            </div>

                            <select
                                value={selectedComparison}
                                onChange={(e) => setSelectedComparison(e.target.value)}
                                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            >
                                <option value="YoY">vs Last Year</option>
                                <option value="QoQ">vs Last Quarter</option>
                                <option value="Plan">vs Plan</option>
                                <option value="Budget">vs Budget</option>
                            </select>
                        </div>

                        {/* Right side toggles */}
                        <div className="flex items-center space-x-3">
                            <span className="text-xs text-gray-500">Toggles:</span>
                            <select
                                value={selectedTimeToggle}
                                onChange={(e) => setSelectedTimeToggle(e.target.value)}
                                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            >
                                <option value="M/Q/Y">M/Q/Y</option>
                                <option value="J1/1210/1240">J1/1210/1240</option>
                            </select>

                            <select
                                value={selectedValueView}
                                onChange={(e) => setSelectedValueView(e.target.value)}
                                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            >
                                <option value="Total $">Total $</option>
                                <option value="By Unit">By Unit</option>
                            </select>
                        </div>
                    </div>

                    {/* Blue info banner - now below the filters */}
                    <div className="pb-3">
                        <div className="flex items-center px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                            <span className="text-xs text-blue-800">
                                High-level financials and metrics based on the Key Drivers from the Outcome Maps
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white border-b border-gray-200">
                <div className="px-4 sm:px-6 lg:px-8">
                    <nav className="flex space-x-8 -mb-px">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`
                                        flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors
                                        ${activeTab === tab.id
                                            ? 'border-cyan-500 text-cyan-600'
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