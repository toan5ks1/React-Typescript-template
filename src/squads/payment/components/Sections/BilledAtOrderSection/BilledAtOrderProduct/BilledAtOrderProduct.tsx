import { Box } from "@mui/material";
import { BilledAtOrderItemType } from "src/squads/payment/components/Sections/BilledAtOrderSection/types";

import { useProductPluginsContext } from "src/squads/payment/domains/OrderManagement/plugins/new-order";

interface BilledAtOrderProps {
    billedAtOrderProduct: BilledAtOrderItemType;
}

const BilledAtOrderProduct = ({ billedAtOrderProduct }: BilledAtOrderProps) => {
    const { productAndProductExtension } = billedAtOrderProduct;

    const { getProductPluginsMap } = useProductPluginsContext();

    const { BilledAtOrderChild } = getProductPluginsMap(productAndProductExtension);

    return (
        <Box data-testid="BilledAtOrderProduct__root">
            <BilledAtOrderChild billedAtOrderItem={billedAtOrderProduct} />
        </Box>
    );
};

export default BilledAtOrderProduct;
