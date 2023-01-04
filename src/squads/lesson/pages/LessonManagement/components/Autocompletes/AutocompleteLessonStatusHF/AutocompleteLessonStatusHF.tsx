import AutocompleteHF, {
    AutocompleteHFProps,
} from "src/squads/lesson/components/Autocompletes/AutocompleteHF";

import useLessonStatus, { ChoiceLessonStatus } from "src/squads/lesson/hooks/useLessonStatus";

interface AutocompleteLessonStatusHFProps
    extends Omit<AutocompleteHFProps<ChoiceLessonStatus>, "options" | "optionLabelKey"> {
    firstOptions?: ChoiceLessonStatus;
}

const AutocompleteLessonStatusHF = (props: AutocompleteLessonStatusHFProps) => {
    const { choiceLessonStatus } = useLessonStatus();

    return (
        <AutocompleteHF<ChoiceLessonStatus>
            id="AutocompleteLessonStatusHF__autocomplete"
            data-testid="AutocompleteLessonStatusHF__autocomplete"
            key="lessonStatus"
            options={choiceLessonStatus}
            optionLabelKey="name"
            isOptionEqualToValue={(option, currentVal) => option.id === currentVal.id}
            translateFLag
            {...props}
        />
    );
};

export default AutocompleteLessonStatusHF;
