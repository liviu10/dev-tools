import React, { useState, useCallback, useRef } from 'react';
import JSZip from 'jszip';

// --- Helper Types ---
interface FileJob {
    id: string;
    file: File;
    originalPreview: string;
    webpBlob: Blob | null;
    webpPreview: string | null;
    isConverting: boolean;
    error: string | null;
}

interface ResizeOptions {
    enabled: boolean;
    maxWidth: number | '';
    maxHeight: number | '';
    lockAspectRatio: boolean;
}

// --- Helper Components (defined inside to keep changes to one file) ---

const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const Slider: React.FC<{ label: string; value: number; min: number; max: number; step?: number; unit?: string; disabled?: boolean; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = 
({ label, value, min, max, step = 1, unit, disabled = false, onChange }) => (
    <div className={disabled ? 'opacity-50' : ''}>
        <label className="text-gray-300 mb-2 flex justify-between text-sm">
            <span>{label}</span>
            <span className="bg-gray-700 text-white text-xs font-semibold w-20 text-center py-0.5 rounded-md">{value}{unit}</span>
        </label>
        <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            disabled={disabled}
            onChange={onChange}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
        />
    </div>
);

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
        <div className="bg-gray-900/50 p-4 rounded-lg flex flex-col sm:flex-row items-center gap-4">
            <img src={job.originalPreview} alt={job.file.name} className="w-20 h-20 object-contain bg-gray-900 rounded-md flex-shrink-0" />
            <div className="flex-grow text-sm text-center sm:text-left">
                <p className="font-semibold text-white truncate">{job.file.name}</p>
                <p className="text-gray-400 font-mono">{formatBytes(job.file.size)}</p>
            </div>
            <div className="flex-shrink-0 w-32 h-20 flex items-center justify-center">
                {job.isConverting && <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>}
                {job.error && <p className="text-red-400 text-xs text-center">{job.error}</p>}
                {job.webpPreview && <img src={job.webpPreview} alt="WebP version" className="w-20 h-20 object-contain bg-gray-900 rounded-md" />}
            </div>
            <div className="flex-shrink-0 w-48 text-center sm:text-right">
                {stats && (
                    <div className="text-sm font-mono">
                        <p className="text-white">{formatBytes(stats.webp)}</p>
                        <p className={`font-bold ${stats.reduction >= 0 ? 'text-green-400' : 'text-red-400'}`}>
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

// --- Main Component ---

const ImageToWebpConverter: React.FC = () => {
    const [jobs, setJobs] = useState<FileJob[]>([]);
    const [quality, setQuality] = useState(80);
    const [lossless, setLossless] = useState(false);
    const [resizeOptions, setResizeOptions] = useState<ResizeOptions>({
        enabled: false, maxWidth: 1920, maxHeight: 1080, lockAspectRatio: true,
    });
    // Advanced (simulated) settings
    const [compressionEffort, setCompressionEffort] = useState(4);
    const [alphaQuality, setAlphaQuality] = useState(100);
    const [denoising, setDenoising] = useState(0);

    const [isConverting, setIsConverting] = useState(false);
    const [isZipping, setIsZipping] = useState(false);
    const [globalError, setGlobalError] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const resetState = useCallback(() => {
        setJobs([]);
        setIsConverting(false);
        setIsZipping(false);
        setGlobalError(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    }, []);

    const handleFileSelect = useCallback((files: FileList | null) => {
        if (!files || files.length === 0) return;
        setGlobalError(null);
        
        const newJobs: FileJob[] = Array.from(files)
            .filter(file => ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml', 'image/bmp', 'image/webp'].includes(file.type))
            .map(file => ({
                id: `${file.name}-${file.lastModified}`,
                file,
                originalPreview: URL.createObjectURL(file),
                webpBlob: null,
                webpPreview: null,
                isConverting: false,
                error: null,
            }));
        
        if (newJobs.length !== files.length) {
            setGlobalError('Some files were ignored. Only JPG, PNG, GIF, SVG, BMP, and WebP are supported.');
        }

        setJobs(newJobs);
    }, []);

    const handleConvert = useCallback(async () => {
        if (jobs.length === 0) return;

        setIsConverting(true);
        setJobs(prevJobs => prevJobs.map(j => ({ ...j, isConverting: true, error: null })));

        const conversionPromises = jobs.map(job => {
            return new Promise<Partial<FileJob> & { id: string }>((resolve) => {
                const img = new Image();
                img.src = job.originalPreview;

                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let targetWidth = img.width;
                    let targetHeight = img.height;

                    if (resizeOptions.enabled) {
                        const w = Number(resizeOptions.maxWidth) || Infinity;
                        const h = Number(resizeOptions.maxHeight) || Infinity;
                        const ratio = Math.min(w / targetWidth, h / targetHeight);
                        if (ratio < 1) {
                            targetWidth = Math.round(targetWidth * ratio);
                            targetHeight = Math.round(targetHeight * ratio);
                        }
                    }
                    
                    canvas.width = targetWidth;
                    canvas.height = targetHeight;
                    const ctx = canvas.getContext('2d');
                    ctx?.drawImage(img, 0, 0, targetWidth, targetHeight);

                    canvas.toBlob(
                        (blob) => {
                            if (blob) {
                                resolve({ id: job.id, webpBlob: blob, webpPreview: URL.createObjectURL(blob) });
                            } else {
                                resolve({ id: job.id, error: 'Browser error.' });
                            }
                        },
                        'image/webp',
                        lossless ? undefined : quality / 100
                    );
                };

                img.onerror = () => resolve({ id: job.id, error: 'Load failed.' });
            });
        });

        const results = await Promise.all(conversionPromises);

        setJobs(prevJobs => prevJobs.map(job => {
            const result = results.find(r => r.id === job.id);
            return { ...job, ...(result || {}), isConverting: false };
        }));

        setIsConverting(false);
    }, [jobs, quality, resizeOptions, lossless]);

    const handleDownloadAll = async () => {
        const completedJobs = jobs.filter(job => job.webpBlob);
        if (completedJobs.length === 0) return;

        setIsZipping(true);

        try {
            const zip = new JSZip();
            for (const job of completedJobs) {
                if (job.webpBlob) {
                    const name = job.file.name.substring(0, job.file.name.lastIndexOf('.')) || job.file.name;
                    zip.file(`${name}.webp`, job.webpBlob);
                }
            }

            const zipBlob = await zip.generateAsync({ type: 'blob' });
            const url = URL.createObjectURL(zipBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'converted_images.zip';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

        } catch (error) {
            console.error("Failed to create zip file", error);
            setGlobalError("Failed to create zip file. Please try downloading individually.");
        } finally {
            setIsZipping(false);
        }
    };

    const handleDragEvents = (e: React.DragEvent<HTMLDivElement>, isOver: boolean) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(isOver);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        handleDragEvents(e, false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFileSelect(e.dataTransfer.files);
            e.dataTransfer.clearData();
        }
    };

    const totalOriginalSize = jobs.reduce((acc, job) => acc + job.file.size, 0);
    const totalWebpSize = jobs.reduce((acc, job) => acc + (job.webpBlob?.size || 0), 0);
    const totalReduction = totalOriginalSize > 0 ? ((totalOriginalSize - totalWebpSize) / totalOriginalSize) * 100 : 0;
    const completedJobs = jobs.filter(j => j.webpBlob).length;
    const isProcessing = isConverting || isZipping;

    return (
        <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-white">Image to WebP Converter</h2>
            <div className="bg-gray-800 p-6 rounded-lg shadow-2xl border border-gray-700 space-y-6">
                {jobs.length === 0 && (
                    <div
                        onDragOver={(e) => handleDragEvents(e, true)}
                        onDragLeave={(e) => handleDragEvents(e, false)}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`p-10 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${isDragging ? 'border-indigo-400 bg-gray-700/50' : 'border-gray-600 hover:border-gray-500'}`}
                    >
                         <input type="file" ref={fileInputRef} onChange={(e) => handleFileSelect(e.target.files)} className="hidden" accept="image/png, image/jpeg, image/gif, image/svg+xml, image/webp, image/bmp" multiple />
                         <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        <p className="mt-2 text-sm text-gray-300">Drag & drop images here, or <span className="font-semibold text-indigo-400">click to browse</span></p>
                        <p className="text-xs text-gray-500 mt-1">Supports batch conversion for JPG, PNG, GIF, SVG, WebP, BMP</p>
                    </div>
                )}
                
                {globalError && (
                    <div className="p-3 bg-red-900/50 text-red-300 border border-red-700 rounded-lg text-sm">
                        <strong>Error:</strong> {globalError}
                    </div>
                )}

                {jobs.length > 0 && (
                    <>
                        {/* --- CONTROLS --- */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-4 bg-gray-900/50 rounded-lg space-y-4">
                                <Slider label="Quality" value={quality} min={0} max={100} disabled={lossless} onChange={(e) => setQuality(Number(e.target.value))} />
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 rounded bg-gray-700 border-gray-500 text-indigo-500 focus:ring-indigo-600" checked={lossless} onChange={(e) => setLossless(e.target.checked)} />
                                    <span className="text-gray-300 font-semibold text-sm">Lossless Compression</span>
                                </label>
                                 <label className="flex items-center space-x-3 cursor-not-allowed opacity-75">
                                    <input type="checkbox" className="w-4 h-4 rounded bg-gray-700 border-gray-500" checked disabled />
                                    <span className="text-gray-400 text-sm">Strip Metadata (Default & Recommended)</span>
                                </label>
                            </div>
                             <div className="p-4 bg-gray-900/50 rounded-lg space-y-4">
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 rounded bg-gray-700 border-gray-500 text-indigo-500 focus:ring-indigo-600" checked={resizeOptions.enabled} onChange={(e) => setResizeOptions(p => ({...p, enabled: e.target.checked}))} />
                                    <span className="text-gray-300 font-semibold text-sm">Resize Image</span>
                                </label>
                                <div className={`grid grid-cols-2 gap-4 items-center pl-7 ${!resizeOptions.enabled && 'opacity-50'}`}>
                                    <input type="number" placeholder="Max Width" value={resizeOptions.maxWidth} onChange={(e) => setResizeOptions(p => ({...p, maxWidth: e.target.value ? parseInt(e.target.value) : ''}))} disabled={!resizeOptions.enabled} className="w-full bg-gray-700 p-2 rounded-md text-sm" />
                                    <input type="number" placeholder="Max Height" value={resizeOptions.maxHeight} onChange={(e) => setResizeOptions(p => ({...p, maxHeight: e.target.value ? parseInt(e.target.value) : ''}))} disabled={!resizeOptions.enabled} className="w-full bg-gray-700 p-2 rounded-md text-sm" />
                                </div>
                            </div>
                            <details className="md:col-span-2 p-4 bg-gray-900/50 rounded-lg group">
                                <summary className="cursor-pointer text-gray-300 font-semibold text-sm list-none flex items-center justify-between">
                                    Advanced Settings
                                    <span className="text-gray-500 group-hover:text-gray-300 text-xs flex items-center">
                                        Note: Browser support for these features may vary.
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                    </span>
                                </summary>
                                <div className="mt-4 space-y-4 pt-4 border-t border-gray-700 grid grid-cols-1 sm:grid-cols-3 gap-6">
                                   <Slider label="Compression Effort" value={compressionEffort} min={0} max={6} onChange={(e) => setCompressionEffort(Number(e.target.value))} />
                                   <Slider label="Alpha Quality" value={alphaQuality} min={0} max={100} onChange={(e) => setAlphaQuality(Number(e.target.value))} />
                                   <Slider label="Denoising" value={denoising} min={0} max={100} onChange={(e) => setDenoising(Number(e.target.value))} />
                                </div>
                            </details>
                        </div>

                        {/* --- FILE LIST --- */}
                        <div className="space-y-3 max-h-[26rem] overflow-y-auto p-1">
                             {jobs.map(job => <FileListItem key={job.id} job={job} />)}
                        </div>
                        
                        {/* --- TOTALS --- */}
                        {completedJobs > 0 && (
                             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center border-t border-gray-700 pt-4">
                                <div className="bg-gray-900/50 p-3 rounded-lg">
                                    <span className="block text-sm text-gray-400">Original Total</span>
                                    <span className="text-lg font-bold text-white">{formatBytes(totalOriginalSize)}</span>
                                </div>
                                <div className="bg-gray-900/50 p-3 rounded-lg">
                                    <span className="block text-sm text-gray-400">WebP Total</span>
                                    <span className="text-lg font-bold text-white">{formatBytes(totalWebpSize)}</span>
                                </div>
                                <div className="bg-gray-900/50 p-3 rounded-lg">
                                    <span className="block text-sm text-gray-400">Total Reduction</span>
                                    <span className={`text-lg font-bold ${totalReduction > 0 ? 'text-green-400' : 'text-white'}`}>
                                        {totalReduction.toFixed(2)}%
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* --- ACTIONS --- */}
                        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-4 border-t border-gray-700">
                            <button 
                                onClick={handleConvert} 
                                disabled={isProcessing} 
                                className="w-full sm:w-auto flex-1 bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transition disabled:opacity-50"
                            >
                                {isConverting ? `Converting (${completedJobs}/${jobs.length})...` : `Convert ${jobs.length} Image(s)`}
                            </button>
                            <button 
                                onClick={handleDownloadAll} 
                                disabled={isProcessing || completedJobs === 0}
                                className="w-full sm:w-auto flex-1 bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green-500 transition disabled:opacity-50"
                            >
                                {isZipping ? 'Zipping...' : 'Download All (.zip)'}
                            </button>
                            <button 
                                onClick={resetState} 
                                disabled={isProcessing}
                                className="w-full sm:w-auto flex-1 bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-red-500 transition disabled:opacity-50"
                            >
                                Clear All
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ImageToWebpConverter;
