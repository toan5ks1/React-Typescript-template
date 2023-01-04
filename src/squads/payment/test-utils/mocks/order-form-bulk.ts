import { createMockDiscountChoices } from "src/squads/payment/test-utils/mocks/discount";
import { createMockCenterChoices } from "src/squads/payment/test-utils/mocks/location";
import {
    createMockProductChoices,
    createMockProductMaterialList,
    createMockProductPackageList,
    createMockProductPriceList,
} from "src/squads/payment/test-utils/mocks/products";
import { createMockStudentInfo } from "src/squads/payment/test-utils/mocks/student";
import { createMockTaxDataList } from "src/squads/payment/test-utils/mocks/tax";
import { OrderFormValues } from "src/squads/payment/types/form/order-form-types";

const multipleStudent: OrderFormValues["students"] = [
    {
        studentInfo: createMockStudentInfo(0),
        productFieldArrayItems: [
            {
                product: createMockProductChoices()[0],
                packageEntity: createMockProductPackageList()[0],
                productPrices: createMockProductPriceList(),
                productTax: createMockTaxDataList()[0],
                discount: createMockDiscountChoices()[0],
            },
        ],
        comment: "test comment",
    },
    {
        studentInfo: createMockStudentInfo(1),
        productFieldArrayItems: [
            {
                product: createMockProductChoices()[1],
                material: createMockProductMaterialList()[0],
                productPrices: createMockProductPriceList(),
                productTax: createMockTaxDataList()[0],
                discount: createMockDiscountChoices()[0],
            },
        ],
        comment: "test comment",
    },
];

export const createMockBulkOrderFormValues = (): OrderFormValues => {
    return {
        students: multipleStudent,
        location: createMockCenterChoices()[0],
    };
};
