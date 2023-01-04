import appConfigs from "src/internals/configuration";
import { commonGrpcOptions } from "src/internals/grpc";
import { InheritedGrpcServiceClient } from "src/services/service-types";

import { SchedulerModifierServicePromiseClient } from "manabuf/eureka/v1/scheduler_grpc_web_pb";

import {
    validateOpenTimeScheduler,
    newCreateOpenTimeScheduler,
} from "./scheduler-patterns-eureka.request";
import { NsEurekaSchedulerPatternService } from "./types";

class SchedulerModifierEureka extends InheritedGrpcServiceClient<SchedulerModifierServicePromiseClient> {
    async createOpenTimeScheduler(data: NsEurekaSchedulerPatternService.OpenTimeScheduler) {
        validateOpenTimeScheduler(data);
        const req = await newCreateOpenTimeScheduler(
            data! as Required<NsEurekaSchedulerPatternService.OpenTimeScheduler>
        );

        const resp = await this._call("createOpenTimeScheduler", req);
        return {
            data: {
                ...resp.toObject(),
            },
        };
    }
}

const schedulerModifierServiceEureka = new SchedulerModifierEureka(
    SchedulerModifierServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);

export default schedulerModifierServiceEureka;
