'use client';

import { businessConsoles } from '@/lib/business-console-drivers';
import { AnimatePresence, motion } from 'framer-motion';
import {
    BarChart3,
    ChevronRight,
    Grid,
    Minus,
    Search,
    TrendingDown,
    TrendingUp,
    Calculator
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import ExcelUpload from '@/components/ExcelUpload';
import { ExcelDriverTreeData, DriverTreeNode, PeriodData } from '@/lib/excel-parser';

// Category definitions
const categories = [
    { id: 'all', name: 'All Consoles', icon: Grid },
    { id: 'commercial', name: 'Commercial Performance', icon: TrendingUp },
    { id: 'operational', name: 'Operational Performance', icon: BarChart3 },
    { id: 'financial', name: 'Financial Performance', icon: TrendingUp },
    { id: 'risk', name: 'Risk & Compliance', icon: BarChart3 }
];

// Map consoles to categories
const consoleCategories: Record<string, string> = {
    'market-demand': 'commercial',
    'product-mix': 'commercial',
    'volume': 'commercial',
    'pricing': 'commercial',
    'product-line-profitability': 'operational',
    'adjacencies': 'operational',
    'production-build-plan': 'operational',
    'inventory': 'operational',
    'consolidated-results-expectations': 'financial',
    'capital-allocation-management': 'financial',
    'compliance': 'risk',
    'risk': 'risk',
    'sensitivities': 'risk',
    'competitors': 'risk'
};

// Generate synthetic performance data for drivers
const generatePerformanceData = (driverName: string) => {
    // Generate random but consistent data based on driver name
    const hash = driverName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const value = ((hash % 40) - 20) / 10; // Range: -2.0 to +2.0
    const trend = value > 0.5 ? 'up' : value < -0.5 ? 'down' : 'stable';
    const status = value > 0.5 ? 'good' : value < -0.5 ? 'poor' : 'warning';

    return {
        value: value.toFixed(1),
        percentage: Math.abs(value * 10).toFixed(1),
        trend,
        status,
        metric: `${Math.abs(hash % 100)}%` // Some metric value
    };
};

// Get color classes based on status
const getStatusColors = (status: string) => {
    switch (status) {
        case 'good':
            return {
                bg: 'bg-green-50',
                border: 'border-green-200',
                text: 'text-green-700',
                icon: 'text-green-600'
            };
        case 'warning':
            return {
                bg: 'bg-yellow-50',
                border: 'border-yellow-200',
                text: 'text-yellow-700',
                icon: 'text-yellow-600'
            };
        case 'poor':
            return {
                bg: 'bg-red-50',
                border: 'border-red-200',
                text: 'text-red-700',
                icon: 'text-red-600'
            };
        default:
            return {
                bg: 'bg-gray-50',
                border: 'border-gray-200',
                text: 'text-gray-700',
                icon: 'text-gray-600'
            };
    }
};

export default function BusinessConsolesPage() {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedConsole, setSelectedConsole] = useState('market-demand');
    const [expandedDrivers, setExpandedDrivers] = useState<Set<string>>(new Set()); // Start with everything collapsed
    const [excelData, setExcelData] = useState<ExcelDriverTreeData | null>(null);
    const [whatIfPercentages, setWhatIfPercentages] = useState<Map<string, number>>(new Map());
    const [whatIfResults, setWhatIfResults] = useState<Map<string, { accounting: number; rate: number }>>(new Map());

    // Load Excel data from server (shared) and localStorage (fallback) on mount
    useEffect(() => {
        const loadData = async () => {
            // First try to load from server (shared data)
            try {
                const response = await fetch('/api/excel-data');
                if (response.ok) {
                    const result = await response.json();
                    if (result.data) {
                        const parsed = result.data;
                        const restoredData: ExcelDriverTreeData = {
                            tree: parsed.tree || [],
                            accountingFacts: new Map(parsed.accountingFacts || []),
                            rateFacts: new Map(parsed.rateFacts || []) as Map<string, PeriodData[]> | Map<string, { feeRate: PeriodData[]; rawAmount: PeriodData[]; accountedAmount: PeriodData[] }>
                        };
                        setExcelData(restoredData);
                        
                        // Expand to level 3 by default
                        const expanded = expandToLevel3(restoredData.tree);
                        setExpandedDrivers(expanded);
                        
                        return; // Use server data, skip localStorage
                    }
                }
            } catch (error) {
                console.error('Failed to load Excel data from server:', error);
            }

            // Fallback to localStorage (user-specific)
            try {
                const savedData = localStorage.getItem('excelDriverTreeData');
                if (savedData) {
                    const parsed = JSON.parse(savedData);
                    const restoredData: ExcelDriverTreeData = {
                        tree: parsed.tree || [],
                        accountingFacts: new Map(parsed.accountingFacts || []),
                        rateFacts: new Map(parsed.rateFacts || []) as Map<string, PeriodData[]> | Map<string, { feeRate: PeriodData[]; rawAmount: PeriodData[]; accountedAmount: PeriodData[] }>
                    };
                    setExcelData(restoredData);
                    
                    // Expand to level 3 by default
                    const expanded = expandToLevel3(restoredData.tree);
                    setExpandedDrivers(expanded);
                }
            } catch (error) {
                console.error('Failed to load Excel data from localStorage:', error);
                localStorage.removeItem('excelDriverTreeData');
            }
        };

        loadData();
    }, []);

    // Save Excel data to server (shared) and localStorage (backup) whenever it changes
    useEffect(() => {
        if (excelData) {
            // Convert Maps to arrays for JSON serialization
            const dataToSave = {
                tree: excelData.tree,
                accountingFacts: Array.from(excelData.accountingFacts.entries()),
                rateFacts: Array.from(excelData.rateFacts.entries() as any)
            };

            // Save to server (shared across all users)
            fetch('/api/excel-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: dataToSave })
            }).catch(error => {
                console.error('Failed to save Excel data to server:', error);
            });

            // Also save to localStorage as backup
            try {
                localStorage.setItem('excelDriverTreeData', JSON.stringify(dataToSave));
            } catch (error) {
                console.error('Failed to save Excel data to localStorage:', error);
            }
        } else {
            // Clear localStorage if data is cleared
            localStorage.removeItem('excelDriverTreeData');
        }
    }, [excelData]);

    // Expand all nodes up to level 3
    const expandToLevel3 = (nodes: DriverTreeNode[], parentIndex: string = '', expandedSet: Set<string> = new Set()): Set<string> => {
        nodes.forEach((node) => {
            const nodeIndex = parentIndex ? `${parentIndex}-${node.id}` : node.id;
            
            // Expand if level is 3 or less
            if (node.level <= 3) {
                expandedSet.add(nodeIndex);
                
                // Recursively expand children
                if (node.children && node.children.length > 0) {
                    expandToLevel3(node.children, nodeIndex, expandedSet);
                }
            }
        });
        
        return expandedSet;
    };

    // Handle Excel data loaded - this will trigger the save effect
    const handleExcelDataLoaded = (data: ExcelDriverTreeData) => {
        setExcelData(data);
        // Clear What If results when new data is loaded
        setWhatIfPercentages(new Map());
        setWhatIfResults(new Map());
        
        // Expand to level 3 by default
        const expanded = expandToLevel3(data.tree);
        setExpandedDrivers(expanded);
    };

    // Filter consoles based on category and search
    const filteredConsoles = businessConsoles.filter(console => {
        const matchesCategory = selectedCategory === 'all' || consoleCategories[console.id] === selectedCategory;
        const matchesSearch = console.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            console.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Get selected console data for performance tree
    const selectedConsoleData = businessConsoles.find(c => c.id === selectedConsole);

    // Toggle driver expansion
    const toggleDriver = (driverId: string) => {
        const newExpanded = new Set(expandedDrivers);
        if (newExpanded.has(driverId)) {
            newExpanded.delete(driverId);
        } else {
            newExpanded.add(driverId);
        }
        setExpandedDrivers(newExpanded);
    };

    // Format currency
    const formatCurrency = (amount?: number) => {
        if (amount === undefined || amount === null) return 'N/A';
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    // Format percentage (assumes value is already in percentage form, e.g., 0.03 = 3%)
    const formatPercentage = (value?: number) => {
        if (value === undefined || value === null) return 'N/A';
        return new Intl.NumberFormat('en-US', {
            style: 'percent',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value / 100);
    };
    
    // Format rate value that's already in percentage format (0.03 = 3%)
    const formatRateAsPercentage = (value?: number) => {
        if (value === undefined || value === null) return 'N/A';
        // Value is already in percentage form (0.03 = 3%), so multiply by 100 to show as percentage
        return new Intl.NumberFormat('en-US', {
            style: 'percent',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value);
    };

    // Format percentage change (for trends)
    const formatTrend = (trend?: number) => {
        if (trend === undefined || trend === null) return null;
        const sign = trend >= 0 ? '+' : '';
        return `${sign}${trend.toFixed(2)}%`;
    };

    // Get trend color
    const getTrendColor = (trend?: number) => {
        if (trend === undefined || trend === null) return 'text-gray-500';
        if (trend > 0) return 'text-green-600';
        if (trend < 0) return 'text-red-600';
        return 'text-gray-500';
    };

    // Check if node name contains "rate" (case-insensitive)
    const isRateNode = (node: DriverTreeNode): boolean => {
        const name = node.name.toLowerCase();
        if (name.includes('rate') || name.includes('increase rate')) {
            return true;
        }
        // Check if any child is a rate node
        if (node.children && node.children.length > 0) {
            return node.children.some(child => isRateNode(child));
        }
        return false;
    };

    // Find all Level 5 drivers from Driver Tree that appear in Accounting Fact or Rate Fact tabs
    const findLevel5Drivers = (nodes: DriverTreeNode[]): { accountingDrivers: DriverTreeNode[]; rateDrivers: DriverTreeNode[] } => {
        const accountingDrivers: DriverTreeNode[] = [];
        const rateDrivers: DriverTreeNode[] = [];
        
        const traverse = (node: DriverTreeNode) => {
            // Check if it's Level 5
            const isLevel5 = node.level === 5;
            
            if (isLevel5) {
                // Check if this driver appears in Accounting Fact (has accountingAmount from Accounting Fact)
                // Check if this driver appears in Rate Fact (has rateAmount or isFeeRateDriver)
                const hasAccountingFact = node.accountingAmount !== undefined && 
                                         node.accountingAmount !== 0 && 
                                         !node.isFeeRateDriver; // Not from Fee Rate Fact
                
                const hasRateFact = (node.rateAmount !== undefined && node.rateAmount !== 0) || 
                                   node.isFeeRateDriver;
                
                if (hasAccountingFact) {
                    accountingDrivers.push(node);
                }
                
                if (hasRateFact) {
                    rateDrivers.push(node);
                }
            }
            
            // Continue traversing children
            if (node.children) {
                node.children.forEach(child => traverse(child));
            }
        };
        
        nodes.forEach(node => traverse(node));
        
        return { accountingDrivers, rateDrivers };
    };

    // Handle What If percentage change
    const handleWhatIfChange = (nodeId: string, percentage: number) => {
        if (!excelData) return;
        
        // Find the node
        const findNode = (nodes: DriverTreeNode[]): DriverTreeNode | null => {
            for (const node of nodes) {
                if (node.id === nodeId) return node;
                if (node.children) {
                    const found = findNode(node.children);
                    if (found) return found;
                }
            }
            return null;
        };
        
        const node = findNode(excelData.tree);
        if (!node) return;
        
        // Calculate multiplier (percentage is entered as a number, e.g., 10 for 10%)
        const multiplier = 1 + (percentage / 100);
        
        let newAccounting = 0;
        let newRate = 0;
        const oldAccounting = node.accountingAmount || 0;
        
        // If this is a Fee Rate driver, recalculate Accounted Amount = (Fee Rate × multiplier) × Raw Amount
        if (node.isFeeRateDriver && node.feeRate !== undefined && node.rawAmount !== undefined) {
            // New Fee Rate = original Fee Rate × multiplier
            newRate = node.feeRate * multiplier;
            // New Accounted Amount = New Fee Rate × Raw Amount
            newAccounting = newRate * node.rawAmount;
        } else {
            // For non-Fee Rate drivers, just multiply by multiplier
            newAccounting = node.accountingAmount ? node.accountingAmount * multiplier : 0;
            newRate = node.rateAmount ? node.rateAmount * multiplier : 0;
        }
        
        // Update state
        const newPercentages = new Map(whatIfPercentages);
        newPercentages.set(nodeId, percentage);
        setWhatIfPercentages(newPercentages);
        
        const newResults = new Map(whatIfResults);
        newResults.set(nodeId, { accounting: newAccounting, rate: newRate });
        
        // If this is a Fee Rate driver, propagate the new Accounted Amount up the tree
        if (node.isFeeRateDriver && newAccounting !== 0) {
            const amountDelta = newAccounting - oldAccounting;
            propagateAccountedAmountUpTree(excelData.tree, nodeId, amountDelta, newResults);
        }
        
        setWhatIfResults(newResults);
    };
    
    // Propagate Accounted Amount changes up the tree
    const propagateAccountedAmountUpTree = (
        nodes: DriverTreeNode[], 
        changedNodeId: string, 
        amountDelta: number,
        resultsMap: Map<string, { accounting: number; rate: number }>
    ) => {
        const findAndUpdateParents = (currentNodes: DriverTreeNode[], targetId: string): boolean => {
            for (const node of currentNodes) {
                if (node.id === targetId) {
                    return true; // Found the target node
                }
                
                if (node.children) {
                    const foundInChildren = findAndUpdateParents(node.children, targetId);
                    if (foundInChildren) {
                        // This node is a parent of the changed node, update its accounting amount
                        const currentResult = resultsMap.get(node.id);
                        const currentAccounting = currentResult?.accounting || node.accountingAmount || 0;
                        const newAccounting = currentAccounting + amountDelta;
                        
                        const existingResult = resultsMap.get(node.id) || { accounting: node.accountingAmount || 0, rate: node.rateAmount || 0 };
                        resultsMap.set(node.id, { ...existingResult, accounting: newAccounting });
                        
                        return true;
                    }
                }
            }
            return false;
        };
        
        findAndUpdateParents(nodes, changedNodeId);
    };

    // Helper function to recursively calculate aggregated amounts and trends
    // Takes into account What If results if they exist
    const calculateNodeAmounts = (node: DriverTreeNode): { 
        accounting: number; 
        rate: number; 
        total: number;
        accountingTrend?: number;
        rateTrend?: number;
    } => {
        // Check if there's a What If result for this node
        const whatIfResult = whatIfResults.get(node.id);
        
        let accounting = whatIfResult?.accounting ?? node.accountingAmount ?? 0;
        let rate = whatIfResult?.rate ?? node.rateAmount ?? 0;
        
        // Start with node's own trends (these are calculated from periods)
        let accountingTrend = node.accountingTrend;
        let rateTrend = node.rateTrend;
        
        // Collect child trends for aggregation
        let childAccountingTrends: number[] = [];
        let childRateTrends: number[] = [];

        // If node has children, sum their amounts (including What If results)
        if (node.children && node.children.length > 0) {
            node.children.forEach(child => {
                const childAmounts = calculateNodeAmounts(child);
                accounting += childAmounts.accounting;
                rate += childAmounts.rate;
                
                // Collect child trends for aggregation - prioritize direct trends
                if (childAmounts.accountingTrend !== undefined && childAmounts.accountingTrend !== null && !isNaN(childAmounts.accountingTrend)) {
                    childAccountingTrends.push(childAmounts.accountingTrend);
                }
                if (childAmounts.rateTrend !== undefined && childAmounts.rateTrend !== null && !isNaN(childAmounts.rateTrend)) {
                    childRateTrends.push(childAmounts.rateTrend);
                }
            });
        }
        
        // If this node doesn't have its own direct trend but has children with trends, use average
        // But prioritize the node's own trend if it exists
        if (accountingTrend === undefined && childAccountingTrends.length > 0) {
            accountingTrend = childAccountingTrends.reduce((sum, t) => sum + t, 0) / childAccountingTrends.length;
        }
        if (rateTrend === undefined && childRateTrends.length > 0) {
            rateTrend = childRateTrends.reduce((sum, t) => sum + t, 0) / childRateTrends.length;
        }

        return {
            accounting,
            rate,
            total: accounting + rate,
            accountingTrend: accountingTrend !== undefined && !isNaN(accountingTrend) ? accountingTrend : undefined,
            rateTrend: rateTrend !== undefined && !isNaN(rateTrend) ? rateTrend : undefined
        };
    };

    // Get trend-based colors for the row/shape
    const getTrendRowColors = (accountingTrend?: number, rateTrend?: number) => {
        // Prioritize accounting trend for Accounting Fact nodes, otherwise use rate trend
        // If both are available, prefer accounting trend (it's more commonly used)
        const trend = accountingTrend !== undefined && accountingTrend !== null && !isNaN(accountingTrend) ? accountingTrend : 
                     (rateTrend !== undefined && rateTrend !== null && !isNaN(rateTrend) ? rateTrend : undefined);
        
        if (trend === undefined || trend === null || isNaN(trend)) {
            return {
                bg: 'bg-gray-50',
                border: 'border-gray-200',
                text: 'text-gray-700',
                icon: 'text-gray-600'
            };
        }
        
        if (trend > 0) {
            return {
                bg: 'bg-green-50',
                border: 'border-green-300',
                text: 'text-green-700',
                icon: 'text-green-600'
            };
        } else if (trend < 0) {
            return {
                bg: 'bg-red-50',
                border: 'border-red-300',
                text: 'text-red-700',
                icon: 'text-red-600'
            };
        } else {
            return {
                bg: 'bg-gray-50',
                border: 'border-gray-200',
                text: 'text-gray-700',
                icon: 'text-gray-600'
            };
        }
    };

    // Render Excel-based driver tree node
    const renderExcelDriverNode = (node: DriverTreeNode, depth: number = 0, parentIndex: string = '') => {
        const nodeIndex = parentIndex ? `${parentIndex}-${node.id}` : node.id;
        const isExpanded = expandedDrivers.has(nodeIndex);
        const hasChildren = node.children && node.children.length > 0;
        
        // Calculate amounts (including aggregated from children)
        const amounts = calculateNodeAmounts(node);
        const hasAmount = amounts.total !== 0;

        // Get row colors based on trend
        const rowColors = getTrendRowColors(amounts.accountingTrend, amounts.rateTrend);

        return (
            <div key={node.id} className="relative mb-1">
                {depth > 0 && (
                    <div className="absolute -left-4 top-3 w-4 h-0.5 bg-gray-300"></div>
                )}
                
                <div 
                    className={`${rowColors.bg} ${rowColors.border} border rounded p-2 shadow-sm`}
                    style={{ marginLeft: `${depth * 16}px` }}
                >
                    <div
                        className={`flex items-center justify-between ${hasChildren ? 'cursor-pointer' : ''}`}
                        onClick={() => hasChildren && toggleDriver(nodeIndex)}
                    >
                        <div className="flex items-center space-x-1 flex-1 min-w-0">
                            {hasChildren ? (
                                <ChevronRight className={`w-3 h-3 text-gray-400 transition-transform flex-shrink-0 ${isExpanded ? 'rotate-90' : ''}`} />
                            ) : (
                                <div className="w-3 h-3 flex-shrink-0"></div> // Spacer for alignment
                            )}
                            <span className="text-xs font-medium text-gray-900 truncate">
                                {node.name}
                                {node.level && <span className="text-gray-400 ml-1">(L{node.level})</span>}
                            </span>
                        </div>
                        <div className="flex items-center space-x-2 ml-2 flex-shrink-0 flex-wrap justify-end">
                            {hasAmount ? (
                                <>
                                    {amounts.accounting !== 0 && (
                                        <div className="flex items-center space-x-1 whitespace-nowrap">
                                            <span className="text-xs text-blue-600 font-medium">
                                                Acc: {formatCurrency(amounts.accounting)}
                                            </span>
                                            {amounts.accountingTrend !== undefined && amounts.accountingTrend !== null && !isNaN(amounts.accountingTrend) && (
                                                <span className={`text-xs font-semibold ${getTrendColor(amounts.accountingTrend)}`}>
                                                    ({formatTrend(amounts.accountingTrend)})
                                                </span>
                                            )}
                                        </div>
                                    )}
                                    {amounts.rate !== 0 && (
                                        <div className="flex items-center space-x-1 whitespace-nowrap">
                                            <span className="text-xs text-green-600 font-medium">
                                                {node.isFeeRateDriver ? 'Fee Rate' : 'Rate'}: {node.isFeeRateDriver || isRateNode(node) ? formatPercentage(amounts.rate) : formatCurrency(amounts.rate)}
                                            </span>
                                            {amounts.rateTrend !== undefined && amounts.rateTrend !== null && !isNaN(amounts.rateTrend) && (
                                                <span className={`text-xs font-semibold ${getTrendColor(amounts.rateTrend)}`}>
                                                    ({formatTrend(amounts.rateTrend)})
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <span className="text-xs text-gray-400">No data</span>
                            )}
                        </div>
                    </div>

                    {/* Render children when expanded */}
                    {isExpanded && hasChildren && (
                        <div className="mt-2 space-y-1">
                            {node.children!.map((child) => renderExcelDriverNode(child, depth + 1, nodeIndex))}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    // Render performance driver tree
    const renderDriverTree = () => {
        if (!selectedConsoleData) return null;

        // If Excel data is loaded, use it
        if (excelData && excelData.tree.length > 0) {
            return (
                <div className="space-y-2">
                    {excelData.tree.map((rootNode, index) => renderExcelDriverNode(rootNode, 0, `root-${index}`))}
                </div>
            );
        }

        // Otherwise, use the original synthetic data
        return (
            <div className="space-y-4">
                {/* Metrics Breakdown - Show how drivers contribute to each metric */}
                {selectedConsoleData.metrics.map((metric, metricIndex) => {
                    const metricPerf = generatePerformanceData(metric.label);
                    const metricColors = getStatusColors(metric.trend === 'up' ? 'good' : metric.trend === 'down' ? 'poor' : 'warning');

                    return (
                        <div key={metricIndex} className="space-y-2">
                            {/* Metric Header */}
                            <div className={`${metricColors.bg} ${metricColors.border} border rounded-lg p-3 shadow-sm`}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-medium text-sm text-gray-900">{metric.label}</h4>
                                        <p className="text-lg font-bold text-gray-900">{metric.value}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center space-x-1">
                                            {metric.trend === 'up' && <TrendingUp className={`w-4 h-4 ${metricColors.icon}`} />}
                                            {metric.trend === 'down' && <TrendingDown className={`w-4 h-4 ${metricColors.icon}`} />}
                                            {metric.trend === 'stable' && <Minus className={`w-4 h-4 ${metricColors.icon}`} />}
                                            <span className={`text-sm font-bold ${metricColors.text}`}>
                                                {metric.change > 0 ? '+' : ''}{metric.change}%
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-500">{metric.trend === 'up' ? 'vs last period' : metric.trend === 'down' ? 'vs last period' : 'stable'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Key Drivers Contributing to this Metric */}
                            <div className="ml-8 space-y-1">
                                {selectedConsoleData.keyDrivers.slice(metricIndex * 3, (metricIndex * 3) + 3).map((driver, driverIndex) => {
                                    const globalIndex = metricIndex * 3 + driverIndex;
                                    const driverPerf = generatePerformanceData(driver.name);
                                    const driverColors = getStatusColors(driverPerf.status);
                                    const isExpanded = expandedDrivers.has(String(globalIndex));

                                    return (
                                        <div key={globalIndex} className="relative">
                                            {/* Connector from metric to driver */}
                                            <div className="absolute -left-8 top-3 w-8 h-0.5 bg-gray-300"></div>

                                            <div className={`${driverColors.bg} ${driverColors.border} border rounded p-2 shadow-sm`}>
                                                <div
                                                    className="flex items-center justify-between cursor-pointer"
                                                    onClick={() => driver.subDrivers && driver.subDrivers.length > 0 && toggleDriver(String(globalIndex))}
                                                >
                                                    <div className="flex items-center space-x-1">
                                                        {driver.subDrivers && driver.subDrivers.length > 0 && (
                                                            <ChevronRight className={`w-3 h-3 text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                                                        )}
                                                        <span className="text-xs font-medium text-gray-900">{driver.name}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-1">
                                                        <span className={`text-xs ${driverColors.text}`}>
                                                            {Number(driverPerf.value) > 0 ? '+' : ''}{driverPerf.percentage}%
                                                        </span>
                                                        {driverPerf.trend === 'up' && <TrendingUp className={`w-2.5 h-2.5 ${driverColors.icon}`} />}
                                                        {driverPerf.trend === 'down' && <TrendingDown className={`w-2.5 h-2.5 ${driverColors.icon}`} />}
                                                    </div>
                                                </div>

                                                {/* Sub-drivers - Only show when expanded */}
                                                {isExpanded && driver.subDrivers && driver.subDrivers.length > 0 && (
                                                    <div className="mt-2 ml-4 space-y-0.5 text-xs">
                                                        {driver.subDrivers.slice(0, 2).map((subDriver, subIndex) => {
                                                            const subPerf = generatePerformanceData(subDriver);
                                                            const subColors = getStatusColors(subPerf.status);

                                                            return (
                                                                <div key={subIndex} className="flex items-center justify-between py-0.5">
                                                                    <span className="text-gray-600 truncate pr-2">• {subDriver}</span>
                                                                    <span className={`${subColors.text} text-xs`}>
                                                                        {subPerf.percentage}%
                                                                    </span>
                                                                </div>
                                                            );
                                                        })}
                                                        {driver.subDrivers.length > 2 && (
                                                            <p className="text-gray-400 pl-2">+{driver.subDrivers.length - 2} more</p>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}

                {/* Additional Drivers Section */}
                {selectedConsoleData.keyDrivers.length > 6 && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-xs text-gray-500 text-center">
                            {selectedConsoleData.keyDrivers.length - 6} additional drivers influence overall performance
                        </p>
                    </div>
                )}
            </div>
        );
    };

    const handleConsoleSelect = (consoleId: string) => {
        setSelectedConsole(consoleId);
    };

    const handleViewConsole = (consoleId: string) => {
        // Navigate to the console page when View Console button is clicked
        if (consoleId === 'market-demand') {
            router.push('/business-consoles/market-demand');
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="py-6">
                        <h1 className="text-3xl font-bold text-navy-900">Business Insight Consoles</h1>
                        <p className="mt-2 text-gray-600">
                            Comprehensive business intelligence across all key performance areas
                        </p>
                    </div>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="py-4 space-y-4">
                        {/* Search Bar */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search consoles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                            />
                        </div>

                        {/* Category Tabs */}
                        <div className="flex space-x-1 overflow-x-auto">
                            {categories.map((category) => {
                                const Icon = category.icon;
                                const count = category.id === 'all'
                                    ? businessConsoles.length
                                    : businessConsoles.filter(c => consoleCategories[c.id] === category.id).length;

                                return (
                                    <button
                                        key={category.id}
                                        onClick={() => setSelectedCategory(category.id)}
                                        className={`
                                            flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap
                                            ${selectedCategory === category.id
                                                ? 'bg-cyan-50 text-cyan-700 border-2 border-cyan-500'
                                                : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border-2 border-transparent'
                                            }
                                        `}
                                    >
                                        <Icon className="w-4 h-4" />
                                        <span>{category.name}</span>
                                        <span className={`
                                            px-2 py-0.5 rounded-full text-xs font-semibold
                                            ${selectedCategory === category.id
                                                ? 'bg-cyan-100 text-cyan-700'
                                                : 'bg-gray-200 text-gray-600'
                                            }
                                        `}>
                                            {count}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Console Cards */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-navy-900 mb-4">Select a Console</h2>

                        <AnimatePresence mode="popLayout">
                            {filteredConsoles.map((console, index) => {
                                const Icon = console.icon;
                                const isSelected = selectedConsole === console.id;

                                return (
                                    <motion.div
                                        key={console.id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ delay: index * 0.05 }}
                                        className={`
                                            relative rounded-xl p-4 cursor-pointer transition-all
                                            ${isSelected
                                                ? 'bg-navy-gradient border-2 border-cyan-500 shadow-lg shadow-cyan-500/20'
                                                : `${console.bgColor} hover:shadow-md border-2 ${console.borderColor}`
                                            }
                                        `}
                                        onClick={() => handleConsoleSelect(console.id)}
                                    >
                                        <div className="flex items-start space-x-3">
                                            <div className={`
                                                p-2.5 rounded-lg flex-shrink-0
                                                ${isSelected
                                                    ? 'bg-cyan-gradient shadow-lg shadow-cyan-500/50'
                                                    : `${console.bgColor} ${console.iconColor}`
                                                }
                                            `}>
                                                <Icon className={`w-5 h-5 ${isSelected ? 'text-navy-900' : ''}`} />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div className="flex-1">
                                                        <h3 className={`font-semibold text-base leading-tight ${isSelected ? 'text-white' : 'text-navy-900'}`}>
                                                            {console.title}
                                                        </h3>
                                                        <p className={`text-xs mt-1 leading-relaxed ${isSelected ? 'text-cyan-100' : 'text-gray-600'}`}>
                                                            {console.description}
                                                        </p>
                                                    </div>
                                                    <div className="ml-3 flex-shrink-0">
                                                        {console.status === 'View Console' && (
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleViewConsole(console.id);
                                                                }}
                                                                className={`
                                                                    px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                                                                    ${isSelected
                                                                        ? 'bg-cyan-gradient text-navy-900 hover:shadow-lg hover:shadow-cyan-500/50 border border-cyan-500'
                                                                        : 'bg-cyan-600 text-white hover:bg-cyan-700 hover:shadow-md'
                                                                    }
                                                                `}
                                                            >
                                                                View Console →
                                                            </button>
                                                        )}
                                                        {console.status === 'Coming Soon' && (
                                                            <span className={`
                                                                inline-block px-3 py-1.5 rounded-lg text-xs font-medium
                                                                ${isSelected
                                                                    ? 'bg-white/20 text-cyan-200 border border-cyan-400/30'
                                                                    : 'bg-gray-50 text-gray-500 border border-gray-200'
                                                                }
                                                            `}>
                                                                Coming Soon
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Metrics - More compact */}
                                                <div className="grid grid-cols-2 gap-3">
                                                    {console.metrics.map((metric) => (
                                                        <div key={metric.label} className={`${isSelected ? 'bg-white/10' : 'bg-white'} rounded-lg px-3 py-2`}>
                                                            <p className={`text-xs ${isSelected ? 'text-cyan-200' : 'text-gray-500'}`}>
                                                                {metric.label}
                                                            </p>
                                                            <div className="flex items-baseline space-x-2 mt-0.5">
                                                                <p className={`text-sm font-semibold ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                                                                    {metric.value}
                                                                </p>
                                                                <p className={`text-xs flex items-center ${metric.trend === 'up' ? (isSelected ? 'text-green-400' : 'text-green-600') :
                                                                    metric.trend === 'down' ? (isSelected ? 'text-red-400' : 'text-red-600') :
                                                                        (isSelected ? 'text-gray-300' : 'text-gray-400')
                                                                    }`}>
                                                                    {metric.trend === 'up' && '↑'}
                                                                    {metric.trend === 'down' && '↓'}
                                                                    {metric.trend === 'stable' && '→'}
                                                                    {metric.change > 0 ? '+' : ''}{metric.change}%
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>

                    {/* Performance Driver Tree */}
                    <div className="lg:sticky lg:top-32">
                        <h2 className="text-lg font-semibold text-navy-900 mb-2">
                            Performance Driver Tree
                        </h2>
                        <p className="text-xs text-gray-600 mb-4">
                            {excelData ? 'Showing data from uploaded Excel file. Click to expand details.' : 'Upload an Excel file to view driver tree with real data, or view synthetic data below.'}
                        </p>
                        
                        {/* Excel Upload Component */}
                        <div className="mb-4">
                            <ExcelUpload onDataLoaded={handleExcelDataLoaded} />
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 max-h-[600px] overflow-y-auto">
                            {renderDriverTree()}
                        </div>

                        {/* What If Analysis Section */}
                        {excelData && excelData.tree.length > 0 && (
                            <div className="mt-6">
                                <div className="flex items-center space-x-2 mb-3">
                                    <Calculator className="w-4 h-4 text-navy-900" />
                                    <h3 className="text-sm font-semibold text-navy-900">What If Analysis</h3>
                                </div>
                                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                                    <p className="text-xs text-gray-600 mb-3">
                                        Adjust Level 5 drivers: Direct Accounting Amount changes ($) or Rate Fact changes (%)
                                    </p>
                                    
                                    {(() => {
                                        const { accountingDrivers, rateDrivers } = findLevel5Drivers(excelData.tree);
                                        
                                        return (
                                            <>
                                                {accountingDrivers.length > 0 && (
                                                    <div className="mb-4">
                                                        <h4 className="text-xs font-semibold text-gray-700 mb-2">Accounting Fact Drivers (Level 5 - $ Adjustments)</h4>
                                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                                                            {accountingDrivers.map((driver) => {
                                                                const currentValue = whatIfPercentages.get(driver.id) || 0;
                                                                const result = whatIfResults.get(driver.id);
                                                                const amounts = calculateNodeAmounts(driver);
                                                                
                                                                return (
                                                                    <div 
                                                                        key={driver.id}
                                                                        className="bg-gray-50 border border-gray-200 rounded-lg p-2 text-xs"
                                                                    >
                                                                        <div className="font-medium text-gray-900 mb-1 truncate" title={driver.name}>
                                                                            {driver.name}
                                                                        </div>
                                                                        
                                                                        <div className="flex items-center space-x-1 mb-1">
                                                                            <span className="text-xs text-gray-600">$</span>
                                                                            <input
                                                                                type="number"
                                                                                step="0.01"
                                                                                placeholder="0"
                                                                                value={currentValue || ''}
                                                                                onChange={(e) => {
                                                                                    const value = parseFloat(e.target.value) || 0;
                                                                                    const newPercentages = new Map(whatIfPercentages);
                                                                                    newPercentages.set(driver.id, value);
                                                                                    setWhatIfPercentages(newPercentages);
                                                                                }}
                                                                                className="w-16 px-1 py-0.5 border border-gray-300 rounded text-xs"
                                                                            />
                                                                            <button
                                                                                onClick={() => {
                                                                                    // For Accounting Fact, the value is a direct dollar amount change
                                                                                    const newAccounting = (amounts.accounting || 0) + currentValue;
                                                                                    const newResults = new Map(whatIfResults);
                                                                                    newResults.set(driver.id, { accounting: newAccounting, rate: amounts.rate || 0 });
                                                                                    setWhatIfResults(newResults);
                                                                                }}
                                                                                className="px-2 py-0.5 bg-cyan-600 text-white rounded text-xs hover:bg-cyan-700 transition-colors"
                                                                            >
                                                                                Apply
                                                                            </button>
                                                                        </div>
                                                                        
                                                                        {result && (
                                                                            <div className="space-y-0.5 mt-1 pt-1 border-t border-gray-200">
                                                                                {result.accounting !== 0 && (
                                                                                    <div className="text-blue-600 font-medium">
                                                                                        Acc: {formatCurrency(result.accounting)}
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        )}
                                                                        
                                                                        {!result && amounts.accounting !== 0 && (
                                                                            <div className="space-y-0.5 mt-1 pt-1 border-t border-gray-200 text-gray-500">
                                                                                <div>
                                                                                    Acc: {formatCurrency(amounts.accounting)}
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                )}
                                                
                                                {rateDrivers.length > 0 && (
                                                    <div>
                                                        <h4 className="text-xs font-semibold text-gray-700 mb-2">Rate Fact Drivers (Level 5 - % Adjustments)</h4>
                                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                                                            {rateDrivers.map((driver) => {
                                                                const currentPercentage = whatIfPercentages.get(driver.id) || 0;
                                                                const result = whatIfResults.get(driver.id);
                                                                const amounts = calculateNodeAmounts(driver);
                                                                
                                                                return (
                                                                    <div 
                                                                        key={driver.id}
                                                                        className="bg-gray-50 border border-gray-200 rounded-lg p-2 text-xs"
                                                                    >
                                                                        <div className="font-medium text-gray-900 mb-1 truncate" title={driver.name}>
                                                                            {driver.name}
                                                                        </div>
                                                                        
                                                                        <div className="flex items-center space-x-1 mb-1">
                                                                            <input
                                                                                type="number"
                                                                                step="0.1"
                                                                                placeholder="%"
                                                                                value={currentPercentage || ''}
                                                                                onChange={(e) => {
                                                                                    const value = parseFloat(e.target.value) || 0;
                                                                                    const newPercentages = new Map(whatIfPercentages);
                                                                                    newPercentages.set(driver.id, value);
                                                                                    setWhatIfPercentages(newPercentages);
                                                                                }}
                                                                                className="w-12 px-1 py-0.5 border border-gray-300 rounded text-xs"
                                                                            />
                                                                            <span className="text-xs text-gray-600">%</span>
                                                                            <button
                                                                                onClick={() => handleWhatIfChange(driver.id, currentPercentage)}
                                                                                className="px-2 py-0.5 bg-cyan-600 text-white rounded text-xs hover:bg-cyan-700 transition-colors"
                                                                            >
                                                                                Apply
                                                                            </button>
                                                                        </div>
                                                                        
                                                                        {result && (
                                                                            <div className="space-y-0.5 mt-1 pt-1 border-t border-gray-200">
                                                                                {result.rate !== 0 && (
                                                                                    <div className="text-green-600 font-medium">
                                                                                        Rate: {formatRateAsPercentage(result.rate)}
                                                                                    </div>
                                                                                )}
                                                                                {driver.isFeeRateDriver && driver.rawAmount && result.accounting !== 0 && (
                                                                                    <div className="text-blue-600 font-medium">
                                                                                        Acc: {formatCurrency(result.accounting)}
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        )}
                                                                        
                                                                        {!result && amounts.rate !== 0 && (
                                                                            <div className="space-y-0.5 mt-1 pt-1 border-t border-gray-200 text-gray-500">
                                                                                <div>
                                                                                    Rate: {formatRateAsPercentage(amounts.rate)}
                                                                                </div>
                                                                                {driver.isFeeRateDriver && driver.rawAmount && amounts.accounting !== 0 && (
                                                                                    <div>
                                                                                        Acc: {formatCurrency(amounts.accounting)}
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        );
                                    })()}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}