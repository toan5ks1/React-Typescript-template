import { arrayHasItem } from "src/common/utils/other";
import { Lesson_LessonByLessonIdForLessonManagementV3QueryVariables } from "src/squads/lesson/service/bob/bob-types";
import { NsLesson_Bob_LessonsService } from "src/squads/lesson/service/bob/lessons-service/types";
import { defineService } from "src/squads/lesson/service/service-creator";
import { InvalidParamError } from "src/squads/lesson/service/service-types";
import { getInvalidParamErrorsOfLessonUpsertPayload } from "src/squads/lesson/service/utils/validation";

import lessonsQueriesBob from "src/squads/lesson/service/bob/lessons-service/lessons-bob.query";
import lessonsManagementServiceBob from "src/squads/lesson/service/bob/lessons-service/lessons-management.mutation";

export const lessonsService = defineService({
    query: {
        lessonsGetOne: ({
            lesson_id,
        }: Partial<Lesson_LessonByLessonIdForLessonManagementV3QueryVariables>) => {
            if (!lesson_id) {
                throw new InvalidParamError({
                    action: "lessonsGetOne",
                    serviceName: "bobGraphQL",
                    errors: [{ field: "lesson_id" }],
                });
            }

            return lessonsQueriesBob.getOneForLessonManagement({ lesson_id });
        },
        lessonsRetrieve: (data: NsLesson_Bob_LessonsService.RetrieveLessonsRequest) => {
            if (!data?.paging) {
                throw new InvalidParamError({
                    action: "lessonsRetrieve",
                    serviceName: "bobGraphQL",
                    errors: [{ field: "paging" }],
                });
            }
            return lessonsManagementServiceBob.retrieveLessons(data);
        },
    },

    mutation: {
        lessonsCreate: (data: NsLesson_Bob_LessonsService.UpsertLessons) => {
            const errors = getInvalidParamErrorsOfLessonUpsertPayload(data);
            if (arrayHasItem(errors)) {
                throw new InvalidParamError({
                    action: "lessonsCreate",
                    serviceName: "bobGraphQL",
                    errors,
                });
            }

            return lessonsManagementServiceBob.createLesson({ data });
        },
        lessonsUpdate: (data: NsLesson_Bob_LessonsService.UpsertLessons) => {
            const errors = getInvalidParamErrorsOfLessonUpsertPayload(data);

            if (!data?.lessonId) errors.push({ field: "lessonId" });

            if (arrayHasItem(errors)) {
                throw new InvalidParamError({
                    action: "lessonsUpdate",
                    serviceName: "bobGraphQL",
                    errors,
                });
            }

            return lessonsManagementServiceBob.updateLesson({ data });
        },
        lessonsDelete: (data: NsLesson_Bob_LessonsService.DeleteLessonRequest) => {
            if (!data.lessonId) {
                throw new InvalidParamError({
                    action: "lessonsUpdate",
                    serviceName: "bobGraphQL",
                    errors: [{ field: "lessonId" }],
                });
            }

            return lessonsManagementServiceBob.deleteLesson({ data });
        },
        lessonsSaveDraft: (data: NsLesson_Bob_LessonsService.UpsertLessons) => {
            const errors = getInvalidParamErrorsOfLessonUpsertPayload(data, true);
            if (arrayHasItem(errors)) {
                throw new InvalidParamError({
                    action: "lessonsSaveDraft",
                    serviceName: "bobGraphQL",
                    errors,
                });
            }

            return lessonsManagementServiceBob.createLesson({ data });
        },
        lessonsUpdateDraft: (data: NsLesson_Bob_LessonsService.UpsertLessons) => {
            const errors = getInvalidParamErrorsOfLessonUpsertPayload(data, true);

            if (!data?.lessonId) errors.push({ field: "lessonId" });

            if (arrayHasItem(errors)) {
                throw new InvalidParamError({
                    action: "lessonsUpdateDraft",
                    serviceName: "bobGraphQL",
                    errors,
                });
            }

            return lessonsManagementServiceBob.updateLesson({ data });
        },
    },
});
