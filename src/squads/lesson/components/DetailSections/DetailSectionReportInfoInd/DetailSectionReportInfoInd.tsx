import { ReactElement } from "react";

import { ArrayElement } from "src/common/constants/types";
import { arrayHasItem } from "src/common/utils/other";
import {
    DynamicFieldProps,
    LessonReportDetailOfStudentWithPreviousReport,
    LessonReportIndividualDynamicComponentType,
} from "src/squads/lesson/common/types";
import { LessonReportByLessonIdQuery } from "src/squads/lesson/service/bob/bob-types";

import { Grid } from "@mui/material";
import ButtonPreviousReport, {
    ButtonPreviousReportProps,
} from "src/squads/lesson/components/Buttons/ButtonPreviousReport";
import ButtonViewStudyPlan, {
    ButtonViewStudyPlanProps,
} from "src/squads/lesson/components/Buttons/ButtonViewStudyPlan";
import DynamicLabelAttendanceRemark from "src/squads/lesson/components/DynamicLabels/DynamicLabelAttendanceRemark";
import DynamicLabelAttendanceStatus from "src/squads/lesson/components/DynamicLabels/DynamicLabelAttendanceStatus";
import DynamicLabelLessonReport from "src/squads/lesson/components/DynamicLabels/DynamicLabelLessonReport";

export interface DetailSectionReportInfoIndProps extends ButtonViewStudyPlanProps {
    fields: DynamicFieldProps[];
    dynamicLessonReportData: LessonReportDetailOfStudentWithPreviousReport["dynamicLessonReportData"];
    previousLessonReport: LessonReportDetailOfStudentWithPreviousReport["previousLessonReport"];
    reportId: ArrayElement<LessonReportByLessonIdQuery["lesson_reports"]>["lesson_report_id"];
    lessonId: ArrayElement<LessonReportByLessonIdQuery["lesson_reports"]>["lesson_id"];
}

const DetailSectionReportInfoInd = (props: DetailSectionReportInfoIndProps) => {
    const { fields, dynamicLessonReportData, courseId, studentId, reportId, lessonId } = props;

    const handleRenderDynamicSection = (field: DynamicFieldProps): ReactElement => {
        switch (field.component_config.type) {
            case LessonReportIndividualDynamicComponentType.BUTTON_PREVIOUS_REPORT: {
                const props: ButtonPreviousReportProps = {
                    courseId,
                    studentId,
                    reportId,
                    lessonId: lessonId || "",
                };

                return <ButtonPreviousReport {...props} />;
            }

            case LessonReportIndividualDynamicComponentType.LINK_VIEW_STUDY_PLAN: {
                return <ButtonViewStudyPlan courseId={courseId} studentId={studentId} />;
            }

            case LessonReportIndividualDynamicComponentType.ATTENDANCE_STATUS: {
                return <DynamicLabelAttendanceStatus dynamicData={dynamicLessonReportData} />;
            }

            case LessonReportIndividualDynamicComponentType.ATTENDANCE_REMARK: {
                return <DynamicLabelAttendanceRemark dynamicData={dynamicLessonReportData} />;
            }

            default:
                return (
                    <DynamicLabelLessonReport
                        field={field}
                        dynamicLessonReportData={dynamicLessonReportData}
                    />
                );
        }
    };

    if (!arrayHasItem(fields)) return <></>;
    return (
        <Grid container item spacing={2}>
            {fields.map((field) => {
                return (
                    <Grid item {...field.display_config.size} key={field.field_id}>
                        {handleRenderDynamicSection(field)}
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default DetailSectionReportInfoInd;
