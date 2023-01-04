import AutocompleteHF, { AutocompleteHFProps } from "src/components/Autocompletes/AutocompleteHF";

import {
    useFetchCourseAutocompleteProps,
    CoursesLocationChoiceTypes,
} from "src/squads/user/modules/student-course-upsert/hooks/useFetchCourseAutocomplete";

export interface CourseAutoCompleteHFProps
    extends Pick<
            AutocompleteHFProps<CoursesLocationChoiceTypes>,
            | "optionImage"
            | "disableClearable"
            | "disableCloseOnSelect"
            | "freeSolo"
            | "open"
            | "id"
            | "required"
            | "label"
            | "multiple"
            | "placeholder"
            | "rules"
            | "limitChipText"
            | "filterSelectedOptions"
            | "isOptionEqualToValue"
            | "getOptionDisabled"
            | "disabled"
            | "onInputChange"
            | "options"
            | "loading"
            | "name"
            | "onSelect"
            | "onChange"
            | "onClose"
            | "getOptionSelectedField"
            | "shouldShowHelperText"
        >,
        Omit<useFetchCourseAutocompleteProps, "resource"> {}

const CourseAutoCompleteHF = ({
    optionLabelKey = "name",
    multiple = true,
    ...rest
}: CourseAutoCompleteHFProps) => {
    return (
        <AutocompleteHF<CoursesLocationChoiceTypes>
            data-testid="GlobalAutocompleteHR"
            multiple={multiple}
            optionLabelKey={optionLabelKey} //If this causes bug you should try to pass in optionLabelKey="value"
            filterOptions={(options: CoursesLocationChoiceTypes[]) => {
                return options; // hack to search by option: helperText or value
            }}
            {...rest}
        />
    );
};

const AutocompleteReferenceHF = (props: CourseAutoCompleteHFProps) => {
    return <CourseAutoCompleteHF {...props} />;
};

export default AutocompleteReferenceHF;
