import { UseFormProps } from "react-hook-form";
import { KeyDiscountAmountTypes, KeyDiscountTypes } from "src/squads/payment/constants/const";
import { ProductListItemStatus } from "src/squads/payment/constants/enum";
import { getCurrentCurrency } from "src/squads/payment/helpers/price";
import { NsBobLocationService } from "src/squads/payment/service/bob/locations-service-bob/types";
import { Payment_GetManyDiscountsQuery } from "src/squads/payment/service/fatima/fatima-types";
import { createMockDiscountChoices } from "src/squads/payment/test-utils/mocks/discount";
import { createMockCenterChoices } from "src/squads/payment/test-utils/mocks/location";
import { createMockProductChoices } from "src/squads/payment/test-utils/mocks/products";
import { createMockRecurringMaterialProductPrices } from "src/squads/payment/test-utils/mocks/recurring-products";
import {
    createMockRecurringMaterialBillingItem,
    updateProduct,
} from "src/squads/payment/test-utils/mocks/recurring-products-update";
import { createMockStudentInfo } from "src/squads/payment/test-utils/mocks/student";
import {
    changeAutocompleteInput,
    getAutocompleteInputByTestId,
} from "src/squads/payment/test-utils/utils";
import { ArrayElement } from "src/squads/payment/types/common/array";
import {
    OrderFormValues,
    ProductsFormValues,
} from "src/squads/payment/types/form/order-form-types";
import { ProductMaterialType } from "src/squads/payment/types/service/product-material-types";
import { ProductTypeQuery } from "src/squads/payment/types/service/product-types";
import { getDateWithZeroMilliseconds, getFormattedDate } from "src/squads/payment/utils/date";

import { MAutocompleteServiceHookReturn } from "src/components/Autocompletes/MAutocompleteService";
import TranslationProvider from "src/providers/TranslationProvider";
import UpdateOrderDialog, {
    UpdateOrderDialogProps,
} from "src/squads/payment/domains/OrderManagement/components/Dialogs/UpdateOrderDialog";
import { updateOrderNotImplementedYetPlugins } from "src/squads/payment/domains/OrderManagement/plugins/common/components/NotImplementedYetPlugins";

import { OrderType } from "manabuf/payment/v1/enums_pb";

