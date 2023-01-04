import uniq from "lodash/uniq";
import { Entities } from "src/common/constants/enum";
import { Grade } from "src/models/grade";

import AutocompleteHF, { AutocompleteHFProps } from "../AutocompleteHF";

import useGradeMap from "src/hooks/useGradeMap";
import useTranslate from "src/hooks/useTranslate";

interface GradesAutocompleteHFProps
    extends Omit<AutocompleteHFProps<Grade>, "options" | "optionLabelKey"> {
    firstOptions?: Grade;
}

const GradesAutocompleteHF = ({ firstOptions, ...rest }: GradesAutocompleteHFProps) => {
    const { choiceGrades } = useGradeMap();
    const t = useTranslate();

    return (
        <AutocompleteHF<Grade>
            id="GradesAutocompleteHF__autocomplete"
            data-testid="GradesAutocompleteHF__autocomplete"
            key="grade"
            label={t(`resources.${Entities.STUDENTS}.colGrade`)}
            options={firstOptions ? uniq([firstOptions, ...choiceGrades]) : [...choiceGrades]}
            optionLabelKey="name"
            isOptionEqualToValue={(option, currentVal) => option.id === currentVal.id}
            {...rest}
        />
    );
};

export default GradesAutocompleteHF;
