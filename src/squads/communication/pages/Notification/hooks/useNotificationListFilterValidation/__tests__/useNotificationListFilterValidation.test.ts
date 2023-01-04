import {
    getCurrentDateWithSpecificHour,
    getDateAfterDuration,
} from "src/squads/communication/common/utils/utils";
import { TimeAutocompleteOption } from "src/squads/communication/models/time-autocomplete";

import useNotificationListFilterValidation from "../useNotificationListFilterValidation";

import { renderHook } from "@testing-library/react-hooks";

const mockTimeReturnWithValue = (time: string): TimeAutocompleteOption => {
    return {
        label: time,
        value: getCurrentDateWithSpecificHour(time),
    };
};

describe("useNotificationListFilterValidation validate Date", () => {
    it("should show error message when To Date less than From Date", () => {
        const {
            result: { current },
        } = renderHook(() => useNotificationListFilterValidation());

        const fromDate = getDateAfterDuration(1);
        const toDate = getDateAfterDuration(-1);

        expect(current.fromDate(toDate).validate(fromDate)).toEqual(
            "resources.input.error.invalidFromDate"
        );
        expect(current.toDate(fromDate).validate(toDate)).toEqual(
            "resources.input.error.invalidToDate"
        );
    });

    test.each([
        [getDateAfterDuration(-1), getDateAfterDuration(1)],
        [getDateAfterDuration(1), getDateAfterDuration(1)],
    ])(
        "should pass Date validation when From Date less than or equal to To Date",
        (fromDate, toDate) => {
            const {
                result: { current },
            } = renderHook(() => useNotificationListFilterValidation());

            expect(current.fromDate(toDate).validate(fromDate)).toBeUndefined();
            expect(current.toDate(fromDate).validate(toDate)).toBeUndefined();
        }
    );
});

describe("useNotificationListFilterValidation validate Time", () => {
    it("should show error message when To Date equal to From Date and To Time less than From Time", () => {
        const {
            result: { current },
        } = renderHook(() => useNotificationListFilterValidation());

        const fromTime = mockTimeReturnWithValue("10:00");
        const toTime = mockTimeReturnWithValue("09:00");

        expect(
            current
                .fromTime({
                    fromDate: getDateAfterDuration(1),
                    toDate: getDateAfterDuration(1),
                    toTime: toTime,
                })
                .validate(fromTime)
        ).toEqual("resources.input.error.invalidFromTime");

        expect(
            current
                .toTime({
                    fromDate: new Date(),
                    toDate: new Date(),
                    fromTime: fromTime,
                })
                .validate(toTime)
        ).toEqual("resources.input.error.invalidToTime");
    });

    it("should pass Time validation when To date greater than From Date or From Date/To Date is null", () => {
        const {
            result: { current },
        } = renderHook(() => useNotificationListFilterValidation());

        const dateFields = [
            { fromDate: new Date(), toDate: getDateAfterDuration(7) },
            { fromDate: null, toDate: null },
        ];
        const fromTime = mockTimeReturnWithValue("10:00");
        const toTime = mockTimeReturnWithValue("09:00");

        dateFields.forEach((dateField) => {
            expect(
                current
                    .fromTime({
                        fromDate: dateField.fromDate,
                        toDate: dateField.toDate,
                        toTime: toTime,
                    })
                    .validate(fromTime)
            ).toBeUndefined();

            expect(
                current
                    .toTime({
                        fromDate: dateField.fromDate,
                        toDate: dateField.toDate,
                        fromTime: fromTime,
                    })
                    .validate(toTime)
            ).toBeUndefined();
        });
    });

    test.each([
        [mockTimeReturnWithValue("09:00"), mockTimeReturnWithValue("10:00")],
        [mockTimeReturnWithValue("10:00"), mockTimeReturnWithValue("10:00")],
    ])(
        "should pass Time validation when To Date equal to From Date and From Time less than or equal to To Time",
        (fromTime, toTime) => {
            const {
                result: { current },
            } = renderHook(() => useNotificationListFilterValidation());

            expect(
                current
                    .fromTime({
                        fromDate: new Date(),
                        toDate: new Date(),
                        toTime: toTime,
                    })
                    .validate(fromTime)
            ).toBeUndefined();

            expect(
                current
                    .toTime({
                        fromDate: new Date(),
                        toDate: new Date(),
                        fromTime: fromTime,
                    })
                    .validate(toTime)
            ).toBeUndefined();
        }
    );
});
