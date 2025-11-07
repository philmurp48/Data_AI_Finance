/**
 * Component Template
 * 
 * Reusable React component with TypeScript, proper structure, and best practices.
 * 
 * Usage:
 * 1. Copy to components/[feature]/[component-name].tsx
 * 2. Replace [ComponentName] with your component name (PascalCase)
 * 3. Replace [Description] with what this component does
 * 4. Define your props interface
 * 5. Implement your component logic
 * 6. Delete this comment block
 * 
 * This template includes:
 * - TypeScript interface for props
 * - JSDoc documentation
 * - className prop for extensibility
 * - Proper import organization
 * - Usage example
 */

import React from 'react';
import { cn } from '@/lib/utils';

/**
 * [ComponentName] - [Brief description]
 * 
 * [Longer description of what this component does, when to use it,
 * and any important implementation details.]
 * 
 * @example
 * ```tsx
 * <[ComponentName]
 *   prop1="value"
 *   prop2={123}
 *   onAction={handleAction}
 * />
 * ```
 */

// Props interface
interface [ComponentName]Props {
  // Required props first
  /** Description of prop1 */
  prop1: string;
  
  /** Description of prop2 */
  prop2: number;
  
  // Optional props last
  /** Additional CSS classes */
  className?: string;
  
  /** Click handler */
  onAction?: () => void;
  
  /** Child elements */
  children?: React.ReactNode;
}

// Component
export function [ComponentName]({
  prop1,
  prop2,
  className,
  onAction,
  children
}: [ComponentName]Props) {
  // State (if needed)
  // const [state, setState] = React.useState<Type>(initialValue);
  
  // Handlers (if needed)
  // const handleClick = () => {
  //   // Do something
  //   onAction?.();
  // };
  
  // Effects (if needed)
  // React.useEffect(() => {
  //   // Side effects
  // }, [dependencies]);

  return (
    <div 
      className={cn(
        // Base styles
        "flex items-center justify-between",
        "p-4 rounded-lg",
        "bg-white border border-gray-200",
        "hover:shadow-md transition-shadow",
        // Custom styles
        className
      )}
      // onClick={handleClick}
    >
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900">
          {prop1}
        </h3>
        <p className="text-sm text-gray-600">
          Value: {prop2}
        </p>
      </div>
      
      {children && (
        <div className="ml-4">
          {children}
        </div>
      )}
      
      {onAction && (
        <button
          onClick={onAction}
          className="ml-4 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          Action
        </button>
      )}
    </div>
  );
}

// Optional: Add display name for debugging
[ComponentName].displayName = '[ComponentName]';

// Optional: Default props (if needed)
// [ComponentName].defaultProps = {
//   prop2: 0,
// };

