import { LessonsByCourseIdQuery } from "src/squads/syllabus/services/bob/bob-types";
import { inferQuery, inferQueryPagination } from "src/squads/syllabus/services/infer-query";
import { ArrayElement } from "src/squads/syllabus/typings/support-types";

const useLessonGroupContainLesson = (course_id: string) => {
    const { data: lessonGroupIds = [] } = inferQuery({
        entity: "lessonsSyllabus",
        action: "lessonSyllabusGetMany",
    })(
        {
            course_id,
        },
        {
            enabled: true,
            selector(data) {
                return data
                    ? data.map(
                          (lesson: ArrayElement<LessonsByCourseIdQuery["lessons"]>) =>
                              lesson.lesson_group_id || ""
                      )
                    : [];
            },
        }
    );

    const {
        result: { data: lessonGroupListQuery = [], isLoading, refetch: refetchLessonGroup },
        pagination,
    } = inferQueryPagination({
        entity: "lessonGroups",
        action: "lessonGroupGetListWithFilter",
    })(
        {
            lesson_group_ids: lessonGroupIds,
            course_id, // Confirmed at https://manabie.atlassian.net/browse/LT-11680
        },
        {
            enabled: true,
            defaultLimit: 50,
        }
    );

    return {
        lessonGroupListQuery,
        loading: isLoading,
        pagination,
        updateLessonGroups: refetchLessonGroup,
    };
};

export default useLessonGroupContainLesson;
