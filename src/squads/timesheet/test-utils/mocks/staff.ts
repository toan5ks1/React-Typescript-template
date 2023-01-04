import {
    Timesheet_StaffListByIdsQuery,
    Timesheet_StaffListV2Query,
} from "src/squads/timesheet/service/bob/bob-types";

export const mockStaffListData: Timesheet_StaffListByIdsQuery["users"] = [...Array(10).keys()].map(
    (value) => ({
        user_id: `staff_${value}`,
        name: `Staff ${value}`,
        email: `staff-${value}@manabie.com`,
    })
);

export const mockStaffListDataV2: Timesheet_StaffListV2Query["staff"] = [...Array(10).keys()].map(
    (value) => ({
        staff_id: `staff_${value}`,
        user: {
            name: `Staff ${value}`,
            email: `staff-${value}@manabie.com`,
        },
    })
);
