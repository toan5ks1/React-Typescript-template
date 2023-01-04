import {
    createPackageOneTimeCourseItemsList,
    createPackageScheduleBasedCourseItemsList,
    createPackageSlotBasedCourseItemsList,
} from "src/squads/payment/test-utils/mocks/courses";

import ProductListCell, {
    ProductListCellProps,
} from "src/squads/payment/domains/OrderManagement/plugins/order-details/components/ProductListCell";

import { CourseItem } from "manabuf/payment/v1/order_pb";

import { render, screen } from "@testing-library/react";
import TestApp from "src/squads/payment/test-utils/TestApp";

const defaultProductName = "Product 1";
const defaultDiscountName = "Discount 1";
const defaultCourseItemsList: CourseItem.AsObject[] = createPackageSlotBasedCourseItemsList();
const oneTimeCourseItemsList: CourseItem.AsObject[] = createPackageOneTimeCourseItemsList();
const scheduleBasedCourseItemsList: CourseItem.AsObject[] =
    createPackageScheduleBasedCourseItemsList();

const defaultProps: ProductListCellProps = {
    productName: defaultProductName,
    discountName: defaultDiscountName,
};
const mockStartDate = {
    seconds: 1663379713,
    nanos: 0,
};
const renderProductListCell = (ProductListCellProps: ProductListCellProps = defaultProps) => {
    return render(
        <TestApp>
            <ProductListCell {...ProductListCellProps} />
        </TestApp>
    );
};

describe("<ProductListCell />", () => {
    it("should render UI Product list with product name, discount information", () => {
        renderProductListCell();

        expect(screen.getByTestId("ProductListCell__productName")).toHaveTextContent(
            defaultProductName
        );
        expect(screen.getByTestId("ProductListCell__discountRow")).toHaveTextContent(
            defaultDiscountName
        );
    });

    it("should render UI Product list with product name, without discount information", () => {
        const props: ProductListCellProps = {
            ...defaultProps,
            discountName: "",
        };
        renderProductListCell(props);

        expect(screen.getByTestId("ProductListCell__productName")).toHaveTextContent(
            defaultProductName
        );
        expect(screen.getByTestId("ProductListCell__discountRow")).toHaveTextContent("--");
    });

    it("Should show product cell with start date when start date is available", () => {
        const props: ProductListCellProps = {
            ...defaultProps,
            startDate: mockStartDate,
        };
        renderProductListCell(props);

        expect(screen.getByTestId("ProductListCell__startDateRow")).toBeInTheDocument();
        expect(screen.getByTestId("ProductListCell__startDateRow")).toHaveTextContent("2022/09/17");
    });

    it("Should show product cell without start date when start date is unavailable", () => {
        renderProductListCell();

        expect(screen.queryByTestId("ProductListCell__startDateRow")).not.toBeInTheDocument();
    });

    it("should render UI package slot based product list include course list and number of slot", () => {
        const props: ProductListCellProps = {
            ...defaultProps,
            discountName: "",
            courseItemsList: defaultCourseItemsList,
        };
        renderProductListCell(props);

        screen.getAllByTestId("ProductListCell__listItem").forEach((item, index) => {
            expect(item).toHaveTextContent(
                `${defaultCourseItemsList[index].courseName} (${defaultCourseItemsList[index].slot.value})`
            );
        });
    });

    it("Should render UI package one time product list include course list", () => {
        const props: ProductListCellProps = {
            ...defaultProps,
            discountName: "",
            courseItemsList: oneTimeCourseItemsList,
        };
        renderProductListCell(props);

        screen.getAllByTestId("ProductListCell__listItem").forEach((item, index) => {
            expect(item).toHaveTextContent(`${oneTimeCourseItemsList[index].courseName}`);
        });
    });

    it("Should render UI frequency package product cell including course list with slot and label", () => {
        const props: ProductListCellProps = {
            ...defaultProps,
            typeOfSlot: "slot-per-week",
            courseItemsList: defaultCourseItemsList,
        };
        renderProductListCell(props);

        screen.getAllByTestId("ProductListCell__listItem").forEach((item, index) => {
            expect(item).toHaveTextContent(`${defaultCourseItemsList[index].courseName}`);
            expect(item).toHaveTextContent(`(${defaultCourseItemsList[index].slot.value}/wk)`);
        });
    });

    it("Should render schedule based package product cell including course list without slot label", () => {
        const props: ProductListCellProps = {
            ...defaultProps,
            courseItemsList: scheduleBasedCourseItemsList,
        };
        renderProductListCell(props);

        screen.getAllByTestId("ProductListCell__listItem").forEach((item, index) => {
            expect(item).toHaveTextContent(`${scheduleBasedCourseItemsList[index].courseName}`);
            expect(item).not.toHaveTextContent(
                `(${scheduleBasedCourseItemsList[index].weight.value})`
            );
            expect(item).not.toHaveTextContent(
                `(${scheduleBasedCourseItemsList[index].weight.value}/wk)`
            );
        });
    });

    it("Should render UI recurring material product list cell", () => {
        const props: ProductListCellProps = {
            ...defaultProps,
            startDate: mockStartDate,
        };
        renderProductListCell(props);

        expect(screen.getByTestId("ProductListCell__productName")).toHaveTextContent(
            defaultProductName
        );
        expect(screen.getByTestId("ProductListCell__discountRow")).toHaveTextContent(
            defaultDiscountName
        );

        expect(screen.getByTestId("ProductListCell__startDateRow")).toBeInTheDocument();
        expect(screen.getByTestId("ProductListCell__startDateRow")).toHaveTextContent("2022/09/17");
    });
});
