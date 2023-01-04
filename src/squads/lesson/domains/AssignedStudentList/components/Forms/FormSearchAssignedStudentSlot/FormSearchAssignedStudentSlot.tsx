import { useForm } from "react-hook-form";

import { Box } from "@mui/material";
import HookForm from "src/components/Forms/HookForm";
import FormFilterAdvancedAssignedStudentListSlot from "src/squads/lesson/domains/AssignedStudentList/components/Forms/FormFilterAdvancedAssignedStudentListSlot";

import {
    FormFilterAdvancedAssignedStudentListSlotValues,
    formFilterAssignedStudentListSlotDefaultValues,
} from "src/squads/lesson/domains/AssignedStudentList/common/types";

const FormSearchAssignedStudentSlot = () => {
    const methodsAssignedStudentSlot = useForm<FormFilterAdvancedAssignedStudentListSlotValues>({
        defaultValues: formFilterAssignedStudentListSlotDefaultValues,
    });

    return (
        <Box
            data-testid="FormSearchAssignedStudent__root"
            display="flex"
            justifyContent="space-between"
            alignItems="start"
        >
            <HookForm methods={methodsAssignedStudentSlot}>
                <FormFilterAdvancedAssignedStudentListSlot
                    // TODO: handle in ticket https://manabie.atlassian.net/browse/LT-19411
                    onApplySubmit={() => {}}
                    onEnterSearchBar={() => {}}
                    defaultKeyword=""
                />
            </HookForm>
        </Box>
    );
};

export default FormSearchAssignedStudentSlot;
