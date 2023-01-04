import { dateIsAfter, dateIsSame, timeIsAfter } from "src/common/utils/time";
import { TimeAutocompleteOption } from "src/models/time-autocomplete";
import { FormFilterNotificationListValues } from "src/squads/communication/common/constants/types";

import useTranslate from "src/squads/communication/hooks/useTranslate";

interface ValidateFromTimeProps
    extends Omit<FormFilterNotificationListValues, "tags" | "fromTime"> {}

interface ValidateToTimeProps extends Omit<FormFilterNotificationListValues, "tags" | "toTime"> {}

const useNotificationListFilterValidation = () => {
    const tCommon = useTranslate();

    return {
        fromDate: (toDate: Date) => ({
            validate: (fromDate: Date) => {
                if (dateIsAfter(fromDate, toDate)) {
                    return tCommon("resources.input.error.invalidFromDate");
                }
            },
        }),
        toDate: (fromDate: Date) => ({
            validate: (toDate: Date) => {
                if (dateIsAfter(fromDate, toDate)) {
                    return tCommon("resources.input.error.invalidToDate");
                }
            },
        }),
        fromTime: ({ fromDate, toDate, toTime }: ValidateFromTimeProps) => ({
            validate: (fromTime: TimeAutocompleteOption) => {
                if (!(fromDate && toDate && fromTime && toTime)) return;

                if (
                    fromTime.value &&
                    toTime.value &&
                    dateIsSame(fromDate, toDate) &&
                    timeIsAfter(fromTime.value, toTime.value)
                ) {
                    return tCommon("resources.input.error.invalidFromTime");
                }
            },
        }),
        toTime: ({ fromDate, toDate, fromTime }: ValidateToTimeProps) => ({
            validate: (toTime: TimeAutocompleteOption) => {
                if (!(fromDate && toDate && fromTime && toTime)) return;

                if (
                    fromTime.value &&
                    toTime.value &&
                    dateIsSame(fromDate, toDate) &&
                    timeIsAfter(fromTime.value, toTime.value)
                ) {
                    return tCommon("resources.input.error.invalidToTime");
                }
            },
        }),
    };
};

export default useNotificationListFilterValidation;
