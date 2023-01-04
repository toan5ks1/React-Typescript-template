import { defineAbility } from "src/internals/permission/rules";

const rules = defineAbility((can) => {
    can("lesson_management", "create");
    can("lesson_management", "delete");
    can("lesson_management", "edit");
    can("lesson_management", "list");
    can("lesson_management", "show");

    can("timesheet_management", "create");
    can("timesheet_management", "delete");
    can("timesheet_management", "edit");
    can("timesheet_management", "list");
    can("timesheet_management", "show");

    can("notifications", "create");
    can("notifications", "delete");
    can("notifications", "edit");
    can("notifications", "list");
    can("notifications", "show");

    can("notificationsv2", "create");
    can("notificationsv2", "delete");
    can("notificationsv2", "edit");
    can("notificationsv2", "list");
    can("notificationsv2", "show");
});

export default rules;
