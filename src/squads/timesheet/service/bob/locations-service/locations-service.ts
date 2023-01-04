import { ListQuery } from "src/squads/timesheet/service/service-types";

import {
    Timesheet_LocationListByIdsQueryVariables,
    Timesheet_LocationOneQueryVariables,
    Timesheet_LocationListQueryVariables,
} from "../bob-types";
import locationsQueries from "./locations-service.query";

import { defineService } from "@manabie-com/react-utils";

const locationsService = defineService({
    query: {
        timesheetGetManyLocations: (
            variables: ListQuery<Timesheet_LocationListByIdsQueryVariables>
        ) => {
            const { filter = {} } = variables;

            return locationsQueries.getMany(filter);
        },
        timesheetGetLocationById: (variables: ListQuery<Timesheet_LocationOneQueryVariables>) => {
            const { filter = { location_id: "" } } = variables;

            return locationsQueries.getOne(filter);
        },
        timesheetGetLocationListWithFilter: (
            variables: ListQuery<Timesheet_LocationListQueryVariables>
        ) => {
            const { filter = { name: "" } } = variables;
            return locationsQueries.getListWithFilter({
                ...filter,
            });
        },
    },
});

export default locationsService;
