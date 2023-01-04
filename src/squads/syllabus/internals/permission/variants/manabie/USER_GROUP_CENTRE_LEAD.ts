import { defineAbility } from "src/squads/syllabus/internals/permission/rules";

const rules = defineAbility((can) => {
    can("courses", "create");
    can("courses", "delete");
    can("courses", "edit");
    can("courses", "list");
    can("courses", "show");

    can("books", "create");
    can("books", "delete");
    can("books", "edit");
    can("books", "list");
    can("books", "show");
});

export default rules;
