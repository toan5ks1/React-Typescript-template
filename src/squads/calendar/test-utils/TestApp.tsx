import { PropsWithChildren } from "react";

import MuiPickersUtilsProvider from "src/squads/calendar/providers/MuiPickersUtilsProvider";
import TranslationProvider from "src/squads/calendar/providers/TranslationProvider";

import TestThemeProvider from "src/squads/calendar/test-utils/TestThemeProvider";

const TestApp = ({ children }: PropsWithChildren<{}>) => {
    return (
        <TranslationProvider>
            <MuiPickersUtilsProvider>
                <TestThemeProvider>{children}</TestThemeProvider>
            </MuiPickersUtilsProvider>
        </TranslationProvider>
    );
};

export default TestApp;
