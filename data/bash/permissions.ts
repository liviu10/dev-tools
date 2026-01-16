import type { BashCheatSheetItem } from './types';

export const permissionsCommands: BashCheatSheetItem[] = [
  {
    name: 'chmod',
    description: 'Changes the permissions of a file or directory. Can use octal (e.g., 755) or symbolic (e.g., u+x) notation.',
    example: '# Give the owner execute permission\nchmod u+x script.sh\n\n# Set read/write for owner, read-only for group/others\nchmod 644 config.yml',
    category: 'Permissions',
  },
  {
    name: 'chown',
    description: 'Changes the user and/or group ownership of a file or directory.',
    example: '# Change owner to "www-data"\nchown www-data:www-data /var/www/html',
    category: 'Permissions',
  },
  {
    name: 'chgrp',
    description: 'Changes the group ownership of a file or directory.',
    example: 'chgrp developers my_file.txt',
    category: 'Permissions',
  },
];
