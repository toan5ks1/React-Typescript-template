import { getResource } from "src/squads/syllabus/common/utils/utils";

import LOAndAssignment from "../LOAndAssignment";

import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useBookDetail from "src/squads/syllabus/hooks/useBookDetail";
import useGetLOAndAssignmentTable, {
    UseGetLOAndAssignmentTableValues,
} from "src/squads/syllabus/hooks/useGetLOAndAssignmentTable";
import { lOAndAssignmentList } from "src/squads/syllabus/hooks/useGetLOAndAssignmentTable/__mocks__";
import useNavigation from "src/squads/syllabus/hooks/useNavigation";
import { UseTopicControlReturn } from "src/squads/syllabus/hooks/useTopicControl";
import useCreateLOs from "src/squads/syllabus/pages/Book/hooks/useCreateLOs";
import useReOrderLOAndAssignment from "src/squads/syllabus/pages/Book/hooks/useReOrderLOAndAssignment";
import TestAppWithQueryClient from "src/squads/syllabus/test-utils/TestAppWithQueryClient";

const mockSearchURL = "?bookId=bookId&chapterId=chapterId&parentId=topicId";

jest.mock("react-router", () => {
    const actual = jest.requireActual("react-router");

    return {
        __esModule: true,
        ...actual,
        useLocation: () => ({
            search: mockSearchURL,
        }),
    };
});

jest.mock("src/squads/syllabus/hooks/useNavigation");

jest.mock("src/squads/syllabus/hooks/useShowSnackbar");

jest.mock("src/squads/syllabus/hooks/useTopicControl", () => {
    return {
        __esModule: true,
        default: (): UseTopicControlReturn => ({
            configKeys: {
                EXAM_LO: true,
                FLASH_CARD: true,
                LO: true,
                OFFLINE_STUDY: true,
                ASSIGNMENT: true,
                TASK_ASSIGNMENT: true,
            },
        }),
    };
});

