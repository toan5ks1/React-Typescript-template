import { AssignmentOneQuery } from "src/squads/syllabus/services/eureka/eureka-types";
import { inferQuery } from "src/squads/syllabus/services/infer-query";
import { getCallParamsAt } from "src/squads/syllabus/test-utils/mock-utils";

import AssignmentDetail from "../AssignmentDetail";

import { fireEvent, render, screen } from "@testing-library/react";
import useNavigation from "src/squads/syllabus/hooks/useNavigation";
import useDeleteAssignment from "src/squads/syllabus/pages/Book/hooks/useDeleteAssignment";
import { createMockAssignmentGetOneQueryData } from "src/squads/syllabus/services/eureka/assignment-eureka/__mocks__/assignment-eureka-query";
import TestAppWithQueryClient from "src/squads/syllabus/test-utils/TestAppWithQueryClient";

const mockAssignmentGetOneData = createMockAssignmentGetOneQueryData({
    max_grade: 10,
    instruction: "assignment_instruction_getOne",
    settings: {
        allow_resubmission: true,
        require_attachment: true,
        allow_late_submission: true,
        require_assignment_note: true,
        require_video_submission: true,
    },
    attachment: ["attachment_getOne"],
    is_required_grade: true,
});

const mockBookId = "bookId";
const mockSearchUrl = `?bookId=${mockBookId}&chapterId=chapterId&parentId=topicId`;
const mockBookDetailUrl = `/syllabus/books/${mockBookId}/show`;

jest.mock("react-router", () => {
    const originalModule = jest.requireActual("react-router");
    return {
        __esModule: true,
        ...originalModule,
        useParams: () => ({
            id: mockAssignmentGetOneData.assignment_id,
        }),
        useLocation: () => ({
            search: mockSearchUrl,
        }),
    };
});

jest.mock("src/squads/syllabus/common/utils/url", () => {
    const actual = jest.requireActual("src/squads/syllabus/common/utils/url");
    return {
        ...actual,
        parseQuery: () => ({
            bookId: mockBookId,
        }),
    };
});

jest.mock("src/squads/syllabus/hooks/useMediaList");
jest.mock("src/squads/syllabus/hooks/useBreadcrumb/useBreadcrumbLOs");

jest.mock("src/squads/syllabus/services/infer-query", () => {
    return {
        __esModule: true,
        inferQuery: jest.fn(),
    };
});

jest.mock("src/squads/syllabus/hooks/useNavigation");

jest.mock("src/squads/syllabus/pages/Book/hooks/useDeleteAssignment", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

const mockDeleteAssignment = jest.fn();

const renderUtil = () => {
    return render(<AssignmentDetail />, { wrapper: TestAppWithQueryClient });
};

const mockInferQuery = ({ data }: { data?: AssignmentOneQuery["assignments"][0] }) => {
    (inferQuery as jest.Mock).mockReturnValue(() => ({
        data,
        isLoading: false,
    }));
};

describe(AssignmentDetail.name, () => {
    const mockPushNavigation = jest.fn();

    beforeEach(() => {
        (useDeleteAssignment as jest.Mock).mockImplementation(() => ({
            deleteAssignment: mockDeleteAssignment,
        }));
        (useNavigation as jest.Mock).mockImplementation(() => ({ push: mockPushNavigation }));
    });

    const { max_grade, instruction, assignment_id } = mockAssignmentGetOneData;

    it("should match snapshot", () => {
        mockInferQuery({ data: mockAssignmentGetOneData });

        const { container } = renderUtil();

        expect(container).toMatchSnapshot();
    });

    it("should render breadcrumbs", () => {
        mockInferQuery({ data: mockAssignmentGetOneData });

        renderUtil();

        expect(screen.queryByLabelText("breadcrumb")).toBeInTheDocument();
    });

    it("should render attachments", () => {
        mockInferQuery({ data: mockAssignmentGetOneData });

        renderUtil();

        expect(screen.getByTestId("ListMediaChipsBase")).toBeInTheDocument();
    });

    it("should render assignment info", () => {
        mockInferQuery({ data: mockAssignmentGetOneData });

        renderUtil();

        expect(screen.getByTestId("ShowAssignment__gradingMethod")).toHaveTextContent("Value");
        expect(screen.getByTestId("ShowAssignment__maxGrade")).toHaveTextContent(String(max_grade));
        expect(screen.getByTestId("ShowAssignment__instruction")).toHaveTextContent(
            String(instruction)
        );
    });

    it("should render nothing when assignment cannot be found", () => {
        mockInferQuery({});

        const wrapper = renderUtil();

        expect(wrapper.container).toBeEmptyDOMElement();
    });

    it("should navigate to edit assignment path when click edit button", () => {
        const expectedPath = `/syllabus/assignments/${assignment_id}/edit${mockSearchUrl}`;

        mockInferQuery({ data: mockAssignmentGetOneData });

        renderUtil();

        fireEvent.click(screen.getByTestId("ActionPanel__trigger"));
        fireEvent.click(screen.getByLabelText("ra.common.action.edit"));

        expect(mockPushNavigation).toBeCalledWith(expectedPath);
    });

    it("should navigate to book detail path when delete successfully", () => {
        mockInferQuery({ data: mockAssignmentGetOneData });

        renderUtil();

        fireEvent.click(screen.getByTestId("ActionPanel__trigger"));
        fireEvent.click(screen.getByLabelText("ra.common.action.delete"));

        expect(screen.getByRole("dialog")).toHaveTextContent("ra.common.deleteDialogTitle");

        fireEvent.click(screen.getByLabelText("ra.common.action.confirm"));

        const [, options] = getCallParamsAt(mockDeleteAssignment, 0);

        options.onSuccess();

        expect(mockPushNavigation).toBeCalledWith(mockBookDetailUrl);
    });

    it("should render 5 setting item not checked when settings is an null list value", () => {
        mockInferQuery({
            data: createMockAssignmentGetOneQueryData({ settings: null }),
        });

        const { container } = renderUtil();

        expect(container.querySelector("[name='require_video_submission']")).not.toBeChecked();
        expect(container.querySelector("[name='require_assignment_note']")).not.toBeChecked();
        expect(container.querySelector("[name='allow_late_submission']")).not.toBeChecked();
        expect(container.querySelector("[name='require_attachment']")).not.toBeChecked();
        expect(container.querySelector("[name='allow_resubmission']")).not.toBeChecked();
    });

    it("should render correct 5 setting items for assignment when assignment's setting have other setting value types", () => {
        const anotherSettingType = "another_assignment_type";

        mockInferQuery({
            data: createMockAssignmentGetOneQueryData({
                settings: {
                    allow_resubmission: true,
                    require_attachment: false,
                    allow_late_submission: true,
                    require_assignment_note: false,
                    require_video_submission: true,
                    [anotherSettingType]: true,
                },
            }),
        });

        const { container } = renderUtil();

        expect(container.querySelector("[name='require_video_submission']")).toBeChecked();
        expect(container.querySelector("[name='require_assignment_note']")).not.toBeChecked();
        expect(container.querySelector("[name='allow_late_submission']")).toBeChecked();
        expect(container.querySelector("[name='require_attachment']")).not.toBeChecked();
        expect(container.querySelector("[name='allow_resubmission']")).toBeChecked();

        expect(container.querySelectorAll("input[type='checkbox']")).toHaveLength(5);
        expect(container.querySelector(`[name=${anotherSettingType}]`)).not.toBeInTheDocument();
    });
});
