# AI Agent Design Patterns

**Standards for consistent AI agent representation across all prototypes**

---

## Overview

This document defines how to consistently represent AI agents, agentic workflows, and AI-powered features across all Accenture prototypes based on Finance360 and Controller AI Workbench implementations.

---

## Core Principles

### 1. AI Transparency
- Always show when AI is involved
- Display confidence levels when available
- Explain what the agent does
- Show the process, not just results

### 2. Human-in-the-Loop
- Clear interaction points for user input
- User can review, modify, or approve
- Never hide the human role

### 3. Professional Presentation
- Use purple (#A100FF) for AI/agent elements
- Consistent iconography
- Clear status indicators
- Professional, not playful

---

## AI Agent Gallery Pattern

### Standard Agent Card

Based on Finance360 AI Agents page:

```tsx
interface AgentCardProps {
  agentCode: string;        // e.g., "OR" for Orchestrator
  agentName: string;        // e.g., "Orchestrator Agent"
  description: string;      // What the agent does
  category: string;         // e.g., "Orchestrator Agents", "Super Agents"
  usedInWorkflows: number;  // How many workflows use this agent
  icon: React.ReactNode;    // Agent icon
  status: 'active' | 'available' | 'inactive';
  integrations?: string[];  // e.g., "SAP AR", "Salesforce"
}

export function AgentCard({
  agentCode,
  agentName,
  description,
  category,
  usedInWorkflows,
  icon,
  status,
  integrations
}: AgentCardProps) {
  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      {/* Color-coded top border */}
      <div className={cn(
        "h-1",
        getCategoryColor(category)
      )} />
      
      <div className="p-6">
        {/* Icon and Status */}
        <div className="flex items-start justify-between mb-4">
          <div className="h-12 w-12 rounded-lg bg-primary-100 flex items-center justify-center">
            {icon}
          </div>
          <div className="flex items-center">
            <div className={cn(
              "h-2 w-2 rounded-full",
              status === 'active' && "bg-green-500",
              status === 'available' && "bg-gray-400"
            )} />
            {integrations && integrations.length > 0 && (
              <span className="ml-2 text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                {integrations[0]}
              </span>
            )}
          </div>
        </div>

        {/* Agent Info */}
        <div className="mb-4">
          <div className="text-xs text-gray-500 font-medium mb-1">
            {agentCode}
          </div>
          <h3 className="text-base font-semibold text-gray-900 mb-2">
            {agentName}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Usage Stats */}
        <div className="pt-4 border-t border-gray-100">
          <div className="text-xs text-gray-500">
            Used in <span className="font-semibold text-gray-900">{usedInWorkflows}</span> {usedInWorkflows === 1 ? 'workflow' : 'workflows'}
          </div>
        </div>

        {/* Action */}
        <button className="mt-4 text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center">
          View Details
          <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>
    </div>
  );
}

// Category color helper
function getCategoryColor(category: string) {
  switch (category) {
    case 'Orchestrator Agents': return 'bg-purple-500';
    case 'Super Agents': return 'bg-blue-500';
    case 'Utility Agents': return 'bg-green-500';
    default: return 'bg-gray-500';
  }
}
```

### Agent Gallery Layout

```tsx
<div className="space-y-8">
  {/* Header */}
  <div className="flex items-center space-x-4">
    <div className="h-16 w-16 rounded-2xl bg-primary-500 flex items-center justify-center">
      <Brain className="h-8 w-8 text-white" />
    </div>
    <div>
      <h1 className="text-2xl font-bold text-gray-900">AI Agents</h1>
      <p className="text-gray-600">Digital team members orchestrating [Platform] workflows</p>
    </div>
  </div>

  {/* Tab Navigation */}
  <div className="border-b border-gray-200">
    <nav className="flex space-x-8">
      <button className="pb-4 border-b-2 border-primary-500 text-primary-600 font-medium">
        Agent Gallery
      </button>
      <button className="pb-4 border-b-2 border-transparent text-gray-500 hover:text-gray-700">
        Workflows
      </button>
    </nav>
  </div>

  {/* Agent Ecosystem Summary */}
  <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
    <div className="flex items-start space-x-3">
      <Brain className="h-6 w-6 text-primary-600 flex-shrink-0 mt-1" />
      <div>
        <h3 className="font-semibold text-gray-900 mb-2">
          [Platform] AI Agent Ecosystem
        </h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          Our platform is powered by a sophisticated network of AI agents specifically designed for [Domain]. 
          These digital team members operate across [functions], transforming [process] from batch-driven 
          to continuous, machine-assisted operations.
        </p>
      </div>
    </div>
    
    {/* Stats */}
    <div className="grid grid-cols-4 gap-4 mt-6">
      <div>
        <div className="text-3xl font-bold text-primary-600">1</div>
        <div className="text-xs text-gray-600">Orchestrator</div>
        <div className="text-xs text-gray-500">Coordinates all workflows</div>
      </div>
      <div>
        <div className="text-3xl font-bold text-primary-600">5</div>
        <div className="text-xs text-gray-600">Super Agents</div>
        <div className="text-xs text-gray-500">Handle complex operations</div>
      </div>
      <div>
        <div className="text-3xl font-bold text-primary-600">39</div>
        <div className="text-xs text-gray-600">Active Utility</div>
        <div className="text-xs text-gray-500">Used in workflows</div>
      </div>
      <div>
        <div className="text-3xl font-bold text-primary-600">2</div>
        <div className="text-xs text-gray-600">Available Agents</div>
        <div className="text-xs text-gray-500">Not yet in workflows</div>
      </div>
    </div>

    {/* Status Legend */}
    <div className="mt-4 flex items-center space-x-4 text-xs">
      <div className="flex items-center">
        <div className="h-2 w-2 rounded-full bg-green-500 mr-2" />
        <span className="text-gray-600">Active - Used in workflows</span>
      </div>
      <div className="flex items-center">
        <div className="h-2 w-2 rounded-full bg-gray-400 mr-2" />
        <span className="text-gray-600">Available - Not yet used</span>
      </div>
    </div>
  </div>

  {/* Category Filters */}
  <div className="flex items-center space-x-2">
    <button className="px-4 py-2 rounded-full bg-primary-500 text-white text-sm font-medium">
      All Agents
    </button>
    <button className="px-4 py-2 rounded-full bg-white border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50">
      Orchestrator Agents
    </button>
    <button className="px-4 py-2 rounded-full bg-white border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50">
      Super Agents
    </button>
    <button className="px-4 py-2 rounded-full bg-white border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50">
      Utility Agents
    </button>
  </div>

  {/* Agent Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {agents.map((agent) => (
      <AgentCard key={agent.agentCode} {...agent} />
    ))}
  </div>
</div>
```

---

## Agentic Workflow Visualization Pattern

### Workflow Display

Based on Finance360 Workflows page:

```tsx
interface WorkflowStep {
  step: number;
  name: string;
  description: string;
  status: 'completed' | 'processing' | 'pending' | 'skipped';
  agentsWorking: number;
}

interface WorkflowVisualizationProps {
  workflowName: string;
  workflowDescription: string;
  userInteraction: string;  // What user asked for
  steps: WorkflowStep[];
  totalSteps: number;
  agentCount: number;
}

export function WorkflowVisualization({
  workflowName,
  workflowDescription,
  userInteraction,
  steps,
  totalSteps,
  agentCount
}: WorkflowVisualizationProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8">
      {/* Header */}
      <div className="flex items-start space-x-4 mb-8">
        <div className="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center">
          <GitBranch className="h-6 w-6 text-green-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {workflowName}
          </h3>
          <p className="text-sm text-gray-600">
            {workflowDescription}
          </p>
        </div>
      </div>

      {/* User Interaction Callout */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-8">
        <div className="flex items-center space-x-3">
          <Users className="h-5 w-5 text-purple-600" />
          <div>
            <div className="text-xs font-semibold text-purple-900 uppercase mb-1">
              User Interaction
            </div>
            <div className="text-sm text-purple-800">
              "{userInteraction}"
            </div>
          </div>
        </div>
      </div>

      {/* Workflow Steps */}
      <div className="space-y-3">
        <div className="text-sm font-semibold text-gray-700 mb-4">
          WORKFLOW STEPS
        </div>
        
        {steps.map((step) => (
          <div
            key={step.step}
            className={cn(
              "rounded-lg border-2 p-4 transition-all",
              step.status === 'completed' && "border-green-500 bg-green-50",
              step.status === 'processing' && "border-purple-500 bg-purple-50",
              step.status === 'pending' && "border-gray-200 bg-white",
              step.status === 'skipped' && "border-gray-200 bg-gray-50 opacity-60"
            )}
          >
            <div className="flex items-center space-x-3">
              {/* Step Number */}
              <div className={cn(
                "h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold",
                step.status === 'completed' && "bg-green-500 text-white",
                step.status === 'processing' && "bg-purple-500 text-white",
                step.status === 'pending' && "bg-gray-300 text-gray-600"
              )}>
                {step.status === 'completed' ? <Check className="h-5 w-5" /> : step.step}
              </div>

              {/* Step Name */}
              <div className="flex-1">
                <div className="font-semibold text-gray-900">
                  {step.name}
                </div>
                {step.status === 'processing' && (
                  <div className="text-xs text-purple-600 mt-1">
                    Processing
                  </div>
                )}
              </div>

              {/* Agent Indicator (if processing) */}
              {step.status === 'processing' && step.agentsWorking > 0 && (
                <div className="flex items-center space-x-2">
                  <div className="flex items-center text-xs text-gray-600">
                    <Brain className="h-4 w-4 text-purple-600 mr-1" />
                    {step.agentsWorking} AI agent{step.agentsWorking > 1 ? 's' : ''} working on this step
                  </div>
                </div>
              )}
            </div>

            {/* Expanded Details (for processing step) */}
            {step.status === 'processing' && (
              <div className="mt-4 ml-11 space-y-3">
                {/* Agent Badge */}
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-500 text-white text-xs font-medium">
                  <Zap className="h-3 w-3 mr-2" />
                  Integrated Data Aggregator
                </div>

                {/* Data Flow */}
                <div className="text-xs text-gray-600">
                  <div className="font-semibold mb-1">DATA FLOW</div>
                  <div>{step.description}</div>
                </div>

                {/* Status */}
                <div className="text-xs">
                  <div className="font-semibold text-gray-600 mb-1">STATUS</div>
                  <div className="text-gray-900">Processing</div>
                </div>

                {/* Progress */}
                <div className="text-xs">
                  <div className="font-semibold text-gray-600 mb-1">PROGRESS</div>
                  <div className="text-gray-900">Step 2 of 7</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Behind the Scenes */}
      <div className="mt-6 p-4 bg-purple-50 border border-purple-100 rounded-lg">
        <div className="flex items-start space-x-2">
          <Brain className="h-4 w-4 text-purple-600 mt-0.5" />
          <div className="text-xs text-purple-900">
            <span className="font-semibold">AI AGENTS WORKING BEHIND THE SCENES</span>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## AI Search Pattern

### Prominent AI Search Bar

From Finance360 header:

```tsx
export function AISearchBar() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Ask me anything about your business..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-12 pr-32 py-3 rounded-full bg-white border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20 text-gray-900 placeholder-gray-500"
        />
        <button 
          className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 text-white font-medium hover:from-purple-600 hover:to-purple-700 transition-all"
          onClick={() => handleSearch(query)}
        >
          AI Search
        </button>
      </div>
    </div>
  );
}
```

---

## Agent Badge Pattern

### Small Agent Indicator

For showing AI involvement in items:

```tsx
interface AgentBadgeProps {
  agentCode?: string;  // e.g., "Ja" for Journal Agent
  agentName?: string;  // e.g., "Journal Agent"
  confidence?: number; // 0-100
  size?: 'sm' | 'md' | 'lg';
  variant?: 'subtle' | 'prominent';
}

