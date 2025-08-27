'use client';

import {
    AlertCircle,
    AlertTriangle,
    BarChart3,
    Bell,
    Brain,
    Calculator,
    Calendar,
    CheckCircle,
    Clock,
    DollarSign,
    Edit2,
    FileCheck,
    FileText,
    GitBranch,
    Lock,
    MessageSquare,
    Plus,
    Shield,
    Zap
} from 'lucide-react';
import { useState } from 'react';

// Define tab structure
const closeTabs = [
    { id: 'overview', name: 'Process Overview', icon: GitBranch },
    { id: 'journal-entries', name: 'Journal Entries', icon: Calculator },
    { id: 'financial-results', name: 'Financial Results', icon: BarChart3 },
    { id: 'adjustments', name: 'Adjustments', icon: Edit2 },
    { id: 'commentary', name: 'Commentary', icon: MessageSquare },
    { id: 'controls', name: 'Controls & Approvals', icon: Shield }
];

// Mock data for different sections
const processPhases = [
    { id: 'pre-close', name: 'Pre-Close', status: 'completed', progress: 100, days: '1-3' },
    { id: 'erp', name: 'ERP Activities', status: 'completed', progress: 100, days: '4-5' },
    { id: 'journals', name: 'Journal Processing', status: 'in-progress', progress: 65, days: '5-7' },
    { id: 'review', name: 'Review & Analysis', status: 'pending', progress: 0, days: '7-9' },
    { id: 'consolidation', name: 'Consolidation', status: 'pending', progress: 0, days: '9-10' },
    { id: 'reporting', name: 'Reporting', status: 'pending', progress: 0, days: '11-12' }
];

const journalEntryData = {
    summary: {
        totalEntries: 342,
        totalAmount: 125400000,
        recurring: 198,
        manual: 87,
        topside: 23,
        automated: 34,
        pendingApproval: 12
    },
    recentEntries: [
        {
            id: 'JE-2024-001',
            description: 'Monthly Depreciation',
            type: 'Recurring',
            amount: 2500000,
            status: 'Posted',
            preparer: 'System',
            approver: 'Sarah Chen',
            postDate: '2024-11-05'
        },
        {
            id: 'JE-2024-002',
            description: 'Accrued Bonus Provision',
            type: 'Manual',
            amount: 5200000,
            status: 'Pending Approval',
            preparer: 'Michael Torres',
            approver: 'CFO',
            postDate: '2024-11-06'
        },
        {
            id: 'JE-2024-003',
            description: 'Inventory Obsolescence Reserve',
            type: 'Topside',
            amount: -1800000,
            status: 'Draft',
            preparer: 'Lisa Wang',
            approver: 'Controller',
            postDate: '2024-11-06'
        }
    ],
    volumeTrend: [
        { month: 'Jul', count: 298, amount: 98500000 },
        { month: 'Aug', count: 312, amount: 102300000 },
        { month: 'Sep', count: 325, amount: 110200000 },
        { month: 'Oct', count: 338, amount: 118700000 },
        { month: 'Nov', count: 342, amount: 125400000 }
    ]
};

const financialResults = {
    pl: {
        revenue: { actual: 245000000, prior: 238000000, budget: 242000000 },
        cogs: { actual: 147000000, prior: 145000000, budget: 145200000 },
        grossProfit: { actual: 98000000, prior: 93000000, budget: 96800000 },
        opex: { actual: 45000000, prior: 43500000, budget: 44000000 },
        ebitda: { actual: 53000000, prior: 49500000, budget: 52800000 },
        netIncome: { actual: 35000000, prior: 32000000, budget: 34500000 }
    },
    bs: {
        totalAssets: { current: 1250000000, prior: 1180000000 },
        totalLiabilities: { current: 650000000, prior: 620000000 },
        equity: { current: 600000000, prior: 560000000 },
        workingCapital: { current: 180000000, prior: 165000000 }
    }
};

const adjustmentQueue = [
    {
        id: 'ADJ-001',
        description: 'Revenue Recognition Adjustment - Contract XYZ',
        impact: { pl: -1200000, bs: 1200000 },
        status: 'pending',
        priority: 'high',
        deadline: '2024-11-08',
        preparer: 'Revenue Team'
    },
    {
        id: 'ADJ-002',
        description: 'FX Revaluation - EUR Exposure',
        impact: { pl: 450000, bs: -450000 },
        status: 'approved',
        priority: 'medium',
        deadline: '2024-11-09',
        preparer: 'Treasury'
    }
];

