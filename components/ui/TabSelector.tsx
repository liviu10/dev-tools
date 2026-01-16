import React from 'react';

interface TabOption {
    value: string;
    label: string;
    disabled?: boolean;
}

interface TabSelectorProps {
    options: TabOption[];
    activeOption: string;
    onSelect: (value: string) => void;
    containerClassName?: string;
}

const TabSelector: React.FC<TabSelectorProps> = ({ options, activeOption, onSelect, containerClassName = 'bg-gray-200 dark:bg-gray-900 p-1 rounded-md' }) => {
    return (
        <div className={`flex items-center space-x-1 ${containerClassName}`}>
            {options.map(option => (
                <button
                    key={option.value}
                    onClick={() => onSelect(option.value)}
                    disabled={option.disabled}
                    className={`px-4 py-1.5 text-sm font-semibold rounded-md transition ${
                        activeOption === option.value
                            ? 'bg-indigo-600 text-white'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-300/50 dark:hover:bg-gray-700'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
};

export default TabSelector;