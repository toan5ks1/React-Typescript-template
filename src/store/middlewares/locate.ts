import { LOCATION_CHANGE } from "connected-react-router/immutable";
import { Dispatch, AnyAction, MiddlewareAPI } from "redux";

import { AppActions } from "../app";

let prevPathname = "";

export default (store: MiddlewareAPI) => (next: Dispatch) => (action: AnyAction) => {
    if (action.type === LOCATION_CHANGE) {
        const newAction = {
            ...action,
            payload: {
                ...action.payload,
                prevPathname,
            },
        };
        store.dispatch(AppActions.setPrevPathname(prevPathname));
        const { location } = action.payload;

        prevPathname = location.pathname + location.search;

        return next(newAction);
    }
    return next(action);
};
