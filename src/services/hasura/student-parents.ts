import { ProviderTypes } from "src/common/constants/enum";

import studentParentQueriesBob from "../bob/student-parent-service-bob";
import { ListQuery } from "../service-types";
import { getEmptyResponse } from "../utils";

type Params =
    | {
          type: ProviderTypes.LIST_WITH_FILTER;
          payload: ListQuery<
              Parameters<typeof studentParentQueriesBob.getManyParentIDs>[0] & {
                  student_ids: string[];
              }
          >;
      }
    | {
          type: ProviderTypes.LIST;
          payload: ListQuery<
              Parameters<typeof studentParentQueriesBob.getParentRelationships>[0] & {
                  userId: string;
              }
          >;
      };

const studentParentProvider = (params: Params) => {
    switch (params.type) {
        case ProviderTypes.LIST_WITH_FILTER: {
            const { filter } = params.payload;

            return studentParentQueriesBob.getManyParentIDs({
                student_ids: filter?.student_ids || [],
            });
        }

        case ProviderTypes.LIST: {
            const userId = params.payload.filter?.userId;
            if (!userId) return getEmptyResponse();

            return studentParentQueriesBob.getParentRelationships({
                userId: userId,
            });
        }

        default: {
            return getEmptyResponse();
        }
    }
};

export default studentParentProvider;
