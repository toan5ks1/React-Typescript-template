import { ListQuery } from "src/squads/timesheet/service/service-types";

import {
    Timesheet_StaffListByIdsQueryVariables,
    Timesheet_StaffOneQueryVariables,
    Timesheet_StaffListQueryVariables,
    Timesheet_StaffListV2QueryVariables,
} from "../bob-types";
import staffQueries from "./staff-service.query";

import { defineService } from "@manabie-com/react-utils";

const staffService = defineService({
    query: {
        timesheetGetManyStaff: (variables: ListQuery<Timesheet_StaffListByIdsQueryVariables>) => {
            const { filter = { staff_ids: [] } } = variables;

            return staffQueries.getMany(filter);
        },
        timesheetGetStaffById: (variables: ListQuery<Timesheet_StaffOneQueryVariables>) => {
            const { filter = { staff_id: "" } } = variables;

            return staffQueries.getOne(filter);
        },
        timesheetGetStaffListWithFilter: (
            variables: ListQuery<Timesheet_StaffListQueryVariables>
        ) => {
            const { filter = { name: "", email: "" } } = variables;
            return staffQueries.getListWithFilter({
                ...filter,
            });
        },
        timesheetGetStaffListWithFilterV2: (
            variables: ListQuery<Timesheet_StaffListV2QueryVariables>
        ) => {
            const { filter = { keyword: "" } } = variables;
            return staffQueries.getListWithFilterV2({
                ...filter,
            });
        },
    },
});

export default staffService;
