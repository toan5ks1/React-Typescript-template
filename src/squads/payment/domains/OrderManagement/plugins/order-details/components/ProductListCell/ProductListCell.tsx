import { Entities } from "src/common/constants/enum";
import { convertTimestampToDate, formatDate } from "src/common/utils/time";
import {
    Payment_GetManyDiscountsByDiscountIdsQuery,
    Payment_GetManyProductsByProductIdsQuery,
} from "src/squads/payment/service/fatima/fatima-types";
import { ArrayElement } from "src/squads/payment/types/common/array";

import { Grid, List, ListItem } from "@mui/material";
import DoubleDash from "src/components/DoubleDash";
import TypographyBase, { TypographyBaseProps } from "src/components/Typographys/TypographyBase";
import { RecurringDetailsProps } from "src/squads/payment/domains/OrderManagement/plugins/order-details/components/types";

import { CourseItem, RetrieveListOfOrderDetailProductsResponse } from "manabuf/payment/v1/order_pb";

import useCourseSlotsLabel, {
    SlotType,
} from "src/squads/payment/domains/OrderManagement/hooks/useCourseSlotsLabel";
import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";

export interface ProductListCellProps {
    productName: ArrayElement<Payment_GetManyProductsByProductIdsQuery["product"]>["name"];
    discountName?: ArrayElement<Payment_GetManyDiscountsByDiscountIdsQuery["discount"]>["name"];
    courseItemsList?: CourseItem.AsObject[];
    typeOfSlot?: SlotType;
    recurringDetails?: RecurringDetailsProps;
    startDate?: RetrieveListOfOrderDetailProductsResponse.OrderProduct.AsObject["startDate"];
}

const ProductListCell = ({
    productName,
    discountName,
    courseItemsList,
    typeOfSlot = "slot",
    startDate,
}: ProductListCellProps) => {
    const tOrder = useResourceTranslate(Entities.ORDERS);
    const textColor: TypographyBaseProps["color"] = discountName ? "textPrimary" : "textSecondary";
    const getSlotLabel = useCourseSlotsLabel(typeOfSlot);

    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <TypographyBase variant="body2" data-testid="ProductListCell__productName">
                        {productName}
                    </TypographyBase>
                </Grid>
                {courseItemsList && (
                    <List
                        sx={{ listStyleType: "disc", listStylePosition: "inside", pb: 1 }}
                        disablePadding
                    >
                        {courseItemsList.map(({ courseId, courseName, slot }) => (
                            <ListItem
                                key={courseId}
                                sx={{ display: "list-item", py: 0 }}
                                data-testid="ProductListCell__listItem"
                            >
                                {courseName}
                                {slot && getSlotLabel(slot.value)}
                            </ListItem>
                        ))}
                    </List>
                )}
                <Grid item xs={12} container direction="row">
                    <Grid item xs={6}>
                        <TypographyBase variant="caption" color="textSecondary">
                            {tOrder("label.discount")}
                        </TypographyBase>
                        <TypographyBase
                            color={textColor}
                            variant="body2"
                            data-testid="ProductListCell__discountRow"
                        >
                            {discountName || <DoubleDash />}
                        </TypographyBase>
                    </Grid>
                    {startDate && (
                        <Grid item xs={6}>
                            <TypographyBase variant="caption" color="textSecondary">
                                {tOrder("label.startDate")}
                            </TypographyBase>
                            <TypographyBase
                                color={"textPrimary"}
                                variant="body2"
                                data-testid="ProductListCell__startDateRow"
                            >
                                {startDate &&
                                    formatDate(convertTimestampToDate(startDate), "yyyy/LL/dd")}
                            </TypographyBase>
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </>
    );
};

export default ProductListCell;
