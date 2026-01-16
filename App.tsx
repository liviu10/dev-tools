
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import PasswordGenerator from './components/PasswordGenerator';
import JsonFormatter from './components/JsonFormatter';
import JsonCrack from './components/JsonCrack';
import JsValidator from './components/JsValidator';
import ColorPicker from './components/ColorPicker';
import LoremIpsumGenerator from './components/LoremIpsumGenerator';
import JwtDecoder from './components/JwtDecoder';
import HashGenerator from './components/HashGenerator';
import UuidGenerator from './components/UuidGenerator';
import UnixTimestampConverter from './components/UnixTimestampConverter';
import RegexTester from './components/RegexTester';
import FakeDataGenerator from './components/FakeDataGenerator';
import CsvXmlToJsonConverter from './components/CsvXmlToJsonConverter';
import CssPurifier from './components/CssPurifier';
import ImageToWebpConverter from './components/ImageToWebpConverter';
import EncoderDecoder from './components/EncoderDecoder';
import CodeOptimizer from './components/CodeOptimizer';
import type { View } from './types';
import IconGenerator from './components/IconGenerator';
import CheatSheetPage from './components/CheatSheetPage';
import LinuxReference from './components/LinuxReference';

// Data imports for cheat sheets
import { allHtmlTags, commonAttributes } from './data/htmlCheatSheet';
import { cssData } from './data/cssCheatSheet';
import { jsData } from './data/javaScriptCheatSheet';
import { phpData } from './data/phpCheatSheet';
import { laravelData } from './data/laravelCheatSheet';
import { pythonData } from './data/pythonCheatSheet';
import { drfData } from './data/drfCheatSheet';
import { gitData } from './data/gitCheatSheet';
import { bashData } from './data/bashCheatSheet';
import { powershellData } from './data/powershellCheatSheet';
import { htaccessData } from './data/htaccessCheatSheet';


