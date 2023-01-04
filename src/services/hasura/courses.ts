import { ProviderTypes } from "src/common/constants/enum";
import { arrayHasItem } from "src/common/utils/other";
import { GraphqlPagination } from "src/hooks/data/data-types";
import { courseQueriesBob } from "src/services/bob/course-service-bob";
import { AppPagination, ListQuery } from "src/services/service-types";
import { RaSort } from "src/typings/react-admin";

import { calcGqlPagination, createEmptyResponse, getEmptyResponse } from "../utils";

type Params =
    | {
          type: ProviderTypes.MANY;
          payload: ListQuery<Parameters<typeof courseQueriesBob.getMany>[0]> & {
              ids?: string[];
          };
      }
    | {
          type: ProviderTypes.MANY_WITH_LOCATION;
          payload: ListQuery<Parameters<typeof courseQueriesBob.getManyWithLocation>[0]> & {
              ids?: string[];
          };
      }
    | {
          type: ProviderTypes.MANY_REFERENCE;
          payload: ListQuery<
              Parameters<typeof courseQueriesBob.getManyReference>[0],
              RaSort,
              AppPagination
          >;
      }
    | {
          type: ProviderTypes.MANY_REFERENCE_WITHOUT_CALC;
          payload: ListQuery<
              Parameters<typeof courseQueriesBob.getManyReference>[0],
              RaSort,
              GraphqlPagination
          >;
      }
    | {
          type: ProviderTypes.MANY_REFERENCE_WITH_LOCATION_WITHOUT_CALC;
          payload: ListQuery<
              Parameters<typeof courseQueriesBob.getManyReferenceWithLocationV2>[0],
              RaSort,
              GraphqlPagination
          >;
      };

const hasuraCourses = (params: Params) => {
    switch (params.type) {
        case ProviderTypes.MANY: {
            const { filter, ids } = params.payload;

            if (!arrayHasItem(filter?.course_id) && !arrayHasItem(ids)) {
                return createEmptyResponse({ data: null });
            }

            return courseQueriesBob.getMany({ course_id: filter?.course_id || ids });
        }

        case ProviderTypes.MANY_WITH_LOCATION: {
            const { filter, ids } = params.payload;

            if (!arrayHasItem(filter?.course_id) && !arrayHasItem(ids)) {
                return createEmptyResponse({ data: null });
            }

            return courseQueriesBob.getManyWithLocation({ course_id: filter?.course_id || ids });
        }

        case ProviderTypes.MANY_REFERENCE: {
            const { pagination, filter } = params.payload;
            const { limit, offset } = calcGqlPagination(pagination);

            return courseQueriesBob.getManyReference({
                name: filter?.name,
                limit,
                offset,
            });
        }

        case ProviderTypes.MANY_REFERENCE_WITHOUT_CALC: {
            const { pagination, filter } = params.payload;

            return courseQueriesBob.getManyReference({
                name: filter?.name,
                limit: pagination?.limit,
                offset: pagination?.offset,
            });
        }

        case ProviderTypes.MANY_REFERENCE_WITH_LOCATION_WITHOUT_CALC: {
            const { pagination, filter } = params.payload;

            return courseQueriesBob.getManyReferenceWithLocationV2({
                name: filter?.name,
                location_ids: filter?.location_ids,
                limit: pagination?.limit,
                offset: pagination?.offset,
            });
        }

        default: {
            return getEmptyResponse();
        }
    }
};

export default hasuraCourses;
