// Report Hub Data Generation
import {
    Building,
    DollarSign,
    Package,
    Shield,
    Star,
    TrendingUp,
    Users,
    Zap
} from 'lucide-react';

// Report categories with subcategories
export const reportCategories = [
    {
        id: 'all',
        name: 'All Reports',
        count: 600,
        description: 'Browse all available reports'
    },
    {
        id: 'financial',
        name: 'Financial',
        icon: DollarSign,
        count: 142,
        subcategories: ['P&L Analysis', 'Balance Sheet', 'Cash Flow', 'Budgets', 'Forecasts', 'Cost Analysis', 'Revenue Analysis', 'Working Capital']
    },
    {
        id: 'operational',
        name: 'Operational',
        icon: Building,
        count: 98,
        subcategories: ['Manufacturing', 'Quality', 'Inventory', 'Logistics', 'Facilities', 'Maintenance', 'Production Planning']
    },
    {
        id: 'sales-marketing',
        name: 'Sales & Marketing',
        icon: TrendingUp,
        count: 87,
        subcategories: ['Pipeline', 'Bookings', 'Customer Analysis', 'Campaign Performance', 'Market Share', 'Pricing Analysis', 'Channel Performance']
    },
    {
        id: 'hr-people',
        name: 'HR & People',
        icon: Users,
        count: 65,
        subcategories: ['Headcount', 'Compensation', 'Performance', 'Recruiting', 'Retention', 'Training', 'Employee Satisfaction']
    },
    {
        id: 'supply-chain',
        name: 'Supply Chain',
        icon: Package,
        count: 78,
        subcategories: ['Procurement', 'Vendor Performance', 'Logistics', 'Inventory Optimization', 'Demand Planning', 'Network Analysis']
    },
    {
        id: 'compliance-risk',
        name: 'Compliance & Risk',
        icon: Shield,
        count: 45,
        subcategories: ['Regulatory', 'Audit', 'Risk Assessment', 'Controls', 'Policy Compliance', 'Security']
    },
    {
        id: 'executive',
        name: 'Executive',
        icon: Star,
        count: 35,
        subcategories: ['Board Reports', 'Strategic KPIs', 'Executive Dashboards', 'Investor Relations', 'Quarterly Reviews']
    },
    {
        id: 'custom',
        name: 'Custom & Ad-hoc',
        icon: Zap,
        count: 50,
        subcategories: ['Special Projects', 'One-time Analysis', 'Custom Dashboards', 'Data Exploration']
    }
];

// Report formats
const formats = ['PowerBI', 'Tableau', 'Excel', 'Google Sheets', 'Looker', 'Salesforce', 'SAP Analytics', 'Qlik', 'Custom Dashboard'];

// Departments
const departments = [
    'Finance', 'FP&A', 'Operations', 'Sales', 'Marketing', 'HR', 'IT', 'Supply Chain',
    'Legal', 'Executive Office', 'Treasury', 'Tax', 'Internal Audit', 'Strategy',
    'Product', 'Engineering', 'Customer Success', 'Procurement', 'Quality', 'Manufacturing'
];

// Report owners
const owners = [
    'Sarah Chen', 'Michael Torres', 'Lisa Wang', 'James Wilson', 'Amanda Foster',
    'David Kim', 'Rachel Green', 'John Smith', 'Emma Davis', 'Robert Johnson',
    'Maria Garcia', 'William Brown', 'Jennifer Lee', 'Daniel Martinez', 'Jessica Taylor',
    'Christopher Anderson', 'Michelle Thompson', 'Kevin White', 'Laura Harris', 'Brian Clark'
];

// Frequencies
const frequencies = ['Real-time', 'Hourly', 'Daily', 'Weekly', 'Bi-weekly', 'Monthly', 'Quarterly', 'Annual', 'On-demand'];

