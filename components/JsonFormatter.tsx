import React, { useState, useEffect } from 'react';
import NumberedTextarea from './NumberedTextarea';

const JsonFormatter: React.FC = () => {
    const [inputJson, setInputJson] = useState('');
    const [formattedJson, setFormattedJson] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const [isValid, setIsValid] = useState<boolean | null>(null);

    useEffect(() => {
        if (inputJson.trim() === '') {
            setIsValid(null);
            setError(null);
            return;
        }
        try {
            JSON.parse(inputJson);
            setIsValid(true);
            setError(null);
        } catch (e: any) {
            setIsValid(false);
            setError(e.message);
        }
    }, [inputJson]);

    const handleFormat = () => {
        if (isValid) {
            const parsed = JSON.parse(inputJson);
            setFormattedJson(JSON.stringify(parsed, null, 2));
        } else if (inputJson.trim() === '') {
            setFormattedJson('');
            setError(null);
        }
    };

    const handleCopy = () => {
        if (formattedJson) {
            navigator.clipboard.writeText(formattedJson);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleClear = () => {
        setInputJson('');
        setFormattedJson('');
        setError(null);
        setIsValid(null);
    };
    
    const getStatusIndicator = () => {
        if (isValid === true) {
            return <span className="ml-3 px-2 py-0.5 text-xs font-semibold bg-green-900/80 text-green-300 border border-green-700 rounded-full">Valid</span>;
        }
        if (isValid === false) {
             return <span className="ml-3 px-2 py-0.5 text-xs font-semibold bg-red-900/80 text-red-300 border border-red-700 rounded-full">Invalid</span>;
        }
        return null;
    }

    return (
        <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-white">JSON Formatter & Validator</h2>
            <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-2xl border border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="input-json" className="block text-sm font-medium text-gray-300 mb-2 flex items-center">
                            Input JSON
                            {getStatusIndicator()}
                        </label>
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
                        <label htmlFor="output-json" className="block text-sm font-medium text-gray-300 mb-2">Formatted JSON</label>
                        <textarea
                            id="output-json"
                            readOnly
                            value={formattedJson}
                            placeholder='Formatted output will appear here...'
                            className="w-full h-96 font-mono text-sm bg-gray-900 border border-gray-600 rounded-lg p-3 focus:outline-none"
                        />
                    </div>
                </div>

                {error && (
                    <div className="mt-4 p-3 bg-red-900/50 text-red-300 border border-red-700 rounded-lg text-sm">
                        <strong>Error:</strong> {error}
                    </div>
                )}

                <div className="mt-6 flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
                    <button
                        onClick={handleFormat}
                        className="w-full sm:w-auto flex-1 bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transition-transform transform active:scale-95"
                    >
                        Format JSON
                    </button>
                    <div className="w-full sm:w-auto flex-1 flex space-x-4">
                        <button
                            onClick={handleCopy}
                            disabled={!formattedJson}
                            className="w-full bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500 transition"
                        >
                            {copied ? 'Copied!' : 'Copy Output'}
                        </button>
                        <button
                            onClick={handleClear}
                             className="w-full bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-red-500 transition"
                        >
                            Clear
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JsonFormatter;