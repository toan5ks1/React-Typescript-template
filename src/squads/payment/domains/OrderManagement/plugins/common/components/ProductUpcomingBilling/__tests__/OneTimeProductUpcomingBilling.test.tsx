import { getCurrentCurrency, getFormattedItemPrice } from "src/squads/payment/helpers/price";
import { createMockUpcomingBillingProductsList } from "src/squads/payment/test-utils/mocks/products";

import ProductUpcomingBilling, {
    ProductUpcomingBillingProps,
} from "src/squads/payment/domains/OrderManagement/plugins/common/components/ProductUpcomingBilling/ProductUpcomingBilling";

import { render } from "@testing-library/react";

const { currentCurrency } = getCurrentCurrency();
const defaultUpcomingBillingProduct = createMockUpcomingBillingProductsList()[0];

const defaultOneTimeProductUpcomingBillingProps: ProductUpcomingBillingProps = {
    upcomingBillingProduct: defaultUpcomingBillingProduct,
};

const renderOneTimeProductBilledAtOrder = (
    oneTimeProductUpcomingBillingProps: ProductUpcomingBillingProps = defaultOneTimeProductUpcomingBillingProps
) => {
    return render(<ProductUpcomingBilling {...oneTimeProductUpcomingBillingProps} />);
};

describe("<OneTimeProductUpcomingBilling />", () => {
    it("should render upcoming billing product details", () => {
        const wrapper = renderOneTimeProductBilledAtOrder();

        expect(wrapper.getByTestId("UpcomingBillingProduct__root")).toBeInTheDocument();
        expect(wrapper.getByTestId("UpcomingBillingProduct__name")).toBeInTheDocument();
        expect(wrapper.getByTestId("UpcomingBillingProduct__price")).toBeInTheDocument();
        expect(wrapper.getByTestId("UpcomingBillingProduct__billingDate")).toBeInTheDocument();
    });

    it("should display product details and discount", () => {
        const wrapper = renderOneTimeProductBilledAtOrder();

        const finalPrice =
            defaultUpcomingBillingProduct.productPrice -
            defaultUpcomingBillingProduct.discountPrice;

        const formattedFinalPrice = getFormattedItemPrice(currentCurrency, false, finalPrice);

        expect(wrapper.getByTestId("UpcomingBillingProduct__name")).toBeInTheDocument();
        expect(wrapper.getByTestId("UpcomingBillingProduct__price")).toBeInTheDocument();
        expect(wrapper.getByTestId("UpcomingBillingProduct__discount")).toBeInTheDocument();
        expect(wrapper.getByTestId("UpcomingBillingProduct__billingDate")).toBeInTheDocument();
        expect(wrapper.getByText(defaultUpcomingBillingProduct.productName)).toBeInTheDocument();
        expect(wrapper.getByText(formattedFinalPrice)).toBeInTheDocument();
    });

    it("should not display discount when there is no discount", () => {
        const wrapper = renderOneTimeProductBilledAtOrder({
            upcomingBillingProduct: {
                ...defaultUpcomingBillingProduct,
                discountName: undefined,
                discountPrice: 0,
            },
        });

        const formattedFinalPrice = getFormattedItemPrice(
            currentCurrency,
            false,
            defaultUpcomingBillingProduct.productPrice
        );

        expect(wrapper.getByTestId("UpcomingBillingProduct__name")).toBeInTheDocument();
        expect(wrapper.getByTestId("UpcomingBillingProduct__price")).toBeInTheDocument();
        expect(wrapper.queryByTestId("UpcomingBillingProduct__discount")).not.toBeInTheDocument();
        expect(wrapper.getByTestId("UpcomingBillingProduct__billingDate")).toBeInTheDocument();
        expect(wrapper.getByText(defaultUpcomingBillingProduct.productName)).toBeInTheDocument();
        expect(wrapper.getByText(formattedFinalPrice)).toBeInTheDocument();
    });
});
