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
import TimeZoneConverter from './components/TimeZoneConverter';
import TextToMarkdownConverter from './components/TextToMarkdownConverter';
import CsvXmlToJsonConverter from './components/CsvXmlToJsonConverter';
import CssPurifier from './components/CssPurifier';
import IconGenerator from './components/IconGenerator';
import ImageToWebpConverter from './components/ImageToWebpConverter';
import EncoderDecoder from './components/EncoderDecoder';
import CodeOptimizer from './components/CodeOptimizer';
import LinuxReference from './components/LinuxReference';
import HtmlCheatSheet from './components/HtmlCheatSheet';
import CssCheatSheet from './components/CssCheatSheet';
import JavaScriptCheatSheet from './components/JavaScriptCheatSheet';
import PhpCheatSheet from './components/PhpCheatSheet';
import LaravelCheatSheet from './components/LaravelCheatSheet';
import PythonCheatSheet from './components/PythonCheatSheet';
import DrfCheatSheet from './components/DrfCheatSheet';
import HtaccessCheatSheet from './components/HtaccessCheatSheet';
import BashCheatSheet from './components/BashCheatSheet';
import PowerShellCheatSheet from './components/PowerShellCheatSheet';
import GitCheatSheet from './components/GitCheatSheet';
import type { View } from './types';


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
      case 'iconGenerator':
        return <IconGenerator />;
      case 'unixTimestampConverter':
        return <UnixTimestampConverter />;
      case 'timeZoneConverter':
        return <TimeZoneConverter />;
      case 'textToMarkdownConverter':
        return <TextToMarkdownConverter />;
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
      case 'linuxReference':
        return <LinuxReference />;
      case 'htmlCheatSheet':
        return <HtmlCheatSheet />;
      case 'cssCheatSheet':
        return <CssCheatSheet />;
      case 'javaScriptCheatSheet':
        return <JavaScriptCheatSheet />;
      case 'phpCheatSheet':
        return <PhpCheatSheet />;
      case 'laravelCheatSheet':
        return <LaravelCheatSheet />;
      case 'pythonCheatSheet':
        return <PythonCheatSheet />;
      case 'drfCheatSheet':
        return <DrfCheatSheet />;
      case 'htaccessCheatSheet':
        return <HtaccessCheatSheet />;
      case 'bashCheatSheet':
        return <BashCheatSheet />;
      case 'powershellCheatSheet':
        return <PowerShellCheatSheet />;
      case 'gitCheatSheet':
        return <GitCheatSheet />;
      case 'dashboard':
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <Header onNavigate={handleNavigate} />
      <main className="p-4 sm:p-6 lg:p-8">
        {renderView()}
      </main>
    </div>
  );
};

export default App;