export function AgentBadge({
  agentCode,
  agentName,
  confidence,
  size = 'sm',
  variant = 'subtle'
}: AgentBadgeProps) {
  return (
    <div className={cn(
      "inline-flex items-center rounded-full font-medium",
      size === 'sm' && "px-2 py-0.5 text-xs",
      size === 'md' && "px-3 py-1 text-sm",
      size === 'lg' && "px-4 py-1.5 text-base",
      variant === 'subtle' && "bg-purple-50 text-purple-700 border border-purple-200",
      variant === 'prominent' && "bg-purple-500 text-white"
    )}>
      <Sparkles className={cn(
        "mr-1.5",
        size === 'sm' && "h-3 w-3",
        size === 'md' && "h-4 w-4",
        size === 'lg' && "h-5 w-5"
      )} />
      {agentCode && <span>{agentCode}</span>}
      {agentName && <span>{agentName}</span>}
      {confidence && (
        <span className="ml-1.5 opacity-75">
          {confidence}%
        </span>
      )}
    </div>
  );
}
```

---

## Scenario Modeling Pattern

### Interactive Sliders with Impact

From Finance360 Scenario Modeling:

```tsx
interface ScenarioLeverProps {
  name: string;
  description: string;
  value: number;
  onChange: (value: number) => void;
  impact: 'high' | 'medium' | 'low';
  min?: number;
  max?: number;
}

