// Comprehensive scenario parser for automotive financial planning
// Handles 50+ common scenarios users might type

export interface ParsedScenario {
    levers: Record<string, number>;
    explanation: string;
}

// Helper to extract percentage values from text
const extractPercentage = (text: string, keywords: string[]): number | null => {
    // First, try to extract any percentage number in the text (most flexible)
    // This catches patterns like "5%", "5 percent", "increase by 5%", etc.
    const anyPercentageMatch = text.match(/(\d+)\s*%/i);
    if (anyPercentageMatch) {
        const value = parseFloat(anyPercentageMatch[1]);
        if (!isNaN(value)) return value;
    }
    
    // Then try keyword-specific patterns for more precise matching
    for (const keyword of keywords) {
        const patterns = [
            // Pattern: "5% market share", "5% more market share"
            new RegExp(`(\\d+)\\s*%?\\s*(?:more|less|additional|extra)?\\s*${keyword}`, 'i'),
            // Pattern: "take 5% market share", "gains 5% market share"
            new RegExp(`(?:take|takes|taking|gains?|loses?|steals?|increase|decrease|up|down)\\s*(?:by|of)?\\s*(\\d+)\\s*%?\\s*(?:more|less|additional|extra)?\\s*${keyword}`, 'i'),
            // Pattern: "market share by 5%", "market share increases 5%"
            new RegExp(`${keyword}\\s*(?:of|by|at|increases?|decreases?|gains?|losses?)?\\s*(?:by|to|at)?\\s*(\\d+)\\s*%?`, 'i'),
            // Pattern: "5% increase", "5% decrease"
            new RegExp(`(\\d+)\\s*%?\\s*(?:increase|decrease|change|up|down|more|less)`, 'i'),
        ];
        
        for (const pattern of patterns) {
            const match = text.match(pattern);
            if (match) {
                const value = parseFloat(match[1] || match[2]);
                if (!isNaN(value)) return value;
            }
        }
    }
    return null;
};

// Helper to check if text contains any of the keywords
const containsAny = (text: string, keywords: string[]): boolean => {
    return keywords.some(keyword => text.includes(keyword));
};

// Helper to check if text indicates increase/decrease
const isIncrease = (text: string): boolean => {
    return containsAny(text, ['increase', 'increases', 'increased', 'rise', 'rises', 'rose', 'up', 'higher', 
                              'grow', 'grows', 'growing', 'grew', 'improve', 'improves', 'improved', 
                              'gain', 'gains', 'gained', 'expand', 'expands', 'expanded', 'boost', 'boosted']);
};

const isDecrease = (text: string): boolean => {
    return containsAny(text, ['decrease', 'decreases', 'decreased', 'decline', 'declines', 'declined', 
                              'down', 'lower', 'fall', 'falls', 'fell', 'drop', 'drops', 'dropped',
                              'reduce', 'reduces', 'reduced', 'loss', 'lose', 'loses', 'lost', 
                              'shrink', 'shrinks', 'shrank', 'contract', 'contracts', 'contracted']);
};

