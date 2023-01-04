import inferMutation from "src/squads/syllabus/services/infer-mutation";
import {
    createMockMutationByEntityFn,
    InitMutationParams,
} from "src/squads/syllabus/test-utils/infer-mutation";
import { getLatestCallParams } from "src/squads/syllabus/test-utils/mock-utils";

import useSwapQuizOrder from "../useSwapQuizOrder";

import { renderHook } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import { createMockDataUpdateDisplayOrderOfQuizSet } from "src/squads/syllabus/services/eureka/quiz-service/__tests__/data";

jest.mock("src/squads/syllabus/internals/logger");
jest.mock("src/squads/syllabus/hooks/useShowSnackbar");
jest.mock("src/squads/syllabus/services/infer-mutation");

const quizMutation = jest.fn();

const mockInferMutation = (params: InitMutationParams) =>
    createMockMutationByEntityFn(params, {
        quiz: quizMutation,
    });

describe(useSwapQuizOrder.name, () => {
    const showSnackbarFn = jest.fn();
    const mutateFn = jest.fn();
    beforeEach(() => {
        quizMutation.mockReturnValue({ mutate: mutateFn });
        (useShowSnackbar as jest.Mock).mockReturnValue(showSnackbarFn);
        (inferMutation as jest.Mock).mockImplementation(mockInferMutation);
    });

    it("should called with correct params", () => {
        const {
            result: { current },
        } = renderHook(useSwapQuizOrder);

        const params: Parameters<typeof current.updateOrder> = [
            createMockDataUpdateDisplayOrderOfQuizSet(),
            {
                onSuccess: jest.fn(),
                onError: jest.fn(),
            },
        ];

        current.updateOrder(...params);

        expect(mutateFn).toBeCalledWith(...params);
    });

    it("should show correct msg when success and error", () => {
        renderHook(useSwapQuizOrder);

        const mutationOptions = getLatestCallParams(quizMutation)[0];

        mutationOptions.onSuccess();
        expect(showSnackbarFn).toBeCalledWith("ra.message.moveSuccess");

        mutationOptions.onError(new Error());
        expect(showSnackbarFn).toBeCalledWith("ra.message.moveFail", "error");
    });
});
