import { genId } from "src/squads/syllabus/common/utils/generator";
import { validateQuiz } from "src/squads/syllabus/models/quiz";
import {
    createMockClass,
    createFakeProtoResponse,
} from "src/squads/syllabus/test-utils/service/mutation";

import { QuizModifierServicePromiseClient } from "manabuf/eureka/v1/quiz_modifier_grpc_web_pb";

import quizModifierService from "../quiz-modifier.mutation";
import {
    createUpsertSignleQuizRequest,
    createUpsertQuizV2Request,
    createRemoveQuizInLORequest,
} from "../quiz-modifier.mutation.request";
import {
    createMockDataUpsertSingleQuiz,
    createMockDataUpdateDisplayOrderOfQuizSet,
    createMockDataUpsertQuizV2,
    createMockDataRemoveQuizInLO,
} from "./data";

jest.mock("src/squads/syllabus/models/quiz", () => {
    const actual = jest.requireActual("src/squads/syllabus/models/quiz");

    return {
        ...actual,
        validateQuiz: jest.fn(),
    };
});

describe(quizModifierService.upsertSingleQuiz.name, () => {
    it("should return data correct after success", async () => {
        const response = "response_upsertSingleQuiz";
        const payload = createMockDataUpsertSingleQuiz();

        const request = createUpsertSignleQuizRequest(payload);

        createMockClass(QuizModifierServicePromiseClient, {
            upsertSingleQuiz: () => createFakeProtoResponse(response),
        });

        const result = await quizModifierService.upsertSingleQuiz(payload);

        expect(validateQuiz).toBeCalledWith(payload.quiz);

        expect(QuizModifierServicePromiseClient.prototype.upsertSingleQuiz).toBeCalledWith(request);
        expect(result).toEqual(response);
    });
});

describe(quizModifierService.updateDisplayOrderOfQuizSet.name, () => {
    it("should return data correct after success", async () => {
        const response = "response_updateDisplayOrderOfQuizSet";

        const payload = createMockDataUpdateDisplayOrderOfQuizSet();

        createMockClass(QuizModifierServicePromiseClient, {
            updateDisplayOrderOfQuizSet: () => createFakeProtoResponse(response),
        });

        const result = await quizModifierService.updateDisplayOrderOfQuizSet(payload);

        expect(result).toEqual(response);

        expect(QuizModifierServicePromiseClient.prototype.updateDisplayOrderOfQuizSet).toBeCalled();
    });
});

describe(quizModifierService.upsertQuizV2.name, () => {
    it("should return data correctly after success", async () => {
        const response = "response_upsertQuizV2";

        const payload = createMockDataUpsertQuizV2();
        const request = createUpsertQuizV2Request(payload);

        createMockClass(QuizModifierServicePromiseClient, {
            upsertQuizV2: () => createFakeProtoResponse(response),
        });

        const result = await quizModifierService.upsertQuizV2(payload);

        expect(result).toEqual(response);

        expect(QuizModifierServicePromiseClient.prototype.upsertQuizV2).toBeCalledWith(request);
    });
});

describe(quizModifierService.removeQuizInLO.name, () => {
    it("should return data correct after success", async () => {
        const response = genId();
        const payload = createMockDataRemoveQuizInLO();

        createMockClass<QuizModifierServicePromiseClient>(QuizModifierServicePromiseClient, {
            removeQuizFromLO: () => createFakeProtoResponse(response),
        });

        const request = createRemoveQuizInLORequest(payload);

        const result = await quizModifierService.removeQuizInLO(payload);

        expect(result).toEqual(response);
        expect(QuizModifierServicePromiseClient.prototype.removeQuizFromLO).toBeCalledWith(request);
    });
});
