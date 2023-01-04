import uniq from "lodash/uniq";

import AutocompleteHF, {
    AutocompleteHFProps,
} from "src/squads/lesson/components/Autocompletes/AutocompleteHF";

import useDayOfWeek, { DayOfWeekType } from "src/squads/lesson/hooks/useDayOfWeek";

interface AutocompleteDayOfWeekHFProps
    extends Omit<AutocompleteHFProps<DayOfWeekType>, "options" | "optionLabelKey"> {
    firstOptions?: DayOfWeekType;
}

const AutocompleteDayOfWeekHF = ({ firstOptions, ...rest }: AutocompleteDayOfWeekHFProps) => {
    const { choiceDayOfWeek } = useDayOfWeek();
    const options = firstOptions ? uniq([firstOptions, ...choiceDayOfWeek]) : [...choiceDayOfWeek];
    return (
        <AutocompleteHF<DayOfWeekType>
            id="AutocompleteDayOfWeekHF__autocomplete"
            data-testid="AutocompleteDayOfWeekHF__autocomplete"
            key="dayOfWeek"
            options={options}
            optionLabelKey="name"
            isOptionEqualToValue={(option, currentVal) => option.id === currentVal.id}
            translateFLag
            {...rest}
        />
    );
};

export default AutocompleteDayOfWeekHF;
