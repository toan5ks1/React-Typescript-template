import appConfigs from "src/internals/configuration";
import { commonGrpcOptions } from "src/internals/grpc";

import { StudyPlanModifierServicePromiseClient } from "manabuf/eureka/v1/study_plan_modifier_grpc_web_pb";

import { InheritedGrpcServiceClient } from "../../service-types";
import {
    createUpsertStudyPlanItemsRequest,
    createUpsertStudyPlanRequest,
    validateUpsertStudyPlan,
} from "./study-plan-modifier-eureka-request";
import { NsEurekaStudyPlanModifierService } from "./types";

class StudyPlanModifierEureka extends InheritedGrpcServiceClient<StudyPlanModifierServicePromiseClient> {
    async upsertStudyPlan(data: NsEurekaStudyPlanModifierService.UpsertStudyPlan) {
        validateUpsertStudyPlan(data);

        const req = createUpsertStudyPlanRequest(data);
        const resp = await this._call("upsertStudyPlan", req);

        return resp.toObject();
    }

    async upsertStudyPlanItems(data: NsEurekaStudyPlanModifierService.UpsertStudyPlanItems) {
        const req = createUpsertStudyPlanItemsRequest(data);
        const resp = await this._call("upsertStudyPlanItemV2", req);

        return resp.toObject();
    }
}

const eurekaStudyPlanModifierService = new StudyPlanModifierEureka(
    StudyPlanModifierServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);

export default eurekaStudyPlanModifierService;
