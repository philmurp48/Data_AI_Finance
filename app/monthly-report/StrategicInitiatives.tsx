'use client';

import { motion } from 'framer-motion';
import {
    Target,
    CheckCircle,
    Clock,
    AlertTriangle,
    TrendingUp,
    DollarSign,
    Calendar,
    Users
} from 'lucide-react';

interface StrategicInitiativesProps {
    filters?: {
        selectedPeriod: string;
        selectedComparison: string;
    };
}

export default function StrategicInitiatives({ filters }: StrategicInitiativesProps) {
    const { selectedPeriod = 'November 2024', selectedComparison = 'vs Plan' } = filters || {};

    // Strategic Initiatives
    const initiatives = [
        {
            id: 1,
            name: 'EV Portfolio Expansion',
            description: 'Launch 5 new electric vehicle models by end of 2025',
            category: 'Growth',
            priority: 'High',
            owner: 'Product Development',
            progress: 65,
            status: 'on-track',
            budget: '$2.5B',
            spent: '$1.6B',
            milestones: [
                { name: 'Model 1 Launch', status: 'completed', date: 'Q3 2024' },
                { name: 'Model 2 Launch', status: 'completed', date: 'Q4 2024' },
                { name: 'Model 3 Launch', status: 'in-progress', date: 'Q1 2025' },
                { name: 'Model 4 Launch', status: 'planned', date: 'Q2 2025' },
                { name: 'Model 5 Launch', status: 'planned', date: 'Q4 2025' }
            ],
            risks: [
                'Battery supply chain constraints',
                'Charging infrastructure readiness'
            ],
            nextSteps: [
                'Finalize Model 3 production timeline',
                'Secure battery supply agreements'
            ]
        },
        {
            id: 2,
            name: 'Digital Transformation',
            description: 'Accelerate digital services and connected vehicle capabilities',
            category: 'Innovation',
            priority: 'High',
            owner: 'Digital & IT',
            progress: 78,
            status: 'on-track',
            budget: '$850M',
            spent: '$665M',
            milestones: [
                { name: 'OnStar 2.0 Launch', status: 'completed', date: 'Q2 2024' },
                { name: 'Mobile App Enhancement', status: 'completed', date: 'Q3 2024' },
                { name: 'Over-the-Air Updates', status: 'in-progress', date: 'Q1 2025' },
                { name: 'AI Assistant Integration', status: 'planned', date: 'Q2 2025' }
            ],
            risks: [
                'Technology integration complexity',
                'Customer adoption rates'
            ],
            nextSteps: [
                'Complete OTA testing phase',
                'Launch beta program for AI assistant'
            ]
        },
        {
            id: 3,
            name: 'Supply Chain Resilience',
            description: 'Build dual-sourcing capabilities and regional supply chains',
            category: 'Risk Management',
            priority: 'High',
            owner: 'Procurement',
            progress: 45,
            status: 'at-risk',
            budget: '$1.2B',
            spent: '$540M',
            milestones: [
                { name: 'Semiconductor Dual-Sourcing', status: 'in-progress', date: 'Q4 2024' },
                { name: 'Battery Supplier Diversification', status: 'in-progress', date: 'Q1 2025' },
                { name: 'Regional Supply Hubs', status: 'planned', date: 'Q2 2025' },
                { name: 'Risk Monitoring System', status: 'planned', date: 'Q3 2025' }
            ],
            risks: [
                'Supplier qualification timelines',
                'Cost premium for dual-sourcing'
            ],
            nextSteps: [
                'Accelerate semiconductor supplier onboarding',
                'Finalize regional hub locations'
            ]
        },
        {
            id: 4,
            name: 'Manufacturing Excellence',
            description: 'Achieve 80% OEE across all plants through automation and lean',
            category: 'Operations',
            priority: 'Medium',
            owner: 'Manufacturing',
            progress: 82,
            status: 'on-track',
            budget: '$450M',
            spent: '$370M',
            milestones: [
                { name: 'Arlington Automation', status: 'completed', date: 'Q2 2024' },
                { name: 'Detroit Optimization', status: 'completed', date: 'Q3 2024' },
                { name: 'Flint Modernization', status: 'in-progress', date: 'Q1 2025' },
                { name: 'System-wide Deployment', status: 'planned', date: 'Q2 2025' }
            ],
            risks: [
                'Workforce training requirements',
                'Production disruption during implementation'
            ],
            nextSteps: [
                'Complete Flint modernization planning',
                'Begin workforce training program'
            ]
        },
        {
            id: 5,
            name: 'Sustainability & ESG',
            description: 'Achieve carbon neutrality by 2035 and enhance ESG reporting',
            category: 'Sustainability',
            priority: 'Medium',
            owner: 'ESG Office',
            progress: 38,
            status: 'on-track',
            budget: '$3.2B',
            spent: '$1.2B',
            milestones: [
                { name: 'EV Production Capacity', status: 'in-progress', date: 'Q4 2024' },
                { name: 'Renewable Energy Transition', status: 'in-progress', date: 'Q1 2025' },
                { name: 'Supply Chain Emissions Reduction', status: 'planned', date: 'Q2 2025' },
                { name: 'Net Zero Manufacturing', status: 'planned', date: '2028' }
            ],
            risks: [
                'Renewable energy availability',
                'Cost of carbon offset programs'
            ],
            nextSteps: [
                'Finalize renewable energy contracts',
                'Establish supplier ESG standards'
            ]
        },
        {
            id: 6,
            name: 'Market Share Expansion',
            description: 'Gain 2pp market share in premium segments by 2026',
            category: 'Growth',
            priority: 'High',
            owner: 'Sales & Marketing',
            progress: 55,
            status: 'at-risk',
            budget: '$1.8B',
            spent: '$990M',
            milestones: [
                { name: 'Brand Positioning Campaign', status: 'completed', date: 'Q3 2024' },
                { name: 'Dealer Network Expansion', status: 'in-progress', date: 'Q1 2025' },
                { name: 'Digital Sales Channel', status: 'in-progress', date: 'Q1 2025' },
                { name: 'Customer Acquisition Program', status: 'planned', date: 'Q2 2025' }
            ],
            risks: [
                'Competitive pricing pressure',
                'Customer acquisition costs increasing'
            ],
            nextSteps: [
                'Launch targeted customer acquisition campaign',
                'Optimize digital marketing spend'
            ]
        }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'on-track': return 'text-green-600 bg-green-50 border-green-200';
            case 'at-risk': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
            case 'off-track': return 'text-red-600 bg-red-50 border-red-200';
            default: return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    const getMilestoneStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'text-green-600 bg-green-50';
            case 'in-progress': return 'text-blue-600 bg-blue-50';
            case 'planned': return 'text-gray-600 bg-gray-50';
            default: return 'text-gray-600 bg-gray-50';
        }
    };

    return (
        <div className="space-y-6">
            {/* Initiative Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5">
                    <div className="text-sm font-medium text-gray-600 mb-2">Total Initiatives</div>
                    <div className="text-3xl font-bold text-gray-900">{initiatives.length}</div>
                    <div className="text-xs text-gray-500 mt-2">Active strategic programs</div>
                </div>
                <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5">
                    <div className="text-sm font-medium text-gray-600 mb-2">On Track</div>
                    <div className="text-3xl font-bold text-green-600">
                        {initiatives.filter(i => i.status === 'on-track').length}
                    </div>
                    <div className="text-xs text-gray-500 mt-2">Meeting targets</div>
                </div>
                <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5">
                    <div className="text-sm font-medium text-gray-600 mb-2">At Risk</div>
                    <div className="text-3xl font-bold text-yellow-600">
                        {initiatives.filter(i => i.status === 'at-risk').length}
                    </div>
                    <div className="text-xs text-gray-500 mt-2">Requiring attention</div>
                </div>
                <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5">
                    <div className="text-sm font-medium text-gray-600 mb-2">Total Investment</div>
                    <div className="text-2xl font-bold text-gray-900">$10.0B</div>
                    <div className="text-xs text-gray-500 mt-2">Strategic initiatives</div>
                </div>
            </div>

            {/* Individual Initiatives */}
            <div className="space-y-4">
                {initiatives.map((initiative) => (
                    <motion.div
                        key={initiative.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-xl shadow-md border border-gray-200 p-6"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                    <h3 className="text-xl font-bold text-gray-900">{initiative.name}</h3>
                                    <span className={`px-2 py-1 rounded text-xs font-semibold border ${getStatusColor(initiative.status)}`}>
                                        {initiative.status === 'on-track' ? 'On Track' : 'At Risk'}
                                    </span>
                                    <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-semibold">
                                        {initiative.category}
                                    </span>
                                </div>
                                <p className="text-gray-600 mb-4">{initiative.description}</p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                    <div>
                                        <div className="text-xs text-gray-500 mb-1">Owner</div>
                                        <div className="font-semibold text-gray-900">{initiative.owner}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 mb-1">Priority</div>
                                        <div className="font-semibold text-gray-900">{initiative.priority}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 mb-1">Budget</div>
                                        <div className="font-semibold text-gray-900">{initiative.budget}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 mb-1">Spent</div>
                                        <div className="font-semibold text-gray-900">{initiative.spent}</div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-700">Progress</span>
                                        <span className="text-sm font-semibold text-gray-900">{initiative.progress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div
                                            className={`h-3 rounded-full ${
                                                initiative.status === 'on-track' ? 'bg-green-500' :
                                                initiative.status === 'at-risk' ? 'bg-yellow-500' : 'bg-red-500'
                                            }`}
                                            style={{ width: `${initiative.progress}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Milestones */}
                        <div className="mb-4">
                            <div className="text-sm font-semibold text-gray-900 mb-3">Key Milestones</div>
                            <div className="space-y-2">
                                {initiative.milestones.map((milestone, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            {milestone.status === 'completed' && <CheckCircle className="w-5 h-5 text-green-600" />}
                                            {milestone.status === 'in-progress' && <Clock className="w-5 h-5 text-blue-600" />}
                                            {milestone.status === 'planned' && <Calendar className="w-5 h-5 text-gray-400" />}
                                            <div>
                                                <div className="font-medium text-gray-900">{milestone.name}</div>
                                                <div className="text-xs text-gray-500">{milestone.date}</div>
                                            </div>
                                        </div>
                                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getMilestoneStatusColor(milestone.status)}`}>
                                            {milestone.status === 'completed' ? 'Completed' :
                                             milestone.status === 'in-progress' ? 'In Progress' : 'Planned'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Risks & Next Steps */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <div className="flex items-center space-x-2 mb-2">
                                    <AlertTriangle className="w-4 h-4 text-yellow-600" />
                                    <span className="text-sm font-semibold text-gray-900">Key Risks</span>
                                </div>
                                <ul className="space-y-1">
                                    {initiative.risks.map((risk, idx) => (
                                        <li key={idx} className="text-sm text-gray-600 flex items-start">
                                            <span className="mr-2">•</span>
                                            <span>{risk}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <div className="flex items-center space-x-2 mb-2">
                                    <TrendingUp className="w-4 h-4 text-green-600" />
                                    <span className="text-sm font-semibold text-gray-900">Next Steps</span>
                                </div>
                                <ul className="space-y-1">
                                    {initiative.nextSteps.map((step, idx) => (
                                        <li key={idx} className="text-sm text-gray-600 flex items-start">
                                            <span className="mr-2">•</span>
                                            <span>{step}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}





