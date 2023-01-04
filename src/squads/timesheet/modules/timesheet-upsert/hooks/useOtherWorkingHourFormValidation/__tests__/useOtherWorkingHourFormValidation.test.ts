import { useFormContext, useFormState, Validate } from "react-hook-form";
import { TimeAutocompleteOption } from "src/squads/timesheet/common/types";

import TranslationProvider from "src/squads/timesheet/providers/TranslationProvider";

import { renderHook } from "@testing-library/react-hooks";
import useOtherWorkingHourFormValidation from "src/squads/timesheet/modules/timesheet-upsert/hooks/useOtherWorkingHourFormValidation/useOtherWorkingHourFormValidation";

jest.mock("react-hook-form", () => {
    const originalModule = jest.requireActual("react-hook-form");
    return {
        __esModule: true,
        ...originalModule,
        useFormContext: jest.fn(),
        useFormState: jest.fn(),
    };
});

describe("useOtherWorkingHourFormValidation", () => {
    const clearErrors = jest.fn();
    const setError = jest.fn();
    const mockFormContext = (
        startTimeError: boolean,
        endTimeError: boolean,
        startTimeAutocomplete?: TimeAutocompleteOption,
        endTimeAutocomplete?: TimeAutocompleteOption
    ) => {
        (useFormContext as jest.Mock).mockImplementation(() => {
            return {
                watch: () => [
                    {
                        startTimeAutocomplete,
                        endTimeAutocomplete,
                    },
                ],
                clearErrors,
                setError,
            };
        });
        (useFormState as jest.Mock).mockImplementation(() => {
            return {
                errors: {
                    otherWorkingHours: [
                        {
                            startTimeAutocomplete: startTimeError,
                            endTimeAutocomplete: endTimeError,
                        },
                    ],
                },
            };
        });
    };

    it("should return correct data", () => {
        const { result } = renderHook(() => useOtherWorkingHourFormValidation(), {
            wrapper: TranslationProvider,
        });

        const workingType = result.current.validate.workingTypeAutocomplete?.validate;

        expect(typeof workingType).toBe("function");
        expect(typeof result.current.validate.useStartTimeAutocompleteRules).toBe("function");
        expect(typeof result.current.validate.useEndTimeAutocompleteRules).toBe("function");
    });

    it("should only validate required when start time or end time is not filled", () => {
        mockFormContext(false, false, undefined, {
            label: "20:00",
            value: new Date("2022-04-09T20:00:00+00:00"),
        });
        const { result } = renderHook(() => useOtherWorkingHourFormValidation(), {
            wrapper: TranslationProvider,
        });
        const startTimeRules = result.current.validate.useStartTimeAutocompleteRules(0);

        const startTimeRulesValidate = startTimeRules?.validate as Validate<TimeAutocompleteOption>;
        expect(typeof startTimeRulesValidate).toBe("function");

        const endTimeRules = result.current.validate.useStartTimeAutocompleteRules();

        const endTimeRulesValidate = endTimeRules?.validate as Validate<TimeAutocompleteOption>;
        expect(typeof endTimeRulesValidate).toBe("function");
    });

    it("should validate start time is before end time when both field are filled", () => {
        const startTimeAutocomplete: TimeAutocompleteOption = {
            label: "22:00",
            value: new Date("2022-04-09T22:00:00+00:00"),
        };
        const endTimeAutocomplete: TimeAutocompleteOption = {
            label: "20:00",
            value: new Date("2022-04-09T20:00:00+00:00"),
        };
        mockFormContext(false, false, startTimeAutocomplete, endTimeAutocomplete);

        const { result } = renderHook(() => useOtherWorkingHourFormValidation(), {
            wrapper: TranslationProvider,
        });

        const startTimeRules = result.current.validate.useStartTimeAutocompleteRules(0);
        const startTimeRulesValidate = startTimeRules?.validate as Validate<TimeAutocompleteOption>;
        expect(typeof startTimeRulesValidate).toBe("function");
        expect(startTimeRulesValidate(startTimeAutocomplete)).toEqual(
            "Start Time must come before End Time"
        );

        const endTimeRules = result.current.validate.useEndTimeAutocompleteRules(0);
        const endTimeRulesValidate = endTimeRules?.validate as Validate<TimeAutocompleteOption>;
        expect(typeof endTimeRulesValidate).toBe("function");
        expect(endTimeRulesValidate(endTimeAutocomplete)).toEqual("");
    });
});
