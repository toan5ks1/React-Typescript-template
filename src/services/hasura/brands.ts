import { ProviderTypes } from "src/common/constants/enum";
import { RaSort } from "src/typings/react-admin";

import { brandEurekaQuery } from "../eureka/brand-service-eureka";
import { ListQuery, AppPagination } from "../service-types";
import { calcGqlPagination, getEmptyResponse } from "../utils";

type BrandsProviderParams = {
    type: ProviderTypes.LIST;
    payload: ListQuery<Parameters<typeof brandEurekaQuery.getList>[0], RaSort, AppPagination>;
};

const brandsProvider = (params: BrandsProviderParams) => {
    switch (params.type) {
        case ProviderTypes.LIST: {
            const { pagination } = params.payload;
            const { limit, offset } = calcGqlPagination(pagination);
            return brandEurekaQuery.getList({ limit, offset });
        }

        default: {
            return getEmptyResponse();
        }
    }
};

export default brandsProvider;
