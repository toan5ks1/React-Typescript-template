import { KeyProductTypes } from "src/squads/payment/constants/const";
import { Payment_GetEnrollmentProductIdsByProductIdsQuery } from "src/squads/payment/service/fatima/fatima-types";
import {
    createMockProductFeeList,
    createMockProductPriceList,
} from "src/squads/payment/test-utils/mocks/products";
import { createMockTaxDataList } from "src/squads/payment/test-utils/mocks/tax";
import { ProductsFormValues } from "src/squads/payment/types/form/order-form-types";
import { ProductTypeQuery } from "src/squads/payment/types/service/product-types";

const enrollmentProduct: ProductTypeQuery = {
    product_id: "product_id_1",
    name: "Enrollment Product Testing",
    product_type: KeyProductTypes.PRODUCT_TYPE_FEE,
    tax_id: "tax_id_1",
    available_from: "2021-12-28T02:35:17.738471+00:00",
    available_until: "2022-12-28T02:35:17.738471+00:00",
    remarks: "Remark 1",
    billing_schedule_id: "billing_schedule_id_1",
    disable_pro_rating_flag: false,
    updated_at: "2021-12-28T02:35:17.738675+00:00",
    created_at: "2021-12-28T02:35:17.738675+00:00",
};

const defaultEnrollmentProductFormValues: ProductsFormValues[] = [
    {
        product: enrollmentProduct,
        fee: createMockProductFeeList()[0],
        productTax: createMockTaxDataList()[0],
        productPrices: createMockProductPriceList(),
    },
];

const enrollmentProductIds: Payment_GetEnrollmentProductIdsByProductIdsQuery["product_setting"] = [
    {
        product_id: "product_id_1",
    },
    {
        product_id: "product_id_2",
    },
    {
        product_id: "product_id_3",
    },
];

export const mockEnrollmentProductFormValues = (): ProductsFormValues[] =>
    defaultEnrollmentProductFormValues;

export const createMockEnrollmentProductIds =
    (): Payment_GetEnrollmentProductIdsByProductIdsQuery["product_setting"] => enrollmentProductIds;
