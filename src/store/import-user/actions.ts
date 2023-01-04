import { ImportStudentAction, ImportParentAction, OptionsImportUser } from "./types";

export const ImportUserActions = {
    // Student
    importStudent: (
        payload: ImportStudentAction["payload"],
        options?: OptionsImportUser
    ): ImportStudentAction => {
        return {
            payload,
            type: "IMPORT_STUDENTS",
            options,
        };
    },
    importStudentFinish: (): ImportStudentAction => {
        return {
            payload: "",
            type: "IMPORT_STUDENTS_FINISH",
        };
    },

    // Parent
    importParent: (
        payload: ImportParentAction["payload"],
        options?: OptionsImportUser
    ): ImportParentAction => {
        return {
            payload,
            type: "IMPORT_PARENTS",
            options,
        };
    },
    importParentFinish: (): ImportParentAction => {
        return {
            payload: "",
            type: "IMPORT_PARENTS_FINISH",
        };
    },
};
