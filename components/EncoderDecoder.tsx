import React, { useState, useEffect, useRef } from 'react';

type Encoding = 'base64' | 'url';

const EncoderDecoder: React.FC = () => {
    const [encoding, setEncoding] = useState<Encoding>('base64');
    const [decodedText, setDecodedText] = useState('');
    const [encodedText, setEncodedText] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState<'decoded' | 'encoded' | null>(null);
    const lastChanged = useRef<'decoded' | 'encoded' | null>(null);

    const encode = (text: string) => {
        try {
            if (encoding === 'base64') return btoa(text);
            return encodeURIComponent(text);
        } catch (e) {
            throw new Error(`Failed to encode text to ${encoding.toUpperCase()}.`);
        }
    };

    const decode = (text: string) => {
        try {
            if (encoding === 'base64') return atob(text);
            return decodeURIComponent(text);
        } catch (e) {
            throw new Error(`Invalid ${encoding.toUpperCase()} string.`);
        }
    };

    useEffect(() => {
        if (lastChanged.current === 'decoded') {
            try {
                setError(null);
                setEncodedText(decodedText ? encode(decodedText) : '');
            } catch (e: any) {
                setError(e.message);
            }
        }
    }, [decodedText, encoding]);

    useEffect(() => {
        if (lastChanged.current === 'encoded') {
            try {
                setError(null);
                setDecodedText(encodedText ? decode(encodedText) : '');
            } catch (e: any) {
                setError(e.message);
            }
        }
    }, [encodedText, encoding]);

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

    const handleEncodingChange = (newEncoding: Encoding) => {
        setEncoding(newEncoding);
        handleClear();
    }

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6">
                <h2 className="text-3xl font-bold text-white">Encoder / Decoder</h2>
                <div className="flex items-center space-x-1 bg-gray-900 p-1 rounded-md mt-4 sm:mt-0">
                    <button onClick={() => handleEncodingChange('base64')} className={`px-4 py-1.5 text-sm font-semibold rounded-md transition ${encoding === 'base64' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}>
                        Base64
                    </button>
                    <button onClick={() => handleEncodingChange('url')} className={`px-4 py-1.5 text-sm font-semibold rounded-md transition ${encoding === 'url' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}>
                        URL
                    </button>
                </div>
            </div>
            <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-2xl border border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="decoded-text" className="block text-sm font-medium text-gray-300 mb-2">Decoded</label>
                        <textarea
                            id="decoded-text"
                            value={decodedText}
                            onChange={handleDecodedChange}
                            placeholder='Type or paste your text here...'
                            className="w-full h-80 font-mono text-sm bg-gray-900 border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="encoded-text" className="block text-sm font-medium text-gray-300 mb-2">Encoded</label>
                        <textarea
                            id="encoded-text"
                            value={encodedText}
                            onChange={handleEncodedChange}
                            placeholder='Encoded output will appear here...'
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

export default EncoderDecoder;