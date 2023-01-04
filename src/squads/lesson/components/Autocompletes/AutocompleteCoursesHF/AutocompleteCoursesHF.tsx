import { Entities } from "src/common/constants/enum";
import { ArrayElement } from "src/common/constants/types";
import { CoursesManyReferenceQuery } from "src/squads/lesson/service/bob/bob-types";

import AutocompleteReferenceHF, {
    AutocompleteReferenceHFProps,
} from "src/squads/lesson/components/Autocompletes/AutocompleteReferenceHF";

const AutocompleteCoursesHF = (
    props: Omit<
        AutocompleteReferenceHFProps<ArrayElement<CoursesManyReferenceQuery["courses"]>>,
        "resource"
    >
) => {
    return (
        <AutocompleteReferenceHF
            id="AutocompleteCoursesHF__autocomplete"
            data-testid="AutocompleteCoursesHF__autocomplete"
            {...props}
            resource={Entities.COURSES}
        />
    );
};

export default AutocompleteCoursesHF;
