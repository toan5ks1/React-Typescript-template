import { ProviderTypes } from "src/common/constants/enum";

import lessonManagementServiceBob from "../bob/lesson-management-service-bob";
import { getEmptyResponse } from "../utils";

type Params =
    | {
          type: ProviderTypes.LIST_WITH_FILTER;
          payload: Parameters<typeof lessonManagementServiceBob.retrieveLessons>[0];
      }
    | {
          type: ProviderTypes.CREATE;
          payload: Parameters<typeof lessonManagementServiceBob.createLesson>[0];
      }
    | {
          type: ProviderTypes.UPDATE;
          payload: Parameters<typeof lessonManagementServiceBob.updateLesson>[0];
      }
    | {
          type: ProviderTypes.DELETE;
          payload: Parameters<typeof lessonManagementServiceBob.deleteLesson>[0];
      };

const lessonManagementService = (params: Params) => {
    switch (params.type) {
        case ProviderTypes.CREATE: {
            return lessonManagementServiceBob.createLesson(params.payload);
        }

        case ProviderTypes.UPDATE: {
            return lessonManagementServiceBob.updateLesson(params.payload);
        }

        case ProviderTypes.DELETE: {
            return lessonManagementServiceBob.deleteLesson(params.payload);
        }

        case ProviderTypes.LIST_WITH_FILTER: {
            return lessonManagementServiceBob.retrieveLessons(params.payload);
        }

        default:
            return getEmptyResponse();
    }
};

export default lessonManagementService;
