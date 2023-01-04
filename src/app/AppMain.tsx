import MainLayout from "src/components/Layout/MainLayout";

import AppGuard from "./AppGuard";

import UIToggleContextProvider from "src/contexts/UIToggleContext";
import RootRouting from "src/routing/RootRouting";

const AppMain = () => {
    return (
        <>
            <UIToggleContextProvider>
                <MainLayout guard={AppGuard}>
                    <RootRouting />
                </MainLayout>
            </UIToggleContextProvider>
        </>
    );
};

export default AppMain;
