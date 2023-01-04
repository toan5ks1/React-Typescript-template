import { Timesheet_LocationListByIdsQuery } from "src/squads/timesheet/service/bob/bob-types";

export const mockLocationListData: Timesheet_LocationListByIdsQuery["locations"] = [
    ...Array(10).keys(),
].map((value) => ({
    location_id: `location_${value}`,
    name: `Location ${value}`,
}));
