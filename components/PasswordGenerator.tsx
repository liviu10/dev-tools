
import React, { useState, useEffect, useMemo } from 'react';
import { usePasswordGenerator } from '../hooks/usePasswordGenerator';
import type { PasswordOptions } from '../types';
import CopyableInput from './ui/CopyableInput';
import Checkbox from './ui/Checkbox';
import ToolLayout from './ui/ToolLayout';

const PasswordGenerator: React.FC = () => {
    const { password, options, generatePassword, updateOption } = usePasswordGenerator();
    const [copied, setCopied] = useState(false); // No longer used here, but kept if other copy logic exists

    useEffect(() => {
        generatePassword();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [options]);
    
    const strength = useMemo(() => {
        let strength = 0;
        if(options.length >= 8) strength++;
        if(options.length >= 12) strength++;
        if(options.length >= 16) strength++;
        if(options.includeLowercase && options.includeUppercase) strength++;
        if(options.includeNumbers) strength++;
        if(options.includeSymbols) strength++;
        
        if (strength <= 2) return { text: 'Weak', color: 'bg-red-500' };
        if (strength <= 4) return { text: 'Medium', color: 'bg-yellow-500' };
        return { text: 'Strong', color: 'bg-green-500' };
    }, [options]);

    return (
        <ToolLayout title="Password Generator" maxWidth="max-w-2xl">
            <div className="mb-6">
                <CopyableInput 
                    value={password}
                    placeholder="Your password will appear here"
                    inputClassName="p-4 text-xl"
                />
            </div>

            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <label className="text-gray-700 dark:text-gray-300 mb-2 sm:mb-0">Password Length</label>
                    <div className="flex items-center space-x-4">
                        <input
                            type="range"
                            min="6"
                            max="32"
                            value={options.length}
                            onChange={(e) => updateOption('length', parseInt(e.target.value))}
                            className="w-full sm:w-48 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:accent-indigo-500"
                        />
                        <span className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white text-sm font-semibold w-12 text-center py-1 rounded-md">{options.length}</span>
                    </div>
                </div>

                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div className={`h-2.5 rounded-full ${strength.color}`} style={{ width: `${(options.length / 32) * 100}%` }}></div>
                </div>
                 <div className="text-right text-sm font-medium text-gray-500 dark:text-gray-400 -mt-4">
                    Strength: <span className={strength.color.replace('bg-','text-')}>{strength.text}</span>
                </div>


                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Fix: Used 'as const' to infer literal types for the 'key' property, which satisfies the type constraints of 'updateOption'. This removes the need for type casting. */}
                    {([
                        { key: 'includeUppercase', label: 'Include Uppercase' },
                        { key: 'includeLowercase', label: 'Include Lowercase' },
                        { key: 'includeNumbers', label: 'Include Numbers' },
                        { key: 'includeSymbols', label: 'Include Symbols' },
                    ] as const).map(({ key, label }) => (
                         <Checkbox 
                            key={key}
                            label={label}
                            checked={!!options[key]}
                            onChange={(e) => updateOption(key, e.target.checked)}
                         />
                    ))}
                </div>

                <button
                    onClick={generatePassword}
                    className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 focus:ring-indigo-500 transition-transform transform active:scale-95 flex items-center justify-center space-x-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V4a1 1 0 011-1zm10.899 12.101a5.002 5.002 0 00-11.601-2.566 1 1 0 01-1.885-.666 7.002 7.002 0 0111.601 2.566V13a1 1 0 01-1 1h-4a1 1 0 010-2h3.001z" clipRule="evenodd" />
                    </svg>
                    <span>Generate Password</span>
                </button>
            </div>
        </ToolLayout>
    );
};

export default PasswordGenerator;
