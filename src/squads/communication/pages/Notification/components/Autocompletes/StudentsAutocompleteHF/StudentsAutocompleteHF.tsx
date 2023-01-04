import { memo } from "react";

import AutocompleteReferenceHF, {
    AutocompleteReferenceHFProps,
} from "src/squads/communication/pages/Notification/components/Autocompletes/AutocompleteReferenceHF";

const StudentsAutocompleteHF = (
    props: Omit<
        AutocompleteReferenceHFProps<"users", "communicationGetManyReferenceStudents">,
        "action" | "entity" | "params"
    >
) => {
    return (
        <AutocompleteReferenceHF
            id="StudentsAutocompleteHF__autocomplete"
            data-testid="StudentsAutocompleteHF__autocomplete"
            optionImage="avatar"
            optionHelperText="email"
            params={(keyword) => ({
                name: keyword,
            })}
            action="communicationGetManyReferenceStudents"
            entity="users"
            {...props}
        />
    );
};

export default memo(StudentsAutocompleteHF);
