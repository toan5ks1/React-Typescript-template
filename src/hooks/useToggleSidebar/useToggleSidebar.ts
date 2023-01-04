import { useCallback } from "react";

import { useDispatch } from "react-redux";

import { AppActions } from "../../store/app";

function useToggleSidebar(): (open?: boolean) => void {
    const dispatch = useDispatch();

    return useCallback(
        (open?: boolean) => {
            dispatch(AppActions.toggleSidebar(open));
        },
        [dispatch]
    );
}

export default useToggleSidebar;
