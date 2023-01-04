import {
    Ability,
    AbilityBuilder,
    ActionKeys,
    SubjectKeys,
} from "@manabie-com/role-based-permission";

// subject: students_erp | courses | ...
// action: "create" | "delete" | ...
// action with field: "show.difficulty" | "show.tag_lo" | ...

export interface CommunicationRules {
    //platform
    schools: {
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
    notificationsv2: {
        create: true;
        delete: true;
        edit: true;
        list: true;
        show: true;
    };
}

type CanFn = <
    P extends SubjectKeys<CommunicationRules>,
    K extends ActionKeys<CommunicationRules, P>
>(
    subject: P,
    action: K
) => void;

type CanNotFn = <
    P extends SubjectKeys<CommunicationRules>,
    K extends ActionKeys<CommunicationRules, P>
>(
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
