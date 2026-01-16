import React, { useState } from 'react';
import { generateData, DataType } from '../utils/faker';
import ToolLayout from './ui/ToolLayout';
import Slider from './ui/Slider';

const DATA_TYPES: { id: DataType; name: string }[] = [
    { id: 'user', name: 'Users' },
    { id: 'company', name: 'Companies' },
    { id: 'address', name: 'Addresses' },
    { id: 'product', name: 'Products' },
    { id: 'post', name: 'Posts' },
    { id: 'transaction', name: 'Transactions' },
    { id: 'review', name: 'Reviews' },
];

const FakeDataGenerator: React.FC = () => {
    const [dataType, setDataType] = useState<DataType>('user');
    const [count, setCount] = useState(10);
    const [generatedJson, setGeneratedJson] = useState('');
    const [copied, setCopied] = useState(false);

    const handleGenerate = () => {
        const data = generateData(dataType, count);
        setGeneratedJson(JSON.stringify(data, null, 2));
    };

    const handleCopy = () => {
        if (generatedJson) {
            navigator.clipboard.writeText(generatedJson);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <ToolLayout title="Fake Data Generator">
            <div className="space-y-6">

                {/* Controls */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                    <div className="md:col-span-1">
                        <label htmlFor="data-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Data Type</label>
                        <select
                            id="data-type"
                            value={dataType}
                            onChange={(e) => setDataType(e.target.value as DataType)}
                            className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md py-2.5 px-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            {DATA_TYPES.map(type => (
                                <option key={type.id} value={type.id}>{type.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="md:col-span-2">
                        <Slider 
                            label="Number of Records"
                            value={count}
                            min={1}
                            max={50}
                            onChange={setCount}
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                     <button
                        onClick={handleGenerate}
                        className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 focus:ring-indigo-500 transition-transform transform active:scale-95 flex items-center justify-center space-x-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                           <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0L7.86 6.83c-.35.14-.69.33-.99.57l-3.53-2.22c-1.38-.87-3.04.53-2.43 1.95l1.63 3.82c.1.24.16.5.16.76 0 .26-.06.52-.16.76l-1.63 3.82c-.6 1.42 1.05 2.82 2.43 1.95l3.53-2.22c.3-.24.64-.43.99-.57l.65 3.66c.38 1.56 2.6 1.56 2.98 0l.65-3.66c.35.14.69.33.99.57l3.53 2.22c1.38.87 3.04-.53 2.43-1.95l-1.63-3.82c-.1-.24-.16-.5-.16-.76 0 .26.06.52-.16-.76l1.63-3.82c.6-1.42-1.05-2.82-2.43-1.95l-3.53 2.22c-.3.24-.64-.43-.99-.57L11.49 3.17zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                        </svg>
                        <span>Generate Data</span>
                    </button>
                    <button
                        onClick={handleCopy}
                        disabled={!generatedJson}
                        className="w-full sm:w-48 bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 focus:ring-gray-500 transition"
                    >
                        {copied ? 'Copied!' : 'Copy JSON'}
                    </button>
                </div>

                {/* Output */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Generated JSON</label>
                    <textarea
                        readOnly
                        value={generatedJson}
                        className="w-full h-96 font-mono text-sm bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none resize-y"
                        placeholder="Generated JSON data will appear here..."
                        aria-label="Generated JSON output"
                    />
                </div>
            </div>
        </ToolLayout>
    );
};

export default FakeDataGenerator;