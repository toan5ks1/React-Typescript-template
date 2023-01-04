import { RootState } from "src/squads/calendar/typings/store-types";

export function createEmptyRootState(override?: Partial<RootState>): RootState {
    return {
        router: {},
        snackbar: { open: false, message: "" },
        ...override,
    };
}
