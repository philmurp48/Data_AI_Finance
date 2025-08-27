'use client';

import { filterReports, generateAllReports, getRecommendations, reportCategories, searchReports } from '@/lib/report-hub-full-data';
import { AnimatePresence, motion } from 'framer-motion';
import {
    Calendar,
    ChevronRight,
    Clock,
    Download,
    Eye,
    Filter,
    Grid,
    Heart,
    Info,
    List,
    Play,
    Search,
    Share2,
    Star,
    TrendingUp,
    X
} from 'lucide-react';
import { useState } from 'react';

// Generate all 600+ reports
const allReports = generateAllReports();

export default function ReportHubPage() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [selectedReport, setSelectedReport] = useState<any>(null);
    const [showFilters, setShowFilters] = useState(false);
    const [favorites, setFavorites] = useState<Set<number>>(new Set());

    // Filter states
    const [filters, setFilters] = useState({
        department: '',
        frequency: '',
        format: '',
        rating: 0
    });

    // Get filtered reports
    const filteredReports = filterReports(
        searchQuery ? searchReports(allReports, searchQuery) : allReports,
        { ...filters, category: selectedCategory }
    );

    // Toggle favorite
    const toggleFavorite = (reportId: number) => {
        setFavorites(prev => {
            const newFavorites = new Set(prev);
            if (newFavorites.has(reportId)) {
                newFavorites.delete(reportId);
            } else {
                newFavorites.add(reportId);
            }
            return newFavorites;
        });
    };

    // Report Card Component - Vertical Magazine Style
    const ReportCard = ({ report }: { report: any }) => {
        return (
            <motion.div
                className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all cursor-pointer p-4"
                onClick={() => setSelectedReport(report)}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
            >
                {/* Category Badge */}
                <div className="flex items-start justify-between mb-2">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${report.category === 'financial' ? 'bg-blue-100 text-blue-700' :
                        report.category === 'operational' ? 'bg-green-100 text-green-700' :
                            report.category === 'sales-marketing' ? 'bg-purple-100 text-purple-700' :
                                report.category === 'hr-people' ? 'bg-orange-100 text-orange-700' :
                                    report.category === 'supply-chain' ? 'bg-teal-100 text-teal-700' :
                                        report.category === 'compliance-risk' ? 'bg-red-100 text-red-700' :
                                            report.category === 'executive' ? 'bg-indigo-100 text-indigo-700' :
                                                'bg-gray-100 text-gray-700'
                        }`}>
                        {report.format}
                    </span>
                    {(report.isNew || report.isTrending) && (
                        <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${report.isNew ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                            }`}>
                            {report.isNew ? 'New' : <TrendingUp className="w-3 h-3" />}
                        </span>
                    )}
                </div>

                {/* Report Title */}
                <h3 className="font-semibold text-gray-900 text-sm mb-1.5 line-clamp-2 min-h-[2.5rem]">
                    {report.name}
                </h3>

                {/* Description */}
                <p className="text-xs text-gray-600 mb-3 line-clamp-2 min-h-[2rem]">
                    {report.description}
                </p>

                {/* Key Info Grid - Compact */}
                <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                    <div className="bg-gray-50 rounded px-2 py-1">
                        <div className="text-gray-500">{report.frequency}</div>
                    </div>
                    <div className="bg-gray-50 rounded px-2 py-1">
                        <div className="text-gray-500">{report.department}</div>
                    </div>
                </div>

                {/* Footer Stats */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center space-x-3 text-xs text-gray-500">
                        <span className="flex items-center">
                            <Star className="w-3 h-3 text-yellow-400 mr-0.5" />
                            {report.rating}
                        </span>
                        <span className="flex items-center">
                            <Eye className="w-3 h-3 mr-0.5" />
                            {(report.views / 1000).toFixed(0)}k
                        </span>
                    </div>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(report.id);
                        }}
                        className="p-1.5 rounded hover:bg-gray-100 transition-colors"
                    >
                        <Heart className={`w-3.5 h-3.5 ${favorites.has(report.id) ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} />
                    </button>
                </div>
            </motion.div>
        );
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="px-4 sm:px-6 lg:px-8">
                    {/* Top Section - Title and Stats */}
                    <div className="py-6 space-y-6">
                        <div className="flex items-start justify-between">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Report HUB</h1>
                                <p className="text-sm text-gray-600 mt-1">
                                    Navigate your current reporting landscape. As new consoles are created, reports will be retired and redirect you to the appropriate digital tools.
                                </p>
                            </div>
                            <div className="flex items-center space-x-8">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-blue-600">{allReports.length}</div>
                                    <div className="text-xs text-gray-500">Total Reports</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600">{allReports.filter(r => r.isTrending).length}</div>
                                    <div className="text-xs text-gray-500">Trending</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-purple-600">{favorites.size}</div>
                                    <div className="text-xs text-gray-500">Favorites</div>
                                </div>
                            </div>
                        </div>

                        {/* Search Bar - Moved to its own row */}
                        <div className="flex items-center space-x-4">
                            <div className="relative flex-1 max-w-2xl">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search reports..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                                />
                            </div>
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`px-4 py-3 rounded-lg border transition-colors flex items-center space-x-2 ${showFilters ? 'bg-blue-50 border-blue-200 text-blue-600' : 'border-gray-200 hover:bg-gray-50'
                                    }`}
                            >
                                <Filter className="w-4 h-4" />
                                <span className="text-sm font-medium">Filters</span>
                            </button>
                            <div className="flex items-center bg-gray-100 rounded-lg p-1">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                                        }`}
                                    title="Grid view"
                                >
                                    <Grid className="w-4 h-4 text-gray-600" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                                        }`}
                                    title="List view"
                                >
                                    <List className="w-4 h-4 text-gray-600" />
                                </button>
                            </div>
                        </div>

                        {/* Category Tabs - Cleaner design */}
                        <div className="border-t border-gray-100 -mx-8 px-8 pt-4">
                            <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-hide">
                                {reportCategories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => setSelectedCategory(category.id)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap flex items-center space-x-2 ${selectedCategory === category.id
                                                ? 'bg-blue-600 text-white shadow-sm'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                    >
                                        <span>{category.name}</span>
                                        <span className={`text-xs ${selectedCategory === category.id ? 'text-blue-200' : 'text-gray-500'
                                            }`}>
                                            {category.count}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters Panel */}
            <AnimatePresence>
                {showFilters && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-white border-b border-gray-200 overflow-hidden"
                    >
                        <div className="px-4 sm:px-6 lg:px-8 py-4">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                                    <select
                                        value={filters.department}
                                        onChange={(e) => setFilters({ ...filters, department: e.target.value })}
                                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">All Departments</option>
                                        <option value="Finance">Finance</option>
                                        <option value="Operations">Operations</option>
                                        <option value="Sales">Sales</option>
                                        <option value="Marketing">Marketing</option>
                                        <option value="HR">HR</option>
                                        <option value="IT">IT</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                                    <select
                                        value={filters.frequency}
                                        onChange={(e) => setFilters({ ...filters, frequency: e.target.value })}
                                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">All Frequencies</option>
                                        <option value="Real-time">Real-time</option>
                                        <option value="Daily">Daily</option>
                                        <option value="Weekly">Weekly</option>
                                        <option value="Monthly">Monthly</option>
                                        <option value="Quarterly">Quarterly</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Format</label>
                                    <select
                                        value={filters.format}
                                        onChange={(e) => setFilters({ ...filters, format: e.target.value })}
                                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">All Formats</option>
                                        <option value="PowerBI">PowerBI</option>
                                        <option value="Tableau">Tableau</option>
                                        <option value="Excel">Excel</option>
                                        <option value="Salesforce">Salesforce</option>
                                        <option value="Custom Dashboard">Custom Dashboard</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Min Rating</label>
                                    <select
                                        value={filters.rating}
                                        onChange={(e) => setFilters({ ...filters, rating: parseFloat(e.target.value) })}
                                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="0">All Ratings</option>
                                        <option value="4">4+ Stars</option>
                                        <option value="4.5">4.5+ Stars</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mt-4 flex justify-end">
                                <button
                                    onClick={() => {
                                        setFilters({ department: '', frequency: '', format: '', rating: 0 });
                                        setSearchQuery('');
                                    }}
                                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <div className="px-4 sm:px-6 lg:px-8 py-8">
                {/* Results Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">
                        {searchQuery ? `Search results for "${searchQuery}"` :
                            selectedCategory !== 'all' ? `${reportCategories.find(c => c.id === selectedCategory)?.name} Reports` :
                                'All Reports'}
                        <span className="text-gray-500 text-sm font-normal ml-2">({filteredReports.length} reports)</span>
                    </h2>

                    {/* Quick Stats */}
                    <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1 text-gray-500">
                            <TrendingUp className="w-4 h-4 text-yellow-500" />
                            <span>{filteredReports.filter(r => r.isTrending).length} trending</span>
                        </div>
                        <div className="flex items-center space-x-1 text-gray-500">
                            <Clock className="w-4 h-4 text-red-500" />
                            <span>{filteredReports.filter(r => r.isNew).length} new</span>
                        </div>
                    </div>
                </div>

                {/* Reports Grid/List */}
                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {filteredReports.map((report) => (
                            <ReportCard key={report.id} report={report} />
                        ))}
                    </div>
                ) : (
                    // List View
                    <div className="space-y-3">
                        {filteredReports.map((report) => (
                            <motion.div
                                key={report.id}
                                whileHover={{ x: 4 }}
                                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all p-4 cursor-pointer"
                                onClick={() => setSelectedReport(report)}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <h3 className="font-semibold text-gray-900">{report.name}</h3>
                                            <span className={`px-2 py-1 text-xs rounded-full ${report.category === 'financial' ? 'bg-blue-100 text-blue-700' :
                                                report.category === 'operational' ? 'bg-green-100 text-green-700' :
                                                    report.category === 'sales-marketing' ? 'bg-purple-100 text-purple-700' :
                                                        'bg-gray-100 text-gray-700'
                                                }`}>
                                                {report.category}
                                            </span>
                                            {report.isNew && <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-full">NEW</span>}
                                            {report.isTrending && <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full">Trending</span>}
                                        </div>
                                        <p className="text-sm text-gray-600 mb-2">{report.description}</p>
                                        <div className="flex items-center space-x-6 text-xs text-gray-500">
                                            <span className="flex items-center"><Eye className="w-3 h-3 mr-1" />{report.views}</span>
                                            <span className="flex items-center"><Star className="w-3 h-3 mr-1 text-yellow-400" />{report.rating}</span>
                                            <span>{report.frequency}</span>
                                            <span>{report.format}</span>
                                            <span>by {report.owner}</span>
                                            <span>Updated {report.lastUpdated}</span>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-gray-400" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {filteredReports.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg mb-4">No reports found matching your criteria</p>
                        <button
                            onClick={() => {
                                setFilters({ department: '', frequency: '', format: '', rating: 0 });
                                setSearchQuery('');
                                setSelectedCategory('all');
                            }}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Clear All Filters
                        </button>
                    </div>
                )}
            </div>

            {/* Report Detail Modal */}
            <AnimatePresence>
                {selectedReport && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedReport(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 p-6">
                                <button
                                    onClick={() => setSelectedReport(null)}
                                    className="absolute top-4 right-4 p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                                >
                                    <X className="w-5 h-5 text-white" />
                                </button>

                                <h2 className="text-2xl font-bold text-white mb-2">{selectedReport.name}</h2>
                                <div className="flex items-center space-x-4 text-sm text-blue-100">
                                    <span className="flex items-center">
                                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                                        {selectedReport.rating}
                                    </span>
                                    <span>{selectedReport.frequency}</span>
                                    <span>{selectedReport.format}</span>
                                    <span>{selectedReport.views} views</span>
                                </div>
                            </div>

                            {/* Modal Body */}
                            <div className="p-6 overflow-y-auto max-h-[calc(90vh-10rem)]">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="md:col-span-2">
                                        <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                                        <p className="text-gray-600 mb-6">{selectedReport.description}</p>

                                        {selectedReport.aiInsight && (
                                            <div className="bg-blue-50 rounded-lg p-4 mb-6">
                                                <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
                                                    <Info className="w-4 h-4 mr-2" />
                                                    AI Insight
                                                </h3>
                                                <p className="text-blue-700 text-sm">{selectedReport.aiInsight}</p>
                                            </div>
                                        )}

                                        <div className="mb-6">
                                            <h3 className="font-semibold text-gray-900 mb-2">Tags</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedReport.tags.map((tag: string) => (
                                                    <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex space-x-4">
                                            <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center">
                                                <Play className="w-5 h-5 mr-2" />
                                                Open Report
                                            </button>
                                            <button
                                                onClick={() => toggleFavorite(selectedReport.id)}
                                                className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
                                            >
                                                <Heart className={`w-5 h-5 mr-2 ${favorites.has(selectedReport.id) ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} />
                                                {favorites.has(selectedReport.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-4">Report Details</h3>
                                        <dl className="space-y-3">
                                            <div>
                                                <dt className="text-sm text-gray-500">Owner</dt>
                                                <dd className="text-sm font-medium text-gray-900">{selectedReport.owner}</dd>
                                            </div>
                                            <div>
                                                <dt className="text-sm text-gray-500">Department</dt>
                                                <dd className="text-sm font-medium text-gray-900">{selectedReport.department}</dd>
                                            </div>
                                            <div>
                                                <dt className="text-sm text-gray-500">Last Updated</dt>
                                                <dd className="text-sm font-medium text-gray-900">{selectedReport.lastUpdated}</dd>
                                            </div>
                                            <div>
                                                <dt className="text-sm text-gray-500">Next Update</dt>
                                                <dd className="text-sm font-medium text-gray-900">{selectedReport.nextUpdate}</dd>
                                            </div>
                                            <div>
                                                <dt className="text-sm text-gray-500">Access Level</dt>
                                                <dd className="text-sm font-medium text-gray-900">{selectedReport.accessLevel}</dd>
                                            </div>
                                            <div>
                                                <dt className="text-sm text-gray-500">Data Source</dt>
                                                <dd className="text-sm font-medium text-gray-900">{selectedReport.dataSource}</dd>
                                            </div>
                                        </dl>

                                        <div className="mt-6 pt-6 border-t">
                                            <h4 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h4>
                                            <div className="space-y-2">
                                                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center">
                                                    <Share2 className="w-4 h-4 mr-2" />
                                                    Share Report
                                                </button>
                                                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center">
                                                    <Download className="w-4 h-4 mr-2" />
                                                    Download
                                                </button>
                                                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center">
                                                    <Calendar className="w-4 h-4 mr-2" />
                                                    Schedule
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Recommendations */}
                                <div className="mt-8 pt-8 border-t">
                                    <h3 className="font-semibold text-gray-900 mb-4">Similar Reports You Might Like</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {getRecommendations(selectedReport, allReports).map((report) => (
                                            <div
                                                key={report.id}
                                                className="bg-gray-50 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                                                onClick={() => setSelectedReport(report)}
                                            >
                                                <h4 className="font-medium text-sm text-gray-900 line-clamp-2">{report.name}</h4>
                                                <div className="flex items-center mt-2 text-xs text-gray-500">
                                                    <Star className="w-3 h-3 text-yellow-400 mr-1" />
                                                    <span>{report.rating}</span>
                                                    <span className="mx-2">•</span>
                                                    <span>{report.frequency}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
} 