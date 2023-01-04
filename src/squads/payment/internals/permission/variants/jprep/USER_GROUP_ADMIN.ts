import { defineAbility } from "src/squads/payment/internals/permission/rules";

const rules = defineAbility((can) => {
    can("schools", "create");
    can("schools", "delete");
    can("schools", "edit");
    can("schools", "list");
    can("schools", "show");
});

export default rules;
