import { DEFAULT_PRIMARY_KEY } from "src/common/constants/other";

import { ProviderTypes } from "../common/constants/enum";
import { getPrimaryKey } from "../common/helpers/helpers";
import { TypeEntity } from "../typings/react-admin";
import { HasuraResponse } from "./service-types";
import { providerQueryTypesWithoutConverter } from "./utils";

export function getResponseConverter(type: ProviderTypes, resource: TypeEntity) {
    return (res: HasuraResponse = {} as HasuraResponse) => {
        //FIXME: Move out for legacy after removed react-admin
        if (providerQueryTypesWithoutConverter.includes(type)) return res;

        const primaryKey = getPrimaryKey(resource);

        const [table, count] =
            res && res.data && typeof res.data === "object" ? Object.keys(res.data) : [];

        if (type === ProviderTypes.ONE || type === ProviderTypes.TITLE) {
            let data = res.data[table][0];

            if (primaryKey !== DEFAULT_PRIMARY_KEY && data) {
                data[DEFAULT_PRIMARY_KEY] = data[primaryKey];
            }

            return {
                data: data || {},
            };
        }

        let data = res.data[table];

        const total =
            res.data[count] && res.data[count].aggregate && res.data[count].aggregate.count
                ? res.data[count].aggregate.count
                : 0;

        //TODO: only for LOsAutocomplete and SCHOOL_ADMIN list
        if (primaryKey !== DEFAULT_PRIMARY_KEY) {
            if (Array.isArray(res.data[table])) {
                data = data.map((e: object) => {
                    e[DEFAULT_PRIMARY_KEY] = e[primaryKey];
                    return e;
                });
            } else {
                data[DEFAULT_PRIMARY_KEY] = data[primaryKey];
            }
        }

        return {
            data: data,
            total: total,
        };
    };
}
