import React, { useState, useEffect, useMemo } from 'react';
import { getDevTools } from '../services/api';
import Card from './Card';
import type { DevTool, View } from '../types';

interface DashboardProps {
    onNavigate: (view: View) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [tools, setTools] = useState<DevTool[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchTools = async () => {
      setLoading(true);
      const fetchedTools = await getDevTools();
      setTools(fetchedTools);
      setLoading(false);
    };

    fetchTools();
  }, []);

  const categories = useMemo(() => {
    if (loading) return [];
    const uniqueCategories = [...new Set(tools.map(tool => tool.category))];
    return ['All', ...uniqueCategories.sort()];
  }, [tools, loading]);

  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      const categoryMatch = selectedCategory === 'All' || tool.category === selectedCategory;
      const searchMatch = tool.name.toLowerCase().includes(searchQuery.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [tools, searchQuery, selectedCategory]);

  if (loading) {
    return (
        <div className="flex justify-center items-center h-64">
             <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Tools Dashboard</h2>
      
      <div className="mb-8 p-4 bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg">
        <div className="flex flex-col md:flex-row gap-4 md:items-center">
          <div className="relative flex-grow">
            <input
                type="text"
                placeholder="Search tools by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md py-2.5 pl-10 pr-4 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Search tools"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <div className="flex-shrink-0">
             <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-md font-semibold transition text-sm whitespace-nowrap ${selectedCategory === category ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'}`}
                    >
                        {category}
                    </button>
                ))}
            </div>
          </div>
        </div>
      </div>

      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <Card key={tool.name} tool={tool} onClick={onNavigate} />
          ))}
        </div>
      ) : (
          <div className="text-center py-16 px-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
              <h3 className="mt-2 text-xl font-medium text-gray-700 dark:text-gray-300">No tools found</h3>
              <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
      )}
    </div>
  );
};

export default Dashboard;