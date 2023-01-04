import { ProviderTypes } from "src/common/constants/enum";
import schedulerModifierServiceEureka from "src/services/eureka/scheduler-patterns-eureka";

import { getEmptyResponse } from "../utils";

type Params = {
    type: ProviderTypes.CREATE;
    payload: Parameters<typeof schedulerModifierServiceEureka.createOpenTimeScheduler>[0];
};
const schedulerPatternsProvider = (params: Params) => {
    switch (params.type) {
        case ProviderTypes.CREATE: {
            return schedulerModifierServiceEureka.createOpenTimeScheduler(params.payload);
        }

        default: {
            return getEmptyResponse();
        }
    }
};

export default schedulerPatternsProvider;
