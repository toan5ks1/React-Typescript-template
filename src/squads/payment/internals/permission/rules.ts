import {
    Ability,
    AbilityBuilder,
    ActionKeys,
    SubjectKeys,
} from "@manabie-com/role-based-permission";

// subject: students_erp | courses | ...
// action: "create" | "delete" | ...
// action with field: "show.difficulty" | "show.tag_lo" | ...

export interface PaymentRules {
    //platform
    schools: {
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
}

type CanFn = <P extends SubjectKeys<PaymentRules>, K extends ActionKeys<PaymentRules, P>>(
    subject: P,
    action: K
) => void;

type CanNotFn = <P extends SubjectKeys<PaymentRules>, K extends ActionKeys<PaymentRules, P>>(
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
