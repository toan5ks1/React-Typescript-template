export function getSearchString(text: string | null | undefined) {
    if (!text) return undefined;
    return `%${text}%`;
}
