import { createContext, useContext } from "react";

import type {
    SnackbarKey,
    SnackbarMessage,
    SnackbarItemProps,
} from "src/components/Snackbars/SnackbarMultipleItem";

export interface SnackbarOptions extends Partial<SnackbarItemProps> {
    persist?: boolean;
}

export interface MultipleSnackbarContextProps {
    enqueueSnackbar: (message: SnackbarMessage, options?: SnackbarOptions) => SnackbarKey;
    closeSnackbar: (key?: SnackbarKey) => void;
    closeAllSnackbarPersist: () => void;
}

const MultipleSnackbarContext = createContext<MultipleSnackbarContextProps>({
    closeSnackbar: () => {},
    enqueueSnackbar: () => "",
    closeAllSnackbarPersist: () => {},
});

MultipleSnackbarContext.displayName = "MultipleSnackbarContext";

export const useMultipleSnackbar = () => useContext(MultipleSnackbarContext);

export default MultipleSnackbarContext;
