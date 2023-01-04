import { getCurrentCurrency } from "src/squads/payment/helpers/price";
import { createMockUpcomingBillingProductsList } from "src/squads/payment/test-utils/mocks/products";

import UpcomingBillingList, {
    UpcomingBillingListProps,
} from "src/squads/payment/components/Sections/UpcomingBillingSection/UpcomingBillingList/UpcomingBillingList";
import { defaultNotImplementedYetPlugins } from "src/squads/payment/domains/OrderManagement/plugins/common/components/NotImplementedYetPlugins";

import { OrderType } from "manabuf/payment/v1/enums_pb";

import { render, within } from "@testing-library/react";
import ProductExtensionPluginsProvider from "src/squads/payment/domains/OrderManagement/plugins/new-order";

const defaultUpcomingBillingListProps: UpcomingBillingListProps = {
    upcomingBillingProducts: createMockUpcomingBillingProductsList(),
};
const { currentCurrency: currency } = getCurrentCurrency();

const renderUpcomingBillingList = (
    upcomingBillingListProps: UpcomingBillingListProps = defaultUpcomingBillingListProps
) => {
    return render(
        <ProductExtensionPluginsProvider
            currency={currency}
            orderType={OrderType.ORDER_TYPE_NEW}
            notImplementedYetPlugins={defaultNotImplementedYetPlugins}
        >
            <UpcomingBillingList {...upcomingBillingListProps} />
        </ProductExtensionPluginsProvider>
    );
};

describe("<UpcomingBillingList />", () => {
    it("should render upcoming billing list", () => {
        const defaultUpcomingBillingItem = createMockUpcomingBillingProductsList()[0];
        const productName = "Product Test";
        const discountName = "Discount 10";
        const wrapper = renderUpcomingBillingList({
            upcomingBillingProducts: [
                {
                    ...defaultUpcomingBillingItem,
                    productName,
                    discountName,
                },
            ],
        });

        expect(wrapper.getByTestId("UpcomingBillingList__container")).toBeInTheDocument();

        const listElement = wrapper.getByTestId("UpcomingBillingList__orderItemList");
        expect(within(listElement).getByText(productName)).toBeInTheDocument();
        expect(within(listElement).getByText(discountName)).toBeInTheDocument();
    });

    it("should show upcoming billing items", () => {
        const wrapper = renderUpcomingBillingList();

        expect(wrapper.getAllByTestId("UpcomingBillingProduct__root")).toHaveLength(
            defaultUpcomingBillingListProps.upcomingBillingProducts.length
        );
    });
});
