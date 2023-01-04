import { useMemo } from "react";

import { ERPModules, Entities } from "src/common/constants/enum";
import { ArrayElement } from "src/common/constants/types";
import {
    InvoiceNumberCode,
    InvoiceStatus,
    MutationMenus,
} from "src/squads/adobo/domains/invoice/common/constants/enum";
import { getActionProps } from "src/squads/adobo/domains/invoice/common/utils/helpers";
import { Invoice_InvoiceOneQuery } from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoicemgmt-types";
import { InvoiceStatusKeys } from "src/squads/adobo/domains/invoice/typings/remote";

import { Box } from "@mui/material";
import Breadcrumbs from "src/components/Breadcrumbs";
import ActionPanel, { Action, ActionPanelProps } from "src/components/Menus/ActionPanel";
import NotFound from "src/components/NotFound";
import WrapperPageHeader from "src/components/Wrappers/WrapperPageHeader";
import ChipInvoiceStatus from "src/squads/adobo/domains/invoice/pages/invoice-list/components/ChipInvoiceStatus";
import {
    DialogApprovePayment,
    DialogIssueInvoice,
    DialogVoidInvoice,
} from "src/squads/adobo/domains/invoice/pages/invoice-list/components/Dialogs";
import DialogCancelPayment from "src/squads/adobo/domains/invoice/pages/invoice-list/components/Dialogs/DialogCancelPayment";

import useDialog from "src/squads/adobo/domains/invoice/hooks/useDialog";
import {
    useManageInvoiceFeatureFlag,
    useManagePaymentValidationFeatureFlag,
} from "src/squads/adobo/domains/invoice/hooks/useInvoiceFeatureFlag";
import useResourceTranslate from "src/squads/adobo/domains/invoice/hooks/useResourceTranslate";

export interface HeaderInvoiceProps {
    invoice?: ArrayElement<Invoice_InvoiceOneQuery["invoice"]>;
    onStatusChange: () => void;
}

