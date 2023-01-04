import { UseQueryBaseRequest, UseQueryBaseOptions, UseQueryBaseV2Return } from "../data-types";
import useQueryBaseV2 from "../useQueryBaseV2";

export interface UseQueryRequest<Sort = any> extends UseQueryBaseRequest<Sort> {}

export type UseQueryReturn<T> = UseQueryBaseV2Return<T>;

export interface UseQueryOptions<T = any, MappedType = T>
    extends UseQueryBaseOptions<T, MappedType> {}

// useQuery now is a simple portable version of useQueryBaseV2 (just take the data field from return)
function useQueryV2<T, MappedType = T, Sort extends Record<any, any> = any>(
    request: UseQueryRequest<Sort>,
    options?: UseQueryOptions<T, MappedType>
): UseQueryReturn<MappedType> {
    return useQueryBaseV2<T, MappedType>(request, {
        ...options,
        selector: (data) => {
            const extracted = data.data;

            if (options?.selector) {
                return options?.selector(extracted);
            }

            return extracted as unknown as MappedType;
        },
    });
}

export default useQueryV2;
