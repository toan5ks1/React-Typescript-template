import { UseQueryBaseV2Return } from "src/squads/syllabus/hooks/data/data-types";
import { Syllabus_BookOneQuery } from "src/squads/syllabus/services/eureka/eureka-types";
import { inferQuery } from "src/squads/syllabus/services/infer-query";
import { getLatestCallParams } from "src/squads/syllabus/test-utils/mock-utils";
import { ArrayElement } from "src/squads/syllabus/typings/support-types";

import CommonTranslationProvider from "src/providers/TranslationProvider";

import BookDetails from "../BookDetails";
import { BookTypeKeys } from "../common/constants";
import useBookMutation from "../hooks/useBookMutation";

import { fireEvent, render, waitFor } from "@testing-library/react";
import useBookDetail from "src/squads/syllabus/hooks/useBookDetail";
import useDialog from "src/squads/syllabus/hooks/useDialog";
import useNavigation from "src/squads/syllabus/hooks/useNavigation";
import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import TestApp from "src/squads/syllabus/test-utils/TestApp";
import TestAppWithQueryClient from "src/squads/syllabus/test-utils/TestAppWithQueryClient";

jest.mock("src/squads/syllabus/internals/logger");

jest.mock("src/squads/syllabus/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}))
    .mock("src/squads/syllabus/hooks/useNavigation")
    .mock("src/squads/syllabus/hooks/useDialog", () => ({ __esModule: true, default: jest.fn() }))
    .mock("../hooks/useBookMutation", () => ({ __esModule: true, default: jest.fn() }));

jest.mock("src/squads/syllabus/services/infer-query", () => {
    return {
        __esModule: true,
        inferQuery: jest.fn(),
    };
});

jest.mock("src/squads/syllabus/pages/Book/hooks/useGetChapterIdsByBookId", () => {
    const val = {
        chapterIds: [],
        isLoading: false,
    };

    return () => {
        return val;
    };
});

jest.mock("src/squads/syllabus/hooks/useBookDetail", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe(BookDetails.name, () => {
    const useDialogReturnValue: ReturnType<typeof useDialog> = {
        open: false,
        onOpen: () => {},
        onClose: () => {},
    };

    const useBookMutationReturnValue: Partial<ReturnType<typeof useBookMutation>> = {
        isLoadingUpdate: false,
        onDuplicate: () => {},
        onUpdate: () => {},
    };

    const realQuery = jest.fn();

    beforeEach(() => {
        (useBookDetail as jest.Mock).mockReturnValue({
            isDisableAction: false,
        });
    });

    afterEach(() => {
        realQuery.mockRestore();
    });

    const mockInferQuery =
        (
            override: Partial<
                UseQueryBaseV2Return<ArrayElement<Syllabus_BookOneQuery["books"]>>
            > = {}
        ) =>
        ({ entity }: Parameters<typeof inferQuery>[0]) => {
            switch (entity) {
                case "book": {
                    return realQuery.mockImplementation(() => {
                        return {
                            data: {
                                book_chapters: [{ chapter_id: "Chapter" }],
                                book_id: "bookId",
                                name: "Book Name",
                                school_id: 0,
                                book_type: BookTypeKeys.BOOK_TYPE_GENERAL,
                            },
                            isLoading: false,
                            refetch: () => Promise.resolve({} as any),
                            ...override,
                        };
                    });
                }
                case "chapter": {
                    return () => ({});
                }
                default:
                    throw new Error("Please catch the other queries");
            }
        };

    it("should display the order of actions are edit, duplicate", () => {
        (useDialog as jest.Mock).mockReturnValue(useDialogReturnValue);
        (useBookMutation as jest.Mock).mockReturnValue(useBookMutationReturnValue);
        (inferQuery as jest.Mock).mockImplementation(mockInferQuery());

        const { getByTestId, getAllByRole } = render(
            <CommonTranslationProvider>
                <BookDetails />
            </CommonTranslationProvider>,
            { wrapper: TestAppWithQueryClient }
        );

        fireEvent.click(getByTestId("ActionPanel__trigger"));

        expect(getAllByRole("menuitem").length).toEqual(2);
        expect(getAllByRole("menuitem")[0].textContent).toEqual("Edit");
        expect(getAllByRole("menuitem")[1].textContent).toEqual("Duplicate");
    });

    it("should render a loading indicator when the book is still being queried", () => {
        (useDialog as jest.Mock).mockReturnValue(useDialogReturnValue);
        (useBookMutation as jest.Mock).mockReturnValue(useBookMutationReturnValue);
        (inferQuery as jest.Mock).mockImplementation(
            mockInferQuery({
                isLoading: true,
            })
        );

        const { getByRole } = render(
            <CommonTranslationProvider>
                <BookDetails />
            </CommonTranslationProvider>,
            { wrapper: TestApp }
        );

        expect(getByRole("progressbar")).toBeInTheDocument();
    });

    it("should render nothing when the book cannot be found", () => {
        (useDialog as jest.Mock).mockReturnValue(useDialogReturnValue);
        (useBookMutation as jest.Mock).mockReturnValue(useBookMutationReturnValue);
        (inferQuery as jest.Mock).mockImplementation(
            mockInferQuery({
                data: undefined,
            })
        );

        const { container } = render(
            <CommonTranslationProvider>
                <BookDetails />
            </CommonTranslationProvider>,
            { wrapper: TestAppWithQueryClient }
        );

        expect(container).toBeEmptyDOMElement();
    });

    it("should call showSnackbar when the book cannot be loaded", () => {
        const showSnackbarMock = jest.fn();

        (useDialog as jest.Mock).mockReturnValue(useDialogReturnValue);
        (useBookMutation as jest.Mock).mockReturnValue(useBookMutationReturnValue);
        (useShowSnackbar as jest.Mock).mockReturnValue(showSnackbarMock);
        (inferQuery as jest.Mock).mockImplementation(mockInferQuery());

        render(
            <CommonTranslationProvider>
                <BookDetails />
            </CommonTranslationProvider>,
            { wrapper: TestAppWithQueryClient }
        );

        getLatestCallParams(realQuery)[1].onError();

        expect(showSnackbarMock).toHaveBeenCalledWith(
            "Unable to load data, please try again!",
            "error"
        );
    });

    it("should call correct callback on action selection", () => {
        const onDuplicateMock = jest.fn();
        const navigationMock = jest.fn();
        const onDialogOpenMock = jest.fn();

        (useNavigation as jest.Mock).mockImplementation(() => ({ push: navigationMock }));
        (useDialog as jest.Mock).mockReturnValue({
            ...useDialogReturnValue,
            onOpen: onDialogOpenMock,
        });
        (useBookMutation as jest.Mock).mockReturnValue({
            ...useBookMutationReturnValue,
            onDuplicate: onDuplicateMock,
        });
        (inferQuery as jest.Mock).mockImplementation(mockInferQuery());

        const { getByTestId, getByText } = render(
            <CommonTranslationProvider>
                <BookDetails />
            </CommonTranslationProvider>,
            { wrapper: TestAppWithQueryClient }
        );

        fireEvent.click(getByTestId("ActionPanel__trigger"));
        fireEvent.click(getByText("Duplicate"));
        expect(onDuplicateMock).toHaveBeenCalled();

        fireEvent.click(getByTestId("ActionPanel__trigger"));
        fireEvent.click(getByText("Edit"));
        expect(onDialogOpenMock).toHaveBeenCalled();

        getLatestCallParams(onDuplicateMock)[1].onSuccess();
        expect(navigationMock).toHaveBeenCalledWith("/syllabus/books");
    });

    it("should call onUpdate on book form dialog submit", async () => {
        const onUpdateMock = jest.fn();
        const refetchBookMock = jest.fn();
        const onDialogCloseMock = jest.fn();

        (useDialog as jest.Mock).mockReturnValue({
            ...useDialogReturnValue,
            open: true,
            onClose: onDialogCloseMock,
        });
        (useBookMutation as jest.Mock).mockReturnValue({
            ...useBookMutationReturnValue,
            onUpdate: onUpdateMock,
        });
        (inferQuery as jest.Mock).mockImplementation(
            mockInferQuery({
                refetch: refetchBookMock,
            })
        );

        const { getByText } = render(
            <CommonTranslationProvider>
                <BookDetails />
            </CommonTranslationProvider>,
            { wrapper: TestAppWithQueryClient }
        );

        fireEvent.click(getByText("Save"));
        await waitFor(() => {
            expect(onUpdateMock).toHaveBeenCalled();
        });

        getLatestCallParams(onUpdateMock)[1].onSuccess();
        expect(refetchBookMock).toHaveBeenCalled();
        expect(onDialogCloseMock).toHaveBeenCalled();
    });
});
