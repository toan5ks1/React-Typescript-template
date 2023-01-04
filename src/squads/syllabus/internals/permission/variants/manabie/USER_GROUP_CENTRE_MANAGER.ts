import { defineAbility } from "src/squads/syllabus/internals/permission/rules";

const rules = defineAbility((can) => {
    can("courses", "create");
    can("courses", "delete");
    can("courses", "edit");
    can("courses", "list");
    can("courses", "show");
});

export default rules;
