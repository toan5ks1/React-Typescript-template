import { ProviderTypes } from "src/common/constants/enum";
import { getEmptyResponse, createEmptyResponse, calcGqlPagination } from "src/services/utils";
import { RaSort } from "src/squads/lesson/typings/react-admin";

import { locationsQueriesBob } from "../bob/locations-service-bob";
import locationServiceBob from "../bob/locations-service-bob/locations-service-bob.mutation";
import { AppPagination, ListQuery } from "./../service-types";

type Params =
    | {
          type: ProviderTypes.MANY_REFERENCE;
          payload: ListQuery<
              Parameters<typeof locationServiceBob.retrieveLowestLevelLocations>[0],
              RaSort | RaSort[],
              AppPagination
          >;
      }
    | {
          type: ProviderTypes.ONE;
          payload: {
              filter: Parameters<typeof locationsQueriesBob.getOne>[0];
          };
      }
    | {
          type: ProviderTypes.MANY;
          payload: ListQuery<Parameters<typeof locationsQueriesBob.getMany>[0]>;
      }
    | {
          type: ProviderTypes.LIST_WITH_FILTER;
          payload: ListQuery<Parameters<typeof locationsQueriesBob.getListWithFilter>[0]>;
      };

export const hasuraLocations = (params: Params) => {
    switch (params.type) {
        case ProviderTypes.MANY_REFERENCE: {
            const { filter, pagination } = params.payload;
            const { limit, offset } = calcGqlPagination(pagination);
            const param = {
                name: filter?.name || "",
                limit,
                offset,
            };
            return locationServiceBob.retrieveLowestLevelLocations(param);
        }

        case ProviderTypes.ONE: {
            return locationsQueriesBob.getOne({ location_id: params.payload.filter.location_id });
        }

        case ProviderTypes.MANY: {
            const { filter } = params.payload;

            if (!filter || !filter.location_ids) return createEmptyResponse({ data: [] });

            return locationsQueriesBob.getMany({ location_ids: filter.location_ids });
        }

        case ProviderTypes.LIST_WITH_FILTER: {
            const { filter } = params.payload;

            if (!filter || !filter.location_ids) return createEmptyResponse({ data: [] });

            return locationsQueriesBob.getListWithFilter({ location_ids: filter.location_ids });
        }

        default: {
            return getEmptyResponse();
        }
    }
};

export default hasuraLocations;
