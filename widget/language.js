// Common Sinhala words written in English (romanized Sinhala)
const sinhalaWords = [
    // Greetings
    'ayubowan', 'kohomada', 'bohoma', 'istuti',

    // Question words
    'mokadda', 'mokakda', 'kiyatada', 'koheda', 'kauda', 'kawda',

    // Common verbs (various forms)
    'kranne', 'karanna', 'karanne', 'karanawa', 'karanawada',
    'denne', 'denawa', 'dennada', 'danna', 'dannawa',
    'balanna', 'balanne', 'balanawa', 'balanawada',
    'kiyanna', 'kiyanne', 'kiyanawa', 'kiyanawada',
    'yanna', 'yanne', 'yanawa', 'yanawada',
    'enna', 'enne', 'enawa', 'enawada',
    'gewanna', 'gewanne', 'gewanawa',

    // Modal/auxiliary
    'puluwanda', 'puluwan', 'puluwanida',
    'onada', 'ona', 'onida', 'epa', 'epada',
    'tiyenawada', 'tiyenawa', 'tiyanawa',

    // Pronouns & demonstratives
    'mata', 'mama', 'oya', 'eyata', 'api', 'meka', 'eka', 'eke',
    'mekata', 'ekata', 'mehe', 'ehe', 'mokada',

    // Negation & affirmation
    'nadda', 'nane', 'naha', 'ehemai', 'ow', 'owwa',

    // Common adjectives
    'hondai', 'honda', 'lassana', 'hari', 'sudda', 'sudu',

    // Time & location
    'dang', 'kiyada', 'koheda', 'mehe', 'kohe',

    // Particles & connectors
    'da', 'neda', 'nemeda', 'gana', 'ekka', 'wage',

    // Common nouns (context-specific)
    'kolla', 'lamaya', 'amma', 'thaththa', 'akka', 'malli'
];

// Detect Sinhala script characters
export function isSinhala(text) {
    // First check for actual Sinhala Unicode characters
    if (/[\u0D80-\u0DFF]/.test(text)) {
        return true;
    }

    // Check for romanized Sinhala words
    const lowerText = text.toLowerCase();

    // Split into words and check each one
    const words = lowerText.split(/\s+/);

    // Check if any word matches or contains Sinhala words
    for (const word of words) {
        // Remove punctuation for matching
        const cleanWord = word.replace(/[.,!?;:]/g, '');

        // Check exact match
        if (sinhalaWords.includes(cleanWord)) {
            return true;
        }

        // Check if word contains any Sinhala word (for compound words)
        for (const sinhalaWord of sinhalaWords) {
            if (cleanWord.includes(sinhalaWord) && sinhalaWord.length > 3) {
                return true;
            }
        }
    }

    return false;
}
