import queryString from "query-string";

export const parseQuery = (search = window.location.search, parseNumbers = false) => {
    return queryString.parse(search, { parseNumbers });
};

export interface StringifyQueryProps {
    [x: string]: string | (string | null)[] | number;
}

export const stringifyQuery = (data: StringifyQueryProps) => {
    return `?${queryString.stringify(data)}`;
};

export function setQuery(query: string, key: string, val: string) {
    const urlParams = new URLSearchParams(query);

    urlParams.set(key, val);

    return `?${urlParams.toString()}`;
}
