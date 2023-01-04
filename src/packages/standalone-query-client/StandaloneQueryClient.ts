import { QueryClient, FetchQueryOptions } from "react-query";

import { InvalidParamError, safeStringify } from "./utils";

interface Logger {
    log: (...args: any[]) => void;
    warn: (...args: any[]) => void;
    error: (...args: any[]) => void;
}
type ServiceRequiredDefinition<T = any> = Required<T>;
type ServiceMap<T = any> = {
    [X in keyof T]: ServiceRequiredDefinition;
};

enum DefaultFetchQueryOptions {
    RETRY_TIMES = 0,
    CACHE_TIME = 0,
    TIME_UNTIL_AUTO_REFETCH = 5 * 60 * 1000, // don't auto reload, auto fetch for 5 min after the query executed
}

class StandaloneQueryClient {
    private readonly queryClient: QueryClient;
    private readonly logger?: Logger;

    constructor(queryClient: QueryClient, logger?: Logger) {
        this.queryClient = queryClient;
        this.logger = logger;
        this.createStandaloneQuery = this.createStandaloneQuery.bind(this);
    }

    createStandaloneQuery<S extends ServiceMap>(service: S) {
        return <
            Entity extends keyof S,
            Action extends keyof S[Entity]["query"],
            Handler extends S[Entity]["query"][Action]
        >(inferredBase: {
            entity: Entity;
            action: Action;
        }): (<T = Awaited<ReturnType<Handler>>, MappedType = T>(
            request: Parameters<Handler>[0],
            options?: FetchQueryOptions<MappedType>
        ) => Promise<MappedType>) => {
            const queryBase = <T = Awaited<ReturnType<Handler>>, MappedType = T>(
                request: Parameters<Handler>[0],
                options?: FetchQueryOptions<MappedType>
            ): Promise<MappedType> => {
                const queryKeyString = `${String(inferredBase.entity)}_${String(
                    inferredBase.action
                )}`;

                return this.queryClient.fetchQuery<MappedType>(
                    [queryKeyString, { request }],
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
                                this.logger?.warn(`createStandaloneQuery ${stringQueryKey}`, e);
                            }
                            throw e; // rethrow to allow react-query to catch it
                        }
                    },
                    {
                        cacheTime: options?.cacheTime ?? DefaultFetchQueryOptions.CACHE_TIME, // let always keep fresh data as a default
                        staleTime:
                            options?.staleTime ?? DefaultFetchQueryOptions.TIME_UNTIL_AUTO_REFETCH,
                        retry: options?.retry ?? DefaultFetchQueryOptions.RETRY_TIMES, // we already retried on unauthenticated in provider, so just retry another time to cover worst case
                        ...options,
                    }
                );
            };

            return queryBase;
        };
    }
}

export default StandaloneQueryClient;
