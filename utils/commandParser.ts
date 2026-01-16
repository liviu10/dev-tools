import { COMMAND_DATA } from '../data/linuxCommands';
import type { CommandInfo } from '../data/linuxCommands';

export interface CommandPart {
    part: string;
    explanation: string;
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

    const commandInfo: CommandInfo | undefined = COMMAND_DATA[cmd];
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
                if (token.startsWith('-')) options.push(token);
                else args.push(token);
            });
            options.forEach(opt => {
                if (commandInfo.options[opt]) {
                    explanationParts.push({ part: opt, explanation: commandInfo.options[opt].description });
                } else {
                    if (opt.startsWith('-') && !opt.startsWith('--') && opt.length > 2) {
                        const flags = opt.substring(1).split('').sort().join('');
                        const sortedOpt = `-${flags}`;
                        if (commandInfo.options[sortedOpt]) {
                            explanationParts.push({ part: opt, explanation: commandInfo.options[sortedOpt].description });
                            return;
                        }
                    }
                    explanationParts.push({ part: opt, explanation: `Unknown option for '${cmd}'.` });
                }
            });
            if (commandInfo.handleArguments) {
                const argExplanations = commandInfo.handleArguments(args);
                explanationParts.push(...argExplanations);
            } else if (args.length > 0) {
                args.forEach(arg => explanationParts.push({ part: arg, explanation: `Argument or file path for '${cmd}'.` }));
            }
        }
    } else {
         if(cmd) {
            explanationParts.push({ part: cmd, explanation: `Unknown command. Not found in cheatsheet.` });
            tokens.slice(1).forEach(token => explanationParts.push({ part: token, explanation: `Argument or option for unknown command '${cmd}'.` }));
        }
    }
    return explanationParts;
};

export const parseCommand = (input: string): CommandPart[] | null => {
    if (!input.trim()) {
        return null;
    }

    const finalExplanation: CommandPart[] = [];
    const commandSegments = input.split('|');
    commandSegments.forEach((segment, segmentIndex) => {
        const tokens = segment.match(/(?:[^\s"']+|"[^"]*"|'[^']*')+/g) || [];
        const segmentExplanation = parseSingleCommand(tokens);
        finalExplanation.push(...segmentExplanation);
        if (segmentIndex < commandSegments.length - 1) {
            finalExplanation.push({ part: '|', explanation: 'The pipe operator. It takes the standard output of the command on its left and uses it as the standard input for the command on its right.' });
        }
    });
    return finalExplanation;
};
