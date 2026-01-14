import React, { useState, useEffect } from 'react';

const UuidGenerator: React.FC = () => {
    const [uuid, setUuid] = useState('');
    const [copied, setCopied] = useState(false);

    const generateNewUuid = () => {
        setUuid(crypto.randomUUID());
    };

    // Generate a UUID on initial component mount
    useEffect(() => {
        generateNewUuid();
    }, []);

    const handleCopy = () => {
        if (uuid) {
            navigator.clipboard.writeText(uuid);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-gray-800 p-6 sm:p-8 rounded-lg shadow-2xl border border-gray-700">
            <h2 className="text-3xl font-bold mb-6 text-center text-white">UUID Generator</h2>

            <div className="relative mb-6">
                <input
                    type="text"
                    readOnly
                    value={uuid}
                    className="w-full bg-gray-900 border border-gray-700 text-gray-200 text-lg font-mono p-4 rounded-lg pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Your UUID will appear here"
                    aria-label="Generated UUID"
                />
                <button
                    onClick={handleCopy}
                    className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 hover:text-indigo-400 transition"
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

            <button
                onClick={generateNewUuid}
                className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transition-transform transform active:scale-95 flex items-center justify-center space-x-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V4a1 1 0 011-1zm10.899 12.101a5.002 5.002 0 00-11.601-2.566 1 1 0 01-1.885-.666 7.002 7.002 0 0111.601 2.566V13a1 1 0 01-1 1h-4a1 1 0 010-2h3.001z" clipRule="evenodd" />
                </svg>
                <span>Generate New UUID</span>
            </button>
        </div>
    );
};

export default UuidGenerator;
