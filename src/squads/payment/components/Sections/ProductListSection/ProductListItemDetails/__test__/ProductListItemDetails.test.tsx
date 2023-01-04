import { UseFormProps } from "react-hook-form";
import { formatDate } from "src/common/utils/time";
import { KeyProductMaterialTypes } from "src/squads/payment/constants/const";
import { getCurrentCurrency } from "src/squads/payment/helpers/price";
import { createMockOrderFormValues } from "src/squads/payment/test-utils/mocks/order-form";
import { createMockProductChoices } from "src/squads/payment/test-utils/mocks/products";
import { OrderFormValues } from "src/squads/payment/types/form/order-form-types";

import ProductListItemDetails, {
    ProductListItemDetailsProps,
} from "src/squads/payment/components/Sections/ProductListSection/ProductListItemDetails";
import { defaultNotImplementedYetPlugins } from "src/squads/payment/domains/OrderManagement/plugins/common/components/NotImplementedYetPlugins";

import { OrderType } from "manabuf/payment/v1/enums_pb";

import { render } from "@testing-library/react";
import MuiPickersUtilsProvider from "src/squads/payment/contexts/MuiPickersUtilsProvider";
import ProductExtensionPluginsProvider from "src/squads/payment/domains/OrderManagement/plugins/new-order";
import TestApp from "src/squads/payment/test-utils/TestApp";
import TestHookFormProvider from "src/squads/payment/test-utils/TestHookFormProvider";
import TestQueryWrapper from "src/squads/payment/test-utils/TestQueryWrapper";

jest.mock("src/hooks/useAutocompleteReference");

const mockProductChoices = createMockOrderFormValues();
const { currentCurrency: currency } = getCurrentCurrency();

const defaultOrderFormProductOption: UseFormProps<OrderFormValues> = {
    defaultValues: { ...mockProductChoices },
};

const defaultOrderFormNoProductOption: UseFormProps<OrderFormValues> = {
    defaultValues: {
        students: [
            {
                studentInfo: {},
                productFieldArrayItems: [
                    {
                        product: undefined,
                    },
                ],
            },
        ],
    },
};

const firstStudentIndex = 0;
const firstProductIndex = 0;

const renderProductListItemDetails = (
    productListItemDetailsProps: ProductListItemDetailsProps,
    useFormOptions: UseFormProps<OrderFormValues> = defaultOrderFormProductOption
) => {
    return render(
        <TestApp>
            <TestQueryWrapper>
                <ProductExtensionPluginsProvider
                    currency={currency}
                    orderType={OrderType.ORDER_TYPE_NEW}
                    notImplementedYetPlugins={defaultNotImplementedYetPlugins}
                >
                    <MuiPickersUtilsProvider>
                        <TestHookFormProvider<OrderFormValues> useFormOptions={useFormOptions}>
                            <ProductListItemDetails {...productListItemDetailsProps} />
                        </TestHookFormProvider>
                    </MuiPickersUtilsProvider>
                </ProductExtensionPluginsProvider>
            </TestQueryWrapper>
        </TestApp>
    );
};

