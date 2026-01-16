import React, { useState, useMemo, useCallback } from 'react';
import { hexToRgb, rgbToHex, rgbToHsl, getContrastColor, generateHarmonies, RGBColor } from '../utils/colorUtils';
import ColorSwatch from './ColorPicker/ColorSwatch';
import ToolLayout from './ui/ToolLayout';

const PRESET_COLORS = [
    '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16', '#22c55e', '#10b981', '#14b8a6',
    '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899'
];

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
        <ToolLayout title="Color Picker" maxWidth="max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Side: Picker & Inputs */}
                <div className="space-y-6">
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
                             <label htmlFor="hex-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">HEX</label>
                             <input
                                id="hex-input"
                                type="text"
                                value={hex}
                                onChange={(e) => updateColorFromHex(e.target.value)}
                                className="w-full bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 font-mono p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                             />
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                             {(['r', 'g', 'b'] as const).map(c => (
                                <div key={c}>
                                    <label htmlFor={`${c}-input`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-center uppercase">{c}</label>
                                    <input
                                        id={`${c}-input`}
                                        type="number"
                                        min="0"
                                        max="255"
                                        value={rgb[c]}
                                        onChange={(e) => handleRgbChange(c, e.target.value)}
                                        className="w-full bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 font-mono p-2 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                            ))}
                        </div>
                         {error && <p className="text-red-500 dark:text-red-400 text-sm col-span-full">{error}</p>}
                    </div>
                    <div>
                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Preset Colors</label>
                         <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
                            {PRESET_COLORS.map(color => (
                                <button
                                    key={color}
                                    className="h-10 w-full rounded-md cursor-pointer transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 focus:ring-white"
                                    style={{ backgroundColor: color }}
                                    onClick={() => updateColorFromHex(color)}
                                    aria-label={`Select color ${color}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side: Palettes */}
                <div className="space-y-4">
                     {Object.entries(harmonies).map(([name, colors]) => {
                        const colorList = colors as string[];
                        return (
                            <div key={name}>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 capitalize">{name}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {colorList.map(color => (
                                        <div key={color} className="flex-1 basis-10 max-w-20">
                                            <ColorSwatch color={color} onClick={handleCopy} copiedColor={copiedColor} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </ToolLayout>
    );
};

export default ColorPicker;