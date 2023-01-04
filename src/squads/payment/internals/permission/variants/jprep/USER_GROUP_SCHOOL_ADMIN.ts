import { defineAbility } from "src/squads/payment/internals/permission/rules";

const rules = defineAbility((can) => {
    // can("masters", "create"); not used yet
    // can("masters", "delete"); not used yet
    // can("masters", "edit"); not used yet
    // can("masters", "list"); not used yet
    can("masters", "show");

    // can("orders", "create"); not used yet
    // can("orders", "delete"); not used yet
    // can("orders", "edit"); not used yet
    // can("orders", "list"); not used yet
    can("orders", "show");
});

export default rules;
