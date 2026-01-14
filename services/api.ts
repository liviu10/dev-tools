import React from 'react';
import type { DevTool } from '../types';

// Fix: Rewrote icon component to use React.createElement instead of JSX, which is not allowed in .ts files.
const KeyIcon = () => React.createElement(
    'svg',
    { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8 text-indigo-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H5v-2H3v-2H1.258a1 1 0 01-.97-1.243l1.263-6.318a1 1 0 01.97-.757H7m6-4v2m-6-2v2m6-6v2m-6-2v2" })
);

// Fix: Rewrote icon component to use React.createElement instead of JSX, which is not allowed in .ts files.
const CodeIcon = () => React.createElement(
    'svg',
    { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8 text-indigo-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" })
);

// Fix: Rewrote icon component to use React.createElement instead of JSX, which is not allowed in .ts files.
const TextIcon = () => React.createElement(
    'svg',
    { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8 text-indigo-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M4 6h16M4 12h16M4 18h7" })
);

const GraphIcon = () => React.createElement(
    'svg',
    { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8 text-indigo-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" })
);

const ShieldCheckIcon = () => React.createElement(
    'svg',
    { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8 text-indigo-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944a11.955 11.955 0 018.618-3.04 11.955 11.955 0 018.618 3.04A12.02 12.02 0 0021 5.944a11.955 11.955 0 01-2.382-1.016z" })
);

const FileCheckIcon = () => React.createElement(
    'svg',
    { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8 text-indigo-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 12l2 2 4-4m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" })
);

const PaletteIcon = () => React.createElement(
    'svg',
    { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8 text-indigo-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" })
);

const DocumentTextIcon = () => React.createElement(
    'svg',
    { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8 text-indigo-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" })
);

const LinkIcon = () => React.createElement(
    'svg',
    { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8 text-indigo-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" })
);

const JwtIcon = () => React.createElement(
    'svg',
    { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8 text-indigo-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l-3-3m0 0l3-3m-3 3h4" })
);

const FingerprintIcon = () => React.createElement(
    'svg',
    { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8 text-indigo-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-1.026.977-2.19.977-3.431a8 8 0 00-16 0c0 1.24.332 2.405.977 3.43l.003.005a5.032 5.032 0 01-2.173 1.123l-.005.002a5.002 5.002 0 01-3.6-3.6l-.003-.005A9.952 9.952 0 012 12c0-5.523 4.477-10 10-10s10 4.477 10 10c0 2.242-.734 4.31-1.966 6.002a5.002 5.002 0 01-3.6 3.6l-.005.002a5.032 5.032 0 01-2.173-1.123l-.002-.005z" })
);

const IdIcon = () => React.createElement(
    'svg',
    { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8 text-indigo-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 012-2h4a2 2 0 012 2v1m-4 0h4m-9 4h1m-1 4h7" })
);

const ClockIcon = () => React.createElement(
    'svg',
    { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8 text-indigo-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" })
);

const SearchCodeIcon = () => React.createElement(
    'svg',
    { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8 text-indigo-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }),
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" })
);

const UserGroupIcon = () => React.createElement(
    'svg',
    { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8 text-indigo-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.124-1.282-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.124-1.282.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" })
);

const GlobeIcon = () => React.createElement(
    'svg',
    { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8 text-indigo-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }),
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M3.255 15.245L20.745 8.755m-17.49 0L20.745 15.245" })
);

const DocumentAddIcon = () => React.createElement(
    'svg',
    { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8 text-indigo-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" })
);

const SwitchHorizontalIcon = () => React.createElement(
    'svg',
    { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8 text-indigo-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" })
);

const SparklesIcon = () => React.createElement(
    'svg',
    { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8 text-indigo-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" })
);

const ArrowsPointingInIcon = () => React.createElement(
    'svg',
    { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8 text-indigo-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9V4.5M15 9h4.5M15 9l5.25-5.25M15 15v4.5M15 15h4.5M15 15l5.25 5.25" })
);

const FunnelIcon = () => React.createElement(
    'svg',
    { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8 text-indigo-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.707 7.293A1 1 0 013 6.586V4z" })
);

const PencilSquareIcon = () => React.createElement(
    'svg',
    { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8 text-indigo-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" })
);

const PhotoIcon = () => React.createElement(
    'svg',
    { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8 text-indigo-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" })
);


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
    icon: React.createElement(IdIcon),
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
    id: 'iconGenerator',
    name: 'SVG Icon Generator',
    category: 'Generators',
    description: 'Search, customize, and copy SVG icons from the Heroicons library.',
    icon: React.createElement(PencilSquareIcon),
    enabled: true,
  },
  {
    id: 'jsonFormatter',
    name: 'JSON Formatter',
    category: 'JSON',
    description: 'Beautify and validate your JSON data with ease.',
    icon: React.createElement(CodeIcon),
    enabled: true,
  },
   {
    id: 'jsonValidator',
    name: 'JSON Validator',
    category: 'JSON',
    description: 'Validate your JSON and find syntax errors.',
    icon: React.createElement(ShieldCheckIcon),
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
    category: 'Web',
    description: 'Select colors and generate stunning color palettes and harmonies.',
    icon: React.createElement(PaletteIcon),
    enabled: true,
  },
    {
    id: 'unixTimestampConverter',
    name: 'Unix Timestamp Converter',
    category: 'Web',
    description: 'Convert between Unix timestamps and human-readable dates.',
    icon: React.createElement(ClockIcon),
    enabled: true,
  },
  {
    id: 'timeZoneConverter',
    name: 'Time Zone Converter',
    category: 'Web',
    description: 'View and compare current times across different time zones in real-time.',
    icon: React.createElement(GlobeIcon),
    enabled: true,
  },
  {
    id: 'textToMarkdownConverter',
    name: 'Text to Markdown Converter',
    category: 'Web',
    description: 'Convert plain text into formatted Markdown with intelligent suggestions.',
    icon: React.createElement(DocumentAddIcon),
    enabled: true,
  },
  {
    id: 'hashGenerator',
    name: 'Hash Generator',
    category: 'Encoding',
    description: 'Generate SHA-1 and SHA-256 hashes from text using the Web Crypto API.',
    icon: React.createElement(FingerprintIcon),
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
    id: 'urlEncoderDecoder',
    name: 'URL Encoder / Decoder',
    category: 'Encoding',
    description: 'Encode URLs to be safely transmitted or decode them back.',
    icon: React.createElement(LinkIcon),
    enabled: true,
  },
  {
    id: 'base64EncoderDecoder',
    name: 'Base64 Encoder/Decoder',
    category: 'Encoding',
    description: 'Encode and decode data in Base64 format.',
    icon: React.createElement(TextIcon),
    enabled: true,
  },
  {
    id: 'jsValidator',
    name: 'JavaScript Sandbox',
    category: 'Code',
    description: 'Safely execute and test your JavaScript code snippets.',
    icon: React.createElement(FileCheckIcon),
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
    id: 'codeFormatter',
    name: 'Code Formatter',
    category: 'Code',
    description: 'Automatically format HTML, CSS, and JavaScript code using Prettier.',
    icon: React.createElement(SparklesIcon),
    enabled: true,
  },
  {
    id: 'minifier',
    name: 'Minifier (JS / CSS)',
    category: 'Code',
    description: 'Reduce the file size of your JavaScript and CSS code for faster load times.',
    icon: React.createElement(ArrowsPointingInIcon),
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
];

export const getDevTools = (): Promise<DevTool[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockDevTools);
    }, 500); // Simulate network delay
  });
};