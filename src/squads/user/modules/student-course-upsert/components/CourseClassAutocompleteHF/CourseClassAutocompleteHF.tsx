import AutocompleteHF, { AutocompleteHFProps } from "src/components/Autocompletes/AutocompleteHF";

import useCourseClasses, {
    ICourseClass,
} from "src/squads/user/modules/student-course-upsert/hooks/useCourseClasses";

export interface CourseClassAutocompleteHFProps
    extends Omit<AutocompleteHFProps<ICourseClass>, "options" | "optionLabelKey"> {
    courseId: string;
    locationId: string;
}

const CourseClassAutocompleteHF = ({
    courseId,
    locationId,
    ...props
}: CourseClassAutocompleteHFProps) => {
    const { loading, options } = useCourseClasses(courseId, locationId);

    return (
        <AutocompleteHF
            {...props}
            optionLabelKey="name"
            size="small"
            id="ClassAutocompleteHF__autocomplete"
            data-testid="StudentCourseUpsertTable__class"
            multiple={false}
            limitChipText="Ellipsis"
            options={options}
            loading={loading}
            shouldShowHelperText={false}
        />
    );
};

export default CourseClassAutocompleteHF;
