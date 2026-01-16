import type { CommandInfo, CommandOption } from './types';

// A simple way to handle combined flags for 'ls'
const lsCombinedFlags: { [key: string]: CommandOption } = {};
const lsFlags = { a: 'show hidden files', l: 'long listing format', h: 'human-readable sizes', t: 'sort by modification time', r: 'reverse order while sorting' };
const flagKeys = Object.keys(lsFlags) as (keyof typeof lsFlags)[];

// Generate all permutations of the flags
for (let i = 1; i < (1 << flagKeys.length); i++) {
    let combination = '';
    const descriptionParts: string[] = [];
    for (let j = 0; j < flagKeys.length; j++) {
        if ((i >> j) & 1) {
            const flag = flagKeys[j];
            combination += flag;
            descriptionParts.push(`${lsFlags[flag]} (-${flag})`);
        }
    }
    if (combination.length > 1) {
       const sortedCombination = combination.split('').sort().join('');
       lsCombinedFlags[`-${sortedCombination}`] = {
           description: `Combined: ${descriptionParts.join(', ')}.`
       };
    }
}

export const fileSystemCommands: { [key: string]: CommandInfo } = {
    ls: {
        description: 'Lists directory contents.',
        options: {
        '-l': { description: 'Use a long listing format.' },
        '-a': { description: 'Do not ignore entries starting with . (show hidden files).', long: '--all' },
        '-h': { description: 'With -l, print sizes in human readable format (e.g., 1K 234M 2G).', long: '--human-readable' },
        '-t': { description: 'Sort by modification time, newest first.'},
        '-r': { description: 'Reverse order while sorting.', long: '--reverse' },
        '-R': { description: 'List subdirectories recursively.', long: '--recursive' },
        ...lsCombinedFlags,
        },
        handleArguments: (args) => {
        return args.map(arg => ({
            part: arg,
            explanation: `File or directory to list. If omitted, it lists the contents of the current directory.`
        }));
        }
    },
    cd: {
        description: 'Changes the current working directory.',
        options: {},
        handleArguments: (args) => {
            if (args.length === 0 || args[0] === '~') {
                return [{part: args[0] || '', explanation: 'With no arguments or with `~`, `cd` changes to the home directory.'}]
            }
            if (args[0] === '-') {
                return [{ part: args[0], explanation: 'Changes to the previous working directory.' }]
            }
            return [{ part: args[0], explanation: 'The directory to change into.' }]
        }
    },
    mkdir: {
        description: 'Creates a directory.',
        options: {
            '-p': { description: 'Create parent directories as needed (e.g., `mkdir -p a/b/c` will create `a` and `a/b` if they don\'t exist).', long: '--parents' },
            '-v': { description: 'Print a message for each created directory.', long: '--verbose' }
        },
        handleArguments: (args) => args.map(arg => ({
            part: arg,
            explanation: 'The name of the directory to be created.'
        }))
    },
    rm: {
        description: 'Removes files or directories.',
        options: {
            '-r': { description: 'Remove directories and their contents recursively.', long: '-R, --recursive' },
            '-f': { description: 'Force removal without prompting for confirmation.', long: '--force' },
            '-i': { description: 'Prompt before every removal.' },
            '-rf': { description: 'Combined: Forcefully and recursively remove. Use with extreme caution!'},
            '-fr': { description: 'Combined: Forcefully and recursively remove. Use with extreme caution!'}
        },
        handleArguments: (args) => args.map(arg => ({
            part: arg,
            explanation: 'The file or directory to be removed.'
        }))
    },
    mv: {
        description: 'Moves or renames files and directories.',
        options: {
            '-i': { description: 'Prompt before overwriting an existing file.', long: '--interactive' },
            '-u': { description: 'Move only when the source file is newer than the destination file or when the destination file is missing.', long: '--update' },
            '-v': { description: 'Explain what is being done.', long: '--verbose' }
        },
        handleArguments: (args) => {
            if (args.length >= 2) {
                const sources = args.slice(0, -1);
                const destination = args[args.length - 1];
                return [
                    ...sources.map(s => ({ part: s, explanation: 'A source file or directory.' })),
                    { part: destination, explanation: 'The destination directory or file name.' }
                ];
            }
            return args.map(arg => ({ part: arg, explanation: 'A source or destination path.' }));
        }
    },
    cp: {
        description: 'Copies files and directories.',
        options: {
            '-r': { description: 'Copy directories recursively.' },
            '-a': { description: 'Archive mode; same as -dR --preserve=all. Preserves permissions, ownership, timestamps, and links.', long: '--archive' },
            '-v': { description: 'Explain what is being done.', long: '--verbose' },
            '-i': { description: 'Prompt before overwrite.', long: '--interactive' },
            '-u': { description: 'Copy only when the source file is newer than the destination file or when the destination file is missing.', long: '--update' },
        },
        handleArguments: (args) => {
            if (args.length >= 2) {
                const sources = args.slice(0, -1);
                const destination = args[args.length - 1];
                return [
                    ...sources.map(s => ({ part: s, explanation: 'A source file or directory to copy.' })),
                    { part: destination, explanation: 'The destination directory or file.' }
                ];
            }
            return args.map(arg => ({ part: arg, explanation: 'A source or destination path.' }));
        }
    },
    pwd: {
        description: 'Print name of current/working directory.',
        options: {}
    },
    touch: {
        description: 'Change file timestamps. Creates the file if it does not exist.',
        options: {},
        handleArguments: (args) => args.map(arg => ({
            part: arg,
            explanation: 'The name of the file to create or update.'
        }))
    },
    find: {
        description: 'Searches for files in a directory hierarchy.',
        customParsing: true,
        options: {
            '-name': { description: 'Find files by name. Wildcards can be used (e.g., "*.txt").' },
            '-type': { description: "Find files by type. 'd' for directory, 'f' for file." },
            '-mtime': { description: 'Find files based on last modification time in days.' },
            '-user': { description: 'Find files owned by a specific user.' },
            '-exec': { description: 'Execute a command on each found file.'},
            '-delete': { description: 'Deletes the found files. Use with caution.'}
        },
        handleArguments: (args) => {
            const explanations: { part: string; explanation: string }[] = [];
            if (args.length === 0) return explanations;

            let i = 0;
            if (!args[0].startsWith('-')) {
                explanations.push({ part: args[0], explanation: 'The starting directory for the search.' });
                i++;
            } else {
                explanations.push({ part: '.', explanation: 'The starting directory for the search (defaulting to current directory).' });
            }

            while (i < args.length) {
                const arg = args[i];
                const nextArg = args[i+1];

                if (arg === '-type' || arg === '-name' || arg === '-user' || arg === '-mtime') {
                    const typeMap: {[key: string]: string} = { '-type': 'type', '-name': 'name', '-user': 'user', '-mtime': 'modification time' };
                    explanations.push({ part: arg, explanation: `Test: finds items by ${typeMap[arg]}.` });
                    i++;
                    if (nextArg) {
                        let explanation = `The value for the ${typeMap[arg]} test.`;
                        if (arg === '-type') {
                             const fileTypeMap: {[key:string]: string} = { d: 'directories', f: 'regular files', l: 'symbolic links' };
                             explanation = `The type to find: '${fileTypeMap[nextArg] || 'unknown'}'.`;
                        } else if (arg === '-mtime') {
                             if (nextArg.startsWith('-')) explanation = `Modified in the last ${nextArg.substring(1)} days.`;
                             else if (nextArg.startsWith('+')) explanation = `Modified more than ${nextArg.substring(1)} days ago.`;
                             else explanation = `Modified exactly ${nextArg} days ago.`
                        }
                        explanations.push({ part: nextArg, explanation });
                        i++;
                    }
                } else if (arg === '-exec') {
                    explanations.push({ part: arg, explanation: 'Action: Execute the following command for each file found.' });
                    i++;

                    if (i < args.length) {
                        explanations.push({ part: args[i], explanation: 'The command to be executed.' });
                        i++;
                    }

                    while(i < args.length && args[i] !== '\\;') {
                        const execArg = args[i];
                        if (execArg === '{}') {
                            explanations.push({ part: execArg, explanation: `A placeholder replaced by the current file name being processed.` });
                        } else {
                            explanations.push({ part: execArg, explanation: `An argument for the executed command.` });
                        }
                        i++;
                    }

                    if (i < args.length && args[i] === '\\;') {
                        explanations.push({ part: args[i], explanation: 'Terminates the -exec command.' });
                        i++;
                    }
                } else if (arg === '-delete') {
                    explanations.push({ part: arg, explanation: 'Action: Deletes each file found. This is a terminating action.' });
                    i++;
                } else {
                    explanations.push({ part: arg, explanation: 'An unknown option or argument for find.' });
                    i++;
                }
            }
            return explanations;
        }
    },
    df: {
        description: 'Report file system disk space usage.',
        options: {
            '-h': { description: 'Print sizes in human-readable format (e.g., 1K 234M 2G).' }
        }
    },
    du: {
        description: 'Estimate file and directory space usage.',
        options: {
            '-h': { description: 'Print sizes in human-readable format (e.g., 1K 234M 2G).'},
            '-s': { description: 'Display only a total for each argument.'},
            '-c': { description: 'Produce a grand total.'},
            '-a': { description: 'Write counts for all files, not just directories.'},
            '-sh': { description: 'Combined: Display a summary in human-readable format.' },
            '-sch': { description: 'Combined: Display a summary with a grand total in human-readable format.' },
        },
        handleArguments: (args) => args.map(arg => ({
            part: arg,
            explanation: 'The file or directory to check the size of.'
        }))
    },
    ln: {
        description: 'Create links between files.',
        options: {
            '-s': { description: 'Create a symbolic link instead of a hard link.', long: '--symbolic'},
            '-v': { description: 'Print name of each linked file.', long: '--verbose' }
        },
        handleArguments: (args) => {
            if (args.length === 2) {
                return [
                    { part: args[0], explanation: 'The existing file or directory to link to (the target).' },
                    { part: args[1], explanation: 'The name of the new link to create.' }
                ];
            }
            return args.map(arg => ({ part: arg, explanation: 'A source target or link name.' }));
        }
    },
    stat: {
        description: 'Display file or file system status.',
        options: {
            '-c': { description: 'Use the specified format instead of the default.', long: '--format'}
        },
        handleArguments: (args) => args.map(arg => ({
            part: arg,
            explanation: 'The file or directory to get information about.'
        }))
    },
    file: {
        description: 'Determine file type.',
        options: {
            '-b': { description: 'Brief mode. Do not prepend filenames to output lines.', long: '--brief'},
            '-i': { description: 'Causes the file command to output mime type strings.', long: '--mime'}
        },
        handleArguments: (args) => args.map(arg => ({
            part: arg,
            explanation: 'The file to check the type of.'
        }))
    },
    tree: {
        description: 'List contents of directories in a tree-like format. (Note: May need to be installed separately, e.g., `sudo apt install tree` or `sudo dnf install tree`).',
        customParsing: true,
        options: {
            '-d': { description: 'List directories only.'},
            '-L': { description: 'Descend only level directories deep.'}
        },
         handleArguments: (args) => {
            const explanations = [];
            let i = 0;
            while(i < args.length) {
                const arg = args[i];
                const nextArg = args[i+1];
                if (arg === '-L') {
                     explanations.push({ part: arg, explanation: 'Specifies the maximum display depth of the directory tree.' });
                     if (nextArg && !isNaN(parseInt(nextArg))) {
                         explanations.push({ part: nextArg, explanation: `The number of levels to descend.` });
                         i++;
                     }
                } else if (!arg.startsWith('-')) {
                     explanations.push({ part: arg, explanation: 'The directory to start the listing from.' });
                }
                // Other simple options are handled by the main parser
                i++;
            }
            return explanations;
         }
    },
    which: {
        description: 'Locates a command by searching for it in the user\'s PATH.',
        options: {
            '-a': { description: 'Print all matching pathnames of each argument.', long: '--all' }
        },
        handleArguments: (args) => args.map(arg => ({
            part: arg,
            explanation: 'The command to locate.'
        }))
    },
    mount: {
        description: 'Mount a filesystem. (Note: Usually requires `sudo`).',
        options: {
            '-t': { description: 'The argument following -t is used to indicate the filesystem type.' },
            '-o': { description: 'Mount options are specified with a -o flag followed by a comma-separated string of options.' }
        },
         handleArguments: (args) => {
            if (args.length === 2) {
                 return [
                    { part: args[0], explanation: 'The device to mount (e.g., /dev/sdb1).' },
                    { part: args[1], explanation: 'The directory to mount it on (the mount point).' }
                ];
            }
            return args.map(arg => ({ part: arg, explanation: 'An argument for mount.'}))
         }
    },
    umount: {
        description: 'Unmount filesystems. (Note: Usually requires `sudo`).',
        options: {
            '-l': { description: 'Lazy unmount. Detach the filesystem now, and clean up all references later.', long: '--lazy' }
        },
         handleArguments: (args) => args.map(arg => ({
            part: arg,
            explanation: 'The mount point or device to unmount (e.g., /mnt/data or /dev/sdb1).'
        }))
    },
    dd: {
        description: 'Copy a file, converting and formatting according to the operands.',
        options: {},
        handleArguments: (args) => {
            const explanations = [];
            const operandMap: {[key:string]: string} = {
                'if': 'Input file. Source to read from.',
                'of': 'Output file. Destination to write to.',
                'bs': 'Block size. Read and write up to BYTES bytes at a time.',
                'count': 'Copy only N input blocks.',
                'status': 'Specifies the level of progress information to display (e.g., "progress").'
            };
            for (const arg of args) {
                const parts = arg.split('=');
                if (parts.length === 2) {
                    const key = parts[0];
                    const value = parts[1];
                    const explanation = operandMap[key] ? `${operandMap[key]} (value: ${value})` : `An operand with key '${key}' and value '${value}'.`;
                    explanations.push({ part: arg, explanation });
                } else {
                    explanations.push({ part: arg, explanation: 'An unknown operand.' });
                }
            }
            return explanations;
        }
    },
};
