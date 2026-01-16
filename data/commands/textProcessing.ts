import type { CommandInfo } from './types';

export const textProcessingCommands: { [key: string]: CommandInfo } = {
    grep: {
        description: 'Searches for PATTERNS in each FILE.',
        options: {
        '-i': { description: 'Ignore case distinctions in patterns and input data.', long: '--ignore-case' },
        '-v': { description: 'Invert the sense of matching, to select non-matching lines.', long: '--invert-match' },
        '-n': { description: 'Prefix each line of output with the 1-based line number within its input file.', long: '--line-number' },
        '-r': { description: 'Read all files under each directory, recursively.', long: '--recursive' },
        '-E': { description: 'Interpret PATTERNS as extended regular expressions (ERE).', long: '--extended-regexp' },
        '-A': { description: 'Print NUM lines of trailing context after matching lines.', long: '--after-context=' },
        '-B': { description: 'Print NUM lines of leading context before matching lines.', long: '--before-context=' },
        '-C': { description: 'Print NUM lines of output context.', long: '--context=' },
        },
        handleArguments: (args) => {
            if (args.length === 0) {
                return [];
            }
            const explanations: {part: string, explanation: string}[] = [];
            
            explanations.push({
                part: args[0],
                explanation: 'The PATTERN to search for. This can be a simple string or a regular expression.'
            });

            if (args.length > 1) {
                args.slice(1).forEach(arg => {
                    explanations.push({
                        part: arg,
                        explanation: `A FILE to search in.`
                    });
                });
            } else {
                explanations.push({
                    part: '(stdin)', // Use a placeholder part
                    explanation: 'No file specified. `grep` will read from standard input, which is often the output of another command piped to it.'
                });
            }
            return explanations;
        }
    },
    cat: {
        description: 'Concatenate files and print on the standard output.',
        options: {
            '-n': { description: 'Number all output lines.' },
        },
        handleArguments: (args) => args.map(arg => ({
            part: arg,
            explanation: 'The file to display.'
        }))
    },
    echo: {
        description: 'Displays a line of text.',
        options: {
            '-n': { description: 'Do not output the trailing newline.' },
            '-e': { description: 'Enable interpretation of backslash escapes (e.g., `\\n` for newline).' }
        },
        handleArguments: (args) => args.map(arg => ({
            part: arg,
            explanation: 'The text to be displayed. Quoted strings are treated as a single argument.'
        }))
    },
    head: {
        description: 'Output the first part of files.',
        options: {
            '-n': { description: 'Print the first K lines instead of the first 10.' }
        },
        handleArguments: (args) => args.map(arg => ({
            part: arg,
            explanation: `A number of lines (with -n) or a file name.`
        }))
    },
    tail: {
        description: 'Output the last part of files.',
        options: {
            '-n': { description: 'Output the last K lines instead of the last 10.' },
            '-f': { description: 'Output appended data as the file grows; useful for logs.' }
        },
        handleArguments: (args) => args.map(arg => ({
            part: arg,
            explanation: `A number of lines (with -n) or a file name.`
        }))
    },
    wc: {
        description: 'Print newline, word, and byte counts for each file.',
        options: {
            '-l': { description: 'Print the newline counts.' },
            '-w': { description: 'Print the word counts.' },
            '-c': { description: 'Print the byte counts.' }
        },
        handleArguments: (args) => args.map(arg => ({
            part: arg,
            explanation: 'The file to count.'
        }))
    },
    awk: {
        description: 'A powerful pattern scanning and processing language.',
        options: {
        '-F': { description: 'Define the field separator.'}
        },
        handleArguments: (args) => {
        const explanations = [];
        if (args[0]) {
            explanations.push({ part: args[0], explanation: `The AWK program to execute, often a script in single quotes (e.g., '{ print $1 }').` });
        }
        if (args[1]) {
            explanations.push({ part: args[1], explanation: 'The input file to process.' });
        }
        return explanations;
        }
    },
    sed: {
        description: 'A stream editor for filtering and transforming text.',
        options: {
        '-i': { description: 'Edit files in-place.'}
        },
        handleArguments: (args) => {
        const explanations = [];
        if (args[0]) {
            explanations.push({ part: args[0], explanation: `The sed script to execute, often a substitution command (e.g., 's/foo/bar/g').` });
        }
        if (args[1]) {
            explanations.push({ part: args[1], explanation: 'The input file to process.' });
        }
        return explanations;
        }
    },
    sort: {
        description: 'Sort lines of text files.',
        options: {
            '-r': { description: 'Reverse the result of comparisons.', long: '--reverse' },
            '-n': { description: 'Compare according to string numerical value.', long: '--numeric-sort' },
            '-k': { description: 'Sort via a key; defines a specific field to sort by.', long: '--key=' },
        }
    },
    uniq: {
        description: 'Report or omit repeated lines. Note: `uniq` requires sorted input to work correctly.',
        options: {
            '-c': { description: 'Prefix lines by the number of occurrences.', long: '--count' },
            '-d': { description: 'Only print duplicate lines, one for each group.', long: '--repeated' },
            '-u': { description: 'Only print unique lines.', long: '--unique' },
        }
    },
    cut: {
        description: 'Remove sections from each line of files.',
        customParsing: true,
        options: {
            '-d': { description: 'Use DELIM instead of TAB for field delimiter.', long: '--delimiter=' },
            '-f': { description: 'Select only these fields.', long: '--fields=' },
            '-c': { description: 'Select only these character positions.', long: '--characters=' },
        },
        handleArguments: (args) => {
            const explanations: { part: string; explanation: string }[] = [];
            let i = 0;
            while(i < args.length) {
                const arg = args[i];
                const nextArg = args[i+1];

                if (arg === '-d') {
                    explanations.push({ part: arg, explanation: 'Specifies the delimiter.'});
                    if (nextArg) {
                        explanations.push({ part: nextArg, explanation: `The delimiter character to use (e.g., ':').`});
                        i++;
                    }
                } else if (arg.startsWith('-d')) { // Handle combined -d':'
                    explanations.push({ part: arg, explanation: `Specifies the delimiter as '${arg.substring(2)}'.`});
                } else if (arg === '-f') {
                    explanations.push({ part: arg, explanation: 'Specifies the fields to select.'});
                     if (nextArg) {
                        explanations.push({ part: nextArg, explanation: `The field number(s) to extract (e.g., '1' or '1,3').`});
                        i++;
                    }
                } else if (arg.startsWith('-f')) { // Handle combined -f1
                    explanations.push({ part: arg, explanation: `Specifies field number(s) '${arg.substring(2)}' to extract.`});
                } else {
                     explanations.push({ part: arg, explanation: 'The input file to process. Reads from standard input if omitted.'});
                }
                i++;
            }
            return explanations;
        }
    },
    tr: {
        description: 'Translate or delete characters from standard input, writing to standard output.',
        options: {
            '-d': { description: 'Delete characters in SET1, do not translate.', long: '--delete' },
        },
        handleArguments: (args) => {
            if (args.length === 2) {
                return [
                    { part: args[0], explanation: 'SET1: The set of characters to translate from.' },
                    { part: args[1], explanation: 'SET2: The set of characters to translate to.' },
                ];
            }
            return args.map(arg => ({ part: arg, explanation: 'A set of characters for translation or deletion.'}))
        }
    },
    less: {
        description: 'An interactive file pager for viewing text files one screen at a time.',
        options: {},
        handleArguments: (args) => args.map(arg => ({
            part: arg,
            explanation: 'The file to view.'
        }))
    },
    diff: {
        description: 'Compare files line by line.',
        options: {
            '-i': { description: 'Ignore case differences in file contents.', long: '--ignore-case' },
            '-u': { description: 'Output unified context (a common format for patches).', long: '--unified' }
        },
        handleArguments: (args) => {
            if (args.length === 2) {
                return [
                    { part: args[0], explanation: 'The first file to compare.' },
                    { part: args[1], explanation: 'The second file to compare.' },
                ];
            }
            return args.map(arg => ({ part: arg, explanation: 'A file to compare.'}));
        }
    },
    xargs: {
        description: 'Build and execute command lines from standard input.',
        options: {
            '-I': { description: 'Replace occurrences of a specified string in the initial-arguments with names read from standard input.' },
            '-n': { description: 'Execute the utility for at most max-args arguments per iteration.' }
        },
        handleArguments: (args) => args.map(arg => ({
            part: arg,
            explanation: 'The command to execute, followed by its initial arguments.'
        }))
    },
    tee: {
        description: 'Read from standard input and write to standard output and files.',
        options: {
            '-a': { description: 'Append to the given FILEs, do not overwrite.', long: '--append' }
        },
        handleArguments: (args) => args.map(arg => ({
            part: arg,
            explanation: 'The file to write to, in addition to standard output.'
        }))
    },
    join: {
        description: 'Join lines of two files on a common field.',
        options: {},
        handleArguments: (args) => {
            if (args.length === 2) {
                return [
                    { part: args[0], explanation: 'The first file to join.' },
                    { part: args[1], explanation: 'The second file to join.' },
                ];
            }
            return args.map(arg => ({ part: arg, explanation: 'A file to join.' }));
        }
    },
    paste: {
        description: 'Merge lines of files.',
        options: {
            '-d': { description: 'Use characters from DELIMS instead of TABs to separate merged lines.', long: '--delimiters=' },
        },
        handleArguments: (args) => args.map(arg => ({
            part: arg,
            explanation: 'A file to merge. Reads from standard input if no files are given.'
        }))
    },
};
