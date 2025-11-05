'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
    Activity,
    ArrowRight,
    Brain,
    CheckCircle,
    Cloud,
    Database,
    Eye,
    FileText,
    GitBranch,
    Layers,
    Network,
    Play,
    Search,
    Shield,
    Sparkles,
    Target,
    TrendingUp,
    Users,
    Zap
} from 'lucide-react';
import { useState } from 'react';
import AgentGallery from './AgentGallery';
import WorkflowAnimations from './WorkflowAnimations';

const tabs = [
    { id: 'gallery', name: 'Agent Gallery', icon: Users },
    { id: 'workflows', name: 'Workflows', icon: GitBranch }
];

export default function AIAgentsPage() {
    const [activeTab, setActiveTab] = useState('gallery');

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="p-3 bg-purple-gradient rounded-xl shadow-lg glow-purple">
                                <Brain className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">AI Agents</h1>
                                <p className="text-gray-600">Digital team members orchestrating Finance360 workflows</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white border-b border-gray-200">
                <div className="px-4 sm:px-6 lg:px-8">
                    <nav className="flex space-x-8 -mb-px">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`
                                        flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors
                                        ${activeTab === tab.id
                                            ? 'border-purple-500 text-purple-600'
                                            : 'border-transparent text-gray-500 hover:text-navy-900 hover:border-gray-300'
                                        }
                                    `}
                                >
                                    <Icon className="w-4 h-4" />
                                    <span>{tab.name}</span>
                                </button>
                            );
                        })}
                    </nav>
                </div>
            </div>

            {/* Content */}
            <div className="px-4 sm:px-6 lg:px-8 py-8">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {activeTab === 'gallery' && <AgentGallery />}
                        {activeTab === 'workflows' && <WorkflowAnimations />}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

