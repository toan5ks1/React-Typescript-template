import AutocompleteHF, {
    AutocompleteHFProps,
} from "src/squads/lesson/components/Autocompletes/AutocompleteHF";

import { AssignedStudentStatusType } from "src/squads/lesson/domains/AssignedStudentList/common/types";
import useAssignedStudentStatus from "src/squads/lesson/domains/AssignedStudentList/hooks/useAssignedStudentStatus";

interface AutocompleteAssignedStudentStatusHFProps
    extends Omit<AutocompleteHFProps<AssignedStudentStatusType>, "options" | "optionLabelKey"> {
    firstOptions?: AssignedStudentStatusType;
}

const AutocompleteAssignedStudentStatusHF = (props: AutocompleteAssignedStudentStatusHFProps) => {
    const { choiceAssignedStudentStatus } = useAssignedStudentStatus();

    return (
        <AutocompleteHF<AssignedStudentStatusType>
            id="AutocompleteAssignedStudentStatusHF__autocomplete"
            data-testid="AutocompleteAssignedStudentStatusHF__autocomplete"
            key="assignedStudentStatus"
            options={choiceAssignedStudentStatus}
            optionLabelKey="name"
            isOptionEqualToValue={(option, currentVal) => option.id === currentVal.id}
            translateFLag
            {...props}
        />
    );
};

export default AutocompleteAssignedStudentStatusHF;
