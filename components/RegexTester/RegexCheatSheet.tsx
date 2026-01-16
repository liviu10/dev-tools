import React from 'react';

const RegexCheatSheet: React.FC = () => {
    const tokens = [
        { token: '.', description: 'Any character (except newline)' },
        { token: '\\d', description: 'Any digit (0-9)' },
        { token: '\\D', description: 'Any non-digit' },
        { token: '\\w', description: 'Word character (a-z, A-Z, 0-9, _)' },
        { token: '\\W', description: 'Non-word character' },
        { token: '\\s', description: 'Whitespace character' },
        { token: '\\S', description: 'Non-whitespace character' },
        { token: '[abc]', description: 'Any of a, b, or c' },
        { token: '[^abc]', description: 'Not a, b, or c' },
        { token: '[a-g]', description: 'Character between a & g' },
        { token: '^', description: 'Start of string' },
        { token: '$', description: 'End of string' },
        { token: '*', description: '0 or more of preceding' },
        { token: '+', description: '1 or more of preceding' },
        { token: '?', description: '0 or 1 of preceding' },
        { token: '{3}', description: 'Exactly 3 of preceding' },
        { token: '{3,}', description: '3 or more of preceding' },
        { token: '{3,6}', description: 'Between 3 and 6 of preceding' },
        { token: '(...)', description: 'Capture group' },
        { token: '|', description: 'OR operator' },
    ];
    return (
        <div className="bg-gray-100 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <h4 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-3">Common Tokens</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2 text-sm">
                {tokens.map(({ token, description }) => (
                    <div key={token} className="flex">
                        <code className="font-mono text-indigo-600 dark:text-indigo-300 w-16 flex-shrink-0">{token}</code>
                        <span className="text-gray-600 dark:text-gray-400">{description}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RegexCheatSheet;