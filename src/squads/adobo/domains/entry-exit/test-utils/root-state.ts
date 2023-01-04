import { RootState } from "src/squads/adobo/domains/entry-exit/store/store-types";

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
