import { formatDate } from "src/common/utils/time";
import { getOrderSequenceNumberPrefix } from "src/squads/payment/helpers/order-details";
import { getStudentName } from "src/squads/payment/helpers/student";
import { createMockLocation } from "src/squads/payment/test-utils/mocks/location";
import { createMockOrderData } from "src/squads/payment/test-utils/mocks/order";
import { createMockStudentInfo } from "src/squads/payment/test-utils/mocks/student";

import OrderDetailGeneralInfo, {
    OrderDetailGeneralInfoProps,
} from "src/squads/payment/domains/OrderManagement/components/OrderDetailGeneralInfo";

import { render } from "@testing-library/react";
import TestApp from "src/squads/payment/test-utils/TestApp";
import TestThemeProvider from "src/squads/payment/test-utils/TestThemeProvider";

const order = createMockOrderData();
const locations = createMockLocation();
const student = createMockStudentInfo();

const defaultOrderDetailGeneralInfoProps: OrderDetailGeneralInfoProps = {
    order: order,
    locations: locations,
    student: student,
};

const renderOrderDetailGeneralInfoComponent = (
    orderDetailGeneralInfoProps: OrderDetailGeneralInfoProps = defaultOrderDetailGeneralInfoProps
) => {
    return render(
        <TestApp>
            <TestThemeProvider>
                <OrderDetailGeneralInfo {...orderDetailGeneralInfoProps} />
            </TestThemeProvider>
        </TestApp>
    );
};

describe("<OrderDetailGeneralInfo />", () => {
    it("should render correctly UI", () => {
        const wrapper = renderOrderDetailGeneralInfoComponent();

        expect(wrapper.getByText("General Info")).toBeInTheDocument();
        expect(wrapper.getByText("Order No.")).toBeInTheDocument();
        expect(wrapper.getByText("Order Type")).toBeInTheDocument();
        expect(wrapper.getByText("Student Name")).toBeInTheDocument();
        expect(wrapper.getByText("Location")).toBeInTheDocument();
        expect(wrapper.getByText("Created Date")).toBeInTheDocument();
    });

    it("should render correctly UI without data", () => {
        const wrapper = renderOrderDetailGeneralInfoComponent({
            order: { ...order, order_type: undefined },
            locations: undefined,
            student: undefined,
        });

        expect(wrapper.getByTestId("OrderManagementGeneralInfo__orderTypeValue")).toHaveTextContent(
            ""
        );
        expect(
            wrapper.getByTestId("OrderManagementGeneralInfo__studentNameValue")
        ).toHaveTextContent("");
        expect(
            wrapper.getByTestId("OrderManagementGeneralInfo__locationNameValue")
        ).toHaveTextContent("");
    });

    it("should render UI with Order ID, Order Type, Student Name, Location, Created Date", () => {
        const wrapper = renderOrderDetailGeneralInfoComponent();

        expect(
            wrapper.getByTestId("OrderManagementGeneralInfo__orderNumberValue")
        ).toHaveTextContent(getOrderSequenceNumberPrefix(order.order_sequence_number));
        expect(wrapper.getByTestId("OrderManagementGeneralInfo__orderTypeValue")).toHaveTextContent(
            "New"
        );
        expect(
            wrapper.getByTestId("OrderManagementGeneralInfo__studentNameValue")
        ).toHaveTextContent(getStudentName(student.user));
        expect(
            wrapper.getByTestId("OrderManagementGeneralInfo__locationNameValue")
        ).toHaveTextContent(locations.name as string);
        expect(
            wrapper.getByTestId("OrderManagementGeneralInfo__createdDateValue")
        ).toHaveTextContent(formatDate(order.created_at, "yyyy/LL/dd"));
    });
});
