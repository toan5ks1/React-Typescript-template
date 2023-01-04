import { genId } from "src/squads/syllabus/common/utils/generator";

import { courseModifierServiceEureka } from "../eureka/course-modifier-eureka";
import { createMockDataUpdateDisplayOrderLOAndAssignment } from "../eureka/course-modifier-eureka/__tests__/data";
import {
    Syllabus_LearningObjectiveListQueryVariables,
    LearningObjectivesManyQueryVariables,
    LearningObjectivesOneQueryVariables,
    Syllabus_LearningObjectivesOneQueryVariables,
} from "../eureka/eureka-types";
import { learningObjectiveModifierService } from "../eureka/learning-objective";
import {
    createMockDataDeleteLOs,
    createMockDataUpsertLOs,
} from "../eureka/learning-objective/__tests__/data";
import { learningObjectivesQueriesBob } from "../eureka/learning-objectives-service-bob";
import { learningObjectiveService } from "../learning-objective-service";

jest.mock(
    "src/squads/syllabus/services/eureka/learning-objectives-service-bob/learning-objectives-service-bob.query",
    () => ({
        __esModule: true,
        default: {
            getOne: jest.fn(),
            getOneV2: jest.fn(),
            getMany: jest.fn(),
            getList: jest.fn(),
        },
    })
);
jest.mock(
    "src/squads/syllabus/services/eureka/course-modifier-eureka/course-modifier-eureka.mutation"
);

jest.mock(
    "src/squads/syllabus/services/eureka/learning-objective/learning-objective-modifier.mutation",
    () => {
        return {
            __esModule: true,
            default: {
                upsertLOs: jest.fn(),
                deleteLOs: jest.fn(),
            },
        };
    }
);

describe(`test for query get one LO ${learningObjectiveService.query.LO_GET_ONE.name}`, () => {
    it("should't call query and return undefined when missing identity", async () => {
        const result = await learningObjectiveService.query.LO_GET_ONE(
            {} as LearningObjectivesOneQueryVariables
        );

        expect(learningObjectivesQueriesBob.getOne).not.toBeCalled();
        expect(result).toEqual(undefined);
    });

    it("should return correct after query success", async () => {
        const queryResponse = genId();
        (learningObjectivesQueriesBob.getOne as jest.Mock).mockResolvedValue(queryResponse);

        const params: LearningObjectivesOneQueryVariables = { lo_id: "lOId_01" };

        const result = await learningObjectiveService.query.LO_GET_ONE(params);

        expect(learningObjectivesQueriesBob.getOne).toBeCalledWith(params);
        expect(result).toEqual(queryResponse);
    });
});

describe(`test for query get one LO ${learningObjectiveService.query.syllabusLOGetOneV2.name}`, () => {
    it("should't call query and return undefined when missing identity", async () => {
        const result = await learningObjectiveService.query.syllabusLOGetOneV2(
            {} as Syllabus_LearningObjectivesOneQueryVariables
        );

        expect(learningObjectivesQueriesBob.getOneV2).not.toBeCalled();
        expect(result).toEqual(undefined);
    });

    it("should return correct after query success", async () => {
        const queryResponse = genId();
        (learningObjectivesQueriesBob.getOneV2 as jest.Mock).mockResolvedValue(queryResponse);

        const params: Syllabus_LearningObjectivesOneQueryVariables = { lo_id: "lOId_01" };

        const result = await learningObjectiveService.query.syllabusLOGetOneV2(params);

        expect(learningObjectivesQueriesBob.getOneV2).toBeCalledWith(params);
        expect(result).toEqual(queryResponse);
    });
});

describe(`test for query get many LO by IDS ${learningObjectiveService.query.LO_GET_MANY_BY_IDS.name}`, () => {
    it("should't call query and return undefined when IDS is a nullish", async () => {
        const result = await learningObjectiveService.query.LO_GET_MANY_BY_IDS({});

        expect(learningObjectivesQueriesBob.getMany).not.toBeCalled();
        expect(result).toEqual(undefined);
    });

    it("should't call query and return undefined when IDS is an an empty array", async () => {
        const result = await learningObjectiveService.query.LO_GET_MANY_BY_IDS({ lo_id: [] });

        expect(learningObjectivesQueriesBob.getMany).not.toBeCalled();
        expect(result).toEqual(undefined);
    });

    it("should return correct after query success", async () => {
        const queryResponse = "response_getMany";
        const params: LearningObjectivesManyQueryVariables = { lo_id: ["lo_1"] };
        (learningObjectivesQueriesBob.getMany as jest.Mock).mockResolvedValue(queryResponse);

        const result = await learningObjectiveService.query.LO_GET_MANY_BY_IDS(params);

        expect(learningObjectivesQueriesBob.getMany).toBeCalledWith(params);
        expect(result).toEqual(queryResponse);
    });
});

describe(`test for query get list LO ${learningObjectiveService.query.LO_GET_LIST.name}`, () => {
    it("should call query and return correct data after query success", async () => {
        const queryResponse = "response_getList";
        const params: Syllabus_LearningObjectiveListQueryVariables = {};
        (learningObjectivesQueriesBob.getList as jest.Mock).mockResolvedValue(queryResponse);

        const result = await learningObjectiveService.query.LO_GET_LIST(params);

        expect(learningObjectivesQueriesBob.getList).toBeCalledWith(params);
        expect(result).toEqual(queryResponse);
    });
});

describe(`test for update display order of LO and Assignment ${learningObjectiveService.mutation.LO_ASSIGNMENT_UPDATE_DISPLAY_ORDER.name}`, () => {
    it("should return correct data after success", async () => {
        const response = genId();
        const payload = createMockDataUpdateDisplayOrderLOAndAssignment();

        const updateDisplayOrdersOfLOsAndAssignments =
            courseModifierServiceEureka.updateDisplayOrdersOfLOsAndAssignments as jest.Mock;

        updateDisplayOrdersOfLOsAndAssignments.mockResolvedValue(response);

        const result = await learningObjectiveService.mutation.LO_ASSIGNMENT_UPDATE_DISPLAY_ORDER(
            payload
        );

        expect(updateDisplayOrdersOfLOsAndAssignments).toBeCalledWith(payload);
        expect(result).toEqual(response);
    });
});

describe(`test for delete LO ${learningObjectiveService.mutation.syllabusLODelete.name}`, () => {
    it("should return correct response after success", async () => {
        const response = "response_DeleteLos";
        const payload = createMockDataDeleteLOs();

        (learningObjectiveModifierService.deleteLOs as jest.Mock).mockResolvedValue(response);

        const result = await learningObjectiveService.mutation.syllabusLODelete(payload);

        expect(learningObjectiveModifierService.deleteLOs).toBeCalledWith(payload);
        expect(result).toEqual(response);
    });
});

describe(`test for upsert LO ${learningObjectiveService.mutation.syllabusLOUpsert.name}`, () => {
    const payload = createMockDataUpsertLOs();

    it("should return correct response after success", async () => {
        const response = "UpsertLOsResponse";
        (learningObjectiveModifierService.upsertLOs as jest.Mock).mockResolvedValue(response);

        const result = await learningObjectiveService.mutation.syllabusLOUpsert(payload);

        expect(learningObjectiveModifierService.upsertLOs).toBeCalledWith(payload);
        expect(result).toEqual(response);
    });
});
