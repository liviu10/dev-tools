import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import PasswordGenerator from './components/PasswordGenerator';
import JsonFormatter from './components/JsonFormatter';
import Base64EncoderDecoder from './components/Base64EncoderDecoder';
import JsonCrack from './components/JsonCrack';
import JsonValidator from './components/JsonValidator';
import JsValidator from './components/JsValidator';
import ColorPicker from './components/ColorPicker';
import LoremIpsumGenerator from './components/LoremIpsumGenerator';
import UrlEncoderDecoder from './components/UrlEncoderDecoder';
import JwtDecoder from './components/JwtDecoder';
import HashGenerator from './components/HashGenerator';
import UuidGenerator from './components/UuidGenerator';
import UnixTimestampConverter from './components/UnixTimestampConverter';
import RegexTester from './components/RegexTester';
import FakeDataGenerator from './components/FakeDataGenerator';
import TimeZoneConverter from './components/TimeZoneConverter';
import TextToMarkdownConverter from './components/TextToMarkdownConverter';
import CsvXmlToJsonConverter from './components/CsvXmlToJsonConverter';
import CodeFormatter from './components/CodeFormatter';
import Minifier from './components/Minifier';
import CssPurifier from './components/CssPurifier';
import IconGenerator from './components/IconGenerator';
import ImageToWebpConverter from './components/ImageToWebpConverter';
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
      case 'base64EncoderDecoder':
        return <Base64EncoderDecoder />;
      case 'urlEncoderDecoder':
        return <UrlEncoderDecoder />;
      case 'jwtDecoder':
        return <JwtDecoder />;
      case 'hashGenerator':
        return <HashGenerator />;
      case 'regexTester':
        return <RegexTester />;
      case 'codeFormatter':
        return <CodeFormatter />;
      case 'minifier':
        return <Minifier />;
      case 'cssPurifier':
        return <CssPurifier />;
      case 'imageToWebpConverter':
        return <ImageToWebpConverter />;
      case 'jsonCrack':
        return <JsonCrack />;
      case 'jsonValidator':
        return <JsonValidator />;
      case 'jsValidator':
        return <JsValidator />;
      case 'colorPicker':
        return <ColorPicker />;
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