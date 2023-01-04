import { FieldPath, UseFormClearErrors, useFormContext, UseFormReturn } from "react-hook-form";
import { createMockCenterChoices } from "src/squads/payment/test-utils/mocks/location";
import { createMockStudentInfo } from "src/squads/payment/test-utils/mocks/student";
import { OrderFormValues } from "src/squads/payment/types/form/order-form-types";

const mockStudentInfo = createMockStudentInfo();
const mockCenterChoices = createMockCenterChoices();

const orderFormData: OrderFormValues = {
    students: [
        {
            studentInfo: mockStudentInfo,
            productFieldArrayItems: [],
            comment: "Test comment create order",
        },
    ],
    location: mockCenterChoices[0],
};

jest.mock("react-hook-form", () => {
    const originalModule = jest.requireActual("react-hook-form");

    return {
        __esModule: true,
        ...originalModule,
        useFormContext: jest.fn(),
        useFieldArray: jest.fn(),
    };
});

(useFormContext as jest.Mock).mockImplementation(() => {
    return {
        getValues: (fields: FieldPath<OrderFormValues>) => {
            return orderFormData[fields];
        },
        clearErrors: jest.fn() as UseFormClearErrors<OrderFormValues>,
    } as UseFormReturn<OrderFormValues>;
});

describe("useOrderValidationRules hook", () => {
    //  TODO: add test case for useOrderValidationRules hook
    // https://manabie.atlassian.net/browse/LT-19162
    // Test suite must contain at least one test
    it("should a default test case", () => {
        expect("Test").toBeTruthy();
    });
});