export const parseScenarioFromText = (text: string): ParsedScenario => {
    const lowerText = text.toLowerCase();
    const levers: Record<string, number> = {};
    const explanations: string[] = [];

    // 1. TARIFF SCENARIOS
    if (containsAny(lowerText, ['tariff', 'tariffs', 'trade war', 'trade dispute', 'import tax', 'duty', 'duties'])) {
        const tariffValue = extractPercentage(lowerText, ['tariff', 'tariffs', 'duty', 'tax']);
        // Only use default if no percentage was found
        const finalTariffValue = tariffValue !== null ? tariffValue : 25;
        levers['tariffs'] = Math.min(Math.max(finalTariffValue, 0), 50);
        levers['market-share'] = -Math.min(finalTariffValue / 10, 2);
        levers['price-change'] = Math.min(finalTariffValue / 8, 3);
        levers['material-inflation'] = Math.min(finalTariffValue * 0.08, 5);
        explanations.push(`Applied ${finalTariffValue}% tariff impact`);
    }

    // 2. MARKET SHARE SCENARIOS
    if (containsAny(lowerText, ['market share', 'market-share', 'share', 'competitor', 'competitors', 'competition', 
                                'new entrant', 'new entrants', 'take share', 'taking share', 'gaining share'])) {
        // Try to extract the exact percentage first
        const shareValue = extractPercentage(lowerText, ['market share', 'share', 'market']);
        
        // If we found a percentage, use it; otherwise default to 2%
        const finalShareValue = shareValue !== null ? shareValue : 2;
        
        if (containsAny(lowerText, ['take', 'takes', 'taking', 'took', 'steal', 'steals', 'stealing', 'lose', 'loses', 'lost', 
                                    'loss', 'decline', 'declines', 'decrease', 'decreases', 'down', 'fall', 'fell', 'more']) ||
            containsAny(lowerText, ['competitor', 'competitors', 'competition', 'new entrant'])) {
            // When competitors take share, apply the full amount as loss
            levers['market-share'] = Math.max(Math.min(-finalShareValue, 0), -10);
            explanations.push(`Applied ${finalShareValue}% market share loss`);
        } else if (containsAny(lowerText, ['gain', 'gains', 'gained', 'win', 'wins', 'increase', 'increases', 'up'])) {
            levers['market-share'] = Math.min(Math.max(finalShareValue, 0), 10);
            explanations.push(`Applied ${finalShareValue}% market share gain`);
        }
    }

    // 3. MARKET DEMAND SCENARIOS
    if (containsAny(lowerText, ['market demand', 'demand', 'sales demand', 'customer demand', 'industry demand'])) {
        const demandValue = extractPercentage(lowerText, ['demand', 'market']);
        const finalDemandValue = demandValue !== null ? demandValue : 10;
        
        if (isDecrease(lowerText)) {
            levers['volume-growth'] = Math.max(Math.min(-finalDemandValue, 0), -20);
            levers['price-change'] = Math.max(Math.min(-finalDemandValue * 0.2, 0), -5);
            explanations.push(`Applied ${finalDemandValue}% market demand decrease`);
        } else if (isIncrease(lowerText)) {
            levers['volume-growth'] = Math.min(Math.max(finalDemandValue, 0), 20);
            explanations.push(`Applied ${finalDemandValue}% market demand increase`);
        }
    }

    // 4. VOLUME GROWTH SCENARIOS
    if (containsAny(lowerText, ['volume', 'sales volume', 'unit sales', 'units sold', 'production volume', 
                                'manufacturing volume', 'shipments'])) {
        const volumeValue = extractPercentage(lowerText, ['volume', 'sales', 'units', 'production']);
        const finalVolumeValue = volumeValue !== null ? volumeValue : 8;
        
        if (isDecrease(lowerText)) {
            levers['volume-growth'] = Math.max(Math.min(-finalVolumeValue, 0), -20);
            explanations.push(`Applied ${finalVolumeValue}% volume decrease`);
        } else if (isIncrease(lowerText)) {
            levers['volume-growth'] = Math.min(Math.max(finalVolumeValue, 0), 20);
            explanations.push(`Applied ${finalVolumeValue}% volume growth`);
        }
    }

    // 5. PRICING SCENARIOS
    if (containsAny(lowerText, ['price', 'pricing', 'price change', 'prices', 'atp', 'average transaction price', 
                                'msrp', 'list price', 'discount', 'discounts', 'promotion', 'promotions', 
                                'incentive', 'incentives', 'rebate', 'rebates'])) {
        const priceValue = extractPercentage(lowerText, ['price', 'pricing', 'atp', 'msrp', 'discount']);
        const finalPriceValue = priceValue !== null ? priceValue : 3;
        
        if (containsAny(lowerText, ['increase', 'increases', 'raise', 'raises', 'higher', 'up', 'rise', 'rises'])) {
            levers['price-change'] = Math.min(Math.max(finalPriceValue, 0), 10);
            explanations.push(`Applied ${finalPriceValue}% price increase`);
        } else if (containsAny(lowerText, ['decrease', 'decreases', 'lower', 'down', 'fall', 'discount', 'promotion', 
                                           'incentive', 'rebate', 'cut', 'cuts', 'reduce'])) {
            levers['price-change'] = Math.max(Math.min(-finalPriceValue, 0), -10);
            explanations.push(`Applied ${finalPriceValue}% price decrease`);
        }
    }

    // 6. MATERIAL COST SCENARIOS
    if (containsAny(lowerText, ['material', 'materials', 'raw material', 'raw materials', 'steel', 'aluminum', 
                                'plastic', 'plastics', 'components', 'parts', 'commodity', 'commodities', 
                                'copper', 'lithium', 'battery', 'batteries'])) {
        const materialValue = extractPercentage(lowerText, ['material', 'steel', 'aluminum', 'commodity', 'cost']);
        const finalMaterialValue = materialValue !== null ? materialValue : 5;
        
        if (isIncrease(lowerText)) {
            levers['material-inflation'] = Math.min(Math.max(finalMaterialValue, 0), 15);
            explanations.push(`Applied ${finalMaterialValue}% material cost increase`);
        } else if (isDecrease(lowerText)) {
            levers['material-inflation'] = Math.max(Math.min(-finalMaterialValue, 0), -5);
            explanations.push(`Applied ${finalMaterialValue}% material cost decrease`);
        }
    }

    // 7. SUPPLY CHAIN SCENARIOS
    if (containsAny(lowerText, ['supply chain', 'supply-chain', 'logistics', 'shipping', 'freight', 'transportation', 
                                'delivery', 'inventory', 'warehouse', 'warehousing'])) {
        const scValue = extractPercentage(lowerText, ['supply chain', 'logistics', 'shipping', 'cost', 'efficiency']);
        const finalScValue = scValue !== null ? scValue : 10;
        
        if (containsAny(lowerText, ['cost', 'costs', 'price', 'expense']) && isIncrease(lowerText)) {
            levers['supply-chain'] = Math.max(Math.min(-finalScValue, 0), -15);
            levers['material-inflation'] = Math.min(Math.max(finalScValue * 0.6, 0), 15);
            explanations.push(`Applied ${finalScValue}% supply chain cost increase`);
        } else if (containsAny(lowerText, ['disruption', 'disruptions', 'shortage', 'shortages', 'problem', 'problems', 
                                           'delay', 'delays', 'breakdown', 'failure'])) {
            levers['supply-chain'] = Math.max(Math.min(-finalScValue, 0), -15);
            levers['material-inflation'] = Math.min(finalScValue * 0.5, 5);
            explanations.push(`Applied supply chain disruption impact`);
        } else if (containsAny(lowerText, ['improve', 'improves', 'improved', 'better', 'efficiency', 'optimize', 
                                           'optimization', 'reduce cost', 'cost reduction']) || isDecrease(lowerText)) {
            levers['supply-chain'] = Math.min(Math.max(finalScValue, 0), 15);
            explanations.push(`Applied ${finalScValue}% supply chain efficiency improvement`);
        }
    }

    // 8. LABOR SCENARIOS
    if (containsAny(lowerText, ['labor', 'labour', 'wage', 'wages', 'salary', 'salaries', 'worker', 'workers', 
                                'employee', 'employees', 'workforce', 'staff', 'personnel', 'productivity', 
                                'efficiency', 'automation', 'robot', 'robots'])) {
        const laborValue = extractPercentage(lowerText, ['labor', 'wage', 'productivity', 'efficiency']);
        const finalLaborValue = laborValue !== null ? laborValue : 5;
        
        if (containsAny(lowerText, ['wage', 'wages', 'salary', 'salaries', 'cost', 'costs']) && isIncrease(lowerText)) {
            levers['labor-productivity'] = Math.max(Math.min(-finalLaborValue * 0.5, 0), -10);
            explanations.push(`Applied ${finalLaborValue}% labor cost increase`);
        } else if (containsAny(lowerText, ['productivity', 'efficiency', 'automation', 'robot', 'improve']) && isIncrease(lowerText)) {
            levers['labor-productivity'] = Math.min(Math.max(finalLaborValue, 0), 10);
            explanations.push(`Applied ${finalLaborValue}% labor productivity improvement`);
        } else if (containsAny(lowerText, ['strike', 'strikes', 'shortage', 'shortages', 'problem', 'issues'])) {
            levers['labor-productivity'] = Math.max(Math.min(-finalLaborValue, 0), -10);
            explanations.push(`Applied labor disruption impact`);
        }
    }

    // 9. WARRANTY & QUALITY SCENARIOS
    if (containsAny(lowerText, ['warranty', 'warranties', 'quality', 'defect', 'defects', 'recall', 'recalls', 
                                'reliability', 'durability', 'claim', 'claims', 'repair', 'repairs'])) {
        const warrantyValue = extractPercentage(lowerText, ['warranty', 'quality', 'defect', 'claim']);
        const finalWarrantyValue = warrantyValue !== null ? warrantyValue : 10;
        
        if (isIncrease(lowerText) || containsAny(lowerText, ['increase', 'higher', 'more', 'worse', 'problem'])) {
            levers['warranty-costs'] = Math.min(Math.max(finalWarrantyValue, 0), 20);
            explanations.push(`Applied ${finalWarrantyValue}% warranty cost increase`);
        } else if (isDecrease(lowerText) || containsAny(lowerText, ['improve', 'better', 'reduce', 'lower'])) {
            levers['warranty-costs'] = Math.max(Math.min(-finalWarrantyValue, 0), -20);
            explanations.push(`Applied ${finalWarrantyValue}% warranty cost reduction`);
        }
    }

    // 10. MARKETING & ADVERTISING SCENARIOS
    if (containsAny(lowerText, ['marketing', 'advertising', 'ad', 'ads', 'promotion', 'promotions', 'campaign', 
                                'campaigns', 'brand', 'branding', 'media', 'spend', 'spending', 'budget'])) {
        const marketingValue = extractPercentage(lowerText, ['marketing', 'advertising', 'spend', 'budget']);
        const finalMarketingValue = marketingValue !== null ? marketingValue : 15;
        
        if (isIncrease(lowerText)) {
            levers['marketing-spend'] = Math.min(Math.max(finalMarketingValue, 0), 30);
            levers['market-share'] = Math.min(finalMarketingValue / 15, 2);
            explanations.push(`Applied ${finalMarketingValue}% marketing spend increase`);
        } else if (isDecrease(lowerText)) {
            levers['marketing-spend'] = Math.max(Math.min(-finalMarketingValue, 0), -30);
            explanations.push(`Applied ${finalMarketingValue}% marketing spend reduction`);
        }
    }

    // 11. INTEREST RATE SCENARIOS
    if (containsAny(lowerText, ['interest rate', 'interest rates', 'fed rate', 'federal rate', 'borrowing cost', 
                                'borrowing costs', 'debt cost', 'financing cost'])) {
        const rateValue = extractPercentage(lowerText, ['interest', 'rate', 'borrowing', 'debt']);
        const finalRateValue = rateValue !== null ? rateValue : 2;
        
        if (isIncrease(lowerText)) {
            levers['interest-rates'] = Math.min(Math.max(finalRateValue, 0), 5);
            explanations.push(`Applied ${finalRateValue}% interest rate increase`);
        } else if (isDecrease(lowerText)) {
            levers['interest-rates'] = Math.max(Math.min(-finalRateValue, 0), -5);
            explanations.push(`Applied ${finalRateValue}% interest rate decrease`);
        }
    }

    // 12. FX/CURRENCY SCENARIOS
    if (containsAny(lowerText, ['currency', 'exchange rate', 'fx rate', 'forex', 'yen', 'euro', 'yuan', 'rmb', 
                                'peso', 'won', 'dollar', 'usd', 'eur', 'jpy', 'cny', 'mxn', 'krw'])) {
        const fxValue = extractPercentage(lowerText, ['exchange', 'fx', 'currency', 'rate']);
        const finalFxValue = fxValue !== null ? fxValue : 5;
        
        if (containsAny(lowerText, ['weaker', 'weaken', 'depreciation', 'depreciate', 'fall', 'falls', 'down', 
                                    'decline', 'declines', 'lower'])) {
            levers['fx-rate'] = Math.max(Math.min(-finalFxValue, 0), -10);
            explanations.push(`Applied ${finalFxValue}% currency depreciation`);
        } else if (containsAny(lowerText, ['stronger', 'strengthen', 'appreciation', 'appreciate', 'rise', 'rises', 
                                           'up', 'increase', 'higher'])) {
            levers['fx-rate'] = Math.min(Math.max(finalFxValue, 0), 10);
            explanations.push(`Applied ${finalFxValue}% currency appreciation`);
        }
    }

    // 13. RECESSION/ECONOMIC SCENARIOS
    if (containsAny(lowerText, ['recession', 'economic downturn', 'economic slowdown', 'slowdown', 'downturn', 
                                'crisis', 'crises', 'depression', 'stagnation', 'gdp decline', 'economic decline'])) {
        levers['volume-growth'] = -15;
        levers['market-share'] = -3;
        levers['price-change'] = -5;
        levers['labor-productivity'] = -2;
        levers['marketing-spend'] = -10;
        explanations.push('Modeled recession scenario with reduced demand');
    }

    // 14. GROWTH/EXPANSION SCENARIOS
    if (containsAny(lowerText, ['economic growth', 'expansion', 'boom', 'prosperity', 'gdp growth', 'economic recovery', 
                                'recovery', 'upturn', 'economic expansion'])) {
        const growthValue = extractPercentage(lowerText, ['growth', 'expansion', 'gdp']);
        const finalGrowthValue = growthValue !== null ? growthValue : 8;
        levers['volume-growth'] = Math.min(Math.max(finalGrowthValue, 0), 20);
        levers['market-share'] = Math.min(finalGrowthValue / 4, 2);
        levers['price-change'] = Math.min(finalGrowthValue / 4, 3);
        explanations.push(`Applied ${finalGrowthValue}% economic growth scenario`);
    }

    // 15. INFLATION SCENARIOS
    if (containsAny(lowerText, ['inflation', 'inflationary', 'cpi', 'consumer price index', 'price inflation', 
                                'cost inflation', 'general inflation'])) {
        const inflationValue = extractPercentage(lowerText, ['inflation', 'cpi']);
        const finalInflationValue = inflationValue !== null ? inflationValue : 5;
        levers['material-inflation'] = Math.min(Math.max(finalInflationValue, 0), 15);
        levers['price-change'] = Math.min(finalInflationValue * 0.8, 8);
        explanations.push(`Applied ${finalInflationValue}% inflation impact`);
    }

    // 16. NEW PRODUCT LAUNCH SCENARIOS
    if (containsAny(lowerText, ['new product', 'new products', 'product launch', 'launch', 'launches', 'new model', 
                                'new vehicle', 'new line', 'new platform'])) {
        const launchValue = extractPercentage(lowerText, ['launch', 'new', 'product']);
        const finalLaunchValue = launchValue !== null ? launchValue : 5;
        levers['volume-growth'] = Math.min(Math.max(finalLaunchValue, 0), 20);
        levers['market-share'] = Math.min(finalLaunchValue / 3, 3);
        levers['marketing-spend'] = Math.min(finalLaunchValue * 2, 25);
        explanations.push(`Applied new product launch scenario`);
    }

    // 17. COMPETITIVE PRICING SCENARIOS
    if (containsAny(lowerText, ['price war', 'pricing war', 'competitive pricing', 'competitor pricing', 
                                'match price', 'price competition', 'discount war'])) {
        levers['price-change'] = Math.max(Math.min(-5, 0), -10);
        levers['market-share'] = Math.min(1, 2);
        levers['marketing-spend'] = Math.min(10, 20);
        explanations.push('Applied competitive pricing war scenario');
    }

    // 18. FUEL PRICE SCENARIOS
    if (containsAny(lowerText, ['fuel price', 'gas price', 'gasoline', 'diesel', 'oil price', 'energy cost', 
                                'energy prices'])) {
        const fuelValue = extractPercentage(lowerText, ['fuel', 'gas', 'oil', 'energy', 'price']);
        const finalFuelValue = fuelValue !== null ? fuelValue : 10;
        
        if (isIncrease(lowerText)) {
            levers['volume-growth'] = Math.max(Math.min(-finalFuelValue * 0.3, 0), -10);
            levers['material-inflation'] = Math.min(finalFuelValue * 0.3, 5);
            explanations.push(`Applied ${finalFuelValue}% fuel price increase`);
        }
    }

    // 19. REGULATORY SCENARIOS
    if (containsAny(lowerText, ['regulation', 'regulations', 'regulatory', 'compliance', 'emissions', 'emission', 
                                'epa', 'safety', 'standard', 'standards', 'mandate', 'mandates'])) {
        const regValue = extractPercentage(lowerText, ['regulation', 'compliance', 'standard']);
        const finalRegValue = regValue !== null ? regValue : 5;
        levers['material-inflation'] = Math.min(Math.max(finalRegValue * 0.5, 0), 8);
        levers['volume-growth'] = Math.max(Math.min(-finalRegValue * 0.2, 0), -5);
        explanations.push(`Applied regulatory compliance cost impact`);
    }

    // 20. CAPACITY SCENARIOS
    if (containsAny(lowerText, ['capacity', 'production capacity', 'manufacturing capacity', 'plant capacity', 
                                'factory capacity', 'overcapacity', 'under capacity'])) {
        const capacityValue = extractPercentage(lowerText, ['capacity', 'production']);
        const finalCapacityValue = capacityValue !== null ? capacityValue : 10;
        
        if (containsAny(lowerText, ['increase', 'expand', 'expansion', 'add', 'more'])) {
            levers['volume-growth'] = Math.min(Math.max(finalCapacityValue * 0.8, 0), 20);
            explanations.push(`Applied ${finalCapacityValue}% capacity expansion`);
        } else if (containsAny(lowerText, ['decrease', 'reduce', 'shutdown', 'close', 'idle'])) {
            levers['volume-growth'] = Math.max(Math.min(-finalCapacityValue * 0.8, 0), -20);
            explanations.push(`Applied ${finalCapacityValue}% capacity reduction`);
        }
    }

    // 21. SEASONAL SCENARIOS
    if (containsAny(lowerText, ['seasonal', 'season', 'quarter', 'q1', 'q2', 'q3', 'q4', 'holiday', 'holidays', 
                                'summer', 'winter', 'spring', 'fall', 'autumn'])) {
        if (containsAny(lowerText, ['strong', 'high', 'peak', 'busy', 'demand'])) {
            levers['volume-growth'] = Math.min(8, 15);
            explanations.push('Applied seasonal demand increase');
        } else if (containsAny(lowerText, ['weak', 'low', 'slow', 'quiet'])) {
            levers['volume-growth'] = Math.max(-8, -15);
            explanations.push('Applied seasonal demand decrease');
        }
    }

    // Default fallback: try to extract numbers and infer context
    if (Object.keys(levers).length === 0) {
        const numbers = lowerText.match(/\d+/g);
        if (numbers && numbers.length > 0) {
            const firstNumber = parseFloat(numbers[0]);
            
            if (containsAny(lowerText, ['revenue', 'sales', 'top line'])) {
                if (isDecrease(lowerText)) {
                    levers['volume-growth'] = Math.max(Math.min(-firstNumber, 0), -20);
                } else {
                    levers['volume-growth'] = Math.min(Math.max(firstNumber, 0), 20);
                }
                explanations.push(`Inferred ${firstNumber}% impact on volume`);
            } else if (containsAny(lowerText, ['cost', 'costs', 'expense', 'expenses', 'spend', 'spending'])) {
                if (isIncrease(lowerText)) {
                    levers['material-inflation'] = Math.min(Math.max(firstNumber, 0), 15);
                } else {
                    levers['material-inflation'] = Math.max(Math.min(-firstNumber, 0), -5);
                }
                explanations.push(`Inferred ${firstNumber}% impact on costs`);
            } else if (containsAny(lowerText, ['margin', 'profitability', 'profit'])) {
                if (isDecrease(lowerText)) {
                    levers['price-change'] = Math.max(Math.min(-firstNumber * 0.5, 0), -10);
                    levers['material-inflation'] = Math.min(firstNumber * 0.5, 10);
                } else {
                    levers['price-change'] = Math.min(Math.max(firstNumber * 0.5, 0), 10);
                    levers['material-inflation'] = Math.max(Math.min(-firstNumber * 0.3, 0), -5);
                }
                explanations.push(`Inferred ${firstNumber}% impact on margins`);
            }
        }
    }

    const explanation = explanations.length > 0 
        ? explanations.join('. ') 
        : 'Analyzed scenario and adjusted relevant levers based on key factors identified.';

    return { levers, explanation };
};

