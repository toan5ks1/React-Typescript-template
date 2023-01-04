import { RootState } from "../store/store-types";
import { createMockMasterImportFile } from "./master";

const mockMasterFile = createMockMasterImportFile();

export function createEmptyRootState(override?: Partial<RootState>): RootState {
    return {
        quiz: {
            currentQuizIndex: 0,
            lo: null,
            pdfUrl: "",
            quizOnReview: null,
            quizzes: [],
        },
        router: {},
        app: {
            prevPathname: "",
            sidebarOpen: true,
            redirectAfterLogin: "/",
            redirectAfterLogout: "/login",
        },
        lessonConvert: {},
        snackbar: { open: false, message: "" },
        master: {
            fileImport: {
                "1": mockMasterFile,
            },
        },
        importUser: {
            student: "",
            isStudentImporting: false,
            parent: "",
            isParentImporting: false,
        },
        ...override,
    };
}
