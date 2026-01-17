
import React from 'react';
import type { View } from '../types';

interface HeaderProps {
  onNavigate: (view: View) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md transition-colors duration-300">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={() => onNavigate('dashboard')}
              className="flex-shrink-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 focus:ring-indigo-500 rounded-md p-1"
              aria-label="Go to dashboard"
            >
              <h1 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
                <span className="text-indigo-600 dark:text-indigo-400">Dev</span>Tools
              </h1>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default React.memo(Header);
