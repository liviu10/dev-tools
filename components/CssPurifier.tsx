import React, { useState, useCallback } from 'react';
import ToolLayout from './ui/ToolLayout';
import ToolActionButtons from './ui/ToolActionButtons';
import { getUsedSelectors, purifyCss } from '../utils/cssUtils';
import { formatBytes } from '../utils/formatters';

interface Stats {
    originalSize: number;
    purifiedSize: number;
    reduction: number;
}

const CssPurifier: React.FC = () => {
    const [htmlInput, setHtmlInput] = useState('');
    const [cssInput, setCssInput] = useState('');
    const [purifiedCss, setPurifiedCss] = useState('');
    const [stats, setStats] = useState<Stats | null>(null);
    const [copied, setCopied] = useState(false);

    const handlePurify = useCallback(() => {
        if (cssInput.trim() === '') {
            setPurifiedCss('');
            setStats(null);
            return;
        }

        const usedSelectors = getUsedSelectors(htmlInput);
        const output = purifyCss(cssInput, usedSelectors);
        setPurifiedCss(output);

        const originalSize = new Blob([cssInput]).size;
        const purifiedSize = new Blob([output]).size;
        const reduction = originalSize > 0 ? ((originalSize - purifiedSize) / originalSize) * 100 : 0;
        setStats({ originalSize, purifiedSize, reduction });
    }, [htmlInput, cssInput]);

    const handleCopy = useCallback(() => {
        if (purifiedCss) {
            navigator.clipboard.writeText(purifiedCss);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    }, [purifiedCss]);

    const handleClear = () => {
        setHtmlInput('');
        setCssInput('');
        setPurifiedCss('');
        setStats(null);
    };

    return (
        <ToolLayout title="CSS Purifier" maxWidth="max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                    <div>
                        <label htmlFor="html-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">HTML Content</label>
                        <textarea
                            id="html-input"
                            value={htmlInput}
                            onChange={(e) => setHtmlInput(e.target.value)}
                            placeholder='<div class="used-class">Hello</div>'
                            className="w-full h-64 font-mono text-sm bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                         <label htmlFor="css-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">CSS Stylesheet</label>
                        <textarea
                            id="css-input"
                            value={cssInput}
                            onChange={(e) => setCssInput(e.target.value)}
                            placeholder={'.used-class { color: blue; }\n.unused-class { color: red; }'}
                            className="w-full h-64 font-mono text-sm bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                </div>
                 <div>
                    <label htmlFor="output-css" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Purified CSS</label>
                    <textarea
                        id="output-css"
                        readOnly
                        value={purifiedCss}
                        placeholder='Unused styles will be removed here...'
                        className="w-full h-[34rem] font-mono text-sm bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none"
                    />
                </div>
            </div>

            {stats && (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <div className="bg-gray-100 dark:bg-gray-900/50 p-3 rounded-lg">
                        <span className="block text-sm text-gray-500 dark:text-gray-400">Original Size</span>
                        <span className="text-lg font-bold text-gray-900 dark:text-white">{formatBytes(stats.originalSize)}</span>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-900/50 p-3 rounded-lg">
                        <span className="block text-sm text-gray-500 dark:text-gray-400">Purified Size</span>
                        <span className="text-lg font-bold text-gray-900 dark:text-white">{formatBytes(stats.purifiedSize)}</span>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-900/50 p-3 rounded-lg">
                        <span className="block text-sm text-gray-500 dark:text-gray-400">Reduction</span>
                        <span className={`text-lg font-bold ${stats.reduction > 0 ? 'text-green-500 dark:text-green-400' : 'text-gray-900 dark:text-white'}`}>
                            {stats.reduction.toFixed(2)}%
                        </span>
                    </div>
                </div>
            )}

            <ToolActionButtons
                onPrimaryAction={handlePurify}
                primaryActionText="Purify CSS"
                onCopy={handleCopy}
                isCopyDisabled={!purifiedCss}
                copied={copied}
                onClear={handleClear}
            />
        </ToolLayout>
    );
};

export default CssPurifier;