import { createMockCustomBillingOrderFormValue } from "src/squads/payment/test-utils/mocks/order-form-custom-billing";
import { BillingFieldArrayItemType } from "src/squads/payment/types/form/custom-billing-types";

import { renderHook } from "@testing-library/react-hooks";
import useCustomBillingOrderValidationRules, {
    useCustomBillingOrderValidationRulesReturn,
} from "src/squads/payment/hooks/useCustomBillingOrderValidationRules/useCustomBillingOrderValidationRules";

const mockCustomBillingOrderFormValue = createMockCustomBillingOrderFormValue();

const formErrorTypeCase = [
    {
        errors: {
            billingFieldArrayItem: [
                {
                    name: {
                        type: "required",
                        message: "",
                    },
                    price: {
                        type: "required",
                        message: "",
                    },
                },
                {
                    name: {
                        type: "required",
                        message: "",
                    },
                    price: {
                        type: "required",
                        message: "",
                    },
                },
            ],
        },
        result: "ra.validation.requiredAll",
    },
    {
        errors: {
            billingFieldArrayItem: [
                {
                    name: {
                        type: "required",
                        message: "",
                    },
                    price: {
                        type: "required",
                        message: "",
                    },
                },
                {
                    name: {
                        type: "required",
                        message: "",
                    },
                    price: {
                        type: "pattern",
                        message: "",
                    },
                },
            ],
        },
        result: "resources.orders.message.error.incorrectFormatField",
    },
    {
        errors: {
            billingFieldArrayItem: undefined,
        },
        result: null,
    },
];

let current: useCustomBillingOrderValidationRulesReturn | null = null;

describe("useCustomBillingOrderValidationRules", () => {
    beforeEach(() => {
        const { result } = renderHook(() => useCustomBillingOrderValidationRules());
        current = result.current;
    });

    it("should validate inputs and return error on billingArrayItems", () => {
        if (!current) {
            return;
        }

        const emptyBillingFieldArrayItem: BillingFieldArrayItemType[] = [];

        const { isError, errorMessage } = current.billingItemArrayTable.validate(
            emptyBillingFieldArrayItem
        );

        expect(isError).toBeTruthy();
        expect(errorMessage).toEqual("resources.orders.message.error.requiredSection");
    });

    it("should return correct billingErrorMessage message when there are error message and array has error", () => {
        if (!current) {
            return;
        }

        const billingErrorMessage = "This section is required";
        expect(
            current.billingItemArrayTable.getErrorMessage(
                billingErrorMessage,
                formErrorTypeCase[0].errors
            )
        ).toEqual(billingErrorMessage);
    });

    it("should validate inputs and not return error on valid inputs", () => {
        if (!current) {
            return;
        }

        const { isError, errorMessage } = current.billingItemArrayTable.validate(
            mockCustomBillingOrderFormValue.billingFieldArrayItem
        );

        expect(isError).toBeFalsy();
        expect(errorMessage).toBeNull();
    });

    test.each(formErrorTypeCase)(
        "it should return correct validate error message when billingItemArrayTable has errors formState",
        ({ errors, result }) => {
            if (!current) {
                return;
            }
            const billingErrorMessage = null;
            expect(
                current.billingItemArrayTable.getErrorMessage(billingErrorMessage, errors)
            ).toEqual(result);
        }
    );
});