import { render, within, waitFor, RenderResult, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MuiPickersUtilsProvider from "src/squads/payment/contexts/MuiPickersUtilsProvider";
import useSubmitOrder, {
    UseSubmitOrderProps,
} from "src/squads/payment/domains/OrderManagement/hooks/useSubmitOrder";
import ProductExtensionPluginsProvider from "src/squads/payment/domains/OrderManagement/plugins/new-order";
import { UseAutocompleteReferenceProps } from "src/squads/payment/hooks/useAutocompleteReference";
import TestApp from "src/squads/payment/test-utils/TestApp";
import TestHookFormProvider from "src/squads/payment/test-utils/TestHookFormProvider";
import TestQueryWrapper from "src/squads/payment/test-utils/TestQueryWrapper";
import TestThemeProvider from "src/squads/payment/test-utils/TestThemeProvider";

const onClose = jest.fn();
const mockOnCreateOrder = jest.fn();

jest.mock("src/squads/payment/domains/OrderManagement/hooks/useSubmitOrder", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

jest.mock(
    "src/squads/payment/domains/OrderManagement/hooks/useProductIdsByGradeAndLocation",
    () => {
        return {
            __esModule: true,
            default: () => ({
                productIds: [],
            }),
        };
    }
);
jest.mock(
    "src/squads/payment/components/Autocompletes/ProductAutocompleteWithIdsHF2Extended/useProductAutocomplete",
    () => {
        return {
            __esModule: true,
            default: (): MAutocompleteServiceHookReturn<ProductTypeQuery> => ({
                data: mockProductChoices,
                isFetching: false,
            }),
        };
    }
);

jest.mock(
    "src/squads/payment/components/Autocompletes/DiscountAutocompleteHF/useDiscountAutocomplete",
    () =>
        (): MAutocompleteServiceHookReturn<
            ArrayElement<Payment_GetManyDiscountsQuery["discount"]>
        > => ({
            data: mockDiscountChoices,
            isFetching: false,
        })
);

jest.mock("src/hooks/useAutocompleteReference", () => {
    return {
        __esModule: true,
        default: ({
            resource,
        }: UseAutocompleteReferenceProps<NsBobLocationService.RetrieveLocationsResponseLocation>) => {
            switch (resource) {
                case "locations":
                    return {
                        options: mockCenterChoices,
                        loading: false,
                        setInputVal: jest.fn(),
                    };
            }
        },
    };
});

const mockStudent = createMockStudentInfo();
const mockProductChoices = createMockProductChoices();
const mockDiscountChoices = createMockDiscountChoices();
const mockCenterChoices = createMockCenterChoices();
const mockLocation = mockCenterChoices[0];

const productTax = {
    tax_category: "TAX_CATEGORY_INCLUSIVE",
    tax_percentage: 10,
};

const material: ProductMaterialType = {
    material_type: "MATERIAL_TYPE_RECURRING",
};

const productPrices = createMockRecurringMaterialProductPrices();

const originalDiscount = {
    name: "Discount name",
    discount_amount_type: KeyDiscountAmountTypes.DISCOUNT_AMOUNT_TYPE_FIXED_AMOUNT,
    discount_amount_value: 10,
    available_from: "2021-12-28T02:35:17.738471+00:00",
    available_until: "2022-12-28T02:35:17.738471+00:00",
    created_at: "2021-12-28T02:35:17.738471+00:00",
    discount_id: "discount_id_1",
    discount_type: KeyDiscountTypes.DISCOUNT_TYPE_REGULAR,
    updated_at: "2021-12-28T02:35:17.738471+00:00",
};

const currentDate = getDateWithZeroMilliseconds();
const startDate = getDateWithZeroMilliseconds();
const effectiveDate = getDateWithZeroMilliseconds();
startDate.setDate(currentDate.getDate() - 1);
effectiveDate.setDate(currentDate.getDate() + 10);

const firstBillingDate = getDateWithZeroMilliseconds();
firstBillingDate.setDate(startDate.getDate());

const secondBillingDate = getDateWithZeroMilliseconds();
secondBillingDate.setMonth(startDate.getMonth() + 1);
secondBillingDate.setDate(startDate.getDate());

const firstBillingStartDate = getDateWithZeroMilliseconds();
firstBillingStartDate.setDate(effectiveDate.getDate() - 1);

const secondBillingStartDate = getDateWithZeroMilliseconds();
secondBillingStartDate.setMonth(effectiveDate.getMonth() + 1);
secondBillingStartDate.setDate(effectiveDate.getDate() - 1);

const firstBillingEndDate = getDateWithZeroMilliseconds();
firstBillingEndDate.setMonth(effectiveDate.getMonth() + 1);
firstBillingEndDate.setDate(effectiveDate.getDate() - 1);

const secondBillingEndDate = getDateWithZeroMilliseconds();
secondBillingEndDate.setMonth(effectiveDate.getMonth() + 2);
secondBillingEndDate.setDate(effectiveDate.getDate() - 1);

const billingSchedulePeriods = [
    {
        billing_schedule_id: "billing_schedule_id_1",
        billing_schedule_period_id: "billing_schedule_period_id_1",
        name: "Billing Schedule Period 1",
        billing_date: firstBillingDate.toISOString(),
        start_date: firstBillingStartDate.toISOString(),
        end_date: firstBillingEndDate.toISOString(),
        billing_ratios: [],
    },
    {
        billing_schedule_id: "billing_schedule_id_1",
        billing_schedule_period_id: "billing_schedule_period_id_2",
        name: "Billing Schedule Period 2",
        billing_date: secondBillingDate.toISOString(),
        start_date: secondBillingStartDate.toISOString(),
        end_date: secondBillingEndDate.toISOString(),
        billing_ratios: [],
    },
];

const updateOrderMockFormValues = {
    product: updateProduct,
    material,
    productTax,
    productPrices,
    discount: originalDiscount,
    updateOrderDetails: {
        orderStatus: ProductListItemStatus.ACTIVE,
        effectiveDate: effectiveDate,
        billItems: createMockRecurringMaterialBillingItem(),
        hasUpdate: false,
        reccuringDetails: {
            startDate: startDate.toISOString(),
            billingSchedulePeriods: billingSchedulePeriods,
        },
    },
    fee: undefined,
    packageEntity: undefined,
};

const updateFormOptions: UseFormProps<OrderFormValues> = {
    defaultValues: {
        students: [
            {
                studentInfo: mockStudent,
                productFieldArrayItems: [updateOrderMockFormValues],
                comment: "",
            },
        ],
        location: mockLocation,
    },
};

const selectedEffectiveDate = getDateWithZeroMilliseconds();
selectedEffectiveDate.setDate(effectiveDate.getDate() + 1);
const hasEffectiveDateUpdateOrderMockFormValues = {
    product: updateProduct,
    material,
    productTax,
    productPrices,
    discount: originalDiscount,
    updateOrderDetails: {
        orderStatus: ProductListItemStatus.ACTIVE,
        effectiveDate: selectedEffectiveDate,
        billItems: createMockRecurringMaterialBillingItem(),
        hasUpdate: true,
        reccuringDetails: {
            startDate: startDate.toISOString(),
            billingSchedulePeriods: billingSchedulePeriods,
        },
    },
    fee: undefined,
    packageEntity: undefined,
};

const hasDiscountUpdateOrderMockFormValues = {
    product: updateProduct,
    material,
    productTax,
    productPrices,
    discount: mockDiscountChoices[1],
    updateOrderDetails: {
        orderStatus: ProductListItemStatus.ACTIVE,
        effectiveDate: effectiveDate,
        billItems: createMockRecurringMaterialBillingItem(),
        hasUpdate: true,
        reccuringDetails: {
            startDate: startDate.toISOString(),
            billingSchedulePeriods: billingSchedulePeriods,
        },
    },
    fee: undefined,
    packageEntity: undefined,
};

const hasDiscountClearedOrderMockFormValues = {
    ...hasDiscountUpdateOrderMockFormValues,
    discount: null,
};

const isCancelledMockFormValues = {
    ...updateOrderMockFormValues,
    updateOrderDetails: {
        ...updateOrderMockFormValues.updateOrderDetails,
        hasUpdate: true,
        orderStatus: ProductListItemStatus.CANCELLED,
    },
};

const mockUpdateOrderDialogProps: UpdateOrderDialogProps = {
    isOpen: true,
    onClose: onClose,
    defaultProducts: [updateOrderMockFormValues],
};

const { currentCurrency } = getCurrentCurrency();

const getUpdateFormOptions = (
    productFieldArrayItems: ProductsFormValues[],
    comment = ""
): OrderFormValues => {
    return {
        students: [
            {
                studentInfo: mockStudent,
                productFieldArrayItems,
                comment,
            },
        ],
        location: mockLocation,
    };
};

const renderUpdateOrderDialog = (
    UpdateOrderDialogProps: UpdateOrderDialogProps = mockUpdateOrderDialogProps,
    useFormOptions: UseFormProps<OrderFormValues> = updateFormOptions
) => {
    return render(
        <TestApp>
            <MuiPickersUtilsProvider>
                <TranslationProvider>
                    <TestThemeProvider>
                        <TestQueryWrapper>
                            <TestHookFormProvider<OrderFormValues> useFormOptions={useFormOptions}>
                                <ProductExtensionPluginsProvider
                                    currency={currentCurrency}
                                    orderType={OrderType.ORDER_TYPE_UPDATE}
                                    notImplementedYetPlugins={updateOrderNotImplementedYetPlugins}
                                >
                                    <UpdateOrderDialog {...UpdateOrderDialogProps} />
                                </ProductExtensionPluginsProvider>
                            </TestHookFormProvider>
                        </TestQueryWrapper>
                    </TestThemeProvider>
                </TranslationProvider>
            </MuiPickersUtilsProvider>
        </TestApp>
    );
};

const mockUseSubmitOrder = (errorMessage?: string) => {
    (useSubmitOrder as jest.Mock).mockImplementation(({ onCreateError }: UseSubmitOrderProps) => {
        return {
            createOrder: (data: OrderFormValues) => {
                mockOnCreateOrder(data);
                if (errorMessage) {
                    onCreateError(errorMessage);
                }
            },
            isOnCreateLoading: false,
        };
    });
};

const submitFormByUser = async (
    wrapper: RenderResult,
    mockValue: OrderFormValues,
    isCancelled?: boolean
) => {
    if (isCancelled) {
        expect(wrapper.getByText("[Cancelled]")).toBeInTheDocument();
    }

    userEvent.click(wrapper.getByTestId("OrderDialogFooter__buttonNext"));

    await wrapper.findByText("Before Update Info");
    if (isCancelled) {
        expect(await wrapper.findByText("[Cancelled]")).toBeInTheDocument();
    }

    userEvent.click(wrapper.getByTestId("OrderDialogFooter__buttonSubmit"));

    await waitFor(() => {
        expect(mockOnCreateOrder).toBeCalledWith(mockValue);
    });
};

describe("<UpdateOrderDialog /> Recurring Material", () => {
    beforeEach(() => {
        mockUseSubmitOrder();
    });

    it("should render the dialog with update order form and default recurring material product", () => {
        renderUpdateOrderDialog();

        expect(screen.getByTestId("UpdateOrderDialog__dialog")).toBeInTheDocument();
        expect(screen.getByTestId("TableAddDeleteRow__root")).toBeInTheDocument();

        const expectedValues = {
            productName: "Update Order Product Testing",
            discountName: "Discount name",
            effectiveDate: getFormattedDate(effectiveDate.toISOString()),
        };

        const { autocompleteInput: productInput } = getAutocompleteInputByTestId(
            "ProductAutocompleteWithIdsHF__autocomplete"
        );
        expect(productInput).toHaveValue(expectedValues.productName);

        const { autocompleteInput: discountInput } = getAutocompleteInputByTestId(
            "DiscountsAutocompleteHF__autocomplete"
        );
        expect(discountInput).toHaveValue(expectedValues.discountName);

        const billingDateInput = screen.getByTestId("DatePickerHF__input");
        expect(billingDateInput).toHaveValue(expectedValues.effectiveDate);
        expect(billingDateInput).toHaveAttribute("readonly");
    });

    it("should change discount when user selects a new discount and submit successfully", async () => {
        const wrapper = renderUpdateOrderDialog();
        changeAutocompleteInput("DiscountsAutocompleteHF__autocomplete", "Discount 2", 1);

        const { autocompleteInput: discountInput } = getAutocompleteInputByTestId(
            "DiscountsAutocompleteHF__autocomplete"
        );
        expect(discountInput).toHaveValue("Discount 2");

        const hasDiscountUpdateOrderFormValue = getUpdateFormOptions([
            hasDiscountUpdateOrderMockFormValues,
        ]);

        await submitFormByUser(wrapper, hasDiscountUpdateOrderFormValue);
    });

    it("should clear discount and submit successfully", async () => {
        const wrapper = renderUpdateOrderDialog();

        const discountAutocomplete = wrapper.getByTestId("DiscountsAutocompleteHF__autocomplete");
        userEvent.click(within(discountAutocomplete).getByLabelText("Clear"));

        const hasDiscountClearedOrderFormValue = getUpdateFormOptions([
            hasDiscountClearedOrderMockFormValues,
        ]);

        await submitFormByUser(wrapper, hasDiscountClearedOrderFormValue);
    });

    it("should clear discount, add comment, and submit successfully", async () => {
        const wrapper = renderUpdateOrderDialog();

        const discountAutocomplete = wrapper.getByTestId("DiscountsAutocompleteHF__autocomplete");
        userEvent.click(within(discountAutocomplete).getByLabelText("Clear"));

        const commentInput = wrapper.getByTestId(
            "CommentSection__commentInput"
        ) as HTMLTextAreaElement;

        const mockCommentText = "Comment Test Input";

        userEvent.type(commentInput, mockCommentText);
        expect(commentInput).toHaveValue(mockCommentText);

        const hasDiscountClearedAndCommentOrderFormValue = getUpdateFormOptions(
            [hasDiscountClearedOrderMockFormValues],
            mockCommentText
        );

        await submitFormByUser(wrapper, hasDiscountClearedAndCommentOrderFormValue);
    });

    it("should change effective date and submit successfully", async () => {
        const wrapper = renderUpdateOrderDialog();

        const datePicker = wrapper.getByLabelText("Effective Date");

        userEvent.click(datePicker);

        const month = selectedEffectiveDate.toLocaleString("default", { month: "short" });
        const year = selectedEffectiveDate.getFullYear();
        const date = selectedEffectiveDate.getDate();

        const selectedDateInput = wrapper.getByLabelText(`${month} ${date}, ${year}`);
        userEvent.click(selectedDateInput);

        const okButton = wrapper.getByText("OK");
        userEvent.click(okButton);

        const hasEffectiveDateUpdateOrderFormValue = getUpdateFormOptions([
            hasEffectiveDateUpdateOrderMockFormValues,
        ]);

        await submitFormByUser(wrapper, hasEffectiveDateUpdateOrderFormValue);
    });

    it("should cancel active product when user clicks the cancel button", async () => {
        const wrapper = renderUpdateOrderDialog();

        userEvent.click(wrapper.getByTestId("MenuItemPanel__trigger"));

        const actionPanelButton = wrapper.getByTestId("MenuItemPanel__menuList");
        userEvent.click(within(actionPanelButton).getByText("Cancel"));

        const isCancelledFormOptions = getUpdateFormOptions([isCancelledMockFormValues]);

        await submitFormByUser(wrapper, isCancelledFormOptions);
    });

    it("should submit restore cancelled product with discount change", async () => {
        const wrapper = renderUpdateOrderDialog();

        userEvent.click(wrapper.getByTestId("MenuItemPanel__trigger"));
        const actionPanelButton = wrapper.getByTestId("MenuItemPanel__menuList");

        userEvent.click(within(actionPanelButton).getByText("Cancel"));
        expect(wrapper.getByText("[Cancelled]")).toBeInTheDocument();

        userEvent.click(wrapper.getByTestId("MenuItemPanel__trigger"));
        userEvent.click(wrapper.getByText("Restore"));

        expect(wrapper.getByTestId("DiscountsAutocompleteHF__autocomplete")).not.toHaveAttribute(
            "readonly"
        );

        changeAutocompleteInput("DiscountsAutocompleteHF__autocomplete", "Discount 2", 1);

        const { autocompleteInput: discountInput } = getAutocompleteInputByTestId(
            "DiscountsAutocompleteHF__autocomplete"
        );
        expect(discountInput).toHaveValue("Discount 2");

        const hasDiscountUpdateOrderFormValue = getUpdateFormOptions([
            hasDiscountUpdateOrderMockFormValues,
        ]);

        await submitFormByUser(wrapper, hasDiscountUpdateOrderFormValue);
    });

    it("should receive error when submitting restore product without discount change", async () => {
        const wrapper = renderUpdateOrderDialog();

        userEvent.click(wrapper.getByTestId("MenuItemPanel__trigger"));
        const actionPanelButton = wrapper.getByTestId("MenuItemPanel__menuList");

        userEvent.click(within(actionPanelButton).getByText("Cancel"));
        expect(wrapper.getByText("[Cancelled]")).toBeInTheDocument();

        userEvent.click(wrapper.getByTestId("MenuItemPanel__trigger"));
        userEvent.click(wrapper.getByText("Restore"));

        expect(wrapper.queryByText("[Cancelled]")).not.toBeInTheDocument();
        expect(wrapper.getByTestId("DiscountsAutocompleteHF__autocomplete")).not.toHaveAttribute(
            "readonly"
        );

        userEvent.click(wrapper.getByTestId("OrderDialogFooter__buttonNext"));

        expect(
            await wrapper.findByText("Order cannot be submitted. None of the field/s was updated.")
        );
    });
});
