import { UserIdentity } from "src/typings/auth-provider";
import { RaSort } from "src/typings/react-admin";

import { ProviderTypes } from "../../common/constants/enum";
import teacherQueriesBob from "../bob/teacher-service-bob/teacher-bob.query";
import userServiceBob from "../bob/user-service-bob";
import { AppPagination, GqlPagination, GqlSort, ListQuery } from "../service-types";
import { calcGqlPagination, createEmptyResponse, getEmptyResponse } from "../utils";
import userModifierServiceYasuo from "../yasuo/user-modifier-service-yasuo";

type Params =
    | {
          type: ProviderTypes.TITLE;
          payload: Parameters<typeof teacherQueriesBob.getTitle>[0] & {
              id?: string;
          };
      }
    | {
          type: ProviderTypes.ONE;
          payload: {
              filter: {
                  entityId: string;
              };
          };

          user: UserIdentity;
      }
    | {
          type: ProviderTypes.MANY;
          payload: ListQuery<
              Parameters<typeof teacherQueriesBob.getMany>[0] & {
                  ids?: string[];
              }
          >;
          user: UserIdentity;
      }
    | {
          type: ProviderTypes.MANY_REFERENCE;
          payload: ListQuery<
              Parameters<typeof teacherQueriesBob.getManyReference>[0] & {
                  users: {
                      email: string;
                      name: string;
                  };
              },
              RaSort | GqlSort,
              AppPagination
          >;
          user: UserIdentity;
      }
    | {
          type: ProviderTypes.LIST;
          payload: ListQuery<
              Parameters<typeof teacherQueriesBob.getList>[0] & {
                  email: string;
                  name: string;
              },
              RaSort | GqlSort,
              GqlPagination
          >;
          user: UserIdentity;
      }
    | {
          type: ProviderTypes.UPDATE;
          payload: Parameters<typeof userServiceBob.updateUserProfile>[0];
          user: UserIdentity;
      }
    | {
          type: ProviderTypes.CREATE;
          payload: Parameters<typeof userModifierServiceYasuo.createUser>[0];
          user: UserIdentity;
      }
    | {
          type: ProviderTypes.LIST_WITH_FILTER;
          payload: ListQuery<
              Parameters<typeof teacherQueriesBob.getListWithoutTeacherIds>[0] & {
                  users: {
                      email: string;
                      name: string;
                  };
              },
              RaSort | GqlSort,
              AppPagination
          >;
          user: UserIdentity;
      };

export default (params: Params) => {
    switch (params.type) {
        case ProviderTypes.TITLE: {
            const { id, teacher_id } = params.payload;
            if (!id && !teacher_id) return createEmptyResponse({ data: {} });

            return teacherQueriesBob.getTitle({ teacher_id: id || teacher_id });
        }
        case ProviderTypes.ONE: {
            const { entityId } = params.payload.filter;

            const teacherId = entityId;

            if (!teacherId) return createEmptyResponse({ data: {} });

            return teacherQueriesBob.getOne({
                teacher_id: teacherId,
            });
        }
        case ProviderTypes.MANY_REFERENCE:
            const { filter, pagination } = params.payload;
            const { email, name, school_id } = filter!;
            const { limit, offset } = calcGqlPagination(pagination);

            return teacherQueriesBob.getManyReference({
                email: email,
                name: name,
                limit,
                offset,
                school_id: school_id || params.user.schoolId!,
            });

        case ProviderTypes.LIST: {
            const { filter, pagination } = params.payload;
            const { name, email, school_id } = filter!;

            if (!pagination) return createEmptyResponse({ data: {} });

            const { limit, offset } = pagination;

            return teacherQueriesBob.getList({
                limit,
                offset,
                user_email: email,
                user_name: name,
                school_id: school_id || params.user?.schoolId!,
            });
        }

        case ProviderTypes.UPDATE: {
            return userServiceBob.updateUserProfile(params.payload);
        }
        case ProviderTypes.CREATE: {
            return userModifierServiceYasuo.createUser(params.payload, params.user);
        }
        case ProviderTypes.LIST_WITH_FILTER: {
            const { filter, pagination } = params.payload;
            const { users, school_id, user_id } = filter!;
            const { limit, offset } = calcGqlPagination(pagination);

            return teacherQueriesBob.getListWithoutTeacherIds({
                limit,
                offset,
                user_email: users?.email,
                user_name: users?.name,
                user_id,
                school_id: school_id || params.user.schoolId!,
            });
        }
        case ProviderTypes.MANY: {
            const { filter } = params.payload;

            if (!filter || (!filter.ids && !filter.user_id))
                return createEmptyResponse({ data: {} });

            const { ids, user_id, school_id } = filter;

            return teacherQueriesBob.getMany({
                user_id: user_id || ids,
                school_id: school_id || params.user.schoolId!,
            });
        }
        default: {
            return getEmptyResponse();
        }
    }
};
