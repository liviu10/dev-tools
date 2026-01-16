import type { CommandInfo } from './types';

export const docsCommands: { [key: string]: CommandInfo } = {
    man: {
        description: 'An interface to the on-line reference manuals.',
        options: {},
        handleArguments: (args) => args.map(arg => ({
            part: arg,
            explanation: 'The name of the command to look up in the manual.'
        }))
    },
};
