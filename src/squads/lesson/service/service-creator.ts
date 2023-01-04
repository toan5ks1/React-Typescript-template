import { useCallback, useMemo, useRef, useState } from "react";

import {
    useMutation as rqUseMutation,
    useQuery as rqUseQuery,
    useQueryClient,
    UseMutationOptions as UseRqMutationOptions,
} from "react-query";
import { QueryKey } from "react-query/types/core/types";
import { PagingRequest } from "src/common/constants/types";
import { safeStringify } from "src/common/utils/other";
import { UseQueryBaseOptions, UseQueryBaseV2Return } from "src/squads/lesson/hooks/data/data-types";

import { InvalidParamError } from "./service-types";

import usePagination, { UsePaginationReturn } from "src/squads/lesson/hooks/data/usePagination";

enum UseQueryOptions {
    RETRY_TIMES = 0,
    CACHE_TIME = 0,
    TIME_UNTIL_AUTO_REFETCH = 5 * 60 * 1000, // don't auto reload, auto fetch for 5 min after the query executed
}

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

export type ServiceMap<T = any> = {
    [X in keyof T]: ServiceRequiredDefinition;
};

export interface DataWithPaginationObject {
    nextPage?: PagingRequest;
    previousPage?: PagingRequest;
    totalItems: number;
}

export interface UseQueryWithGRPCPaginationOptions<U, K = U> extends UseQueryBaseOptions<U, K> {
    defaultPaging?: PagingRequest;
}

export interface PagingResponse {
    total: number;
    rowsPerPage: number;
    currentPage: number;
}

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

export interface UseQueryWithGRPCPaginationReturn<T extends DataWithPaginationObject> {
    results: UseQueryBaseV2Return<T>;
    pagination: PaginationWithTotal;
    goToFirstPage: () => void;
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
                limit: pagination.limit,
                offset: pagination.offset,
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

const getDefaultPagingPayload = (): PagingRequest => {
    return { limit: 10, offsetInteger: 0, offsetString: "" };
};

const getDefaultPagingResponse = (rowsPerPage: number = 10): PagingResponse => {
    return { total: 0, rowsPerPage, currentPage: 0 };
};

export function createUseQueryWithGRPCPagination<S extends ServiceMap>(service: S) {
    return function inferQueryWithGRPCPagination<
        Entity extends keyof S,
        Action extends keyof S[Entity]["query"],
        Handler extends S[Entity]["query"][Action]
    >(inferredBase: {
        entity: Entity;
        action: Action;
    }): <
        T extends DataWithPaginationObject = Awaited<ReturnType<Handler>>,
        MappedType extends DataWithPaginationObject = T
    >(
        request: Omit<Parameters<Handler>[0], "paging">,
        options: UseQueryWithGRPCPaginationOptions<T, MappedType>
    ) => UseQueryWithGRPCPaginationReturn<MappedType> {
        const queryKeyString = `${String(inferredBase.entity)}_${String(inferredBase.action)}`;

        if (memorizePagination[queryKeyString]) {
            return memorizePagination[queryKeyString];
        }

        const inferQueryService = createUseQuery(service);

        function useQueryWithGRPCPagination<
            T extends DataWithPaginationObject = Awaited<ReturnType<Handler>>,
            MappedType extends DataWithPaginationObject = T
        >(
            request: Omit<Parameters<Handler>[0], "paging">,
            options: UseQueryWithGRPCPaginationOptions<T, MappedType>
        ): UseQueryWithGRPCPaginationReturn<MappedType> {
            const {
                defaultPaging: reqDefaultPaging = getDefaultPagingPayload(), // Default paging request get data
                onSuccess: reqOnSuccess, // Use onSuccess function for outside component
                ...restOptions // Other options for query
            } = options;

            const [pagingRequest, setPagingRequest] = useState<PagingRequest>(reqDefaultPaging);

            const pagingResponse = useRef<PagingResponse>(
                getDefaultPagingResponse(reqDefaultPaging.limit)
            );

            const requestWithPaging = {
                ...(request as {}),
                paging: pagingRequest,
            };

            const results = inferQueryService(inferredBase)<T, MappedType>(requestWithPaging, {
                ...restOptions,
                onSuccess(data) {
                    const total = data.totalItems || 0;
                    pagingResponse.current.total = total;

                    if (reqOnSuccess) {
                        return reqOnSuccess(data);
                    }
                },
            });

            const handleChangePage = useCallback(
                (nextPage: number) => {
                    if (results.isFetching) return;
                    const { currentPage } = pagingResponse.current;

                    // Handle next page
                    if (nextPage > currentPage && results.data?.nextPage) {
                        setPagingRequest(results.data.nextPage);
                    }

                    // Handle previous page
                    if (nextPage < currentPage && results.data?.previousPage) {
                        setPagingRequest(results.data.previousPage);
                    }

                    // Set current page in UI
                    pagingResponse.current.currentPage = nextPage;
                },
                [results.data?.nextPage, results.data?.previousPage, results.isFetching]
            );

            const handleChangeRowsPerPage = useCallback(
                (newRowPerPage: string) => {
                    if (results.isFetching) return;

                    const rowPerPage = Number.parseInt(newRowPerPage);

                    // Set current to first page and new rows per page in UI
                    pagingResponse.current.currentPage = 0;
                    pagingResponse.current.rowsPerPage = rowPerPage;

                    // Handle new rows per page
                    setPagingRequest({ ...reqDefaultPaging, limit: rowPerPage });
                },
                [reqDefaultPaging, results.isFetching]
            );

            const handleGoToFirstPage = useCallback(() => {
                pagingResponse.current.currentPage = 0;
                setPagingRequest({
                    ...reqDefaultPaging,
                    limit: pagingResponse.current.rowsPerPage,
                });
            }, [reqDefaultPaging]);

            const { currentPage, total, rowsPerPage } = pagingResponse.current;

            const pagination: PaginationWithTotal = {
                page: currentPage,
                count: total,
                offset: total < rowsPerPage ? total : currentPage * rowsPerPage,
                limit: rowsPerPage,
                rowsPerPage: rowsPerPage,
                onPageChange: (_, nextPage) => handleChangePage(nextPage),
                onRowsPerPageChange: (event) => handleChangeRowsPerPage(event.target.value),
            };

            return {
                results,
                pagination,
                goToFirstPage: handleGoToFirstPage,
            };
        }

        memorizePagination[queryKeyString] = useQueryWithGRPCPagination;

        return memorizePagination[queryKeyString];
    };
}
