import { forwardRef } from "react";

import MuiAlert, { AlertProps as MaterialAlertProps } from "@mui/material/Alert";

export interface AlertBaseProps extends MaterialAlertProps {}

const AlertBase = forwardRef<HTMLDivElement, AlertBaseProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default AlertBase;
