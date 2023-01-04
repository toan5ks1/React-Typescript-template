import { getCurrentCurrency } from "src/squads/payment/helpers/price";
import { checkErrorMessage } from "src/squads/payment/test-utils/utils";

import {
    defaultNotImplementedYetPlugins,
    updateOrderNotImplementedYetPlugins,
} from "src/squads/payment/domains/OrderManagement/plugins/common/components/NotImplementedYetPlugins";

import { OrderType } from "manabuf/payment/v1/enums_pb";

import TableAddDeleteRowTest from "./TableAddDeleteRowTestComponent";

import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MuiPickersUtilsProvider from "src/squads/payment/contexts/MuiPickersUtilsProvider";
import ProductExtensionPluginsProvider from "src/squads/payment/domains/OrderManagement/plugins/new-order";
import {
    OrderPluginFunctions,
    UpdateOrderPluginFunctions,
} from "src/squads/payment/domains/OrderManagement/plugins/new-order/types";
import TestApp from "src/squads/payment/test-utils/TestApp";
import TestQueryWrapper from "src/squads/payment/test-utils/TestQueryWrapper";
import TestThemeProvider from "src/squads/payment/test-utils/TestThemeProvider";

const mockSubmitFunction = jest.fn();
const mockShowSnackbar = jest.fn();
jest.mock("src/squads/payment/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: () => mockShowSnackbar,
}));
jest.mock(
    "src/squads/payment/components/Sections/ProductListSection/hooks/useProductComponent",
    () => ({
        __esModule: true,
        default: () => ({
            renderProductComponent: jest.fn(),
        }),
    })
);
jest.mock(
    "src/squads/payment/components/Sections/ProductListSection/hooks/useProductActions",
    () => ({
        __esModule: true,
        default: () => ({
            getProductActions: jest.fn(),
        }),
    })
);
const { currentCurrency: currency } = getCurrentCurrency();

const renderComponent = (
    orderType: OrderType = OrderType.ORDER_TYPE_NEW,
    hasDefaultValues: boolean = false,
    notImplementedYetPlugins:
        | OrderPluginFunctions
        | UpdateOrderPluginFunctions = defaultNotImplementedYetPlugins
) => {
    return render(
        <TestApp>
            <TestThemeProvider>
                <MuiPickersUtilsProvider>
                    <TestQueryWrapper>
                        <ProductExtensionPluginsProvider
                            currency={currency}
                            orderType={orderType}
                            notImplementedYetPlugins={notImplementedYetPlugins}
                        >
                            <TableAddDeleteRowTest
                                mockSubmit={mockSubmitFunction}
                                hasDefaultValues={hasDefaultValues}
                            />
                        </ProductExtensionPluginsProvider>
                    </TestQueryWrapper>
                </MuiPickersUtilsProvider>
            </TestThemeProvider>
        </TestApp>
    );
};

