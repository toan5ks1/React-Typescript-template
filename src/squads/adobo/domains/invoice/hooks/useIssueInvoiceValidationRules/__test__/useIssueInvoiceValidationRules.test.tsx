import { DateTime } from "luxon";
import { FieldPath, UseFormClearErrors, useFormContext, UseFormReturn } from "react-hook-form";
import { FormIssueInvoiceValues } from "src/squads/adobo/domains/invoice/common/types/invoice";

import { renderHook } from "@testing-library/react-hooks";
import useIssueInvoiceValidationRules from "src/squads/adobo/domains/invoice/hooks/useIssueInvoiceValidationRules/useIssueInvoiceValidationRules";

jest.mock("react-hook-form", () => {
    const originalModule = jest.requireActual("react-hook-form");

    return {
        __esModule: true,
        ...originalModule,
        useFormContext: jest.fn(),
    };
});

describe(useIssueInvoiceValidationRules.name, () => {
    const validations = {
        required: {
            value: true,
            message: "resources.input.error.required",
        },
    };

    const recordForm: FormIssueInvoiceValues = {
        dueDate: "",
        expiryDate: "",
        paymentMethod: "",
        remarks: "",
    };

    it("should validate required fields when empty", () => {
        (useFormContext as jest.Mock).mockImplementation(() => {
            return {
                getValues: (fields: FieldPath<FormIssueInvoiceValues>) => {
                    return recordForm[fields];
                },
                clearErrors: jest.fn() as UseFormClearErrors<FormIssueInvoiceValues>,
            } as UseFormReturn<FormIssueInvoiceValues>;
        });

        const {
            result: { current },
        } = renderHook(() => useIssueInvoiceValidationRules());

        expect(current.required).toEqual(validations.required);
    });

    it("should return validation errors when due date is after expiry date", () => {
        const newRecordForm: FormIssueInvoiceValues = {
            ...recordForm,
            dueDate: DateTime.local().plus({ days: 2 }).toString(),
            expiryDate: DateTime.local().plus({ days: 1 }).toString(),
        };

        (useFormContext as jest.Mock).mockImplementation(() => {
            return {
                getValues: (fields: FieldPath<FormIssueInvoiceValues>) => {
                    return newRecordForm[fields];
                },
                clearErrors: jest.fn() as UseFormClearErrors<FormIssueInvoiceValues>,
            } as UseFormReturn<FormIssueInvoiceValues>;
        });

        const {
            result: { current },
        } = renderHook(() => useIssueInvoiceValidationRules());

        expect(current.validate.dueDate(newRecordForm.dueDate as Date)).toEqual(
            "resources.invoice.validations.dueDateAfterExpiryDate"
        );
    });
});
