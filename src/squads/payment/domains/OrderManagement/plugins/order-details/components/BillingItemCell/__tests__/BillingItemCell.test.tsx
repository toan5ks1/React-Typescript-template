import {
    createPackageOneTimeCourseItemsList,
    createPackageScheduleBasedCourseItemsList,
    createPackageSlotBasedCourseItemsList,
} from "src/squads/payment/test-utils/mocks/courses";

import BillingItemCell, {
    BillingItemCellProps,
} from "src/squads/payment/domains/OrderManagement/plugins/order-details/components/BillingItemCell";

import { CourseItem } from "manabuf/payment/v1/order_pb";

import { render, screen } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import useBillingItemName from "src/squads/payment/domains/OrderManagement/hooks/useBillingItemName";
import TestApp from "src/squads/payment/test-utils/TestApp";

const defaultProductName = "Product 1";
const defaultCourseItemsList: CourseItem.AsObject[] = createPackageSlotBasedCourseItemsList();
const oneTimePackageCourseItemsList: CourseItem.AsObject[] = createPackageOneTimeCourseItemsList();
const scheduleBasedCourseItemsList: CourseItem.AsObject[] =
    createPackageScheduleBasedCourseItemsList();
const defaultProps: BillingItemCellProps = {
    productName: defaultProductName,
};

const mockRecurringDetail = {
    billingPeriodName: "Period 1",
    billingRatioNumerator: 1,
    billingRatioDenominator: 4,
};

const renderBillingItemCell = (BillingItemCellProps: BillingItemCellProps = defaultProps) => {
    return render(
        <TestApp>
            <BillingItemCell {...BillingItemCellProps} />
        </TestApp>
    );
};
describe("<BillingItemCell />", () => {
    it("should render UI billing item list with productName", () => {
        renderBillingItemCell();

        expect(screen.getByTestId("BillingItemCell__productName")).toHaveTextContent(
            defaultProductName
        );
    });

    it("should render UI package slot based billing item list include course list and number of slot", () => {
        const props: BillingItemCellProps = {
            ...defaultProps,
            discountName: "",
            courseItemsList: defaultCourseItemsList,
        };
        renderBillingItemCell(props);

        screen.getAllByTestId("BillingListCell__listItem").forEach((item, index) => {
            expect(item).toHaveTextContent(
                `${defaultCourseItemsList[index].courseName} (${defaultCourseItemsList[index].slot.value})`
            );
        });
    });

    it("should render UI package one time billing item list include course list", () => {
        const props: BillingItemCellProps = {
            ...defaultProps,
            discountName: "",
            courseItemsList: oneTimePackageCourseItemsList,
        };
        renderBillingItemCell(props);

        screen.getAllByTestId("BillingListCell__listItem").forEach((item, index) => {
            expect(item).toHaveTextContent(`${oneTimePackageCourseItemsList[index].courseName}`);
        });
    });

    it("should render frequency package billing item cell including course list with slot and label", () => {
        const props: BillingItemCellProps = {
            ...defaultProps,
            typeOfSlot: "slot-per-week",
            courseItemsList: defaultCourseItemsList,
        };
        renderBillingItemCell(props);

        screen.getAllByTestId("BillingListCell__listItem").forEach((item, index) => {
            expect(item).toHaveTextContent(`${defaultCourseItemsList[index].courseName}`);
            expect(item).toHaveTextContent(`(${defaultCourseItemsList[index].slot.value}/wk)`);
        });
    });

    it("should render schedule based package billing item cell including course list without slot label", () => {
        const props: BillingItemCellProps = {
            ...defaultProps,
            courseItemsList: scheduleBasedCourseItemsList,
        };
        renderBillingItemCell(props);

        screen.getAllByTestId("BillingListCell__listItem").forEach((item, index) => {
            expect(item).toHaveTextContent(`${scheduleBasedCourseItemsList[index].courseName}`);
            expect(item).not.toHaveTextContent(
                `(${scheduleBasedCourseItemsList[index].weight.value})`
            );
            expect(item).not.toHaveTextContent(
                `(${scheduleBasedCourseItemsList[index].weight.value}/wk)`
            );
        });
    });

    it("Should render UI recurring material billing item cell", () => {
        const { billingPeriodName, billingRatioDenominator, billingRatioNumerator } =
            mockRecurringDetail;
        const wrapper = ({ children }: { children: string }) => <TestApp>{children}</TestApp>;

        const { result } = renderHook(
            () =>
                useBillingItemName({
                    productName: defaultProductName,
                    billingSchedulePeriodName: billingPeriodName,
                    billingRatioNumerator: billingRatioNumerator,
                    billingRatioDenominator: billingRatioDenominator,
                }),
            { wrapper }
        );

        const mockProductName = result.current;

        const props: BillingItemCellProps = {
            ...defaultProps,
            productName: mockProductName,
        };

        renderBillingItemCell(props);

        const productNameComponent = screen.getByTestId("BillingItemCell__productName");
        expect(productNameComponent).toHaveTextContent(
            `${defaultProductName} - ${billingPeriodName} (billing ratio: ${billingRatioNumerator}/${billingRatioDenominator})`
        );
    });
});
