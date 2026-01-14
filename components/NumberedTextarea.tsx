
import React, { useRef } from 'react';

interface NumberedTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    containerClassName?: string;
}

const NumberedTextarea: React.FC<NumberedTextareaProps> = ({ value, containerClassName, ...rest }) => {
    const lineNumbersRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const lineCount = value ? String(value).split('\n').length : 1;
    const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

    const handleScroll = () => {
        if (lineNumbersRef.current && textareaRef.current) {
            lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
        }
    };
    
    // Shared styles for alignment. Important: must match line-height, font, padding-top.
    const sharedTextStyles = 'font-mono text-sm leading-6 pt-3 pb-3';

    return (
        <div className={`flex w-full h-full bg-gray-900 border rounded-lg focus-within:ring-2 focus-within:ring-opacity-50 overflow-hidden ${containerClassName}`}>
            <div
                ref={lineNumbersRef}
                className={`w-12 text-right pr-2 text-gray-500 select-none overflow-y-hidden ${sharedTextStyles}`}
                aria-hidden="true"
            >
                {lineNumbers.map(num => (
                    <div key={num}>{num}</div>
                ))}
            </div>
            <textarea
                ref={textareaRef}
                value={value}
                onScroll={handleScroll}
                className={`flex-1 bg-transparent focus:outline-none resize-none text-gray-100 ${sharedTextStyles} pl-2`}
                spellCheck="false"
                {...rest}
            />
        </div>
    );
};

export default NumberedTextarea;
