import { defineAbility } from "src/squads/communication/internals/permission/rules";

const rules = defineAbility((_can) => {
    // https://manabie.atlassian.net/wiki/spaces/LT/pages/463604245/FE+hardcoded+logic+for+AC+Roles
    // HQ Staff can't do anything here yet
});

export default rules;
