import { AxiosInstance } from "axios";
import { Features } from "src/common/constants/enum";
import appConfigs from "src/internals/configuration";
import featureControllerUnleash from "src/internals/feature-controller";

import { DetectionV1, DetectionV2 } from "../packages/detection";
import logger from "./logger";

import { createHttpClient } from "@manabie-com/http-client";

function injectCatchResponseInterceptor(ins: AxiosInstance) {
    ins.interceptors.response.use(
        (response) => response,
        (error) => {
            logger.warn("OCR detection err", error);
            return Promise.reject(error);
        }
    );
}

const httpClient = createHttpClient(
    { timeout: 10000 },
    { interceptors: [injectCatchResponseInterceptor] }
);

export const getDetection = () => {
    const isUseOCREndpointsEnabled = featureControllerUnleash.isFeatureEnabled(
        Features.SYLLABUS_QUIZ_USE_OCR_ENDPOINTS
    );

    const detectionV1 = new DetectionV1({
        httpClient,
        configs: appConfigs,
    });
    const detectionV2 = new DetectionV2({
        httpClient,
        configs: appConfigs,
    });

    return isUseOCREndpointsEnabled ? detectionV2 : detectionV1;
};
