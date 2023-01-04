import { createMockMasterImportFile } from "src/squads/payment/test-utils/mocks/master";
import { TestApp, TestThemeProvider } from "src/test-utils";

import NotificationTaskbar from "../NotificationTaskbar";

import { render, cleanup, RenderResult, screen } from "@testing-library/react";

const mockMasterFile = createMockMasterImportFile("", true);

afterAll(() => {
    jest.resetAllMocks();
    cleanup();
});

jest.mock("src/store/lesson-convert/selectors", () => {
    return {
        getConvertMaterialLessonSelector: () => [
            {
                courseId: "01",
                lessonGroupId: "lesson 01",
                material: [],
            },
            {
                courseId: "01",
                lessonGroupId: "lesson 02",
                material: [],
            },
        ],
    };
});

jest.mock("src/store/master/selectors", () => {
    return {
        importedFilesSelector: () => [mockMasterFile],
    };
});

describe("<NotificationTaskbar />", () => {
    const list = "NotificationTaskbar__list";
    const itemName = "NotificationTaskbarItem__name";

    let wrapper: RenderResult;

    beforeEach(() => {
        wrapper = render(
            <TestApp>
                <TestThemeProvider>
                    <NotificationTaskbar />
                </TestThemeProvider>
            </TestApp>
        );
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should match UI", () => {
        expect(screen.getAllByTestId(itemName)[0].textContent).toMatch("lesson 01 converting ...");
        expect(screen.getByTestId(list).children).toHaveLength(3);
    });
});
