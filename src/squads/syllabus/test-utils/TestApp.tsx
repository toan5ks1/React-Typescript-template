import { PropsWithChildren } from "react";

import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import configureMockStore from "redux-mock-store";

import TestThemeProvider from "./TestThemeProvider";

import TestTranslationProvider from "src/squads/syllabus/test-utils/translate/TestTranslationProvider";

const TestApp = ({ children }: PropsWithChildren<{}>) => {
    return (
        <Provider store={configureMockStore([])({})}>
            <MemoryRouter>
                <TestTranslationProvider>
                    <TestThemeProvider>{children}</TestThemeProvider>
                </TestTranslationProvider>
            </MemoryRouter>
        </Provider>
    );
};

export default TestApp;
