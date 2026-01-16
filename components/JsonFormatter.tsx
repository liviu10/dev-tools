import React, { useState, useEffect } from 'react';
import NumberedTextarea from './NumberedTextarea';
import ToolActionButtons from './ui/ToolActionButtons';
import StatusBanner from './ui/StatusBanner';
import ToolLayout from './ui/ToolLayout';

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
            return <span className="ml-3 px-2 py-0.5 text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900/80 dark:text-green-300 border border-green-300 dark:border-green-700 rounded-full">Valid</span>;
        }
        if (isValid === false) {
             return <span className="ml-3 px-2 py-0.5 text-xs font-semibold bg-red-100 text-red-800 dark:bg-red-900/80 dark:text-red-300 border border-red-300 dark:border-red-700 rounded-full">Invalid</span>;
        }
        return null;
    }

    return (
        <ToolLayout title="JSON Formatter & Validator" maxWidth="max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="input-json" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                        Input JSON
                        {getStatusIndicator()}
                    </label>
                    <div className="w-full h-96">
                        <NumberedTextarea
                            id="input-json"
                            value={inputJson}
                            onChange={(e) => setInputJson(e.target.value)}
                            placeholder='Paste your JSON here...'
                            containerClassName={error ? 'border-red-500 focus-within:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus-within:ring-indigo-500'}
                            aria-label="Input JSON"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="output-json" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Formatted JSON</label>
                    <textarea
                        id="output-json"
                        readOnly
                        value={formattedJson}
                        placeholder='Formatted output will appear here...'
                        className="w-full h-96 font-mono text-sm bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none"
                    />
                </div>
            </div>

            {error && <StatusBanner type="error" message={error} />}

            <ToolActionButtons
                onPrimaryAction={handleFormat}
                onCopy={handleCopy}
                onClear={handleClear}
                primaryActionText="Format JSON"
                isCopyDisabled={!formattedJson}
                copied={copied}
            />
        </ToolLayout>
    );
};

export default JsonFormatter;