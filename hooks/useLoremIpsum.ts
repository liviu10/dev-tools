
import { useState, useCallback } from 'react';

const DICTIONARY = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'curabitur', 'vitae', 'hendrerit', 'pede', 'vel', 'erat', 'et', 'tristique', 'nisi', 'fusce', 'in', 'felis', 'eu', 'nibh', 'elementum', 'blandit', 'etiam', 'velit', 'mauris', 'vulputate', 'aliquam', 'sapien', 'auctor', 'quis', 'convallis', 'eget', 'dictum', 'non', 'nulla', 'sed', 'tortor', 'lectus', 'urna', 'duis', 'at', 'arcu', 'ac', 'turpis', 'egestas', 'aliquet', 'a', 'enim', 'in', 'morbi', 'volutpat', 'risus', 'vivamus', 'sodales', 'quam', 'tellus', 'ut', 'feugiat', 'odio', 'ultrices', 'phasellus', 'varius', 'orci', 'donec', 'mollis', 'metus', 'congue', 'placerat', 'cras', 'ornare', 'tincidunt', 'laoreet', 'integer', 'rutrum', 'ante', 'est', 'porttitor', 'euismod', 'purus', 'ligula', 'scelerisque', 'proin', 'sagittis', 'eros', 'nunc', 'semper', 'accumsan', 'leo', 'velit', 'lacinia', 'id', 'condimentum', 'ultricies', 'libero', 'vestibulum', 'luctus', 'nam', 'fringilla', 'massa', 'eget', 'suscipit', 'tempor', 'maecenas', 'gravida', 'malesuada', 'praesent', 'aenean', 'commodo', 'iaculis', 'vehicula', 'dui', 'fermentum', 'justo', 'imperdiet', 'neque', 'posuere', 'habitant', 'senectus', 'netus', 'fames', 'magna', 'quisque', 'porta', 'augue', 'dapibus', 'neque', 'diam', 'pharetra', 'interdum', 'mattis', 'primis', 'faucibus', 'cubilia', 'curae', 'suspendisse', 'potenti', 'pellentesque', 'habitant'
];

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const shuffle = <T,>(array: T[]): T[] => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
};

export interface LoremIpsumOptions {
    type: 'paragraphs' | 'sentences' | 'words';
    count: number;
    startWithLorem: boolean;
}

export const useLoremIpsum = () => {
    const [text, setText] = useState('');
    const [options, setOptions] = useState<LoremIpsumOptions>({
        type: 'paragraphs',
        count: 3,
        startWithLorem: true,
    });

    const generateWords = useCallback((count: number): string => {
        let words = [];
        for (let i = 0; i < count; i++) {
            words.push(DICTIONARY[randomInt(0, DICTIONARY.length - 1)]);
        }
        return words.join(' ');
    }, []);

    const generateSentences = useCallback((count: number): string => {
        let sentences = [];
        for (let i = 0; i < count; i++) {
            const wordsInSentence = randomInt(8, 20);
            let sentence = generateWords(wordsInSentence);
            sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
            sentences.push(sentence);
        }
        return sentences.join(' ');
    }, [generateWords]);

    const generateParagraphs = useCallback((count: number): string => {
        let paragraphs = [];
        for (let i = 0; i < count; i++) {
            const sentencesInParagraph = randomInt(4, 8);
            paragraphs.push(generateSentences(sentencesInParagraph));
        }
        return paragraphs.join('\n\n');
    }, [generateSentences]);

    const generateText = useCallback(() => {
        let newText = '';
        switch (options.type) {
            case 'paragraphs':
                newText = generateParagraphs(options.count);
                break;
            case 'sentences':
                newText = generateSentences(options.count);
                break;
            case 'words':
                newText = generateWords(options.count);
                break;
        }

        if (options.startWithLorem) {
            const startPhrase = 'Lorem ipsum dolor sit amet, ';
            if (options.type === 'words' && options.count < 5) {
                 newText = startPhrase.split(' ').slice(0, options.count).join(' ');
            } else {
                 newText = startPhrase + newText.charAt(0).toLowerCase() + newText.slice(1);
            }
        }
        
        // Final polish for word generation
        if (options.type === 'words' && newText.length > 0) {
            newText = newText.charAt(0).toUpperCase() + newText.slice(1) + '.';
        }

        setText(newText);
    }, [options, generateParagraphs, generateSentences, generateWords]);

    const updateOption = useCallback(<K extends keyof LoremIpsumOptions>(
        option: K,
        value: LoremIpsumOptions[K]
    ) => {
        setOptions((prev) => ({ ...prev, [option]: value }));
    }, []);

    return { text, options, generateText, updateOption };
};
