import { ERPModules } from "src/common/constants/enum";
import { LabelComponentTypeRecord } from "src/squads/lesson/common/constants";
import { LessonReportBusinessRuleFieldIds } from "src/squads/lesson/common/types";

import TypographyWithValue from "src/components/Typographys/TypographyWithValue";
import { DynamicLabelBaseProps } from "src/squads/lesson/components/DynamicLabels/DynamicLabelBase";

import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";

export type DynamicLabelAttendanceRemarkProps = Pick<DynamicLabelBaseProps, "dynamicData">;

const DynamicLabelAttendanceRemark = (props: DynamicLabelAttendanceRemarkProps) => {
    const { dynamicData } = props;

    const tLessonManagement = useResourceTranslate(ERPModules.LESSON_MANAGEMENT);

    const remarkData = dynamicData.find(
        (data) => data.field_id === LessonReportBusinessRuleFieldIds.ATTENDANCE_REMARK
    );

    const labelProps: LabelComponentTypeRecord["TYPOGRAPHY_WITH_VALUE"] = {
        hasDoubleDash: true,
        label: tLessonManagement("attendanceRemark"),
        value: remarkData?.value,
        variant: "horizontal",
        dataTestidLabel: "DynamicLabelAttendanceRemark__typographyLabel",
        dataTestidValue: "DynamicLabelAttendanceRemark__typographyValue",
    };

    return <TypographyWithValue {...labelProps} />;
};

export default DynamicLabelAttendanceRemark;
