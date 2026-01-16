import React from 'react';
import type { FileJob } from '../ImageToWebpConverter';
import { formatBytes } from '../../utils/formatters';

const FileListItem: React.FC<{ job: FileJob }> = ({ job }) => {
    const stats = job.webpBlob && job.file ? {
        original: job.file.size,
        webp: job.webpBlob.size,
        reduction: job.file.size > 0 ? ((job.file.size - job.webpBlob.size) / job.file.size) * 100 : 0
    } : null;

    const handleDownload = () => {
        if (!job.webpBlob || !job.file) return;
        const url = URL.createObjectURL(job.webpBlob);
        const link = document.createElement('a');
        link.href = url;
        const name = job.file.name.substring(0, job.file.name.lastIndexOf('.')) || job.file.name;
        link.download = `${name}.webp`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="bg-white dark:bg-gray-900/50 p-4 rounded-lg flex flex-col sm:flex-row items-center gap-4">
            <img src={job.originalPreview} alt={job.file.name} className="w-20 h-20 object-contain bg-gray-100 dark:bg-gray-900 rounded-md flex-shrink-0" />
            <div className="flex-grow text-sm text-center sm:text-left">
                <p className="font-semibold text-gray-900 dark:text-white truncate">{job.file.name}</p>
                <p className="text-gray-500 dark:text-gray-400 font-mono">{formatBytes(job.file.size)}</p>
            </div>
            <div className="flex-shrink-0 w-32 h-20 flex items-center justify-center">
                {job.isConverting && <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>}
                {job.error && <p className="text-red-500 dark:text-red-400 text-xs text-center">{job.error}</p>}
                {job.webpPreview && <img src={job.webpPreview} alt="WebP version" className="w-20 h-20 object-contain bg-gray-100 dark:bg-gray-900 rounded-md" />}
            </div>
            <div className="flex-shrink-0 w-48 text-center sm:text-right">
                {stats && (
                    <div className="text-sm font-mono">
                        <p className="text-gray-900 dark:text-white">{formatBytes(stats.webp)}</p>
                        <p className={`font-bold ${stats.reduction >= 0 ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
                            {stats.reduction.toFixed(2)}%
                        </p>
                    </div>
                )}
                {job.webpBlob && (
                    <button onClick={handleDownload} className="mt-2 text-xs bg-green-600 hover:bg-green-700 text-white font-bold py-1.5 px-3 rounded-md">
                        Download
                    </button>
                )}
            </div>
        </div>
    );
};

export default FileListItem;