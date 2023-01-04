import { ListQuery } from "src/squads/timesheet/service/service-types";

import {
    Timesheet_TimesheetListQueryVariables,
    Timesheet_TimesheetOneQueryVariables,
    Timesheet_TimesheetManyReferenceQueryVariables,
    Timesheet_TimesheetListV2QueryVariables,
} from "../timesheet-types";
import timesheetServiceTimesheet from "./timesheet-service.mutation";
import timesheetQueries from "./timesheet-service.query";
import { NsTimesheetTimesheetService } from "./types";

import { defineService } from "@manabie-com/react-utils";

const timesheetService = defineService({
    query: {
        timesheetGetListWithFilter: (
            variables: ListQuery<Timesheet_TimesheetListQueryVariables>
        ) => {
            const { filter = {}, pagination } = variables;
            return timesheetQueries.getListWithFilter({
                ...filter,
                ...pagination,
            });
        },
        timesheetGetListWithFilterV2: (variables: Timesheet_TimesheetListV2QueryVariables) => {
            const { staff_id, limit, offset } = variables;
            return timesheetQueries.getListWithFilterV2({
                staff_id,
                limit,
                offset,
            });
        },
        timesheetGetTimesheetById: (variables: ListQuery<Timesheet_TimesheetOneQueryVariables>) => {
            const { filter = { timesheet_id: "" } } = variables;

            return timesheetQueries.getOne(filter);
        },
        timesheetGetManyReference: (
            variables: ListQuery<Timesheet_TimesheetManyReferenceQueryVariables>
        ) => {
            const { filter = { staff_id: "", location_id: "", from_date: "", to_date: "" } } =
                variables;

            return timesheetQueries.getManyReference(filter);
        },
    },
    mutation: {
        timesheetCreateTimesheet: (
            data: Required<NsTimesheetTimesheetService.CreateTimesheetReq>
        ) => {
            return timesheetServiceTimesheet.createTimesheet(data);
        },
        timesheetUpdateTimesheet: (
            data: Required<NsTimesheetTimesheetService.UpdateTimesheetReq>
        ) => {
            return timesheetServiceTimesheet.updateTimesheet(data);
        },
    },
});

export default timesheetService;
