import { useEffect, useMemo, useRef } from "react";

import { DataProviderResult, UseQueryValue, useSafeSetState, useVersion } from "react-admin";
import { usePrevious } from "react-use";
import { NotifyTypes } from "src/common/constants/enum";
import { handleUnknownError } from "src/common/utils/error";
import { RaQuery } from "src/typings/react-admin";

import useDataProvider from "../../useDataProvider";
import useShowSnackbar from "../../useShowSnackbar";
import usePagination, { UsePaginationOptions, UsePaginationReturn } from "../usePagination";

import isEqual from "lodash/isEqual";

export interface PaginationWithTotal extends Omit<UsePaginationReturn, "setLimit" | "setOffset"> {
    count: number;
}

export interface PaginationReturn {
    result: UseQueryValue;
    pagination: PaginationWithTotal;
}

function mergePagination(
    obj: RaQuery,
    pagination: Omit<UsePaginationReturn, "setOffset" | "setLimit">
) {
    return {
        ...obj,
        payload: {
            ...obj.payload,
            pagination: {
                page: pagination.page + 1, // material use zero-based, but hasura is 1-based
                perPage: pagination?.limit || 0,
            },
        },
    };
}

function useQueryWithPagination(
    query: RaQuery,
    paginationOptions?: UsePaginationOptions
): PaginationReturn {
    const { setOffset, setLimit, ...pagination } = usePagination(paginationOptions);
    const provider = useDataProvider();
    const { resource, payload, type } = mergePagination(query, pagination);
    const prevPayload = usePrevious(payload);
    const [result, safeSetResult] = useSafeSetState<UseQueryValue>({
        data: [],
        error: null,
        total: undefined,
        loading: true,
        loaded: false,
        refetch: () => {},
    });
    const version = useVersion();
    const prevVersion = usePrevious(version);
    const requestCount = useRef(0);
    const showSnackbar = useShowSnackbar();

    useEffect(() => {
        if (isEqual(prevPayload, payload) && prevVersion === version) {
            return;
        }

        const { filter, pagination, sort } = payload;

        // Prevent two simultaneous requests from happening
        // when querying on a page other than 1
        if (!isEqual(prevPayload?.filter, filter)) {
            pagination.page = 1;
            setOffset(0);
        }

        safeSetResult((result) => ({ ...result, loading: true, loaded: false }));

        const currentCount = ++requestCount.current;

        (async () => {
            try {
                const result: DataProviderResult = await provider(type, resource, {
                    filter,
                    pagination,
                    sort,
                });

                // Prevent race condition
                if (currentCount < requestCount.current) return;

                if (!Array.isArray(result.data)) result.data = [];

                safeSetResult({ ...result, loading: false, loaded: true, refetch: () => {} });
            } catch (err) {
                const error = handleUnknownError(err);
                safeSetResult({ data: [], error, loading: false, loaded: true, refetch: () => {} });
                showSnackbar(error.message, NotifyTypes.ERROR);
            }
        })();
    }, [
        prevPayload,
        query,
        provider,
        resource,
        payload,
        type,
        version,
        prevVersion,
        safeSetResult,
        setOffset,
        showSnackbar,
    ]);

    const paginationWithTotal = useMemo(() => {
        return {
            ...pagination,
            count: typeof result.total === "number" ? result.total : 0,
        };
    }, [result, pagination]);

    return {
        result,
        pagination: paginationWithTotal,
    } as const;
}

export default useQueryWithPagination;
