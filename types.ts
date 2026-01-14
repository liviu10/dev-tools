import type React from 'react';

export type View = 'dashboard' | 'passwordGenerator' | 'jsonFormatter' | 'base64EncoderDecoder' | 'jsonCrack' | 'jsonValidator' | 'jsValidator' | 'colorPicker' | 'loremIpsumGenerator' | 'urlEncoderDecoder' | 'jwtDecoder' | 'hashGenerator' | 'uuidGenerator' | 'unixTimestampConverter' | 'regexTester' | 'fakeDataGenerator' | 'timeZoneConverter' | 'textToMarkdownConverter' | 'csvXmlToJsonConverter' | 'codeFormatter' | 'minifier' | 'cssPurifier' | 'iconGenerator' | 'imageToWebpConverter';

export type ToolCategory = 'Generators' | 'JSON' | 'Web' | 'Encoding' | 'Code' | 'Media';

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