import { Timesheet_CountTimesheetConfigByIdsQueryVariables } from "src/squads/payment/service/timesheet/timesheet-types";

import timesheetConfigQueriesTimesheet from "./timesheet-config-timesheet.query";

import { defineService } from "@manabie-com/react-utils";

export const timesheetConfigQueryService = defineService({
    query: {
        timesheetCountTimesheetConfigByIds: ({
            timesheetConfigIds,
        }: Timesheet_CountTimesheetConfigByIdsQueryVariables) => {
            return timesheetConfigQueriesTimesheet.countTimesheetConfigByIds({
                timesheetConfigIds,
            });
        },
    },

    mutation: {},
});
