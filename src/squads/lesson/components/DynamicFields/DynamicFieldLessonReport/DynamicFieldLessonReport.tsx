import { ArrayElement } from "src/common/constants/types";
import { lessonReportDetailsFormKeyName } from "src/squads/lesson/common/constants";
import {
    DynamicFieldProps,
    LessonForLessonReportQueried,
    LessonReportIndividualDynamicComponentType,
} from "src/squads/lesson/common/types";
import { convertToString } from "src/squads/lesson/common/utils";

import { Grid } from "@mui/material";
import ButtonPreviousReport from "src/squads/lesson/components/Buttons/ButtonPreviousReport";
import ButtonViewStudyPlan from "src/squads/lesson/components/Buttons/ButtonViewStudyPlan";
import DynamicFieldAttendanceRemark from "src/squads/lesson/components/DynamicFields/DynamicFieldAttendanceRemark";
import DynamicFieldAttendanceStatus from "src/squads/lesson/components/DynamicFields/DynamicFieldAttendanceStatus";
import DynamicFieldBase, {
    DynamicFieldBaseProps,
} from "src/squads/lesson/components/DynamicFields/DynamicFieldBase";

import { LessonManagementReportsIndividualData } from "src/squads/lesson/pages/LessonManagement/common/types";

export interface DynamicFieldLessonReportProps {
    fields: DynamicFieldProps[];
    reportIndex: number;
    student: ArrayElement<LessonForLessonReportQueried["lesson_members"]>;
    lessonReportId: LessonManagementReportsIndividualData["lessonReportId"];
    lessonId: LessonManagementReportsIndividualData["lessonId"];
}

const DynamicFieldLessonReport = (props: DynamicFieldLessonReportProps) => {
    const { fields, reportIndex, student, lessonReportId, lessonId } = props;

    const dynamicFieldComponent = (field: DynamicFieldProps) => {
        const baseDynamicFieldProps: Omit<DynamicFieldBaseProps, "componentType"> = {
            fieldProps: field,
            name: lessonReportDetailsFormKeyName(reportIndex, field.field_id),
        };

        switch (field.component_config.type) {
            case LessonReportIndividualDynamicComponentType.BUTTON_PREVIOUS_REPORT: {
                const reportId = lessonReportId.length ? lessonReportId : null;

                return (
                    <ButtonPreviousReport
                        courseId={convertToString(student.course?.course_id)}
                        studentId={student.user.user_id}
                        reportId={reportId}
                        lessonId={lessonId}
                    />
                );
            }

            case LessonReportIndividualDynamicComponentType.LINK_VIEW_STUDY_PLAN: {
                return (
                    <ButtonViewStudyPlan
                        courseId={convertToString(student.course?.course_id)}
                        studentId={student.user.user_id}
                    />
                );
            }

            case LessonReportIndividualDynamicComponentType.ATTENDANCE_STATUS: {
                return <DynamicFieldAttendanceStatus {...baseDynamicFieldProps} />;
            }

            case LessonReportIndividualDynamicComponentType.ATTENDANCE_REMARK: {
                return <DynamicFieldAttendanceRemark {...baseDynamicFieldProps} />;
            }

            default:
                return (
                    <DynamicFieldBase
                        {...baseDynamicFieldProps}
                        componentType={field.component_config.type}
                    />
                );
        }
    };

    return (
        <Grid container spacing={2}>
            {fields.map((field) => {
                return (
                    <Grid item {...field.display_config.size} key={field.field_id}>
                        {dynamicFieldComponent(field)}
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default DynamicFieldLessonReport;
