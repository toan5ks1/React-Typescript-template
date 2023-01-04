import { UseFormProps } from "react-hook-form";
import { getCurrentCurrency } from "src/squads/payment/helpers/price";
import { getStudentName } from "src/squads/payment/helpers/student";
import { NsBobLocationService } from "src/squads/payment/service/bob/locations-service-bob/types";
import { createMockCenterChoices } from "src/squads/payment/test-utils/mocks/location";
import { mockUpdateProducts } from "src/squads/payment/test-utils/mocks/order-form-update";
import { createMockProductChoices } from "src/squads/payment/test-utils/mocks/products";
import { createMockStudentInfo } from "src/squads/payment/test-utils/mocks/student";
import { getAutocompleteInputByTestId } from "src/squads/payment/test-utils/utils";
import { OrderFormValues } from "src/squads/payment/types/form/order-form-types";
import { ProductTypeQuery } from "src/squads/payment/types/service/product-types";

import { MAutocompleteServiceHookReturn } from "src/components/Autocompletes/MAutocompleteService";
import TranslationProvider from "src/providers/TranslationProvider";
import UpdateOrderDialog, {
    UpdateOrderDialogProps,
} from "src/squads/payment/domains/OrderManagement/components/Dialogs/UpdateOrderDialog";
import { updateOrderNotImplementedYetPlugins } from "src/squads/payment/domains/OrderManagement/plugins/common/components/NotImplementedYetPlugins";

import { OrderType } from "manabuf/payment/v1/enums_pb";

import { render, within, screen } from "@testing-library/react";
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
    "src/squads/payment/components/Autocompletes/DiscountAutocompleteHF/useDiscountAutocomplete"
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

describe("<UpdateOrderDialog />", () => {
    beforeEach(() => {
        mockUseSubmitOrder();
    });

    it("should render the dialog with student name and location", () => {
        const wrapper = renderUpdateOrderDialog();

        expect(wrapper.getByTestId("UpdateOrderDialog__dialog")).toBeInTheDocument();
        expect(wrapper.getByTestId("TableAddDeleteRow__root")).toBeInTheDocument();

        expect(wrapper.getByText(getStudentName(mockStudent?.user))).toBeInTheDocument();

        const { autocompleteInput } = getAutocompleteInputByTestId(
            "LocationsLowestLevelAutocompleteHF__autocomplete"
        );

        expect(autocompleteInput).toHaveValue(mockLocation.name);
    });

    it("should render the dialog with update order form and mock update product", () => {
        renderUpdateOrderDialog();

        expect(screen.getByTestId("UpdateOrderDialog__dialog")).toBeInTheDocument();
        expect(screen.getByTestId("TableAddDeleteRow__root")).toBeInTheDocument();

        mockUpdateOrderProducts.forEach((mockUpdateOrderProduct) => {
            const { autocompleteInput: productInput } = getAutocompleteInputByTestId(
                "ProductAutocompleteWithIdsHF__autocomplete"
            );
            expect(productInput).toHaveValue(mockUpdateOrderProduct.product?.name ?? "");

            const { autocompleteInput: discountInput } = getAutocompleteInputByTestId(
                "DiscountsAutocompleteHF__autocomplete"
            );
            expect(discountInput).toHaveValue(mockUpdateOrderProduct.discount?.name ?? "");
        });
    });

    it("should call open dialog cancel confirm when clicking close button and cancel button", () => {
        const wrapper = renderUpdateOrderDialog();

        userEvent.click(wrapper.getByTestId("DialogFullScreen__buttonClose"));

        expect(wrapper.getByTestId("DialogCancelConfirm__dialog")).toBeInTheDocument();

        userEvent.click(wrapper.getByTestId("OrderDialogFooter__buttonCancel"));

        expect(wrapper.getByTestId("DialogCancelConfirm__dialog")).toBeInTheDocument();
    });

    it("should call onClose when user clicks leave in dialog cancel confirm", () => {
        const wrapper = renderUpdateOrderDialog();

        userEvent.click(wrapper.getByTestId("DialogFullScreen__buttonClose"));
        userEvent.click(wrapper.getByTestId("FooterDialogConfirm__buttonSave"));
        expect(onClose).toBeCalledTimes(1);
    });

    it("should show error message when user click next without updating fields", async () => {
        const wrapper = renderUpdateOrderDialog();

        userEvent.click(wrapper.getByTestId("OrderDialogFooter__buttonNext"));
        await wrapper.findByText("Order cannot be submitted. None of the field/s was updated.");
    });

    it("should show update order preview when user clicks next with form changes", async () => {
        const wrapper = renderUpdateOrderDialog();

        const discountAutocomplete = wrapper.getByTestId("DiscountsAutocompleteHF__autocomplete");

        userEvent.click(within(discountAutocomplete).getByLabelText("Clear"));

        userEvent.click(wrapper.getByTestId("OrderDialogFooter__buttonNext"));

        await wrapper.findByText("Before Update Info");
        await wrapper.findByText("After Update Info");
    });

    it("should go back to order form when user clicks back on preview form", async () => {
        const wrapper = renderUpdateOrderDialog();

        const discountAutocomplete = wrapper.getByTestId("DiscountsAutocompleteHF__autocomplete");
        userEvent.click(within(discountAutocomplete).getByLabelText("Clear"));

        userEvent.click(wrapper.getByTestId("OrderDialogFooter__buttonNext"));

        await wrapper.findByText("Before Update Info");
        await wrapper.findByText("After Update Info");

        userEvent.click(wrapper.getByTestId("OrderDialogFooter__buttonBack"));

        expect(await wrapper.findByTestId("TableAddDeleteRow__root")).toBeInTheDocument();

        for (const mockUpdateOrderProduct of mockUpdateOrderProducts) {
            expect(
                await wrapper.findByText(
                    `[Adjustment] ${mockUpdateOrderProduct.product?.name ?? ""}`
                )
            ).toBeInTheDocument();
        }
    });
});
