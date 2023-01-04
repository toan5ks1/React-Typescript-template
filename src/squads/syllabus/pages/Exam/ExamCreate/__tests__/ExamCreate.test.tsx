import { Entities } from "src/common/constants/enum";
import { MicroFrontendTypes } from "src/routing/type";
import { parseQuery } from "src/squads/syllabus/common/utils/url";

import { fireEvent, render, screen } from "@testing-library/react";
import useNavigation from "src/squads/syllabus/hooks/useNavigation";
import ExamCreate from "src/squads/syllabus/pages/Exam/ExamCreate/ExamCreate";
import TestApp from "src/squads/syllabus/test-utils/TestApp";

const mockBookId = "bookId";
const mockChapterId = "chapterId";
const mockTopicId = "topicId";

const mockPushNavigation = jest.fn();

jest.mock("react-router", () => {
    const actual = jest.requireActual("react-router");

    return {
        __esModule: true,
        ...actual,
        useLocation: () => ({
            pathname: "/syllabus/learning_objectives/create-exam-lo",
            search: `?bookId=${mockBookId}&chapterId=${mockChapterId}&parentId=${mockTopicId}`,
        }),
    };
});

jest.mock("src/squads/syllabus/common/utils/url", () => {
    const actual = jest.requireActual("src/squads/syllabus/common/utils/url");
    return {
        __esModule: true,
        ...actual,
        parseQuery: jest.fn(),
    };
});

jest.mock("src/squads/syllabus/hooks/useNavigation");

const renderExamCreate = () => {
    return render(
        <TestApp>
            <ExamCreate />
        </TestApp>
    );
};

const mockExamCreateModules = () => {
    (parseQuery as jest.Mock).mockReturnValue({ bookId: mockBookId, parentId: mockTopicId });

    (useNavigation as jest.Mock).mockReturnValue({
        push: mockPushNavigation,
    });
};

describe(ExamCreate.name, () => {
    it("should render correct UI", () => {
        mockExamCreateModules();
        renderExamCreate();

        expect(screen.getByTestId("ExamUpsertDialog__dialog")).toBeInTheDocument();
    });

    it("should navigate to book detail page when click on cancel and close button", () => {
        mockExamCreateModules();
        renderExamCreate();

        fireEvent.click(screen.getByLabelText("ra.common.action.cancel"));
        expect(mockPushNavigation).toBeCalledWith(
            `/${MicroFrontendTypes.SYLLABUS}/${Entities.BOOKS}/${mockBookId}/show`
        );

        fireEvent.click(screen.getByTestId("DialogFullScreen__buttonClose"));
        expect(mockPushNavigation).toBeCalledWith(
            `/${MicroFrontendTypes.SYLLABUS}/${Entities.BOOKS}/${mockBookId}/show`
        );
    });
});
