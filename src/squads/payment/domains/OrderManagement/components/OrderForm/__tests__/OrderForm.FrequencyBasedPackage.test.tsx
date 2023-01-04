import { useRef } from "react";

import { getCurrentCurrency } from "src/squads/payment/helpers/price";
import { Payment_GetManyDiscountsQuery } from "src/squads/payment/service/fatima/fatima-types";
import {
    createMockCourseList,
    createMockPackageCourseList,
} from "src/squads/payment/test-utils/mocks/package-course";
import { createMockFrequencyBasedPackageList } from "src/squads/payment/test-utils/mocks/recurring-products";
import { changeAutocompleteInput } from "src/squads/payment/test-utils/utils";
import { ArrayElement } from "src/squads/payment/types/common/array";
import {
    ProductExtensionType,
    ProductTypeQuery,
} from "src/squads/payment/types/service/product-types";

import { MAutocompleteServiceHookReturn } from "src/components/Autocompletes/MAutocompleteService";
import { ProductListSectionRefs } from "src/squads/payment/components/Sections/ProductListSection";
import OrderForm, {
    OrderFormProps,
} from "src/squads/payment/domains/OrderManagement/components/OrderForm";
import { defaultNotImplementedYetPlugins } from "src/squads/payment/domains/OrderManagement/plugins/common/components/NotImplementedYetPlugins";

import { OrderType } from "manabuf/payment/v1/enums_pb";

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MuiPickersUtilsProvider from "src/squads/payment/contexts/MuiPickersUtilsProvider";
import TranslationProvider from "src/squads/payment/contexts/TranslationProvider";
import { UseAssociatedProductsReturn } from "src/squads/payment/domains/OrderManagement/hooks/useAssociatedProducts";
import { UseProductExtensionProps } from "src/squads/payment/domains/OrderManagement/hooks/useProductExtension";
import ProductExtensionPluginsProvider from "src/squads/payment/domains/OrderManagement/plugins/new-order";
import TestHookFormProvider from "src/squads/payment/test-utils/TestHookFormProvider";
import TestQueryWrapper from "src/squads/payment/test-utils/TestQueryWrapper";

const mockFrequencyBasedPackageProductList = createMockFrequencyBasedPackageList();
const mockCourseList = createMockCourseList();
const mockPackageCourses = createMockPackageCourseList();

const firstStudentIndex = 0;

jest.mock("src/squads/payment/hooks/useShowSnackbar");
jest.mock("src/squads/payment/domains/OrderManagement/hooks/useBillingSchedulePeriods");
jest.mock("src/squads/payment/domains/OrderManagement/hooks/useProductPriceDetail");
jest.mock("src/squads/payment/domains/OrderManagement/hooks/useTaxDetail");

jest.mock(
    "src/squads/payment/components/Autocompletes/LocationsLowestLevelAutocompleteHF/useLowestLevelLocations"
);

jest.mock(
    "src/squads/payment/components/Autocompletes/ProductAutocompleteWithIdsHF2Extended/useProductAutocomplete",
    () => {
        return (): MAutocompleteServiceHookReturn<ProductTypeQuery> => ({
            data: mockFrequencyBasedPackageProductList,
            isFetching: false,
        });
    }
);

