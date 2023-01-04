import { useCallback } from "react";

import { useForm } from "react-hook-form";
import { ProviderTypes } from "src/common/constants/enum";

import { Box, LinearProgress } from "@mui/material";
import DialogFullScreenHF from "src/components/Dialogs/DialogFullScreenHF";
import TaskAssignmentForm from "src/squads/syllabus/pages/TaskAssignment/components/TaskAssignmentForm";

import { TaskAssignmentFormValues } from "../../common/types";
import useUpsertTaskAssignment from "../../hooks/useUpsertTaskAssignment";

export interface TaskAssignmentUpsertProps {
    action: ProviderTypes.CREATE | ProviderTypes.UPDATE;
    defaultValues: TaskAssignmentFormValues;
    searchUrl: string;
    title: string;
    onClose: () => void;
}

const TaskAssignmentUpsert = (props: TaskAssignmentUpsertProps) => {
    const { action, defaultValues, searchUrl, title, onClose } = props;
    const methods = useForm<TaskAssignmentFormValues>({ defaultValues });

    const { upsertTaskAssignment, isLoading } = useUpsertTaskAssignment({ action, searchUrl });

    const onSubmit = useCallback(
        (formData: TaskAssignmentFormValues) => {
            upsertTaskAssignment(formData, {});
        },
        [upsertTaskAssignment]
    );

    return (
        <DialogFullScreenHF<TaskAssignmentFormValues>
            title={title}
            open
            footerConfirmButtonProps={{ disabled: isLoading }}
            methods={methods}
            onClose={onClose}
            onSave={methods.handleSubmit(onSubmit)}
        >
            <TaskAssignmentForm />
            {isLoading && (
                <Box mt={2}>
                    <LinearProgress aria-hidden={!isLoading} />
                </Box>
            )}
        </DialogFullScreenHF>
    );
};

export default TaskAssignmentUpsert;
