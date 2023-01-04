import { defineAbility } from "src/internals/permission/rules";

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

    can("students_erp", "create");
    can("students_erp", "delete");
    can("students_erp", "edit");
    can("students_erp", "list");
    can("students_erp", "show");
    can("students_erp", "show.gender_and_birthday");

    can("teachers", "create");
    can("teachers", "delete");
    can("teachers", "edit");
    can("teachers", "list");
    can("teachers", "show");

    can("staff", "create");
    can("staff", "delete");
    can("staff", "edit");
    can("staff", "list");
    can("staff", "show");

    can("user_group", "create");
    can("user_group", "delete");
    can("user_group", "edit");
    can("user_group", "list");
    can("user_group", "show");

    can("schedule", "create");
    can("schedule", "delete");
    can("schedule", "edit");
    can("schedule", "list");
    can("schedule", "show");

    can("live_lessons", "create");
    can("live_lessons", "delete");
    can("live_lessons", "edit");
    can("live_lessons", "list");
    can("live_lessons", "show");

    can("lesson_management", "create");
    can("lesson_management", "delete");
    can("lesson_management", "edit");
    can("lesson_management", "list");
    can("lesson_management", "show");

    can("assigned_student_list", "create");
    can("assigned_student_list", "delete");
    can("assigned_student_list", "edit");
    can("assigned_student_list", "list");
    can("assigned_student_list", "show");

    // This is used for the left side Menu only, the actual routing is decided in the squad folder
    // Start Communication // TODO: remove this Communication block when registerMenu is implemented
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
    // End Communication

    can("student_qr_scanner", "create");
    can("student_qr_scanner", "delete");
    can("student_qr_scanner", "edit");
    can("student_qr_scanner", "list");
    can("student_qr_scanner", "show");

    // Start Payment // TODO: remove this payment block when registerMenu is implemented
    // This is used for the left side Menu only, the actual routing is decided in the squad folder
    can("masters", "show");

    can("orders", "show");
    // End Payment

    can("invoice_management", "create");
    can("invoice_management", "delete");
    can("invoice_management", "edit");
    can("invoice_management", "list");
    can("invoice_management", "show");

    can("timesheet_management", "show");
});

export default rules;
