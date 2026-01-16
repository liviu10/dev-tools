import React, { useState, useEffect, useMemo } from 'react';
import { useLoremIpsum } from '../hooks/useLoremIpsum';

const CheckboxIcon = ({ checked }: { checked: boolean }) => (
    <svg className={`h-6 w-6 transition-colors ${checked ? 'text-indigo-400' : 'text-gray-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        {checked ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        )}
    </svg>
);

const Stat: React.FC<{ label: string, value: number }> = ({ label, value }) => (
    <div className="bg-gray-900/50 p-3 rounded-lg text-center">
        <span className="block text-xl font-bold text-white">{value}</span>
        <span className="text-xs text-gray-400 uppercase">{label}</span>
    </div>
);

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
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-white">Lorem Ipsum Generator</h2>

            <div className="bg-gray-800 p-6 rounded-lg shadow-2xl border border-gray-700 space-y-6">
                
                {/* Controls */}
                <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {(['paragraphs', 'sentences', 'words'] as const).map(type => (
                             <button
                                key={type}
                                onClick={() => updateOption('type', type)}
                                className={`py-2 px-4 rounded-md font-semibold transition text-sm ${options.type === type ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                            >
                               {type.charAt(0).toUpperCase() + type.slice(1)}
                            </button>
                        ))}
                    </div>

                    <div>
                        <label className="text-gray-300 mb-2 flex justify-between">
                            <span>Number of {options.type}</span>
                            <span className="bg-gray-700 text-white text-sm font-semibold w-16 text-center py-0.5 rounded-md">{options.count}</span>
                        </label>
                        <input
                            type="range"
                            min="1"
                            max="100"
                            value={options.count}
                            onChange={(e) => updateOption('count', parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                        />
                    </div>
                     <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only"
                            checked={options.startWithLorem}
                            onChange={(e) => updateOption('startWithLorem', e.target.checked)}
                        />
                        <CheckboxIcon checked={options.startWithLorem} />
                        <span className="text-gray-300">Start with "Lorem ipsum dolor sit amet..."</span>
                    </label>
                </div>

                {/* Output */}
                <div className="relative">
                    <textarea
                        readOnly
                        value={text}
                        className="w-full h-72 bg-gray-900 border border-gray-600 rounded-lg p-4 focus:outline-none resize-y text-gray-300"
                        placeholder="Generated text will appear here..."
                    />
                    <button
                        onClick={handleCopy}
                        className="absolute top-3 right-3 flex items-center px-3 py-1.5 text-xs bg-gray-700 text-gray-300 hover:bg-gray-600 rounded-md transition"
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
                <div className="grid grid-cols-3 gap-4">
                    <Stat label="Paragraphs" value={stats.paragraphs} />
                    <Stat label="Words" value={stats.words} />
                    <Stat label="Characters" value={stats.characters} />
                </div>
            </div>
        </div>
    );
};

export default LoremIpsumGenerator;
