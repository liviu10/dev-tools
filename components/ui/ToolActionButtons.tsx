import React from 'react';

interface ToolActionButtonsProps {
    onPrimaryAction: () => void;
    primaryActionText: string;
    isPrimaryActionDisabled?: boolean;
    
    onCopy?: () => void;
    isCopyDisabled?: boolean;
    copyText?: string;
    copied?: boolean;
    
    onClear?: () => void;
    isClearDisabled?: boolean;
}

const ToolActionButtons: React.FC<ToolActionButtonsProps> = ({
    onPrimaryAction,
    primaryActionText,
    isPrimaryActionDisabled = false,
    onCopy,
    isCopyDisabled = false,
    copyText = 'Copy Output',
    copied = false,
    onClear,
    isClearDisabled = false,
}) => {
    const hasSecondaryActions = onCopy || onClear;

    return (
        <div className="mt-6 flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <button
                onClick={onPrimaryAction}
                disabled={isPrimaryActionDisabled}
                className={`w-full ${hasSecondaryActions ? 'sm:w-auto flex-1' : ''} bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 focus:ring-indigo-500 transition-transform transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
                {primaryActionText}
            </button>
            {hasSecondaryActions && (
                <div className="w-full sm:w-auto flex-1 flex space-x-4">
                    {onCopy && (
                        <button
                            onClick={onCopy}
                            disabled={isCopyDisabled}
                            className="w-full bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 focus:ring-gray-500 transition"
                        >
                            {copied ? 'Copied!' : copyText}
                        </button>
                    )}
                    {onClear && (
                        <button
                            onClick={onClear}
                            disabled={isClearDisabled}
                            className="w-full bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 focus:ring-red-500 transition"
                        >
                            Clear
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default ToolActionButtons;