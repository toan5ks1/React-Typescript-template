import { ERPModules } from "src/common/constants/enum";

import { Box } from "@mui/material";
import TextFieldHF from "src/components/TextFields/TextFieldHF";
import { DynamicFieldBaseProps } from "src/squads/lesson/components/DynamicFields/DynamicFieldBase";

import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";
import useTranslate from "src/squads/lesson/hooks/useTranslate";

export type DynamicFieldAttendanceRemarkProps = Omit<DynamicFieldBaseProps, "componentType">;

const DynamicFieldAttendanceRemark = (props: DynamicFieldAttendanceRemarkProps) => {
    const { fieldProps, name } = props;

    const t = useTranslate();
    const tLessonManagement = useResourceTranslate(ERPModules.LESSON_MANAGEMENT);

    const baseProps = {
        name,
        label: tLessonManagement("attendanceRemark"),
        required: fieldProps.is_required,
        rules: {
            required: {
                value: fieldProps.is_required,
                message: t("resources.input.error.required"),
            },
        },
    };

    return (
        <Box data-testid="DynamicFieldAttendanceRemark__container">
            <TextFieldHF
                id={`DynamicFieldAttendanceRemark__textField__${fieldProps.field_id}`}
                data-testid={`DynamicFieldAttendanceRemark__textField__${fieldProps.field_id}`}
                {...baseProps}
            />
        </Box>
    );
};

export default DynamicFieldAttendanceRemark;
