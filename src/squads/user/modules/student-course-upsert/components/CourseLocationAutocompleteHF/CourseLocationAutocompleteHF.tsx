import { useMemo } from "react";

import { intersectionBy } from "lodash";
import { LocationInformationHasura } from "src/squads/user/common/types";

import AutocompleteHF, { AutocompleteHFProps } from "src/components/Autocompletes/AutocompleteHF";

import useCourseLocations, {
    ICourseLocation,
} from "src/squads/user/modules/student-course-upsert/hooks/useCourseLocations";

export interface CourseLocationAutocompleteHFProps
    extends Omit<AutocompleteHFProps<ICourseLocation>, "options" | "optionLabelKey"> {
    courseId: string;
    studentLocations: LocationInformationHasura[];
}

const CourseLocationAutocompleteHF = ({
    courseId,
    studentLocations,
    ...props
}: CourseLocationAutocompleteHFProps) => {
    const { loading, options: courseLocations } = useCourseLocations(courseId);

    const options = useMemo(() => {
        const locationOptions = intersectionBy<ICourseLocation>(
            courseLocations || [],
            studentLocations || [],
            "location_id"
        );
        return locationOptions;
    }, [courseLocations, studentLocations]);

    return (
        <AutocompleteHF
            {...props}
            optionLabelKey="name"
            size="small"
            id="LocationsAutocompleteHF__autocomplete"
            data-testid="StudentCourseUpsertTable__location"
            multiple={false}
            disableClearable
            limitChipText="Ellipsis"
            required
            options={options}
            loading={loading}
            shouldShowHelperText={false}
        />
    );
};

export default CourseLocationAutocompleteHF;
