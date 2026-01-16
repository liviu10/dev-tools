import type { CssCheatSheetItem } from './types';

export const typographyCommands: CssCheatSheetItem[] = [
  {
    name: 'font-family',
    description: 'Specifies the font for an element. Provide a comma-separated list of fallback fonts.',
    example: `body {\n  font-family: 'Helvetica Neue', Arial, sans-serif;\n}`,
    category: 'Typography',
  },
  {
    name: 'font-size',
    description: 'Sets the size of the font. Common units are px, em, rem, and %.',
    example: `p {\n  font-size: 16px; /* or 1rem */\n}`,
    category: 'Typography',
  },
  {
    name: 'font-weight',
    description: 'Sets how thick or thin characters in text should be displayed. Values can be keywords (normal, bold) or numbers (100-900).',
    example: `h1 {\n  font-weight: 700; /* bold */\n}`,
    category: 'Typography',
  },
  {
    name: 'color',
    description: 'Sets the color of the text.',
    example: `a {\n  color: #007BFF;\n}`,
    category: 'Typography',
  },
  {
    name: 'text-align',
    description: 'Specifies the horizontal alignment of text. Values: left, right, center, justify.',
    example: `.title {\n  text-align: center;\n}`,
    category: 'Typography',
  },
];
