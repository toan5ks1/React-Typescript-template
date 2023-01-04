import { MouseEvent, useCallback, useEffect, useState } from "react";

export interface UseDialogReturn {
    open: boolean;
    onOpen: (e?: MouseEvent) => void;
    onClose: (e?: MouseEvent) => void;
}

function useDialog(isOpen: boolean = false): UseDialogReturn {
    const [open, setOpen] = useState<boolean>(isOpen);

    const onOpen = useCallback((e?: MouseEvent) => {
        if (e && e.preventDefault) e.preventDefault();
        if (e && e.stopPropagation) e.stopPropagation();
        setOpen(true);
    }, []);

    const onClose = useCallback((e?: MouseEvent) => {
        if (e && e.preventDefault) e.preventDefault();
        if (e && e.stopPropagation) e.stopPropagation();
        setOpen(false);
    }, []);

    useEffect(() => {
        //force open by external state
        setOpen(isOpen);
    }, [isOpen]);

    return {
        open,
        onOpen,
        onClose,
    };
}

export default useDialog;
