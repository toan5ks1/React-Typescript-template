import { useCallback, useEffect, useRef, useState } from "react";

import { PagingRequest } from "src/common/constants/types";
import { arrayHasItem } from "src/common/utils/other";
import { inferQuery } from "src/squads/syllabus/services/infer-query";

import { StudyPlanTopicPagination } from "../../common/types";

const defaultPagingRequest: PagingRequest = {
    limit: 10,
    offsetInteger: 0,
    offsetString: "",
};

const useStudyPlanTopicQuery = (studyPlanId: string) => {
    const [pagingRequest, setPagingRequest] = useState<PagingRequest>(defaultPagingRequest);
    const pagingResponse = useRef({
        total: -1,
        rowsPerPage: 10,
        currentPage: 0,
    });

    const [nextPagingRequest, setNextPagingRequest] = useState<PagingRequest>({
        ...pagingRequest,
        offsetInteger:
            pagingResponse.current.currentPage * pagingResponse.current.rowsPerPage +
            pagingResponse.current.rowsPerPage,
    });

    useEffect(() => {
        setNextPagingRequest({
            ...pagingRequest,
            offsetInteger: pagingRequest.limit + pagingRequest.offsetInteger,
        });
    }, [pagingRequest]);

    const { data, isFetching, refetch } = inferQuery({
        entity: "courseReader",
        action: "TOPIC_GET_LIST_BY_STUDY_PLAN",
    })(
        {
            paging: pagingRequest,
            studyPlanId: studyPlanId,
        },
        {
            enabled: true,
        }
    );

    const { data: dataNextPage, isFetching: isFetchingNextPage } = inferQuery({
        entity: "courseReader",
        action: "TOPIC_GET_LIST_BY_STUDY_PLAN",
    })(
        {
            paging: nextPagingRequest,
            studyPlanId: studyPlanId,
        },
        {
            enabled: true,
        }
    );

    const handlePageChange = useCallback(
        (nextPage: number) => {
            if (isFetching) return;

            const { currentPage } = pagingResponse.current;

            if (nextPage > currentPage && data?.nextPage) {
                setPagingRequest({ ...data.nextPage });
            }

            if (nextPage < currentPage && data?.nextPage) {
                const { limit, offsetInteger } = data.nextPage;

                // We use the offset from the next page so we need to minus two times the limit
                // to get the previous page offset
                setPagingRequest({
                    ...data.nextPage,
                    offsetInteger: offsetInteger - limit * 2,
                });
            }

            pagingResponse.current.currentPage = nextPage;
        },
        [data?.nextPage, isFetching]
    );

    const handleRowsPerPageChange = useCallback(
        (newRowsPerPage: string) => {
            if (isFetching) return;

            const rowsPerPage = parseInt(newRowsPerPage, 10);

            pagingResponse.current.currentPage = 0;
            pagingResponse.current.rowsPerPage = rowsPerPage;

            setPagingRequest({ ...defaultPagingRequest, limit: rowsPerPage });
        },
        [isFetching]
    );

    const { currentPage, rowsPerPage, total } = pagingResponse.current;
    const pagination: StudyPlanTopicPagination = {
        page: currentPage,
        count: total,
        offset: currentPage * rowsPerPage,
        limit: rowsPerPage,
        rowsPerPage,
        nextIconButtonProps: { disabled: !arrayHasItem(dataNextPage?.itemsList) },
        onPageChange: (_, nextPage) => handlePageChange(nextPage),
        onRowsPerPageChange: ({ target: { value } }) => handleRowsPerPageChange(value),
    };

    return {
        result: {
            data,
            isFetching: isFetchingNextPage || isFetching,
            refetch,
        },
        pagination,
    };
};

export default useStudyPlanTopicQuery;