const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');

  const handleNavigate = useCallback((view: View) => {
    setCurrentView(view);
  }, []);

  const renderView = () => {
    switch (currentView) {
      case 'passwordGenerator':
        return <PasswordGenerator />;
      case 'loremIpsumGenerator':
        return <LoremIpsumGenerator />;
      case 'uuidGenerator':
        return <UuidGenerator />;
      case 'fakeDataGenerator':
        return <FakeDataGenerator />;
      case 'unixTimestampConverter':
        return <UnixTimestampConverter />;
      case 'jsonFormatter':
        return <JsonFormatter />;
      case 'csvXmlToJsonConverter':
        return <CsvXmlToJsonConverter />;
      case 'jwtDecoder':
        return <JwtDecoder />;
      case 'hashGenerator':
        return <HashGenerator />;
      case 'regexTester':
        return <RegexTester />;
      case 'cssPurifier':
        return <CssPurifier />;
      case 'imageToWebpConverter':
        return <ImageToWebpConverter />;
      case 'iconGenerator':
        return <IconGenerator />;
      case 'jsonCrack':
        return <JsonCrack />;
      case 'jsValidator':
        return <JsValidator />;
      case 'colorPicker':
        return <ColorPicker />;
      case 'encoderDecoder':
        return <EncoderDecoder />;
      case 'codeOptimizer':
        return <CodeOptimizer />;
      case 'htmlCssCheatSheet':
        return <CheatSheetPage title="HTML & CSS Cheat Sheet" sheets={[
            { name: 'HTML', data: [...allHtmlTags, ...commonAttributes], searchPlaceholder: 'Search tags and attributes...' },
            { name: 'CSS', data: cssData, searchPlaceholder: 'Search properties, selectors...', orderedCategories: [ 'Selectors', 'Box Model', 'Typography', 'Colors & Backgrounds', 'Layout', 'Flexbox', 'Grid', 'Transitions & Animations', 'Miscellaneous' ] }
        ]} />;
      case 'javaScriptCheatSheet':
        return <CheatSheetPage title="JavaScript Cheat Sheet" sheets={[
            { name: 'JavaScript', data: jsData, searchPlaceholder: 'Search syntax, methods, features...', orderedCategories: [
                'Variables & Data Types', 'Operators', 'Control Flow', 'Functions', 
                'Arrays', 'Objects', 'ES6+ Features', 'Asynchronous JS', 'DOM Manipulation'
            ]}
        ]} />;
      case 'phpLaravelCheatSheet':
        return <CheatSheetPage title="PHP & Laravel Cheat Sheet" sheets={[
            { name: 'PHP', data: phpData, versionPrefix: 'PHP', searchPlaceholder: 'Search syntax, functions...', orderedCategories: [ 'Syntax & Variables', 'Operators', 'Control Structures', 'Functions', 'String Functions', 'Array Functions', 'Arrays', 'OOP', 'Date & Time', 'File & JSON Handling', 'Database (PDO)', 'Security', 'Dependency Management (Composer)', 'Command Line (CLI)', 'Error Handling & Debugging', 'Superglobals', 'Newer Features' ]},
            { name: 'Laravel', data: laravelData, searchPlaceholder: 'Search Artisan, Blade, Eloquent...', orderedCategories: [ 'Artisan Commands', 'Routing', 'Middleware', 'Controllers', 'Blade Templates', 'Eloquent ORM', 'Database & Migrations', 'Validation', 'Authentication', 'Collections', 'File Storage', 'Queues', 'Task Scheduling', 'Testing' ]}
        ]} />;
      case 'pythonDrfCheatSheet':
        return <CheatSheetPage title="Python & DRF Cheat Sheet" sheets={[
            { name: 'Python', data: pythonData, versionPrefix: 'Python', searchPlaceholder: 'Search syntax, functions, keywords...', orderedCategories: [ 'Syntax & Variables', 'Data Types', 'Operators', 'Control Flow', 'Functions', 'Lists', 'Dictionaries', 'Classes (OOP)', 'File I/O', 'Modules & Packages', 'Exception Handling', 'Comprehensions' ]},
            { name: 'DRF', data: drfData, searchPlaceholder: 'Search serializers, views, routers...', orderedCategories: [ 'Serializers', 'Views & ViewSets', 'Routing', 'Authentication & Permissions', 'Pagination', 'Filtering, Ordering & Searching', 'Testing' ]}
        ]} />;
      case 'gitCheatSheet':
        return <CheatSheetPage title="Git Cheat Sheet" sheets={[
            { name: 'Git', data: gitData, searchPlaceholder: 'Search commands, flags...', orderedCategories: [ 'Setup & Config', 'Starting a Project', 'Making Changes', 'Branching & Merging', 'Remote Repositories', 'History & Undoing Changes', 'Tagging', 'Advanced Git' ]}
        ]} />;
      case 'bashCheatSheet':
        return <CheatSheetPage title="Bash Cheat Sheet" sheets={[
            { name: 'Bash', data: bashData, searchPlaceholder: 'Search commands, flags...', orderedCategories: [ 'File & Directory Commands', 'Text Processing', 'System & Process Management', 'Permissions', 'Networking', 'Archive & Compression', 'Shell Scripting Basics', 'Shortcuts & History' ]}
        ]} />;
      case 'powerShellCheatSheet':
        return <CheatSheetPage title="PowerShell Cheat Sheet" sheets={[
            { name: 'PowerShell', data: powershellData, searchPlaceholder: 'Search cmdlets, aliases...', orderedCategories: [ 'Core Cmdlets', 'Object Manipulation', 'File System', 'Process & Service Management', 'Networking', 'System Information', 'Scripting Basics' ]}
        ]} />;
      case 'linuxReference':
        return <LinuxReference />;
      case 'htaccessCheatSheet':
        return <CheatSheetPage title=".htaccess Cheat Sheet" sheets={[
            { name: '.htaccess', data: htaccessData, searchPlaceholder: 'Search directives, flags...', orderedCategories: [ 'Rewrite Engine', 'Redirects', 'Authentication & Access Control', 'Security', 'Caching & Headers', 'Performance & Compression', 'Custom Error Pages', 'PHP Configuration' ]}
        ]} />;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen transition-colors duration-300">
      <Header onNavigate={handleNavigate} />
      <main className="p-4 sm:p-6 lg:p-8">
        {currentView === 'dashboard' ? (
          <Dashboard onNavigate={handleNavigate} />
        ) : (
          renderView()
        )}
      </main>
    </div>
  );
};

export default App;
