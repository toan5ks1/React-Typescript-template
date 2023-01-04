import { DateTime } from "luxon";
import { FieldPath, UseFormClearErrors, useFormContext, UseFormReturn } from "react-hook-form";
import { dateIsSame, formatDate } from "src/common/utils/time";
import { EntryExitRecordFormData } from "src/squads/adobo/domains/entry-exit/common/types/entry-exit";
import { getMockEntryExitRecordFormData } from "src/squads/adobo/domains/entry-exit/test-utils/mocks/entry-exit";

import { renderHook } from "@testing-library/react-hooks";
import useEntryExitRecordValidationRules from "src/squads/adobo/domains/entry-exit/modules/student-entryexit/hooks/useEntryExitRecordValidationRules";

jest.mock("react-hook-form", () => {
    const originalModule = jest.requireActual("react-hook-form");

    return {
        __esModule: true,
        ...originalModule,
        useFormContext: jest.fn(),
    };
});

describe("useEntryExitRecordValidationRules hook", () => {
    const mockDate = "2022-03-04T11:00:00.000";

    const translateResource = (key: string) => key;

    it("should display error message if exit time is earlier than entry time", () => {
        const recordForm: EntryExitRecordFormData = getMockEntryExitRecordFormData(mockDate);

        recordForm.exitTime = new Date("2022-03-04T06:00:00.000Z");

        (useFormContext as jest.Mock).mockImplementation(() => {
            return {
                getValues: (fields: FieldPath<EntryExitRecordFormData>) => {
                    return recordForm[fields];
                },
                clearErrors: jest.fn() as UseFormClearErrors<EntryExitRecordFormData>,
            } as UseFormReturn<EntryExitRecordFormData>;
        });

        const {
            result: { current },
        } = renderHook(() => useEntryExitRecordValidationRules(translateResource));

        expect(current.entryTime.validate(recordForm.entryTime)).toEqual(
            "form.error.entryEarlierThanExit"
        );
    });

    it("should not return validation errors when exit time is after entry time", () => {
        const recordForm: EntryExitRecordFormData = getMockEntryExitRecordFormData(mockDate);

        recordForm.exitTime = new Date("2022-03-04T16:00:00.000Z");

        (useFormContext as jest.Mock).mockImplementation(() => {
            return {
                getValues: (fields: FieldPath<EntryExitRecordFormData>) => {
                    return recordForm[fields];
                },
                clearErrors: jest.fn() as UseFormClearErrors<EntryExitRecordFormData>,
            } as UseFormReturn<EntryExitRecordFormData>;
        });

        const {
            result: { current },
        } = renderHook(() => useEntryExitRecordValidationRules(translateResource));

        expect(current.entryTime.validate(recordForm.entryTime)).not.toEqual(
            "form.error.entryEarlierThanExit"
        );
    });

    it("should display error message if exit time is beyond the current time when date today is selected", () => {
        const recordForm: EntryExitRecordFormData = getMockEntryExitRecordFormData(
            formatDate(Date.now(), "yyyy/LL/dd")
        );

        recordForm.exitTime = new Date(+new Date() + 60000 * 15); // + 15 minutes

        (useFormContext as jest.Mock).mockImplementation(() => {
            return {
                getValues: (fields: FieldPath<EntryExitRecordFormData>) => {
                    return recordForm[fields];
                },
                clearErrors: jest.fn() as UseFormClearErrors<EntryExitRecordFormData>,
            } as UseFormReturn<EntryExitRecordFormData>;
        });

        const {
            result: { current },
        } = renderHook(() => useEntryExitRecordValidationRules(translateResource));

        if (dateIsSame(DateTime.now().toJSDate(), recordForm.exitTime)) {
            expect(current.exitTime.validate(recordForm.exitTime)).toEqual(
                "form.error.exitTimeIsFuture"
            );
        }
    });

    it("should display error message if entry time is beyond the current time when date today is selected", () => {
        const recordForm: EntryExitRecordFormData = getMockEntryExitRecordFormData(
            formatDate(Date.now(), "yyyy/LL/dd")
        );

        recordForm.entryTime = new Date(+new Date() + 60000 * 15); // + 15 minutes

        (useFormContext as jest.Mock).mockImplementation(() => {
            return {
                getValues: (fields: FieldPath<EntryExitRecordFormData>) => {
                    return recordForm[fields];
                },
                clearErrors: jest.fn() as UseFormClearErrors<EntryExitRecordFormData>,
            } as UseFormReturn<EntryExitRecordFormData>;
        });

        const {
            result: { current },
        } = renderHook(() => useEntryExitRecordValidationRules(translateResource));

        if (dateIsSame(DateTime.now().toJSDate(), recordForm.entryTime)) {
            expect(current.entryTime.validate(recordForm.entryTime)).toEqual(
                "form.error.entryTimeIsFuture"
            );
        }
    });
});
