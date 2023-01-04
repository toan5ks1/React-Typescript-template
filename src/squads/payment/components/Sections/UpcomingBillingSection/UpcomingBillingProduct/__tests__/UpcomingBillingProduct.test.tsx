import { getCurrentCurrency, getFormattedItemPrice } from "src/squads/payment/helpers/price";
import { createMockUpcomingBillingProductsList } from "src/squads/payment/test-utils/mocks/products";
import { getFormattedDate } from "src/squads/payment/utils/date";

import UpcomingBillingProduct from "src/squads/payment/components/Sections/UpcomingBillingSection/UpcomingBillingProduct/UpcomingBillingProduct";
import { UpcomingBillingItemType } from "src/squads/payment/components/Sections/UpcomingBillingSection/types";
import { defaultNotImplementedYetPlugins } from "src/squads/payment/domains/OrderManagement/plugins/common/components/NotImplementedYetPlugins";

import { OrderType } from "manabuf/payment/v1/enums_pb";

import { render, within } from "@testing-library/react";
import ProductExtensionPluginsProvider from "src/squads/payment/domains/OrderManagement/plugins/new-order";

const defaultUpcomingBillingProductProps: UpcomingBillingItemType =
    createMockUpcomingBillingProductsList()[0];
const { currentCurrency: currency } = getCurrentCurrency();

const renderUpcomingBillingProductProps = (
    upcomingBillingProductProps: UpcomingBillingItemType = defaultUpcomingBillingProductProps
) => {
    return render(
        <ProductExtensionPluginsProvider
            currency={currency}
            orderType={OrderType.ORDER_TYPE_NEW}
            notImplementedYetPlugins={defaultNotImplementedYetPlugins}
        >
            <UpcomingBillingProduct upcomingBillingProduct={upcomingBillingProductProps} />
        </ProductExtensionPluginsProvider>
    );
};

describe("<UpcomingBillingProduct />", () => {
    it("should render upcoming billing product details", () => {
        const discountName = "Discount 10";
        const wrapper = renderUpcomingBillingProductProps({
            ...defaultUpcomingBillingProductProps,
            discountName,
        });

        expect(wrapper.getByTestId("UpcomingBillingProduct__root")).toBeInTheDocument();
        expect(wrapper.getByTestId("UpcomingBillingProduct__price")).toBeInTheDocument();

        const productNameElement = wrapper.getByTestId("UpcomingBillingProduct__name");
        expect(
            within(productNameElement).getByText(defaultUpcomingBillingProductProps.productName)
        ).toBeInTheDocument();

        const discountElement = wrapper.getByTestId("UpcomingBillingProduct__discount");
        expect(within(discountElement).getByText(discountName)).toBeInTheDocument();

        const formattedBillingDate = getFormattedDate(
            defaultUpcomingBillingProductProps.billingDate
        );
        const billingDateElement = wrapper.getByTestId("UpcomingBillingProduct__billingDate");
        expect(within(billingDateElement).getByText(formattedBillingDate)).toBeInTheDocument();
    });

    it("should not render discount when there is no discount name", () => {
        const wrapper = renderUpcomingBillingProductProps({
            ...defaultUpcomingBillingProductProps,
            discountName: undefined,
        });

        expect(wrapper.getByTestId("UpcomingBillingProduct__root")).toBeInTheDocument();
        expect(wrapper.queryByTestId("UpcomingBillingProduct__discount")).not.toBeInTheDocument();
    });

    it("should display final price of product", () => {
        const wrapper = renderUpcomingBillingProductProps();

        const { productPrice, discountPrice } = defaultUpcomingBillingProductProps;

        const totalPrice = productPrice - discountPrice;
        const formattedPrice = getFormattedItemPrice(currency, false, totalPrice);

        const priceElement = wrapper.getByTestId("UpcomingBillingProduct__price");
        expect(within(priceElement).getByText(formattedPrice)).toBeInTheDocument();
    });
});
