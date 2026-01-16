import React from 'react';
import { hexToRgb, getContrastColor } from '../../utils/colorUtils';

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

export default ColorSwatch;