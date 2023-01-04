import { useCallback } from "react";

import { useFieldArray } from "react-hook-form";
import { TimesheetKeys } from "src/squads/timesheet/common/constants/timesheet";
import { OtherWorkingHour, UpsertTimesheetFormProps } from "src/squads/timesheet/common/types";

import { useFormContext } from "src/components/Forms/HookForm";

import { initializeOtherWorkingHour } from "src/squads/timesheet/common/helpers/otherWorkingHours";

export interface UseOtherWorkingHoursFieldArrayReturn {
    otherWorkingHours: OtherWorkingHour[];
    onAdd: () => void;
    onDelete: (records: OtherWorkingHour[]) => void;
    append: (otherWorkingHour: OtherWorkingHour) => void;
    remove: (index: number) => void;
    update: (index: number, value: Partial<unknown>) => void;
}

const useOtherWorkingHoursFieldArray = (): UseOtherWorkingHoursFieldArrayReturn => {
    const { control } = useFormContext<UpsertTimesheetFormProps>();
    const { fields, append, remove, update } = useFieldArray({
        control,
        name: TimesheetKeys.OTHER_WORKING_HOURS,
    });

    const onAdd = useCallback(() => {
        const newOtherWorkingHour = initializeOtherWorkingHour();
        append(newOtherWorkingHour);
    }, [append]);

    const onDelete = useCallback(
        (records: OtherWorkingHour[]) => {
            const ids = records.map((record) => record.id);

            const deletedPositions = fields.reduce(
                (positions: number[], otherWorkingHour, index) => {
                    if (ids.includes(otherWorkingHour.id)) {
                        positions.push(index);
                    }
                    return positions;
                },
                []
            );

            remove(deletedPositions);
        },
        [fields, remove]
    );

    return {
        otherWorkingHours: fields,
        onAdd,
        onDelete,
        append,
        remove,
        update,
    };
};

export default useOtherWorkingHoursFieldArray;
