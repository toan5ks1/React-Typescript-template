import { arrayHasItem } from "src/common/utils/other";
import { UserIdentity } from "src/typings/auth-provider";
import { RaSort } from "src/typings/react-admin";

import { ProviderTypes } from "../../common/constants/enum";
import classModifierServiceBob from "../bob/class-modifier-bob";
import { lessonGroupQueriesBob } from "../bob/live-lesson-groups-service-bob";
import { AppPagination, ListQuery } from "../service-types";
import { calcGqlPagination, createEmptyResponse, getEmptyResponse } from "../utils";
import { coursesModifierServiceYasuo } from "../yasuo/course-service-yasuo/course-service-yasuo";

type Params =
    | {
          type: ProviderTypes.CONVERT_MEDIA;
          payload: Parameters<typeof classModifierServiceBob.convertMedia>[0];
      }
    | {
          type: ProviderTypes.ATTACH_MATERIAL;
          payload: Parameters<typeof coursesModifierServiceYasuo.attachMaterialsToCourse>[0];
          user: UserIdentity;
      }
    | {
          type: ProviderTypes.LIST;
          payload: ListQuery<
              Parameters<typeof lessonGroupQueriesBob.getList>[0],
              RaSort | RaSort[],
              AppPagination
          >;
      }
    | {
          type: ProviderTypes.LIST_WITH_FILTER;
          payload: {
              filter: Parameters<typeof lessonGroupQueriesBob.getListWithFilter>[0];
          };
      };

const hasuraLessonGroups = (params: Params) => {
    switch (params.type) {
        case ProviderTypes.LIST: {
            const { filter, pagination } = params.payload;

            const { limit, offset } = calcGqlPagination(pagination);
            const { course_id } = filter!;

            return lessonGroupQueriesBob.getList({ limit, offset, course_id });
        }
        case ProviderTypes.CONVERT_MEDIA: {
            return classModifierServiceBob.convertMedia(params.payload);
        }

        case ProviderTypes.ATTACH_MATERIAL: {
            const { courseId, lessonGroupId, mediaIds, files } = params.payload;
            return coursesModifierServiceYasuo.attachMaterialsToCourse({
                files,
                mediaIds,
                courseId,
                lessonGroupId,
            });
        }

        case ProviderTypes.LIST_WITH_FILTER: {
            const { lesson_group_ids, course_id, limit, offset } = params.payload.filter;

            if (arrayHasItem(lesson_group_ids)) {
                return lessonGroupQueriesBob.getListWithFilter({
                    lesson_group_ids,
                    course_id,
                    limit,
                    offset,
                });
            }

            return createEmptyResponse({
                data: [],
                total: 0,
            });
        }

        default: {
            return getEmptyResponse();
        }
    }
};

export default hasuraLessonGroups;
