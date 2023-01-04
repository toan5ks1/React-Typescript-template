import { useCallback } from "react";

import { useForm } from "react-hook-form";
import { ProviderTypes } from "src/common/constants/enum";

import DialogFullScreenHF from "src/components/Dialogs/DialogFullScreenHF";

import { LearningObjective } from "manabuf/common/v1/contents_pb";

import ExamUpsertForm from "src/squads/syllabus/pages/Exam/ExamUpsertForm";
import { CreateLOFormData } from "src/squads/syllabus/pages/LO/common/type";

export interface ExamUpsertDialogProps {
    title: string;
    action: ProviderTypes.CREATE | ProviderTypes.UPDATE;
    topicId: LearningObjective.AsObject["topicId"];
    defaultValues: CreateLOFormData;
    onClose: () => void;
}

const ExamUpsertDialog = ({ defaultValues, title, onClose }: ExamUpsertDialogProps) => {
    const methods = useForm<CreateLOFormData>({ defaultValues });

    const onUpsertExamLO = useCallback(() => {
        // TODO: Handle upsert exam LO here
    }, []);

    return (
        <DialogFullScreenHF<CreateLOFormData>
            data-testid="ExamUpsertDialog__dialog"
            open
            title={title}
            methods={methods}
            onClose={onClose}
            onSave={methods.handleSubmit(onUpsertExamLO)}
        >
            <ExamUpsertForm />
        </DialogFullScreenHF>
    );
};

export default ExamUpsertDialog;
