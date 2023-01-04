import { Lesson_LessonGroupsListByLessonGroupIdsAndCourseIdQuery } from "src/squads/syllabus/services/bob/bob-types";

export const mockLessonGroups: Lesson_LessonGroupsListByLessonGroupIdsAndCourseIdQuery["lesson_groups"] =
    [
        { lesson_group_id: "lesson_group_id_1", media_ids: ["media_id_1", "media_id_2"] },
        { lesson_group_id: "lesson_group_id_2", media_ids: ["media_id_3", "media_id_4"] },
    ];
