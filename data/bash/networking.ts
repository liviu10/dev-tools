import type { BashCheatSheetItem } from './types';

export const networkingCommands: BashCheatSheetItem[] = [
  {
    name: 'ping',
    description: 'Checks connectivity to a network host by sending ICMP packets.',
    example: 'ping google.com',
    category: 'Networking',
  },
  {
    name: 'curl',
    description: 'A tool to transfer data from or to a server. Can be used to make HTTP requests, download files, and much more.',
    example: '# Get the headers of a URL\ncurl -I https://example.com',
    category: 'Networking',
  },
  {
    name: 'wget',
    description: 'A utility for non-interactive download of files from the web.',
    example: 'wget https://example.com/file.zip',
    category: 'Networking',
  },
  {
    name: 'ssh',
    description: 'Secure Shell. Connects to a remote server securely.',
    example: 'ssh user@remote_host',
    category: 'Networking',
  },
  {
    name: 'scp',
    description: 'Secure Copy. Copies files between hosts on a network.',
    example: '# Copy local file to remote host\nscp file.txt user@remote_host:/remote/dir/',
    category: 'Networking',
  },
  {
    name: 'ss',
    description: 'A utility to investigate sockets (network connections). The modern replacement for `netstat`.',
    example: '# List all listening TCP sockets\nss -tlnp',
    category: 'Networking',
  },
  {
    name: 'ip',
    description: 'The modern tool for showing and manipulating network interfaces, routes, etc. Replaces `ifconfig`.',
    example: '# Show all IP addresses\nip addr show',
    category: 'Networking',
  },
  {
    name: 'dig',
    description: 'A flexible tool for interrogating DNS name servers.',
    example: 'dig example.com',
    category: 'Networking',
  },
];
