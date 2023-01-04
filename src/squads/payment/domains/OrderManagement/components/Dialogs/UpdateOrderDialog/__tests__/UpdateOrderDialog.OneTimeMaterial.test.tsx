import { UseFormProps } from "react-hook-form";
import { ProductListItemStatus } from "src/squads/payment/constants/enum";
import { getCurrentCurrency } from "src/squads/payment/helpers/price";
import { NsBobLocationService } from "src/squads/payment/service/bob/locations-service-bob/types";
import { Payment_GetManyDiscountsQuery } from "src/squads/payment/service/fatima/fatima-types";
import { createMockDiscountChoices } from "src/squads/payment/test-utils/mocks/discount";
import { createMockCenterChoices } from "src/squads/payment/test-utils/mocks/location";
import { mockUpdateProducts } from "src/squads/payment/test-utils/mocks/order-form-update";
import { createMockProductChoices } from "src/squads/payment/test-utils/mocks/products";
import { createMockStudentInfo } from "src/squads/payment/test-utils/mocks/student";
import {
    changeAutocompleteInput,
    getAutocompleteInputByTestId,
} from "src/squads/payment/test-utils/utils";
import { ArrayElement } from "src/squads/payment/types/common/array";
import { OrderFormValues } from "src/squads/payment/types/form/order-form-types";
import { ProductDiscountType } from "src/squads/payment/types/service/discount-types";
import { ProductTypeQuery } from "src/squads/payment/types/service/product-types";
import { getFormattedDate } from "src/squads/payment/utils/date";

import { MAutocompleteServiceHookReturn } from "src/components/Autocompletes/MAutocompleteService";
import TranslationProvider from "src/providers/TranslationProvider";
import UpdateOrderDialog, {
    UpdateOrderDialogProps,
} from "src/squads/payment/domains/OrderManagement/components/Dialogs/UpdateOrderDialog";
import { updateOrderNotImplementedYetPlugins } from "src/squads/payment/domains/OrderManagement/plugins/common/components/NotImplementedYetPlugins";

import { OrderType } from "manabuf/payment/v1/enums_pb";

import { render, within, waitFor, RenderResult } from "@testing-library/react";
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

const mockProductChoices = createMockProductChoices();
const mockUpdateOrderProducts = mockUpdateProducts();
const mockStudent = createMockStudentInfo();
const mockDiscountChoices = createMockDiscountChoices();
const mockCenterChoices = createMockCenterChoices();
const mockLocation = mockCenterChoices[0];

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

const mockUpdateOrderFormValue: OrderFormValues = {
    students: [
        {
            studentInfo: mockStudent,
            productFieldArrayItems: mockUpdateOrderProducts,
            comment: "",
        },
    ],
    location: mockLocation,
};

const getMockAdjustmentItemUpdateOrderFormValue = ({
    discount,
    isCancelled,
    comment = "",
}: {
    discount?: ProductDiscountType;
    isCancelled?: boolean;
    comment?: string;
}): OrderFormValues => {
    return {
        students: [
            {
                studentInfo: mockStudent,
                productFieldArrayItems: [
                    {
                        ...mockUpdateOrderProducts[0],
                        discount: discount || null,
                        updateOrderDetails: {
                            ...mockUpdateOrderProducts[0].updateOrderDetails!,
                            hasUpdate: true,
                            orderStatus: isCancelled
                                ? ProductListItemStatus.CANCELLED
                                : ProductListItemStatus.ACTIVE,
                        },
                    },
                ],
                comment: comment,
            },
        ],
        location: mockLocation,
    };
};

const defaultUpdateOrderDialogFormOptions: UseFormProps<OrderFormValues> = {
    defaultValues: mockUpdateOrderFormValue,
};

const mockUpdateOrderDialogProps: UpdateOrderDialogProps = {
    isOpen: true,
    onClose: onClose,
    defaultProducts: mockUpdateOrderProducts,
};

const { currentCurrency } = getCurrentCurrency();

