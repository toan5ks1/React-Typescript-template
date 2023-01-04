import { Entities } from "src/common/constants/enum";
import { orderActionLogDataSource } from "src/squads/payment/helpers/order-details";
import { Payment_GetManyActionLogsByOrderIdQueryVariables } from "src/squads/payment/service/fatima/fatima-types";

import { Grid } from "@mui/material";
import TypographyBase from "src/components/Typographys/TypographyBase";
import OrderDetailActionLogTable from "src/squads/payment/domains/OrderManagement/components/Tables/OrderDetailActionLogTable";

import useOrderActionLogList from "src/squads/payment/domains/OrderManagement/hooks/useOrderActionLogList";
import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";

export interface OrderDetailActionLogSectionProps {
    orderId: Payment_GetManyActionLogsByOrderIdQueryVariables["order_id"];
}

const OrderDetailActionLogSection = ({ orderId }: OrderDetailActionLogSectionProps) => {
    const tOrder = useResourceTranslate(Entities.ORDERS);

    const {
        mappedUseOrderActionLogListData,
        usersList,
        isOrderActionLogListLoadingAll,
        pagination,
    } = useOrderActionLogList({ orderId });

    const dataSource = orderActionLogDataSource({ mappedUseOrderActionLogListData, usersList });

    return (
        <>
            <Grid item xs={12}>
                <TypographyBase variant="subtitle1">{tOrder("title.actionLog")}</TypographyBase>
            </Grid>
            <Grid item xs={12}>
                <OrderDetailActionLogTable
                    dataSource={dataSource}
                    loading={isOrderActionLogListLoadingAll}
                    pagination={pagination}
                />
            </Grid>
        </>
    );
};

export default OrderDetailActionLogSection;
