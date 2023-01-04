import { ReactElement, useCallback, useMemo, useState } from "react";

import { Entities } from "src/common/constants/enum";
import { arrayHasItem } from "src/common/utils/other";
import { KeyOrderStatus } from "src/squads/payment/constants/const";

import { Box, Grid, Skeleton } from "@mui/material";
import { ToggleButtonBaseProps } from "src/components/Buttons/ToggleButtonBase/ToggleButtonBase";
import ToggleButtonGroupBase from "src/components/Buttons/ToggleButtonGroupBase/ToggleButtonGroupBase";
import TypographyBase from "src/components/Typographys/TypographyBase";
import TypographyPageTitle from "src/components/Typographys/TypographyPageTitle";
import WrapperLookingFor, {
    WrapperLookingForProps,
} from "src/components/Wrappers/WrapperLookingFor";
import WrapperPageContent from "src/components/Wrappers/WrapperPageContent";
import OrderManagementTable from "src/squads/payment/domains/OrderManagement/components/Tables/OrderManagementTable";

import { OrderStatus } from "manabuf/payment/v1/enums_pb";

import OrderManagementListFormFilterAdvanced from "./OrderManagementListFormFilterAdvanced";

import useOrderList from "src/squads/payment/domains/OrderManagement/hooks/useOrderList";
import { OrderStatusKeys } from "src/squads/payment/domains/OrderManagement/plugins/common/types";
import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";
import useTranslate from "src/squads/payment/hooks/useTranslate";

export interface OrderStatusOptions {
    value: OrderStatusKeys;
    children: ReactElement<any, any>;
    onClick: () => void;
    "data-testid": string;
}

const OrdersPage = () => {
    const t = useTranslate();
    const tOrder = useResourceTranslate(Entities.ORDERS);
    const { orders, pagination, isLoadingOrder, onSearch, onFilter, refreshPage, onCategorize } =
        useOrderList();

    const orderWrapperLookingForVariant: WrapperLookingForProps["variant"] =
        !isLoadingOrder && !arrayHasItem(orders?.itemsList) ? "empty-icon" : "result";

    const [currentStatus, setCurrentStatus] = useState<OrderStatusKeys>(
        KeyOrderStatus.ORDER_STATUS_ALL
    );

    const onClickOrderStatus = useCallback(
        (status: OrderStatusKeys) => () => {
            if (status === currentStatus) return;

            setCurrentStatus(status);
            onCategorize(OrderStatus[status]);
            refreshPage();
        },
        [refreshPage, currentStatus, onCategorize]
    );

    const renderCategoryButtons = useCallback(
        (orderStatus: OrderStatusKeys, orderStatusNumber: number | undefined) => {
            if (typeof orderStatusNumber === "undefined") {
                return (
                    <Box data-testid="OrderManagementList__categorySkeleton">
                        <Skeleton animation="wave" height={22} width={41} />
                    </Box>
                );
            }
            return (
                <TypographyBase variant="button">
                    {tOrder(`choices.orderStatus.${orderStatus}`, {
                        smart_count: 2,
                        count: orderStatusNumber,
                    })}
                </TypographyBase>
            );
        },
        [tOrder]
    );

    const getStatus = useMemo(() => {
        const statusTypes = [
            {
                value: KeyOrderStatus.ORDER_STATUS_ALL,
                total: orders?.totalItems,
            },
            {
                value: KeyOrderStatus.ORDER_STATUS_SUBMITTED,
                total: orders?.totalOfSubmitted,
            },
            {
                value: KeyOrderStatus.ORDER_STATUS_PENDING,
                total: orders?.totalOfPending,
            },
            {
                value: KeyOrderStatus.ORDER_STATUS_REJECTED,
                total: orders?.totalOfRejected,
            },
            {
                value: KeyOrderStatus.ORDER_STATUS_VOIDED,
                total: orders?.totalOfVoided,
            },
            {
                value: KeyOrderStatus.ORDER_STATUS_INVOICED,
                total: orders?.totalOfInvoiced,
            },
        ];
        return statusTypes;
    }, [
        orders?.totalItems,
        orders?.totalOfInvoiced,
        orders?.totalOfPending,
        orders?.totalOfRejected,
        orders?.totalOfSubmitted,
        orders?.totalOfVoided,
    ]);

    const categoryOptions: ToggleButtonBaseProps[] = useMemo(() => {
        const categories: OrderStatusOptions[] = getStatus.map(({ value, total }) => {
            return {
                value: value,
                children: renderCategoryButtons(value, total),
                onClick: onClickOrderStatus(value),
                "data-testid": `OrderStatus__${value}`,
            };
        });
        return categories;
    }, [getStatus, renderCategoryButtons, onClickOrderStatus]);

    return (
        <WrapperPageContent data-testid="OrderManagementList">
            <TypographyPageTitle title={tOrder("name")} />

            <Grid container direction="column" spacing={2}>
                <Grid item xs={12}>
                    <OrderManagementListFormFilterAdvanced
                        onApplySubmit={onFilter}
                        onEnterSearchBar={onSearch}
                    />
                </Grid>
                <Grid item container spacing={1}>
                    <Grid item xs={12}>
                        <Box alignItems="center">
                            <ToggleButtonGroupBase
                                value={currentStatus}
                                options={categoryOptions}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <WrapperLookingFor
                            height="page"
                            variant={orderWrapperLookingForVariant}
                            content={t("resources.common.noResult")}
                            helperText={t("resources.common.noResultSearchAndFilter")}
                        >
                            <OrderManagementTable
                                dataSource={orders?.itemsList}
                                loading={isLoadingOrder}
                                pagination={pagination}
                            />
                        </WrapperLookingFor>
                    </Grid>
                </Grid>
            </Grid>
        </WrapperPageContent>
    );
};

export default OrdersPage;
