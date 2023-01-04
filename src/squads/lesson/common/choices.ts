import { AssignedStudentStatusKeys } from "src/squads/lesson/domains/AssignedStudentList/common/types";
import { LessonStatusKeys } from "src/squads/lesson/pages/LessonManagement/common/types";

function isIncluded<T extends string>(excluded: T[], currentVal: T) {
    return excluded.every((excl) => currentVal.indexOf(excl) === -1);
}

function convertToChoice<T>(
    object: T = {} as T,
    key: string,
    excluded: string[] = ["_NONE"]
): { id: string; name: string }[] {
    return Object.keys(object)
        .filter((e) => isIncluded(excluded, e))
        .map((e) => {
            return {
                id: e,
                name: `resources.choices.${key}.${e}`,
            };
        });
}

export const choiceAssignedStudentStatus = convertToChoice(
    AssignedStudentStatusKeys,
    "assignedStudentStatus"
);

export const choiceLessonStatus = convertToChoice(LessonStatusKeys, "lessonStatus");
