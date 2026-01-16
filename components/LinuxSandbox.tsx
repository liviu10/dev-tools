import React, { useState, useCallback, useEffect } from 'react';
import { COMMAND_DATA } from '../data/linuxCommands';

interface CommandPart {
    part: string;
    explanation: string;
}

const LinuxSandbox: React.FC = () => {
    const [command, setCommand] = useState('');
    const [explanation, setExplanation] = useState<CommandPart[] | null>(null);
    const [hoveredPartIndex, setHoveredPartIndex] = useState<number | null>(null);
    
    const parseCommand = useCallback((input: string) => {
        if (!input.trim()) {
            setExplanation(null);
            return;
        }

        const parseSingleCommand = (tokens: string[]): CommandPart[] => {
            if (tokens.length === 0) return [];
            
            const explanationParts: CommandPart[] = [];
            const cmd = tokens[0];
            
            if (cmd === 'sudo') {
                const sudoInfo = COMMAND_DATA['sudo'];
                explanationParts.push({ part: 'sudo', explanation: sudoInfo.description });
                
                const subCommandTokens = tokens.slice(1);
                const subCommandExplanation = parseSingleCommand(subCommandTokens);
                
                if (subCommandExplanation.length > 0) {
                     subCommandExplanation[0].explanation += ' (executed with superuser privileges via sudo)';
                }
                
                return [...explanationParts, ...subCommandExplanation];
            }

            const commandInfo = COMMAND_DATA[cmd];
            if (commandInfo) {
                explanationParts.push({ part: cmd, explanation: commandInfo.description });

                const allFollowingTokens = tokens.slice(1).map(token => token.replace(/^["']|["']$/g, ''));

                if (commandInfo.customParsing && commandInfo.handleArguments) {
                    const argExplanations = commandInfo.handleArguments(allFollowingTokens);
                    explanationParts.push(...argExplanations);
                } else {
                    const args: string[] = [];
                    const options: string[] = [];
                    
                    allFollowingTokens.forEach(token => {
                        if (token.startsWith('-')) {
                            options.push(token);
                        } else {
                            args.push(token);
                        }
                    });

                    options.forEach(opt => {
                        if (commandInfo.options[opt]) {
                            explanationParts.push({ part: opt, explanation: commandInfo.options[opt].description });
                        } else {
                            // Handle combined flags that are not alphabetically sorted (e.g., -la vs -al)
                            if (opt.startsWith('-') && !opt.startsWith('--') && opt.length > 2) {
                                const flags = opt.substring(1).split('').sort().join('');
                                const sortedOpt = `-${flags}`;
                                if (commandInfo.options[sortedOpt]) {
                                    explanationParts.push({ part: opt, explanation: commandInfo.options[sortedOpt].description });
                                    return; // 'continue' for forEach loop
                                }
                            }
                            explanationParts.push({ part: opt, explanation: `Unknown option for '${cmd}'.` });
                        }
                    });

                    if (commandInfo.handleArguments) {
                        const argExplanations = commandInfo.handleArguments(args);
                        explanationParts.push(...argExplanations);
                    } else if (args.length > 0) {
                        args.forEach(arg => {
                            explanationParts.push({ part: arg, explanation: `Argument or file path for '${cmd}'.` });
                        });
                    }
                }
            } else {
                 if(cmd) {
                    explanationParts.push({ part: cmd, explanation: `Unknown command. Not found in cheatsheet.` });
                    tokens.slice(1).forEach(token => {
                         explanationParts.push({ part: token, explanation: `Argument or option for unknown command '${cmd}'.` });
                    });
                }
            }
            return explanationParts;
        };

        const finalExplanation: CommandPart[] = [];
        const commandSegments = input.split('|');

        commandSegments.forEach((segment, segmentIndex) => {
            const tokens = segment.match(/(?:[^\s"']+|"[^"]*"|'[^']*')+/g) || [];
            
            const segmentExplanation = parseSingleCommand(tokens);
            finalExplanation.push(...segmentExplanation);

            if (segmentIndex < commandSegments.length - 1) {
                finalExplanation.push({
                    part: '|',
                    explanation: 'The pipe operator. It takes the standard output of the command on its left and uses it as the standard input for the command on its right.'
                });
            }
        });
        
        setExplanation(finalExplanation);
    }, []);

    useEffect(() => {
        parseCommand(command);
    }, [command, parseCommand]);

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-white">Linux Command Explainer</h2>
            <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-2xl border border-gray-700 space-y-6">
                
                <div>
                    <label htmlFor="command-input" className="block text-sm font-medium text-gray-300 mb-2">Command</label>
                    <input
                        id="command-input"
                        type="text"
                        value={command}
                        onChange={(e) => setCommand(e.target.value)}
                        placeholder="e.g., tar -czvf archive.tar.gz /path/to/dir"
                        className="w-full bg-gray-900 border border-gray-600 rounded-md py-2.5 px-3 font-mono text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        autoComplete="off"
                        spellCheck="false"
                    />
                </div>

                {explanation ? (
                    <div className="space-y-4">
                        {/* --- Explained Command Display --- */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Interactive Breakdown</label>
                             <div className="bg-gray-900 p-3 rounded-lg border border-gray-700 font-mono text-lg flex flex-wrap gap-x-3 gap-y-1">
                                {explanation.map((item, index) => (
                                    <span
                                        key={index}
                                        onMouseEnter={() => setHoveredPartIndex(index)}
                                        onMouseLeave={() => setHoveredPartIndex(null)}
                                        className={`px-1 py-0.5 rounded cursor-pointer transition-colors ${hoveredPartIndex === index ? 'bg-indigo-500 text-white' : 'text-gray-300'}`}
                                    >
                                        {item.part}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* --- Explanation Cards --- */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Explanation</label>
                            <div className="space-y-2">
                                {explanation.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`p-3 rounded-md transition-all border ${hoveredPartIndex === index ? 'bg-indigo-900/50 border-indigo-700 shadow-lg' : 'bg-gray-900/70 border-gray-700'}`}
                                        onMouseEnter={() => setHoveredPartIndex(index)}
                                        onMouseLeave={() => setHoveredPartIndex(null)}
                                    >
                                        <code className="font-bold text-indigo-300">{item.part}</code>
                                        <p className="text-gray-300 text-sm mt-1">{item.explanation}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                     <div className="text-center py-8 text-gray-500">
                        Enter a command to see its breakdown.
                    </div>
                )}
            </div>
        </div>
    );
};

export default LinuxSandbox;