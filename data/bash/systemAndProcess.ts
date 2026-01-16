import type { BashCheatSheetItem } from './types';

export const systemAndProcessCommands: BashCheatSheetItem[] = [
  {
    name: 'ps',
    description: 'Reports a snapshot of the current processes. `ps aux` is a common invocation to see all running processes.',
    example: 'ps aux | grep "nginx"',
    category: 'System & Process Management',
  },
  {
    name: 'top / htop',
    description: 'Displays a real-time view of running processes. `htop` is a more user-friendly, interactive version.',
    example: 'top',
    category: 'System & Process Management',
  },
  {
    name: 'kill',
    description: 'Sends a signal to a process, typically to terminate it. Requires a Process ID (PID). `kill -9 <PID>` forcefully kills a process.',
    example: 'kill 12345',
    category: 'System & Process Management',
  },
  {
    name: 'pkill / pgrep',
    description: '`pkill` kills processes based on their name. `pgrep` finds process IDs based on their name.',
    example: 'pkill -9 firefox\npgrep nginx',
    category: 'System & Process Management',
  },
  {
    name: 'jobs / bg / fg',
    description: '`jobs` lists background processes. `bg` sends a suspended process to the background. `fg` brings a background process to the foreground.',
    example: 'jobs\nbg %1\nfg %1',
    category: 'System & Process Management',
  },
  {
    name: 'sudo',
    description: 'Executes a command with superuser (root) privileges.',
    example: 'sudo apt-get update',
    category: 'System & Process Management',
  },
  {
    name: 'free',
    description: 'Displays the amount of free and used memory in the system. Use -h for human-readable format.',
    example: 'free -h',
    category: 'System & Process Management',
  },
  {
    name: 'uptime',
    description: 'Shows how long the system has been running, along with the current time, number of users, and load averages.',
    example: 'uptime',
    category: 'System & Process Management',
  },
];
