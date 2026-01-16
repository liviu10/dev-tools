import type { CommandInfo } from './types';

export const usersAndGroupsCommands: { [key: string]: CommandInfo } = {
    useradd: {
        description: 'A low-level utility for creating a new user or updating default new user information.',
        options: {
            '-m': { description: 'Create the user\'s home directory if it does not exist.', long: '--create-home' },
            '-g': { description: 'The primary group for the new user.' },
            '-G': { description: 'A list of supplementary groups to add the user to.' },
            '-s': { description: 'The user\'s login shell (e.g., /bin/bash).', long: '--shell' },
            '-c': { description: 'A comment or description for the user.', long: '--comment' },
        },
        handleArguments: (args) => {
            if (args.length > 0) {
                 return [{ part: args[args.length - 1], explanation: 'The username for the new account.' }];
            }
            return [];
        }
    },
    adduser: {
        description: 'A higher-level, more user-friendly command for adding users. On Debian/Ubuntu, it is an interactive script. On Fedora/RHEL, it is a symlink to `useradd`.',
        options: {},
        handleArguments: (args) => {
             if (args.length > 0) {
                 return [{ part: args[0], explanation: 'The username for the new account.' }];
            }
            return [];
        }
    },
    usermod: {
        description: 'Modifies a user account.',
        options: {
            '-aG': { description: 'Combined: Append the user to the supplementary GROUPS. Use with -G.' },
            '-G': { description: 'A list of supplementary groups to set for the user (overwrites existing).', long: '--groups' },
            '-l': { description: 'Change the user\'s login name.', long: '--login' },
            '-d': { description: 'Change the user\'s home directory.', long: '--home' },
            '-s': { description: 'Change the user\'s login shell.', long: '--shell' },
        },
        handleArguments: (args) => {
             if (args.length > 0) {
                 return [{ part: args[args.length - 1], explanation: 'The username of the account to modify.' }];
            }
            return [];
        }
    },
    userdel: {
        description: 'Deletes a user account and related files.',
        options: {
            '-r': { description: 'Remove the user\'s home directory and mail spool.', long: '--remove' },
        },
        handleArguments: (args) => {
            if (args.length > 0) {
                return [{ part: args[0], explanation: 'The username of the account to delete.' }];
            }
            return [];
        }
    },
    groupadd: {
        description: 'Creates a new group.',
        options: {},
         handleArguments: (args) => {
            if (args.length > 0) {
                return [{ part: args[0], explanation: 'The name of the new group.' }];
            }
            return [];
        }
    },
    groupdel: {
        description: 'Deletes a group.',
        options: {},
         handleArguments: (args) => {
            if (args.length > 0) {
                return [{ part: args[0], explanation: 'The name of the group to delete.' }];
            }
            return [];
        }
    },
    passwd: {
        description: 'Changes a user\'s password. If no username is provided, it changes the current user\'s password.',
        options: {},
        handleArguments: (args) => {
            if (args.length > 0) {
                return [{ part: args[0], explanation: 'The username whose password will be changed. (Requires root privileges)' }];
            }
            return [];
        }
    },
    chage: {
        description: 'Change user password expiry information.',
        options: {
            '-l': { description: 'List the account aging information for a user.' },
            '-E': { description: 'Set the date on which the user account will be disabled.' },
        },
        handleArguments: (args) => {
             if (args.length > 0) {
                const lastArg = args[args.length - 1];
                if (!lastArg.startsWith('-')) {
                     return [{ part: lastArg, explanation: 'The username to operate on.' }];
                }
            }
            return [];
        }
    },
    su: {
        description: 'Switch user. Allows you to run commands with the privileges of another user account.',
        options: {
            '-': { description: 'Simulate a full login, which changes the directory to the new user\'s home and loads their environment.', long: '-l, --login' },
            '-c': { description: 'Pass a single command to the shell for execution.', long: '--command=' },
        },
        handleArguments: (args) => {
            const commandIndex = args.indexOf('-c');
            if (commandIndex > -1 && args[commandIndex + 1]) {
                const commandStr = args[commandIndex + 1];
                const userArg = args.find(arg => !arg.startsWith('-') && arg !== commandStr);
                const result = [{ part: commandStr, explanation: 'The command to execute as the other user.' }];
                if (userArg) {
                    result.push({ part: userArg, explanation: 'The user to switch to. If omitted, defaults to `root`.' });
                }
                return result;
            }

            const userArg = args.find(arg => !arg.startsWith('-'));
            if (userArg) {
                return [{ part: userArg, explanation: 'The user to switch to. If omitted, defaults to `root`.' }];
            }
            
            return [];
        }
    },
    id: {
        description: 'Prints real and effective user and group IDs.',
        options: {},
        handleArguments: (args) => {
            if (args.length > 0) {
                return [{ part: args[0], explanation: 'The username to look up. If omitted, it shows information for the current user.' }];
            }
            return [];
        }
    },
    whoami: {
        description: 'Prints the effective username of the current user.',
        options: {}
    },
    who: {
        description: 'Shows who is logged on to the system.',
        options: {}
    },
    last: {
        description: 'Shows a listing of the last logged in users.',
        options: {}
    },
    groups: {
        description: 'Prints the names of the primary and supplementary groups for each given username, or the current process if no username is given.',
        options: {},
        handleArguments: (args) => {
            if (args.length > 0) {
                return [{ part: args[0], explanation: 'The username to check group memberships for.' }];
            }
            return [];
        }
    },
};
