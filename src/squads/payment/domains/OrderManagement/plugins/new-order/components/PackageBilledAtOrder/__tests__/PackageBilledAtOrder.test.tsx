import { getCurrentCurrency, getFormattedItemPrice } from "src/squads/payment/helpers/price";
import { createPackageCourses } from "src/squads/payment/test-utils/mocks/package-course";
import { createMockBilledAtOrderProductsList } from "src/squads/payment/test-utils/mocks/products";

import { BilledAtOrderPackageProduct } from "src/squads/payment/components/Sections/BilledAtOrderSection/types";
import PackageBilledAtOrder, {
    PackageBilledAtOrderProps,
} from "src/squads/payment/domains/OrderManagement/plugins/new-order/components/PackageBilledAtOrder/PackageBilledAtOrder";

import { render, within } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import useBillingItemName from "src/squads/payment/domains/OrderManagement/hooks/useBillingItemName";

const defaultPackageBilledAtOrder = createMockBilledAtOrderProductsList()[1];
const mockPackageCourses = createPackageCourses();
const { currentCurrency } = getCurrentCurrency();

const defaultPackageBilledAtOrderProps: PackageBilledAtOrderProps = {
    billedAtOrderItem: { ...defaultPackageBilledAtOrder, packageCourses: mockPackageCourses },
};

const renderPackageBilledAtOrder = (
    packageBilledAtOrderProps: PackageBilledAtOrderProps = defaultPackageBilledAtOrderProps
) => {
    return render(<PackageBilledAtOrder {...packageBilledAtOrderProps} />);
};

describe("<PackageBilledAtOrder />", () => {
    it("should render billed at order product details with courses", () => {
        const wrapper = renderPackageBilledAtOrder();

        const formattedItemPrice = getFormattedItemPrice(
            currentCurrency,
            false,
            defaultPackageBilledAtOrder.productPrice
        );

        const productContainer = wrapper.getByTestId("PackageBilledAtOrder__productContainer");
        expect(
            within(productContainer).getByText(defaultPackageBilledAtOrder.productName)
        ).toBeInTheDocument();
        expect(within(productContainer).getByText(formattedItemPrice)).toBeInTheDocument();
    });

    it("should show discount when product has discount", () => {
        const discountName = "Discount 10";
        const discountPrice = 10;
        const wrapper = renderPackageBilledAtOrder({
            billedAtOrderItem: {
                ...defaultPackageBilledAtOrder,
                discountName,
                discountPrice,
            },
        });

        const formattedDiscountPrice = getFormattedItemPrice(currentCurrency, true, discountPrice);

        const discountContainer = wrapper.getByTestId("PackageBilledAtOrder__discountContainer");
        expect(within(discountContainer).getByText(formattedDiscountPrice)).toBeInTheDocument();
    });

    it("should not show discount when product has no discount", () => {
        const discountPrice = 10;
        const wrapper = renderPackageBilledAtOrder({
            billedAtOrderItem: {
                ...defaultPackageBilledAtOrder,
                discountName: undefined,
                discountPrice,
            },
        });

        const formattedDiscountPrice = getFormattedItemPrice(currentCurrency, true, discountPrice);

        expect(wrapper.getByTestId("PackageBilledAtOrder__productContainer")).toBeInTheDocument();
        expect(
            wrapper.queryByTestId("PackageBilledAtOrder__discountContainer")
        ).not.toBeInTheDocument();
        expect(wrapper.queryByText(formattedDiscountPrice)).not.toBeInTheDocument();
    });

    it("should show courses list when product type is not PACKAGE_TYPE_NONE", () => {
        const wrapper = renderPackageBilledAtOrder();

        expect(wrapper.getByTestId("MenuItemLink__root")).toBeInTheDocument();
    });

    it("should render name of product included period and ratio at billed at order ", () => {
        const frequencyPackageBilledAtOrder: BilledAtOrderPackageProduct =
            createMockBilledAtOrderProductsList()[2];
        const {
            billingSchedulePeriodName,
            billingRatioNumerator,
            billingRatioDenominator,
            productName,
        } = frequencyPackageBilledAtOrder;
        const wrapper = renderPackageBilledAtOrder({
            billedAtOrderItem: {
                ...frequencyPackageBilledAtOrder,
                packageCourses: mockPackageCourses,
            },
        });
        const { result } = renderHook(() =>
            useBillingItemName({
                productName,
                billingSchedulePeriodName,
                billingRatioNumerator,
                billingRatioDenominator,
            })
        );

        const productContainer = wrapper.getByTestId("PackageBilledAtOrder__productContainer");

        expect(within(productContainer).getByText(result.current)).toBeInTheDocument();
    });
});
