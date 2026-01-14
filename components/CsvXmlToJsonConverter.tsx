import React, { useState } from 'react';
import { csvToJson, xmlToJson } from '../utils/converters';

type Mode = 'csv' | 'xml';

const CsvXmlToJsonConverter: React.FC = () => {
    const [mode, setMode] = useState<Mode>('csv');
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    
    const placeholders = {
        csv: 'id,name,email\n1,John Doe,john@example.com\n2,Jane Smith,jane@example.com',
        xml: '<root>\n  <user>\n    <id>1</id>\n    <name>John Doe</name>\n  </user>\n</root>'
    };
    
    const handleConvert = () => {
        try {
            setError(null);
            if (inputText.trim() === '') {
                setOutputText('');
                return;
            }

            let result;
            if (mode === 'csv') {
                result = csvToJson(inputText);
            } else {
                result = xmlToJson(inputText);
            }

            setOutputText(JSON.stringify(result, null, 2));

        } catch (e: any) {
            setError(e.message);
            setOutputText('');
        }
    };
    
    const handleCopy = () => {
        if (outputText) {
            navigator.clipboard.writeText(outputText);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleClear = () => {
        setInputText('');
        setOutputText('');
        setError(null);
    };

    const switchMode = (newMode: Mode) => {
        setMode(newMode);
        handleClear();
    }

    return (
        <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-white">CSV / XML to JSON Converter</h2>
            <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-2xl border border-gray-700">
                <div className="flex justify-center mb-6">
                    <div className="flex items-center space-x-1 bg-gray-900 p-1 rounded-md">
                        <button onClick={() => switchMode('csv')} className={`px-4 py-2 text-sm font-semibold rounded-md transition ${mode === 'csv' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}>
                            CSV to JSON
                        </button>
                        <button onClick={() => switchMode('xml')} className={`px-4 py-2 text-sm font-semibold rounded-md transition ${mode === 'xml' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}>
                            XML to JSON
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="input-text" className="block text-sm font-medium text-gray-300 mb-2">Input {mode.toUpperCase()}</label>
                        <textarea
                            id="input-text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder={placeholders[mode]}
                            className={`w-full h-96 font-mono text-sm bg-gray-900 border rounded-lg p-3 focus:outline-none focus:ring-2 resize-y ${error ? 'border-red-500 ring-red-500' : 'border-gray-600 ring-indigo-500'}`}
                        />
                    </div>
                    <div>
                        <label htmlFor="output-json" className="block text-sm font-medium text-gray-300 mb-2">Output JSON</label>
                        <textarea
                            id="output-json"
                            readOnly
                            value={outputText}
                            placeholder='JSON output will appear here...'
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
                        onClick={handleConvert}
                        className="w-full sm:w-auto flex-1 bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transition-transform transform active:scale-95"
                    >
                        Convert
                    </button>
                    <div className="w-full sm:w-auto flex-1 flex space-x-4">
                        <button
                            onClick={handleCopy}
                            disabled={!outputText}
                            className="w-full bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500 transition"
                        >
                            {copied ? 'Copied!' : 'Copy JSON'}
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

export default CsvXmlToJsonConverter;