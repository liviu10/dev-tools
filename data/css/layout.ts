import type { CssCheatSheetItem } from './types';

export const layoutCommands: CssCheatSheetItem[] = [
  {
    name: 'display',
    description: 'Specifies the display behavior of an element. Key values: block, inline, inline-block, flex, grid, none.',
    example: `nav ul {\n  display: flex;\n}`,
    category: 'Layout',
  },
  {
    name: 'position',
    description: 'Specifies the type of positioning method used for an element. Values: static, relative, absolute, fixed, sticky.',
    example: `.modal {\n  position: fixed;\n  top: 0;\n  left: 0;\n}`,
    category: 'Layout',
  },
  {
    name: 'z-index',
    description: 'Specifies the stack order of a positioned element. An element with greater stack order is always in front of an element with a lower stack order.',
    example: `.tooltip {\n  z-index: 100;\n}`,
    category: 'Layout',
  },
  {
    name: 'overflow',
    description: 'Specifies what should happen if content overflows an element\\\'s box. Values: visible, hidden, scroll, auto.',
    example: `.code-block {\n  overflow-x: auto;\n}`,
    category: 'Layout',
  },
];
