import { NsLesson_LessonMgmt_LessonsService } from "src/squads/lesson/service/lessonmgmt/lessons-service/types";
import { defineService } from "src/squads/lesson/service/service-creator";
import { InvalidParamError } from "src/squads/lesson/service/service-types";

import lessonsServiceLessonMgmt from "src/squads/lesson/service/lessonmgmt/lessons-service/lessons-management.mutation";

export const lessonsService = defineService({
    mutation: {
        lessonsUpdateStatus: (
            data: NsLesson_LessonMgmt_LessonsService.UpdateLessonSchedulingStatusRequest
        ) => {
            if (!data.lessonId) {
                throw new InvalidParamError({
                    action: "lessonsUpdateStatus",
                    serviceName: "lessonmgmtGraphQL",
                    errors: [{ field: "lessonId" }],
                });
            }

            return lessonsServiceLessonMgmt.updateLessonSchedulingStatus({ data });
        },
    },
});
