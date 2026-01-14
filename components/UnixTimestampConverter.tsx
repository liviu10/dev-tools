import React, { useState, useEffect, useCallback } from 'react';

const pad = (num: number) => num.toString().padStart(2, '0');

const OutputField: React.FC<{ label: string, value: string, onCopy: () => void, copied: boolean }> = ({ label, value, onCopy, copied }) => (
    <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
        <div className="relative">
            <input
                type="text"
                readOnly
                value={value}
                className="w-full bg-gray-900 border border-gray-700 text-gray-200 text-sm font-mono p-3 rounded-lg pr-12 focus:outline-none"
                placeholder="..."
            />
            <button
                onClick={onCopy}
                disabled={!value}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-indigo-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
                title="Copy"
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


const UnixTimestampConverter: React.FC = () => {
    const [dateInput, setDateInput] = useState({ year: '', month: '', day: '', hour: '', minute: '', second: '' });
    const [timestampOutput, setTimestampOutput] = useState('');
    const [timestampInput, setTimestampInput] = useState('');
    const [dateOutputUTC, setDateOutputUTC] = useState('');
    const [dateOutputLocal, setDateOutputLocal] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState<string | null>(null);
    
    // Date to Timestamp conversion
    useEffect(() => {
        const { year, month, day, hour, minute, second } = dateInput;
        if (year && month && day && hour && minute && second) {
            const y = parseInt(year), m = parseInt(month), d = parseInt(day);
            const h = parseInt(hour), min = parseInt(minute), s = parseInt(second);
            
            if ([y, m, d, h, min, s].some(isNaN)) {
                 setError('Invalid date component. Please enter numbers only.');
                 setTimestampOutput('');
                 return;
            }

            const date = new Date(Date.UTC(y, m - 1, d, h, min, s));
            if (date.getUTCFullYear() === y && date.getUTCMonth() === m - 1) {
                 setTimestampOutput(Math.floor(date.getTime() / 1000).toString());
                 setError(null);
            } else {
                 setError('Invalid date. Please check the month and day.');
                 setTimestampOutput('');
            }
        }
    }, [dateInput]);

    // Timestamp to Date conversion
    useEffect(() => {
        if (timestampInput.trim() === '') {
            setDateOutputUTC('');
            setDateOutputLocal('');
            return;
        }
        
        const ts = parseInt(timestampInput);
        if (isNaN(ts)) {
            setDateOutputUTC('Invalid timestamp');
            setDateOutputLocal('Invalid timestamp');
            return;
        }

        // Auto-detect seconds vs milliseconds
        const date = new Date(ts * (timestampInput.length > 10 ? 1 : 1000));
        
        setDateOutputUTC(date.toUTCString());
        setDateOutputLocal(date.toLocaleString());

    }, [timestampInput]);

    const handleDateInputChange = (field: keyof typeof dateInput, value: string) => {
        setDateInput(prev => ({ ...prev, [field]: value.replace(/[^0-9]/g, '') }));
    };

    const setToNow1 = () => {
        const now = new Date();
        setDateInput({
            year: now.getUTCFullYear().toString(),
            month: pad(now.getUTCMonth() + 1),
            day: pad(now.getUTCDate()),
            hour: pad(now.getUTCHours()),
            minute: pad(now.getUTCMinutes()),
            second: pad(now.getUTCSeconds()),
        });
    };
    
     const setToNow2 = () => {
        setTimestampInput(Math.floor(Date.now() / 1000).toString());
    };

    const handleCopy = useCallback((text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
    }, []);

    return (
        <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-white">Unix Timestamp Converter</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Date to Timestamp */}
                <div className="bg-gray-800 p-6 rounded-lg shadow-2xl border border-gray-700 space-y-4">
                     <div className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold text-white">Date to Timestamp</h3>
                        <button onClick={setToNow1} className="text-sm bg-gray-700 text-gray-300 hover:bg-gray-600 px-3 py-1 rounded-md transition">Set to Now (UTC)</button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {(Object.keys(dateInput) as Array<keyof typeof dateInput>).map(key => (
                            <div key={key}>
                                <label htmlFor={key} className="block text-xs font-medium text-gray-400 capitalize mb-1">{key}</label>
                                <input id={key} type="text" value={dateInput[key]} onChange={e => handleDateInputChange(key, e.target.value)}
                                       className="w-full bg-gray-900 border border-gray-700 text-gray-200 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                            </div>
                        ))}
                    </div>
                    {error && <p className="text-red-400 text-sm">{error}</p>}
                    <OutputField label="Unix Timestamp (seconds)" value={timestampOutput} onCopy={() => handleCopy(timestampOutput, 'ts-out')} copied={copied === 'ts-out'} />
                </div>

                {/* Timestamp to Date */}
                 <div className="bg-gray-800 p-6 rounded-lg shadow-2xl border border-gray-700 space-y-4">
                     <div className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold text-white">Timestamp to Date</h3>
                        <button onClick={setToNow2} className="text-sm bg-gray-700 text-gray-300 hover:bg-gray-600 px-3 py-1 rounded-md transition">Set to Now</button>
                    </div>

                    <div>
                        <label htmlFor="ts-input" className="block text-sm font-medium text-gray-300 mb-2">Unix Timestamp (s or ms)</label>
                         <input id="ts-input" type="text" value={timestampInput} onChange={e => setTimestampInput(e.target.value.replace(/[^0-9]/g, ''))}
                               className="w-full bg-gray-900 border border-gray-700 text-gray-200 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono" />
                    </div>
                    
                    <div className="space-y-4">
                        <OutputField label="UTC" value={dateOutputUTC} onCopy={() => handleCopy(dateOutputUTC, 'utc-out')} copied={copied === 'utc-out'} />
                        <OutputField label="Your Local Time" value={dateOutputLocal} onCopy={() => handleCopy(dateOutputLocal, 'local-out')} copied={copied === 'local-out'} />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default UnixTimestampConverter;
