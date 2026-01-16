import React from 'react';

interface ToolLayoutProps {
    title: string;
    children: React.ReactNode;
    maxWidth?: string; // e.g., 'max-w-4xl', 'max-w-7xl'
}

const ToolLayout: React.FC<ToolLayoutProps> = ({ title, children, maxWidth = 'max-w-4xl' }) => {
    return (
        <div className={`${maxWidth} mx-auto`}>
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">{title}</h2>
            <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700">
                {children}
            </div>
        </div>
    );
};

export default ToolLayout;