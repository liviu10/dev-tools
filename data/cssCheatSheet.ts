export interface CssCheatSheetItem {
  name: string;
  description: string;
  example: string;
  category: 'Selectors' | 'Box Model' | 'Typography' | 'Colors & Backgrounds' | 'Layout' | 'Flexbox' | 'Grid' | 'Transitions & Animations' | 'Miscellaneous';
}

export const cssData: CssCheatSheetItem[] = [
  // --- Selectors ---
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

  // --- Box Model ---
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
    description: 'Defines how the width and height of an element are calculated. `border-box` includes padding and border in the element\'s total width and height.',
    example: `* {\n  box-sizing: border-box;\n}`,
    category: 'Box Model',
  },

  // --- Typography ---
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

  // --- Colors & Backgrounds ---
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
  
  // --- Layout ---
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
    description: 'Specifies what should happen if content overflows an element\'s box. Values: visible, hidden, scroll, auto.',
    example: `.code-block {\n  overflow-x: auto;\n}`,
    category: 'Layout',
  },
  
  // --- Flexbox ---
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

  // --- Grid ---
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
    description: '(Item) A shorthand for `grid-column-start` and `grid-column-end`, specifying a grid item\'s size and location within the grid columns.',
    example: `.item-a {\n  grid-column: 1 / 3;\n}`,
    category: 'Grid',
  },
  {
    name: 'grid-row',
    description: '(Item) A shorthand for `grid-row-start` and `grid-row-end`, specifying a grid item\'s size and location within the grid rows.',
    example: `.item-b {\n  grid-row: span 2;\n}`,
    category: 'Grid',
  },
  
  // --- Transitions & Animations ---
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
  
  // --- Miscellaneous ---
  {
    name: 'cursor',
    description: 'Specifies the mouse cursor to be displayed when pointing over an element.',
    example: `button {\n  cursor: pointer;\n}`,
    category: 'Miscellaneous',
  },
  {
    name: 'box-shadow',
    description: 'Adds shadow effects around an element\'s frame. You can specify multiple effects separated by commas.',
    example: `.card {\n  box-shadow: 0 4px 8px rgba(0,0,0,0.1);\n}`,
    category: 'Miscellaneous',
  },
  {
    name: 'border-radius',
    description: 'Rounds the corners of an element\'s outer border edge.',
    example: `img {\n  border-radius: 50%; /* Makes it a circle */\n}`,
    category: 'Miscellaneous',
  },
];