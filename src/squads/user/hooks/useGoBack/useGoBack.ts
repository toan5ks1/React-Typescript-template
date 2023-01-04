import { useCallback } from "react";

import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import sanitizer from "src/internals/sanitizer";
import { AppState } from "src/store/app/app-types";

// A replacement for history.goBack() to ensure that user stays in the app
function useGoBack() {
    const prevPathname = useSelector((state: { app: AppState }) => state.app.prevPathname);

    const history = useHistory();

    return useCallback(() => {
        history.push(sanitizer.forURL(prevPathname) || "/");
    }, [history, prevPathname]);
}

export default useGoBack;
