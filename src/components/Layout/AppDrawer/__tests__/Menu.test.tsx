import { Entities } from "src/common/constants/enum";
import { AppProvider, TestApp } from "src/test-utils";

import { ModuleProvider } from "src/providers/ModuleProvider";

import Menu from "../Menu";

import { render, RenderResult } from "@testing-library/react";
import { LessonManagementResource } from "src/squads/lesson/pages/LessonManagement";
import Book from "src/squads/syllabus/pages/Book";
import Course from "src/squads/syllabus/pages/Course";

jest.mock("src/app/useAppPermission", () => {
    const { Entities, ERPModules } = jest.requireActual("src/common/constants/enum");

    const mockPermission = {
        can: (resource: Entities, _action: any) => {
            switch (resource) {
                case Entities.COURSES:
                case Entities.BOOKS:
                case ERPModules.LESSON_MANAGEMENT: {
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

describe("<Menu /> in layout", () => {
    let wrapper: RenderResult;
    beforeEach(() => {
        wrapper = render(
            <TestApp>
                <ModuleProvider modules={[Course, Book, LessonManagementResource]}>
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
                        <Menu sidebarOpen={true} />
                    </AppProvider>
                </ModuleProvider>
            </TestApp>
        );
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render correct", () => {
        expect(wrapper.queryByTestId("Menu__root")).toBeInTheDocument();
        expect(wrapper.queryAllByTestId("MenuItemLink__root").length).toEqual(3);
    });

    it("should render correct menu item", () => {
        expect(wrapper.queryAllByTestId("MenuItemLink__root")[0].textContent).toContain("Course");
        expect(wrapper.queryAllByTestId("MenuItemLink__root")[1].textContent).toContain("Book");
        expect(wrapper.queryAllByTestId("MenuItemLink__root")[2].textContent).toContain(
            "Lesson Management"
        );
    });
});
