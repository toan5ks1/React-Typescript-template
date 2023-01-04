import { UseFormProps } from "react-hook-form";
import { ProductListItemStatus } from "src/squads/payment/constants/enum";
import { getCurrentCurrency } from "src/squads/payment/helpers/price";
import { createMockCompleteOrderFormValues } from "src/squads/payment/test-utils/mocks/order-form";
import { createMockProductsManyChoices } from "src/squads/payment/test-utils/mocks/products";
import { getAutocompleteInputByTestId } from "src/squads/payment/test-utils/utils";
import { ProductTypeQuery } from "src/squads/payment/types/service/product-types";
import { getDateWithZeroMilliseconds } from "src/squads/payment/utils/date";

import { MAutocompleteServiceHookReturn } from "src/components/Autocompletes/MAutocompleteService";
import ProductListItem, {
    ProductListItemProps,
} from "src/squads/payment/components/Sections/ProductListSection/ProductListItem";
import { updateOrderNotImplementedYetPlugins } from "src/squads/payment/domains/OrderManagement/plugins/common/components/NotImplementedYetPlugins";

import { OrderType } from "manabuf/payment/v1/enums_pb";

import { render, within } from "@testing-library/react";
import MuiPickersUtilsProvider from "src/squads/payment/contexts/MuiPickersUtilsProvider";
import ProductExtensionPluginsProvider from "src/squads/payment/domains/OrderManagement/plugins/new-order";
import TestApp from "src/squads/payment/test-utils/TestApp";
import TestHookFormProvider from "src/squads/payment/test-utils/TestHookFormProvider";

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

const mockOrderFormValues = createMockCompleteOrderFormValues();
const { currentCurrency: currency } = getCurrentCurrency();

const defaultOrderFormProductOption: UseFormProps = {
    defaultValues: { ...mockOrderFormValues },
};

const materialProductIndex = 1;
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

const currentDate = getDateWithZeroMilliseconds();
const cancelledProductListItemProps: ProductListItemProps = {
    productFieldItem: {
        id: "field_item_1",
        ...mockOrderFormValues.students[firstStudentIndex].productFieldArrayItems[
            materialProductIndex
        ],
        updateOrderDetails: {
            effectiveDate: currentDate,
            orderStatus: ProductListItemStatus.CANCELLED,
            billItems: [],
        },
    },
    productIndex: materialProductIndex,
    productIds: ["product_id_1", "product_id_2", "product_id_3", "product_id_4"],
    selectedProductIds: ["product_id_3", "product_id_4"],
    studentIndex: firstStudentIndex,
};

const renderProductListItemComponentUpdateOrder = (
    productListItemProps: ProductListItemProps = defaultProductListItemProps,
    useFormProps: UseFormProps = defaultOrderFormProductOption
) => {
    return render(
        <ProductExtensionPluginsProvider
            currency={currency}
            orderType={OrderType.ORDER_TYPE_UPDATE}
            notImplementedYetPlugins={updateOrderNotImplementedYetPlugins}
        >
            <MuiPickersUtilsProvider>
                <TestApp>
                    <TestHookFormProvider useFormOptions={useFormProps}>
                        <ProductListItem {...productListItemProps} />
                    </TestHookFormProvider>
                </TestApp>
            </MuiPickersUtilsProvider>
        </ProductExtensionPluginsProvider>
    );
};

describe("<ProductListItem /> render product list item for update order", () => {
    it("should have product list item as readOnly", () => {
        renderProductListItemComponentUpdateOrder();

        const { autocompleteInput } = getAutocompleteInputByTestId(
            "ProductAutocompleteWithIdsHF__autocomplete"
        );
        expect(autocompleteInput).toHaveAttribute("readonly");
    });

    it("should have cancelled tag for product list item with cancelled status", () => {
        renderProductListItemComponentUpdateOrder(cancelledProductListItemProps);

        const { autocompleteWrapper } = getAutocompleteInputByTestId(
            "ProductAutocompleteWithIdsHF__autocomplete"
        );
        expect(within(autocompleteWrapper).getByText("[Cancelled]")).toBeInTheDocument();
    });
});
