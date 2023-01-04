import { PropsWithChildren } from "react";

import { TestContext } from "ra-test";

import MuiPickersUtilsProvider from "src/squads/lesson/providers/MuiPickersUtilsProvider";
import TranslationProvider from "src/squads/lesson/providers/TranslationProvider";

import TestThemeProvider from "src/squads/lesson/test-utils/TestThemeProvider";

const TestApp = ({ children }: PropsWithChildren<{}>) => {
    return (
        <TestContext>
            <TranslationProvider>
                <MuiPickersUtilsProvider>
                    <TestThemeProvider>{children}</TestThemeProvider>
                </MuiPickersUtilsProvider>
            </TranslationProvider>
        </TestContext>
    );
};

export default TestApp;
