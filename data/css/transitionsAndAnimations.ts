import type { CssCheatSheetItem } from './types';

export const transitionsAndAnimationsCommands: CssCheatSheetItem[] = [
  {
    name: 'transition',
    description: 'A shorthand property to set transition effects for properties. Allows properties to change values smoothly over a given duration.',
    example: `button {\n  transition: background-color 0.3s ease-in-out;\n}`,
    category: 'Transitions & Animations',
  },
  {
    name: 'transform',
    description: 'Lets you rotate, scale, skew, or translate an element.',
    example: `.element:hover {\n  transform: scale(1.1) rotate(5deg);\n}`,
    category: 'Transitions & Animations',
  },
  {
    name: 'animation',
    description: 'A shorthand property for setting all the animation properties.',
    example: `.spinner {\n  animation: spin 1s linear infinite;\n}`,
    category: 'Transitions & Animations',
  },
  {
    name: '@keyframes',
    description: 'Specifies the animation code. The animation is created by gradually changing from one set of CSS styles to another.',
    example: `@keyframes spin {\n  from { transform: rotate(0deg); }\n  to { transform: rotate(360deg); }\n}`,
    category: 'Transitions & Animations',
  },
];
