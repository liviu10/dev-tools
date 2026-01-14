import React, { useState, useEffect } from 'react';

const bufferToHex = (buffer: ArrayBuffer): string => {
    return [...new Uint8Array(buffer)]
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
};

const HashOutput: React.FC<{ label: string; value: string; onCopy: () => void; copied: boolean }> = ({ label, value, onCopy, copied }) => (
    <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
        <div className="relative">
            <input
                type="text"
                readOnly
                value={value}
                className="w-full bg-gray-900 border border-gray-700 text-gray-200 text-sm font-mono p-3 rounded-lg pr-12 focus:outline-none"
                placeholder={`${label} hash...`}
            />
            <button
                onClick={onCopy}
                disabled={!value}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-indigo-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
                title="Copy hash"
            >
                {copied ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                )}
            </button>
        </div>
    </div>
);

const HashGenerator: React.FC = () => {
    const [inputText, setInputText] = useState('');
    const [sha1Hash, setSha1Hash] = useState('');
    const [sha256Hash, setSha256Hash] = useState('');
    const [copiedHash, setCopiedHash] = useState<'sha1' | 'sha256' | null>(null);

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
    
    const handleCopy = (type: 'sha1' | 'sha256') => {
        const textToCopy = type === 'sha1' ? sha1Hash : sha256Hash;
        navigator.clipboard.writeText(textToCopy);
        setCopiedHash(type);
        setTimeout(() => setCopiedHash(null), 2000);
    };
    
    const handleClear = () => {
        setInputText('');
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-white">Hash Generator</h2>
            <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-2xl border border-gray-700 space-y-6">
                <div>
                    <label htmlFor="input-text" className="block text-sm font-medium text-gray-300 mb-2">Input Text</label>
                    <textarea
                        id="input-text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Type or paste text here to generate hashes..."
                        className="w-full h-48 bg-gray-900 border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
                    />
                </div>

                <div className="space-y-4">
                    <HashOutput 
                        label="SHA-1" 
                        value={sha1Hash} 
                        onCopy={() => handleCopy('sha1')} 
                        copied={copiedHash === 'sha1'}
                    />
                     <HashOutput 
                        label="SHA-256" 
                        value={sha256Hash} 
                        onCopy={() => handleCopy('sha256')} 
                        copied={copiedHash === 'sha256'}
                    />
                </div>

                <div className="mt-2 flex justify-end">
                    <button
                        onClick={handleClear}
                        className="bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-red-500 transition"
                    >
                        Clear Input
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HashGenerator;