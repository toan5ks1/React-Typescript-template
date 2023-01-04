import { ProviderTypes } from "src/common/constants/enum";
import { getEmptyResponse, createEmptyResponse } from "src/services/utils";

import courseAccessPathsQueriesBob from "../bob/course-access-paths-service-bob";

type Params =
    | {
          type: ProviderTypes.GET_LOCATION_IDS_BY_COURSE_ID;
          payload: {
              filter: Parameters<typeof courseAccessPathsQueriesBob.getLocationIdsByCourseIdV2>[0];
          };
      }
    | {
          type: ProviderTypes.MANY;
          payload: {
              filter: Parameters<typeof courseAccessPathsQueriesBob.getMany>[0];
          };
      }
    | {
          type: ProviderTypes.ONE;
          payload: {
              filter: Parameters<typeof courseAccessPathsQueriesBob.getOne>[0];
          };
      }
    | {
          type: ProviderTypes.MANY_REFERENCE;
          payload: {
              filter: Parameters<
                  typeof courseAccessPathsQueriesBob.getCourseLocationsByCourseId
              >[0];
          };
      };

const hasuraCourseAccessPaths = (params: Params) => {
    switch (params.type) {
        case ProviderTypes.GET_LOCATION_IDS_BY_COURSE_ID: {
            const { course } = params.payload.filter;
            return courseAccessPathsQueriesBob.getLocationIdsByCourseIdV2({
                course,
            });
        }

        case ProviderTypes.MANY: {
            const { course_ids } = params.payload.filter;
            return courseAccessPathsQueriesBob.getMany({
                course_ids,
            });
        }
        case ProviderTypes.ONE: {
            const { filter } = params.payload;
            if (!filter || !filter.course_id || !filter.location_id)
                return createEmptyResponse({ data: [] });

            return courseAccessPathsQueriesBob.getOne(filter);
        }

        case ProviderTypes.MANY_REFERENCE: {
            const { filter } = params.payload;
            if (!filter || !filter.course_id) return createEmptyResponse({ data: [] });

            return courseAccessPathsQueriesBob.getCourseLocationsByCourseId(filter);
        }

        default: {
            return getEmptyResponse();
        }
    }
};

export default hasuraCourseAccessPaths;
