export enum AppActionTypes {
    TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR",
    SET_PREV_PATHNAME = "SET_PREV_PATHNAME",
}

export declare namespace NsAppAction {
    interface ToggleSidebar {
        type: AppActionTypes.TOGGLE_SIDEBAR;
        payload: {
            open?: boolean;
        };
    }
    interface SetPrevPathname {
        type: AppActionTypes.SET_PREV_PATHNAME;
        payload: {
            prevPathname: string;
        };
    }
}

export const AppActions = {
    toggleSidebar(open?: boolean): NsAppAction.ToggleSidebar {
        return {
            type: AppActionTypes.TOGGLE_SIDEBAR,
            payload: {
                open,
            },
        };
    },
    setPrevPathname(prevPathname: string): NsAppAction.SetPrevPathname {
        return {
            type: AppActionTypes.SET_PREV_PATHNAME,
            payload: {
                prevPathname,
            },
        };
    },
};

export type IAppActions = NsAppAction.ToggleSidebar | NsAppAction.SetPrevPathname;
