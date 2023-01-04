import { UseQueryBaseOptions } from "src/squads/lesson/hooks/data/data-types";
import { UseMutationOptions } from "src/squads/lesson/service/service-creator";

export type MockInferQueryFn<TQueryRequest, TUseQueryOptions, MappedType = TUseQueryOptions> = (
    request: TQueryRequest,
    options: UseQueryBaseOptions<TUseQueryOptions | undefined, MappedType>
) => void;

export type MockInferMutationFn<TData, TReturn = unknown> = (
    options: UseMutationOptions<{ data: TData }, TReturn, Error>
) => void;
