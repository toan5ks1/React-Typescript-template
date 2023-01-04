import { defineAbility } from "src/squads/timesheet/internals/permission/rules";

const rules = defineAbility((can) => {
    can("timesheet_management", "create");
    can("timesheet_management", "delete");
    can("timesheet_management", "edit");
    can("timesheet_management", "list");
    can("timesheet_management", "show");
});

export default rules;