jest.mock("src/squads/payment/domains/OrderManagement/hooks/useProductExtension", () => {
    let isRendered = false;
    const useProductExtensionMock = ({ onSuccess, productId }: UseProductExtensionProps) => {
        const data: ProductExtensionType = {
            package_type: "PACKAGE_TYPE_FREQUENCY",
            max_slot: 2,
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

jest.mock("src/squads/payment/hooks/useOrderValidationRules", () => ({
    __esModule: true,
    default: () => ({
        errorMessages: {
            productArrayTable: () => "",
        },
        validationRules: {
            location: {},
            product: () => jest.fn(),
        },
        requiredSection: jest.fn(),
    }),
}));

jest.mock("src/squads/payment/domains/OrderManagement/hooks/useAssociatedProducts", () => {
    return {
        __esModule: true,
        default: (): UseAssociatedProductsReturn => ({
            packageCourseMaterials: [],
            packageCourseFees: [],
            productDetails: [],
            productFees: undefined,
            productMaterials: undefined,
            productPrices: [],
            productTaxes: [],
            isFetchedAll: false,
        }),
    };
});

jest.mock("src/squads/payment/domains/OrderManagement/hooks/useCourses", () => {
    return {
        __esModule: true,
        default: () => ({
            data: mockCourseList,
        }),
    };
});

jest.mock("src/squads/payment/domains/OrderManagement/hooks/usePackageCourses", () => {
    return {
        __esModule: true,
        default: () => ({
            data: mockPackageCourses,
        }),
    };
});

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

jest.mock(
    "src/squads/payment/components/Autocompletes/DiscountAutocompleteHF/useDiscountAutocomplete",
    () =>
        (): MAutocompleteServiceHookReturn<
            ArrayElement<Payment_GetManyDiscountsQuery["discount"]>
        > => ({
            data: [],
            isFetching: false,
        })
);

const { currentCurrency } = getCurrentCurrency();

const TestComponent = () => {
    const productListSectionRef = useRef<ProductListSectionRefs>();

    const orderFormProps: OrderFormProps = {
        productListSectionRef: productListSectionRef,
        studentIndex: firstStudentIndex,
    };

    return (
        <MuiPickersUtilsProvider>
            <TranslationProvider>
                <ProductExtensionPluginsProvider
                    currency={currentCurrency}
                    orderType={OrderType.ORDER_TYPE_NEW}
                    notImplementedYetPlugins={defaultNotImplementedYetPlugins}
                >
                    <TestQueryWrapper>
                        <TestHookFormProvider
                            useFormOptions={{
                                defaultValues: {
                                    students: [
                                        {
                                            studentInfo: {},
                                            productFieldArrayItems: [],
                                        },
                                    ],
                                },
                            }}
                        >
                            <OrderForm {...orderFormProps} />
                        </TestHookFormProvider>
                    </TestQueryWrapper>
                </ProductExtensionPluginsProvider>
            </TranslationProvider>
        </MuiPickersUtilsProvider>
    );
};

describe("<OrderForm />", () => {
    const frequencyProduct = mockFrequencyBasedPackageProductList[0];
    const noInformationText = "No Information";

    it("should show no information in billed at order and upcoming billing section when not selecting product", () => {
        render(<TestComponent />);

        const productListTable = screen.getByTestId("TableAddDeleteRow__root");
        expect(within(productListTable).getByText(noInformationText)).toBeInTheDocument();

        const billedAtOrderSection = screen.getByTestId("BilledAtOrderSection__container");
        expect(within(billedAtOrderSection).getByText(noInformationText)).toBeInTheDocument();

        const upcomingBillingSection = screen.getByTestId("UpcomingBillingSection__container");
        expect(within(upcomingBillingSection).getByText(noInformationText)).toBeInTheDocument();

        userEvent.click(screen.getByTestId("TableAddDeleteRow__addButton"));

        expect(within(productListTable).queryByText(noInformationText)).not.toBeInTheDocument();
        expect(within(billedAtOrderSection).getByText(noInformationText)).toBeInTheDocument();
        expect(within(upcomingBillingSection).getByText(noInformationText)).toBeInTheDocument();
    });

    it("should show no information in billed at order and upcoming billing section when not choose start date", async () => {
        render(<TestComponent />);

        userEvent.click(screen.getByTestId("TableAddDeleteRow__addButton"));

        changeAutocompleteInput(
            "ProductAutocompleteWithIdsHF__autocomplete",
            frequencyProduct.name
        );

        //TODO: LT-14641 remove timeout after form optimization
        const datePicker = await screen.findByTestId("DatePickerHF__input", {}, { timeout: 10000 });
        expect(datePicker).toHaveTextContent("");

        const billedAtOrderSection = screen.getByTestId("BilledAtOrderSection__container");
        expect(within(billedAtOrderSection).getByText(noInformationText)).toBeInTheDocument();

        const upcomingBillingSection = screen.getByTestId("UpcomingBillingSection__container");
        expect(within(upcomingBillingSection).getByText(noInformationText)).toBeInTheDocument();
    }, 30000); //TODO: LT-14641 remove timeout after form optimization
});
