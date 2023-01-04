import { useMemo } from "react";

import { Box } from "@mui/material";
import { UpcomingBillingItemType } from "src/squads/payment/components/Sections/UpcomingBillingSection/types";

import UpcomingBillingProduct from "../UpcomingBillingProduct";

const sx = {
    itemMarginBottom: {
        "&:not(:last-of-type)": {
            marginBottom: "16px", // decrease padding in upcoming billing https://manabie.atlassian.net/browse/LT-13417
        },
    },
};

export interface UpcomingBillingListProps {
    upcomingBillingProducts: UpcomingBillingItemType[];
}

const UpcomingBillingList = ({ upcomingBillingProducts }: UpcomingBillingListProps) => {
    const upcomingBillingProductsList = useMemo(() => {
        return upcomingBillingProducts.map((upcomingBillingProduct, index) => {
            return (
                <Box key={index} sx={sx.itemMarginBottom}>
                    <UpcomingBillingProduct upcomingBillingProduct={upcomingBillingProduct} />
                </Box>
            );
        });
    }, [upcomingBillingProducts]);

    return (
        <Box data-testid="UpcomingBillingList__container">
            <Box data-testid="UpcomingBillingList__orderItemList">
                {upcomingBillingProductsList}
            </Box>
        </Box>
    );
};

export default UpcomingBillingList;
