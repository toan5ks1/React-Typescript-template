import { Entities, EurekaEntities } from "src/common/constants/enum";
import { DynamicFormFieldValue } from "src/squads/syllabus/common/types/common";

import {
    isTaskAssignment,
    isLO,
    LOAndAssignmentType,
} from "src/squads/syllabus/pages/Book/components/LOAndAssignment/models";

export const convertToString = (value?: DynamicFormFieldValue): string => {
    return typeof value === "string" ? value : "";
};

function stringifyReplacer(_key: string | number | symbol, value: any) {
    if (typeof value === "undefined") {
        return "undefined";
    }

    const specialTypes = ["function", "bigint", "symbol"];
    // We use different operation for special kinds
    if (specialTypes.includes(typeof value)) {
        return value.toString();
    }

    return value;
}

export function safeStringify(target: any, spacing?: number): string {
    return JSON.stringify(target, stringifyReplacer, spacing);
}

export function getResource(item: LOAndAssignmentType) {
    if (isLO(item)) return Entities.LOS;
    if (isTaskAssignment(item.type as string)) return EurekaEntities.TASK_ASSIGNMENTS;
    return EurekaEntities.ASSIGNMENTS;
}
