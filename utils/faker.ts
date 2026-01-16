// Data pools
const FIRST_NAMES = ['Aiden', 'Bella', 'Caleb', 'Daisy', 'Elijah', 'Freya', 'Gavin', 'Hazel', 'Isaac', 'Jasmine', 'Kai', 'Luna', 'Mason', 'Nora', 'Owen', 'Penelope', 'Quinn', 'Riley', 'Sofia', 'Theodore'];
const LAST_NAMES = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'White'];
const DOMAINS = ['example.com', 'mail.co', 'inbox.org', 'web.net', 'post.io'];
const STREET_NAMES = ['Maple', 'Oak', 'Pine', 'Cedar', 'Elm', 'Washington', 'Main', 'Park', '2nd', '3rd'];
const STREET_SUFFIXES = ['St', 'Ave', 'Blvd', 'Rd', 'Ct', 'Ln', 'Dr'];
const CITIES = ['Willow Creek', 'Springfield', 'Riverside', 'Greenwood', 'Fairview', 'Madison', 'Georgetown', 'Franklin'];
const COUNTRIES = ['USA', 'Canada', 'UK', 'Australia', 'Germany', 'France'];
const COMPANY_ADJECTIVES = ['Innovative', 'Global', 'Dynamic', 'Synergistic', 'Creative', 'NextGen', 'Quantum', 'Apex', 'Stellar', 'Legacy'];
const COMPANY_NOUNS = ['Solutions', 'Systems', 'Ventures', 'Dynamics', 'Enterprises', 'Group', 'Labs', 'Analytics', 'Technologies', 'Core'];
const BS_WORDS = ['synergize', 'leverage', 'monetize', 'strategize', 'incentivize', 'streamline', 'optimize', 'reintermediate', 'revolutionize', 'empower'];
const PRODUCT_ADJECTIVES = ['Ergonomic', 'Sleek', 'Rustic', 'Intelligent', 'Handcrafted', 'Practical', 'Generic', 'Awesome'];
const PRODUCT_NOUNS = ['Widget', 'Gadget', 'Device', 'Appliance', 'Tool', 'Kit', 'System', 'Solution'];
const CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY'];
const TRANSACTION_STATUSES = ['completed', 'pending', 'failed', 'refunded'];
const POST_TITLE_NOUNS = ['Journey', 'Discovery', 'Adventure', 'Secret', 'Future', 'Challenge', 'Guide', 'Story'];
const POST_TITLE_ADJECTIVES = ['Ultimate', 'Simple', 'Amazing', 'Complete', 'Hidden', 'Final'];
const DICTIONARY = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'curabitur', 'vitae', 'hendrerit', 'pede', 'vel', 'erat', 'et', 'tristique', 'nisi', 'fusce', 'in', 'felis', 'eu', 'nibh', 'elementum', 'blandit', 'etiam', 'velit', 'mauris', 'vulputate', 'aliquam', 'sapien', 'auctor', 'quis', 'convallis', 'eget', 'dictum', 'non', 'nulla', 'sed', 'tortor', 'lectus', 'urna', 'duis', 'at', 'arcu', 'ac', 'turpis', 'egestas', 'aliquet', 'a', 'enim', 'in', 'morbi', 'volutpat', 'risus', 'vivamus', 'sodales', 'quam', 'tellus', 'ut', 'feugiat', 'odio', 'ultrices', 'phasellus', 'varius', 'orci', 'donec', 'mollis', 'metus', 'congue', 'placerat', 'cras', 'ornare', 'tincidunt', 'laoreet', 'integer', 'rutrum', 'ante', 'est', 'porttitor', 'euismod', 'purus', 'ligula', 'scelerisque', 'proin', 'sagittis', 'eros', 'nunc', 'semper', 'accumsan', 'leo', 'velit', 'lacinia', 'id', 'condimentum', 'ultricies', 'libero', 'vestibulum', 'luctus', 'nam', 'fringilla', 'massa', 'eget', 'suscipit', 'tempor', 'maecenas', 'gravida', 'malesuada', 'praesent', 'aenean', 'commodo', 'iaculis', 'vehicula', 'dui', 'fermentum', 'justo', 'imperdiet', 'neque', 'posuere', 'habitant', 'senectus', 'netus', 'fames', 'magna', 'quisque', 'porta', 'augue', 'dapibus', 'neque', 'diam', 'pharetra', 'interdum', 'mattis', 'primis', 'faucibus', 'cubilia', 'curae', 'suspendisse', 'potenti', 'pellentesque', 'habitant'
];

