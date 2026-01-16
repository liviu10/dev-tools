import type { CssCheatSheetItem } from './types';

export const flexboxCommands: CssCheatSheetItem[] = [
  {
    name: 'display: flex',
    description: 'Turns an element into a flex container, enabling a flex context for all its direct children.',
    example: `.container {\n  display: flex;\n}`,
    category: 'Flexbox',
  },
  {
    name: 'flex-direction',
    description: '(Container) Establishes the main-axis, thus defining the direction flex items are placed in. Values: row, row-reverse, column, column-reverse.',
    example: `.container {\n  flex-direction: column;\n}`,
    category: 'Flexbox',
  },
  {
    name: 'justify-content',
    description: '(Container) Defines the alignment of items along the main axis. Values include flex-start, center, flex-end, space-between, space-around.',
    example: `.container {\n  justify-content: space-between;\n}`,
    category: 'Flexbox',
  },
  {
    name: 'align-items',
    description: '(Container) Defines the default behavior for how flex items are laid out along the cross axis.',
    example: `.container {\n  align-items: center;\n}`,
    category: 'Flexbox',
  },
  {
    name: 'flex-grow',
    description: '(Item) Defines the ability for a flex item to grow if necessary. It accepts a unitless value that serves as a proportion.',
    example: `.item {\n  flex-grow: 1;\n}`,
    category: 'Flexbox',
  },
  {
    name: 'flex-basis',
    description: '(Item) Defines the default size of an element before the remaining space is distributed.',
    example: `.item {\n  flex-basis: 200px;\n}`,
    category: 'Flexbox',
  },
];
