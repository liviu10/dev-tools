
import React from 'react';

interface CheatSheetItem {
  name: string;
  description: string;
  example: string;
  version?: string;
  [key: string]: any;
}

interface CheatSheetSectionProps {
  items: CheatSheetItem[];
  versionPrefix?: string;
}

const CheatSheetSection: React.FC<CheatSheetSectionProps> = ({ items, versionPrefix }) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-16 px-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
        <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <h3 className="mt-2 text-xl font-medium text-gray-700 dark:text-gray-300">No Results Found</h3>
        <p className="mt-1 text-sm text-gray-500">Try adjusting your search or selected category.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {items.map(item => (
        <div key={item.name} className="bg-white dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <code className="text-lg font-bold text-green-600 dark:text-green-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{item.name}</code>
            {item.version && versionPrefix && (
              <span className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-semibold px-2.5 py-1 rounded-full">
                {versionPrefix} {item.version}
              </span>
            )}
          </div>
          <p className="text-gray-700 dark:text-gray-300 mt-2 mb-3 text-sm">{item.description}</p>
          <div>
            <h5 className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold mb-1">Example</h5>
            <pre className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md border border-gray-200 dark:border-gray-600">
              <code className="text-sm text-gray-800 dark:text-gray-200 font-mono whitespace-pre-wrap">{item.example}</code>
            </pre>
          </div>
        </div>
      ))}
    </div>
  );
};

export default React.memo(CheatSheetSection);
