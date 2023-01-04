import {
    NsSnackbarAction,
    ShowSnackbarTypes,
    SnackbarActions,
} from "src/squads/calendar/store/snackbar/actions";

describe(SnackbarActions.hideSnackbar.name, () => {
    it("should match data when called", () => {
        expect(SnackbarActions.hideSnackbar()).toMatchObject({
            type: ShowSnackbarTypes.HIDE_SNACKBAR,
        });
    });
});

describe(SnackbarActions.showSnackbar.name, () => {
    it("should match data when called", () => {
        const payload: NsSnackbarAction.ShowSnackbar["payload"] = {
            message: "message",
            severity: "success",
            options: {
                persist: true,
            },
        };
        expect(SnackbarActions.showSnackbar(payload)).toMatchObject({
            payload: payload,
            type: "SHOW_SNACKBAR",
        });
    });
});
