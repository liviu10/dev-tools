export interface PythonCheatSheetItem {
  name: string;
  description: string;
  example: string;
  category: 'Syntax & Variables' | 'Data Types' | 'Operators' | 'Control Flow' | 'Functions' | 'Lists' | 'Dictionaries' | 'Classes (OOP)' | 'File I/O' | 'Modules & Packages' | 'Exception Handling' | 'Comprehensions';
  version?: string;
}

export const pythonData: PythonCheatSheetItem[] = [
  // Syntax & Variables
  {
    name: 'Variables',
    description: 'Variables are created when you assign a value to them. No explicit declaration is required. Python is dynamically typed.',
    example: `name = "Alice"  # String\nage = 30       # Integer\npi = 3.14      # Float\nis_student = True # Boolean`,
    category: 'Syntax & Variables',
  },
  {
    name: 'Variable Unpacking',
    description: 'Assign values from an iterable (like a list or tuple) to multiple variables in a single statement.',
    example: `x, y, z = (1, 2, 3) # x=1, y=2, z=3\n\n# Extended unpacking\na, *b, c = [1, 2, 3, 4, 5] # a=1, b=[2, 3, 4], c=5`,
    category: 'Syntax & Variables',
  },
  {
    name: 'print()',
    description: 'The `print()` function outputs variables or literals to the console. It can take multiple arguments.',
    example: `name = "Bob"\nprint("Hello, world!")\nprint("Hello,", name)  # Prints "Hello, Bob"`,
    category: 'Syntax & Variables',
  },
    {
    name: 'input()',
    description: 'Reads a line from input, converts it to a string, and returns it. The prompt string is optional.',
    example: `name = input("Enter your name: ")\nprint(f"Hello, {name}")`,
    category: 'Syntax & Variables',
  },
    {
    name: 'Type Casting',
    description: 'Convert between different data types explicitly using functions like `int()`, `float()`, `str()`, `list()`.',
    example: `num_str = "123"\nnum_int = int(num_str) # 123 (integer)\n\nnum_float = float("123.45") # 123.45 (float)`,
    category: 'Syntax & Variables',
  },
  {
    name: 'f-Strings (Formatted String Literals)',
    description: 'A modern and convenient way to embed expressions inside string literals for formatting.',
    example: `name = "Charlie"\nage = 25\nprint(f"My name is {name} and I am {age} years old.")`,
    category: 'Syntax & Variables',
    version: '3.6+',
  },
    {
    name: 'String .format() Method',
    description: 'An older, but still common, way to format strings using placeholders and the `.format()` method.',
    example: `name = "Diana"\nage = 28\nprint("My name is {} and I am {} years old.".format(name, age))\nprint("My name is {n} and I am {a} years old.".format(n=name, a=age))`,
    category: 'Syntax & Variables',
  },
  {
    name: 'Comments',
    description: 'Single-line comments start with a `#`. Multi-line comments can be created using triple quotes (`"""` or `\'\'\'`).',
    example: `# This is a single-line comment\n\n"""\nThis is a\nmulti-line comment (docstring).\n"""`,
    category: 'Syntax & Variables',
  },
  {
    name: 'Multiline Statements',
    description: 'Statements can extend over multiple lines using parentheses `()`, brackets `[]`, braces `{}`, or a backslash `\\`.',
    example: `# Implicit line continuation inside parentheses\ntotal = (1 + 2 +\n         3 + 4)\n\n# Explicit line continuation with backslash\nif 1 + 1 == 2 and \\\n   2 + 2 == 4:\n    print("Math works!")`,
    category: 'Syntax & Variables',
  },
  {
    name: 'Variable Scope (LEGB)',
    description: 'Python resolves names using the LEGB rule: Local, Enclosing function locals, Global, and Built-in.',
    example: `x = "global"\ndef outer():\n  x = "enclosing"\n  def inner():\n    x = "local"\n    print(x) # prints "local"\n  inner()`,
    category: 'Syntax & Variables',
  },

  // Data Types
  {
    name: 'Strings (str)',
    description: 'An immutable sequence of Unicode characters. Supports indexing, slicing, and various methods.',
    example: `my_string = "Hello"\nprint(my_string[1]) # 'e'\nprint(len(my_string)) # 5\nprint(my_string.upper()) # "HELLO"`,
    category: 'Data Types',
  },
  {
    name: 'Helpful String Methods',
    description: '`strip()` removes leading/trailing whitespace. `split()` creates a list from a string. `join()` creates a string from a list.',
    example: `my_str = "  some text  "\nmy_str.strip()  # "some text"\n\n"a,b,c".split(',')  # ['a', 'b', 'c']\n\n"-".join(['a', 'b', 'c'])  # "a-b-c"`,
    category: 'Data Types',
  },
  {
    name: 'Lists (list)',
    description: 'A mutable, ordered sequence of elements. Similar to arrays in other languages.',
    example: `fruits = ["apple", "banana", "cherry"]\nfruits.append("orange")\nprint(fruits[1])  # "banana"`,
    category: 'Data Types',
  },
  {
    name: 'Tuples (tuple)',
    description: 'An immutable, ordered sequence of elements. Once created, they cannot be changed.',
    example: `coordinates = (10.0, 20.0)\nprint(coordinates[0])  # 10.0`,
    category: 'Data Types',
  },
  {
    name: 'Dictionaries (dict)',
    description: 'A mutable collection of key-value pairs. Keys must be unique and immutable.',
    example: `person = {"name": "David", "age": 42}\nprint(person["name"])  # "David"\nperson["city"] = "New York"`,
    category: 'Data Types',
  },
  {
    name: 'Sets (set)',
    description: 'An unordered collection of unique items. Useful for membership testing and removing duplicates.',
    example: `numbers = {1, 2, 3, 3, 4}\nprint(numbers)  # {1, 2, 3, 4}`,
    category: 'Data Types',
  },
  {
    name: 'Frozenset',
    description: 'An immutable version of a set. Since it is immutable and hashable, it can be used as a key in a dictionary or as an element of another set.',
    example: `frozen = frozenset([1, 2, 3, 2])\nmy_dict = {frozen: "some_value"}`,
    category: 'Data Types',
  },
  {
    name: 'Bytes and Bytearray',
    description: '`bytes` are immutable sequences of single bytes (0-255). `bytearray` is a mutable version. They are used for handling binary data.',
    example: `my_bytes = b'hello' # 'b' prefix creates a bytes object\nprint(my_bytes[0])   # 104 (ASCII for 'h')\n\nmy_byte_array = bytearray(b'world')\nmy_byte_array[0] = 119 # Change 'w' to 'W'`,
    category: 'Data Types',
  },
  {
    name: 'collections.namedtuple',
    description: 'Factory function for creating tuple subclasses with named fields. Provides a more readable way to access tuple elements.',
    example: `from collections import namedtuple\nPoint = namedtuple('Point', ['x', 'y'])\np = Point(11, y=22)\nprint(p.x + p.y) # 33`,
    category: 'Data Types',
  },

  // Operators
  {
    name: 'Arithmetic Operators',
    description: '`+` (addition), `-` (subtraction), `*` (multiplication), `/` (float division), `//` (integer division), `%` (modulus), `**` (exponentiation).',
    example: `result = (10 + 5) * 2  # 30\nremainder = 10 % 3      # 1\npower = 2 ** 3          # 8`,
    category: 'Operators',
  },
  {
    name: 'Comparison Operators',
    description: '`==` (equal), `!=` (not equal), `>` (greater than), `<` (less than), `>=` (greater or equal), `<=` (less or equal).',
    example: `age = 18\nif age >= 18:\n  print("Adult")`,
    category: 'Operators',
  },
  {
    name: 'Logical Operators',
    description: '`and` (returns True if both are true), `or` (returns True if one is true), `not` (inverts the boolean value).',
    example: `if is_logged_in and is_admin:\n  # Do something`,
    category: 'Operators',
  },
  {
    name: 'Identity Operators',
    description: '`is` (returns True if both variables are the same object), `is not` (returns True if they are not the same object).',
    example: `x = [1, 2]\ny = x\nz = [1, 2]\n\nx is y # True\nx is z # False`,
    category: 'Operators',
  },
  {
    name: 'Membership Operators',
    description: '`in` (returns True if a sequence with the specified value is present in the object), `not in` (returns True if not present).',
    example: `fruits = ["apple", "banana"]\nif "apple" in fruits:\n  print("Yes, apple is a fruit!")`,
    category: 'Operators',
  },
  {
    name: 'Bitwise Operators',
    description: 'Operators that work on integers at the binary level: `&` (AND), `|` (OR), `^` (XOR), `~` (NOT), `<<` (left shift), `>>` (right shift).',
    example: `a = 60  # 0011 1100\nb = 13  # 0000 1101\n\na & b   # 12 (0000 1100)\na | b   # 61 (0011 1101)\na << 2  # 240 (1111 0000)`,
    category: 'Operators',
  },
  {
    name: 'Matrix Multiplication Operator (@)',
    description: 'Used for matrix multiplication. Primarily used by libraries like NumPy.',
    example: `import numpy as np\nA = np.array([[1, 2], [3, 4]])\nB = np.array([[5, 6], [7, 8]])\nC = A @ B`,
    category: 'Operators',
    version: '3.5+',
  },
  {
    name: 'Walrus Operator (:=)',
    description: 'The assignment expression operator. It assigns a value to a variable as part of a larger expression.',
    example: `# Reads lines from input until an empty line is entered\nwhile (line := input("Enter text: ")):\n    print(f"You entered: {line}")`,
    category: 'Operators',
    version: '3.8+',
  },

  // Control Flow
  {
    name: 'if...elif...else',
    description: 'Conditional statements used to execute code based on different conditions. Python uses indentation to define blocks.',
    example: `x = 10\nif x > 10:\n  print("Greater than 10")\nelif x < 10:\n  print("Less than 10")\nelse:\n  print("Equal to 10")`,
    category: 'Control Flow',
  },
  {
    name: 'for loop',
    description: 'Used for iterating over a sequence (like a list, tuple, dictionary, set, or string).',
    example: `fruits = ["apple", "banana", "cherry"]\nfor fruit in fruits:\n  print(fruit)`,
    category: 'Control Flow',
  },
    {
    name: 'range() function',
    description: 'Generates a sequence of numbers, often used for looping a specific number of times.',
    example: `for i in range(5): # 0, 1, 2, 3, 4\n  print(i)\n\nfor i in range(2, 6): # 2, 3, 4, 5\n  print(i)`,
    category: 'Control Flow',
  },
  {
    name: 'while loop',
    description: 'Executes a set of statements as long as a condition is true.',
    example: `i = 1\nwhile i < 6:\n  print(i)\n  i += 1`,
    category: 'Control Flow',
  },
  {
    name: 'break / continue',
    description: '`break` is used to exit a loop. `continue` is used to skip the current iteration and move to the next.',
    example: `for i in range(10):\n  if i == 3:\n    continue  # Skip 3\n  if i == 7:\n    break     # Stop loop\n  print(i)`,
    category: 'Control Flow',
  },
    {
    name: 'pass statement',
    description: 'The `pass` statement is a null operation; nothing happens when it executes. It can be used as a placeholder in a block where a statement is syntactically required, but no code needs to be executed.',
    example: `def my_empty_function():\n  pass # Avoids an error for an empty block`,
    category: 'Control Flow',
  },
  {
    name: 'for...else / while...else',
    description: 'The `else` clause of a loop executes when the loop completes normally (i.e., not terminated by a `break` statement).',
    example: `for i in range(5):\n    if i == 10: # This condition is never met\n        break\nelse:\n    print("Loop finished without a break") # This will be printed`,
    category: 'Control Flow',
  },
  {
    name: 'enumerate()',
    description: 'A built-in function that adds a counter to an iterable. It returns an enumerate object, which can be used directly in `for` loops.',
    example: `fruits = ['apple', 'banana', 'cherry']\nfor index, fruit in enumerate(fruits):\n    print(index, fruit)`,
    category: 'Control Flow',
  },
  {
    name: 'zip()',
    description: 'A built-in function that creates an iterator that aggregates elements from two or more iterables.',
    example: `questions = ['name', 'quest']\nanswers = ['lancelot', 'the holy grail']\nfor q, a in zip(questions, answers):\n    print(f'What is your {q}? It is {a}.')`,
    category: 'Control Flow',
  },
  {
    name: 'match...case (Pattern Matching)',
    description: 'Compares a value against a series of patterns and executes code based on the first match. Can destructure values.',
    example: `command = "FORWARD 100"\nmatch command.split():\n    case ["FORWARD", distance]:\n        print(f"Moving forward by {distance}")\n    case ["TURN", direction]:\n        print(f"Turning {direction}")\n    case _:\n        print("Unknown command")`,
    category: 'Control Flow',
    version: '3.10+',
  },

  // Functions
  {
    name: 'Defining a Function',
    description: 'A block of code which only runs when it is called. Defined using the `def` keyword.',
    example: `def greet(name):\n  """This is a docstring."""\n  return f"Hello, {name}!"\n\nmessage = greet("Eve")`,
    category: 'Functions',
  },
  {
    name: 'Default Arguments',
    description: 'A function can be called with fewer arguments than it is defined to allow. Default values are specified in the function definition.',
    example: `def power(base, exponent=2):\n  return base ** exponent\n\npower(3)      # 9\npower(3, 3)   # 27`,
    category: 'Functions',
  },
  {
    name: 'Keyword Arguments',
    description: 'Arguments can be passed by name, making the order irrelevant.',
    example: `def describe_pet(animal_type, pet_name):\n  print(f"I have a {animal_type} named {pet_name}.")\n\ndescribe_pet(pet_name="Harry", animal_type="hamster")`,
    category: 'Functions',
  },
    {
    name: '*args and **kwargs',
    description: '`*args` is used to pass a variable number of non-keyword arguments to a function. `**kwargs` allows you to pass a variable number of keyword arguments.',
    example: `def my_function(*args, **kwargs):\n  print("Args:", args)\n  print("Kwargs:", kwargs)\n\nmy_function(1, 2, a=3, b=4)`,
    category: 'Functions',
  },
  {
    name: 'Positional-Only & Keyword-Only Arguments',
    description: 'Define functions where some arguments must be specified by position (`/`) and others by keyword (`*`).',
    example: `def f(pos_only, /, standard, *, kwd_only):\n    print(pos_only, standard, kwd_only)\n\nf(1, 2, kwd_only=3) # Valid\nf(pos_only=1, standard=2, kwd_only=3) # Invalid`,
    category: 'Functions',
    version: '3.8+',
  },
  {
    name: 'Lambda Functions',
    description: 'A small, anonymous function defined with the `lambda` keyword. Can take any number of arguments, but can only have one expression.',
    example: `multiply = lambda x, y: x * y\nprint(multiply(5, 6))  # 30`,
    category: 'Functions',
  },
   {
    name: 'Type Hinting',
    description: 'Allows you to indicate the expected data types for variables, function parameters, and return values. This is for readability and static analysis, not enforced at runtime.',
    example: `def greet(name: str) -> str:\n  return 'Hello ' + name`,
    category: 'Functions',
    version: '3.5+',
  },
  {
    name: 'Decorators',
    description: 'A function that takes another function, adds some functionality, and returns it. Uses the `@` syntax.',
    example: `def my_decorator(func):\n    def wrapper():\n        print("Before function call.")\n        func()\n        print("After function call.")\n    return wrapper\n\n@my_decorator\ndef say_hello():\n    print("Hello!")`,
    category: 'Functions',
  },
  {
    name: 'Generators (yield)',
    description: 'A simpler way to create iterators. A function that contains `yield` is a generator. It pauses execution and remembers its state between calls.',
    example: `def countdown(n):\n    while n > 0:\n        yield n\n        n -= 1\n\nfor i in countdown(3):\n    print(i) # Prints 3, 2, 1`,
    category: 'Functions',
  },

  // Lists
  {
    name: 'List Slicing',
    description: 'Access a range of items in a list by using the slicing operator `:`. `list[start:stop:step]`',
    example: `numbers = [0, 1, 2, 3, 4, 5]\nprint(numbers[2:5])   # [2, 3, 4]\nprint(numbers[:3])    # [0, 1, 2]\nprint(numbers[::2])   # [0, 2, 4]`,
    category: 'Lists',
  },
  {
    name: 'List Methods',
    description: 'Common methods for manipulating lists.',
    example: `my_list = [1, 2]\nmy_list.append(3)      # [1, 2, 3]\nmy_list.insert(0, 0)   # [0, 1, 2, 3]\nmy_list.pop()          # returns 3, list is [0, 1, 2]\nmy_list.remove(1)      # [0, 2]\nmy_list.sort()`,
    category: 'Lists',
  },
    {
    name: 'More List Methods',
    description: 'Additional useful methods for lists.',
    example: `my_list = [1, 2, 3, 2]\nmy_list.extend([4, 5])  # [1, 2, 3, 2, 4, 5]\nprint(my_list.count(2))  # 2\nprint(my_list.index(3))  # 2\nmy_list.reverse()          # [5, 4, 2, 3, 2, 1]`,
    category: 'Lists',
  },
  {
    name: 'Shallow vs Deep Copy',
    description: 'A shallow copy (`.copy()` or `[:]`) creates a new list but references the same nested objects. A deep copy (from the `copy` module) creates a new list and recursively copies all nested objects.',
    example: `import copy\noriginal = [1, [2, 3]]\nshallow = original.copy()\ndeep = copy.deepcopy(original)\nshallow[1][0] = 88 # This also changes 'original' and 'deep'\ndeep[1][0] = 99 # This only changes 'deep'`,
    category: 'Lists',
  },
  {
    name: 'collections.deque',
    description: 'A double-ended queue. It is a list-like container with fast appends and pops from both ends. Ideal for implementing queues and stacks.',
    example: `from collections import deque\nd = deque(['a', 'b', 'c'])\nd.append('d')\nd.appendleft('z')\n# deque(['z', 'a', 'b', 'c', 'd'])`,
    category: 'Lists',
  },

  // Dictionaries
  {
    name: 'Accessing Items',
    description: 'Access dictionary items by referring to its key name, inside square brackets. Use the `.get()` method to avoid an error if the key does not exist.',
    example: `person = {"name": "Frank", "age": 50}\nprint(person["name"])         # "Frank"\nprint(person.get("city", "N/A")) # "N/A"`,
    category: 'Dictionaries',
  },
  {
    name: 'Iterating Dictionaries',
    description: 'You can loop through a dictionary\'s keys, values, or both.',
    example: `for key in person.keys():\n  print(key)\n\nfor value in person.values():\n  print(value)\n\nfor key, value in person.items():\n  print(f"{key}: {value}")`,
    category: 'Dictionaries',
  },
    {
    name: 'Dictionary Methods',
    description: 'Common methods for manipulating dictionaries.',
    example: `person = {"name": "Grace", "age": 28}\nage = person.pop("age")      # returns 28\nperson.update({"city": "London"})\nprint(person) # {'name': 'Grace', 'city': 'London'}`,
    category: 'Dictionaries',
  },
  {
    name: 'Advanced Dictionary Methods',
    description: '`setdefault()` returns a key\'s value if it exists, otherwise it inserts the key with a specified value. `fromkeys()` creates a new dictionary from a sequence of keys.',
    example: `person = {'name': 'John'}\nperson.setdefault('age', 30) # 'age' is set to 30\n\nkeys = ['a', 'b']\nnew_dict = dict.fromkeys(keys, 0) # {'a': 0, 'b': 0}`,
    category: 'Dictionaries',
  },
  {
    name: 'Dictionary Merging',
    description: 'Use the `|` operator to merge dictionaries. If keys are duplicated, the value from the right-hand dictionary is used.',
    example: `d1 = {'a': 1, 'b': 2}\nd2 = {'b': 3, 'c': 4}\nmerged = d1 | d2  # {'a': 1, 'b': 3, 'c': 4}`,
    category: 'Dictionaries',
    version: '3.9+',
  },
  {
    name: 'collections.defaultdict',
    description: 'A subclass of `dict` that calls a factory function to supply missing values. It never raises a `KeyError`.',
    example: `from collections import defaultdict\nd = defaultdict(int) # Default value for a new key is 0\nd['a'] += 1 # d is now {'a': 1}`,
    category: 'Dictionaries',
  },

  // Classes (OOP)
  {
    name: 'Class Definition',
    description: 'A blueprint for creating objects. The `__init__` method is the constructor.',
    example: `class Dog:\n  def __init__(self, name, age):\n    self.name = name\n    self.age = age\n\n  def bark(self):\n    return "Woof!"\n\nmy_dog = Dog("Buddy", 5)`,
    category: 'Classes (OOP)',
  },
  {
    name: 'Inheritance & super()',
    description: 'Create a new class that inherits from a parent. `super()` calls a method from the parent class.',
    example: `class Animal:\n  def __init__(self, name): self.name = name\n\nclass Cat(Animal):\n  def __init__(self, name, breed):\n    super().__init__(name)\n    self.breed = breed`,
    category: 'Classes (OOP)',
  },
  {
    name: 'Decorators (@staticmethod, @classmethod)',
    description: '`@staticmethod` is a method that knows nothing about the class or instance. `@classmethod` is a method that gets the class as the first argument, not the instance.',
    example: `class MyClass:\n  @staticmethod\n  def utility(): ...\n  @classmethod\n  def factory(cls): return cls()`,
    category: 'Classes (OOP)',
  },
  {
    name: 'Properties (@property)',
    description: 'A decorator that allows you to define methods that can be accessed like attributes (without parentheses). Useful for computed properties.',
    example: `class Circle:\n    def __init__(self, radius):\n        self._radius = radius\n\n    @property\n    def diameter(self):\n        return self._radius * 2`,
    category: 'Classes (OOP)',
  },
  {
    name: 'Data Classes (@dataclass)',
    description: 'A decorator that automatically generates special methods like `__init__()`, `__repr__()`, etc. for classes that primarily store data.',
    example: `from dataclasses import dataclass\n\n@dataclass\nclass Point:\n    x: float\n    y: float`,
    category: 'Classes (OOP)',
    version: '3.7+',
  },
  {
    name: 'Magic Methods',
    description: 'Special methods with double underscores (dunder methods) that allow you to define how your objects behave with built-in Python operations.',
    example: `class Book:\n  def __init__(self, title):\n    self.title = title\n\n  def __str__(self):\n    return self.title\n\nmy_book = Book("The Hobbit")\nprint(my_book) # "The Hobbit"`,
    category: 'Classes (OOP)',
  },
  {
    name: '__slots__',
    description: 'A class variable that pre-declares instance attributes. This saves memory by preventing the creation of `__dict__` for each instance, but also prevents adding new attributes at runtime.',
    example: `class Point:\n    __slots__ = ['x', 'y']\n    def __init__(self, x, y):\n        self.x, self.y = x, y`,
    category: 'Classes (OOP)',
  },
  {
    name: 'Abstract Base Classes (abc)',
    description: 'A way of defining interfaces. An abstract base class cannot be instantiated, and it requires subclasses to implement its abstract methods.',
    example: `from abc import ABC, abstractmethod\n\nclass Vehicle(ABC):\n    @abstractmethod\n    def go(self): pass`,
    category: 'Classes (OOP)',
  },

  // File I/O
  {
    name: 'Reading Files (with open)',
    description: 'The `with open(...)` syntax is recommended as it automatically closes the file.',
    example: `with open("myfile.txt", "r") as f:\n  content = f.read()       # Read entire file\n  lines = f.readlines()    # Read file into a list of lines`,
    category: 'File I/O',
  },
  {
    name: 'Writing Files (with open)',
    description: 'Open a file in write (`"w"`) or append (`"a"`) mode to write content to it.',
    example: `with open("output.txt", "w") as f:\n  f.write("Hello, file!\\n")\n  f.write("This is a new line.")`,
    category: 'File I/O',
  },
  {
    name: 'File Modes',
    description: '`"r"` - Read (default). `"w"` - Write (truncates file). `"a"` - Append. `"r+"` - Read and write. Add `b` for binary mode (e.g., `"rb"`).',
    example: `with open('log.txt', 'a') as f:\n    f.write('New log entry\\n')`,
    category: 'File I/O',
  },
  {
    name: 'pathlib Module',
    description: 'An object-oriented approach to filesystem paths. It provides a more intuitive and platform-agnostic way to handle file paths compared to string manipulation.',
    example: `from pathlib import Path\n\npath = Path("my_dir/my_file.txt")\nprint(path.name)    # "my_file.txt"\nprint(path.parent)  # "my_dir"\nprint(path.exists())`,
    category: 'File I/O',
    version: '3.4+',
  },
  {
    name: 'JSON Handling (json module)',
    description: 'The `json` module allows encoding Python objects into JSON strings and decoding JSON strings into Python objects.',
    example: `import json\ndata = {'name': 'John', 'age': 30}\nwith open('data.json', 'w') as f:\n    json.dump(data, f)`,
    category: 'File I/O',
  },
  {
    name: 'CSV Handling (csv module)',
    description: 'The `csv` module provides functionality to read from and write to CSV files.',
    example: `import csv\nwith open('names.csv', 'w', newline='') as f:\n    writer = csv.writer(f)\n    writer.writerow(['first_name', 'last_name'])`,
    category: 'File I/O',
  },

  // Modules & Packages
  {
    name: 'Importing Modules',
    description: 'Bring code from other files/modules into the current scope using `import` or `from ... import`.',
    example: `import math\nprint(math.sqrt(16))  # 4.0\n\nfrom datetime import datetime\nprint(datetime.now())`,
    category: 'Modules & Packages',
  },
  {
    name: 'pip & requirements.txt',
    description: '`pip` is the package manager. `requirements.txt` is a standard file for listing project dependencies.',
    example: `# Install a package\npip install requests\n\n# Freeze current environment's packages into a file\npip freeze > requirements.txt\n\n# Install all packages from the file\npip install -r requirements.txt`,
    category: 'Modules & Packages',
  },
  {
    name: 'Virtual Environments',
    description: 'Isolates project dependencies to avoid conflicts. It is standard practice for Python projects.',
    example: `# Create a virtual environment\npython -m venv myenv\n\n# Activate it (Linux/macOS)\nsource myenv/bin/activate\n\n# Activate it (Windows)\nmyenv\\Scripts\\activate`,
    category: 'Modules & Packages',
  },
  {
    name: 'Packages & __init__.py',
    description: 'A Python package is a directory of Python modules. It must contain a file named `__init__.py` (which can be empty) to be considered a package.',
    example: `my_package/\n  __init__.py\n  module1.py\n  module2.py`,
    category: 'Modules & Packages',
  },
  {
    name: 'if __name__ == "__main__"',
    description: 'A common idiom to make code in a file runnable as a script, but not execute when the file is imported as a module.',
    example: `# my_script.py\ndef main():\n    print("Running as a script")\n\nif __name__ == "__main__":\n    main()`,
    category: 'Modules & Packages',
  },
  {
    name: 'Relative vs Absolute Imports',
    description: 'Absolute imports specify the full path from the project root. Relative imports use dots (`.` for current directory, `..` for parent) and are only used within packages.',
    example: `# Absolute import\nfrom my_package.module1 import my_function\n\n# Relative import (inside my_package/module2.py)\nfrom .module1 import my_function`,
    category: 'Modules & Packages',
  },

  // Exception Handling
  {
    name: 'try...except...else...finally',
    description: 'The full structure. `try` for risky code, `except` to handle errors, `else` runs if no exception occurred, and `finally` always runs for cleanup.',
    example: `try:\n  result = 10 / 2\nexcept ZeroDivisionError:\n  print("Cannot divide by zero!")\nelse:\n  print(f"Result is {result}")\nfinally:\n  print("Execution finished.")`,
    category: 'Exception Handling',
  },
  {
    name: 'Handling Multiple Exceptions',
    description: 'You can handle multiple types of exceptions in a single `except` block by passing them as a tuple.',
    example: `try:\n    # code that might raise an error\n    pass\nexcept (ValueError, TypeError) as e:\n    print(f"Caught a value or type error: {e}")`,
    category: 'Exception Handling',
  },
  {
    name: 'Raising Exceptions',
    description: 'The `raise` keyword is used to raise an exception. You can define what kind of error to raise, and the text to print to the user.',
    example: `x = -1\nif x < 0:\n  raise ValueError("Sorry, no numbers below zero")`,
    category: 'Exception Handling',
  },
  {
    name: 'Custom Exceptions',
    description: 'Create your own exception types by inheriting from the base `Exception` class. This makes error handling more specific.',
    example: `class MyCustomError(Exception):\n    pass\n\ntry:\n    raise MyCustomError("Something went wrong in my app")\nexcept MyCustomError as e:\n    print(e)`,
    category: 'Exception Handling',
  },
  {
    name: 'Context Managers (with)',
    description: 'An object that defines the methods to be executed upon entering and exiting a `with` block. Useful for resource management like files or database connections.',
    example: `# File objects are context managers\nwith open('file.txt', 'r') as f:\n    content = f.read()\n# File is automatically closed here`,
    category: 'Exception Handling',
  },
  {
    name: 'contextlib.contextmanager',
    description: 'A decorator from the standard library for creating your own context managers from a simple generator function.',
    example: `from contextlib import contextmanager\n\n@contextmanager\ndef managed_resource():\n    print("Acquiring resource...")\n    try:\n        yield "My Resource"\n    finally:\n        print("Releasing resource...")\n\nwith managed_resource() as res:\n    print(f"Using {res}")`,
    category: 'Exception Handling',
  },

  // Comprehensions
  {
    name: 'List Comprehension',
    description: 'A concise way to create lists.',
    example: `# Create a list of squares\nsquares = [x**2 for x in range(10)]\n\n# Create a list of even numbers\nevens = [x for x in range(10) if x % 2 == 0]`,
    category: 'Comprehensions',
  },
  {
    name: 'Dictionary Comprehension',
    description: 'A concise way to create dictionaries.',
    example: `square_dict = {x: x**2 for x in range(5)}\n# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}`,
    category: 'Comprehensions',
  },
  {
    name: 'Set Comprehension',
    description: 'Similar to list comprehensions, but create sets.',
    example: `unique_squares = {x**2 for x in [1, 2, 2, 3]}\n# {1, 4, 9}`,
    category: 'Comprehensions',
  },
  {
    name: 'Generator Expression',
    description: 'Creates a generator object. It looks like a list comprehension but uses parentheses. It is memory-efficient as it yields items one by one.',
    example: `squares_gen = (x**2 for x in range(1000000))\nfor square in squares_gen:\n  # Process one square at a time\n  print(square)`,
    category: 'Comprehensions',
  },
  {
    name: 'Comprehensions with Walrus Operator',
    description: 'The walrus operator `:=` can be used inside comprehensions to assign a value to a variable that can be used in both the expression and condition.',
    example: `results = [y for x in data if (y := process(x)) is not None]\n# This avoids calling process(x) twice`,
    category: 'Comprehensions',
    version: '3.8+',
  },
  {
    name: 'Nested List Comprehensions',
    description: 'Comprehensions can be nested to create lists of lists or flatten complex structures. The order of `for` loops is the same as in regular nested loops.',
    example: `# Flatten a matrix\nmatrix = [[1, 2], [3, 4]]\nflattened = [num for row in matrix for num in row]\n# [1, 2, 3, 4]`,
    category: 'Comprehensions',
  },
];
