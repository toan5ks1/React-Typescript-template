import { toArr } from "src/common/utils/other";
import { RaSort } from "src/squads/lesson/typings/react-admin";

import { Paging } from "manabuf/common/v1/requests_pb";

import { GqlSort } from "./service-types";

import { Order_By } from "src/squads/lesson/__generated__/bob/root-types";

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
