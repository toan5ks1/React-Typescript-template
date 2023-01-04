import { NotifyTypes } from "src/common/constants/enum";

import { Snackbar, SnackbarOrigin, SnackbarProps } from "@mui/material";

import AlertBase, { AlertBaseProps } from "../../Alerts/AlertBase";

export type SnackbarBaseProps = SnackbarProps & Pick<AlertBaseProps, "severity" | "onClose">;

const SnackbarBase = (props: SnackbarBaseProps) => {
    const { message, severity, onClose, children, ...rest } = props;
    const origin: SnackbarOrigin = {
        vertical: "bottom",
        horizontal: "left",
    };

    return (
        <Snackbar
            data-testid="SnackbarBase"
            key={`${message?.toString()}_${severity}_${new Date().getTime()}`}
            anchorOrigin={origin}
            message={message}
            onClose={onClose}
            {...rest}
        >
            {/* 
            div is required for Snackbar to make sure that the children forward ref to DOM for custom component.
            https://mui.com/guides/migration-v4/#cannot-read-property-scrolltop-of-null */}
            <div>
                <AlertBase
                    severity={severity}
                    onClose={(event) => onClose && onClose(event, "timeout")}
                    data-testid="SnackbarBase__content"
                >
                    {message}
                </AlertBase>
            </div>
        </Snackbar>
    );
};

export default SnackbarBase;

SnackbarBase.defaultProps = {
    autoHideDuration: 5000,
    severity: NotifyTypes.SUCCESS,
};
