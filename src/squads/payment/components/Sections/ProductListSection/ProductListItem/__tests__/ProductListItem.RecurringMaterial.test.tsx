import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { getCurrentCurrency } from "src/squads/payment/helpers/price";
import { createMockRecurringMaterialList } from "src/squads/payment/test-utils/mocks/recurring-products";
import {
    getAutocompleteInputByTestId,
    selectDatePicker,
} from "src/squads/payment/test-utils/utils";
import { OrderFormValues } from "src/squads/payment/types/form/order-form-types";
import {
    ProductExtensionType,
    ProductTypeQuery,
} from "src/squads/payment/types/service/product-types";

import { MAutocompleteServiceHookReturn } from "src/components/Autocompletes/MAutocompleteService";
import TranslationProvider from "src/providers/TranslationProvider";
import ProductListItem from "src/squads/payment/components/Sections/ProductListSection/ProductListItem/ProductListItem";
import { defaultNotImplementedYetPlugins } from "src/squads/payment/domains/OrderManagement/plugins/common/components/NotImplementedYetPlugins";
import ProductExtensionPluginsProvider from "src/squads/payment/domains/OrderManagement/plugins/common/providers/ProductExtensionPluginsProvider";

import { OrderType } from "manabuf/payment/v1/enums_pb";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MuiPickersUtilsProvider from "src/squads/payment/contexts/MuiPickersUtilsProvider";
import { UseProductExtensionProps } from "src/squads/payment/domains/OrderManagement/hooks/useProductExtension";
import TestQueryWrapper from "src/squads/payment/test-utils/TestQueryWrapper";

const mockRecurringMaterialList = createMockRecurringMaterialList();
jest.mock("src/squads/payment/hooks/useShowSnackbar");
jest.mock("src/squads/payment/domains/OrderManagement/hooks/useBillingSchedulePeriods");
jest.mock("src/squads/payment/domains/OrderManagement/hooks/useProductPriceDetail");
jest.mock("src/squads/payment/domains/OrderManagement/hooks/useTaxDetail");
jest.mock("src/squads/payment/domains/OrderManagement/hooks/useProductExtension", () => {
    let isRendered = false;
    const useProductExtensionMock = ({ onSuccess, productId }: UseProductExtensionProps) => {
        const data: ProductExtensionType = {
            material_type: "MATERIAL_TYPE_RECURRING",
        };
        if (!isRendered && productId) {
            isRendered = true;
            onSuccess?.(data);
        }
    };
    return useProductExtensionMock;
});

jest.mock(
    "src/squads/payment/components/Autocompletes/ProductAutocompleteWithIdsHF2Extended/useProductAutocomplete",
    () => {
        return (): MAutocompleteServiceHookReturn<ProductTypeQuery> => ({
            data: mockRecurringMaterialList,
            isFetching: false,
        });
    }
);
describe("ProductListItem interactions with Recurring Material", () => {
    const { currentCurrency } = getCurrentCurrency();

    const firstStudentIndex = 0;
    const firstProductFieldArrayItemIndex = 0;
    const firstProduct = mockRecurringMaterialList[0];
    const secondProduct = mockRecurringMaterialList[1];

    const TestComponent = () => {
        const hookFormMethods = useForm<OrderFormValues>({
            defaultValues: {
                students: [
                    {
                        studentInfo: {},
                        productFieldArrayItems: [{}],
                    },
                ],
            },
        });

        const { fields } = useFieldArray<
            OrderFormValues,
            `students.${number}.productFieldArrayItems`
        >({
            control: hookFormMethods.control,
            name: `students.${firstStudentIndex}.productFieldArrayItems`,
        });

        return (
            <TranslationProvider>
                <MuiPickersUtilsProvider>
                    <ProductExtensionPluginsProvider
                        currency={currentCurrency}
                        orderType={OrderType.ORDER_TYPE_NEW}
                        notImplementedYetPlugins={defaultNotImplementedYetPlugins}
                    >
                        <TestQueryWrapper>
                            <FormProvider {...hookFormMethods}>
                                <ProductListItem
                                    productFieldItem={fields[firstProductFieldArrayItemIndex]}
                                    productIndex={firstProductFieldArrayItemIndex}
                                    productIds={[]}
                                    selectedProductIds={[]}
                                    studentIndex={firstStudentIndex}
                                />
                            </FormProvider>
                        </TestQueryWrapper>
                    </ProductExtensionPluginsProvider>
                </MuiPickersUtilsProvider>
            </TranslationProvider>
        );
    };

    it("should change the start date to empty when user choose another product", async () => {
        const wrapper = render(<TestComponent />);

        userEvent.click(screen.getByTestId("ArrowDropDownIcon"));
        userEvent.click(screen.getByText(firstProduct.name));

        const { autocompleteInput } = getAutocompleteInputByTestId(
            "ProductAutocompleteWithIdsHF__autocomplete"
        );

        expect(autocompleteInput).toHaveValue(firstProduct.name);
        expect(screen.getByTestId("DiscountsAutocompleteHF__autocomplete")).toBeInTheDocument();
        expect(screen.getByTestId("DatePickerHF__input")).toBeInTheDocument();
        expect(screen.getByTestId("DatePickerHF__input")).toHaveTextContent("");

        await selectDatePicker(wrapper, "RecurringProductDetail__startDate", 7);

        userEvent.clear(autocompleteInput);

        userEvent.click(screen.getByText(secondProduct.name));
        expect(autocompleteInput).toHaveValue(secondProduct.name);
        expect(screen.getByTestId("DatePickerHF__input")).toBeInTheDocument();
        expect(screen.getByTestId("DatePickerHF__input")).toHaveTextContent("");
    });
});
