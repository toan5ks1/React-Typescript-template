import { useParams } from "react-router";
import { Entities } from "src/common/constants/enum";
import { KeyOrderTypes } from "src/squads/payment/constants/const";
import { getOrderSequenceNumberPrefix } from "src/squads/payment/helpers/order-details";

import { Grid } from "@mui/material";
import Breadcrumbs from "src/components/Breadcrumbs";
import DividerDashed from "src/components/Divider/DividerDashed";
import Loading from "src/components/Loading";
import NotFound from "src/components/NotFound";
import WrapperPageContent from "src/components/Wrappers/WrapperPageContent";
import OrderDetailGeneralInfo from "src/squads/payment/domains/OrderManagement/components/OrderDetailGeneralInfo";
import OrderDetailHeaderWrapper from "src/squads/payment/domains/OrderManagement/components/OrderDetailHeaderWrapper";
import OrderDetailActionLogSection from "src/squads/payment/domains/OrderManagement/components/Sections/OrderDetailActionLogSection";
import OrderDetailBillingItemSection from "src/squads/payment/domains/OrderManagement/components/Sections/OrderDetailBillingItemSection";
import OrderDetailProductListSection from "src/squads/payment/domains/OrderManagement/components/Sections/OrderDetailProductListSection";

import useOrderDetailInfo from "src/squads/payment/domains/OrderManagement/hooks/useOrderDetailInfo";

const OrderDetailPage = () => {
    const { id: orderId } = useParams<{ id: string }>();

    const { order, locations, student, isFetchingAll, refetch } = useOrderDetailInfo({ orderId });

    if (isFetchingAll) return <Loading />;

    // TODO: Will update 404 Error Page after have decision
    // https://manabie.slack.com/archives/C02F2Q26SGP/p1645776017150039?thread_ts=1645758873.042709&cid=C02F2Q26SGP
    if (typeof order === "undefined") return <NotFound data-testid="OrderDetail__notfound" />;

    return (
        <WrapperPageContent data-testid="OrderDetail__root">
            <Grid container direction="column">
                <Grid item data-testid="OrderDetail__breadcrumbs">
                    <Breadcrumbs
                        resource={Entities.ORDERS}
                        name={getOrderSequenceNumberPrefix(order.order_sequence_number)}
                    />
                </Grid>
                <Grid item>
                    <OrderDetailHeaderWrapper order={order} orderId={orderId} refetch={refetch} />
                </Grid>
                <Grid item container direction="column" spacing={3}>
                    <Grid item container direction="column">
                        <OrderDetailGeneralInfo
                            order={order}
                            locations={locations}
                            student={student}
                        />
                    </Grid>
                    {order.order_type !== KeyOrderTypes.ORDER_TYPE_CUSTOM_BILLING ? (
                        <>
                            <Grid item>
                                <DividerDashed />
                            </Grid>
                            <Grid item container spacing={2}>
                                <OrderDetailProductListSection orderId={orderId} />
                            </Grid>
                        </>
                    ) : (
                        <></>
                    )}
                    <Grid item>
                        <DividerDashed />
                    </Grid>
                    <Grid item container spacing={2}>
                        <OrderDetailBillingItemSection orderId={orderId} />
                    </Grid>
                    <Grid item>
                        <DividerDashed />
                    </Grid>
                    <Grid item container spacing={2} pb="20px">
                        <OrderDetailActionLogSection orderId={orderId} />
                    </Grid>
                </Grid>
            </Grid>
        </WrapperPageContent>
    );
};

export default OrderDetailPage;
