import { mockLessonGroups } from "src/squads/syllabus/test-utils/lessons";
import { createFakePagination } from "src/squads/syllabus/test-utils/pagination";
import { TestQueryWrapper } from "src/squads/syllabus/test-utils/react-hooks";

import LessonTab from "../LessonTab";

import { fireEvent, render, RenderResult, screen } from "@testing-library/react";
import TestApp from "src/squads/syllabus/test-utils/TestApp";

jest.mock("src/squads/syllabus/services/infer-query", () => {
    return {
        __esModule: true,
        inferQuery: jest.fn(),
    };
});

jest.mock("src/squads/syllabus/hooks/useShowSnackbar", () => {
    return jest.fn();
});

const mockPagination = createFakePagination();

jest.mock("src/squads/syllabus/hooks/useLessonGroupContainLesson", () => {
    return {
        __esModule: true,
        default: () => ({
            lessonGroupListQuery: mockLessonGroups,
            loading: false,
            pagination: mockPagination,
            updateLessonGroups: jest.fn(),
        }),
    };
});

jest.mock("react-redux", () => ({
    __esModule: true,
    ...(jest.requireActual("react-redux") as object),
    useSelector: jest.fn(),
}));

jest.mock("src/squads/syllabus/hooks/useMediaList");
describe("LessonTab", () => {
    let wrapper: RenderResult;
    it("should open upload media dialog then cancel", async () => {
        wrapper = render(
            <TestApp>
                <TestQueryWrapper>
                    <LessonTab courseId="course_id" />
                </TestQueryWrapper>
            </TestApp>
        );

        const btnAction = wrapper.getAllByTestId("ActionPanel__trigger");
        fireEvent.click(btnAction[0]);

        const uploadOptions = screen.getAllByRole("menuitem");
        fireEvent.click(uploadOptions[0]);

        expect(screen.getByTestId("UploadInput__inputFile")).toBeInTheDocument();

        const btnCancel = screen.getByTestId("BaseDialogAction__cancel");
        fireEvent.click(btnCancel);

        expect(screen.queryByTestId("UploadInput__inputFile")).toBeNull();
    });
});
