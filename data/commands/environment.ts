import type { CommandInfo } from './types';

export const environmentCommands: { [key: string]: CommandInfo } = {
    export: {
        description: 'Set an environment variable, making it available to subsequently executed commands.',
        options: {},
        handleArguments: (args) => args.map(arg => ({
            part: arg,
            explanation: `The variable and its value to be exported, in 'VARIABLE=value' format.`
        }))
    },
    env: {
        description: 'Run a program in a modified environment, or display the current environment.',
        options: {}
    },
    alias: {
        description: 'Define or display aliases. An alias is a shell command that substitutes a string for a command name.',
        options: {},
        handleArguments: (args) => {
            if (args.length === 0) {
                return [];
            }
            return [{ part: args.join(' '), explanation: `The alias definition, typically in the format 'name="command"'.` }];
        }
    },
    unalias: {
        description: 'Remove each name from the list of defined aliases.',
        options: {
            '-a': { description: 'Remove all alias definitions.' }
        },
        handleArguments: (args) => args.map(arg => ({
            part: arg,
            explanation: 'The name of the alias to remove.'
        }))
    }
};
