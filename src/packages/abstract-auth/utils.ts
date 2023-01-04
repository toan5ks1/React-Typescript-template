import jwtDecode from "jwt-decode";

export function decodeJWTToken<T>(token: string): T | null {
    try {
        return jwtDecode<T>(token);
    } catch (err) {
        return null;
    }
}

export interface JWTCommonFields {
    exp: number;
}

export function isTokenValid(token: string | undefined | null): boolean {
    if (!token) return false;

    let parsed = decodeJWTToken<JWTCommonFields>(token);

    // plus 10s just to make sure it won't expire when we are doing some checking stuffs
    return parsed ? Date.now() + 10000 <= parsed.exp * 1000 : false;
}

export function mergeSearchSideEffect(firstSearch: URLSearchParams, secondSearch: URLSearchParams) {
    for (let [key, val] of secondSearch.entries()) {
        firstSearch.append(key, val);
    }
}
