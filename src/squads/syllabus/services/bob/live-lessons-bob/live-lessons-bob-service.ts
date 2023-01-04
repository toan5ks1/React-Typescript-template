import { LessonsByCourseIdQueryVariables } from "src/squads/syllabus/services/bob/bob-types";
import { liveLessonsQueriesBob } from "src/squads/syllabus/services/bob/live-lessons-bob";
import { defineService } from "src/squads/syllabus/services/service-creator";
import { InvalidParamError } from "src/squads/syllabus/services/service-types";

export const lessonsSyllabusService = defineService({
    query: {
        lessonSyllabusGetMany: (variables: LessonsByCourseIdQueryVariables) => {
            const { course_id } = variables;

            if (!course_id) {
                throw new InvalidParamError({
                    action: "lessonSyllabusGetMany",
                    errors: [{ field: "course_id" }],
                    serviceName: "bobGraphQL",
                });
            }

            return liveLessonsQueriesBob.getMany({
                course_id,
            });
        },
    },
});
