import OneTimeAndSlotBasedBillItemDescriptionCell, {
    OneTimeAndSlotBasedBillItemDescriptionCellProps,
} from "src/squads/payment/domains/OrderManagement/plugins/student-billing/components/OneTimeAndSlotBasedBillItemDescriptionCell";

import { CourseItem } from "manabuf/payment/v1/order_pb";

import { render, RenderResult } from "@testing-library/react";
import TestApp from "src/squads/payment/test-utils/TestApp";

describe("<OneTimeAndSlotBasedBillItemDescriptionCell />", () => {
    const defaultProductName = "Product 1";
    const defaultCourseItemsList: CourseItem.AsObject[] = [
        {
            courseId: "Course_1",
            courseName: "English",
            slot: {
                value: 3,
            },
        },
        {
            courseId: "Course2",
            courseName: "Math",
            slot: {
                value: 2,
            },
        },
    ];

    const defaultProps: OneTimeAndSlotBasedBillItemDescriptionCellProps = {
        productName: defaultProductName,
        courseItemsList: defaultCourseItemsList,
    };

    it("should render UI with one time product, course items information", () => {
        const wrapper: RenderResult = render(
            <TestApp>
                <OneTimeAndSlotBasedBillItemDescriptionCell {...defaultProps} />
            </TestApp>
        );

        expect(
            wrapper.getByTestId("OnetimeAndSlotBasedBillItemDescriptionCell__productName")
        ).toHaveTextContent(defaultProductName);
        wrapper
            .getAllByTestId("OnetimeAndSlotBasedBillItemDescriptionCell__listItem")
            .forEach((item, index) => {
                expect(item).toHaveTextContent(
                    `${defaultCourseItemsList[index].courseName} (${defaultCourseItemsList[index].slot.value})`
                );
            });
    });

    it("should render UI with one time product without discount information", () => {
        const props: OneTimeAndSlotBasedBillItemDescriptionCellProps = {
            ...defaultProps,
            courseItemsList: [],
        };

        const wrapper: RenderResult = render(
            <TestApp>
                <OneTimeAndSlotBasedBillItemDescriptionCell {...props} />
            </TestApp>
        );

        expect(
            wrapper.getByTestId("OnetimeAndSlotBasedBillItemDescriptionCell__productName")
        ).toHaveTextContent(defaultProductName);
        wrapper
            .queryAllByTestId("OnetimeAndSlotBasedBillItemDescriptionCell__listItem")
            .forEach((item) => {
                expect(item).not.toBeInTheDocument();
            });
    });
});
