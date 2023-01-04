import { useFormContext } from "react-hook-form";
import { timeIsAfter, dateIsSame } from "src/common/utils/time";
import { EntryExitRecordFormData } from "src/squads/adobo/domains/entry-exit/common/types/entry-exit";
import { TypeEntity } from "src/squads/adobo/domains/entry-exit/typings/react-admin";

const useEntryExitRecordValidationRules = (
    tEntryExit: (resourceName: TypeEntity | string) => string
) => {
    const currentTime = new Date();

    const { getValues, clearErrors } = useFormContext<EntryExitRecordFormData>();

    return {
        entryTime: {
            validate: (entryTime: Date) => {
                const exitTimeValue = getValues("exitTime");
                if (exitTimeValue) {
                    if (!timeIsAfter(exitTimeValue, entryTime)) {
                        return tEntryExit("form.error.entryEarlierThanExit");
                    }
                    if (!timeIsAfter(exitTimeValue, currentTime)) {
                        clearErrors("exitTime");
                    }
                }
                const entryDateValue = getValues("entryDate");
                if (
                    dateIsSame(entryDateValue, currentTime) &&
                    timeIsAfter(entryTime, currentTime)
                ) {
                    return tEntryExit("form.error.entryTimeIsFuture");
                }
                clearErrors("entryTime");
            },
        },
        exitTime: {
            validate: (exitTime: Date) => {
                const entryTimeValue = getValues("entryTime");
                if (exitTime) {
                    const exitDateValue = getValues("entryDate");
                    if (
                        dateIsSame(exitDateValue, currentTime) &&
                        timeIsAfter(exitTime, currentTime)
                    ) {
                        if (timeIsAfter(exitTime, entryTimeValue)) {
                            clearErrors("entryTime");
                        }
                        return tEntryExit("form.error.exitTimeIsFuture");
                    }
                    clearErrors("exitTime");
                }
            },
        },
    };
};

export default useEntryExitRecordValidationRules;
