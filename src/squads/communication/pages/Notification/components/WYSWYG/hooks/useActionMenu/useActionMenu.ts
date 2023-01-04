import { SyntheticEvent, useCallback } from "react";

import useSafeState from "src/squads/communication/hooks/useSafeState";

export interface UseActionMenuProps {
    anchorEl: HTMLElement | null;
    open: boolean;
    onOpen: (event: SyntheticEvent<HTMLElement>) => void;
    onClose: () => void;
}

function useActionMenu(): UseActionMenuProps {
    const [anchorEl, setAnchorEl] = useSafeState<HTMLElement | null>(null);
    const onOpen = useCallback(
        (event: SyntheticEvent<HTMLElement>) => {
            setAnchorEl(event.currentTarget);
        },
        [setAnchorEl]
    );

    const onClose = useCallback(() => {
        setAnchorEl(null);
    }, [setAnchorEl]);

    return {
        anchorEl: anchorEl,
        open: Boolean(anchorEl),
        onOpen: onOpen,
        onClose: onClose,
    };
}

export default useActionMenu;
