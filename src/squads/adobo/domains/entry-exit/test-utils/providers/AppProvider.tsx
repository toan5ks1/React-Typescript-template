import { PropsWithChildren } from "react";

import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { createEmptyRootState } from "src/squads/adobo/domains/entry-exit/test-utils/root-state";

const mockStore = configureMockStore([]);

const AppProvider = ({ children, customStores }: PropsWithChildren<{ customStores?: object }>) => {
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