describe("<AddDeleteRowList /> add and delete functions", () => {
    it("should render correct UI without data", () => {
        const { getByText, getByTestId } = renderComponent();

        expect(getByTestId("TableAddDeleteRow__title")).toBeInTheDocument();
        expect(getByTestId("TableAddDeleteRow__addButton")).toBeInTheDocument();
        expect(getByTestId("TableBase__header")).toBeInTheDocument();
        expect(getByText("No Information")).toBeInTheDocument();
    });

    it("should add a row when buttonAdd is clicked", () => {
        const { getAllByTestId, getByTestId } = renderComponent();
        const buttonAdd = getByTestId("TableAddDeleteRow__addButton");

        userEvent.click(buttonAdd);

        expect(getAllByTestId("TableBase__row")).toHaveLength(1);
        expect(getAllByTestId("MenuItemPanel__trigger")).toHaveLength(1);

        userEvent.click(buttonAdd);

        expect(getAllByTestId("TableBase__row")).toHaveLength(2);
        expect(getAllByTestId("MenuItemPanel__trigger")).toHaveLength(2);
    });

    it("should delete a row when buttonDelete is clicked", () => {
        const { getAllByTestId, getByTestId, getByText } = renderComponent();
        const buttonAdd = getByTestId("TableAddDeleteRow__addButton");

        userEvent.click(buttonAdd);
        userEvent.click(buttonAdd);

        const actionPanelButton = getAllByTestId("MenuItemPanel__trigger");

        expect(getAllByTestId("TableBase__row")).toHaveLength(2);
        expect(actionPanelButton).toHaveLength(2);

        userEvent.click(actionPanelButton[0]);
        userEvent.click(getByText("Delete"));

        expect(getAllByTestId("TableBase__row")).toHaveLength(1);
    });

    it("should hide add button when orderType is ORDER_TYPE_UPDATE", () => {
        const wrapper = renderComponent(
            OrderType.ORDER_TYPE_UPDATE,
            true,
            updateOrderNotImplementedYetPlugins
        );

        expect(wrapper.queryByTestId("TableAddDeleteRow__addButton")).not.toBeInTheDocument();
    });

    it("should cancel a row when buttonCancel is clicked", () => {
        const wrapper = renderComponent(OrderType.ORDER_TYPE_UPDATE, true);

        const actionPanelButton = wrapper.getByTestId("MenuItemPanel__trigger");

        userEvent.click(actionPanelButton);
        userEvent.click(wrapper.getByText("Cancel"));

        expect(wrapper.getByText("[Cancelled]")).toBeInTheDocument();
    });

    it("should restore canclled row when buttonResore is clicked", () => {
        const wrapper = renderComponent(
            OrderType.ORDER_TYPE_UPDATE,
            true,
            updateOrderNotImplementedYetPlugins
        );

        const actionPanelButton = wrapper.getByTestId("MenuItemPanel__trigger");

        userEvent.click(actionPanelButton);
        userEvent.click(wrapper.getByText("Cancel"));

        expect(wrapper.getByText("[Cancelled]")).toBeInTheDocument();

        userEvent.click(actionPanelButton);
        userEvent.click(wrapper.getByText("Restore"));

        expect(wrapper.queryByText("[Cancelled]")).not.toBeInTheDocument();
    });
});

describe("<AddDeleteRowList /> handle submit, form error, and input field", () => {
    it("should be able to type on input field", () => {
        const { getByTestId } = renderComponent();
        const buttonAdd = getByTestId("TableAddDeleteRow__addButton");

        userEvent.click(buttonAdd);

        const inputField = getByTestId("TextFieldHF__input");

        userEvent.type(inputField, "Sample Input");

        expect(inputField).toHaveValue("Sample Input");
    });

    it("should be able to get values on submit", async () => {
        const { getByTestId, getAllByTestId } = renderComponent();
        const buttonAdd = getByTestId("TableAddDeleteRow__addButton");
        const submitButton = getByTestId("TableAddDeleteRow__submitButton");

        userEvent.click(buttonAdd);
        userEvent.click(buttonAdd);

        const inputField = getAllByTestId("TextFieldHF__input");
        const commentField = getByTestId("CommentSection__commentInput");

        userEvent.type(inputField[0], "Sample Input 1");
        userEvent.type(inputField[1], "Sample Input 2");
        userEvent.type(commentField, "Sample Comment");

        userEvent.click(submitButton);

        await waitFor(() => {
            expect(mockShowSnackbar).toBeCalledWith("Form submitted successfully!");
        });

        expect(mockSubmitFunction).toBeCalledWith({
            comment: "Sample Comment",
            productList: [
                { name: "productList", value: "Sample Input 1" },
                { name: "productList", value: "Sample Input 2" },
            ],
        });
    });

    it("should show error on submit", async () => {
        const { getByTestId } = renderComponent();
        const buttonAdd = getByTestId("TableAddDeleteRow__addButton");
        const submitButton = getByTestId("TableAddDeleteRow__submitButton");

        userEvent.click(buttonAdd);

        const inputField = getByTestId("TextFieldHF__input");

        expect(inputField).toBeInTheDocument();

        userEvent.click(submitButton);

        await checkErrorMessage(1, "Required fields cannot be blank!");

        userEvent.type(inputField, "Sample Input");

        await checkErrorMessage(0, "Required fields cannot be blank!");
    });
});
