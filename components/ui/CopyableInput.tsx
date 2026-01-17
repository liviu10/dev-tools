
import React, { useState } from 'react';

interface CopyableInputProps {
    value: string;
    label?: string;
    placeholder?: string;
    ariaLabel?: string;
    inputClassName?: string;
}

const CopyableInput: React.FC<CopyableInputProps> = ({ value, label, placeholder, ariaLabel, inputClassName = 'p-3 text-sm' }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (value) {
            navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="w-full">
            {label && <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">{label}</label>}
            <div className="relative">
                <input
                    type="text"
                    readOnly
                    value={value}
                    className={`w-full bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 font-mono rounded-lg pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${inputClassName}`}
                    placeholder={placeholder}
                    aria-label={ariaLabel || label}
                />
                <button
                    onClick={handleCopy}
                    disabled={!value}
                    className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Copy to clipboard"
                >
                    {copied ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                    )}
                </button>
            </div>
        </div>
    );
};

export default React.memo(CopyableInput);
