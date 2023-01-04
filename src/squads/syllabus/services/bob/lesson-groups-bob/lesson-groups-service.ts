import { arrayHasItem } from "src/common/utils/other";
import { Lesson_LessonGroupsListByLessonGroupIdsAndCourseIdQueryVariables } from "src/squads/syllabus/services/bob/bob-types";
import { lessonGroupsQueriesBob } from "src/squads/syllabus/services/bob/lesson-groups-bob";
import { defineService } from "src/squads/syllabus/services/service-creator";
import { createEmptyResponse } from "src/squads/syllabus/services/utils/utils";

import lessonGroupsServiceBob from "./lesson-groups-bob.mutation";
import { NsBobModifierClassService } from "./types";

export const lessonGroupsService = defineService({
    query: {
        lessonGroupGetListWithFilter: (
            variables: Lesson_LessonGroupsListByLessonGroupIdsAndCourseIdQueryVariables
        ) => {
            const { lesson_group_ids, course_id, limit, offset } = variables;

            if (arrayHasItem(lesson_group_ids)) {
                return lessonGroupsQueriesBob.getListWithFilter({
                    lesson_group_ids,
                    course_id,
                    limit,
                    offset,
                });
            }

            return createEmptyResponse(undefined);
        },
    },
    mutation: {
        lessonGroupsConvertMedia: (payload: NsBobModifierClassService.ConvertMedia) => {
            return lessonGroupsServiceBob.convertMedia(payload);
        },
    },
});
