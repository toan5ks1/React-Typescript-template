import { AppError } from "src/internals/errors";
import { formInvalidError } from "src/squads/syllabus/internals/errors";
import { toRemoteQuizCoreV2 } from "src/squads/syllabus/models/quiz";
import { mockCreateQuiz } from "src/squads/syllabus/test-utils/quiz";
import { createMockClass } from "src/squads/syllabus/test-utils/service/mutation";
import { TestCaseValidateRequest } from "src/squads/syllabus/test-utils/service/validate";

import { QuizType } from "manabuf/common/v1/contents_pb";
import { QuizLO, RemoveQuizFromLORequest } from "manabuf/eureka/v1/quiz_modifier_pb";

import {
    validateUpsertQuizV2,
    createUpsertQuizV2Request,
    createUpsertSignleQuizRequest,
    createUpdateDisplayOrderOfQuizSetRequest,
    createRemoveQuizInLORequest,
    validateRemoveQuizInLO,
    validateUpdateDisplayOrderOfQuizSet,
} from "../quiz-modifier.mutation.request";
import NsSyllabus_QuizService from "../types";
import {
    createMockDataRemoveQuizInLO,
    createMockDataUpdateDisplayOrderOfQuizSet,
    createMockDataUpsertQuizV2,
} from "./data";

jest.mock("src/squads/syllabus/models/quiz", () => {
    const actual = jest.requireActual("src/squads/syllabus/models/quiz");

    return {
        ...actual,
        toRemoteQuizCoreV2: jest.fn(),
    };
});

describe(createUpsertSignleQuizRequest.name, () => {
    it("should create correct request", () => {
        const quizCoreIns = "quizCoreIns";
        (toRemoteQuizCoreV2 as jest.Mock).mockReturnValue(quizCoreIns);

        createMockClass(QuizLO, {
            setQuiz: jest.fn(),
            clearQuiz: jest.fn(),
        });

        const loId = "loID";
        const quiz = mockCreateQuiz({
            loId,
            schoolId: 99,
        });

        const request = createUpsertSignleQuizRequest({ quiz });

        const { quizLo } = request.toObject();

        expect(quizLo?.loId).toEqual(loId);
        expect(QuizLO.prototype.setQuiz).toBeCalledWith(quizCoreIns);

        expect(QuizLO.prototype.clearQuiz).not.toBeCalled();
    });
});

describe(createUpdateDisplayOrderOfQuizSetRequest.name, () => {
    it("should create correct request when pair list have a pair", () => {
        const payload = createMockDataUpdateDisplayOrderOfQuizSet({
            loId: "lOId",
            pairsList: [{ first: "QuizId_01", second: "QuizId_02" }],
        });

        const request = createUpdateDisplayOrderOfQuizSetRequest(payload);

        expect(request.toObject()).toEqual(payload);
    });
});

describe(`${validateUpsertQuizV2.name} with invalid data`, () => {
    const testCases: TestCaseValidateRequest<NsSyllabus_QuizService.UpsertQuizV2, false>[] = [
        {
            title: "kind is missing",
            input: {
                kind: QuizType.QUIZ_TYPE_FIB,
                quizList: [],
            },
        },
    ];

    testCases.forEach(({ title, input }) => {
        it(`should throw err when ${title}`, () => {
            expect(() =>
                validateUpsertQuizV2(input as NsSyllabus_QuizService.UpsertQuizV2)
            ).toThrowError(formInvalidError);
        });
    });
});

describe(`${validateUpsertQuizV2.name} with valid data`, () => {
    const testCases: TestCaseValidateRequest<NsSyllabus_QuizService.UpsertQuizV2, false>[] = [
        {
            title: "kind is missing",
            input: {
                kind: QuizType.QUIZ_TYPE_FIB,
                quizList: [{}, {}] as NsSyllabus_QuizService.UpsertQuizV2["quizList"],
            },
        },
    ];

    testCases.forEach(({ title, input }) => {
        it(`should throw err when ${title}`, () => {
            expect(() =>
                validateUpsertQuizV2(input as NsSyllabus_QuizService.UpsertQuizV2)
            ).not.toThrowError();
        });
    });
});

