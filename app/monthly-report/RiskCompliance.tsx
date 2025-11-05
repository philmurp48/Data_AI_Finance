'use client';

import { motion } from 'framer-motion';
import {
    Shield,
    AlertTriangle,
    CheckCircle,
    TrendingUp,
    AlertCircle,
    FileText,
    Target,
    Lock
} from 'lucide-react';

interface RiskComplianceProps {
    filters?: {
        selectedPeriod: string;
        selectedComparison: string;
    };
}

export default function RiskCompliance({ filters }: RiskComplianceProps) {
    const { selectedPeriod = 'November 2024', selectedComparison = 'vs Plan' } = filters || {};

    // Overall Risk Profile
    const riskProfile = {
        overallRating: 'Medium',
        trend: 'Stable',
        complianceScore: 98,
        controlEffectiveness: 96,
        auditFindings: 2,
        criticalRisks: 3
    };

    // Key Risk Areas
    const riskAreas = [
        {
            id: 'supply-chain',
            category: 'Supply Chain',
            rating: 'Medium',
            trend: 'Improving',
            description: 'Chip shortage risks mitigated through dual-sourcing initiatives',
            mitigations: [
                'Dual-sourcing agreements in place',
                'Alternative supplier qualification ongoing',
                'Inventory buffer increased'
            ],
            impact: 'Medium',
            likelihood: 'Medium'
        },
        {
            id: 'commodity-costs',
            category: 'Commodity Costs',
            rating: 'High',
            trend: 'Worsening',
            description: 'Commodity cost inflation impacting margins',
            mitigations: [
                'Dynamic pricing strategy being implemented',
                'Long-term supply contracts negotiated',
                'Cost reduction initiatives underway'
            ],
            impact: 'High',
            likelihood: 'High'
        },
        {
            id: 'cybersecurity',
            category: 'Cybersecurity',
            rating: 'Medium',
            trend: 'Stable',
            description: 'Increased threat landscape but controls effective',
            mitigations: [
                'Enhanced monitoring systems deployed',
                'Employee training completed',
                'Incident response plan updated'
            ],
            impact: 'High',
            likelihood: 'Low'
        },
        {
            id: 'regulatory',
            category: 'Regulatory Compliance',
            rating: 'Low',
            trend: 'Stable',
            description: 'Strong compliance posture maintained',
            mitigations: [
                'Regular compliance audits',
                'Policy updates implemented',
                'Training programs active'
            ],
            impact: 'Medium',
            likelihood: 'Low'
        },
        {
            id: 'market-demand',
            category: 'Market Demand',
            rating: 'Medium',
            trend: 'Improving',
            description: 'Customer acquisition declining but market share stable',
            mitigations: [
                'Customer acquisition campaign launched',
                'Digital sales channel expansion',
                'Product mix optimization'
            ],
            impact: 'Medium',
            likelihood: 'Medium'
        }
    ];

    // Compliance Metrics
    const complianceMetrics = [
        {
            area: 'Financial Reporting',
            score: 99,
            status: 'excellent',
            lastAudit: 'Oct 2024',
            findings: 0
        },
        {
            area: 'Operational Controls',
            score: 97,
            status: 'excellent',
            lastAudit: 'Sep 2024',
            findings: 1
        },
        {
            area: 'IT Controls',
            score: 96,
            status: 'good',
            lastAudit: 'Oct 2024',
            findings: 1
        },
        {
            area: 'Regulatory Compliance',
            score: 98,
            status: 'excellent',
            lastAudit: 'Nov 2024',
            findings: 0
        },
        {
            area: 'Environmental & Safety',
            score: 95,
            status: 'good',
            lastAudit: 'Sep 2024',
            findings: 0
        }
    ];

    // Audit Findings
    const auditFindings = [
        {
            id: 1,
            area: 'Operational Controls',
            severity: 'Minor',
            description: 'Documentation gap in inventory reconciliation process',
            owner: 'Operations',
            dueDate: 'Dec 15, 2024',
            status: 'in-progress',
            remediation: 'Update procedures and complete training'
        },
        {
            id: 2,
            area: 'IT Controls',
            severity: 'Minor',
            description: 'Access review overdue for 15 user accounts',
            owner: 'IT Security',
            dueDate: 'Dec 1, 2024',
            status: 'in-progress',
            remediation: 'Complete access review and update access matrix'
        }
    ];

    // Risk Mitigation Actions
    const mitigationActions = [
        {
            id: 1,
            risk: 'Commodity Cost Inflation',
            action: 'Implement dynamic pricing adjustments',
            owner: 'CFO / CMO',
            dueDate: 'Dec 5, 2024',
            status: 'pending',
            priority: 'High'
        },
        {
            id: 2,
            risk: 'Supply Chain Disruption',
            action: 'Activate dual-sourcing for critical semiconductors',
            owner: 'COO / Procurement',
            dueDate: 'Dec 10, 2024',
            status: 'in-progress',
            priority: 'High'
        },
        {
            id: 3,
            risk: 'Customer Acquisition',
            action: 'Launch targeted customer acquisition campaign',
            owner: 'CMO / Sales',
            dueDate: 'Dec 1, 2024',
            status: 'in-progress',
            priority: 'High'
        }
    ];

    const getRiskColor = (rating: string) => {
        switch (rating.toLowerCase()) {
            case 'low': return 'text-green-600 bg-green-50 border-green-200';
            case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
            case 'high': return 'text-red-600 bg-red-50 border-red-200';
            default: return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'excellent': return 'text-green-600 bg-green-50';
            case 'good': return 'text-blue-600 bg-blue-50';
            case 'fair': return 'text-yellow-600 bg-yellow-50';
            case 'poor': return 'text-red-600 bg-red-50';
            default: return 'text-gray-600 bg-gray-50';
        }
    };

    return (
        <div className="space-y-6">
            {/* Risk Profile Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5">
                    <div className="text-sm font-medium text-gray-600 mb-2">Overall Risk Rating</div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{riskProfile.overallRating}</div>
                    <div className="flex items-center text-sm text-gray-600">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        <span>{riskProfile.trend}</span>
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5">
                    <div className="text-sm font-medium text-gray-600 mb-2">Compliance Score</div>
                    <div className="text-3xl font-bold text-green-600 mb-1">{riskProfile.complianceScore}%</div>
                    <div className="text-sm text-gray-600">Above Target (95%)</div>
                </div>
                <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5">
                    <div className="text-sm font-medium text-gray-600 mb-2">Control Effectiveness</div>
                    <div className="text-3xl font-bold text-blue-600 mb-1">{riskProfile.controlEffectiveness}%</div>
                    <div className="text-sm text-gray-600">Strong controls</div>
                </div>
                <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5">
                    <div className="text-sm font-medium text-gray-600 mb-2">Active Findings</div>
                    <div className="text-3xl font-bold text-yellow-600 mb-1">{riskProfile.auditFindings}</div>
                    <div className="text-sm text-gray-600">All minor</div>
                </div>
            </div>

            {/* Key Risk Areas */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-red-100 rounded-lg">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Key Risk Areas</h2>
                        <p className="text-sm text-gray-600">Risk assessment and mitigation status</p>
                    </div>
                </div>
                <div className="space-y-4">
                    {riskAreas.map((risk) => (
                        <motion.div
                            key={risk.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <h3 className="text-lg font-semibold text-gray-900">{risk.category}</h3>
                                        <span className={`px-2 py-1 rounded text-xs font-semibold border ${getRiskColor(risk.rating)}`}>
                                            {risk.rating} Risk
                                        </span>
                                        <span className="text-sm text-gray-600">Trend: {risk.trend}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-3">{risk.description}</p>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                                        <div>
                                            <div className="text-xs text-gray-500 mb-1">Impact</div>
                                            <div className="font-semibold text-gray-900">{risk.impact}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-500 mb-1">Likelihood</div>
                                            <div className="font-semibold text-gray-900">{risk.likelihood}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-500 mb-1">Mitigations</div>
                                            <div className="font-semibold text-gray-900">{risk.mitigations.length} Active</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs font-semibold text-gray-700 mb-2">Mitigation Actions</div>
                                        <ul className="space-y-1">
                                            {risk.mitigations.map((mitigation, idx) => (
                                                <li key={idx} className="text-sm text-gray-600 flex items-start">
                                                    <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-600 flex-shrink-0" />
                                                    <span>{mitigation}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Compliance Metrics */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-green-100 rounded-lg">
                        <Shield className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Compliance Metrics</h2>
                        <p className="text-sm text-gray-600">Control effectiveness by area</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {complianceMetrics.map((metric) => (
                        <div key={metric.area} className="p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center justify-between mb-3">
                                <div className="text-sm font-medium text-gray-600">{metric.area}</div>
                                <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(metric.status)}`}>
                                    {metric.status}
                                </span>
                            </div>
                            <div className="text-2xl font-bold text-gray-900 mb-1">{metric.score}%</div>
                            <div className="text-xs text-gray-500 mb-3">
                                Last Audit: {metric.lastAudit}
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Findings</span>
                                <span className={`font-semibold ${metric.findings === 0 ? 'text-green-600' : 'text-yellow-600'}`}>
                                    {metric.findings}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Audit Findings */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                        <FileText className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Active Audit Findings</h2>
                        <p className="text-sm text-gray-600">Remediation in progress</p>
                    </div>
                </div>
                <div className="space-y-4">
                    {auditFindings.map((finding) => (
                        <div key={finding.id} className="border border-gray-200 rounded-lg p-5">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <h3 className="font-semibold text-gray-900">{finding.area}</h3>
                                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-semibold">
                                            {finding.severity}
                                        </span>
                                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-semibold">
                                            {finding.status === 'in-progress' ? 'In Progress' : 'Pending'}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-3">{finding.description}</p>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div>
                                            <div className="text-xs text-gray-500 mb-1">Owner</div>
                                            <div className="font-semibold text-gray-900">{finding.owner}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-500 mb-1">Due Date</div>
                                            <div className="font-semibold text-gray-900">{finding.dueDate}</div>
                                        </div>
                                        <div className="md:col-span-2">
                                            <div className="text-xs text-gray-500 mb-1">Remediation Plan</div>
                                            <div className="text-sm text-gray-900">{finding.remediation}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Risk Mitigation Actions */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-purple-100 rounded-lg">
                        <Target className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Risk Mitigation Actions</h2>
                        <p className="text-sm text-gray-600">Active risk management initiatives</p>
                    </div>
                </div>
                <div className="space-y-4">
                    {mitigationActions.map((action) => (
                        <div key={action.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <h3 className="font-semibold text-gray-900">{action.risk}</h3>
                                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                            action.priority === 'High' ? 'bg-red-100 text-red-800' :
                                            action.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-blue-100 text-blue-800'
                                        }`}>
                                            {action.priority}
                                        </span>
                                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                            action.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                                            'bg-gray-100 text-gray-800'
                                        }`}>
                                            {action.status === 'in-progress' ? 'In Progress' : 'Pending'}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-3">{action.action}</p>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        <div>
                                            <div className="text-xs text-gray-500 mb-1">Owner</div>
                                            <div className="font-semibold text-gray-900">{action.owner}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-500 mb-1">Due Date</div>
                                            <div className="font-semibold text-gray-900">{action.dueDate}</div>
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


