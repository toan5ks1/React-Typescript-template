import { Entities, EurekaEntities } from "src/common/constants/enum";
import { QueryParamType } from "src/common/constants/params";
import { parseQuery } from "src/squads/syllabus/common/utils/url";

export interface BreadCrumbParams {
    id?: string;
    resource: Entities.LOS | EurekaEntities.STUDY_PLANS;
}

export interface BreadcrumbInfo {
    url: string;
    name?: string;
    translateKey: string;
}

export interface UseBreadcrumbReturn {
    loading: boolean;
    breadcrumbInfos: BreadcrumbInfo[];
}

export type MapperBreadCrumbParams<T extends string> = {
    [key in T]: QueryParamType;
};

export const genBreadcrumbVariables = <T extends string>(
    search: string,
    mapper: MapperBreadCrumbParams<T>
): {
    [key in keyof MapperBreadCrumbParams<T>]: BreadCrumbParams;
} => {
    const searchParsed = parseQuery(search);

    return Object.entries<QueryParamType>(mapper).reduce(
        (values, [key, item]) => {
            const { resource, query } = item;

            const id: BreadCrumbParams["id"] =
                query && searchParsed[query] ? (searchParsed[query] as string) : undefined;

            return {
                ...values,
                [key]: {
                    id,
                    resource,
                },
            };
        },
        {} as {
            [key in keyof MapperBreadCrumbParams<T>]: BreadCrumbParams;
        }
    );
};
