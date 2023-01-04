import { PropsWithChildren } from "react";

import { TestContext } from "ra-test";

import TranslationProvider from "src/providers/TranslationProvider";

import TestThemeProvider from "./TestThemeProvider";

const TestApp = ({ children }: PropsWithChildren<{}>) => {
    return (
        <TestContext>
            <TranslationProvider>
                <TestThemeProvider>{children}</TestThemeProvider>
            </TranslationProvider>
        </TestContext>
    );
};

export default TestApp;
