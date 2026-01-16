import type { BashCheatSheetItem } from './types';

export const scriptingCommands: BashCheatSheetItem[] = [
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
];
