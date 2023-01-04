import { UseFormProps } from "react-hook-form";
import { getCurrentCurrency } from "src/squads/payment/helpers/price";
import { createMockCompleteOrderFormValues } from "src/squads/payment/test-utils/mocks/order-form";
import { createMockCourseList } from "src/squads/payment/test-utils/mocks/package-course";
import { createMockProductsManyChoices } from "src/squads/payment/test-utils/mocks/products";
import { ProductTypeQuery } from "src/squads/payment/types/service/product-types";

import { MAutocompleteServiceHookReturn } from "src/components/Autocompletes/MAutocompleteService";
import ProductListItem, {
    ProductListItemProps,
} from "src/squads/payment/components/Sections/ProductListSection/ProductListItem";
import { defaultNotImplementedYetPlugins } from "src/squads/payment/domains/OrderManagement/plugins/common/components/NotImplementedYetPlugins";

import { OrderType } from "manabuf/payment/v1/enums_pb";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MuiPickersUtilsProvider from "src/squads/payment/contexts/MuiPickersUtilsProvider";
import ProductExtensionPluginsProvider from "src/squads/payment/domains/OrderManagement/plugins/new-order";
import TestApp from "src/squads/payment/test-utils/TestApp";
import TestHookFormProvider from "src/squads/payment/test-utils/TestHookFormProvider";
import TestQueryWrapper from "src/squads/payment/test-utils/TestQueryWrapper";

const mockCourseList = createMockCourseList();
const mockOrderFormValues = createMockCompleteOrderFormValues();
const { currentCurrency: currency } = getCurrentCurrency();

jest.mock("src/squads/payment/domains/OrderManagement/hooks/useCourses", () => {
    return {
        __esModule: true,
        default: () => ({
            data: mockCourseList,
        }),
    };
});

const mockProductChoices = createMockProductsManyChoices();
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

jest.mock("src/squads/payment/domains/OrderManagement/hooks/useProductExtension");
jest.mock("src/squads/payment/domains/OrderManagement/hooks/useTaxDetail");
jest.mock("src/squads/payment/domains/OrderManagement/hooks/useProductPriceDetail");
jest.mock("src/squads/payment/domains/OrderManagement/hooks/useBillingSchedulePeriods");

const defaultOrderFormProductOption: UseFormProps = {
    defaultValues: { ...mockOrderFormValues },
};

const materialProductIndex = 1;
const packageProductIndex = 0;
const firstStudentIndex = 0;
const defaultProductListItemProps: ProductListItemProps = {
    productFieldItem: {
        id: "field_item_1",
        ...mockOrderFormValues.students[firstStudentIndex].productFieldArrayItems[
            materialProductIndex
        ],
    },
    productIndex: materialProductIndex,
    productIds: ["product_id_1", "product_id_2", "product_id_3", "product_id_4"],
    selectedProductIds: ["product_id_3", "product_id_4"],
    studentIndex: firstStudentIndex,
};

const packageTypeProductListItemProps: ProductListItemProps = {
    productFieldItem: {
        id: "field_item_1",
        ...mockOrderFormValues.students[firstStudentIndex].productFieldArrayItems[
            packageProductIndex
        ],
    },
    productIndex: packageProductIndex,
    productIds: ["product_id_1", "product_id_2", "product_id_3", "product_id_4"],
    selectedProductIds: ["product_id_3", "product_id_4"],
    studentIndex: firstStudentIndex,
};

const renderProductListItemComponent = (
    productListItemProps: ProductListItemProps = defaultProductListItemProps,
    useFormProps: UseFormProps = defaultOrderFormProductOption
) => {
    return render(
        <ProductExtensionPluginsProvider
            currency={currency}
            orderType={OrderType.ORDER_TYPE_NEW}
            notImplementedYetPlugins={defaultNotImplementedYetPlugins}
        >
            <MuiPickersUtilsProvider>
                <TestApp>
                    <TestQueryWrapper>
                        <TestHookFormProvider useFormOptions={useFormProps}>
                            <ProductListItem {...productListItemProps} />
                        </TestHookFormProvider>
                    </TestQueryWrapper>
                </TestApp>
            </MuiPickersUtilsProvider>
        </ProductExtensionPluginsProvider>
    );
};

describe("<ProductListItem /> render product list item", () => {
    it("should render product list item autocomplete and accordion", () => {
        renderProductListItemComponent();

        expect(
            screen.getByTestId("ProductAutocompleteWithIdsHF__autocomplete")
        ).toBeInTheDocument();
        expect(screen.getByTestId("AccordionSummaryBase__expandIcon")).toBeInTheDocument();
        expect(screen.getByTestId("AccordionSummaryBase__content")).toBeInTheDocument();
    });

    it("should hide the product details when clicking accordion icon", () => {
        renderProductListItemComponent();

        expect(screen.getByTestId("AccordionSummaryBase__root")).toHaveAttribute(
            "aria-expanded",
            "true"
        );

        userEvent.click(screen.getByTestId("AccordionSummaryBase__expandIcon"));

        expect(screen.getByTestId("AccordionSummaryBase__root")).toHaveAttribute(
            "aria-expanded",
            "false"
        );
    });

    it("should render accordion for product, package courses, and associated products and hide data on click", () => {
        renderProductListItemComponent(packageTypeProductListItemProps);

        const accordions = screen.getAllByTestId("AccordionSummaryBase__root");
        expect(accordions.length).toEqual(3);

        accordions.forEach((accordion) => {
            expect(accordion).toHaveAttribute("aria-expanded", "true");

            userEvent.click(accordion);

            expect(accordion).toHaveAttribute("aria-expanded", "false");
        });
    });
});
