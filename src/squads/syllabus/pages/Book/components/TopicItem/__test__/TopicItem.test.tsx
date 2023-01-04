import { MutationMenus } from "src/common/constants/enum";

import TopicItem, { TopicItemProps } from "../TopicItem";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import useBookDetail from "src/squads/syllabus/hooks/useBookDetail";
import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import useDeleteTopic from "src/squads/syllabus/pages/Book/hooks/useDeleteTopic";
import { createMockDataGetTopicManyQuery } from "src/squads/syllabus/services/eureka/topic-service-bob/__tests__/data";
import TestAppWithQueryClient from "src/squads/syllabus/test-utils/TestAppWithQueryClient";

const mockProps: TopicItemProps = {
    defaultExpanded: false,
    disabledDown: false,
    disabledUp: false,
    onReOrder: () => {},
    refetch: () => {},
    bookId: "bookId",
    chapterId: "chapterId",
    topic: createMockDataGetTopicManyQuery([], { quantity: 1 })[0],
};

jest.mock("src/squads/syllabus/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("../../LOAndAssignment", () => ({
    __esModule: true,
    default: () => <div data-testid="LOAndAssignment__mock"></div>,
}));

jest.mock("src/squads/syllabus/pages/Book/hooks/useDeleteTopic", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/syllabus/hooks/useBookDetail", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const mockDeleteTopic = jest.fn();
const mockShowSnackbar = jest.fn();

const mockUseShowSnackbar = () => {
    (useShowSnackbar as jest.Mock).mockImplementation(() => mockShowSnackbar);
};

const renderUtil = (overrideProps?: { onReOrder?: () => void }) => {
    const defaultProps = { ...mockProps, ...overrideProps };

    return render(<TopicItem {...defaultProps} />, { wrapper: TestAppWithQueryClient });
};

describe(TopicItem.name, () => {
    beforeEach(() => {
        (useDeleteTopic as jest.Mock).mockImplementation(() => ({
            deleteTopic: mockDeleteTopic,
            isLoading: false,
        }));

        (useBookDetail as jest.Mock).mockReturnValue({
            isDisableAction: false,
        });
    });

    it("should render the topic's name", () => {
        renderUtil();

        expect(screen.getByText(/topic_name/)).toBeInTheDocument();
    });

    it("should call the onReOrder callback when click to move up itself", () => {
        const onReOrderFn = jest.fn();

        renderUtil({ onReOrder: onReOrderFn });

        const control = screen.getByTestId("TopicItem__moveUp");

        fireEvent.click(control);

        expect(onReOrderFn).toBeCalledWith(MutationMenus.MOVE_UP, mockProps.topic.topic_id);
    });

    it("should call the onReOrder callback when click to move down itself", () => {
        const onReOrderFn = jest.fn();

        renderUtil({ onReOrder: onReOrderFn });

        const control = screen.getByTestId("TopicItem__moveDown");

        fireEvent.click(control);

        expect(onReOrderFn).toBeCalledWith(MutationMenus.MOVE_DOWN, mockProps.topic.topic_id);
    });

    it("should render list learning and object inside itself", () => {
        const { container } = renderUtil();

        const topicAccordion = container.querySelector(
            "[data-testid='TopicItem__root'] [role='button']"
        );

        expect(topicAccordion).toHaveAttribute("aria-expanded", "false");

        fireEvent.click(topicAccordion as HTMLButtonElement);

        expect(topicAccordion).toHaveAttribute("aria-expanded", "true");
        expect(screen.getByTestId("LOAndAssignment__mock")).toBeInTheDocument();
    });

    it("should call deleteTopic when delete topic", () => {
        mockUseShowSnackbar();
        renderUtil();

        fireEvent.click(screen.getByTestId("ActionPanel__trigger"));
        fireEvent.click(screen.getByLabelText("ra.common.action.delete"));
        fireEvent.click(screen.getByLabelText("ra.common.action.confirm"));

        expect(mockDeleteTopic).toBeCalledWith({ topicIdsList: [mockProps.topic.topic_id] });
    });

    it("should open edit topic dialog", async () => {
        renderUtil();

        fireEvent.click(screen.getByTestId("ActionPanel__trigger"));
        fireEvent.click(screen.getByLabelText("ra.common.action.rename"));

        expect(screen.getByTestId("TextFieldHF__input")).toHaveValue(mockProps.topic.name);

        fireEvent.click(screen.getByLabelText("ra.common.action.cancel"));

        await waitFor(() => {
            expect(screen.queryByTestId("DialogWithHeaderFooter_wrapper")).toBeNull();
        });
    });
});

describe(`${TopicItem.name} disable all actions when the disabling value of config is true`, () => {
    beforeEach(() => {
        (useDeleteTopic as jest.Mock).mockImplementation(() => ({
            deleteTopic: jest.fn(),
            isLoading: false,
        }));

        (useBookDetail as jest.Mock).mockReturnValue({
            isDisableAction: true,
        });
    });

    it("should prevent user click to re-order and toggle when book isDisableAction is true", () => {
        const onReOrderFn = jest.fn();

        renderUtil({ onReOrder: onReOrderFn });

        const control = screen.getByTestId("TopicItem__moveDown");

        fireEvent.click(control);

        expect(onReOrderFn).not.toBeCalled();
        expect(screen.getByTestId("ActionPanel__trigger")).toBeDisabled();
    });
});
