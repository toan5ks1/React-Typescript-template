import { ProviderTypes } from "src/common/constants/enum";
import { ArrayElement } from "src/common/constants/types";
import { RaSort } from "src/typings/react-admin";

import { Paging } from "manabuf/common/v1/requests_pb";

import { toArr } from "../common/utils/other";
import { ArrayOrSetValue } from "./bob/lesson-reports-modifier-service-bob/types";
import { AppPagination, GqlPagination, GqlSort } from "./service-types";

import { Order_By } from "src/__generated__/root-types";

export function createEmptyResponse<T = any>(resp: T): Promise<T> {
    return Promise.resolve(resp);
}

export function getEmptyResponse() {
    return createEmptyResponse({
        data: {
            id: null,
        },
    });
}

export const providerQueryTypesWithoutConverter = [
    ProviderTypes.GET_TITLES,
    ProviderTypes.COUNT_STATUS,
    ProviderTypes.DOWNLOAD_BOOK,
    ProviderTypes.RETRIEVE_GRADE_MAP,
    ProviderTypes.DOWNLOAD_STUDY_PLAN,
    ProviderTypes.COUNT_READ_OF_NOTIFICATIONS,
    ProviderTypes.GET_STUDENTS_WITH_SCHOOL,
    ProviderTypes.COUNT_SCHOOL_ADMINS,
    ProviderTypes.COUNT_STUDENT_LOCATIONS,
];

export function toGqlQuerySorts(sorts?: RaSort | RaSort[] | GqlSort): GqlSort {
    if (!sorts) return { created_at: Order_By.Desc };
    const raSorts = toArr(sorts) as RaSort[];

    if (!raSorts[0]?.order || !raSorts[0]?.field) {
        return sorts as GqlSort;
    }

    let result: GqlSort = {};
    raSorts.map((e) => {
        result[e.field] = e.order.toLowerCase() as unknown as Order_By;
    });

    return result;
}

export const calcGqlPagination = ({
    perPage = 10,
    page = 1,
}: AppPagination = {}): GqlPagination => {
    if (page < 1) page = 1;
    if (perPage > 100 || perPage < 0) perPage = 100;

    return {
        limit: perPage,
        offset: (page - 1) * perPage,
    };
};

export function getSearchString(text: string | null | undefined) {
    if (!text) return undefined;
    return `%${text}%`;
}

export const toNonUndefinedArrayValueList = <T extends ArrayElement<ArrayOrSetValue>>(
    valuesList: T[] | undefined
): T[] => {
    if (valuesList && Array.isArray(valuesList)) return valuesList.map((value) => value);

    return [];
};

/**
 * Convert to "Paging" proto with only limit and offset
 *
 * @param paging paging object {limit: number; offsetInteger: number; offsetString: string; ...}
 * @returns proto class "Paging"
 */
export const toBasicPagingProto = (paging: Paging.AsObject) => {
    const result = new Paging();

    result.setLimit(paging.limit);

    // We only set the offset by one of 2 things, string or integer
    if (Boolean(paging.offsetString)) result.setOffsetString(paging.offsetString);
    else result.setOffsetInteger(paging.offsetInteger);

    return result;
};
