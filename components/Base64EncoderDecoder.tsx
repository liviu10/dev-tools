
import React, { useState, useEffect, useRef } from 'react';

const Base64EncoderDecoder: React.FC = () => {
    const [decodedText, setDecodedText] = useState('');
    const [encodedText, setEncodedText] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState<'decoded' | 'encoded' | null>(null);
    const lastChanged = useRef<'decoded' | 'encoded' | null>(null);

    useEffect(() => {
        if (lastChanged.current === 'decoded') {
            try {
                setError(null);
                setEncodedText(btoa(decodedText));
            } catch (e) {
                // This error is rare but possible with certain characters.
                setError("Failed to encode text to Base64.");
            }
        }
    }, [decodedText]);

    useEffect(() => {
        if (lastChanged.current === 'encoded') {
            try {
                setError(null);
                if (encodedText.trim() === '') {
                    setDecodedText('');
                } else {
                    setDecodedText(atob(encodedText));
                }
            } catch (e) {
                setError("Invalid Base64 string.");
            }
        }
    }, [encodedText]);

    const handleDecodedChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        lastChanged.current = 'decoded';
        setDecodedText(e.target.value);
    };

    const handleEncodedChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        lastChanged.current = 'encoded';
        setEncodedText(e.target.value);
    };

    const handleCopy = (type: 'decoded' | 'encoded') => {
        const textToCopy = type === 'decoded' ? decodedText : encodedText;
        navigator.clipboard.writeText(textToCopy);
        setCopied(type);
        setTimeout(() => setCopied(null), 2000);
    };

    const handleClear = () => {
        setDecodedText('');
        setEncodedText('');
        setError(null);
        lastChanged.current = null;
    };

    return (
        <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-white">Base64 Encoder / Decoder</h2>
            <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-2xl border border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="decoded-text" className="block text-sm font-medium text-gray-300 mb-2">Decoded (UTF-8)</label>
                        <textarea
                            id="decoded-text"
                            value={decodedText}
                            onChange={handleDecodedChange}
                            placeholder='Type or paste your text here...'
                            className="w-full h-80 font-mono text-sm bg-gray-900 border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="encoded-text" className="block text-sm font-medium text-gray-300 mb-2">Encoded (Base64)</label>
                        <textarea
                            id="encoded-text"
                            value={encodedText}
                            onChange={handleEncodedChange}
                            placeholder='Type or paste your Base64 here...'
                            className={`w-full h-80 font-mono text-sm bg-gray-900 border rounded-lg p-3 focus:outline-none focus:ring-2 ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-indigo-500'}`}
                        />
                    </div>
                </div>

                {error && (
                    <div className="mt-4 p-3 bg-red-900/50 text-red-300 border border-red-700 rounded-lg text-sm">
                        <strong>Error:</strong> {error}
                    </div>
                )}

                <div className="mt-6 flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
                     <button
                        onClick={() => handleCopy('decoded')}
                        disabled={!decodedText}
                        className="w-full sm:w-auto flex-1 bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500 transition"
                    >
                        {copied === 'decoded' ? 'Copied!' : 'Copy Decoded'}
                    </button>
                    <button
                        onClick={() => handleCopy('encoded')}
                        disabled={!encodedText}
                        className="w-full sm:w-auto flex-1 bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500 transition"
                    >
                        {copied === 'encoded' ? 'Copied!' : 'Copy Encoded'}
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

export default Base64EncoderDecoder;
