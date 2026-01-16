import React, { useState } from 'react';
import { csvToJson, xmlToJson } from '../utils/converters';
import ToolLayout from './ui/ToolLayout';
import TabSelector from './ui/TabSelector';
import ToolActionButtons from './ui/ToolActionButtons';
import StatusBanner from './ui/StatusBanner';

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
    
    const modeOptions = [
        { value: 'csv', label: 'CSV to JSON' },
        { value: 'xml', label: 'XML to JSON' },
    ];

    return (
        <ToolLayout title="CSV / XML to JSON Converter" maxWidth="max-w-7xl">
            <div className="flex justify-center mb-6">
                <TabSelector
                    options={modeOptions}
                    activeOption={mode}
                    onSelect={(val) => switchMode(val as Mode)}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="input-text" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Input {mode.toUpperCase()}</label>
                    <textarea
                        id="input-text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder={placeholders[mode]}
                        className={`w-full h-96 font-mono text-sm bg-white dark:bg-gray-900 border rounded-lg p-3 focus:outline-none focus:ring-2 resize-y ${error ? 'border-red-500 ring-red-500' : 'border-gray-300 dark:border-gray-600 ring-indigo-500'}`}
                    />
                </div>
                <div>
                    <label htmlFor="output-json" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Output JSON</label>
                    <textarea
                        id="output-json"
                        readOnly
                        value={outputText}
                        placeholder='JSON output will appear here...'
                        className="w-full h-96 font-mono text-sm bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none"
                    />
                </div>
            </div>
            
            {error && <StatusBanner type="error" message={error} />}

            <ToolActionButtons
                onPrimaryAction={handleConvert}
                primaryActionText="Convert"
                onCopy={handleCopy}
                isCopyDisabled={!outputText}
                copyText="Copy JSON"
                copied={copied}
                onClear={handleClear}
            />
        </ToolLayout>
    );
};

export default CsvXmlToJsonConverter;