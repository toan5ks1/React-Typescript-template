import { RaSort } from "src/typings/react-admin";

import { ProviderTypes } from "../../common/constants/enum";
import { schoolAdminQueriesBob } from "../bob/school-admin-service-bob";
import { AppPagination, ListQuery, GqlPagination } from "../service-types";
import { calcGqlPagination, createEmptyResponse, getEmptyResponse } from "../utils";
import userModifierServiceYs from "../yasuo/user-modifier-service-yasuo";

type Params =
    | {
          type: ProviderTypes.CREATE;
          user: Parameters<typeof userModifierServiceYs.createUser>[1];
          payload: Parameters<typeof userModifierServiceYs.createUser>[0];
      }
    | {
          type: ProviderTypes.ONE;
          payload: Parameters<typeof schoolAdminQueriesBob.getOne>[0] & { id?: string };
      }
    | {
          type: ProviderTypes.MANY;
          payload: Parameters<typeof schoolAdminQueriesBob.getMany>[0] & { ids?: string[] };
      }
    | {
          type: ProviderTypes.LIST;
          payload: ListQuery<
              Parameters<typeof schoolAdminQueriesBob.getList>[0],
              RaSort | RaSort[],
              AppPagination
          >;
      }
    | {
          type: ProviderTypes.MANY_REFERENCE;
          payload: ListQuery<
              Parameters<typeof schoolAdminQueriesBob.getManyReference>[0],
              RaSort | RaSort[],
              AppPagination
          >;
      }
    | {
          type: ProviderTypes.LIST_WITH_FILTER;
          payload: ListQuery<
              Parameters<typeof schoolAdminQueriesBob.getSchoolAdminsBySchoolId>[0],
              RaSort | RaSort[],
              GqlPagination
          >;
      }
    | {
          type: ProviderTypes.COUNT_SCHOOL_ADMINS;
          payload: ListQuery<
              Parameters<typeof schoolAdminQueriesBob.getCountSchoolAdminsByFilter>[0]
          >;
      };

const hasuraSchoolAdmins = (params: Params) => {
    switch (params.type) {
        case ProviderTypes.ONE: {
            const { id, school_admin_id } = params.payload;
            return schoolAdminQueriesBob.getOne({ school_admin_id: school_admin_id || id! });
        }
        case ProviderTypes.LIST: {
            const { filter, pagination } = params.payload;
            const { school_admin_id, name, school_id } = filter!;
            const { limit, offset } = calcGqlPagination(pagination);

            return schoolAdminQueriesBob.getList({
                school_id,
                limit,
                offset,
                school_admin_id,
                name,
            });
        }
        case ProviderTypes.MANY: {
            const { ids, school_admin_id } = params.payload;
            return schoolAdminQueriesBob.getMany({ school_admin_id: school_admin_id || ids! });
        }
        case ProviderTypes.MANY_REFERENCE: {
            const { filter, pagination } = params.payload;
            const { school_id } = filter!;
            const { limit, offset } = calcGqlPagination(pagination);

            return schoolAdminQueriesBob.getManyReference({ limit, offset, school_id });
        }
        case ProviderTypes.CREATE: {
            return userModifierServiceYs.createUser(params.payload, params.user);
        }
        case ProviderTypes.LIST_WITH_FILTER: {
            const { filter, pagination } = params.payload;

            if (!filter || !pagination) return createEmptyResponse({ data: [] });
            const { limit, offset } = pagination;
            return schoolAdminQueriesBob.getSchoolAdminsBySchoolId({
                filterValue: filter?.filterValue,
                school_id: filter?.school_id,
                limit,
                offset,
            });
        }
        case ProviderTypes.COUNT_SCHOOL_ADMINS: {
            const { filter } = params.payload;
            if (!filter || !filter.school_id) {
                return createEmptyResponse({ data: {} });
            }
            return schoolAdminQueriesBob.getCountSchoolAdminsByFilter({
                filterValue: filter?.filterValue,
                school_id: filter?.school_id,
            });
        }
        default: {
            return getEmptyResponse();
        }
    }
};

export default hasuraSchoolAdmins;
