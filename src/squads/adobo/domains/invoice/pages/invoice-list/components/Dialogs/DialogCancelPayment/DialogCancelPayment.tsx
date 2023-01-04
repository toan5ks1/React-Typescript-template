import { useCallback } from "react";

import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { Entities } from "src/common/constants/enum";
import { NsInvoiceService } from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoice-service/types";

import DialogWithHeaderFooterHF from "src/components/Dialogs/DialogWithHeaderFooterHF";
import { RemarksForm } from "src/squads/adobo/domains/invoice/pages/invoice-list/components/Forms";

import useCancelInvoicePayment from "src/squads/adobo/domains/invoice/hooks/useCancelInvoicePayment";
import { UseDialogReturn } from "src/squads/adobo/domains/invoice/hooks/useDialog";
import useResourceTranslate from "src/squads/adobo/domains/invoice/hooks/useResourceTranslate";

export interface DialogCancelPaymentProps extends Pick<UseDialogReturn, "open" | "onClose"> {
    onSave: () => void;
}

export type FormCancelPaymentValues = {
    remarks?: string;
};

const DialogCancelPayment = ({ onClose, open, onSave }: DialogCancelPaymentProps) => {
    const tInvoice = useResourceTranslate(Entities.INVOICE);
    const { id: invoiceId } = useParams<{ id: string }>();
    const { cancelInvoicePayment, isLoading } = useCancelInvoicePayment(invoiceId);

    const methods = useForm({
        mode: "onChange",
        defaultValues: {
            remarks: "",
        },
    });

    const { handleSubmit } = methods;

    const onSubmit = useCallback(
        async (formData: NsInvoiceService.CancelInvoicePaymentRequest) => {
            await cancelInvoicePayment(formData, {
                onSuccess: () => {
                    onSave();
                },
            });
        },
        [cancelInvoicePayment, onSave]
    );

    return (
        <DialogWithHeaderFooterHF
            open={open}
            onSave={handleSubmit(onSubmit)}
            onClose={onClose}
            title={tInvoice("actions.cancelPayment")}
            data-testid="DialogCancelPayment__root"
            maxWidth="md"
            minWidthBox="sm"
            methods={methods}
            footerConfirmButtonProps={{ disabled: isLoading }}
        >
            <RemarksForm />
        </DialogWithHeaderFooterHF>
    );
};

export default DialogCancelPayment;
