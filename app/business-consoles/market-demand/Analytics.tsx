import { motion } from 'framer-motion';
import {
    Download,
    Layers,
    TrendingDown,
    TrendingUp
} from 'lucide-react';
import { useState } from 'react';

export default function Analytics() {
    const [selectedMetric, setSelectedMetric] = useState('marketShare');
    const [selectedView, setSelectedView] = useState('trend');
    const [selectedTimeframe, setSelectedTimeframe] = useState('12M');

    // Mock data for driver contribution analysis
    const driverContributions = {
        marketShare: [
            { driver: 'Customer Acquisition', contribution: 3.2, value: 0.8, trend: 'up' },
            { driver: 'Market Penetration', contribution: 2.8, value: 0.5, trend: 'up' },
            { driver: 'Competitive Win Rate', contribution: -1.5, value: -0.3, trend: 'down' },
            { driver: 'Brand Awareness', contribution: 1.8, value: 0.2, trend: 'up' },
            { driver: 'Product Availability', contribution: -0.8, value: -0.1, trend: 'down' }
        ],
        segmentGrowth: [
            { driver: 'EV Market Expansion', contribution: 5.2, value: 3.5, trend: 'up' },
            { driver: 'SUV Segment Growth', contribution: 3.8, value: 2.1, trend: 'up' },
            { driver: 'Sedan Market Decline', contribution: -2.5, value: -1.8, trend: 'down' },
            { driver: 'Truck Segment Stability', contribution: 1.2, value: 0.8, trend: 'up' },
            { driver: 'Luxury Performance', contribution: 0.8, value: 0.4, trend: 'up' }
        ],
        customerAcquisition: [
            { driver: 'Digital Marketing ROI', contribution: 4.5, value: 2.3, trend: 'up' },
            { driver: 'Dealer Network Expansion', contribution: 3.1, value: 1.8, trend: 'up' },
            { driver: 'Lead Conversion Rate', contribution: -2.2, value: -1.5, trend: 'down' },
            { driver: 'Customer Retention', contribution: 1.9, value: 0.9, trend: 'up' },
            { driver: 'Referral Program', contribution: -0.5, value: -0.3, trend: 'down' }
        ],
        demandForecast: [
            { driver: 'Economic Indicators', contribution: 3.8, value: 1.2, trend: 'up' },
            { driver: 'Seasonal Patterns', contribution: 2.5, value: 0.8, trend: 'up' },
            { driver: 'Inventory Levels', contribution: -1.8, value: -0.6, trend: 'down' },
            { driver: 'Supply Chain Reliability', contribution: 1.2, value: 0.4, trend: 'up' },
            { driver: 'Market Sentiment', contribution: -0.9, value: -0.3, trend: 'down' }
        ]
    };

    // Waterfall chart data
    const waterfallData = [
        { name: 'Previous Period', value: 17.7, type: 'start' },
        { name: 'Customer Acquisition', value: 0.3, type: 'positive' },
        { name: 'Market Penetration', value: 0.5, type: 'positive' },
        { name: 'Competitive Losses', value: -0.2, type: 'negative' },
        { name: 'Brand Impact', value: 0.2, type: 'positive' },
        { name: 'Current Period', value: 18.5, type: 'end' }
    ];

    // Competitive analysis data
    const competitiveData = [
        { competitor: 'Company A', share: 18.5, change: 0.8, segments: { ev: 12, suv: 22, sedan: 15, truck: 28 } },
        { competitor: 'Competitor A', share: 22.3, change: -0.5, segments: { ev: 18, suv: 25, sedan: 20, truck: 24 } },
        { competitor: 'Competitor B', share: 19.8, change: 0.2, segments: { ev: 15, suv: 20, sedan: 22, truck: 18 } },
        { competitor: 'Competitor C', share: 15.2, change: -1.2, segments: { ev: 8, suv: 18, sedan: 16, truck: 14 } },
        { competitor: 'Others', share: 24.2, change: 0.7, segments: { ev: 47, suv: 15, sedan: 27, truck: 16 } }
    ];

    // Segment performance heatmap
    const segmentHeatmap = [
        { segment: 'Electric Vehicles', q1: 2.5, q2: 3.8, q3: 5.2, q4: 8.5, total: 20.0 },
        { segment: 'SUV', q1: 1.2, q2: 1.5, q3: 2.1, q4: 2.8, total: 7.6 },
        { segment: 'Sedan', q1: -1.5, q2: -2.1, q3: -2.8, q4: -3.2, total: -9.6 },
        { segment: 'Truck', q1: 0.5, q2: 0.8, q3: 1.2, q4: 1.8, total: 4.3 },
        { segment: 'Luxury', q1: 0.8, q2: 1.0, q3: 1.2, q4: 1.5, total: 4.5 }
    ];

    const getHeatmapColor = (value: number) => {
        if (value > 5) return 'bg-green-600';
        if (value > 2) return 'bg-green-400';
        if (value > 0) return 'bg-green-200';
        if (value > -2) return 'bg-red-200';
        if (value > -5) return 'bg-red-400';
        return 'bg-red-600';
    };

    return (
        <div className="space-y-6">
            {/* Analytics Header with Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <h3 className="text-lg font-semibold text-gray-900">Market & Demand Analytics</h3>
                        <div className="flex items-center space-x-2">
                            <select
                                value={selectedMetric}
                                onChange={(e) => setSelectedMetric(e.target.value)}
                                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="marketShare">Market Share</option>
                                <option value="segmentGrowth">Segment Growth</option>
                                <option value="customerAcquisition">Customer Acquisition</option>
                                <option value="demandForecast">Demand Forecast</option>
                            </select>

                            <select
                                value={selectedView}
                                onChange={(e) => setSelectedView(e.target.value)}
                                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="trend">Trend Analysis</option>
                                <option value="drivers">Driver Contribution</option>
                                <option value="competitive">Competitive View</option>
                                <option value="segments">Segment Analysis</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <div className="flex items-center bg-gray-100 rounded-lg p-1">
                            <button
                                onClick={() => setSelectedTimeframe('1M')}
                                className={`px-3 py-1 text-sm font-medium rounded transition-colors ${selectedTimeframe === '1M' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                                    }`}
                            >
                                1M
                            </button>
                            <button
                                onClick={() => setSelectedTimeframe('3M')}
                                className={`px-3 py-1 text-sm font-medium rounded transition-colors ${selectedTimeframe === '3M' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                                    }`}
                            >
                                3M
                            </button>
                            <button
                                onClick={() => setSelectedTimeframe('12M')}
                                className={`px-3 py-1 text-sm font-medium rounded transition-colors ${selectedTimeframe === '12M' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                                    }`}
                            >
                                12M
                            </button>
                        </div>
                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                            <Download className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Analytics Grid */}
            <div className="grid grid-cols-2 gap-6">
                {/* Driver Contribution Analysis */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-900">Key Driver Contributions</h4>
                        <span className="text-sm text-gray-500">
                            Impact on {
                                selectedMetric === 'marketShare' ? 'Market Share' :
                                    selectedMetric === 'segmentGrowth' ? 'Segment Growth' :
                                        selectedMetric === 'customerAcquisition' ? 'Customer Acquisition' :
                                            'Demand Forecast'
                            }
                        </span>
                    </div>

                    <div className="space-y-3">
                        {driverContributions[selectedMetric as keyof typeof driverContributions].map((driver) => (
                            <div key={driver.driver} className="relative">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm font-medium text-gray-700">{driver.driver}</span>
                                    <div className="flex items-center space-x-2">
                                        <span className={`text-sm font-semibold ${driver.value > 0 ? 'text-green-600' : 'text-red-600'
                                            }`}>
                                            {driver.value > 0 ? '+' : ''}{driver.value}pp
                                        </span>
                                        {driver.trend === 'up' ? (
                                            <TrendingUp className="w-3 h-3 text-green-500" />
                                        ) : (
                                            <TrendingDown className="w-3 h-3 text-red-500" />
                                        )}
                                    </div>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full transition-all ${driver.contribution > 0 ? 'bg-green-500' : 'bg-red-500'
                                            }`}
                                        style={{ width: `${Math.abs(driver.contribution) * 10}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-xs text-gray-600">
                            Total driver impact accounts for {
                                selectedMetric === 'marketShare' ? '0.8pp' :
                                    selectedMetric === 'segmentGrowth' ? '2.1pp' :
                                        selectedMetric === 'customerAcquisition' ? '3.2pp' :
                                            '1.5pp'
                            } change
                        </p>
                    </div>
                </motion.div>

                {/* Waterfall Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-900">Market Share Bridge Analysis</h4>
                        <span className="text-sm text-gray-500">{selectedTimeframe} Performance</span>
                    </div>

                    <div className="relative h-64">
                        <div className="absolute inset-0 flex items-end justify-between space-x-2">
                            {waterfallData.map((item, index) => {
                                const isStart = item.type === 'start';
                                const isEnd = item.type === 'end';
                                const height = Math.abs(item.value) * 10;

                                return (
                                    <div key={item.name} className="flex-1 flex flex-col items-center">
                                        <div className="relative w-full">
                                            <div
                                                className={`w-full rounded-t-lg transition-all ${isStart || isEnd ? 'bg-blue-500' :
                                                    item.type === 'positive' ? 'bg-green-500' : 'bg-red-500'
                                                    }`}
                                                style={{ height: `${height}px` }}
                                            >
                                                <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-700">
                                                    {item.value > 0 ? '+' : ''}{item.value}
                                                </span>
                                            </div>
                                        </div>
                                        <p className="text-xs text-gray-600 mt-2 text-center">{item.name}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>

                {/* Competitive Landscape */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-900">Competitive Market Share</h4>
                        <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                            View Details →
                        </button>
                    </div>

                    <div className="space-y-3">
                        {competitiveData.map((comp) => (
                            <div key={comp.competitor} className="relative">
                                <div className="flex items-center justify-between mb-1">
                                    <span className={`text-sm font-medium ${comp.competitor === 'Company A' ? 'text-purple-700' : 'text-gray-700'
                                        }`}>
                                        {comp.competitor}
                                    </span>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm font-semibold text-gray-900">{comp.share}%</span>
                                        <span className={`text-xs ${comp.change > 0 ? 'text-green-600' : 'text-red-600'
                                            }`}>
                                            {comp.change > 0 ? '+' : ''}{comp.change}%
                                        </span>
                                    </div>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div
                                        className={`h-3 rounded-full transition-all ${comp.competitor === 'Company A' ? 'bg-purple-500' : 'bg-gray-400'
                                            }`}
                                        style={{ width: `${comp.share}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Segment Performance Heatmap */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-900">Segment Growth Heatmap</h4>
                        <span className="text-sm text-gray-500">Quarterly Performance (%)</span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-xs text-gray-600">
                                    <th className="text-left py-2">Segment</th>
                                    <th className="text-center px-2">Q1</th>
                                    <th className="text-center px-2">Q2</th>
                                    <th className="text-center px-2">Q3</th>
                                    <th className="text-center px-2">Q4</th>
                                    <th className="text-center px-2 font-semibold">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {segmentHeatmap.map((segment) => (
                                    <tr key={segment.segment} className="border-t border-gray-100">
                                        <td className="py-2 text-sm font-medium text-gray-700">{segment.segment}</td>
                                        <td className="text-center px-2">
                                            <div className={`inline-block px-2 py-1 rounded text-xs font-medium text-white ${getHeatmapColor(segment.q1)}`}>
                                                {segment.q1 > 0 ? '+' : ''}{segment.q1}
                                            </div>
                                        </td>
                                        <td className="text-center px-2">
                                            <div className={`inline-block px-2 py-1 rounded text-xs font-medium text-white ${getHeatmapColor(segment.q2)}`}>
                                                {segment.q2 > 0 ? '+' : ''}{segment.q2}
                                            </div>
                                        </td>
                                        <td className="text-center px-2">
                                            <div className={`inline-block px-2 py-1 rounded text-xs font-medium text-white ${getHeatmapColor(segment.q3)}`}>
                                                {segment.q3 > 0 ? '+' : ''}{segment.q3}
                                            </div>
                                        </td>
                                        <td className="text-center px-2">
                                            <div className={`inline-block px-2 py-1 rounded text-xs font-medium text-white ${getHeatmapColor(segment.q4)}`}>
                                                {segment.q4 > 0 ? '+' : ''}{segment.q4}
                                            </div>
                                        </td>
                                        <td className="text-center px-2">
                                            <div className={`inline-block px-2 py-1 rounded text-xs font-semibold text-white ${getHeatmapColor(segment.total)}`}>
                                                {segment.total > 0 ? '+' : ''}{segment.total}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-xs text-gray-600">
                            EV segment showing strongest growth trajectory across all quarters
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Driver Insights Panel */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Layers className="w-5 h-5 mr-2 text-purple-600" />
                    Driver-Based Insights & Recommendations
                </h4>
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-4">
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Top Performing Driver</h5>
                        <p className="text-lg font-semibold text-gray-900">EV Market Expansion</p>
                        <p className="text-sm text-green-600 mt-1">+5.2pp contribution</p>
                        <p className="text-xs text-gray-600 mt-2">Continue investing in EV infrastructure and marketing</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Biggest Risk Factor</h5>
                        <p className="text-lg font-semibold text-gray-900">Competitive Losses</p>
                        <p className="text-sm text-red-600 mt-1">-1.5pp impact</p>
                        <p className="text-xs text-gray-600 mt-2">Enhance value proposition and pricing strategy</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Emerging Opportunity</h5>
                        <p className="text-lg font-semibold text-gray-900">Digital Sales Channel</p>
                        <p className="text-sm text-blue-600 mt-1">42% preference shift</p>
                        <p className="text-xs text-gray-600 mt-2">Accelerate digital transformation initiatives</p>
                    </div>
                </div>
            </div>
        </div>
    );
}