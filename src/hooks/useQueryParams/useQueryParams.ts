import { useEffect, useMemo } from "react";

import { ParsedQuery } from "query-string";
import { QueryParamsService, QueryParamType } from "src/common/constants/params";

import { SearchEngine } from "../../common/constants/enum";
import { parseQuery } from "../../common/utils/query";
import { TypeEntity } from "./../../typings/react-admin";

export interface QueryParamsProps {
    resource: TypeEntity;
    search?: string; //add this search to trigger render
}

export interface QueryParamsReturn {
    params: ParsedQuery;
    queryParams: QueryParamType[];
    parentResource?: TypeEntity;
}

function useQueryParams(props: QueryParamsProps): QueryParamsReturn {
    const params = useMemo(
        () => parseQuery(props.search || window.location.search),
        [props.search]
    );
    const queryParams = useMemo(() => QueryParamsService[props.resource] || [], [props.resource]);
    const parentId = useMemo(() => params[SearchEngine.PARENT_ID], [params]);

    useEffect(() => {
        if (queryParams && queryParams.length) {
            queryParams.forEach((queryParam: QueryParamType) => {
                // query is required here
                if (queryParam.query && !params[queryParam.query]) {
                    window.warner?.error(`missing params ${queryParam.query}`);
                }
            });
        }
    }, [params, queryParams]);

    return {
        params,
        queryParams,
        parentResource:
            typeof parentId !== undefined
                ? queryParams.find((e: QueryParamType) => e.query === SearchEngine.PARENT_ID)
                      ?.resource
                : undefined,
    };
}

export default useQueryParams;