// Tags pool
const tagPool = [
    // Financial
    'P&L', 'Balance Sheet', 'Cash Flow', 'Revenue', 'Costs', 'Margins', 'EBITDA', 'Working Capital',
    'Budget Variance', 'Forecast Accuracy', 'Profitability', 'ROI', 'Cash Conversion', 'DSO', 'DPO',

    // Operational
    'KPI', 'OEE', 'Quality', 'Efficiency', 'Productivity', 'Capacity', 'Utilization', 'Cycle Time',
    'Defect Rate', 'On-time Delivery', 'Lead Time', 'Throughput', 'Yield', 'Downtime',

    // Sales & Marketing
    'Pipeline', 'Conversion', 'Win Rate', 'Deal Size', 'Sales Velocity', 'Customer Acquisition',
    'Churn', 'LTV', 'CAC', 'Market Share', 'Brand Performance', 'Campaign ROI', 'Lead Generation',

    // HR
    'Headcount', 'Turnover', 'Recruitment', 'Compensation', 'Benefits', 'Performance Review',
    'Training Hours', 'Employee Satisfaction', 'Diversity', 'Succession Planning',

    // Supply Chain
    'Inventory Turns', 'Stock Out', 'Supplier Performance', 'Logistics Cost', 'Perfect Order',
    'Demand Forecast', 'Supply Planning', 'Network Optimization', 'Warehouse Efficiency',

    // General
    'Executive', 'Strategic', 'Tactical', 'Operational', 'Compliance', 'Risk', 'Audit',
    'Performance', 'Trending', 'Predictive', 'Historical', 'Real-time', 'Interactive'
];

// AI Insights templates
const aiInsightTemplates = [
    'Most viewed report - {viewPercentage}% of {userGroup} access {frequency}',
    'Trending up - {increase}% more views this {period}',
    'Critical for {meeting} - {usage}% usage rate',
    'Saves {hours} hours of manual work per {period}',
    'Identified ${amount}K in {opportunity} opportunities last {period}',
    'Key driver for {metric} decisions - influences {percentage}% of actions',
    'Automated {percentage}% of previous manual reporting',
    '{userCount} users rely on this for daily decisions',
    'Reduced reporting cycle from {oldTime} to {newTime}',
    'Powers {count} downstream reports and analyses'
];

