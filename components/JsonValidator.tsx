
import React, { useState } from 'react';
import NumberedTextarea from './NumberedTextarea';

interface ValidationResult {
    isValid: boolean | null;
    message: string;
}

const JsonValidator: React.FC = () => {
    const [inputJson, setInputJson] = useState('');
    const [result, setResult] = useState<ValidationResult | null>(null);

    const handleValidate = () => {
        if (inputJson.trim() === '') {
            setResult({ isValid: false, message: 'Input is empty. Please provide a JSON string.' });
            return;
        }

        try {
            JSON.parse(inputJson);
            setResult({ isValid: true, message: 'Valid JSON!' });
        } catch (e: any) {
            setResult({ isValid: false, message: e.message });
        }
    };

    const handleClear = () => {
        setInputJson('');
        setResult(null);
    };

    const getBorderColor = () => {
        if (result === null) return 'border-gray-600 focus-within:ring-indigo-500';
        return result.isValid ? 'border-green-500 focus-within:ring-green-500' : 'border-red-500 focus-within:ring-red-500';
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-white">JSON Validator</h2>
            <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-2xl border border-gray-700">
                <label htmlFor="input-json" className="block text-sm font-medium text-gray-300 mb-2">JSON Input</label>
                <div className="w-full h-80">
                    <NumberedTextarea
                        id="input-json"
                        value={inputJson}
                        onChange={(e) => setInputJson(e.target.value)}
                        placeholder='Paste your JSON here to validate...'
                        containerClassName={getBorderColor()}
                        aria-label="JSON Input"
                    />
                </div>

                {result && (
                    <div className={`mt-4 p-4 rounded-lg text-sm ${result.isValid ? 'bg-green-900/50 text-green-300 border border-green-700' : 'bg-red-900/50 text-red-300 border border-red-700'}`}>
                        <strong className="font-bold">{result.isValid ? 'Success' : 'Error'}:</strong> {result.message}
                    </div>
                )}

                <div className="mt-6 flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
                    <button
                        onClick={handleValidate}
                        className="w-full sm:w-auto flex-1 bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transition-transform transform active:scale-95"
                    >
                        Validate JSON
                    </button>
                    <button
                        onClick={handleClear}
                        className="w-full sm:w-auto flex-1 bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-red-500 transition"
                    >
                        Clear
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JsonValidator;