export function ScenarioLever({
  name,
  description,
  value,
  onChange,
  impact,
  min = 0,
  max = 100
}: ScenarioLeverProps) {
  return (
    <div className="py-4 border-b border-gray-200 last:border-0">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="font-semibold text-gray-900 mb-1">{name}</div>
          <div className="text-xs text-gray-500">{description}</div>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-sm font-bold text-gray-900">{value}%</span>
          <span className={cn(
            "px-2 py-0.5 rounded-full text-xs font-medium",
            impact === 'high' && "bg-red-100 text-red-700",
            impact === 'medium' && "bg-yellow-100 text-yellow-700",
            impact === 'low' && "bg-green-100 text-green-700"
          )}>
            {impact}
          </span>
        </div>
      </div>

      {/* Slider */}
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-purple"
        style={{
          background: `linear-gradient(to right, #A100FF 0%, #A100FF ${value}%, #e5e7eb ${value}%, #e5e7eb 100%)`
        }}
      />
    </div>
  );
}

// CSS for slider thumb
/* Add to globals.css:
.slider-purple::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #A100FF;
  cursor: pointer;
  border: 3px solid white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}
*/
```

### Scenario Cards

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {scenarios.map((scenario) => (
    <button
      key={scenario.id}
      className="text-left p-4 rounded-lg border-2 border-gray-200 hover:border-primary-500 hover:shadow-md transition-all"
    >
      <div className="font-bold text-gray-900 mb-1">
        {scenario.name}
      </div>
      <div className="text-sm text-gray-600 mb-2">
        {scenario.subtitle}
      </div>
      <div className={cn(
        "text-2xl font-bold mb-1",
        scenario.impact > 0 ? "text-green-600" : "text-red-600"
      )}>
        {scenario.impact > 0 ? '+' : ''}{scenario.impact}M
      </div>
      <div className="text-xs text-gray-500">
        {scenario.probability}
      </div>
    </button>
  ))}
</div>
```

