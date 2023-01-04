import { useCallback } from "react";

import { useFormContext, useWatch } from "react-hook-form";
import { Entities } from "src/common/constants/enum";
import { arrayHasItem } from "src/common/utils/other";
import { getProductAndProductExtensionType } from "src/squads/payment/helpers/product-type";
import {
    OrderFormValues,
    ProductsFormValues,
} from "src/squads/payment/types/form/order-form-types";

import { Box } from "@mui/material";
import PaperRoundedBorders from "src/components/Papers/PaperRoundedBorders";
import TypographyHeader from "src/components/Typographys/TypographyHeader";
import WrapperNoData from "src/components/Wrappers/WrapperNoData";
import UpcomingBillingList from "src/squads/payment/components/Sections/UpcomingBillingSection/UpcomingBillingList";
import { UpcomingBillingItemType } from "src/squads/payment/components/Sections/UpcomingBillingSection/types";

import { useProductPluginsContext } from "src/squads/payment/domains/OrderManagement/plugins/new-order";
import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";
import useTranslate from "src/squads/payment/hooks/useTranslate";

export interface UpcomingBillingSectionProps {
    studentIndex: number;
    showUpcomingBillingSectionTitle?: boolean;
}

const UpcomingBillingSection = ({
    studentIndex,
    showUpcomingBillingSectionTitle = true,
}: UpcomingBillingSectionProps) => {
    const t = useTranslate();
    const tOrder = useResourceTranslate(Entities.ORDERS);

    const { control } = useFormContext<OrderFormValues>();

    const [productFieldArrayItem] = useWatch<
        OrderFormValues,
        [`students.${number}.productFieldArrayItems`]
    >({
        control,
        name: [`students.${studentIndex}.productFieldArrayItems`],
    });

    const { getProductPluginsMap } = useProductPluginsContext();

    const getUpcomingBillingProducts = useCallback(
        (productFieldArrayItems: ProductsFormValues[]): UpcomingBillingItemType[] => {
            return productFieldArrayItems.reduce(
                (upcomingBillingProducts: UpcomingBillingItemType[], productFieldArrayItem) => {
                    if (
                        !productFieldArrayItem.product ||
                        !arrayHasItem(productFieldArrayItem.productPrices)
                    ) {
                        return [...upcomingBillingProducts];
                    }

                    const productAndProductExtension =
                        getProductAndProductExtensionType(productFieldArrayItem);

                    const { generateUpcomingBillingBillingItems } = getProductPluginsMap(
                        productAndProductExtension
                    );

                    return [
                        ...upcomingBillingProducts,
                        ...generateUpcomingBillingBillingItems(productFieldArrayItem),
                    ];
                },
                []
            );
        },
        [getProductPluginsMap]
    );

    const upcomingBillingProducts = getUpcomingBillingProducts(productFieldArrayItem);

    return (
        <>
            {showUpcomingBillingSectionTitle && (
                <Box mb={2}>
                    <TypographyHeader data-testid="UpcomingBillingSection__title">
                        {tOrder("title.upcomingBilling")}
                    </TypographyHeader>
                </Box>
            )}
            <Box data-testid="UpcomingBillingSection__container" pb={1}>
                {arrayHasItem(upcomingBillingProducts) ? (
                    <UpcomingBillingList upcomingBillingProducts={upcomingBillingProducts} />
                ) : (
                    <PaperRoundedBorders data-testid="UpcomingBillingSection__noDataContainer">
                        <WrapperNoData noDataMessage={t("ra.message.noDataInformation")} />
                    </PaperRoundedBorders>
                )}
            </Box>
        </>
    );
};

export default UpcomingBillingSection;
