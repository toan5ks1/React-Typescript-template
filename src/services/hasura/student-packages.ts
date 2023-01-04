import { ProviderTypes } from "src/common/constants/enum";
import { RaSort } from "src/typings/react-admin";

import {
    studentPackageFatimaQuery,
    studentPackageFatimaMutation,
} from "../fatima/student-package-fatima";
import { AppPagination, ListQuery } from "../service-types";
import {
    calcGqlPagination,
    createEmptyResponse,
    getEmptyResponse,
    toGqlQuerySorts,
} from "../utils";

type Params =
    | {
          type: ProviderTypes.CREATE;
          payload: Parameters<typeof studentPackageFatimaMutation.addStudentPackageCourse>[0];
      }
    | {
          type: ProviderTypes.UPDATE;
          payload: Parameters<typeof studentPackageFatimaMutation.updateStudentPackageCourse>[0];
      }
    | {
          type: ProviderTypes.ONE;
          payload: Parameters<typeof studentPackageFatimaQuery.getById>[0];
      }
    | {
          type: ProviderTypes.LIST;
          payload: ListQuery<
              Parameters<typeof studentPackageFatimaQuery.getList>[0],
              RaSort | RaSort[],
              AppPagination
          >;
      }
    | {
          type: ProviderTypes.LIST_WITH_FILTER;
          payload: ListQuery<
              Parameters<typeof studentPackageFatimaQuery.getListByArrayId>[0],
              RaSort | RaSort[]
          >;
      };

function studentPackages(params: Params) {
    switch (params.type) {
        case ProviderTypes.CREATE: {
            return studentPackageFatimaMutation.addStudentPackageCourse(params.payload);
        }

        case ProviderTypes.UPDATE: {
            return studentPackageFatimaMutation.updateStudentPackageCourse(params.payload);
        }

        case ProviderTypes.ONE: {
            return studentPackageFatimaQuery.getById(params.payload);
        }

        case ProviderTypes.LIST: {
            const { filter, pagination, sort } = params.payload;
            const { limit, offset } = calcGqlPagination(pagination);

            if (!filter?.student_id) {
                return createEmptyResponse({ data: [] });
            }

            return studentPackageFatimaQuery.getList({
                student_id: filter?.student_id || "",
                limit,
                offset,
                order_by: toGqlQuerySorts(sort),
            });
        }
        case ProviderTypes.LIST_WITH_FILTER: {
            const { filter, sort } = params.payload;

            return studentPackageFatimaQuery.getListByArrayId({
                student_ids: filter?.student_ids,
                order_by: toGqlQuerySorts(sort),
            });
        }

        default: {
            return getEmptyResponse();
        }
    }
}

export default studentPackages;
