import { UseQueryBaseV2Return } from "src/squads/syllabus/hooks/data/data-types";
import { AssignmentOneQuery } from "src/squads/syllabus/services/eureka/eureka-types";
import { inferQuery } from "src/squads/syllabus/services/infer-query";
import { ArrayElement } from "src/squads/syllabus/typings/support-types";

import AssignmentEdit from "../AssignmentEdit";

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
        useLocation: () => ({
            search: mockSearchURL,
        }),
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

const mockPushNavigation = jest.fn();
const mockUseNavigation = () => {
    (useNavigation as jest.Mock).mockImplementation(() => ({ push: mockPushNavigation }));
};

const mockInferQuery =
    (
        overrideAssignment: Partial<
            UseQueryBaseV2Return<ArrayElement<AssignmentOneQuery["assignments"]>>
        > = {}
    ) =>
    ({ entity }: Parameters<typeof inferQuery>[0]) => {
        switch (entity) {
            case "assignment": {
                return () => ({
                    isLoading: false,
                    ...overrideAssignment,
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

const renderUtil = () => {
    return render(<AssignmentEdit />, { wrapper: TestAppWithQueryClient });
};

describe(AssignmentEdit.name, () => {
    it("should match snapshot", () => {
        (inferQuery as jest.Mock).mockImplementation(
            mockInferQuery({ data: mockAssignmentGetOneData })
        );

        renderUtil();

        expect(screen.getByTestId("DialogFullScreen__dialog")).toMatchSnapshot();
    });

    it("should render nothing when assignment cannot be found", () => {
        (inferQuery as jest.Mock).mockImplementation(mockInferQuery());

        const wrapper = renderUtil();

        expect(wrapper.container).toBeEmptyDOMElement();
    });

    it("should navigate to book detail page when click on cancel button", () => {
        const mockExpectedPath = `/syllabus/assignments/${mockAssignmentGetOneData.assignment_id}/show${mockSearchURL}`;

        (inferQuery as jest.Mock).mockImplementation(
            mockInferQuery({ data: mockAssignmentGetOneData })
        );
        mockUseNavigation();
        renderUtil();

        expect(screen.getByText("Update assignment")).toBeInTheDocument();

        userEvent.click(screen.getByLabelText("ra.common.action.cancel"));

        expect(mockPushNavigation).toBeCalledWith(mockExpectedPath);
    });
});
