import {
    Payment_GetManyDiscountsByDiscountIdsQuery,
    Payment_GetManyProductsByProductIdsQuery,
} from "src/squads/payment/service/fatima/fatima-types";
import { ArrayElement } from "src/squads/payment/types/common/array";

import { Grid, List, ListItem } from "@mui/material";
import TypographyBase from "src/components/Typographys/TypographyBase";
import { RecurringDetailsProps } from "src/squads/payment/domains/OrderManagement/plugins/order-details/components/types";

import { CourseItem } from "manabuf/payment/v1/order_pb";

import useCourseSlotsLabel, {
    SlotType,
} from "src/squads/payment/domains/OrderManagement/hooks/useCourseSlotsLabel";

export interface BillingItemCellProps {
    productName: ArrayElement<Payment_GetManyProductsByProductIdsQuery["product"]>["name"];
    discountName?: ArrayElement<Payment_GetManyDiscountsByDiscountIdsQuery["discount"]>["name"];
    courseItemsList?: CourseItem.AsObject[];
    typeOfSlot?: SlotType;
    recurringDetails?: RecurringDetailsProps;
}

const BillingItemCell = ({
    productName,
    courseItemsList,
    typeOfSlot = "slot",
}: BillingItemCellProps) => {
    const getSlotLabel = useCourseSlotsLabel(typeOfSlot);

    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <TypographyBase variant="body2" data-testid="BillingItemCell__productName">
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
                                data-testid="BillingListCell__listItem"
                            >
                                {courseName}
                                {slot && getSlotLabel(slot.value)}
                            </ListItem>
                        ))}
                    </List>
                )}
            </Grid>
        </>
    );
};

export default BillingItemCell;
