
import React from 'react';

const Stat: React.FC<{ label: string, value: number }> = ({ label, value }) => (
    <div className="bg-gray-100 dark:bg-gray-900/50 p-3 rounded-lg text-center">
        <span className="block text-xl font-bold text-gray-900 dark:text-white">{value}</span>
        <span className="text-xs text-gray-500 dark:text-gray-400 uppercase">{label}</span>
    </div>
);

export default React.memo(Stat);
