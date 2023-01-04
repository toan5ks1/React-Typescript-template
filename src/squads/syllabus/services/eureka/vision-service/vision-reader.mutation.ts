import appConfigs from "src/internals/configuration";
import { commonGrpcOptions } from "src/internals/grpc";
import { InheritedGrpcServiceClient } from "src/squads/syllabus/services/service-types";

import { VisionReaderServicePromiseClient } from "manabuf/eureka/v1/vision_reader_grpc_web_pb";

import { NsSyllabus_VisionService } from "./types";
import {
    createDetectTextFromImageRequest,
    validateDetectTextFromImage,
} from "./vision-reader.mutation.request";

class VisionReaderService extends InheritedGrpcServiceClient<VisionReaderServicePromiseClient> {
    async detectTextFromImage(payload: NsSyllabus_VisionService.DetectTextFromImage) {
        validateDetectTextFromImage(payload);

        const request = createDetectTextFromImageRequest(payload);

        const response = await this._call("detectTextFromImage", request);

        return response.toObject();
    }
}

const visionReaderService = new VisionReaderService(
    VisionReaderServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);

export default visionReaderService;
