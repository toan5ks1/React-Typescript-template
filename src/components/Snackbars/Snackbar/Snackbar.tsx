import { useDispatch, useSelector } from "react-redux";
import { SnackbarActions } from "src/store/snackbar/actions";
import { RootState } from "src/store/store-types";

import SnackbarBase from "src/components/Snackbars/SnackbarBase";

const Snackbar = () => {
    const { message, severity, open } = useSelector<RootState, RootState["snackbar"]>(
        (state) => state.snackbar
    );
    const dispatch = useDispatch();

    const handleClose = (_event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") return;
        dispatch(SnackbarActions.hideSnackbar());
    };

    if (!message) return null; //prevent render for empty string

    return <SnackbarBase open={open} onClose={handleClose} message={message} severity={severity} />;
};

export default Snackbar;
