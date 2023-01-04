import { Entities } from "src/common/constants/enum";
import { Payment_GetManyBillItemsV2QueryVariables } from "src/squads/payment/service/fatima/fatima-types";

import { Grid } from "@mui/material";
import TypographyBase from "src/components/Typographys/TypographyBase";
import OrderDetailBillingItemTable from "src/squads/payment/domains/OrderManagement/components/Tables/OrderDetailBillingItemTable";

import useBillItemListV2 from "src/squads/payment/domains/OrderManagement/hooks/useBillItemListV2";
import OrderDetailsPluginsProvider from "src/squads/payment/domains/OrderManagement/plugins/order-details/OrderDetailsPluginsProvider";
import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";

export interface OrderDetailBillingItemSectionProps {
    orderId: Payment_GetManyBillItemsV2QueryVariables["order_id"];
}

const OrderDetailBillingItemSection = ({ orderId }: OrderDetailBillingItemSectionProps) => {
    const tOrder = useResourceTranslate(Entities.ORDERS);

    const {
        data: billingItemsDetailArray,
        isFetching,
        pagination,
    } = useBillItemListV2({ orderId });

    return (
        <>
            <OrderDetailsPluginsProvider>
                <Grid item xs={12}>
                    <TypographyBase variant="subtitle1">
                        {tOrder("title.billingItem")}
                    </TypographyBase>
                </Grid>
                <Grid item xs={12}>
                    <OrderDetailBillingItemTable
                        dataSource={billingItemsDetailArray?.itemsList || []}
                        loading={isFetching}
                        pagination={pagination}
                    />
                </Grid>
            </OrderDetailsPluginsProvider>
        </>
    );
};

export default OrderDetailBillingItemSection;
