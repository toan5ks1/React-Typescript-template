import { AppError } from "src/squads/syllabus/internals/errors";
import logger from "src/squads/syllabus/internals/logger";
import { NsAssignmentEureka } from "src/squads/syllabus/services/eureka/assignment-eureka";
import inferMutation from "src/squads/syllabus/services/infer-mutation";
import {
    createMockMutationByEntityFn,
    InitMutationParams,
} from "src/squads/syllabus/test-utils/infer-mutation";
import { getLatestCallParams } from "src/squads/syllabus/test-utils/mock-utils";

import useDeleteAssignment from "../useDeleteAssignment";

import { renderHook } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";

jest.mock("src/squads/syllabus/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/syllabus/services/infer-mutation");

jest.mock("src/squads/syllabus/internals/logger");

const mockAssignmentIdsList = ["assignment_id"];
const mockAppErrorMsg = new AppError("ra.manabie-error.invalid_params");

const mockAssignmentMutation = jest.fn();
const mockInferMutation = (params: InitMutationParams) => {
    return createMockMutationByEntityFn(params, {
        assignment: mockAssignmentMutation,
    });
};

describe(useDeleteAssignment.name, () => {
    const mockMutate = jest.fn();
    const mockOnSuccess = jest.fn();
    const mockOnError = jest.fn();
    const mockShowSnackbar = jest.fn();

    beforeEach(() => {
        mockAssignmentMutation.mockReturnValueOnce({ mutate: mockMutate, isLoading: false });
        (inferMutation as jest.Mock).mockImplementation(mockInferMutation);
        (useShowSnackbar as jest.Mock).mockImplementation(() => mockShowSnackbar);
    });

    it("should call onSuccess when delete assignment by assignmentId", () => {
        const {
            result: { current },
        } = renderHook(() => useDeleteAssignment());

        const { deleteAssignment } = current;

        const payload: NsAssignmentEureka.DeleteAssignments = {
            assignmentIdsList: mockAssignmentIdsList,
        };

        deleteAssignment(payload, { onSuccess: mockOnSuccess });

        const params = getLatestCallParams(mockMutate)[0] as NsAssignmentEureka.DeleteAssignments;

        expect(params.assignmentIdsList).toEqual<
            NsAssignmentEureka.DeleteAssignments["assignmentIdsList"]
        >(mockAssignmentIdsList);

        getLatestCallParams(mockAssignmentMutation)[0].onSuccess();
        getLatestCallParams(mockMutate)[1].onSuccess();

        expect(mockShowSnackbar).toBeCalledWith("ra.common.deleteSuccess");
        expect(mockOnSuccess).toBeCalled();
    });

    it("should call onError with AppError message when delete assignment failed", () => {
        const {
            result: { current },
        } = renderHook(() => useDeleteAssignment());

        const { deleteAssignment } = current;

        const payload: NsAssignmentEureka.DeleteAssignments = {
            assignmentIdsList: [],
        };

        deleteAssignment(payload, { onSuccess: mockOnSuccess, onError: mockOnError });

        getLatestCallParams(mockAssignmentMutation)[0].onError(mockAppErrorMsg);
        getLatestCallParams(mockMutate)[1].onError();

        expect(logger.warn).toBeCalledWith("[ASSIGNMENT delete]", mockAppErrorMsg);
        expect(mockShowSnackbar).toBeCalledWith(
            `ra.common.deleteFail: ${mockAppErrorMsg.message}`,
            "error"
        );
        expect(mockOnSuccess).not.toBeCalled();
        expect(mockOnError).toBeCalled();
    });

    it("should call onError with unknown error message when delete assignment failed", () => {
        const {
            result: { current },
        } = renderHook(() => useDeleteAssignment());

        const { deleteAssignment } = current;

        const payload: NsAssignmentEureka.DeleteAssignments = {
            assignmentIdsList: [],
        };

        deleteAssignment(payload, { onSuccess: mockOnSuccess, onError: mockOnError });

        getLatestCallParams(mockAssignmentMutation)[0].onError();

        expect(mockShowSnackbar).toBeCalledWith(
            "ra.common.deleteFail: ra.manabie-error.unknown",
            "error"
        );
    });
});
