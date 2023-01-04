import { ProviderTypes } from "src/common/constants/enum";
import { ListQuery } from "src/services/service-types";

import parentQueriesBob from "../bob/parents-service-bob";
import { getEmptyResponse } from "../utils";

type Params = {
    type: ProviderTypes.LIST_WITH_FILTER;
    payload: ListQuery<Parameters<typeof parentQueriesBob.getParentsList>[0]>;
};

const parentProvider = (params: Params) => {
    switch (params.type) {
        case ProviderTypes.LIST_WITH_FILTER: {
            const { filter } = params.payload;

            return parentQueriesBob.getParentsList({
                name: filter?.name || "",
                email: filter?.email || "",
            });
        }

        default: {
            return getEmptyResponse();
        }
    }
};

export default parentProvider;
