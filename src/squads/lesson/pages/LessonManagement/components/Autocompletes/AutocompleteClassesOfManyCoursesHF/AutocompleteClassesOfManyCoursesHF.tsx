import { useMemo, useState } from "react";

import debounce from "lodash/debounce";
import { DEFAULT_DEBOUNCE_AUTOCOMPLETE_TIME } from "src/common/constants/const";
import { ArrayElement } from "src/common/constants/types";
import { arrayHasItem } from "src/common/utils/other";
import {
    CoursesManyQuery,
    Lesson_ClassManyByNullableCourseIdsAndNameQuery,
} from "src/squads/lesson/service/bob/bob-types";

import AutocompleteHF, {
    AutocompleteHFProps,
} from "src/squads/lesson/components/Autocompletes/AutocompleteHF";

import uniqBy from "lodash/uniqBy";
import useClassManyWithNullableCourse from "src/squads/lesson/pages/LessonManagement/hooks/useClassManyWithNullableCourse";

type ClassManyQueried = ArrayElement<Lesson_ClassManyByNullableCourseIdsAndNameQuery["class"]>;

export interface AutocompleteClassesOfManyCoursesHFProps
    extends Omit<
        AutocompleteHFProps<ClassManyQueried>,
        "optionLabelKey" | "getOptionSelectedField" | "options" | "loading" | "onInputChange"
    > {
    courses: CoursesManyQuery["courses"];
    firstOptions?: ClassManyQueried[];
}

const [labelKey, selectFieldKey]: Array<keyof ClassManyQueried> = ["name", "class_id"];

const AutocompleteClassesOfManyCoursesHF = (props: AutocompleteClassesOfManyCoursesHFProps) => {
    const { courses, firstOptions = [], ...rest } = props;

    const [className, setClassName] = useState<string | undefined>("");

    const { classes, isLoading } = useClassManyWithNullableCourse({
        className,
        courseIds: arrayHasItem(courses) ? courses.map((course) => course.course_id) : undefined,
    });

    const debounceChangeClassName = useMemo(
        () => debounce(setClassName, DEFAULT_DEBOUNCE_AUTOCOMPLETE_TIME),
        [setClassName]
    );

    const options = useMemo(
        () =>
            arrayHasItem(firstOptions)
                ? uniqBy<ClassManyQueried>([...firstOptions, ...classes], "class_id")
                : classes,
        [classes, firstOptions]
    );

    return (
        <AutocompleteHF<ClassManyQueried>
            id="AutocompleteClassesOfManyCoursesHF__autocomplete"
            data-testid="AutocompleteClassesOfManyCoursesHF__autocomplete"
            {...rest}
            optionLabelKey={labelKey}
            getOptionSelectedField={selectFieldKey}
            options={options}
            loading={isLoading}
            filterSelectedOptions
            onInputChange={(_, value) => {
                debounceChangeClassName(value);
            }}
        />
    );
};

export default AutocompleteClassesOfManyCoursesHF;
