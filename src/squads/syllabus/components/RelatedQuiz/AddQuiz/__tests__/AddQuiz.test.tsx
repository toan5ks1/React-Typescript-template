import AddQuiz, { AddQuizProps } from "../AddQuiz";

import { fireEvent, render, RenderResult, screen } from "@testing-library/react";
import useNavigation from "src/squads/syllabus/hooks/useNavigation";
import TestAppWithQueryClient from "src/squads/syllabus/test-utils/TestAppWithQueryClient";

const searchURL = "?bookId=bookId&chapterId=chapterId&parentId=loId&tab=1&topicId=parentId";

jest.mock("src/squads/syllabus/hooks/useNavigation");

const mockPushNavigation = jest.fn();
const mockUseNavigation = () => {
    (useNavigation as jest.Mock).mockImplementation(() => ({ push: mockPushNavigation }));
};

const renderUtil = (props: AddQuizProps): RenderResult => {
    mockUseNavigation();

    return render(<AddQuiz {...props} />, { wrapper: TestAppWithQueryClient });
};

describe(AddQuiz.name, () => {
    it("should match snapshot", () => {
        const wrapper = renderUtil({});
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should navigate to add question page", () => {
        const mockExpectedPushHistory = `/syllabus/quizzes/create${searchURL}`;

        renderUtil({ searchURL });

        fireEvent.click(screen.getByLabelText("ra.common.action.create"));

        expect(mockPushNavigation).toBeCalledWith(mockExpectedPushHistory);
    });
});
