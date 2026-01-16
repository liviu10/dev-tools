import React, { useState, useEffect } from 'react';

const CodeDisplay: React.FC<{ title: string; data: string | null; colorClass: string; note?: string }> = ({ title, data, colorClass, note }) => (
    <div>
        <h3 className={`text-lg font-semibold mb-2 ${colorClass}`}>{title}</h3>
        <textarea
            readOnly
            value={data || ''}
            placeholder="..."
            className="w-full h-40 font-mono text-sm bg-gray-900 border border-gray-600 rounded-lg p-3 focus:outline-none resize-none"
        />
        {note && <p className="text-xs text-gray-500 mt-1">{note}</p>}
    </div>
);

const JwtDecoder: React.FC = () => {
    const [jwt, setJwt] = useState('');
    const [header, setHeader] = useState<string | null>(null);
    const [payload, setPayload] = useState<string | null>(null);
    const [signature, setSignature] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (jwt.trim() === '') {
            setHeader(null);
            setPayload(null);
            setSignature(null);
            setError(null);
            return;
        }

        try {
            const parts = jwt.split('.');
            if (parts.length !== 3) {
                throw new Error('Invalid JWT structure. A JWT must have three parts separated by dots.');
            }

            const [headerB64, payloadB64, signatureB64] = parts;
            
            const decode = (str: string) => {
                let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
                while (base64.length % 4) {
                    base64 += '=';
                }
                return atob(base64);
            };

            const decodedHeader = JSON.parse(decode(headerB64));
            const decodedPayload = JSON.parse(decode(payloadB64));

            setHeader(JSON.stringify(decodedHeader, null, 2));
            setPayload(JSON.stringify(decodedPayload, null, 2));
            setSignature(signatureB64);
            setError(null);

        } catch (e: any) {
            setHeader(null);
            setPayload(null);
            setSignature(null);
            if (e.message.includes('Invalid JWT structure')) {
                 setError(e.message);
            } else if (e instanceof SyntaxError) {
                setError('Invalid JSON in token header or payload.');
            } else {
                setError('Failed to decode Base64URL. Ensure the token is valid.');
            }
        }
    }, [jwt]);
    
    const handleClear = () => {
        setJwt('');
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-white">JWT Decoder</h2>
            <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-2xl border border-gray-700 space-y-6">
                <div>
                    <label htmlFor="jwt-input" className="block text-sm font-medium text-gray-300 mb-2">Encoded JWT</label>
                    <textarea
                        id="jwt-input"
                        value={jwt}
                        onChange={(e) => setJwt(e.target.value)}
                        placeholder="Paste your JSON Web Token here"
                        className={`w-full h-32 font-mono text-sm bg-gray-900 border rounded-lg p-3 focus:outline-none focus:ring-2 resize-y ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-indigo-500'}`}
                    />
                </div>
                
                {error && (
                    <div className="p-3 bg-red-900/50 text-red-300 border border-red-700 rounded-lg text-sm">
                        <strong>Error:</strong> {error}
                    </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <CodeDisplay title="Header" data={header} colorClass="text-red-400" />
                     <CodeDisplay title="Payload" data={payload} colorClass="text-purple-400" />
                     <CodeDisplay title="Signature" data={signature} colorClass="text-blue-400" note="Signature is not verified." />
                </div>

                <div className="mt-2 flex justify-end">
                    <button
                        onClick={handleClear}
                        className="bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-red-500 transition"
                    >
                        Clear
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JwtDecoder;