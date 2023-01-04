import { useWatch } from "react-hook-form";
import { Entities } from "src/common/constants/enum";
import { arrayHasItem } from "src/common/utils/other";
import { getTotalValueForBilledAtOrderItems } from "src/squads/payment/helpers/price";
import { getTaxValuesForBilledAtOrderItems } from "src/squads/payment/helpers/tax";
import { OrderFormValues } from "src/squads/payment/types/form/order-form-types";

import { Box } from "@mui/material";
import PaperRoundedBorders from "src/components/Papers/PaperRoundedBorders";
import TypographyHeader from "src/components/Typographys/TypographyHeader";
import WrapperNoData from "src/components/Wrappers/WrapperNoData";
import BilledAtOrderList from "src/squads/payment/components/Sections/BilledAtOrderSection/BilledAtOrderList";

import { useProductPluginsContext } from "src/squads/payment/domains/OrderManagement/plugins/new-order";
import useGetBilledAtOrderProducts from "src/squads/payment/hooks/useGetBilledAtOrderProducts";
import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";
import useTranslate from "src/squads/payment/hooks/useTranslate";

export interface BilledAtOrderSectionProps {
    showBilledAtOrderSectionTitle?: boolean;
    showEnrollmentForm?: boolean;
    closeEnrollmentForm?: () => void;
    cancelEnrollmentRequest?: () => void;
    studentIndex: number;
}
const BilledAtOrderSection = ({
    showBilledAtOrderSectionTitle = true,
    studentIndex,
}: BilledAtOrderSectionProps) => {
    const t = useTranslate();
    const tOrder = useResourceTranslate(Entities.ORDERS);

    const [productFieldArrayItems] = useWatch<
        OrderFormValues,
        [`students.${number}.productFieldArrayItems`]
    >({
        name: [`students.${studentIndex}.productFieldArrayItems`],
    });

    const { currency, getProductPluginsMap } = useProductPluginsContext();

    const billedAtOrderProducts = useGetBilledAtOrderProducts({
        productFieldArrayItems,
        getProductPluginsMap,
    });

    const totalValue = getTotalValueForBilledAtOrderItems(billedAtOrderProducts);
    const billedAtOrderTaxInclusions = getTaxValuesForBilledAtOrderItems(billedAtOrderProducts);

    return (
        <>
            {showBilledAtOrderSectionTitle && (
                <Box mb={2} data-testid="BilledAtOrderSection__titleContainer">
                    <TypographyHeader>{tOrder("title.billedAtOrder")}</TypographyHeader>
                </Box>
            )}

            <Box data-testid="BilledAtOrderSection__container" pb={1}>
                {arrayHasItem(billedAtOrderProducts) ? (
                    <BilledAtOrderList
                        currency={currency}
                        billedAtOrderProducts={billedAtOrderProducts}
                        taxInclusions={billedAtOrderTaxInclusions}
                        totalValue={totalValue}
                    />
                ) : (
                    <PaperRoundedBorders data-testid="BilledAtOrderSection__noDataContainer">
                        <WrapperNoData noDataMessage={t("ra.message.noDataInformation")} />
                    </PaperRoundedBorders>
                )}
            </Box>
        </>
    );
};

export default BilledAtOrderSection;
