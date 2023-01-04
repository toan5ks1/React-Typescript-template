import { useCallback } from "react";

import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { Entities } from "src/common/constants/enum";
import { NsInvoiceService } from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoice-service/types";

import DialogWithHeaderFooterHF from "src/components/Dialogs/DialogWithHeaderFooterHF";
import { ApprovePaymentForm } from "src/squads/adobo/domains/invoice/pages/invoice-list/components/Forms";

import useApproveInvoicePayment from "src/squads/adobo/domains/invoice/hooks/useApproveInvoicePayment";
import { UseDialogReturn } from "src/squads/adobo/domains/invoice/hooks/useDialog";
import useResourceTranslate from "src/squads/adobo/domains/invoice/hooks/useResourceTranslate";

export type FormApprovePaymentValues = {
    paymentDate: string;
    remarks?: string;
};

export interface DialogApprovePaymentProps extends Pick<UseDialogReturn, "open" | "onClose"> {
    onSave: () => void;
    defaultValues?: FormApprovePaymentValues;
}

const DialogApprovePayment = ({
    onClose,
    onSave,
    open,
    defaultValues = {
        paymentDate: "",
        remarks: "",
    },
}: DialogApprovePaymentProps) => {
    const tInvoice = useResourceTranslate(Entities.INVOICE);
    const { id: invoiceId } = useParams<{ id: string }>();
    const { approveInvoicePayment, isLoading } = useApproveInvoicePayment(invoiceId);

    const methods = useForm({
        mode: "onChange",
        defaultValues,
    });

    const {
        handleSubmit,
        formState: { isValid },
    } = methods;

    const onSubmit = useCallback(
        async (formData: NsInvoiceService.ApproveInvoicePaymentRequest) => {
            await approveInvoicePayment(formData, {
                onSuccess: () => {
                    onSave();
                },
            });
        },
        [approveInvoicePayment, onSave]
    );

    return (
        <DialogWithHeaderFooterHF
            open={open}
            onSave={handleSubmit(onSubmit)}
            onClose={onClose}
            title={tInvoice("actions.approvePayment")}
            data-testid="ApprovePaymentDialog__root"
            maxWidth="md"
            minWidthBox="sm"
            methods={methods}
            footerConfirmButtonProps={{ disabled: !isValid || isLoading }}
        >
            <ApprovePaymentForm />
        </DialogWithHeaderFooterHF>
    );
};

export default DialogApprovePayment;
