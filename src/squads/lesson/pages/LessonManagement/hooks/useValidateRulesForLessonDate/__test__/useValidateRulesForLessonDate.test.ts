import { UseFormClearErrors, UseFormReturn, useFormState, useWatch } from "react-hook-form";

import { useFormContext } from "src/components/Forms/HookForm";

import { renderHook } from "@testing-library/react-hooks";
import { LessonManagementUpsertFormType } from "src/squads/lesson/pages/LessonManagement/common/types";
import useValidateRulesForLessonDate from "src/squads/lesson/pages/LessonManagement/hooks/useValidateRulesForLessonDate";

jest.mock("react-hook-form", () => {
    const originalModule = jest.requireActual("react-hook-form");

    return {
        __esModule: true,
        ...originalModule,
        useFormContext: jest.fn(),
        useWatch: jest.fn(),
        useFormState: jest.fn(),
    };
});

describe("useValidateRulesForLessonDate", () => {
    it("should show error when endDate comes before startDate", () => {
        const startDate = new Date("2022-01-01T15:00:00.000");
        const endDate = new Date("2022-01-01T15:00:00.000");
        (useFormContext as jest.Mock).mockImplementation(() => {
            return {
                clearErrors: jest.fn() as UseFormClearErrors<LessonManagementUpsertFormType>,
            } as UseFormReturn<LessonManagementUpsertFormType>;
        });

        (useWatch as jest.Mock).mockReturnValue([startDate, endDate]);

        (useFormState as jest.Mock).mockReturnValue({
            errors: {
                endDate: "error",
            },
        });

        const { result } = renderHook(() => useValidateRulesForLessonDate());

        const { current } = result;

        expect(current.rulesForStartDate().validate(startDate)).toEqual(
            "resources.lesson_management.errors.startDateMustComeBeforeEndDate"
        );
        expect(current.rulesForEndDate(true).validate(endDate)).toEqual(
            "resources.lesson_management.errors.startDateMustComeBeforeEndDate"
        );
    });

    it("should show error when endDate is null", () => {
        const startDate = new Date("2022-01-01T15:00:00.000");
        const endDate = null;
        (useFormContext as jest.Mock).mockImplementation(() => {
            return {
                clearErrors: jest.fn() as UseFormClearErrors<LessonManagementUpsertFormType>,
            } as UseFormReturn<LessonManagementUpsertFormType>;
        });

        (useWatch as jest.Mock).mockReturnValue([startDate, endDate]);

        (useFormState as jest.Mock).mockReturnValue({
            errors: {
                endDate: "error",
            },
        });

        const { result } = renderHook(() => useValidateRulesForLessonDate());

        const { current } = result;

        expect(current.rulesForStartDate().validate(startDate)).toBeUndefined();
        expect(current.rulesForEndDate(true).validate(endDate)).toEqual(
            "resources.input.error.required"
        );
    });
});
