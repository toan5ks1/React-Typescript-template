export const createEmptyResponse = <T = any>(resp: T): Promise<T> => Promise.resolve(resp);

export const getSearchString = (text: string | null | undefined) => {
    if (!text) return undefined;
    return `%${text}%`;
};
