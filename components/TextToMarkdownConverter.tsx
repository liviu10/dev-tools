import React, { useState, useEffect, useMemo } from 'react';
import { marked } from 'marked';
import { convertToMarkdown } from '../utils/textToMarkdown';

const TextToMarkdownConverter: React.FC = () => {
    const [inputText, setInputText] = useState('');
    const [markdownText, setMarkdownText] = useState('');
    const [copied, setCopied] = useState(false);
    const [viewMode, setViewMode] = useState<'preview' | 'source'>('preview');

    useEffect(() => {
        const markdown = convertToMarkdown(inputText);
        setMarkdownText(markdown);
    }, [inputText]);
    
    const parsedHtml = useMemo(() => {
        return marked.parse(markdownText) as string;
    }, [markdownText]);

    const handleCopy = () => {
        if (markdownText) {
            navigator.clipboard.writeText(markdownText);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleClear = () => {
        setInputText('');
        setMarkdownText('');
    };

    return (
        <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-white">Text to Markdown Converter</h2>
            <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-2xl border border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="input-text" className="block text-sm font-medium text-gray-300 mb-2">Plain Text</label>
                        <textarea
                            id="input-text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder='Type or paste your text here...'
                            className="w-full h-96 font-sans text-sm bg-gray-900 border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-2">
                             <label className="block text-sm font-medium text-gray-300">Output</label>
                             <div className="flex items-center space-x-1 bg-gray-900 p-1 rounded-md">
                                <button onClick={() => setViewMode('preview')} className={`px-3 py-1 text-xs rounded-md transition ${viewMode === 'preview' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}>
                                    Preview
                                </button>
                                 <button onClick={() => setViewMode('source')} className={`px-3 py-1 text-xs rounded-md transition ${viewMode === 'source' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}>
                                    Markdown
                                </button>
                            </div>
                        </div>
                        {viewMode === 'source' ? (
                             <textarea
                                id="output-markdown"
                                readOnly
                                value={markdownText}
                                placeholder='Markdown output will appear here...'
                                className="w-full h-96 font-mono text-sm bg-gray-900 border border-gray-600 rounded-lg p-3 focus:outline-none"
                            />
                        ) : (
                             <div
                                className="w-full h-96 bg-gray-900 border border-gray-600 rounded-lg p-4 overflow-auto prose prose-sm prose-invert max-w-none prose-headings:text-gray-200 prose-p:text-gray-300 prose-li:text-gray-300 prose-a:text-indigo-400 prose-code:text-indigo-300 prose-pre:bg-gray-800"
                                dangerouslySetInnerHTML={{ __html: parsedHtml }}
                            />
                        )}
                    </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
                     <button
                        onClick={handleCopy}
                        disabled={!markdownText}
                        className="w-full sm:w-auto flex-1 bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transition"
                    >
                        {copied ? 'Copied!' : 'Copy Markdown'}
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

export default TextToMarkdownConverter;