import { ProviderTypes } from "src/common/constants/enum";
import { RaSort } from "src/typings/react-admin";

import { schoolQueriesBob } from "../bob/school-service-bob";
import { AppPagination, ListQuery } from "../service-types";
import { calcGqlPagination, createEmptyResponse, getEmptyResponse } from "../utils";

export type Params =
    | {
          type: ProviderTypes.LIST;
          payload: ListQuery<
              Parameters<typeof schoolQueriesBob.getList>[0],
              RaSort | RaSort[],
              AppPagination
          >;
      }
    | {
          type: ProviderTypes.MANY_REFERENCE;
          payload: ListQuery<
              Parameters<typeof schoolQueriesBob.getManyReference>[0],
              RaSort | RaSort[],
              AppPagination
          >;
      }
    | {
          type: ProviderTypes.MANY;
          payload: Parameters<typeof schoolQueriesBob.getMany>[0] & { ids?: number[] };
      }
    | {
          type: ProviderTypes.TITLE;
          payload: Parameters<typeof schoolQueriesBob.getTitle>[0] & { id?: number };
      }
    | {
          type: ProviderTypes.ONE;
          payload: Parameters<typeof schoolQueriesBob.getOne>[0] & {
              id?: number;
              filter?: { entityId?: number };
          };
      };

const hasuraSchools = (params: Params) => {
    switch (params.type) {
        case ProviderTypes.TITLE: {
            const { id, school_id } = params.payload;
            return schoolQueriesBob.getTitle({ school_id: id || school_id });
        }
        case ProviderTypes.ONE: {
            const { id, school_id, filter } = params.payload;
            const finalId = id || school_id || filter?.entityId;
            if (!finalId) return createEmptyResponse({ data: {} });
            return schoolQueriesBob.getOne({ school_id: finalId });
        }
        case ProviderTypes.LIST: {
            const { filter, pagination } = params.payload;
            const { school_id, name, phone_number, is_system_school } = filter!;
            const { limit, offset } = calcGqlPagination(pagination);

            return schoolQueriesBob.getList({
                limit,
                offset,
                school_id,
                name,
                phone_number,
                is_system_school,
            });
        }
        case ProviderTypes.MANY_REFERENCE: {
            const { filter, pagination } = params.payload;
            const { name, phone_number } = filter!;
            const { limit, offset } = calcGqlPagination(pagination);

            return schoolQueriesBob.getManyReference({ limit, offset, name, phone_number });
        }
        case ProviderTypes.MANY: {
            const { ids, school_id } = params.payload;

            return schoolQueriesBob.getMany({ school_id: ids || school_id! });
        }
        default: {
            return getEmptyResponse();
        }
    }
};

export default hasuraSchools;
