import { defineAbility } from "src/internals/permission/rules";

const rules = defineAbility((can) => {
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

    can("lesson_management", "create");
    can("lesson_management", "delete");
    can("lesson_management", "edit");
    can("lesson_management", "list");
    can("lesson_management", "show");

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

    can("student_qr_scanner", "create");
    can("student_qr_scanner", "delete");
    can("student_qr_scanner", "edit");
    can("student_qr_scanner", "list");
    can("student_qr_scanner", "show");
});

export default rules;
