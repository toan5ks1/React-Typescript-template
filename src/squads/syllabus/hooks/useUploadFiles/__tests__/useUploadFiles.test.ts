import inferMutation from "src/squads/syllabus/services/infer-mutation";
import {
    createMockMutationByEntityFn,
    InitMutationParams,
} from "src/squads/syllabus/test-utils/infer-mutation";
import { getLatestCallParams } from "src/squads/syllabus/test-utils/mock-utils";

import useUploadFiles from "../useUploadFiles";

import { renderHook } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";

jest.mock("src/squads/syllabus/internals/logger");
jest.mock("src/squads/syllabus/services/infer-mutation");
jest.mock("src/squads/syllabus/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const mockMediaMutation = jest.fn();

const mockInferMutation = (params: InitMutationParams) => {
    return createMockMutationByEntityFn(params, {
        media: mockMediaMutation,
    });
};

describe(useUploadFiles.name, () => {
    const mutateFn = jest.fn();
    const mutateAsyncFn = jest.fn();
    const snackbarFn = jest.fn();

    beforeEach(() => {
        mockMediaMutation.mockReturnValueOnce({
            isLoading: false,
            mutate: mutateFn,
            mutateAsync: mutateAsyncFn,
        });
        (inferMutation as jest.Mock).mockImplementation(mockInferMutation);
        (useShowSnackbar as jest.Mock).mockReturnValue(snackbarFn);
    });

    it("should show error msg when call onError", () => {
        const errMsg = "Can't upload video";
        renderHook(useUploadFiles);

        const [options] = getLatestCallParams(mockMediaMutation);

        options.onError(new Error(errMsg));

        expect(snackbarFn).toBeCalledWith(`ra.manabie-error.cannotUpload: ${errMsg}`, "error");
    });

    it("should call mutate when call the onUploadFiles", () => {
        const { result } = renderHook(useUploadFiles);

        result.current.onUploadFiles([], {});

        expect(mutateFn).toBeCalledWith([], {});
    });

    it("should call mutateAsync when call the onUploadFilesAsync", async () => {
        const { result } = renderHook(useUploadFiles);

        await result.current.onUploadFilesAsync([], {});

        expect(mutateAsyncFn).toBeCalledWith([], {});
    });
});
