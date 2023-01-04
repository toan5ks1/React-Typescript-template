import { getCurrentCurrency } from "src/squads/payment/helpers/price";
import { createMockBilledAtOrderProductsList } from "src/squads/payment/test-utils/mocks/products";

import BilledAtOrderProduct from "src/squads/payment/components/Sections/BilledAtOrderSection/BilledAtOrderProduct";
import { BilledAtOrderItemType } from "src/squads/payment/components/Sections/BilledAtOrderSection/types";
import { defaultNotImplementedYetPlugins } from "src/squads/payment/domains/OrderManagement/plugins/common/components/NotImplementedYetPlugins";

import { OrderType } from "manabuf/payment/v1/enums_pb";

import { render, within } from "@testing-library/react";
import ProductExtensionPluginsProvider from "src/squads/payment/domains/OrderManagement/plugins/new-order";

const defaultBilledAtOrderProductProps: BilledAtOrderItemType =
    createMockBilledAtOrderProductsList()[0];
const { currentCurrency: currency } = getCurrentCurrency();

const renderBilledAtOrderProduct = (
    billedAtOrderProductProps: BilledAtOrderItemType = defaultBilledAtOrderProductProps
) => {
    return render(
        <ProductExtensionPluginsProvider
            currency={currency}
            orderType={OrderType.ORDER_TYPE_NEW}
            notImplementedYetPlugins={defaultNotImplementedYetPlugins}
        >
            <BilledAtOrderProduct billedAtOrderProduct={billedAtOrderProductProps} />
        </ProductExtensionPluginsProvider>
    );
};

describe("<BilledAtOrderProduct />", () => {
    it("should render billed at order product details", () => {
        const discountName = "Discount 10";
        const wrapper = renderBilledAtOrderProduct({
            ...defaultBilledAtOrderProductProps,
            discountName,
        });

        const productElement = wrapper.getByTestId("BilledAtOrderProduct__productContainer");
        const discountElement = wrapper.getByTestId("BilledAtOrderProduct__discountContainer");

        expect(
            within(productElement).getByText(defaultBilledAtOrderProductProps.productName)
        ).toBeInTheDocument();
        expect(within(discountElement).getByText(discountName)).toBeInTheDocument();
    });

    it("should not render discount section when there is no discount name", () => {
        const wrapper = renderBilledAtOrderProduct({
            ...defaultBilledAtOrderProductProps,
            discountName: undefined,
        });

        expect(wrapper.getByTestId("BilledAtOrderProduct__productContainer")).toBeInTheDocument();
        expect(
            wrapper.queryByTestId("BilledAtOrderProduct__discountContainer")
        ).not.toBeInTheDocument();
    });
});
