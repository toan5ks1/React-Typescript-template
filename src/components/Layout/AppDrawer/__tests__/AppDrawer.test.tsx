import { TestContext } from "ra-test";
import { Entities } from "src/common/constants/enum";
import enableSidebarMethod from "src/squads/architecture/internals/sidebar";
import { AppProvider } from "src/test-utils";

import { ModuleProvider } from "src/providers/ModuleProvider";

import AppDrawer from "../AppDrawer";

import { render, RenderResult } from "@testing-library/react";
import Course from "src/squads/syllabus/pages/Course";
import TestThemeProvider from "src/test-utils/TestThemeProvider";

jest.mock("src/app/useAppPermission", () => {
    const { Entities } = jest.requireActual("src/common/constants/enum");

    const mockPermission = {
        can: (_action: any, resource: Entities) => {
            switch (resource) {
                case Entities.COURSES: {
                    return true;
                }
                default: {
                    return false;
                }
            }
        },
    };

    return () => {
        return {
            permission: mockPermission,
        };
    };
});

jest.mock("src/app/useFeatureController");

describe("<AppDrawer /> in layout", () => {
    let wrapper: RenderResult;
    afterEach(() => {
        window.__MANA__ = undefined as any; //force cleanup window.__MANA__ in test
    });
    beforeEach(() => {
        enableSidebarMethod();
        wrapper = render(
            <TestContext>
                <ModuleProvider modules={[Course]}>
                    <TestThemeProvider>
                        <AppProvider
                            customStores={{
                                app: {
                                    sidebarOpen: true,
                                    prevPathname: "",
                                    redirectAfterLogin: "/",
                                    redirectAfterLogout: "/login",
                                },
                            }}
                        >
                            <AppDrawer sidebarOpen={false} />
                        </AppProvider>
                    </TestThemeProvider>
                </ModuleProvider>
            </TestContext>
        );
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render drawer anchor left", () => {
        expect(wrapper.queryByTestId("AppDrawer")).toBeInTheDocument();
        expect(
            wrapper.container.querySelector(".MuiDrawer-paperAnchorDockedLeft")
        ).toBeInTheDocument();
    });
});