// Helper functions
const randomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const randomInt = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;
const formatPhoneNumber = (): string => `${randomInt(100, 999)}-555-${randomInt(1000, 9999)}`;
const generateSentence = (wordCount: number) => {
    let sentence = '';
    for (let i = 0; i < wordCount; i++) {
        sentence += randomItem(DICTIONARY) + ' ';
    }
    return sentence.trim().charAt(0).toUpperCase() + sentence.slice(1).trimEnd() + '.';
};

// Generator functions
const generateUser = () => {
    const firstName = randomItem(FIRST_NAMES);
    const lastName = randomItem(LAST_NAMES);
    return {
        id: crypto.randomUUID(),
        firstName,
        lastName,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${randomItem(DOMAINS)}`,
        phone: formatPhoneNumber(),
    };
};

const generateAddress = () => {
    return {
        street: `${randomInt(100, 9999)} ${randomItem(STREET_NAMES)} ${randomItem(STREET_SUFFIXES)}`,
        city: randomItem(CITIES),
        zipCode: randomInt(10000, 99999).toString(),
        country: randomItem(COUNTRIES),
    };
};

const generateCompany = () => {
    return {
        name: `${randomItem(COMPANY_ADJECTIVES)} ${randomItem(COMPANY_NOUNS)}`,
        slogan: `${randomItem(BS_WORDS)} your ${randomItem(COMPANY_NOUNS).toLowerCase()}`,
    };
};

const generateProduct = () => {
    return {
        name: `${randomItem(PRODUCT_ADJECTIVES)} ${randomItem(PRODUCT_NOUNS)}`,
        price: `${randomInt(5, 500)}.${randomInt(0, 99).toString().padEnd(2, '0')}`,
        // Fix: `toLowerCase` should be called on a random item from the array, not the array itself.
        description: `A top-quality ${randomItem(PRODUCT_NOUNS).toLowerCase()} designed to ${randomItem(BS_WORDS)} your workflow.`,
    };
};

const generatePost = () => {
    const title = `${randomItem(POST_TITLE_ADJECTIVES)} ${randomItem(POST_TITLE_NOUNS)} of ${randomItem(PRODUCT_NOUNS)}s`;
    
    let body = '';
    const sentenceCount = randomInt(5, 10);
    for (let i = 0; i < sentenceCount; i++) {
        body += generateSentence(randomInt(8, 15)) + ' ';
    }

    return {
        id: crypto.randomUUID(),
        userId: crypto.randomUUID(),
        title,
        body: body.trim(),
    };
};

const generateTransaction = () => {
    return {
        id: crypto.randomUUID(),
        productName: `${randomItem(PRODUCT_ADJECTIVES)} ${randomItem(PRODUCT_NOUNS)}`,
        amount: `${randomInt(5, 1000)}.${randomInt(0, 99).toString().padEnd(2, '0')}`,
        currency: randomItem(CURRENCIES),
        date: new Date(Date.now() - randomInt(0, 30 * 24 * 60 * 60 * 1000)).toISOString(),
        status: randomItem(TRANSACTION_STATUSES),
    };
};

const generateReview = () => {
    const firstName = randomItem(FIRST_NAMES);
    const lastName = randomItem(LAST_NAMES);

    let comment = '';
    const sentenceCount = randomInt(1, 4);
    for (let i = 0; i < sentenceCount; i++) {
        comment += generateSentence(randomInt(10, 20)) + ' ';
    }

    return {
        id: crypto.randomUUID(),
        productName: `${randomItem(PRODUCT_ADJECTIVES)} ${randomItem(PRODUCT_NOUNS)}`,
        author: `${firstName} ${lastName}`,
        rating: randomInt(1, 5),
        comment: comment.trim(),
    };
};

export type DataType = 'user' | 'address' | 'company' | 'product' | 'post' | 'transaction' | 'review';

const generators: { [key in DataType]: () => object } = {
    user: generateUser,
    address: generateAddress,
    company: generateCompany,
    product: generateProduct,
    post: generatePost,
    transaction: generateTransaction,
    review: generateReview,
};

export const generateData = (type: DataType, count: number): object[] => {
    const generator = generators[type];
    if (!generator) {
        return [];
    }
    return Array.from({ length: count }, generator);
};