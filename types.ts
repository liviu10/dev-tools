import type React from 'react';

// Fix: Added 'iconGenerator' to the View type to allow it as a valid navigation target.
export type View = 'dashboard' | 'passwordGenerator' | 'jsonFormatter' | 'encoderDecoder' | 'jsonCrack' | 'jsValidator' | 'colorPicker' | 'loremIpsumGenerator' | 'jwtDecoder' | 'hashGenerator' | 'uuidGenerator' | 'unixTimestampConverter' | 'regexTester' | 'fakeDataGenerator' | 'csvXmlToJsonConverter' | 'codeOptimizer' | 'cssPurifier' | 'imageToWebpConverter' | 'iconGenerator' | 'htmlCssCheatSheet' | 'javaScriptCheatSheet' | 'phpLaravelCheatSheet' | 'pythonDrfCheatSheet' | 'gitCheatSheet' | 'bashCheatSheet' | 'powerShellCheatSheet' | 'linuxReference' | 'htaccessCheatSheet';

export type ToolCategory = 'Generators' | 'JSON' | 'Encoding' | 'Code' | 'Media' | 'Cheat Sheets' | 'System';

export interface DevTool {
  id: View;
  name: string;
  category: ToolCategory;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
}

export interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
}

// Types for HtmlLayoutGenerator
export type ContentType = 'empty' | 'text' | 'button' | 'card' | 'image' | 'input';

export interface ItemContent {
    type: ContentType;
    props: { [key: string]: any };
}
export type ItemContentMap = { [key: string]: ItemContent };