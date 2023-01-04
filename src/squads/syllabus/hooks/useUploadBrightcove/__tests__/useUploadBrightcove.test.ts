import inferMutation from "src/squads/syllabus/services/infer-mutation";
import {
    createMockMutationByEntityFn,
    InitMutationParams,
} from "src/squads/syllabus/test-utils/infer-mutation";
import { getLatestCallParams } from "src/squads/syllabus/test-utils/mock-utils";

import useUploadBrightcove from "../useUploadBrightcove";

import { renderHook } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";

jest.mock("src/squads/syllabus/internals/logger");
jest.mock("src/squads/syllabus/hooks/useShowSnackbar", () => jest.fn());
jest.mock("src/squads/syllabus/services/infer-mutation");

const mockMutation = jest.fn();
const mockInferMutation = (params: InitMutationParams) => {
    return createMockMutationByEntityFn(params, {
        media: mockMutation,
    });
};
describe(useUploadBrightcove.name, () => {
    const snackbarFn = jest.fn();

    beforeEach(() => {
        mockMutation.mockReturnValueOnce({
            isLoading: false,
        });
        (inferMutation as jest.Mock).mockImplementation(mockInferMutation);
        (useShowSnackbar as jest.Mock).mockReturnValue(snackbarFn);
    });

    it("should show snackbar when err", () => {
        const errMsg = "Custom ERR";
        renderHook(useUploadBrightcove);

        const [options] = getLatestCallParams(mockMutation);

        options.onError(new Error(errMsg));

        expect(snackbarFn).toBeCalledWith(`ra.manabie-error.cannotUpload: ${errMsg}`, "error");
    });
});
