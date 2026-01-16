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

const GraphIcon = () => React.createElement(
    'svg',
    { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8 text-indigo-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" })
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

const TerminalIcon = () => React.createElement(
    'svg',
    { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8 text-indigo-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M5.25 7.5L9.75 12l-4.5 4.5m6-9l-4.5 4.5 4.5 4.5m6-9l-4.5 4.5 4.5 4.5" })
);

const PowerShellIcon = () => React.createElement(
    'svg',
    { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8 text-indigo-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M3 4.5A1.5 1.5 0 014.5 3h15A1.5 1.5 0 0121 4.5v15a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 19.5v-15z" }),
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M7 9l3 3-3 3" }),
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M11 15h4" })
);

const TagIcon = () => React.createElement(
    'svg',
    { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8 text-indigo-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M6.75 7.5l3 2.25-3 2.25m3 0h3m-3 2.25l3 2.25-3 2.25m9-15l-4.5 16.5" })
);

const BrushIcon = () => React.createElement(
    'svg',
    { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8 text-indigo-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" })
);

const JsIcon = () => React.createElement(
    'svg',
    { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8 text-indigo-400", fill: "currentColor", viewBox: "0 0 24 24" },
    React.createElement('path', { d: "M3 3h18v18H3V3zm6.75 13.5h2.5v-7.5h-2.5v7.5zm5.5-3.25c0 .75-.25 1.4-1 1.95.75.55 1 1.25 1 2.05v.25h-2.5v-.5c0-.6-.2-.95-.8-1.15v1.65h-1.5v-7.5h2.6c1.2 0 2.2.8 2.2 2.25zm-2.9-1.2h.8c.45 0 .8-.3.8-.75s-.35-.75-.8-.75h-.8v1.5z" })
);

const PhpIcon = () => React.createElement(
    'svg',
    { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8 text-indigo-400", fill: "currentColor", viewBox: "0 0 24 24" },
    React.createElement('path', { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 14.5h-3v-9h3c1.93 0 3.5 1.57 3.5 3.5v2c0 1.93-1.57 3.5-3.5 3.5zm7 0h-3v-9h3c1.93 0 3.5 1.57 3.5 3.5v2c0 1.93-1.57 3.5-3.5 3.5zm-8.5-5.5h1.5v2h-1.5v-2zm7 0h1.5v2h-1.5v-2z" })
);

const LaravelIcon = () => React.createElement(
    'svg',
    { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8 text-indigo-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: "1.5" },
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M11.55 3.007L3 7.5v9l8.55 4.493L20 16.5v-9l-8.45-4.493zM12 18.39l-7-3.71V8.32l7 3.71v6.36zm0-8.22L5 6.46l7-3.71 7 3.71-7 3.71z" })
);

const PythonIcon = () => React.createElement(
    'svg',
    { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8 text-indigo-400", fill: "currentColor", viewBox: "0 0 24 24" },
    React.createElement('path', { d: 'M12.4 2.6C9.3 2.6 7 4.9 7 8v4.5c0 .6.4 1 1 1h2.5c.6 0 1-.4 1-1V9.9c0-1.7 1.3-3 3-3s3 1.3 3 3v4.6c0 .6.4 1 1 1h2.5c.6 0 1-.4 1-1V8c0-3.1-2.3-5.4-5.4-5.4zM16.5 7.9c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5z' }),
    React.createElement('path', { d: 'M11.6 21.4c3.1 0 5.4-2.3 5.4-5.4v-4.5c0-.6-.4-1-1-1h-2.5c-.6 0-1 .4-1 1v4.1c0 1.7-1.3 3-3 3s-3-1.3-3-3v-4.6c0-.6-.4-1-1-1H2.5c-.6 0-1 .4-1 1V16c0 3.1 2.3 5.4 5.4 5.4z M7.5 16.1c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5-1.5-1.5-.7-1.5-1.5.7-1.5 1.5-1.5z' })
);

const DjangoIcon = () => React.createElement(
    'svg',
    { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8 text-indigo-400", fill: "currentColor", viewBox: "0 0 24 24" },
    React.createElement('path', { d: 'M9 3v18h6a6 6 0 000-12H9zm2 2h4a4 4 0 010 8H11V5z' })
);

const ServerIcon = () => React.createElement(
    'svg',
    { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8 text-indigo-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" })
);

const GitIcon = () => React.createElement(
    'svg',
    { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8 text-indigo-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M10 20.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" }),
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M10 8.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" }),
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M15.75 8.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" }),
    React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M10 15.75v-3.75m0 0V8.25m0 3.75h3.75c1.24 0 2.25-1.01 2.25-2.25V8.25" })
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
    name: 'JSON Formatter & Validator',
    category: 'JSON',
    description: 'Beautify your JSON data and get real-time validation feedback.',
    icon: React.createElement(CodeIcon),
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
    id: 'encoderDecoder',
    name: 'Encoder / Decoder',
    category: 'Encoding',
    description: 'Encode and decode data using URL and Base64 formats.',
    icon: React.createElement(SwitchHorizontalIcon),
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
    id: 'htmlCheatSheet',
    name: 'HTML Cheat Sheet',
    category: 'Cheat Sheets',
    description: 'A quick reference for common HTML tags, semantic elements, and attributes.',
    icon: React.createElement(TagIcon),
    enabled: true,
  },
  {
    id: 'cssCheatSheet',
    name: 'CSS Cheat Sheet',
    category: 'Cheat Sheets',
    description: 'A quick reference for CSS selectors, properties, and layout concepts.',
    icon: React.createElement(BrushIcon),
    enabled: true,
  },
  {
    id: 'javaScriptCheatSheet',
    name: 'JavaScript Cheat Sheet',
    category: 'Cheat Sheets',
    description: 'A quick reference for JavaScript syntax, methods, and modern features.',
    icon: React.createElement(JsIcon),
    enabled: true,
  },
  {
    id: 'phpCheatSheet',
    name: 'PHP Cheat Sheet',
    category: 'Cheat Sheets',
    description: 'A quick reference for PHP syntax, functions, and version-specific features.',
    icon: React.createElement(PhpIcon),
    enabled: true,
  },
  {
    id: 'laravelCheatSheet',
    name: 'Laravel Cheat Sheet',
    category: 'Cheat Sheets',
    description: 'A quick reference for Laravel Artisan, Blade, Eloquent, and more.',
    icon: React.createElement(LaravelIcon),
    enabled: true,
  },
  {
    id: 'pythonCheatSheet',
    name: 'Python Cheat Sheet',
    category: 'Cheat Sheets',
    description: 'A quick reference for Python syntax, data types, control flow, and common functions.',
    icon: React.createElement(PythonIcon),
    enabled: true,
  },
  {
    id: 'drfCheatSheet',
    name: 'Django Rest Framework Cheat Sheet',
    category: 'Cheat Sheets',
    description: 'A quick reference for DRF serializers, views, routers, and more.',
    icon: React.createElement(DjangoIcon),
    enabled: true,
  },
  {
    id: 'htaccessCheatSheet',
    name: '.htaccess Cheat Sheet',
    category: 'Cheat Sheets',
    description: 'A quick reference for Apache .htaccess file directives and syntax.',
    icon: React.createElement(ServerIcon),
    enabled: true,
  },
  {
    id: 'bashCheatSheet',
    name: 'Bash Cheat Sheet',
    category: 'Cheat Sheets',
    description: 'A quick reference for common Bash commands, scripting syntax, and shell shortcuts.',
    icon: React.createElement(TerminalIcon),
    enabled: true,
  },
  {
    id: 'powershellCheatSheet',
    name: 'PowerShell Cheat Sheet',
    category: 'Cheat Sheets',
    description: 'A quick reference for common PowerShell cmdlets for Windows administration.',
    icon: React.createElement(PowerShellIcon),
    enabled: true,
  },
  {
    id: 'gitCheatSheet',
    name: 'Git Cheat Sheet',
    category: 'Cheat Sheets',
    description: 'A quick reference for common Git commands, branching, merging, and more.',
    icon: React.createElement(GitIcon),
    enabled: true,
  },
  {
    id: 'linuxReference',
    name: 'Linux Reference',
    category: 'Cheat Sheets',
    description: 'Explore Linux commands, file permissions, and filesystem structure.',
    icon: React.createElement(TerminalIcon),
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
];

export const getDevTools = (): Promise<DevTool[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockDevTools);
    }, 500); // Simulate network delay
  });
};