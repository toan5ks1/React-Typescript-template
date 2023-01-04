import {
    useMutation as rqUseMutation,
    useQueryClient,
    UseMutationOptions as UseRqMutationOptions,
} from "react-query";
import { QueryKey } from "react-query/types/core/types";
import { PagingRequest } from "src/common/constants/types";

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

export interface PagingResponse {
    total: number;
    rowsPerPage: number;
    currentPage: number;
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