describe("<ProductListItemDetails />", () => {
    it("should render product list item details container", () => {
        const wrapper = renderProductListItemDetails({
            productIndex: firstProductIndex,
            studentIndex: firstStudentIndex,
        });

        expect(wrapper.getByTestId("ProductListItemDetails__root")).toBeInTheDocument();
    });

    it("should render package discount and start date when package is selected", () => {
        const wrapper = renderProductListItemDetails({
            productIndex: firstProductIndex,
            studentIndex: firstStudentIndex,
        });

        expect(wrapper.getByTestId("PackageProductDetails__packageInfo")).toBeInTheDocument();

        const productStartDate =
            mockProductChoices.students[firstStudentIndex].productFieldArrayItems[firstProductIndex]
                .packageEntity?.package_start_date;

        const formattedDate = formatDate(productStartDate, "yyyy/LL/dd");
        const dateInput = wrapper.getByTestId("DatePickerHF__input");

        expect(wrapper.getByTestId("DiscountsAutocompleteHF__autocomplete")).toBeInTheDocument();
        expect(dateInput).toHaveValue(formattedDate);
    });

    it("should render discount and custom date when product with material type is selected and there is custom billing date", () => {
        const customBillingDate = "2021-12-28T02:35:17.916498+00:00";
        const defaultValue: UseFormProps<OrderFormValues> = {
            defaultValues: {
                students: [
                    {
                        productFieldArrayItems: [
                            {
                                product: createMockProductChoices()[1],
                                material: {
                                    material_type: KeyProductMaterialTypes.MATERIAL_TYPE_ONE_TIME,
                                    custom_billing_date: customBillingDate,
                                },
                            },
                        ],
                    },
                ],
            },
        };
        const wrapper = renderProductListItemDetails(
            { productIndex: firstProductIndex, studentIndex: firstStudentIndex },
            defaultValue
        );

        const formattedDate = formatDate(customBillingDate, "yyyy/LL/dd");

        expect(wrapper.getByTestId("ProductListItemDetails__root")).toBeInTheDocument();
        expect(wrapper.getByTestId("ProductListItemDetails__productInfo")).toBeInTheDocument();
        const billingDate = wrapper.getByTestId("ProductListItemDetails__billingDate");

        expect(billingDate).toBeInTheDocument();
        expect(billingDate).toHaveTextContent(formattedDate);
    });

    it("should render discount and date today when product with material type is selected and there is no custom billing date", () => {
        const wrapper = renderProductListItemDetails({
            productIndex: 2,
            studentIndex: firstStudentIndex,
        });
        const formattedDate = formatDate(new Date(), "yyyy/LL/dd");

        expect(wrapper.getByTestId("ProductListItemDetails__root")).toBeInTheDocument();
        expect(wrapper.getByTestId("ProductListItemDetails__productInfo")).toBeInTheDocument();
        const billingDate = wrapper.getByTestId("ProductListItemDetails__billingDate");

        expect(billingDate).toBeInTheDocument();
        expect(billingDate).toHaveTextContent(formattedDate);
    });

    it("should return null when product extension information is missing", () => {
        const wrapper = renderProductListItemDetails({
            productIndex: 3,
            studentIndex: firstStudentIndex,
        });

        expect(wrapper.queryByTestId("NotImplementYet__label")).not.toBeInTheDocument();
        expect(wrapper.queryByTestId("ProductListItemDetails__root")).not.toBeInTheDocument();
    });

    it("should render discount and billing date today when product with fee type is selected", () => {
        const wrapper = renderProductListItemDetails({
            productIndex: 4,
            studentIndex: firstStudentIndex,
        });

        const formattedDate = formatDate(new Date(), "yyyy/LL/dd");

        expect(wrapper.getByTestId("ProductListItemDetails__root")).toBeInTheDocument();
        expect(wrapper.getByTestId("ProductListItemDetails__productInfo")).toBeInTheDocument();
        const billingDate = wrapper.getByTestId("ProductListItemDetails__billingDate");

        expect(billingDate).toBeInTheDocument();
        expect(billingDate).toHaveTextContent(formattedDate);
    });

    it("should render discount and date picker with empty value when choosing a recurring material product", () => {
        const wrapper = renderProductListItemDetails({
            productIndex: 5,
            studentIndex: firstStudentIndex,
        });

        expect(wrapper.getByTestId("ProductListItemDetails__root")).toBeInTheDocument();
        expect(wrapper.getByTestId("ProductListItemDetails__productInfo")).toBeInTheDocument();
        expect(wrapper.getByTestId("DiscountsAutocompleteHF__autocomplete")).toBeInTheDocument();
        expect(wrapper.getByTestId("DatePickerHF__input")).toBeInTheDocument();
        expect(wrapper.getByTestId("DatePickerHF__input")).toHaveTextContent("");
    });

    it("should not render when product is empty", () => {
        const wrapper = renderProductListItemDetails(
            { productIndex: firstProductIndex, studentIndex: firstStudentIndex },
            defaultOrderFormNoProductOption
        );

        expect(wrapper.queryByTestId("ProductListItemDetails__root")).not.toBeInTheDocument();
        expect(
            wrapper.queryByTestId("ProductListItemDetails__productInfo")
        ).not.toBeInTheDocument();
        expect(
            wrapper.queryByTestId("ProductListItemDetails__billingDate")
        ).not.toBeInTheDocument();
        expect(wrapper.queryByTestId("NotImplementYet__label")).not.toBeInTheDocument();
    });
});
