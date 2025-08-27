import { AnimatePresence, motion } from 'framer-motion';
import {
    Activity,
    BarChart3,
    Copy,
    Edit2,
    Grid,
    LineChart,
    List,
    Lock,
    Move,
    PieChart,
    Plus,
    Settings, Share2,
    Trash2,
    Unlock,
    X
} from 'lucide-react';
import { useState } from 'react';

export default function Custom() {
    const [savedDashboards, setSavedDashboards] = useState([
        {
            id: 1,
            name: 'Q4 Executive Review',
            description: 'Custom view for quarterly board meeting',
            widgets: ['market-share-trend', 'regional-heatmap', 'competitor-matrix'],
            lastModified: '2 days ago',
            shared: true,
            owner: 'Sarah Johnson'
        },
        {
            id: 2,
            name: 'EV Market Deep Dive',
            description: 'Focused analysis on electric vehicle segment',
            widgets: ['ev-sales', 'charging-network', 'battery-costs', 'competitor-ev'],
            lastModified: '1 week ago',
            shared: false,
            owner: 'Sarah Johnson'
        },
        {
            id: 3,
            name: 'Regional Performance Tracker',
            description: 'Monthly regional sales and market share',
            widgets: ['regional-map', 'regional-table', 'growth-metrics'],
            lastModified: '3 days ago',
            shared: true,
            owner: 'Mike Chen'
        }
    ]);

    const [isCreating, setIsCreating] = useState(false);
    const [selectedDashboard, setSelectedDashboard] = useState<number | null>(null);
    const [editMode, setEditMode] = useState(false);

    // Available widgets for custom dashboards
    const availableWidgets = [
        {
            category: 'Market Metrics',
            widgets: [
                { id: 'market-share-trend', name: 'Market Share Trend', icon: LineChart },
                { id: 'segment-breakdown', name: 'Segment Breakdown', icon: PieChart },
                { id: 'demand-forecast', name: 'Demand Forecast', icon: BarChart3 },
                { id: 'order-pipeline', name: 'Order Pipeline', icon: Activity }
            ]
        },
        {
            category: 'Competitive Intelligence',
            widgets: [
                { id: 'competitor-matrix', name: 'Competitor Matrix', icon: Grid },
                { id: 'price-comparison', name: 'Price Comparison', icon: BarChart3 },
                { id: 'feature-analysis', name: 'Feature Analysis', icon: List },
                { id: 'market-movements', name: 'Market Movements', icon: Activity }
            ]
        },
        {
            category: 'Regional Analytics',
            widgets: [
                { id: 'regional-map', name: 'Regional Map', icon: Grid },
                { id: 'regional-table', name: 'Regional Table', icon: List },
                { id: 'growth-heatmap', name: 'Growth Heatmap', icon: BarChart3 },
                { id: 'opportunity-matrix', name: 'Opportunity Matrix', icon: Grid }
            ]
        },
        {
            category: 'Customer Insights',
            widgets: [
                { id: 'satisfaction-gauge', name: 'Satisfaction Gauge', icon: Activity },
                { id: 'segment-analysis', name: 'Segment Analysis', icon: PieChart },
                { id: 'retention-funnel', name: 'Retention Funnel', icon: BarChart3 },
                { id: 'preference-radar', name: 'Preference Radar', icon: Activity }
            ]
        }
    ];

    const [selectedWidgets, setSelectedWidgets] = useState<string[]>([]);
    const [dashboardName, setDashboardName] = useState('');
    const [dashboardDescription, setDashboardDescription] = useState('');

    const handleCreateDashboard = () => {
        if (dashboardName && selectedWidgets.length > 0) {
            const newDashboard = {
                id: savedDashboards.length + 1,
                name: dashboardName,
                description: dashboardDescription,
                widgets: selectedWidgets,
                lastModified: 'Just now',
                shared: false,
                owner: 'Sarah Johnson'
            };
            setSavedDashboards([...savedDashboards, newDashboard]);
            setIsCreating(false);
            setDashboardName('');
            setDashboardDescription('');
            setSelectedWidgets([]);
        }
    };

    const toggleWidget = (widgetId: string) => {
        setSelectedWidgets(prev =>
            prev.includes(widgetId)
                ? prev.filter(id => id !== widgetId)
                : [...prev, widgetId]
        );
    };

    const renderDashboardBuilder = () => (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-900">Create Custom Dashboard</h2>
                        <button
                            onClick={() => setIsCreating(false)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>
                </div>

                <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                    {/* Dashboard Details */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Dashboard Name
                        </label>
                        <input
                            type="text"
                            value={dashboardName}
                            onChange={(e) => setDashboardName(e.target.value)}
                            placeholder="e.g., Q1 2025 Planning Dashboard"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                        </label>
                        <textarea
                            value={dashboardDescription}
                            onChange={(e) => setDashboardDescription(e.target.value)}
                            placeholder="Brief description of this dashboard's purpose..."
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Widget Selection */}
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Select Widgets</h3>
                        <div className="space-y-6">
                            {availableWidgets.map((category) => (
                                <div key={category.category}>
                                    <h4 className="text-sm font-medium text-gray-700 mb-3">{category.category}</h4>
                                    <div className="grid grid-cols-2 gap-3">
                                        {category.widgets.map((widget) => {
                                            const Icon = widget.icon;
                                            const isSelected = selectedWidgets.includes(widget.id);
                                            return (
                                                <button
                                                    key={widget.id}
                                                    onClick={() => toggleWidget(widget.id)}
                                                    className={`p-4 rounded-lg border-2 transition-all ${isSelected
                                                        ? 'border-blue-500 bg-blue-50'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                        }`}
                                                >
                                                    <div className="flex items-center space-x-3">
                                                        <div className={`p-2 rounded-lg ${isSelected ? 'bg-blue-100' : 'bg-gray-100'
                                                            }`}>
                                                            <Icon className={`w-5 h-5 ${isSelected ? 'text-blue-600' : 'text-gray-600'
                                                                }`} />
                                                        </div>
                                                        <span className={`text-sm font-medium ${isSelected ? 'text-blue-900' : 'text-gray-700'
                                                            }`}>
                                                            {widget.name}
                                                        </span>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Selected Widgets Preview */}
                    {selectedWidgets.length > 0 && (
                        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm font-medium text-gray-700 mb-2">
                                Selected Widgets ({selectedWidgets.length})
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {selectedWidgets.map((widgetId) => {
                                    const widget = availableWidgets
                                        .flatMap(c => c.widgets)
                                        .find(w => w.id === widgetId);
                                    return (
                                        <span
                                            key={widgetId}
                                            className="inline-flex items-center px-3 py-1 bg-white border border-gray-300 rounded-full text-sm"
                                        >
                                            {widget?.name}
                                            <button
                                                onClick={() => toggleWidget(widgetId)}
                                                className="ml-2 text-gray-400 hover:text-gray-600"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-6 border-t border-gray-200 flex items-center justify-between">
                    <button
                        onClick={() => setIsCreating(false)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleCreateDashboard}
                        disabled={!dashboardName || selectedWidgets.length === 0}
                        className={`px-6 py-2 text-sm font-medium text-white rounded-lg transition-colors ${dashboardName && selectedWidgets.length > 0
                            ? 'bg-blue-600 hover:bg-blue-700'
                            : 'bg-gray-300 cursor-not-allowed'
                            }`}
                    >
                        Create Dashboard
                    </button>
                </div>
            </div>
        </motion.div>
    );

    const renderDashboardView = () => {
        const dashboard = savedDashboards.find(d => d.id === selectedDashboard);
        if (!dashboard) return null;

        return (
            <div className="space-y-6">
                {/* Dashboard Header */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">{dashboard.name}</h2>
                            <p className="text-sm text-gray-600 mt-1">{dashboard.description}</p>
                            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                                <span>Created by {dashboard.owner}</span>
                                <span>•</span>
                                <span>Modified {dashboard.lastModified}</span>
                                <span>•</span>
                                <span className="flex items-center">
                                    {dashboard.shared ? (
                                        <>
                                            <Unlock className="w-3 h-3 mr-1" />
                                            Shared
                                        </>
                                    ) : (
                                        <>
                                            <Lock className="w-3 h-3 mr-1" />
                                            Private
                                        </>
                                    )}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setEditMode(!editMode)}
                                className={`p-2 rounded-lg transition-colors ${editMode
                                    ? 'bg-blue-100 text-blue-600'
                                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                <Edit2 className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                                <Copy className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                                <Share2 className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setSelectedDashboard(null)}
                                className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Back to List
                            </button>
                        </div>
                    </div>

                    {editMode && (
                        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <p className="text-sm text-blue-700">
                                Edit mode enabled. Drag widgets to rearrange, or click the settings icon to configure.
                            </p>
                        </div>
                    )}
                </div>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-2 gap-6">
                    {dashboard.widgets.map((widgetId, index) => {
                        const widget = availableWidgets
                            .flatMap(c => c.widgets)
                            .find(w => w.id === widgetId);
                        const Icon = widget?.icon || Grid;

                        return (
                            <motion.div
                                key={widgetId}
                                layout
                                className={`bg-white rounded-xl shadow-sm p-6 ${editMode ? 'cursor-move hover:shadow-lg' : ''
                                    } ${index === 0 ? 'col-span-2' : ''}`}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-gray-100 rounded-lg">
                                            <Icon className="w-5 h-5 text-gray-600" />
                                        </div>
                                        <h3 className="text-base font-semibold text-gray-900">
                                            {widget?.name || 'Unknown Widget'}
                                        </h3>
                                    </div>
                                    {editMode && (
                                        <div className="flex items-center space-x-1">
                                            <button className="p-1 text-gray-400 hover:text-gray-600">
                                                <Move className="w-4 h-4" />
                                            </button>
                                            <button className="p-1 text-gray-400 hover:text-gray-600">
                                                <Settings className="w-4 h-4" />
                                            </button>
                                            <button className="p-1 text-gray-400 hover:text-red-600">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Widget Content Placeholder */}
                                <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
                                    <p className="text-gray-400 text-sm">
                                        {widget?.name} visualization would appear here
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-6">
            {!selectedDashboard ? (
                <>
                    {/* Header */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">Custom Dashboards</h2>
                                <p className="text-sm text-gray-600 mt-1">
                                    Create personalized views with your preferred metrics and visualizations
                                </p>
                            </div>
                            <button
                                onClick={() => setIsCreating(true)}
                                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                                <span className="text-sm font-medium">Create Dashboard</span>
                            </button>
                        </div>
                    </div>

                    {/* Saved Dashboards Grid */}
                    <div className="grid grid-cols-3 gap-6">
                        {savedDashboards.map((dashboard) => (
                            <motion.div
                                key={dashboard.id}
                                whileHover={{ scale: 1.02 }}
                                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all cursor-pointer"
                                onClick={() => setSelectedDashboard(dashboard.id)}
                            >
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <h3 className="text-base font-semibold text-gray-900 mb-1">
                                                {dashboard.name}
                                            </h3>
                                            <p className="text-sm text-gray-600 line-clamp-2">
                                                {dashboard.description}
                                            </p>
                                        </div>
                                        {dashboard.shared ? (
                                            <Unlock className="w-4 h-4 text-gray-400" />
                                        ) : (
                                            <Lock className="w-4 h-4 text-gray-400" />
                                        )}
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {dashboard.widgets.slice(0, 3).map((widget) => (
                                            <span
                                                key={widget}
                                                className="inline-flex px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                                            >
                                                {widget.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                                            </span>
                                        ))}
                                        {dashboard.widgets.length > 3 && (
                                            <span className="inline-flex px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded">
                                                +{dashboard.widgets.length - 3} more
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between text-xs text-gray-500">
                                        <span>{dashboard.owner}</span>
                                        <span>{dashboard.lastModified}</span>
                                    </div>
                                </div>

                                <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            // Handle edit
                                        }}
                                        className="text-sm text-gray-600 hover:text-gray-900 font-medium"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            // Handle delete
                                        }}
                                        className="text-sm text-red-600 hover:text-red-700 font-medium"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </motion.div>
                        ))}

                        {/* Template Cards */}
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                            <div className="flex items-center justify-center h-full">
                                <div className="text-center">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                                        <Grid className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <h4 className="text-sm font-medium text-gray-900 mb-1">
                                        Use a Template
                                    </h4>
                                    <p className="text-xs text-gray-600 mb-3">
                                        Start with pre-built dashboard templates
                                    </p>
                                    <button className="text-xs font-medium text-blue-600 hover:text-blue-700">
                                        Browse Templates →
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                renderDashboardView()
            )}

            {/* Dashboard Builder Modal */}
            <AnimatePresence>
                {isCreating && renderDashboardBuilder()}
            </AnimatePresence>
        </div>
    );
} 