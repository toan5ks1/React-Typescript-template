import { Entities } from "src/common/constants/enum";
import { getEnumString } from "src/common/constants/helper";
import { KeyOrderStatus } from "src/squads/payment/constants/const";

import ChipStatus, { ChipStatusProps } from "src/components/Chips/ChipStatus";

import { OrderStatus } from "manabuf/payment/v1/enums_pb";

import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";

export interface ChipOrderStatusProps extends Omit<ChipStatusProps, "status"> {
    status: OrderStatus;
}

enum OrderChipStatus {
    ORDER_STATUS_PENDING = "warning",
    ORDER_STATUS_SUBMITTED = "success",
    ORDER_STATUS_REJECTED = "error",
    ORDER_STATUS_VOIDED = "error",
    ORDER_STATUS_INVOICED = "others",
}

const ChipOrderStatus = ({ status, ...rest }: ChipOrderStatusProps) => {
    const tOrders = useResourceTranslate(Entities.ORDERS);

    return (
        <ChipStatus
            label={tOrders(
                `choices.orderStatus.${KeyOrderStatus[getEnumString(OrderStatus, status)]}`
            )}
            status={OrderChipStatus[KeyOrderStatus[getEnumString(OrderStatus, status)]]}
            size="small"
            data-testid="ChipOrderStatus__root"
            {...rest}
        />
    );
};

export default ChipOrderStatus;
