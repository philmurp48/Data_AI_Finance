'use client';

import { motion } from 'framer-motion';
import {
    Activity,
    AlertTriangle,
    BarChart3,
    Bell,
    Brain,
    ChevronDown,
    ChevronRight,
    DollarSign,
    Mail,
    MessageSquare,
    Package,
    Plus,
    Settings,
    Shield,
    Smartphone,
    Target,
    TrendingDown,
    TrendingUp,
    Users,
    Zap
} from 'lucide-react';
import React, { useState } from 'react';

interface Alert {
    id: string;
    name: string;
    type: 'threshold' | 'forecast' | 'anomaly' | 'business';
    category: string;
    driver: string;
    condition: string;
    threshold: number;
    unit: string;
    severity: 'critical' | 'high' | 'medium' | 'low';
    frequency: 'realtime' | 'hourly' | 'daily' | 'weekly';
    channels: string[];
    enabled: boolean;
    lastTriggered?: string;
    suggestedActions?: string[];
}

interface AlertTemplate {
    id: string;
    name: string;
    icon: any;
    category: string;
    description: string;
    defaultThreshold: number;
    unit: string;
    driver: string;
    suggestedActions: string[];
}

export default function AIAlertsPage() {
    const [activeTab, setActiveTab] = useState('my-alerts');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState<AlertTemplate | null>(null);
    const [expandedAlerts, setExpandedAlerts] = useState<string[]>([]);
    const [alerts, setAlerts] = useState<Alert[]>([
        {
            id: '1',
            name: 'Revenue Forecast Miss',
            type: 'forecast',
            category: 'Financial',
            driver: 'Revenue',
            condition: 'Below forecast by',
            threshold: 5,
            unit: '%',
            severity: 'critical',
            frequency: 'realtime',
            channels: ['email', 'app', 'slack'],
            enabled: true,
            lastTriggered: '2 hours ago',
            suggestedActions: [
                'Review pricing strategy',
                'Analyze competitive landscape',
                'Accelerate promotional campaigns',
                'Review sales pipeline'
            ]
        },
        {
            id: '2',
            name: 'Inventory Turnover Alert',
            type: 'anomaly',
            category: 'Operations',
            driver: 'Inventory Turnover',
            condition: 'Drops below',
            threshold: 4.5,
            unit: 'turns',
            severity: 'high',
            frequency: 'daily',
            channels: ['email', 'app'],
            enabled: true,
            lastTriggered: '1 day ago',
            suggestedActions: [
                'Review slow-moving inventory',
                'Adjust production schedules',
                'Consider promotional pricing',
                'Optimize supply chain'
            ]
        },
        {
            id: '3',
            name: 'Market Share Decline',
            type: 'business',
            category: 'Market',
            driver: 'Market Share',
            condition: 'Decreases by',
            threshold: 0.5,
            unit: '%',
            severity: 'medium',
            frequency: 'weekly',
            channels: ['email'],
            enabled: false
        },
        {
            id: '4',
            name: 'Production Efficiency Drop',
            type: 'threshold',
            category: 'Operations',
            driver: 'Production Efficiency',
            condition: 'Falls below',
            threshold: 85,
            unit: '%',
            severity: 'high',
            frequency: 'hourly',
            channels: ['app', 'sms'],
            enabled: true
        },
        {
            id: '5',
            name: 'Cost Overrun Prediction',
            type: 'forecast',
            category: 'Financial',
            driver: 'Operating Costs',
            condition: 'Exceeds budget by',
            threshold: 10,
            unit: '%',
            severity: 'critical',
            frequency: 'daily',
            channels: ['email', 'app', 'slack'],
            enabled: true,
            lastTriggered: '12 hours ago',
            suggestedActions: [
                'Review discretionary spending',
                'Freeze non-essential purchases',
                'Renegotiate vendor contracts',
                'Implement cost controls'
            ]
        },
        {
            id: '6',
            name: 'Demand Pattern Shift',
            type: 'anomaly',
            category: 'Market',
            driver: 'Market Demand',
            condition: 'Deviates by',
            threshold: 15,
            unit: '%',
            severity: 'medium',
            frequency: 'daily',
            channels: ['email', 'app'],
            enabled: true
        },
        {
            id: '7',
            name: 'Low Forecast Confidence',
            type: 'forecast',
            category: 'AI/ML',
            driver: 'Forecast Confidence',
            condition: 'Drops below',
            threshold: 70,
            unit: '%',
            severity: 'low',
            frequency: 'realtime',
            channels: ['app'],
            enabled: false
        },
        {
            id: '8',
            name: 'Gross Margin Erosion',
            type: 'threshold',
            category: 'Financial',
            driver: 'Gross Margin',
            condition: 'Decreases by',
            threshold: 2,
            unit: '%',
            severity: 'high',
            frequency: 'daily',
            channels: ['email', 'slack'],
            enabled: true
        }
    ]);

    // Alert Templates based on Business Drivers
    const alertTemplates: AlertTemplate[] = [
        // Financial Alerts
        {
            id: 'rev-miss',
            name: 'Revenue Target Miss',
            icon: TrendingDown,
            category: 'Financial',
            description: 'Alert when revenue is tracking below forecast',
            defaultThreshold: 5,
            unit: '%',
            driver: 'Revenue',
            suggestedActions: [
                'Review pricing strategy',
                'Analyze competitive landscape',
                'Accelerate promotional campaigns'
            ]
        },
        {
            id: 'margin-erosion',
            name: 'Margin Erosion',
            icon: DollarSign,
            category: 'Financial',
            description: 'Alert when gross margin drops below target',
            defaultThreshold: 2,
            unit: '%',
            driver: 'Gross Margin',
            suggestedActions: [
                'Review cost structure',
                'Optimize pricing',
                'Negotiate supplier contracts'
            ]
        },
        {
            id: 'cost-overrun',
            name: 'Cost Overrun Prediction',
            icon: AlertTriangle,
            category: 'Financial',
            description: 'AI predicts costs will exceed budget',
            defaultThreshold: 10,
            unit: '%',
            driver: 'Operating Costs',
            suggestedActions: [
                'Implement cost controls',
                'Review discretionary spending',
                'Renegotiate contracts'
            ]
        },
        // Operational Alerts
        {
            id: 'inventory-anomaly',
            name: 'Inventory Anomaly',
            icon: Package,
            category: 'Operations',
            description: 'Unusual inventory patterns detected',
            defaultThreshold: 20,
            unit: '%',
            driver: 'Inventory Levels',
            suggestedActions: [
                'Audit inventory counts',
                'Review demand forecasts',
                'Check supply chain disruptions'
            ]
        },
        {
            id: 'production-efficiency',
            name: 'Production Efficiency Drop',
            icon: Activity,
            category: 'Operations',
            description: 'Manufacturing efficiency below target',
            defaultThreshold: 85,
            unit: '%',
            driver: 'Production Efficiency',
            suggestedActions: [
                'Review production schedules',
                'Check equipment maintenance',
                'Analyze workforce productivity'
            ]
        },
        // Market Alerts
        {
            id: 'market-share',
            name: 'Market Share Change',
            icon: Users,
            category: 'Market',
            description: 'Significant market share movement',
            defaultThreshold: 0.5,
            unit: '%',
            driver: 'Market Share',
            suggestedActions: [
                'Analyze competitor actions',
                'Review product portfolio',
                'Enhance marketing efforts'
            ]
        },
        {
            id: 'demand-shift',
            name: 'Demand Pattern Shift',
            icon: BarChart3,
            category: 'Market',
            description: 'AI detects changing demand patterns',
            defaultThreshold: 15,
            unit: '%',
            driver: 'Market Demand',
            suggestedActions: [
                'Adjust production plans',
                'Review inventory strategy',
                'Update sales forecasts'
            ]
        },
        // AI/ML Predictive Alerts
        {
            id: 'forecast-confidence',
            name: 'Low Forecast Confidence',
            icon: Brain,
            category: 'AI/ML',
            description: 'ML model confidence drops below threshold',
            defaultThreshold: 70,
            unit: '%',
            driver: 'Forecast Confidence',
            suggestedActions: [
                'Review input data quality',
                'Check for market disruptions',
                'Prepare contingency plans'
            ]
        }
    ];

    const channelOptions = [
        { id: 'app', name: 'In-App', icon: Bell },
        { id: 'email', name: 'Email', icon: Mail },
        { id: 'sms', name: 'SMS', icon: Smartphone },
        { id: 'slack', name: 'Slack', icon: MessageSquare }
    ];

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'critical': return 'text-red-600 bg-red-50 border-red-200';
            case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
            case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
            case 'low': return 'text-blue-600 bg-blue-50 border-blue-200';
            default: return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'threshold': return Target;
            case 'forecast': return TrendingUp;
            case 'anomaly': return Activity;
            case 'business': return BarChart3;
            default: return Bell;
        }
    };

    const toggleAlert = (alertId: string) => {
        setAlerts(prev => prev.map(alert =>
            alert.id === alertId ? { ...alert, enabled: !alert.enabled } : alert
        ));
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-cyan-gradient rounded-lg shadow-lg glow-cyan">
                                <Brain className="w-6 h-6 text-navy-900" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">AI Alert System</h1>
                                <p className="text-sm text-gray-600">Intelligent notifications for business drivers</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="px-4 py-2 bg-cyan-gradient text-navy-900 rounded-lg font-semibold hover:shadow-lg glow-cyan-hover transition-all flex items-center space-x-2"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Create Alert</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white border-b border-gray-200">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="flex space-x-8">
                        <button
                            onClick={() => setActiveTab('my-alerts')}
                            className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'my-alerts'
                                ? 'border-cyan text-cyan'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            My Alerts
                        </button>
                        <button
                            onClick={() => setActiveTab('templates')}
                            className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'templates'
                                ? 'border-cyan text-cyan'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Alert Templates
                        </button>
                        <button
                            onClick={() => setActiveTab('activity')}
                            className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'activity'
                                ? 'border-cyan text-cyan'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Alert Activity
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="px-4 sm:px-6 lg:px-8 py-6">
                {activeTab === 'my-alerts' && (
                    <div className="space-y-4">
                        {/* Active Alerts Summary */}
                        <div className="grid grid-cols-4 gap-4 mb-6">
                            <div className="bg-white rounded-lg border border-gray-200 p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">Total Alerts</p>
                                        <p className="text-2xl font-bold text-gray-900">{alerts.length}</p>
                                    </div>
                                    <Bell className="w-8 h-8 text-gray-400" />
                                </div>
                            </div>
                            <div className="bg-white rounded-lg border border-gray-200 p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">Active</p>
                                        <p className="text-2xl font-bold text-green-600">
                                            {alerts.filter(a => a.enabled).length}
                                        </p>
                                    </div>
                                    <Activity className="w-8 h-8 text-green-400" />
                                </div>
                            </div>
                            <div className="bg-white rounded-lg border border-gray-200 p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">Critical</p>
                                        <p className="text-2xl font-bold text-red-600">
                                            {alerts.filter(a => a.severity === 'critical').length}
                                        </p>
                                    </div>
                                    <AlertTriangle className="w-8 h-8 text-red-400" />
                                </div>
                            </div>
                            <div className="bg-white rounded-lg border border-gray-200 p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">Triggered Today</p>
                                        <p className="text-2xl font-bold text-orange-600">3</p>
                                    </div>
                                    <Zap className="w-8 h-8 text-orange-400" />
                                </div>
                            </div>
                        </div>

                        {/* Alert List - Compact Table View */}
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Alert</th>
                                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Driver / Condition</th>
                                        <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">Severity</th>
                                        <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">Frequency</th>
                                        <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                                        <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">Channels</th>
                                        <th className="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {alerts.map((alert) => {
                                        const TypeIcon = getTypeIcon(alert.type);
                                        const isExpanded = expandedAlerts.includes(alert.id);
                                        return (
                                            <React.Fragment key={alert.id}>
                                                <tr className={`hover:bg-gray-50 ${isExpanded ? 'bg-cyan-50' : ''}`}>
                                                    <td className="px-3 py-2">
                                                        <div className="flex items-center space-x-2">
                                                            <div className={`p-1 rounded ${getSeverityColor(alert.severity)}`}>
                                                                <TypeIcon className="w-3.5 h-3.5" />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-medium text-gray-900">{alert.name}</p>
                                                                {alert.lastTriggered && (
                                                                    <p className="text-xs text-gray-500 flex items-center">
                                                                        <Zap className="w-2.5 h-2.5 mr-1 text-orange-500" />
                                                                        {alert.lastTriggered}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        <p className="text-sm text-gray-900">{alert.driver}</p>
                                                        <p className="text-xs text-gray-500">{alert.condition} {alert.threshold}{alert.unit}</p>
                                                    </td>
                                                    <td className="px-3 py-2 text-center">
                                                        <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${getSeverityColor(alert.severity)}`}>
                                                            {alert.severity}
                                                        </span>
                                                    </td>
                                                    <td className="px-3 py-2 text-center text-xs text-gray-600">{alert.frequency}</td>
                                                    <td className="px-3 py-2 text-center">
                                                        <button
                                                            onClick={() => toggleAlert(alert.id)}
                                                            className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${alert.enabled ? 'bg-cyan-gradient' : 'bg-gray-200'
                                                                }`}
                                                        >
                                                            <span
                                                                className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${alert.enabled ? 'translate-x-5' : 'translate-x-1'
                                                                    }`}
                                                            />
                                                        </button>
                                                    </td>
                                                    <td className="px-3 py-2 text-center">
                                                        <div className="flex items-center justify-center space-x-0.5">
                                                            {alert.channels.map(channel => {
                                                                const channelOption = channelOptions.find(c => c.id === channel);
                                                                if (!channelOption) return null;
                                                                const ChannelIcon = channelOption.icon;
                                                                return (
                                                                    <div key={channel} className="p-0.5 bg-gray-100 rounded" title={channelOption.name}>
                                                                        <ChannelIcon className="w-3 h-3 text-gray-600" />
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </td>
                                                    <td className="px-3 py-2 text-center">
                                                        <div className="flex items-center justify-center space-x-1">
                                                            {alert.lastTriggered && alert.suggestedActions && (
                                                                <button
                                                                    onClick={() => {
                                                                        setExpandedAlerts(prev =>
                                                                            prev.includes(alert.id)
                                                                                ? prev.filter(id => id !== alert.id)
                                                                                : [...prev, alert.id]
                                                                        );
                                                                    }}
                                                                    className="p-1 text-cyan hover:bg-cyan-50 rounded transition-colors"
                                                                    title="AI Suggestions"
                                                                >
                                                                    {isExpanded ? (
                                                                        <ChevronDown className="w-3.5 h-3.5" />
                                                                    ) : (
                                                                        <Brain className="w-3.5 h-3.5" />
                                                                    )}
                                                                </button>
                                                            )}
                                                            <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                                                                <Settings className="w-3.5 h-3.5" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                                {/* Expandable AI Suggested Actions Row */}
                                                {isExpanded && alert.lastTriggered && alert.suggestedActions && (
                                                    <tr>
                                                        <td colSpan={7} className="px-3 py-2 bg-cyan-50 border-t border-b border-cyan">
                                                            <div className="flex items-start space-x-2">
                                                                <Brain className="w-4 h-4 text-cyan mt-0.5 flex-shrink-0" />
                                                                <div className="flex-1">
                                                                    <p className="text-xs font-medium text-gray-900 mb-1">AI Suggested Actions</p>
                                                                    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                                                                        {alert.suggestedActions.map((action, idx) => (
                                                                            <div key={idx} className="flex items-start space-x-1">
                                                                                <ChevronRight className="w-2.5 h-2.5 mt-0.5 text-cyan flex-shrink-0" />
                                                                                <span className="text-xs text-gray-700">{action}</span>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </React.Fragment>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'templates' && (
                    <div className="grid grid-cols-3 gap-4">
                        {alertTemplates.map((template) => {
                            const Icon = template.icon;
                            return (
                                <motion.div
                                    key={template.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    whileHover={{ scale: 1.02 }}
                                    className="bg-white rounded-lg border border-gray-200 p-4 cursor-pointer hover:border-cyan hover:shadow-lg transition-all"
                                    onClick={() => {
                                        setSelectedTemplate(template);
                                        setShowCreateModal(true);
                                    }}
                                >
                                    <div className="flex items-start space-x-3">
                                        <div className="p-2 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg">
                                            <Icon className="w-5 h-5 text-cyan" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-900">{template.name}</h3>
                                            <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                                            <div className="mt-3 flex items-center space-x-4 text-xs text-gray-500">
                                                <span className="font-medium">{template.category}</span>
                                                <span>•</span>
                                                <span>Threshold: {template.defaultThreshold}{template.unit}</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}

                {activeTab === 'activity' && (
                    <div className="bg-white rounded-lg border border-gray-200">
                        <div className="p-4 border-b border-gray-200">
                            <h3 className="font-semibold text-gray-900">Recent Alert Activity</h3>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {/* Sample activity items */}
                            <div className="p-4 flex items-start space-x-3">
                                <div className="p-2 bg-red-50 rounded-lg">
                                    <TrendingDown className="w-4 h-4 text-red-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">Revenue Forecast Miss triggered</p>
                                    <p className="text-xs text-gray-500">Revenue tracking 7% below forecast for Q4</p>
                                    <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                                </div>
                            </div>
                            <div className="p-4 flex items-start space-x-3">
                                <div className="p-2 bg-orange-50 rounded-lg">
                                    <Package className="w-4 h-4 text-orange-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">Inventory Turnover Alert triggered</p>
                                    <p className="text-xs text-gray-500">Inventory turnover dropped to 4.2 turns</p>
                                    <p className="text-xs text-gray-400 mt-1">1 day ago</p>
                                </div>
                            </div>
                            <div className="p-4 flex items-start space-x-3">
                                <div className="p-2 bg-green-50 rounded-lg">
                                    <Shield className="w-4 h-4 text-green-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">Cost Overrun Alert resolved</p>
                                    <p className="text-xs text-gray-500">Operating costs back within budget threshold</p>
                                    <p className="text-xs text-gray-400 mt-1">2 days ago</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Create Alert Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                    >
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900">
                                {selectedTemplate ? `Create ${selectedTemplate.name} Alert` : 'Create Custom Alert'}
                            </h2>
                        </div>
                        <div className="p-6">
                            {/* Alert configuration form would go here */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Alert Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan focus:border-transparent"
                                        defaultValue={selectedTemplate?.name || ''}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Threshold</label>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="number"
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan focus:border-transparent"
                                            defaultValue={selectedTemplate?.defaultThreshold || 0}
                                        />
                                        <span className="text-sm text-gray-600">{selectedTemplate?.unit || '%'}</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Notification Channels</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {channelOptions.map(channel => {
                                            const Icon = channel.icon;
                                            return (
                                                <label key={channel.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                                                    <input type="checkbox" className="text-cyan" defaultChecked={channel.id === 'app'} />
                                                    <Icon className="w-4 h-4 text-gray-600" />
                                                    <span className="text-sm text-gray-700">{channel.name}</span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
                            <button
                                onClick={() => {
                                    setShowCreateModal(false);
                                    setSelectedTemplate(null);
                                }}
                                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    setShowCreateModal(false);
                                    setSelectedTemplate(null);
                                }}
                                className="px-4 py-2 bg-cyan-gradient text-navy-900 rounded-lg font-semibold hover:shadow-lg glow-cyan-hover transition-all"
                            >
                                Create Alert
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
} 