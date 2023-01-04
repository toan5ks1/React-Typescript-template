import { toArr } from "src/common/utils/other";
import { RaSort } from "src/squads/adobo/domains/entry-exit/typings/react-admin";

import { GqlSort } from "./service-types";

import { Order_By } from "src/squads/adobo/__generated__/bob/root-types";

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

export function isInvalidOrEmptyVariable(
    params: string | string[] | number | number[] | null | undefined
): boolean {
    return !Boolean(params);
}
