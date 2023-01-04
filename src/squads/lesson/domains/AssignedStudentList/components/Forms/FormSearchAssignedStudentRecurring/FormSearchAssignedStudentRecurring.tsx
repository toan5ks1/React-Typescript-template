import { useForm } from "react-hook-form";

import { Box } from "@mui/material";
import HookForm from "src/components/Forms/HookForm";
import FormFilterAdvancedAssignedStudentListRecurring from "src/squads/lesson/domains/AssignedStudentList/components/Forms/FormFilterAdvancedAssignedStudentListRecurring";

import {
    formFilterAssignedStudentListRecurringDefaultValues,
    FormFilterAdvancedAssignedStudentListRecurringValues,
} from "src/squads/lesson/domains/AssignedStudentList/common/types";

const FormSearchAssignedStudentRecurring = () => {
    const methodsAssignedStudentRecurring =
        useForm<FormFilterAdvancedAssignedStudentListRecurringValues>({
            defaultValues: formFilterAssignedStudentListRecurringDefaultValues,
        });

    return (
        <Box
            data-testid="FormSearchAssignedStudent__root"
            display="flex"
            justifyContent="space-between"
            alignItems="start"
        >
            <HookForm methods={methodsAssignedStudentRecurring}>
                <FormFilterAdvancedAssignedStudentListRecurring
                    // TODO: handle in ticket https://manabie.atlassian.net/browse/LT-19411
                    onApplySubmit={() => {}}
                    onEnterSearchBar={() => {}}
                    defaultKeyword=""
                />
            </HookForm>
        </Box>
    );
};

export default FormSearchAssignedStudentRecurring;
