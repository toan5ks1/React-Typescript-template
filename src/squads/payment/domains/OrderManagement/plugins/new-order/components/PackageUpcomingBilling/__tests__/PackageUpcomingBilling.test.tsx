import { getCurrentCurrency, getFormattedItemPrice } from "src/squads/payment/helpers/price";
import { createFrequencyBasedPackageCourses } from "src/squads/payment/test-utils/mocks/package-course";
import { createMockUpcomingBillingFrequencyPackageProductsList } from "src/squads/payment/test-utils/mocks/products";
import { getFormattedDate } from "src/squads/payment/utils/date";

import PackageUpcomingBilling, {
    PackageUpcomingBillingProps,
} from "src/squads/payment/domains/OrderManagement/plugins/new-order/components/PackageUpcomingBilling";

import { render, screen } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import useBillingItemName from "src/squads/payment/domains/OrderManagement/hooks/useBillingItemName";
import TestApp from "src/squads/payment/test-utils/TestApp";

const defaultPackageUpcomingBilling = createMockUpcomingBillingFrequencyPackageProductsList()[2];
const mockPackageCourses = createFrequencyBasedPackageCourses();
const { currentCurrency } = getCurrentCurrency();

const defaultPackageBilledAtOrderProps: PackageUpcomingBillingProps = {
    upcomingBillingItem: { ...defaultPackageUpcomingBilling, packageCourses: mockPackageCourses },
};

const renderPackageUpcomingBilling = (
    PackageUpcomingBillingProps: PackageUpcomingBillingProps = defaultPackageBilledAtOrderProps
) => {
    return render(
        <TestApp>
            <PackageUpcomingBilling {...PackageUpcomingBillingProps} />
        </TestApp>
    );
};

describe("<PackageUpcomingBilling />", () => {
    it("should render Upcoming Billing product details with courses", () => {
        const billingSchedulePeriodName = "Period Name 1";
        const billingRatioNumerator = 1;
        const billingRatioDenominator = 4;
        const newProps = {
            upcomingBillingItem: {
                ...defaultPackageUpcomingBilling,
                billingSchedulePeriodName,
                billingRatioNumerator,
                billingRatioDenominator,
            },
        };

        renderPackageUpcomingBilling({ ...newProps });

        const { billingDate, discountPrice, productName, productPrice } =
            newProps.upcomingBillingItem;
        const wrapper = ({ children }: { children: string }) => <TestApp>{children}</TestApp>;

        const { result } = renderHook(
            () =>
                useBillingItemName({
                    productName: productName,
                    billingSchedulePeriodName,
                    billingRatioNumerator,
                    billingRatioDenominator,
                }),
            { wrapper }
        );

        const itemName = result.current;
        const formattedItemPrice = getFormattedItemPrice(
            currentCurrency,
            false,
            productPrice - discountPrice
        );
        const formattedBillingDate = getFormattedDate(billingDate);

        expect(screen.getByTestId("UpcomingBillingProduct__name")).toHaveTextContent(itemName);

        expect(screen.getByTestId("UpcomingBillingProduct__price")).toHaveTextContent(
            formattedItemPrice
        );

        expect(screen.getByTestId("UpcomingBillingProduct__billingDate")).toHaveTextContent(
            formattedBillingDate
        );
    });

    it("should show discount when product has discount", () => {
        const discountName = "Discount 10";
        const discountPrice = 10;
        renderPackageUpcomingBilling({
            upcomingBillingItem: {
                ...defaultPackageUpcomingBilling,
                discountName,
                discountPrice,
            },
        });
        expect(screen.getByTestId("UpcomingBillingProduct__discount")).toHaveTextContent(
            discountName
        );
    });

    it("should not show discount when product has no discount", () => {
        const discountPrice = 10;
        renderPackageUpcomingBilling({
            upcomingBillingItem: {
                ...defaultPackageUpcomingBilling,
                discountName: undefined,
                discountPrice,
            },
        });

        expect(screen.queryByTestId("UpcomingBillingProduct__discount")).not.toBeInTheDocument();
    });
});
