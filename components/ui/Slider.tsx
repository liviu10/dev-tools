
import React from 'react';

interface SliderProps {
    label: string;
    value: number;
    min: number;
    max: number;
    step?: number;
    unit?: string;
    disabled?: boolean;
    onChange: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({ label, value, min, max, step = 1, unit, disabled = false, onChange }) => (
    <div className={disabled ? 'opacity-50' : ''}>
        <label className="text-gray-700 dark:text-gray-300 text-sm mb-2 flex justify-between">
            <span>{label}</span>
            <span className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white text-xs font-semibold w-16 text-center py-0.5 rounded-md">{value}{unit}</span>
        </label>
        <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            disabled={disabled}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:accent-indigo-500 disabled:cursor-not-allowed"
        />
    </div>
);

export default React.memo(Slider);
