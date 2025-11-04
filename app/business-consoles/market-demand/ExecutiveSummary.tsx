import { AnimatePresence, motion } from 'framer-motion';
import {
    AlertCircle,
    ArrowUpRight,
    BarChart3,
    ChevronDown,
    ChevronRight,
    Grid,
    Lightbulb,
    Minus,
    Sparkles,
    Target,
    TrendingDown,
    TrendingUp,
    Users,
    Zap
} from 'lucide-react';
import { useState } from 'react';

interface ExecutiveSummaryProps {
    filters?: {
        selectedRegion: string;
        selectedSite: string;
        selectedDivision: string;
        selectedNameplate: string;
        selectedFunction: string;
        selectedPeriod: string;
        selectedComparison: string;
        selectedTimeToggle: string;
        selectedValueView: string;
    };
}

export default function ExecutiveSummary({ filters }: ExecutiveSummaryProps) {
    const {
        selectedRegion = 'North America',
        selectedDivision = 'All',
        selectedPeriod = 'Q',
        selectedComparison = 'YoY',
        selectedValueView = 'Total $'
    } = filters || {};

    const [expandedDrivers, setExpandedDrivers] = useState<Set<string>>(new Set());
    const [viewMode, setViewMode] = useState<'insight' | 'heatmap'>('insight');

    // Enhanced Key Market Metrics with targets
    const keyMetrics = [
        {
            label: 'Market Share',
            value: '18.5%',
            change: 0.8,
            target: 19.2,
            vsTarget: -0.7,
            trend: [15.2, 16.1, 16.8, 17.2, 17.5, 18.1, 18.5],
            status: 'warning',
            driverCategory: 'market-position'
        },
        {
            label: 'Segment Growth',
            value: '8.5%',
            change: 2.1,
            target: 7.5,
            vsTarget: 1.0,
            trend: [5.8, 6.2, 6.8, 7.1, 7.5, 8.0, 8.5],
            status: 'good',
            driverCategory: 'growth'
        },
        {
            label: 'Customer Acquisition',
            value: selectedValueView === 'By Unit' ? '145K' : '$12.5M',
            subLabel: selectedValueView === 'By Unit' ? 'new/month' : 'revenue/month',
            change: -5.3,
            target: selectedValueView === 'By Unit' ? 160 : 15,
            vsTarget: selectedValueView === 'By Unit' ? -15 : -2.5,
            trend: [165, 158, 152, 148, 145, 142, 145],
            status: 'poor',
            driverCategory: 'customer'
        },
        {
            label: 'Demand Forecast Accuracy',
            value: '92%',
            change: 3.2,
            target: 95,
            vsTarget: -3,
            trend: [85, 87, 88, 89, 90, 91, 92],
            status: 'warning',
            driverCategory: 'demand'
        }
    ];

    // Market Share can be influenced through these areas
    const marketDrivers = [
        {
            id: 'customer-acquisition',
            category: 'Customer Acquisition',
            value: '145K',
            performance: -5.3,
            gauge: 72,
            status: 'poor',
            keyDrivers: [
                'Lead Generation Rate',
                'Conversion Rate',
                'Marketing Effectiveness'
            ],
            detailedBreakdown: [
                { name: 'Lead Volume', actual: 425000, target: 500000, variance: -15, status: 'poor' },
                { name: 'Lead Quality Score', actual: 72, target: 85, variance: -13, status: 'poor' },
                { name: 'Conversion Rate', actual: 1.8, target: 2.2, variance: -0.4, status: 'poor' },
                { name: 'Digital Marketing ROI', actual: 3.2, target: 4.0, variance: -0.8, status: 'warning' },
                { name: 'Sales Cycle Length', actual: 45, target: 30, variance: 15, status: 'poor' }
            ]
        },
        {
            id: 'market-penetration',
            category: 'Market Penetration',
            value: '68%',
            performance: 2.1,
            gauge: 85,
            status: 'good',
            keyDrivers: [
                'Brand Awareness',
                'Product Availability',
                'Dealer Network Coverage'
            ],
            detailedBreakdown: [
                { name: 'Brand Recognition', actual: 82, target: 80, variance: 2, status: 'good' },
                { name: 'Market Coverage', actual: 68, target: 65, variance: 3, status: 'good' },
                { name: 'Dealer Satisfaction', actual: 88, target: 85, variance: 3, status: 'good' },
                { name: 'Inventory Turns', actual: 12.5, target: 10, variance: 2.5, status: 'good' },
                { name: 'Regional Presence', actual: 94, target: 90, variance: 4, status: 'good' }
            ]
        },
        {
            id: 'competitive-position',
            category: 'Competitive Position',
            value: '#3',
            performance: 0,
            gauge: 60,
            status: 'warning',
            keyDrivers: [
                'Price Competitiveness',
                'Feature Comparison',
                'Customer Satisfaction'
            ],
            detailedBreakdown: [
                { name: 'Price Index', actual: 102, target: 98, variance: 4, status: 'poor' },
                { name: 'Feature Score', actual: 82, target: 90, variance: -8, status: 'warning' },
                { name: 'NPS Score', actual: 45, target: 60, variance: -15, status: 'poor' },
                { name: 'Win/Loss Ratio', actual: 0.42, target: 0.55, variance: -0.13, status: 'poor' },
                { name: 'Share of Voice', actual: 18, target: 25, variance: -7, status: 'warning' }
            ]
        }
    ];

    // AI-Generated Market Opportunities
    const marketOpportunities = [
        {
            id: 1,
            type: 'opportunity',
            priority: 'high',
            urgency: 'immediate',
            title: 'EV Market Expansion Opportunity',
            insight: 'EV segment showing 35% YoY growth with current market share at only 12%',
            impact: '+2.5pp market share potential',
            proposedAction: 'Increase EV inventory allocation by 40% in high-growth metros: California, Texas, Florida. Launch targeted digital campaigns for eco-conscious buyers.',
            drivers: ['Product Mix', 'Inventory', 'Marketing Strategy']
        },
        {
            id: 2,
            type: 'risk',
            priority: 'high',
            urgency: 'urgent',
            title: 'Customer Acquisition Declining',
            insight: 'New customer acquisition down 5.3% with conversion rates falling below 2%',
            impact: '-$450M revenue risk',
            proposedAction: 'Implement dynamic pricing strategy, enhance digital showroom experience, and launch referral incentive program targeting existing satisfied customers.',
            drivers: ['Pricing', 'Customer Experience', 'Incentives']
        },
        {
            id: 3,
            type: 'opportunity',
            priority: 'medium',
            urgency: 'planned',
            title: 'Competitor Recall Impact',
            insight: 'Major competitor recalling 50K vehicles in luxury SUV segment',
            impact: '+0.8pp share opportunity',
            proposedAction: 'Launch conquest campaign targeting affected customers with special trade-in offers and emphasize quality/reliability messaging.',
            drivers: ['Competitive Strategy', 'Marketing', 'Incentives']
        }
    ];

    const toggleDriverExpansion = (driverId: string) => {
        const newExpanded = new Set(expandedDrivers);
        if (newExpanded.has(driverId)) {
            newExpanded.delete(driverId);
        } else {
            newExpanded.add(driverId);
        }
        setExpandedDrivers(newExpanded);
    };

    const renderSparkline = (data: number[]) => {
        const max = Math.max(...data);
        const min = Math.min(...data);
        const range = max - min;
        const width = 80;
        const height = 24;

        const points = data.map((value, index) => {
            const x = (index / (data.length - 1)) * width;
            const y = height - ((value - min) / range) * height;
            return `${x},${y}`;
        }).join(' ');

        return (
            <svg width={width} height={height} className="inline-block">
                <polyline
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    points={points}
                    className="text-purple-500"
                />
            </svg>
        );
    };

    const renderGauge = (value: number, status: string) => {
        const radius = 20;
        const circumference = 2 * Math.PI * radius;
        const strokeDasharray = `${(value / 100) * circumference} ${circumference}`;

        const color = status === 'good' ? '#10b981' : status === 'warning' ? '#f59e0b' : '#ef4444';

        return (
            <svg width="50" height="50" className="transform -rotate-90">
                <circle
                    cx="25"
                    cy="25"
                    r={radius}
                    stroke="#e5e7eb"
                    strokeWidth="4"
                    fill="none"
                />
                <circle
                    cx="25"
                    cy="25"
                    r={radius}
                    stroke={color}
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={strokeDasharray}
                    strokeLinecap="round"
                />
            </svg>
        );
    };

    return (
        <div className="space-y-6">
            {/* View Mode Toggle */}
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Executive Summary</h2>
                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                    <button
                        onClick={() => setViewMode('insight')}
                        className={`px-4 py-2 text-sm font-medium rounded transition-colors ${viewMode === 'insight'
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        <div className="flex items-center">
                            <Lightbulb className="w-4 h-4 mr-2" />
                            Insight
                        </div>
                    </button>
                    <button
                        onClick={() => setViewMode('heatmap')}
                        className={`px-4 py-2 text-sm font-medium rounded transition-colors ${viewMode === 'heatmap'
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        <div className="flex items-center">
                            <Grid className="w-4 h-4 mr-2" />
                            Heatmap
                        </div>
                    </button>
                </div>
            </div>

            {/* Key Metrics with Targets */}
            <div className="grid grid-cols-4 gap-4">
                {keyMetrics.map((metric, index) => (
                    <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-xl shadow-sm p-5 hover:shadow-lg transition-all border border-gray-100"
                    >
                        <div className="space-y-3">
                            {/* Header */}
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium text-gray-600">{metric.label}</h3>
                                <div className={`p-1.5 rounded-lg ${metric.status === 'good' ? 'bg-green-100' :
                                        metric.status === 'warning' ? 'bg-yellow-100' : 'bg-red-100'
                                    }`}>
                                    {metric.change > 0 ? (
                                        <TrendingUp className={`w-4 h-4 ${metric.status === 'good' ? 'text-green-600' :
                                                metric.status === 'warning' ? 'text-yellow-600' : 'text-red-600'
                                            }`} />
                                    ) : metric.change < 0 ? (
                                        <TrendingDown className={`w-4 h-4 ${metric.status === 'good' ? 'text-green-600' :
                                                metric.status === 'warning' ? 'text-yellow-600' : 'text-red-600'
                                            }`} />
                                    ) : (
                                        <Minus className="w-4 h-4 text-gray-600" />
                                    )}
                                </div>
                            </div>

                            {/* Value and Change */}
                            <div>
                                <p className="text-2xl font-bold text-gray-900">
                                    {metric.value}
                                    {metric.subLabel && (
                                        <span className="text-sm font-normal text-gray-500 ml-1">{metric.subLabel}</span>
                                    )}
                                </p>
                                <p className={`text-sm font-medium mt-1 ${metric.change > 0 ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                    {metric.change > 0 ? '+' : ''}{metric.change}% {selectedComparison}
                                </p>
                            </div>

                            {/* Sparkline */}
                            <div className="pt-2">
                                {renderSparkline(metric.trend)}
                            </div>

                            {/* Target Comparison */}
                            <div className="pt-3 border-t border-gray-100 space-y-2">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-gray-500">Target</span>
                                    <span className="font-medium text-gray-700">
                                        {metric.target}{metric.subLabel ? ` ${metric.subLabel.split('/')[0]}` : '%'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-gray-500">Gap to Target</span>
                                    <span className={`font-medium ${metric.vsTarget >= 0 ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                        {metric.vsTarget > 0 ? '+' : ''}{metric.vsTarget}
                                        {metric.subLabel ? (selectedValueView === 'By Unit' ? 'K' : 'M') : 'pp'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Market Share Drivers Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                        <Target className="w-5 h-5 mr-2 text-purple-600" />
                        Market Share can be influenced through these areas:
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                        Key drivers impacting market performance and strategic opportunities
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-6">
                    {marketDrivers.map((driver, index) => (
                        <motion.div
                            key={driver.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative rounded-lg border-2 ${driver.status === 'good' ? 'border-green-200 bg-green-50' :
                                    driver.status === 'warning' ? 'border-yellow-200 bg-yellow-50' :
                                        'border-red-200 bg-red-50'
                                }`}
                        >
                            <div className="p-5">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h4 className="font-semibold text-gray-900">{driver.category}</h4>
                                        <p className="text-2xl font-bold text-gray-900 mt-1">{driver.value}</p>
                                        <p className={`text-sm font-medium ${driver.performance > 0 ? 'text-green-600' : 'text-red-600'
                                            }`}>
                                            {driver.performance > 0 ? '+' : ''}{driver.performance}%
                                        </p>
                                    </div>
                                    <div className="transform rotate-90">
                                        {renderGauge(driver.gauge, driver.status)}
                                    </div>
                                </div>

                                <div className="space-y-1 mb-4">
                                    <p className="text-xs font-medium text-gray-700">Key Drivers:</p>
                                    {driver.keyDrivers.map((kd) => (
                                        <p key={kd} className="text-xs text-gray-600 pl-2">• {kd}</p>
                                    ))}
                                </div>

                                <button
                                    onClick={() => toggleDriverExpansion(driver.id)}
                                    className="w-full py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center"
                                >
                                    Review
                                    {expandedDrivers.has(driver.id) ? (
                                        <ChevronDown className="w-4 h-4 ml-1" />
                                    ) : (
                                        <ChevronRight className="w-4 h-4 ml-1" />
                                    )}
                                </button>
                            </div>

                            {/* Expanded Breakdown */}
                            <AnimatePresence>
                                {expandedDrivers.has(driver.id) && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-5 pb-5 pt-0">
                                            <div className="bg-white rounded-lg p-4 border border-gray-200">
                                                <h5 className="text-sm font-semibold text-gray-900 mb-3">Detailed Breakdown</h5>
                                                <div className="space-y-2">
                                                    {driver.detailedBreakdown.map((item, idx) => (
                                                        <div key={idx} className="flex items-center justify-between py-1.5 border-b border-gray-100 last:border-0">
                                                            <span className="text-xs text-gray-700">{item.name}</span>
                                                            <div className="flex items-center space-x-3">
                                                                <span className="text-xs font-medium text-gray-900">
                                                                    {item.actual}{typeof item.actual === 'number' && item.actual < 100 ? '%' : ''}
                                                                </span>
                                                                <span className="text-xs text-gray-500">
                                                                    vs {item.target}
                                                                </span>
                                                                <span className={`text-xs font-medium ${item.status === 'good' ? 'text-green-600' :
                                                                        item.status === 'warning' ? 'text-yellow-600' :
                                                                            'text-red-600'
                                                                    }`}>
                                                                    {item.variance > 0 ? '+' : ''}{item.variance}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* AI-Powered Market Opportunities */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                        <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
                        Opportunities to improve Market Share
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                        AI-identified opportunities sorted by urgency and impact
                    </p>
                </div>

                <div className="space-y-4">
                    {marketOpportunities.map((opp) => (
                        <motion.div
                            key={opp.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`relative p-5 rounded-lg border ${opp.type === 'opportunity' ? 'bg-blue-50 border-blue-200' : 'bg-red-50 border-red-200'
                                }`}
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-start space-x-3">
                                    {opp.type === 'opportunity' ? (
                                        <div className="p-2 bg-blue-100 rounded-lg">
                                            <Lightbulb className="w-5 h-5 text-blue-600" />
                                        </div>
                                    ) : (
                                        <div className="p-2 bg-red-100 rounded-lg">
                                            <AlertCircle className="w-5 h-5 text-red-600" />
                                        </div>
                                    )}
                                    <div>
                                        <h4 className="font-semibold text-gray-900">{opp.title}</h4>
                                        <p className="text-sm text-gray-600 mt-1">{opp.insight}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${opp.priority === 'high' ? 'bg-red-100 text-red-700' :
                                            opp.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-gray-100 text-gray-700'
                                        }`}>
                                        {opp.priority}
                                    </span>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${opp.urgency === 'immediate' ? 'bg-purple-100 text-purple-700' :
                                            opp.urgency === 'urgent' ? 'bg-orange-100 text-orange-700' :
                                                'bg-blue-100 text-blue-700'
                                        }`}>
                                        {opp.urgency}
                                    </span>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg p-3 mb-3">
                                <p className="text-sm font-medium text-gray-700 mb-1">Proposed Action:</p>
                                <p className="text-sm text-gray-600">{opp.proposedAction}</p>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div>
                                        <p className="text-xs text-gray-500">Expected Impact</p>
                                        <p className="text-sm font-semibold text-gray-900">{opp.impact}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Related Drivers</p>
                                        <p className="text-xs text-gray-700">{opp.drivers.join(', ')}</p>
                                    </div>
                                </div>
                                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors flex items-center">
                                    Take Action
                                    <ArrowUpRight className="w-4 h-4 ml-1" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>


        </div>
    );
} 