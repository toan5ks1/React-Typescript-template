import { defineAbility } from "src/squads/communication/internals/permission/rules";

const rules = defineAbility((can) => {
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
