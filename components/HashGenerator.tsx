import React, { useState, useEffect } from 'react';
import CopyableInput from './ui/CopyableInput';
import ToolLayout from './ui/ToolLayout';
import { bufferToHex } from '../utils/crypto';

const HashGenerator: React.FC = () => {
    const [inputText, setInputText] = useState('');
    const [sha1Hash, setSha1Hash] = useState('');
    const [sha256Hash, setSha256Hash] = useState('');

    useEffect(() => {
        const calculateHashes = async () => {
            if (inputText === '') {
                setSha1Hash('');
                setSha256Hash('');
                return;
            }

            try {
                const encoder = new TextEncoder();
                const data = encoder.encode(inputText);

                const [sha1Buffer, sha256Buffer] = await Promise.all([
                    window.crypto.subtle.digest('SHA-1', data),
                    window.crypto.subtle.digest('SHA-256', data)
                ]);
                
                setSha1Hash(bufferToHex(sha1Buffer));
                setSha256Hash(bufferToHex(sha256Buffer));

            } catch (error) {
                console.error("Hashing failed:", error);
                setSha1Hash('Error generating hash');
                setSha256Hash('Error generating hash');
            }
        };

        calculateHashes();
    }, [inputText]);
    
    const handleClear = () => {
        setInputText('');
    };

    return (
        <ToolLayout title="Hash Generator">
            <div className="space-y-6">
                <div>
                    <label htmlFor="input-text" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Input Text</label>
                    <textarea
                        id="input-text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Type or paste text here to generate hashes..."
                        className="w-full h-48 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
                    />
                </div>

                <div className="space-y-4">
                    <CopyableInput 
                        label="SHA-1"
                        value={sha1Hash} 
                        placeholder="SHA-1 hash..."
                    />
                     <CopyableInput 
                        label="SHA-256"
                        value={sha256Hash} 
                        placeholder="SHA-256 hash..."
                    />
                </div>

                <div className="mt-2 flex justify-end">
                    <button
                        onClick={handleClear}
                        className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 focus:ring-red-500 transition"
                    >
                        Clear Input
                    </button>
                </div>
            </div>
        </ToolLayout>
    );
};

export default HashGenerator;