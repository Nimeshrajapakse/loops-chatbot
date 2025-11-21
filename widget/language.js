// Detect Sinhala characters
export function isSinhala(text) {
    return /[\u0D80-\u0DFF]/.test(text);
}
