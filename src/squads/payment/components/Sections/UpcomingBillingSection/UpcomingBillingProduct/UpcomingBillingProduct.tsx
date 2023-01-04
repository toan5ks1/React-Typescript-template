import { UpcomingBillingItemType } from "src/squads/payment/components/Sections/UpcomingBillingSection/types";

import { useProductPluginsContext } from "src/squads/payment/domains/OrderManagement/plugins/new-order";

interface BilledAtOrderProps {
    upcomingBillingProduct: UpcomingBillingItemType;
}

const UpcomingBillingProduct = ({ upcomingBillingProduct }: BilledAtOrderProps) => {
    const { getProductPluginsMap } = useProductPluginsContext();

    const { productAndProductExtension } = upcomingBillingProduct;

    const { UpcomingBillingChild } = getProductPluginsMap(productAndProductExtension);

    return <UpcomingBillingChild upcomingBillingProduct={upcomingBillingProduct} />;
};

export default UpcomingBillingProduct;