export const HeaderInvoiceDetail = ({ invoice, onStatusChange }: HeaderInvoiceProps) => {
    const invoice_status = (invoice?.status || "") as InvoiceStatusKeys;

    const invoice_number =
        `${InvoiceNumberCode.INVOICE_CODE}-${invoice?.invoice_sequence_number}` || "--";

    const tInvoice = useResourceTranslate(Entities.INVOICE);
    const shouldEnableManageInvoiceUpsert = useManageInvoiceFeatureFlag();
    const shouldEnableManagePaymentValidationUpsert = useManagePaymentValidationFeatureFlag();
    const {
        open: openIssueInvoice,
        onOpen: onOpenIssueInvoice,
        onClose: onCloseIssueInvoice,
    } = useDialog();
    const {
        open: openVoidInvoice,
        onOpen: onOpenVoidInvoice,
        onClose: onCloseVoidInvoice,
    } = useDialog();
    const {
        open: openApprovePayment,
        onOpen: onOpenApprovePayment,
        onClose: onCloseApprovePayment,
    } = useDialog();
    const {
        open: openCancelPayment,
        onOpen: onOpenCancelPayment,
        onClose: onCloseCancelPayment,
    } = useDialog();

    const draftInvoiceActions: Action<MutationMenus>[] = useMemo(() => {
        // If Manage Invoice feature flag is enabled,
        // This will show Issue Invoice and Void Invoice in the Action Panel.
        const menuItems = shouldEnableManageInvoiceUpsert
            ? [
                  {
                      label: tInvoice("actions.issueInvoice"),
                      action: MutationMenus.INVOICE_DETAIL_ISSUE_INVOICE,
                  },
                  {
                      label: tInvoice("actions.voidInvoice"),
                      action: MutationMenus.INVOICE_DETAIL_VOID_INVOICE,
                  },
              ]
            : [];

        return menuItems;
    }, [shouldEnableManageInvoiceUpsert, tInvoice]);

    const paymentActions: Action<MutationMenus>[] = useMemo(() => {
        const menuItems = [
            {
                label: tInvoice("actions.voidInvoice"),
                action: MutationMenus.INVOICE_DETAIL_VOID_INVOICE,
            },
        ];
        // If Manage Payment Validation feature flag is enabled
        // This will show Approve Payment and Cancel Payment in Action Panel.
        if (shouldEnableManagePaymentValidationUpsert) {
            const paymentValidationActions = [
                {
                    label: tInvoice("actions.approvePayment"),
                    action: MutationMenus.APPROVE_PAYMENT,
                },
                {
                    label: tInvoice("actions.cancelPayment"),
                    action: MutationMenus.CANCEL_PAYMENT,
                },
            ];
            menuItems.unshift(...paymentValidationActions);
        }
        return menuItems;
    }, [shouldEnableManagePaymentValidationUpsert, tInvoice]);

    const failedInvoiceActions: Action<MutationMenus>[] = useMemo(() => {
        return [
            {
                label: tInvoice("actions.voidInvoice"),
                action: MutationMenus.INVOICE_DETAIL_VOID_INVOICE,
            },
            {
                label: tInvoice("actions.issueInvoice"),
                action: MutationMenus.INVOICE_DETAIL_ISSUE_INVOICE,
            },
        ];
    }, [tInvoice]);

    const actions = (invoiceStatus: string) => {
        switch (InvoiceStatus[invoiceStatus]) {
            case "DRAFT": {
                return draftInvoiceActions;
            }
            case "ISSUED": {
                return paymentActions;
            }
            case "FAILED": {
                return failedInvoiceActions;
            }
        }
    };

    const onAction = async (action: MutationMenus) => {
        switch (action) {
            case MutationMenus.INVOICE_DETAIL_ISSUE_INVOICE: {
                onOpenIssueInvoice();
                break;
            }
            case MutationMenus.INVOICE_DETAIL_VOID_INVOICE: {
                onOpenVoidInvoice();
                break;
            }
            case MutationMenus.APPROVE_PAYMENT: {
                onOpenApprovePayment();
                break;
            }
            case MutationMenus.CANCEL_PAYMENT: {
                onOpenCancelPayment();
                break;
            }
        }
    };

    const actionProps: ActionPanelProps<any, any> = {
        actions: actions(invoice_status),
        record: invoice,
        recordName: invoice?.invoice_sequence_number,
        buttonStyle: "square",
        onAction,
        getActionProps,
    };

    if (typeof invoice === "undefined") return <NotFound data-testid="InvoiceDetail__notfound" />;

    return (
        <>
            <Box data-testid="HeaderInvoiceDetail">
                <Breadcrumbs resource={ERPModules.INVOICE_MANAGEMENT} name={invoice_number} />
                <WrapperPageHeader
                    title={invoice_number}
                    action={<ActionPanel {...actionProps} />}
                    status={
                        <ChipInvoiceStatus
                            data-testid="DetailInvoice__status"
                            status={invoice_status}
                            label={tInvoice(`invoiceManagement.invoiceStatuses.${invoice_status}`)}
                        />
                    }
                />
            </Box>
            {openIssueInvoice ? (
                <DialogIssueInvoice
                    open={openIssueInvoice}
                    onClose={onCloseIssueInvoice}
                    onSave={() => {
                        onStatusChange();
                        onCloseIssueInvoice();
                    }}
                />
            ) : null}
            {openVoidInvoice ? (
                <DialogVoidInvoice
                    open={openVoidInvoice}
                    onClose={onCloseVoidInvoice}
                    onSave={() => {
                        onStatusChange();
                        onCloseVoidInvoice();
                    }}
                />
            ) : null}
            {openApprovePayment ? (
                <DialogApprovePayment
                    open={openApprovePayment}
                    onClose={onCloseApprovePayment}
                    onSave={() => {
                        onStatusChange();
                        onCloseApprovePayment();
                    }}
                />
            ) : null}
            {openCancelPayment ? (
                <DialogCancelPayment
                    open={openCancelPayment}
                    onClose={onCloseCancelPayment}
                    onSave={() => {
                        onStatusChange();
                        onCloseCancelPayment();
                    }}
                />
            ) : null}
        </>
    );
};
