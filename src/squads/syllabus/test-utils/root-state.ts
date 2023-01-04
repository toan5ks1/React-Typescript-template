import { RootState } from "../store/store-types";
import { createEmptyQuizState } from "./quiz";

export function createEmptyRootState(override?: Partial<RootState>): RootState {
    return {
        quiz: createEmptyQuizState(),
        app: {
            prevPathname: "",
            sidebarOpen: true,
            redirectAfterLogin: "/",
            redirectAfterLogout: "/login",
        },
        lessonConvert: {},
        snackbar: { open: false, message: "" },
        ...override,
    };
}
