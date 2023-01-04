import inferMutation from "src/squads/syllabus/services/infer-mutation";
import {
    createMockMutationByEntityFn,
    InitMutationParams,
} from "src/squads/syllabus/test-utils/infer-mutation";
import { getLatestCallParams } from "src/squads/syllabus/test-utils/mock-utils";

import useDeleteChapter from "../useDeleteChapter";

import { renderHook } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";

jest.mock("src/squads/syllabus/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/syllabus/services/infer-mutation", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const mockMutation = jest.fn();
const mockInferMutation = (params: InitMutationParams) => {
    return createMockMutationByEntityFn(params, {
        chapter: mockMutation,
    });
};

describe(useDeleteChapter.name, () => {
    const snackbarFn = jest.fn();
    beforeEach(() => {
        (inferMutation as jest.Mock).mockImplementation(mockInferMutation);
        (useShowSnackbar as jest.Mock).mockImplementation(() => snackbarFn);
    });

    it("should call the onSuccess prop and show message when success", () => {
        const onSuccessPropFn = jest.fn();
        renderHook(() => useDeleteChapter({ onSuccess: onSuccessPropFn }));
        const [options] = getLatestCallParams(mockMutation);

        options.onSuccess();

        describe("should show msg success", () => {
            expect(snackbarFn).toBeCalledWith("ra.common.deleteSuccess");
        });

        describe("should call the onSuccess prop", () => {
            expect(onSuccessPropFn).toBeCalled();
        });
    });
});
