import { ProviderTypes } from "src/common/constants/enum";

import { cityQueriesBob } from "../bob/city-service-bob";
import { ListQuery } from "../service-types";
import { getEmptyResponse } from "../utils";

export type CitiesServiceParams =
    | {
          type: ProviderTypes.ONE;
          payload: Parameters<typeof cityQueriesBob.getOne>[0] & { id?: number };
      }
    | {
          type: ProviderTypes.MANY;
          payload: Parameters<typeof cityQueriesBob.getMany>[0] & { ids?: number[] };
      }
    | {
          type: ProviderTypes.LIST;
          payload: ListQuery<Parameters<typeof cityQueriesBob.getMany>[0]>;
      }
    | {
          type: ProviderTypes.MANY_REFERENCE;
          payload: ListQuery<Parameters<typeof cityQueriesBob.getMany>[0]>;
      };
const citiesService = (params: CitiesServiceParams) => {
    switch (params.type) {
        case ProviderTypes.ONE: {
            const { city_id, id } = params.payload;
            return cityQueriesBob.getOne({ city_id: id || city_id! });
        }
        case ProviderTypes.MANY_REFERENCE:
        case ProviderTypes.LIST: {
            const { city_id, name, country } = params.payload.filter!;
            return cityQueriesBob.getMany({ city_id, name, country });
        }
        case ProviderTypes.MANY: {
            const { city_id, ids, name, country } = params.payload;
            return cityQueriesBob.getMany({ city_id: ids ? ids[0] : city_id, name, country });
        }
        default: {
            return getEmptyResponse();
        }
    }
};

export default citiesService;
