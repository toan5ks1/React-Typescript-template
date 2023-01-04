import { useCallback, useMemo } from "react";

import {
    useMutation as rqUseMutation,
    UseMutationOptions as UseRqMutationOptions,
    useQuery as rqUseQuery,
    useQueryClient,
    InfiniteQueryObserverResult,
    UseQueryOptions as rqUseQueryOptions,
    UseQueryResult,
} from "react-query";
import { QueryKey } from "react-query/types/core/types";
import { safeStringify } from "src/common/utils/other";

import { InvalidParamError } from "./service-types";

import usePagination, { UsePaginationReturn } from "src/squads/user/hooks/data/usePagination";

type QueryDefinition<T = any> = {
    [X in keyof T]: (...args: any[]) => Promise<any>;
};

type MutationDefinition<T = any> = {
    [X in keyof T]: (...args: any[]) => Promise<any>;
};

type ServiceOptionalDefinition = {
    query?: QueryDefinition;
    mutation?: MutationDefinition;
};

type ServiceRequiredDefinition<T = any> = Required<T>;

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

export enum UseQueryOptions {
    RETRY_TIMES = 0,
    CACHE_TIME = 0,
    TIME_UNTIL_AUTO_REFETCH = 5 * 60 * 1000, // don't auto reload, auto fetch for 5 min after the query executed
}

export type ServiceMap<T = any> = {
    [X in keyof T]: ServiceRequiredDefinition;
};

export interface UseQueryPaginationOptions<U, K = U> extends UseQueryBaseOptions<U, K> {
    defaultLimit?: number;
    defaultOffset?: number;
}
export interface PaginationWithTotal extends Omit<UsePaginationReturn, "setLimit" | "setOffset"> {
    count: number;
}

export interface UseQueryPaginationReturn<T> {
    result: UseQueryBaseV2Return<T>;
    data: T | undefined;
    pagination: PaginationWithTotal;
    resetPaginationOffset: () => void;
}

export interface DataWithTotal<T> {
    data: T;
    total: number;
}

export interface UseMutationOptions<TVariables, TReturned, TError = Error>
    extends Omit<UseRqMutationOptions<TReturned, TError, TVariables>, "mutationFn" | "onMutate"> {
    invalidateKey?: QueryKey; // if the request success, invalidate query with this those keys
    //rename for easy understanding
    onBeforeMutate?: UseRqMutationOptions<TReturned, TError, TVariables>["onMutate"];
}

export function defineService<T extends ServiceOptionalDefinition>(
    service: T
): ServiceRequiredDefinition<T> {
    return {
        mutation: service.mutation ?? {},
        query: service.query ?? {},
    } as ServiceRequiredDefinition<T>;
}

// for more extensibility, you guys can add plugins here
export function composeServices<Map extends ServiceMap>(serviceMap: Map): Map {
    return serviceMap;
}

let memorize = {};
let memorizePagination = {};

export function createUseQuery<S extends ServiceMap>(service: S) {
    return function inferQuery<
        Entity extends keyof S,
        Action extends keyof S[Entity]["query"],
        Handler extends S[Entity]["query"][Action]
    >(inferredBase: {
        entity: Entity;
        action: Action;
    }): <T = Awaited<ReturnType<Handler>>, MappedType = T>(
        request: Parameters<Handler>[0],
        options: UseQueryBaseOptions<T, MappedType>
    ) => UseQueryBaseV2Return<MappedType> {
        const queryKeyString = `${String(inferredBase.entity)}_${String(inferredBase.action)}`;

        if (memorize[queryKeyString]) {
            return memorize[queryKeyString];
        }

        function useQueryBaseV2<T = Awaited<ReturnType<Handler>>, MappedType = T>(
            request: Parameters<Handler>[0],
            options: UseQueryBaseOptions<T, MappedType>
        ): UseQueryBaseV2Return<MappedType> {
            const queryKey = queryKeyString;
            const querySource = {
                request,
            };

            return {
                queryKey: [queryKey, querySource],
                ...rqUseQuery<T, Error, MappedType>(
                    [queryKey, querySource],
                    async (context) => {
                        try {
                            // remember to put "await" keyword here to allow catching the error
                            return await service[inferredBase.entity]["query"][inferredBase.action](
                                request
                            );
                        } catch (e) {
                            // in case you want to catch in default window.warner.warn
                            if (!(e instanceof InvalidParamError)) {
                                const stringQueryKey = safeStringify(context.queryKey);

                                window.warner?.warn(`UseQuery ${stringQueryKey}`, e);
                            }

                            throw e; // rethrow to allow react-query to catch it
                        }
                    },
                    {
                        // if enabled is false, we need to call refetch manually
                        enabled: options.enabled,
                        cacheTime: options.cacheFor ?? UseQueryOptions.CACHE_TIME, // let always keep fresh data as a default
                        staleTime:
                            options.markDataAsStaleAfter ?? UseQueryOptions.TIME_UNTIL_AUTO_REFETCH,
                        select: options.selector,
                        retry: options.retry ?? UseQueryOptions.RETRY_TIMES, // we already retried on unauthenticated in provider, so just retry another time to cover worst case
                        notifyOnChangeProps: options.rerenderOnChangeProps, // we don't use the "tracked" option because we already do object spread here
                        keepPreviousData: true, // keep data in cache until having the response
                        refetchOnWindowFocus: false,

                        onError: options.onError,
                        onSuccess: options.onSuccess,
                    }
                ),
            };
        }

        memorize[queryKeyString] = useQueryBaseV2;

        return memorize[queryKeyString];
    };
}

