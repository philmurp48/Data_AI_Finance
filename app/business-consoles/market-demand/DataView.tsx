import {
    ArrowDown,
    ArrowUp,
    Calendar,
    ChevronDown,
    ChevronRight,
    Download,
    Filter,
    Minus,
    Table
} from 'lucide-react';
import React, { useState } from 'react'; // Added missing import

export default function DataView() {
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['market-share']));
    const [selectedTimeRange, setSelectedTimeRange] = useState('YTD');
    const [selectedView, setSelectedView] = useState('actual');
    const [expandedPLCategories, setExpandedPLCategories] = useState<Set<string>>(new Set());

    // Comprehensive P&L Data Structure
    const plData = {
        'revenue': {
            name: 'Revenue',
            rows: [
                { name: 'Final Net Sales', isTotal: true },
                { name: 'Gross Sales', values: generateMonthlyData(150, 165) },
                { name: 'Returns & Allowances', values: generateMonthlyData(-10, -12) },
                { name: 'Trade Discounts', values: generateMonthlyData(-15, -18) },
                { name: 'Net Sales', values: generateMonthlyData(125, 135), isSubtotal: true }
            ]
        },
        'variableCosts': {
            name: 'Variable Costs',
            rows: [
                { name: 'Total Variable Costs', isTotal: true },
                { name: 'Direct Materials', values: generateMonthlyData(-45, -50) },
                { name: 'Direct Labor', values: generateMonthlyData(-25, -28) },
                { name: 'Variable Overhead', values: generateMonthlyData(-15, -18) },
                { name: 'Freight & Distribution', values: generateMonthlyData(-8, -10) },
                { name: 'Sales Commissions', values: generateMonthlyData(-5, -6) }
            ]
        },
        'fixedCosts': {
            name: 'Fixed Costs',
            rows: [
                { name: 'Total Fixed Costs', isTotal: true },
                { name: 'Plant/Operation Utilities', values: generateMonthlyData(-12, -12) },
                { name: 'Salary & Benefits', values: generateMonthlyData(-18, -18) },
                { name: 'Depreciation', values: generateMonthlyData(-8, -8) },
                { name: 'Insurance', values: generateMonthlyData(-3, -3) },
                { name: 'Property Tax', values: generateMonthlyData(-2, -2) },
                { name: 'Central Structural Cost', values: generateMonthlyData(-15, -15) }
            ]
        },
        'profitability': {
            name: 'Profitability',
            rows: [
                { name: 'Gross Margin', isCalculated: true },
                { name: 'Operating Income', isCalculated: true },
                { name: 'EBITDA', isCalculated: true },
                { name: 'Net Income', isTotal: true }
            ]
        }
    };

    // Generate monthly data with actuals and forecasts
    function generateMonthlyData(min: number, max: number) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months.map((month, index) => ({
            month,
            actual: index < 10 ? (Math.random() * (max - min) + min).toFixed(1) : null,
            forecast: (Math.random() * (max - min) + min).toFixed(1),
            variance: index < 10 ? ((Math.random() - 0.5) * 10).toFixed(1) : null,
            isActual: index < 10
        }));
    }

    // Comprehensive driver-based data structure
    const driverData = {
        'market-share': {
            name: 'Market Share Drivers',
            metrics: [
                {
                    driver: 'Customer Acquisition',
                    subDrivers: [
                        { name: 'Lead Generation Rate', actual: 2.5, plan: 3.0, variance: -0.5, trend: 'down' },
                        { name: 'Conversion Rate', actual: 1.8, plan: 2.2, variance: -0.4, trend: 'down' },
                        { name: 'Marketing Effectiveness', actual: 85, plan: 90, variance: -5, trend: 'stable' }
                    ]
                },
                {
                    driver: 'Market Penetration',
                    subDrivers: [
                        { name: 'Brand Awareness', actual: 72, plan: 70, variance: 2, trend: 'up' },
                        { name: 'Product Availability', actual: 94, plan: 95, variance: -1, trend: 'stable' },
                        { name: 'Dealer Network Coverage', actual: 88, plan: 85, variance: 3, trend: 'up' }
                    ]
                },
                {
                    driver: 'Competitive Position',
                    subDrivers: [
                        { name: 'Price Competitiveness', actual: 3.2, plan: 3.0, variance: 0.2, trend: 'up' },
                        { name: 'Feature Comparison Score', actual: 82, plan: 85, variance: -3, trend: 'down' },
                        { name: 'Customer Satisfaction', actual: 88, plan: 90, variance: -2, trend: 'stable' }
                    ]
                }
            ]
        },
        'segment-performance': {
            name: 'Segment Performance',
            metrics: [
                {
                    driver: 'Electric Vehicles',
                    subDrivers: [
                        { name: 'Market Share', actual: 12.5, plan: 15.0, variance: -2.5, trend: 'up' },
                        { name: 'Growth Rate', actual: 35.2, plan: 30.0, variance: 5.2, trend: 'up' },
                        { name: 'Revenue Contribution', actual: 18.5, plan: 20.0, variance: -1.5, trend: 'up' }
                    ]
                },
                {
                    driver: 'SUV Segment',
                    subDrivers: [
                        { name: 'Market Share', actual: 22.3, plan: 21.0, variance: 1.3, trend: 'up' },
                        { name: 'Growth Rate', actual: 8.5, plan: 7.0, variance: 1.5, trend: 'stable' },
                        { name: 'Revenue Contribution', actual: 42.1, plan: 40.0, variance: 2.1, trend: 'up' }
                    ]
                },
                {
                    driver: 'Sedan Segment',
                    subDrivers: [
                        { name: 'Market Share', actual: 15.8, plan: 18.0, variance: -2.2, trend: 'down' },
                        { name: 'Growth Rate', actual: -3.2, plan: -2.0, variance: -1.2, trend: 'down' },
                        { name: 'Revenue Contribution', actual: 12.4, plan: 15.0, variance: -2.6, trend: 'down' }
                    ]
                }
            ]
        },
        'demand-forecast': {
            name: 'Demand Forecast Accuracy',
            metrics: [
                {
                    driver: 'Forecast vs Actual',
                    subDrivers: [
                        { name: 'Monthly Accuracy', actual: 92.5, plan: 95.0, variance: -2.5, trend: 'stable' },
                        { name: 'Quarterly Accuracy', actual: 94.8, plan: 96.0, variance: -1.2, trend: 'up' },
                        { name: 'Annual Accuracy', actual: 96.2, plan: 97.0, variance: -0.8, trend: 'up' }
                    ]
                },
                {
                    driver: 'Regional Forecasts',
                    subDrivers: [
                        { name: 'North America', actual: 95.2, plan: 96.0, variance: -0.8, trend: 'stable' },
                        { name: 'Europe', actual: 91.5, plan: 94.0, variance: -2.5, trend: 'down' },
                        { name: 'Asia Pacific', actual: 89.8, plan: 92.0, variance: -2.2, trend: 'up' }
                    ]
                }
            ]
        }
    };

    // Monthly trend data
    const monthlyData = [
        { month: 'Jan', marketShare: 17.2, customerAcq: 142, segmentGrowth: 5.2, forecastAcc: 91.5 },
        { month: 'Feb', marketShare: 17.3, customerAcq: 138, segmentGrowth: 5.8, forecastAcc: 92.1 },
        { month: 'Mar', marketShare: 17.5, customerAcq: 145, segmentGrowth: 6.2, forecastAcc: 92.8 },
        { month: 'Apr', marketShare: 17.6, customerAcq: 148, segmentGrowth: 6.8, forecastAcc: 93.2 },
        { month: 'May', marketShare: 17.8, customerAcq: 152, segmentGrowth: 7.1, forecastAcc: 93.5 },
        { month: 'Jun', marketShare: 17.9, customerAcq: 150, segmentGrowth: 7.5, forecastAcc: 93.8 },
        { month: 'Jul', marketShare: 18.0, customerAcq: 148, segmentGrowth: 8.0, forecastAcc: 94.2 },
        { month: 'Aug', marketShare: 18.1, customerAcq: 145, segmentGrowth: 8.2, forecastAcc: 94.5 },
        { month: 'Sep', marketShare: 18.2, customerAcq: 143, segmentGrowth: 8.3, forecastAcc: 94.8 },
        { month: 'Oct', marketShare: 18.5, customerAcq: 145, segmentGrowth: 8.5, forecastAcc: 92.0 }
    ];

    const toggleCategory = (category: string) => {
        const newExpanded = new Set(expandedCategories);
        if (newExpanded.has(category)) {
            newExpanded.delete(category);
        } else {
            newExpanded.add(category);
        }
        setExpandedCategories(newExpanded);
    };

    const togglePLCategory = (category: string) => {
        const newExpanded = new Set(expandedPLCategories);
        if (newExpanded.has(category)) {
            newExpanded.delete(category);
        } else {
            newExpanded.add(category);
        }
        setExpandedPLCategories(newExpanded);
    };

    const getTrendIcon = (trend: string) => {
        switch (trend) {
            case 'up':
                return <ArrowUp className="w-3 h-3 text-green-500" />;
            case 'down':
                return <ArrowDown className="w-3 h-3 text-red-500" />;
            default:
                return <Minus className="w-3 h-3 text-gray-400" />;
        }
    };

    const getVarianceColor = (variance: number) => {
        if (variance > 0) return 'text-green-600';
        if (variance < 0) return 'text-red-600';
        return 'text-gray-600';
    };

    return (
        <div className="space-y-6">
            {/* Header Controls */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <h3 className="text-lg font-semibold text-gray-900">Market & Demand Data View</h3>
                        <div className="flex items-center space-x-2">
                            <select
                                value={selectedView}
                                onChange={(e) => setSelectedView(e.target.value)}
                                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            >
                                <option value="actual">Actual vs Plan</option>
                                <option value="trend">Trend Analysis</option>
                                <option value="variance">Variance Analysis</option>
                                <option value="forecast">Forecast View</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <div className="flex items-center bg-gray-100 rounded-lg p-1">
                            <button
                                onClick={() => setSelectedTimeRange('MTD')}
                                className={`px-3 py-1 text-sm font-medium rounded transition-colors ${selectedTimeRange === 'MTD' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                                    }`}
                            >
                                MTD
                            </button>
                            <button
                                onClick={() => setSelectedTimeRange('QTD')}
                                className={`px-3 py-1 text-sm font-medium rounded transition-colors ${selectedTimeRange === 'QTD' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                                    }`}
                            >
                                QTD
                            </button>
                            <button
                                onClick={() => setSelectedTimeRange('YTD')}
                                className={`px-3 py-1 text-sm font-medium rounded transition-colors ${selectedTimeRange === 'YTD' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                                    }`}
                            >
                                YTD
                            </button>
                        </div>
                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                            <Filter className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                            <Download className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Comprehensive P&L-Style Data Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                    <h4 className="font-semibold text-gray-900">Financial Performance by Month</h4>
                    <p className="text-sm text-gray-600 mt-1">All values in millions ($M)</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="text-left py-3 px-4 font-medium text-gray-700 w-48">Item</th>
                                <th className="text-center py-3 px-4 font-medium text-gray-700 border-l border-gray-200" colSpan={2}>
                                    <div className="flex items-center justify-center space-x-1">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                        <span>Actual</span>
                                    </div>
                                    Jan-25
                                </th>
                                <th className="text-center py-3 px-4 font-medium text-gray-700 border-l border-gray-200" colSpan={2}>
                                    <div className="flex items-center justify-center space-x-1">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                        <span>Actual</span>
                                    </div>
                                    Feb-25
                                </th>
                                <th className="text-center py-3 px-4 font-medium text-gray-700 border-l border-gray-200" colSpan={2}>
                                    <div className="flex items-center justify-center space-x-1">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                        <span>Actual</span>
                                    </div>
                                    Mar-25
                                </th>
                                <th className="text-center py-3 px-4 font-medium text-gray-700 border-l border-gray-200" colSpan={2}>
                                    <div className="flex items-center justify-center space-x-1">
                                        <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                                        <span>Forecast</span>
                                    </div>
                                    Apr-25
                                </th>
                                <th className="text-center py-3 px-4 font-medium text-gray-700 border-l border-gray-200" colSpan={2}>
                                    <div className="flex items-center justify-center space-x-1">
                                        <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                                        <span>Forecast</span>
                                    </div>
                                    May-25
                                </th>
                                <th className="text-center py-3 px-4 font-medium text-gray-700 border-l border-gray-200" colSpan={2}>
                                    <div className="flex items-center justify-center space-x-1">
                                        <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                                        <span>Forecast</span>
                                    </div>
                                    Jun-25
                                </th>
                            </tr>
                            <tr className="bg-gray-100 border-b border-gray-200">
                                <th className="text-left py-2 px-4 font-medium text-gray-600"></th>
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <React.Fragment key={i}>
                                        <th className="text-right py-2 px-2 font-medium text-gray-600 border-l border-gray-200">Act/Fcst</th>
                                        <th className="text-right py-2 px-2 font-medium text-gray-600">Var</th>
                                    </React.Fragment>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(plData).map(([categoryKey, category]) => (
                                <React.Fragment key={categoryKey}>
                                    <tr className="bg-gray-50 hover:bg-gray-100 cursor-pointer" onClick={() => togglePLCategory(categoryKey)}>
                                        <td className="py-2 px-4 font-semibold text-gray-900 flex items-center">
                                            {expandedPLCategories.has(categoryKey) ? (
                                                <ChevronDown className="w-4 h-4 mr-2" />
                                            ) : (
                                                <ChevronRight className="w-4 h-4 mr-2" />
                                            )}
                                            {category.name}
                                        </td>
                                        {[1, 2, 3, 4, 5, 6].map((i) => (
                                            <React.Fragment key={i}>
                                                <td className="text-right py-2 px-2 font-semibold text-gray-900 border-l border-gray-200">
                                                    {(Math.random() * 100).toFixed(1)}
                                                </td>
                                                <td className={`text-right py-2 px-2 font-medium ${Math.random() > 0.5 ? 'text-green-600' : 'text-red-600'
                                                    }`}>
                                                    {Math.random() > 0.5 ? '+' : '-'}{(Math.random() * 10).toFixed(1)}%
                                                </td>
                                            </React.Fragment>
                                        ))}
                                    </tr>
                                    {expandedPLCategories.has(categoryKey) && category.rows.map((row, idx) => (
                                        <tr key={idx} className={`hover:bg-gray-50 ${row.isTotal ? 'font-semibold bg-gray-100' :
                                                'isSubtotal' in row && row.isSubtotal ? 'font-medium' : ''
                                            }`}>
                                            <td className={`py-1.5 px-4 text-gray-700 ${row.isTotal || ('isSubtotal' in row && row.isSubtotal) ? '' : 'pl-8'
                                                }`}>
                                                {row.name}
                                            </td>
                                            {'values' in row && row.values ? row.values.slice(0, 6).map((val, i) => (
                                                <React.Fragment key={i}>
                                                    <td className="text-right py-1.5 px-2 text-gray-900 border-l border-gray-100">
                                                        {val.actual || val.forecast}
                                                    </td>
                                                    <td className={`text-right py-1.5 px-2 ${val.variance && parseFloat(val.variance) > 0 ? 'text-green-600' : 'text-red-600'
                                                        }`}>
                                                        {val.variance ? `${val.variance}%` : '-'}
                                                    </td>
                                                </React.Fragment>
                                            )) : (
                                                [1, 2, 3, 4, 5, 6].map((i) => (
                                                    <React.Fragment key={i}>
                                                        <td className="text-right py-1.5 px-2 text-gray-900 border-l border-gray-100">
                                                            -
                                                        </td>
                                                        <td className="text-right py-1.5 px-2">
                                                            -
                                                        </td>
                                                    </React.Fragment>
                                                ))
                                            )}
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                            <tr className="bg-navy-900 text-white font-semibold">
                                <td className="py-3 px-4">Profitability (%)</td>
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <React.Fragment key={i}>
                                        <td className="text-right py-3 px-2 border-l border-navy-800">
                                            {(20 + Math.random() * 10).toFixed(1)}%
                                        </td>
                                        <td className={`text-right py-3 px-2 ${Math.random() > 0.5 ? 'text-green-400' : 'text-red-400'
                                            }`}>
                                            {Math.random() > 0.5 ? '+' : '-'}{(Math.random() * 5).toFixed(1)}pp
                                        </td>
                                    </React.Fragment>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Driver-Based Data Tables */}
            <div className="space-y-4">
                {Object.entries(driverData).map(([key, category]) => (
                    <div key={key} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        {/* Category Header */}
                        <button
                            onClick={() => toggleCategory(key)}
                            className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                        >
                            <div className="flex items-center space-x-3">
                                {expandedCategories.has(key) ? (
                                    <ChevronDown className="w-5 h-5 text-gray-500" />
                                ) : (
                                    <ChevronRight className="w-5 h-5 text-gray-500" />
                                )}
                                <h4 className="font-semibold text-gray-900">{category.name}</h4>
                            </div>
                            <span className="text-sm text-gray-500">{category.metrics.length} drivers</span>
                        </button>

                        {/* Expanded Content */}
                        {expandedCategories.has(key) && (
                            <div className="p-6">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-gray-200">
                                                <th className="text-left py-3 px-4 text-xs font-medium text-gray-700 uppercase tracking-wider">
                                                    Driver / Sub-Driver
                                                </th>
                                                <th className="text-right py-3 px-4 text-xs font-medium text-gray-700 uppercase tracking-wider">
                                                    Actual
                                                </th>
                                                <th className="text-right py-3 px-4 text-xs font-medium text-gray-700 uppercase tracking-wider">
                                                    Plan
                                                </th>
                                                <th className="text-right py-3 px-4 text-xs font-medium text-gray-700 uppercase tracking-wider">
                                                    Variance
                                                </th>
                                                <th className="text-center py-3 px-4 text-xs font-medium text-gray-700 uppercase tracking-wider">
                                                    Trend
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {category.metrics.map((metric, idx) => (
                                                <>
                                                    <tr key={`${key}-${idx}`} className="border-b border-gray-100 bg-gray-50">
                                                        <td className="py-3 px-4 font-medium text-sm text-gray-900">
                                                            {metric.driver}
                                                        </td>
                                                        <td className="text-right py-3 px-4 text-sm text-gray-700">-</td>
                                                        <td className="text-right py-3 px-4 text-sm text-gray-700">-</td>
                                                        <td className="text-right py-3 px-4 text-sm text-gray-700">-</td>
                                                        <td className="text-center py-3 px-4">-</td>
                                                    </tr>
                                                    {metric.subDrivers.map((subDriver, subIdx) => (
                                                        <tr key={`${key}-${idx}-${subIdx}`} className="border-b border-gray-50 hover:bg-gray-50">
                                                            <td className="py-3 px-4 pl-8 text-sm text-gray-700">
                                                                {subDriver.name}
                                                            </td>
                                                            <td className="text-right py-3 px-4 text-sm font-medium text-gray-900">
                                                                {subDriver.actual}
                                                                {subDriver.name.includes('Rate') || subDriver.name.includes('Score') || subDriver.name.includes('Accuracy') ? '%' : ''}
                                                            </td>
                                                            <td className="text-right py-3 px-4 text-sm text-gray-600">
                                                                {subDriver.plan}
                                                                {subDriver.name.includes('Rate') || subDriver.name.includes('Score') || subDriver.name.includes('Accuracy') ? '%' : ''}
                                                            </td>
                                                            <td className={`text-right py-3 px-4 text-sm font-medium ${getVarianceColor(subDriver.variance)}`}>
                                                                {subDriver.variance > 0 ? '+' : ''}{subDriver.variance}
                                                                {subDriver.name.includes('Rate') || subDriver.name.includes('Score') || subDriver.name.includes('Accuracy') ? '%' : ''}
                                                            </td>
                                                            <td className="text-center py-3 px-4">
                                                                {getTrendIcon(subDriver.trend)}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Monthly Trend Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">Monthly Performance Trends</h4>
                    <button className="text-sm text-cyan-600 hover:text-cyan-700 font-medium flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        View Full History
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 text-xs font-medium text-gray-700 uppercase tracking-wider">
                                    Month
                                </th>
                                <th className="text-right py-3 px-4 text-xs font-medium text-gray-700 uppercase tracking-wider">
                                    Market Share (%)
                                </th>
                                <th className="text-right py-3 px-4 text-xs font-medium text-gray-700 uppercase tracking-wider">
                                    Customer Acq (K)
                                </th>
                                <th className="text-right py-3 px-4 text-xs font-medium text-gray-700 uppercase tracking-wider">
                                    Segment Growth (%)
                                </th>
                                <th className="text-right py-3 px-4 text-xs font-medium text-gray-700 uppercase tracking-wider">
                                    Forecast Acc (%)
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {monthlyData.map((month, idx) => (
                                <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50">
                                    <td className="py-3 px-4 text-sm font-medium text-gray-900">{month.month}</td>
                                    <td className="text-right py-3 px-4 text-sm text-gray-900">{month.marketShare}</td>
                                    <td className="text-right py-3 px-4 text-sm text-gray-900">{month.customerAcq}</td>
                                    <td className="text-right py-3 px-4 text-sm text-gray-900">{month.segmentGrowth}</td>
                                    <td className="text-right py-3 px-4 text-sm text-gray-900">{month.forecastAcc}</td>
                                </tr>
                            ))}
                            <tr className="bg-gray-50 font-semibold">
                                <td className="py-3 px-4 text-sm text-gray-900">Average</td>
                                <td className="text-right py-3 px-4 text-sm text-gray-900">17.9</td>
                                <td className="text-right py-3 px-4 text-sm text-gray-900">145.2</td>
                                <td className="text-right py-3 px-4 text-sm text-gray-900">7.1</td>
                                <td className="text-right py-3 px-4 text-sm text-gray-900">93.3</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Export Options */}
            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-6 border border-cyan-200">
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Export Data</h4>
                        <p className="text-sm text-gray-600">Download data in your preferred format</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center">
                            <Table className="w-4 h-4 mr-2" />
                            Export to Excel
                        </button>
                        <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center">
                            <Download className="w-4 h-4 mr-2" />
                            Export to CSV
                        </button>
                        <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg text-sm font-medium hover:bg-cyan-700 transition-colors flex items-center">
                            <Download className="w-4 h-4 mr-2" />
                            Generate Report
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
} 