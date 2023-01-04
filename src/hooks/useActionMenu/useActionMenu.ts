import { SyntheticEvent, useCallback } from "react";

import useSafeState from "../useSafeState";

export interface UseActionMenuProps {
    anchorEl: HTMLElement | null;
    open: boolean;
    onOpen: (event: SyntheticEvent<HTMLElement>) => void;
    onClose: () => void;
}

function useActionMenu(): UseActionMenuProps {
    const [anchorEl, setAnchorEl] = useSafeState<HTMLElement | null>(null);
    const [open, setOpen] = useSafeState(false);

    const onOpen = useCallback(
        (event: SyntheticEvent<HTMLElement>) => {
            setAnchorEl(event.currentTarget);
            setOpen(true);
        },
        [setAnchorEl, setOpen]
    );

    const onClose = useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    return {
        anchorEl,
        open,
        onOpen,
        onClose,
    };
}

export default useActionMenu;
