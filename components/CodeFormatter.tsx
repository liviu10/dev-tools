import React, { useState, useCallback } from 'react';
import prettier from 'prettier';
import * as prettierPluginBabel from 'prettier/plugins/babel';
import * as prettierPluginEstree from 'prettier/plugins/estree';
import * as prettierPluginHtml from 'prettier/plugins/html';
import * as prettierPluginPostcss from 'prettier/plugins/postcss';
import NumberedTextarea from './NumberedTextarea';

type Language = 'html' | 'css' | 'javascript';

const languageConfig = {
    html: { parser: 'html', plugins: [prettierPluginHtml] },
    css: { parser: 'css', plugins: [prettierPluginPostcss] },
    javascript: { parser: 'babel', plugins: [prettierPluginBabel, prettierPluginEstree] },
};

const CodeFormatter: React.FC = () => {
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState<Language>('javascript');
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const handleFormat = useCallback(async () => {
        try {
            setError(null);
            if (code.trim() === '') return;

            const config = languageConfig[language];
            const formattedCode = await prettier.format(code, {
                parser: config.parser,
                plugins: config.plugins,
                // Prettier options
                semi: true,
                singleQuote: true,
                tabWidth: 2,
            });
            setCode(formattedCode);
        } catch (e: any) {
            setError(e.message);
        }
    }, [code, language]);

    const handleCopy = useCallback(() => {
        if (code) {
            navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    }, [code]);

    const handleClear = () => {
        setCode('');
        setError(null);
    };

    const handleLanguageChange = (lang: Language) => {
        setLanguage(lang);
        setCode('');
        setError(null);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-white">Code Formatter</h2>
            <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-2xl border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                     <label className="block text-sm font-medium text-gray-300">Language</label>
                    <div className="flex items-center space-x-1 bg-gray-900 p-1 rounded-md">
                        {(['javascript', 'html', 'css'] as const).map(lang => (
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

                <div className="w-full h-96">
                    <NumberedTextarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder={`Paste your ${language} code here...`}
                        containerClassName={error ? 'border-red-500 focus-within:ring-red-500' : 'border-gray-600 focus-within:ring-indigo-500'}
                        aria-label={`${language} code input`}
                    />
                </div>

                {error && (
                    <div className="mt-4 p-3 bg-red-900/50 text-red-300 border border-red-700 rounded-lg text-sm">
                        <strong>Formatting Error:</strong> {error}
                    </div>
                )}

                <div className="mt-6 flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
                    <button
                        onClick={handleFormat}
                        className="w-full sm:w-auto flex-1 bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transition-transform transform active:scale-95"
                    >
                        Format Code
                    </button>
                    <div className="w-full sm:w-auto flex-1 flex space-x-4">
                        <button
                            onClick={handleCopy}
                            disabled={!code}
                            className="w-full bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500 transition"
                        >
                            {copied ? 'Copied!' : 'Copy Code'}
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

export default CodeFormatter;