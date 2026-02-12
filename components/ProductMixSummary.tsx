'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { ExcelDriverTreeData, AccountingFactRecord, ProductDIMRecord } from '@/lib/excel-parser';
import { Filter, ChevronDown, X } from 'lucide-react';

interface ProductMixSummaryProps {
    excelData: ExcelDriverTreeData | null;
}

interface ProductSegmentSummary {
    productSegment: string;
    totalAmount: number;
}

export default function ProductMixSummary({ excelData }: ProductMixSummaryProps) {
    const [selectedPeriods, setSelectedPeriods] = useState<Set<string>>(new Set());
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Parse period string to date for sorting
    const parsePeriodDate = (period: string): Date | null => {
        if (!period) return null;
        
        const periodStr = String(period).trim();
        
        // Try YYYYMMDD format (8 digits) - common Excel date format
        const yyyymmddMatch = periodStr.match(/^(\d{4})(\d{2})(\d{2})$/);
        if (yyyymmddMatch) {
            const year = parseInt(yyyymmddMatch[1]);
            const month = parseInt(yyyymmddMatch[2]) - 1;
            const day = parseInt(yyyymmddMatch[3]);
            if (year >= 1900 && year <= 2100 && month >= 0 && month <= 11 && day >= 1 && day <= 31) {
                const date = new Date(year, month, day);
                if (!isNaN(date.getTime())) {
                    return date;
                }
            }
        }
        
        // Try YYYY-MM-DD format
        const yyyymmddDashMatch = periodStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        if (yyyymmddDashMatch) {
            const year = parseInt(yyyymmddDashMatch[1]);
            const month = parseInt(yyyymmddDashMatch[2]) - 1;
            const day = parseInt(yyyymmddDashMatch[3]);
            if (year >= 1900 && year <= 2100 && month >= 0 && month <= 11 && day >= 1 && day <= 31) {
                const date = new Date(year, month, day);
                if (!isNaN(date.getTime())) {
                    return date;
                }
            }
        }
        
        // Try MM/DD/YYYY format
        const mmddyyyyMatch = periodStr.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
        if (mmddyyyyMatch) {
            const month = parseInt(mmddyyyyMatch[1]) - 1;
            const day = parseInt(mmddyyyyMatch[2]);
            const year = parseInt(mmddyyyyMatch[3]);
            if (year >= 1900 && year <= 2100 && month >= 0 && month <= 11 && day >= 1 && day <= 31) {
                const date = new Date(year, month, day);
                if (!isNaN(date.getTime())) {
                    return date;
                }
            }
        }
        
        // Try quarterly formats
        const quarterlyMatch1 = periodStr.match(/Q(\d)\s+(\d{4})/i); // Q1 2024
        if (quarterlyMatch1) {
            const quarter = parseInt(quarterlyMatch1[1]);
            const year = parseInt(quarterlyMatch1[2]);
            if (year >= 1900 && year <= 2100 && quarter >= 1 && quarter <= 4) {
                return new Date(year, (quarter - 1) * 3, 1);
            }
        }
        
        const quarterlyMatch2 = periodStr.match(/(\d{4})-Q(\d)/i); // 2024-Q1
        if (quarterlyMatch2) {
            const year = parseInt(quarterlyMatch2[1]);
            const quarter = parseInt(quarterlyMatch2[2]);
            if (year >= 1900 && year <= 2100 && quarter >= 1 && quarter <= 4) {
                return new Date(year, (quarter - 1) * 3, 1);
            }
        }
        
        // Try year-month formats
        const yearMonthMatch1 = periodStr.match(/^(\d{4})M(\d{2})$/); // 2024M01
        if (yearMonthMatch1) {
            const year = parseInt(yearMonthMatch1[1]);
            const month = parseInt(yearMonthMatch1[2]) - 1;
            if (year >= 1900 && year <= 2100 && month >= 0 && month <= 11) {
                return new Date(year, month, 1);
            }
        }
        
        const yearMonthMatch2 = periodStr.match(/^(\d{4})(\d{2})$/); // 202401 (6 digits)
        if (yearMonthMatch2 && yearMonthMatch2[0].length === 6) {
            const year = parseInt(yearMonthMatch2[1]);
            const month = parseInt(yearMonthMatch2[2]) - 1;
            if (year >= 1900 && year <= 2100 && month >= 0 && month <= 11) {
                return new Date(year, month, 1);
            }
        }
        
        // Try Excel serial date number (days since 1900-01-01)
        // Excel serial dates: 1 = Jan 1, 1900, but Excel incorrectly treats 1900 as leap year
        // So we use Dec 31, 1899 as the epoch and add serial days (not serial - 1)
        const excelSerialMatch = periodStr.match(/^\d+(\.\d+)?$/);
        if (excelSerialMatch) {
            const serial = parseFloat(periodStr);
            // Excel dates are typically between 1 (Jan 1, 1900) and ~50000 (around 2037)
            // But also check for larger numbers that might be timestamps or other formats
            if (serial >= 1 && serial <= 100000) {
                // Excel epoch: Dec 31, 1899 (because Excel treats 1900 as leap year incorrectly)
                // Excel serial 1 = Jan 1, 1900, so we add serial days to Dec 31, 1899
                const excelEpoch = new Date(1899, 11, 31); // Month is 0-indexed, so 11 = December
                const date = new Date(excelEpoch.getTime() + serial * 24 * 60 * 60 * 1000);
                if (!isNaN(date.getTime())) {
                    const year = date.getFullYear();
                    if (year >= 1900 && year <= 2100) {
                        return date;
                    }
                }
            }
            // If serial is very large, it might be a timestamp (milliseconds since epoch)
            else if (serial > 100000 && serial < 1000000000000) {
                // Try as milliseconds timestamp
                const date = new Date(serial);
                if (!isNaN(date.getTime())) {
                    const year = date.getFullYear();
                    if (year >= 1900 && year <= 2100) {
                        return date;
                    }
                }
            }
        }
        
        // Last resort: try standard Date parsing, but validate the result
        const directDate = new Date(periodStr);
        if (!isNaN(directDate.getTime())) {
            const year = directDate.getFullYear();
            // Only accept if year is reasonable (1900-2100)
            if (year >= 1900 && year <= 2100) {
                return directDate;
            }
        }
        
        return null;
    };

    // Format period as short date
    const formatPeriodAsShortDate = (period: string): string => {
        const date = parsePeriodDate(period);
        if (date) {
            const year = date.getFullYear();
            // Double-check the year is reasonable before formatting
            if (year >= 1900 && year <= 2100) {
                return new Intl.DateTimeFormat('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                }).format(date);
            }
        }
        // If parsing failed or year is invalid, try to extract year from the string
        const yearMatch = String(period).match(/(\d{4})/);
        if (yearMatch) {
            const year = parseInt(yearMatch[1]);
            if (year >= 1900 && year <= 2100) {
                // Try to parse as date with the extracted year
                const testDate = new Date(period);
                if (!isNaN(testDate.getTime()) && testDate.getFullYear() === year) {
                    return new Intl.DateTimeFormat('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                    }).format(testDate);
                }
            }
        }
        return period; // Return original if can't parse
    };

    // Extract unique periods from accounting fact records
    const availablePeriods = useMemo(() => {
        if (!excelData?.accountingFactRecords || excelData.accountingFactRecords.length === 0) {
            return [];
        }
        const periods = new Set<string>();
        excelData.accountingFactRecords.forEach(record => {
            if (record.period) {
                periods.add(record.period);
            }
        });
        // Sort by date if possible
        return Array.from(periods).sort((a, b) => {
            const dateA = parsePeriodDate(a);
            const dateB = parsePeriodDate(b);
            if (dateA && dateB) {
                return dateA.getTime() - dateB.getTime();
            }
            return a.localeCompare(b);
        });
    }, [excelData]);

    // Calculate totals by Product Segment
    const segmentTotals = useMemo(() => {
        if (!excelData?.accountingFactRecords || !excelData?.productDIM) {
            return [];
        }

        const totals = new Map<string, number>();

        excelData.accountingFactRecords.forEach(record => {
            // Filter by period if any periods are selected
            if (selectedPeriods.size > 0 && record.period && !selectedPeriods.has(record.period)) {
                return;
            }

            // Join with Product DIM to get Product Segment
            if (record.productId && excelData.productDIM) {
                const productDIM = excelData.productDIM.get(record.productId);
                if (productDIM && productDIM.productSegment) {
                    const segment = productDIM.productSegment;
                    const currentTotal = totals.get(segment) || 0;
                    totals.set(segment, currentTotal + record.accountedAmount);
                }
            }
        });

        // Convert to array and sort by total amount (descending)
        const result: ProductSegmentSummary[] = Array.from(totals.entries())
            .map(([productSegment, totalAmount]) => ({
                productSegment,
                totalAmount
            }))
            .sort((a, b) => b.totalAmount - a.totalAmount);

        return result;
    }, [excelData, selectedPeriods]);

    // Format currency
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    // Calculate grand total
    const grandTotal = useMemo(() => {
        return segmentTotals.reduce((sum, segment) => sum + segment.totalAmount, 0);
    }, [segmentTotals]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    // Toggle period selection
    const togglePeriod = (period: string) => {
        const newSelected = new Set(selectedPeriods);
        if (newSelected.has(period)) {
            newSelected.delete(period);
        } else {
            newSelected.add(period);
        }
        setSelectedPeriods(newSelected);
    };

    // Get display text for selected periods
    const getDisplayText = () => {
        if (selectedPeriods.size === 0) {
            return 'All Periods';
        }
        if (selectedPeriods.size === 1) {
            const period = Array.from(selectedPeriods)[0];
            return formatPeriodAsShortDate(period);
        }
        return `${selectedPeriods.size} periods selected`;
    };

    if (!excelData || !excelData.accountingFactRecords || excelData.accountingFactRecords.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <p className="text-sm text-gray-500 text-center">
                    No Excel data available. Please upload an Excel file with Accounting Fact and Product DIM data.
                </p>
            </div>
        );
    }

    if (!excelData.productDIM || excelData.productDIM.size === 0) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <p className="text-sm text-gray-500 text-center">
                    No Product DIM data found. Please ensure your Excel file contains a "Product DIM" sheet with Product ID and Product Segment columns.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-navy-900 mb-4">Product Mix Summary</h3>
                
                {/* Period Filter - Multi-select Dropdown */}
                <div className="flex items-start space-x-3 mb-4">
                    <Filter className="w-4 h-4 text-gray-500 mt-1" />
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Period:
                        </label>
                        <div className="relative" ref={dropdownRef}>
                            <button
                                type="button"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="w-full px-3 py-2 text-left border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent flex items-center justify-between"
                            >
                                <span className="text-gray-900">{getDisplayText()}</span>
                                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>
                            
                            {isDropdownOpen && (
                                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                    <div className="p-2 border-b border-gray-200 sticky top-0 bg-white">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-medium text-gray-700">
                                                {selectedPeriods.size} of {availablePeriods.length} selected
                                            </span>
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    type="button"
                                                    onClick={() => setSelectedPeriods(new Set(availablePeriods))}
                                                    className="text-xs text-cyan-600 hover:text-cyan-700 font-medium"
                                                >
                                                    Select All
                                                </button>
                                                <span className="text-xs text-gray-400">|</span>
                                                <button
                                                    type="button"
                                                    onClick={() => setSelectedPeriods(new Set())}
                                                    className="text-xs text-cyan-600 hover:text-cyan-700 font-medium"
                                                >
                                                    Clear All
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="py-1">
                                        {availablePeriods.map(period => {
                                            const isSelected = selectedPeriods.has(period);
                                            return (
                                                <label
                                                    key={period}
                                                    className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={isSelected}
                                                        onChange={() => togglePeriod(period)}
                                                        className="w-4 h-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500"
                                                    />
                                                    <span className="ml-2 text-sm text-gray-900">
                                                        {formatPeriodAsShortDate(period)}
                                                    </span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Table */}
            {segmentTotals.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Product Segment
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    Accounted Amount
                                </th>
                                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                    % of Total
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {segmentTotals.map((segment, index) => {
                                const percentage = grandTotal !== 0 ? (segment.totalAmount / grandTotal) * 100 : 0;
                                return (
                                    <tr 
                                        key={segment.productSegment || `segment-${index}`}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                            {segment.productSegment || 'Unknown'}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-right text-gray-900 font-medium">
                                            {formatCurrency(segment.totalAmount)}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-right text-gray-600">
                                            {percentage.toFixed(2)}%
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                        <tfoot>
                            <tr className="bg-navy-50 border-t-2 border-navy-200 font-semibold">
                                <td className="px-4 py-3 text-sm text-gray-900">
                                    Total
                                </td>
                                <td className="px-4 py-3 text-sm text-right text-navy-900">
                                    {formatCurrency(grandTotal)}
                                </td>
                                <td className="px-4 py-3 text-sm text-right text-navy-900">
                                    100.00%
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            ) : (
                <div className="text-center py-8">
                    <p className="text-sm text-gray-500">
                        {selectedPeriods.size > 0 
                            ? 'No data available for the selected periods.'
                            : 'No data available. Please select one or more periods to view data.'}
                    </p>
                </div>
            )}
        </div>
    );
}

