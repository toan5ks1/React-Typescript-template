import { defineAbility } from "src/squads/payment/internals/permission/rules";

const rules = defineAbility((_can) => {
    // https://manabie.atlassian.net/browse/LT-13685
    // Teachers can't do anything here yet
});

export default rules;
