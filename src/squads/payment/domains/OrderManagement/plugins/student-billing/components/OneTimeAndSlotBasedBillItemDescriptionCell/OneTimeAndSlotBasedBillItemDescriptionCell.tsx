import { Grid, List, ListItem } from "@mui/material";
import TypographyBase from "src/components/Typographys/TypographyBase";

import { BillItemDescription } from "manabuf/payment/v1/order_pb";

export interface OneTimeAndSlotBasedBillItemDescriptionCellProps {
    productName: BillItemDescription.AsObject["productName"];
    courseItemsList?: BillItemDescription.AsObject["courseItemsList"];
}

const OneTimeAndSlotBasedBillItemDescriptionCell = ({
    productName,
    courseItemsList,
}: OneTimeAndSlotBasedBillItemDescriptionCellProps) => {
    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <TypographyBase
                    variant="body2"
                    data-testid="OnetimeAndSlotBasedBillItemDescriptionCell__productName"
                >
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
                            data-testid="OnetimeAndSlotBasedBillItemDescriptionCell__listItem"
                        >
                            {courseName}
                            {slot && ` (${slot.value})`}
                        </ListItem>
                    ))}
                </List>
            )}
        </Grid>
    );
};

export default OneTimeAndSlotBasedBillItemDescriptionCell;
