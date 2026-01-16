import type { CommandInfo } from './types';

export const permissionCommands: { [key: string]: CommandInfo } = {
    chmod: {
        description: 'Changes the permissions of a file or directory.',
        options: {
            '-R': { description: 'Change files and directories recursively.' }
        },
        handleArguments: (args) => {
            const explanations = [];
            if (args[0]) {
                let modeExplanation = `The permissions mode.`;
                if (/^[0-7]{3,4}$/.test(args[0])) {
                    modeExplanation = `Octal permissions mode. e.g., '755' gives read/write/execute to owner, and read/execute to group and others.`
                } else {
                    const symbolicMatch = args[0].match(/([ugoa]*)([+\-=])([rwxst]*)/);
                    if (symbolicMatch) {
                        const [, who, op, perm] = symbolicMatch;
                        const whoMap: {[key:string]: string} = { u: 'user (owner)', g: 'group', o: 'others', a: 'all'};
                        const opMap: {[key:string]: string} = { '+': 'adds', '-': 'removes', '=': 'sets exactly'};
                        const permMap: {[key:string]: string} = { r: 'read', w: 'write', x: 'execute', s: 'setuid/setgid', t: 'sticky bit'};
                        const whoStr = who.split('').map(char => whoMap[char]).join(', ') || 'all (default)';
                        const opStr = opMap[op];
                        const permStr = perm.split('').map(char => permMap[char]).join(', ');
                        let specialNote = '';
                        if (perm.includes('s') && who.includes('g')) {
                            specialNote = `\n(Note: 'g+s' on a directory means new files in it inherit the directory's group.)`;
                        }
                        if (perm.includes('s') && who.includes('u')) {
                            specialNote = `\n(Note: 'u+s' on an executable means it runs with the owner's permissions.)`;
                        }

                        modeExplanation = `Symbolic permissions mode: This ${opStr} the '${permStr}' permission(s) for '${whoStr}'.${specialNote}`;
                    }
                }
                explanations.push({ part: args[0], explanation: modeExplanation });
            }
            if (args[1]) {
                explanations.push({ part: args[1], explanation: 'The file or directory to modify.' });
            }
            return explanations;
        }
    },
    chown: {
        description: 'Changes the user and/or group ownership of a given file or directory.',
        options: {
            '-R': { description: 'Operate on files and directories recursively.' }
        },
        handleArguments: (args) => {
            const explanations = [];
            if (args.length > 0) {
                const ownerArg = args[0];
                let ownerExplanation = `The new owner.`;
                if (ownerArg.includes(':')) {
                    const [user, group] = ownerArg.split(':');
                    if (user && group) {
                        ownerExplanation = `Sets the owner to '${user}' and the group to '${group}'.`;
                    } else if (user) {
                         ownerExplanation = `Sets the owner to '${user}' and the group to the user's login group.`;
                    } else if (group) {
                         ownerExplanation = `Sets the group to '${group}' (owner is not changed).`;
                    }
                }
                explanations.push({ part: ownerArg, explanation: ownerExplanation });

                if (args.length > 1) {
                    args.slice(1).forEach(fileArg => {
                        explanations.push({ part: fileArg, explanation: 'The file or directory to modify.' });
                    });
                }
            }
            return explanations;
        }
    },
    chgrp: {
        description: 'Changes the group ownership of a file or directory.',
        options: {
            '-R': { description: 'Operate on files and directories recursively.' }
        },
        handleArguments: (args) => {
            if (args.length >= 2) {
                return [
                    { part: args[0], explanation: 'The new group.' },
                    { part: args[1], explanation: 'The file or directory to modify.' }
                ];
            }
            return args.map(arg => ({ part: arg, explanation: 'A group or file path.'}));
        }
    },
};
