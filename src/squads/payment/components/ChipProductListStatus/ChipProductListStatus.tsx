import { Entities } from "src/common/constants/enum";
import { getEnumString } from "src/common/constants/helper";
import { KeyStudentProductStatus } from "src/squads/payment/constants/const";

import ChipStatus, { ChipStatusProps } from "src/components/Chips/ChipStatus";

import { StudentProductStatus } from "manabuf/payment/v1/enums_pb";

import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";

export interface ChipProductListStatusProps extends Omit<ChipStatusProps, "status"> {
    status: StudentProductStatus;
}

enum ProductListChipStatus {
    PENDING = "warning",
    ORDERED = "success",
    CANCELLED = "error",
}

const ChipProductListStatus = ({ status, ...rest }: ChipProductListStatusProps) => {
    const tOrders = useResourceTranslate(Entities.ORDERS);

    return (
        <ChipStatus
            label={tOrders(
                `choices.orderProductListStatus.${
                    KeyStudentProductStatus[getEnumString(StudentProductStatus, status)]
                }`
            )}
            status={
                ProductListChipStatus[
                    KeyStudentProductStatus[getEnumString(StudentProductStatus, status)]
                ]
            }
            size="small"
            data-testid="ChipProductListStatus__root"
            {...rest}
        />
    );
};

export default ChipProductListStatus;
