import { mergeSearchSideEffect } from "../abstract-auth";

export function getRedirectUri(defaultUri?: string, search?: string) {
    if (!defaultUri) {
        return "";
    }

    if (!search) {
        return defaultUri;
    }

    const url = new URL(defaultUri);
    const searchToAppend = new URLSearchParams(search);

    mergeSearchSideEffect(url.searchParams, searchToAppend);

    return url.toString();
}

export function sleep(time: number = 5000): Promise<undefined> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(undefined);
        }, time);
    });
}
