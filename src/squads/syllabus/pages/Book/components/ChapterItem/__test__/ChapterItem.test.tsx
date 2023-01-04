import { MutationMenus } from "src/common/constants/enum";

import ChapterItem, { ChapterItemProps } from "../ChapterItem";

import { fireEvent, render, screen } from "@testing-library/react";
import useBookDetail from "src/squads/syllabus/hooks/useBookDetail";
import TestAppWithQueryClient from "src/squads/syllabus/test-utils/TestAppWithQueryClient";

jest.mock("../../TopicList", () => ({
    __esModule: true,
    default: () => <div data-testid="TopicList__mock" />,
}));

jest.mock("src/squads/syllabus/hooks/useShowSnackbar");

jest.mock("src/squads/syllabus/hooks/useBookDetail", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe(ChapterItem.name, () => {
    const props: ChapterItemProps = {
        defaultExpanded: true,
        disabledDown: false,
        disabledUp: false,
        onReOrder: jest.fn(),
        onSuccess: jest.fn(),
        refetchChapter: jest.fn(),
        bookId: "BOOK_ID",
        chapter: {
            chapter_id: "CHAPTER_ID",
            grade: 10,
            name: "CHAPTER_NAME",
            school_id: 10,
        },
    };
    beforeEach(() => {
        (useBookDetail as jest.Mock).mockReturnValue({
            isDisableAction: false,
        });

        render(<ChapterItem {...props} />, {
            wrapper: TestAppWithQueryClient,
        });
    });

    it("should render chapter name summary", () => {
        expect(screen.getByTestId("ChapterAccordion__name").textContent).toMatch(/CHAPTER_NAME/);
    });

    it("should render topic list inside chapter item", () => {
        expect(screen.getByTestId("TopicList__mock")).toBeInTheDocument();
    });

    it("should call the onReOrder callback when click to move up itself", () => {
        const control = screen.getByTestId("ChapterItem__moveUp");
        fireEvent.click(control);

        expect(props.onReOrder).toBeCalledWith(MutationMenus.MOVE_UP, "CHAPTER_ID");
    });

    it("should call the onReOrder callback when click to move down itself", () => {
        const control = screen.getByTestId("ChapterItem__moveDown");
        fireEvent.click(control);

        expect(props.onReOrder).toBeCalledWith(MutationMenus.MOVE_DOWN, "CHAPTER_ID");
    });
});

describe(`${ChapterItem.name} disable all actions when the disabling value of config is true`, () => {
    const props: ChapterItemProps = {
        defaultExpanded: true,
        disabledDown: false,
        disabledUp: false,
        onReOrder: jest.fn(),
        onSuccess: () => {},
        refetchChapter: () => {},
        bookId: "BOOK_ID",
        chapter: {
            chapter_id: "CHAPTER_ID",
            grade: 10,
            name: "CHAPTER_NAME",
            school_id: 10,
        },
    };

    beforeEach(() => {
        (useBookDetail as jest.Mock).mockReturnValue({
            isDisableAction: true,
        });

        render(<ChapterItem {...props} />, {
            wrapper: TestAppWithQueryClient,
        });
    });

    it("should prevent user click to re-order and toggle when isDisableAction is true", () => {
        const controlUp = screen.getByTestId("ChapterItem__moveUp");
        fireEvent.click(controlUp);

        expect(props.onReOrder).not.toBeCalled();
        expect(controlUp).toBeDisabled();
        expect(screen.getByTestId("ActionPanel__trigger")).toBeDisabled();
    });
});
