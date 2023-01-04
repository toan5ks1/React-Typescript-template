import { defineAbility } from "src/squads/communication/internals/permission/rules";

const rules = defineAbility((can) => {
    can("notifications", "create");
    can("notifications", "delete");
    can("notifications", "edit");
    can("notifications", "list");
    can("notifications", "show");
});

export default rules;
