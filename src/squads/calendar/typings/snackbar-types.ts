import { AlertBaseProps } from "src/components/Alerts/AlertBase";

export interface SnackbarStateType {
    message: string;
    open: boolean;
    options?: object;
    severity?: AlertBaseProps["severity"];
}

export const initialState: SnackbarStateType = {
    message: "",
    open: false,
    severity: "success",
};
