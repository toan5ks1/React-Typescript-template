import { Syllabus_BooksListV2Query } from "src/squads/syllabus/services/eureka/eureka-types";
import { inferQueryPagination } from "src/squads/syllabus/services/infer-query";
import { DataWithTotal } from "src/squads/syllabus/services/service-creator";
import { getCallParamsAt } from "src/squads/syllabus/test-utils/mock-utils";
import { createFakePagination } from "src/squads/syllabus/test-utils/pagination";

import CommonTranslationProvider from "src/providers/TranslationProvider";

import BookList from "../BookTable";

import { fireEvent, render, waitFor, within } from "@testing-library/react";
import useDialog from "src/squads/syllabus/hooks/useDialog";
import useBookMutation from "src/squads/syllabus/pages/Book/hooks/useBookMutation";
import { mockBookGetListData } from "src/squads/syllabus/services/eureka/book-service/__mocks__/book-service-query";
import TestApp from "src/squads/syllabus/test-utils/TestApp";

jest.mock("src/squads/syllabus/services/infer-query", () => {
    return {
        __esModule: true,
        inferQueryPagination: jest.fn(),
    };
});

jest.mock("src/squads/syllabus/pages/Book/hooks/useBookMutation", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/syllabus/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/syllabus/hooks/useDialog", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const mockInferQueryPagination = ({
    data = { data: [], total: 0 },
    refetch = () => {},
    resetPaginationOffset = () => {},
}: {
    data?: DataWithTotal<Syllabus_BooksListV2Query["books"]>;
    refetch?: () => void;
    resetPaginationOffset?: () => void;
}) =>
    (inferQueryPagination as jest.Mock).mockReturnValue(() => ({
        result: {
            isLoading: false,
            refetch,
        },
        data,
        pagination: createFakePagination({ count: data.total }),
        resetPaginationOffset,
    }));

describe("<BookList />", () => {
    it("should render correct Books", () => {
        (useBookMutation as jest.Mock).mockReturnValue({
            isLoadingCreate: false,
            onCreate: () => {},
        });
        (useDialog as jest.Mock).mockReturnValue({
            open: false,
            onOpen: () => {},
            onClose: () => {},
        });
        mockInferQueryPagination({ data: mockBookGetListData });

        const { getAllByTestId } = render(
            <TestApp>
                <CommonTranslationProvider>
                    <BookList />
                </CommonTranslationProvider>
            </TestApp>
        );

        const { data } = mockBookGetListData;
        const bookNameList = getAllByTestId("BookList__bookName");
        expect(bookNameList[0]).toHaveTextContent(data[0].name);
        expect(bookNameList[1]).toHaveTextContent(data[1].name);
    });

    it("should refetch the books and close the dialog on form submit success", async () => {
        const mockOnCreate = jest.fn();
        const mockRefetch = jest.fn();
        const mockOnDialogClose = jest.fn();

        (useBookMutation as jest.Mock).mockReturnValue({
            isLoadingCreate: false,
            onCreate: mockOnCreate,
        });
        (useDialog as jest.Mock).mockReturnValue({
            open: true,
            onOpen: () => {},
            onClose: mockOnDialogClose,
        });
        mockInferQueryPagination({ data: undefined, refetch: mockRefetch });

        const { getByTestId } = render(
            <TestApp>
                <CommonTranslationProvider>
                    <BookList />
                </CommonTranslationProvider>
            </TestApp>
        );
        const dialogWrapper = within(getByTestId("DialogWithHeaderFooter_wrapper"));

        fireEvent.change(dialogWrapper.getByRole("textbox"), {
            target: { value: "Book Name" },
        });
        fireEvent.click(dialogWrapper.getByRole("button", { name: "Save" }));

        await waitFor(() => {
            expect(mockOnCreate).toHaveBeenCalled();
        });

        getCallParamsAt(mockOnCreate, 0)[1].onSuccess();

        expect(mockOnCreate).toHaveBeenCalled();
        expect(mockRefetch).toHaveBeenCalled();
        expect(mockOnDialogClose).toHaveBeenCalled();
    });

    it("should call resetPaginationOffset on book search", () => {
        const mockResetPaginationOffset = jest.fn();

        (useBookMutation as jest.Mock).mockReturnValue({
            isLoadingCreate: false,
            onCreate: () => {},
        });
        (useDialog as jest.Mock).mockReturnValue({
            open: true,
            onOpen: () => {},
            onClose: () => {},
        });

        mockInferQueryPagination({
            data: undefined,
            resetPaginationOffset: mockResetPaginationOffset,
        });

        const { getByPlaceholderText } = render(
            <TestApp>
                <CommonTranslationProvider>
                    <BookList />
                </CommonTranslationProvider>
            </TestApp>
        );
        const searchInput = getByPlaceholderText("Enter your keyword");

        fireEvent.change(searchInput, { target: { value: "Test" } });
        fireEvent.keyPress(searchInput, { key: "Enter", code: "Enter", charCode: 13 });

        expect(mockResetPaginationOffset).toHaveBeenCalled();
    });
});
