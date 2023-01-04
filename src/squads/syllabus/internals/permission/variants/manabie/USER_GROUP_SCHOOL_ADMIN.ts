import { defineAbility } from "src/squads/syllabus/internals/permission/rules";

const rules = defineAbility((can) => {
    can("courses", "create");
    can("courses", "delete");
    can("courses", "edit");
    can("courses", "list");
    can("courses", "show");

    can("assignments", "create");
    can("assignments", "delete");
    can("assignments", "edit");
    can("assignments", "list");
    can("assignments", "show");

    can("task_assignments", "create");
    can("task_assignments", "delete");
    can("task_assignments", "edit");
    can("task_assignments", "list");
    can("task_assignments", "show");

    can("books", "create");
    can("books", "delete");
    can("books", "edit");
    can("books", "list");
    can("books", "show");

    can("learning_objectives", "create");
    can("learning_objectives", "delete");
    can("learning_objectives", "edit");
    can("learning_objectives", "list");
    can("learning_objectives", "show");

    can("quizzes", "create");
    can("quizzes", "delete");
    can("quizzes", "edit");
    can("quizzes", "list");
    can("quizzes", "show");
    can("quizzes", "show.difficulty");
    can("quizzes", "show.tag_lo");

    can("study_plans", "create");
    can("study_plans", "delete");
    can("study_plans", "edit");
    can("study_plans", "list");
    can("study_plans", "show");

    can("course_study_plans", "create");
    can("course_study_plans", "delete");
    can("course_study_plans", "edit");
    can("course_study_plans", "list");
    can("course_study_plans", "show");

    can("student_study_plans", "create");
    can("student_study_plans", "delete");
    can("student_study_plans", "edit");
    can("student_study_plans", "list");
    can("student_study_plans", "show");
});

export default rules;
