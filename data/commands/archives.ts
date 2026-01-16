import type { CommandInfo } from './types';

export const archiveCommands: { [key: string]: CommandInfo } = {
    tar: {
        description: 'An archiving utility used to create and extract .tar archives.',
        customParsing: true,
        options: {
            '-c': { description: 'Create a new archive.' },
            '-x': { description: 'Extract files from an archive.' },
            '-v': { description: 'Verbosely list files processed.' },
            '-f': { description: 'Use archive file or device ARCHIVE. This option is usually required.' },
            '-z': { description: 'Filter the archive through gzip (for .tar.gz or .tgz files).' },
            '-j': { description: 'Filter the archive through bzip2 (for .tar.bz2 files).' },
            '-J': { description: 'Filter the archive through xz (for .tar.xz files).' },
            // Common combinations
            '-cvf': { description: 'Combined: Create a Verbose archive File.' },
            '-czvf': { description: 'Combined: Create a gZipped Verbose archive File.' },
            '-xjvf': { description: 'Combined: eXtract a bzipped Verbose archive File.' },
            '-xJvf': { description: 'Combined: eXtract an xz-compressed Verbose archive File.' },
            '-xvf': { description: 'Combined: eXtract a Verbose archive File.' },
            '-xzvf': { description: 'Combined: eXtract a gZipped Verbose archive File.' },
        },
        handleArguments: (args) => {
            const explanations: { part: string; explanation: string }[] = [];
            if (args.length === 0) return explanations;

            let fileFlagIndex = -1;
            let optionsArg: string | undefined;

            // Find the options argument (e.g., -czvf)
            for(let i = 0; i < args.length; i++) {
                if(args[i].startsWith('-')) {
                    optionsArg = args[i];
                    const flags = optionsArg.replace('-', '');
                    if (flags.includes('f')) {
                        fileFlagIndex = i;
                    }
                    explanations.push({ part: optionsArg, explanation: archiveCommands.tar.options[optionsArg]?.description || `Specifies operation flags: ${flags}` });
                    break;
                }
            }

            if (fileFlagIndex !== -1) {
                // The argument after the options is the archive file
                const archiveFileIndex = fileFlagIndex + 1;
                if (args[archiveFileIndex]) {
                    explanations.push({ part: args[archiveFileIndex], explanation: 'The archive file to create or extract from.' });
                }
                
                // The rest are files/dirs to process
                args.slice(archiveFileIndex + 1).forEach(arg => {
                    explanations.push({ part: arg, explanation: 'A file or directory to add to the archive (on creation) or extract from the archive (on extraction).' });
                });
            } else {
                 // No -f flag, treat all non-option args as generic
                 args.filter(arg => !arg.startsWith('-')).forEach(arg => {
                     explanations.push({ part: arg, explanation: 'File or directory to be processed.' });
                 });
            }

            return explanations;
        }
    },
    zip: {
        description: 'Package and compress (archive) files.',
        options: {
            '-r': { description: 'Recursively travel the directory structure.' }
        },
        handleArguments: (args) => {
            if (args.length >= 2) {
                return [
                    {part: args[0], explanation: 'The name of the zip archive to be created.'},
                    ...args.slice(1).map(arg => ({part: arg, explanation: 'The file or directory to be added to the archive.'}))
                ];
            }
            return args.map(arg => ({part: arg, explanation: 'An archive name or file to be zipped.'}))
        }
    },
    unzip: {
        description: 'List, test, and extract compressed files in a ZIP archive.',
        options: {
            '-l': { description: 'List archive files (short format).'}
        },
        handleArguments: (args) => args.map(arg => ({
            part: arg,
            explanation: 'The name of the zip archive to extract.'
        }))
    },
    gzip: {
        description: 'Compress files using Lempel-Ziv (LZ77) coding. Replaces original file with a `.gz` compressed version.',
        options: {
            '-d': { description: 'Decompress.', long: '--decompress' },
            '-k': { description: 'Keep (don\'t delete) input files.', long: '--keep' },
        },
        handleArguments: (args) => args.map(arg => ({
            part: arg,
            explanation: 'The file to compress.'
        }))
    },
    gunzip: {
        description: 'Decompresses files compressed by gzip. Equivalent to `gzip -d`.',
        options: {},
        handleArguments: (args) => args.map(arg => ({
            part: arg,
            explanation: 'The .gz file to decompress.'
        }))
    },
     bzip2: {
        description: 'A high-quality data compressor. Replaces original file with a `.bz2` compressed version.',
        options: {
            '-d': { description: 'Decompress.', long: '--decompress' },
            '-k': { description: 'Keep (don\'t delete) input files.', long: '--keep' },
        },
        handleArguments: (args) => args.map(arg => ({
            part: arg,
            explanation: 'The file to compress.'
        }))
    },
    bunzip2: {
        description: 'Decompresses files compressed by bzip2. Equivalent to `bzip2 -d`.',
        options: {},
        handleArguments: (args) => args.map(arg => ({
            part: arg,
            explanation: 'The .bz2 file to decompress.'
        }))
    },
    xz: {
        description: 'A general-purpose data compression tool with a high compression ratio. Replaces original file with a `.xz` compressed version.',
        options: {
            '-d': { description: 'Decompress.', long: '--decompress' },
            '-k': { description: 'Keep (don\'t delete) input files.', long: '--keep' },
        },
        handleArguments: (args) => args.map(arg => ({
            part: arg,
            explanation: 'The file to compress.'
        }))
    },
};
