import type { CssCheatSheetItem } from './types';

export const miscellaneousCommands: CssCheatSheetItem[] = [
  {
    name: 'cursor',
    description: 'Specifies the mouse cursor to be displayed when pointing over an element.',
    example: `button {\n  cursor: pointer;\n}`,
    category: 'Miscellaneous',
  },
  {
    name: 'box-shadow',
    description: 'Adds shadow effects around an element\\\'s frame. You can specify multiple effects separated by commas.',
    example: `.card {\n  box-shadow: 0 4px 8px rgba(0,0,0,0.1);\n}`,
    category: 'Miscellaneous',
  },
  {
    name: 'border-radius',
    description: 'Rounds the corners of an element\\\'s outer border edge.',
    example: `img {\n  border-radius: 50%; /* Makes it a circle */\n}`,
    category: 'Miscellaneous',
  },
];
