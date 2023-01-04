import { MutableRefObject } from "react";

import { UseFormProps } from "react-hook-form";
import { getCurrentCurrency } from "src/squads/payment/helpers/price";
import { createMockOrderFormValues } from "src/squads/payment/test-utils/mocks/order-form";
import { createMockProductChoices } from "src/squads/payment/test-utils/mocks/products";
import {
    changeAutocompleteInput,
    getAutocompleteInputByTestId,
} from "src/squads/payment/test-utils/utils";
import { OrderFormValues } from "src/squads/payment/types/form/order-form-types";

import { ProductListSectionRefs } from "src/squads/payment/components/Sections/ProductListSection";
import OrderForm, {
    OrderFormProps,
} from "src/squads/payment/domains/OrderManagement/components/OrderForm";
import { defaultNotImplementedYetPlugins } from "src/squads/payment/domains/OrderManagement/plugins/common/components/NotImplementedYetPlugins";

import { OrderType } from "manabuf/payment/v1/enums_pb";

import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MuiPickersUtilsProvider from "src/squads/payment/contexts/MuiPickersUtilsProvider";
import ProductExtensionPluginsProvider from "src/squads/payment/domains/OrderManagement/plugins/new-order";
import TestApp from "src/squads/payment/test-utils/TestApp";
import TestHookFormProvider from "src/squads/payment/test-utils/TestHookFormProvider";
import TestQueryWrapper from "src/squads/payment/test-utils/TestQueryWrapper";
import TestThemeProvider from "src/squads/payment/test-utils/TestThemeProvider";

const mockProductChoices = createMockOrderFormValues();
const mockProduct = createMockProductChoices()[0];
const { currentCurrency: currency } = getCurrentCurrency();

jest.mock(
    "src/squads/payment/components/Autocompletes/LocationsLowestLevelAutocompleteHF/useLowestLevelLocations"
);

jest.mock(
    "src/squads/payment/domains/OrderManagement/hooks/useProductIdsByGradeAndLocation",
    () => {
        return {
            __esModule: true,
            default: () => ({
                productIds: ["product_id_1", "product_id_2"],
            }),
        };
    }
);

jest.mock("src/squads/payment/domains/OrderManagement/hooks/useProductExtension");
jest.mock("src/squads/payment/domains/OrderManagement/hooks/useTaxDetail");
jest.mock("src/squads/payment/domains/OrderManagement/hooks/useProductPriceDetail");
jest.mock("src/squads/payment/domains/OrderManagement/hooks/useBillingSchedulePeriods");

const defaultOrderFormProductOption: UseFormProps<OrderFormValues> = {
    defaultValues: { ...mockProductChoices },
};

const productListSectionRef: MutableRefObject<ProductListSectionRefs | undefined> = {
    current: {
        replace: jest.fn(),
    },
};

const defaultOrderFormProps: OrderFormProps = {
    onLocationChange: jest.fn(),
    productListSectionRef: productListSectionRef,
    studentIndex: 0,
};

const renderOrderForm = (
    orderFormProps: OrderFormProps = defaultOrderFormProps,
    useFormOptions: UseFormProps<OrderFormValues> = defaultOrderFormProductOption
) => {
    return render(
        <TestApp>
            <TestQueryWrapper>
                <MuiPickersUtilsProvider>
                    <TestThemeProvider>
                        <ProductExtensionPluginsProvider
                            currency={currency}
                            orderType={OrderType.ORDER_TYPE_NEW}
                            notImplementedYetPlugins={defaultNotImplementedYetPlugins}
                        >
                            <TestHookFormProvider<OrderFormValues> useFormOptions={useFormOptions}>
                                <OrderForm {...orderFormProps} />
                            </TestHookFormProvider>
                        </ProductExtensionPluginsProvider>
                    </TestThemeProvider>
                </MuiPickersUtilsProvider>
            </TestQueryWrapper>
        </TestApp>
    );
};
describe("<OrderForm/>", () => {
    it("should render order form components", () => {
        const wrapper = renderOrderForm();

        expect(wrapper.getByTestId("OrderForm__container")).toBeInTheDocument();
        expect(
            wrapper.getByTestId("LocationsLowestLevelAutocompleteHF__autocomplete")
        ).toBeInTheDocument();
        expect(wrapper.getByTestId("StudentInfoSection__studentNameContainer")).toBeInTheDocument();
        expect(wrapper.getByTestId("TableAddDeleteRow__title")).toBeInTheDocument();
        expect(wrapper.getByTestId("TableAddDeleteRow__addButton")).toBeInTheDocument();
        expect(wrapper.getByTestId("CommentSection__commentInput")).toBeInTheDocument();
    });

    it("should add product array field item when add button is clicked", () => {
        const wrapper = renderOrderForm();

        const buttonAdd = wrapper.getByTestId("TableAddDeleteRow__addButton");
        const firstStudentIndex = 0;
        expect(wrapper.getAllByTestId("ProductAutocompleteWithIdsHF__autocomplete")).toHaveLength(
            mockProductChoices.students[firstStudentIndex].productFieldArrayItems.length
        );

        userEvent.click(buttonAdd);

        expect(wrapper.getAllByTestId("ProductAutocompleteWithIdsHF__autocomplete")).toHaveLength(
            mockProductChoices.students[firstStudentIndex].productFieldArrayItems.length + 1
        );
    });

    it("should remove array field item when user clicks delete", () => {
        const wrapper = renderOrderForm(defaultOrderFormProps, {
            defaultValues: createMockOrderFormValues([
                {
                    product: mockProduct,
                },
            ]),
        });

        const productItemOptionButton = wrapper.getByTestId("MenuItemPanel__trigger");
        userEvent.click(productItemOptionButton);

        const deleteItemButton = wrapper.getByText("Delete");
        userEvent.click(deleteItemButton);

        expect(
            wrapper.queryByTestId("ProductAutocompleteWithIdsHF__autocomplete")
        ).not.toBeInTheDocument();
    });

    it("should change location when location field is updated", () => {
        renderOrderForm();

        getAutocompleteInputByTestId("LocationsLowestLevelAutocompleteHF__autocomplete");

        changeAutocompleteInput("LocationsLowestLevelAutocompleteHF__autocomplete", "HN", 1);

        expect(defaultOrderFormProps.onLocationChange).toBeCalled();
    });
});
