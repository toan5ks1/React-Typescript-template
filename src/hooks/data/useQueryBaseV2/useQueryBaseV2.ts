import { useQuery as rqUseQuery } from "react-query";
import { safeStringify } from "src/common/utils/other";

import {
    getQueryKey,
    ProviderResponse,
    UseQueryBaseOptions,
    UseQueryBaseRequest,
    UseQueryBaseV2Return,
    UseQueryOptions,
} from "../data-types";
import useDataReload from "../useDataReload";

import useDataProvider from "src/hooks/useDataProvider";

function useQueryBaseV2<T, MappedType = T, Order extends Record<any, any> = any>(
    request: UseQueryBaseRequest<Order>,
    options?: UseQueryBaseOptions<ProviderResponse<T>, MappedType>
): UseQueryBaseV2Return<MappedType> {
    const provider = useDataProvider();
    const { version } = useDataReload(); // to trigger refresh data globally
    const queryKey = getQueryKey(request);
    const querySource = {
        request,
        version,
    };
    const isEnabled = typeof options?.enabled === "undefined" ? true : options?.enabled;

    return {
        queryKey: [queryKey, querySource],
        ...rqUseQuery<ProviderResponse<T>, Error, MappedType>(
            [getQueryKey(request), querySource],
            async (context) => {
                try {
                    // remember to put "await" keyword here
                    return await provider[request.action](request.entity, request.params);
                } catch (e) {
                    const stringQueryKey = safeStringify(context.queryKey);
                    window.warner?.warn(`UseQuery ${stringQueryKey}`, e);
                    throw e; // rethrow to allow react-query to catch it
                }
            },
            {
                // if enabled is false, we need to call refetch manually
                enabled: isEnabled,
                cacheTime: options?.cacheFor ?? UseQueryOptions.CACHE_TIME, // let always keep fresh data as a default
                staleTime: options?.markDataAsStaleAfter ?? UseQueryOptions.TIME_UNTIL_AUTO_REFETCH,
                select: options?.selector,
                retry: options?.retry ?? UseQueryOptions.RETRY_TIMES, // we already retried on unauthenticated in provider, so just retry another time to cover worst case
                notifyOnChangeProps: options?.rerenderOnChangeProps, // we don't use the "tracked" option because we already do object spread here
                keepPreviousData: true, // keep data in cache until having the response
                refetchOnWindowFocus: false,

                onError: options?.onError,
                onSuccess: options?.onSuccess,
            }
        ),
    };
}

export default useQueryBaseV2;
