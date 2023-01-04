import { genId } from "src/squads/syllabus/common/utils/generator";
import {
    QuizzesOneQueryVariables,
    QuizzesManyByLearningObjectIdQueryVariables,
    QuizzesByExternalIdQueryVariables,
} from "src/squads/syllabus/services/eureka/eureka-types";
import { NsSyllabus_Yasuo_CoursesService } from "src/squads/syllabus/services/yasuo/courses-service-yasuo/types";

import { createEmptyQuiz } from "../../models/quiz";
import {
    createMockDataUpsertSingleQuiz,
    createMockDataUpdateDisplayOrderOfQuizSet,
    createMockDataUpsertQuizV2,
    createMockDataRemoveQuizInLO,
} from "../eureka/quiz-service/__tests__/data";
import quizModifierService from "../eureka/quiz-service/quiz-modifier.mutation";
import { quizzesQueriesBob } from "../eureka/quizzes-service-bob";
import { quizzesService } from "../quizzes-service";

import coursesYasuoMutation from "src/squads/syllabus/services/yasuo/courses-service-yasuo/courses-yasuo.mutation";

jest.mock("src/squads/syllabus/services/eureka/quizzes-service-bob/quizzes-service-bob.query");

jest.mock("src/squads/syllabus/services/yasuo/courses-service-yasuo/courses-yasuo.mutation", () => {
    return {
        __esModule: true,
        default: {
            upsertQuiz: jest.fn(),
        },
    };
});
jest.mock("src/squads/syllabus/services/eureka/quiz-service/quiz-modifier.mutation", () => {
    return {
        __esModule: true,
        default: {
            updateDisplayOrderOfQuizSet: jest.fn(),
            upsertSingleQuiz: jest.fn(),
            upsertQuizV2: jest.fn(),
            removeQuizInLO: jest.fn(),
        },
    };
});

describe(`test query for get one quiz ${quizzesService.query.syllabusQuizGetOne.name}`, () => {
    it("should return correct data after call query success", async () => {
        const queryResp = "queryResp";
        (quizzesQueriesBob.getOne as jest.Mock).mockReturnValue(queryResp);

        const params: QuizzesOneQueryVariables = { quiz_id: "quizId_99" };
        const data = await quizzesService.query.syllabusQuizGetOne(params);

        expect(quizzesQueriesBob.getOne).toBeCalledWith(params);
        expect(data).toEqual(queryResp);
    });

    it("should return undefined when missing identity", async () => {
        const data = await quizzesService.query.syllabusQuizGetOne({});

        expect(quizzesQueriesBob.getOne).not.toBeCalled();
        expect(data).toBeUndefined();
    });
});

describe(`test query for get many quiz by lOId ${quizzesService.query.syllabusQuizGetManyByLOId.name}`, () => {
    it("should return correct data after call query success", async () => {
        const queryResp = "queryResp";
        (quizzesQueriesBob.getManyByLoId as jest.Mock).mockReturnValue(queryResp);

        const params: QuizzesManyByLearningObjectIdQueryVariables = { lo_id: "lOId" };
        const data = await quizzesService.query.syllabusQuizGetManyByLOId(params);

        expect(quizzesQueriesBob.getManyByLoId).toBeCalledWith(params);
        expect(data).toEqual(queryResp);
    });

    it("should return undefined when missing lOId", async () => {
        const data = await quizzesService.query.syllabusQuizGetManyByLOId({});

        expect(quizzesQueriesBob.getManyByLoId).not.toBeCalled();
        expect(data).toBeUndefined();
    });
});

describe(`test query for get get quiz external ID ${quizzesService.query.syllabusQuizGetByExternalId.name}`, () => {
    it("should return correct data after call query success", async () => {
        const response = genId();
        (quizzesQueriesBob.getQuizzesByExternalId as jest.Mock).mockReturnValue(response);

        const params: QuizzesByExternalIdQueryVariables = { external_id: "quizExternalId_09" };
        const data = await quizzesService.query.syllabusQuizGetByExternalId(params);

        expect(quizzesQueriesBob.getQuizzesByExternalId).toBeCalledWith(params);
        expect(data).toEqual(response);
    });

    it("should return undefined when missing quiz external ID", async () => {
        const data = await quizzesService.query.syllabusQuizGetByExternalId({});

        expect(quizzesQueriesBob.getManyByLoId).not.toBeCalled();
        expect(data).toBeUndefined();
    });
});

describe(`test for upsert quiz ${quizzesService.mutation.syllabusQuizUpsert.name}`, () => {
    const payload: NsSyllabus_Yasuo_CoursesService.UpsertQuiz = {
        quiz: createEmptyQuiz({
            isLo: true,
            schoolId: 12,
            loId: "",
        }),
    };

    it("should return correct data after success", async () => {
        const upsertQuizResponse = "upsertQuizResponse";
        (coursesYasuoMutation.upsertQuiz as jest.Mock).mockResolvedValue(upsertQuizResponse);

        const result = await quizzesService.mutation.syllabusQuizUpsert(payload);

        expect(coursesYasuoMutation.upsertQuiz).toBeCalledWith(payload);
        expect(result).toEqual(upsertQuizResponse);
    });
});

describe(`test for upsert single quiz ${quizzesService.mutation.syllabusQuizUpsertSingle.name}`, () => {
    const payload = createMockDataUpsertSingleQuiz();

    it("should return correct data after success", async () => {
        const response = "response_upsertSingleQuiz";
        (quizModifierService.upsertSingleQuiz as jest.Mock).mockResolvedValue(response);

        const result = await quizzesService.mutation.syllabusQuizUpsertSingle(payload);

        expect(quizModifierService.upsertSingleQuiz).toBeCalledWith(payload);
        expect(result).toEqual(response);
    });
});

describe(`test for upsert quiz v2 ${quizzesService.mutation.syllabusQuizUpsertV2.name}`, () => {
    it("should return correct data after success", async () => {
        const payload = createMockDataUpsertQuizV2();
        const response = "response_upsertQuizV2";
        (quizModifierService.upsertQuizV2 as jest.Mock).mockResolvedValue(response);

        const result = await quizzesService.mutation.syllabusQuizUpsertV2(payload);

        expect(quizModifierService.upsertQuizV2).toBeCalledWith(payload);
        expect(result).toEqual(response);
    });
});

describe(quizzesService.mutation.syllabusQuizSwapDisplayOrder.name, () => {
    it("should call updateDisplayOrderOfQuiz and return correct data after success", async () => {
        const response = "response_updateDisplayOrderOfQuizSet";

        const payload = createMockDataUpdateDisplayOrderOfQuizSet();
        (quizModifierService.updateDisplayOrderOfQuizSet as jest.Mock).mockResolvedValue(response);

        const result = await quizzesService.mutation.syllabusQuizSwapDisplayOrder(payload);

        expect(result).toEqual(response);
        expect(quizModifierService.updateDisplayOrderOfQuizSet).toBeCalledWith(payload);
    });
});

describe(quizzesService.mutation.syllabusQuizDelete.name, () => {
    it("should call removeQuizInLO and return correct data after success", async () => {
        const response = "response_removeQuizInLO";

        const payload = createMockDataRemoveQuizInLO();
        (quizModifierService.removeQuizInLO as jest.Mock).mockResolvedValue(response);

        const result = await quizzesService.mutation.syllabusQuizDelete(payload);

        expect(result).toEqual(response);
        expect(quizModifierService.removeQuizInLO).toBeCalledWith(payload);
    });
});
