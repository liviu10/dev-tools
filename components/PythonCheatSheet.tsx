import React, { useState, useMemo } from 'react';
import { pythonData } from '../data/pythonCheatSheet';
import type { PythonCheatSheetItem } from '../data/pythonCheatSheet';

type Tab = PythonCheatSheetItem['category'] | 'All';

const CheatSheetSection: React.FC<{ items: PythonCheatSheetItem[] }> = ({ items }) => (
    <div className="space-y-8">
        {items.map(item => (
            <div key={item.name} className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between flex-wrap gap-2">
                    <code className="text-lg font-bold text-green-400 bg-gray-800 px-2 py-1 rounded">{item.name}</code>
                    {item.version && (
                        <span className="text-xs bg-gray-700 text-gray-300 font-semibold px-2.5 py-1 rounded-full">
                            Python {item.version}
                        </span>
                    )}
                </div>
                <p className="text-gray-300 mt-2 mb-3 text-sm">{item.description}</p>
                <div>
                    <h5 className="text-xs text-gray-400 uppercase font-semibold mb-1">Example</h5>
                    <pre className="bg-gray-800 p-3 rounded-md border border-gray-600">
                        <code className="text-sm text-gray-200 font-mono whitespace-pre-wrap">{item.example}</code>
                    </pre>
                </div>
            </div>
        ))}
    </div>
);

const PythonCheatSheet: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('All');
    const [searchQuery, setSearchQuery] = useState('');

    const categories = useMemo(() => {
        const uniqueCategories = [...new Set(pythonData.map(item => item.category))];
        const orderedCategories = [
            'Syntax & Variables', 'Data Types', 'Operators', 'Control Flow', 'Functions',
            'Lists', 'Dictionaries', 'Classes (OOP)', 'File I/O', 'Modules & Packages',
            'Exception Handling', 'Comprehensions'
        ];
        const sorted = uniqueCategories.sort((a, b) => {
            const indexA = orderedCategories.indexOf(a);
            const indexB = orderedCategories.indexOf(b);
            if (indexA === -1) return 1;
            if (indexB === -1) return -1;
            return indexA - indexB;
        });
        return ['All', ...sorted] as Tab[];
    }, []);

    const filteredItems = useMemo(() => {
        let items: PythonCheatSheetItem[];
        
        if (activeTab === 'All') {
            items = pythonData;
        } else {
            items = pythonData.filter(item => item.category === activeTab);
        }

        if (searchQuery.trim() !== '') {
            const lowercasedQuery = searchQuery.toLowerCase();
            return items.filter(item =>
                item.name.toLowerCase().includes(lowercasedQuery) ||
                item.description.toLowerCase().includes(lowercasedQuery)
            );
        }

        return items;
    }, [activeTab, searchQuery]);

    return (
        <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-white">Python Cheat Sheet</h2>

            <div className="mb-6 relative">
                 <input
                    type="text"
                    placeholder="Search syntax, functions, keywords..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-600 rounded-md py-2.5 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    aria-label="Search Python syntax"
                />
                 <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>

            <div className="mb-6 border-b border-gray-700">
                <nav className="-mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
                    {categories.map(category => (
                         <button 
                            key={category}
                            onClick={() => setActiveTab(category)} 
                            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === category ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'}`}
                        >
                            {category}
                        </button>
                    ))}
                </nav>
            </div>
            
            <div>
                {filteredItems.length > 0 ? (
                     <CheatSheetSection items={filteredItems} />
                ) : (
                    <div className="text-center py-16 px-6 bg-gray-800 border border-gray-700 rounded-lg">
                        <svg className="mx-auto h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <h3 className="mt-2 text-xl font-medium text-gray-300">No Results Found</h3>
                        <p className="mt-1 text-sm text-gray-500">Try adjusting your search or selected category.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PythonCheatSheet;