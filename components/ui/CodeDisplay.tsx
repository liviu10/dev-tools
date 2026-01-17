
import React, { useState, useCallback } from 'react';

interface CodeDisplayProps {
    title: string;
    code: string;
    language?: string;
    containerClassName?: string;
    textareaClassName?: string;
    titleClassName?: string;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ 
    title, 
    code, 
    language,
    containerClassName = '',
    textareaClassName = 'h-48',
    titleClassName = ''
}) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = useCallback(() => {
        if (code) {
            navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(null), 2000);
        }
    }, [code]);

    return (
        <div className={containerClassName}>
            <div className="flex justify-between items-center mb-2">
                <label className={`block text-sm font-medium text-gray-600 dark:text-gray-300 ${titleClassName}`}>{title}</label>
                <button
                    onClick={handleCopy}
                    disabled={!code}
                    className="text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 px-3 py-1 rounded-md transition disabled:opacity-50"
                >
                    {copied ? 'Copied!' : 'Copy'}
                </button>
            </div>
            <textarea
                readOnly
                value={code}
                className={`w-full font-mono text-sm bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none resize-none ${textareaClassName}`}
                aria-label={`${title} code`}
                lang={language}
                spellCheck="false"
            />
        </div>
    );
};

export default React.memo(CodeDisplay);
