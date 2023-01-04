import { Features } from "src/common/constants/enum";
import { createEmptyQuiz } from "src/squads/syllabus/models/quiz";
import inferMutation from "src/squads/syllabus/services/infer-mutation";
import {
    createMockMutationByEntityFn,
    InitMutationParams,
} from "src/squads/syllabus/test-utils/infer-mutation";

import useUpsertQuiz from "../useUpsertQuiz";

import { renderHook } from "@testing-library/react-hooks";
import useFeatureToggle from "src/squads/syllabus/hooks/useFeatureToggle";
import { removeLoadingImageFromQuizPayload } from "src/squads/syllabus/pages/Quiz/common/utils";

jest.mock("src/squads/syllabus/services/infer-mutation");

jest.mock("src/squads/syllabus/pages/Quiz/common/utils", () => {
    return {
        ...jest.requireActual("src/squads/syllabus/pages/Quiz/common/utils"),
        removeLoadingImageFromQuizPayload: jest.fn(),
    };
});
const mockMutation = jest.fn();

jest.mock("src/squads/syllabus/hooks/useFeatureToggle", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const mockInferMutation = (params: InitMutationParams) => {
    return createMockMutationByEntityFn(params, {
        quiz: mockMutation,
    });
};

describe("useUpsertQuiz", () => {
    const mutateFn = jest.fn();
    beforeEach(() => {
        mockMutation.mockReturnValueOnce({ isLoading: false, mutate: mutateFn });
        (inferMutation as jest.Mock).mockImplementation(mockInferMutation);
        (useFeatureToggle as jest.Mock).mockImplementation(() => ({ isEnabled: false }));
    });

    it("should call remove loading image before upsert data", () => {
        const {
            result: { current },
        } = renderHook(useUpsertQuiz);

        const quizFinalPayload = "QuizFinalPayload";

        const quizOriginal = createEmptyQuiz({
            loId: "",
            schoolId: 1,
            isLo: false,
        });

        (removeLoadingImageFromQuizPayload as jest.Mock).mockReturnValue(quizFinalPayload);

        expect(removeLoadingImageFromQuizPayload).not.toBeCalled();

        current.upsertQuiz({ quiz: quizOriginal }, {});

        expect(removeLoadingImageFromQuizPayload).toBeCalledWith(quizOriginal);
        expect(mutateFn).toBeCalledWith({ quiz: quizFinalPayload }, {});
    });
});

describe("useUpsertQuiz feature flag redirect action", () => {
    beforeEach(() => {
        mockMutation.mockReturnValueOnce({ isLoading: false, mutate: jest.fn() });
        (inferMutation as jest.Mock).mockImplementation(mockInferMutation);
    });

    it("should call syllabusQuizUpsertSingle when feature flag enabled", () => {
        (useFeatureToggle as jest.Mock).mockImplementation(() => ({ isEnabled: true }));

        renderHook(useUpsertQuiz);

        expect(inferMutation as jest.Mock).toBeCalledWith({
            action: "syllabusQuizUpsertSingle",
            entity: "quiz",
        });

        expect(useFeatureToggle).toBeCalledWith(
            Features.SYLLABUS_RedirectUpsertQuizToQuizModifierService
        );
    });

    it("should call syllabusQuizUpsert when feature flag not enabled", () => {
        (useFeatureToggle as jest.Mock).mockImplementation(() => ({ isEnabled: false }));

        renderHook(useUpsertQuiz);

        expect(inferMutation as jest.Mock).toBeCalledWith({
            action: "syllabusQuizUpsert",
            entity: "quiz",
        });
        expect(useFeatureToggle).toBeCalledWith(
            Features.SYLLABUS_RedirectUpsertQuizToQuizModifierService
        );
    });
});
