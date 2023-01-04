import { ProviderTypes } from "src/common/constants/enum";
import { centerQueriesEureka } from "src/services/eureka/center-service-eureka";
import { AppPagination, ListQuery } from "src/services/service-types";
import { RaSort } from "src/typings/react-admin";

import { calcGqlPagination, getEmptyResponse } from "../utils";

type CenterServiceParams = {
    type: ProviderTypes.LIST;
    payload: ListQuery<
        Parameters<typeof centerQueriesEureka.getList>[0],
        RaSort | RaSort[],
        AppPagination
    >;
};

function centersProvider(params: CenterServiceParams) {
    switch (params.type) {
        case ProviderTypes.LIST: {
            const { limit, offset } = calcGqlPagination(params.payload.pagination);
            return centerQueriesEureka.getList({ limit, offset });
        }

        default: {
            return getEmptyResponse();
        }
    }
}

export default centersProvider;
