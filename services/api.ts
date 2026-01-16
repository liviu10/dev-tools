import React from 'react';
import type { DevTool } from '../types';

// Helper function to create a Font Awesome icon component
const FaIcon = (iconClass: string) => () => React.createElement('i', { 
    className: `fa-solid ${iconClass} text-indigo-600 dark:text-indigo-400 fa-2x w-8 text-center`,
    'aria-hidden': 'true' 
});

// Create icon components using the helper
const KeyIcon = FaIcon('fa-key');
const DocumentTextIcon = FaIcon('fa-file-lines');
const FingerprintIcon = FaIcon('fa-fingerprint');
const UserGroupIcon = FaIcon('fa-users');
const JsonIcon = FaIcon('fa-code');
const GraphIcon = FaIcon('fa-sitemap');
const SwitchHorizontalIcon = FaIcon('fa-right-left');
const EyeDropperIcon = FaIcon('fa-eye-dropper');
const CalendarDaysIcon = FaIcon('fa-calendar-days');
const ArrowsRightLeftIcon = FaIcon('fa-arrows-left-right');
const CpuChipIcon = FaIcon('fa-microchip');
const JwtIcon = FaIcon('fa-shield-halved');
const BeakerIcon = FaIcon('fa-flask');
const SearchCodeIcon = FaIcon('fa-code-compare');
const SparklesIcon = FaIcon('fa-wand-magic-sparkles');
const FunnelIcon = FaIcon('fa-filter');
const PhotoIcon = FaIcon('fa-image');
const CodeIcon = FaIcon('fa-file-code');
const BranchIcon = FaIcon('fa-code-branch');
const TerminalIcon = FaIcon('fa-terminal');
const ServerIcon = FaIcon('fa-server');

