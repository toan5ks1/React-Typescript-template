import { useCallback } from "react";

import { useLocation } from "react-router-dom";
import { getOriginUrl } from "src/common/helpers/project";
import { removeLastCharacter } from "src/common/utils/other";
import sanitizer from "src/internals/sanitizer";
import { mergeSearchSideEffect } from "src/packages/abstract-auth";

const subRedirectName = "redirectUrl";

function isValidURL(url: string) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

function standardizePathname(pathname: string) {
    if (!pathname.startsWith("/")) {
        pathname = `/${pathname}`;
    }

    if (pathname.endsWith("/")) {
        pathname = removeLastCharacter(pathname);
    }

    return pathname;
}

function appendSearchToPath(pathname: string, search: string) {
    const standardizedPathname = standardizePathname(pathname);
    // fake origin to create new URL, which will be safer for us
    const fakeOrigin = getOriginUrl().origin;

    if (!isValidURL(fakeOrigin + standardizedPathname)) {
        return standardizedPathname;
    }

    const fakeUrl = new URL(fakeOrigin + standardizedPathname);
    setSearchToUrl(fakeUrl, search);

    // after done all job, strip the fakeOrigin
    return fakeUrl.toString().replace(fakeOrigin, "");
}

function setSearchToUrl(url: URL, search: string) {
    mergeSearchSideEffect(url.searchParams, new URLSearchParams(search));

    return url;
}

function encodeSearchParamValue(pathname: string, search: string) {
    const sanitized = standardizePathname(pathname) + search;

    // url cannot include double slashs
    if (sanitized.includes("//")) {
        return "";
    }

    return encodeURIComponent(sanitized);
}

function createRedirectSearchString(searchStr: string) {
    if (!searchStr) {
        return "";
    }
    return `?${subRedirectName}=${searchStr}`;
}

function decodeSubRedirectUrl(search: string): string | undefined {
    const searchParams = new URLSearchParams(search);
    const subRedirectPath = searchParams.get(subRedirectName);

    return subRedirectPath ? decodeURIComponent(subRedirectPath) : undefined;
}

function useSubRedirect() {
    const location = useLocation();

    const getRedirectUrlFromCurrentUrl = useCallback(() => {
        const result = decodeSubRedirectUrl(location.search);

        if (!result) {
            return "";
        }

        return sanitizer.forURL(result);
    }, [location.search]);

    const applyCurrentSearchToPath = useCallback(
        (pathname: string): string => {
            const sanitizedSearch = sanitizer.forURL(location.search);

            return sanitizer.forURL(appendSearchToPath(pathname, sanitizedSearch));
        },
        [location.search]
    );

    const convertCurrentUrlToSearch = useCallback(() => {
        const redirectValue = encodeSearchParamValue(location.pathname, location.search);

        return sanitizer.forURL(createRedirectSearchString(redirectValue));
    }, [location.pathname, location.search]);

    const navigateToRedirectUrl = useCallback(
        // should always pass a default path
        (defaultPath: string) => {
            const sanitized = sanitizer.forURL(getRedirectUrlFromCurrentUrl() ?? defaultPath);
            window.location.assign(sanitized);
        },
        [getRedirectUrlFromCurrentUrl]
    );

    return {
        currentSearchParams: location.search,
        convertCurrentUrlToSearch,
        getRedirectUrlFromCurrentUrl,
        applyCurrentSearchToPath,
        navigateToRedirectUrl,
    };
}

export default useSubRedirect;
