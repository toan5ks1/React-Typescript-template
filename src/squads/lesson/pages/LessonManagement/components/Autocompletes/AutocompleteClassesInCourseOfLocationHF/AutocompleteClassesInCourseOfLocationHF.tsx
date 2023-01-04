import { useMemo, useState } from "react";

import debounce from "lodash/debounce";
import { DEFAULT_DEBOUNCE_AUTOCOMPLETE_TIME } from "src/common/constants/const";

import AutocompleteHF, {
    AutocompleteHFProps,
} from "src/squads/lesson/components/Autocompletes/AutocompleteHF";

import {
    ClassManyReferenceQueried,
    LessonManagementUpsertFormType,
} from "src/squads/lesson/pages/LessonManagement/common/types";
import useClassManyReference from "src/squads/lesson/pages/LessonManagement/hooks/useClassManyReference";

export interface AutocompleteClassesInCourseOfLocationHFProps
    extends Omit<
        AutocompleteHFProps<ClassManyReferenceQueried>,
        "optionLabelKey" | "getOptionSelectedField" | "options" | "loading" | "onInputChange"
    > {
    location: LessonManagementUpsertFormType["location"];
    course: LessonManagementUpsertFormType["course"];
    classData: LessonManagementUpsertFormType["classData"];
}

const [labelKey, selectFieldKey]: Array<keyof ClassManyReferenceQueried> = ["name", "class_id"];

const AutocompleteClassesInCourseOfLocationHF = (
    props: AutocompleteClassesInCourseOfLocationHFProps
) => {
    const { location, course, classData, disabled, onChange, ...rest } = props;

    const [className, setClassName] = useState<string | undefined>("");

    const { classes: data, isLoading } = useClassManyReference({
        isEnabled: !disabled,
        className,
        courseId: course?.course_id,
        locationId: location?.locationId,
    });

    const debounceChangeClassName = useMemo(
        () => debounce(setClassName, DEFAULT_DEBOUNCE_AUTOCOMPLETE_TIME),
        [setClassName]
    );

    const options = useMemo(() => (classData ? [classData, ...data] : data), [classData, data]);

    return (
        <AutocompleteHF<ClassManyReferenceQueried>
            {...rest}
            disabled={disabled}
            optionLabelKey={labelKey}
            getOptionSelectedField={selectFieldKey}
            options={options}
            loading={isLoading}
            filterSelectedOptions
            onInputChange={(_, value, reason) => {
                if (reason === "input") debounceChangeClassName(value);
                Boolean(className) && setClassName("");
            }}
            onChange={(...args) => {
                onChange && onChange(...args);
                Boolean(className) && setClassName("");
            }}
        />
    );
};

export default AutocompleteClassesInCourseOfLocationHF;
