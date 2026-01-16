export interface CssCheatSheetItem {
  name: string;
  description: string;
  example: string;
  category: 'Selectors' | 'Box Model' | 'Typography' | 'Colors & Backgrounds' | 'Layout' | 'Flexbox' | 'Grid' | 'Transitions & Animations' | 'Miscellaneous';
}
