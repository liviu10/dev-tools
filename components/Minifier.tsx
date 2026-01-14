import React, { useState, useCallback } from 'react';
import { minify } from 'terser';
import prettier from 'prettier';
import * as prettierPluginPostcss from 'prettier/plugins/postcss';
import NumberedTextarea from './NumberedTextarea';

type Language = 'javascript' | 'css';

interface Stats {
    originalSize: number;
    minifiedSize: number;
    reduction: number;
}

const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const Minifier: React.FC = () => {
    const [inputCode, setInputCode] = useState('');
    const [minifiedCode, setMinifiedCode] = useState('');
    const [language, setLanguage] = useState<Language>('javascript');
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const [stats, setStats] = useState<Stats | null>(null);

    const handleMinify = useCallback(async () => {
        try {
            setError(null);
            setStats(null);
            if (inputCode.trim() === '') {
                setMinifiedCode('');
                return;
            }

            let output = '';
            if (language === 'javascript') {
                const result = await minify(inputCode, { mangle: true, compress: true });
                if (result.error) throw result.error;
                output = result.code || '';
            } else {
                const formatted = await prettier.format(inputCode, {
                    parser: 'css',
                    plugins: [prettierPluginPostcss],
                });
                output = formatted
                    .replace(/\/\*[\s\S]*?\*\//g, '') // remove comments
                    .replace(/\s\s+/g, ' ')           // remove multiple spaces
                    .replace(/\s*([{}:;,])\s*/g, '$1') // remove space around special chars
                    .replace(/;}/g, '}')               // remove last semicolon in a block
                    .replace(/\r?\n|\r/g, '')         // remove newlines
                    .trim();
            }

            setMinifiedCode(output);

            const originalSize = new Blob([inputCode]).size;
            const minifiedSize = new Blob([output]).size;
            const reduction = originalSize > 0 ? ((originalSize - minifiedSize) / originalSize) * 100 : 0;
            setStats({ originalSize, minifiedSize, reduction });

        } catch (e: any) {
            setError(e.message);
            setMinifiedCode('');
        }
    }, [inputCode, language]);

    const handleCopy = useCallback(() => {
        if (minifiedCode) {
            navigator.clipboard.writeText(minifiedCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    }, [minifiedCode]);

    const handleClear = () => {
        setInputCode('');
        setMinifiedCode('');
        setError(null);
        setStats(null);
    };

    const handleLanguageChange = (lang: Language) => {
        setLanguage(lang);
        handleClear();
    };

    return (
        <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-white">Minifier (JS / CSS)</h2>
            <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-2xl border border-gray-700">
                <div className="flex items-center justify-end mb-4">
                    <div className="flex items-center space-x-1 bg-gray-900 p-1 rounded-md">
                        {(['javascript', 'css'] as const).map(lang => (
                            <button
                                key={lang}
                                onClick={() => handleLanguageChange(lang)}
                                className={`px-4 py-1.5 text-sm font-semibold rounded-md transition ${language === lang ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}
                            >
                                {lang.charAt(0).toUpperCase() + lang.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="input-code" className="block text-sm font-medium text-gray-300 mb-2">Input</label>
                         <div className="w-full h-96">
                            <NumberedTextarea
                                id="input-code"
                                value={inputCode}
                                onChange={(e) => setInputCode(e.target.value)}
                                placeholder={`Paste your ${language} code here...`}
                                containerClassName={error ? 'border-red-500 focus-within:ring-red-500' : 'border-gray-600 focus-within:ring-indigo-500'}
                                aria-label="Input code"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="output-code" className="block text-sm font-medium text-gray-300 mb-2">Minified Output</label>
                        <textarea
                            id="output-code"
                            readOnly
                            value={minifiedCode}
                            placeholder='Minified output will appear here...'
                            className="w-full h-96 font-mono text-sm bg-gray-900 border border-gray-600 rounded-lg p-3 focus:outline-none"
                        />
                    </div>
                </div>

                {error && (
                    <div className="mt-4 p-3 bg-red-900/50 text-red-300 border border-red-700 rounded-lg text-sm">
                        <strong>Error:</strong> {error}
                    </div>
                )}
                
                {stats && (
                    <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                        <div className="bg-gray-900/50 p-3 rounded-lg">
                            <span className="block text-sm text-gray-400">Original Size</span>
                            <span className="text-lg font-bold text-white">{formatBytes(stats.originalSize)}</span>
                        </div>
                        <div className="bg-gray-900/50 p-3 rounded-lg">
                            <span className="block text-sm text-gray-400">Minified Size</span>
                            <span className="text-lg font-bold text-white">{formatBytes(stats.minifiedSize)}</span>
                        </div>
                        <div className="bg-gray-900/50 p-3 rounded-lg">
                            <span className="block text-sm text-gray-400">Reduction</span>
                            <span className={`text-lg font-bold ${stats.reduction > 0 ? 'text-green-400' : 'text-white'}`}>
                                {stats.reduction.toFixed(2)}%
                            </span>
                        </div>
                    </div>
                )}


                <div className="mt-6 flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
                    <button
                        onClick={handleMinify}
                        className="w-full sm:w-auto flex-1 bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transition-transform transform active:scale-95"
                    >
                        Minify
                    </button>
                    <div className="w-full sm:w-auto flex-1 flex space-x-4">
                        <button
                            onClick={handleCopy}
                            disabled={!minifiedCode}
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

export default Minifier;