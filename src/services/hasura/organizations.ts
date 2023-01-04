import { ProviderTypes } from "src/common/constants/enum";
import { ListQuery } from "src/services/service-types";

import organizationsQueryBob from "../bob/organizations-service-bob/organizations-service-bob.query";
import { getEmptyResponse } from "../utils";

type Params = {
    type: ProviderTypes.MANY_REFERENCE;
    payload: ListQuery<Parameters<typeof organizationsQueryBob.getOrganizationsManyReference>[0]>;
};

const hasuraOrganization = (params: Params) => {
    switch (params.type) {
        case ProviderTypes.MANY_REFERENCE: {
            const { filter } = params.payload;

            return organizationsQueryBob.getOrganizationsManyReference({
                domain_name: filter?.domain_name,
            });
        }
        default: {
            return getEmptyResponse();
        }
    }
};

export default hasuraOrganization;
