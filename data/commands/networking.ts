import type { CommandInfo } from './types';

export const networkingCommands: { [key: string]: CommandInfo } = {
    curl: {
        description: 'A tool to transfer data from or to a server, using one of the supported protocols (HTTP, HTTPS, FTP, etc.).',
        options: {
            '-O': { description: 'Write output to a local file named like the remote file.' },
            '-o': { description: 'Write output to a local file with a specified name.', long: '--output' },
            '-L': { description: 'Follow redirects.', long: '--location' },
            '-X': { description: 'Specifies a custom request method to use when communicating with the HTTP server.', long: '--request' },
            '-H': { description: 'Extra header to include in the request when sending HTTP to a server.', long: '--header' },
            '-d': { description: 'Sends the specified data in a POST request to the HTTP server.', long: '--data' },
            '-I': { description: 'Fetch the headers only!', long: '--head' }
        },
        handleArguments: (args) => {
            const lastArg = args.length > 0 ? args[args.length - 1] : '';
            if (lastArg && !lastArg.startsWith('-')) {
                 return [{
                    part: lastArg,
                    explanation: 'The URL to request.'
                }];
            }
            return [];
        }
    },
    wget: {
        description: 'A free utility for non-interactive download of files from the Web.',
        options: {
            '-c': { description: 'Continue getting a partially-downloaded file.', long: '--continue' },
            '-O': { description: 'Write documents to FILE.', long: '--output-document=FILE' },
            '-r': { description: 'Turn on recursive retrieving.', long: '--recursive' },
            '-np': { description: 'Do not ever ascend to the parent directory when retrieving recursively.', long: '--no-parent'}
        },
        handleArguments: (args) => {
             const lastArg = args.length > 0 ? args[args.length - 1] : '';
             if (lastArg && !lastArg.startsWith('-')) {
                 return [{
                    part: lastArg,
                    explanation: 'The URL of the file to download.'
                }];
             }
             return [];
        }
    },
    ping: {
        description: 'Sends ICMP ECHO_REQUEST packets to network hosts to check connectivity.',
        options: {
            '-c': { description: 'Stop after sending a specified count of ECHO_REQUEST packets.'},
            '-i': { description: 'Wait a specified interval in seconds between sending each packet.' }
        },
        handleArguments: (args) => {
            const hostArg = args.find(arg => !arg.startsWith('-') && isNaN(parseInt(arg)));
            if (hostArg) {
                 return [{
                    part: hostArg,
                    explanation: 'The hostname or IP address to ping.'
                }];
            }
            return [];
        }
    },
    ssh: {
        description: 'OpenSSH SSH client (remote login program).',
        options: {
            '-p': { description: 'Port to connect to on the remote host.' },
            '-i': { description: 'Selects a file from which the identity (private key) for public key authentication is read.'},
            '-v': { description: 'Verbose mode. Causes ssh to print debugging messages about its progress.' },
            '-l': { description: 'Specifies the user to log in as on the remote machine.' }
        },
        handleArguments: (args) => {
            const hostArg = args.find(arg => !arg.startsWith('-') && arg.includes('@'));
            if (hostArg) {
                 return [{
                    part: hostArg,
                    explanation: `The remote host and user to connect to, in 'user@hostname' format.`
                }];
            }
            const hostOnlyArg = args.find(arg => !arg.startsWith('-') && !args.includes('-l'));
             if (hostOnlyArg) {
                 return [{
                    part: hostOnlyArg,
                    explanation: `The remote host to connect to. The username will be the same as the local user.`
                }];
            }
            return [];
        }
    },
    scp: {
        description: 'Secure copy. A tool for securely copying files between a local and a remote host or between two remote hosts.',
        options: {
            '-r': { description: 'Recursively copy entire directories.' },
            '-P': { description: 'Specifies the port to connect to on the remote host. Note the capital "P".' }
        },
        handleArguments: (args) => {
            if (args.length >= 2) {
                const source = args[args.length - 2];
                const destination = args[args.length - 1];
                const isRemote = (path: string) => path.includes(':');
                return [
                    { part: source, explanation: `Source file or directory. ${isRemote(source) ? '(This is a remote path)' : ''}`},
                    { part: destination, explanation: `Destination file or directory. ${isRemote(destination) ? '(This is a remote path)' : ''}`},
                ];
            }
            return [];
        }
    },
    ip: {
        description: 'The modern tool for showing and manipulating routing, network devices, interfaces, and tunnels. It has replaced the older `ifconfig`.',
        options: {},
        handleArguments: (args) => {
            if (args.length > 0) {
                const subCommands: {[key: string]: string} = {
                    'addr': 'Show and manipulate protocol addresses on network devices.',
                    'address': 'Alias for "addr".',
                    'route': 'Show and manipulate the routing table.',
                    'link': 'Show and manipulate network devices.',
                    'show': 'Show information about the object.',
                };
                const explanations = [];
                if (subCommands[args[0]]) {
                     explanations.push({ part: args[0], explanation: subCommands[args[0]] });
                } else {
                     explanations.push({ part: args[0], explanation: `An object to manage (e.g., addr, route, link).` });
                }
                if (args.length > 1 && subCommands[args[1]]) {
                     explanations.push({ part: args[1], explanation: subCommands[args[1]] });
                }
                return explanations;
            }
            return [];
        }
    },
    ifconfig: {
        description: '(DEPRECATED) Configure a network interface. The `ip` command is the modern replacement.',
        options: {},
        handleArguments: (args) => args.map(arg => ({
            part: arg,
            explanation: 'The name of the network interface to configure or display (e.g., eth0).'
        }))
    },
    netstat: {
        description: '(DEPRECATED) Prints network connections, routing tables, interface statistics, etc. The `ss` command is the modern replacement.',
        options: {
            '-t': { description: 'Display TCP connections.' },
            '-u': { description: 'Display UDP connections.' },
            '-n': { description: 'Show numerical addresses instead of trying to determine symbolic host, port or user names.' },
            '-l': { description: 'Show only listening sockets.' },
            '-p': { description: 'Show the PID and name of the program to which each socket belongs (requires sudo).' },
            '-tunlp': { description: 'A common combination to show all listening TCP and UDP connections with numeric addresses and process IDs.' }
        }
    },
    ss: {
        description: 'A utility to investigate sockets. It is the modern replacement for `netstat`.',
        options: {
            '-t': { description: 'Display TCP sockets.' },
            '-u': { description: 'Display UDP sockets.' },
            '-n': { description: 'Do not try to resolve service names.' },
            '-l': { description: 'Display listening sockets.' },
            '-p': { description: 'Show process using socket.' },
            '-a': { description: 'Display all sockets.' },
            '-tuln': { description: 'A common combination to show listening TCP and UDP sockets with numeric addresses.'}
        }
    },
    dig: {
        description: 'DNS lookup utility for querying DNS name servers.',
        options: {},
        handleArguments: (args) => args.map(arg => ({
            part: arg,
            explanation: 'The domain name to query.'
        }))
    },
    nslookup: {
        description: 'Query Internet name servers interactively for DNS information.',
        options: {},
         handleArguments: (args) => args.map(arg => ({
            part: arg,
            explanation: 'The domain name to look up.'
        }))
    },
    traceroute: {
        description: 'Prints the route that packets take to a network host.',
        options: {},
         handleArguments: (args) => args.map(arg => ({
            part: arg,
            explanation: 'The destination host to trace the route to.'
        }))
    },
    host: {
        description: 'A simple utility for performing DNS lookups.',
        options: {},
        handleArguments: (args) => args.map(arg => ({
            part: arg,
            explanation: 'The domain name or IP address to look up.'
        }))
    },
    hostname: {
        description: 'Show or set the system\'s host name.',
        options: {},
        handleArguments: (args) => {
            if (args.length > 0) {
                 return [{ part: args[0], explanation: 'The new hostname to set. (Requires root privileges)' }];
            }
            return [];
        }
    },
    route: {
        description: '(DEPRECATED) Show / manipulate the IP routing table. The `ip route` command is the modern replacement.',
        options: {
            '-n': { description: 'Show numerical addresses instead of symbolic host names.'}
        }
    }
};
