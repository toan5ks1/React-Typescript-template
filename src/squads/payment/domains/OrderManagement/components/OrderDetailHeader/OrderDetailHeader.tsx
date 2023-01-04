import { arrayHasItem } from "src/common/utils/other";
import { getOrderSequenceNumberPrefix } from "src/squads/payment/helpers/order-details";
import { Payment_GetOrderByOrderIdQuery } from "src/squads/payment/service/fatima/fatima-types";
import { ArrayElement } from "src/squads/payment/types/common/array";

import { Box, MenuItemProps } from "@mui/material";
import TypographyPageTitle from "src/components/Typographys/TypographyPageTitle";
import ChipOrderStatus from "src/squads/payment/components/ChipOrderStatus";
import MenuItemPanel from "src/squads/payment/components/MenuItemPanel/MenuItemPanel";

import { OrderStatus } from "manabuf/payment/v1/enums_pb";

export interface OrderDetailHeaderProps {
    orderSequenceNumber: ArrayElement<
        Payment_GetOrderByOrderIdQuery["order"]
    >["order_sequence_number"];
    orderStatus: ArrayElement<Payment_GetOrderByOrderIdQuery["order"]>["order_status"];
    menuItems: MenuItemProps[];
}

const OrderDetailHeader = ({
    orderSequenceNumber,
    orderStatus,
    menuItems,
}: OrderDetailHeaderProps) => {
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={4}
            data-testid="OrderDetailHeader__root"
        >
            <Box display="flex" alignItems="center">
                <Box mr={1}>
                    <ChipOrderStatus status={OrderStatus[orderStatus]} />
                </Box>
                <Box>
                    <TypographyPageTitle
                        disablePadding
                        title={getOrderSequenceNumberPrefix(orderSequenceNumber)}
                    />
                </Box>
            </Box>
            {arrayHasItem(menuItems) && (
                <MenuItemPanel menuItems={menuItems} iconButtonVariant="square" />
            )}
        </Box>
    );
};

export default OrderDetailHeader;
