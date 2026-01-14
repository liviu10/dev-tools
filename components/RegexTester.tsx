import React, { useState, useEffect } from 'react';

const HighlightedResult: React.FC<{ text: string; matches: RegExpMatchArray[] }> = ({ text, matches }) => {
    if (matches.length === 0) {
        return <div className="whitespace-pre-wrap break-words">{text}</div>;
    }

    const segments = [];
    let lastIndex = 0;

    matches.forEach((match, i) => {
        const { index } = match;
        if (index === undefined) return;

        if (index > lastIndex) {
            segments.push(<span key={`text-${i}`}>{text.substring(lastIndex, index)}</span>);
        }

        segments.push(
            <mark key={`match-${i}`} className="bg-indigo-500/40 text-indigo-100 rounded px-0.5">
                {match[0]}
            </mark>
        );

        lastIndex = index + match[0].length;
    });

    if (lastIndex < text.length) {
        segments.push(<span key="text-end">{text.substring(lastIndex)}</span>);
    }

    return <div className="whitespace-pre-wrap break-words font-mono text-sm leading-6">{segments}</div>;
};

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
        <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
            <h4 className="text-md font-semibold text-gray-300 mb-3">Common Tokens</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2 text-sm">
                {tokens.map(({ token, description }) => (
                    <div key={token} className="flex">
                        <code className="font-mono text-indigo-300 w-16 flex-shrink-0">{token}</code>
                        <span className="text-gray-400">{description}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};


const RegexTester: React.FC = () => {
    const [pattern, setPattern] = useState('\\b\\w{4}\\b');
    const [flags, setFlags] = useState({ g: true, i: false, m: false });
    const [testString, setTestString] = useState('This is a simple test string for our regular expression tester.');
    const [error, setError] = useState<string | null>(null);
    const [matches, setMatches] = useState<RegExpMatchArray[]>([]);
    const [showCheatSheet, setShowCheatSheet] = useState(false);

    useEffect(() => {
        if (!pattern) {
            setError(null);
            setMatches([]);
            return;
        }

        try {
            const activeFlags = Object.entries(flags).filter(([, val]) => val).map(([key]) => key).join('');
            const regex = new RegExp(pattern, activeFlags);
            setError(null);

            if (flags.g) {
                setMatches(Array.from(testString.matchAll(regex)));
            } else {
                const match = testString.match(regex);
                setMatches(match ? [match] : []);
            }
        } catch (e: any) {
            setError(e.message);
            setMatches([]);
        }
    }, [pattern, flags, testString]);
    
    const handleFlagChange = (flag: keyof typeof flags) => {
        setFlags(prev => ({...prev, [flag]: !prev[flag]}));
    };

    return (
        <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-white">Regex Tester</h2>
            <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-2xl border border-gray-700 space-y-6">
                
                {/* Regex Inputs */}
                <div>
                     <label className="block text-sm font-medium text-gray-300 mb-2">Regular Expression</label>
                     <div className="flex flex-col sm:flex-row gap-3">
                        <div className="flex-grow relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-mono">/</span>
                            <input
                                type="text"
                                value={pattern}
                                onChange={e => setPattern(e.target.value)}
                                className={`w-full bg-gray-900 border font-mono p-2.5 pl-6 pr-4 rounded-md focus:outline-none focus:ring-2 ${error ? 'border-red-500 ring-red-500' : 'border-gray-600 ring-indigo-500'}`}
                                placeholder="pattern"
                                spellCheck="false"
                            />
                             <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 font-mono">/</span>
                        </div>
                        <div className="flex items-center space-x-3 bg-gray-900 border border-gray-600 rounded-md px-3 py-2">
                             {(['g', 'i', 'm'] as const).map(flag => (
                                <label key={flag} className="flex items-center space-x-1.5 cursor-pointer text-sm text-gray-300">
                                    <input type="checkbox" checked={flags[flag]} onChange={() => handleFlagChange(flag)} className="w-4 h-4 rounded bg-gray-700 border-gray-500 text-indigo-500 focus:ring-indigo-600" />
                                    <span>{flag}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
                </div>

                {/* Test String */}
                <div>
                     <label className="block text-sm font-medium text-gray-300 mb-2">Test String</label>
                     <textarea
                        value={testString}
                        onChange={e => setTestString(e.target.value)}
                        className="w-full h-40 font-mono text-sm bg-gray-900 border border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
                        spellCheck="false"
                     />
                </div>
                
                {/* Results */}
                <div className="space-y-4">
                     <h3 className="text-lg font-semibold text-white">Results ({matches.length} matches)</h3>
                     <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 min-h-[8rem]">
                         <HighlightedResult text={testString} matches={matches} />
                     </div>
                     {matches.length > 0 && (
                         <div className="bg-gray-900/50 border border-gray-700 rounded-lg max-h-60 overflow-y-auto">
                            {matches.map((match, i) => (
                                <div key={i} className="p-3 border-b border-gray-700 last:border-b-0">
                                    <p className="font-semibold text-gray-300">Match {i + 1}</p>
                                    <div className="font-mono text-sm space-y-1 mt-1">
                                        <div className="flex">
                                             <span className="text-gray-500 w-24">Full Match:</span>
                                             <span className="text-green-300 bg-green-500/10 px-1 rounded">"{match[0]}"</span>
                                             <span className="text-gray-500 ml-4">Index: {match.index}</span>
                                        </div>
                                         {match.length > 1 && Array.from(match).slice(1).map((group, j) => (
                                             <div key={j} className="flex">
                                                 <span className="text-gray-500 w-24">Group {j + 1}:</span>
                                                 <span className="text-purple-300 bg-purple-500/10 px-1 rounded">"{group}"</span>
                                            </div>
                                         ))}
                                    </div>
                                </div>
                            ))}
                         </div>
                     )}
                </div>
                
                {/* Cheat Sheet Toggle */}
                <div>
                    <button onClick={() => setShowCheatSheet(s => !s)} className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center space-x-1">
                        <span>{showCheatSheet ? 'Hide' : 'Show'} Regex Cheat Sheet</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${showCheatSheet ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    {showCheatSheet && <div className="mt-4"><RegexCheatSheet /></div>}
                </div>

            </div>
        </div>
    );
};

export default RegexTester;