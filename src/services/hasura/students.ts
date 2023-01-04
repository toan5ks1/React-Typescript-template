import { ProviderTypes } from "src/common/constants/enum";
import { AppPagination, ListQuery } from "src/services/service-types";
import { RaSort, RaSortOrder } from "src/typings/react-admin";

import { arrayHasItem } from "../../common/utils/other";
import { studentBobQuery } from "../bob/student-service-bob";
import studentQueriesBob from "../bob/student-service-bob/student-service-bob.query";
import {
    calcGqlPagination,
    createEmptyResponse,
    getEmptyResponse,
    toGqlQuerySorts,
} from "../utils";

import { UsePaginationReturn } from "src/hooks/data/usePagination";

type Params =
    | {
          type: ProviderTypes.ONE;
          payload: Parameters<typeof studentQueriesBob.getOne>[0] &
              ListQuery<Parameters<typeof studentQueriesBob.getOne>[0]>;
      }
    | {
          type: ProviderTypes.MANY_REFERENCE;
          payload: ListQuery<
              Parameters<typeof studentQueriesBob.getManyReference>[0],
              RaSortOrder,
              AppPagination
          >;
      }
    | {
          type: ProviderTypes.MANY_REFERENCE_STUDENT_LESSON;
          payload: ListQuery<
              Parameters<typeof studentQueriesBob.getManyReferenceByNameAndEmail>[0],
              RaSortOrder,
              AppPagination
          >;
      }
    | {
          type: ProviderTypes.MANY;
          payload: ListQuery<Parameters<typeof studentQueriesBob.getMany>[0]>;
      }
    | {
          type: ProviderTypes.LIST_WITH_FILTER;
          payload: ListQuery<
              Parameters<typeof studentQueriesBob.getListWithFilter>[0],
              RaSort | RaSort[],
              UsePaginationReturn
          >;
      }
    | {
          type: ProviderTypes.GET_GRADES_OF_STUDENTS;
          payload: ListQuery<Parameters<typeof studentQueriesBob.getGradesOfStudentsList>[0]>;
      }
    | {
          type: ProviderTypes.COUNT_STATUS;
          payload: ListQuery<Parameters<typeof studentQueriesBob.getCountStudentWithFilter>[0]>;
      }
    | {
          type: ProviderTypes.LIST_WITH_FILTER_LOCATIONS;
          payload: ListQuery<Parameters<typeof studentQueriesBob.getListWithFilterV2>[0]>;
      }
    | {
          type: ProviderTypes.COUNT_STUDENT_LOCATIONS;
          payload: ListQuery<Parameters<typeof studentQueriesBob.getCountStudentWithFilterV2>[0]>;
      };

const hasuraStudents = (params: Params) => {
    switch (params.type) {
        case ProviderTypes.MANY_REFERENCE: {
            const { pagination, filter } = params.payload;
            const { limit, offset } = calcGqlPagination(pagination);

            return studentQueriesBob.getManyReference({
                name: filter?.name,
                email: filter?.email,
                user_ids: filter?.user_ids,
                limit,
                offset,
            });
        }
        case ProviderTypes.MANY_REFERENCE_STUDENT_LESSON: {
            const { pagination, filter } = params.payload;
            const { limit, offset } = calcGqlPagination(pagination);
            return studentQueriesBob.getManyReferenceByNameAndEmail({
                keyword: filter?.keyword,
                limit,
                offset,
            });
        }
        case ProviderTypes.MANY: {
            const { filter } = params.payload;
            const { user_ids } = filter || {};

            if (!arrayHasItem(user_ids)) {
                return createEmptyResponse({ data: [] });
            }

            return studentQueriesBob.getMany({
                user_ids,
            });
        }
        case ProviderTypes.LIST_WITH_FILTER: {
            const { filter, pagination, sort } = params.payload;
            const { email, name, student_ids, grades, enrollment_status, last_login_date } =
                filter || {};

            return studentQueriesBob.getListWithFilter({
                email,
                name,
                student_ids,
                ...pagination,
                grades,
                enrollment_status,
                last_login_date,
                order_by: toGqlQuerySorts(sort),
            });
        }
        case ProviderTypes.ONE: {
            const { id, filter } = params.payload;

            const student_id = id || filter?.id!;

            if (typeof student_id !== "undefined" && student_id) {
                return studentQueriesBob.getOne({
                    id: student_id,
                });
            }

            return createEmptyResponse({ data: null });
        }
        case ProviderTypes.GET_GRADES_OF_STUDENTS: {
            const { filter } = params.payload;

            if (!filter || !arrayHasItem(filter?.student_ids)) {
                return createEmptyResponse({ data: [] });
            }

            return studentBobQuery.getGradesOfStudentsList({
                student_ids: filter?.student_ids,
            });
        }
        case ProviderTypes.COUNT_STATUS: {
            const { filter } = params.payload;
            const { email, name, student_ids, grades, enrollment_status, last_login_date } =
                filter || {};

            return studentQueriesBob.getCountStudentWithFilter({
                email,
                name,
                student_ids,
                grades,
                enrollment_status,
                last_login_date,
            });
        }

        case ProviderTypes.LIST_WITH_FILTER_LOCATIONS: {
            const { filter = {}, pagination, sort } = params.payload;

            return studentQueriesBob.getListWithFilterV2({
                ...filter,
                ...pagination,
                order_by: toGqlQuerySorts(sort),
            });
        }
        case ProviderTypes.COUNT_STUDENT_LOCATIONS: {
            const { filter = {} } = params.payload;

            return studentQueriesBob.getCountStudentWithFilterV2(filter);
        }
        default: {
            return getEmptyResponse();
        }
    }
};

export default hasuraStudents;
