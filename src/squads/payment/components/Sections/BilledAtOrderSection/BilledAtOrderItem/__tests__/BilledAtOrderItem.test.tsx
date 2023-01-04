import { getCurrentCurrency } from "src/squads/payment/helpers/price";

import BilledAtOrderItem, {
    BilledAtOrderItemProps,
} from "src/squads/payment/components/Sections/BilledAtOrderSection/BilledAtOrderItem";

import { render, within } from "@testing-library/react";

const { currentCurrency, currentCurrencySymbol } = getCurrentCurrency();

const defaultBilledAtOrderItemProps: BilledAtOrderItemProps = {
    itemName: "product name",
    itemPrice: 100,
    currency: currentCurrency,
};

const renderBilledAtOrderItem = (
    billedAtOrderProps: BilledAtOrderItemProps = defaultBilledAtOrderItemProps
) => {
    return render(<BilledAtOrderItem {...billedAtOrderProps} />);
};

describe("<BilledAtOrderItem />", () => {
    it("should render billed at order details", () => {
        const wrapper = renderBilledAtOrderItem();

        expect(wrapper.getByTestId("BilledAtOrderItem__container")).toBeInTheDocument();

        const itemNameElement = wrapper.getByTestId("BilledAtOrderItem__name");
        expect(
            within(itemNameElement).getByText(defaultBilledAtOrderItemProps.itemName)
        ).toBeInTheDocument();

        const itemPriceElement = wrapper.getByTestId("BilledAtOrderItem__price");
        expect(
            within(itemPriceElement).getByText(
                `${currentCurrencySymbol}${defaultBilledAtOrderItemProps.itemPrice}`
            )
        ).toBeInTheDocument();
    });

    it("should render textSecondary color on caption variant", () => {
        const captionTypographyClasses = "MuiTypography-caption";
        const wrapper = renderBilledAtOrderItem({
            ...defaultBilledAtOrderItemProps,
            variant: "caption",
        });

        expect(wrapper.getByTestId("BilledAtOrderItem__name")).toHaveClass(
            captionTypographyClasses
        );
        expect(wrapper.getByTestId("BilledAtOrderItem__price")).toHaveClass(
            captionTypographyClasses
        );
    });

    it("should render discount with negative sign", () => {
        const billedAtOrderProps: BilledAtOrderItemProps = {
            ...defaultBilledAtOrderItemProps,
            variant: "caption",
            isDiscount: true,
        };

        const wrapper = renderBilledAtOrderItem(billedAtOrderProps);

        expect(
            wrapper.getByText(`-${currentCurrencySymbol}${billedAtOrderProps.itemPrice}`)
        ).toBeInTheDocument();
    });
});
