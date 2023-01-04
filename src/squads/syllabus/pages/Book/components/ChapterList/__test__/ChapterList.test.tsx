import { AppError } from "src/squads/syllabus/internals/errors";
import logger from "src/squads/syllabus/internals/logger";
import { inferQuery } from "src/squads/syllabus/services/infer-query";
import { getLatestCallParams } from "src/squads/syllabus/test-utils/mock-utils";

import ChapterList from "../ChapterList";

import { fireEvent, render, screen } from "@testing-library/react";
import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import useUpsertChapter from "src/squads/syllabus/pages/Book/hooks/useUpsertChapter";
import { createMockDataChapterGetMany } from "src/squads/syllabus/services/eureka/chapter-service/__tests__/data";
import TestAppWithQueryClient from "src/squads/syllabus/test-utils/TestAppWithQueryClient";

const mockDataChapterGetMany = createMockDataChapterGetMany(4);

jest.mock("src/squads/syllabus/internals/logger/logger");
jest.mock("src/squads/syllabus/pages/Book/hooks/useUpsertChapter", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/syllabus/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/syllabus/pages/Book/hooks/useGetChapterIdsByBookId", () => {
    return {
        __esModule: true,
        default: () => ({
            chapterIds: [mockDataChapterGetMany[0].chapter_id],
            refetch: jest.fn(),
        }),
    };
});

jest.mock("src/squads/syllabus/services/infer-query", () => {
    return {
        __esModule: true,
        inferQuery: jest.fn(),
    };
});

jest.mock("src/squads/syllabus/pages/Book/components/TopicList", () => ({
    __esModule: true,
    default: () => <div data-testid="TopicList__mock"></div>,
}));

jest.mock("react-router", () => {
    const actual = jest.requireActual("react-router");
    return {
        ...actual,
        useParams: () => ({
            id: 12,
        }),
    };
});

const mockAppError = new AppError("ra.manabie-error.invalid_params");

describe(ChapterList.name, () => {
    const mockUpdateOrder = jest.fn();
    const mockShowSnackbar = jest.fn();
    const mockRefetchChapter = jest.fn();

    beforeEach(() => {
        (inferQuery as jest.Mock).mockImplementation(() => () => ({
            data: mockDataChapterGetMany,
            refetch: mockRefetchChapter,
        }));
        (useUpsertChapter as jest.Mock).mockReturnValue({
            updateOrder: mockUpdateOrder,
            isLoading: false,
        });
        (useShowSnackbar as jest.Mock).mockImplementation(() => mockShowSnackbar);

        render(<ChapterList bookId="book01" />, {
            wrapper: TestAppWithQueryClient,
        });
    });

    it("should render create chapter form", () => {
        expect(screen.getByTestId("ChapterForm__root")).toBeInTheDocument();
    });

    it("should render chapter list", () => {
        expect(screen.getAllByTestId("ChapterItem_root").length).toBeGreaterThan(0);
    });

    it("should disable the move up action when the item is first element", () => {
        expect(screen.getAllByTestId("ChapterItem__moveUp").shift()).toBeDisabled();
    });

    it("should disable the move down action when the item is last element", () => {
        expect(screen.getAllByTestId("ChapterItem__moveDown").pop()).toBeDisabled();
    });

    it("should move up/down chapter successfully when click on move up/down button is enabled", () => {
        const moveDownButtonList = screen.getAllByTestId("ChapterItem__moveDown");
        const moveUpButtonList = screen.getAllByTestId("ChapterItem__moveUp");

        fireEvent.click(moveDownButtonList[mockDataChapterGetMany.length - 2]);
        fireEvent.click(moveUpButtonList[mockDataChapterGetMany.length - 2]);

        expect(mockUpdateOrder).toBeCalledTimes(2);

        getLatestCallParams(mockUpdateOrder)[1].onSuccess();

        expect(mockShowSnackbar).toBeCalledWith("You have moved item successfully");
        expect(mockRefetchChapter).toBeCalled();
    });

    it("should move up/down chapter failed when click on move up/down button is enabled", () => {
        const moveDownButtonList = screen.getAllByTestId("ChapterItem__moveDown");
        const moveUpButtonList = screen.getAllByTestId("ChapterItem__moveUp");

        fireEvent.click(moveDownButtonList[mockDataChapterGetMany.length - 2]);
        fireEvent.click(moveUpButtonList[mockDataChapterGetMany.length - 2]);

        expect(mockUpdateOrder).toBeCalledTimes(2);

        getLatestCallParams(mockUpdateOrder)[1].onError(mockAppError);

        expect(logger.warn).toBeCalledWith("[ChapterList re-order failed]", mockAppError);
        expect(mockShowSnackbar).toBeCalledWith(
            "Move item failed Invalid params. Please check your data: ",
            "error"
        );
    });
});

describe(`${ChapterList.name} prevent user click move up/down when updating display order`, () => {
    beforeEach(() => {
        (inferQuery as jest.Mock).mockImplementation(() => () => ({
            data: mockDataChapterGetMany,
        }));
        (useUpsertChapter as jest.Mock).mockReturnValue({ isLoading: true });

        render(<ChapterList bookId="bookId_01" />, {
            wrapper: TestAppWithQueryClient,
        });
    });
    it("should disable all move up/down when updating display order", () => {
        screen.getAllByTestId("ChapterItem__moveUp").forEach((element) => {
            expect(element).toBeDisabled();
        });

        screen.getAllByTestId("ChapterItem__moveDown").forEach((element) => {
            expect(element).toBeDisabled();
        });
    });
});
