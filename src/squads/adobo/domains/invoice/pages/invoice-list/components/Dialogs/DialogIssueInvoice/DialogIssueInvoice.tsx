import { useCallback } from "react";

import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { Entities } from "src/common/constants/enum";
import { FormIssueInvoiceValues } from "src/squads/adobo/domains/invoice/common/types/invoice";
import { NsInvoiceService } from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoice-service/types";

import DialogWithHeaderFooterHF from "src/components/Dialogs/DialogWithHeaderFooterHF";
import { IssueInvoiceForm } from "src/squads/adobo/domains/invoice/pages/invoice-list/components/Forms";

import { UseDialogReturn } from "src/squads/adobo/domains/invoice/hooks/useDialog";
import useIssueInvoice from "src/squads/adobo/domains/invoice/hooks/useIssueInvoice";
import useResourceTranslate from "src/squads/adobo/domains/invoice/hooks/useResourceTranslate";

export interface DialogIssueInvoiceProps extends Pick<UseDialogReturn, "open" | "onClose"> {
    onSave: () => void;
    defaultValues?: FormIssueInvoiceValues;
}

const DialogIssueInvoice = ({
    onClose,
    open,
    onSave,
    defaultValues = {
        paymentMethod: "",
        dueDate: "",
        expiryDate: "",
        remarks: "",
    },
}: DialogIssueInvoiceProps) => {
    const tInvoice = useResourceTranslate(Entities.INVOICE);
    const { id: invoiceId } = useParams<{ id: string }>();
    const { issueInvoice, isLoading } = useIssueInvoice(invoiceId);

    const methods = useForm<FormIssueInvoiceValues>({
        mode: "onChange",
        defaultValues,
    });

    const {
        handleSubmit,
        formState: { isSubmitting, isValid },
    } = methods;

    const onSubmit = useCallback(
        async (formData: NsInvoiceService.IssueInvoiceRequest) => {
            await issueInvoice(formData, {
                onSuccess: () => {
                    void onSave();
                },
            });
        },
        [issueInvoice, onSave]
    );

    return (
        <DialogWithHeaderFooterHF
            methods={methods}
            data-testid="IssueInvoiceDialog__root"
            open={open}
            onClose={onClose}
            onSave={handleSubmit(onSubmit)}
            title={tInvoice("actions.issueInvoice")}
            maxWidth="md"
            minWidthBox="sm"
            footerConfirmButtonProps={{ disabled: isSubmitting || isLoading || !isValid }}
        >
            <IssueInvoiceForm />
        </DialogWithHeaderFooterHF>
    );
};

export default DialogIssueInvoice;
