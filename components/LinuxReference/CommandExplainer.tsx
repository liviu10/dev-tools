import React, { useState, useEffect } from 'react';
import { parseCommand, CommandPart } from '../../utils/commandParser';

const CommandExplainer: React.FC = () => {
    const [command, setCommand] = useState('ls -la');
    const [explanation, setExplanation] = useState<CommandPart[] | null>(null);
    const [hoveredPartIndex, setHoveredPartIndex] = useState<number | null>(null);
    
    useEffect(() => { 
        setExplanation(parseCommand(command));
    }, [command]);

    return (
        <div className="space-y-6">
            <div>
                <label htmlFor="command-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Command</label>
                <input id="command-input" type="text" value={command} onChange={(e) => setCommand(e.target.value)} placeholder="e.g., tar -czvf archive.tar.gz /path/to/dir" className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md py-2.5 px-3 font-mono text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" autoComplete="off" spellCheck="false" />
            </div>
            {explanation ? (
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Interactive Breakdown</label>
                        <div className="bg-gray-100 dark:bg-gray-900 p-3 rounded-lg border border-gray-200 dark:border-gray-700 font-mono text-lg flex flex-wrap gap-x-3 gap-y-1">
                            {explanation.map((item, index) => (
                                <span key={index} onMouseEnter={() => setHoveredPartIndex(index)} onMouseLeave={() => setHoveredPartIndex(null)} className={`px-1 py-0.5 rounded cursor-pointer transition-colors ${hoveredPartIndex === index ? 'bg-indigo-600 text-white' : 'text-gray-700 dark:text-gray-300'}`}>{item.part}</span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Explanation</label>
                        <div className="space-y-2">
                            {explanation.map((item, index) => (
                                <div key={index} className={`p-3 rounded-md transition-all border ${hoveredPartIndex === index ? 'bg-indigo-50 dark:bg-indigo-900/50 border-indigo-300 dark:border-indigo-700 shadow-lg' : 'bg-gray-100/50 dark:bg-gray-900/70 border-gray-200 dark:border-gray-700'}`} onMouseEnter={() => setHoveredPartIndex(index)} onMouseLeave={() => setHoveredPartIndex(null)}>
                                    <code className="font-bold text-indigo-600 dark:text-indigo-300">{item.part}</code>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">{item.explanation}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : <div className="text-center py-8 text-gray-500">Enter a command to see its breakdown.</div>}
        </div>
    );
};

export default CommandExplainer;