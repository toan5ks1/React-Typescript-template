import { ArrayElement } from "src/common/constants/types";
import { CoursesManyReferenceQuery } from "src/squads/communication/service/bob/bob-types";

import AutocompleteReferenceHF, {
    AutocompleteReferenceHFProps,
} from "src/squads/communication/pages/Notification/components/Autocompletes/AutocompleteReferenceHF";

import {
    ChoiceType,
    UseAutocompleteReferenceProps,
} from "src/squads/communication/hooks/useAutocompleteReference";

export interface CoursesAutocompleteHFProps
    extends Omit<
        AutocompleteReferenceHFProps<"courses", "communicationGetManyReferenceCourses">,
        "action" | "entity" | "params"
    > {
    firstOptions?: ChoiceType<ArrayElement<CoursesManyReferenceQuery["courses"]>>[];
}

const CoursesAutocompleteHF = ({ firstOptions, ...rest }: CoursesAutocompleteHFProps) => {
    const coursesSelector: UseAutocompleteReferenceProps<
        "courses",
        "communicationGetManyReferenceCourses"
    >["selector"] = (courses) => {
        if (!courses) return [];

        const mappedCourses = courses.map((course) => ({
            value: course.name,
            ...course,
        }));

        if (firstOptions) return [...firstOptions, ...mappedCourses];

        return mappedCourses;
    };

    return (
        <AutocompleteReferenceHF
            id="CoursesAutocompleteHF__autocomplete"
            data-testid="CoursesAutocompleteHF__autocomplete"
            action="communicationGetManyReferenceCourses"
            entity="courses"
            params={(keyword) => ({
                name: keyword,
            })}
            selector={coursesSelector}
            {...rest}
        />
    );
};

export default CoursesAutocompleteHF;
