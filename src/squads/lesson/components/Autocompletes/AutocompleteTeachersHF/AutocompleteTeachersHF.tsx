import { Entities } from "src/common/constants/enum";
import { TeacherMany } from "src/squads/lesson/service/bob/bob-modify-types";

import AutocompleteReferenceHF, {
    AutocompleteReferenceHFProps,
} from "src/squads/lesson/components/Autocompletes/AutocompleteReferenceHF";

const AutocompleteTeachersHF = (
    props: Omit<AutocompleteReferenceHFProps<TeacherMany>, "resource">
) => {
    return (
        <AutocompleteReferenceHF
            {...props}
            optionLabelKey="name"
            optionHelperText="email"
            data-testid="AutocompleteTeachersHF__autocomplete"
            id="AutocompleteTeachersHF__autocomplete"
            resource={Entities.TEACHERS}
            searchFields={["name", "email"]}
        />
    );
};

export default AutocompleteTeachersHF;
