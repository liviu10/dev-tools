
import React, { useState } from 'react';
import NumberedTextarea from './NumberedTextarea';

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
        if (valueType === 'string') return <span className="text-green-400">"{value}"</span>;
        if (valueType === 'number') return <span className="text-blue-400">{value}</span>;
        if (valueType === 'boolean') return <span className="text-purple-400">{value.toString()}</span>;
        if (isArray) return <span className="text-gray-400">[{value.length}]</span>;
        if (isObject) return <span className="text-gray-400">{`{${Object.keys(value).length}}`}</span>;
        return null;
    };
    
    const children = hasChildren ? Object.entries(value) : [];

    return (
        <li className={`relative font-mono text-sm ${isRoot ? '' : 'pl-6'}`}>
             {!isRoot && (
                <>
                    <span className="absolute left-0 top-0 h-full w-px bg-gray-700" style={{top: '-0.75rem', height: isLast ? '1.5rem' : 'calc(100% + 0.5rem)'}}></span>
                    <span className="absolute left-0 top-2.5 h-px w-4 bg-gray-700"></span>
                </>
             )}

            <div className={`flex items-center space-x-2 py-1 ${hasChildren ? 'cursor-pointer' : ''}`} onClick={toggleExpand}>
                {hasChildren && (
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 text-gray-500 transition-transform ${isExpanded ? 'rotate-90' : 'rotate-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                )}
                <span className={`font-semibold ${isObject ? 'text-yellow-300' : 'text-gray-400'}`}>{nodeKey}:</span>
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


const JsonCrack: React.FC = () => {
    const [inputJson, setInputJson] = useState('');
    const [crackedJson, setCrackedJson] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const handleCrack = () => {
        try {
            setError(null);
            if (inputJson.trim() === '') {
                setCrackedJson(null);
                return;
            }
            const parsed = JSON.parse(inputJson);
            setCrackedJson(parsed);
        } catch (e: any) {
            setError(e.message);
            setCrackedJson(null);
        }
    };
    
    const handleClear = () => {
        setInputJson('');
        setCrackedJson(null);
        setError(null);
    };

    return (
        <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-white">JSON Crack</h2>
            <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-2xl border border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="input-json" className="block text-sm font-medium text-gray-300 mb-2">Input JSON</label>
                        <div className="w-full h-96">
                            <NumberedTextarea
                                id="input-json"
                                value={inputJson}
                                onChange={(e) => setInputJson(e.target.value)}
                                placeholder='Paste your JSON here...'
                                containerClassName={error ? 'border-red-500 focus-within:ring-red-500' : 'border-gray-600 focus-within:ring-indigo-500'}
                                aria-label="Input JSON"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Visualizer</label>
                        <div className="w-full h-96 bg-gray-900 border border-gray-600 rounded-lg p-3 overflow-auto">
                           {crackedJson ? (
                                <ul>
                                   <JsonNode nodeKey="root" value={crackedJson} isLast={true} isRoot={true} />
                                </ul>
                           ) : (
                                <div className="text-gray-500 h-full flex items-center justify-center">
                                    Graph will appear here
                                </div>
                           )}
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="mt-4 p-3 bg-red-900/50 text-red-300 border border-red-700 rounded-lg text-sm">
                        <strong>Error:</strong> {error}
                    </div>
                )}
                
                <div className="mt-6 flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
                     <button
                        onClick={handleCrack}
                        className="w-full sm:w-auto flex-1 bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transition-transform transform active:scale-95"
                    >
                        Crack JSON
                    </button>
                    <button
                        onClick={handleClear}
                         className="w-full sm:w-auto flex-1 bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-red-500 transition"
                    >
                        Clear
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JsonCrack;
