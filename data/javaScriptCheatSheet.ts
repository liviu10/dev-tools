export interface JavaScriptCheatSheetItem {
  name: string;
  description: string;
  example: string;
  category: 'Variables & Data Types' | 'Operators' | 'Control Flow' | 'Functions' | 'Arrays' | 'Objects' | 'ES6+ Features' | 'Asynchronous JS' | 'DOM Manipulation';
}

export const jsData: JavaScriptCheatSheetItem[] = [
  // --- Variables & Data Types ---
  {
    name: 'var, let, const',
    description: '`var` is function-scoped (avoid). `let` is block-scoped and can be reassigned. `const` is block-scoped and cannot be reassigned (but mutable for objects/arrays).',
    example: `let name = 'Alice'; // Can be changed\nconst age = 30; // Cannot be reassigned`,
    category: 'Variables & Data Types',
  },
  {
    name: 'Data Types',
    description: 'Primitive types: String, Number, Boolean, Null, Undefined, Symbol, BigInt. Structural type: Object (which includes arrays, functions, etc.).',
    example: `const str = "hello";\nconst num = 123.45;\nconst bool = true;\nconst person = { name: "Bob" };`,
    category: 'Variables & Data Types',
  },
  {
    name: 'typeof',
    description: 'An operator that returns a string indicating the type of the unevaluated operand.',
    example: `typeof "hello"; // "string"\ntypeof 123;     // "number"\ntypeof false;  // "boolean"\ntypeof {};     // "object"`,
    category: 'Variables & Data Types',
  },
  
  // --- Operators ---
  {
    name: 'Strict Equality (===)',
    description: 'Compares two values for equality, without performing type conversion. It is generally preferred over loose equality (`==`).',
    example: `5 === 5;    // true\n'5' === 5;  // false`,
    category: 'Operators',
  },
  {
    name: 'Logical Operators (&&, ||, !)',
    description: '`&&` (AND): true if both are true. `||` (OR): true if at least one is true. `!` (NOT): inverts boolean value.',
    example: `(age > 18) && (hasLicense); // Both must be true\nisLoggedIn || isGuest;      // One can be true`,
    category: 'Operators',
  },
  {
    name: 'Ternary Operator',
    description: 'A shortcut for an if-else statement. `condition ? exprIfTrue : exprIfFalse`.',
    example: `const message = (isLoggedIn) ? 'Welcome back!' : 'Please log in.';`,
    category: 'Operators',
  },
  
  // --- Control Flow ---
  {
    name: 'if...else',
    description: 'Executes a block of code if a specified condition is true. If the condition is false, another block of code can be executed.',
    example: `if (score > 90) {\n  grade = 'A';\n} else if (score > 80) {\n  grade = 'B';\n} else {\n  grade = 'C';\n}`,
    category: 'Control Flow',
  },
  {
    name: 'for loop',
    description: 'Loops through a block of code a number of times. Often used to iterate over arrays.',
    example: `for (let i = 0; i < 5; i++) {\n  console.log(i);\n}`,
    category: 'Control Flow',
  },
  {
    name: 'for...of loop',
    description: 'Creates a loop iterating over iterable objects (like arrays, strings, maps, sets, etc.).',
    example: `const fruits = ['apple', 'banana', 'cherry'];\nfor (const fruit of fruits) {\n  console.log(fruit);\n}`,
    category: 'Control Flow',
  },

  // --- Functions ---
  {
    name: 'Function Declaration',
    description: 'A standard way to define a function with the `function` keyword. These are hoisted.',
    example: `function greet(name) {\n  return \`Hello, \${name}!\`;\n}`,
    category: 'Functions',
  },
  {
    name: 'Arrow Function',
    description: 'A more concise syntax for writing function expressions. They do not have their own `this` context.',
    example: `const add = (a, b) => a + b;\n\n// Multi-line\nconst subtract = (a, b) => {\n  return a - b;\n};`,
    category: 'Functions',
  },

  // --- Arrays ---
  {
    name: 'Array.map()',
    description: 'Creates a new array populated with the results of calling a provided function on every element in the calling array.',
    example: `const numbers = [1, 2, 3];\nconst doubled = numbers.map(num => num * 2);\n// doubled is [2, 4, 6]`,
    category: 'Arrays',
  },
  {
    name: 'Array.filter()',
    description: 'Creates a new array with all elements that pass the test implemented by the provided function.',
    example: `const numbers = [1, 2, 3, 4, 5];\nconst evens = numbers.filter(num => num % 2 === 0);\n// evens is [2, 4]`,
    category: 'Arrays',
  },
  {
    name: 'Array.reduce()',
    description: 'Executes a "reducer" function on each element of the array, resulting in a single output value.',
    example: `const numbers = [1, 2, 3, 4];\nconst sum = numbers.reduce((acc, current) => acc + current, 0);\n// sum is 10`,
    category: 'Arrays',
  },
  {
    name: 'Array.forEach()',
    description: 'Executes a provided function once for each array element. Does not return a new array.',
    example: `const fruits = ['apple', 'banana'];\nfruits.forEach(fruit => console.log(fruit));`,
    category: 'Arrays',
  },
  
  // --- Objects ---
  {
    name: 'Object Literal',
    description: 'A comma-separated list of key-value pairs wrapped in curly braces.',
    example: `const user = {\n  name: 'John Doe',\n  age: 30,\n  isAdmin: false\n};`,
    category: 'Objects',
  },
  {
    name: 'Accessing Properties',
    description: 'Properties can be accessed using dot notation (`.`) or bracket notation (`[]`). Bracket notation is required for keys with special characters or variables.',
    example: `console.log(user.name); // "John Doe"\nconsole.log(user['age']); // 30`,
    category: 'Objects',
  },
  {
    name: 'Object.keys(), Object.values()',
    description: '`Object.keys()` returns an array of a given object\'s own enumerable property names. `Object.values()` returns an array of the values.',
    example: `const keys = Object.keys(user); // ['name', 'age', 'isAdmin']\nconst values = Object.values(user); // ['John Doe', 30, false]`,
    category: 'Objects',
  },

  // --- ES6+ Features ---
  {
    name: 'Template Literals',
    description: 'String literals allowing embedded expressions. They are enclosed by backticks (`` ` ``) and can contain placeholders marked by `${expression}`.',
    example: "const message = `Hello, ${user.name}! You are ${user.age}.`;",
    category: 'ES6+ Features',
  },
  {
    name: 'Destructuring',
    description: 'A convenient way of extracting multiple values from data stored in arrays or objects.',
    example: `// Object destructuring\nconst { name, age } = user;\n\n// Array destructuring\nconst [first, second] = [10, 20];`,
    category: 'ES6+ Features',
  },
  {
    name: 'Spread (...) & Rest (...) Operators',
    description: 'Spread syntax expands an iterable into individual elements. Rest syntax collects multiple elements into a single array.',
    example: `// Spread\nconst arr1 = [1, 2];\nconst arr2 = [...arr1, 3, 4]; // [1, 2, 3, 4]\n\n// Rest\nfunction sum(...numbers) {\n  return numbers.reduce((acc, n) => acc + n, 0);\n}\nsum(1, 2, 3); // 6`,
    category: 'ES6+ Features',
  },
  {
    name: 'Class Syntax',
    description: 'A syntactical sugar over JavaScript\'s existing prototype-based inheritance. Provides a clearer, more familiar syntax for creating objects.',
    example: `class Person {\n  constructor(name) {\n    this.name = name;\n  }\n\n  greet() {\n    console.log(\`Hello, \${this.name}\`);\n  }\n}`,
    category: 'ES6+ Features',
  },
  
  // --- Asynchronous JS ---
  {
    name: 'Promises',
    description: 'An object representing the eventual completion (or failure) of an asynchronous operation and its resulting value.',
    example: `const myPromise = new Promise((resolve, reject) => {\n  setTimeout(() => {\n    resolve('Success!');\n  }, 1000);\n});\n\nmyPromise.then(result => console.log(result));`,
    category: 'Asynchronous JS',
  },
  {
    name: 'async/await',
    description: 'Syntactic sugar for working with Promises, making asynchronous code look and behave more like synchronous code.',
    example: `async function fetchData() {\n  try {\n    const response = await fetch('https://api.example.com/data');\n    const data = await response.json();\n    console.log(data);\n  } catch (error) {\n    console.error('Fetch failed:', error);\n  }\n}`,
    category: 'Asynchronous JS',
  },
  {
    name: 'fetch() API',
    description: 'A modern, Promise-based interface for making network requests in the browser.',
    example: `fetch('https://api.example.com/users')\n  .then(response => response.json())\n  .then(data => console.log(data));`,
    category: 'Asynchronous JS',
  },

  // --- DOM Manipulation ---
  {
    name: 'document.getElementById()',
    description: 'Returns an element object representing the element whose `id` property matches the specified string.',
    example: `const titleElement = document.getElementById('main-title');`,
    category: 'DOM Manipulation',
  },
  {
    name: 'document.querySelector()',
    description: 'Returns the first element within the document that matches the specified CSS selector.',
    example: `// Selects the first <p> tag with class "intro"\nconst intro = document.querySelector('p.intro');`,
    category: 'DOM Manipulation',
  },
  {
    name: 'element.addEventListener()',
    description: 'Sets up a function that will be called whenever the specified event is delivered to the target.',
    example: `const button = document.getElementById('myButton');\nbutton.addEventListener('click', () => {\n  alert('Button clicked!');\n});`,
    category: 'DOM Manipulation',
  },
  {
    name: 'element.innerHTML vs .textContent',
    description: '`.innerHTML` gets or sets the HTML content within an element. `.textContent` gets or sets the text content, ignoring HTML tags.',
    example: `const div = document.getElementById('myDiv');\ndiv.innerHTML = '<strong>Important!</strong>';\ndiv.textContent = 'Just text.';`,
    category: 'DOM Manipulation',
  },
];