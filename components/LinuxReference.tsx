import React, { useState } from 'react';
import CommandExplainer from './LinuxReference/CommandExplainer';
import PermissionsExplainer from './LinuxReference/PermissionsExplainer';
import FilesystemExplainer from './LinuxReference/FilesystemExplainer';

type Tab = 'command' | 'permissions' | 'filesystem';

const LinuxReference: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('command');
    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Linux Reference</h2>
            </div>
            <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
                <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                    <button onClick={() => setActiveTab('command')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'command' ? 'border-indigo-500 text-indigo-500 dark:text-indigo-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-500'}`}>Command Explainer</button>
                    <button onClick={() => setActiveTab('permissions')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'permissions' ? 'border-indigo-500 text-indigo-500 dark:text-indigo-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-500'}`}>Permissions Calculator</button>
                    <button onClick={() => setActiveTab('filesystem')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === 'filesystem' ? 'border-indigo-500 text-indigo-500 dark:text-indigo-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-500'}`}>Filesystem Explorer</button>
                </nav>
            </div>
            <div>
                {activeTab === 'command' && <CommandExplainer />}
                {activeTab === 'permissions' && <PermissionsExplainer />}
                {activeTab === 'filesystem' && <FilesystemExplainer />}
            </div>
        </div>
    );
};

export default LinuxReference;
