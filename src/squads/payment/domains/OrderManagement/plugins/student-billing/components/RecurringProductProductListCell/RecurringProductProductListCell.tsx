import { Entities } from "src/common/constants/enum";
import { pick1stElement } from "src/common/utils/other";
import { MicroFrontendTypes } from "src/routing/type";
import {
    Payment_GetManyDiscountsByDiscountIdsQuery,
    Payment_GetManyProductsByProductIdsQuery,
} from "src/squads/payment/service/fatima/fatima-types";
import { ArrayElement } from "src/squads/payment/types/common/array";

import { Grid } from "@mui/material";
import DoubleDash from "src/components/DoubleDash";
import StyledLink from "src/components/StyledLink";
import TypographyBase, { TypographyBaseProps } from "src/components/Typographys/TypographyBase";

import { StudentProductLabel } from "manabuf/payment/v1/enums_pb";
import { RetrieveListOfOrderProductsResponse } from "manabuf/payment/v1/order_pb";

import useOrderItemsByStudentProductIds from "src/squads/payment/domains/OrderManagement/hooks/useOrderItemsByStudentProductIds";
import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";

export interface RecurringProductProductListCellProps {
    productName: ArrayElement<Payment_GetManyProductsByProductIdsQuery["product"]>["name"];
    discountName?: ArrayElement<Payment_GetManyDiscountsByDiscountIdsQuery["discount"]>["name"];
    studentProductLabel?: RetrieveListOfOrderProductsResponse.OrderProduct.AsObject["studentProductLabel"];
    updatedToStudentProductId?: RetrieveListOfOrderProductsResponse.OrderProduct.AsObject["updatedToStudentProductId"];
}

const RecurringProductProductListCell = ({
    productName,
    discountName,
    studentProductLabel,
    updatedToStudentProductId,
}: RecurringProductProductListCellProps) => {
    const tOrder = useResourceTranslate(Entities.ORDERS);
    const textColor: TypographyBaseProps["color"] = discountName ? "textPrimary" : "textSecondary";

    const { data: orderItems } = useOrderItemsByStudentProductIds({
        studentProductIds: updatedToStudentProductId.value,
        enabled: Boolean(updatedToStudentProductId.value),
    });
    const orderId = pick1stElement(orderItems || [])?.order_id;

    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    {studentProductLabel === StudentProductLabel.UPDATE_SCHEDULED && (
                        <StyledLink
                            to={`/${MicroFrontendTypes.PAYMENT}/${Entities.ORDERS}/${orderId}/show`}
                        >
                            <TypographyBase variant="body2">
                                {tOrder("label.updateScheduled")}
                            </TypographyBase>
                        </StyledLink>
                    )}
                </Grid>
                <Grid item xs={12}>
                    <TypographyBase variant="body2">{productName}</TypographyBase>
                </Grid>
                <Grid item xs={12} container direction="row">
                    <Grid item xs={6}>
                        <TypographyBase variant="caption" color="textSecondary">
                            {tOrder("label.discount")}
                        </TypographyBase>
                        <TypographyBase color={textColor} variant="body2">
                            {discountName || <DoubleDash />}
                        </TypographyBase>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default RecurringProductProductListCell;
