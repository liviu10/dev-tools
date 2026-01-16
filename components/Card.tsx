import React from 'react';
import type { DevTool } from '../types';

interface CardProps {
  tool: DevTool;
  onClick: (id: DevTool['id']) => void;
}

const Card: React.FC<CardProps> = ({ tool, onClick }) => {
  const cardClasses = tool.enabled
    ? 'bg-gray-800 border-gray-700 hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/10 transform hover:-translate-y-1 cursor-pointer'
    : 'bg-gray-800 border-gray-700 opacity-50 cursor-not-allowed';
  
  const handleClick = () => {
    if (tool.enabled) {
      onClick(tool.id);
    }
  };

  return (
    <div
      className={`p-6 rounded-lg border transition-all duration-300 flex flex-col ${cardClasses}`}
      onClick={handleClick}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-shrink-0">{tool.icon}</div>
        <span className="bg-gray-700 text-gray-300 text-xs font-semibold px-2.5 py-1 rounded-full">{tool.category}</span>
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{tool.name}</h3>
      <p className="text-gray-400 text-sm flex-grow">{tool.description}</p>
    </div>
  );
};

export default Card;