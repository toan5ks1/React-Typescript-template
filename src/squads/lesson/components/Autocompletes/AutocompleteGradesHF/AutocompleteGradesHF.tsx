import uniq from "lodash/uniq";
import { Grade } from "src/models/grade";

import AutocompleteHF, {
    AutocompleteHFProps,
} from "src/squads/lesson/components/Autocompletes/AutocompleteHF";

import useGradeMap from "src/squads/lesson/hooks/useGradeMap";

interface AutocompleteGradesHFProps
    extends Omit<AutocompleteHFProps<Grade>, "options" | "optionLabelKey"> {
    firstOptions?: Grade;
}

const AutocompleteGradesHF = ({ firstOptions, ...rest }: AutocompleteGradesHFProps) => {
    const { choiceGrades } = useGradeMap();
    const options = firstOptions ? uniq([firstOptions, ...choiceGrades]) : [...choiceGrades];

    return (
        <AutocompleteHF<Grade>
            id="AutocompleteGradesHF__autocomplete"
            data-testid="AutocompleteGradesHF__autocomplete"
            key="grade"
            label="resources.lesson_management.columns.colGrade"
            options={options}
            optionLabelKey="name"
            isOptionEqualToValue={(option, currentVal) => option.id === currentVal.id}
            translateFLag
            {...rest}
        />
    );
};

export default AutocompleteGradesHF;
