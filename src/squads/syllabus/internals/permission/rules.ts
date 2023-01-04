import {
    Ability,
    AbilityBuilder,
    ActionKeys,
    SubjectKeys,
} from "@manabie-com/role-based-permission";

// subject: students_erp | courses | ...
// action: "create" | "delete" | ...
// action with field: "show.difficulty" | "show.tag_lo" | ...

export interface SyllabusRules {
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

    teachers: {
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
}

type CanFn = <P extends SubjectKeys<SyllabusRules>, K extends ActionKeys<SyllabusRules, P>>(
    subject: P,
    action: K
) => void;

type CanNotFn = <P extends SubjectKeys<SyllabusRules>, K extends ActionKeys<SyllabusRules, P>>(
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
