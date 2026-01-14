import React, { useState, useCallback } from 'react';

interface Stats {
    originalSize: number;
    purifiedSize: number;
    reduction: number;
}
interface UsedSelectors {
    tags: Set<string>;
    classes: Set<string>;
    ids: Set<string>;
}

const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const getUsedSelectors = (html: string): UsedSelectors => {
    const tags = new Set<string>();
    const classes = new Set<string>();
    const ids = new Set<string>();

    if (!html) return { tags, classes, ids };

    const doc = new DOMParser().parseFromString(html, 'text/html');
    doc.querySelectorAll('*').forEach(el => {
        tags.add(el.tagName.toLowerCase());
        if (el.id) ids.add(el.id);
        el.classList.forEach(cls => classes.add(cls));
    });

    return { tags, classes, ids };
};

const isSelectorUsed = (selector: string, used: UsedSelectors): boolean => {
    const trimmedSelector = selector.trim();
    // Safelist complex selectors, pseudo-classes/elements, and attribute selectors to be safe.
    if (/[ >+~:[\]*]/.test(trimmedSelector)) {
        return true;
    }
    // It's a simple selector
    if (trimmedSelector.startsWith('.')) {
        return used.classes.has(trimmedSelector.slice(1));
    }
    if (trimmedSelector.startsWith('#')) {
        return used.ids.has(trimmedSelector.slice(1));
    }
    // It's a tag selector
    return used.tags.has(trimmedSelector.toLowerCase());
};

const purifyCss = (css: string, used: UsedSelectors): string => {
    // This regex is a naive approach and might fail on complex nested structures,
    // but it works for top-level rules and media queries.
    // It captures the selector group, the content, and handles @media blocks.
    const ruleRegex = /(?:@media[^{]+\{([\s\S]*?)\}|([^{}]+)\{([\s\S]*?)\})/g;

    return css.replace(ruleRegex, (match, mediaContent, topLevelSelector, topLevelStyles) => {
        if (mediaContent) {
            // It's a media query block, purify its content recursively
            const purifiedMediaContent = purifyCss(mediaContent, used);
            return purifiedMediaContent ? match.replace(mediaContent, purifiedMediaContent) : '';
        }

        if (topLevelSelector) {
            // It's a standard rule
            const selectors = topLevelSelector.split(',').map(s => s.trim());
            const isAnySelectorUsed = selectors.some(s => isSelectorUsed(s, used));

            if (isAnySelectorUsed) {
                return match; // Keep the whole rule
            } else {
                return ''; // Discard the rule
            }
        }
        
        return ''; // Should not happen
    }).replace(/\n\s*\n/g, '\n'); // Clean up empty lines
};


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
        <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-white">CSS Purifier</h2>
            <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-2xl border border-gray-700">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="html-input" className="block text-sm font-medium text-gray-300 mb-2">HTML Content</label>
                            <textarea
                                id="html-input"
                                value={htmlInput}
                                onChange={(e) => setHtmlInput(e.target.value)}
                                placeholder='<div class="used-class">Hello</div>'
                                className="w-full h-64 font-mono text-sm bg-gray-900 border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                             <label htmlFor="css-input" className="block text-sm font-medium text-gray-300 mb-2">CSS Stylesheet</label>
                            <textarea
                                id="css-input"
                                value={cssInput}
                                onChange={(e) => setCssInput(e.target.value)}
                                placeholder={'.used-class { color: blue; }\n.unused-class { color: red; }'}
                                className="w-full h-64 font-mono text-sm bg-gray-900 border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    </div>
                     <div>
                        <label htmlFor="output-css" className="block text-sm font-medium text-gray-300 mb-2">Purified CSS</label>
                        <textarea
                            id="output-css"
                            readOnly
                            value={purifiedCss}
                            placeholder='Unused styles will be removed here...'
                            className="w-full h-[34rem] font-mono text-sm bg-gray-900 border border-gray-600 rounded-lg p-3 focus:outline-none"
                        />
                    </div>
                </div>

                {stats && (
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                        <div className="bg-gray-900/50 p-3 rounded-lg">
                            <span className="block text-sm text-gray-400">Original Size</span>
                            <span className="text-lg font-bold text-white">{formatBytes(stats.originalSize)}</span>
                        </div>
                        <div className="bg-gray-900/50 p-3 rounded-lg">
                            <span className="block text-sm text-gray-400">Purified Size</span>
                            <span className="text-lg font-bold text-white">{formatBytes(stats.purifiedSize)}</span>
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
                        onClick={handlePurify}
                        className="w-full sm:w-auto flex-1 bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transition-transform transform active:scale-95"
                    >
                        Purify CSS
                    </button>
                    <div className="w-full sm:w-auto flex-1 flex space-x-4">
                        <button
                            onClick={handleCopy}
                            disabled={!purifiedCss}
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

export default CssPurifier;
