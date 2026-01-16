import type { CommandInfo } from './types';

export const systemCommands: { [key: string]: CommandInfo } = {
    ps: {
        description: 'Report a snapshot of the current processes.',
        options: {
        'aux': { description: 'Show all processes for all users in a user-friendly format (BSD style).'},
        'ax': { description: 'Show all processes, including those not attached to a terminal.'},
        '-ef': { description: 'Show all processes in full format (System V style).'},
        '-p': { description: 'Select by process ID. This may be specified as a comma-separated list.'},
        },
        handleArguments: (args) => {
            // Simple handler to find PIDs after a -p flag
            const pIndex = args.indexOf('-p');
            if (pIndex > -1 && args[pIndex+1]) {
                return [{ part: args[pIndex+1], explanation: 'The Process ID (PID) to display.' }];
            }
            return [];
        }
    },
    kill: {
        description: 'Send a signal to a process, typically to terminate it.',
        options: {
            '-9': { description: 'Send the SIGKILL signal, which is a non-catchable, non-ignorable signal to forcefully terminate the process.'},
            '-15': { description: 'Send the default SIGTERM signal, which requests the process to terminate gracefully.'},
            '-l': { description: 'List all available signal names.'}
        },
        handleArguments: (args) => args.filter(arg => !arg.startsWith('-')).map(arg => ({
            part: arg,
            explanation: 'The Process ID (PID) of the process to send the signal to.'
        }))
    },
    pgrep: {
        description: 'Look up or signal processes based on name and other attributes.',
        options: {
            '-l': { description: 'List the process name as well as the process ID.', long: '--list-name' },
            '-f': { description: 'The pattern is normally only matched against the process name. When -f is set, the full command line is used.', long: '--full' },
        },
        handleArguments: (args) => args.filter(arg => !arg.startsWith('-')).map(arg => ({
            part: arg,
            explanation: 'The pattern to search for in process names or command lines.'
        }))
    },
    pkill: {
        description: 'Send a signal to processes based on name and other attributes.',
        options: {
            '-f': { description: 'The pattern is normally only matched against the process name. When -f is set, the full command line is used.', long: '--full' },
        },
        handleArguments: (args) => args.filter(arg => !arg.startsWith('-')).map(arg => ({
            part: arg,
            explanation: 'The pattern to search for in process names or command lines to terminate.'
        }))
    },
    sudo: {
        description: 'Execute a command as another user, typically the superuser (root).',
        options: {
            '-i': { description: 'Run the shell specified by the target user\'s password database entry as a login shell.' },
            '-s': { description: 'Run the shell specified by the SHELL environment variable, if it is set, or the shell specified in the user\'s password database entry.' }
        },
    },
    uname: {
        description: 'Print certain system information.',
        options: {
            '-a': { description: 'Print all information.' },
            '-s': { description: 'Print the kernel name.' },
            '-r': { description: 'Print the kernel release.' }
        }
    },
    history: {
        description: 'Displays the command history list with line numbers.',
        options: {
            '-c': { description: 'Clear the history list by deleting all the entries.' }
        }
    },
    top: {
        description: 'Display Linux processes in real-time.',
        options: {
            '-n': { description: 'Specifies the maximum number of iterations, or frames, top should produce before ending.'},
            '-d': { description: 'Specifies the delay between screen updates.' }
        }
    },
    htop: {
        description: 'An interactive process viewer. A more user-friendly alternative to `top`. (Note: May need to be installed, e.g., `sudo apt install htop` or `sudo dnf install htop`).',
        options: {
            '-u': { description: 'Show only the processes of a given user.', long: '--user='}
        }
    },
    uptime: {
        description: 'Tells how long the system has been running.',
        options: {
            '-p': { description: 'Show uptime in a pretty format.', long: '--pretty'}
        }
    },
    free: {
        description: 'Display amount of free and used memory in the system.',
        options: {
            '-h': { description: 'Show all output fields automatically in the shortest possible human-readable format.', long: '--human'}
        }
    },
    dmesg: {
        description: 'Print or control the kernel ring buffer.',
        options: {
            '-H': { description: 'Enable human-readable output.', long: '--human'},
            '-w': { description: 'Wait for new messages.', long: '--follow'}
        }
    },
    lscpu: {
        description: 'Display information about the CPU architecture.',
        options: {}
    },
    lsblk: {
        description: 'List block devices (disks and partitions).',
        options: {
            '-f': { description: 'List information about filesystems.', long: '--fs'}
        }
    },
    systemctl: {
        description: 'The main tool for controlling the `systemd` system and service manager.',
        options: {},
        handleArguments: (args) => {
            const subCommands: {[key: string]: string} = {
                'status': 'Shows runtime status of one or more services.',
                'start': 'Starts (activates) one or more services.',
                'stop': 'Stops (deactivates) one or more services.',
                'restart': 'Stops and then starts a service.',
                'reload': 'Asks a service to reload its configuration.',
                'enable': 'Enables one or more services to start at boot.',
                'disable': 'Disables one or more services from starting at boot.',
                'is-active': 'Checks if a service is running.',
                'is-enabled': 'Checks if a service is enabled to start at boot.',
            };
            if (args.length > 0) {
                const [sub, ...rest] = args;
                const explanation = subCommands[sub] || 'A sub-command (e.g., status, start) or service name.';
                const result = [{ part: sub, explanation }];
                if (rest.length > 0) {
                     result.push({ part: rest.join(' '), explanation: 'The name of the service or unit to act upon.' });
                }
                return result;
            }
            return [];
        }
    },
    journalctl: {
        description: 'Queries and displays logs from the `systemd` journal.',
        options: {
            '-u': { description: 'Show logs for the specified systemd unit (service).', long: '--unit='},
            '-f': { description: 'Follow the journal, showing new messages as they are appended.', long: '--follow' },
            '-b': { description: 'Show messages from a specific boot. A value of -1 means the previous boot.', long: '--boot=' },
            '-n': { description: 'Show the most recent N journal entries.', long: '--lines=' }
        }
    },
    shutdown: {
        description: 'Shuts down the system.',
        options: {
            '-h': { description: 'Halt or power-off the machine. This is the default if no time is specified.'},
            '-r': { description: 'Reboot the machine.'},
            '-c': { description: 'Cancel a pending shutdown.'}
        },
        handleArguments: (args) => {
            const timeArg = args.find(a => !a.startsWith('-'));
            if (timeArg) {
                let explanation = `The time to execute the shutdown. Can be an absolute time in HH:MM format, or a relative time like '+5' for 5 minutes. The word 'now' is an alias for '+0'.`
                return [{ part: timeArg, explanation }];
            }
            return [];
        }
    },
    reboot: {
        description: 'Reboots the system. A shortcut for `shutdown -r now`.',
        options: {}
    },
    crontab: {
        description: 'Maintains crontab files for individual users to schedule commands.',
        options: {
            '-e': { description: 'Edit the current user\'s crontab file.' },
            '-l': { description: 'List the current user\'s crontab file.' },
            '-r': { description: 'Remove the current user\'s crontab file.' },
        }
    },
    lsof: {
        description: 'List open files. A powerful tool for seeing which files are being used by which processes.',
        customParsing: true,
        options: {
            '-i': { description: 'Lists IP sockets. Can be followed by a port (e.g., -i :8080).' },
            '-u': { description: 'Lists files opened by a specific user.' },
            '-p': { description: 'Lists files opened by a specific process ID (PID).' }
        },
        handleArguments: (args) => {
            const explanations = [];
            let i = 0;
            while (i < args.length) {
                const arg = args[i];
                const nextArg = args[i+1];

                if (arg === '-i') {
                    explanations.push({ part: arg, explanation: 'Action: Selects files whose Internet address matches the address specified.' });
                    if (nextArg && !nextArg.startsWith('-')) {
                        let explanation = `The network address to filter by.`;
                        if (nextArg.startsWith(':')) {
                            explanation = `Selects any connection on port ${nextArg.slice(1)}.`;
                        }
                        explanations.push({ part: nextArg, explanation });
                        i++;
                    }
                } else if (arg.startsWith('-i')) { // handle -i:8080
                    const address = arg.slice(2);
                    let explanation = `Selects files whose Internet address matches '${address}'.`;
                    if (address.startsWith(':')) {
                        explanation = `Selects any connection on port ${address.slice(1)}.`;
                    }
                     explanations.push({ part: arg, explanation });
                } else if (arg === '-u') {
                    explanations.push({ part: arg, explanation: 'Action: Selects files for the specified user.' });
                    if (nextArg && !nextArg.startsWith('-')) {
                        explanations.push({ part: nextArg, explanation: `The username to filter by.` });
                        i++;
                    }
                } else if (arg === '-p') {
                    explanations.push({ part: arg, explanation: 'Action: Selects files for the specified process ID.' });
                    if (nextArg && !nextArg.startsWith('-')) {
                        explanations.push({ part: nextArg, explanation: `The PID to filter by.` });
                        i++;
                    }
                } else if (!arg.startsWith('-')) {
                    explanations.push({ part: arg, explanation: 'A file path to list processes that have it open.' });
                }
                i++;
            }
            return explanations;
        }
    },
    jobs: {
        description: 'Lists the active jobs (background processes) started from the current shell.',
        options: {}
    },
    bg: {
        description: 'Resumes a suspended job in the background.',
        options: {},
        handleArguments: (args) => args.map(arg => ({
            part: arg,
            explanation: 'The job ID (e.g., %1) to resume in the background. If omitted, the most recently suspended job is used.'
        }))
    },
    fg: {
        description: 'Brings a job to the foreground.',
        options: {},
        handleArguments: (args) => args.map(arg => ({
            part: arg,
            explanation: 'The job ID (e.g., %1) to bring to the foreground. If omitted, the most recently backgrounded job is used.'
        }))
    },
    nice: {
        description: 'Run a command with a modified scheduling priority.',
        options: {
            '-n': { description: 'Add an integer NICENESS to the command\'s priority (default 10). Higher values mean lower priority.'}
        },
        handleArguments: (args) => args.filter(arg => !arg.startsWith('-') && isNaN(parseInt(arg))).map(arg => ({
            part: arg,
            explanation: 'The command to run with modified priority.'
        }))
    },
    renice: {
        description: 'Alter the scheduling priority of one or more running processes.',
        options: {
            '-p': { description: 'Interpret the arguments as process IDs (default).'}
        },
        handleArguments: (args) => {
            const priority = args[0];
            const pids = args.slice(1);
            if (!priority || isNaN(parseInt(priority))) return [];
            return [
                { part: priority, explanation: 'The new priority value (-20 to 19). Non-superusers can only increase the priority value (lower the priority).' },
                ...pids.filter(pid => !pid.startsWith('-')).map(pid => ({ part: pid, explanation: 'The process ID (PID) to modify.' }))
            ];
        }
    }
};
