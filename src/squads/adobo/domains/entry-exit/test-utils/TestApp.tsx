import { PropsWithChildren } from "react";

import { BrowserRouter } from "react-router-dom";
import { TestThemeProvider } from "src/squads/adobo/domains/entry-exit/test-utils/providers";

import TranslationProvider from "src/squads/adobo/domains/entry-exit/providers/TranslationProvider";

const TestApp = ({ children }: PropsWithChildren<{}>) => {
    return (
        <BrowserRouter>
            <TranslationProvider>
                <TestThemeProvider>{children}</TestThemeProvider>
            </TranslationProvider>
        </BrowserRouter>
    );
};

export default TestApp;