export function createUseQueryPagination<S extends ServiceMap>(service: S) {
    return function inferQueryPagination<
        Entity extends keyof S,
        Action extends keyof S[Entity]["query"],
        Handler extends S[Entity]["query"][Action]
    >(inferredBase: {
        entity: Entity;
        action: Action;
    }): <T = Awaited<ReturnType<Handler>>, MappedType = T>(
        request: Omit<Parameters<Handler>[0], "limit" | "offset">,
        options: UseQueryPaginationOptions<T, MappedType>
    ) => UseQueryPaginationReturn<MappedType> {
        const queryKeyString = `${String(inferredBase.entity)}_${String(inferredBase.action)}`;

        if (memorizePagination[queryKeyString]) {
            return memorizePagination[queryKeyString];
        }

        const inferQueryService = createUseQuery(service);

        function useQueryPagination<T = Awaited<ReturnType<Handler>>, MappedType = T>(
            request: Omit<Parameters<Handler>[0], "limit" | "offset">,
            options: UseQueryPaginationOptions<DataWithTotal<T>, DataWithTotal<MappedType>>
        ) {
            const { defaultOffset, defaultLimit, ...restOptions } = options;

            const pagination = usePagination({ defaultOffset, defaultLimit });

            const mergeParams = {
                //TODO: need remove pagination to remove type `ListQuery`
                pagination: {
                    limit: pagination.limit,
                    offset: pagination.offset,
                },
                ...(request as {}),
            };

            const queryResult = inferQueryService(inferredBase)<
                DataWithTotal<T>,
                DataWithTotal<MappedType>
            >(mergeParams, restOptions);

            const paginationWithTotal: PaginationWithTotal = useMemo(() => {
                const { setLimit, setOffset, ...paginationRest } = pagination;

                return {
                    ...paginationRest,
                    count: queryResult.data?.total ?? 0,
                };
            }, [pagination, queryResult.data]);

            const resetPaginationOffset = useCallback(() => {
                pagination.setOffset(defaultOffset || 0);
            }, [defaultOffset, pagination]);

            return {
                result: queryResult,
                data: queryResult.data,
                pagination: paginationWithTotal,
                resetPaginationOffset,
            };
        }

        memorizePagination[queryKeyString] = useQueryPagination;

        return memorizePagination[queryKeyString];
    };
}

export function createUseMutation<S extends ServiceMap>(service: S) {
    return function inferMutation<
        Entity extends keyof S,
        Action extends keyof S[Entity]["mutation"],
        Handler extends S[Entity]["mutation"][Action]
    >(inferredBase: { entity: Entity; action: Action }) {
        return function useMutationV2<
            TVariables = Parameters<Handler>[0],
            TReturned = Awaited<ReturnType<Handler>>,
            TError = Error
        >(options?: UseMutationOptions<TVariables, TReturned, TError>) {
            const queryClient = useQueryClient();

            return rqUseMutation<TReturned, TError, TVariables>(
                async (variables: TVariables) => {
                    const result = await service[inferredBase.entity]["mutation"][
                        inferredBase.action
                    ](variables);

                    return result;
                },
                {
                    ...options,
                    onMutate: options?.onBeforeMutate,
                    onSuccess: async (data, variables, context) => {
                        if (options?.invalidateKey) {
                            await queryClient.invalidateQueries(options?.invalidateKey);
                        }
                        await options?.onSuccess?.(data, variables, context);
                    },
                }
            );
        };
    };
}
