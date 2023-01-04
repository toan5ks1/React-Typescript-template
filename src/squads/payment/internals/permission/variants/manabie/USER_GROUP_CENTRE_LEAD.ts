import { defineAbility } from "src/squads/payment/internals/permission/rules";

const rules = defineAbility((can) => {
    can("orders", "show");
});

export default rules;
