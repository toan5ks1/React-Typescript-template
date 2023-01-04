import { DateTime } from "luxon";
import { convertString } from "src/squads/timesheet/common/constants/helper";
import { inferQuery } from "src/squads/timesheet/service/infer-service";
import { Timesheet_TimesheetManyReferenceQuery } from "src/squads/timesheet/service/timesheet/timesheet-types";

import useShowSnackbar from "src/squads/timesheet/hooks/useShowSnackbar";
import useTranslate from "src/squads/timesheet/hooks/useTranslate";

export type useQueryExistedTimesheetReturn = {
    data: Timesheet_TimesheetManyReferenceQuery["timesheet"];
    isFetching: boolean;
    refetch: () => void;
};

export interface UseQueryExistedTimesheetProps {
    staffId?: string;
    locationId?: string;
    fromDate: DateTime;
    toDate: DateTime;
}

function useQueryExistedTimesheet({
    staffId,
    locationId,
    fromDate,
    toDate,
}: UseQueryExistedTimesheetProps): useQueryExistedTimesheetReturn {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    const {
        data = [],
        isFetching,
        refetch,
    } = inferQuery({
        entity: "timesheet",
        action: "timesheetGetManyReference",
    })(
        {
            filter: {
                location_id: convertString(locationId),
                staff_id: convertString(staffId),
                from_date: fromDate.toISO(),
                to_date: toDate.toISO(),
            },
        },
        {
            enabled: Boolean(locationId && staffId),
            onError(error: Error) {
                window.warner?.warn(`fetch existed timesheet list error: `, error);
                showSnackbar(
                    `${t("resources.message.unableToLoadData")} ${error.message}`,
                    "error"
                );
            },
        }
    );
    return {
        data,
        isFetching,
        refetch,
    };
}

export default useQueryExistedTimesheet;
