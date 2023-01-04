import { ImportUserState, ImportStudentAction } from "./types";

export const initialState: ImportUserState = {
    student: "",
    isStudentImporting: false,
    parent: "",
    isParentImporting: false,
};

export default function reducer(
    state: ImportUserState = initialState,
    action: ImportStudentAction
): ImportUserState {
    switch (action.type) {
        case "IMPORT_STUDENTS":
            return {
                ...state,
                student: action.payload,
                isStudentImporting: true,
            };
        case "IMPORT_STUDENTS_FINISH":
            return {
                ...state,
                isStudentImporting: false,
            };
        case "IMPORT_PARENTS":
            return {
                ...state,
                parent: action.payload,
                isParentImporting: true,
            };
        case "IMPORT_PARENTS_FINISH":
            return {
                ...state,
                isParentImporting: false,
            };
        default:
            return state;
    }
}