---

## AI-Powered Insights Pattern

### Personalized Insight Cards

From Finance360 dashboard:

```tsx
<div className="bg-white rounded-xl border border-gray-200 p-6">
  <div className="flex items-center justify-between mb-6">
    <h2 className="text-lg font-bold text-gray-900">
      Your Personalized AI-driven Insights & Actions
    </h2>
  </div>

  {/* Insight Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
    {insights.map((insight) => (
      <div 
        key={insight.id}
        className="relative"
      >
        {/* Status Bar (top) */}
        <div className={cn(
          "absolute top-0 left-0 right-0 h-1 rounded-t-lg",
          insight.status === 'critical' && "bg-red-500",
          insight.status === 'warning' && "bg-yellow-500",
          insight.status === 'good' && "bg-green-500",
          insight.status === 'info' && "bg-blue-500"
        )} />

        {/* Card Content */}
        <div className="pt-4 px-4 pb-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
          {/* Icon and Trend */}
          <div className="flex items-start justify-between mb-3">
            <div className="h-8 w-8 rounded-lg bg-purple-100 flex items-center justify-center">
              <insight.icon className="h-5 w-5 text-purple-600" />
            </div>
            <span className="text-xs font-medium text-red-600">
              -{insight.trendValue}%
            </span>
          </div>

          {/* Metric */}
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {insight.value}
          </div>
          <div className="text-sm text-gray-600 mb-3">
            {insight.title}
          </div>

          {/* Indicator/Chart */}
          {insight.indicator && (
            <div className="mb-3">
              {insight.indicator}
            </div>
          )}

          {/* Detail Text */}
          <div className="text-xs text-gray-500 mb-3">
            {insight.detail}
          </div>

          {/* Category Label */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">
              {insight.category}
            </span>
            <button className="text-xs text-primary-600 hover:text-primary-700 font-medium flex items-center">
              View Details
              <ChevronRight className="h-3 w-3 ml-1" />
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
```

