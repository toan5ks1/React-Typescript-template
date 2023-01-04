import { routerMiddleware } from "connected-react-router/immutable";
import { applyMiddleware, createStore, Middleware, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { getReduxReducers } from "./root-reducer";
import { ConfigureStoreOptions, RootState } from "./store-types";

export function configureStore({ initialState, history }: ConfigureStoreOptions): Store<RootState> {
    const reducers = getReduxReducers(history, initialState);

    let middlewares: Middleware[] = [routerMiddleware(history)];

    const store = createStore(
        reducers,
        initialState,
        composeWithDevTools(applyMiddleware(...middlewares))
    );

    return store;
}
