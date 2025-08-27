export const consoleCategories = {
    market: {
        id: 'market',
        name: 'Market & Competition',
        description: 'Market share, competitive positioning, and industry trends',
        color: 'blue',
        gradient: 'from-blue-500 to-blue-600'
    },
    portfolio: {
        id: 'portfolio',
        name: 'Product Portfolio',
        description: 'Vehicle mix, segment performance, and product lifecycle',
        color: 'purple',
        gradient: 'from-purple-500 to-purple-600'
    },
    sales: {
        id: 'sales',
        name: 'Sales Performance',
        description: 'Regional sales, dealer network, and channel performance',
        color: 'green',
        gradient: 'from-green-500 to-green-600'
    },
    operations: {
        id: 'operations',
        name: 'Operations',
        description: 'Manufacturing, supply chain, and quality metrics',
        color: 'orange',
        gradient: 'from-orange-500 to-orange-600'
    },
    financial: {
        id: 'financial',
        name: 'Financial',
        description: 'Revenue, profitability, and cost management',
        color: 'indigo',
        gradient: 'from-indigo-500 to-indigo-600'
    },
    sustainability: {
        id: 'sustainability',
        name: 'Sustainability',
        description: 'Environmental impact, EV transition, and ESG metrics',
        color: 'emerald',
        gradient: 'from-emerald-500 to-emerald-600'
    }
};

export const automotiveBusinessDimensions = [
    {
        id: 'market-share',
        name: 'Market Share Analysis',
        category: 'market',
        description: 'Track market share by segment, region, and competitor',
        metrics: ['Market Share %', 'YoY Growth', 'Segment Performance'],
        status: 'active',
        lastUpdated: '2024-01-15',
        icon: 'Globe'
    },
    {
        id: 'competitive-intelligence',
        name: 'Competitive Intelligence',
        category: 'market',
        description: 'Monitor competitor pricing, features, and market positioning',
        metrics: ['Price Index', 'Feature Comparison', 'Brand Perception'],
        status: 'active',
        lastUpdated: '2024-01-14',
        icon: 'Target'
    },
    {
        id: 'product-mix',
        name: 'Product Mix Optimization',
        category: 'portfolio',
        description: 'Analyze vehicle mix by segment, powertrain, and trim level',
        metrics: ['Mix %', 'ATP', 'Margin Contribution'],
        status: 'active',
        lastUpdated: '2024-01-15',
        icon: 'Package'
    },
    {
        id: 'lifecycle-management',
        name: 'Product Lifecycle Management',
        category: 'portfolio',
        description: 'Track product performance through lifecycle stages',
        metrics: ['Sales Velocity', 'Inventory Age', 'Refresh Timing'],
        status: 'active',
        lastUpdated: '2024-01-13',
        icon: 'TrendingUp'
    },
    {
        id: 'regional-sales',
        name: 'Regional Sales Performance',
        category: 'sales',
        description: 'Sales analysis by region, dealer, and channel',
        metrics: ['Units Sold', 'Revenue', 'Days to Turn'],
        status: 'active',
        lastUpdated: '2024-01-15',
        icon: 'BarChart3'
    },
    {
        id: 'customer-analytics',
        name: 'Customer Analytics',
        category: 'sales',
        description: 'Customer demographics, preferences, and journey analysis',
        metrics: ['Conversion Rate', 'Lead Time', 'Customer LTV'],
        status: 'active',
        lastUpdated: '2024-01-14',
        icon: 'TrendingUp'
    },
    {
        id: 'manufacturing-efficiency',
        name: 'Manufacturing Efficiency',
        category: 'operations',
        description: 'Production metrics, capacity utilization, and efficiency',
        metrics: ['OEE', 'Throughput', 'Quality Rate'],
        status: 'active',
        lastUpdated: '2024-01-15',
        icon: 'Factory'
    },
    {
        id: 'supply-chain',
        name: 'Supply Chain Performance',
        category: 'operations',
        description: 'Supplier performance, inventory levels, and logistics',
        metrics: ['On-Time Delivery', 'Inventory Turns', 'Cost per Unit'],
        status: 'active',
        lastUpdated: '2024-01-14',
        icon: 'Truck'
    },
    {
        id: 'service-quality',
        name: 'Service & Quality',
        category: 'operations',
        description: 'Service metrics, warranty claims, and quality indicators',
        metrics: ['First Time Fix', 'Warranty Cost', 'Customer Satisfaction'],
        status: 'active',
        lastUpdated: '2024-01-15',
        icon: 'Wrench'
    },
    {
        id: 'profitability',
        name: 'Profitability Analysis',
        category: 'financial',
        description: 'Margin analysis by product, channel, and region',
        metrics: ['Gross Margin', 'EBITDA', 'Cost Structure'],
        status: 'active',
        lastUpdated: '2024-01-15',
        icon: 'DollarSign'
    },
    {
        id: 'working-capital',
        name: 'Working Capital Management',
        category: 'financial',
        description: 'Cash flow, receivables, and inventory management',
        metrics: ['DSO', 'DPO', 'Cash Conversion Cycle'],
        status: 'active',
        lastUpdated: '2024-01-14',
        icon: 'TrendingDown'
    },
    {
        id: 'ev-transition',
        name: 'EV Transition Tracking',
        category: 'sustainability',
        description: 'Electric vehicle adoption and infrastructure readiness',
        metrics: ['EV Mix %', 'Charging Infrastructure', 'Battery Costs'],
        status: 'active',
        lastUpdated: '2024-01-15',
        icon: 'Smartphone'
    },
    {
        id: 'carbon-footprint',
        name: 'Carbon Footprint',
        category: 'sustainability',
        description: 'Emissions tracking and reduction initiatives',
        metrics: ['CO2 per Vehicle', 'Renewable Energy %', 'Scope 1-3 Emissions'],
        status: 'active',
        lastUpdated: '2024-01-14',
        icon: 'Leaf'
    },
    {
        id: 'market-demand',
        name: 'Market Demand Analytics',
        category: 'market',
        description: 'Predictive demand modeling and trend analysis',
        metrics: ['Demand Forecast', 'Inventory Risk', 'Market Trends'],
        status: 'active',
        lastUpdated: '2024-01-15',
        icon: 'Globe'
    }
]; 