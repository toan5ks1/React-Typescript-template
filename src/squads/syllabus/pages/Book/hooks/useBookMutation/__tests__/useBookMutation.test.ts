import inferMutation from "src/squads/syllabus/services/infer-mutation";
import { getCallParamsAt } from "src/squads/syllabus/test-utils/mock-utils";

import useBookMutation from "../useBookMutation";

import { renderHook } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import TestApp from "src/squads/syllabus/test-utils/TestApp";

jest.mock("src/squads/syllabus/hooks/useShowSnackbar", () => jest.fn());
jest.mock("src/squads/syllabus/services/infer-mutation");
jest.mock("src/squads/syllabus/internals/logger");

const mockMutationBook = jest.fn();

const mockInferMutation = ({ entity }: Parameters<typeof inferMutation>[0]) => {
    switch (entity) {
        case "book":
            return mockMutationBook;
        default:
            throw new Error("Please catch the other mutations");
    }
};

describe("useBookMutation", () => {
    const mutateCreate = jest.fn();
    const mutateUpdate = jest.fn();
    const mutateDuplicate = jest.fn();

    beforeEach(() => {
        mockMutationBook
            .mockReturnValueOnce({ isLoading: false, mutate: mutateCreate })
            .mockReturnValueOnce({ isLoading: false, mutate: mutateUpdate })
            .mockReturnValueOnce({ isLoading: false, mutate: mutateDuplicate });

        (inferMutation as jest.Mock).mockImplementation(mockInferMutation);
    });

    it("should return correct values", () => {
        const {
            result: {
                current: { isLoadingCreate: isNotLoading },
            },
        } = renderHook<{}, ReturnType<typeof useBookMutation>>(() => useBookMutation());

        expect(isNotLoading).toBe(false);

        mockMutationBook.mockReturnValue({ isLoading: true });

        const {
            result: {
                current: { isLoadingCreate },
            },
        } = renderHook<{}, ReturnType<typeof useBookMutation>>(() => useBookMutation());

        expect(isLoadingCreate).toBe(true);
    });

    it("should call the mutation functions", () => {
        const {
            result: {
                current: { onCreate, onUpdate, onDuplicate },
            },
        } = renderHook<{}, ReturnType<typeof useBookMutation>>(() => useBookMutation());

        onCreate({ chapterIdsList: ["b1"], schoolId: 12, name: "Name" }, {});
        expect(mutateCreate).toHaveBeenCalled();

        onUpdate({ bookId: "bookId", chapterIdsList: ["b1"], schoolId: 12, name: "Name" }, {});
        expect(mutateUpdate).toHaveBeenCalled();

        onDuplicate({ bookId: "book duplicate id", bookName: "bookName" }, {});
        expect(mutateDuplicate).toHaveBeenCalled();
    });

    it("should call the onSuccess callbacks", () => {
        const showSnackbarMock = jest.fn();

        (useShowSnackbar as jest.Mock).mockReturnValue(showSnackbarMock);

        renderHook<{}, ReturnType<typeof useBookMutation>>(() => useBookMutation(), {
            wrapper: TestApp,
        });

        const [createParams] = getCallParamsAt(mockMutationBook, 0);
        const [updateParams] = getCallParamsAt(mockMutationBook, 1);
        const [duplicateParams] = getCallParamsAt(mockMutationBook, 2);

        createParams.onSuccess();
        expect(showSnackbarMock).toHaveBeenLastCalledWith(
            "You have created a new book successfully"
        );
        createParams.onError();
        expect(showSnackbarMock).toHaveBeenLastCalledWith("Created failed", "error");

        updateParams.onSuccess();
        expect(showSnackbarMock).toHaveBeenLastCalledWith("You have updated book successfully");
        updateParams.onError();
        expect(showSnackbarMock).toHaveBeenLastCalledWith("Updated failed", "error");

        duplicateParams.onSuccess();
        expect(showSnackbarMock).toHaveBeenLastCalledWith("You have duplicated book successfully");
        duplicateParams.onError();
        expect(showSnackbarMock).toHaveBeenLastCalledWith("Duplicate book failed", "error");
    });
});
