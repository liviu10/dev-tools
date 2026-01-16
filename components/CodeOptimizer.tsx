import React, { useState, useCallback } from 'react';
import prettier from 'prettier';
import * as prettierPluginBabel from 'prettier/plugins/babel';
import * as prettierPluginEstree from 'prettier/plugins/estree';
import * as prettierPluginHtml from 'prettier/plugins/html';
import * as prettierPluginPostcss from 'prettier/plugins/postcss';
import { minify } from 'terser';
import NumberedTextarea from './NumberedTextarea';

type Mode = 'format' | 'minify';
type Language = 'javascript' | 'css' | 'html';

const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

interface Stats {
    originalSize: number;
    processedSize: number;
    reduction: number;
}

const CodeOptimizer: React.FC = () => {
    const [mode, setMode] = useState<Mode>('format');
    const [language, setLanguage] = useState<Language>('javascript');
    const [inputCode, setInputCode] = useState('');
    const [outputCode, setOutputCode] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const [stats, setStats] = useState<Stats | null>(null);

    const handleProcess = useCallback(async () => {
        try {
            setError(null);
            setStats(null);
            if (inputCode.trim() === '') {
                setOutputCode('');
                return;
            }

            let output = '';
            if (mode === 'format') {
                const config = {
                    html: { parser: 'html', plugins: [prettierPluginHtml] },
                    css: { parser: 'css', plugins: [prettierPluginPostcss] },
                    javascript: { parser: 'babel', plugins: [prettierPluginBabel, prettierPluginEstree] },
                };
                output = await prettier.format(inputCode, {
                    parser: config[language].parser,
                    plugins: config[language].plugins,
                    semi: true,
                    singleQuote: true,
                    tabWidth: 2,
                });
            } else { // Minify
                if (language === 'javascript') {
                    const result = await minify(inputCode, { mangle: true, compress: true });
                    if (result.error) throw result.error;
                    output = result.code || '';
                } else if (language === 'css') {
                    const formatted = await prettier.format(inputCode, { parser: 'css', plugins: [prettierPluginPostcss] });
                    output = formatted.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s\s+/g, ' ').replace(/\s*([{}:;,])\s*/g, '$1').replace(/;}/g, '}').replace(/\r?\n|\r/g, '').trim();
                }
            }
            setOutputCode(output);

            const originalSize = new Blob([inputCode]).size;
            const processedSize = new Blob([output]).size;
            const reduction = originalSize > 0 ? ((originalSize - processedSize) / originalSize) * 100 : 0;
            setStats({ originalSize, processedSize, reduction });
        } catch (e: any) {
            setError(e.message);
            setOutputCode('');
        }
    }, [inputCode, language, mode]);

    const handleCopy = useCallback(() => {
        if (outputCode) {
            navigator.clipboard.writeText(outputCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    }, [outputCode]);

    const handleClear = () => {
        setInputCode('');
        setOutputCode('');
        setError(null);
        setStats(null);
    };

    const handleModeChange = (newMode: Mode) => {
        setMode(newMode);
        if (newMode === 'minify' && language === 'html') {
            setLanguage('javascript');
        }
        handleClear();
    };

    return (
        <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-white">Code Optimizer</h2>
            <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-2xl border border-gray-700">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-4">
                    <div className="flex items-center space-x-1 bg-gray-900 p-1 rounded-md">
                        <button onClick={() => handleModeChange('format')} className={`px-4 py-1.5 text-sm font-semibold rounded-md transition ${mode === 'format' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}>Format</button>
                        <button onClick={() => handleModeChange('minify')} className={`px-4 py-1.5 text-sm font-semibold rounded-md transition ${mode === 'minify' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}>Minify</button>
                    </div>
                    <div className="flex items-center space-x-1 bg-gray-900 p-1 rounded-md">
                        {(['javascript', 'css', 'html'] as const).map(lang => (
                            <button key={lang} onClick={() => setLanguage(lang)} disabled={mode === 'minify' && lang === 'html'} className={`px-4 py-1.5 text-sm font-semibold rounded-md transition ${language === lang ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-700'} disabled:opacity-50 disabled:cursor-not-allowed`}>
                                {lang.charAt(0).toUpperCase() + lang.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="input-code" className="block text-sm font-medium text-gray-300 mb-2">Input</label>
                        <div className="w-full h-96">
                            <NumberedTextarea value={inputCode} onChange={(e) => setInputCode(e.target.value)} placeholder={`Paste your ${language} code here...`} containerClassName={error ? 'border-red-500 focus-within:ring-red-500' : 'border-gray-600 focus-within:ring-indigo-500'}/>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="output-code" className="block text-sm font-medium text-gray-300 mb-2">Output</label>
                        <textarea id="output-code" readOnly value={outputCode} placeholder='Output will appear here...' className="w-full h-96 font-mono text-sm bg-gray-900 border border-gray-600 rounded-lg p-3 focus:outline-none resize-y"/>
                    </div>
                </div>

                {error && <div className="mt-4 p-3 bg-red-900/50 text-red-300 border border-red-700 rounded-lg text-sm"><strong>Error:</strong> {error}</div>}
                
                {stats && (
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                        <div className="bg-gray-900/50 p-3 rounded-lg"><span className="block text-sm text-gray-400">Original Size</span><span className="text-lg font-bold text-white">{formatBytes(stats.originalSize)}</span></div>
                        <div className="bg-gray-900/50 p-3 rounded-lg"><span className="block text-sm text-gray-400">Processed Size</span><span className="text-lg font-bold text-white">{formatBytes(stats.processedSize)}</span></div>
                        <div className="bg-gray-900/50 p-3 rounded-lg"><span className="block text-sm text-gray-400">Reduction</span><span className={`text-lg font-bold ${stats.reduction > 0 ? 'text-green-400' : 'text-white'}`}>{stats.reduction.toFixed(2)}%</span></div>
                    </div>
                )}

                <div className="mt-6 flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
                    <button onClick={handleProcess} className="w-full sm:w-auto flex-1 bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transition-transform transform active:scale-95">
                        {mode === 'format' ? 'Format Code' : 'Minify Code'}
                    </button>
                    <div className="w-full sm:w-auto flex-1 flex space-x-4">
                        <button onClick={handleCopy} disabled={!outputCode} className="w-full bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500 transition">
                            {copied ? 'Copied!' : 'Copy Output'}
                        </button>
                        <button onClick={handleClear} className="w-full bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-red-500 transition">
                            Clear
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CodeOptimizer;