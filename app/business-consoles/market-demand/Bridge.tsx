'use client';

import { motion } from 'framer-motion';
import {
    Brain,
    Check,
    ChevronDown,
    ChevronRight,
    Edit2,
    Eye,
    FileText,
    Users
} from 'lucide-react';
import React, { useState } from 'react';

interface CommentaryItem {
    id: string;
    metric: string;
    variance: number;
    variancePercent: number;
    userCommentary: string;
    aiSuggestion: string;
    author: string;
    timestamp: string;
    status: 'draft' | 'submitted' | 'approved' | 'signed-off';
    tags: string[];
    signedOffBy?: string;
    signedOffDate?: string;
}

interface BridgeDetailItem {
    id: string;
    name: string;
    value: number;
    type: 'start' | 'positive' | 'negative' | 'end';
    details?: {
        subCategory: string;
        amount: number;
        description: string;
    }[];
    commentary: CommentaryItem;
}

export default function Bridge() {
    const [selectedPeriod, setSelectedPeriod] = useState('current-month');
    const [expandedSections, setExpandedSections] = useState<string[]>(['revenue']);
    const [editingCommentary, setEditingCommentary] = useState<string | null>(null);
    const [expandedDetails, setExpandedDetails] = useState<string[]>([]);
    const [showDetailModal, setShowDetailModal] = useState<string | null>(null);

    // Enhanced bridge data with commentary
    const [bridgeDetailData, setBridgeDetailData] = useState<Record<string, BridgeDetailItem[]>>({
        revenue: [
            {
                id: 'revenue-start',
                name: 'Prior Period',
                value: 238.1,
                type: 'start',
                commentary: {
                    id: 'revenue-start',
                    metric: 'Prior Period Revenue',
                    variance: 0,
                    variancePercent: 0,
                    userCommentary: 'October 2024 baseline revenue',
                    aiSuggestion: 'Starting baseline for period-over-period analysis',
                    author: 'System',
                    timestamp: '2024-11-01T00:00:00',
                    status: 'approved',
                    tags: ['baseline']
                }
            },
            {
                id: 'revenue-volume',
                name: 'Volume Impact',
                value: 8.3,
                type: 'positive',
                details: [
                    { subCategory: 'North America Sales', amount: 5.2, description: 'Fleet sales recovery and retail growth' },
                    { subCategory: 'Europe Sales', amount: 2.1, description: 'EV market expansion' },
                    { subCategory: 'Asia Pacific', amount: 1.0, description: 'Steady growth in core markets' }
                ],
                commentary: {
                    id: 'revenue-volume',
                    metric: 'Volume Impact',
                    variance: 8.3,
                    variancePercent: 3.5,
                    userCommentary: 'Strong volume performance driven by fleet recovery in NA and EV growth in Europe',
                    aiSuggestion: 'Volume increased 3.5% MoM with North America leading (+5.2M) due to fleet sales recovery. Europe contributed +2.1M from EV expansion, while APAC maintained steady growth (+1.0M).',
                    author: 'Sarah Johnson',
                    timestamp: '2024-11-28T14:30:00',
                    status: 'signed-off',
                    tags: ['volume', 'regional-mix', 'fleet-sales'],
                    signedOffBy: 'Michael Chen',
                    signedOffDate: '2024-11-28T16:45:00'
                }
            },
            {
                id: 'revenue-price',
                name: 'Price/Mix',
                value: -1.5,
                type: 'negative',
                details: [
                    { subCategory: 'Price Pressure', amount: -2.3, description: 'Competitive pricing in sedan segment' },
                    { subCategory: 'Mix Improvement', amount: 0.8, description: 'Higher SUV/truck mix partially offsetting' }
                ],
                commentary: {
                    id: 'revenue-price',
                    metric: 'Price/Mix Impact',
                    variance: -1.5,
                    variancePercent: -0.6,
                    userCommentary: '',
                    aiSuggestion: 'Negative price/mix impact of -0.6% driven by competitive pricing pressures (-2.3M) in sedan segment, partially offset by favorable mix shift to higher-margin SUVs and trucks (+0.8M).',
                    author: '',
                    timestamp: '',
                    status: 'draft',
                    tags: ['pricing', 'product-mix']
                }
            },
            {
                id: 'revenue-fx',
                name: 'FX Translation',
                value: -2.1,
                type: 'negative',
                commentary: {
                    id: 'revenue-fx',
                    metric: 'FX Translation',
                    variance: -2.1,
                    variancePercent: -0.9,
                    userCommentary: 'Unfavorable FX primarily from EUR and JPY weakness',
                    aiSuggestion: 'Currency headwinds of -2.1M (-0.9%) mainly from EUR depreciation (-1.3M) and JPY weakness (-0.8M) against USD.',
                    author: 'Finance Team',
                    timestamp: '2024-11-28T10:00:00',
                    status: 'approved',
                    tags: ['fx', 'currency']
                }
            },
            {
                id: 'revenue-new-products',
                name: 'New Products',
                value: 3.5,
                type: 'positive',
                commentary: {
                    id: 'revenue-new-products',
                    metric: 'New Product Launch',
                    variance: 3.5,
                    variancePercent: 1.5,
                    userCommentary: 'Q4 EV launches exceeding expectations',
                    aiSuggestion: 'New product revenue of +3.5M (+1.5%) from successful Q4 EV launches, particularly the new compact SUV line which captured 2.3M in first month.',
                    author: 'Product Team',
                    timestamp: '2024-11-27T15:00:00',
                    status: 'submitted',
                    tags: ['new-products', 'ev', 'launch']
                }
            },
            {
                id: 'revenue-market',
                name: 'Market Growth',
                value: -1.3,
                type: 'negative',
                commentary: {
                    id: 'revenue-market',
                    metric: 'Market Dynamics',
                    variance: -1.3,
                    variancePercent: -0.5,
                    userCommentary: '',
                    aiSuggestion: 'Overall market contraction of -0.5% impacting revenue by -1.3M, primarily in traditional sedan segment which declined 3.2% MoM.',
                    author: '',
                    timestamp: '',
                    status: 'draft',
                    tags: ['market-dynamics']
                }
            },
            {
                id: 'revenue-end',
                name: 'Current Period',
                value: 245.0,
                type: 'end',
                commentary: {
                    id: 'revenue-end',
                    metric: 'Current Period Revenue',
                    variance: 6.9,
                    variancePercent: 2.9,
                    userCommentary: 'November revenue exceeds plan by 1.2%',
                    aiSuggestion: 'November revenue of 245.0M represents 2.9% growth over October, exceeding budget by 1.2%',
                    author: 'System',
                    timestamp: '2024-11-30T23:59:59',
                    status: 'approved',
                    tags: ['current-period']
                }
            }
        ]
    });

    const toggleSection = (section: string) => {
        setExpandedSections(prev =>
            prev.includes(section)
                ? prev.filter(s => s !== section)
                : [...prev, section]
        );
    };

    const toggleDetail = (id: string) => {
        setExpandedDetails(prev =>
            prev.includes(id)
                ? prev.filter(d => d !== id)
                : [...prev, id]
        );
    };

    const handleCommentaryEdit = (section: string, itemId: string, newText: string) => {
        setBridgeDetailData(prev => ({
            ...prev,
            [section]: prev[section].map(item =>
                item.id === itemId
                    ? {
                        ...item,
                        commentary: {
                            ...item.commentary,
                            userCommentary: newText,
                            author: 'Current User',
                            timestamp: new Date().toISOString(),
                            status: 'draft'
                        }
                    }
                    : item
            )
        }));
    };

    const saveCommentary = (section: string, itemId: string) => {
        setBridgeDetailData(prev => ({
            ...prev,
            [section]: prev[section].map(item =>
                item.id === itemId
                    ? {
                        ...item,
                        commentary: {
                            ...item.commentary,
                            status: 'submitted'
                        }
                    }
                    : item
            )
        }));
        setEditingCommentary(null);
    };

    const signOffCommentary = (section: string, itemId: string) => {
        setBridgeDetailData(prev => ({
            ...prev,
            [section]: prev[section].map(item =>
                item.id === itemId
                    ? {
                        ...item,
                        commentary: {
                            ...item.commentary,
                            status: 'signed-off',
                            signedOffBy: 'Current User',
                            signedOffDate: new Date().toISOString()
                        }
                    }
                    : item
            )
        }));
    };

    const renderBridgeChart = (data: BridgeDetailItem[], title: string) => {
        // Calculate cumulative values and positions
        const chartData = data.map((item, index) => {
            let cumulative = 0;
            let startY = 0;
            let endY = 0;

            // Calculate cumulative values up to this point
            for (let i = 0; i <= index; i++) {
                if (data[i].type === 'start') {
                    cumulative = data[i].value;
                } else if (data[i].type === 'positive' && i < index) {
                    cumulative += data[i].value;
                } else if (data[i].type === 'negative' && i < index) {
                    cumulative -= Math.abs(data[i].value);
                }
            }

            // Calculate bar positions
            if (item.type === 'start') {
                startY = 0;
                endY = item.value;
            } else if (item.type === 'end') {
                startY = 0;
                endY = item.value;
            } else if (item.type === 'positive') {
                startY = cumulative;
                endY = cumulative + item.value;
            } else if (item.type === 'negative') {
                startY = cumulative;
                endY = cumulative - Math.abs(item.value);
            }

            return { ...item, startY, endY, cumulative };
        });

        // Find min and max values for scaling
        const allValues = chartData.flatMap(d => [d.startY, d.endY]);
        const minValue = Math.min(...allValues, 0);
        const maxValue = Math.max(...allValues);
        const range = maxValue - minValue;
        const scale = 250 / range;
        const baseline = 270 - (0 - minValue) * scale;

        return (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h4 className="font-semibold text-gray-900 mb-4">{title}</h4>
                <div className="relative">
                    <svg className="w-full" height="350" viewBox="0 0 900 350">
                        {/* Grid lines */}
                        <line x1="50" y1={baseline} x2="850" y2={baseline} stroke="#e5e7eb" strokeWidth="1" />

                        {/* Bars */}
                        {chartData.map((item, index) => {
                            const x = 70 + index * 120;
                            const width = 80;
                            const y1 = baseline - (item.endY - minValue) * scale;
                            const y2 = baseline - (item.startY - minValue) * scale;
                            const height = Math.abs(y2 - y1);
                            const y = Math.min(y1, y2);

                            const color = item.type === 'start' || item.type === 'end' ? '#06b6d4' :
                                item.type === 'positive' ? '#10b981' : '#ef4444';

                            return (
                                <g key={item.id}>
                                    {/* Bar */}
                                    <rect
                                        x={x}
                                        y={y}
                                        width={width}
                                        height={height}
                                        fill={color}
                                        opacity="0.8"
                                    />

                                    {/* Connector lines */}
                                    {index > 0 && index < data.length - 1 && (
                                        <line
                                            x1={x}
                                            y1={item.type === 'positive' ? y : y + height}
                                            x2={x - 40}
                                            y2={chartData[index - 1].type === 'positive' ?
                                                baseline - (chartData[index - 1].endY - minValue) * scale :
                                                baseline - (chartData[index - 1].startY - minValue) * scale}
                                            stroke="#94a3b8"
                                            strokeWidth="1"
                                            strokeDasharray="2,2"
                                        />
                                    )}

                                    {/* Value labels */}
                                    <text
                                        x={x + width / 2}
                                        y={y - 5}
                                        textAnchor="middle"
                                        className="text-sm font-semibold"
                                        fill={item.type === 'start' || item.type === 'end' ? '#1f2937' :
                                            item.type === 'negative' ? '#ef4444' : '#10b981'}
                                    >
                                        {item.type === 'positive' ? '+' : item.type === 'negative' ? '-' : ''}
                                        ${Math.abs(item.value).toFixed(1)}M
                                    </text>

                                    {/* Category labels */}
                                    <text
                                        x={x + width / 2}
                                        y={310}
                                        textAnchor="middle"
                                        className="text-xs"
                                        fill="#6b7280"
                                    >
                                        {item.name.split(' ').map((word, i) => (
                                            <tspan key={i} x={x + width / 2} dy={i * 12}>
                                                {word}
                                            </tspan>
                                        ))}
                                    </text>
                                </g>
                            );
                        })}

                        {/* Y-axis */}
                        <line x1="50" y1="20" x2="50" y2="300" stroke="#e5e7eb" strokeWidth="1" />

                        {/* Y-axis labels */}
                        {[0, 50, 100, 150, 200, 250].map(val => {
                            const y = baseline - ((val - minValue) * scale);
                            if (y >= 20 && y <= 300) {
                                return (
                                    <g key={val}>
                                        <line x1="45" y1={y} x2="50" y2={y} stroke="#6b7280" strokeWidth="1" />
                                        <text x="40" y={y + 4} textAnchor="end" className="text-xs" fill="#6b7280">
                                            {val}
                                        </text>
                                    </g>
                                );
                            }
                            return null;
                        })}
                    </svg>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <h3 className="text-lg font-semibold text-gray-900">Bridge Analysis & Commentary</h3>
                        <select
                            value={selectedPeriod}
                            onChange={(e) => setSelectedPeriod(e.target.value)}
                            className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        >
                            <option value="current-month">Current Month</option>
                            <option value="current-quarter">Current Quarter</option>
                            <option value="ytd">Year to Date</option>
                            <option value="custom">Custom Period</option>
                        </select>
                    </div>
                    <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-500">Auto-save enabled</span>
                        <button className="px-4 py-2 bg-cyan-gradient text-navy-900 rounded-lg font-medium hover:shadow-lg glow-cyan-hover transition-all flex items-center space-x-2">
                            <Users className="w-4 h-4" />
                            <span>Submit for Review</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Revenue Bridge Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200"
            >
                <button
                    onClick={() => toggleSection('revenue')}
                    className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                    <div className="flex items-center space-x-3">
                        {expandedSections.includes('revenue') ?
                            <ChevronDown className="w-5 h-5 text-gray-400" /> :
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                        }
                        <h3 className="text-lg font-semibold text-gray-900">Revenue Bridge</h3>
                        <span className={`text-sm font-medium ${bridgeDetailData.revenue[bridgeDetailData.revenue.length - 1].value >
                            bridgeDetailData.revenue[0].value ? 'text-green-600' : 'text-red-600'
                            }`}>
                            +2.9% MoM
                        </span>
                    </div>
                    <div className="flex items-center space-x-2">
                        {bridgeDetailData.revenue.filter(item =>
                            item.commentary.status === 'signed-off' ||
                            item.commentary.status === 'approved'
                        ).length === bridgeDetailData.revenue.filter(item =>
                            item.type !== 'start' && item.type !== 'end'
                        ).length && (
                                <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                                    All Commentary Complete
                                </span>
                            )}
                    </div>
                </button>

                {expandedSections.includes('revenue') && (
                    <div className="px-4 pb-4 space-y-6">
                        {/* Bridge Chart */}
                        {renderBridgeChart(bridgeDetailData.revenue, 'Revenue Bridge Analysis ($M)')}

                        {/* Detailed Variance Table */}
                        <div className="bg-white rounded-lg border border-gray-200">
                            <div className="p-4 border-b border-gray-200">
                                <h4 className="font-semibold text-gray-900">Variance Analysis & Commentary</h4>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-200 bg-gray-50">
                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Component</th>
                                            <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">Value ($M)</th>
                                            <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">% Impact</th>
                                            <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Commentary</th>
                                            <th className="text-center py-3 px-4 text-sm font-medium text-gray-700">Status</th>
                                            <th className="text-center py-3 px-4 text-sm font-medium text-gray-700">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {bridgeDetailData.revenue.map((item) => (
                                            <React.Fragment key={item.id}>
                                                <tr className="hover:bg-gray-50">
                                                    <td className="py-3 px-4">
                                                        <div className="flex items-center space-x-2">
                                                            {item.details && (
                                                                <button
                                                                    onClick={() => toggleDetail(item.id)}
                                                                    className="p-1 hover:bg-gray-200 rounded"
                                                                >
                                                                    {expandedDetails.includes(item.id) ?
                                                                        <ChevronDown className="w-4 h-4" /> :
                                                                        <ChevronRight className="w-4 h-4" />
                                                                    }
                                                                </button>
                                                            )}
                                                            <span className="font-medium text-gray-900">{item.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className={`text-right py-3 px-4 font-medium ${item.type === 'positive' ? 'text-green-600' :
                                                        item.type === 'negative' ? 'text-red-600' :
                                                            'text-gray-900'
                                                        }`}>
                                                        {item.type === 'positive' ? '+' : item.type === 'negative' ? '-' : ''}
                                                        {item.value.toFixed(1)}
                                                    </td>
                                                    <td className={`text-right py-3 px-4 text-sm ${item.type === 'positive' ? 'text-green-600' :
                                                        item.type === 'negative' ? 'text-red-600' :
                                                            'text-gray-600'
                                                        }`}>
                                                        {item.commentary.variancePercent !== 0 && (
                                                            <>
                                                                {item.commentary.variancePercent > 0 ? '+' : ''}
                                                                {item.commentary.variancePercent.toFixed(1)}%
                                                            </>
                                                        )}
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <div className="space-y-2">
                                                            {/* AI Suggestion */}
                                                            {item.commentary.aiSuggestion && (
                                                                <div className="flex items-start space-x-2 text-sm">
                                                                    <Brain className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                                                    <p className="text-gray-600 italic">{item.commentary.aiSuggestion}</p>
                                                                </div>
                                                            )}
                                                            {/* User Commentary */}
                                                            {editingCommentary === item.id ? (
                                                                <div className="space-y-2">
                                                                    <textarea
                                                                        value={item.commentary.userCommentary}
                                                                        onChange={(e) => handleCommentaryEdit('revenue', item.id, e.target.value)}
                                                                        className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                                                        rows={3}
                                                                        placeholder="Add your commentary..."
                                                                    />
                                                                    <div className="flex space-x-2">
                                                                        <button
                                                                            onClick={() => saveCommentary('revenue', item.id)}
                                                                            className="px-3 py-1 bg-cyan-gradient text-navy-900 rounded text-sm font-medium hover:shadow-lg glow-cyan-hover"
                                                                        >
                                                                            Save
                                                                        </button>
                                                                        <button
                                                                            onClick={() => setEditingCommentary(null)}
                                                                            className="px-3 py-1 border border-gray-300 rounded text-sm"
                                                                        >
                                                                            Cancel
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                item.commentary.userCommentary && (
                                                                    <div className="text-sm text-gray-700">
                                                                        <p>{item.commentary.userCommentary}</p>
                                                                        {item.commentary.author && (
                                                                            <p className="text-xs text-gray-500 mt-1">
                                                                                — {item.commentary.author}, {new Date(item.commentary.timestamp).toLocaleDateString()}
                                                                            </p>
                                                                        )}
                                                                    </div>
                                                                )
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="text-center py-3 px-4">
                                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${item.commentary.status === 'signed-off' ? 'bg-green-100 text-green-800' :
                                                            item.commentary.status === 'approved' ? 'bg-blue-100 text-blue-800' :
                                                                item.commentary.status === 'submitted' ? 'bg-yellow-100 text-yellow-800' :
                                                                    'bg-gray-100 text-gray-800'
                                                            }`}>
                                                            {item.commentary.status === 'signed-off' && <Check className="w-3 h-3 mr-1" />}
                                                            {item.commentary.status}
                                                        </span>
                                                        {item.commentary.signedOffBy && (
                                                            <p className="text-xs text-gray-500 mt-1">
                                                                {item.commentary.signedOffBy}
                                                            </p>
                                                        )}
                                                    </td>
                                                    <td className="text-center py-3 px-4">
                                                        <div className="flex items-center justify-center space-x-2">
                                                            {item.type !== 'start' && item.type !== 'end' && (
                                                                <>
                                                                    <button
                                                                        onClick={() => setEditingCommentary(item.id)}
                                                                        className="p-1 hover:bg-gray-200 rounded"
                                                                        title="Edit Commentary"
                                                                    >
                                                                        <Edit2 className="w-4 h-4 text-gray-600" />
                                                                    </button>
                                                                    {item.commentary.status === 'submitted' && (
                                                                        <button
                                                                            onClick={() => signOffCommentary('revenue', item.id)}
                                                                            className="p-1 hover:bg-gray-200 rounded"
                                                                            title="Sign Off"
                                                                        >
                                                                            <FileText className="w-4 h-4 text-cyan-600" />
                                                                        </button>
                                                                    )}
                                                                    {item.details && (
                                                                        <button
                                                                            onClick={() => setShowDetailModal(item.id)}
                                                                            className="p-1 hover:bg-gray-200 rounded"
                                                                            title="View Details"
                                                                        >
                                                                            <Eye className="w-4 h-4 text-gray-600" />
                                                                        </button>
                                                                    )}
                                                                </>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                                {/* Expanded Details */}
                                                {expandedDetails.includes(item.id) && item.details && (
                                                    <tr>
                                                        <td colSpan={6} className="bg-gray-50 px-8 py-4">
                                                            <div className="space-y-2">
                                                                <h5 className="font-medium text-gray-900 mb-2">Breakdown:</h5>
                                                                {item.details.map((detail, idx) => (
                                                                    <div key={idx} className="flex justify-between items-center text-sm">
                                                                        <div>
                                                                            <span className="font-medium">{detail.subCategory}:</span>
                                                                            <span className="text-gray-600 ml-2">{detail.description}</span>
                                                                        </div>
                                                                        <span className={`font-medium ${detail.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                                            {detail.amount >= 0 ? '+' : ''}{detail.amount.toFixed(1)}M
                                                                        </span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>


                    </div>
                )}
            </motion.div>



            {/* Commentary Summary */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Commentary Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600">Total Variances</span>
                            <span className="text-2xl font-bold text-gray-900">
                                {bridgeDetailData.revenue.filter(item =>
                                    item.type !== 'start' && item.type !== 'end'
                                ).length}
                            </span>
                        </div>
                        <div className="text-xs text-gray-500">Requiring commentary</div>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600">Signed Off</span>
                            <span className="text-2xl font-bold text-green-600">
                                {bridgeDetailData.revenue.filter(item =>
                                    item.commentary.status === 'signed-off'
                                ).length}
                            </span>
                        </div>
                        <div className="text-xs text-gray-500">Fully approved</div>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600">Submitted</span>
                            <span className="text-2xl font-bold text-yellow-600">
                                {bridgeDetailData.revenue.filter(item =>
                                    item.commentary.status === 'submitted'
                                ).length}
                            </span>
                        </div>
                        <div className="text-xs text-gray-500">Awaiting sign-off</div>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600">Draft</span>
                            <span className="text-2xl font-bold text-orange-600">
                                {bridgeDetailData.revenue.filter(item =>
                                    item.commentary.status === 'draft' &&
                                    item.type !== 'start' &&
                                    item.type !== 'end'
                                ).length}
                            </span>
                        </div>
                        <div className="text-xs text-gray-500">Needs completion</div>
                    </div>
                </div>
            </div>
        </div>
    );
} 