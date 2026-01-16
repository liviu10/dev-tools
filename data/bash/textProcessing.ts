import type { BashCheatSheetItem } from './types';

export const textProcessingCommands: BashCheatSheetItem[] = [
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
];
