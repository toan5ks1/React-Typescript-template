import { mockTimesheetUpsertInfoForm } from "src/squads/timesheet/test-utils/mocks/timesheet";

import { act } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { initializeOtherWorkingHour } from "src/squads/timesheet/common/helpers/otherWorkingHours";
import useOtherWorkingHoursFieldArray from "src/squads/timesheet/modules/timesheet-upsert/hooks/useOtherWorkingHoursFieldArray/useOtherWorkingHoursFieldArray";

const mockOtherWorkingHour = mockTimesheetUpsertInfoForm.otherWorkingHours[0];

jest.mock("react-hook-form", () => {
    const originalModule = jest.requireActual("react-hook-form");

    return {
        __esModule: true,
        ...originalModule,
        useFormContext: () => ({
            watch: () => [mockOtherWorkingHour],
            control: {},
        }),
        useFieldArray: () => ({
            fields: [mockOtherWorkingHour],
            append: jest.fn(),
            remove: jest.fn(),
            update: jest.fn(),
        }),
    };
});

describe("useOtherWorkingHoursFieldArray", () => {
    it("should work correctly", () => {
        const { result } = renderHook(() => useOtherWorkingHoursFieldArray());

        expect(result.current.otherWorkingHours).toEqual([mockOtherWorkingHour]);

        act(() => result.current.onAdd());
        expect(result.current.append).toBeCalledTimes(1);
        expect(result.current.append).toBeCalledWith(initializeOtherWorkingHour());

        act(() => result.current.onDelete([mockOtherWorkingHour]));
        expect(result.current.remove).toBeCalledTimes(1);

        act(() => result.current.update(1, {}));
        expect(result.current.remove).toBeCalledTimes(1);
    });
});
