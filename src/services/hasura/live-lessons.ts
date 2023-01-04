import { ProviderTypes } from "src/common/constants/enum";

import { RetrieveLessonsRequest } from "manabuf/bob/v1/lessons_pb";

import { liveLessonBobQuery } from "../bob/live-lessons-service-bob";
import lessonServiceBob from "../bob/live-lessons-service-bob/live-lessons-bob.mutation";
import { createEmptyResponse, getEmptyResponse } from "../utils";

type Params =
    | {
          type: ProviderTypes.ONE;
          payload: {
              filter: Parameters<typeof liveLessonBobQuery.getOne>[0];
          };
      }
    | {
          type: ProviderTypes.MANY;
          payload: {
              filter: Parameters<typeof liveLessonBobQuery.getMany>[0];
          };
      }
    | {
          type: ProviderTypes.LIST_WITH_FILTER;
          payload: RetrieveLessonsRequest.AsObject;
      };

const liveLessonService = (params: Params) => {
    switch (params.type) {
        case ProviderTypes.LIST_WITH_FILTER: {
            return lessonServiceBob.retrieveLesson(params.payload);
        }
        case ProviderTypes.ONE: {
            return liveLessonBobQuery.getOne({ lesson_id: params.payload.filter.lesson_id });
        }
        case ProviderTypes.MANY: {
            const { course_id } = params.payload.filter;

            if (course_id) {
                return liveLessonBobQuery.getMany({
                    course_id,
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

export default liveLessonService;
