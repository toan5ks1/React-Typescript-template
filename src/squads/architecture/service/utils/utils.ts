export function createEmptyResponse<T = any>(resp: T): Promise<T> {
    return Promise.resolve(resp);
}
