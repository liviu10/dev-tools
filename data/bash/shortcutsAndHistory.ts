import type { BashCheatSheetItem } from './types';

export const shortcutsAndHistoryCommands: BashCheatSheetItem[] = [
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
