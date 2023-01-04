import { ChapterAttrsFragment } from "src/squads/syllabus/services/eureka/eureka-types";
import { inferQuery } from "src/squads/syllabus/services/infer-query";

import TopicList from "../TopicList";

import { fireEvent, render, screen } from "@testing-library/react";
import useBookDetail from "src/squads/syllabus/hooks/useBookDetail";
import useUpdateTopic from "src/squads/syllabus/pages/Book/hooks/useUpdateTopic";
import { createMockDataGetTopicManyQuery } from "src/squads/syllabus/services/eureka/topic-service-bob/__tests__/data";
import TestAppWithQueryClient from "src/squads/syllabus/test-utils/TestAppWithQueryClient";

// Mock to prevent nested component mount make unit test complex
jest.mock("src/squads/syllabus/pages/Book/components/LOAndAssignment", () => ({
    __esModule: true,
    default: () => null,
}));
jest.mock("src/squads/syllabus/hooks/useShowSnackbar");

jest.mock("src/squads/syllabus/pages/Book/hooks/useUpdateTopic", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/syllabus/services/infer-query", () => {
    return {
        __esModule: true,
        inferQuery: jest.fn(),
    };
});

jest.mock("src/squads/syllabus/hooks/useBookDetail", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const chapterParent: ChapterAttrsFragment = {
    chapter_id: "chapter 01",
    grade: 1,
    name: "chapter name",
    school_id: 1,
};

describe(TopicList.name, () => {
    beforeEach(() => {
        (useUpdateTopic as jest.Mock).mockReturnValue({
            isLoading: false,
        });
        (useBookDetail as jest.Mock).mockReturnValue({
            isDisableAction: false,
        });
        (inferQuery as jest.Mock).mockImplementation(
            ({ entity }: Parameters<typeof inferQuery>[0]) => {
                if (entity === "topic") {
                    return () => ({
                        data: createMockDataGetTopicManyQuery(),
                        refetch: jest.fn(),
                    });
                }
                throw new Error("Please catch the other queries");
            }
        );

        render(<TopicList bookId="bookId" belongToFirstChapter={false} chapter={chapterParent} />, {
            wrapper: TestAppWithQueryClient,
        });
    });

    it("should render list topic item", () => {
        expect(screen.getAllByTestId("TopicItem__root").length).toBeGreaterThan(0);
    });

    it("should render create topic control", () => {
        expect(screen.getByTestId("TopicList__createTopic")).toBeInTheDocument();
    });

    it("should render form to create a topic", () => {
        const control = screen.getByTestId("TopicList__createTopic");
        fireEvent.click(control);

        expect(screen.getByTestId("DialogCreateTopic__root")).toBeInTheDocument();
    });

    it("should disable the move up action when the item is first element", () => {
        expect(screen.getAllByTestId("TopicItem__moveUp").shift()).toBeDisabled();
    });

    it("should disable the move down action when the item is last element", () => {
        expect(screen.getAllByTestId("TopicItem__moveDown").pop()).toBeDisabled();
    });
});

describe(`${TopicList.name} prevent user click move up/down when updating display order`, () => {
    beforeEach(() => {
        (useUpdateTopic as jest.Mock).mockReturnValue({
            isLoading: true,
        });
        (useBookDetail as jest.Mock).mockReturnValue({
            isDisableAction: false,
        });
        (inferQuery as jest.Mock).mockImplementation(
            ({ entity }: Parameters<typeof inferQuery>[0]) => {
                if (entity === "topic") {
                    return () => ({
                        data: createMockDataGetTopicManyQuery([], { quantity: 4 }),
                        refetch: jest.fn(),
                    });
                }
                throw new Error("Please catch the other queries");
            }
        );

        render(<TopicList bookId="bookId" belongToFirstChapter={false} chapter={chapterParent} />, {
            wrapper: TestAppWithQueryClient,
        });
    });
    it("should disable all move up/down when updating display order", () => {
        screen.getAllByTestId("TopicItem__moveUp").forEach((element) => {
            expect(element).toBeDisabled();
        });

        screen.getAllByTestId("TopicItem__moveDown").forEach((element) => {
            expect(element).toBeDisabled();
        });
    });
});

describe(`${TopicList.name} disable all actions when the disabling value of config is true`, () => {
    beforeEach(() => {
        (useUpdateTopic as jest.Mock).mockReturnValue({
            isLoading: false,
        });
        (useBookDetail as jest.Mock).mockReturnValue({
            isDisableAction: true,
        });
        (inferQuery as jest.Mock).mockImplementation(
            ({ entity }: Parameters<typeof inferQuery>[0]) => {
                if (entity === "topic") {
                    return () => ({
                        data: createMockDataGetTopicManyQuery([], { quantity: 4 }),
                        refetch: jest.fn(),
                    });
                }
                throw new Error("Please catch the other queries");
            }
        );

        render(<TopicList bookId="bookId" belongToFirstChapter={false} chapter={chapterParent} />, {
            wrapper: TestAppWithQueryClient,
        });
    });
    it("should disable all move up/down and all toggle when isDisableAction is true", () => {
        screen.getAllByTestId("TopicItem__moveUp").forEach((element) => {
            expect(element).toBeDisabled();
        });

        screen.getAllByTestId("TopicItem__moveDown").forEach((element) => {
            expect(element).toBeDisabled();
        });

        screen.getAllByTestId("ActionPanel__trigger").forEach((element) => {
            expect(element).toBeDisabled();
        });
    });
});
