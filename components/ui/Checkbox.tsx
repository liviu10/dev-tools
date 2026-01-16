import React from 'react';

interface CheckboxProps {
    label: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    containerClassName?: string;
}

const CheckboxIcon = ({ checked }: { checked: boolean }) => (
    <svg className={`h-6 w-6 transition-colors ${checked ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400 dark:text-gray-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        {checked ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        )}
    </svg>
);

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange, containerClassName = "bg-gray-100 dark:bg-gray-900/50 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700/50" }) => {
    return (
        <label className={`flex items-center space-x-3 cursor-pointer transition ${containerClassName}`}>
            <input
                type="checkbox"
                className="sr-only"
                checked={checked}
                onChange={onChange}
            />
            <CheckboxIcon checked={checked} />
            <span className="text-gray-700 dark:text-gray-300">{label}</span>
        </label>
    );
};

export default Checkbox;