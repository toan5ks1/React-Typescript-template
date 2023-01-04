import { createMockDataUpsertStudyPlanItem } from "../eureka/study-plan-modifier-eureka/__tests__/data";
import studyPlanModifierServiceEureka from "../eureka/study-plan-modifier-eureka/study-plan-modifier-eureka-mutation";
import { studyPlanItemService } from "../study-plan-item-service";

jest.mock(
    "src/squads/syllabus/services/eureka/study-plan-modifier-eureka/study-plan-modifier-eureka-mutation",
    () => ({
        __esModule: true,
        default: {
            upsertStudyPlanItems: jest.fn(),
        },
    })
);

jest.mock("src/internals/feature-controller", () => ({
    // FIXME: DDD LT-12785
    __esModule: true,
    featureControllerUnleash: { isFeatureEnabled: jest.fn() },
}));

describe(studyPlanItemService.mutation.syllabusStudyPlanItemUpsert.name, () => {
    it("should call upsertStudyPlanItems and return correct data after success", async () => {
        const response = "response_upsertStudyPlanItems";

        const payload = [createMockDataUpsertStudyPlanItem()];
        (studyPlanModifierServiceEureka.upsertStudyPlanItems as jest.Mock).mockResolvedValue(
            response
        );

        const result = await studyPlanItemService.mutation.syllabusStudyPlanItemUpsert(payload);

        expect(result).toEqual(response);
        expect(studyPlanModifierServiceEureka.upsertStudyPlanItems).toBeCalledWith(payload);
    });
});
