import React, { useState, useCallback } from 'react';
import prettier from 'prettier';
import * as prettierPluginBabel from 'prettier/plugins/babel';
import * as prettierPluginEstree from 'prettier/plugins/estree';
import * as prettierPluginHtml from 'prettier/plugins/html';
import * as prettierPluginPostcss from 'prettier/plugins/postcss';
import { minify } from 'terser';
import NumberedTextarea from './NumberedTextarea';
import ToolActionButtons from './ui/ToolActionButtons';
import StatusBanner from './ui/StatusBanner';
import ToolLayout from './ui/ToolLayout';
import TabSelector from './ui/TabSelector';
import { formatBytes } from '../utils/formatters';

type Mode = 'format' | 'minify';
type Language = 'javascript' | 'css' | 'html';

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
                    // FIX: The `minify` function from `terser` throws an exception on error instead of returning an `error` property. The surrounding `try...catch` block handles this.
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

    const modeOptions = [
        { value: 'format', label: 'Format' },
        { value: 'minify', label: 'Minify' },
    ];

    const languageOptions = [
        { value: 'javascript', label: 'JavaScript' },
        { value: 'css', label: 'CSS' },
        { value: 'html', label: 'HTML', disabled: mode === 'minify' },
    ];

    return (
        <ToolLayout title="Code Optimizer" maxWidth="max-w-7xl">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-4">
                <TabSelector options={modeOptions} activeOption={mode} onSelect={(val) => handleModeChange(val as Mode)} />
                <TabSelector options={languageOptions} activeOption={language} onSelect={(val) => setLanguage(val as Language)} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="input-code" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Input</label>
                    <div className="w-full h-96">
                        <NumberedTextarea value={inputCode} onChange={(e) => setInputCode(e.target.value)} placeholder={`Paste your ${language} code here...`} containerClassName={error ? 'border-red-500 focus-within:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus-within:ring-indigo-500'}/>
                    </div>
                </div>
                <div>
                    <label htmlFor="output-code" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Output</label>
                    <textarea id="output-code" readOnly value={outputCode} placeholder='Output will appear here...' className="w-full h-96 font-mono text-sm bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none resize-y"/>
                </div>
            </div>

            {error && <StatusBanner type="error" message={error} />}
            
            {stats && (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <div className="bg-gray-100 dark:bg-gray-900/50 p-3 rounded-lg"><span className="block text-sm text-gray-500 dark:text-gray-400">Original Size</span><span className="text-lg font-bold text-gray-900 dark:text-white">{formatBytes(stats.originalSize)}</span></div>
                    <div className="bg-gray-100 dark:bg-gray-900/50 p-3 rounded-lg"><span className="block text-sm text-gray-500 dark:text-gray-400">Processed Size</span><span className="text-lg font-bold text-gray-900 dark:text-white">{formatBytes(stats.processedSize)}</span></div>
                    <div className="bg-gray-100 dark:bg-gray-900/50 p-3 rounded-lg"><span className="block text-sm text-gray-500 dark:text-gray-400">Reduction</span><span className={`text-lg font-bold ${stats.reduction > 0 ? 'text-green-500 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}>{stats.reduction.toFixed(2)}%</span></div>
                </div>
            )}

            <ToolActionButtons
                onPrimaryAction={handleProcess}
                primaryActionText={mode === 'format' ? 'Format Code' : 'Minify Code'}
                onCopy={handleCopy}
                isCopyDisabled={!outputCode}
                copied={copied}
                copyText="Copy Code"
                onClear={handleClear}
            />
        </ToolLayout>
    );
};

export default CodeOptimizer;