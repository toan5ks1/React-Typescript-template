import { useCallback } from "react";

import { arrayHasItem } from "src/common/utils/other";
import {
    CourseWithLocationChoice,
    StudentPackageClientWithLocation,
} from "src/squads/user/common/types";

const useCourseAutocomplete = (packages: StudentPackageClientWithLocation[]) => {
    const checkOptionDisabled = useCallback(
        ({ course_id }: CourseWithLocationChoice) => {
            if (!arrayHasItem(packages)) {
                return false;
            }
            return (
                packages.findIndex(
                    (e: StudentPackageClientWithLocation) => e.course.course_id === course_id
                ) >= 0
            );
        },
        [packages]
    );

    const checkOptionSelected = useCallback(
        (option: CourseWithLocationChoice, course: CourseWithLocationChoice) => {
            return option.course_id === course.course_id;
        },
        []
    );

    return {
        checkOptionSelected,
        checkOptionDisabled,
    };
};

export default useCourseAutocomplete;
