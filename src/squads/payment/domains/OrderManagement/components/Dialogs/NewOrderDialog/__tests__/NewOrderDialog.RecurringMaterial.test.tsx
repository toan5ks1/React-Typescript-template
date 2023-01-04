import { UseFormProps } from "react-hook-form";
import { getCurrentCurrency } from "src/squads/payment/helpers/price";
import { NsBobLocationService } from "src/squads/payment/service/bob/locations-service-bob/types";
import { createMockCenterChoices } from "src/squads/payment/test-utils/mocks/location";
import { createMockRecurringMaterialList } from "src/squads/payment/test-utils/mocks/recurring-products";
import { changeAutocompleteInput } from "src/squads/payment/test-utils/utils";
import { OrderFormValues } from "src/squads/payment/types/form/order-form-types";
import {
    ProductExtensionType,
    ProductTypeQuery,
} from "src/squads/payment/types/service/product-types";

import { MAutocompleteServiceHookReturn } from "src/components/Autocompletes/MAutocompleteService";
import NewOrderDialog from "src/squads/payment/domains/OrderManagement/components/Dialogs/NewOrderDialog/NewOrderDialog";
import { defaultNotImplementedYetPlugins } from "src/squads/payment/domains/OrderManagement/plugins/common/components/NotImplementedYetPlugins";
import ProductExtensionPluginsProvider from "src/squads/payment/domains/OrderManagement/plugins/common/providers/ProductExtensionPluginsProvider";

import { OrderType } from "manabuf/payment/v1/enums_pb";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MuiPickersUtilsProvider from "src/squads/payment/contexts/MuiPickersUtilsProvider";
import { UseProductExtensionProps } from "src/squads/payment/domains/OrderManagement/hooks/useProductExtension";
import TestApp from "src/squads/payment/test-utils/TestApp";
import TestHookFormProvider from "src/squads/payment/test-utils/TestHookFormProvider";
import TestQueryWrapper from "src/squads/payment/test-utils/TestQueryWrapper";

const mockOnCloseDialogFn = jest.fn();
const mockProductChoices = createMockRecurringMaterialList();
const mockCenterChoices = createMockCenterChoices();
const { currentCurrency } = getCurrentCurrency();

jest.mock("src/squads/payment/domains/OrderManagement/hooks/useBillingSchedulePeriods");
jest.mock("src/squads/payment/domains/OrderManagement/hooks/useTaxDetail");
jest.mock("src/squads/payment/domains/OrderManagement/hooks/useProductPriceDetail");
jest.mock(
    "src/squads/payment/components/Autocompletes/ProductAutocompleteWithIdsHF2Extended/useProductAutocomplete",
    () => {
        return (): MAutocompleteServiceHookReturn<ProductTypeQuery> => ({
            data: mockProductChoices,
            isFetching: false,
        });
    }
);

jest.mock("src/squads/payment/domains/OrderManagement/hooks/useSubmitOrder", () => {
    return {
        __esModule: true,
        default: () => {
            return {
                createOrder: jest.fn(),
                isOnCreateLoading: false,
            };
        },
    };
});

jest.mock(
    "src/squads/payment/components/Autocompletes/LocationsLowestLevelAutocompleteHF/useLowestLevelLocations",
    () => {
        return {
            __esModule: true,
            default:
                (): MAutocompleteServiceHookReturn<NsBobLocationService.RetrieveLocationsResponseLocation> => ({
                    data: mockCenterChoices,
                    isFetching: false,
                }),
        };
    }
);

jest.mock(
    "src/squads/payment/components/Autocompletes/DiscountAutocompleteHF/useDiscountAutocomplete"
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

jest.mock("src/squads/payment/domains/OrderManagement/hooks/useProductExtension", () => {
    let isRendered = false;
    const useProductExtensionMock = ({ onSuccess, productId }: UseProductExtensionProps) => {
        const data: ProductExtensionType = {
            material_type: "MATERIAL_TYPE_RECURRING",
        };
        if (!isRendered && productId) {
            isRendered = true;
            setTimeout(() => {
                onSuccess?.(data);
            }, 0);
        }
    };
    return useProductExtensionMock;
});

const defaultNewOrderDialogFormOptions: UseFormProps<OrderFormValues> = {
    defaultValues: {
        students: [
            {
                studentInfo: {
                    student_id: "student_id_1",
                },
                productFieldArrayItems: [
                    {
                        product: null,
                    },
                ],
            },
        ],
        location: mockCenterChoices[0],
    },
};

describe("<NewOrderDialog />", () => {
    const firstProduct = mockProductChoices[0];
    const secondProduct = mockProductChoices[1];
    const errorMessage = "Required fields cannot be blank!";

    it("should render error message when submit recurring product order without start date", async () => {
        render(
            <ProductExtensionPluginsProvider
                currency={currentCurrency}
                orderType={OrderType.ORDER_TYPE_NEW}
                notImplementedYetPlugins={defaultNotImplementedYetPlugins}
            >
                <TestApp>
                    <MuiPickersUtilsProvider>
                        <TestQueryWrapper>
                            <TestHookFormProvider<OrderFormValues>
                                useFormOptions={defaultNewOrderDialogFormOptions}
                            >
                                <NewOrderDialog isOpen={true} onClose={mockOnCloseDialogFn} />
                            </TestHookFormProvider>
                        </TestQueryWrapper>
                    </MuiPickersUtilsProvider>
                </TestApp>
            </ProductExtensionPluginsProvider>
        );

        expect(screen.getByTestId("NewOrderDialog__dialog")).toBeInTheDocument();

        changeAutocompleteInput("ProductAutocompleteWithIdsHF__autocomplete", firstProduct.name);

        //TODO: LT-14641 remove timeout after form optimization
        await screen.findByTestId("DatePickerHF__input", {}, { timeout: 10000 });

        userEvent.click(screen.getByText("Submit"));

        await screen.findByText(errorMessage);

        changeAutocompleteInput("ProductAutocompleteWithIdsHF__autocomplete", secondProduct.name);

        expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();
    }, 30000); //TODO: LT-14641 remove timeout after form optimization
});
