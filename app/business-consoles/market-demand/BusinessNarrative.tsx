import { motion } from 'framer-motion';
import {
    AlertCircle,
    BarChart3,
    Brain,
    Calendar,
    ChevronRight,
    Clock,
    Lightbulb,
    MessageSquare,
    Target,
    Users,
    Zap
} from 'lucide-react';
import { useState } from 'react';

export default function BusinessNarrative() {
    const [selectedPeriod, setSelectedPeriod] = useState('current-quarter');
    const [commentaryMode, setCommentaryMode] = useState<'analytics' | 'user'>('analytics');

    // Market Story Chapters - Analytics Based
    const analyticsStory = {
        executiveSummary: {
            title: "Market Dynamics Executive Overview",
            period: "Q4 2024",
            narrative: "Our automotive market position continues to strengthen with 18.5% market share, driven by successful EV launches and premium segment growth. However, competitive pressures in the mid-tier segment and shifting consumer preferences toward digital purchasing require immediate strategic adjustments.",
            keyTakeaways: [
                "Market share gains of +0.8pp driven by EV segment success",
                "Order pipeline at record $8.7B indicates strong future demand",
                "Customer acquisition declining by 5.3% requires urgent attention",
                "APAC region presents significant growth opportunity with 18.5% growth"
            ]
        },
        marketEvolution: {
            title: "How We Got Here",
            timeline: [
                {
                    period: "Q1 2024",
                    event: "Launched 3 new EV models",
                    impact: "+2.1pp market share in EV segment",
                    status: "positive"
                },
                {
                    period: "Q2 2024",
                    event: "Competitor entry in mid-tier",
                    impact: "-0.5pp monthly share erosion",
                    status: "negative"
                },
                {
                    period: "Q3 2024",
                    event: "Digital sales platform launch",
                    impact: "42% online purchase preference",
                    status: "positive"
                },
                {
                    period: "Q4 2024",
                    event: "Supply chain optimization",
                    impact: "15% cost reduction achieved",
                    status: "positive"
                }
            ]
        },
        competitiveLandscape: {
            title: "Competitive Dynamics",
            ourPosition: {
                strengths: [
                    "Leading position in luxury SUV segment (32% share)",
                    "Strong brand perception in quality and innovation",
                    "Expanding EV portfolio with superior range",
                    "Established dealer network with 2,500+ locations"
                ],
                weaknesses: [
                    "Limited presence in entry-level segment",
                    "Higher price point vs new competitors",
                    "Slower digital transformation vs new market entrants",
                    "Dependency on traditional dealer model"
                ]
            },
            competitorMoves: [
                {
                    competitor: "Competitor A",
                    recentAction: "Launched $35K Model 2",
                    marketImpact: "Capturing price-sensitive EV buyers",
                    ourResponse: "Accelerate affordable EV development"
                },
                {
                    competitor: "Competitor B",
                    recentAction: "Entered North American market",
                    marketImpact: "Aggressive pricing in mid-tier",
                    ourResponse: "Value engineering initiative"
                },
                {
                    competitor: "Traditional Manufacturers",
                    recentAction: "Joint EV platform development",
                    marketImpact: "Faster EV launches expected",
                    ourResponse: "Strengthen tech partnerships"
                }
            ]
        },
        futureOutlook: {
            title: "Where We're Heading",
            scenarios: [
                {
                    name: "Base Case",
                    probability: 60,
                    marketShare: "19.5%",
                    revenue: "$52B",
                    keyAssumptions: [
                        "EV adoption continues at current pace",
                        "Economic conditions remain stable",
                        "No major supply chain disruptions"
                    ]
                },
                {
                    name: "Optimistic",
                    probability: 25,
                    marketShare: "22%",
                    revenue: "$58B",
                    keyAssumptions: [
                        "EV tax incentives expanded",
                        "Successful new model launches",
                        "Market share gains in APAC"
                    ]
                },
                {
                    name: "Pessimistic",
                    probability: 15,
                    marketShare: "17%",
                    revenue: "$48B",
                    keyAssumptions: [
                        "Economic recession impacts demand",
                        "Increased competitive pressure",
                        "Supply chain challenges persist"
                    ]
                }
            ]
        }
    };

    // Market Story Chapters - User Commentary Based
    const userCommentaryStory = {
        executiveSummary: {
            title: "Market Dynamics Executive Overview - Enhanced with Business Context",
            period: "Q4 2024",
            narrative: "Based on regional team insights, our 18.5% market share masks critical regional variations. North America teams report unprecedented fleet demand recovery (+5.2M) driven by rental company re-fleeting cycles delayed from COVID. European teams highlight that our EV success isn't just product-driven - dealer training investments and charging partnerships created competitive moats. Asia Pacific warns that despite 18.5% growth, local competitors are aggressively investing in battery technology that could erode our advantages by Q2 2025.",
            keyTakeaways: [
                "Fleet recovery timing was strategic - sales teams coordinated with rental companies during their budget cycles",
                "European EV success tied to €2.3M dealer training investment not captured in traditional metrics",
                "China team reports 3 competitors launching 'EV-only' brands targeting our customer base",
                "Supply chain team negotiated exclusive battery allocation through Q1 2025, securing competitive advantage"
            ],
            userInsights: [
                { contributor: "Sarah Johnson - NA Sales VP", insight: "Fleet customers choosing us over competitors due to our guaranteed delivery dates" },
                { contributor: "Klaus Mueller - EU Operations", insight: "Dealer satisfaction at all-time high after training investments" },
                { contributor: "Li Wei - APAC Strategy", insight: "Local competitors offering 10-year battery warranties - we need response strategy" }
            ]
        },
        marketEvolution: {
            title: "The Real Story Behind the Numbers",
            timeline: [
                {
                    period: "Q1 2024",
                    event: "Launched 3 new EV models",
                    impact: "+2.1pp market share in EV segment",
                    status: "positive",
                    context: "Product team reveals we accelerated launch by 2 months to beat competitor announcement. Manufacturing heroics included 24/7 production for 3 weeks."
                },
                {
                    period: "Q2 2024",
                    event: "Competitor entry in mid-tier",
                    impact: "-0.5pp monthly share erosion",
                    status: "negative",
                    context: "Sales team knew this was coming - competitor hired 5 of our top dealers. We're now implementing retention bonuses and exclusive territory rights."
                },
                {
                    period: "Q3 2024",
                    event: "Digital sales platform launch",
                    impact: "42% online purchase preference",
                    status: "positive",
                    context: "IT team worked with top customers during beta. Their feedback led to financing calculator that increased conversion 23%. Competitors still 6 months behind."
                },
                {
                    period: "Q4 2024",
                    event: "Supply chain stabilization",
                    impact: "Inventory recovery to 45 days",
                    status: "positive",
                    context: "Procurement team's relationship with chip suppliers paid off - we got priority allocation when others faced 20% cuts. This wasn't luck, it was 2 years of partnership building."
                }
            ]
        },
        regionalDynamics: {
            title: "Ground Truth from Regional Leaders",
            regions: [
                {
                    region: "North America",
                    performance: "+5.2% vs PY",
                    marketShare: 19.8,
                    narrative: "Fleet recovery is real but fragile. Rental companies are nervous about EV residual values. We're offering buyback guarantees that aren't in our reported numbers. This risk could be $50M+ if EV depreciation accelerates.",
                    challenges: ["EV charging infrastructure gaps in midwest", "Union negotiations could impact Q1 production"],
                    opportunities: ["Government fleet mandates starting 2025", "Exclusive deal with largest rental company pending"]
                },
                {
                    region: "Europe",
                    performance: "+3.7% vs PY",
                    marketShare: 16.2,
                    narrative: "Regulatory tailwinds are stronger than data shows. Inside information: EU considering accelerated ICE bans. We're positioning inventory accordingly. German team has pre-sold 70% of Q1 EV allocation to corporate fleets.",
                    challenges: ["Energy costs impacting manufacturing", "New entrants from China undercutting prices"],
                    opportunities: ["Government subsidies extended through 2026", "Partnership with energy companies for charging"]
                },
                {
                    region: "Asia Pacific",
                    performance: "+18.5% vs PY",
                    marketShare: 14.1,
                    narrative: "Growth looks great on paper but team morale is concerning. Local competitors are poaching our best talent with 50%+ salary increases. We've lost 3 plant managers this quarter. HR implementing emergency retention program.",
                    challenges: ["Talent retention crisis", "Local battery suppliers favoring domestic brands"],
                    opportunities: ["India middle class explosion", "Indonesia infrastructure investments"]
                }
            ]
        },
        competitiveLandscape: {
            title: "Competitive Intelligence from the Field",
            strengths: [
                "Dealer network loyalty - Competitors offering 20% higher margins but dealers staying with us",
                "Battery technology lead - Supply chain secured exclusive access to next-gen cells",
                "Fleet relationships - 20-year partnerships creating switching barriers",
                "Software capabilities - OTA updates reducing warranty costs by $50M annually"
            ],
            weaknesses: [
                "Price perception - Sales teams report we're seen as 15% overpriced vs new entrants",
                "Digital experience - Customers abandoning online configurator at 3x competitor rates",
                "Service capacity - 6-month wait for appointments pushing customers to independents",
                "EV charging anxiety - Despite network investments, perception lags reality"
            ],
            competitiveIntel: [
                "Competitor A planning major price cuts Q1 - insider info from supplier",
                "New market entrants targeting our profitable fleet segment with loss-leader pricing",
                "Traditional competitors forming alliance on infrastructure",
                "New entrant hiring our entire Phoenix engineering team"
            ],
            competitorMoves: [
                {
                    competitor: "Competitor A",
                    recentAction: "Opening Supercharger network",
                    marketImpact: "Removes our charging advantage",
                    ourResponse: "Accelerate proprietary charging tech",
                    insiderContext: "Their charging revenue model is failing - they need our volume"
                },
                {
                    competitor: "Competitor B",
                    recentAction: "Building US factories",
                    marketImpact: "Cost advantage from local production",
                    ourResponse: "Lobbying for stricter safety standards",
                    insiderContext: "Their quality issues in China being suppressed - opportunity for PR campaign"
                },
                {
                    competitor: "Traditional Manufacturers",
                    recentAction: "Massive EV investments",
                    marketImpact: "Catching up on technology",
                    ourResponse: "Focus on software differentiation",
                    insiderContext: "They're burning cash - CFO networks report 2 considering EV pullback"
                }
            ]
        },
        futureOutlook: {
            title: "The View from the Trenches",
            scenarios: [
                {
                    name: "Base Case (Field Adjusted)",
                    probability: 60,
                    marketShare: "18.5%", // Lower than analytics due to competitive intel
                    revenue: "$49B", // Adjusted for price pressure
                    keyAssumptions: [
                        "Price war intensifies - margins compressed 200bps",
                        "China EV dumping forces regulatory response",
                        "Union negotiations add $500M annual costs",
                        "Battery shortage limits Q2-Q3 production"
                    ],
                    fieldInsights: "Sales teams seeing 20% longer sales cycles. Finance teams negotiating harder."
                },
                {
                    name: "Optimistic (If We Execute)",
                    probability: 25,
                    marketShare: "21%",
                    revenue: "$55B",
                    keyAssumptions: [
                        "Fleet exclusive deals materialize",
                        "Software subscription model succeeds",
                        "China joint venture approved",
                        "Competitor quality issues surface"
                    ],
                    fieldInsights: "If we can hold pricing through Q1, fleet contracts will lock in 3-year advantage"
                },
                {
                    name: "Pessimistic (Risk Case)",
                    probability: 15,
                    marketShare: "16%",
                    revenue: "$45B",
                    keyAssumptions: [
                        "Major recall on flagship model",
                        "Key battery supplier goes exclusive with competitor",
                        "Recession deeper than expected",
                        "China brands gain premium credibility"
                    ],
                    fieldInsights: "Engineering flagging quality concerns on new platform - could be $2B recall exposure"
                }
            ]
        }
    };

    const marketStory = commentaryMode === 'analytics' ? analyticsStory : userCommentaryStory;

    // Strategic Themes
    const strategicThemes = [
        {
            theme: "Electrification Leadership",
            description: "Establish dominance in the rapidly growing EV market",
            progress: 65,
            initiatives: [
                "Launch 5 new EV models by 2025",
                "Build 3 battery manufacturing facilities",
                "Develop proprietary charging network"
            ],
            metrics: {
                current: "15% of sales",
                target: "40% by 2027",
                trend: "positive"
            }
        },
        {
            theme: "Digital Transformation",
            description: "Create seamless online-to-offline customer experience",
            progress: 42,
            initiatives: [
                "Complete digital sales platform rollout",
                "Implement AR/VR showrooms",
                "Launch direct-to-consumer pilot"
            ],
            metrics: {
                current: "42% digital influence",
                target: "80% by 2025",
                trend: "positive"
            }
        },
        {
            theme: "Market Expansion",
            description: "Capture growth in emerging markets, especially APAC",
            progress: 35,
            initiatives: [
                "Enter 3 new APAC markets",
                "Localize production facilities",
                "Develop region-specific models"
            ],
            metrics: {
                current: "12.1% APAC share",
                target: "20% by 2026",
                trend: "positive"
            }
        }
    ];

    return (
        <div className="space-y-6">
            {/* Header with Period Selector */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Business Narrative</h2>
                <div className="flex items-center space-x-4">
                    {/* Commentary Mode Toggle */}
                    <div className="flex items-center bg-gray-100 rounded-lg p-1">
                        <button
                            onClick={() => setCommentaryMode('analytics')}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${commentaryMode === 'analytics'
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <div className="flex items-center space-x-2">
                                <Brain className="w-4 h-4" />
                                <span>AI Analytics Commentary</span>
                            </div>
                        </button>
                        <button
                            onClick={() => setCommentaryMode('user')}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${commentaryMode === 'user'
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <div className="flex items-center space-x-2">
                                <MessageSquare className="w-4 h-4" />
                                <span>AI User Commentary</span>
                            </div>
                        </button>
                    </div>
                    <select
                        value={selectedPeriod}
                        onChange={(e) => setSelectedPeriod(e.target.value)}
                        className="text-sm bg-white border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="current-quarter">Current Quarter (Q4 2024)</option>
                        <option value="ytd">Year to Date</option>
                        <option value="last-year">Last 12 Months</option>
                    </select>
                </div>
            </div>

            {/* Executive Summary */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm p-6"
            >
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">{marketStory.executiveSummary.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{marketStory.executiveSummary.period}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-xs text-gray-500">Updated 2 hours ago</span>
                    </div>
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed">
                    {marketStory.executiveSummary.narrative}
                </p>

                <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                        <Lightbulb className="w-4 h-4 mr-2 text-blue-600" />
                        Key Takeaways
                    </h4>
                    <ul className="space-y-2">
                        {marketStory.executiveSummary.keyTakeaways.map((takeaway, index) => (
                            <li key={index} className="flex items-start">
                                <ChevronRight className="w-4 h-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                                <span className="text-sm text-gray-700">{takeaway}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* User Insights - Only show in user commentary mode */}
                {commentaryMode === 'user' && 'userInsights' in marketStory.executiveSummary && (
                    <div className="mt-4 bg-yellow-50 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                            <Users className="w-4 h-4 mr-2 text-yellow-600" />
                            Direct Insights from the Field
                        </h4>
                        <ul className="space-y-2">
                            {(marketStory.executiveSummary as any).userInsights.map((insight: any, index: number) => (
                                <li key={index} className="text-sm">
                                    <span className="font-medium text-gray-700">{insight.contributor}:</span>
                                    <span className="text-gray-600 ml-2">"{insight.insight}"</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </motion.div>

            {/* Market Evolution Timeline */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl shadow-sm p-6"
            >
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-blue-600" />
                    {marketStory.marketEvolution.title}
                </h3>

                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>

                    {/* Timeline events */}
                    <div className="space-y-6">
                        {marketStory.marketEvolution.timeline.map((event, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="relative flex items-start"
                            >
                                <div className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center ${event.status === 'positive' ? 'bg-green-100' : 'bg-red-100'
                                    }`}>
                                    <div className={`w-3 h-3 rounded-full ${event.status === 'positive' ? 'bg-green-500' : 'bg-red-500'
                                        }`}></div>
                                </div>
                                <div className="ml-6 flex-1">
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="text-sm font-semibold text-gray-900">{event.period}</h4>
                                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${event.status === 'positive'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-red-100 text-red-700'
                                                }`}>
                                                {event.impact}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-700">{event.event}</p>
                                        {/* Show context in user commentary mode */}
                                        {'context' in event && event.context && (
                                            <div className="mt-2 pt-2 border-t border-gray-200">
                                                <p className="text-xs text-gray-600 italic">
                                                    <MessageSquare className="w-3 h-3 inline mr-1" />
                                                    {event.context}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Competitive Landscape */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-sm p-6"
            >
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-blue-600" />
                    {marketStory.competitiveLandscape.title}
                </h3>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-3">Our Strengths</h4>
                        <ul className="space-y-2">
                            {('ourPosition' in marketStory.competitiveLandscape
                                ? marketStory.competitiveLandscape.ourPosition.strengths
                                : marketStory.competitiveLandscape.strengths
                            ).map((strength: string, index: number) => (
                                <li key={index} className="flex items-start">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 mr-2 flex-shrink-0"></div>
                                    <span className="text-sm text-gray-700">{strength}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-3">Areas for Improvement</h4>
                        <ul className="space-y-2">
                            {('ourPosition' in marketStory.competitiveLandscape
                                ? marketStory.competitiveLandscape.ourPosition.weaknesses
                                : marketStory.competitiveLandscape.weaknesses
                            ).map((weakness: string, index: number) => (
                                <li key={index} className="flex items-start">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 mr-2 flex-shrink-0"></div>
                                    <span className="text-sm text-gray-700">{weakness}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Competitor Moves */}
                <div className="border-t pt-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-4">Recent Competitor Actions</h4>
                    <div className="space-y-4">
                        {marketStory.competitiveLandscape.competitorMoves.map((move, index) => (
                            <div key={index} className="bg-gray-50 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <h5 className="text-sm font-semibold text-gray-900">{move.competitor}</h5>
                                    <AlertCircle className="w-4 h-4 text-amber-500" />
                                </div>
                                <p className="text-sm text-gray-700 mb-2">{move.recentAction}</p>
                                <div className="grid grid-cols-2 gap-4 text-xs">
                                    <div>
                                        <span className="text-gray-500">Market Impact:</span>
                                        <p className="text-gray-700 mt-1">{move.marketImpact}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Our Response:</span>
                                        <p className="text-blue-600 font-medium mt-1">{move.ourResponse}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Strategic Themes */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl shadow-sm p-6"
            >
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-blue-600" />
                    Strategic Themes & Progress
                </h3>

                <div className="space-y-6">
                    {strategicThemes.map((theme, index) => (
                        <div key={index} className="border rounded-lg p-5">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <h4 className="text-base font-semibold text-gray-900">{theme.theme}</h4>
                                    <p className="text-sm text-gray-600 mt-1">{theme.description}</p>
                                </div>
                                <span className="text-sm font-medium text-gray-900">{theme.progress}%</span>
                            </div>

                            {/* Progress bar */}
                            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                                <div
                                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${theme.progress}%` }}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs font-medium text-gray-700 mb-2">Key Initiatives</p>
                                    <ul className="space-y-1">
                                        {theme.initiatives.map((initiative, idx) => (
                                            <li key={idx} className="text-xs text-gray-600 flex items-start">
                                                <ChevronRight className="w-3 h-3 mt-0.5 mr-1 flex-shrink-0" />
                                                {initiative}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-gray-700 mb-2">Performance Metrics</p>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-gray-500">Current:</span>
                                            <span className="text-xs font-medium text-gray-900">{theme.metrics.current}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-gray-500">Target:</span>
                                            <span className="text-xs font-medium text-blue-600">{theme.metrics.target}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-gray-500">Trend:</span>
                                            <span className={`text-xs font-medium ${theme.metrics.trend === 'positive' ? 'text-green-600' : 'text-red-600'
                                                }`}>
                                                {theme.metrics.trend === 'positive' ? '↑ Improving' : '↓ Declining'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Future Outlook Scenarios */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-xl shadow-sm p-6"
            >
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                    {marketStory.futureOutlook.title}
                </h3>

                <div className="grid grid-cols-3 gap-4">
                    {marketStory.futureOutlook.scenarios.map((scenario, index) => (
                        <div
                            key={index}
                            className={`border rounded-lg p-4 ${scenario.name === 'Base Case' ? 'border-blue-200 bg-blue-50' : 'border-gray-200'
                                }`}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <h4 className="text-sm font-semibold text-gray-900">{scenario.name}</h4>
                                <span className="text-xs font-medium text-gray-600">{scenario.probability}% probability</span>
                            </div>

                            <div className="space-y-3 mb-4">
                                <div>
                                    <p className="text-xs text-gray-500">Market Share</p>
                                    <p className="text-lg font-bold text-gray-900">{scenario.marketShare}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Revenue Forecast</p>
                                    <p className="text-lg font-bold text-gray-900">{scenario.revenue}</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-xs font-medium text-gray-700 mb-2">Key Assumptions</p>
                                <ul className="space-y-1">
                                    {scenario.keyAssumptions.map((assumption, idx) => (
                                        <li key={idx} className="text-xs text-gray-600">• {assumption}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
} 