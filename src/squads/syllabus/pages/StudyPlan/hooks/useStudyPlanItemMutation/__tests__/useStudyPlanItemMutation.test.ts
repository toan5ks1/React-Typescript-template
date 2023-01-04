import inferMutation from "src/squads/syllabus/services/infer-mutation";
import {
    createMockMutationByEntityFn,
    InitMutationParams,
} from "src/squads/syllabus/test-utils/infer-mutation";
import { getLatestCallParams } from "src/squads/syllabus/test-utils/mock-utils";

import useStudyPlanItemMutation from "../useStudyPlanItemMutation";

import { renderHook } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";

jest.mock("src/squads/syllabus/internals/logger");
jest.mock("src/squads/syllabus/services/infer-mutation");
jest.mock("src/squads/syllabus/hooks/useResourceTranslate");

jest.mock("src/squads/syllabus/hooks/useShowSnackbar", () => jest.fn());

const mockMutation = jest.fn();

const mockInferMutation = (params: InitMutationParams) => {
    return createMockMutationByEntityFn(params, {
        studyPlanItem: mockMutation,
    });
};

describe(useStudyPlanItemMutation.name, () => {
    const showSnackbarMock = jest.fn();
    beforeEach(() => {
        mockMutation.mockReturnValue({ isLoading: false, mutate: jest.fn() });

        (inferMutation as jest.Mock).mockImplementation(mockInferMutation);

        (useShowSnackbar as jest.Mock).mockReturnValue(showSnackbarMock);
        renderHook(() => useStudyPlanItemMutation());
    });
    it("should call showSnackbar with correct msg when success and error", () => {
        expect(mockMutation).toBeCalled();

        const [options] = getLatestCallParams(mockMutation);

        expect(showSnackbarMock).not.toHaveBeenCalled();

        options.onSuccess();
        expect(showSnackbarMock).toBeCalledWith("ra.common.updatedSuccess", "success");

        options.onError();
        expect(showSnackbarMock).toBeCalledWith("ra.common.updatedFail", "error");
    });
});
