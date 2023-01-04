import { useWatch } from "react-hook-form";
import { getProductAndProductExtensionType } from "src/squads/payment/helpers/product-type";
import { ArrayElement } from "src/squads/payment/types/common/array";
import { OrderFormValues } from "src/squads/payment/types/form/order-form-types";

import { Box } from "@mui/material";

import { useProductPluginsContext } from "src/squads/payment/domains/OrderManagement/plugins/new-order";

const ProductListItemDetailsRendered = ({
    productFieldArrayItem,
    productFieldItemIndex,
    studentIndex,
}: {
    productFieldArrayItem: ArrayElement<
        ArrayElement<OrderFormValues["students"]>["productFieldArrayItems"]
    >;
    productFieldItemIndex: number;
    studentIndex: number;
}) => {
    const { getProductPluginsMap } = useProductPluginsContext();

    const productAndProductExtension = getProductAndProductExtensionType(productFieldArrayItem);

    const { ProductChild } = getProductPluginsMap(productAndProductExtension);

    return (
        <Box data-testid="ProductListItemDetails__root" pb={2}>
            <ProductChild
                productFieldArrayItem={productFieldArrayItem}
                productFieldItemIndex={productFieldItemIndex}
                studentIndex={studentIndex}
            />
        </Box>
    );
};

export interface ProductListItemDetailsProps {
    productIndex: number;
    studentIndex: number;
}

const ProductListItemDetails = ({ productIndex, studentIndex }: ProductListItemDetailsProps) => {
    const [productFieldArrayItems] = useWatch<
        OrderFormValues,
        [`students.${number}.productFieldArrayItems`]
    >({
        name: [`students.${studentIndex}.productFieldArrayItems`],
    });

    const { product, material, fee, packageEntity } = productFieldArrayItems[productIndex];

    if (!product || (!material && !fee && !packageEntity)) return null;

    return (
        <ProductListItemDetailsRendered
            productFieldArrayItem={productFieldArrayItems[productIndex]}
            productFieldItemIndex={productIndex}
            studentIndex={studentIndex}
        />
    );
};

export default ProductListItemDetails;