jest.mock("src/squads/syllabus/pages/Book/hooks/useCreateLOs", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/syllabus/pages/Book/hooks/useReOrderLOAndAssignment", () => jest.fn());

jest.mock("src/squads/syllabus/hooks/useGetLOAndAssignmentTable", () => jest.fn());

jest.mock("src/squads/syllabus/hooks/useBookDetail", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const mockPushNavigation = jest.fn();
const mockUseNavigation = () => {
    (useNavigation as jest.Mock).mockImplementation(() => ({ push: mockPushNavigation }));
};

beforeEach(() => {
    const useGetLOAndAssignmentTableValues: UseGetLOAndAssignmentTableValues = {
        data: lOAndAssignmentList,
        isFetching: false,
        refetch: jest.fn(),
    };
    (useGetLOAndAssignmentTable as jest.Mock).mockReturnValue(useGetLOAndAssignmentTableValues);

    (useReOrderLOAndAssignment as jest.Mock).mockReturnValue({
        isLoading: false,
        updateOrder: jest.fn(),
    });
    (useBookDetail as jest.Mock).mockReturnValue({
        isDisableAction: false,
    });
    mockUseNavigation();
});

describe(LOAndAssignment.name, () => {
    const addLOs = "LOAndAssignment__addLOs";

    beforeEach(() => {
        (useCreateLOs as jest.Mock).mockReturnValue({});

        render(<LOAndAssignment bookId="bookId" chapterId="chapterId" topicId="topicId" />, {
            wrapper: TestAppWithQueryClient,
        });
    });

    it("should render list learning object and assignment", () => {
        expect(screen.getAllByTestId("LOAndAssignmentItem__root").length).toBeGreaterThan(0);
    });

    it("should render add learning objective ans assignment control", () => {
        expect(screen.getByTestId(addLOs)).toBeInTheDocument();
    });

    it("should visible dialog LOs", async () => {
        const dialogTestId = "DialogLOs__root";

        const control = screen.getByTestId(addLOs);
        fireEvent.click(control);

        expect(await screen.findByTestId(dialogTestId)).toBeInTheDocument();
    });

    it("should disable the move up action when the item is first element", () => {
        expect(screen.getAllByTestId("LOAndAssignmentItem__moveUp").shift()).toBeDisabled();
    });

    it("should disable the move down action when the item is last element", () => {
        expect(screen.getAllByTestId("LOAndAssignmentItem__moveDown").pop()).toBeDisabled();
    });

    it("should enable the move up/down action when the the item is not last or first element", () => {
        expect(screen.getAllByTestId("LOAndAssignmentItem__moveDown")[1]).toBeEnabled();
        expect(screen.getAllByTestId("LOAndAssignmentItem__moveUp")[1]).toBeEnabled();
    });

    it.each`
        item                      | index
        ${lOAndAssignmentList[0]} | ${0}
        ${lOAndAssignmentList[1]} | ${1}
        ${lOAndAssignmentList[2]} | ${2}
        ${lOAndAssignmentList[3]} | ${3}
    `("should show item path correctly based on resource", ({ item, index }) => {
        const resource = getResource(item);
        const listItem = screen.getAllByTestId("LOAndAssignmentItem__root")[index];
        const mockExpectedPath = `/syllabus/${resource}/${listItem.dataset.value}/show${mockSearchURL}`;

        userEvent.click(listItem);

        expect(mockPushNavigation).toBeCalledWith(mockExpectedPath);
    });
});

describe(`${LOAndAssignment.name} prevent user click when updating display order`, () => {
    beforeEach(() => {
        (useReOrderLOAndAssignment as jest.Mock).mockReturnValue({
            isLoading: true,
            updateOrder: jest.fn(),
        });
        (useBookDetail as jest.Mock).mockReturnValue({
            isDisableAction: false,
        });
        render(<LOAndAssignment bookId="bookId" chapterId="chapterId" topicId="topicId" />, {
            wrapper: TestAppWithQueryClient,
        });
    });

    it("should disable all move up/down when updating display order", () => {
        screen.getAllByTestId("LOAndAssignmentItem__moveUp").forEach((element) => {
            expect(element).toBeDisabled();
        });

        screen.getAllByTestId("LOAndAssignmentItem__moveDown").forEach((element) => {
            expect(element).toBeDisabled();
        });
    });
});

describe(`${LOAndAssignment.name} prevent user click when fetching LOs/Assignment`, () => {
    beforeEach(() => {
        const useGetLOAndAssignmentTableValues: UseGetLOAndAssignmentTableValues = {
            data: lOAndAssignmentList,
            isFetching: true,
            refetch: jest.fn(),
        };
        (useBookDetail as jest.Mock).mockReturnValue({
            isDisableAction: false,
        });
        (useGetLOAndAssignmentTable as jest.Mock).mockReturnValue(useGetLOAndAssignmentTableValues);
        render(<LOAndAssignment bookId="bookId" chapterId="chapterId" topicId="topicId" />, {
            wrapper: TestAppWithQueryClient,
        });
    });

    it("should disable all move up/down when fetching LOs/Assignment", () => {
        screen.getAllByTestId("LOAndAssignmentItem__moveUp").forEach((element) => {
            expect(element).toBeDisabled();
        });

        screen.getAllByTestId("LOAndAssignmentItem__moveDown").forEach((element) => {
            expect(element).toBeDisabled();
        });
    });
});

describe(`${LOAndAssignment.name} disable all actions when the disabling value of config is true`, () => {
    beforeEach(() => {
        const useGetLOAndAssignmentTableValues: UseGetLOAndAssignmentTableValues = {
            data: lOAndAssignmentList,
            isFetching: false,
            refetch: jest.fn(),
        };

        (useBookDetail as jest.Mock).mockReturnValue({
            isDisableAction: true,
        });

        (useGetLOAndAssignmentTable as jest.Mock).mockReturnValue(useGetLOAndAssignmentTableValues);

        render(<LOAndAssignment bookId="bookId" chapterId="chapterId" topicId="topicId" />, {
            wrapper: TestAppWithQueryClient,
        });
    });

    it("should prevent user click any button to re-order or toggle when isDisableAction is true", () => {
        screen.getAllByTestId("LOAndAssignmentItem__moveUp").forEach((element) => {
            expect(element).toBeDisabled();
        });

        screen.getAllByTestId("LOAndAssignmentItem__moveDown").forEach((element) => {
            expect(element).toBeDisabled();
        });

        screen.getAllByTestId("ActionPanel__trigger").forEach((element) => {
            expect(element).toBeDisabled();
        });
    });
});
