import { ProductListItemStatus } from "src/squads/payment/constants/enum";
import { getProductAndProductExtensionType } from "src/squads/payment/helpers/product-type";
import { ProductsFormValues } from "src/squads/payment/types/form/order-form-types";

import { Box, Grid } from "@mui/material";
import TypographyBase from "src/components/Typographys/TypographyBase";
import CancelledInputAdornment from "src/squads/payment/components/CancelledInputAdorment";

import { useProductPluginsContext } from "src/squads/payment/domains/OrderManagement/plugins/new-order";
import { UpdateOrderPluginFunctions } from "src/squads/payment/domains/OrderManagement/plugins/new-order/types";

export interface UpdateOrderPreviewItemProps {
    productFieldItem: ProductsFormValues;
    hasEffectiveDate?: boolean;
}

const UpdateOrderPreviewItem = ({
    productFieldItem,
    hasEffectiveDate,
}: UpdateOrderPreviewItemProps) => {
    const { product, updateOrderDetails } = productFieldItem;

    const { getProductPluginsMap } = useProductPluginsContext<UpdateOrderPluginFunctions>();

    const productAndProductExtension = getProductAndProductExtensionType(productFieldItem);

    const { ProductPreviewItemChild } = getProductPluginsMap(productAndProductExtension);

    const isProductFieldItemCancelled =
        updateOrderDetails?.orderStatus === ProductListItemStatus.CANCELLED;

    return (
        <Grid container>
            <Grid item xs={12} pt={3}>
                <Box display="flex" justifyItems="center">
                    {isProductFieldItemCancelled && <CancelledInputAdornment mr={0.5} />}
                    <Box>
                        <TypographyBase variant="subtitle1">{product?.name}</TypographyBase>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={12} pt={2}>
                <ProductPreviewItemChild
                    productFieldItem={productFieldItem}
                    hasEffectiveDate={hasEffectiveDate}
                />
            </Grid>
        </Grid>
    );
};

export default UpdateOrderPreviewItem;
