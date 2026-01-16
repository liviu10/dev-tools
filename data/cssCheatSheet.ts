import type { CssCheatSheetItem } from './css/types';
import { selectorCommands } from './css/selectors';
import { boxModelCommands } from './css/boxModel';
import { typographyCommands } from './css/typography';
import { colorsAndBackgroundsCommands } from './css/colorsAndBackgrounds';
import { layoutCommands } from './css/layout';
import { flexboxCommands } from './css/flexbox';
import { gridCommands } from './css/grid';
import { transitionsAndAnimationsCommands } from './css/transitionsAndAnimations';
import { miscellaneousCommands } from './css/miscellaneous';

// Re-export type for convenience
export type { CssCheatSheetItem };

export const cssData: CssCheatSheetItem[] = [
  ...selectorCommands,
  ...boxModelCommands,
  ...typographyCommands,
  ...colorsAndBackgroundsCommands,
  ...layoutCommands,
  ...flexboxCommands,
  ...gridCommands,
  ...transitionsAndAnimationsCommands,
  ...miscellaneousCommands,
];
