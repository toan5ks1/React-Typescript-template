import { Entities } from "src/common/constants/enum";

import ChipStatus, { ChipStatusProps } from "src/components/Chips/ChipStatus";

import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";

export interface ChipOrderStatusProps extends Omit<ChipStatusProps, "status"> {
    status: string;
}

export enum BillingChipStatus {
    BILLING_STATUS_WAITING_APPROVAL = "default",
    BILLING_STATUS_PENDING = "warning",
    BILLING_STATUS_BILLED = "success",
    BILLING_STATUS_INVOICED = "others",
    BILLING_STATUS_CANCELLED = "error",
}

const ChipBillingStatus = ({ status, ...rest }: ChipOrderStatusProps) => {
    const tOrders = useResourceTranslate(Entities.ORDERS);

    return (
        <ChipStatus
            label={tOrders(`choices.orderBillingStatus.${status}`)}
            status={BillingChipStatus[status]}
            size="small"
            data-testid="ChipBillingStatus__root"
            {...rest}
        />
    );
};

export default ChipBillingStatus;
