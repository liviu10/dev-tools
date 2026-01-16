export interface BashCheatSheetItem {
  name: string;
  description: string;
  example: string;
  category: 'File & Directory Commands' | 'Text Processing' | 'System & Process Management' | 'Permissions' | 'Networking' | 'Shell Scripting Basics' | 'Shortcuts & History' | 'Archive & Compression';
}

export const bashData: BashCheatSheetItem[] = [
  // --- File & Directory Commands ---
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

  // --- Text Processing ---
  {
    name: 'cat',
    description: 'Concatenates and displays the content of files.',
    example: 'cat file1.txt file2.txt',
    category: 'Text Processing',
  },
  {
    name: 'grep',
    description: 'Searches for a pattern in text. Use -i for case-insensitive, -r for recursive, and -v to invert the match.',
    example: '# Search for "error" in a log file\ngrep -i "error" /var/log/syslog',
    category: 'Text Processing',
  },
  {
    name: 'sed',
    description: 'A stream editor for filtering and transforming text. Often used for find-and-replace.',
    example: '# Replace all occurrences of "foo" with "bar" in a file\nsed \'s/foo/bar/g\' input.txt > output.txt',
    category: 'Text Processing',
  },
  {
    name: 'awk',
    description: 'A powerful pattern scanning and processing language. Excellent for processing columnar data.',
    example: '# Print the first column of a space-separated file\nawk \'{print $1}\' data.txt',
    category: 'Text Processing',
  },
  {
    name: 'cut',
    description: 'Removes sections from each line of files. Useful for extracting columns from delimited data.',
    example: '# Get the 1st and 3rd fields from a colon-delimited file\ncut -d\':\' -f1,3 /etc/passwd',
    category: 'Text Processing',
  },
  {
    name: 'tr',
    description: 'Translates or deletes characters. Useful for case conversion or changing delimiters.',
    example: '# Convert all lowercase letters to uppercase\necho \'hello world\' | tr \'a-z\' \'A-Z\'',
    category: 'Text Processing',
  },
  {
    name: 'head / tail',
    description: '`head` displays the beginning of a file. `tail` displays the end. The -f flag with `tail` follows the file as it grows, which is great for logs.',
    example: 'tail -n 100 /var/log/apache2/access.log\ntail -f app.log',
    category: 'Text Processing',
  },
  {
    name: 'wc',
    description: 'Word count. Counts lines (-l), words (-w), and characters (-c) in a file.',
    example: 'wc -l my_document.txt',
    category: 'Text Processing',
  },
  {
    name: 'sort',
    description: 'Sorts lines of text files. Use -n for numeric sort and -r for reverse order.',
    example: 'sort -n numbers.txt',
    category: 'Text Processing',
  },
  {
    name: 'uniq',
    description: 'Filters adjacent matching lines from input. Use -c to count occurrences. Often used with `sort`.',
    example: 'sort access.log | uniq -c',
    category: 'Text Processing',
  },

  // --- System & Process Management ---
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

  // --- Permissions ---
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

  // --- Networking ---
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

  // --- Shell Scripting Basics ---
  {
    name: 'Variables',
    description: 'Define and use variables. By convention, use uppercase for environment variables.',
    example: 'GREETING="Hello"\necho "$GREETING, World!"',
    category: 'Shell Scripting Basics',
  },
  {
    name: 'Arrays',
    description: 'Define and access elements in an array.',
    example: 'fruits=("Apple" "Banana" "Cherry")\necho ${fruits[0]}    # Access first element\necho ${fruits[@]}   # Access all elements',
    category: 'Shell Scripting Basics',
  },
  {
    name: 'Command Substitution',
    description: 'Use the output of a command as part of another command. The `$()` syntax is recommended.',
    example: 'CURRENT_DATE=$(date +"%Y-%m-%d")\necho "Today is $CURRENT_DATE"',
    category: 'Shell Scripting Basics',
  },
  {
    name: 'Piping (|)',
    description: 'The pipe operator takes the standard output of one command and uses it as the standard input for another.',
    example: 'ls -l | grep ".txt"',
    category: 'Shell Scripting Basics',
  },
  {
    name: 'Redirection (>, >>, <)',
    description: '`>` redirects stdout to a file (overwrite). `>>` appends stdout. `<` redirects a file to stdin.',
    example: 'echo "Log entry" >> app.log\nwc -l < file.txt',
    category: 'Shell Scripting Basics',
  },
  {
    name: 'if...fi',
    description: 'Conditional statements in shell scripting. Use square brackets `[]` or double brackets `[[]]` for tests.',
    example: 'if [ -f "file.txt" ]; then\n  echo "File exists."\nfi',
    category: 'Shell Scripting Basics',
  },
  {
    name: 'for...done',
    description: 'Loops over a list of items.',
    example: 'for i in {1..5}; do\n  echo "Number $i"\ndone',
    category: 'Shell Scripting Basics',
  },
  {
    name: 'Functions',
    description: 'Define reusable blocks of code within a script.',
    example: 'my_function() {\n  echo "Hello from a function!"\n}\n\nmy_function',
    category: 'Shell Scripting Basics',
  },
  {
    name: 'read',
    description: 'Reads a single line from standard input into a variable.',
    example: 'echo -n "Enter your name: "\nread NAME\necho "Hello, $NAME"',
    category: 'Shell Scripting Basics',
  },

  // --- Archive & Compression ---
  {
    name: 'tar',
    description: 'An archiving utility. -c to create, -x to extract, -f specifies the file, -z for gzip, -j for bzip2, -v for verbose.',
    example: '# Create a gzipped archive\ntar -czvf archive.tar.gz /path/to/dir\n\n# Extract a gzipped archive\ntar -xzvf archive.tar.gz',
    category: 'Archive & Compression',
  },
  {
    name: 'zip / unzip',
    description: 'Utilities for creating and extracting .zip archives.',
    example: 'zip -r archive.zip my_directory/\nunzip archive.zip',
    category: 'Archive & Compression',
  },
  {
    name: 'gzip / gunzip',
    description: 'Compresses or decompresses files (replaces original file with a .gz version).',
    example: 'gzip my_file.txt\ngunzip my_file.txt.gz',
    category: 'Archive & Compression',
  },
  
  // --- Shortcuts & History ---
  {
    name: 'Ctrl + C',
    description: 'Interrupt (kill) the current foreground process.',
    example: 'Press Ctrl+C to stop a running command.',
    category: 'Shortcuts & History',
  },
  {
    name: 'Ctrl + R',
    description: 'Searches backward through your command history.',
    example: 'Press Ctrl+R and start typing part of a previous command.',
    category: 'Shortcuts & History',
  },
  {
    name: 'Ctrl + L',
    description: 'Clears the terminal screen.',
    example: 'Press Ctrl+L to clear the screen.',
    category: 'Shortcuts & History',
  },
  {
    name: 'Ctrl + A / Ctrl + E',
    description: 'Move the cursor to the beginning (`Ctrl+A`) or end (`Ctrl+E`) of the current line.',
    example: 'Use Ctrl+A to quickly add `sudo` to the beginning of a command.',
    category: 'Shortcuts & History',
  },
  {
    name: 'history',
    description: 'Displays the command history list.',
    example: 'history',
    category: 'Shortcuts & History',
  },
  {
    name: '!!',
    description: 'Executes the last command.',
    example: 'sudo !!',
    category: 'Shortcuts & History',
  },
];
