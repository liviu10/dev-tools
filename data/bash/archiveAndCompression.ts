import type { BashCheatSheetItem } from './types';

export const archiveAndCompressionCommands: BashCheatSheetItem[] = [
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
];
