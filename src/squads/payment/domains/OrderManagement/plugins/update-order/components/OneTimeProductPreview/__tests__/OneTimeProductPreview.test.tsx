import {
    KeyProductTypes,
    KeyDiscountAmountTypes,
    KeyDiscountTypes,
} from "src/squads/payment/constants/const";
import { ProductListItemStatus } from "src/squads/payment/constants/enum";
import { ProductsFormValues } from "src/squads/payment/types/form/order-form-types";
import { ProductPriceType } from "src/squads/payment/types/service/price-types";
import { ProductMaterialType } from "src/squads/payment/types/service/product-material-types";

import OneTimeProductPreview, {
    OneTimeProductPreviewProps,
} from "src/squads/payment/domains/OrderManagement/plugins/update-order/components/OneTimeProductPreview/OneTimeProductPreview";

import { render } from "@testing-library/react";

const product = {
    product_id: "product_id_1",
    name: "Update Order Product Testing",
    product_type: KeyProductTypes.PRODUCT_TYPE_MATERIAL,
    tax_id: "tax_id_1",
    available_from: "2021-12-28T02:35:17.738471+00:00",
    available_until: "2022-12-28T02:35:17.738471+00:00",
    billing_schedule_id: "billing_schedule_id_1",
    disable_pro_rating_flag: false,
    updated_at: "2021-12-28T02:35:17.738675+00:00",
    created_at: "2021-12-28T02:35:17.738675+00:00",
};

const productTax = {
    tax_category: "TAX_CATEGORY_INCLUSIVE",
    tax_percentage: 10,
};

const material: ProductMaterialType = {
    material_type: "MATERIAL_TYPE_ONE_TIME",
};

const mockOneTimeProductPrices: ProductPriceType[] = [
    {
        product_price_id: 1,
        product_id: "product_id_1",
        price: 1000,
        created_at: "2021-12-28T02:35:18.03406+00:00",
    },
];

const discount = {
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

const mockEffectiveDate = "2022-08-18T02:35:17.738471+00:00";
const mockProductFieldArrayValue: ProductsFormValues = {
    product,
    material,
    productPrices: mockOneTimeProductPrices,
    productTax,
    discount,
    updateOrderDetails: {
        orderStatus: ProductListItemStatus.ACTIVE,
        effectiveDate: new Date(mockEffectiveDate),
        billItems: [],
    },
};

const mockNoDiscountProductFieldArrayValue: ProductsFormValues = {
    product,
    material,
    productPrices: mockOneTimeProductPrices,
    productTax,
    discount: null,
    updateOrderDetails: {
        orderStatus: ProductListItemStatus.ACTIVE,
        effectiveDate: new Date(mockEffectiveDate),
        billItems: [],
    },
};

const defaultOneTimeProductPreviewProps: OneTimeProductPreviewProps = {
    productFieldArrayItem: mockProductFieldArrayValue,
};

const noDiscountOneTimeProductPreviewProps: OneTimeProductPreviewProps = {
    productFieldArrayItem: mockNoDiscountProductFieldArrayValue,
};

const hasEffectiveDateOneTimeProductPreviewProps: OneTimeProductPreviewProps = {
    productFieldArrayItem: mockProductFieldArrayValue,
    hasEffectiveDate: true,
};

const renderOneTimeProductPreview = (
    oneTimeProductPreviewProps: OneTimeProductPreviewProps = defaultOneTimeProductPreviewProps
) => {
    return render(<OneTimeProductPreview {...oneTimeProductPreviewProps} />);
};

describe("<OneTimeProductPreview/> for Update Order", () => {
    it("should render discount name for one time product preview with discount", () => {
        const wrapper = renderOneTimeProductPreview();

        const expectedValues = {
            discountName: "Discount name",
        };

        expect(wrapper.getByText(expectedValues.discountName)).toBeInTheDocument();
    });

    it("should render -- on discount for one time product preview without discount", () => {
        const wrapper = renderOneTimeProductPreview(noDiscountOneTimeProductPreviewProps);

        const expectedValues = {
            originalDiscountName: "Discount name",
            updatedDiscountName: "--",
        };

        expect(wrapper.getByText(expectedValues.updatedDiscountName)).toBeInTheDocument();
        expect(wrapper.queryByText(expectedValues.originalDiscountName)).not.toBeInTheDocument();
    });

    it("should render effective date if hasEffectiveDate is true ", () => {
        const wrapper = renderOneTimeProductPreview(hasEffectiveDateOneTimeProductPreviewProps);

        const expectedValues = {
            effectiveDate: "2022/08/18",
            discountName: "Discount name",
        };

        expect(wrapper.getByText(expectedValues.discountName)).toBeInTheDocument();
        expect(wrapper.getByText(expectedValues.effectiveDate)).toBeInTheDocument();
    });
});
