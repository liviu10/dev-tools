import React, { useState, useMemo, useCallback } from 'react';
import { heroicons, HeroIcon } from '../data/heroicons';

const Slider: React.FC<{ label: string; value: number; min: number; max: number; step?: number; unit?: string; onChange: (value: number) => void }> = 
({ label, value, min, max, step = 1, unit, onChange }) => (
    <div>
        <label className="text-gray-300 text-sm mb-2 flex justify-between">
            <span>{label}</span>
            <span className="bg-gray-700 text-white text-xs font-semibold w-16 text-center py-0.5 rounded-md">{value}{unit}</span>
        </label>
        <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
        />
    </div>
);

const IconGenerator: React.FC = () => {
    const [search, setSearch] = useState('');
    const [selectedIcon, setSelectedIcon] = useState<HeroIcon>(heroicons[0]);
    const [size, setSize] = useState(48);
    const [strokeWidth, setStrokeWidth] = useState(1.5);
    const [color, setColor] = useState('currentColor');
    const [copied, setCopied] = useState<'svg' | 'jsx' | null>(null);

    const filteredIcons = useMemo(() => {
        if (!search) return heroicons;
        return heroicons.filter(icon => icon.name.toLowerCase().includes(search.toLowerCase()));
    }, [search]);

    const { svgCode, jsxCode } = useMemo(() => {
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" fill="none" viewBox="0 0 24 24" stroke-width="${strokeWidth}" stroke="${color}" aria-hidden="true">
  <path stroke-linecap="round" stroke-linejoin="round" d="${selectedIcon.path}" />
</svg>`;
        const jsx = `const ${selectedIcon.name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')}Icon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={${size}} height={${size}} fill="none" viewBox="0 0 24 24" strokeWidth={${strokeWidth}} stroke="${color}" aria-hidden="true" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="${selectedIcon.path}" />
  </svg>
);`;
        return { svgCode: svg, jsxCode: jsx };
    }, [selectedIcon, size, strokeWidth, color]);
    
    const handleCopy = useCallback((type: 'svg' | 'jsx') => {
        const textToCopy = type === 'svg' ? svgCode : jsxCode;
        navigator.clipboard.writeText(textToCopy);
        setCopied(type);
        setTimeout(() => setCopied(null), 2000);
    }, [svgCode, jsxCode]);

    return (
        <div className="max-w-7xl mx-auto">
             <h2 className="text-3xl font-bold mb-6 text-white">SVG Icon Generator</h2>
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                 {/* Left: Library */}
                 <div className="lg:col-span-1 bg-gray-800 p-4 rounded-lg shadow-2xl border border-gray-700">
                     <div className="relative mb-4">
                         <input
                            type="text"
                            placeholder="Search icons..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-gray-900 border border-gray-600 rounded-md py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            aria-label="Search icons"
                        />
                         <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <div className="grid grid-cols-5 gap-2 max-h-[600px] overflow-y-auto pr-2">
                        {filteredIcons.map(icon => (
                            <button
                                key={icon.name}
                                onClick={() => setSelectedIcon(icon)}
                                title={icon.name}
                                className={`p-2 rounded-md transition ${selectedIcon.name === icon.name ? 'bg-indigo-600 ring-2 ring-indigo-400' : 'bg-gray-900 hover:bg-gray-700'}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full text-gray-200">
                                  <path strokeLinecap="round" strokeLinejoin="round" d={icon.path} />
                                </svg>
                            </button>
                        ))}
                    </div>
                 </div>

                {/* Right: Preview & Code */}
                <div className="lg:col-span-2 bg-gray-800 p-6 rounded-lg shadow-2xl border border-gray-700 space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold text-white mb-4">Preview</h3>
                         <div className="w-full min-h-[12rem] bg-gray-900 border border-dashed border-gray-600 rounded-lg p-4 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 24 24" strokeWidth={strokeWidth} stroke={color} className="text-gray-100">
                                <path strokeLinecap="round" strokeLinejoin="round" d={selectedIcon.path} />
                            </svg>
                        </div>
                    </div>
                    <div>
                         <h3 className="text-xl font-semibold text-white mb-4">Customize</h3>
                         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <Slider label="Size" value={size} min={16} max={128} unit="px" onChange={setSize} />
                            <Slider label="Stroke" value={strokeWidth} min={0.5} max={3} step={0.25} onChange={setStrokeWidth} />
                            <div>
                                <label htmlFor="color-input" className="text-gray-300 text-sm mb-2 block">Color</label>
                                <div className="relative">
                                     <input
                                        id="color-input"
                                        type="text"
                                        value={color}
                                        onChange={(e) => setColor(e.target.value)}
                                        className="w-full bg-gray-900 border border-gray-600 font-mono p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
                                    />
                                    <input
                                        type="color"
                                        value={color.startsWith('#') ? color : '#ffffff'}
                                        onChange={(e) => setColor(e.target.value)}
                                        className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 p-1 bg-transparent border-none cursor-pointer appearance-none"
                                        aria-label="Color picker"
                                    />
                                </div>
                            </div>
                         </div>
                    </div>
                     <div className="space-y-4">
                        <div>
                             <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-medium text-gray-300">SVG Code</label>
                                <button onClick={() => handleCopy('svg')} className="text-sm bg-gray-700 text-gray-300 hover:bg-gray-600 px-3 py-1 rounded-md transition">
                                    {copied === 'svg' ? 'Copied!' : 'Copy SVG'}
                                </button>
                            </div>
                            <textarea readOnly value={svgCode} className="w-full h-32 font-mono text-sm bg-gray-900 border border-gray-600 rounded-lg p-3 focus:outline-none resize-none" />
                        </div>
                         <div>
                             <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-medium text-gray-300">JSX</label>
                                <button onClick={() => handleCopy('jsx')} className="text-sm bg-gray-700 text-gray-300 hover:bg-gray-600 px-3 py-1 rounded-md transition">
                                    {copied === 'jsx' ? 'Copied!' : 'Copy JSX'}
                                </button>
                            </div>
                            <textarea readOnly value={jsxCode} className="w-full h-32 font-mono text-sm bg-gray-900 border border-gray-600 rounded-lg p-3 focus:outline-none resize-none" />
                        </div>
                    </div>
                </div>
             </div>
        </div>
    );
};

export default IconGenerator;
