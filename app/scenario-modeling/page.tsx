'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
    AlertCircle,
    BarChart3,
    ChevronRight,
    DollarSign,
    LineChart,
    Loader,
    Play,
    RefreshCw,
    Save,
    Send,
    Shield,
    Sliders,
    Target,
    TrendingUp
} from 'lucide-react';
import { useState } from 'react';
import { parseScenarioFromText } from './scenario-parser';

interface Lever {
    id: string;
    name: string;
    category: string;
    currentValue: number;
    minValue: number;
    maxValue: number;
    unit: string;
    impact: 'high' | 'medium' | 'low';
}

interface Scenario {
    id: string;
    name: string;
    description: string;
    impact: number;
    confidence: number;
    levers: Record<string, number>;
}

interface SimulationResult {
    p10: number;
    p25: number;
    p50: number;
    p75: number;
    p90: number;
    mean: number;
    stdDev: number;
    confidence95Lower: number;
    confidence95Upper: number;
}

const scenarios: Scenario[] = [
    {
        id: 'tariff-escalation',
        name: 'Tariff Escalation',
        description: '25% tariffs + retaliation',
        impact: -850,
        confidence: 75,
        levers: {
            'tariffs': 25,
            'market-share': -2,
            'price-change': 3,
            'volume-growth': -5,
            'material-inflation': 2,
            'fx-rate': -3
        }
    },
    {
        id: 'recession',
        name: 'Recession Scenario',
        description: 'Economic downturn',
        impact: -1200,
        confidence: 60,
        levers: {
            'market-share': -3,
            'price-change': -5,
            'volume-growth': -15,
            'labor-productivity': -2,
            'supply-chain': -10
        }
    },
    {
        id: 'moderate-tariffs',
        name: 'Moderate Tariffs',
        description: '10% targeted tariffs',
        impact: -320,
        confidence: 85,
        levers: {
            'tariffs': 10,
            'market-share': -0.5,
            'price-change': 1.5,
            'volume-growth': -2,
            'material-inflation': 1
        }
    },
    {
        id: 'growth',
        name: 'Growth Scenario',
        description: 'Market expansion',
        impact: 650,
        confidence: 70,
        levers: {
            'market-share': 2,
            'price-change': 2,
            'volume-growth': 8,
            'labor-productivity': 3,
            'operational-efficiency': 5
        }
    }
];

const scenarioLevers: Lever[] = [
    // Market & Demand
    { id: 'tariffs', name: 'Tariff Impact', category: 'Market & Demand', currentValue: 0, minValue: 0, maxValue: 50, unit: '%', impact: 'high' },
    { id: 'market-share', name: 'Market Share', category: 'Market & Demand', currentValue: 0, minValue: -10, maxValue: 10, unit: '%', impact: 'high' },
    { id: 'price-change', name: 'Pricing Power', category: 'Pricing Power', currentValue: 0, minValue: -10, maxValue: 10, unit: '%', impact: 'high' },
    { id: 'volume-growth', name: 'Volume Growth', category: 'Volume Growth', currentValue: 0, minValue: -20, maxValue: 20, unit: '%', impact: 'high' },

    // Operations
    { id: 'material-inflation', name: 'Material Inflation', category: 'Operations', currentValue: 0, minValue: -5, maxValue: 15, unit: '%', impact: 'medium' },
    { id: 'labor-productivity', name: 'Labor Productivity', category: 'Operations', currentValue: 0, minValue: -10, maxValue: 10, unit: '%', impact: 'medium' },
    { id: 'supply-chain', name: 'Supply Chain Efficiency', category: 'Operations', currentValue: 0, minValue: -15, maxValue: 15, unit: '%', impact: 'medium' },
    { id: 'warranty-costs', name: 'Warranty Costs', category: 'Operations', currentValue: 0, minValue: -20, maxValue: 20, unit: '%', impact: 'medium' },
    { id: 'marketing-spend', name: 'Marketing Spend', category: 'Operations', currentValue: 0, minValue: -30, maxValue: 30, unit: '%', impact: 'medium' },

    // Financial
    { id: 'fx-rate', name: 'FX Rate Impact', category: 'Financial', currentValue: 0, minValue: -10, maxValue: 10, unit: '%', impact: 'low' },
    { id: 'interest-rates', name: 'Interest Rates', category: 'Financial', currentValue: 0, minValue: -5, maxValue: 5, unit: '%', impact: 'low' }
];

type AnalysisTab = 'pl-impact' | 'monte-carlo' | 'optimization' | 'risk-analysis';

interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

// Helper function to format numbers with commas
const formatNumber = (num: number, decimals: number = 0): string => {
    return num.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    });
};

