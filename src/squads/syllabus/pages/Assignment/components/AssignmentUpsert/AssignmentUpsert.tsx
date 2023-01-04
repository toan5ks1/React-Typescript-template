import { useCallback } from "react";

import { useForm } from "react-hook-form";
import { ProviderTypes } from "src/common/constants/enum";

import { Box, LinearProgress } from "@mui/material";
import DialogFullScreenHF from "src/components/Dialogs/DialogFullScreenHF";
import AssignmentForm from "src/squads/syllabus/pages/Assignment/components/AssignmentForm";

import useUpsertAssignment from "../../../Book/hooks/useUpsertAssignment";
import { AssignmentFormValues } from "../../common/types";

export interface AssignmentUpsertProps {
    action: ProviderTypes.CREATE | ProviderTypes.UPDATE;
    assignment: AssignmentFormValues;
    searchUrl: string;
    title: string;
    onClose: () => void;
}

const AssignmentUpsert = (props: AssignmentUpsertProps) => {
    const { action, assignment, searchUrl, title, onClose } = props;
    const methods = useForm<AssignmentFormValues>({ defaultValues: assignment });
    const { upsertAssignment, isLoading } = useUpsertAssignment({ action, searchUrl });

    const onSubmit = useCallback(
        (formData: AssignmentFormValues) => {
            upsertAssignment(formData, {});
        },
        [upsertAssignment]
    );

    return (
        <DialogFullScreenHF<AssignmentFormValues>
            title={title}
            open
            footerConfirmButtonProps={{ disabled: isLoading }}
            methods={methods}
            onClose={onClose}
            onSave={methods.handleSubmit(onSubmit)}
        >
            <AssignmentForm />
            {isLoading && (
                <Box mt={2}>
                    <LinearProgress aria-hidden={!isLoading} />
                </Box>
            )}
        </DialogFullScreenHF>
    );
};

export default AssignmentUpsert;
