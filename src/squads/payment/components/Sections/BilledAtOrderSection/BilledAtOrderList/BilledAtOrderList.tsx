import { useMemo } from "react";

import { Entities } from "src/common/constants/enum";
import { OrderCurrency } from "src/squads/payment/constants/enum";

import { Box } from "@mui/material";
import DividerDashed from "src/components/Divider/DividerDashed";
import BilledAtOrderItem from "src/squads/payment/components/Sections/BilledAtOrderSection/BilledAtOrderItem";
import BilledAtOrderProduct from "src/squads/payment/components/Sections/BilledAtOrderSection/BilledAtOrderProduct";
import { BilledAtOrderItemType } from "src/squads/payment/components/Sections/BilledAtOrderSection/types";

import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";

export interface BilledAtOrderListProps {
    billedAtOrderProducts: BilledAtOrderItemType[];
    totalValue: number;
    currency: OrderCurrency;
    taxInclusions: Record<number, number>;
}

const BilledAtOrderList = ({
    billedAtOrderProducts,
    totalValue,
    currency,
    taxInclusions,
}: BilledAtOrderListProps) => {
    const taxInclusionEntries = Object.entries(taxInclusions);
    const tOrder = useResourceTranslate(Entities.ORDERS);

    const billedAtOrderProductsList = useMemo(() => {
        return billedAtOrderProducts.map((billedAtOrderProduct, index) => {
            return (
                <Box key={index} mb={2}>
                    <BilledAtOrderProduct billedAtOrderProduct={billedAtOrderProduct} />
                </Box>
            );
        });
    }, [billedAtOrderProducts]);

    const taxInclusionsList = useMemo(() => {
        return taxInclusionEntries.map(([taxInclusionPercentage, taxInclusionTotal]) => {
            return (
                <Box
                    key={taxInclusionPercentage}
                    mb={1}
                    data-testid="BilledAtOrderList__taxInclusions"
                >
                    <BilledAtOrderItem
                        itemName={`${tOrder("label.tax")} (${taxInclusionPercentage}% ${tOrder(
                            "label.incl"
                        )})`}
                        itemPrice={taxInclusionTotal}
                        variant="caption"
                        currency={currency}
                    />
                </Box>
            );
        });
    }, [currency, tOrder, taxInclusionEntries]);

    return (
        <Box data-testid="BilledAtOrderList__container">
            <Box data-testid="BilledAtOrderList__orderItemList">{billedAtOrderProductsList}</Box>
            <Box mb={2}>
                <DividerDashed />
            </Box>
            <Box>
                <Box mb={1} data-testid="BilledAtOrderList__subtotal">
                    <BilledAtOrderItem
                        itemName={tOrder("label.subTotal")}
                        itemPrice={totalValue}
                        variant="caption"
                        currency={currency}
                    />
                </Box>
                {taxInclusionsList}
                <Box data-testid="BilledAtOrderList__total">
                    <BilledAtOrderItem
                        itemName={tOrder("label.total")}
                        itemPrice={totalValue}
                        variant="subtitle2"
                        currency={currency}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default BilledAtOrderList;
