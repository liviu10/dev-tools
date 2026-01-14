export const convertToMarkdown = (text: string): string => {
    const lines = text.split('\n');
    const processedLines = lines.map(line => {
        const trimmed = line.trim();
        
        // Preserve existing Markdown list items and blockquotes
        if (trimmed.startsWith('* ') || trimmed.startsWith('- ') || trimmed.startsWith('+ ')) {
            return line;
        }
        if (/^\d+[.)] /.test(trimmed)) {
            return line;
        }
        if (trimmed.startsWith('> ')) {
            return line;
        }
        // Preserve empty lines for paragraph breaks
        if (trimmed === '') {
            return '';
        }

        // Heuristic for headings: short lines without punctuation at the end
        const hasPunctuation = /[.,;:]$/.test(trimmed);
        if (trimmed.length > 0 && trimmed.length < 50 && !hasPunctuation) {
            return `## ${line}`;
        }
        
        // Default to a regular line of text
        return line;
    });

    return processedLines.join('\n');
};