---

## How AI Works Explanations

### Standard "How AI..." Pattern

```tsx
<div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
  <div className="flex items-start space-x-4">
    <div className="h-10 w-10 rounded-lg bg-green-500 flex items-center justify-center flex-shrink-0">
      <Brain className="h-6 w-6 text-white" />
    </div>
    <div>
      <h3 className="font-bold text-gray-900 mb-2">
        How AI Auto-Posts Journal Entries to GL
      </h3>
      <p className="text-sm text-gray-700">
        Agent "Ja" processes 4,788 entries automatically with 92.1% automation rate
      </p>
    </div>
  </div>
</div>
```

### AI Process Steps

```tsx
<div className="space-y-2">
  <div className="flex items-center space-x-3">
    <div className="h-6 w-6 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-bold">
      1
    </div>
    <span className="text-sm text-gray-700">Agent retrieves baseline financial data</span>
  </div>
  <div className="flex items-center space-x-3">
    <div className="h-6 w-6 rounded-full bg-purple-500 text-white flex items-center justify-center text-xs font-bold">
      2
    </div>
    <span className="text-sm text-gray-700">Scenario parameters applied to model</span>
  </div>
  <div className="flex items-center space-x-3">
    <div className="h-6 w-6 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center text-xs font-bold">
      3
    </div>
    <span className="text-sm text-gray-500">Validation and results analysis</span>
  </div>
</div>
```

---

## AI Agent Color Coding

### By Agent Type/Category

```tsx
const agentCategoryColors = {
  orchestrator: {
    primary: '#A100FF',    // Purple
    light: '#F3E8FF',
    border: '#C084FC'
  },
  reporting: {
    primary: '#224BFF',    // Blue
    light: '#DBEAFE',
    border: '#93C5FD'
  },
  planning: {
    primary: '#10B981',    // Green
    light: '#D1FAE5',
    border: '#6EE7B7'
  },
  analytics: {
    primary: '#F59E0B',    // Amber
    light: '#FEF3C7',
    border: '#FCD34D'
  },
  automation: {
    primary: '#06B6D4',    // Cyan
    light: '#CFFAFE',
    border: '#67E8F9'
  }
};
```

---

## Agent Status Indicators

### Standard Status System

```tsx
interface AgentStatus {
  status: 'active' | 'processing' | 'idle' | 'error' | 'available';
  label: string;
  color: string;
}

const agentStatuses = {
  active: {
    label: 'Active',
    dot: 'bg-green-500',
    bg: 'bg-green-50',
    text: 'text-green-700',
    border: 'border-green-200'
  },
  processing: {
    label: 'Processing',
    dot: 'bg-purple-500 animate-pulse',
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    border: 'border-purple-200'
  },
  idle: {
    label: 'Idle',
    dot: 'bg-gray-400',
    bg: 'bg-gray-50',
    text: 'text-gray-600',
    border: 'border-gray-200'
  },
  error: {
    label: 'Error',
    dot: 'bg-red-500',
    bg: 'bg-red-50',
    text: 'text-red-700',
    border: 'border-red-200'
  },
  available: {
    label: 'Available',
    dot: 'bg-blue-400',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200'
  }
};
```

