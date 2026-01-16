import React, { useState } from 'react';
import NumberedTextarea from './NumberedTextarea';
import ToolLayout from './ui/ToolLayout';
import ToolActionButtons from './ui/ToolActionButtons';
import StatusBanner from './ui/StatusBanner';
import JsonNode from './JsonCrack/JsonNode';


const JsonCrack: React.FC = () => {
    const [inputJson, setInputJson] = useState('');
    const [crackedJson, setCrackedJson] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const handleCrack = () => {
        try {
            setError(null);
            if (inputJson.trim() === '') {
                setCrackedJson(null);
                return;
            }
            const parsed = JSON.parse(inputJson);
            setCrackedJson(parsed);
        } catch (e: any) {
            setError(e.message);
            setCrackedJson(null);
        }
    };
    
    const handleClear = () => {
        setInputJson('');
        setCrackedJson(null);
        setError(null);
    };

    return (
        <ToolLayout title="JSON Crack" maxWidth="max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="input-json" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Input JSON</label>
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
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Visualizer</label>
                    <div className="w-full h-96 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg p-3 overflow-auto">
                       {crackedJson ? (
                            <ul>
                               <JsonNode nodeKey="root" value={crackedJson} isLast={true} isRoot={true} />
                            </ul>
                       ) : (
                            <div className="text-gray-500 dark:text-gray-500 h-full flex items-center justify-center">
                                Graph will appear here
                            </div>
                       )}
                    </div>
                </div>
            </div>

            {error && <StatusBanner type="error" message={error} />}
            
            <ToolActionButtons
                onPrimaryAction={handleCrack}
                primaryActionText="Crack JSON"
                onClear={handleClear}
            />
        </ToolLayout>
    );
};

export default JsonCrack;