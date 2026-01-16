import React from 'react';
import TabSelector from './ui/TabSelector';

interface CheatSheetLayoutProps {
  title: string;
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchPlaceholder: string;
  activeTab: string;
  onTabChange: (tab: string) => void;
  categories: string[];
  children: React.ReactNode;
  sheetTabs?: { value: string; label: string; }[];
  activeSheetTab?: string;
  onSheetTabChange?: (tab: string) => void;
}

const CheatSheetLayout: React.FC<CheatSheetLayoutProps> = ({
  title,
  searchQuery,
  onSearchChange,
  searchPlaceholder,
  activeTab,
  onTabChange,
  categories,
  children,
  sheetTabs,
  activeSheetTab,
  onSheetTabChange
}) => {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h2>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        {sheetTabs && onSheetTabChange && activeSheetTab && (
            <TabSelector 
                options={sheetTabs}
                activeOption={activeSheetTab}
                onSelect={onSheetTabChange}
            />
        )}
        <div className="relative flex-grow">
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={onSearchChange}
              className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md py-2.5 pl-10 pr-4 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label={`Search ${title}`}
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </div>
      </div>

      {categories.length > 0 && (
          <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => onTabChange(category)}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === category ? 'border-indigo-500 text-indigo-500 dark:text-indigo-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-500'}`}
                >
                  {category}
                </button>
              ))}
            </nav>
          </div>
      )}

      <div>
        {children}
      </div>
    </div>
  );
};

export default CheatSheetLayout;
