import { useCallback } from "react";

import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { Entities } from "src/common/constants/enum";
import { NsInvoiceService } from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoice-service/types";

import DialogWithHeaderFooterHF from "src/components/Dialogs/DialogWithHeaderFooterHF";
import { RemarksForm } from "src/squads/adobo/domains/invoice/pages/invoice-list/components/Forms";

import { UseDialogReturn } from "src/squads/adobo/domains/invoice/hooks/useDialog";
import useResourceTranslate from "src/squads/adobo/domains/invoice/hooks/useResourceTranslate";
import useVoidInvoice from "src/squads/adobo/domains/invoice/hooks/useVoidInvoice";

export type FormIssueInvoiceValues = {
    remarks?: string;
};
export interface DialogVoidInvoiceProps extends Pick<UseDialogReturn, "open" | "onClose"> {
    onSave: () => void;
    defaultValues?: FormIssueInvoiceValues;
}

export type FormVoidInvoiceValues = {
    remarks?: string;
};

const DialogVoidInvoice = ({
    onClose,
    open,
    onSave,
    defaultValues = {
        remarks: "",
    },
}: DialogVoidInvoiceProps) => {
    const tInvoice = useResourceTranslate(Entities.INVOICE);
    const { id: invoiceId } = useParams<{ id: string }>();
    const { voidInvoice, isLoading } = useVoidInvoice(invoiceId);

    const methods = useForm({
        mode: "onChange",
        defaultValues,
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = useCallback(
        async (formData: NsInvoiceService.VoidInvoiceRequest) => {
            await voidInvoice(formData, {
                onSuccess: () => {
                    onSave();
                },
            });
        },
        [voidInvoice, onSave]
    );

    return (
        <DialogWithHeaderFooterHF
            open={open}
            onSave={handleSubmit(onSubmit)}
            onClose={onClose}
            title={tInvoice("actions.voidInvoice")}
            data-testid="VoidInvoiceDialog__root"
            maxWidth="md"
            minWidthBox="sm"
            methods={methods}
            footerConfirmButtonProps={{ disabled: isSubmitting || isLoading }}
        >
            <RemarksForm />
        </DialogWithHeaderFooterHF>
    );
};

export default DialogVoidInvoice;
