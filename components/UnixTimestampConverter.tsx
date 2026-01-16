import React, { useState, useEffect, useCallback } from 'react';
import CopyableInput from './ui/CopyableInput';
import ToolLayout from './ui/ToolLayout';
import { padNumber } from '../utils/formatters';


const UnixTimestampConverter: React.FC = () => {
    const [dateInput, setDateInput] = useState({ year: '', month: '', day: '', hour: '', minute: '', second: '' });
    const [timestampOutput, setTimestampOutput] = useState('');
    const [timestampInput, setTimestampInput] = useState('');
    const [dateOutputUTC, setDateOutputUTC] = useState('');
    const [dateOutputLocal, setDateOutputLocal] = useState('');
    const [error, setError] = useState<string | null>(null);
    
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
            month: padNumber(now.getUTCMonth() + 1),
            day: padNumber(now.getUTCDate()),
            hour: padNumber(now.getUTCHours()),
            minute: padNumber(now.getUTCMinutes()),
            second: padNumber(now.getUTCSeconds()),
        });
    };
    
     const setToNow2 = () => {
        setTimestampInput(Math.floor(Date.now() / 1000).toString());
    };

    return (
        <ToolLayout title="Unix Timestamp Converter" maxWidth="max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Date to Timestamp */}
                <div className="bg-gray-100 dark:bg-gray-900/50 p-6 rounded-lg space-y-4 border border-gray-200 dark:border-gray-700">
                     <div className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Date to Timestamp</h3>
                        <button onClick={setToNow1} className="text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 px-3 py-1 rounded-md transition">Set to Now (UTC)</button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {(Object.keys(dateInput) as Array<keyof typeof dateInput>).map(key => (
                            <div key={key}>
                                <label htmlFor={key} className="block text-xs font-medium text-gray-500 dark:text-gray-400 capitalize mb-1">{key}</label>
                                <input id={key} type="text" value={dateInput[key]} onChange={e => handleDateInputChange(key, e.target.value)}
                                       className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                            </div>
                        ))}
                    </div>
                    {error && <p className="text-red-500 dark:text-red-400 text-sm">{error}</p>}
                    <CopyableInput label="Unix Timestamp (seconds)" value={timestampOutput} />
                </div>

                {/* Timestamp to Date */}
                 <div className="bg-gray-100 dark:bg-gray-900/50 p-6 rounded-lg space-y-4 border border-gray-200 dark:border-gray-700">
                     <div className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Timestamp to Date</h3>
                        <button onClick={setToNow2} className="text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 px-3 py-1 rounded-md transition">Set to Now</button>
                    </div>

                    <div>
                        <label htmlFor="ts-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Unix Timestamp (s or ms)</label>
                         <input id="ts-input" type="text" value={timestampInput} onChange={e => setTimestampInput(e.target.value.replace(/[^0-9]/g, ''))}
                               className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono" />
                    </div>
                    
                    <div className="space-y-4">
                        <CopyableInput label="UTC" value={dateOutputUTC} />
                        <CopyableInput label="Your Local Time" value={dateOutputLocal} />
                    </div>
                </div>

            </div>
        </ToolLayout>
    );
};

export default UnixTimestampConverter;