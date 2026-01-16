import React, { useState, useEffect } from 'react';
import StatusBanner from './ui/StatusBanner';
import ToolLayout from './ui/ToolLayout';
import CodeDisplay from './ui/CodeDisplay';
import ToolActionButtons from './ui/ToolActionButtons';

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
        <ToolLayout title="JWT Decoder">
            <div>
                <label htmlFor="jwt-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Encoded JWT</label>
                <textarea
                    id="jwt-input"
                    value={jwt}
                    onChange={(e) => setJwt(e.target.value)}
                    placeholder="Paste your JSON Web Token here"
                    className={`w-full h-32 font-mono text-sm bg-gray-100 dark:bg-gray-900 border rounded-lg p-3 focus:outline-none focus:ring-2 resize-y ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-indigo-500'}`}
                />
            </div>
            
            {error && <StatusBanner type="error" message={error} />}
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                 <CodeDisplay title="Header" code={header || ''} language="json" titleClassName="!text-red-500 dark:!text-red-400 !font-semibold !text-lg" textareaClassName="h-40" />
                 <CodeDisplay title="Payload" code={payload || ''} language="json" titleClassName="!text-purple-500 dark:!text-purple-400 !font-semibold !text-lg" textareaClassName="h-40" />
                 <div>
                    <h3 className="text-lg font-semibold mb-2 text-blue-500 dark:text-blue-400">Signature</h3>
                    <textarea
                        readOnly
                        value={signature || ''}
                        placeholder="..."
                        className="w-full h-40 font-mono text-sm bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none resize-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">Signature is not verified.</p>
                </div>
            </div>
            
            <ToolActionButtons
                onPrimaryAction={() => {}}
                primaryActionText="Decode"
                isPrimaryActionDisabled={true}
                onClear={handleClear}
            />

        </ToolLayout>
    );
};

export default JwtDecoder;