import { ChangeEventHandler, MouseEvent, useCallback, useMemo, useState } from "react";

import { GqlPagination } from "src/squads/syllabus/services/service-types";

// we receive total from graphql call, put in here to centralize pagination property
/**
 * @param {Object} options Default options
 * @param {number} options.defaultOffset Default offset
 * @param {number} options.defaultLimit Default limit
 * */
export interface UsePaginationOptions {
    defaultOffset?: number;
    defaultLimit?: number;
}

export interface UsePaginationReturn extends GqlPagination {
    page: number;
    rowsPerPage: number;
    setOffset: (newOffset: number) => void;
    setLimit: (newLimit: number) => void;
    onPageChange: (event: MouseEvent<HTMLButtonElement> | null, nextPage: number) => void;
    onRowsPerPageChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
}

const defaultPagination: UsePaginationOptions = {
    defaultOffset: 0,
    defaultLimit: 10,
};

// material-ui table compatible
function usePagination(options: UsePaginationOptions = defaultPagination): UsePaginationReturn {
    const [offset, setOffset] = useState(options.defaultOffset || 0);
    const [limit, setLimit] = useState(options.defaultLimit || 10);

    const onPageChange = useCallback(
        (_: MouseEvent<HTMLButtonElement> | null, nextPage: number) => {
            let nextOffset = nextPage * limit;
            setOffset(nextOffset);
        },
        [limit]
    );

    const onRowsPerPageChange: UsePaginationReturn["onRowsPerPageChange"] = useCallback((e) => {
        setLimit(parseInt(e.target.value, 10));
        setOffset(0);
    }, []);

    return useMemo(
        () => ({
            offset: offset,
            page: Math.floor(offset / limit),
            limit: limit,
            rowsPerPage: limit,
            setOffset,
            setLimit,
            onPageChange,
            onRowsPerPageChange,
        }),
        [onRowsPerPageChange, onPageChange, offset, limit]
    );
}

export default usePagination;
