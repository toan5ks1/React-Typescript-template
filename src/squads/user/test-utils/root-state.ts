import { RootState } from "src/squads/user/stores/store-types";

export function createEmptyRootState(override?: Partial<RootState>): RootState {
    return {
        router: {},
        app: {
            prevPathname: "",
            sidebarOpen: true,
            redirectAfterLogin: "/",
            redirectAfterLogout: "/login",
        },
        snackbar: { open: false, message: "" },
        ...override,
    };
}
