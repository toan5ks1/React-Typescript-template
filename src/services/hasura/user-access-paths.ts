import { ProviderTypes } from "src/common/constants/enum";
import { getEmptyResponse, createEmptyResponse } from "src/services/utils";

import { userAccessPathsQueriesBob } from "../bob/user-access-paths-service-bob";
import { ListQuery } from "../service-types";

type Params =
    | {
          type: ProviderTypes.LIST_WITH_FILTER;
          payload: ListQuery<Parameters<typeof userAccessPathsQueriesBob.getListWithFilter>[0]>;
      }
    | {
          type: ProviderTypes.MANY;
          payload: ListQuery<Parameters<typeof userAccessPathsQueriesBob.getMany>[0]>;
      }
    | {
          type: ProviderTypes.ONE;
          payload: ListQuery<Parameters<typeof userAccessPathsQueriesBob.getOne>[0]>;
      };

export const hasuraUserAccessPaths = (params: Params) => {
    switch (params.type) {
        case ProviderTypes.LIST_WITH_FILTER: {
            const { filter } = params.payload;

            if (!filter || !filter.user_id) return createEmptyResponse({ data: [] });

            return userAccessPathsQueriesBob.getListWithFilter({ user_id: filter.user_id });
        }

        case ProviderTypes.MANY: {
            const { filter } = params.payload;

            if (!filter || !filter.user_ids) return createEmptyResponse({ data: [] });

            return userAccessPathsQueriesBob.getMany({ user_ids: filter.user_ids });
        }
        case ProviderTypes.ONE: {
            const { filter } = params.payload;

            if (!filter || !filter.user_id || !filter.location_id)
                return createEmptyResponse({ data: [] });

            return userAccessPathsQueriesBob.getOne(filter);
        }

        default: {
            return getEmptyResponse();
        }
    }
};

export default hasuraUserAccessPaths;