// Generate a single report
function generateReport(id: number, categoryId: string, subcategory: string): any {
    const format = formats[Math.floor(Math.random() * formats.length)];
    const department = departments[Math.floor(Math.random() * departments.length)];
    const owner = owners[Math.floor(Math.random() * owners.length)];
    const frequency = frequencies[Math.floor(Math.random() * frequencies.length)];

    // Generate tags (3-6 tags per report)
    const numTags = 3 + Math.floor(Math.random() * 4);
    const tags = [];
    const tagsCopy = [...tagPool];
    for (let i = 0; i < numTags; i++) {
        const index = Math.floor(Math.random() * tagsCopy.length);
        tags.push(tagsCopy[index]);
        tagsCopy.splice(index, 1);
    }

    // Generate metrics
    const views = Math.floor(Math.random() * 2000) + 100;
    const rating = (3.5 + Math.random() * 1.5).toFixed(1);
    const isFavorite = Math.random() > 0.8;
    const isNew = Math.random() > 0.9;
    const isTrending = Math.random() > 0.85;

    // Generate AI insight
    let aiInsight = null;
    if (Math.random() > 0.6) {
        const template = aiInsightTemplates[Math.floor(Math.random() * aiInsightTemplates.length)];
        aiInsight = template
            .replace('{viewPercentage}', Math.floor(Math.random() * 40 + 60).toString())
            .replace('{userGroup}', ['executives', 'managers', 'analysts'][Math.floor(Math.random() * 3)])
            .replace('{frequency}', frequency.toLowerCase())
            .replace('{increase}', Math.floor(Math.random() * 50 + 10).toString())
            .replace('{period}', ['week', 'month', 'quarter'][Math.floor(Math.random() * 3)])
            .replace('{meeting}', ['executive review', 'board meeting', 'ops review'][Math.floor(Math.random() * 3)])
            .replace('{usage}', Math.floor(Math.random() * 20 + 80).toString())
            .replace('{hours}', Math.floor(Math.random() * 20 + 5).toString())
            .replace('{amount}', Math.floor(Math.random() * 500 + 100).toString())
            .replace('{opportunity}', ['cost savings', 'revenue', 'efficiency'][Math.floor(Math.random() * 3)])
            .replace('{metric}', ['strategic', 'operational', 'financial'][Math.floor(Math.random() * 3)])
            .replace('{percentage}', Math.floor(Math.random() * 30 + 40).toString())
            .replace('{userCount}', Math.floor(Math.random() * 50 + 10).toString())
            .replace('{oldTime}', ['3 days', '1 week', '2 weeks'][Math.floor(Math.random() * 3)])
            .replace('{newTime}', ['2 hours', '4 hours', '1 day'][Math.floor(Math.random() * 3)])
            .replace('{count}', Math.floor(Math.random() * 10 + 5).toString());
    }

    // Generate last updated
    const daysAgo = Math.floor(Math.random() * 30);
    let lastUpdated;
    if (daysAgo === 0) {
        const hoursAgo = Math.floor(Math.random() * 24);
        lastUpdated = hoursAgo === 0 ? 'Just now' : `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
    } else if (daysAgo === 1) {
        lastUpdated = 'Yesterday';
    } else if (daysAgo < 7) {
        lastUpdated = `${daysAgo} days ago`;
    } else if (daysAgo < 30) {
        const weeksAgo = Math.floor(daysAgo / 7);
        lastUpdated = `${weeksAgo} week${weeksAgo > 1 ? 's' : ''} ago`;
    } else {
        lastUpdated = '1 month ago';
    }

    // Generate next update
    const daysUntil = Math.floor(Math.random() * 30);
    let nextUpdate;
    if (frequency === 'Real-time' || frequency === 'Hourly') {
        nextUpdate = 'Continuous';
    } else if (daysUntil === 0) {
        nextUpdate = 'Today';
    } else if (daysUntil === 1) {
        nextUpdate = 'Tomorrow';
    } else {
        const date = new Date();
        date.setDate(date.getDate() + daysUntil);
        nextUpdate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }

    // Generate report names based on category and subcategory
    const reportNames = {
        'financial': {
            'P&L Analysis': ['Income Statement Analysis', 'Profit & Loss Trends', 'P&L by Business Unit', 'Monthly P&L Review'],
            'Balance Sheet': ['Balance Sheet Summary', 'Asset & Liability Analysis', 'Working Capital Dashboard', 'Balance Sheet Trends'],
            'Cash Flow': ['Cash Flow Statement', 'Cash Conversion Analysis', 'Free Cash Flow Report', 'Cash Position Dashboard'],
            'Budgets': ['Budget vs Actual', 'Department Budget Report', 'Capital Budget Tracker', 'Budget Variance Analysis'],
            'Forecasts': ['Financial Forecast Model', 'Revenue Forecast', 'Expense Forecast', 'Rolling Forecast Dashboard'],
            'Cost Analysis': ['Cost Center Report', 'Product Costing Analysis', 'Overhead Analysis', 'Cost Reduction Opportunities'],
            'Revenue Analysis': ['Revenue by Product Line', 'Revenue Recognition Report', 'Revenue Growth Analysis', 'Revenue by Geography'],
            'Working Capital': ['Working Capital Optimization', 'DSO/DPO Analysis', 'Inventory Turnover Report', 'Cash Cycle Dashboard']
        },
        'operational': {
            'Manufacturing': ['Production Dashboard', 'Manufacturing KPIs', 'Plant Performance Report', 'Production Schedule Tracker'],
            'Quality': ['Quality Metrics Dashboard', 'Defect Analysis Report', 'Customer Complaint Tracker', 'Quality Improvement Trends'],
            'Inventory': ['Inventory Levels Report', 'Stock Movement Analysis', 'Inventory Aging Report', 'Warehouse Utilization'],
            'Logistics': ['Logistics Performance', 'Shipping & Delivery Report', 'Transportation Cost Analysis', 'Route Optimization Dashboard'],
            'Facilities': ['Facility Utilization Report', 'Maintenance Schedule', 'Energy Consumption Analysis', 'Space Planning Dashboard'],
            'Maintenance': ['Preventive Maintenance Report', 'Equipment Downtime Analysis', 'Maintenance Cost Tracker', 'Asset Performance Dashboard'],
            'Production Planning': ['Production Planning Dashboard', 'Capacity Planning Report', 'Schedule Adherence', 'Resource Utilization']
        },
        'sales-marketing': {
            'Pipeline': ['Sales Pipeline Report', 'Pipeline Coverage Analysis', 'Deal Flow Dashboard', 'Pipeline Velocity Tracker'],
            'Bookings': ['Bookings Dashboard', 'New Business Report', 'Renewal Tracker', 'Bookings by Product'],
            'Customer Analysis': ['Customer Segmentation', 'Customer Profitability', 'Customer Lifetime Value', 'Account Performance Dashboard'],
            'Campaign Performance': ['Marketing Campaign ROI', 'Lead Generation Report', 'Campaign Attribution Analysis', 'Digital Marketing Dashboard'],
            'Market Share': ['Market Share Analysis', 'Competitive Intelligence', 'Market Trends Report', 'Share of Wallet Analysis'],
            'Pricing Analysis': ['Pricing Strategy Dashboard', 'Price Optimization Report', 'Discount Analysis', 'Pricing Competitiveness'],
            'Channel Performance': ['Channel Revenue Report', 'Partner Performance Dashboard', 'Direct vs Indirect Sales', 'Channel Profitability']
        },
        'hr-people': {
            'Headcount': ['Headcount Report', 'Organization Chart Analytics', 'Staffing Level Dashboard', 'Headcount Planning'],
            'Compensation': ['Compensation Analysis', 'Pay Equity Report', 'Bonus & Incentive Tracker', 'Total Rewards Dashboard'],
            'Performance': ['Performance Review Dashboard', 'Goal Achievement Report', '360 Feedback Analysis', 'Performance Distribution'],
            'Recruiting': ['Recruiting Funnel Report', 'Time to Hire Analysis', 'Candidate Pipeline', 'Recruiting Cost Dashboard'],
            'Retention': ['Employee Retention Analysis', 'Turnover Report', 'Exit Interview Insights', 'Retention Risk Dashboard'],
            'Training': ['Training Completion Report', 'Skills Gap Analysis', 'Learning & Development ROI', 'Certification Tracker'],
            'Employee Satisfaction': ['Employee Engagement Survey', 'eNPS Dashboard', 'Culture Analytics', 'Employee Feedback Report']
        },
        'supply-chain': {
            'Procurement': ['Procurement Dashboard', 'Supplier Spend Analysis', 'Contract Compliance Report', 'Sourcing Savings Tracker'],
            'Vendor Performance': ['Vendor Scorecard', 'Supplier Risk Assessment', 'Vendor Quality Report', 'On-time Delivery Analysis'],
            'Logistics': ['Logistics Cost Report', 'Freight Analysis Dashboard', 'Carrier Performance', 'Distribution Network Analytics'],
            'Inventory Optimization': ['Inventory Optimization Report', 'Safety Stock Analysis', 'Excess & Obsolete Report', 'ABC Analysis Dashboard'],
            'Demand Planning': ['Demand Forecast Accuracy', 'Demand Planning Dashboard', 'Forecast vs Actual', 'Demand Sensing Report'],
            'Network Analysis': ['Supply Chain Network Map', 'Network Optimization Report', 'Distribution Center Performance', 'Supply Chain Risk Dashboard']
        },
        'compliance-risk': {
            'Regulatory': ['Regulatory Compliance Dashboard', 'Compliance Calendar', 'Regulatory Change Impact', 'Compliance Certification Tracker'],
            'Audit': ['Audit Findings Report', 'Internal Audit Dashboard', 'Audit Remediation Tracker', 'Control Testing Results'],
            'Risk Assessment': ['Enterprise Risk Dashboard', 'Risk Heat Map', 'Risk Mitigation Status', 'Emerging Risk Report'],
            'Controls': ['Control Effectiveness Report', 'SOX Compliance Dashboard', 'Control Gap Analysis', 'Control Testing Schedule'],
            'Policy Compliance': ['Policy Compliance Report', 'Policy Exception Tracker', 'Training Compliance Dashboard', 'Policy Update Status'],
            'Security': ['Security Incident Report', 'Access Control Dashboard', 'Data Privacy Compliance', 'Cybersecurity Risk Dashboard']
        },
        'executive': {
            'Board Reports': ['Board Meeting Package', 'Board KPI Dashboard', 'Strategic Initiative Update', 'Board Risk Report'],
            'Strategic KPIs': ['Strategic Scorecard', 'OKR Dashboard', 'Strategy Execution Report', 'Business Performance Summary'],
            'Executive Dashboards': ['CEO Dashboard', 'Executive Summary Report', 'C-Suite Analytics', 'Leadership Team Scorecard'],
            'Investor Relations': ['Investor Presentation', 'Earnings Report Analytics', 'Shareholder Analysis', 'Analyst Coverage Report'],
            'Quarterly Reviews': ['Quarterly Business Review', 'QBR Executive Summary', 'Quarterly Performance Report', 'Q-over-Q Analysis']
        },
        'custom': {
            'Special Projects': ['Project Alpha Dashboard', 'Initiative Tracker', 'Special Analysis Report', 'Ad-hoc Business Case'],
            'One-time Analysis': ['Market Entry Analysis', 'M&A Due Diligence Report', 'Scenario Planning Dashboard', 'What-if Analysis'],
            'Custom Dashboards': ['Custom KPI Dashboard', 'Personalized Analytics', 'Department Specific Report', 'Role-based Dashboard'],
            'Data Exploration': ['Data Discovery Report', 'Exploratory Analysis', 'Trend Analysis Dashboard', 'Pattern Recognition Report']
        }
    };

    const categoryNames = (reportNames as any)[categoryId] || reportNames['custom'];
    const subcategoryNames = categoryNames[subcategory] || categoryNames[Object.keys(categoryNames)[0]];
    const baseName = subcategoryNames[Math.floor(Math.random() * subcategoryNames.length)];

    // Add variations to make names unique
    const variations = ['', ' - Detailed', ' - Summary', ' - Trend Analysis', ' - YTD', ' - Global', ' - Regional', ' - Consolidated'];
    const variation = variations[Math.floor(Math.random() * variations.length)];
    const name = baseName + variation;

    // Generate description based on name
    const description = `Comprehensive analysis of ${name.toLowerCase()} with key metrics, trends, and actionable insights for ${department} team`;

    return {
        id,
        name,
        category: categoryId,
        subcategory,
        description,
        frequency,
        owner,
        department,
        lastUpdated,
        nextUpdate,
        format,
        tags,
        views,
        rating: parseFloat(rating),
        isFavorite,
        isNew,
        isTrending,
        aiInsight,
        thumbnail: `/api/placeholder/300/200`, // Placeholder for report thumbnail
        accessLevel: ['Public', 'Restricted', 'Confidential'][Math.floor(Math.random() * 3)],
        dataSource: ['SAP', 'Salesforce', 'Oracle', 'SQL Server', 'Snowflake', 'Multiple'][Math.floor(Math.random() * 6)],
        refreshStatus: frequency === 'Real-time' ? 'Live' : ['Up to date', 'Refreshing', 'Scheduled'][Math.floor(Math.random() * 3)],
        shareCount: Math.floor(Math.random() * 50),
        downloadCount: Math.floor(Math.random() * 100)
    };
}

// Generate all reports
export function generateAllReports(): any[] {
    const reports: any[] = [];
    let id = 1;

    // Generate reports for each category
    reportCategories.forEach(category => {
        if (category.id === 'all') return;

        const targetCount = category.count;
        const subcategories = category.subcategories || ['General'];

        // Distribute reports across subcategories
        subcategories.forEach((subcategory, index) => {
            const subcategoryCount = Math.floor(targetCount / subcategories.length) +
                (index < targetCount % subcategories.length ? 1 : 0);

            for (let i = 0; i < subcategoryCount; i++) {
                reports.push(generateReport(id++, category.id, subcategory));
            }
        });
    });

    return reports;
}

// Get featured collections (Netflix-style rows)
export function getFeaturedCollections(reports: any[]) {
    return [
        {
            id: 'recently-viewed',
            title: 'Continue Where You Left Off',
            reports: reports.filter(r => r.views > 1000).slice(0, 12)
        },
        {
            id: 'trending',
            title: 'Trending This Week',
            reports: reports.filter(r => r.isTrending).slice(0, 12)
        },
        {
            id: 'new-releases',
            title: 'New Reports & Dashboards',
            reports: reports.filter(r => r.isNew).slice(0, 12)
        },
        {
            id: 'top-rated',
            title: 'Top Rated by Your Peers',
            reports: reports.filter(r => r.rating >= 4.5).slice(0, 12)
        },
        {
            id: 'favorites',
            title: 'Your Favorites',
            reports: reports.filter(r => r.isFavorite).slice(0, 12)
        },
        {
            id: 'executive-picks',
            title: 'Executive Leadership Picks',
            reports: reports.filter(r => r.category === 'executive').slice(0, 12)
        },
        {
            id: 'ai-recommended',
            title: 'Recommended For You',
            reports: reports.filter(r => r.aiInsight).slice(0, 12)
        },
        {
            id: 'financial-insights',
            title: 'Financial Insights & Analysis',
            reports: reports.filter(r => r.category === 'financial').slice(0, 12)
        },
        {
            id: 'operational-excellence',
            title: 'Operational Excellence',
            reports: reports.filter(r => r.category === 'operational').slice(0, 12)
        },
        {
            id: 'real-time',
            title: 'Real-time Dashboards',
            reports: reports.filter(r => r.frequency === 'Real-time').slice(0, 12)
        }
    ];
}

// Search and filter functions
export function searchReports(reports: any[], query: string) {
    const lowercaseQuery = query.toLowerCase();
    return reports.filter(report =>
        report.name.toLowerCase().includes(lowercaseQuery) ||
        report.description.toLowerCase().includes(lowercaseQuery) ||
        report.tags.some((tag: string) => tag.toLowerCase().includes(lowercaseQuery)) ||
        report.owner.toLowerCase().includes(lowercaseQuery) ||
        report.department.toLowerCase().includes(lowercaseQuery)
    );
}

export function filterReports(reports: any[], filters: any) {
    return reports.filter(report => {
        if (filters.category && filters.category !== 'all' && report.category !== filters.category) {
            return false;
        }
        if (filters.department && report.department !== filters.department) {
            return false;
        }
        if (filters.frequency && report.frequency !== filters.frequency) {
            return false;
        }
        if (filters.format && report.format !== filters.format) {
            return false;
        }
        if (filters.rating && report.rating < filters.rating) {
            return false;
        }
        return true;
    });
}

// Get report recommendations based on viewing history
export function getRecommendations(currentReport: any, allReports: any[]) {
    return allReports
        .filter(r => r.id !== currentReport.id)
        .filter(r =>
            r.category === currentReport.category ||
            r.tags.some((tag: string) => currentReport.tags.includes(tag)) ||
            r.department === currentReport.department
        )
        .sort(() => Math.random() - 0.5)
        .slice(0, 6);
} 