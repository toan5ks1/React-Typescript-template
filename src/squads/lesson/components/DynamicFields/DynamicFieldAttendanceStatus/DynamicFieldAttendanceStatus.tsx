import { ERPModules } from "src/common/constants/enum";
import { generateTranslatedAttendanceStatusOptions } from "src/squads/lesson/common/constants";
import { DynamicAutocompleteOptionProps } from "src/squads/lesson/common/types";

import { Box } from "@mui/material";
import AutocompleteHF, { AutocompleteHFProps } from "src/components/Autocompletes/AutocompleteHF";
import { DynamicFieldBaseProps } from "src/squads/lesson/components/DynamicFields/DynamicFieldBase";

import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";
import useTranslate from "src/squads/lesson/hooks/useTranslate";

export type DynamicFieldAttendanceStatusProps = Omit<DynamicFieldBaseProps, "componentType">;

const DynamicFieldAttendanceStatus = (props: DynamicFieldAttendanceStatusProps) => {
    const { fieldProps, name } = props;

    const t = useTranslate();
    const tLessonManagement = useResourceTranslate(ERPModules.LESSON_MANAGEMENT);

    const baseProps = {
        name,
        label: tLessonManagement("attendanceStatus"),
        required: fieldProps.is_required,
        rules: {
            required: {
                value: fieldProps.is_required,
                message: t("resources.input.error.required"),
            },
        },
    };

    const autocompleteProps: AutocompleteHFProps<DynamicAutocompleteOptionProps> = {
        options: generateTranslatedAttendanceStatusOptions(tLessonManagement),
        optionLabelKey: "label",
        getOptionSelectedField: "key",
        ...baseProps,
    };

    return (
        <Box data-testid="DynamicFieldAttendanceStatus__container">
            <AutocompleteHF
                id={`DynamicFieldAttendanceStatus__autocomplete__${fieldProps.field_id}`}
                data-testid={`DynamicFieldAttendanceStatus__autocomplete__${fieldProps.field_id}`}
                {...autocompleteProps}
            />
        </Box>
    );
};

export default DynamicFieldAttendanceStatus;
