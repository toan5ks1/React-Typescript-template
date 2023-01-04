export function createEmptyResponse<T = any>(resp: T): Promise<T> {
    return Promise.resolve(resp);
}

export function getSearchString(text: string | null | undefined) {
    if (!text) return undefined;
    return `%${text}%`;
}
