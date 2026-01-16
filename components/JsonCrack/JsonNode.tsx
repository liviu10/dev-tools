import React, { useState } from 'react';

interface JsonNodeProps {
  nodeKey: string;
  value: any;
  isLast: boolean;
  isRoot?: boolean;
}

const JsonNode: React.FC<JsonNodeProps> = ({ nodeKey, value, isLast, isRoot = false }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const valueType = typeof value;
    const isObject = value !== null && valueType === 'object';
    const isArray = Array.isArray(value);
    const hasChildren = isObject && Object.keys(value).length > 0;

    const toggleExpand = () => {
        if (hasChildren) {
            setIsExpanded(!isExpanded);
        }
    };

    const renderValue = () => {
        if (value === null) return <span className="text-gray-500">null</span>;
        if (valueType === 'string') return <span className="text-green-600 dark:text-green-400">"{value}"</span>;
        if (valueType === 'number') return <span className="text-blue-600 dark:text-blue-400">{value}</span>;
        if (valueType === 'boolean') return <span className="text-purple-600 dark:text-purple-400">{value.toString()}</span>;
        if (isArray) return <span className="text-gray-500 dark:text-gray-400">[{value.length}]</span>;
        if (isObject) return <span className="text-gray-500 dark:text-gray-400">{`{${Object.keys(value).length}}`}</span>;
        return null;
    };
    
    const children = hasChildren ? Object.entries(value) : [];

    return (
        <li className={`relative font-mono text-sm ${isRoot ? '' : 'pl-6'}`}>
             {!isRoot && (
                <>
                    <span className="absolute left-0 top-0 h-full w-px bg-gray-300 dark:bg-gray-700" style={{top: '-0.75rem', height: isLast ? '1.5rem' : 'calc(100% + 0.5rem)'}}></span>
                    <span className="absolute left-0 top-2.5 h-px w-4 bg-gray-300 dark:bg-gray-700"></span>
                </>
             )}

            <div className={`flex items-center space-x-2 py-1 ${hasChildren ? 'cursor-pointer' : ''}`} onClick={toggleExpand}>
                {hasChildren && (
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 text-gray-500 transition-transform ${isExpanded ? 'rotate-90' : 'rotate-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                )}
                <span className={`font-semibold ${isObject ? 'text-yellow-600 dark:text-yellow-300' : 'text-gray-600 dark:text-gray-400'}`}>{nodeKey}:</span>
                {(!isExpanded || !hasChildren) && renderValue()}
            </div>

            {isExpanded && hasChildren && (
                 <ul className="pt-1">
                    {children.map(([key, childValue], index) => (
                        <JsonNode key={key} nodeKey={key} value={childValue} isLast={index === children.length - 1} />
                    ))}
                </ul>
            )}
        </li>
    );
};

export default JsonNode;