---

## AI Transparency Standards

### Always Include

1. **Agent Identification**
   - Agent code (OR, BT, PC, etc.)
   - Agent name (Orchestrator Agent, Budget Template Manager, etc.)
   - Visual indicator (icon, badge, color)

2. **Agent Status**
   - What the agent is doing right now
   - Progress indication
   - Time estimates (if available)

3. **Confidence/Quality Metrics**
   - Confidence percentage (when available)
   - Quality scores
   - Success rates

4. **Human Interaction Points**
   - Where users can review
   - Where users can modify
   - Where users must approve

5. **Explanation**
   - "How AI..." heading
   - Step-by-step process
   - Plain language description

---

## Writing Standards for AI Features

### Terminology

**Use:**
- "AI Agent" or "Agent"
- "AI-powered" (not "AI-driven")
- "Behind the scenes"
- "Orchestrating"
- "Processing"
- "Analyzing"

**Avoid:**
- "Bot"
- "Robot"
- "Automatic" (use "Automated")
- "Magic" or overly casual terms

### Description Format

```
[Agent Name]
[One-line description of what it does]

Used in [X] workflows
[Optional: Integration info]
```

**Example:**
```
Orchestrator Agent
Coordinates and executes plans by invoking other agents, manages overall workflow orchestration

Used in 15 workflows
```

---

## Agent Iconography

### Icon Selection

**Orchestrator:** Network, GitBranch, Workflow
**Data/Analysis:** Database, BarChart, TrendingUp
**Communication:** MessageSquare, Mail, Bell
**Planning:** Calendar, Target, Lightbulb
**Documents:** FileText, File, Document
**Automation:** Zap, Play, FastForward

### Icon Styling

```tsx
// In agent cards
<div className="h-12 w-12 rounded-lg bg-[category-color]-100 flex items-center justify-center">
  <Icon className="h-6 w-6 text-[category-color]-600" />
</div>

// In badges
<Icon className="h-4 w-4 text-purple-600" />

// In workflow steps
<Icon className="h-5 w-5 text-current" />
```

---

## Workflow Category Colors

### Standard Categories

```tsx
const workflowCategories = {
  'Insights & Discovery': {
    color: '#A100FF',  // Purple
    icon: Lightbulb
  },
  'Reporting & Narratives': {
    color: '#224BFF',  // Blue
    icon: FileText
  },
  'Planning & Forecasting': {
    color: '#10B981',  // Green
    icon: TrendingUp
  },
  'Analysis & Analytics': {
    color: '#F59E0B',  // Amber
    icon: BarChart
  },
  'Automation & Alerts': {
    color: '#06B6D4',  // Cyan
    icon: Zap
  }
};
```

---

## Checklist: AI Agent Implementation

### For Every AI Feature

- [ ] Agent identification clear (icon, name, code)
- [ ] Status indicator present
- [ ] Purple color (#A100FF) used for AI elements
- [ ] Confidence level shown (if available)
- [ ] "How AI..." explanation provided
- [ ] Human interaction points marked
- [ ] Processing state animated
- [ ] Success/error states handled
- [ ] Workflow steps visualization (if multi-step)
- [ ] Category/type clearly labeled

---

## Examples from Your Projects

### Finance360 Patterns
- ✅ AI Agent Gallery with cards
- ✅ Workflow visualization with steps
- ✅ Scenario modeling with sliders
- ✅ AI Search prominent in header
- ✅ Category filters for agents
- ✅ Agent ecosystem summary

### Controller AI Workbench Patterns
- ✅ "How AI..." process explanations
- ✅ Agent badges on items
- ✅ Workflow progress indicators
- ✅ Agent activity feed
- ✅ Automation percentage displays

---

**Consistent AI representation builds user trust and understanding. Follow these patterns across all prototypes.**

