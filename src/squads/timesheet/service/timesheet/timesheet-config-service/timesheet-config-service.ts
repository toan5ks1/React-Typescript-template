import { ListQuery } from "src/squads/timesheet/service/service-types";

import { Timesheet_TimesheetConfigListByKeyQueryVariables } from "../timesheet-types";
import timesheetConfigQueries from "./timesheet-config-service.query";

import { defineService } from "@manabie-com/react-utils";

const timesheetConfigService = defineService({
    query: {
        timesheetConfigGetListByKey: (
            variables: ListQuery<Timesheet_TimesheetConfigListByKeyQueryVariables>
        ) => {
            const { filter = { config_type: "" } } = variables;
            return timesheetConfigQueries.getList(filter);
        },
    },
});

export default timesheetConfigService;
