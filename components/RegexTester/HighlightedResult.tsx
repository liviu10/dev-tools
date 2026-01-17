
import React from 'react';

const HighlightedResult: React.FC<{ text: string; matches: RegExpMatchArray[] }> = ({ text, matches }) => {
    if (matches.length === 0) {
        return <div className="whitespace-pre-wrap break-words">{text}</div>;
    }

    const segments = [];
    let lastIndex = 0;

    matches.forEach((match, i) => {
        const { index } = match;
        if (index === undefined) return;

        if (index > lastIndex) {
            segments.push(<span key={`text-${i}`}>{text.substring(lastIndex, index)}</span>);
        }

        segments.push(
            <mark key={`match-${i}`} className="bg-indigo-500/40 text-indigo-100 rounded px-0.5">
                {match[0]}
            </mark>
        );

        lastIndex = index + match[0].length;
    });

    if (lastIndex < text.length) {
        segments.push(<span key="text-end">{text.substring(lastIndex)}</span>);
    }

    return <div className="whitespace-pre-wrap break-words font-mono text-sm leading-6">{segments}</div>;
};

export default React.memo(HighlightedResult);