const mockDevTools: DevTool[] = [
  {
    id: 'passwordGenerator',
    name: 'Password Generator',
    category: 'Generators',
    description: 'Create strong, secure, and random passwords to protect your accounts.',
    icon: React.createElement(KeyIcon),
    enabled: true,
  },
  {
    id: 'loremIpsumGenerator',
    name: 'Lorem Ipsum Generator',
    category: 'Generators',
    description: 'Generate placeholder text for paragraphs, sentences, or words.',
    icon: React.createElement(DocumentTextIcon),
    enabled: true,
  },
    {
    id: 'uuidGenerator',
    name: 'UUID Generator',
    category: 'Generators',
    description: 'Generate Version 4 (random) universally unique identifiers (UUIDs).',
    icon: React.createElement(FingerprintIcon),
    enabled: true,
  },
  {
    id: 'fakeDataGenerator',
    name: 'Fake Data Generator',
    category: 'Generators',
    description: 'Generate realistic fake data like users, addresses, and products in JSON format.',
    icon: React.createElement(UserGroupIcon),
    enabled: true,
  },
  {
    id: 'jsonFormatter',
    name: 'JSON Formatter & Validator',
    category: 'JSON',
    description: 'Beautify your JSON data and get real-time validation feedback.',
    icon: React.createElement(JsonIcon),
    enabled: true,
  },
  {
    id: 'jsonCrack',
    name: 'JSON Crack',
    category: 'JSON',
    description: 'Visualize your JSON data as an interactive graph.',
    icon: React.createElement(GraphIcon),
    enabled: true,
  },
   {
    id: 'csvXmlToJsonConverter',
    name: 'CSV/XML to JSON Converter',
    category: 'JSON',
    description: 'Convert CSV or XML data into a structured JSON format.',
    icon: React.createElement(SwitchHorizontalIcon),
    enabled: true,
  },
  {
    id: 'colorPicker',
    name: 'Color Picker',
    category: 'Code',
    description: 'Select colors and generate stunning color palettes and harmonies.',
    icon: React.createElement(EyeDropperIcon),
    enabled: true,
  },
    {
    id: 'unixTimestampConverter',
    name: 'Unix Timestamp Converter',
    category: 'Code',
    description: 'Convert between Unix timestamps and human-readable dates.',
    icon: React.createElement(CalendarDaysIcon),
    enabled: true,
  },
   {
    id: 'encoderDecoder',
    name: 'Encoder / Decoder',
    category: 'Encoding',
    description: 'Encode and decode data using URL and Base64 formats.',
    icon: React.createElement(ArrowsRightLeftIcon),
    enabled: true,
  },
  {
    id: 'hashGenerator',
    name: 'Hash Generator',
    category: 'Encoding',
    description: 'Generate SHA-1 and SHA-256 hashes from text using the Web Crypto API.',
    icon: React.createElement(CpuChipIcon),
    enabled: true,
  },
  {
    id: 'jwtDecoder',
    name: 'JWT Decoder',
    category: 'Encoding',
    description: 'Decode a JSON Web Token to view its header and payload contents.',
    icon: React.createElement(JwtIcon),
    enabled: true,
  },
  {
    id: 'jsValidator',
    name: 'JavaScript Sandbox',
    category: 'Code',
    description: 'Safely execute and test your JavaScript code snippets.',
    icon: React.createElement(BeakerIcon),
    enabled: true,
  },
    {
    id: 'regexTester',
    name: 'Regex Tester',
    category: 'Code',
    description: 'Test and debug your regular expressions in real-time with syntax highlighting.',
    icon: React.createElement(SearchCodeIcon),
    enabled: true,
  },
  {
    id: 'codeOptimizer',
    name: 'Code Optimizer',
    category: 'Code',
    description: 'Format or minify HTML, CSS, and JavaScript code for readability or performance.',
    icon: React.createElement(SparklesIcon),
    enabled: true,
  },
  {
    id: 'cssPurifier',
    name: 'CSS Purifier',
    category: 'Code',
    description: 'Remove unused CSS rules by comparing your stylesheet against your HTML.',
    icon: React.createElement(FunnelIcon),
    enabled: true,
  },
  {
    id: 'imageToWebpConverter',
    name: 'Image to WebP Converter',
    category: 'Media',
    description: 'Convert JPG, PNG, and GIF images to the modern WebP format in your browser.',
    icon: React.createElement(PhotoIcon),
    enabled: true,
  },
  {
    id: 'htmlCssCheatSheet',
    name: 'HTML & CSS',
    category: 'Cheat Sheets',
    description: 'Reference for HTML tags, attributes, and common CSS properties and selectors.',
    icon: React.createElement(CodeIcon),
    enabled: true,
  },
  {
    id: 'javaScriptCheatSheet',
    name: 'JavaScript',
    category: 'Cheat Sheets',
    description: 'Quick reference for JS syntax, array methods, ES6+ features, and DOM manipulation.',
    icon: React.createElement(CodeIcon),
    enabled: true,
  },
  {
    id: 'phpLaravelCheatSheet',
    name: 'PHP & Laravel',
    category: 'Cheat Sheets',
    description: 'Combined reference for PHP syntax, functions, and Laravel framework specifics like Artisan and Eloquent.',
    icon: React.createElement(CodeIcon),
    enabled: true,
  },
  {
    id: 'pythonDrfCheatSheet',
    name: 'Python & DRF',
    category: 'Cheat Sheets',
    description: 'Combined reference for Python syntax and the Django Rest Framework (DRF) for building APIs.',
    icon: React.createElement(CodeIcon),
    enabled: true,
  },
  {
    id: 'gitCheatSheet',
    name: 'Git',
    category: 'Cheat Sheets',
    description: 'Common commands for version control, from starting a project to branching and remotes.',
    icon: React.createElement(BranchIcon),
    enabled: true,
  },
  {
    id: 'bashCheatSheet',
    name: 'Bash',
    category: 'Cheat Sheets',
    description: 'Essential commands for file manipulation, text processing, and system management in the shell.',
    icon: React.createElement(TerminalIcon),
    enabled: true,
  },
  {
    id: 'powerShellCheatSheet',
    name: 'PowerShell',
    category: 'Cheat Sheets',
    description: 'Core cmdlets for object manipulation, file system tasks, and system administration on Windows.',
    icon: React.createElement(TerminalIcon),
    enabled: true,
  },
  {
    id: 'linuxReference',
    name: 'Linux Reference',
    category: 'Cheat Sheets',
    description: 'Interactive tools for Linux commands, permissions, and filesystem hierarchy.',
    icon: React.createElement(TerminalIcon),
    enabled: true,
  },
  {
    id: 'htaccessCheatSheet',
    name: 'Apache .htaccess',
    category: 'Cheat Sheets',
    description: 'Directives for URL rewriting, access control, caching, and other server configurations.',
    icon: React.createElement(ServerIcon),
    enabled: true,
  },
];

export const getDevTools = (): Promise<DevTool[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockDevTools);
    }, 500); // Simulate network delay
  });
};