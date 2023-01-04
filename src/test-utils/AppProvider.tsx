import { PropsWithChildren } from "react";

import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { RootState } from "src/store/store-types";

import { createEmptyRootState } from "./root-state";

const mockStore = configureMockStore([]);

const AppProvider = ({
    children,
    customStores,
}: PropsWithChildren<{ customStores?: Partial<RootState> }>) => {
    const store = mockStore({
        history: jest.fn(),
        authProvider: jest.fn(),
        dataProvider: jest.fn(),
        initialState: undefined,
        ...createEmptyRootState(),
        ...customStores,
    });

    return <Provider store={store}>{children}</Provider>;
};

export default AppProvider;
