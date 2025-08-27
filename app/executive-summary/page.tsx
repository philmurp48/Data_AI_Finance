'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
    Activity,
    AlertCircle,
    AlertTriangle,
    ArrowRight,
    BarChart3,
    Calendar,
    CheckCircle,
    ChevronRight,
    DollarSign,
    Eye,
    FileText,
    Maximize2,
    Shield,
    Sparkles,
    Target,
    TrendingDown,
    TrendingUp,
    Users,
    X,
    Zap
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ExecutiveSummaryPage() {
    const router = useRouter();
    const [selectedInsight, setSelectedInsight] = useState<any>(null);
    const [showModal, setShowModal] = useState(false);
    const [activeView, setActiveView] = useState('overview');
    const [showUpcomingReviews, setShowUpcomingReviews] = useState(false);

    // Get current time for personalized greeting
    const hour = new Date().getHours();
    const timeGreeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

    // Enhanced KPI data with sparkline trends - aligned to 4 key business outcomes
    const kpis = [
        {
            label: 'Commercial Performance',
            value: '$45.2B',
            change: 8.2,
            target: '$2.1B',
            status: 'above',
            forecast: 'Market share expanding 0.3pp',
            sparkline: [45, 52, 48, 58, 55, 62, 65, 68],
            icon: TrendingUp,
            color: 'green',
            subMetrics: [
                { name: 'Market & Demand', value: '18.2%' },
                { name: 'Product Mix', value: '$48.5K ATP' },
                { name: 'Volume', value: '2.8M units' },
                { name: 'Pricing', value: '+3.2% YoY' }
            ]
        },
        {
            label: 'Operational Performance',
            value: '75%',
            change: 5.0,
            target: '70.0%',
            status: 'above',
            forecast: 'Manufacturing performance exceeding revised targets',
            sparkline: [68, 69, 70, 71, 72, 73, 74, 75],
            icon: Activity,
            color: 'green',
            subMetrics: [
                { name: 'Production Plan', value: '103% hit' },
                { name: 'Quality', value: '99.8%' },
                { name: 'Inventory', value: '45 days' },
                { name: 'Digital/OnStar', value: '+42%' }
            ]
        },
        {
            label: 'Financial Performance',
            value: '$2.83B',
            change: -2.1,
            target: '$26.2M',
            status: 'below',
            forecast: 'Margin pressure from costs',
            sparkline: [30, 32, 35, 33, 31, 29, 28, 27],
            icon: DollarSign,
            color: 'yellow',
            subMetrics: [
                { name: 'EBIT Margin', value: '12.5%' },
                { name: 'Cash Flow', value: '$45.2M' },
                { name: 'Working Capital', value: '$142M' },
                { name: 'Capital Allocation', value: '$185.7M' }
            ]
        },
        {
            label: 'Risk & Compliance',
            value: '98%',
            change: 1.5,
            target: '95%',
            status: 'above',
            forecast: 'All controls effective',
            sparkline: [94, 95, 96, 96, 97, 97, 98, 98],
            icon: Shield,
            color: 'green',
            subMetrics: [
                { name: 'Compliance Score', value: '98%' },
                { name: 'Risk Level', value: 'Medium' },
                { name: 'Audit Findings', value: '2 minor' },
                { name: 'Sensitivity Tests', value: 'Passed' }
            ]
        }
    ];

    // AI Executive Briefing - Aligned to 4 Key Business Outcomes
    const executiveBriefing = {
        summary: "Strong commercial and operational performance offset by financial margin pressure. Risk profile remains well-controlled with 98% compliance.",
        keyHighlights: [
            // Commercial Performance
            { type: 'positive', text: 'Commercial: Market share gained 0.3pp with volume reaching 2.8M units (+12.5%)' },
            { type: 'positive', text: 'Commercial: Product mix optimization driving ATP up to $48.5K (+3.2%)' },
            // Operational Performance  
            { type: 'positive', text: 'Operational: Manufacturing OEE at 75%, exceeding revised target by 5pp' },
            { type: 'positive', text: 'Operational: Digital/OnStar revenue growth of 42% from connected services' },
            // Financial Performance
            { type: 'warning', text: 'Financial: EBIT margin compressed to 12.5% due to commodity cost inflation' },
            { type: 'critical', text: 'Financial: Working capital stretched to $142M with DSO at 52 days' },
            // Risk & Compliance
            { type: 'positive', text: 'Risk: Compliance score maintained at 98% with only 2 minor audit findings' },
            { type: 'warning', text: 'Risk: Supply chain sensitivity tests show medium risk from chip shortage' }
        ],
        recommendations: [
            'Commercial: Accelerate EV launches to capture additional 0.5pp market share in Q4',
            'Operational: Scale digital services to 3 new models to sustain 40%+ growth',
            'Financial: Implement dynamic pricing to recover 150bps margin by year-end',
            'Risk: Activate dual-sourcing for critical semiconductors within 30 days'
        ]
    };

    // Key Decisions Required - Aligned to 4 key business outcomes
    const keyDecisions = [
        // Commercial Decisions
        {
            id: 1,
            title: 'Launch aggressive EV pricing strategy to gain 2pp market share',
            businessOutcome: 'Commercial',
            urgency: 'high',
            dueDate: 'Oct 28',
            impact: 'Expected 150K incremental units, $7.2B revenue',
            financialImpact: '+$320M EBIT',
            riskAssessment: 'Medium - margin dilution risk',
            owner: 'CEO/CMO',
            status: 'pending',
            stakeholders: ['Board', 'Regional Presidents', 'Finance'],
            dependencies: ['Production capacity', 'Dealer readiness', 'Marketing budget']
        },
        {
            id: 2,
            title: 'Exit low-margin fleet business in 3 markets',
            businessOutcome: 'Commercial',
            urgency: 'medium',
            dueDate: 'Nov 15',
            impact: 'Improve mix by 5pp, reduce volume by 80K units',
            financialImpact: '+$65M EBIT despite volume loss',
            riskAssessment: 'Low - minimal brand impact',
            owner: 'EVP Sales',
            status: 'in-review',
            stakeholders: ['Regional VPs', 'Fleet customers'],
            dependencies: ['Contract terminations', 'Dealer reallocation']
        },
        // Operational Decisions
        {
            id: 3,
            title: 'Approve $45M for Plant D automation Phase 2',
            businessOutcome: 'Operational',
            urgency: 'high',
            dueDate: 'Oct 30',
            impact: 'Increase capacity by 350K units/year, reduce cost $400/unit',
            financialImpact: '28% IRR, 2.8 year payback',
            riskAssessment: 'Low - proven technology',
            owner: 'COO/Board',
            status: 'pending',
            stakeholders: ['Plant management', 'Union', 'Engineering'],
            dependencies: ['Equipment vendor selection', 'Union agreement']
        },
        {
            id: 4,
            title: 'Accelerate digital services expansion to China',
            businessOutcome: 'Operational',
            urgency: 'high',
            dueDate: 'Nov 5',
            impact: 'Access 2.5M connected vehicles, $80M revenue potential',
            financialImpact: '+$45M EBIT by 2025',
            riskAssessment: 'High - regulatory and data privacy concerns',
            owner: 'CDO/Legal',
            status: 'pending',
            stakeholders: ['China JV partner', 'Government relations'],
            dependencies: ['Regulatory approval', 'Local partnerships']
        },
        // Financial Decisions
        {
            id: 5,
            title: 'Implement dynamic pricing algorithm across all models',
            businessOutcome: 'Financial',
            urgency: 'critical',
            dueDate: 'Oct 25',
            impact: 'Recover 180bps margin through optimized pricing',
            financialImpact: '+$425M EBIT annually',
            riskAssessment: 'Medium - dealer pushback expected',
            owner: 'CFO/CRO',
            status: 'pending',
            stakeholders: ['Dealers', 'Regional teams', 'IT'],
            dependencies: ['IT system readiness', 'Dealer training']
        },
        {
            id: 6,
            title: 'Restructure $2.5B supplier payment terms',
            businessOutcome: 'Financial',
            urgency: 'high',
            dueDate: 'Nov 10',
            impact: 'Extend DPO by 15 days, free up $380M cash',
            financialImpact: '$12M annual benefit from float',
            riskAssessment: 'Medium - supplier relationship risk',
            owner: 'CFO/CPO',
            status: 'in-review',
            stakeholders: ['Top 50 suppliers', 'Procurement', 'Treasury'],
            dependencies: ['Supplier negotiations', 'Contract amendments']
        },
        // Risk & Compliance Decisions
        {
            id: 7,
            title: 'Activate crisis response for semiconductor shortage',
            businessOutcome: 'Risk',
            urgency: 'critical',
            dueDate: 'Oct 24',
            impact: 'Secure 6-month supply, prevent 200K unit shortage',
            financialImpact: 'Avoid $800M revenue loss',
            riskAssessment: 'Critical - immediate action required',
            owner: 'CEO/COO',
            status: 'pending',
            stakeholders: ['Suppliers', 'Government', 'Customers'],
            dependencies: ['Supplier commitments', 'Allocation priorities']
        },
        {
            id: 8,
            title: 'Approve new EU compliance framework investment',
            businessOutcome: 'Risk',
            urgency: 'medium',
            dueDate: 'Nov 20',
            impact: 'Ensure compliance with 2025 regulations',
            financialImpact: '$25M investment, avoid $200M+ penalties',
            riskAssessment: 'Low - regulatory clarity achieved',
            owner: 'General Counsel',
            status: 'in-review',
            stakeholders: ['EU operations', 'Product development', 'IT'],
            dependencies: ['Regulatory guidance', 'System requirements']
        }
    ];

    // Top Risks & Opportunities
    const risksOpportunities = {
        risks: [
            {
                title: 'Supply chain disruption risk',
                probability: 'High',
                impact: '$10-15M',
                mitigation: 'Dual sourcing strategy 65% complete',
                trend: 'increasing'
            },
            {
                title: 'Competitive pricing pressure',
                probability: 'Medium',
                impact: '$5-8M',
                mitigation: 'Value engineering initiatives underway',
                trend: 'stable'
            },
            {
                title: 'Regulatory compliance (EU)',
                probability: 'Low',
                impact: '$2-3M',
                mitigation: 'Compliance team fully staffed',
                trend: 'decreasing'
            }
        ],
        opportunities: [
            {
                title: 'EV market expansion',
                probability: 'High',
                impact: '$20-30M',
                action: 'Accelerate product launches',
                trend: 'increasing'
            },
            {
                title: 'Digital services growth',
                probability: 'Very High',
                impact: '$15-20M',
                action: 'Increase marketing spend by 25%',
                trend: 'increasing'
            },
            {
                title: 'Emerging markets entry',
                probability: 'Medium',
                impact: '$10-15M',
                action: 'Finalize partnership deals',
                trend: 'stable'
            }
        ]
    };

    // Enhanced business insights aligned to 4 key business outcomes
    const businessInsights = [
        // Commercial Performance Insights
        {
            id: 1,
            category: 'Market & Demand',
            businessOutcome: 'Commercial',
            title: 'Market share expansion in premium segments',
            metric: '18.2%',
            change: 0.3,
            status: 'high',
            insight: 'Gained share from competitors in EV luxury segment',
            drivers: ['Premium EV launches captured 2.5pp share', 'Brand perception up 15%', 'Dealer satisfaction at 94%'],
            actions: ['Accelerate 3 more EV launches in Q4', 'Expand certified pre-owned program', 'Invest $5M in brand campaigns'],
            relatedMetrics: { volume: '2.8M units', ATP: '$48.5K', mixImprovement: '+3.2%' }
        },
        {
            id: 2,
            category: 'Product Mix',
            businessOutcome: 'Commercial',
            title: 'Premium mix driving ATP improvement',
            metric: '$48.5K ATP',
            change: 3.2,
            status: 'medium',
            insight: 'SUV and luxury segments outperforming targets',
            drivers: ['SUV mix at 68% (+8pp YoY)', 'Option take rates up 12%', 'Fleet mix reduced to 15%'],
            actions: ['Launch premium option packages', 'Reduce fleet allocation by 5pp', 'Enhance personalization options'],
            relatedMetrics: { revenuePerUnit: '+$1,500', marginImpact: '+120bps', mixTarget: '72% SUV' }
        },
        {
            id: 3,
            category: 'Volume',
            businessOutcome: 'Commercial',
            title: 'Production capacity constraining growth',
            metric: '2.8M units',
            change: 12.5,
            status: 'critical',
            insight: 'Demand exceeding supply by 15% in key markets',
            drivers: ['3 plants at 98% capacity', 'Chip shortage limiting output', 'Strong order bank of 450K'],
            actions: ['Add third shift at Plant A', 'Secure alternative chip suppliers', 'Optimize production scheduling'],
            relatedMetrics: { backlog: '4.5 months', lostSales: '~150K units', capacityUtilization: '94%' }
        },
        // Operational Performance Insights
        {
            id: 4,
            category: 'Production',
            businessOutcome: 'Operational',
            title: 'Manufacturing excellence on track',
            metric: '75% OEE',
            change: 5.0,
            status: 'low',
            insight: 'World-class efficiency from digital transformation',
            drivers: ['AI quality control: -65% defects', 'Predictive maintenance: -40% downtime', 'Cycle time: -18%'],
            actions: ['Deploy AI to 2 more plants', 'Implement digital twin for line balancing', 'Launch operator certification program'],
            relatedMetrics: { qualityRate: '99.8%', MTBF: '240 hours', laborProductivity: '+22%' }
        },
        {
            id: 5,
            category: 'Digital/OnStar',
            businessOutcome: 'Operational',
            title: 'Connected services revenue surge',
            metric: '42% growth',
            change: 18.5,
            status: 'medium',
            insight: 'Subscription model gaining strong traction',
            drivers: ['78% vehicles connected', '85% renewal rate', 'ARPU increased to $32/month'],
            actions: ['Launch 3 new premium services', 'Implement usage-based insurance', 'Expand B2B fleet solutions'],
            relatedMetrics: { connectedVehicles: '4.2M', monthlyActiveUsers: '3.1M', serviceUptime: '99.95%' }
        },
        {
            id: 6,
            category: 'Inventory',
            businessOutcome: 'Operational',
            title: 'Inventory optimization improving turns',
            metric: '45 days',
            change: -8.2,
            status: 'medium',
            insight: 'AI-driven forecasting reducing working capital',
            drivers: ['Dealer inventory -12 days', 'Parts availability up to 94%', 'Obsolescence reduced 30%'],
            actions: ['Implement dynamic allocation model', 'Launch vendor-managed inventory', 'Enhance demand sensing AI'],
            relatedMetrics: { inventoryTurns: '8.1x', stockoutRate: '2.3%', excessInventory: '-$45M' }
        },
        // Financial Performance Insights
        {
            id: 7,
            category: 'EBIT Margin',
            businessOutcome: 'Financial',
            title: 'Margin pressure from commodity inflation',
            metric: '12.5%',
            change: -2.1,
            status: 'high',
            insight: 'Input costs outpacing pricing actions',
            drivers: ['Materials +$1,200/unit', 'Labor costs +5.5%', 'Energy costs +12%'],
            actions: ['Implement Q4 pricing of +2.5%', 'Accelerate $150M cost program', 'Hedge 70% of commodity exposure'],
            relatedMetrics: { grossMargin: '28.5%', fixedCostAbsorption: '82%', variableCostPerUnit: '+8.5%' }
        },
        {
            id: 8,
            category: 'Working Capital',
            businessOutcome: 'Financial',
            title: 'Cash cycle extending beyond target',
            metric: '$142M',
            change: 15.2,
            status: 'critical',
            insight: 'Collections slowing while inventory builds',
            drivers: ['DSO at 52 days (+7)', 'DPO at 65 days (-3)', 'Inventory days at 45 (+5)'],
            actions: ['Tighten credit terms for dealers', 'Implement supply chain financing', 'Reduce safety stock by 10%'],
            relatedMetrics: { cashConversion: '32 days', freeWorkingCapital: '-$38M', liquidityRatio: '1.15x' }
        },
        {
            id: 9,
            category: 'Capital Allocation',
            businessOutcome: 'Financial',
            title: 'Capital efficiency improving with automation',
            metric: '$185.7M',
            change: 3.2,
            status: 'low',
            insight: 'ROI exceeding hurdle rates on all major projects',
            drivers: ['Automation ROI at 35%', 'EV investments on track', 'Asset utilization up 12%'],
            actions: ['Accelerate high-ROI projects', 'Divest non-core assets', 'Optimize capital structure'],
            relatedMetrics: { ROIC: '18.5%', paybackPeriod: '2.8 years', NPV: '$420M' }
        },
        // Risk & Compliance Insights
        {
            id: 10,
            category: 'Compliance',
            businessOutcome: 'Risk',
            title: 'Regulatory compliance excellence maintained',
            metric: '98%',
            change: 1.5,
            status: 'low',
            insight: 'Proactive compliance preventing penalties',
            drivers: ['Zero material findings', 'All certifications current', 'Training completion at 96%'],
            actions: ['Prepare for new EU regulations', 'Enhance ESG reporting', 'Implement continuous monitoring'],
            relatedMetrics: { auditScore: '4.8/5', penaltiesAvoided: '$12M', complianceCost: '0.3% revenue' }
        },
        {
            id: 11,
            category: 'Risk Management',
            businessOutcome: 'Risk',
            title: 'Supply chain risk escalating',
            metric: 'Medium Risk',
            change: 25,
            status: 'high',
            insight: 'Single-source dependencies creating vulnerabilities',
            drivers: ['65% parts single-sourced', 'Chip shortage ongoing', '3 suppliers at risk'],
            actions: ['Dual-source critical components', 'Build strategic inventory', 'Develop supplier risk scorecard'],
            relatedMetrics: { supplierHealthScore: '72%', criticalPartsCoverage: '45 days', alternativesIdentified: '78%' }
        },
        {
            id: 12,
            category: 'Competitive Intelligence',
            businessOutcome: 'Risk',
            title: 'Competitive threats intensifying',
            metric: '#3 Position',
            change: 0,
            status: 'medium',
            insight: 'New entrants pressuring market position',
            drivers: ['2 new EV competitors', 'Price war in mid-segment', 'Tech disadvantage emerging'],
            actions: ['Launch competitive response team', 'Accelerate R&D investment', 'Strategic partnerships for tech'],
            relatedMetrics: { marketShareGap: '-4.1pp', pricePremium: '-2.5%', featureGap: '18 months' }
        }
    ];

    const renderSparkline = (data: number[], color: string) => {
        const max = Math.max(...data);
        const min = Math.min(...data);
        const range = max - min;
        const width = 80;
        const height = 30;

        const points = data.map((value, index) => {
            const x = (index / (data.length - 1)) * width;
            const y = height - ((value - min) / range) * height;
            return `${x},${y}`;
        }).join(' ');

        return (
            <svg width={width} height={height} className="inline-block">
                <polyline
                    fill="none"
                    stroke={color === 'green' ? '#10b981' : color === 'red' ? '#ef4444' : '#f59e0b'}
                    strokeWidth="2"
                    points={points}
                />
                <circle
                    cx={width}
                    cy={height - ((data[data.length - 1] - min) / range) * height}
                    r="2"
                    fill={color === 'green' ? '#10b981' : color === 'red' ? '#ef4444' : '#f59e0b'}
                />
            </svg>
        );
    };

    const handleInsightClick = (insight: any) => {
        setSelectedInsight(insight);
        setShowModal(true);
    };

    return (
        <div className="bg-gradient-to-br from-gray-50 to-white">
            {/* Page Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Executive Summary - FY25 Q2</h1>
                            <p className="text-sm text-gray-500">{timeGreeting}, Sarah • Real-time insights as of {new Date().toLocaleTimeString()}</p>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={() => setShowUpcomingReviews(true)}
                                className="flex items-center space-x-2 px-4 py-2 bg-cyan-gradient text-navy-900 rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all border border-cyan-500"
                            >
                                <Calendar className="w-4 h-4" />
                                <span className="text-sm font-medium">Upcoming Reviews</span>
                            </button>
                            <button className="flex items-center space-x-2 px-4 py-2 bg-navy-gradient text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all border border-cyan-500/30">
                                <FileText className="w-4 h-4" />
                                <span className="text-sm font-medium">Export to PPT for SLT</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-4 sm:px-6 lg:px-8 py-6">
                {/* Enhanced KPI Cards - 4 Key Business Outcomes */}
                <div className="grid grid-cols-4 gap-4 mb-8">
                    {kpis.map((kpi, index) => (
                        <motion.div
                            key={kpi.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-xl shadow-sm hover:shadow-lg hover:shadow-cyan-100 transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100 hover:border-cyan-200"
                        >
                            <div className="p-5">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center space-x-2">
                                        <div className={`p-2 rounded-lg ${kpi.color === 'green' ? 'bg-cyan-50' :
                                            kpi.color === 'red' ? 'bg-red-50' : 'bg-amber-50'
                                            }`}>
                                            <kpi.icon className={`w-4 h-4 ${kpi.color === 'green' ? 'text-cyan-700' :
                                                kpi.color === 'red' ? 'text-red-600' : 'text-amber-600'
                                                }`} />
                                        </div>
                                        <span className="text-sm font-semibold text-navy-800">{kpi.label}</span>
                                    </div>
                                    <Eye className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>

                                <div className="mb-3">
                                    <div className="flex items-baseline justify-between mb-1">
                                        <p className="text-2xl font-bold text-navy-900">{kpi.value}</p>
                                        <span className={`text-sm font-semibold flex items-center ${kpi.change > 0 ? 'text-green-600' : 'text-red-600'
                                            }`}>
                                            {kpi.change > 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                                            {Math.abs(kpi.change)}%
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-gray-500">vs target <span className="font-medium">{kpi.target}</span></span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex-1">
                                        {renderSparkline(kpi.sparkline, kpi.color)}
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-gray-400 ml-2 group-hover:translate-x-1 transition-transform" />
                                </div>

                                {/* Sub-metrics */}
                                <div className="space-y-1.5 mb-3">
                                    {kpi.subMetrics.slice(0, 3).map((metric, idx) => (
                                        <div key={idx} className="flex items-center justify-between text-xs">
                                            <span className="text-gray-600">{metric.name}</span>
                                            <span className="font-medium text-gray-900">{metric.value}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-2 border-t border-gray-100">
                                    <p className="text-xs text-gray-600 flex items-center">
                                        <Activity className="w-3 h-3 mr-1" />
                                        {kpi.forecast}
                                    </p>
                                </div>
                            </div>

                            {/* Status bar */}
                            <div className={`h-1 ${kpi.color === 'green' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                                kpi.color === 'red' ? 'bg-gradient-to-r from-red-500 to-rose-500' :
                                    'bg-gradient-to-r from-yellow-500 to-amber-500'
                                }`} />
                        </motion.div>
                    ))}
                </div>

                {/* AI Executive Briefing */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 bg-navy-gradient rounded-xl p-6 border border-cyan-500/30 shadow-lg shadow-cyan-500/10"
                >
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                            <div className="p-2.5 bg-cyan-gradient rounded-lg shadow-lg shadow-cyan-500/50">
                                <Sparkles className="w-6 h-6 text-navy-900" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-white">AI Executive Briefing</h2>
                                <p className="text-sm text-cyan-100">{executiveBriefing.summary}</p>
                            </div>
                        </div>
                        <span className="text-xs text-cyan-200">Updated 2 mins ago</span>
                    </div>

                    <div className="space-y-4">
                        {/* Key Highlights by Business Outcome */}
                        <div>
                            <h3 className="text-sm font-bold text-white mb-3 flex items-center">
                                <Activity className="w-4 h-4 mr-2 text-cyan-400" />
                                Performance by Business Outcome
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                {executiveBriefing.keyHighlights.map((highlight, idx) => (
                                    <div key={idx} className="flex items-start space-x-2 p-3 rounded-lg bg-white/10 backdrop-blur hover:bg-white/15 transition-all border border-white/10">
                                        {highlight.type === 'positive' ?
                                            <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" /> :
                                            highlight.type === 'warning' ?
                                                <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" /> :
                                                <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                                        }
                                        <span className="text-sm text-white/90 leading-tight">{highlight.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recommended Actions */}
                        <div>
                            <h3 className="text-sm font-bold text-white mb-3 flex items-center">
                                <Zap className="w-4 h-4 mr-2 text-cyan-400" />
                                Priority Actions by Area
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                {executiveBriefing.recommendations.map((rec, idx) => (
                                    <div key={idx} className="flex items-start space-x-2 p-3 bg-cyan-gradient/20 backdrop-blur rounded-lg border border-cyan-500/30 hover:border-cyan-400/50 transition-all">
                                        <span className="flex-shrink-0 w-6 h-6 bg-cyan-gradient text-navy-900 rounded-full flex items-center justify-center text-xs font-bold shadow-lg shadow-cyan-500/50">
                                            {idx + 1}
                                        </span>
                                        <span className="text-sm text-white/90 leading-tight">{rec}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* View Tabs */}
                <div className="flex items-center space-x-1 mb-6 bg-gray-100 rounded-lg p-1 w-fit">
                    {['overview', 'decisions', 'risks', 'insights'].map((view) => (
                        <button
                            key={view}
                            onClick={() => setActiveView(view)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeView === view
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            {view.charAt(0).toUpperCase() + view.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Content based on active view */}
                <AnimatePresence mode="wait">
                    {activeView === 'overview' && (
                        <motion.div
                            key="overview"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-6"
                        >
                            {/* Group insights by business outcome */}
                            {['Commercial', 'Operational', 'Financial', 'Risk'].map((outcome) => (
                                <div key={outcome}>
                                    <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center">
                                        {outcome === 'Commercial' && <TrendingUp className="w-4 h-4 mr-2 text-cyan-600" />}
                                        {outcome === 'Operational' && <Activity className="w-4 h-4 mr-2 text-purple-600" />}
                                        {outcome === 'Financial' && <DollarSign className="w-4 h-4 mr-2 text-green-600" />}
                                        {outcome === 'Risk' && <Shield className="w-4 h-4 mr-2 text-red-600" />}
                                        {outcome} Performance Deep Dives
                                    </h3>
                                    <div className="grid grid-cols-3 gap-4">
                                        {businessInsights
                                            .filter(insight => insight.businessOutcome === outcome)
                                            .map((insight, index) => (
                                                <motion.div
                                                    key={insight.id}
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: index * 0.05 }}
                                                    className={`bg-white rounded-xl shadow-sm hover:shadow-xl transition-all cursor-pointer border ${insight.status === 'critical' ? 'border-red-200' :
                                                        insight.status === 'high' ? 'border-amber-200' :
                                                            insight.status === 'medium' ? 'border-blue-200' : 'border-gray-200'
                                                        } relative overflow-hidden`}
                                                    onClick={() => handleInsightClick(insight)}
                                                >
                                                    {/* Business outcome indicator bar */}
                                                    <div className={`absolute top-0 left-0 right-0 h-1 ${outcome === 'Commercial' ? 'bg-cyan-500' :
                                                        outcome === 'Operational' ? 'bg-purple-500' :
                                                            outcome === 'Financial' ? 'bg-green-500' : 'bg-red-500'
                                                        }`} />

                                                    <div className="p-5">
                                                        <div className="flex items-center justify-between mb-3">
                                                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${insight.status === 'critical' ? 'bg-red-100 text-red-700' :
                                                                insight.status === 'high' ? 'bg-amber-100 text-amber-700' :
                                                                    insight.status === 'medium' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                                                                }`}>
                                                                {insight.category}
                                                            </span>
                                                            <span className={`text-sm font-bold flex items-center ${insight.change > 0 ? 'text-green-600' : insight.change < 0 ? 'text-red-600' : 'text-gray-600'
                                                                }`}>
                                                                {insight.change > 0 ? '+' : ''}{insight.change}{typeof insight.change === 'number' ? '%' : ''}
                                                            </span>
                                                        </div>

                                                        <h3 className="text-lg font-bold text-navy-900 mb-1">{insight.metric}</h3>
                                                        <p className="text-sm font-medium text-gray-700 mb-2 line-clamp-2">{insight.title}</p>
                                                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{insight.insight}</p>

                                                        {/* Related metrics preview */}
                                                        {insight.relatedMetrics && (
                                                            <div className="mb-3 pt-3 border-t border-gray-100">
                                                                <div className="grid grid-cols-2 gap-2">
                                                                    {Object.entries(insight.relatedMetrics).slice(0, 2).map(([key, value]) => (
                                                                        <div key={key} className="text-xs">
                                                                            <span className="text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}: </span>
                                                                            <span className="font-medium text-gray-700">{value}</span>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}

                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center text-xs text-gray-500">
                                                                <Activity className="w-3 h-3 mr-1" />
                                                                {insight.drivers.length} drivers
                                                            </div>
                                                            <div className="flex items-center text-xs text-cyan-600 font-medium">
                                                                <span>{insight.actions.length} actions</span>
                                                                <ArrowRight className="w-3 h-3 ml-1" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    )}

                    {activeView === 'decisions' && (
                        <motion.div
                            key="decisions"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-6"
                        >
                            {/* Group decisions by business outcome */}
                            {['Commercial', 'Operational', 'Financial', 'Risk'].map((outcome) => {
                                const outcomeDecisions = keyDecisions.filter(d => d.businessOutcome === outcome);
                                if (outcomeDecisions.length === 0) return null;

                                return (
                                    <div key={outcome} className="bg-white rounded-xl shadow-sm overflow-hidden">
                                        <div className={`p-4 border-b ${outcome === 'Commercial' ? 'bg-cyan-50 border-cyan-200' :
                                            outcome === 'Operational' ? 'bg-purple-50 border-purple-200' :
                                                outcome === 'Financial' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                                            }`}>
                                            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                                                {outcome === 'Commercial' && <TrendingUp className="w-5 h-5 mr-2 text-cyan-600" />}
                                                {outcome === 'Operational' && <Activity className="w-5 h-5 mr-2 text-purple-600" />}
                                                {outcome === 'Financial' && <DollarSign className="w-5 h-5 mr-2 text-green-600" />}
                                                {outcome === 'Risk' && <Shield className="w-5 h-5 mr-2 text-red-600" />}
                                                {outcome} Decisions
                                            </h2>
                                        </div>
                                        <div className="divide-y divide-gray-200">
                                            {outcomeDecisions.map((decision) => (
                                                <div key={decision.id} className="p-6 hover:bg-gray-50 transition-colors">
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex-1">
                                                            <div className="flex items-center space-x-3 mb-2">
                                                                <h3 className="text-base font-medium text-navy-900">{decision.title}</h3>
                                                                <span className={`text-xs font-medium px-2 py-1 rounded-full ${decision.urgency === 'critical' ? 'bg-red-100 text-red-700' :
                                                                    decision.urgency === 'high' ? 'bg-amber-100 text-amber-700' :
                                                                        'bg-blue-100 text-blue-700'
                                                                    }`}>
                                                                    {decision.urgency}
                                                                </span>
                                                                <span className={`text-xs font-medium px-2 py-1 rounded-full ${decision.status === 'pending' ? 'bg-gray-100 text-gray-700' :
                                                                    'bg-cyan-100 text-cyan-700'
                                                                    }`}>
                                                                    {decision.status}
                                                                </span>
                                                            </div>

                                                            <div className="grid grid-cols-2 gap-4 mb-3">
                                                                <div>
                                                                    <p className="text-sm text-gray-600 mb-1">{decision.impact}</p>
                                                                    <p className="text-sm font-medium text-green-600">{decision.financialImpact}</p>
                                                                </div>
                                                                <div className="text-sm">
                                                                    <span className="text-gray-600">Risk: </span>
                                                                    <span className={`font-medium ${decision.riskAssessment.includes('Critical') ? 'text-red-600' :
                                                                        decision.riskAssessment.includes('High') ? 'text-amber-600' :
                                                                            decision.riskAssessment.includes('Medium') ? 'text-yellow-600' : 'text-green-600'
                                                                        }`}>{decision.riskAssessment}</span>
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center space-x-6 text-xs text-gray-500 mb-3">
                                                                <span className="flex items-center">
                                                                    <Calendar className="w-3 h-3 mr-1" />
                                                                    Due: {decision.dueDate}
                                                                </span>
                                                                <span className="flex items-center">
                                                                    <Users className="w-3 h-3 mr-1" />
                                                                    Owner: {decision.owner}
                                                                </span>
                                                                <span className="flex items-center">
                                                                    <Users className="w-3 h-3 mr-1" />
                                                                    {decision.stakeholders.length} stakeholders
                                                                </span>
                                                            </div>

                                                            {decision.dependencies && (
                                                                <div className="text-xs bg-gray-50 rounded p-2">
                                                                    <span className="font-medium text-gray-700">Dependencies: </span>
                                                                    <span className="text-gray-600">{decision.dependencies.join(', ')}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="ml-4 text-right">
                                                            <button className="px-4 py-2 bg-cyan-gradient text-navy-900 text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all border border-cyan-500">
                                                                Review Decision
                                                            </button>
                                                            <p className="text-xs text-gray-500 mt-1">
                                                                {Math.ceil((new Date(decision.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days left
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </motion.div>
                    )}

                    {activeView === 'risks' && (
                        <motion.div
                            key="risks"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-2 gap-6"
                        >
                            {/* Risks */}
                            <div className="bg-white rounded-xl shadow-sm">
                                <div className="p-6 border-b border-gray-200">
                                    <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                                        <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
                                        Top Risks
                                    </h2>
                                </div>
                                <div className="divide-y divide-gray-200">
                                    {risksOpportunities.risks.map((risk, idx) => (
                                        <div key={idx} className="p-6">
                                            <div className="flex items-start justify-between mb-2">
                                                <h3 className="text-base font-medium text-gray-900">{risk.title}</h3>
                                                <div className="flex items-center">
                                                    {risk.trend === 'increasing' && <TrendingUp className="w-4 h-4 text-red-500" />}
                                                    {risk.trend === 'stable' && <Activity className="w-4 h-4 text-gray-500" />}
                                                    {risk.trend === 'decreasing' && <TrendingDown className="w-4 h-4 text-green-500" />}
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 mb-3">
                                                <div>
                                                    <span className="text-xs text-gray-500">Probability</span>
                                                    <p className={`text-sm font-medium ${risk.probability === 'High' ? 'text-red-600' :
                                                        risk.probability === 'Medium' ? 'text-amber-600' : 'text-green-600'
                                                        }`}>{risk.probability}</p>
                                                </div>
                                                <div>
                                                    <span className="text-xs text-gray-500">Impact</span>
                                                    <p className="text-sm font-medium text-gray-900">{risk.impact}</p>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 rounded-lg p-3">
                                                <span className="text-xs font-medium text-gray-700">Mitigation:</span>
                                                <p className="text-xs text-gray-600 mt-1">{risk.mitigation}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Opportunities */}
                            <div className="bg-white rounded-xl shadow-sm">
                                <div className="p-6 border-b border-gray-200">
                                    <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                                        <Zap className="w-5 h-5 mr-2 text-green-600" />
                                        Top Opportunities
                                    </h2>
                                </div>
                                <div className="divide-y divide-gray-200">
                                    {risksOpportunities.opportunities.map((opp, idx) => (
                                        <div key={idx} className="p-6">
                                            <div className="flex items-start justify-between mb-2">
                                                <h3 className="text-base font-medium text-gray-900">{opp.title}</h3>
                                                <div className="flex items-center">
                                                    {opp.trend === 'increasing' && <TrendingUp className="w-4 h-4 text-green-500" />}
                                                    {opp.trend === 'stable' && <Activity className="w-4 h-4 text-gray-500" />}
                                                    {opp.trend === 'decreasing' && <TrendingDown className="w-4 h-4 text-red-500" />}
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 mb-3">
                                                <div>
                                                    <span className="text-xs text-gray-500">Probability</span>
                                                    <p className={`text-sm font-medium ${opp.probability === 'Very High' || opp.probability === 'High' ? 'text-green-600' :
                                                        opp.probability === 'Medium' ? 'text-amber-600' : 'text-red-600'
                                                        }`}>{opp.probability}</p>
                                                </div>
                                                <div>
                                                    <span className="text-xs text-gray-500">Potential</span>
                                                    <p className="text-sm font-medium text-gray-900">{opp.impact}</p>
                                                </div>
                                            </div>
                                            <div className="bg-green-50 rounded-lg p-3">
                                                <span className="text-xs font-medium text-green-700">Action:</span>
                                                <p className="text-xs text-green-600 mt-1">{opp.action}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeView === 'insights' && (
                        <motion.div
                            key="insights"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-6"
                        >
                            {/* Strategic Initiatives Tracker */}
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                    <Target className="w-5 h-5 mr-2 text-blue-600" />
                                    Strategic Initiatives Progress
                                </h2>
                                <div className="space-y-4">
                                    {[
                                        { name: 'EV Platform Launch', progress: 78, status: 'on-track', impact: '$50M', dueDate: 'Q1 2025' },
                                        { name: 'Digital Transformation', progress: 45, status: 'at-risk', impact: '$30M', dueDate: 'Q2 2025' },
                                        { name: 'Cost Reduction Program', progress: 92, status: 'ahead', impact: '$15M', dueDate: 'Q4 2024' },
                                        { name: 'Market Expansion - Asia', progress: 35, status: 'delayed', impact: '$25M', dueDate: 'Q3 2025' }
                                    ].map((initiative, idx) => (
                                        <div key={idx} className="border rounded-lg p-4">
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="text-sm font-medium text-gray-900">{initiative.name}</h4>
                                                <span className={`text-xs font-medium px-2 py-1 rounded-full ${initiative.status === 'ahead' ? 'bg-green-100 text-green-700' :
                                                    initiative.status === 'on-track' ? 'bg-blue-100 text-blue-700' :
                                                        initiative.status === 'at-risk' ? 'bg-amber-100 text-amber-700' :
                                                            'bg-red-100 text-red-700'
                                                    }`}>
                                                    {initiative.status}
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                                                <div
                                                    className={`h-2 rounded-full ${initiative.status === 'ahead' ? 'bg-green-500' :
                                                        initiative.status === 'on-track' ? 'bg-blue-500' :
                                                            initiative.status === 'at-risk' ? 'bg-amber-500' :
                                                                'bg-red-500'
                                                        }`}
                                                    style={{ width: `${initiative.progress}%` }}
                                                />
                                            </div>
                                            <div className="flex items-center justify-between text-xs text-gray-500">
                                                <span>{initiative.progress}% complete</span>
                                                <span>Impact: {initiative.impact}</span>
                                                <span>Due: {initiative.dueDate}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Competitor Benchmarking */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-white rounded-xl shadow-sm p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                        <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                                        Competitive Position
                                    </h3>
                                    <div className="space-y-3">
                                        {[
                                            { metric: 'Market Share', us: 18.5, competitor: 22.3, trend: 'up' },
                                            { metric: 'Revenue Growth', us: 6.7, competitor: 5.2, trend: 'up' },
                                            { metric: 'Operating Margin', us: 28.5, competitor: 31.2, trend: 'down' },
                                            { metric: 'Customer Satisfaction', us: 68, competitor: 72, trend: 'down' },
                                            { metric: 'Innovation Index', us: 7.8, competitor: 6.9, trend: 'up' }
                                        ].map((item, idx) => (
                                            <div key={idx} className="flex items-center justify-between">
                                                <span className="text-sm text-gray-700">{item.metric}</span>
                                                <div className="flex items-center space-x-3">
                                                    <span className={`text-sm font-medium ${item.us > item.competitor ? 'text-green-600' : 'text-red-600'
                                                        }`}>
                                                        {item.us}%
                                                    </span>
                                                    <span className="text-xs text-gray-500">vs</span>
                                                    <span className="text-sm text-gray-600">{item.competitor}%</span>
                                                    {item.trend === 'up' ?
                                                        <TrendingUp className="w-3 h-3 text-green-500" /> :
                                                        <TrendingDown className="w-3 h-3 text-red-500" />
                                                    }
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl shadow-sm p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                        <Users className="w-5 h-5 mr-2 text-blue-600" />
                                        Talent & Culture
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="text-center">
                                            <p className="text-2xl font-bold text-gray-900">94%</p>
                                            <p className="text-xs text-gray-500">Employee Engagement</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-2xl font-bold text-gray-900">12%</p>
                                            <p className="text-xs text-gray-500">Attrition Rate</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-2xl font-bold text-gray-900">87</p>
                                            <p className="text-xs text-gray-500">eNPS Score</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-2xl font-bold text-gray-900">78%</p>
                                            <p className="text-xs text-gray-500">Leadership Pipeline</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-4 border-t">
                                        <p className="text-xs text-gray-600">
                                            <span className="font-medium">Key Risk:</span> Technical talent retention in EV division
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* External Market Conditions */}
                            <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl shadow-sm p-6 border border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                    <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                                    Market & Economic Indicators
                                </h3>
                                <div className="grid grid-cols-4 gap-4">
                                    <div className="bg-white rounded-lg p-3 border border-gray-100">
                                        <p className="text-xs text-gray-500 mb-1">GDP Growth</p>
                                        <p className="text-lg font-bold text-gray-900">2.8%</p>
                                        <p className="text-xs text-green-600">↑ 0.3pp</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border border-gray-100">
                                        <p className="text-xs text-gray-500 mb-1">Interest Rate</p>
                                        <p className="text-lg font-bold text-gray-900">5.25%</p>
                                        <p className="text-xs text-gray-600">Stable</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border border-gray-100">
                                        <p className="text-xs text-gray-500 mb-1">Oil Price</p>
                                        <p className="text-lg font-bold text-gray-900">$82/bbl</p>
                                        <p className="text-xs text-red-600">↑ 8%</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 border border-gray-100">
                                        <p className="text-xs text-gray-500 mb-1">Consumer Confidence</p>
                                        <p className="text-lg font-bold text-gray-900">98.7</p>
                                        <p className="text-xs text-red-600">↓ 2.1</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Enhanced Modal for Insight Details */}
            <AnimatePresence>
                {showModal && selectedInsight && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
                        >
                            {/* Modal Header */}
                            <div className="bg-gradient-to-r from-gray-50 to-white border-b px-6 py-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">{selectedInsight.title}</h2>
                                        <p className="text-sm text-gray-500">{selectedInsight.category} Analysis</p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                            onClick={() => {/* Full screen logic */ }}
                                        >
                                            <Maximize2 className="w-5 h-5 text-gray-500" />
                                        </button>
                                        <button
                                            onClick={() => setShowModal(false)}
                                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                        >
                                            <X className="w-5 h-5 text-gray-500" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Body */}
                            <div className="px-6 py-4 overflow-y-auto max-h-[calc(90vh-200px)]">
                                {/* Performance Overview */}
                                <div className="grid grid-cols-3 gap-4 mb-6">
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <p className="text-sm text-gray-600 mb-1">Current</p>
                                        <p className="text-3xl font-bold text-gray-900">{selectedInsight.metric}</p>
                                        <p className={`text-sm font-medium mt-2 ${selectedInsight.change > 0 ? 'text-green-600' : 'text-red-600'
                                            }`}>
                                            {selectedInsight.change > 0 ? '+' : ''}{selectedInsight.change}% MTD
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <p className="text-sm text-gray-600 mb-1">Forecast</p>
                                        <p className="text-3xl font-bold text-gray-900">
                                            {selectedInsight.category === 'Volume' ? '2.5M' :
                                                selectedInsight.category === 'Profitability' ? '27.2%' :
                                                    selectedInsight.category === 'Manufacturing' ? '95.1%' :
                                                        selectedInsight.category === 'Customer' ? '72' :
                                                            selectedInsight.category === 'Working Capital' ? '$138M' :
                                                                '48%'}
                                        </p>
                                        <p className="text-sm text-gray-500 mt-2">End of quarter</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <p className="text-sm text-gray-600 mb-1">vs Target</p>
                                        <p className="text-3xl font-bold text-gray-900">
                                            {selectedInsight.change > 0 ? '+' : ''}{(selectedInsight.change * 0.8).toFixed(1)}%
                                        </p>
                                        <p className="text-sm text-gray-500 mt-2">Performance gap</p>
                                    </div>
                                </div>

                                {/* Key Drivers */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Performance Drivers</h3>
                                    <div className="space-y-2">
                                        {selectedInsight.drivers.map((driver: string, idx: number) => (
                                            <div key={idx} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                                <div className={`w-2 h-2 rounded-full ${idx === 0 ? 'bg-green-500' : idx === 1 ? 'bg-amber-500' : 'bg-blue-500'
                                                    }`} />
                                                <span className="text-sm font-medium text-gray-700">{driver}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Related Metrics */}
                                {selectedInsight.relatedMetrics && (
                                    <div className="mb-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Related Metrics</h3>
                                        <div className="grid grid-cols-3 gap-3">
                                            {Object.entries(selectedInsight.relatedMetrics).map(([key, value]) => (
                                                <div key={key} className="bg-gray-50 rounded-lg p-3">
                                                    <p className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                                                    <p className="text-sm font-bold text-gray-900 mt-1">{String(value)}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Detailed Chart */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Trend Analysis</h3>
                                    <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                                        <p className="text-gray-500">Interactive {selectedInsight.category} Chart</p>
                                    </div>
                                </div>

                                {/* Recommended Actions */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Recommended Actions</h3>
                                    <div className="space-y-3">
                                        {selectedInsight.actions.map((action: string, idx: number) => (
                                            <div key={idx} className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                                                    {idx + 1}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-gray-900">{action}</p>
                                                    <p className="text-xs text-gray-600 mt-1">
                                                        Priority: {idx === 0 ? 'Immediate' : idx === 1 ? 'High' : 'Medium'}
                                                    </p>
                                                </div>
                                                <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                                                    Assign →
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="bg-gray-50 px-6 py-4 border-t flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                        Export Analysis
                                    </button>
                                    <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                        Schedule Review
                                    </button>
                                </div>
                                <button
                                    onClick={() => {
                                        setShowModal(false);
                                        router.push('/business-consoles');
                                    }}
                                    className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                                >
                                    <span>Deep Dive Analysis</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Upcoming Reviews Modal */}
            <AnimatePresence>
                {showUpcomingReviews && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                        onClick={() => setShowUpcomingReviews(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full"
                        >
                            {/* Modal Header */}
                            <div className="bg-navy-gradient rounded-t-2xl px-6 py-4 border-b border-cyan-500/30">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-bold text-white flex items-center">
                                        <Calendar className="w-5 h-5 mr-2 text-cyan-400" />
                                        Upcoming Reviews
                                    </h2>
                                    <button
                                        onClick={() => setShowUpcomingReviews(false)}
                                        className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                                    >
                                        <X className="w-5 h-5 text-white" />
                                    </button>
                                </div>
                            </div>

                            {/* Modal Body */}
                            <div className="p-6">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                                        <div>
                                            <p className="text-base font-semibold text-navy-900">Board Meeting</p>
                                            <p className="text-sm text-gray-600">Oct 28, 2:00 PM</p>
                                        </div>
                                        <button className="text-sm font-medium text-cyan-600 hover:text-cyan-700 flex items-center">
                                            Prep Materials
                                            <ArrowRight className="w-4 h-4 ml-1" />
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                                        <div>
                                            <p className="text-base font-semibold text-navy-900">Investor Call</p>
                                            <p className="text-sm text-gray-600">Oct 30, 9:00 AM</p>
                                        </div>
                                        <button className="text-sm font-medium text-cyan-600 hover:text-cyan-700 flex items-center">
                                            View Script
                                            <ArrowRight className="w-4 h-4 ml-1" />
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                                        <div>
                                            <p className="text-base font-semibold text-navy-900">Strategy Review</p>
                                            <p className="text-sm text-gray-600">Nov 2, 1:00 PM</p>
                                        </div>
                                        <button className="text-sm font-medium text-cyan-600 hover:text-cyan-700 flex items-center">
                                            Agenda
                                            <ArrowRight className="w-4 h-4 ml-1" />
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <button
                                        onClick={() => setShowUpcomingReviews(false)}
                                        className="w-full px-4 py-2 bg-cyan-gradient text-navy-900 rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all border border-cyan-500 font-medium"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
} 