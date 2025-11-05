'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
    AlertCircle,
    AlertTriangle,
    ArrowRight,
    CheckCircle,
    ChevronRight,
    DollarSign,
    TrendingDown,
    TrendingUp,
    Zap,
    Target,
    Activity,
    Shield,
    Users,
    FileText,
    Lightbulb
} from 'lucide-react';
import { useState } from 'react';

interface ExecutiveDashboardProps {
    filters?: {
        selectedPeriod: string;
        selectedComparison: string;
    };
}

export default function ExecutiveDashboard({ filters }: ExecutiveDashboardProps) {
    const { selectedPeriod = 'November 2024', selectedComparison = 'vs Plan' } = filters || {};
    const [expandedInsight, setExpandedInsight] = useState<string | null>(null);

    // Executive Summary - State of the Business
    const executiveSummary = {
        overallStatus: 'On Track',
        statusColor: 'green',
        narrative: 'November delivered strong operational performance with manufacturing efficiency gains offsetting margin pressure from commodity costs. Revenue exceeded plan by 2.1% while maintaining disciplined cost management. Strategic initiatives remain on track with digital transformation accelerating.',
        keyAchievements: [
            'Revenue exceeded plan by $125M (2.1% positive variance)',
            'Manufacturing OEE improved to 75% (+5pp vs target)',
            'Digital services revenue growth of 42% YoY',
            'Market share gained 0.3pp in key segments'
        ],
        concerns: [
            'EBIT margin compressed 150bps due to commodity cost inflation',
            'Working capital stretched with DSO at 52 days',
            'Customer acquisition declining 5.3% MoM'
        ]
    };

    // Four Pillars of Business Performance
    const businessPillars = [
        {
            id: 'commercial',
            label: 'Commercial Performance',
            value: '$45.2B',
            change: 8.2,
            target: '$44.1B',
            status: 'above',
            icon: TrendingUp,
            color: 'green',
            metrics: [
                { label: 'Revenue', value: '$45.2B', change: 8.2, vsTarget: '+$1.1B' },
                { label: 'Market Share', value: '18.5%', change: 0.3, vsTarget: '+0.3pp' },
                { label: 'Volume', value: '2.8M units', change: 12.5, vsTarget: '+125K' },
                { label: 'ATP', value: '$48.5K', change: 3.2, vsTarget: '+$1.2K' }
            ],
            keyInsight: 'Strong product mix and pricing discipline driving revenue growth',
            actionRequired: false
        },
        {
            id: 'operational',
            label: 'Operational Performance',
            value: '75%',
            change: 5.0,
            target: '70.0%',
            status: 'above',
            icon: Activity,
            color: 'green',
            metrics: [
                { label: 'OEE', value: '75%', change: 5.0, vsTarget: '+5pp' },
                { label: 'Quality', value: '99.8%', change: 0.2, vsTarget: '+0.2pp' },
                { label: 'On-Time Delivery', value: '94%', change: 2.1, vsTarget: '+2.1pp' },
                { label: 'Inventory Turns', value: '12.5x', change: 0.8, vsTarget: '+0.8x' }
            ],
            keyInsight: 'Manufacturing excellence driving efficiency gains',
            actionRequired: false
        },
        {
            id: 'financial',
            label: 'Financial Performance',
            value: '$2.83B',
            change: -2.1,
            target: '$2.95B',
            status: 'below',
            icon: DollarSign,
            color: 'yellow',
            metrics: [
                { label: 'EBIT', value: '$2.83B', change: -2.1, vsTarget: '-$120M' },
                { label: 'EBIT Margin', value: '12.5%', change: -1.5, vsTarget: '-150bps' },
                { label: 'Free Cash Flow', value: '$485M', change: -8.3, vsTarget: '-$45M' },
                { label: 'ROIC', value: '18.2%', change: -0.8, vsTarget: '-0.8pp' }
            ],
            keyInsight: 'Margin pressure from commodity costs requires pricing action',
            actionRequired: true
        },
        {
            id: 'risk',
            label: 'Risk & Compliance',
            value: '98%',
            change: 1.5,
            target: '95%',
            status: 'above',
            icon: Shield,
            color: 'green',
            metrics: [
                { label: 'Compliance Score', value: '98%', change: 1.5, vsTarget: '+3pp' },
                { label: 'Risk Rating', value: 'Medium', change: 0, vsTarget: 'Stable' },
                { label: 'Audit Findings', value: '2 minor', change: -1, vsTarget: '-1' },
                { label: 'Control Effectiveness', value: '96%', change: 2.0, vsTarget: '+2pp' }
            ],
            keyInsight: 'Risk profile well-controlled with strong compliance posture',
            actionRequired: false
        }
    ];

    // Critical Actions & Decisions Required
    const criticalActions = [
        {
            id: 1,
            title: 'Pricing Strategy Adjustment',
            priority: 'high',
            urgency: 'immediate',
            owner: 'CFO / CMO',
            dueDate: 'Dec 5, 2024',
            description: 'Implement dynamic pricing adjustments to recover 150bps margin by year-end. Commodity cost inflation requires immediate pricing action across premium segments.',
            financialImpact: '+$320M EBIT potential',
            riskLevel: 'Medium',
            status: 'pending',
            category: 'Financial'
        },
        {
            id: 2,
            title: 'Customer Acquisition Initiative',
            priority: 'high',
            urgency: 'urgent',
            owner: 'CMO / Sales',
            dueDate: 'Dec 1, 2024',
            description: 'Launch targeted customer acquisition campaign to reverse 5.3% decline. Focus on digital channels and referral programs.',
            financialImpact: '+$450M revenue potential',
            riskLevel: 'Low',
            status: 'in-progress',
            category: 'Commercial'
        },
        {
            id: 3,
            title: 'Working Capital Optimization',
            priority: 'medium',
            urgency: 'planned',
            owner: 'CFO / Operations',
            dueDate: 'Dec 15, 2024',
            description: 'Reduce DSO from 52 to 45 days through improved collections and payment terms negotiation.',
            financialImpact: '+$85M cash release',
            riskLevel: 'Low',
            status: 'pending',
            category: 'Financial'
        },
        {
            id: 4,
            title: 'Supply Chain Dual-Sourcing',
            priority: 'high',
            urgency: 'immediate',
            owner: 'COO / Procurement',
            dueDate: 'Dec 10, 2024',
            description: 'Activate dual-sourcing for critical semiconductors to mitigate supply chain risk.',
            financialImpact: 'Risk mitigation',
            riskLevel: 'High',
            status: 'pending',
            category: 'Operational'
        }
    ];

    // Forward-Looking Insights
    const forwardInsights = [
        {
            id: 1,
            type: 'opportunity',
            title: 'EV Market Expansion',
            insight: 'EV segment showing 35% YoY growth with current market share at only 12%. Opportunity to gain 2.5pp share in Q4.',
            impact: '+$7.2B revenue potential',
            timeframe: 'Q4 2024',
            confidence: 'High'
        },
        {
            id: 2,
            type: 'risk',
            title: 'Commodity Cost Pressure',
            insight: 'Commodity costs expected to increase 8-12% in Q1 2025. Current pricing strategy insufficient to maintain margins.',
            impact: '-$180M EBIT risk',
            timeframe: 'Q1 2025',
            confidence: 'High'
        },
        {
            id: 3,
            type: 'opportunity',
            title: 'Digital Services Acceleration',
            insight: 'Digital/OnStar services showing 42% growth. Scaling to 3 additional models could sustain 40%+ growth trajectory.',
            impact: '+$285M recurring revenue',
            timeframe: 'Q1 2025',
            confidence: 'Medium'
        }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'above': return 'text-green-600 bg-green-50';
            case 'below': return 'text-red-600 bg-red-50';
            case 'on-track': return 'text-blue-600 bg-blue-50';
            default: return 'text-yellow-600 bg-yellow-50';
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'bg-red-100 text-red-800 border-red-200';
            case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <div className="space-y-6">
            {/* Executive Summary Banner */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl shadow-lg p-6 text-white">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="px-3 py-1 bg-white/20 rounded-lg backdrop-blur-sm">
                                <span className="text-sm font-semibold">State of the Business</span>
                            </div>
                            <div className={`px-3 py-1 rounded-lg ${executiveSummary.statusColor === 'green' ? 'bg-green-500/90' : 'bg-yellow-500/90'}`}>
                                <span className="text-sm font-semibold">{executiveSummary.overallStatus}</span>
                            </div>
                        </div>
                        <p className="text-lg leading-relaxed mb-4">{executiveSummary.narrative}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div>
                                <div className="text-sm font-medium mb-2 opacity-90">Key Achievements</div>
                                <ul className="space-y-1 text-sm">
                                    {executiveSummary.keyAchievements.map((achievement, idx) => (
                                        <li key={idx} className="flex items-start">
                                            <CheckCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                                            <span>{achievement}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <div className="text-sm font-medium mb-2 opacity-90">Areas of Concern</div>
                                <ul className="space-y-1 text-sm">
                                    {executiveSummary.concerns.map((concern, idx) => (
                                        <li key={idx} className="flex items-start">
                                            <AlertTriangle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                                            <span>{concern}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Four Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {businessPillars.map((pillar) => {
                    const Icon = pillar.icon;
                    return (
                        <motion.div
                            key={pillar.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-xl shadow-md border border-gray-200 p-5 hover:shadow-lg transition-shadow"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center space-x-2">
                                    <div className={`p-2 rounded-lg ${
                                        pillar.color === 'green' ? 'bg-green-100' :
                                        pillar.color === 'yellow' ? 'bg-yellow-100' :
                                        pillar.color === 'red' ? 'bg-red-100' :
                                        'bg-blue-100'
                                    }`}>
                                        <Icon className={`w-5 h-5 ${
                                            pillar.color === 'green' ? 'text-green-600' :
                                            pillar.color === 'yellow' ? 'text-yellow-600' :
                                            pillar.color === 'red' ? 'text-red-600' :
                                            'text-blue-600'
                                        }`} />
                                    </div>
                                    <div>
                                        <div className="text-xs font-medium text-gray-500">{pillar.label}</div>
                                        <div className="text-2xl font-bold text-gray-900">{pillar.value}</div>
                                    </div>
                                </div>
                                <div className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(pillar.status)}`}>
                                    {pillar.change > 0 ? '+' : ''}{pillar.change}%
                                </div>
                            </div>
                            <div className="space-y-2">
                                {pillar.metrics.slice(0, 2).map((metric, idx) => (
                                    <div key={idx} className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">{metric.label}</span>
                                        <div className="flex items-center space-x-2">
                                            <span className="font-semibold text-gray-900">{metric.value}</span>
                                            <span className={`text-xs ${metric.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                {metric.change >= 0 ? '+' : ''}{metric.change}%
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-3 pt-3 border-t border-gray-100">
                                <p className="text-xs text-gray-600">{pillar.keyInsight}</p>
                                {pillar.actionRequired && (
                                    <div className="mt-2 flex items-center text-xs text-red-600">
                                        <AlertCircle className="w-3 h-3 mr-1" />
                                        <span>Action Required</span>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Critical Actions & Decisions */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-red-100 rounded-lg">
                            <Target className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Critical Actions & Decisions</h2>
                            <p className="text-sm text-gray-600">Immediate actions required for C-suite review</p>
                        </div>
                    </div>
                    <div className="px-3 py-1 bg-red-50 border border-red-200 rounded-lg">
                        <span className="text-sm font-semibold text-red-800">{criticalActions.length} Active</span>
                    </div>
                </div>
                <div className="space-y-4">
                    {criticalActions.map((action) => (
                        <motion.div
                            key={action.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="border border-gray-200 rounded-lg p-5 hover:border-purple-300 hover:shadow-md transition-all"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <h3 className="text-lg font-semibold text-gray-900">{action.title}</h3>
                                        <span className={`px-2 py-0.5 rounded text-xs font-semibold border ${getPriorityColor(action.priority)}`}>
                                            {action.priority.toUpperCase()}
                                        </span>
                                        <span className="px-2 py-0.5 bg-purple-100 text-purple-800 rounded text-xs font-semibold">
                                            {action.category}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-3">{action.description}</p>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                        <div>
                                            <div className="text-xs text-gray-500 mb-1">Owner</div>
                                            <div className="font-semibold text-gray-900">{action.owner}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-500 mb-1">Due Date</div>
                                            <div className="font-semibold text-gray-900">{action.dueDate}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-500 mb-1">Financial Impact</div>
                                            <div className="font-semibold text-green-600">{action.financialImpact}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-500 mb-1">Risk Level</div>
                                            <div className="font-semibold text-gray-900">{action.riskLevel}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                        <ChevronRight className="w-5 h-5 text-gray-400" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Forward-Looking Insights */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-purple-100 rounded-lg">
                        <Lightbulb className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Forward-Looking Insights</h2>
                        <p className="text-sm text-gray-600">Strategic opportunities and risks on the horizon</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {forwardInsights.map((insight) => (
                        <motion.div
                            key={insight.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`border rounded-lg p-4 ${
                                insight.type === 'opportunity'
                                    ? 'border-green-200 bg-green-50'
                                    : 'border-red-200 bg-red-50'
                            }`}
                        >
                            <div className="flex items-start justify-between mb-2">
                                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                    insight.type === 'opportunity'
                                        ? 'bg-green-200 text-green-800'
                                        : 'bg-red-200 text-red-800'
                                }`}>
                                    {insight.type === 'opportunity' ? 'Opportunity' : 'Risk'}
                                </span>
                                <span className="text-xs text-gray-500">{insight.timeframe}</span>
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">{insight.title}</h3>
                            <p className="text-sm text-gray-600 mb-3">{insight.insight}</p>
                            <div className="flex items-center justify-between text-sm">
                                <span className="font-semibold text-gray-900">{insight.impact}</span>
                                <span className="text-xs text-gray-500">Confidence: {insight.confidence}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

