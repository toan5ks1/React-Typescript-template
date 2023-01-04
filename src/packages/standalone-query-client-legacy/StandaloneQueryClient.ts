import { QueryClient } from "react-query";
import { safeStringify } from "src/common/utils/other";

export interface Logger {
    log: (...args: any[]) => void;
    warn: (...args: any[]) => void;
    error: (...args: any[]) => void;
}

export type ProviderResponse<T> = {
    data: T;
    total?: number;
};

enum FetchQueryOptions {
    RETRY_TIMES = 0,
    CACHE_TIME = 0,
    TIME_UNTIL_AUTO_REFETCH = 5 * 60 * 1000, // don't auto reload, auto fetch for 5 min after the query executed
}

export interface FetchQueryBaseRequest<
    TypeEntity,
    TypePagination,
    Sort extends Record<any, any> = any
> {
    entity: TypeEntity;
    action: string | number;
    params?: {
        filter?: Record<string, any>;
        sort?: Sort;
        pagination?: TypePagination;
    };
}

export interface FetchQueryBaseOptions {
    retry?: number;
    enabled?: boolean;
    cacheFor?: number; // ms to cache the result
    markDataAsStaleAfter?: number;
}

type DefaultDataProviderTypes<TValue = any> = Record<string, TValue>;

class StandaloneQueryClient<
    ReturnValueType,
    DataProviderTypes = DefaultDataProviderTypes<ReturnValueType>
> {
    private readonly queryClient: QueryClient;
    private readonly dataProvider: DataProviderTypes;
    private readonly logger?: Logger;

    constructor(queryClient: QueryClient, dataProvider: DataProviderTypes, logger?: Logger) {
        this.dataProvider = dataProvider;
        this.queryClient = queryClient;
        this.logger = logger;
        this.queryClientFetchQuery = this.queryClientFetchQuery.bind(this);
    }

    async queryClientFetchQuery<
        T,
        TypeEntity,
        TypePagination,
        Order extends Record<any, any> = any
    >(
        request: FetchQueryBaseRequest<TypeEntity, TypePagination, Order>,
        options?: FetchQueryBaseOptions
    ): Promise<ProviderResponse<T>> {
        const data = await this.queryClient.fetchQuery(
            [`${request.entity}_${request.action}`, { request }],
            async (context) => {
                try {
                    // remember to put "await" keyword here
                    return await this.dataProvider[request.action](request.entity, request.params);
                } catch (e) {
                    const stringQueryKey = safeStringify(context.queryKey);
                    this.logger?.warn(`UseQuery ${stringQueryKey}`, e);
                    throw e; // rethrow to allow react-query to catch it
                }
            },
            {
                cacheTime: options?.cacheFor ?? FetchQueryOptions.CACHE_TIME, // let always keep fresh data as a default
                staleTime:
                    options?.markDataAsStaleAfter ?? FetchQueryOptions.TIME_UNTIL_AUTO_REFETCH,
                retry: options?.retry ?? FetchQueryOptions.RETRY_TIMES, // we already retried on unauthenticated in provider, so just retry another time to cover worst case
            }
        );

        return data as ProviderResponse<T>;
    }
}

export default StandaloneQueryClient;
