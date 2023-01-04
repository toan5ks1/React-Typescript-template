import {
    ShowSnackbarAction,
    ShowSnackbarTypes,
} from "src/squads/communication/store/snackbar/actions";
import snackbarReducer, { initialState } from "src/squads/communication/store/snackbar/reducers";

describe("Snackbar Reducers", () => {
    it("should return true open and rest payload when calling showSnackbar action", () => {
        const action: ShowSnackbarAction = {
            type: ShowSnackbarTypes.SHOW_SNACKBAR,
            payload: {
                message: "hello",
            },
        };
        expect(snackbarReducer(initialState, action)).toEqual({
            open: true,
            message: "hello",
        });
    });

    it("should return false open and empty message when calling hideSnackbar action", () => {
        const action: ShowSnackbarAction = {
            type: ShowSnackbarTypes.HIDE_SNACKBAR,
            payload: {
                message: "hello",
            },
        };
        expect(snackbarReducer(initialState, action)).toEqual({
            open: false,
            message: "",
        });
    });

    it("should return initialState when action type is not supported", () => {
        const action = {
            type: "UNSUPPORTED_ACTION",
            payload: {
                message: "hello",
            },
        };
        expect(snackbarReducer(initialState, action as ShowSnackbarAction)).toEqual(initialState);
    });
});
