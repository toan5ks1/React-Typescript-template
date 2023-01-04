import { EurekaEntities } from "src/common/constants/enum";
import { MicroFrontendTypes } from "src/routing/type";
import { AssignmentOneQuery } from "src/squads/syllabus/services/eureka/eureka-types";
import { inferQuery } from "src/squads/syllabus/services/infer-query";
import { getCallParamsAt } from "src/squads/syllabus/test-utils/mock-utils";

import useBookTypeRestrictInfo from "../../../Book/hooks/useBookTypeRestrictInfo";
import TaskAssignmentDetail from "../TaskAssignmentDetail";

import { fireEvent, render, screen } from "@testing-library/react";
import useNavigation from "src/squads/syllabus/hooks/useNavigation";
import useDeleteTaskAssignment from "src/squads/syllabus/pages/TaskAssignment/hooks/useDeleteTaskAssignment";
import { createMockAssignmentGetOneQueryData } from "src/squads/syllabus/services/eureka/assignment-eureka/__tests__/data";
import TestAppWithQueryClient from "src/squads/syllabus/test-utils/TestAppWithQueryClient";

const mockAssignmentGetOneData = createMockAssignmentGetOneQueryData({
    instruction: "assignment_instruction_getOne",
    settings: {
        require_duration: true,
        require_attachment: true,
        require_correctness: true,
        require_assignment_note: true,
        require_understanding_level: true,
    },
});

const mockBookId = "bookId";
const mockSearchUrl = `?bookId=${mockBookId}&chapterId=chapterId&parentId=topicId`;

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

jest.mock("src/squads/syllabus/hooks/useMediaList");

jest.mock("src/squads/syllabus/common/utils/url", () => {
    const actual = jest.requireActual("src/squads/syllabus/common/utils/url");
    return {
        ...actual,
        parseQuery: () => ({
            bookId: mockBookId,
        }),
    };
});

jest.mock("src/squads/syllabus/hooks/useBreadcrumb/useBreadcrumbLOs");

jest.mock("src/squads/syllabus/services/infer-query", () => {
    return {
        __esModule: true,
        inferQuery: jest.fn(),
    };
});

jest.mock("src/squads/syllabus/hooks/useNavigation");

jest.mock("src/squads/syllabus/pages/TaskAssignment/hooks/useDeleteTaskAssignment", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

jest.mock("src/squads/syllabus/pages/Book/hooks/useBookTypeRestrictInfo", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

const mockDeleteTaskAssignment = jest.fn();

const renderUtil = () => {
    return render(<TaskAssignmentDetail />, { wrapper: TestAppWithQueryClient });
};

const mockQueryAssignmentMany = jest.fn();

const mockInferQuery =
    () =>
    ({ entity }: Parameters<typeof inferQuery>[0]) => {
        switch (entity) {
            case "assignment":
                return mockQueryAssignmentMany;
            default:
                throw new Error("Please catch the other queries");
        }
    };

describe(TaskAssignmentDetail.name, () => {
    const mockPushNavigation = jest.fn();
    let data: AssignmentOneQuery["assignments"][0] | null;

    beforeEach(() => {
        mockQueryAssignmentMany.mockImplementation(() => ({
            data,
            isFetching: false,
        }));
        (useDeleteTaskAssignment as jest.Mock).mockImplementation(() => ({
            deleteTaskAssignment: mockDeleteTaskAssignment,
        }));
        (useNavigation as jest.Mock).mockImplementation(() => ({ push: mockPushNavigation }));
        (inferQuery as jest.Mock).mockImplementation(mockInferQuery());
        (useBookTypeRestrictInfo as jest.Mock).mockReturnValue({
            isDisabled: false,
        });
    });

    const { instruction, name, assignment_id } = mockAssignmentGetOneData;

    it("should match snapshot", () => {
        data = mockAssignmentGetOneData;

        const { container } = renderUtil();

        expect(container).toMatchSnapshot();
    });

    it("should render breadcrumbs", () => {
        data = mockAssignmentGetOneData;

        renderUtil();

        expect(screen.queryByLabelText("breadcrumb")).toBeInTheDocument();
    });

    it("should render attachments", () => {
        data = mockAssignmentGetOneData;

        renderUtil();

        expect(screen.getByTestId("ListMediaChipsBase")).toBeInTheDocument();
    });

    it("should render no information when empty attachment", () => {
        data = createMockAssignmentGetOneQueryData({ attachment: null, settings: {} });

        renderUtil();

        expect(screen.getByTestId("TaskAssignmentDetail__noAttachment")).toHaveTextContent(
            "No Information"
        );
    });

    it("should render task info", () => {
        data = mockAssignmentGetOneData;

        renderUtil();

        expect(screen.getByTestId("TaskAssignmentDetail__name")).toHaveTextContent(String(name));
        expect(screen.getByTestId("TaskAssignmentDetail__instruction")).toHaveTextContent(
            String(instruction)
        );
    });

    it("should render nothing when assignment cannot be found", () => {
        data = null;

        const wrapper = renderUtil();

        expect(wrapper.container).toBeEmptyDOMElement();
    });

    it("should navigate to edit assignment path when click edit button", () => {
        const expectedPath = `/${MicroFrontendTypes.SYLLABUS}/${EurekaEntities.TASK_ASSIGNMENTS}/${assignment_id}/edit${mockSearchUrl}`;

        data = mockAssignmentGetOneData;

        renderUtil();

        fireEvent.click(screen.getByTestId("ActionPanel__trigger"));
        fireEvent.click(screen.getByLabelText("ra.common.action.edit"));

        expect(mockPushNavigation).toBeCalledWith(expectedPath);
    });

    it("should navigate to book detail path when delete successfully", () => {
        const expectedPath = `/${MicroFrontendTypes.SYLLABUS}/books/${mockBookId}/show`;

        data = mockAssignmentGetOneData;

        renderUtil();

        fireEvent.click(screen.getByTestId("ActionPanel__trigger"));
        fireEvent.click(screen.getByLabelText("ra.common.action.delete"));

        expect(screen.getByRole("dialog")).toHaveTextContent("ra.common.deleteDialogTitle");

        fireEvent.click(screen.getByLabelText("ra.common.action.confirm"));

        const [, options] = getCallParamsAt(mockDeleteTaskAssignment, 0);

        options.onSuccess();

        expect(mockPushNavigation).toBeCalledWith(expectedPath);
    });

    it("should render empty required items when no required items are checked", () => {
        data = createMockAssignmentGetOneQueryData({
            settings: {
                require_correctness: false,
                require_attachment: false,
                require_duration: false,
                require_assignment_note: false,
                require_understanding_level: false,
            },
        });

        renderUtil();

        expect(screen.getByTestId("TaskAssignmentDetail__requiredItems")).toHaveTextContent("--");
    });

    it("should render correct required items when settings have other setting value types", () => {
        const anotherSettingType = "require_complete_date";

        data = createMockAssignmentGetOneQueryData({
            settings: {
                require_correctness: true,
                require_attachment: false,
                require_duration: true,
                require_assignment_note: false,
                require_understanding_level: true,
                [anotherSettingType]: true,
            },
        });

        renderUtil();

        expect(screen.getByTestId("TaskAssignmentDetail__requiredItems")).toHaveTextContent(
            "Duration, Correctness, Understanding level"
        );
    });

    it("should prevent toggle button when disabling value is true", () => {
        (useBookTypeRestrictInfo as jest.Mock).mockReturnValue({
            isDisabled: true,
        });

        renderUtil();

        expect(screen.getByTestId("ActionPanel__trigger")).toBeDisabled();
    });
});
