import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useEffectOnce } from "react-use";
import { SnackbarActions } from "src/store/snackbar/actions";
import { RootState } from "src/store/store-types";

import MultipleSnackbarProvider, {
    MultipleSnackbarProviderProps,
} from "./MultipleSnackbarProvider";

import { useMultipleSnackbar } from "src/contexts/MultipleSnackbarContext";
import useTranslate from "src/hooks/useTranslate";
import useManaEventEmitter from "src/squads/root/src/hooks/useManaEventEmitter";

interface MultipleSnackbarProviderChildrenProps {
    children: MultipleSnackbarProviderProps["children"];
}

const MultipleSnackbarProviderChildren = (props: MultipleSnackbarProviderChildrenProps) => {
    const t = useTranslate();
    const { enqueueSnackbar, closeAllSnackbarPersist } = useMultipleSnackbar();

    const snackbar = useSelector<RootState, RootState["snackbar"]>((state) => state.snackbar);

    useEffect(() => {
        if (snackbar.closeAllSnackbarPersist) {
            closeAllSnackbarPersist();
            return;
        }

        if (snackbar.message) {
            enqueueSnackbar(snackbar.message, {
                persist: snackbar.options?.persist,
                variant: snackbar.severity,
            });
        }
    }, [
        closeAllSnackbarPersist,
        enqueueSnackbar,
        snackbar.closeAllSnackbarPersist,
        snackbar.message,
        snackbar.options,
        snackbar.severity,
        t,
    ]);

    return <>{props.children}</>;
};

export default function MultipleSnackbarProviderRedux(props: MultipleSnackbarProviderProps) {
    const dispatch = useDispatch();
    const handleCloseSnackbar = () => {
        dispatch(SnackbarActions.hideSnackbar());
    };

    const { manaEventEmitter } = useManaEventEmitter();

    useEffectOnce(() => {
        manaEventEmitter.subscribe("addSnackbar", ({ payload }) => {
            if (!payload) {
                window.warner?.error("addSnackbar", "payload is undefined");
                return;
            }

            dispatch(SnackbarActions.showSnackbar(payload));
        });
    });

    return (
        <MultipleSnackbarProvider {...props} onCloseSnackbar={handleCloseSnackbar}>
            <MultipleSnackbarProviderChildren>{props.children}</MultipleSnackbarProviderChildren>
        </MultipleSnackbarProvider>
    );
}
