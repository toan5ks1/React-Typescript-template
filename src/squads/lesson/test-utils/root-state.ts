import { RootState } from "src/squads/lesson/store/store-types";

export function createEmptyRootState(override?: Partial<RootState>): RootState {
    return {
        router: {},
        lessonConvert: {},
        snackbar: { open: false, message: "" },
        ...override,
    };
}
