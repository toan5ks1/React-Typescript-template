import type { AlertColor } from "@mui/material";

export interface IEvents {
    addSnackbar: {
        message: string;
        severity: AlertColor;
        options?: {
            persist?: boolean;
            [x: string]: any;
        };
    };
}
