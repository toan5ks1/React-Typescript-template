import { Entities } from "src/common/constants/enum";
import { ArrayElement } from "src/common/constants/types";
import { choicesInvoiceAction } from "src/squads/adobo/domains/invoice/common/constants/choices";
import { InvoiceActions } from "src/squads/adobo/domains/invoice/common/constants/enum";

import { Box } from "@mui/material";
import TypographyPageTitle from "src/components/Typographys/TypographyPageTitle";
import { DialogScheduledInvoiceHistory } from "src/squads/adobo/domains/invoice/pages/invoice-list/components/Dialogs";
import ButtonInvoiceDropdown, {
    ButtonInvoiceDropdownProps,
} from "src/squads/adobo/domains/invoice/pages/invoice-list/components/HeaderInvoiceList/ButtonInvoiceDropdown";

import useDialog from "src/squads/adobo/domains/invoice/hooks/useDialog";
import useResourceTranslate from "src/squads/adobo/domains/invoice/hooks/useResourceTranslate";

export const HeaderInvoiceList = () => {
    const tInvoice = useResourceTranslate(Entities.INVOICE);

    const {
        open: openScheduledInvoiceHistory,
        onOpen: onOpenScheduledInvoiceHistory,
        onClose: onCloseScheduledInvoiceHistory,
    } = useDialog();

    const handleOnClick = (type: ArrayElement<ButtonInvoiceDropdownProps["options"]>) => {
        switch (type.id) {
            case InvoiceActions.BULK_ISSUE_INVOICE:
                break;
            case InvoiceActions.SCHEDULED_INVOICE_HISTORY:
                onOpenScheduledInvoiceHistory();
                break;
            default:
                break;
        }
    };

    return (
        <>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="start"
                data-testid="HeaderInvoiceList__root"
            >
                <TypographyPageTitle
                    title={tInvoice("invoiceManagement.name")}
                    data-testid="InvoiceManagement__title"
                />
                <ButtonInvoiceDropdown
                    label="Action"
                    options={choicesInvoiceAction(tInvoice)}
                    onClick={handleOnClick}
                />
            </Box>
            {openScheduledInvoiceHistory ? (
                <DialogScheduledInvoiceHistory
                    open={openScheduledInvoiceHistory}
                    onClose={onCloseScheduledInvoiceHistory}
                />
            ) : null}
        </>
    );
};
