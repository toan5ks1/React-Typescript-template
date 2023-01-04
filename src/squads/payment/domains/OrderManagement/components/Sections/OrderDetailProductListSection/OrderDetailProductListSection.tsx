import { Entities } from "src/common/constants/enum";
import { Payment_GetOrderItemsByOrderIdQueryVariables } from "src/squads/payment/service/fatima/fatima-types";

import { Grid } from "@mui/material";
import ButtonPrimaryOutlined from "src/components/Buttons/ButtonPrimaryOutlined";
import TypographyBase from "src/components/Typographys/TypographyBase";
import OrderDetailProductListTable from "src/squads/payment/domains/OrderManagement/components/Tables/OrderDetailProductListTable";

import useOrderItemsInfoListV2 from "src/squads/payment/domains/OrderManagement/hooks/useOrderItemsInfoListV2";
import OrderDetailsPluginsProvider from "src/squads/payment/domains/OrderManagement/plugins/order-details/OrderDetailsPluginsProvider";
import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";

export interface OrderDetailProductListSectionProps {
    orderId: Payment_GetOrderItemsByOrderIdQueryVariables["orderId"];
}

const OrderDetailProductListSection = ({ orderId }: OrderDetailProductListSectionProps) => {
    const tOrder = useResourceTranslate(Entities.ORDERS);

    const {
        data: orderItemsDetailArray,
        isFetching,
        pagination,
    } = useOrderItemsInfoListV2({ orderId });

    return (
        <>
            <OrderDetailsPluginsProvider>
                <Grid item xs={12} container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <TypographyBase variant="subtitle1">
                            {tOrder("title.productList")}
                        </TypographyBase>
                    </Grid>
                    <Grid item>
                        <ButtonPrimaryOutlined
                            disabled
                            data-testid="OrderDetail__buttonViewPreviousVersion"
                        >
                            {tOrder("label.viewPreviousVersion")}
                        </ButtonPrimaryOutlined>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <OrderDetailProductListTable
                        dataSource={orderItemsDetailArray?.itemsList || []}
                        loading={isFetching}
                        pagination={pagination}
                    />
                </Grid>
            </OrderDetailsPluginsProvider>
        </>
    );
};

export default OrderDetailProductListSection;
