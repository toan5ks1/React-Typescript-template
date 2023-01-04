import { getCurrentCurrency, getFormattedItemPrice } from "src/squads/payment/helpers/price";
import { createMockBilledAtOrderProductsList } from "src/squads/payment/test-utils/mocks/products";

import OneTimeProductBilledAtOrder, {
    OneTimeProductBilledAtOrderProps,
} from "src/squads/payment/domains/OrderManagement/plugins/common/components/OneTimeProductBilledAtOrder";

import { render, within } from "@testing-library/react";

const defaultBilledAtOrderItem = createMockBilledAtOrderProductsList()[0];
const { currentCurrency } = getCurrentCurrency();

const defaultOneTimeProductBilledAtOrderProps: OneTimeProductBilledAtOrderProps = {
    billedAtOrderItem: defaultBilledAtOrderItem,
};

const renderOneTimeProductBilledAtOrder = (
    oneTimeProductBilledAtOrderProps: OneTimeProductBilledAtOrderProps = defaultOneTimeProductBilledAtOrderProps
) => {
    return render(<OneTimeProductBilledAtOrder {...oneTimeProductBilledAtOrderProps} />);
};

describe("<OneTimeProductBilledAtOrder />", () => {
    it("should render billed at order product details", () => {
        const wrapper = renderOneTimeProductBilledAtOrder();

        const formattedItemPrice = getFormattedItemPrice(
            currentCurrency,
            false,
            defaultBilledAtOrderItem.productPrice
        );

        const productContainer = wrapper.getByTestId("BilledAtOrderProduct__productContainer");
        expect(
            within(productContainer).getByText(defaultBilledAtOrderItem.productName)
        ).toBeInTheDocument();
        expect(within(productContainer).getByText(formattedItemPrice)).toBeInTheDocument();
    });

    it("should show discount when product has discount", () => {
        const discountName = "Discount 10";
        const discountPrice = 10;
        const wrapper = renderOneTimeProductBilledAtOrder({
            billedAtOrderItem: {
                ...defaultBilledAtOrderItem,
                discountName,
                discountPrice,
            },
        });

        const formattedDiscountPrice = getFormattedItemPrice(currentCurrency, true, discountPrice);

        const discountContainer = wrapper.getByTestId("BilledAtOrderProduct__discountContainer");
        expect(within(discountContainer).getByText(formattedDiscountPrice)).toBeInTheDocument();
    });

    it("should not show discount when product has no discount", () => {
        const discountPrice = 10;
        const wrapper = renderOneTimeProductBilledAtOrder({
            billedAtOrderItem: {
                ...defaultBilledAtOrderItem,
                discountName: undefined,
                discountPrice,
            },
        });

        const formattedDiscountPrice = getFormattedItemPrice(currentCurrency, true, discountPrice);

        expect(wrapper.getByTestId("BilledAtOrderProduct__productContainer")).toBeInTheDocument();
        expect(
            wrapper.queryByTestId("BilledAtOrderProduct__discountContainer")
        ).not.toBeInTheDocument();
        expect(wrapper.queryByText(formattedDiscountPrice)).not.toBeInTheDocument();
    });
});
