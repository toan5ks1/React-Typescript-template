import { defineAbility } from "src/internals/permission/rules";

const rules = defineAbility((can) => {
    can("courses", "create");
    can("courses", "delete");
    can("courses", "edit");
    can("courses", "list");
    can("courses", "show");

    can("students_erp", "create");
    can("students_erp", "delete");
    can("students_erp", "edit");
    can("students_erp", "list");
    can("students_erp", "show");
    can("students_erp", "show.gender_and_birthday");

    can("staff", "create");
    can("staff", "delete");
    can("staff", "edit");
    can("staff", "list");
    can("staff", "show");

    can("lesson_management", "create");
    can("lesson_management", "delete");
    can("lesson_management", "edit");
    can("lesson_management", "list");
    can("lesson_management", "show");

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

    can("student_qr_scanner", "create");
    can("student_qr_scanner", "delete");
    can("student_qr_scanner", "edit");
    can("student_qr_scanner", "list");
    can("student_qr_scanner", "show");

    can("orders", "create");
    can("orders", "delete");
    can("orders", "edit");
    can("orders", "list");
    can("orders", "show");

    can("invoice_management", "create");
    can("invoice_management", "delete");
    can("invoice_management", "edit");
    can("invoice_management", "list");
    can("invoice_management", "show");

    can("timesheet_management", "create");
    can("timesheet_management", "delete");
    can("timesheet_management", "edit");
    can("timesheet_management", "list");
    can("timesheet_management", "show");
});

export default rules;