export default function MonthEndClose() {
    const [activeTab, setActiveTab] = useState('overview');
    const [selectedView, setSelectedView] = useState('pl'); // For financial results
    const [showFilters, setShowFilters] = useState(false);
    const [expandedItems, setExpandedItems] = useState<string[]>([]);

    const toggleExpanded = (id: string) => {
        setExpandedItems(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between py-4">
                        <div className="flex items-center space-x-4">
                            <div className="p-2 bg-cyan-gradient rounded-lg shadow-lg glow-cyan">
                                <Calculator className="w-6 h-6 text-navy-900" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Month-End Close Command Center</h1>
                                <p className="text-sm text-gray-600">November 2024 • Day 6 of 12 • On Track</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <button className="px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2">
                                <Bell className="w-4 h-4" />
                                <span>Alerts (3)</span>
                            </button>
                            <button className="px-4 py-1.5 text-sm bg-cyan-gradient text-navy-900 rounded-lg font-semibold hover:shadow-lg glow-cyan-hover transition-all flex items-center space-x-2">
                                <FileCheck className="w-4 h-4" />
                                <span>Close Checklist</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white border-b border-gray-200">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="flex space-x-8 overflow-x-auto">
                        {closeTabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 whitespace-nowrap ${activeTab === tab.id
                                            ? 'border-cyan text-cyan'
                                            : 'border-transparent text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    <span>{tab.name}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="px-4 sm:px-6 lg:px-8 py-6">
                {/* Process Overview Tab */}
                {activeTab === 'overview' && (
                    <div className="space-y-6">
                        {/* Overall Progress */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Close Progress</h3>
                            <div className="space-y-4">
                                {processPhases.map((phase) => (
                                    <div key={phase.id} className="flex items-center space-x-4">
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-sm font-medium text-gray-900">{phase.name}</span>
                                                <span className="text-xs text-gray-500">{phase.days}</span>
                                            </div>
                                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full transition-all ${phase.status === 'completed' ? 'bg-green-500' :
                                                            phase.status === 'in-progress' ? 'bg-blue-500' :
                                                                'bg-gray-300'
                                                        }`}
                                                    style={{ width: `${phase.progress}%` }}
                                                />
                                            </div>
                                        </div>
                                        <div className="w-24 text-right">
                                            {phase.status === 'completed' && <CheckCircle className="w-5 h-5 text-green-500 inline" />}
                                            {phase.status === 'in-progress' && <Clock className="w-5 h-5 text-blue-500 inline" />}
                                            {phase.status === 'pending' && <AlertCircle className="w-5 h-5 text-gray-400 inline" />}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Key Metrics */}
                        <div className="grid grid-cols-4 gap-4">
                            <div className="bg-white rounded-lg border border-gray-200 p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-600">Tasks Completed</span>
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                </div>
                                <p className="text-2xl font-bold text-gray-900">24/38</p>
                                <p className="text-xs text-gray-500 mt-1">63% complete</p>
                            </div>
                            <div className="bg-white rounded-lg border border-gray-200 p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-600">Journal Entries</span>
                                    <Calculator className="w-4 h-4 text-blue-500" />
                                </div>
                                <p className="text-2xl font-bold text-gray-900">342</p>
                                <p className="text-xs text-gray-500 mt-1">12 pending</p>
                            </div>
                            <div className="bg-white rounded-lg border border-gray-200 p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-600">Adjustments</span>
                                    <Edit2 className="w-4 h-4 text-orange-500" />
                                </div>
                                <p className="text-2xl font-bold text-gray-900">5</p>
                                <p className="text-xs text-gray-500 mt-1">$2.4M impact</p>
                            </div>
                            <div className="bg-white rounded-lg border border-gray-200 p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-600">Days to Close</span>
                                    <Calendar className="w-4 h-4 text-purple-500" />
                                </div>
                                <p className="text-2xl font-bold text-gray-900">6</p>
                                <p className="text-xs text-gray-500 mt-1">6 remaining</p>
                            </div>
                        </div>

                        {/* Critical Items */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">Critical Path Items</h3>
                                <span className="text-sm text-red-600 font-medium">3 items need attention</span>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg border border-red-200">
                                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900">Revenue recognition adjustment pending</p>
                                        <p className="text-xs text-gray-600 mt-1">$1.2M impact - requires CFO approval by EOD</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                                    <Clock className="w-5 h-5 text-orange-600 mt-0.5" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900">Intercompany reconciliation in progress</p>
                                        <p className="text-xs text-gray-600 mt-1">65% complete - blocking consolidation</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                                    <Bell className="w-5 h-5 text-yellow-600 mt-0.5" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900">Bank reconciliation pending confirmations</p>
                                        <p className="text-xs text-gray-600 mt-1">Awaiting 3 bank confirmations</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Journal Entries Tab */}
                {activeTab === 'journal-entries' && (
                    <div className="space-y-6">
                        {/* JE Summary */}
                        <div className="grid grid-cols-4 gap-4">
                            <div className="bg-white rounded-lg border border-gray-200 p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-600">Total Entries</span>
                                    <FileText className="w-4 h-4 text-blue-500" />
                                </div>
                                <p className="text-2xl font-bold text-gray-900">{journalEntryData.summary.totalEntries}</p>
                                <p className="text-xs text-green-600 mt-1">+4.4% vs last month</p>
                            </div>
                            <div className="bg-white rounded-lg border border-gray-200 p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-600">Total Amount</span>
                                    <DollarSign className="w-4 h-4 text-green-500" />
                                </div>
                                <p className="text-2xl font-bold text-gray-900">${(journalEntryData.summary.totalAmount / 1000000).toFixed(1)}M</p>
                                <p className="text-xs text-gray-500 mt-1">Gross value</p>
                            </div>
                            <div className="bg-white rounded-lg border border-gray-200 p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-600">Automated</span>
                                    <Zap className="w-4 h-4 text-purple-500" />
                                </div>
                                <p className="text-2xl font-bold text-gray-900">{Math.round((journalEntryData.summary.automated / journalEntryData.summary.totalEntries) * 100)}%</p>
                                <p className="text-xs text-gray-500 mt-1">{journalEntryData.summary.automated} entries</p>
                            </div>
                            <div className="bg-white rounded-lg border border-gray-200 p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-600">Pending</span>
                                    <Clock className="w-4 h-4 text-orange-500" />
                                </div>
                                <p className="text-2xl font-bold text-gray-900">{journalEntryData.summary.pendingApproval}</p>
                                <p className="text-xs text-orange-600 mt-1">Requires approval</p>
                            </div>
                        </div>

                        {/* JE Volume Trend */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Journal Entry Volume Trend</h3>
                            <div className="h-48 flex items-end space-x-4">
                                {journalEntryData.volumeTrend.map((month, idx) => (
                                    <div key={month.month} className="flex-1 flex flex-col items-center">
                                        <div className="w-full bg-blue-100 rounded-t" style={{
                                            height: `${(month.count / 350) * 100}%`
                                        }}>
                                            <div className="text-xs font-medium text-center pt-2">{month.count}</div>
                                        </div>
                                        <div className="text-xs text-gray-600 mt-2">{month.month}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Journal Entries */}
                        <div className="bg-white rounded-lg border border-gray-200">
                            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900">Recent Journal Entries</h3>
                                <button className="text-sm text-cyan hover:text-cyan-700 font-medium">View All</button>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {journalEntryData.recentEntries.map((entry) => (
                                    <div key={entry.id} className="p-4 hover:bg-gray-50">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-3">
                                                    <span className="text-sm font-medium text-gray-900">{entry.id}</span>
                                                    <span className={`text-xs px-2 py-0.5 rounded-full ${entry.type === 'Recurring' ? 'bg-blue-100 text-blue-700' :
                                                            entry.type === 'Manual' ? 'bg-gray-100 text-gray-700' :
                                                                'bg-purple-100 text-purple-700'
                                                        }`}>
                                                        {entry.type}
                                                    </span>
                                                    <span className={`text-xs px-2 py-0.5 rounded-full ${entry.status === 'Posted' ? 'bg-green-100 text-green-700' :
                                                            entry.status === 'Pending Approval' ? 'bg-orange-100 text-orange-700' :
                                                                'bg-gray-100 text-gray-700'
                                                        }`}>
                                                        {entry.status}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-600 mt-1">{entry.description}</p>
                                                <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                                                    <span>Preparer: {entry.preparer}</span>
                                                    <span>Approver: {entry.approver}</span>
                                                    <span>Post Date: {entry.postDate}</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className={`text-lg font-semibold ${entry.amount >= 0 ? 'text-gray-900' : 'text-red-600'}`}>
                                                    ${Math.abs(entry.amount / 1000000).toFixed(2)}M
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Financial Results Tab */}
                {activeTab === 'financial-results' && (
                    <div className="space-y-6">
                        {/* View Toggle */}
                        <div className="flex items-center justify-between">
                            <div className="flex space-x-1 p-1 bg-gray-100 rounded-lg">
                                <button
                                    onClick={() => setSelectedView('pl')}
                                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${selectedView === 'pl'
                                            ? 'bg-white text-gray-900 shadow-sm'
                                            : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                >
                                    P&L Statement
                                </button>
                                <button
                                    onClick={() => setSelectedView('bs')}
                                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${selectedView === 'bs'
                                            ? 'bg-white text-gray-900 shadow-sm'
                                            : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                >
                                    Balance Sheet
                                </button>
                            </div>
                            <button className="px-3 py-2 text-sm bg-cyan-gradient text-navy-900 rounded-lg font-medium hover:shadow-lg glow-cyan-hover transition-all">
                                Export Results
                            </button>
                        </div>

                        {/* P&L View */}
                        {selectedView === 'pl' && (
                            <div className="bg-white rounded-lg border border-gray-200">
                                <div className="p-4 border-b border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900">Profit & Loss Statement</h3>
                                    <p className="text-sm text-gray-600">November 2024 (in millions)</p>
                                </div>
                                <div className="p-4">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="text-sm text-gray-600 border-b">
                                                <th className="text-left py-2">Line Item</th>
                                                <th className="text-right py-2">Actual</th>
                                                <th className="text-right py-2">Prior Month</th>
                                                <th className="text-right py-2">Var %</th>
                                                <th className="text-right py-2">Budget</th>
                                                <th className="text-right py-2">Var %</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {Object.entries(financialResults.pl).map(([key, values]) => {
                                                const actualVsPrior = ((values.actual - values.prior) / values.prior) * 100;
                                                const actualVsBudget = ((values.actual - values.budget) / values.budget) * 100;
                                                return (
                                                    <tr key={key} className="text-sm">
                                                        <td className="py-3 font-medium text-gray-900">
                                                            {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                                                        </td>
                                                        <td className="text-right py-3 font-medium">
                                                            ${(values.actual / 1000000).toFixed(1)}
                                                        </td>
                                                        <td className="text-right py-3 text-gray-600">
                                                            ${(values.prior / 1000000).toFixed(1)}
                                                        </td>
                                                        <td className={`text-right py-3 font-medium ${actualVsPrior >= 0 ? 'text-green-600' : 'text-red-600'
                                                            }`}>
                                                            {actualVsPrior >= 0 ? '+' : ''}{actualVsPrior.toFixed(1)}%
                                                        </td>
                                                        <td className="text-right py-3 text-gray-600">
                                                            ${(values.budget / 1000000).toFixed(1)}
                                                        </td>
                                                        <td className={`text-right py-3 font-medium ${actualVsBudget >= 0 ? 'text-green-600' : 'text-red-600'
                                                            }`}>
                                                            {actualVsBudget >= 0 ? '+' : ''}{actualVsBudget.toFixed(1)}%
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Balance Sheet View */}
                        {selectedView === 'bs' && (
                            <div className="bg-white rounded-lg border border-gray-200">
                                <div className="p-4 border-b border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900">Balance Sheet</h3>
                                    <p className="text-sm text-gray-600">As of November 30, 2024 (in millions)</p>
                                </div>
                                <div className="p-4">
                                    <div className="space-y-6">
                                        {Object.entries(financialResults.bs).map(([key, values]) => {
                                            const change = values.current - values.prior;
                                            const changePercent = (change / values.prior) * 100;
                                            return (
                                                <div key={key} className="flex items-center justify-between py-3 border-b border-gray-100">
                                                    <div>
                                                        <p className="font-medium text-gray-900">
                                                            {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                                                        </p>
                                                        <p className="text-sm text-gray-600">
                                                            Change: ${(change / 1000000).toFixed(1)}M ({changePercent >= 0 ? '+' : ''}{changePercent.toFixed(1)}%)
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-lg font-semibold text-gray-900">
                                                            ${(values.current / 1000000).toFixed(1)}M
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                            Prior: ${(values.prior / 1000000).toFixed(1)}M
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Adjustments Tab */}
                {activeTab === 'adjustments' && (
                    <div className="space-y-6">
                        {/* Adjustments Summary */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">Adjustments Queue</h3>
                                <button className="px-3 py-1.5 text-sm bg-cyan-gradient text-navy-900 rounded-lg font-medium hover:shadow-lg glow-cyan-hover transition-all flex items-center space-x-2">
                                    <Plus className="w-4 h-4" />
                                    <span>New Adjustment</span>
                                </button>
                            </div>
                            <div className="space-y-3">
                                {adjustmentQueue.map((adj) => (
                                    <div key={adj.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-3">
                                                    <span className="text-sm font-medium text-gray-900">{adj.id}</span>
                                                    <span className={`text-xs px-2 py-0.5 rounded-full ${adj.priority === 'high' ? 'bg-red-100 text-red-700' :
                                                            adj.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                                                'bg-gray-100 text-gray-700'
                                                        }`}>
                                                        {adj.priority}
                                                    </span>
                                                    <span className={`text-xs px-2 py-0.5 rounded-full ${adj.status === 'approved' ? 'bg-green-100 text-green-700' :
                                                            'bg-orange-100 text-orange-700'
                                                        }`}>
                                                        {adj.status}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-700 mt-1">{adj.description}</p>
                                                <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                                                    <span>Deadline: {adj.deadline}</span>
                                                    <span>Preparer: {adj.preparer}</span>
                                                </div>
                                            </div>
                                            <div className="text-right ml-4">
                                                <p className="text-sm text-gray-600">P&L Impact</p>
                                                <p className={`text-lg font-semibold ${adj.impact.pl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                    {adj.impact.pl >= 0 ? '+' : ''}${(adj.impact.pl / 1000000).toFixed(1)}M
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Commentary Tab */}
                {activeTab === 'commentary' && (
                    <div className="space-y-6">
                        {/* AI Commentary Engine */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <Brain className="w-6 h-6 text-cyan" />
                                    <h3 className="text-lg font-semibold text-gray-900">AI-Generated Commentary</h3>
                                </div>
                                <button className="px-3 py-1.5 text-sm bg-cyan-gradient text-navy-900 rounded-lg font-medium hover:shadow-lg glow-cyan-hover transition-all">
                                    Regenerate All
                                </button>
                            </div>
                            <div className="space-y-4">
                                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-900 mb-2">Revenue Performance</p>
                                            <p className="text-sm text-gray-700">
                                                Revenue increased 2.9% vs prior month to $245.0M, driven by strong performance in North America (+5.2%)
                                                and digital channels (+8.7%). This exceeded budget by 1.2% despite headwinds from FX translation (-$2.1M).
                                            </p>
                                        </div>
                                        <button className="ml-4 p-2 text-gray-400 hover:text-gray-600">
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="flex items-center space-x-3 mt-3">
                                        <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">Accept</button>
                                        <button className="text-xs text-gray-600 hover:text-gray-700 font-medium">Edit</button>
                                        <button className="text-xs text-gray-600 hover:text-gray-700 font-medium">Regenerate</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Controls & Approvals Tab */}
                {activeTab === 'controls' && (
                    <div className="space-y-6">
                        {/* Approval Workflow */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Approval Workflow Status</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Journal Entries Review</p>
                                            <p className="text-xs text-gray-600">Approved by Controller at 2:30 PM</p>
                                        </div>
                                    </div>
                                    <Lock className="w-4 h-4 text-green-600" />
                                </div>
                                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <Clock className="w-5 h-5 text-orange-600" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">Revenue Adjustments</p>
                                            <p className="text-xs text-gray-600">Pending CFO approval</p>
                                        </div>
                                    </div>
                                    <Shield className="w-4 h-4 text-orange-600" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
} 