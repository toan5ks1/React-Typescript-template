import inferMutation from "src/squads/syllabus/services/infer-mutation";
import {
    createMockMutationByEntityFn,
    InitMutationParams,
} from "src/squads/syllabus/test-utils/infer-mutation";
import { getLatestCallParams } from "src/squads/syllabus/test-utils/mock-utils";

import { LOAndAssignmentType } from "../../components/LOAndAssignment/models";

import useReOrderLOAndAssignment from "../useReOrderLOAndAssignment";

import { renderHook } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";

jest.mock("src/squads/syllabus/hooks/useShowSnackbar", () => jest.fn());
jest.mock("src/squads/syllabus/services/infer-mutation");
jest.mock("src/squads/syllabus/internals/logger");

const mockMutation = jest.fn();

const mockInferMutation = (params: InitMutationParams) => {
    return createMockMutationByEntityFn(params, {
        learningObjective: mockMutation,
    });
};

const createMockData = (): LOAndAssignmentType[] => {
    return [
        {
            lo_id: "lOId",
            school_id: 12,
            name: "name",
            created_at: "",
            display_order: 3,
        },
        {
            assignment_id: "assignmentId",
            school_id: 12,
            name: "name",
            created_at: "",
            display_order: 5,
        },
    ];
};

describe(useReOrderLOAndAssignment.name, () => {
    const mutate = jest.fn();
    const mockShowSnackbar = jest.fn();
    beforeEach(() => {
        mockMutation.mockReturnValueOnce({ isLoading: false, mutate });
        (inferMutation as jest.Mock).mockImplementation(mockInferMutation);
        (useShowSnackbar as jest.Mock).mockImplementation(() => mockShowSnackbar);
    });

    it("should call onError callback and show error msg", () => {
        const { result } = renderHook(() => useReOrderLOAndAssignment("topicId"));
        result.current.updateOrder(createMockData(), {});

        expect(mutate).toBeCalled();

        const [, options] = getLatestCallParams(mutate);

        options.onError(new Error("Err Msg ABC"));

        expect(mockShowSnackbar).toBeCalledWith("ra.message.moveFail: Err Msg ABC", "error");
    });

    it("should call onSuccess callback and show success msg", () => {
        const mockOnSuccess = jest.fn();
        const { result } = renderHook(() => useReOrderLOAndAssignment("topicId"));
        result.current.updateOrder(createMockData(), { onSuccess: mockOnSuccess });

        expect(mutate).toBeCalled();

        const [, options] = getLatestCallParams(mutate);

        options.onSuccess();

        expect(mockShowSnackbar).toBeCalledWith("ra.message.moveSuccess");

        expect(mockOnSuccess).toBeCalledWith();
    });
});
