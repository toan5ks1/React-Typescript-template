// TODO: Uncomment once query is available
// import { useParams } from "react-router";
import { Entities } from "src/common/constants/enum";

import DialogWithHeaderFooter from "src/components/Dialogs/DialogWithHeaderFooter";

import { UseDialogReturn } from "src/squads/adobo/domains/invoice/hooks/useDialog";
import useResourceTranslate from "src/squads/adobo/domains/invoice/hooks/useResourceTranslate";
import useTranslate from "src/squads/adobo/domains/invoice/hooks/useTranslate";

export interface DialogScheduledInvoiceHistoryProps
    extends Pick<UseDialogReturn, "open" | "onClose"> {}

export type FormScheduledInvoiceHistoryValues = {
    remarks?: string;
};

const DialogScheduledInvoiceHistory = ({ onClose, open }: DialogScheduledInvoiceHistoryProps) => {
    const t = useTranslate();
    const tInvoice = useResourceTranslate(Entities.INVOICE);
    // TODO: Uncomment once query is available
    // const { id: invoiceId } = useParams<{ id: string }>();

    return (
        <DialogWithHeaderFooter
            title={tInvoice("scheduledInvoiceHistory.title")}
            open={open}
            onClose={onClose}
            onSave={onClose}
            textSave={t("ra.action.close")}
            data-testid="DialogScheduledInvoiceHistory__dialog"
            maxWidth="md"
            minWidthBox="sm"
            shouldShowCancelButton={false}
        />
    );
};

export default DialogScheduledInvoiceHistory;
