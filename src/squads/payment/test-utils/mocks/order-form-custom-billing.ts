import { createMockCenterChoices } from "src/squads/payment/test-utils/mocks/location";
import { createMockStudentInfo } from "src/squads/payment/test-utils/mocks/student";
import { CustomBillingOrderFormValue } from "src/squads/payment/types/form/custom-billing-types";
import { CustomBillingTaxType } from "src/squads/payment/types/service/tax-types";

export const createMockCustomBillingOrderFormValue = (
    taxItem?: CustomBillingTaxType
): CustomBillingOrderFormValue => {
    return {
        student: createMockStudentInfo(),
        location: createMockCenterChoices()[0],
        comment: "",
        billingFieldArrayItem: [
            {
                name: "Billing Item 1",
                taxItem,
                price: 100,
            },
            {
                name: "Billing Item 2",
                taxItem,
                price: 200,
            },
        ],
    };
};
