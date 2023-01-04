import { ReactElement } from "react";

import { AppProvider, TestApp } from "src/test-utils";

import Layout from "../Layout";
import useRouteGuardLayout from "../useRouteGuardLayout";

import { render, screen } from "@testing-library/react";
import UIToggleContextProvider from "src/contexts/UIToggleContext";

jest.mock("src/internals/configuration", () => {
    return {
        _esModule: true,
        getCurrentPjOwner: () => {
            return "manabie";
        },
        getConfig: () => {
            return {
                teacherWeb: ["Trusted_Origin"],
            };
        },
        getCurrentEnv: () => "staging",
    };
});
jest.mock("src/components/Layout/Layout/ErrorLayout", () => {
    return {
        __esModule: true,
        default: ({ children }: { children: ReactElement }) => (
            <div data-testid="ErrorLayout">{children}</div>
        ),
    };
});

jest.mock("src/components/Layout/AppBar", () => {
    return {
        __esModule: true,
        default: () => <div data-testid="AppBar">AppBar</div>,
    };
});

const ComponentWithUISchema = ({ fullscreen }: { fullscreen: boolean }) => {
    useRouteGuardLayout(fullscreen);
    return <div data-testid="Layout__content">Hello</div>;
};
const Component = ({ fullscreen }: { fullscreen: boolean }) => {
    return (
        <TestApp>
            <AppProvider>
                <UIToggleContextProvider>
                    <Layout>
                        <ComponentWithUISchema fullscreen={fullscreen} />
                    </Layout>
                </UIToggleContextProvider>
            </AppProvider>
        </TestApp>
    );
};

describe("useRouteGuardLayout", () => {
    beforeEach(() => {
        window.__MANA__.getManaSidebar = () => {
            return {
                registerSidebarItems: jest.fn(),
                getAllItems: jest.fn(),
                onValueChanged: jest.fn(),
                removeSidebarItems: jest.fn(),
            };
        };
    });
    afterEach(() => {
        window.__MANA__.getManaSidebar = undefined as any;
    });
    it("should render layout with menu, appbar and content padding", () => {
        render(<Component fullscreen={false} />);

        expect(screen.queryByTestId("AppBar")).toBeInTheDocument();
        expect(screen.getByTestId("AppDrawer")).toBeInTheDocument();
        expect(screen.getByTestId("ErrorLayout")).toBeInTheDocument();
        expect(screen.getByTestId("Layout__content")).toBeInTheDocument();
        expect(screen.getByTestId("Layout__main")).toHaveStyle({ padding: "32px" });
    });

    it("should render layout without menu, appbar and content padding", () => {
        render(<Component fullscreen={true} />);
        expect(screen.queryByTestId("AppBar")).not.toBeInTheDocument();
        expect(screen.queryByTestId("AppDrawer")).not.toBeInTheDocument();
        expect(screen.queryByTestId("Layout__main")).toHaveStyle({ padding: "0" });
    });
});
