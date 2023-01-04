import { StudyPlanOneV2QueryVariables } from "../eureka/eureka-types";
import { studyPlanQueriesEureka } from "../eureka/study-plan-eureka";
import { createMockDataUpsertStudyPlan } from "../eureka/study-plan-modifier-eureka/__tests__/data";
import eurekaStudyPlanModifierService from "../eureka/study-plan-modifier-eureka/study-plan-modifier-eureka-mutation";
import { studyPlanService } from "../study-plan-service";

jest.mock(
    "src/squads/syllabus/services/eureka/study-plan-modifier-eureka/study-plan-modifier-eureka-mutation"
);

jest.mock("src/squads/syllabus/services/eureka/study-plan-eureka/study-plan-eureka.query", () => ({
    __esModule: true,
    default: {
        getOne: jest.fn(),
    },
}));

jest.mock("src/internals/feature-controller");

describe(studyPlanService.query.STUDY_PLAN_GET_ONE.name, () => {
    it("should not call query and return undefined when missing identity", async () => {
        const result = await studyPlanService.query.STUDY_PLAN_GET_ONE(
            {} as StudyPlanOneV2QueryVariables
        );

        expect(result).toBeUndefined();
        expect(studyPlanQueriesEureka.getOne).not.toBeCalled();
    });

    it("should call query and return correct data after query success", async () => {
        const response = "response_getOne";
        const params: StudyPlanOneV2QueryVariables = { study_plan_id: "SpId_1" };

        (studyPlanQueriesEureka.getOne as jest.Mock).mockResolvedValue(response);

        const result = await studyPlanService.query.STUDY_PLAN_GET_ONE(params);

        expect(result).toEqual(response);
        expect(studyPlanQueriesEureka.getOne).toBeCalledWith(params);
    });
});

describe(`test for upsert study plan ${studyPlanService.mutation.STUDY_PLAN_UPSERT.name}`, () => {
    it("should return correct data after success", async () => {
        const response = "upsertStudyPlanResponse";
        const payload = createMockDataUpsertStudyPlan();

        (eurekaStudyPlanModifierService.upsertStudyPlan as jest.Mock).mockResolvedValue(response);

        const result = await studyPlanService.mutation.STUDY_PLAN_UPSERT(payload);

        expect(eurekaStudyPlanModifierService.upsertStudyPlan).toBeCalledWith(payload);
        expect(result).toEqual(response);
    });
});
