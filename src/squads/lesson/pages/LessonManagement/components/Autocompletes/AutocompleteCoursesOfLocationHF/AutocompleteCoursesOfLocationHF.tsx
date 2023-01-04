import { useMemo, useState } from "react";

import debounce from "lodash/debounce";
import { DEFAULT_DEBOUNCE_AUTOCOMPLETE_TIME } from "src/common/constants/const";

import AutocompleteHF, {
    AutocompleteHFProps,
} from "src/squads/lesson/components/Autocompletes/AutocompleteHF";

import {
    CourseManyReferenceQueried,
    LessonManagementUpsertFormType,
} from "src/squads/lesson/pages/LessonManagement/common/types";
import useCourseManyReference from "src/squads/lesson/pages/LessonManagement/hooks/useCourseManyReference";

export interface AutocompleteCoursesOfLocationHFProps
    extends Omit<
        AutocompleteHFProps<CourseManyReferenceQueried>,
        "optionLabelKey" | "getOptionSelectedField" | "options" | "loading" | "onInputChange"
    > {
    location: LessonManagementUpsertFormType["location"];
    course: LessonManagementUpsertFormType["course"];
}

const [labelKey, selectFieldKey]: Array<keyof CourseManyReferenceQueried> = ["name", "course_id"];

const AutocompleteCoursesOfLocationHF = (props: AutocompleteCoursesOfLocationHFProps) => {
    const { location, course, disabled, onChange, ...rest } = props;

    const [courseName, setCourseName] = useState<string | undefined>("");

    const { courses: data, isLoading } = useCourseManyReference({
        isEnabled: !disabled,
        courseName,
        locationId: location?.locationId,
    });

    const debounceChangeCourseName = useMemo(
        () => debounce(setCourseName, DEFAULT_DEBOUNCE_AUTOCOMPLETE_TIME),
        [setCourseName]
    );

    const options = useMemo(() => (course ? [course, ...data] : data), [course, data]);

    return (
        <AutocompleteHF<CourseManyReferenceQueried>
            {...rest}
            disabled={disabled}
            optionLabelKey={labelKey}
            getOptionSelectedField={selectFieldKey}
            options={options}
            loading={isLoading}
            filterSelectedOptions
            onInputChange={(_, value, reason) => {
                if (reason === "input") debounceChangeCourseName(value);
                Boolean(courseName) && setCourseName("");
            }}
            onChange={(...args) => {
                onChange && onChange(...args);
                Boolean(courseName) && setCourseName("");
            }}
        />
    );
};

export default AutocompleteCoursesOfLocationHF;