const renderUpdateOrderDialog = (
    UpdateOrderDialogProps: UpdateOrderDialogProps = mockUpdateOrderDialogProps,
    useFormOptions: UseFormProps<OrderFormValues> = defaultUpdateOrderDialogFormOptions
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

describe("<UpdateOrderDialog /> One Time Material", () => {
    beforeEach(() => {
        mockUseSubmitOrder();
    });

    it("should render the dialog with update order form and default one time material product", () => {
        const wrapper = renderUpdateOrderDialog();

        expect(wrapper.getByTestId("UpdateOrderDialog__dialog")).toBeInTheDocument();
        expect(wrapper.getByTestId("TableAddDeleteRow__root")).toBeInTheDocument();

        mockUpdateOrderProducts.forEach((mockUpdateOrderProduct) => {
            const { autocompleteInput: productInput } = getAutocompleteInputByTestId(
                "ProductAutocompleteWithIdsHF__autocomplete"
            );
            expect(productInput).toHaveValue(mockUpdateOrderProduct.product?.name ?? "");

            const { autocompleteInput: discountInput } = getAutocompleteInputByTestId(
                "DiscountsAutocompleteHF__autocomplete"
            );
            expect(discountInput).toHaveValue(mockUpdateOrderProduct.discount?.name ?? "");

            const formattedEffectiveDate = getFormattedDate(
                mockUpdateOrderProduct.updateOrderDetails!.effectiveDate.toISOString()
            );

            const billingDateInput = wrapper.getByTestId("DatePickerHF__input");
            expect(billingDateInput).toHaveValue(formattedEffectiveDate);
            expect(billingDateInput).toHaveAttribute("readonly");
        });
    });

    it("should show update order preview when user clicks next with form changes", async () => {
        const wrapper = renderUpdateOrderDialog();

        const discountAutocomplete = wrapper.getByTestId("DiscountsAutocompleteHF__autocomplete");

        userEvent.click(within(discountAutocomplete).getByLabelText("Clear"));

        userEvent.click(wrapper.getByTestId("OrderDialogFooter__buttonNext"));

        await wrapper.findByText("Before Update Info");
        await wrapper.findByText("After Update Info");
    });

    it("should change discount when user selects a new discount and submit successfully", async () => {
        const wrapper = renderUpdateOrderDialog();
        changeAutocompleteInput("DiscountsAutocompleteHF__autocomplete", "Discount 2", 1);

        const { autocompleteInput: discountInput } = getAutocompleteInputByTestId(
            "DiscountsAutocompleteHF__autocomplete"
        );
        expect(discountInput).toHaveValue("Discount 2");

        await submitFormByUser(
            wrapper,
            getMockAdjustmentItemUpdateOrderFormValue({ discount: mockDiscountChoices[1] })
        );
    });

    it("should clear discount and submit successfully", async () => {
        const wrapper = renderUpdateOrderDialog();

        const discountAutocomplete = wrapper.getByTestId("DiscountsAutocompleteHF__autocomplete");
        userEvent.click(within(discountAutocomplete).getByLabelText("Clear"));

        await submitFormByUser(wrapper, getMockAdjustmentItemUpdateOrderFormValue({}));
    });

    it("should clear discount, add comment, and submit successfully", async () => {
        const wrapper = renderUpdateOrderDialog();

        const discountAutocomplete = wrapper.getByTestId("DiscountsAutocompleteHF__autocomplete");
        userEvent.click(within(discountAutocomplete).getByLabelText("Clear"));

        const commentText: string = "Comment Test Input";

        const commentInput = wrapper.getByTestId(
            "CommentSection__commentInput"
        ) as HTMLTextAreaElement;

        userEvent.type(commentInput, commentText);
        expect(commentInput).toHaveValue(commentText);

        await submitFormByUser(
            wrapper,
            getMockAdjustmentItemUpdateOrderFormValue({
                comment: commentText,
            })
        );
    });

    it("should cancel active product when user clicks the cancel button", async () => {
        const wrapper = renderUpdateOrderDialog();

        userEvent.click(wrapper.getByTestId("MenuItemPanel__trigger"));

        const actionPanelButton = wrapper.getByTestId("MenuItemPanel__menuList");
        userEvent.click(within(actionPanelButton).getByText("Cancel"));

        const defaultDiscount = mockUpdateOrderProducts[0].discount;
        const isCancelled = true;

        await submitFormByUser(
            wrapper,
            getMockAdjustmentItemUpdateOrderFormValue({
                discount: defaultDiscount!,
                isCancelled,
            }),
            isCancelled
        );
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

        await submitFormByUser(
            wrapper,
            getMockAdjustmentItemUpdateOrderFormValue({ discount: mockDiscountChoices[1] })
        );
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
