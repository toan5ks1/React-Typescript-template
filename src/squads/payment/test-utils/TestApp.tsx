import { PropsWithChildren } from "react";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import { createEmptyRootState } from "src/squads/payment/test-utils/mocks/root-state";

import ThemeProvider from "src/squads/payment/contexts/ThemeProvider";
import TranslationProvider from "src/squads/payment/contexts/TranslationProvider";

const mockRootState = createEmptyRootState();

const TestApp = ({ children }: PropsWithChildren<{}>) => {
    const store = configureStore()(mockRootState);

    return (
        <Provider store={store}>
            <BrowserRouter>
                <TranslationProvider>
                    <ThemeProvider>{children}</ThemeProvider>
                </TranslationProvider>
            </BrowserRouter>
        </Provider>
    );
};

export default TestApp;
