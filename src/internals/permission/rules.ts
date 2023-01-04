import {
    Ability,
    AbilityBuilder,
    ActionKeys,
    SubjectKeys,
} from "@manabie-com/role-based-permission";

// subject: students_erp | courses | ...
// action: "create" | "delete" | ...
// action with field: "show.difficulty" | "show.tag_lo" | ...

export interface Rules {
    //syllabus
    courses: {
        create: true;
        delete: {
            course_delete: true;
        };
        edit: true;
        list: true;
        show: true;
    };
    assignments: {
        create: true;
        delete: true;
        edit: true;
        list: true;
        show: true;
    };
    task_assignments: {
        create: true;
        delete: true;
        edit: true;
        list: true;
        show: true;
    };
    books: {
        create: true;
        delete: true;
        edit: true;
        list: true;
        show: true;
    };
    learning_objectives: {
        create: true;
        delete: true;
        edit: true;
        list: true;
        show: true;
    };
    quizzes: {
        create: true;
        delete: true;
        edit: true;
        list: true;
        show: {
            difficulty: true;
            tag_lo: true;
            external_id: true;
        };
    };
    study_plans: {
        create: true;
        delete: true;
        edit: true;
        list: true;
        show: true;
    };
    course_study_plans: {
        create: true;
        delete: true;
        edit: true;
        list: true;
        show: true;
        download: true;
    };
    student_study_plans: {
        create: true;
        delete: true;
        edit: true;
        list: true;
        show: true;
        download: true;
    };
    //user
    students_erp: {
        create: true;
        delete: true;
        edit: true;
        list: true;
        show: {
            gender_and_birthday: true;
        };
    };
    teachers: {
        create: true;
        delete: true;
        edit: true;
        list: true;
        show: true;
    };
    staff: {
        create: true;
        delete: true;
        edit: true;
        list: true;
        show: true;
    };
    user_group: {
        create: true;
        delete: true;
        edit: true;
        list: true;
        show: true;
    };
    //lesson
    schedule: {
        create: true;
        delete: true;
        edit: true;
        list: true;
        show: {
            brand_filter: true;
            center_filter: true;
        };
    };
    live_lessons: {
        create: true;
        delete: true;
        edit: true;
        list: true;
        show: true;
    };
    lesson_management: {
        create: true;
        delete: true;
        edit: true;
        list: true;
        show: true;
    };
    assigned_student_list: {
        create: true;
        delete: true;
        edit: true;
        list: true;
        show: true;
    };
    //communication
    notifications: {
        create: true;
        delete: true;
        edit: true;
        list: true;
        show: true;
    };
    //communicationv2
    notificationsv2: {
        create: true;
        delete: true;
        edit: true;
        list: true;
        show: true;
    };
    //entry-exit
    student_qr_scanner: {
        create: true;
        delete: true;
        edit: true;
        list: true;
        show: true;
    };
    // invoice
    invoice_management: {
        create: true;
        delete: true;
        edit: true;
        list: true;
        show: true;
    };
    //payment
    masters: {
        create: true;
        delete: true;
        edit: true;
        list: true;
        show: true;
    };
    orders: {
        create: true;
        delete: true;
        edit: true;
        list: true;
        show: true;
    };
    //platform
    schools: {
        create: true;
        delete: true;
        edit: true;
        list: true;
        show: true;
    };
    //other
    configs: {
        create: true;
        delete: true;
        edit: true;
        list: true;
        show: true;
    };
    lesson_groups: {
        create: true;
        delete: true;
        edit: true;
        list: true;
        show: true;
    };
    timesheet_management: {
        create: true;
        delete: true;
        edit: true;
        list: true;
        show: true;
    };
}

type CanFn = <P extends SubjectKeys<Rules>, K extends ActionKeys<Rules, P>>(
    subject: P,
    action: K
) => void;

type CanNotFn = <P extends SubjectKeys<Rules>, K extends ActionKeys<Rules, P>>(
    subject: P,
    action: K
) => void;

type AbilityFn = (can: CanFn, cannot: CanNotFn) => void;

export function defineAbility(defineFn: AbilityFn) {
    const { can, cannot, rules } = new AbilityBuilder<Ability>();

    const customCan: CanFn = (subject, action) => {
        can(action, subject);
    };
    const customCannot: CanFn = (subject, action) => {
        cannot(action, subject);
    };

    defineFn(customCan, customCannot);

    return rules;
}
