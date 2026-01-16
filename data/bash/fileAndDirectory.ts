import type { BashCheatSheetItem } from './types';

export const fileAndDirectoryCommands: BashCheatSheetItem[] = [
  {
    name: 'ls',
    description: 'Lists directory contents. Use flags like -l for long format, -a to show hidden files, -h for human-readable sizes.',
    example: 'ls -lah',
    category: 'File & Directory Commands',
  },
  {
    name: 'cd',
    description: 'Changes the current directory. `cd ~` or `cd` goes to home. `cd -` goes to the previous directory. `cd ..` goes up one level.',
    example: 'cd /var/www',
    category: 'File & Directory Commands',
  },
  {
    name: 'pwd',
    description: 'Prints the current working directory.',
    example: 'pwd',
    category: 'File & Directory Commands',
  },
  {
    name: 'mkdir',
    description: 'Creates a new directory. The -p flag creates parent directories as needed.',
    example: 'mkdir -p new/project/directory',
    category: 'File & Directory Commands',
  },
  {
    name: 'rm',
    description: 'Removes files or directories. Use -r for recursive deletion (directories) and -f to force removal without prompting. Use with caution.',
    example: 'rm -rf old_project/',
    category: 'File & Directory Commands',
  },
  {
    name: 'cp',
    description: 'Copies files or directories. Use -r to copy directories recursively.',
    example: 'cp -r documents/ backups/',
    category: 'File & Directory Commands',
  },
  {
    name: 'mv',
    description: 'Moves or renames files and directories.',
    example: 'mv old_name.txt new_name.txt\nmv file.txt /new/location/',
    category: 'File & Directory Commands',
  },
  {
    name: 'touch',
    description: 'Creates an empty file or updates the modification timestamp of an existing file.',
    example: 'touch new_file.txt',
    category: 'File & Directory Commands',
  },
  {
    name: 'find',
    description: 'Searches for files and directories. Powerful for finding files by name, type, size, modification time, etc.',
    example: '# Find all .php files in the current directory\nfind . -name "*.php"',
    category: 'File & Directory Commands',
  },
  {
    name: 'ln',
    description: 'Creates links between files. Use -s to create a symbolic (soft) link instead of a hard link.',
    example: '# Create a symbolic link to a file\nln -s /path/to/original.txt /path/to/link.txt',
    category: 'File & Directory Commands',
  },
  {
    name: 'df',
    description: 'Reports file system disk space usage. Use -h for human-readable format.',
    example: 'df -h',
    category: 'File & Directory Commands',
  },
  {
    name: 'du',
    description: 'Estimates file and directory space usage. Use -h for human-readable and -s for a summary.',
    example: 'du -sh /var/log',
    category: 'File & Directory Commands',
  },
  {
    name: 'file',
    description: 'Determines the type of a file (e.g., text, image, binary).',
    example: 'file my_script.sh',
    category: 'File & Directory Commands',
  },
];
