import { Entities } from "src/common/constants/enum";

import ChipStatus, { ChipStatusProps } from "src/components/Chips/ChipStatus";

import useResourceTranslate from "src/squads/adobo/domains/invoice/hooks/useResourceTranslate";

export interface ChipBillingStatusProps extends Omit<ChipStatusProps, "status"> {
    status: string;
}

export enum BillingChipStatus {
    BILLING_STATUS_PENDING = "warning",
    BILLING_STATUS_BILLED = "success",
    BILLING_STATUS_INVOICED = "others",
}

const ChipBillingStatus = ({ status, ...rest }: ChipBillingStatusProps) => {
    const tInvoice = useResourceTranslate(Entities.INVOICE);

    return (
        <ChipStatus
            label={tInvoice(`createInvoice.billingItems.${status}`)}
            status={BillingChipStatus[status]}
            size="small"
            data-testid="ChipBillingStatus__root"
            {...rest}
        />
    );
};

export default ChipBillingStatus;
