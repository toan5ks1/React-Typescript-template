import AssignmentCreate from "../AssignmentCreate";

import { fireEvent, render, screen } from "@testing-library/react";
import useNavigation from "src/squads/syllabus/hooks/useNavigation";
import TestAppWithQueryClient from "src/squads/syllabus/test-utils/TestAppWithQueryClient";

const mockBookId = "bookId";
const mockChapterId = "chapterId";
const mockTopicId = "topicId";

jest.mock("react-router", () => {
    const actual = jest.requireActual("react-router");

    return {
        __esModule: true,
        ...actual,
        useLocation: () => ({
            pathname: "/syllabus/assignments/create",
            search: `?bookId=${mockBookId}&chapterId=${mockChapterId}&parentId=${mockTopicId}`,
        }),
    };
});

jest.mock("src/squads/syllabus/common/utils/url", () => {
    const actual = jest.requireActual("src/squads/syllabus/common/utils/url");
    return {
        __esModule: true,
        ...actual,
        parseQuery: () => ({ bookId: mockBookId, parentId: mockTopicId }),
    };
});

jest.mock("src/squads/syllabus/hooks/useNavigation");

const mockPushNavigation = jest.fn();
const mockUseNavigation = () => {
    (useNavigation as jest.Mock).mockImplementation(() => ({ push: mockPushNavigation }));
};

const renderUtil = async () => {
    const wrapper = render(<AssignmentCreate />, { wrapper: TestAppWithQueryClient });

    expect(await screen.findByTestId("DialogFullScreen__dialog")).toBeInTheDocument();

    return wrapper;
};

describe(AssignmentCreate.name, () => {
    it("should match snapshot", async () => {
        await renderUtil();

        expect(screen.getByTestId("DialogFullScreen__dialog")).toMatchSnapshot();
    });

    it("should navigate to book detail page when click on cancel and save button", async () => {
        mockUseNavigation();
        await renderUtil();

        expect(screen.getByText("Create assignment")).toBeInTheDocument();

        fireEvent.click(screen.getByLabelText("ra.common.action.cancel"));
        expect(mockPushNavigation).toBeCalledWith(`/syllabus/books/${mockBookId}/show`);

        fireEvent.click(screen.getByLabelText("ra.common.action.save"));
        expect(mockPushNavigation).toBeCalledWith(`/syllabus/books/${mockBookId}/show`);
    });
});
