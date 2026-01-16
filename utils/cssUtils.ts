export interface UsedSelectors {
    tags: Set<string>;
    classes: Set<string>;
    ids: Set<string>;
}

export const getUsedSelectors = (html: string): UsedSelectors => {
    const tags = new Set<string>();
    const classes = new Set<string>();
    const ids = new Set<string>();

    if (!html) return { tags, classes, ids };

    const doc = new DOMParser().parseFromString(html, 'text/html');
    doc.querySelectorAll('*').forEach(el => {
        tags.add(el.tagName.toLowerCase());
        if (el.id) ids.add(el.id);
        el.classList.forEach(cls => classes.add(cls));
    });

    return { tags, classes, ids };
};

const isSelectorUsed = (selector: string, used: UsedSelectors): boolean => {
    const trimmedSelector = selector.trim();
    // Safelist complex selectors, pseudo-classes/elements, and attribute selectors to be safe.
    if (/[ >+~:[\]*]/.test(trimmedSelector)) {
        return true;
    }
    // It's a simple selector
    if (trimmedSelector.startsWith('.')) {
        return used.classes.has(trimmedSelector.slice(1));
    }
    if (trimmedSelector.startsWith('#')) {
        return used.ids.has(trimmedSelector.slice(1));
    }
    // It's a tag selector
    return used.tags.has(trimmedSelector.toLowerCase());
};

export const purifyCss = (css: string, used: UsedSelectors): string => {
    // This regex is a naive approach and might fail on complex nested structures,
    // but it works for top-level rules and media queries.
    // It captures the selector group, the content, and handles @media blocks.
    const ruleRegex = /(?:@media[^{]+\{([\s\S]*?)\}|([^{}]+)\{([\s\S]*?)\})/g;

    return css.replace(ruleRegex, (match, mediaContent, topLevelSelector, topLevelStyles) => {
        if (mediaContent) {
            // It's a media query block, purify its content recursively
            const purifiedMediaContent = purifyCss(mediaContent, used);
            return purifiedMediaContent ? match.replace(mediaContent, purifiedMediaContent) : '';
        }

        if (topLevelSelector) {
            // It's a standard rule
            const selectors = topLevelSelector.split(',').map(s => s.trim());
            const isAnySelectorUsed = selectors.some(s => isSelectorUsed(s, used));

            if (isAnySelectorUsed) {
                return match; // Keep the whole rule
            } else {
                return ''; // Discard the rule
            }
        }
        
        return ''; // Should not happen
    }).replace(/\n\s*\n/g, '\n'); // Clean up empty lines
};
