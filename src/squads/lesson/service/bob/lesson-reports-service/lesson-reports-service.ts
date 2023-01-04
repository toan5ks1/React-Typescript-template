import { arrayHasItem } from "src/common/utils/other";
import { GetPartnerDomainRequestQuery } from "src/squads/lesson/common/types";
import {
    LessonReportByLessonIdQueryVariables,
    Lesson_LessonReportListByLessonIdsQueryVariables,
    PreviousLessonReportByCourseIdAndStudentIdAndReportIdAndLessonIdV2QueryVariables,
} from "src/squads/lesson/service/bob/bob-types";
import { NsLesson_Bob_LessonReportsService } from "src/squads/lesson/service/bob/lesson-reports-service/types";
import { defineService } from "src/squads/lesson/service/service-creator";
import {
    InvalidParamError,
    MutationLessonIndividualReportParams,
} from "src/squads/lesson/service/service-types";
import {
    getInvalidParamErrorsOfLessonReportPayload,
    getInvalidParamErrorsOfNonSensitiveStringVariables,
} from "src/squads/lesson/service/utils/validation";

import lessonReportsQueriesBob from "src/squads/lesson/service/bob/lesson-reports-service/lesson-reports-bob.query";
import lessonReportsModifierServiceBob from "src/squads/lesson/service/bob/lesson-reports-service/lesson-reports-modifier.mutation";
import lessonReportsReaderServiceBob from "src/squads/lesson/service/bob/lesson-reports-service/lesson-reports-reader.mutation";

export const lessonReportsService = defineService({
    query: {
        lessonReportsGetOne: ({ lesson_id }: Partial<LessonReportByLessonIdQueryVariables>) => {
            if (!lesson_id) {
                throw new InvalidParamError({
                    action: "lessonReportsGetOne",
                    serviceName: "bobGraphQL",
                    errors: [{ field: "lesson_id" }],
                });
            }

            return lessonReportsQueriesBob.getOne({ lesson_id });
        },
        lessonGetLessonReportListByLessonIds: (
            variables: Lesson_LessonReportListByLessonIdsQueryVariables
        ) => {
            const { lesson_ids } = variables;

            if (!arrayHasItem(lesson_ids)) {
                throw new InvalidParamError({
                    action: "lessonGetLessonReportListByLessonIds",
                    serviceName: "bobGraphQL",
                    errors: [{ field: "lesson_ids" }],
                });
            }

            return lessonReportsQueriesBob.lessonGetLessonReportListByLessonIds(variables);
        },
        lessonReportsGetOneByCourseIdAndStudentIdAndReportIdAndLessonId: (
            variables: PreviousLessonReportByCourseIdAndStudentIdAndReportIdAndLessonIdV2QueryVariables
        ) => {
            const { report_course_id, report_user_id } = variables;

            const errors = getInvalidParamErrorsOfNonSensitiveStringVariables({
                report_course_id,
                report_user_id,
            });

            if (arrayHasItem(errors)) {
                throw new InvalidParamError({
                    action: "lessonReportsGetOneByCourseIdAndStudentIdAndReportIdAndLessonId",
                    serviceName: "bobGraphQL",
                    errors,
                });
            }

            return lessonReportsQueriesBob.getOneByCourseIdAndStudentIdAndReportIdAndLessonIdV2(
                variables
            );
        },
        lessonReportsRetrievePartnerDomain: (variables: GetPartnerDomainRequestQuery) => {
            if (!variables.type) {
                throw new InvalidParamError({
                    action: "lessonReportsRetrievePartnerDomain",
                    errors: [{ field: "type" }],
                    serviceName: "bobGraphQL",
                });
            }
            return lessonReportsReaderServiceBob.retrievePartnerDomain(variables);
        },
    },

    mutation: {
        lessonReportsSubmit: (
            data: Required<
                MutationLessonIndividualReportParams<NsLesson_Bob_LessonReportsService.UpsertLessonReport>
            >
        ) => {
            const errors = getInvalidParamErrorsOfLessonReportPayload(data, true);

            if (arrayHasItem(errors)) {
                throw new InvalidParamError({
                    action: "lessonReportsSubmit",
                    serviceName: "bobGraphQL",
                    errors,
                });
            }
            return lessonReportsModifierServiceBob.submitLessonReport(data);
        },
        lessonReportsSaveDraft: (
            data: Required<
                MutationLessonIndividualReportParams<NsLesson_Bob_LessonReportsService.UpsertLessonReport>
            >
        ) => {
            const errors = getInvalidParamErrorsOfLessonReportPayload(data, false);

            if (arrayHasItem(errors)) {
                throw new InvalidParamError({
                    action: "lessonReportsSaveDraft",
                    serviceName: "bobGraphQL",
                    errors,
                });
            }
            return lessonReportsModifierServiceBob.saveDraftLessonReport(data);
        },
        lessonReportsDelete: (
            data: Required<
                MutationLessonIndividualReportParams<NsLesson_Bob_LessonReportsService.DeleteLessonReport>
            >
        ) => {
            if (!data.data.lessonReportId) {
                throw new InvalidParamError({
                    action: "lessonReportsDelete",
                    serviceName: "bobGraphQL",
                    errors: [{ field: "lessonReportId" }],
                });
            }
            return lessonReportsModifierServiceBob.deleteLessonReport(data);
        },
    },
});
