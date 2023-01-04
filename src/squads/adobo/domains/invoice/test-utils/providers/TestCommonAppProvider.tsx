import { PropsWithChildren } from "react";

import { TestContext } from "ra-test";

import TranslationProvider from "src/squads/adobo/domains/invoice/providers/TranslationProvider";

import TestThemeProvider from "./TestThemeProvider";

const TestCommonAppProvider = ({ children }: PropsWithChildren<{}>) => {
    return (
        <TestContext>
            <TranslationProvider>
                <TestThemeProvider>{children}</TestThemeProvider>
            </TranslationProvider>
        </TestContext>
    );
};

export default TestCommonAppProvider;
