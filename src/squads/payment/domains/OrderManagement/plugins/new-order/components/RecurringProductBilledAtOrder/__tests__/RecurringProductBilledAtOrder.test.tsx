import { getCurrentCurrency, getFormattedItemPrice } from "src/squads/payment/helpers/price";
import { createMockRecurringMaterialProductBilledAtOrderItems } from "src/squads/payment/test-utils/mocks/recurring-products";

import { BilledAtOrderRecurringProduct } from "src/squads/payment/components/Sections/BilledAtOrderSection/types";
import RecurringProductBilledAtOrder, {
    RecurringProductBilledAtOrderProps,
} from "src/squads/payment/domains/OrderManagement/plugins/new-order/components/RecurringProductBilledAtOrder";

import { render, within } from "@testing-library/react";

const mockBillingItemName = "Mock billing item name";

jest.mock("src/squads/payment/domains/OrderManagement/hooks/useBillingItemName", () => {
    return {
        __esModule: true,
        default: () => mockBillingItemName,
    };
});

const recurringMaterialBilledAtOrderItems: BilledAtOrderRecurringProduct[] =
    createMockRecurringMaterialProductBilledAtOrderItems();
const { currentCurrency } = getCurrentCurrency();

const defaultBillingItemIndex = 0;
const billingItemWithDiscountIndex = 1;

const defaultRecurringProductBilledAtOrderProps: RecurringProductBilledAtOrderProps = {
    billedAtOrderItem: recurringMaterialBilledAtOrderItems[defaultBillingItemIndex],
};

const renderRecurringProductBilledAtOrder = (
    recurringMaterialProductBilledAtOrderProps: RecurringProductBilledAtOrderProps = defaultRecurringProductBilledAtOrderProps
) => {
    return render(
        <RecurringProductBilledAtOrder {...recurringMaterialProductBilledAtOrderProps} />
    );
};

describe("<RecurringProductBilledAtOrder />", () => {
    it("should render billed at order product details (without discount)", () => {
        const wrapper = renderRecurringProductBilledAtOrder();
        const defaultBillingItem = recurringMaterialBilledAtOrderItems[defaultBillingItemIndex];

        const formattedItemPrice = getFormattedItemPrice(
            currentCurrency,
            false,
            defaultBillingItem.productPrice
        );

        const productContainer = wrapper.getByTestId("BilledAtOrderProduct__productContainer");
        expect(within(productContainer).getByText(mockBillingItemName)).toBeInTheDocument();
        expect(within(productContainer).getByText(formattedItemPrice)).toBeInTheDocument();
        expect(
            wrapper.queryByTestId("BilledAtOrderProduct__discountContainer")
        ).not.toBeInTheDocument();
    });

    it("should show discount when product has discount", () => {
        const billingItemWithDiscount =
            recurringMaterialBilledAtOrderItems[billingItemWithDiscountIndex];
        const wrapper = renderRecurringProductBilledAtOrder({
            billedAtOrderItem: billingItemWithDiscount,
        });

        const formattedDiscountPrice = getFormattedItemPrice(
            currentCurrency,
            true,
            billingItemWithDiscount.discountPrice
        );

        const discountContainer = wrapper.getByTestId("BilledAtOrderProduct__discountContainer");
        expect(within(discountContainer).getByText(formattedDiscountPrice)).toBeInTheDocument();
        expect(
            within(discountContainer).getByText(billingItemWithDiscount.discountName!)
        ).toBeInTheDocument();
    });
});
