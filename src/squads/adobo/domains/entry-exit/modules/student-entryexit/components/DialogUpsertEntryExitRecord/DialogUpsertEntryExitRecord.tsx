import { useMemo } from "react";

import { useForm } from "react-hook-form";
import { Entities, ModeOpenDialog } from "src/common/constants/enum";
import { EntryExitRecordFormData } from "src/squads/adobo/domains/entry-exit/common/types/entry-exit";

import EntryExitRecordForm from "./components/EntryExitRecordForm";
import DialogFullScreenHF from "src/components/Dialogs/DialogFullScreenHF";
import { DialogWithHeaderFooterProps } from "src/components/Dialogs/types";
import PaperSectionWrapper from "src/components/Papers/PaperSectionWrapper";

import useResourceTranslate from "src/squads/adobo/domains/entry-exit/hooks/useResourceTranslate";

export interface DialogUpsertEntryExitRecordProps
    extends Pick<DialogWithHeaderFooterProps, "open" | "title"> {
    defaultValues: EntryExitRecordFormData;
    loading?: boolean;
    onClose: () => void;
    onSave: (formData: EntryExitRecordFormData) => void;
    mode: ModeOpenDialog;
}

const DialogUpsertEntryExitRecord = (props: DialogUpsertEntryExitRecordProps) => {
    const tEntryExit = useResourceTranslate(Entities.ENTRY_EXIT);
    const { defaultValues, mode, loading, onClose, onSave, ...rest } = props;

    const methods = useForm<EntryExitRecordFormData>({ defaultValues });
    const { handleSubmit } = methods;

    const title = useMemo(
        () =>
            mode === ModeOpenDialog.EDIT
                ? tEntryExit("form.editTitle")
                : tEntryExit("form.addTitle"),
        [mode, tEntryExit]
    );

    return (
        <DialogFullScreenHF
            title={title}
            onClose={onClose}
            onSave={handleSubmit(onSave)}
            methods={methods}
            footerConfirmButtonProps={{ disabled: loading }}
            contentSize="medium"
            {...rest}
        >
            <PaperSectionWrapper>
                <EntryExitRecordForm mode={mode} defaultValues={defaultValues} />
            </PaperSectionWrapper>
        </DialogFullScreenHF>
    );
};

export default DialogUpsertEntryExitRecord;
