import { ProviderTypes } from "src/common/constants/enum";
import { AppPagination, GqlPagination, ListQuery } from "src/services/service-types";
import { RaSort } from "src/typings/react-admin";

import { arrayHasItem, genHasuraArrayString } from "../../common/utils/other";
import { courseStudentQueriesEureka } from "../eureka/course-student-service-eureka";
import { createEmptyResponse, getEmptyResponse } from "../utils";

type Params =
    | {
          type: ProviderTypes.LIST;
          payload: ListQuery<
              Parameters<typeof courseStudentQueriesEureka.getListByFilter>[0],
              RaSort | RaSort[],
              GqlPagination
          >;
      }
    | {
          type: ProviderTypes.MANY;
          payload: ListQuery<Parameters<typeof courseStudentQueriesEureka.getMany>[0]>;
      }
    | {
          type: ProviderTypes.LIST_WITH_FILTER;
          payload: ListQuery<
              Parameters<typeof courseStudentQueriesEureka.getListWithFilter>[0],
              RaSort | RaSort[],
              AppPagination
          >;
      };

const hasuraCourseStudents = (params: Params) => {
    switch (params.type) {
        case ProviderTypes.LIST: {
            const { filter, pagination } = params.payload;

            const { courseId, search, grades, bookIds } = filter!;
            const { limit, offset } = pagination!;

            return courseStudentQueriesEureka.getListByFilter({
                grades: arrayHasItem(grades) ? genHasuraArrayString(grades) : undefined,
                bookIds: arrayHasItem(bookIds) ? genHasuraArrayString(bookIds) : undefined,
                courseId,
                limit,
                offset,
                search,
            });
        }

        case ProviderTypes.MANY: {
            const { filter } = params.payload;
            const { course_id } = filter!;

            return courseStudentQueriesEureka.getMany({ course_id });
        }

        case ProviderTypes.LIST_WITH_FILTER: {
            const { filter } = params.payload;
            const { course_ids } = filter!;
            if (!arrayHasItem(course_ids)) return createEmptyResponse({ data: [] });

            return courseStudentQueriesEureka.getListWithFilter({ course_ids });
        }

        default: {
            return getEmptyResponse();
        }
    }
};

export default hasuraCourseStudents;
