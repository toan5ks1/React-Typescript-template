import {
    InvoiceStatus,
    PaymentStatus,
    ScheduledInvoiceStatus,
} from "src/squads/adobo/domains/invoice/common/constants/enum";
import { InvoiceChipStatusKeys } from "src/squads/adobo/domains/invoice/typings/remote";

import { ChipBaseProps } from "src/components/Chips/ChipBase";
import ChipStatus, { ChipStatusProps } from "src/components/Chips/ChipStatus";

type InvoiceChipStatusStyles = {
    [key: string]: ChipStatusProps["status"];
};

const InvoiceChipStatus: InvoiceChipStatusStyles = {
    [InvoiceStatus.DRAFT]: "default",
    [InvoiceStatus.PAID]: "success",
    [InvoiceStatus.FAILED]: "error",
    [InvoiceStatus.REFUNDED]: "success",
    [InvoiceStatus.PAID]: "success",
    [InvoiceStatus.ISSUED]: "warning",
    [InvoiceStatus.VOID]: "error",
    [PaymentStatus.PAYMENT_PENDING]: "default",
    [PaymentStatus.PAYMENT_SUCCESSFUL]: "success",
    [PaymentStatus.PAYMENT_FAILED]: "error",
    [ScheduledInvoiceStatus.INCOMPLETE]: "default",
    [ScheduledInvoiceStatus.COMPLETED]: "success",
};

export interface ChipInvoiceStatusProps extends ChipBaseProps {
    status: InvoiceChipStatusKeys;
}

const ChipInvoiceStatus = ({ status, ...rest }: ChipInvoiceStatusProps) => {
    return (
        <ChipStatus
            status={InvoiceChipStatus[status]}
            size="small"
            data-testid="ChipInvoiceStatus__root"
            {...rest}
        />
    );
};

export default ChipInvoiceStatus;
