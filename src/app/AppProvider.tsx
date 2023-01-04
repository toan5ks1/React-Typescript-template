import { PropsWithChildren } from "react";

import { DataProviderContext } from "react-admin";
import { Provider } from "react-redux";
import { DEFAULT_MAX_SNACK } from "src/common/constants/const";
import permission from "src/internals/permission";

import QueryClientProvider from "../providers/QueryClientProvider";
import ThemeProvider from "../providers/ThemeProvider";
import TimezoneProvider from "../providers/TimezoneProvider";
import { CssBaseline } from "@mui/material";
import LocationProvider from "src/providers/LocationsProvider";
import MuiPickersUtilsProvider from "src/providers/MuiPickersUtilsProvider";
import MultipleSnackbarProviderRedux from "src/providers/MultipleSnackbarProvider/MultipleSnackbarProviderRedux";
import PermissionProvider from "src/providers/PermissonProvider";
import TranslationProvider from "src/providers/TranslationProvider";

import { store, dataProvider } from "./essentials";

interface AppProviderProps {}

const AppProvider = ({ children }: PropsWithChildren<AppProviderProps>) => {
    return (
        <Provider store={store}>
            <QueryClientProvider>
                <PermissionProvider value={permission}>
                    <DataProviderContext.Provider value={dataProvider}>
                        <TranslationProvider>
                            <ThemeProvider>
                                <MultipleSnackbarProviderRedux maxSnack={DEFAULT_MAX_SNACK}>
                                    <TimezoneProvider>
                                        <LocationProvider>
                                            <MuiPickersUtilsProvider>
                                                <CssBaseline />
                                                {children}
                                            </MuiPickersUtilsProvider>
                                        </LocationProvider>
                                    </TimezoneProvider>
                                </MultipleSnackbarProviderRedux>
                            </ThemeProvider>
                        </TranslationProvider>
                    </DataProviderContext.Provider>
                </PermissionProvider>
            </QueryClientProvider>
        </Provider>
    );
};

export default AppProvider;
