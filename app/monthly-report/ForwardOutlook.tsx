'use client';

import { motion } from 'framer-motion';
import {
    Calendar,
    TrendingUp,
    TrendingDown,
    AlertTriangle,
    Target,
    Lightbulb,
    ArrowRight,
    DollarSign,
    Activity
} from 'lucide-react';

interface ForwardOutlookProps {
    filters?: {
        selectedPeriod: string;
        selectedComparison: string;
    };
}

export default function ForwardOutlook({ filters }: ForwardOutlookProps) {
    const { selectedPeriod = 'November 2024', selectedComparison = 'vs Plan' } = filters || {};

    // Forward-Looking Forecast
    const forecast = {
        q4: {
            revenue: { forecast: 46500, plan: 45000, variance: 1500 },
            ebit: { forecast: 6100, plan: 6000, variance: 100 },
            ebitMargin: { forecast: 13.1, plan: 13.3, variance: -0.2 },
            cashFlow: { forecast: 5200, plan: 5100, variance: 100 }
        },
        q1_2025: {
            revenue: { forecast: 48500, plan: 47000, variance: 1500 },
            ebit: { forecast: 6250, plan: 6200, variance: 50 },
            ebitMargin: { forecast: 12.9, plan: 13.2, variance: -0.3 },
            cashFlow: { forecast: 5100, plan: 5000, variance: 100 }
        },
        fullYear_2025: {
            revenue: { forecast: 195000, plan: 190000, variance: 5000 },
            ebit: { forecast: 25500, plan: 25200, variance: 300 },
            ebitMargin: { forecast: 13.1, plan: 13.3, variance: -0.2 },
            cashFlow: { forecast: 21000, plan: 20500, variance: 500 }
        }
    };

    // Key Assumptions
    const assumptions = [
        {
            category: 'Market Conditions',
            assumption: 'Market growth of 5-7% in 2025',
            confidence: 'High',
            impact: 'Positive',
            description: 'Continued strong demand in key segments'
        },
        {
            category: 'Commodity Costs',
            assumption: 'Commodity costs increase 8-12% in Q1 2025',
            confidence: 'High',
            impact: 'Negative',
            description: 'Pricing actions required to offset margin pressure'
        },
        {
            category: 'Production Capacity',
            assumption: 'Maintain 2.8M+ unit production rate',
            confidence: 'Medium',
            impact: 'Positive',
            description: 'Capacity utilization at optimal levels'
        },
        {
            category: 'Digital Services',
            assumption: 'Digital services grow 35-40% in 2025',
            confidence: 'High',
            impact: 'Positive',
            description: 'Strong adoption of connected services'
        },
        {
            category: 'EV Market',
            assumption: 'EV market share increases to 15% by end of 2025',
            confidence: 'Medium',
            impact: 'Positive',
            description: 'New model launches driving growth'
        }
    ];

    // Strategic Opportunities
    const opportunities = [
        {
            id: 1,
            title: 'EV Market Expansion',
            description: 'Accelerate EV portfolio to capture 2.5pp additional market share',
            timeframe: 'Q1-Q4 2025',
            revenueImpact: '+$7.2B',
            ebitImpact: '+$320M',
            confidence: 'High',
            keyActions: [
                'Launch 3 new EV models in Q1-Q2',
                'Expand charging infrastructure partnerships',
                'Target eco-conscious buyer segments'
            ],
            risks: [
                'Battery supply chain constraints',
                'Charging infrastructure readiness'
            ]
        },
        {
            id: 2,
            title: 'Digital Services Acceleration',
            description: 'Scale digital services to 3 additional models',
            timeframe: 'Q1-Q2 2025',
            revenueImpact: '+$285M recurring',
            ebitImpact: '+$185M',
            confidence: 'Medium',
            keyActions: [
                'Complete OTA update system',
                'Launch AI assistant integration',
                'Expand subscription tiers'
            ],
            risks: [
                'Customer adoption rates',
                'Technology integration complexity'
            ]
        },
        {
            id: 3,
            title: 'Premium Segment Growth',
            description: 'Gain 1.5pp market share in luxury segments',
            timeframe: 'Q2-Q4 2025',
            revenueImpact: '+$4.8B',
            ebitImpact: '+$420M',
            confidence: 'Medium',
            keyActions: [
                'Enhance brand positioning',
                'Expand dealer network',
                'Launch premium features'
            ],
            risks: [
                'Competitive pricing pressure',
                'Customer acquisition costs'
            ]
        }
    ];

    // Key Risks & Mitigations
    const forwardRisks = [
        {
            id: 1,
            risk: 'Commodity Cost Inflation',
            probability: 'High',
            impact: 'High',
            timeframe: 'Q1 2025',
            description: 'Commodity costs expected to increase 8-12%, impacting margins',
            mitigation: 'Implement dynamic pricing adjustments, negotiate long-term contracts',
            financialImpact: '-$180M EBIT risk'
        },
        {
            id: 2,
            risk: 'Supply Chain Disruption',
            probability: 'Medium',
            impact: 'High',
            timeframe: 'Q1-Q2 2025',
            description: 'Semiconductor shortages could impact production',
            mitigation: 'Dual-sourcing initiatives, inventory buffer management',
            financialImpact: '-$250M revenue risk'
        },
        {
            id: 3,
            risk: 'Economic Slowdown',
            probability: 'Low',
            impact: 'High',
            timeframe: '2025',
            description: 'Potential recession impacting consumer demand',
            mitigation: 'Flexible production planning, cost reduction initiatives',
            financialImpact: '-$2.5B revenue risk'
        },
        {
            id: 4,
            risk: 'Regulatory Changes',
            probability: 'Low',
            impact: 'Medium',
            timeframe: '2025',
            description: 'Potential EV incentive changes or emissions regulations',
            mitigation: 'Policy monitoring, advocacy engagement',
            financialImpact: '-$150M revenue risk'
        }
    ];

    // Critical Actions Required
    const criticalActions = [
        {
            id: 1,
            action: 'Pricing Strategy Implementation',
            owner: 'CFO / CMO',
            dueDate: 'Dec 5, 2024',
            priority: 'High',
            description: 'Implement dynamic pricing to recover 150bps margin by Q1',
            impact: '+$320M EBIT potential',
            status: 'pending'
        },
        {
            id: 2,
            action: 'Supply Chain Dual-Sourcing',
            owner: 'COO / Procurement',
            dueDate: 'Dec 10, 2024',
            priority: 'High',
            description: 'Complete dual-sourcing agreements for critical components',
            impact: 'Risk mitigation',
            status: 'in-progress'
        },
        {
            id: 3,
            action: 'EV Model Launch Acceleration',
            owner: 'Product Development',
            dueDate: 'Jan 15, 2025',
            priority: 'High',
            description: 'Accelerate EV model launches to capture market opportunity',
            impact: '+$7.2B revenue potential',
            status: 'planned'
        },
        {
            id: 4,
            action: 'Customer Acquisition Campaign',
            owner: 'CMO / Sales',
            dueDate: 'Dec 1, 2024',
            priority: 'High',
            description: 'Launch targeted campaign to reverse acquisition decline',
            impact: '+$450M revenue potential',
            status: 'in-progress'
        }
    ];

    const formatCurrency = (value: number) => {
        return `$${(value / 1000).toFixed(1)}B`;
    };

    const getConfidenceColor = (confidence: string) => {
        switch (confidence.toLowerCase()) {
            case 'high': return 'bg-green-100 text-green-800';
            case 'medium': return 'bg-yellow-100 text-yellow-800';
            case 'low': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getImpactColor = (impact: string) => {
        switch (impact.toLowerCase()) {
            case 'positive': return 'text-green-600';
            case 'negative': return 'text-red-600';
            default: return 'text-gray-600';
        }
    };

    const getRiskColor = (level: string) => {
        switch (level.toLowerCase()) {
            case 'high': return 'bg-red-100 text-red-800 border-red-200';
            case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'low': return 'bg-green-100 text-green-800 border-green-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <div className="space-y-6">
            {/* Forecast Summary */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl shadow-lg p-6 text-white">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Forward-Looking Forecast</h2>
                        <p className="text-purple-100">Financial outlook through 2025</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {Object.entries(forecast).map(([period, data]) => (
                        <div key={period} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                            <div className="text-sm font-medium text-purple-100 mb-3">
                                {period === 'q4' ? 'Q4 2024' : period === 'q1_2025' ? 'Q1 2025' : 'Full Year 2025'}
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">Revenue</span>
                                    <span className="font-semibold">{formatCurrency(data.revenue.forecast)}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">EBIT</span>
                                    <span className="font-semibold">{formatCurrency(data.ebit.forecast)}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm">EBIT Margin</span>
                                    <span className="font-semibold">{data.ebitMargin.forecast}%</span>
                                </div>
                                <div className="flex items-center justify-between pt-2 border-t border-white/20">
                                    <span className="text-sm">Cash Flow</span>
                                    <span className="font-semibold">{formatCurrency(data.cashFlow.forecast)}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Key Assumptions */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <Lightbulb className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Key Assumptions</h2>
                        <p className="text-sm text-gray-600">Forecast foundation and confidence levels</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {assumptions.map((assumption, idx) => (
                        <div key={idx} className="p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-semibold text-gray-500">{assumption.category}</span>
                                <span className={`px-2 py-1 rounded text-xs font-semibold ${getConfidenceColor(assumption.confidence)}`}>
                                    {assumption.confidence}
                                </span>
                            </div>
                            <div className="mb-2">
                                <span className={`text-sm font-semibold ${getImpactColor(assumption.impact)}`}>
                                    {assumption.impact === 'Positive' ? '+' : '-'}
                                </span>
                                <span className="text-sm text-gray-900 ml-1">{assumption.assumption}</span>
                            </div>
                            <p className="text-xs text-gray-600">{assumption.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Strategic Opportunities */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-green-100 rounded-lg">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Strategic Opportunities</h2>
                        <p className="text-sm text-gray-600">Revenue growth and value creation initiatives</p>
                    </div>
                </div>
                <div className="space-y-4">
                    {opportunities.map((opp) => (
                        <motion.div
                            key={opp.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="border border-green-200 bg-green-50 rounded-lg p-5"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <h3 className="text-lg font-semibold text-gray-900">{opp.title}</h3>
                                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getConfidenceColor(opp.confidence)}`}>
                                            {opp.confidence} Confidence
                                        </span>
                                        <span className="text-sm text-gray-600">{opp.timeframe}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-3">{opp.description}</p>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                                        <div>
                                            <div className="text-xs text-gray-500 mb-1">Revenue Impact</div>
                                            <div className="font-semibold text-green-600">{opp.revenueImpact}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-500 mb-1">EBIT Impact</div>
                                            <div className="font-semibold text-green-600">{opp.ebitImpact}</div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <div className="text-xs font-semibold text-gray-700 mb-2">Key Actions</div>
                                            <ul className="space-y-1">
                                                {opp.keyActions.map((action, idx) => (
                                                    <li key={idx} className="text-sm text-gray-600 flex items-start">
                                                        <ArrowRight className="w-3 h-3 mr-2 mt-1 flex-shrink-0 text-green-600" />
                                                        <span>{action}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <div className="text-xs font-semibold text-gray-700 mb-2">Key Risks</div>
                                            <ul className="space-y-1">
                                                {opp.risks.map((risk, idx) => (
                                                    <li key={idx} className="text-sm text-gray-600 flex items-start">
                                                        <AlertTriangle className="w-3 h-3 mr-2 mt-1 flex-shrink-0 text-yellow-600" />
                                                        <span>{risk}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Forward Risks */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-red-100 rounded-lg">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Forward-Looking Risks</h2>
                        <p className="text-sm text-gray-600">Key risks and mitigation strategies</p>
                    </div>
                </div>
                <div className="space-y-4">
                    {forwardRisks.map((risk) => (
                        <div key={risk.id} className="border border-gray-200 rounded-lg p-5">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <h3 className="font-semibold text-gray-900">{risk.risk}</h3>
                                        <span className={`px-2 py-1 rounded text-xs font-semibold border ${getRiskColor(risk.probability)}`}>
                                            {risk.probability} Probability
                                        </span>
                                        <span className={`px-2 py-1 rounded text-xs font-semibold border ${getRiskColor(risk.impact)}`}>
                                            {risk.impact} Impact
                                        </span>
                                        <span className="text-sm text-gray-600">{risk.timeframe}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-3">{risk.description}</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <div className="text-xs font-semibold text-gray-700 mb-1">Mitigation</div>
                                            <p className="text-sm text-gray-600">{risk.mitigation}</p>
                                        </div>
                                        <div>
                                            <div className="text-xs font-semibold text-gray-700 mb-1">Financial Impact</div>
                                            <p className="text-sm font-semibold text-red-600">{risk.financialImpact}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Critical Actions Required */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-purple-100 rounded-lg">
                        <Target className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Critical Actions Required</h2>
                        <p className="text-sm text-gray-600">Immediate actions to achieve forecast</p>
                    </div>
                </div>
                <div className="space-y-4">
                    {criticalActions.map((action) => (
                        <div key={action.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <h3 className="font-semibold text-gray-900">{action.action}</h3>
                                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                            action.priority === 'High' ? 'bg-red-100 text-red-800' :
                                            action.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-blue-100 text-blue-800'
                                        }`}>
                                            {action.priority}
                                        </span>
                                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                            action.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                                            action.status === 'planned' ? 'bg-gray-100 text-gray-800' :
                                            'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {action.status === 'in-progress' ? 'In Progress' :
                                             action.status === 'planned' ? 'Planned' : 'Pending'}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-3">{action.description}</p>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        <div>
                                            <div className="text-xs text-gray-500 mb-1">Owner</div>
                                            <div className="font-semibold text-gray-900">{action.owner}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-500 mb-1">Due Date</div>
                                            <div className="font-semibold text-gray-900">{action.dueDate}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-500 mb-1">Impact</div>
                                            <div className="font-semibold text-green-600">{action.impact}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}