export default function ScenarioModelingPage() {
    const [activeTab, setActiveTab] = useState<AnalysisTab>('pl-impact');
    const [selectedScenario, setSelectedScenario] = useState<string>('');
    const [leverValues, setLeverValues] = useState<Record<string, number>>(
        scenarioLevers.reduce((acc, lever) => ({ ...acc, [lever.id]: lever.currentValue }), {})
    );
    const [isSimulating, setIsSimulating] = useState(false);
    const [simulationResults, setSimulationResults] = useState<Record<string, SimulationResult> | null>(null);
    const [isOptimizing, setIsOptimizing] = useState(false);
    const [optimizationTarget, setOptimizationTarget] = useState({ metric: 'ebit', value: 4500 });
    const [optimizedLevers, setOptimizedLevers] = useState<Record<string, number> | null>(null);
    const [showDistributionTable, setShowDistributionTable] = useState(false);
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
    const [chatInput, setChatInput] = useState('');
    const [isProcessingChat, setIsProcessingChat] = useState(false);
    const [showChatDetails, setShowChatDetails] = useState(false);

    const handleScenarioSelect = (scenarioId: string) => {
        setSelectedScenario(scenarioId);
        const scenario = scenarios.find(s => s.id === scenarioId);
        if (scenario) {
            const newValues: Record<string, number> = {};
            scenarioLevers.forEach(lever => {
                newValues[lever.id] = scenario.levers[lever.id] || 0;
            });
            setLeverValues(newValues);
        }
    };

    const handleLeverChange = (leverId: string, value: number) => {
        setLeverValues(prev => ({ ...prev, [leverId]: value }));
        setSelectedScenario(''); // Clear scenario selection on manual adjustment
    };

    const handleChatSubmit = async () => {
        if (!chatInput.trim() || isProcessingChat) return;

        const userMessage: ChatMessage = {
            id: Date.now().toString(),
            role: 'user',
            content: chatInput,
            timestamp: new Date()
        };

        setChatMessages(prev => [...prev, userMessage]);
        setChatInput('');
        setIsProcessingChat(true);

        // Simulate AI processing delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Parse scenario and get lever adjustments
        const { levers, explanation } = parseScenarioFromText(chatInput);

        // Apply lever adjustments
        const newLeverValues: Record<string, number> = { ...leverValues };
        Object.keys(levers).forEach(leverId => {
            const lever = scenarioLevers.find(l => l.id === leverId);
            if (lever) {
                newLeverValues[leverId] = Math.max(
                    lever.minValue,
                    Math.min(lever.maxValue, levers[leverId])
                );
            }
        });

        setLeverValues(newLeverValues);
        setSelectedScenario(''); // Clear scenario selection

        const assistantMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: `${explanation}\n\nI've adjusted the following levers:\n${Object.entries(levers).map(([id, value]) => {
                const lever = scenarioLevers.find(l => l.id === id);
                return `• ${lever?.name}: ${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
            }).join('\n')}\n\nThe P&L impact has been calculated and is shown below.`,
            timestamp: new Date()
        };

        setChatMessages(prev => [...prev, assistantMessage]);
        setIsProcessingChat(false);
    };

    const calculateImpact = () => {
        // Automotive-specific P&L calculation
        // Base values for a typical automotive manufacturer ($31B revenue)
        const baseRevenue = 31000; // $31B
        
        // Revenue breakdown by segment (typical automotive)
        const basePassengerVehicles = 18600; // 60% of revenue
        const baseCommercialVehicles = 4650; // 15% of revenue
        const basePartsAndServices = 7750; // 25% of revenue

        // Cost of Sales (COGS) - Automotive specific
        const baseMaterials = 10850; // 35% of revenue (steel, aluminum, plastics, electronics)
        const baseLabor = 4650; // 15% of revenue
        const baseManufacturingOverhead = 3100; // 10% of revenue (facilities, utilities, depreciation)
        const baseCOGS = baseMaterials + baseLabor + baseManufacturingOverhead; // 18600 total

        // Gross Profit
        const baseGrossProfit = baseRevenue - baseCOGS; // 12400

        // Operating Expenses - Automotive specific
        const baseRD = 2325; // 7.5% of revenue (R&D is critical for automotive)
        const baseMarketing = 1550; // 5% of revenue (Marketing spend)
        const baseWarranty = 775; // 2.5% of revenue (Warranty costs)
        const baseSGandA = 3100; // 10% of revenue (Sales, Admin - excluding Marketing)
        const baseOtherOpEx = 775; // 2.5% of revenue
        const baseOpEx = baseRD + baseMarketing + baseWarranty + baseSGandA + baseOtherOpEx; // 8525 total

        // EBIT
        const baseEBIT = baseGrossProfit - baseOpEx; // 3875 (12.5% margin maintained)

        // Other Income/Expense
        const baseInterest = 350;
        const baseOtherIncome = 100;

        // EBT
        const baseEBT = baseEBIT - baseInterest + baseOtherIncome; // 3625

        // Tax
        const baseTax = 906; // 25% tax rate
        const baseNetIncome = baseEBT - baseTax; // 2719

        // Revenue impact from volume, price, and market share
        const revenueImpact = baseRevenue * (
            (leverValues['volume-growth'] || 0) / 100 +
            (leverValues['price-change'] || 0) / 100 +
            (leverValues['market-share'] || 0) / 100 * 0.5
        );

        // Segment revenue impacts (proportional)
        const passengerVehiclesImpact = basePassengerVehicles * (
            (leverValues['volume-growth'] || 0) / 100 +
            (leverValues['price-change'] || 0) / 100 +
            (leverValues['market-share'] || 0) / 100 * 0.5
        );
        const commercialVehiclesImpact = baseCommercialVehicles * (
            (leverValues['volume-growth'] || 0) / 100 * 0.8 + // Commercial vehicles less price sensitive
            (leverValues['price-change'] || 0) / 100 * 0.6 +
            (leverValues['market-share'] || 0) / 100 * 0.3
        );
        const partsAndServicesImpact = basePartsAndServices * (
            (leverValues['volume-growth'] || 0) / 100 * 0.6 + // Parts/services more stable
            (leverValues['price-change'] || 0) / 100 * 0.4 +
            (leverValues['market-share'] || 0) / 100 * 0.2
        );

        // COGS impact - Automotive specific
        const materialsImpact = baseMaterials * (
            (leverValues['volume-growth'] || 0) / 100 + // Materials scale with volume
            (leverValues['material-inflation'] || 0) / 100 * 0.8 + // Material inflation directly impacts
            (leverValues['tariffs'] || 0) / 100 * 0.05 + // Tariffs impact imported materials
            (leverValues['supply-chain'] || 0) / 100 * -0.15 // Supply chain efficiency reduces material costs
        );

        const laborImpact = baseLabor * (
            (leverValues['volume-growth'] || 0) / 100 + // Labor scales with volume
            (leverValues['labor-productivity'] || 0) / 100 * -0.3 // Productivity reduces labor costs
        );

        const mfgOverheadImpact = baseManufacturingOverhead * (
            (leverValues['volume-growth'] || 0) / 100 * 0.6 + // Some overhead is fixed
            (leverValues['supply-chain'] || 0) / 100 * -0.1 // Efficiency reduces overhead
        );

        const cogsImpact = materialsImpact + laborImpact + mfgOverheadImpact;

        // Gross Profit impact
        const grossProfitImpact = revenueImpact - cogsImpact;

        // Operating Expenses impact
        const rdImpact = baseRD * (
            (leverValues['volume-growth'] || 0) / 100 * 0.2 // R&D is mostly fixed
        );

        const marketingImpact = baseMarketing * (
            (leverValues['marketing-spend'] || 0) / 100 + // Marketing spend directly impacts
            (leverValues['volume-growth'] || 0) / 100 * 0.3 // Some marketing scales with growth
        );

        const warrantyImpact = baseWarranty * (
            (leverValues['warranty-costs'] || 0) / 100 + // Warranty costs directly impact
            (leverValues['volume-growth'] || 0) / 100 * 0.6 // Warranty scales with volume
        );

        const sgaImpact = baseSGandA * (
            (leverValues['volume-growth'] || 0) / 100 * 0.5 + // Some SG&A is variable
            (leverValues['labor-productivity'] || 0) / 100 * -0.2 // Productivity reduces SG&A
        );

        const otherOpExImpact = baseOtherOpEx * (
            (leverValues['volume-growth'] || 0) / 100 * 0.3
        );

        const opExImpact = rdImpact + marketingImpact + warrantyImpact + sgaImpact + otherOpExImpact;

        // EBIT impact
        const ebitImpact = grossProfitImpact - opExImpact;

        // Interest impact
        const interestImpact = baseInterest * (
            (leverValues['interest-rates'] || 0) / 100 * 0.5 + // Interest rates affect borrowing costs
            (leverValues['fx-rate'] || 0) / 100 * 0.1 // FX can affect foreign debt
        );

        // EBT impact
        const ebtImpact = ebitImpact - interestImpact;

        // Tax impact (25% tax rate)
        const taxImpact = ebtImpact * 0.25;

        // Net Income impact
        const netIncomeImpact = ebtImpact - taxImpact;

        const newRevenue = baseRevenue + revenueImpact;
        const newEBIT = baseEBIT + ebitImpact;

        return {
            revenue: revenueImpact,
            // Segment breakdowns
            passengerVehicles: passengerVehiclesImpact,
            commercialVehicles: commercialVehiclesImpact,
            partsAndServices: partsAndServicesImpact,
            // COGS breakdowns
            materials: materialsImpact,
            labor: laborImpact,
            manufacturingOverhead: mfgOverheadImpact,
            cogs: cogsImpact,
            grossProfit: grossProfitImpact,
            // Operating Expenses breakdowns
            rd: rdImpact,
            marketing: marketingImpact,
            warranty: warrantyImpact,
            sga: sgaImpact,
            otherOpEx: otherOpExImpact,
            opEx: opExImpact,
            ebit: ebitImpact,
            interest: interestImpact,
            ebt: ebtImpact,
            tax: taxImpact,
            netIncome: netIncomeImpact,
            ebitMargin: newRevenue > 0 ? (newEBIT / newRevenue) * 100 : 12.5,
            // Base values for display
            baseRevenue,
            basePassengerVehicles,
            baseCommercialVehicles,
            basePartsAndServices,
            baseMaterials,
            baseLabor,
            baseManufacturingOverhead,
            baseCOGS,
            baseGrossProfit,
            baseRD,
            baseMarketing,
            baseWarranty,
            baseSGandA,
            baseOtherOpEx,
            baseOpEx,
            baseEBIT,
            baseInterest,
            baseOtherIncome,
            baseEBT,
            baseTax,
            baseNetIncome
        };
    };

    // Monte Carlo Simulation
    const runMonteCarloSimulation = async () => {
        setIsSimulating(true);

        // Simulate 10,000 scenarios
        const iterations = 10000;
        const results: Record<string, number[]> = {
            revenue: [],
            ebit: [],
            netIncome: [],
            ebitMargin: [],
            cashFlow: []
        };

        for (let i = 0; i < iterations; i++) {
            // Generate random values for each lever within their ranges
            const simLeverValues: Record<string, number> = {};

            scenarioLevers.forEach(lever => {
                const range = lever.maxValue - lever.minValue;
                const volatility = 0.3; // 30% volatility factor
                const currentVal = leverValues[lever.id] || 0;

                // Generate normally distributed random value around current setting
                const randomFactor = (Math.random() + Math.random() + Math.random() - 1.5) * volatility;
                const simValue = currentVal + (range * randomFactor * 0.2);

                // Constrain to min/max
                simLeverValues[lever.id] = Math.max(lever.minValue, Math.min(lever.maxValue, simValue));
            });

            // Calculate outcomes for this iteration
            const revenue = 31000 * (1 + (simLeverValues['volume-growth'] || 0) / 100) * (1 + (simLeverValues['price-change'] || 0) / 100);
            const ebit = revenue * 0.12 - (simLeverValues['tariffs'] || 0) * 30.6 - (simLeverValues['material-inflation'] || 0) * 12.25;
            const netIncome = ebit * 0.75;

            results.revenue.push(revenue);
            results.ebit.push(ebit);
            results.netIncome.push(netIncome);
            results.ebitMargin.push((ebit / revenue) * 100);
            results.cashFlow.push(netIncome + 800); // Add back D&A
        }

        // Calculate statistics for each metric
        const simResults: Record<string, SimulationResult> = {};

        Object.entries(results).forEach(([metric, values]) => {
            values.sort((a, b) => a - b);

            const mean = values.reduce((sum, val) => sum + val, 0) / iterations;
            const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / iterations;
            const stdDev = Math.sqrt(variance);

            simResults[metric] = {
                p10: values[Math.floor(iterations * 0.1)],
                p25: values[Math.floor(iterations * 0.25)],
                p50: values[Math.floor(iterations * 0.5)],
                p75: values[Math.floor(iterations * 0.75)],
                p90: values[Math.floor(iterations * 0.9)],
                mean: mean,
                stdDev: stdDev,
                confidence95Lower: mean - (1.96 * stdDev / Math.sqrt(iterations)),
                confidence95Upper: mean + (1.96 * stdDev / Math.sqrt(iterations))
            };
        });

        setSimulationResults(simResults);
        setTimeout(() => setIsSimulating(false), 1500);
    };

    // Goal Seek Optimization
    const runOptimization = async () => {
        setIsOptimizing(true);

        // Simplified optimization algorithm
        const targetValue = optimizationTarget.value;
        const metric = optimizationTarget.metric;

        // Priority order for lever adjustments
        const leverPriorities = [
            { id: 'price-change', weight: 1.5 },
            { id: 'volume-growth', weight: 1.3 },
            { id: 'labor-productivity', weight: 1.2 },
            { id: 'material-inflation', weight: -0.8 },
            { id: 'tariffs', weight: -0.5 }
        ];

        // Simple iterative optimization
        let optimized: Record<string, number> = { ...leverValues };
        let currentValue = metric === 'ebit' ? calculateImpact().ebit + 3875 : calculateImpact().revenue + 31000;
        let iterations = 0;
        const maxIterations = 100;

        while (Math.abs(currentValue - targetValue) > 10 && iterations < maxIterations) {
            const gap = targetValue - currentValue;
            const gapPercent = gap / targetValue;

            // Adjust levers based on priority and gap
            leverPriorities.forEach(({ id, weight }) => {
                const lever = scenarioLevers.find(l => l.id === id);
                if (lever) {
                    const adjustment = gapPercent * weight * 2;
                    const newValue = optimized[id] + adjustment;
                    optimized[id] = Math.max(lever.minValue, Math.min(lever.maxValue, newValue));
                }
            });

            // Recalculate with new values
            const impact = calculateImpact();
            currentValue = metric === 'ebit' ? impact.ebit + 3875 : impact.revenue + 31000;
            iterations++;
        }

        setOptimizedLevers(optimized);
        setTimeout(() => setIsOptimizing(false), 1500);
    };

    const impact = calculateImpact();

    const tabs: { id: AnalysisTab; label: string; icon: any }[] = [
        { id: 'pl-impact', label: 'P&L Impact', icon: DollarSign },
        { id: 'monte-carlo', label: 'Monte Carlo', icon: BarChart3 },
        { id: 'optimization', label: 'Optimization', icon: Target },
        { id: 'risk-analysis', label: 'Risk Analysis', icon: Shield }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-cyan-gradient rounded-xl shadow-lg glow-cyan">
                                <Sliders className="w-8 h-8 text-navy-900" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Scenario Modeling</h1>
                                <p className="text-gray-600">What-if analysis with P&L impact</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
                                <RefreshCw className="w-4 h-4" />
                                <span>Reset</span>
                            </button>
                            <button className="px-4 py-2 bg-cyan-gradient text-navy-900 font-semibold rounded-lg glow-cyan-hover transition-all flex items-center space-x-2">
                                <Save className="w-4 h-4" />
                                <span>Save</span>
                            </button>
                            <button
                                onClick={() => {
                                    if (activeTab === 'monte-carlo') runMonteCarloSimulation();
                                    else if (activeTab === 'optimization') runOptimization();
                                }}
                                className="px-6 py-2 bg-cyan-gradient text-navy-900 font-semibold rounded-lg glow-cyan-hover transition-all flex items-center space-x-2"
                            >
                                <Play className="w-4 h-4" />
                                <span>Run {activeTab === 'monte-carlo' ? 'Simulation' : activeTab === 'optimization' ? 'Optimization' : 'Scenario'}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Analysis Tabs */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex space-x-8">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`py-4 px-2 border-b-2 transition-colors flex items-center space-x-2 ${activeTab === tab.id
                                        ? 'border-cyan text-cyan font-semibold'
                                        : 'border-transparent text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                <tab.icon className="w-4 h-4" />
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Scenario Chat - Horizontal */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-3">
                    <div className="flex items-center space-x-4">
                        <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Describe the scenario:</label>
                        <div className="flex-1 flex items-center space-x-2">
                            {chatMessages.length > 0 && (
                                <div className="flex items-center space-x-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm">
                                    <span className="text-gray-600">Applied:</span>
                                    <span className="font-medium text-gray-900">
                                        {chatMessages[chatMessages.length - 1]?.role === 'assistant' 
                                            ? chatMessages[chatMessages.length - 1].content.split('\n')[0].replace('Applied ', '').replace('.', '')
                                            : 'Processing...'}
                                    </span>
                                    <button
                                        onClick={() => setShowChatDetails(!showChatDetails)}
                                        className="ml-2 text-gray-500 hover:text-gray-700 transition-colors"
                                        title={showChatDetails ? "Hide details" : "Show details"}
                                    >
                                        <ChevronRight className={`w-4 h-4 transition-transform ${showChatDetails ? 'rotate-90' : ''}`} />
                                    </button>
                                </div>
                            )}
                            <input
                                type="text"
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
                                placeholder="e.g., What if tariffs increase by 25%?"
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan focus:border-transparent"
                                disabled={isProcessingChat}
                            />
                            <button
                                onClick={handleChatSubmit}
                                disabled={!chatInput.trim() || isProcessingChat}
                                className="px-4 py-2 bg-cyan-gradient text-navy-900 font-semibold rounded-lg glow-cyan-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                            >
                                {isProcessingChat ? (
                                    <Loader className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Send className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                    </div>
                    {showChatDetails && chatMessages.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-3 pt-3 border-t border-gray-200"
                        >
                            <div className="space-y-2 max-h-48 overflow-y-auto">
                                {chatMessages.map((message) => (
                                    <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[80%] rounded-lg p-2 text-sm ${
                                            message.role === 'user'
                                                ? 'bg-cyan text-navy-900'
                                                : 'bg-gray-50 border border-gray-200'
                                        }`}>
                                            <p className="whitespace-pre-wrap">{message.content}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Scenarios Horizontal Selector */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Scenarios</h3>
                    <div className="flex space-x-3">
                        {scenarios.map(scenario => (
                            <button
                                key={scenario.id}
                                onClick={() => handleScenarioSelect(scenario.id)}
                                className={`px-4 py-2 rounded-lg border-2 transition-all ${selectedScenario === scenario.id
                                        ? 'border-cyan bg-cyan-50'
                                        : 'border-gray-200 hover:border-gray-300 bg-white'
                                    }`}
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="text-left">
                                        <h4 className="font-semibold text-gray-900 text-sm">{scenario.name}</h4>
                                        <p className="text-xs text-gray-600">{scenario.description}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className={`text-sm font-bold ${scenario.impact >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                            {scenario.impact >= 0 ? '+' : ''}{scenario.impact}M
                                        </p>
                                        <p className="text-xs text-gray-500">{scenario.confidence}%</p>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-12 gap-8">
                    {/* Left Panel - Adjust Levers */}
                    <div className="col-span-5">
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Adjust Levers</h3>
                            <div className="space-y-4">
                                {scenarioLevers.map(lever => (
                                    <div key={lever.id}>
                                        <div className="flex items-center justify-between mb-2">
                                            <div>
                                                <label className="text-sm font-medium text-gray-700">{lever.name}</label>
                                                <p className="text-xs text-gray-500">{lever.category}</p>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className={`text-sm font-semibold ${leverValues[lever.id] > 0 ? 'text-green-600' :
                                                        leverValues[lever.id] < 0 ? 'text-red-600' :
                                                            'text-gray-600'
                                                    }`}>
                                                    {leverValues[lever.id] > 0 ? '+' : ''}{leverValues[lever.id]}{lever.unit}
                                                </span>
                                                <span className={`px-2 py-1 text-xs rounded-full ${lever.impact === 'high' ? 'bg-red-100 text-red-700' :
                                                        lever.impact === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                                            'bg-gray-100 text-gray-700'
                                                    }`}>
                                                    {lever.impact}
                                                </span>
                                            </div>
                                        </div>
                                        <input
                                            type="range"
                                            min={lever.minValue}
                                            max={lever.maxValue}
                                            step="0.5"
                                            value={leverValues[lever.id]}
                                            onChange={(e) => handleLeverChange(lever.id, parseFloat(e.target.value))}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                            style={{
                                                background: `linear-gradient(to right, #e5e7eb ${((leverValues[lever.id] - lever.minValue) / (lever.maxValue - lever.minValue)) * 100
                                                    }%, #8b5cf6 ${((leverValues[lever.id] - lever.minValue) / (lever.maxValue - lever.minValue)) * 100
                                                    }%)`
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Panel - Analysis Results */}
                    <div className="col-span-7">
                        <AnimatePresence mode="wait">
                            {activeTab === 'pl-impact' && (
                                <motion.div
                                    key="pl-impact"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="space-y-6"
                                >
                                    {/* Detailed Automotive P&L Impact */}
                                    <div className="bg-white rounded-xl p-6 shadow-sm">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Automotive P&L Flow-Through Impact</h3>
                                        
                                        {/* Summary Cards */}
                                        <div className="grid grid-cols-4 gap-4 mb-6">
                                            <div className="bg-gray-50 rounded-lg p-4">
                                                <p className="text-xs text-gray-600 mb-1">Revenue Impact</p>
                                                <p className={`text-xl font-bold ${impact.revenue >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                    {impact.revenue >= 0 ? '+' : ''}${Math.abs(impact.revenue).toFixed(0)}M
                                                </p>
                                            </div>
                                            <div className="bg-gray-50 rounded-lg p-4">
                                                <p className="text-xs text-gray-600 mb-1">EBIT Impact</p>
                                                <p className={`text-xl font-bold ${impact.ebit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                    {impact.ebit >= 0 ? '+' : ''}${Math.abs(impact.ebit).toFixed(0)}M
                                                </p>
                                            </div>
                                            <div className="bg-gray-50 rounded-lg p-4">
                                                <p className="text-xs text-gray-600 mb-1">Net Income Impact</p>
                                                <p className={`text-xl font-bold ${impact.netIncome >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                    {impact.netIncome >= 0 ? '+' : ''}${Math.abs(impact.netIncome).toFixed(0)}M
                                                </p>
                                            </div>
                                            <div className="bg-gray-50 rounded-lg p-4">
                                                <p className="text-xs text-gray-600 mb-1">EBIT Margin</p>
                                                <p className="text-xl font-bold text-gray-900">
                                                    {impact.ebitMargin.toFixed(1)}%
                                                </p>
                                            </div>
                                        </div>

                                        {/* Detailed P&L Table */}
                                        <div className="border-t border-gray-200 pt-4">
                                            <h4 className="text-sm font-semibold text-gray-900 mb-3">Automotive P&L Line Item Details</h4>
                                            <div className="space-y-2">
                                                {/* Revenue - with segment breakdown */}
                                                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                                    <div className="flex-1">
                                                        <p className="text-sm font-medium text-gray-900">Revenue</p>
                                                        <p className="text-xs text-gray-500">Base: ${formatNumber(impact.baseRevenue)}M</p>
                                                    </div>
                                                    <div className="text-right w-32">
                                                        <p className={`text-sm font-semibold ${impact.revenue >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                            {impact.revenue >= 0 ? '+' : ''}${formatNumber(Math.abs(impact.revenue))}M
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            ${formatNumber(impact.baseRevenue + impact.revenue)}M
                                                        </p>
                                                    </div>
                                                </div>
                                                {/* Revenue Segments */}
                                                <div className="ml-4 space-y-1 border-l-2 border-gray-200 pl-3">
                                                    <div className="flex items-center justify-between py-1">
                                                        <div className="flex-1">
                                                            <p className="text-xs text-gray-700">Passenger Vehicles</p>
                                                            <p className="text-xs text-gray-500">Base: ${formatNumber(impact.basePassengerVehicles)}M</p>
                                                        </div>
                                                        <div className="text-right w-28">
                                                            <p className={`text-xs font-medium ${impact.passengerVehicles >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                                {impact.passengerVehicles >= 0 ? '+' : ''}${formatNumber(Math.abs(impact.passengerVehicles))}M
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-between py-1">
                                                        <div className="flex-1">
                                                            <p className="text-xs text-gray-700">Commercial Vehicles</p>
                                                            <p className="text-xs text-gray-500">Base: ${formatNumber(impact.baseCommercialVehicles)}M</p>
                                                        </div>
                                                        <div className="text-right w-28">
                                                            <p className={`text-xs font-medium ${impact.commercialVehicles >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                                {impact.commercialVehicles >= 0 ? '+' : ''}${formatNumber(Math.abs(impact.commercialVehicles))}M
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-between py-1">
                                                        <div className="flex-1">
                                                            <p className="text-xs text-gray-700">Parts & Services</p>
                                                            <p className="text-xs text-gray-500">Base: ${formatNumber(impact.basePartsAndServices)}M</p>
                                                        </div>
                                                        <div className="text-right w-28">
                                                            <p className={`text-xs font-medium ${impact.partsAndServices >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                                {impact.partsAndServices >= 0 ? '+' : ''}${formatNumber(Math.abs(impact.partsAndServices))}M
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Cost of Sales - with breakdown */}
                                                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                                    <div className="flex-1">
                                                        <p className="text-sm font-medium text-gray-900">Cost of Sales</p>
                                                        <p className="text-xs text-gray-500">Base: ${formatNumber(impact.baseCOGS)}M</p>
                                                    </div>
                                                    <div className="text-right w-32">
                                                        <p className={`text-sm font-semibold ${impact.cogs <= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                            {impact.cogs >= 0 ? '+' : ''}${formatNumber(Math.abs(impact.cogs))}M
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            ${formatNumber(impact.baseCOGS + impact.cogs)}M
                                                        </p>
                                                    </div>
                                                </div>
                                                {/* COGS Breakdown */}
                                                <div className="ml-4 space-y-1 border-l-2 border-gray-200 pl-3">
                                                    <div className="flex items-center justify-between py-1">
                                                        <div className="flex-1">
                                                            <p className="text-xs text-gray-700">Materials & Components</p>
                                                            <p className="text-xs text-gray-500">Base: ${formatNumber(impact.baseMaterials)}M</p>
                                                        </div>
                                                        <div className="text-right w-28">
                                                            <p className={`text-xs font-medium ${impact.materials <= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                                {impact.materials >= 0 ? '+' : ''}${formatNumber(Math.abs(impact.materials))}M
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-between py-1">
                                                        <div className="flex-1">
                                                            <p className="text-xs text-gray-700">Direct Labor</p>
                                                            <p className="text-xs text-gray-500">Base: ${formatNumber(impact.baseLabor)}M</p>
                                                        </div>
                                                        <div className="text-right w-28">
                                                            <p className={`text-xs font-medium ${impact.labor <= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                                {impact.labor >= 0 ? '+' : ''}${formatNumber(Math.abs(impact.labor))}M
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-between py-1">
                                                        <div className="flex-1">
                                                            <p className="text-xs text-gray-700">Manufacturing Overhead</p>
                                                            <p className="text-xs text-gray-500">Base: ${formatNumber(impact.baseManufacturingOverhead)}M</p>
                                                        </div>
                                                        <div className="text-right w-28">
                                                            <p className={`text-xs font-medium ${impact.manufacturingOverhead <= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                                {impact.manufacturingOverhead >= 0 ? '+' : ''}${formatNumber(Math.abs(impact.manufacturingOverhead))}M
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Gross Profit */}
                                                <div className="flex items-center justify-between py-2 border-b border-gray-200 bg-gray-50 px-2 rounded">
                                                    <div className="flex-1">
                                                        <p className="text-sm font-semibold text-gray-900">Gross Profit</p>
                                                        <p className="text-xs text-gray-500">Base: ${formatNumber(impact.baseGrossProfit)}M</p>
                                                    </div>
                                                    <div className="text-right w-32">
                                                        <p className={`text-sm font-semibold ${impact.grossProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                            {impact.grossProfit >= 0 ? '+' : ''}${formatNumber(Math.abs(impact.grossProfit))}M
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            ${formatNumber(impact.baseGrossProfit + impact.grossProfit)}M
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Operating Expenses - with breakdown */}
                                                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                                    <div className="flex-1">
                                                        <p className="text-sm font-medium text-gray-900">Operating Expenses</p>
                                                        <p className="text-xs text-gray-500">Base: ${formatNumber(impact.baseOpEx)}M</p>
                                                    </div>
                                                    <div className="text-right w-32">
                                                        <p className={`text-sm font-semibold ${impact.opEx <= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                            {impact.opEx >= 0 ? '+' : ''}${formatNumber(Math.abs(impact.opEx))}M
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            ${formatNumber(impact.baseOpEx + impact.opEx)}M
                                                        </p>
                                                    </div>
                                                </div>
                                                {/* OpEx Breakdown */}
                                                <div className="ml-4 space-y-1 border-l-2 border-gray-200 pl-3">
                                                    <div className="flex items-center justify-between py-1">
                                                        <div className="flex-1">
                                                            <p className="text-xs text-gray-700">R&D Expenses</p>
                                                            <p className="text-xs text-gray-500">Base: ${formatNumber(impact.baseRD)}M</p>
                                                        </div>
                                                        <div className="text-right w-28">
                                                            <p className={`text-xs font-medium ${impact.rd <= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                                {impact.rd >= 0 ? '+' : ''}${formatNumber(Math.abs(impact.rd))}M
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-between py-1">
                                                        <div className="flex-1">
                                                            <p className="text-xs text-gray-700">Marketing Expenses</p>
                                                            <p className="text-xs text-gray-500">Base: ${formatNumber(impact.baseMarketing)}M</p>
                                                        </div>
                                                        <div className="text-right w-28">
                                                            <p className={`text-xs font-medium ${impact.marketing <= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                                {impact.marketing >= 0 ? '+' : ''}${formatNumber(Math.abs(impact.marketing))}M
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-between py-1">
                                                        <div className="flex-1">
                                                            <p className="text-xs text-gray-700">Warranty Costs</p>
                                                            <p className="text-xs text-gray-500">Base: ${formatNumber(impact.baseWarranty)}M</p>
                                                        </div>
                                                        <div className="text-right w-28">
                                                            <p className={`text-xs font-medium ${impact.warranty <= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                                {impact.warranty >= 0 ? '+' : ''}${formatNumber(Math.abs(impact.warranty))}M
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-between py-1">
                                                        <div className="flex-1">
                                                            <p className="text-xs text-gray-700">SG&A Expenses</p>
                                                            <p className="text-xs text-gray-500">Base: ${formatNumber(impact.baseSGandA)}M</p>
                                                        </div>
                                                        <div className="text-right w-28">
                                                            <p className={`text-xs font-medium ${impact.sga <= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                                {impact.sga >= 0 ? '+' : ''}${formatNumber(Math.abs(impact.sga))}M
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-between py-1">
                                                        <div className="flex-1">
                                                            <p className="text-xs text-gray-700">Other Operating Expenses</p>
                                                            <p className="text-xs text-gray-500">Base: ${formatNumber(impact.baseOtherOpEx)}M</p>
                                                        </div>
                                                        <div className="text-right w-28">
                                                            <p className={`text-xs font-medium ${impact.otherOpEx <= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                                {impact.otherOpEx >= 0 ? '+' : ''}${formatNumber(Math.abs(impact.otherOpEx))}M
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* EBIT */}
                                                <div className="flex items-center justify-between py-2 border-b border-gray-200 bg-gray-50 px-2 rounded">
                                                    <div className="flex-1">
                                                        <p className="text-sm font-semibold text-gray-900">EBIT</p>
                                                        <p className="text-xs text-gray-500">Base: ${formatNumber(impact.baseEBIT)}M</p>
                                                    </div>
                                                    <div className="text-right w-32">
                                                        <p className={`text-sm font-semibold ${impact.ebit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                            {impact.ebit >= 0 ? '+' : ''}${formatNumber(Math.abs(impact.ebit))}M
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            ${formatNumber(impact.baseEBIT + impact.ebit)}M
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Interest */}
                                                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                                    <div className="flex-1">
                                                        <p className="text-sm font-medium text-gray-900">Interest Expense</p>
                                                        <p className="text-xs text-gray-500">Base: ${formatNumber(impact.baseInterest)}M</p>
                                                    </div>
                                                    <div className="text-right w-32">
                                                        <p className={`text-sm font-semibold ${impact.interest <= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                            {impact.interest >= 0 ? '+' : ''}${formatNumber(Math.abs(impact.interest))}M
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            ${formatNumber(impact.baseInterest + impact.interest)}M
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* EBT */}
                                                <div className="flex items-center justify-between py-2 border-b border-gray-200 bg-gray-50 px-2 rounded">
                                                    <div className="flex-1">
                                                        <p className="text-sm font-semibold text-gray-900">EBT (Earnings Before Tax)</p>
                                                        <p className="text-xs text-gray-500">Base: ${formatNumber(impact.baseEBT)}M</p>
                                                    </div>
                                                    <div className="text-right w-32">
                                                        <p className={`text-sm font-semibold ${impact.ebt >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                            {impact.ebt >= 0 ? '+' : ''}${formatNumber(Math.abs(impact.ebt))}M
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            ${formatNumber(impact.baseEBT + impact.ebt)}M
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Tax */}
                                                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                                    <div className="flex-1">
                                                        <p className="text-sm font-medium text-gray-900">Income Tax</p>
                                                        <p className="text-xs text-gray-500">Base: ${formatNumber(impact.baseTax)}M (25%)</p>
                                                    </div>
                                                    <div className="text-right w-32">
                                                        <p className={`text-sm font-semibold ${impact.tax <= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                            {impact.tax >= 0 ? '+' : ''}${formatNumber(Math.abs(impact.tax))}M
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            ${formatNumber(impact.baseTax + impact.tax)}M
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Net Income */}
                                                <div className="flex items-center justify-between py-3 border-t-2 border-gray-300 bg-gradient-to-r from-gray-50 to-gray-100 px-3 rounded">
                                                    <div className="flex-1">
                                                        <p className="text-sm font-bold text-gray-900">Net Income</p>
                                                        <p className="text-xs text-gray-500">Base: ${formatNumber(impact.baseNetIncome)}M</p>
                                                    </div>
                                                    <div className="text-right w-32">
                                                        <p className={`text-base font-bold ${impact.netIncome >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                            {impact.netIncome >= 0 ? '+' : ''}${formatNumber(Math.abs(impact.netIncome))}M
                                                        </p>
                                                        <p className="text-sm font-semibold text-gray-900">
                                                            ${formatNumber(impact.baseNetIncome + impact.netIncome)}M
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'monte-carlo' && (
                                <motion.div
                                    key="monte-carlo"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="space-y-6"
                                >
                                    <div className="bg-white rounded-xl p-6 shadow-sm">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monte Carlo Simulation Results</h3>

                                        {isSimulating ? (
                                            <div className="flex flex-col items-center justify-center py-12">
                                                <Loader className="w-8 h-8 text-cyan animate-spin mb-4" />
                                                <p className="text-gray-600">Running 10,000 scenarios...</p>
                                            </div>
                                        ) : simulationResults ? (
                                            <div className="space-y-6">
                                                {/* Summary Stats */}
                                                <div className="grid grid-cols-2 gap-6">
                                                    <div className="bg-gray-50 rounded-lg p-4">
                                                        <p className="text-sm text-gray-600 mb-1">Mean EBIT</p>
                                                        <p className="text-2xl font-bold text-gray-900">
                                                            ${simulationResults.ebit.mean.toFixed(0)}M
                                                        </p>
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            Std Dev: ${simulationResults.ebit.stdDev.toFixed(0)}M
                                                        </p>
                                                    </div>
                                                    <div className="bg-cyan-50 rounded-lg p-4">
                                                        <p className="text-sm text-gray-600 mb-1">95% Confidence Interval</p>
                                                        <p className="text-lg font-bold text-gray-900">
                                                            ${simulationResults.ebit.confidence95Lower.toFixed(0)}M - ${simulationResults.ebit.confidence95Upper.toFixed(0)}M
                                                        </p>
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            Range: ${(simulationResults.ebit.confidence95Upper - simulationResults.ebit.confidence95Lower).toFixed(0)}M
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Toggle for Distribution Table */}
                                                <div className="flex justify-center">
                                                    <button
                                                        onClick={() => setShowDistributionTable(!showDistributionTable)}
                                                        className="text-sm text-cyan-600 hover:text-cyan-700 font-medium flex items-center space-x-2"
                                                    >
                                                        <span>{showDistributionTable ? 'Hide' : 'Show'} Detailed Distribution</span>
                                                        <ChevronRight className={`w-4 h-4 transform transition-transform ${showDistributionTable ? 'rotate-90' : ''}`} />
                                                    </button>
                                                </div>

                                                {/* Percentile Table - Collapsible */}
                                                {showDistributionTable && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: 'auto' }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                    >
                                                        <h4 className="font-medium text-gray-900 mb-3">Outcome Distribution</h4>
                                                        <div className="overflow-x-auto">
                                                            <table className="w-full">
                                                                <thead>
                                                                    <tr className="border-b border-gray-200">
                                                                        <th className="text-left py-2 text-sm font-medium text-gray-700">Metric</th>
                                                                        <th className="text-right py-2 text-sm font-medium text-gray-700">P10</th>
                                                                        <th className="text-right py-2 text-sm font-medium text-gray-700">P25</th>
                                                                        <th className="text-right py-2 text-sm font-medium text-gray-700">P50</th>
                                                                        <th className="text-right py-2 text-sm font-medium text-gray-700">P75</th>
                                                                        <th className="text-right py-2 text-sm font-medium text-gray-700">P90</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {Object.entries(simulationResults).map(([metric, result]) => (
                                                                        <tr key={metric} className="border-b border-gray-100">
                                                                            <td className="py-2 text-sm font-medium text-gray-900 capitalize">
                                                                                {metric.replace(/([A-Z])/g, ' $1').trim()}
                                                                            </td>
                                                                            <td className="py-2 text-sm text-right text-red-600">
                                                                                {metric.includes('Margin') ? `${result.p10.toFixed(1)}%` : `$${result.p10.toFixed(0)}M`}
                                                                            </td>
                                                                            <td className="py-2 text-sm text-right text-orange-600">
                                                                                {metric.includes('Margin') ? `${result.p25.toFixed(1)}%` : `$${result.p25.toFixed(0)}M`}
                                                                            </td>
                                                                            <td className="py-2 text-sm text-right font-semibold text-gray-900">
                                                                                {metric.includes('Margin') ? `${result.p50.toFixed(1)}%` : `$${result.p50.toFixed(0)}M`}
                                                                            </td>
                                                                            <td className="py-2 text-sm text-right text-green-600">
                                                                                {metric.includes('Margin') ? `${result.p75.toFixed(1)}%` : `$${result.p75.toFixed(0)}M`}
                                                                            </td>
                                                                            <td className="py-2 text-sm text-right text-green-700">
                                                                                {metric.includes('Margin') ? `${result.p90.toFixed(1)}%` : `$${result.p90.toFixed(0)}M`}
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </motion.div>
                                                )}

                                                {/* Monte Carlo Distribution Visualization */}
                                                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 shadow-lg">
                                                    <h4 className="font-semibold text-gray-900 mb-4 text-lg">EBIT Probability Distribution</h4>
                                                    <div className="h-80 relative bg-white rounded-lg p-4">
                                                        <svg className="w-full h-full" viewBox="0 0 700 280">
                                                            {/* Background gradient */}
                                                            <defs>
                                                                <linearGradient id="gridGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                                                    <stop offset="0%" stopColor="#f3f4f6" stopOpacity="0.5" />
                                                                    <stop offset="100%" stopColor="#f3f4f6" stopOpacity="0" />
                                                                </linearGradient>
                                                            </defs>
                                                            
                                                            {/* Grid lines */}
                                                            <rect x="50" y="20" width="600" height="180" fill="url(#gridGradient)" />
                                                            <line x1="50" y1="200" x2="650" y2="200" stroke="#e5e7eb" strokeWidth="1" />
                                                            <line x1="50" y1="150" x2="650" y2="150" stroke="#f3f4f6" strokeWidth="1" strokeDasharray="2,2" />
                                                            <line x1="50" y1="100" x2="650" y2="100" stroke="#f3f4f6" strokeWidth="1" strokeDasharray="2,2" />
                                                            <line x1="50" y1="50" x2="650" y2="50" stroke="#f3f4f6" strokeWidth="1" strokeDasharray="2,2" />
                                                            
                                                            {/* Create smooth bell curve */}
                                                            {(() => {
                                                                const points = 100;
                                                                const minValue = simulationResults.ebit.mean - 3 * simulationResults.ebit.stdDev;
                                                                const maxValue = simulationResults.ebit.mean + 3 * simulationResults.ebit.stdDev;
                                                                const range = maxValue - minValue;
                                                                
                                                                // Generate bell curve path
                                                                const mean = simulationResults.ebit.mean;
                                                                const stdDev = simulationResults.ebit.stdDev;
                                                                
                                                                // Create smooth curve path
                                                                const curvePath = Array.from({ length: points }, (_, i) => {
                                                                    const x = minValue + (i / (points - 1)) * range;
                                                                    const probability = Math.exp(-Math.pow(x - mean, 2) / (2 * Math.pow(stdDev, 2))) / (stdDev * Math.sqrt(2 * Math.PI));
                                                                    const normalizedHeight = probability * stdDev * Math.sqrt(2 * Math.PI) * 160;
                                                                    const xPos = 50 + (i / (points - 1)) * 600;
                                                                    const yPos = 200 - normalizedHeight;
                                                                    return `${xPos},${yPos}`;
                                                                }).join(' ');
                                                                
                                                                // Create histogram bars with better bell curve
                                                                const bins = 60;
                                                                const bars = Array.from({ length: bins }, (_, i) => {
                                                                    const binStart = minValue + (i / bins) * range;
                                                                    const binEnd = minValue + ((i + 1) / bins) * range;
                                                                    const binCenter = (binStart + binEnd) / 2;
                                                                    
                                                                    // Calculate bar height based on normal distribution
                                                                    const probability = Math.exp(-Math.pow(binCenter - mean, 2) / (2 * Math.pow(stdDev, 2))) / (stdDev * Math.sqrt(2 * Math.PI));
                                                                    const barHeight = probability * stdDev * Math.sqrt(2 * Math.PI) * 160;
                                                                    
                                                                    // Color gradient based on position
                                                                    const distanceFromMean = Math.abs(binCenter - mean) / stdDev;
                                                                    const color = distanceFromMean > 2 ? '#ef4444' : // Red for extremes
                                                                                distanceFromMean > 1 ? '#f59e0b' : // Orange for outer
                                                                                '#06b6d4'; // Cyan for center
                                                                    
                                                                    const opacity = 0.6 - (distanceFromMean * 0.15);
                                                                    
                                                                    return (
                                                                        <rect
                                                                            key={i}
                                                                            x={50 + (i / bins) * 600}
                                                                            y={200 - barHeight}
                                                                            width={600 / bins - 1}
                                                                            height={barHeight}
                                                                            fill={color}
                                                                            opacity={opacity}
                                                                        />
                                                                    );
                                                                });
                                                                
                                                                return (
                                                                    <>
                                                                        {bars}
                                                                        {/* Smooth curve overlay */}
                                                                        <path
                                                                            d={`M ${curvePath} L 650,200 L 50,200 Z`}
                                                                            fill="none"
                                                                            stroke="#1f2937"
                                                                            strokeWidth="2"
                                                                            opacity="0.8"
                                                                        />
                                                                    </>
                                                                );
                                                            })()}
                                                            
                                                            {/* Mean line */}
                                                            <line
                                                                x1={350}
                                                                y1={20}
                                                                x2={350}
                                                                y2={200}
                                                                stroke="#1f2937"
                                                                strokeWidth="3"
                                                                strokeDasharray="6,3"
                                                                opacity="0.8"
                                                            />
                                                            
                                                            {/* Confidence interval indicators */}
                                                            {(() => {
                                                                const mean = simulationResults.ebit.mean;
                                                                const stdDev = simulationResults.ebit.stdDev;
                                                                const conf95Lower = mean - 1.96 * stdDev;
                                                                const conf95Upper = mean + 1.96 * stdDev;
                                                                const minValue = mean - 3 * stdDev;
                                                                const maxValue = mean + 3 * stdDev;
                                                                
                                                                const lowerX = 50 + ((conf95Lower - minValue) / (maxValue - minValue)) * 600;
                                                                const upperX = 50 + ((conf95Upper - minValue) / (maxValue - minValue)) * 600;
                                                                
                                                                return (
                                                                    <>
                                                                        <line x1={lowerX} y1={180} x2={lowerX} y2={200} stroke="#10b981" strokeWidth="2" opacity="0.8" />
                                                                        <line x1={upperX} y1={180} x2={upperX} y2={200} stroke="#10b981" strokeWidth="2" opacity="0.8" />
                                                                        <line x1={lowerX} y1={190} x2={upperX} y2={190} stroke="#10b981" strokeWidth="2" opacity="0.8" />
                                                                    </>
                                                                );
                                                            })()}
                                                            
                                                            {/* X-axis labels */}
                                                            <text x="350" y="220" textAnchor="middle" className="text-sm fill-gray-900 font-bold">
                                                                ${simulationResults.ebit.mean.toFixed(0)}M
                                                            </text>
                                                            <text x="350" y="235" textAnchor="middle" className="text-xs fill-gray-600">
                                                                Expected Value
                                                            </text>
                                                            
                                                            {/* Title */}
                                                            <text x="350" y="15" textAnchor="middle" className="text-base font-semibold fill-gray-800">
                                                                10,000 Monte Carlo Simulations
                                                            </text>
                                                        </svg>
                                                    </div>
                                                    
                                                    {/* Key Statistics Summary */}
                                                    <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                                                        <div className="bg-cyan-50 rounded-lg p-3">
                                                            <p className="text-xs text-gray-600 mb-1">95% Confidence</p>
                                                            <p className="text-sm font-bold text-cyan-700">
                                                                ${simulationResults.ebit.confidence95Lower.toFixed(0)}M - ${simulationResults.ebit.confidence95Upper.toFixed(0)}M
                                                            </p>
                                                        </div>
                                                        <div className="bg-gray-50 rounded-lg p-3">
                                                            <p className="text-xs text-gray-600 mb-1">Standard Deviation</p>
                                                            <p className="text-sm font-bold text-gray-700">
                                                                ±${simulationResults.ebit.stdDev.toFixed(0)}M
                                                            </p>
                                                        </div>
                                                        <div className="bg-green-50 rounded-lg p-3">
                                                            <p className="text-xs text-gray-600 mb-1">Probability &gt; Target</p>
                                                            <p className="text-sm font-bold text-green-700">
                                                                {((1 - (3875 - simulationResults.ebit.mean) / simulationResults.ebit.stdDev) * 100).toFixed(0)}%
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Risk Metrics */}
                                                <div className="grid grid-cols-3 gap-4">
                                                    <div className="bg-red-50 rounded-lg p-4">
                                                        <div className="flex items-center space-x-2 mb-2">
                                                            <AlertCircle className="w-4 h-4 text-red-600" />
                                                            <p className="text-sm font-medium text-gray-900">Downside Risk</p>
                                                        </div>
                                                        <p className="text-lg font-bold text-red-600">
                                                            {((simulationResults.ebit.mean - simulationResults.ebit.p10) / simulationResults.ebit.mean * 100).toFixed(0)}%
                                                        </p>
                                                        <p className="text-xs text-gray-600">P10 vs Mean</p>
                                                    </div>
                                                    <div className="bg-yellow-50 rounded-lg p-4">
                                                        <div className="flex items-center space-x-2 mb-2">
                                                            <BarChart3 className="w-4 h-4 text-yellow-600" />
                                                            <p className="text-sm font-medium text-gray-900">Volatility</p>
                                                        </div>
                                                        <p className="text-lg font-bold text-yellow-600">
                                                            {(simulationResults.ebit.stdDev / simulationResults.ebit.mean * 100).toFixed(0)}%
                                                        </p>
                                                        <p className="text-xs text-gray-600">Coefficient of Variation</p>
                                                    </div>
                                                    <div className="bg-green-50 rounded-lg p-4">
                                                        <div className="flex items-center space-x-2 mb-2">
                                                            <TrendingUp className="w-4 h-4 text-green-600" />
                                                            <p className="text-sm font-medium text-gray-900">Upside Potential</p>
                                                        </div>
                                                        <p className="text-lg font-bold text-green-600">
                                                            {((simulationResults.ebit.p90 - simulationResults.ebit.mean) / simulationResults.ebit.mean * 100).toFixed(0)}%
                                                        </p>
                                                        <p className="text-xs text-gray-600">P90 vs Mean</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-center py-12">
                                                <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                                <p className="text-gray-500">Click "Run Simulation" to generate probabilistic outcomes</p>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'optimization' && (
                                <motion.div
                                    key="optimization"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="space-y-6"
                                >
                                    <div className="bg-white rounded-xl p-6 shadow-sm">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Goal Seek Optimization</h3>

                                        {/* Target Setting */}
                                        <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="text-sm font-medium text-gray-700">Target Metric</label>
                                                    <select
                                                        value={optimizationTarget.metric}
                                                        onChange={(e) => setOptimizationTarget(prev => ({ ...prev, metric: e.target.value }))}
                                                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan focus:border-transparent"
                                                    >
                                                        <option value="ebit">EBIT</option>
                                                        <option value="revenue">Revenue</option>
                                                        <option value="netIncome">Net Income</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="text-sm font-medium text-gray-700">Target Value ($M)</label>
                                                    <input
                                                        type="number"
                                                        value={optimizationTarget.value}
                                                        onChange={(e) => setOptimizationTarget(prev => ({ ...prev, value: parseInt(e.target.value) }))}
                                                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan focus:border-transparent"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {isOptimizing ? (
                                            <div className="flex flex-col items-center justify-center py-12">
                                                <Loader className="w-8 h-8 text-cyan animate-spin mb-4" />
                                                <p className="text-gray-600">Finding optimal lever combinations...</p>
                                            </div>
                                        ) : optimizedLevers ? (
                                            <div className="space-y-6">
                                                {/* Optimization Results */}
                                                <div className="bg-green-50 rounded-lg p-4">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-700">Optimization Status</p>
                                                            <p className="text-lg font-bold text-green-700">Solution Found</p>
                                                        </div>
                                                        <Target className="w-8 h-8 text-green-600" />
                                                    </div>
                                                </div>

                                                {/* Lever Adjustments */}
                                                <div>
                                                    <h4 className="font-medium text-gray-900 mb-3">Recommended Lever Settings</h4>
                                                    <div className="space-y-3">
                                                        {scenarioLevers.filter(lever =>
                                                            Math.abs(optimizedLevers[lever.id] - leverValues[lever.id]) > 0.1
                                                        ).map(lever => (
                                                            <div key={lever.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                                <div>
                                                                    <p className="font-medium text-gray-900">{lever.name}</p>
                                                                    <p className="text-sm text-gray-600">{lever.category}</p>
                                                                </div>
                                                                <div className="flex items-center space-x-4">
                                                                    <div className="text-right">
                                                                        <p className="text-sm text-gray-500">Current</p>
                                                                        <p className="font-semibold">{leverValues[lever.id].toFixed(1)}%</p>
                                                                    </div>
                                                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                                                    <div className="text-right">
                                                                        <p className="text-sm text-gray-500">Optimized</p>
                                                                        <p className="font-semibold text-cyan">{optimizedLevers[lever.id].toFixed(1)}%</p>
                                                                    </div>
                                                                    <div className="text-right">
                                                                        <p className="text-sm text-gray-500">Delta</p>
                                                                        <p className={`font-semibold ${optimizedLevers[lever.id] > leverValues[lever.id] ? 'text-green-600' : 'text-red-600'
                                                                            }`}>
                                                                            {optimizedLevers[lever.id] > leverValues[lever.id] ? '+' : ''}
                                                                            {(optimizedLevers[lever.id] - leverValues[lever.id]).toFixed(1)}%
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Apply Button */}
                                                <button
                                                    onClick={() => {
                                                        setLeverValues(optimizedLevers);
                                                        setOptimizedLevers(null);
                                                    }}
                                                    className="w-full py-3 bg-cyan-gradient text-navy-900 font-semibold rounded-lg glow-cyan-hover transition-all"
                                                >
                                                    Apply Optimized Settings
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="text-center py-12">
                                                <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                                <p className="text-gray-500">Set your target and click "Run Optimization"</p>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'risk-analysis' && (
                                <motion.div
                                    key="risk-analysis"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="space-y-6"
                                >
                                    <div className="bg-white rounded-xl p-6 shadow-sm">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk & Sensitivity Analysis</h3>

                                        {/* Current Scenario Summary */}
                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            <div className="bg-gray-50 rounded-lg p-4">
                                                <p className="text-sm text-gray-600 mb-1">Current Net Income</p>
                                                <p className="text-2xl font-bold text-gray-900">
                                                    ${(2906 + impact.netIncome).toFixed(0)}M
                                                </p>
                                            </div>
                                            <div className="bg-gray-50 rounded-lg p-4">
                                                <p className="text-sm text-gray-600 mb-1">Current EBIT</p>
                                                <p className="text-2xl font-bold text-gray-900">
                                                    ${(3875 + impact.ebit).toFixed(0)}M
                                                </p>
                                            </div>
                                        </div>

                                        {/* Sensitivity Table */}
                                        <div>
                                            <h4 className="font-medium text-gray-900 mb-3">Lever Sensitivity (±1% change impact)</h4>
                                            <div className="overflow-x-auto">
                                                <table className="w-full">
                                                    <thead>
                                                        <tr className="border-b border-gray-200">
                                                            <th className="text-left py-2 text-sm font-medium text-gray-700">Lever</th>
                                                            <th className="text-right py-2 text-sm font-medium text-gray-700">Current</th>
                                                            <th className="text-right py-2 text-sm font-medium text-gray-700">EBIT Impact</th>
                                                            <th className="text-right py-2 text-sm font-medium text-gray-700">Sensitivity</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {scenarioLevers
                                                            .filter(lever => leverValues[lever.id] !== 0)
                                                            .sort((a, b) => {
                                                                const impactA = a.id === 'price-change' ? 38.75 : a.id === 'volume-growth' ? 31 : 15;
                                                                const impactB = b.id === 'price-change' ? 38.75 : b.id === 'volume-growth' ? 31 : 15;
                                                                return impactB - impactA;
                                                            })
                                                            .map(lever => {
                                                                const impactPer1Percent = lever.id === 'price-change' ? 38.75 :
                                                                    lever.id === 'volume-growth' ? 31 :
                                                                        lever.id === 'market-share' ? 15.5 :
                                                                            10;
                                                                return (
                                                                    <tr key={lever.id} className="border-b border-gray-100">
                                                                        <td className="py-2 text-sm font-medium text-gray-900">{lever.name}</td>
                                                                        <td className="py-2 text-sm text-right">
                                                                            {leverValues[lever.id] > 0 ? '+' : ''}{leverValues[lever.id]}%
                                                                        </td>
                                                                        <td className="py-2 text-sm text-right">
                                                                            ${(impactPer1Percent * leverValues[lever.id]).toFixed(0)}M
                                                                        </td>
                                                                        <td className="py-2 text-sm text-right">
                                                                            <span className={`font-semibold ${impactPer1Percent > 30 ? 'text-red-600' :
                                                                                    impactPer1Percent > 20 ? 'text-orange-600' :
                                                                                        'text-yellow-600'
                                                                                }`}>
                                                                                ${impactPer1Percent.toFixed(0)}M/1%
                                                                            </span>
                                                                        </td>
                                                                    </tr>
                                                                );
                                                            })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                        {/* Key Risks */}
                                        <div className="mt-6">
                                            <h4 className="font-medium text-gray-900 mb-3">Key Risk Factors</h4>
                                            <div className="space-y-3">
                                                <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                                                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                                                    <div>
                                                        <p className="font-medium text-gray-900">High Sensitivity to Pricing</p>
                                                        <p className="text-sm text-gray-600">1% price change = $39M EBIT impact</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                                                    <Shield className="w-5 h-5 text-orange-600 mt-0.5" />
                                                    <div>
                                                        <p className="font-medium text-gray-900">Volume Risk</p>
                                                        <p className="text-sm text-gray-600">Market downturn could significantly impact results</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                                                    <LineChart className="w-5 h-5 text-yellow-600 mt-0.5" />
                                                    <div>
                                                        <p className="font-medium text-gray-900">Operational Leverage</p>
                                                        <p className="text-sm text-gray-600">Fixed cost base amplifies volume impact</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
} 