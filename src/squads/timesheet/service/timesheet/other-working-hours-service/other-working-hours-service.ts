import { ListQuery } from "src/squads/timesheet/service/service-types";

import {
    Timesheet_OtherWorkingHoursByTimesheetIdQueryVariables,
    Timesheet_OtherWorkingHoursListByTimesheetIdsQueryVariables,
} from "../timesheet-types";

import { defineService } from "@manabie-com/react-utils";
import otherWorkingHoursQueries from "src/squads/timesheet/service/timesheet/other-working-hours-service/other-working-hours-service.query";

const otherWorkingHoursService = defineService({
    query: {
        timesheetOtherWorkingHoursGetManyReference: (
            variables: ListQuery<Timesheet_OtherWorkingHoursByTimesheetIdQueryVariables>
        ) => {
            const { filter = { timesheet_id: "" } } = variables;
            return otherWorkingHoursQueries.getManyReference(filter);
        },
        timesheetOtherWorkingHoursTotalHourGetManyReference: (
            variables: ListQuery<Timesheet_OtherWorkingHoursListByTimesheetIdsQueryVariables>
        ) => {
            const { filter = { timesheet_ids: [] } } = variables;
            return otherWorkingHoursQueries.getTotalHourManyReference(filter);
        },
    },
});

export default otherWorkingHoursService;
