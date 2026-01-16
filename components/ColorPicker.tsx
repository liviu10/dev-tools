
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { hexToRgb, rgbToHex, rgbToHsl, getContrastColor, generateHarmonies, RGBColor } from '../utils/colorUtils';

const PRESET_COLORS = [
    '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16', '#22c55e', '#10b981', '#14b8a6',
    '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899'
];

interface ColorSwatchProps {
    color: string;
    onClick: (color: string) => void;
    copiedColor: string | null;
}

const ColorSwatch: React.FC<ColorSwatchProps> = React.memo(({ color, onClick, copiedColor }) => {
    // Fix: A spread argument must either have a tuple type or be passed to a rest parameter.
    // Instead of using the spread operator on Object.values, which is not type-safe,
    // we get the RGB object from hexToRgb and pass its properties to getContrastColor.
    const rgb = hexToRgb(color);
    const contrast = rgb ? getContrastColor(rgb.r, rgb.g, rgb.b) : '#FFFFFF';
    const isCopied = copiedColor === color;

    return (
        <div
            onClick={() => onClick(color)}
            className="relative h-16 w-full rounded-md cursor-pointer transition-transform transform hover:scale-105"
            style={{ backgroundColor: color }}
        >
            <div className="absolute inset-0 flex items-center justify-center p-2 opacity-0 hover:opacity-100 bg-black/30 transition-opacity rounded-md">
                <span className="font-mono text-sm" style={{ color: contrast }}>
                    {color}
                </span>
            </div>
            {isCopied && (
                 <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                 </div>
            )}
        </div>
    );
});


const ColorPicker: React.FC = () => {
    const [hex, setHex] = useState('#6366f1');
    const [rgb, setRgb] = useState<RGBColor>({ r: 99, g: 102, b: 241 });
    const [copiedColor, setCopiedColor] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const updateColorFromHex = useCallback((newHex: string) => {
        const newRgb = hexToRgb(newHex);
        if (newRgb) {
            setHex(newHex);
            setRgb(newRgb);
            setError(null);
        } else {
            setError('Invalid HEX code');
        }
    }, []);

    const updateColorFromRgb = useCallback((newRgb: RGBColor) => {
        const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
        setRgb(newRgb);
        setHex(newHex);
    }, []);

    const hsl = useMemo(() => rgbToHsl(rgb.r, rgb.g, rgb.b), [rgb]);
    const contrastColor = useMemo(() => getContrastColor(rgb.r, rgb.g, rgb.b), [rgb]);
    const harmonies = useMemo(() => generateHarmonies(hsl), [hsl]);

    const handleCopy = useCallback((color: string) => {
        navigator.clipboard.writeText(color);
        setCopiedColor(color);
        setTimeout(() => setCopiedColor(null), 1500);
    }, []);
    
    const handleRgbChange = (component: 'r' | 'g' | 'b', value: string) => {
        const numValue = parseInt(value, 10);
        if(!isNaN(numValue) && numValue >= 0 && numValue <= 255) {
            updateColorFromRgb({ ...rgb, [component]: numValue });
        }
    };


    return (
        <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-white">Color Picker</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Side: Picker & Inputs */}
                <div className="bg-gray-800 p-6 rounded-lg shadow-2xl border border-gray-700 space-y-6">
                    <div
                        className="w-full h-48 rounded-lg flex flex-col items-center justify-center transition-colors duration-300"
                        style={{ backgroundColor: hex }}
                    >
                         <div className="font-mono text-center" style={{ color: contrastColor }}>
                            <p className="text-2xl font-bold tracking-widest">{hex}</p>
                            <p>rgb({rgb.r}, {rgb.g}, {rgb.b})</p>
                            <p>hsl({Math.round(hsl.h)}, {Math.round(hsl.s * 100)}%, {Math.round(hsl.l * 100)}%)</p>
                        </div>
                    </div>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                             <label htmlFor="hex-input" className="block text-sm font-medium text-gray-300 mb-2">HEX</label>
                             <input
                                id="hex-input"
                                type="text"
                                value={hex}
                                onChange={(e) => updateColorFromHex(e.target.value)}
                                className="w-full bg-gray-900 border border-gray-600 font-mono p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                             />
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                             {(['r', 'g', 'b'] as const).map(c => (
                                <div key={c}>
                                    <label htmlFor={`${c}-input`} className="block text-sm font-medium text-gray-300 mb-2 text-center uppercase">{c}</label>
                                    <input
                                        id={`${c}-input`}
                                        type="number"
                                        min="0"
                                        max="255"
                                        value={rgb[c]}
                                        onChange={(e) => handleRgbChange(c, e.target.value)}
                                        className="w-full bg-gray-900 border border-gray-600 font-mono p-2 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                            ))}
                        </div>
                         {error && <p className="text-red-400 text-sm col-span-full">{error}</p>}
                    </div>
                    <div>
                         <label className="block text-sm font-medium text-gray-300 mb-2">Preset Colors</label>
                         <div className="grid grid-cols-8 gap-2">
                            {PRESET_COLORS.map(color => (
                                <button
                                    key={color}
                                    className="h-10 w-full rounded-md cursor-pointer transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                    style={{ backgroundColor: color }}
                                    onClick={() => updateColorFromHex(color)}
                                    aria-label={`Select color ${color}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side: Palettes */}
                <div className="bg-gray-800 p-6 rounded-lg shadow-2xl border border-gray-700 space-y-4">
                     {Object.entries(harmonies).map(([name, colors]) => {
                        // Fix: Property 'length' and 'map' do not exist on type 'unknown'.
                        // Object.entries can produce a value of type 'unknown' in strict mode.
                        // We cast 'colors' to string[] as we know the shape of the 'harmonies' object.
                        const colorList = colors as string[];
                        return (
                            <div key={name}>
                                <h3 className="text-lg font-semibold text-white mb-2 capitalize">{name}</h3>
                                <div className={`grid grid-cols-${colorList.length} gap-2`}>
                                    {colorList.map(color => (
                                        <ColorSwatch key={color} color={color} onClick={handleCopy} copiedColor={copiedColor} />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ColorPicker;
