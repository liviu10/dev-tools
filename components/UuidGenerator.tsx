import React, { useState, useEffect } from 'react';
import CopyableInput from './ui/CopyableInput';
import ToolLayout from './ui/ToolLayout';

const UuidGenerator: React.FC = () => {
    const [uuid, setUuid] = useState('');

    const generateNewUuid = () => {
        setUuid(crypto.randomUUID());
    };

    // Generate a UUID on initial component mount
    useEffect(() => {
        generateNewUuid();
    }, []);

    return (
        <ToolLayout title="UUID Generator" maxWidth="max-w-2xl">
            <div className="mb-6">
                <CopyableInput 
                    value={uuid}
                    placeholder="Your UUID will appear here"
                    ariaLabel="Generated UUID"
                    inputClassName="p-4 text-lg"
                />
            </div>

            <button
                onClick={generateNewUuid}
                className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 focus:ring-indigo-500 transition-transform transform active:scale-95 flex items-center justify-center space-x-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V4a1 1 0 011-1zm10.899 12.101a5.002 5.002 0 00-11.601-2.566 1 1 0 01-1.885-.666 7.002 7.002 0 0111.601 2.566V13a1 1 0 01-1 1h-4a1 1 0 010-2h3.001z" clipRule="evenodd" />
                </svg>
                <span>Generate New UUID</span>
            </button>
        </ToolLayout>
    );
};

export default UuidGenerator;