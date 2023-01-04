import { getCurrentCurrency, getFormattedItemPrice } from "src/squads/payment/helpers/price";
import { createMockRecurringMaterialProductUpcomingBillingItems } from "src/squads/payment/test-utils/mocks/recurring-products";
import { getFormattedDate } from "src/squads/payment/utils/date";

import { UpcomingBillingRecurringProduct } from "src/squads/payment/components/Sections/UpcomingBillingSection/types";
import RecurringProductUpcomingBilling, {
    RecurringProductUpcomingBillingProps,
} from "src/squads/payment/domains/OrderManagement/plugins/new-order/components/RecurringProductUpcomingBilling";

import { render } from "@testing-library/react";

const mockBillingItemName = "Mock billing item name";

jest.mock("src/squads/payment/domains/OrderManagement/hooks/useBillingItemName", () => {
    return {
        __esModule: true,
        default: () => mockBillingItemName,
    };
});

const recurringMaterialUpcomingBillingItems: UpcomingBillingRecurringProduct[] =
    createMockRecurringMaterialProductUpcomingBillingItems();
const { currentCurrency } = getCurrentCurrency();

const defaultBillingItemIndex = 0;
const billingItemWithDiscountIndex = 1;

const defaultRecurringProductUpcomingBillingProps: RecurringProductUpcomingBillingProps = {
    upcomingBillingItem: recurringMaterialUpcomingBillingItems[defaultBillingItemIndex],
};

const renderRecurringProductUpcomingBilling = (
    recurringMaterialProductUpcomingBillingProps: RecurringProductUpcomingBillingProps = defaultRecurringProductUpcomingBillingProps
) => {
    return render(
        <RecurringProductUpcomingBilling {...recurringMaterialProductUpcomingBillingProps} />
    );
};

describe("<RecurringProductUpcomingBilling />", () => {
    it("should render upcoming billing details with product name, billing period name, product price and upcoming billing date (without discount)", () => {
        const wrapper = renderRecurringProductUpcomingBilling();
        const defaultBillingItem = recurringMaterialUpcomingBillingItems[defaultBillingItemIndex];

        const { billingDate } = defaultBillingItem;

        const formattedProductPrice = getFormattedItemPrice(
            currentCurrency,
            false,
            defaultBillingItem.productPrice
        );

        const formattedBillingDate = getFormattedDate(billingDate);

        expect(wrapper.getByTestId("UpcomingBillingProduct__root")).toBeInTheDocument();
        expect(wrapper.getByText(mockBillingItemName)).toBeInTheDocument();
        expect(wrapper.getByText(formattedProductPrice)).toBeInTheDocument();
        expect(wrapper.getByText(formattedBillingDate)).toBeInTheDocument();
    });

    it("should display upcoming billing details with discount", () => {
        const billingItemWithDiscount =
            recurringMaterialUpcomingBillingItems[billingItemWithDiscountIndex];

        const wrapper = renderRecurringProductUpcomingBilling({
            upcomingBillingItem: billingItemWithDiscount,
        });

        const { productPrice, discountPrice, billingDate, discountName } = billingItemWithDiscount;

        const finalPrice = productPrice - discountPrice;
        const formattedFinalPrice = getFormattedItemPrice(currentCurrency, false, finalPrice);

        const formattedBillingDate = getFormattedDate(billingDate);

        expect(wrapper.getByText(discountName!)).toBeInTheDocument();
        expect(wrapper.getByText(formattedFinalPrice)).toBeInTheDocument();
        expect(wrapper.getByText(formattedBillingDate)).toBeInTheDocument();
    });
});
