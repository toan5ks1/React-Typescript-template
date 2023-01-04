import { SnackbarActions } from "src/squads/payment/stores/snackbar/actions";
import { ShowSnackbarTypes } from "src/squads/payment/stores/snackbar/types";

describe("Snackbar Actions", () => {
    it("should return type SHOW_SNACKBAR and payload when called showSnackbar", () => {
        const payload = { message: "hello" };
        expect(SnackbarActions.showSnackbar(payload)).toEqual({
            type: ShowSnackbarTypes.SHOW_SNACKBAR,
            payload,
        });
    });

    it("should return type HIDE_SNACKBAR and payload when called showSnackbar", () => {
        expect(SnackbarActions.hideSnackbar()).toEqual({
            type: ShowSnackbarTypes.HIDE_SNACKBAR,
        });
    });
});
