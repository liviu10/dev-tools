import React, { useState, useEffect, useMemo } from 'react';
import { useLoremIpsum } from '../hooks/useLoremIpsum';
import Checkbox from './ui/Checkbox';
import ToolLayout from './ui/ToolLayout';
import Stat from './LoremIpsumGenerator/Stat';

const LoremIpsumGenerator: React.FC = () => {
    const { text, options, generateText, updateOption } = useLoremIpsum();
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        generateText();
    }, [options, generateText]);
    
    const stats = useMemo(() => {
        const paragraphs = text.split('\n\n').filter(p => p.length > 0).length;
        const words = text.split(/\s+/).filter(w => w.length > 0).length;
        const characters = text.length;
        return { paragraphs, words, characters };
    }, [text]);

    const handleCopy = () => {
        if (text) {
            navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <ToolLayout title="Lorem Ipsum Generator">
            {/* Controls */}
            <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {(['paragraphs', 'sentences', 'words'] as const).map(type => (
                         <button
                            key={type}
                            onClick={() => updateOption('type', type)}
                            className={`py-2 px-4 rounded-md font-semibold transition text-sm ${options.type === type ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'}`}
                        >
                           {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                    ))}
                </div>

                <div>
                    <label className="text-gray-700 dark:text-gray-300 mb-2 flex justify-between">
                        <span>Number of {options.type}</span>
                        <span className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white text-sm font-semibold w-16 text-center py-0.5 rounded-md">{options.count}</span>
                    </label>
                    <input
                        type="range"
                        min="1"
                        max="100"
                        value={options.count}
                        onChange={(e) => updateOption('count', parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:accent-indigo-500"
                    />
                </div>
                 <Checkbox
                    label='Start with "Lorem ipsum dolor sit amet..."'
                    checked={options.startWithLorem}
                    onChange={(e) => updateOption('startWithLorem', e.target.checked)}
                    containerClassName=""
                 />
            </div>

            {/* Output */}
            <div className="relative mt-6">
                <textarea
                    readOnly
                    value={text}
                    className="w-full h-72 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg p-4 focus:outline-none resize-y text-gray-600 dark:text-gray-300"
                    placeholder="Generated text will appear here..."
                />
                <button
                    onClick={handleCopy}
                    className="absolute top-3 right-3 flex items-center px-3 py-1.5 text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md transition"
                    title="Copy to clipboard"
                >
                     {copied ? (
                         <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                             </svg>
                             Copied!
                         </>
                    ) : (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            Copy
                        </>
                    )}
                </button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6">
                <Stat label="Paragraphs" value={stats.paragraphs} />
                <Stat label="Words" value={stats.words} />
                <Stat label="Characters" value={stats.characters} />
            </div>
        </ToolLayout>
    );
};

export default LoremIpsumGenerator;