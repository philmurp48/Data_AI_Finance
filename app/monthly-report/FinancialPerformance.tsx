'use client';

import { motion } from 'framer-motion';
import {
    AlertTriangle,
    ArrowDown,
    ArrowUp,
    BarChart3,
    DollarSign,
    TrendingDown,
    TrendingUp,
    ChevronRight,
    Info
} from 'lucide-react';
import { useState } from 'react';

interface FinancialPerformanceProps {
    filters?: {
        selectedPeriod: string;
        selectedComparison: string;
    };
}

export default function FinancialPerformance({ filters }: FinancialPerformanceProps) {
    const { selectedPeriod = 'November 2024', selectedComparison = 'vs Plan' } = filters || {};
    const [expandedSection, setExpandedSection] = useState<string | null>(null);

    // P&L Summary
    const plSummary = {
        revenue: {
            actual: 45200,
            plan: 44100,
            variance: 1100,
            variancePercent: 2.5,
            status: 'above'
        },
        cogs: {
            actual: 27120,
            plan: 26460,
            variance: -660,
            variancePercent: -2.5,
            status: 'below'
        },
        grossProfit: {
            actual: 18080,
            plan: 17640,
            variance: 440,
            variancePercent: 2.5,
            status: 'above'
        },
        grossMargin: {
            actual: 40.0,
            plan: 40.0,
            variance: 0.0,
            status: 'on-track'
        },
        operatingExpenses: {
            actual: 12250,
            plan: 11900,
            variance: -350,
            variancePercent: -2.9,
            status: 'below'
        },
        ebit: {
            actual: 5830,
            plan: 5740,
            variance: 90,
            variancePercent: 1.6,
            status: 'above'
        },
        ebitMargin: {
            actual: 12.9,
            plan: 13.0,
            variance: -0.1,
            status: 'below'
        },
        netIncome: {
            actual: 4250,
            plan: 4180,
            variance: 70,
            variancePercent: 1.7,
            status: 'above'
        }
    };

    // P&L Bridge Analysis
    const plBridge = [
        { item: 'Volume Impact', amount: 320, type: 'positive', description: 'Higher unit sales vs plan' },
        { item: 'Mix Impact', amount: 185, type: 'positive', description: 'Favorable product mix shift' },
        { item: 'Pricing Impact', amount: 95, type: 'positive', description: 'Pricing discipline maintained' },
        { item: 'Commodity Costs', amount: -450, type: 'negative', description: 'Raw material inflation' },
        { item: 'Labor Costs', amount: -125, type: 'negative', description: 'Wage pressure in manufacturing' },
        { item: 'SG&A Efficiency', amount: 85, type: 'positive', description: 'Cost control initiatives' },
        { item: 'Other', amount: -65, type: 'negative', description: 'One-time items' }
    ];

    // Cash Flow Summary
    const cashFlow = {
        operating: {
            actual: 4850,
            plan: 4895,
            variance: -45,
            status: 'below'
        },
        investing: {
            actual: -1850,
            plan: -1900,
            variance: 50,
            status: 'above'
        },
        financing: {
            actual: -2100,
            plan: -2200,
            variance: 100,
            status: 'above'
        },
        netChange: {
            actual: 900,
            plan: 795,
            variance: 105,
            status: 'above'
        },
        endingBalance: {
            actual: 12450,
            plan: 12345,
            variance: 105,
            status: 'above'
        }
    };

    // Key Financial Metrics
    const keyMetrics = [
        {
            label: 'ROIC',
            value: '18.2%',
            target: '19.0%',
            change: -0.8,
            trend: [19.5, 19.2, 19.0, 18.8, 18.5, 18.3, 18.2],
            status: 'warning',
            description: 'Below target due to margin compression'
        },
        {
            label: 'Free Cash Flow',
            value: '$485M',
            target: '$495M',
            change: -2.0,
            trend: [520, 510, 505, 500, 495, 490, 485],
            status: 'warning',
            description: 'Working capital drag impacting FCF'
        },
        {
            label: 'Net Debt to EBITDA',
            value: '1.8x',
            target: '1.5x',
            change: 0.2,
            trend: [1.5, 1.6, 1.7, 1.7, 1.8, 1.8, 1.8],
            status: 'warning',
            description: 'Slightly elevated but manageable'
        },
        {
            label: 'Current Ratio',
            value: '1.42',
            target: '1.50',
            change: -0.05,
            trend: [1.50, 1.48, 1.46, 1.45, 1.44, 1.43, 1.42],
            status: 'warning',
            description: 'Working capital optimization needed'
        }
    ];

    // Working Capital Analysis
    const workingCapital = {
        receivables: {
            actual: 3850,
            plan: 3600,
            variance: 250,
            dso: 52,
            targetDSO: 45,
            status: 'warning'
        },
        inventory: {
            actual: 4250,
            plan: 4100,
            variance: 150,
            days: 45,
            targetDays: 42,
            status: 'warning'
        },
        payables: {
            actual: 2850,
            plan: 2700,
            variance: -150,
            dpo: 38,
            targetDPO: 35,
            status: 'good'
        },
        netWorkingCapital: {
            actual: 5250,
            plan: 5000,
            variance: 250,
            status: 'warning'
        }
    };

    // Revenue Breakdown
    const revenueBreakdown = [
        { segment: 'Vehicle Sales', amount: 38500, percent: 85.2, change: 8.5, status: 'good' },
        { segment: 'Parts & Service', amount: 4200, percent: 9.3, change: 5.2, status: 'good' },
        { segment: 'Financial Services', amount: 1850, percent: 4.1, change: 12.3, status: 'good' },
        { segment: 'Digital/OnStar', amount: 650, percent: 1.4, change: 42.0, status: 'excellent' }
    ];

    const formatCurrency = (value: number) => {
        return `$${(value / 1000).toFixed(1)}B`;
    };

    const formatMillions = (value: number) => {
        return `$${value}M`;
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'above': case 'good': case 'excellent': return 'text-green-600 bg-green-50';
            case 'below': case 'warning': return 'text-red-600 bg-red-50';
            case 'on-track': return 'text-blue-600 bg-blue-50';
            default: return 'text-gray-600 bg-gray-50';
        }
    };

    return (
        <div className="space-y-6">
            {/* Financial Performance Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                {keyMetrics.map((metric) => (
                    <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-xl shadow-md border border-gray-200 p-5"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div className="text-sm font-medium text-gray-600">{metric.label}</div>
                            <div className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(metric.status)}`}>
                                {metric.status === 'warning' ? 'Watch' : 'On Track'}
                            </div>
                        </div>
                        <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Target: {metric.target}</span>
                            <span className={`font-semibold ${metric.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {metric.change >= 0 ? '+' : ''}{metric.change}pp
                            </span>
                        </div>
                        <div className="mt-3 pt-3 border-t border-gray-100">
                            <p className="text-xs text-gray-500">{metric.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* P&L Statement */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <BarChart3 className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Profit & Loss Statement</h2>
                            <p className="text-sm text-gray-600">November 2024 Performance</p>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 font-semibold text-gray-700">Line Item</th>
                                <th className="text-right py-3 px-4 font-semibold text-gray-700">Actual ($M)</th>
                                <th className="text-right py-3 px-4 font-semibold text-gray-700">Plan ($M)</th>
                                <th className="text-right py-3 px-4 font-semibold text-gray-700">Variance ($M)</th>
                                <th className="text-right py-3 px-4 font-semibold text-gray-700">Variance %</th>
                                <th className="text-center py-3 px-4 font-semibold text-gray-700">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            <tr className="hover:bg-gray-50">
                                <td className="py-3 px-4 font-semibold text-gray-900">Revenue</td>
                                <td className="py-3 px-4 text-right font-semibold text-gray-900">{formatMillions(plSummary.revenue.actual)}</td>
                                <td className="py-3 px-4 text-right text-gray-600">{formatMillions(plSummary.revenue.plan)}</td>
                                <td className="py-3 px-4 text-right font-semibold text-green-600">+{formatMillions(plSummary.revenue.variance)}</td>
                                <td className="py-3 px-4 text-right text-green-600">+{plSummary.revenue.variancePercent}%</td>
                                <td className="py-3 px-4 text-center">
                                    <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(plSummary.revenue.status)}`}>
                                        Above Plan
                                    </span>
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="py-3 px-4 pl-8 text-gray-700">Cost of Goods Sold</td>
                                <td className="py-3 px-4 text-right text-gray-900">{formatMillions(plSummary.cogs.actual)}</td>
                                <td className="py-3 px-4 text-right text-gray-600">{formatMillions(plSummary.cogs.plan)}</td>
                                <td className="py-3 px-4 text-right font-semibold text-red-600">{formatMillions(plSummary.cogs.variance)}</td>
                                <td className="py-3 px-4 text-right text-red-600">{plSummary.cogs.variancePercent}%</td>
                                <td className="py-3 px-4 text-center">
                                    <span className="px-2 py-1 rounded text-xs font-semibold bg-red-50 text-red-600">
                                        Above Plan
                                    </span>
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50 border-t-2 border-gray-300">
                                <td className="py-3 px-4 font-semibold text-gray-900">Gross Profit</td>
                                <td className="py-3 px-4 text-right font-semibold text-gray-900">{formatMillions(plSummary.grossProfit.actual)}</td>
                                <td className="py-3 px-4 text-right text-gray-600">{formatMillions(plSummary.grossProfit.plan)}</td>
                                <td className="py-3 px-4 text-right font-semibold text-green-600">+{formatMillions(plSummary.grossProfit.variance)}</td>
                                <td className="py-3 px-4 text-right text-green-600">+{plSummary.grossProfit.variancePercent}%</td>
                                <td className="py-3 px-4 text-center">
                                    <span className="px-2 py-1 rounded text-xs font-semibold bg-green-50 text-green-600">
                                        Above Plan
                                    </span>
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="py-3 px-4 pl-8 text-gray-700">Operating Expenses</td>
                                <td className="py-3 px-4 text-right text-gray-900">{formatMillions(plSummary.operatingExpenses.actual)}</td>
                                <td className="py-3 px-4 text-right text-gray-600">{formatMillions(plSummary.operatingExpenses.plan)}</td>
                                <td className="py-3 px-4 text-right font-semibold text-red-600">{formatMillions(plSummary.operatingExpenses.variance)}</td>
                                <td className="py-3 px-4 text-right text-red-600">{plSummary.operatingExpenses.variancePercent}%</td>
                                <td className="py-3 px-4 text-center">
                                    <span className="px-2 py-1 rounded text-xs font-semibold bg-red-50 text-red-600">
                                        Above Plan
                                    </span>
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50 border-t-2 border-purple-300 bg-purple-50/30">
                                <td className="py-3 px-4 font-bold text-gray-900">EBIT</td>
                                <td className="py-3 px-4 text-right font-bold text-gray-900">{formatMillions(plSummary.ebit.actual)}</td>
                                <td className="py-3 px-4 text-right text-gray-600">{formatMillions(plSummary.ebit.plan)}</td>
                                <td className="py-3 px-4 text-right font-bold text-green-600">+{formatMillions(plSummary.ebit.variance)}</td>
                                <td className="py-3 px-4 text-right text-green-600">+{plSummary.ebit.variancePercent}%</td>
                                <td className="py-3 px-4 text-center">
                                    <span className="px-2 py-1 rounded text-xs font-semibold bg-green-50 text-green-600">
                                        Above Plan
                                    </span>
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50">
                                <td className="py-3 px-4 pl-8 text-gray-700">EBIT Margin</td>
                                <td className="py-3 px-4 text-right text-gray-900">{plSummary.ebitMargin.actual}%</td>
                                <td className="py-3 px-4 text-right text-gray-600">{plSummary.ebitMargin.plan}%</td>
                                <td className="py-3 px-4 text-right font-semibold text-red-600">{plSummary.ebitMargin.variance}pp</td>
                                <td className="py-3 px-4 text-right text-red-600">-0.1pp</td>
                                <td className="py-3 px-4 text-center">
                                    <span className="px-2 py-1 rounded text-xs font-semibold bg-yellow-50 text-yellow-600">
                                        Slightly Below
                                    </span>
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50 border-t-2 border-gray-300">
                                <td className="py-3 px-4 font-semibold text-gray-900">Net Income</td>
                                <td className="py-3 px-4 text-right font-semibold text-gray-900">{formatMillions(plSummary.netIncome.actual)}</td>
                                <td className="py-3 px-4 text-right text-gray-600">{formatMillions(plSummary.netIncome.plan)}</td>
                                <td className="py-3 px-4 text-right font-semibold text-green-600">+{formatMillions(plSummary.netIncome.variance)}</td>
                                <td className="py-3 px-4 text-right text-green-600">+{plSummary.netIncome.variancePercent}%</td>
                                <td className="py-3 px-4 text-center">
                                    <span className="px-2 py-1 rounded text-xs font-semibold bg-green-50 text-green-600">
                                        Above Plan
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* P&L Bridge Analysis */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <TrendingUp className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">P&L Bridge Analysis</h2>
                        <p className="text-sm text-gray-600">Key drivers of EBIT variance</p>
                    </div>
                </div>
                <div className="space-y-3">
                    {plBridge.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                            <div className="flex-1">
                                <div className="font-semibold text-gray-900 mb-1">{item.item}</div>
                                <div className="text-sm text-gray-600">{item.description}</div>
                            </div>
                            <div className={`text-lg font-bold ${item.type === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                                {item.type === 'positive' ? '+' : ''}{formatMillions(item.amount)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Cash Flow & Working Capital */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Cash Flow */}
                <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="p-2 bg-green-100 rounded-lg">
                            <DollarSign className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Cash Flow</h2>
                            <p className="text-sm text-gray-600">November 2024</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <span className="font-semibold text-gray-900">Operating Cash Flow</span>
                            <div className="text-right">
                                <div className={`font-bold ${cashFlow.operating.status === 'above' ? 'text-green-600' : 'text-red-600'}`}>
                                    {formatMillions(cashFlow.operating.actual)}
                                </div>
                                <div className="text-sm text-gray-600">Plan: {formatMillions(cashFlow.operating.plan)}</div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <span className="font-semibold text-gray-900">Investing Cash Flow</span>
                            <div className="text-right">
                                <div className="font-bold text-gray-900">{formatMillions(cashFlow.investing.actual)}</div>
                                <div className="text-sm text-gray-600">Plan: {formatMillions(cashFlow.investing.plan)}</div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <span className="font-semibold text-gray-900">Financing Cash Flow</span>
                            <div className="text-right">
                                <div className="font-bold text-gray-900">{formatMillions(cashFlow.financing.actual)}</div>
                                <div className="text-sm text-gray-600">Plan: {formatMillions(cashFlow.financing.plan)}</div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                            <span className="font-bold text-gray-900">Net Change in Cash</span>
                            <div className="text-right">
                                <div className={`font-bold text-lg ${cashFlow.netChange.status === 'above' ? 'text-green-600' : 'text-red-600'}`}>
                                    {formatMillions(cashFlow.netChange.actual)}
                                </div>
                                <div className="text-sm text-gray-600">Plan: {formatMillions(cashFlow.netChange.plan)}</div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                            <span className="font-bold text-gray-900">Ending Cash Balance</span>
                            <div className="text-right">
                                <div className={`font-bold text-lg ${cashFlow.endingBalance.status === 'above' ? 'text-green-600' : 'text-red-600'}`}>
                                    {formatMillions(cashFlow.endingBalance.actual)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Working Capital */}
                <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                    <div className="flex items-center space-x-3 mb-6">
                        <div className="p-2 bg-orange-100 rounded-lg">
                            <Info className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Working Capital</h2>
                            <p className="text-sm text-gray-600">Days outstanding analysis</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-semibold text-gray-900">Accounts Receivable</span>
                                <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(workingCapital.receivables.status)}`}>
                                    Watch
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-3">
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Balance</div>
                                    <div className="font-semibold text-gray-900">{formatMillions(workingCapital.receivables.actual)}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">DSO</div>
                                    <div className="font-semibold text-gray-900">{workingCapital.receivables.dso} days</div>
                                    <div className="text-xs text-red-600">Target: {workingCapital.receivables.targetDSO} days</div>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-semibold text-gray-900">Inventory</span>
                                <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(workingCapital.inventory.status)}`}>
                                    Watch
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-3">
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Balance</div>
                                    <div className="font-semibold text-gray-900">{formatMillions(workingCapital.inventory.actual)}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Days</div>
                                    <div className="font-semibold text-gray-900">{workingCapital.inventory.days} days</div>
                                    <div className="text-xs text-red-600">Target: {workingCapital.inventory.targetDays} days</div>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-semibold text-gray-900">Accounts Payable</span>
                                <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(workingCapital.payables.status)}`}>
                                    On Track
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-3">
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">Balance</div>
                                    <div className="font-semibold text-gray-900">{formatMillions(workingCapital.payables.actual)}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-500 mb-1">DPO</div>
                                    <div className="font-semibold text-gray-900">{workingCapital.payables.dpo} days</div>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 bg-purple-50 border-2 border-purple-200 rounded-lg">
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-gray-900">Net Working Capital</span>
                                <div className="text-right">
                                    <div className="font-bold text-lg text-gray-900">{formatMillions(workingCapital.netWorkingCapital.actual)}</div>
                                    <div className="text-xs text-red-600">+{formatMillions(workingCapital.netWorkingCapital.variance)} vs Plan</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Revenue Breakdown */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-green-100 rounded-lg">
                        <BarChart3 className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Revenue Breakdown</h2>
                        <p className="text-sm text-gray-600">By business segment</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {revenueBreakdown.map((segment) => (
                        <div key={segment.segment} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-semibold text-gray-900">{segment.segment}</span>
                                <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(segment.status)}`}>
                                    {segment.status === 'excellent' ? 'Excellent' : segment.status === 'good' ? 'Good' : 'Watch'}
                                </span>
                            </div>
                            <div className="text-2xl font-bold text-gray-900 mb-1">{formatMillions(segment.amount)}</div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">{segment.percent}% of total</span>
                                <span className={`font-semibold ${segment.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {segment.change >= 0 ? '+' : ''}{segment.change}%
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}





