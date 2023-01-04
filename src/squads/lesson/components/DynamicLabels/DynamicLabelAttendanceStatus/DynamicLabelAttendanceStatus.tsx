import { ERPModules } from "src/common/constants/enum";
import { LabelComponentTypeRecord } from "src/squads/lesson/common/constants";
import {
    LessonReportBusinessRuleFieldIds,
    StudentAttendStatusType,
} from "src/squads/lesson/common/types";

import TypographyWithValue from "src/components/Typographys/TypographyWithValue";
import { DynamicLabelBaseProps } from "src/squads/lesson/components/DynamicLabels/DynamicLabelBase";

import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";

export type DynamicLabelAttendanceStatusProps = Pick<DynamicLabelBaseProps, "dynamicData">;

const DynamicLabelAttendanceStatus = (props: DynamicLabelAttendanceStatusProps) => {
    const { dynamicData } = props;

    const tLessonManagement = useResourceTranslate(ERPModules.LESSON_MANAGEMENT);

    const statusData = dynamicData.find(
        (data) => data.field_id === LessonReportBusinessRuleFieldIds.ATTENDANCE_STATUS
    );

    const attendanceEmptyValue: StudentAttendStatusType = "STUDENT_ATTEND_STATUS_EMPTY";
    const attendanceValue =
        statusData?.value !== attendanceEmptyValue ? statusData?.value : undefined;

    const translatedValue =
        attendanceValue && typeof attendanceValue === "string"
            ? tLessonManagement(`studentAttendanceStatus.${attendanceValue}`)
            : undefined;

    const labelProps: LabelComponentTypeRecord["TYPOGRAPHY_WITH_VALUE"] = {
        hasDoubleDash: true,
        label: tLessonManagement("attendanceStatus"),
        value: translatedValue,
        variant: "horizontal",
        dataTestidLabel: "DynamicLabelAttendanceStatus__typographyLabel",
        dataTestidValue: "DynamicLabelAttendanceStatus__typographyValue",
    };

    return <TypographyWithValue {...labelProps} />;
};

export default DynamicLabelAttendanceStatus;
