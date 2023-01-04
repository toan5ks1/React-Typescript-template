import { useEffect, useMemo } from "react";

import { useLocation } from "react-router-dom";
import { QueryParamsService, QueryParamType } from "src/common/constants/params";
import { MicroFrontendTypes } from "src/routing/type";
import { IDataProvider } from "src/services/service-types";

import { ProviderTypes } from "../../common/constants/enum";
import { parseQuery, stringifyQuery, StringifyQueryProps } from "../../common/utils/query";
import { TypeEntity } from "../../typings/react-admin";
import useSafeSetState from "../useSafeState";

import useDataProvider from "src/hooks/useDataProvider";

interface UseBreadcrumbParams {
    resource: TypeEntity;
}

export interface BreadCrumb {
    id?: string;
    translateKey?: string;
    rootId?: string;
    path: TypeEntity;
    search: StringifyQueryProps;
    resource: TypeEntity;
    basename: MicroFrontendTypes;
}

interface UseBreadcrumbReturn {
    loading: boolean;
    loaded: boolean;
    breadcrumbs: BreadcrumbInfo[];
}

interface BreadcrumbInfo {
    url: string;
    name: string;
    translateKey?: string;
}

interface FetchBreadcrumbHelperParams
    extends Pick<
        BreadCrumb,
        "id" | "rootId" | "translateKey" | "search" | "resource" | "basename"
    > {
    path: string;
    dataProvider: IDataProvider;
}

export const genBreadcrumbVariables = (search: string, resource: TypeEntity): BreadCrumb[] => {
    const searchParsed = parseQuery(search);
    const current = QueryParamsService[resource];

    const list = (current || []).map((item: QueryParamType) => {
        const {
            resource,
            query,
            back,
            rootId: rootIdKey,
            rootResource,
            translateKey,
            basename,
        } = item;

        const id: string | undefined =
            query && searchParsed[query] ? (searchParsed[query] as string) : undefined;

        const rootId =
            rootIdKey && searchParsed[rootIdKey] ? (searchParsed[rootIdKey] as string) : undefined;

        let searchQuery: StringifyQueryProps = {};
        if (back) {
            // Save search params when go to back
            const { search } = back;
            Object.entries(search).forEach(([key, value = ""]) => {
                const queryValue = searchParsed[value];
                if (queryValue) searchQuery[key] = queryValue;
            });
        }
        const temp = {
            id,
            rootId,
            resource,
            translateKey,
            search: searchQuery,
            path: rootResource || resource,
            basename,
        };
        return temp;
    });
    return list;
};

export const fetchBreadcrumbHelper = async ({
    dataProvider,
    id,
    search,
    path,
    resource,
    rootId,
    translateKey,
    basename,
}: FetchBreadcrumbHelperParams): Promise<{ url: string; name: string; translateKey?: string }> => {
    const searchString = stringifyQuery(search);
    let name: string = "";
    let url: string = `/${basename}/${path}${searchString}`;

    if (rootId || id) {
        url = `/${basename}/${path}/${rootId || id}/show${searchString}`;
    }

    if (id) {
        const result = await dataProvider(ProviderTypes.TITLE, resource, {
            id,
        });

        name = result.data.name;
    }

    return { url, name, translateKey };
};

const useBreadcrumb = ({ resource }: UseBreadcrumbParams): UseBreadcrumbReturn => {
    const { search } = useLocation();
    const dataProvider = useDataProvider();

    const [loading, setLoading] = useSafeSetState<boolean>(true);
    const [loaded, setLoaded] = useSafeSetState<boolean>(false);
    const [breadcrumbInfos, setBreadcrumbInfos] = useSafeSetState<BreadcrumbInfo[]>();

    const breadcrumbs = useMemo(() => {
        return genBreadcrumbVariables(search, resource);
    }, [resource, search]);

    useEffect(() => {
        const fetching = async () => {
            setLoading(true);
            try {
                const result = await Promise.all(
                    breadcrumbs.map(async (breadcrumb) => {
                        const { path, search, id, resource, rootId, translateKey, basename } =
                            breadcrumb;
                        const result = await fetchBreadcrumbHelper({
                            id,
                            rootId,
                            search,
                            path,
                            resource,
                            translateKey,
                            dataProvider,
                            basename,
                        });

                        return result;
                    })
                );

                setBreadcrumbInfos(result);
                setLoaded(true);
            } finally {
                setLoading(false);
            }
        };

        if (loaded || (loading && breadcrumbInfos)) return;

        void fetching();
    }, [
        breadcrumbInfos,
        breadcrumbs,
        loaded,
        loading,
        dataProvider,
        setLoading,
        setBreadcrumbInfos,
        setLoaded,
    ]);

    return {
        loading,
        loaded,
        breadcrumbs: breadcrumbInfos || [],
    };
};

export default useBreadcrumb;
