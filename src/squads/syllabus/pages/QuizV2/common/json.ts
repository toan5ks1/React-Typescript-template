export function parseJSON<T>(str: string): T | null {
    try {
        return JSON.parse(str);
    } catch {
        return null;
    }
}
