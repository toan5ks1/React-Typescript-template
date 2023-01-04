import { AppError } from "src/squads/syllabus/internals/errors";
import logger from "src/squads/syllabus/internals/logger";
import inferMutation from "src/squads/syllabus/services/infer-mutation";
import { NsSyllabus_Yasuo_CoursesService } from "src/squads/syllabus/services/yasuo/courses-service-yasuo/types";
import {
    createMockMutationByEntityFn,
    InitMutationParams,
} from "src/squads/syllabus/test-utils/infer-mutation";
import { getLatestCallParams } from "src/squads/syllabus/test-utils/mock-utils";

import useDeleteLOs from "../useDeleteLOs";

import { renderHook } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";

jest.mock("src/squads/syllabus/internals/logger");
jest.mock("src/squads/syllabus/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/syllabus/services/infer-mutation");

const mockLoIdsList = ["lo_id"];
const mockAppErrorMsg = new AppError("APP_ERROR_DELETE_LOS");

const mockLOMutation = jest.fn();
const mockInferMutation = (params: InitMutationParams) => {
    return createMockMutationByEntityFn(params, {
        learningObjective: mockLOMutation,
    });
};

describe(useDeleteLOs.name, () => {
    const mockMutate = jest.fn();
    const mockOnSuccess = jest.fn();
    const mockOnError = jest.fn();
    const mockShowSnackbar = jest.fn();

    beforeEach(() => {
        mockLOMutation.mockReturnValueOnce({ mutate: mockMutate, isLoading: false });
        (inferMutation as jest.Mock).mockImplementation(mockInferMutation);
        (useShowSnackbar as jest.Mock).mockImplementation(() => mockShowSnackbar);
    });

    it("should call onSuccess when delete LO by loId", () => {
        const {
            result: { current },
        } = renderHook(() => useDeleteLOs());

        const { deleteLOs } = current;

        const payload: NsSyllabus_Yasuo_CoursesService.DeleteLos = { loIdsList: mockLoIdsList };

        deleteLOs(payload, { onSuccess: mockOnSuccess });

        const params = getLatestCallParams(
            mockMutate
        )[0] as NsSyllabus_Yasuo_CoursesService.DeleteLos;

        expect(params.loIdsList).toEqual<NsSyllabus_Yasuo_CoursesService.DeleteLos["loIdsList"]>(
            mockLoIdsList
        );

        getLatestCallParams(mockLOMutation)[0].onSuccess();
        getLatestCallParams(mockMutate)[1].onSuccess();

        expect(mockShowSnackbar).toBeCalledWith("ra.common.deleteSuccess");
        expect(mockOnSuccess).toBeCalled();
    });

    it("should call onError with AppError message when delete LO failed", () => {
        const {
            result: { current },
        } = renderHook(() => useDeleteLOs());

        const { deleteLOs } = current;

        const payload: NsSyllabus_Yasuo_CoursesService.DeleteLos = { loIdsList: [] };

        deleteLOs(payload, { onSuccess: mockOnSuccess, onError: mockOnError });

        getLatestCallParams(mockLOMutation)[0].onError(mockAppErrorMsg);
        getLatestCallParams(mockMutate)[1].onError();

        expect(logger.warn).toBeCalledWith("[useDeleteLOs] LO delete", mockAppErrorMsg);
        expect(mockShowSnackbar).toBeCalledWith(
            `ra.common.deleteFail: ${mockAppErrorMsg.message}`,
            "error"
        );
        expect(mockOnSuccess).not.toBeCalled();
        expect(mockOnError).toBeCalled();
    });

    it("should call onError with unknown error message when delete LO failed", () => {
        const {
            result: { current },
        } = renderHook(() => useDeleteLOs());

        const { deleteLOs } = current;

        const payload: NsSyllabus_Yasuo_CoursesService.DeleteLos = { loIdsList: [] };

        deleteLOs(payload, { onSuccess: mockOnSuccess, onError: mockOnError });

        getLatestCallParams(mockLOMutation)[0].onError();

        expect(mockShowSnackbar).toBeCalledWith(
            "ra.common.deleteFail: ra.manabie-error.unknown",
            "error"
        );
    });
});
