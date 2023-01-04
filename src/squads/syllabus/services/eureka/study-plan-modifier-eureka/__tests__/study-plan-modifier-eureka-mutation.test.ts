import { genId } from "src/squads/syllabus/common/utils/generator";
import {
    createFakeProtoResponse,
    createMockClass,
} from "src/squads/syllabus/test-utils/service/mutation";

import { StudyPlanModifierServicePromiseClient } from "manabuf/eureka/v1/study_plan_modifier_grpc_web_pb";

import eurekaStudyPlanModifierService from "../study-plan-modifier-eureka-mutation";
import {
    createUpsertStudyPlanItemsRequest,
    createUpsertStudyPlanRequest,
} from "../study-plan-modifier-eureka-request";
import { createMockDataUpsertStudyPlan, createMockDataUpsertStudyPlanItem } from "./data";

jest.mock("src/internals/feature-controller");

jest.mock("src/squads/syllabus/hooks/useFeatureToggle", () => {
    // FIXME: DDD LT-12785
    return {
        __esModule: true,
        default: () => ({ isEnabled: false }),
    };
});

describe(eurekaStudyPlanModifierService.upsertStudyPlan.name, () => {
    it("should return correct data after success", async () => {
        const response = genId();
        const payload = createMockDataUpsertStudyPlan();

        createMockClass<StudyPlanModifierServicePromiseClient>(
            StudyPlanModifierServicePromiseClient,
            {
                upsertStudyPlan: () => createFakeProtoResponse(response),
            }
        );

        const request = createUpsertStudyPlanRequest(payload);

        const result = await eurekaStudyPlanModifierService.upsertStudyPlan(payload);

        expect(result).toEqual(response);
        expect(StudyPlanModifierServicePromiseClient.prototype.upsertStudyPlan).toBeCalledWith(
            request
        );
    });
});

describe(eurekaStudyPlanModifierService.upsertStudyPlanItems.name, () => {
    it("should return correct data after success", async () => {
        const response = genId();

        const payload = [createMockDataUpsertStudyPlanItem()];

        createMockClass<StudyPlanModifierServicePromiseClient>(
            StudyPlanModifierServicePromiseClient,
            {
                upsertStudyPlanItemV2: () => createFakeProtoResponse(response),
            }
        );

        const request = createUpsertStudyPlanItemsRequest(payload);

        const result = await eurekaStudyPlanModifierService.upsertStudyPlanItems(payload);

        expect(result).toEqual(response);
        expect(
            StudyPlanModifierServicePromiseClient.prototype.upsertStudyPlanItemV2
        ).toBeCalledWith(request);
    });
});
