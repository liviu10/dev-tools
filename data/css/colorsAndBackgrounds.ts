import type { CssCheatSheetItem } from './types';

export const colorsAndBackgroundsCommands: CssCheatSheetItem[] = [
  {
    name: 'background-color',
    description: 'Sets the background color of an element.',
    example: `body {\n  background-color: #f4f4f4;\n}`,
    category: 'Colors & Backgrounds',
  },
  {
    name: 'background-image',
    description: 'Sets one or more background images for an element.',
    example: `.hero {\n  background-image: url('hero.jpg');\n}`,
    category: 'Colors & Backgrounds',
  },
  {
    name: 'background-size',
    description: 'Specifies the size of the background images. Common values are `cover` and `contain`.',
    example: `div {\n  background-size: cover;\n}`,
    category: 'Colors & Backgrounds',
  },
  {
    name: 'opacity',
    description: 'Sets the opacity level for an element. The value is a number between 0.0 (fully transparent) and 1.0 (fully opaque).',
    example: `.overlay {\n  opacity: 0.5;\n}`,
    category: 'Colors & Backgrounds',
  },
];
