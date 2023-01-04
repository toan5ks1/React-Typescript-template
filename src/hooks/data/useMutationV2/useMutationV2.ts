import {
    useMutation as useRqMutation,
    UseMutationOptions as UseRqMutationOptions,
    useQueryClient,
} from "react-query";
import { QueryKey } from "react-query/types/core/types";
import { ProviderTypes } from "src/common/constants/enum";

import { TypeEntity } from "../../../typings/react-admin";
import useDataProvider from "../../useDataProvider";
import { ActionTypeForQuery } from "../data-types";

export type ActionTypeForMutation = Exclude<ProviderTypes, ActionTypeForQuery>;

export interface UseMutationParams {
    entity: TypeEntity;
    action: ActionTypeForMutation;
}

export interface UseMutationOptions<TVariables, TReturned, TError = Error>
    extends Omit<UseRqMutationOptions<TReturned, TError, TVariables>, "mutationFn" | "onMutate"> {
    invalidateKey?: QueryKey; // if the request success, invalidate query with this those keys
    //rename for easy understanding
    onBeforeMutate?: UseRqMutationOptions<TReturned, TError, TVariables>["onMutate"];
}

// change generic position for more readable reason (we rarely care about return data)
function useMutationV2<TVariables, TReturned = unknown, TError = Error>(
    params: UseMutationParams,
    options?: UseMutationOptions<TVariables, TReturned, TError>
) {
    const provider = useDataProvider();
    const queryClient = useQueryClient();

    return useRqMutation<TReturned, TError, TVariables>(
        async (variables: TVariables): Promise<TReturned> => {
            const result = await provider[params.action](params.entity, variables);

            return result.data;
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
}

export default useMutationV2;
