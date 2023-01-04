import { ArrayElement } from "src/common/constants/types";
import {
    PartnerFormDynamicFieldValueByPreviousReportQueried,
    LessonMemberByPreviousReportQueried,
} from "src/squads/lesson/common/types";
import { PreviousLessonReportByCourseIdAndStudentIdAndReportIdAndLessonIdV2QueryVariables } from "src/squads/lesson/service/bob/bob-types";
import { inferQuery } from "src/squads/lesson/service/infer-query";

import useShowSnackbar from "src/squads/lesson/hooks/useShowSnackbar";
import useTranslate from "src/squads/lesson/hooks/useTranslate";

export interface UsePreviousLessonReportReturn {
    formConfigId: string;
    dynamicValues: ArrayElement<PartnerFormDynamicFieldValueByPreviousReportQueried>[];
    attendanceValues: ArrayElement<LessonMemberByPreviousReportQueried>;
}

export interface UsePreviousLessonReportProps {
    studentId: string;
    courseId: string;
    reportId: string | null;
    lessonId: string;
}

export type GetPreviousLessonReportVariables =
    PreviousLessonReportByCourseIdAndStudentIdAndReportIdAndLessonIdV2QueryVariables;

const usePreviousLessonReport = (
    props: UsePreviousLessonReportProps
): UsePreviousLessonReportReturn => {
    const { studentId, courseId, reportId, lessonId } = props;
    const t = useTranslate();
    const showSnackbar = useShowSnackbar();

    const filterVariables: GetPreviousLessonReportVariables = {
        report_user_id: studentId,
        report_course_id: courseId,
        report_id: reportId,
        report_lesson_id: lessonId,
    };
    const { data: lessonReport } = inferQuery({
        entity: "lessonReports",
        action: "lessonReportsGetOneByCourseIdAndStudentIdAndReportIdAndLessonId",
    })(
        { ...filterVariables },
        {
            enabled:
                Boolean(filterVariables.report_course_id) &&
                Boolean(filterVariables.report_user_id),
            onError(error: Error) {
                window.warner?.warn(`usePreviousLessonReport getLessonReport`, error);
                showSnackbar(`${t("ra.message.unableToLoadData")} ${t(error.message)}`, "error");
            },
        }
    );

    const { data: dynamicValues } = inferQuery({
        entity: "partnerDynamicFormFieldValues",
        action: "partnerDynamicFormFieldValuesGetOneByLessonReportDetailsIdAndStudentId",
    })(
        {
            user_id: studentId,
            report_id: lessonReport?.lesson_report_id || "",
        },
        {
            enabled: Boolean(lessonReport?.lesson_report_id),
            onError(error: Error) {
                window.warner?.warn("usePreviousLessonReport getPartnerFormDynamicValues", error);
                showSnackbar(`${t("ra.message.unableToLoadData")} ${t(error.message)}`, "error");
            },
        }
    );

    const { data: attendanceValues } = inferQuery({
        entity: "lessonMembers",
        action: "lessonMembersGetOneLessonMemberByUserIdAndCourseIdAndLessonId",
    })(
        {
            course_id: courseId,
            user_id: studentId,
            lesson_id: lessonReport?.lesson_id || "",
        },
        {
            enabled: Boolean(lessonReport && lessonId),
            onError(error: Error) {
                window.warner?.warn(`usePreviousLessonReport getLessonMember`, error);
                showSnackbar(`${t("ra.message.unableToLoadData")} ${t(error.message)}`, "error");
            },
        }
    );

    return {
        formConfigId: lessonReport?.form_config_id || "",
        dynamicValues: dynamicValues || [],
        attendanceValues: attendanceValues || {},
    };
};

export default usePreviousLessonReport;
