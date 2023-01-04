import { KeyLOTypes } from "src/squads/syllabus/common/constants/const";
import { formInvalidError } from "src/squads/syllabus/internals/errors";
import { TestCaseValidateRequest } from "src/squads/syllabus/test-utils/service/validate";

import { LearningObjectiveType } from "manabuf/common/v1/enums_pb";
import { DeleteLosRequest } from "manabuf/eureka/v1/learning_objective_modifier_pb";

import {
    createDeleteLOsRequest,
    createUpsertLOsRequest,
    validateUpsertLOs,
} from "../learning-objective-modifier.request";
import NsSyllabus_LearningObjectiveService from "../types";
import { createMockDataUpsertLOs, createMockDataDeleteLOs } from "./data";

describe(createUpsertLOsRequest.name, () => {
    it("should return request with EMPTY ID when creates", async () => {
        const loWithoutId = createMockDataUpsertLOs({ loId: undefined });
        const request = createUpsertLOsRequest(loWithoutId);

        expect(request.toObject().learningObjectivesList).toEqual([
            {
                info: {
                    id: "",
                    name: loWithoutId.name,
                    schoolId: loWithoutId.schoolId,
                    country: 0,
                    displayOrder: loWithoutId.displayOrder,
                    grade: 0,
                    subject: 0,
                    iconUrl: "",
                    masterId: "",
                    createdAt: undefined,
                    deletedAt: undefined,
                    updatedAt: undefined,
                },
                topicId: loWithoutId.topicId,
                type: LearningObjectiveType[loWithoutId.type],
                video: "",
                prerequisitesList: [],
                quizIdsList: [],
                studyGuide: "",
            },
        ]);
    });

    it("should return correct request WITH ID when edit", async () => {
        const loId = "loId";
        const studyGuide = "studyGuide";
        const video = "videoID";
        const loWithId = createMockDataUpsertLOs({
            loId,
            video,
            studyGuide,
        });
        const request = createUpsertLOsRequest(loWithId);

        expect(request.toObject().learningObjectivesList).toEqual([
            {
                info: {
                    id: loId,
                    name: loWithId.name,
                    schoolId: loWithId.schoolId,
                    country: 0,
                    displayOrder: loWithId.displayOrder,
                    grade: 0,
                    subject: 0,
                    iconUrl: "",
                    masterId: "",
                    createdAt: undefined,
                    deletedAt: undefined,
                    updatedAt: undefined,
                },
                topicId: loWithId.topicId,
                type: LearningObjectiveType[loWithId.type],
                prerequisitesList: [],
                quizIdsList: [],
                video,
                studyGuide,
            },
        ]);
    });
});

describe(createDeleteLOsRequest.name, () => {
    it("should create correct request", () => {
        const payload = createMockDataDeleteLOs({ loIdsList: ["LO_1", "LO_2"] });

        const requestAsObject = createDeleteLOsRequest(payload).toObject();

        expect(requestAsObject).toEqual<DeleteLosRequest.AsObject>(payload);
    });
});

describe(`${validateUpsertLOs.name} with invalid data`, () => {
    const testCases: TestCaseValidateRequest<
        NsSyllabus_LearningObjectiveService.UpsertLOs,
        false
    >[] = [
        {
            title: "topicId is missing",
            input: {
                name: "LO name",
                schoolId: 1,
                displayOrder: 1,
                type: KeyLOTypes.LEARNING_OBJECTIVE_TYPE_LEARNING,
            },
        },
        {
            title: "name is missing",
            input: {
                topicId: "topicId",
                schoolId: 1,
                displayOrder: 1,
                type: KeyLOTypes.LEARNING_OBJECTIVE_TYPE_LEARNING,
            },
        },
        {
            title: "schoolId is missing",
            input: {
                topicId: "topicId",
                name: "LO name",
                displayOrder: 1,
                type: KeyLOTypes.LEARNING_OBJECTIVE_TYPE_LEARNING,
            },
        },
        {
            title: "type is missing",
            input: {
                topicId: "topicId",
                name: "LO name",
                schoolId: 1,
                displayOrder: 1,
            },
        },
    ];

    testCases.forEach(({ title, input }) => {
        it(`should throw err when ${title}`, () => {
            expect(() =>
                validateUpsertLOs(input as NsSyllabus_LearningObjectiveService.UpsertLOs)
            ).toThrowError(formInvalidError);
        });
    });
});
