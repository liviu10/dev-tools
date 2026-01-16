import React, { useState } from 'react';
import { FILESYSTEM_DATA, FilesystemEntry } from '../data/linuxFilesystem';

const FolderIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
);

const LinuxFilesystemExplainer: React.FC = () => {
    const [selectedPath, setSelectedPath] = useState<string>('/');
    const selectedEntry = FILESYSTEM_DATA.find(entry => entry.path === selectedPath);

    return (
        <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-white">Linux Filesystem Explainer</h2>
            <div className="bg-gray-800 rounded-lg shadow-2xl border border-gray-700 grid grid-cols-1 md:grid-cols-3">
                
                {/* Left Panel: Directory List */}
                <div className="md:col-span-1 border-r border-gray-700">
                    <div className="p-4 border-b border-gray-700">
                        <h3 className="text-lg font-semibold text-white">Filesystem Hierarchy</h3>
                    </div>
                    <ul className="max-h-96 md:max-h-[32rem] overflow-y-auto">
                        {FILESYSTEM_DATA.map(entry => (
                            <li key={entry.path}>
                                <button
                                    onClick={() => setSelectedPath(entry.path)}
                                    className={`w-full text-left p-3 flex items-center transition-colors font-mono text-sm ${
                                        selectedPath === entry.path
                                            ? 'bg-indigo-600 text-white'
                                            : 'text-gray-300 hover:bg-gray-700/50'
                                    }`}
                                >
                                    <FolderIcon />
                                    {entry.path}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right Panel: Details */}
                <div className="md:col-span-2 p-6">
                    {selectedEntry ? (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-3xl font-bold font-mono text-indigo-300">{selectedEntry.path}</h3>
                                <p className="mt-2 text-gray-300">{selectedEntry.description}</p>
                            </div>

                            <div>
                                <h4 className="font-semibold text-gray-200 mb-2">Typical Contents</h4>
                                <div className="bg-gray-900/70 p-3 rounded-lg">
                                    <code className="text-sm text-gray-400 whitespace-pre-wrap">
                                        {selectedEntry.contains.join(', ')}
                                    </code>
                                </div>
                            </div>
                            
                            <div>
                                <h4 className="font-semibold text-gray-200 mb-2">Key Info</h4>
                                <div className="bg-gray-900/70 p-4 rounded-lg flex items-start space-x-3">
                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className="text-sm text-gray-300">{selectedEntry.keyInfo}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-gray-500">Select a directory to see its details.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LinuxFilesystemExplainer;