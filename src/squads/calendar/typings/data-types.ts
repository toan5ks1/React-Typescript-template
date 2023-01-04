import {
    InfiniteQueryObserverResult,
    QueryKey,
    UseQueryOptions as rqUseQueryOptions,
    UseQueryResult,
} from "react-query";

export enum UseQueryOptions {
    RETRY_TIMES = 0,
    CACHE_TIME = 0,
    TIME_UNTIL_AUTO_REFETCH = 5 * 60 * 1000, // don't auto reload, auto fetch for 5 min after the query executed
}

export interface UseQueryBaseOptions<T = any, MappedType = T, IError = Error> {
    retry?: number;
    enabled?: boolean;
    cacheFor?: number; // ms to cache the result
    markDataAsStaleAfter?: number;
    rerenderOnChangeProps?: Array<keyof InfiniteQueryObserverResult>; // will only rerender when those props change, use with care

    selector?: rqUseQueryOptions<T, IError, MappedType>["select"]; // select/filter/transform to get data you want based on returned result
    onError?: rqUseQueryOptions<T, IError, MappedType>["onError"];
    onSuccess?: rqUseQueryOptions<T, IError, MappedType>["onSuccess"];
}

export type UseQueryBaseV2Return<T> = UseQueryResult<T, Error> & {
    queryKey: QueryKey | undefined;
};
