import { ElementType, ReactNode } from "react";

import BrightcoveProfileDataProvider from "src/providers/BrightcoveProfileDataProvider";

import Layout from "../Layout";

import { AppGuardProps } from "src/app/AppGuard";

export interface MainLayoutProps {
    guard?: ElementType<AppGuardProps>;
    children: ReactNode;
}

const MainLayout = ({ children, guard: Guard = "div" }: MainLayoutProps) => {
    return (
        <Guard>
            <Layout>
                <BrightcoveProfileDataProvider>{children}</BrightcoveProfileDataProvider>
            </Layout>
        </Guard>
    );
};

export default MainLayout;
