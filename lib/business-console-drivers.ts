import { BarChart3, Building, DollarSign, Factory, Globe, Package, Shield, Target, TrendingUp, Truck } from 'lucide-react';

export interface KeyDriver {
    name: string;
    subDrivers?: string[];
}

export interface BusinessConsole {
    id: string;
    title: string;
    objective: string;
    description: string;
    icon: any;
    bgColor: string;
    iconColor: string;
    borderColor: string;
    metrics: { label: string; value: string; change: number; trend: 'up' | 'down' | 'stable' }[];
    status: 'View Console' | 'Coming Soon';
    keyDrivers: KeyDriver[];
}

export const businessConsoles: BusinessConsole[] = [
    {
        id: 'market-demand',
        title: 'Market & Demand',
        objective: 'Understand the market and demand for products which, in turn, informs the portfolio and pricing strategies to achieve volume and market share objectives.',
        description: 'Analyzes market strategy, EV adoption, consumer demand patterns, government incentives, trade regulations, and strategic partnerships to drive market share and segment growth',
        icon: Globe,
        bgColor: 'bg-purple-50',
        iconColor: 'text-purple-700',
        borderColor: 'border-purple-200',
        metrics: [
            { label: 'Market Share', value: '18.5%', change: 0.8, trend: 'up' },
            { label: 'Segment Growth', value: '8.5%', change: 2.1, trend: 'up' }
        ],
        status: 'View Console',
        keyDrivers: [
            {
                name: 'Market Strategy',
                subDrivers: [
                    'Manufacturer, Brand, Product Line and Category Growth Strategies (Wholesale and Retail)',
                    'Market Share Strategy',
                    'Target Market',
                    'Incentives',
                    'VIO',
                    'Parts Sales Growth',
                    'Parts Channel Strategy',
                    'Subscriptions'
                ]
            },
            {
                name: 'EV Strategy',
                subDrivers: [
                    'Consumer Garage Charger',
                    'TAM',
                    'Adoption Curve',
                    'Charging Network Infrastructure'
                ]
            },
            {
                name: 'Consumer Demand',
                subDrivers: [
                    'Vehicles inc. New Trends, Preferences, and Tech',
                    'Consumer Vehicle Preference',
                    'Warranty',
                    'Regional Demand',
                    'Seasonality',
                    'Parts Channels',
                    'Advertising & GTM Strategy'
                ]
            },
            {
                name: 'Government Incentives / Penalties',
                subDrivers: [
                    'GHG/IRA Incentives',
                    'Credits'
                ]
            },
            {
                name: 'Trade & Regulatory',
                subDrivers: [
                    'Tariffs',
                    'Recalls'
                ]
            },
            {
                name: 'Strategic Partnerships',
                subDrivers: [
                    'Co-branded Features',
                    'Partner Manufacturers',
                    '3PL Product Development',
                    'Manufacturer'
                ]
            }
        ]
    },
    {
        id: 'product-mix',
        title: 'Product Mix',
        objective: 'Understand the market and demand for products which, in turn, informs the portfolio and pricing strategies to achieve volume and market share objectives.',
        description: 'Optimizes product portfolio strategy across EV/ICE divisions, manages vehicle launches, tracks volume contributions, and aligns annual planning with market demands',
        icon: Package,
        bgColor: 'bg-purple-50',
        iconColor: 'text-purple-700',
        borderColor: 'border-purple-200',
        metrics: [
            { label: 'Model Mix %', value: '42%', change: 2.1, trend: 'up' },
            { label: 'Launch Success Rate', value: '87%', change: 5.2, trend: 'up' }
        ],
        status: 'Coming Soon',
        keyDrivers: [
            {
                name: 'Product Portfolio Strategy',
                subDrivers: [
                    'EV',
                    'ICE',
                    'Marketing Division, Brand, Nameplate and Trim Portfolio Strategies',
                    'Parts + CPC (Product code for Sales Orders)',
                    'Regulations'
                ]
            },
            {
                name: 'Product Development',
                subDrivers: [
                    'New, Tophat and Minor Program Vehicle Launches',
                    'Volume Contribution of Launched Vehicles (New, Tophat, Minor)',
                    'Annual Volume Plan',
                    'Monthly Forecasting',
                    'US SAAR'
                ]
            }
        ]
    },
    {
        id: 'volume',
        title: 'Volume',
        objective: 'Understand the market and demand for products which, in turn, informs the portfolio and pricing strategies to achieve volume and market share objectives.',
        description: 'Manages long-term volume planning, monitors total vehicle sales, tracks fleet vs retail performance, and coordinates 3rd party sales and subscription volumes',
        icon: TrendingUp,
        bgColor: 'bg-emerald-50',
        iconColor: 'text-emerald-700',
        borderColor: 'border-emerald-200',
        metrics: [
            { label: 'Production Volume', value: '2.8M', change: 8.5, trend: 'up' },
            { label: 'Capacity Utilization', value: '87.5%', change: 3.2, trend: 'up' }
        ],
        status: 'Coming Soon',
        keyDrivers: [
            {
                name: 'Long Term Volume Planning',
                subDrivers: [
                    'Total Vehicle Sales',
                    '3rd Party Sales (i.e. Partner Manufacturers)',
                    'Fleet Sales',
                    'Retail / Non-Fleet Sales',
                    'Subscription Volumes'
                ]
            },
            {
                name: 'Sales Volume',
                subDrivers: []
            },
            {
                name: 'CCA Parts Volume',
                subDrivers: []
            }
        ]
    },
    {
        id: 'pricing',
        title: 'Pricing',
        objective: 'Understand the market and demand for products which, in turn, informs the portfolio and pricing strategies to achieve volume and market share objectives.',
        description: 'Drives vehicle pricing strategy, manages dealer programs and incentives, monitors trade regulations, oversees subscription models, and optimizes parts pricing dynamics',
        icon: DollarSign,
        bgColor: 'bg-amber-50',
        iconColor: 'text-amber-700',
        borderColor: 'border-amber-200',
        metrics: [
            { label: 'Avg Transaction Price', value: '$48.5K', change: 3.2, trend: 'up' },
            { label: 'Revenue per Unit', value: '$3.2K', change: 5.1, trend: 'up' }
        ],
        status: 'Coming Soon',
        keyDrivers: [
            {
                name: 'Vehicle Pricing',
                subDrivers: [
                    'Nameplate and Trim Pricing (Ownership & Lease)',
                    'Option (Beyond Trim)',
                    'Dealer Markup',
                    'Competitor Benchmarking',
                    'Sale Price of End-of-Lease Vehicles'
                ]
            },
            {
                name: 'Manufacturer & Dealer Programs',
                subDrivers: ['Incentives']
            },
            {
                name: 'Trade & Regulatory',
                subDrivers: ['Tariffs', 'Customs']
            },
            {
                name: 'Strategic Partnerships',
                subDrivers: []
            },
            {
                name: 'Subscription',
                subDrivers: ['Factory Pre-Paid', 'Recurring']
            },
            {
                name: 'CCA Parts',
                subDrivers: ['Parts Segmentation', 'Dynamic Pricing', 'Engineering Change Notice']
            },
            {
                name: 'Currency & FX',
                subDrivers: []
            },
            {
                name: 'Energy Solutions (Consumer Charging)',
                subDrivers: []
            }
        ]
    },
    {
        id: 'product-line-profitability',
        title: 'Product Line Profitability',
        objective: 'Manage operational performance by tracking efficiency and controlling costs to improve product profitability.',
        description: 'Tracks product line P&L performance, analyzes variable and fixed costs, manages CCA profitability, and identifies opportunities to improve contribution margins',
        icon: DollarSign,
        bgColor: 'bg-green-50',
        iconColor: 'text-green-700',
        borderColor: 'border-green-200',
        metrics: [
            { label: 'EBIT Margin', value: '12.5%', change: -0.8, trend: 'down' },
            { label: 'Contribution Margin', value: '28.3%', change: 1.2, trend: 'up' }
        ],
        status: 'Coming Soon',
        keyDrivers: [
            {
                name: 'Final Net Sale',
                subDrivers: []
            },
            {
                name: 'Variable Costs',
                subDrivers: []
            },
            {
                name: 'Allocated Structural Cost* (Fixed Cost)',
                subDrivers: []
            },
            {
                name: 'CCA',
                subDrivers: [
                    'Net Sales',
                    'Variable Costs',
                    'Controllable Structural Costs',
                    'Allocated Structural Costs*'
                ]
            }
        ]
    },
    {
        id: 'adjacencies',
        title: 'Adjacencies',
        objective: 'Manage operational performance by tracking efficiency and controlling costs to improve product profitability.',
        description: 'Explores software & services opportunities, manages subscription revenue streams, tracks variable costs, and develops new business models beyond traditional vehicle sales',
        icon: BarChart3,
        bgColor: 'bg-indigo-50',
        iconColor: 'text-indigo-700',
        borderColor: 'border-indigo-200',
        metrics: [
            { label: 'Service Revenue', value: '$3.2B', change: 28, trend: 'up' },
            { label: 'Attach Rate', value: '42%', change: 8.5, trend: 'up' }
        ],
        status: 'Coming Soon',
        keyDrivers: [
            {
                name: 'Software & Services',
                subDrivers: [
                    'Subscription Revenue',
                    'Variable Costs',
                    'Allocated Structural Costs*'
                ]
            }
        ]
    },
    {
        id: 'production-build-plan',
        title: 'Production Build Plan',
        objective: 'Manage operational performance by tracking efficiency and controlling costs to improve product profitability.',
        description: 'Manages manufacturing efficiency, coordinates MTO/MTS strategies, minimizes plant downtime, optimizes production volumes, and tracks supplier performance metrics',
        icon: Factory,
        bgColor: 'bg-orange-50',
        iconColor: 'text-orange-700',
        borderColor: 'border-orange-200',
        metrics: [
            { label: 'Plan Attainment', value: '94%', change: -2.3, trend: 'down' },
            { label: 'Build to Schedule', value: '88%', change: 1.5, trend: 'up' }
        ],
        status: 'Coming Soon',
        keyDrivers: [
            {
                name: 'Manufacturing Efficiency',
                subDrivers: [
                    'MTO Retail and Fleet',
                    'MTS Retail and Fleet',
                    'Plant Downtime',
                    'Planned Production Volume',
                    'SPQRCE*'
                ]
            },
            {
                name: 'Budget Management',
                subDrivers: []
            },
            {
                name: 'Supplier Performance',
                subDrivers: []
            }
        ]
    },
    {
        id: 'inventory',
        title: 'Inventory',
        objective: 'Manage operational performance by tracking efficiency and controlling costs to improve product profitability.',
        description: 'Optimizes vehicle inventory across yards and dealers, manages quality holds, tracks parts distribution, and balances working capital requirements with market demand',
        icon: Truck,
        bgColor: 'bg-teal-50',
        iconColor: 'text-teal-700',
        borderColor: 'border-teal-200',
        metrics: [
            { label: 'Days of Supply', value: '45', change: 5, trend: 'up' },
            { label: 'Inventory Turns', value: '8.2x', change: -0.5, trend: 'down' }
        ],
        status: 'Coming Soon',
        keyDrivers: [
            {
                name: 'Vehicle Inventory',
                subDrivers: [
                    'Yard',
                    'Holds (Quality / Maintenance Process)',
                    'Company Stock*',
                    'Domestic Dealer',
                    'International Dealer',
                    'Company Vehicle'
                ]
            },
            {
                name: 'Parts Inventory',
                subDrivers: ['Distribution Centers']
            }
        ]
    },
    {
        id: 'consolidated-results-expectations',
        title: 'Consolidated Results & Expectations',
        objective: 'Understand and enhance financial performance through execution of capital framework.',
        description: 'Consolidates top-level financials, manages shareholder returns, tracks currency and FX impacts, and provides executive-level financial performance visibility',
        icon: DollarSign,
        bgColor: 'bg-blue-50',
        iconColor: 'text-blue-700',
        borderColor: 'border-blue-200',
        metrics: [
            { label: 'Revenue', value: '$42.5B', change: 8.5, trend: 'up' },
            { label: 'EBIT', value: '$5.3B', change: -2.1, trend: 'down' }
        ],
        status: 'Coming Soon',
        keyDrivers: [
            {
                name: 'Top Level Financials',
                subDrivers: ['Royalties / Other']
            },
            {
                name: 'Shareholder Returns',
                subDrivers: []
            },
            {
                name: 'Currency & FX',
                subDrivers: []
            }
        ]
    },
    {
        id: 'capital-allocation-management',
        title: 'Capital Allocation / Management',
        objective: 'Understand and enhance financial performance through execution of capital framework.',
        description: 'Executes strategic capital decisions, manages treasury operations, oversees investment allocation, monitors debt and liquidity, and optimizes working capital deployment',
        icon: Building,
        bgColor: 'bg-violet-50',
        iconColor: 'text-violet-700',
        borderColor: 'border-violet-200',
        metrics: [
            { label: 'ROIC', value: '15.2%', change: 1.8, trend: 'up' },
            { label: 'Free Cash Flow', value: '$8.2B', change: 15, trend: 'up' }
        ],
        status: 'Coming Soon',
        keyDrivers: [
            {
                name: 'Strategic Execution',
                subDrivers: []
            },
            {
                name: 'Treasury',
                subDrivers: [
                    'Investment Allocation',
                    'Capital Expenditures',
                    'Cash Holdings',
                    'Credit Management',
                    'Cost of Capital',
                    'Debt Management',
                    'Interest',
                    'Pension',
                    'Cash Flow Management',
                    'Working Capital Management',
                    'Liquidity Management'
                ]
            }
        ]
    },
    {
        id: 'compliance',
        title: 'Compliance',
        objective: 'Control risk by actively monitoring compliance with regulations (national & local) and standards (internal & industry).',
        description: 'Ensures environmental and regulatory compliance, manages financial audits, oversees data privacy, maintains quality standards, and coordinates cybersecurity initiatives',
        icon: Shield,
        bgColor: 'bg-red-50',
        iconColor: 'text-red-700',
        borderColor: 'border-red-200',
        metrics: [
            { label: 'Compliance Score', value: '98%', change: 2, trend: 'up' },
            { label: 'Open Issues', value: '12', change: -25, trend: 'down' }
        ],
        status: 'Coming Soon',
        keyDrivers: [
            {
                name: 'Environmental',
                subDrivers: ['Environmental Standards', 'Emission Compliance*']
            },
            {
                name: 'Regulatory',
                subDrivers: [
                    'Federal & State Regulations',
                    'Localization & Homologation',
                    'Labor Law Compliance',
                    'Local Warranty Regulations'
                ]
            },
            {
                name: 'Financial Compliance',
                subDrivers: ['Tax', 'Financial/Statutory Audit', 'Tariffs / Customs']
            },
            {
                name: 'Data Privacy & Consent',
                subDrivers: ['Warranty Accruals']
            },
            {
                name: 'Quality',
                subDrivers: ['Operations Audit Readiness']
            },
            {
                name: 'Cybersecurity',
                subDrivers: []
            },
            {
                name: 'Supply Base',
                subDrivers: []
            },
            {
                name: 'Reputation',
                subDrivers: []
            },
            {
                name: 'Macro driven Factors',
                subDrivers: []
            }
        ]
    },
    {
        id: 'risk',
        title: 'Risk',
        objective: 'Control risk by actively monitoring compliance with regulations (national & local) and standards (internal & industry).',
        description: 'Identifies and assesses enterprise risks, develops mitigation strategies, monitors risk indicators, and maintains risk management frameworks across the organization',
        icon: Shield,
        bgColor: 'bg-slate-50',
        iconColor: 'text-slate-700',
        borderColor: 'border-slate-200',
        metrics: [
            { label: 'Risk Score', value: 'Low', change: 0, trend: 'stable' },
            { label: 'Mitigation Rate', value: '85%', change: 5, trend: 'up' }
        ],
        status: 'Coming Soon',
        keyDrivers: [] // Risk management framework to be defined
    },
    {
        id: 'sensitivities',
        title: 'Sensitivities',
        objective: 'Control risk by actively monitoring compliance with regulations (national & local) and standards (internal & industry).',
        description: 'Analyzes market sensitivities, performs scenario planning, monitors macro-economic factors, and evaluates potential impacts on business performance and strategy',
        icon: Shield,
        bgColor: 'bg-orange-50',
        iconColor: 'text-orange-700',
        borderColor: 'border-orange-200',
        metrics: [
            { label: 'Risk Exposure', value: 'Medium', change: -15, trend: 'down' },
            { label: 'Scenarios Analyzed', value: '24', change: 20, trend: 'up' }
        ],
        status: 'Coming Soon',
        keyDrivers: [] // Sensitivities framework to be defined based on Risk & Compliance image
    },
    {
        id: 'competitors',
        title: 'Competitors',
        objective: 'Control risk by actively monitoring compliance with regulations (national & local) and standards (internal & industry).',
        description: 'Tracks competitor financials, analyzes market positioning, monitors competitive dynamics, and provides strategic intelligence for decision-making',
        icon: Target,
        bgColor: 'bg-rose-50',
        iconColor: 'text-rose-700',
        borderColor: 'border-rose-200',
        metrics: [
            { label: 'Market Position', value: '#3', change: 0, trend: 'stable' },
            { label: 'Gap to Leader', value: '3.2%', change: -0.5, trend: 'down' }
        ],
        status: 'Coming Soon',
        keyDrivers: [
            {
                name: 'Competitor Financials',
                subDrivers: []
            }
        ]
    }
]; 