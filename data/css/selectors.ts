import type { CssCheatSheetItem } from './types';

export const selectorCommands: CssCheatSheetItem[] = [
  {
    name: '.class',
    description: 'Selects all elements with the specified class name.',
    example: `.my-class {\n  color: blue;\n}`,
    category: 'Selectors',
  },
  {
    name: '#id',
    description: 'Selects a single element with the specified ID. Each ID must be unique per page.',
    example: `#main-content {\n  border: 1px solid #ccc;\n}`,
    category: 'Selectors',
  },
  {
    name: '*',
    description: 'The universal selector. Selects all elements on the page.',
    example: `* {\n  box-sizing: border-box;\n}`,
    category: 'Selectors',
  },
  {
    name: 'element',
    description: 'Selects all elements with the given tag name (e.g., p, div, h1).',
    example: `p {\n  line-height: 1.6;\n}`,
    category: 'Selectors',
  },
  {
    name: 'element, element',
    description: 'The grouping selector. Selects all matching elements and applies the same styles.',
    example: `h1, h2, h3 {\n  font-family: 'Georgia', serif;\n}`,
    category: 'Selectors',
  },
  {
    name: 'element element',
    description: 'The descendant selector. Selects all elements that are descendants of a specified element.',
    example: `article p {\n  color: #333;\n}`,
    category: 'Selectors',
  },
  {
    name: 'element > element',
    description: 'The child selector. Selects all elements that are the direct children of a specified element.',
    example: `ul > li {\n  list-style-type: none;\n}`,
    category: 'Selectors',
  },
  {
    name: ':hover',
    description: 'A pseudo-class that selects elements when the user mouses over them.',
    example: `button:hover {\n  background-color: #555;\n}`,
    category: 'Selectors',
  },
  {
    name: '::before / ::after',
    description: 'Pseudo-elements that create a new element before or after the content of the selected element. Requires a `content` property.',
    example: `.item::before {\n  content: '• ';\n  color: red;\n}`,
    category: 'Selectors',
  },
];
