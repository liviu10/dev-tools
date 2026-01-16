import type { CssCheatSheetItem } from './types';

export const gridCommands: CssCheatSheetItem[] = [
  {
    name: 'display: grid',
    description: 'Turns an element into a grid container, enabling a grid context for all its direct children.',
    example: `.container {\n  display: grid;\n}`,
    category: 'Grid',
  },
  {
    name: 'grid-template-columns',
    description: '(Container) Defines the columns of the grid. Can use any length unit, including the `fr` unit for fractions of free space.',
    example: `.container {\n  grid-template-columns: 1fr 1fr 2fr;\n}`,
    category: 'Grid',
  },
  {
    name: 'grid-template-rows',
    description: '(Container) Defines the rows of the grid.',
    example: `.container {\n  grid-template-rows: auto 1fr auto;\n}`,
    category: 'Grid',
  },
  {
    name: 'gap',
    description: '(Container) A shorthand for `row-gap` and `column-gap`, specifying the size of the grid lines (the space between items).',
    example: `.container {\n  gap: 1rem;\n}`,
    category: 'Grid',
  },
  {
    name: 'grid-column',
    description: '(Item) A shorthand for `grid-column-start` and `grid-column-end`, specifying a grid item\\\'s size and location within the grid columns.',
    example: `.item-a {\n  grid-column: 1 / 3;\n}`,
    category: 'Grid',
  },
  {
    name: 'grid-row',
    description: '(Item) A shorthand for `grid-row-start` and `grid-row-end`, specifying a grid item\\\'s size and location within the grid rows.',
    example: `.item-b {\n  grid-row: span 2;\n}`,
    category: 'Grid',
  },
];
