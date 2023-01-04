import { createBrowserHistory as createHistory } from "history";

import authProvider from "../internals/auth-provider";
import dataProvider from "../internals/data-provider";
import { configureStore } from "../store";

export const history = createHistory({ basename: import.meta.env.VITE_PUBLIC_URL });
export const store = configureStore({
    history,
    dataProvider,
    initialState: undefined,
    authProvider,
});
// we need to export this because one of our hook need the raw usage of this function
export { authProvider, dataProvider };
