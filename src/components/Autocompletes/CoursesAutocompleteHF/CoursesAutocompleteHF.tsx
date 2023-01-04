import { Entities } from "src/common/constants/enum";
import { ArrayElement } from "src/common/constants/types";
import { CoursesManyReferenceQuery } from "src/services/bob/bob-types";

import AutocompleteReferenceHF, { AutocompleteReferenceHFProps } from "../AutocompleteReferenceHF";

const CoursesAutocompleteHF = (
    props: Omit<
        AutocompleteReferenceHFProps<ArrayElement<CoursesManyReferenceQuery["courses"]>>,
        "resource"
    >
) => {
    return (
        <AutocompleteReferenceHF
            id="CoursesAutocompleteHF__autocomplete"
            data-testid="CoursesAutocompleteHF__autocomplete"
            {...props}
            resource={Entities.COURSES}
        />
    );
};

export default CoursesAutocompleteHF;
