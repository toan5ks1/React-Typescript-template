import { ERPModules } from "src/common/constants/enum";
import { generateTranslatedAttendanceStatusOptions } from "src/squads/lesson/common/constants";
import { DynamicAutocompleteOptionProps } from "src/squads/lesson/common/types";
import { isDynamicAutocompleteOptionProps } from "src/squads/lesson/common/utils";

import AutocompleteBase, {
    AutocompleteBaseProps,
} from "src/squads/lesson/components/Autocompletes/AutocompleteBase";

import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";

export interface AutocompleteAttendanceStatusProps
    extends Omit<
        AutocompleteBaseProps<DynamicAutocompleteOptionProps>,
        "onChange" | "optionLabelKey" | "options"
    > {
    onChange: (option: DynamicAutocompleteOptionProps) => void;
}

const AutocompleteAttendanceStatus = (props: AutocompleteAttendanceStatusProps) => {
    const { onChange, ...rest } = props;

    const tLessonManagement = useResourceTranslate(ERPModules.LESSON_MANAGEMENT);

    return (
        <AutocompleteBase<DynamicAutocompleteOptionProps>
            {...rest}
            optionLabelKey="label"
            options={generateTranslatedAttendanceStatusOptions(tLessonManagement)}
            onChange={(_, value) => {
                if (isDynamicAutocompleteOptionProps(value)) onChange(value);
            }}
        />
    );
};

export default AutocompleteAttendanceStatus;
