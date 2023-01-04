import { useLocation } from "react-router";
import { EurekaEntities } from "src/common/constants/enum";
import { MicroFrontendTypes } from "src/routing/type";
import { inferQuery } from "src/squads/syllabus/services/infer-query";

import TaskAssignmentEdit from "../TaskAssignmentEdit";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useNavigation from "src/squads/syllabus/hooks/useNavigation";
import { createMockAssignmentGetOneQueryData } from "src/squads/syllabus/services/eureka/assignment-eureka/__mocks__/assignment-eureka-query";
import TestAppWithQueryClient from "src/squads/syllabus/test-utils/TestAppWithQueryClient";

const mockAssignmentGetOneData = createMockAssignmentGetOneQueryData();
const mockSearchURL = "?bookId=bookId&chapterId=chapterId&parentId=topicId";

jest.mock("react-router", () => {
    const actual = jest.requireActual("react-router");

    return {
        __esModule: true,
        ...actual,
        useLocation: jest.fn(),
        useParams: () => ({ id: mockAssignmentGetOneData.assignment_id }),
    };
});

jest.mock("src/squads/syllabus/hooks/useNavigation");

jest.mock("src/squads/syllabus/services/infer-query", () => {
    return {
        __esModule: true,
        inferQuery: jest.fn(),
    };
});

jest.mock("src/squads/syllabus/services/infer-query", () => ({
    __esModule: true,
    inferQuery: jest.fn(),
}));

const mockPushNavigation = jest.fn();

const renderUtil = () => {
    return render(<TaskAssignmentEdit />, { wrapper: TestAppWithQueryClient });
};

describe(TaskAssignmentEdit.name, () => {
    const mockInferQuery =
        () =>
        ({ entity }: Parameters<typeof inferQuery>[0]) => {
            switch (entity) {
                case "assignment": {
                    return () => ({
                        data: mockAssignmentGetOneData,
                        isLoading: false,
                    });
                }
                case "media": {
                    return () => ({
                        data: [],
                        isLoading: false,
                    });
                }
                default:
                    throw new Error("Please catch the other queries");
            }
        };

    beforeEach(() => {
        (inferQuery as jest.Mock).mockImplementation(mockInferQuery());
        (useNavigation as jest.Mock).mockImplementation(() => ({ push: mockPushNavigation }));
        (useLocation as jest.Mock).mockImplementation(() => ({
            search: mockSearchURL,
        }));
    });

    it("should match snapshot", () => {
        renderUtil();

        expect(screen.getByTestId("DialogFullScreen__dialog")).toMatchSnapshot();
    });

    it("should navigate to book detail page when click on cancel button", () => {
        const expectedPath = `/${MicroFrontendTypes.SYLLABUS}/${EurekaEntities.TASK_ASSIGNMENTS}/${mockAssignmentGetOneData.assignment_id}/show${mockSearchURL}`;

        renderUtil();

        expect(screen.getByText("Edit Task")).toBeInTheDocument();

        userEvent.click(screen.getByLabelText("ra.common.action.cancel"));

        expect(mockPushNavigation).toBeCalledWith(expectedPath);
    });
});
