import { PropsWithChildren } from "react";

import TranslationProvider from "src/squads/timesheet/providers/TranslationProvider";

import TestThemeProvider from "./TestThemeProvider";

const TestCommonAppProvider = ({ children }: PropsWithChildren<{}>) => {
    return (
        <TranslationProvider>
            <TestThemeProvider>{children}</TestThemeProvider>
        </TranslationProvider>
    );
};

export default TestCommonAppProvider;
