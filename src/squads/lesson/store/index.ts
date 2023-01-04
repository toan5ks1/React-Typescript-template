import { routerMiddleware } from "connected-react-router/immutable";
import { applyMiddleware, createStore, Middleware, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import locateMiddlewares from "src/squads/lesson/store/middlewares";
import { getReduxReducers } from "src/squads/lesson/store/root-reducer";
import { getRootSaga } from "src/squads/lesson/store/root-saga";
import { ConfigureStoreOptions, RootState } from "src/squads/lesson/store/store-types";

export function configureStore({
    initialState,
    dataProvider,
    history,
}: ConfigureStoreOptions): Store<RootState> {
    const reducers = getReduxReducers(history, initialState);

    let middlewares: Middleware[] = [routerMiddleware(history), locateMiddlewares];
    const sagaMiddleware = createSagaMiddleware();
    middlewares.push(sagaMiddleware);

    const store = createStore(
        reducers,
        initialState,
        composeWithDevTools(applyMiddleware(...middlewares))
    );

    const rootSaga = getRootSaga(dataProvider);

    sagaMiddleware.run(rootSaga);

    return store;
}
