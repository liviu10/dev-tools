import type { CssCheatSheetItem } from './types';

export const boxModelCommands: CssCheatSheetItem[] = [
  {
    name: 'width / height',
    description: 'Sets the width and height of an element. Can be in px, %, em, rem, vw, vh, etc.',
    example: `.box {\n  width: 100px;\n  height: 50%;\n}`,
    category: 'Box Model',
  },
  {
    name: 'padding',
    description: 'Sets the padding (space inside the border). Can be set for all sides (padding: 10px) or individually (padding-top, etc.).',
    example: `.container {\n  padding: 1rem;\n}`,
    category: 'Box Model',
  },
  {
    name: 'margin',
    description: 'Sets the margin (space outside the border). Can be set for all sides or individually. Auto can be used for horizontal centering.',
    example: `.element {\n  margin: 0 auto;\n}`,
    category: 'Box Model',
  },
  {
    name: 'border',
    description: 'A shorthand property for border-width, border-style, and border-color.',
    example: `div {\n  border: 1px solid black;\n}`,
    category: 'Box Model',
  },
  {
    name: 'box-sizing',
    description: 'Defines how the width and height of an element are calculated. `border-box` includes padding and border in the element\\\'s total width and height.',
    example: `* {\n  box-sizing: border-box;\n}`,
    category: 'Box Model',
  },
];