describe(`${validateRemoveQuizInLO.name} with invalid data`, () => {
    const testCases: TestCaseValidateRequest<NsSyllabus_QuizService.RemoveQuizInLO, false>[] = [
        {
            title: "missing all required params",
            input: {},
            output: new AppError("missingLOId"),
        },
        {
            title: "missing quizId",
            input: {
                loId: "loId",
            },
            output: new AppError("missingQuizId"),
        },
        {
            title: "missing lOId",
            input: {
                quizId: "quizId",
            },

            output: new AppError("missingLOId"),
        },
    ];

    testCases.forEach(({ title, input, output }) => {
        it(`should throw err when ${title}`, () => {
            expect(() =>
                validateRemoveQuizInLO(input as NsSyllabus_QuizService.RemoveQuizInLO)
            ).toThrowError(output);
        });
    });
});

describe(createUpsertQuizV2Request.name, () => {
    it("should create correct request", () => {
        const quizCoreIns = "quizCoreIns";
        (toRemoteQuizCoreV2 as jest.Mock).mockReturnValue(quizCoreIns);

        createMockClass(QuizLO, {
            setQuiz: jest.fn(),
            clearQuiz: jest.fn(),
        });

        const payload = createMockDataUpsertQuizV2();

        const request = createUpsertQuizV2Request(payload);

        const { kind } = request.toObject();

        expect(kind).toEqual(payload.kind);

        expect(QuizLO.prototype.setQuiz).toBeCalledWith(quizCoreIns);

        expect(QuizLO.prototype.clearQuiz).not.toBeCalled();
    });
});

describe(`${validateRemoveQuizInLO.name} with valid data`, () => {
    it(`shouldn't throw err when data contains lOId and QuizId`, () => {
        expect(() =>
            validateRemoveQuizInLO({ loId: "lo_id", quizId: "quiz_id" })
        ).not.toThrowError();
    });
});

describe(`test for ${createRemoveQuizInLORequest.name}`, () => {
    it("should create correct request", () => {
        const payload = createMockDataRemoveQuizInLO({
            loId: "loId",
            quizId: "quizId",
        });

        const requestAsObject = createRemoveQuizInLORequest(payload).toObject();

        expect(requestAsObject).toEqual<RemoveQuizFromLORequest.AsObject>(payload);
    });
});

describe(`${validateUpdateDisplayOrderOfQuizSet.name} with invalid data`, () => {
    const testCases: TestCaseValidateRequest<
        NsSyllabus_QuizService.UpdateDisplayOrderOfQuizSet,
        false
    >[] = [
        {
            title: "missing LOId",
            input: { pairsList: [{ first: "Quiz_01", second: "Quiz_02" }] },
        },
        {
            title: "pair list is an empty array",
            input: { loId: "lOId", pairsList: [] },
        },
        {
            title: "pair item missing first quizId",
            input: { loId: "lOId", pairsList: [{ second: "Quiz_02" }] },
        },
        {
            title: "pair item missing second quizId",
            input: { loId: "lOId", pairsList: [{ first: "Quiz_01" }] },
        },
    ];

    testCases.forEach(({ title, input }) => {
        it(`should throw err when ${title}`, () => {
            expect(() =>
                validateUpdateDisplayOrderOfQuizSet(
                    input as NsSyllabus_QuizService.UpdateDisplayOrderOfQuizSet
                )
            ).toThrowError(formInvalidError);
        });
    });
});

describe(`${validateUpdateDisplayOrderOfQuizSet.name} with valid data`, () => {
    const testCases: TestCaseValidateRequest<NsSyllabus_QuizService.UpdateDisplayOrderOfQuizSet>[] =
        [
            {
                title: "contains lOId and pairList have an pair",
                input: { loId: "lOId", pairsList: [{ first: "Quiz_01", second: "Quiz_02" }] },
            },
            {
                title: "contains lOId and pairList have multiple pair",
                input: {
                    loId: "lOId",
                    pairsList: [
                        { first: "Quiz_01", second: "Quiz_02" },
                        { first: "Quiz_05", second: "Quiz_06" },
                    ],
                },
            },
        ];

    testCases.forEach(({ title, input }) => {
        it(`should not throw err when ${title}`, () => {
            expect(() =>
                validateUpdateDisplayOrderOfQuizSet(
                    input as NsSyllabus_QuizService.UpdateDisplayOrderOfQuizSet
                )
            ).not.toThrowError();
        });
    });
});
